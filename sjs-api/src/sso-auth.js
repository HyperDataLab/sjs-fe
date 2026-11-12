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

function serviceAccountConfig(env) {
	const email = env.FIREBASE_SERVICE_ACCOUNT_EMAIL?.trim();
	const privateKey = env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();
	if (!email || !privateKey || !env.FIREBASE_PROJECT_ID) {
		throw bridgeError('firebase_sso_bridge_not_configured');
	}
	return { email, privateKey, projectId: env.FIREBASE_PROJECT_ID };
}

async function importServiceAccountKey(config) {
	try {
		return await importPKCS8(config.privateKey, 'RS256');
	} catch {
		throw bridgeError('firebase_sso_bridge_not_configured');
	}
}

async function createGoogleAccessToken(config, privateKey) {
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

function firestoreDocumentsUrl(projectId) {
	return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents`;
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
	const now = Math.floor(Date.now() / 1000);
	return new SignJWT({
		uid,
	})
		.setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
		.setIssuer(config.email)
		.setSubject(config.email)
		.setAudience(FIREBASE_AUTH_AUDIENCE)
		.setIssuedAt(now)
		.setExpirationTime(now + 3600)
		.sign(privateKey);
}
