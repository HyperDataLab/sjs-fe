import { importPKCS8, SignJWT } from 'jose';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const FIREBASE_AUTH_AUDIENCE = 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit';
const GOOGLE_SCOPES = [
	'https://www.googleapis.com/auth/identitytoolkit',
	'https://www.googleapis.com/auth/datastore',
].join(' ');

function bridgeError(code, status = 503) {
	const error = new Error(code);
	error.code = code;
	error.status = status;
	return error;
}

export function serviceAccountConfig(env) {
	const email = env.FIREBASE_SERVICE_ACCOUNT_EMAIL?.trim();
	const privateKey = env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();
	if (!email || !privateKey || !env.FIREBASE_PROJECT_ID) {
		throw bridgeError('firebase_sso_bridge_not_configured');
	}
	return { email, privateKey, projectId: env.FIREBASE_PROJECT_ID };
}

export async function importServiceAccountKey(config) {
	try {
		return await importPKCS8(config.privateKey, 'RS256');
	} catch {
		throw bridgeError('firebase_sso_bridge_not_configured');
	}
}

export async function createGoogleAccessToken(config, privateKey) {
	const now = Math.floor(Date.now() / 1000);
	const assertion = await new SignJWT({ scope: GOOGLE_SCOPES })
		.setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
		.setIssuer(config.email)
		.setAudience(GOOGLE_TOKEN_URL)
		.setIssuedAt(now)
		.setExpirationTime(now + 3600)
		.sign(privateKey);

	let response;
	try {
		response = await fetch(GOOGLE_TOKEN_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
				assertion,
			}),
		});
	} catch {
		throw bridgeError('firebase_sso_bridge_unavailable');
	}

	const body = await response.json().catch(() => ({}));
	if (!response.ok || typeof body.access_token !== 'string') {
		throw bridgeError('firebase_sso_bridge_unavailable');
	}
	return body.access_token;
}

async function getSsoProfile(accessToken, env) {
	if (typeof accessToken !== 'string' || accessToken.length < 20 || accessToken.length > 8192) {
		throw bridgeError('sso_identity_rejected', 401);
	}
	let baseUrl;
	try {
		baseUrl = new URL(env.HYPERDATALAB_SSO_BASE_URL);
	} catch {
		throw bridgeError('sso_provider_not_configured');
	}
  const isLoopback = ['localhost', '127.0.0.1', '[::1]'].includes(baseUrl.hostname);
  if (baseUrl.protocol !== 'https:' && !(baseUrl.protocol === 'http:' && isLoopback)) {
    throw bridgeError('sso_provider_not_configured');
  }

	let response;
	try {
		response = await fetch(new URL('/oauth/userinfo', baseUrl), {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
	} catch {
		throw bridgeError('sso_provider_unavailable');
	}
	if (response.status === 401 || response.status === 403) throw bridgeError('sso_identity_rejected', 401);
	if (!response.ok) throw bridgeError('sso_provider_unavailable');

	const profile = await response.json().catch(() => null);
	if (!profile
		|| typeof profile.sub !== 'string'
		|| !profile.sub.trim()
		|| profile.sub.trim() !== profile.sub
		|| profile.sub.length > 512
		|| typeof profile.email !== 'string'
		|| profile.email.length > 254
		|| !profile.email.includes('@')
		|| profile.email_verified !== true) {
		throw bridgeError('sso_profile_incomplete', 403);
	}
	return {
		sub: profile.sub,
		email: profile.email.trim().toLowerCase(),
		name: typeof profile.name === 'string' ? profile.name.slice(0, 256) : undefined,
		photoUrl: typeof profile.picture === 'string' && profile.picture.startsWith('https://')
			? profile.picture.slice(0, 2048)
			: undefined,
	};
}

function authApiUrl(projectId, action) {
	return `https://identitytoolkit.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/${action}`;
}

function parseCustomAttributes(value) {
	if (typeof value !== 'string' || !value) return {};
	try {
		const parsed = JSON.parse(value);
		return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
	} catch {
		return {};
	}
}

async function syncSsoRoleClaim(config, googleToken, uid, isAdmin) {
	const user = await lookupFirebaseUser(config, googleToken, { localId: [uid] });
	if (!user || user.disabled) throw bridgeError('firebase_user_disabled', 403);
	const claims = parseCustomAttributes(user.customAttributes);
	if (isAdmin) claims.role = 'ADMINISTRATOR';
	else delete claims.role;
	const customAttributes = JSON.stringify(claims);
	if (customAttributes.length > 1000) throw bridgeError('firebase_custom_claims_too_large', 400);
	if (customAttributes === JSON.stringify(parseCustomAttributes(user.customAttributes))) return;
	let response;
	try {
		response = await fetch(authApiUrl(config.projectId, 'accounts:update'), {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${googleToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ localId: uid, customAttributes }),
		});
	} catch {
		throw bridgeError('firebase_auth_admin_unavailable');
	}
	if (!response.ok) throw bridgeError('firebase_auth_admin_unavailable');
}

async function lookupFirebaseUser(config, googleToken, criteria) {
	let response;
	try {
		response = await fetch(authApiUrl(config.projectId, 'accounts:lookup'), {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${googleToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(criteria),
		});
	} catch {
		throw bridgeError('firebase_user_lookup_unavailable');
	}
	const body = await response.json().catch(() => ({}));
	if (!response.ok) throw bridgeError('firebase_user_lookup_unavailable');
	return Array.isArray(body.users) ? body.users[0] ?? null : null;
}

async function createFirebaseUser(config, googleToken, profile, uid) {
	let response;
	try {
		response = await fetch(authApiUrl(config.projectId, 'accounts'), {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${googleToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				localId: uid,
				email: profile.email,
				emailVerified: true,
				...(profile.name ? { displayName: profile.name } : {}),
				...(profile.photoUrl ? { photoUrl: profile.photoUrl } : {}),
			}),
		});
	} catch {
		throw bridgeError('firebase_user_create_unavailable');
	}
	if (response.ok) {
		const created = await response.json().catch(() => ({}));
		if (typeof created.localId === 'string' && created.localId) return created.localId;
	}

	// A concurrent first sign-in can create the same account; recover by verified email.
	const existing = await lookupFirebaseUser(config, googleToken, { email: [profile.email] });
	if (existing?.localId && existing.email?.toLowerCase() === profile.email) {
		if (existing.disabled) throw bridgeError('firebase_user_disabled', 403);
		return existing.localId;
	}
	throw bridgeError('firebase_user_create_unavailable');
}

async function hashSubject(subject) {
	const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(subject));
	let binary = '';
	for (const byte of new Uint8Array(digest)) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function firestoreDocumentsUrl(projectId, emulatorHost) {
	if (emulatorHost) {
		const host = emulatorHost.includes('://') ? new URL(emulatorHost) : new URL(`http://${emulatorHost}`);
		if (!['localhost', '127.0.0.1', '[::1]'].includes(host.hostname)) {
			throw bridgeError('firebase_firestore_emulator_invalid');
		}
		return `${host.origin}/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents`;
	}
	return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents`;
}

async function readSsoUserProfile(config, googleToken, uid, env) {
	let response;
	try {
		response = await fetch(`${firestoreDocumentsUrl(config.projectId, env.FIRESTORE_EMULATOR_HOST)}/users/${encodeURIComponent(uid)}`, {
			headers: googleToken ? { Authorization: `Bearer ${googleToken}` } : {},
		});
	} catch {
		throw bridgeError('firebase_user_profile_unavailable');
	}
	if (response.status === 404) return null;
	if (!response.ok) throw bridgeError('firebase_user_profile_unavailable');
	const document = await response.json().catch(() => null);
	return Object.fromEntries(Object.entries(document?.fields ?? {}).map(([name, value]) => [name, decodeFirestoreValue(value)]));
}

function decodeFirestoreValue(value) {
	if ('nullValue' in value) return null;
	if ('booleanValue' in value) return value.booleanValue;
	if ('integerValue' in value) return Number(value.integerValue);
	if ('doubleValue' in value) return Number(value.doubleValue);
	if ('stringValue' in value) return value.stringValue;
	if ('timestampValue' in value) return value.timestampValue;
	if ('arrayValue' in value) return (value.arrayValue.values ?? []).map(decodeFirestoreValue);
	if ('mapValue' in value) return Object.fromEntries(Object.entries(value.mapValue.fields ?? {}).map(([key, item]) => [key, decodeFirestoreValue(item)]));
	return null;
}

function encodeFirestoreValue(value) {
	if (value === null || value === undefined) return { nullValue: 'NULL_VALUE' };
	if (typeof value === 'boolean') return { booleanValue: value };
	if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
	if (typeof value === 'string') return { stringValue: value };
	if (Array.isArray(value)) return { arrayValue: { values: value.map(encodeFirestoreValue) } };
	if (typeof value === 'object') return { mapValue: { fields: Object.fromEntries(Object.entries(value).map(([key, item]) => [key, encodeFirestoreValue(item)])) } };
	return { nullValue: 'NULL_VALUE' };
}

async function hashEmail(email) {
	const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(email.trim().toLowerCase()));
	let binary = '';
	for (const byte of new Uint8Array(digest)) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function readPendingSsoProfile(config, googleToken, uid, email, env) {
	const pendingId = await hashEmail(email);
	let response;
	try {
		response = await fetch(`${firestoreDocumentsUrl(config.projectId, env.FIRESTORE_EMULATOR_HOST)}/pendingSsoProfiles/${encodeURIComponent(pendingId)}`, {
			headers: googleToken ? { Authorization: `Bearer ${googleToken}` } : {},
		});
	} catch {
		throw bridgeError('firebase_user_profile_unavailable');
	}
	if (response.status === 404) return null;
	if (!response.ok) throw bridgeError('firebase_user_profile_unavailable');
	const document = await response.json().catch(() => null);
	const profile = Object.fromEntries(Object.entries(document?.fields ?? {}).map(([name, value]) => [name, decodeFirestoreValue(value)]));
	return { id: pendingId, uid, profile, updateTime: document?.updateTime };
}

async function adoptPendingSsoProfile(config, googleToken, uid, profile, env, pending) {
	const now = new Date().toISOString();
	const { pending_sso: _pendingSso, ...pendingFields } = pending.profile;
	const fields = {
		...pendingFields,
		email: profile.email,
		display_name: pending.profile.display_name || pending.profile.name || profile.name || '',
		url_image: profile.photoUrl || pending.profile.url_image || '',
		role: pending.profile.role || 'RESEARCHER',
		status: pending.profile.status || 'ACTIVE',
		type: 'SSO',
		created_at: pending.profile.created_at || now,
		updated_at: now,
	};
	const base = `projects/${encodeURIComponent(config.projectId)}/databases/(default)/documents`;
	const userName = `${base}/users/${encodeURIComponent(uid)}`;
	const pendingName = `${base}/pendingSsoProfiles/${encodeURIComponent(pending.id)}`;
	let response;
	try {
		response = await fetch(`${firestoreDocumentsUrl(config.projectId, env.FIRESTORE_EMULATOR_HOST)}:commit`, {
			method: 'POST',
			headers: {
				...(googleToken ? { Authorization: `Bearer ${googleToken}` } : {}),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				writes: [
					{
						update: { name: userName, fields: Object.fromEntries(Object.entries(fields).map(([name, value]) => [name, encodeFirestoreValue(value)])) },
						currentDocument: { exists: false },
					},
					{
						delete: pendingName,
						currentDocument: pending.updateTime ? { updateTime: pending.updateTime } : { exists: true },
					},
				],
			}),
		});
	} catch {
		throw bridgeError('firebase_user_profile_unavailable');
	}
	if (response.ok) return fields;
	if (response.status === 409 || response.status === 400 || response.status === 412) {
		const racedProfile = await readSsoUserProfile(config, googleToken, uid, env);
		if (racedProfile) return racedProfile;
	}
	throw bridgeError('firebase_user_profile_unavailable');
}

async function writeSsoUserProfile(config, googleToken, uid, profile, env, existingProfile) {
	const now = new Date().toISOString();
	const userFields = existingProfile
		? { email: profile.email, display_name: profile.name ?? existingProfile.display_name ?? '', url_image: profile.photoUrl ?? existingProfile.url_image ?? '', updated_at: now }
		: {
			email: profile.email,
			display_name: profile.name ?? '',
			first_name: profile.name?.split(/\s+/).slice(0, -1).join(' ') ?? '',
			last_name: profile.name?.split(/\s+/).slice(-1).join(' ') ?? '',
			url_image: profile.photoUrl ?? '',
			type: 'SSO',
			role: 'RESEARCHER',
			status: 'ACTIVE',
			created_at: now,
			updated_at: now,
		};
	const fields = Object.fromEntries(Object.entries(userFields).map(([name, value]) => [name, { stringValue: value }]));
	let response;
	try {
		if (!existingProfile) {
			const createUrl = new URL(`${firestoreDocumentsUrl(config.projectId, env.FIRESTORE_EMULATOR_HOST)}/users`);
			createUrl.searchParams.set('documentId', uid);
			response = await fetch(createUrl, {
				method: 'POST',
				headers: {
					...(googleToken ? { Authorization: `Bearer ${googleToken}` } : {}),
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ fields }),
			});
			if (response.status === 409) return readSsoUserProfile(config, googleToken, uid, env);
		} else {
			const patchUrl = new URL(`${firestoreDocumentsUrl(config.projectId, env.FIRESTORE_EMULATOR_HOST)}/users/${encodeURIComponent(uid)}`);
			for (const field of Object.keys(userFields)) patchUrl.searchParams.append('updateMask.fieldPaths', field);
			response = await fetch(patchUrl, {
				method: 'PATCH',
				headers: {
					...(googleToken ? { Authorization: `Bearer ${googleToken}` } : {}),
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: `projects/${encodeURIComponent(config.projectId)}/databases/(default)/documents/users/${encodeURIComponent(uid)}`, fields }),
			});
		}
	} catch {
		throw bridgeError('firebase_user_profile_unavailable');
	}
	if (!response.ok) throw bridgeError('firebase_user_profile_unavailable');
	return { ...existingProfile, ...userFields };
}

async function ensureSsoUserProfile(config, googleToken, uid, profile, env) {
	if (env.FIREBASE_AUTH_EMULATOR_HOST && !env.FIRESTORE_EMULATOR_HOST) {
		throw bridgeError('firebase_firestore_emulator_not_configured');
	}
	let userProfile = await readSsoUserProfile(config, googleToken, uid, env);
	if (!userProfile) {
		const pending = await readPendingSsoProfile(config, googleToken, uid, profile.email, env);
		userProfile = pending
			? await adoptPendingSsoProfile(config, googleToken, uid, profile, env, pending)
			: await writeSsoUserProfile(config, googleToken, uid, profile, env, null);
	} else {
		userProfile = await writeSsoUserProfile(config, googleToken, uid, profile, env, userProfile);
	}
	return userProfile;
}

async function readSsoMapping(config, googleToken, mappingId) {
	let response;
	try {
		response = await fetch(`${firestoreDocumentsUrl(config.projectId)}/ssoIdentityMappings/${mappingId}`, {
			headers: { Authorization: `Bearer ${googleToken}` },
		});
	} catch {
		throw bridgeError('firebase_sso_mapping_unavailable');
	}
	if (response.status === 404) return null;
	if (!response.ok) throw bridgeError('firebase_sso_mapping_unavailable');
	const document = await response.json().catch(() => null);
	if (document?.fields?.ssoSubHash?.stringValue !== mappingId) throw bridgeError('firebase_sso_mapping_invalid');
	const uid = document?.fields?.firebaseUid?.stringValue;
	if (typeof uid !== 'string' || !uid) throw bridgeError('firebase_sso_mapping_invalid');
	return uid;
}

async function createSsoMapping(config, googleToken, mappingId, uid) {
	let response;
	try {
		const url = new URL(`${firestoreDocumentsUrl(config.projectId)}/ssoIdentityMappings`);
		url.searchParams.set('documentId', mappingId);
		response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${googleToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				fields: {
					ssoSubHash: { stringValue: mappingId },
					firebaseUid: { stringValue: uid },
				},
			}),
		});
	} catch {
		throw bridgeError('firebase_sso_mapping_unavailable');
	}
	if (response.ok) return uid;
	if (response.status === 409) {
		const existing = await readSsoMapping(config, googleToken, mappingId);
		if (existing) return existing;
	}
	throw bridgeError('firebase_sso_mapping_unavailable');
}

async function resolveFirebaseUid(profile, config, googleToken, emulatorMode) {
	const subjectHash = await hashSubject(profile.sub);
	if (emulatorMode) return `sso_${subjectHash}`;

	const mappedUid = await readSsoMapping(config, googleToken, subjectHash);
	if (mappedUid) {
		const mappedUser = await lookupFirebaseUser(config, googleToken, { localId: [mappedUid] });
		if (!mappedUser || mappedUser.disabled) throw bridgeError('firebase_user_disabled', 403);
		return mappedUid;
	}

	const existingUser = await lookupFirebaseUser(config, googleToken, { email: [profile.email] });
	if (existingUser?.disabled) throw bridgeError('firebase_user_disabled', 403);
	const uid = existingUser?.localId || await createFirebaseUser(config, googleToken, profile, `sso_${subjectHash}`);
	return createSsoMapping(config, googleToken, subjectHash, uid);
}

export async function createFirebaseCustomTokenForSso(accessToken, env) {
	const profile = await getSsoProfile(accessToken, env);
	const config = serviceAccountConfig(env);
	const privateKey = await importServiceAccountKey(config);
	const emulatorMode = Boolean(env.FIREBASE_AUTH_EMULATOR_HOST);
	const googleToken = emulatorMode ? null : await createGoogleAccessToken(config, privateKey);
	const uid = await resolveFirebaseUid(profile, config, googleToken, emulatorMode);
	const userProfile = await ensureSsoUserProfile(config, googleToken, uid, profile, env);
	const isActiveAdmin = userProfile.status === 'ACTIVE' && userProfile.role === 'ADMINISTRATOR';
	if (!emulatorMode) await syncSsoRoleClaim(config, googleToken, uid, isActiveAdmin);
	if (userProfile.status !== 'ACTIVE') throw bridgeError('user_account_not_active', 403);
	const now = Math.floor(Date.now() / 1000);
	return new SignJWT({
		uid,
		...(isActiveAdmin ? { role: 'ADMINISTRATOR' } : {}),
	})
		.setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
		.setIssuer(config.email)
		.setSubject(config.email)
		.setAudience(FIREBASE_AUTH_AUDIENCE)
		.setIssuedAt(now)
		.setExpirationTime(now + 3600)
		.sign(privateKey);
}
