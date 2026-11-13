import {
	createGoogleAccessToken,
	firestoreDocumentsUrl,
	importServiceAccountKey,
	serviceAccountConfig,
} from './sso-auth.js';

const ROLES = new Set(['STUDENT', 'LECTURER', 'RESEARCHER', 'ADMINISTRATOR']);
const STATUSES = new Set(['INACTIVE', 'ACTIVE', 'BANNED']);
const USER_SORT_FIELDS = new Set(['email', 'first_name', 'last_name', 'role', 'status', 'created_at']);
const MAX_PAGE_SIZE = 100;
const MAX_USER_SCAN_PAGES = 20;

class AdminApiError extends Error {
	constructor(code, status = 500) {
		super(code);
		this.name = 'AdminApiError';
		this.code = code;
		this.status = status;
	}
}

function fail(code, status) {
	throw new AdminApiError(code, status);
}

function headersFor(request, corsHeaders) {
	const headers = new Headers(corsHeaders(request));
	headers.set('Content-Type', 'application/json; charset=utf-8');
	return headers;
}

function jsonResponse(request, corsHeaders, body, status = 200, extraHeaders = {}) {
	const headers = headersFor(request, corsHeaders);
	for (const [name, value] of Object.entries(extraHeaders)) headers.set(name, value);
	return new Response(JSON.stringify(body), { status, headers });
}

function errorResponse(request, corsHeaders, error) {
	const upstreamStatus = Number.isInteger(error?.status) && error.status >= 400 && error.status <= 599 ? error.status : null;
	const status = error instanceof AdminApiError ? error.status : upstreamStatus ?? 500;
	const code = error instanceof AdminApiError ? error.code : upstreamStatus && typeof error?.code === 'string' ? error.code : 'internal_error';
	return jsonResponse(request, corsHeaders, { success: false, code, message: code }, status);
}

function parseFirestoreValue(value) {
	if ('nullValue' in value) return null;
	if ('booleanValue' in value) return value.booleanValue;
	if ('integerValue' in value) return Number(value.integerValue);
	if ('doubleValue' in value) return Number(value.doubleValue);
	if ('stringValue' in value) return value.stringValue;
	if ('timestampValue' in value) return value.timestampValue;
	if ('referenceValue' in value) return value.referenceValue;
	if ('arrayValue' in value) return (value.arrayValue.values ?? []).map(parseFirestoreValue);
	if ('mapValue' in value) return parseFirestoreFields(value.mapValue.fields ?? {});
	return null;
}

function parseFirestoreFields(fields = {}) {
	return Object.fromEntries(Object.entries(fields).map(([name, value]) => [name, parseFirestoreValue(value)]));
}

function firestoreValue(value) {
	if (value === null || value === undefined) return { nullValue: 'NULL_VALUE' };
	if (value instanceof Date) return { timestampValue: value.toISOString() };
	if (typeof value === 'boolean') return { booleanValue: value };
	if (typeof value === 'number') {
		if (!Number.isFinite(value)) throw new AdminApiError('invalid_numeric_value', 400);
		return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
	}
	if (typeof value === 'string') return { stringValue: value };
	if (Array.isArray(value)) return { arrayValue: { values: value.map(firestoreValue) } };
	if (typeof value === 'object') return { mapValue: { fields: Object.fromEntries(Object.entries(value).map(([key, item]) => [key, firestoreValue(item)])) } };
	throw new AdminApiError('invalid_firestore_value', 400);
}

function decodeDocument(document) {
	if (!document?.name || !document.fields) return null;
	const id = document.name.split('/').at(-1);
	return { id, ...parseFirestoreFields(document.fields), _updateTime: document.updateTime };
}

function firestoreHost(hostValue, code) {
	let url;
	try {
		url = new URL(hostValue.includes('://') ? hostValue : `http://${hostValue}`);
	} catch {
		fail(code, 503);
	}
	if (!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) fail(code, 503);
	return url.origin;
}

async function createAdminContext(env) {
	if (!env.FIREBASE_PROJECT_ID) fail('firebase_not_configured', 503);
	if (env.FIREBASE_AUTH_EMULATOR_HOST && !env.FIRESTORE_EMULATOR_HOST) {
		fail('firebase_firestore_emulator_not_configured', 503);
	}
	const firestoreEmulatorOrigin = env.FIRESTORE_EMULATOR_HOST
		? firestoreHost(env.FIRESTORE_EMULATOR_HOST, 'firebase_firestore_emulator_invalid')
		: null;
	const config = { projectId: env.FIREBASE_PROJECT_ID };
	const documentsUrl = firestoreEmulatorOrigin
		? `${firestoreEmulatorOrigin}/v1/projects/${encodeURIComponent(config.projectId)}/databases/(default)/documents`
		: firestoreDocumentsUrl(config.projectId);
	if (firestoreEmulatorOrigin) return { env, config, documentsUrl, googleToken: null, emulatorOrigin: firestoreEmulatorOrigin };

	const fullConfig = serviceAccountConfig(env);
	const privateKey = await importServiceAccountKey(fullConfig);
	const googleToken = await createGoogleAccessToken(fullConfig, privateKey);
	return { env, config, documentsUrl, googleToken, emulatorOrigin: null };
}

function firestoreHeaders(ctx, json = false) {
	return {
		...(ctx.googleToken ? { Authorization: `Bearer ${ctx.googleToken}` } : {}),
		...(json ? { 'Content-Type': 'application/json' } : {}),
	};
}

async function firestoreRequest(ctx, path, options = {}) {
	let response;
	try {
		response = await fetch(`${ctx.documentsUrl}${path}`, {
			...options,
			headers: { ...firestoreHeaders(ctx, Boolean(options.body)), ...(options.headers ?? {}) },
		});
	} catch {
		fail('firebase_firestore_unavailable', 503);
	}
	const body = await response.json().catch(() => ({}));
	if (!response.ok) {
		const message = String(body?.error?.message ?? '');
		const error = new AdminApiError('firebase_firestore_unavailable', response.status >= 500 ? 503 : 500);
		error.firestoreStatus = response.status;
		error.firestoreMessage = message;
		throw error;
	}
	return body;
}

function collectionPath(collection) {
	return `/${encodeURIComponent(collection)}`;
}

function documentPath(collection, id) {
	return `${collectionPath(collection)}/${encodeURIComponent(String(id))}`;
}

function firestoreResourceName(ctx, collection, id) {
	return `projects/${encodeURIComponent(ctx.config.projectId)}/databases/(default)/documents/${collection}/${encodeURIComponent(String(id))}`;
}

async function getDocument(ctx, collection, id) {
	try {
		const result = await firestoreRequest(ctx, documentPath(collection, id));
		return decodeDocument(result);
	} catch (error) {
		if (error.firestoreStatus === 404) return null;
		throw error;
	}
}

async function createDocument(ctx, collection, id, fields) {
	const query = new URLSearchParams({ documentId: String(id) });
	return firestoreRequest(ctx, `${collectionPath(collection)}?${query}`, {
		method: 'POST',
		body: JSON.stringify({ fields: Object.fromEntries(Object.entries(fields).map(([name, value]) => [name, firestoreValue(value)])) }),
	});
}

async function patchDocument(ctx, collection, id, fields, updateFields = Object.keys(fields)) {
	const query = new URLSearchParams();
	for (const field of updateFields) query.append('updateMask.fieldPaths', field);
	const body = {
		name: firestoreResourceName(ctx, collection, id),
		fields: Object.fromEntries(Object.entries(fields).map(([name, value]) => [name, firestoreValue(value)])),
	};
	return firestoreRequest(ctx, `${documentPath(collection, id)}?${query}`, { method: 'PATCH', body: JSON.stringify(body) });
}

function documentFields(fields) {
	return Object.fromEntries(Object.entries(fields).map(([name, value]) => [name, firestoreValue(value)]));
}

function buildStructuredQuery(collection, { filters = [], orderBy, offset = 0, limit } = {}) {
	const structuredQuery = { from: [{ collectionId: collection }] };
	if (filters.length === 1) {
		const [filter] = filters;
		structuredQuery.where = {
			fieldFilter: {
				field: { fieldPath: filter.field },
				op: filter.operator ?? 'EQUAL',
				value: firestoreValue(filter.value),
			},
		};
	} else if (filters.length > 1) {
		structuredQuery.where = {
			compositeFilter: {
				op: 'AND',
				filters: filters.map((filter) => ({
					fieldFilter: {
						field: { fieldPath: filter.field },
						op: filter.operator ?? 'EQUAL',
						value: firestoreValue(filter.value),
					},
				})),
			},
		};
	}
	if (orderBy) {
		structuredQuery.orderBy = [{
			field: { fieldPath: orderBy.field },
			direction: orderBy.direction === 'asc' ? 'ASCENDING' : 'DESCENDING',
		}];
	}
	if (offset > 0) structuredQuery.offset = offset;
	if (limit) structuredQuery.limit = limit;
	return structuredQuery;
}

async function runQuery(ctx, structuredQuery) {
	const result = await firestoreRequest(ctx, ':runQuery', {
		method: 'POST',
		body: JSON.stringify({ structuredQuery }),
	});
	return Array.isArray(result) ? result.map((row) => decodeDocument(row.document)).filter(Boolean) : [];
}

async function countQuery(ctx, structuredQuery) {
	const countQuery = { ...structuredQuery };
	delete countQuery.orderBy;
	delete countQuery.offset;
	delete countQuery.limit;
	const result = await firestoreRequest(ctx, ':runAggregationQuery', {
		method: 'POST',
		body: JSON.stringify({
			structuredAggregationQuery: {
				structuredQuery: countQuery,
				aggregations: [{ count: {}, alias: 'total' }],
			},
		}),
	});
	const value = Array.isArray(result) ? result[0]?.result?.aggregateFields?.total?.integerValue : undefined;
	return Number(value ?? 0);
}

async function scanCollection(ctx, collection) {
	const items = [];
	let pageToken;
	for (let page = 0; page < MAX_USER_SCAN_PAGES; page += 1) {
		const url = new URL(`${ctx.documentsUrl}${collectionPath(collection)}`);
		url.searchParams.set('pageSize', '1000');
		if (pageToken) url.searchParams.set('pageToken', pageToken);
		const path = `${collectionPath(collection)}?${url.searchParams}`;
		const result = await firestoreRequest(ctx, path);
		items.push(...(result.documents ?? []).map(decodeDocument).filter(Boolean));
		pageToken = result.nextPageToken;
		if (!pageToken) return items;
	}
	if (pageToken) fail('admin_user_collection_too_large', 503);
	return items;
}

function parsePageAndLimit(params, defaults = {}) {
	const page = params.get('page') === null ? (defaults.page ?? 1) : Number(params.get('page'));
	const limit = params.get('limit') === null ? (defaults.limit ?? 10) : Number(params.get('limit'));
	if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > (defaults.maxLimit ?? MAX_PAGE_SIZE) || page * limit > 100000) {
		fail('invalid_pagination', 400);
	}
	return { page, limit, offset: (page - 1) * limit };
}

function pagination(total, page, limit) {
	return { total, page, limit, totalPages: Math.ceil(total / limit) };
}

function ensureObjectBody(body) {
	if (!body || typeof body !== 'object' || Array.isArray(body)) fail('invalid_json', 400);
	return body;
}

async function readJsonBody(request) {
	const text = await request.text();
	if (text.length > 32_768) fail('request_too_large', 413);
	try {
		return ensureObjectBody(JSON.parse(text));
	} catch (error) {
		if (error instanceof AdminApiError) throw error;
		fail('invalid_json', 400);
	}
}

function rejectUnknownFields(body, allowed) {
	const unknown = Object.keys(body).filter((key) => !allowed.has(key));
	if (unknown.length) {
		if (unknown.includes('password') || unknown.includes('type')) fail('sso_only_user_management', 400);
		fail('invalid_request_body', 400);
	}
}

function validEmail(email) {
	return typeof email === 'string' && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validateProfileFields(body) {
	const limits = {
		first_name: 100,
		last_name: 100,
		name: 200,
		phone: 50,
		institution: 200,
		date_of_birth: 10,
		url_image: 2048,
	};
	for (const [field, maxLength] of Object.entries(limits)) {
		if (body[field] !== undefined && (typeof body[field] !== 'string' || body[field].length > maxLength)) {
			fail('invalid_user_profile', 400);
		}
	}
	if (body.date_of_birth !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(body.date_of_birth)) fail('invalid_user_profile', 400);
	if (body.url_image) {
		let imageUrl;
		try { imageUrl = new URL(body.url_image); } catch { fail('invalid_user_profile', 400); }
		if (imageUrl.protocol !== 'https:') fail('invalid_user_profile', 400);
	}
}

function validUserId(value) {
	return typeof value === 'string' && /^[A-Za-z0-9_-]{1,128}$/.test(value);
}

function normalizeUser(user) {
	if (!user) return null;
	const { _updateTime, ...fields } = user;
	return { ...fields, id: user.id, user_id: user.user_id ?? user.id };
}

async function hashEmail(email) {
	const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(email));
	let binary = '';
	for (const byte of new Uint8Array(digest)) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function normalizeCoinPackage(item) {
	const { _updateTime, ...fields } = item;
	return {
		...fields,
		package_id: Number(fields.package_id ?? item.id),
		coin_amount: Number(fields.coin_amount ?? 0),
		bonus_coin: Number(fields.bonus_coin ?? 0),
		total_coin: Number(fields.coin_amount ?? 0) + Number(fields.bonus_coin ?? 0),
		price: fields.price === null || fields.price === undefined ? fields.price : Number(fields.price),
	};
}

function addFilters(fields) {
	return Object.entries(fields).filter(([, value]) => value !== undefined).map(([field, value]) => ({ field, value }));
}

function isoNow() {
	return new Date();
}

async function writeActivity(ctx, actor, action, details = {}) {
	const id = crypto.randomUUID();
	try {
		await createDocument(ctx, 'adminActivities', id, {
			action,
			actor_id: actor.uid,
			...details,
			created_at: isoNow(),
		});
	} catch (error) {
		console.error('Failed to record admin activity', error.code ?? 'unknown_error');
	}
}

function parseAuthCustomAttributes(value) {
	if (!value) return {};
	try {
		const parsed = JSON.parse(value);
		return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
	} catch {
		return {};
	}
}

function authEmulatorOrigin(ctx) {
	return ctx.env.FIREBASE_AUTH_EMULATOR_HOST
		? firestoreHost(ctx.env.FIREBASE_AUTH_EMULATOR_HOST, 'firebase_auth_emulator_invalid')
		: null;
}

function authApiEndpoint(ctx, action) {
	const emulatorOrigin = authEmulatorOrigin(ctx);
	if (emulatorOrigin) {
		return `${emulatorOrigin}/identitytoolkit.googleapis.com/v1/projects/${encodeURIComponent(ctx.config.projectId)}/accounts:${action}`;
	}
	return `https://identitytoolkit.googleapis.com/v1/projects/${encodeURIComponent(ctx.config.projectId)}/accounts:${action}`;
}

async function authAdminRequest(ctx, action, body) {
	let response;
	try {
		response = await fetch(authApiEndpoint(ctx, action), {
			method: 'POST',
			headers: {
				...(ctx.googleToken ? { Authorization: `Bearer ${ctx.googleToken}` } : ctx.env.FIREBASE_AUTH_EMULATOR_HOST ? { Authorization: 'Bearer owner' } : {}),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
	} catch {
		fail('firebase_auth_admin_unavailable', 503);
	}
	const result = await response.json().catch(() => ({}));
	if (!response.ok) {
		if (response.status === 404 || /USER_NOT_FOUND|user not found/i.test(result?.error?.message ?? '')) return null;
		fail('firebase_auth_admin_unavailable', 503);
	}
	return result;
}

async function lookupAuthUserByUid(ctx, uid) {
	const result = await authAdminRequest(ctx, 'lookup', { localId: [uid] });
	const user = result?.users?.[0];
	if (!user?.localId) return null;
	if (user.disabled) fail('firebase_user_disabled', 409);
	return user;
}

async function syncAdminClaim(ctx, uid, enabled) {
	const user = await lookupAuthUserByUid(ctx, uid);
	if (!user) fail('firebase_auth_user_not_found', 404);
	const claims = parseAuthCustomAttributes(user.customAttributes);
	if (enabled) claims.role = 'ADMINISTRATOR';
	else delete claims.role;
	const attributes = JSON.stringify(claims);
	if (attributes.length > 1000) fail('firebase_custom_claims_too_large', 400);
	await authAdminRequest(ctx, 'update', { localId: uid, customAttributes: attributes });
}

function getValue(fields, key, fallback = '') {
	const value = fields[key];
	return typeof value === 'string' ? value : fallback;
}

async function getUsers(ctx, params) {
	const { page, limit } = parsePageAndLimit(params, { limit: 10 });
	const search = (params.get('search') ?? '').trim().toLocaleLowerCase();
	const role = params.get('role')?.toUpperCase();
	const status = params.get('status')?.toUpperCase();
	if (search.length > 254 || (role && !ROLES.has(role)) || (status && !STATUSES.has(status))) fail('invalid_user_filter', 400);
	const sortBy = params.get('sortBy') ?? 'email';
	const sortOrder = (params.get('sortOrder') ?? 'desc').toLowerCase();
	if (!USER_SORT_FIELDS.has(sortBy) || !['asc', 'desc'].includes(sortOrder)) fail('invalid_user_sort', 400);
	const [all, pending] = await Promise.all([
		scanCollection(ctx, 'users'),
		scanCollection(ctx, 'pendingSsoProfiles'),
	]);
	const profiles = [
		...all,
		...pending.map((profile) => ({ ...profile, id: `pending_${profile.id}`, pending_profile: true })),
	];
	const filtered = profiles.filter((user) => {
		if (role && user.role !== role) return false;
		if (status && user.status !== status) return false;
		if (!search) return true;
		return [user.email, user.first_name, user.last_name, user.display_name]
			.some((value) => String(value ?? '').toLocaleLowerCase().includes(search));
	});
	filtered.sort((a, b) => {
		const left = a[sortBy] ?? '';
		const right = b[sortBy] ?? '';
		const order = String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: 'base' });
		return sortOrder === 'asc' ? order : -order;
	});
	const start = (page - 1) * limit;
	return { items: filtered.slice(start, start + limit).map(normalizeUser), pagination: pagination(filtered.length, page, limit) };
}

async function createUser(ctx, actor, body) {
	const allowed = new Set(['email', 'first_name', 'last_name', 'name', 'phone', 'institution', 'role', 'status', 'date_of_birth', 'gender', 'url_image']);
	rejectUnknownFields(body, allowed);
	const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
	if (!validEmail(email)) fail('invalid_email', 400);
	validateProfileFields(body);
	const role = body.role === undefined ? 'RESEARCHER' : String(body.role).toUpperCase();
	const status = body.status === undefined ? 'ACTIVE' : String(body.status).toUpperCase();
	if (!ROLES.has(role) || !STATUSES.has(status)) fail('invalid_user_role_or_status', 400);
	if (body.gender !== undefined && typeof body.gender !== 'boolean') fail('invalid_gender', 400);
	const pendingId = await hashEmail(email);
	const existingPending = await getDocument(ctx, 'pendingSsoProfiles', pendingId);
	if (existingPending) fail('user_profile_already_exists', 409);
	const existingUsers = await runQuery(ctx, buildStructuredQuery('users', {
		filters: [{ field: 'email', value: email }],
		limit: 1,
	}));
	if (existingUsers.length) fail('user_profile_already_exists', 409);
	const now = isoNow();
	const name = typeof body.name === 'string' && body.name.trim()
		? body.name.trim()
		: [body.first_name, body.last_name].filter((value) => typeof value === 'string' && value.trim()).map((value) => value.trim()).join(' ');
	const fields = {
		email,
		first_name: typeof body.first_name === 'string' ? body.first_name.trim() : '',
		last_name: typeof body.last_name === 'string' ? body.last_name.trim() : '',
		display_name: name,
		name,
		phone: typeof body.phone === 'string' ? body.phone.trim() : '',
		institution: typeof body.institution === 'string' ? body.institution.trim() : '',
		role,
		status,
		type: 'SSO',
		created_at: now,
		updated_at: now,
		pending_sso: true,
	};
	if (body.date_of_birth !== undefined) fields.date_of_birth = body.date_of_birth;
	if (body.gender !== undefined) fields.gender = body.gender;
	if (body.url_image !== undefined) fields.url_image = body.url_image;
	try {
		await createDocument(ctx, 'pendingSsoProfiles', pendingId, fields);
	} catch (error) {
		if (error.firestoreStatus === 409) fail('user_profile_already_exists', 409);
		throw error;
	}
	const userId = `pending_${pendingId}`;
	await writeActivity(ctx, actor, 'USER_CREATED', { target_user_id: userId });
	return normalizeUser({ id: userId, user_id: userId, ...fields });
}

async function updatePendingUser(ctx, actor, pendingId, body) {
	const allowed = new Set(['email', 'first_name', 'last_name', 'name', 'phone', 'institution', 'role', 'status', 'date_of_birth', 'gender', 'url_image']);
	rejectUnknownFields(body, allowed);
	const existing = await getDocument(ctx, 'pendingSsoProfiles', pendingId);
	if (!existing) fail('user_not_found', 404);
	validateProfileFields(body);
	if (body.email !== undefined && (!validEmail(body.email) || body.email.trim().toLowerCase() !== String(existing.email ?? '').toLowerCase())) {
		fail('email_managed_by_sso', 400);
	}
	if (body.role !== undefined && !ROLES.has(String(body.role).toUpperCase())) fail('invalid_user_role', 400);
	if (body.status !== undefined && !STATUSES.has(String(body.status).toUpperCase())) fail('invalid_user_status', 400);
	if (body.gender !== undefined && typeof body.gender !== 'boolean') fail('invalid_gender', 400);
	const updates = {};
	for (const field of ['first_name', 'last_name', 'phone', 'institution', 'date_of_birth', 'gender', 'url_image']) {
		if (body[field] !== undefined) updates[field] = body[field];
	}
	if (body.name !== undefined) updates.name = String(body.name).trim();
	if (body.role !== undefined) updates.role = String(body.role).toUpperCase();
	if (body.status !== undefined) updates.status = String(body.status).toUpperCase();
	if (body.first_name !== undefined || body.last_name !== undefined || body.name !== undefined) {
		updates.display_name = body.name !== undefined
			? String(body.name).trim()
			: [updates.first_name ?? existing.first_name, updates.last_name ?? existing.last_name].filter(Boolean).join(' ');
	}
	if (!Object.keys(updates).length) fail('no_update_fields', 400);
	updates.updated_at = isoNow();
	await patchDocument(ctx, 'pendingSsoProfiles', pendingId, updates);
	const userId = `pending_${pendingId}`;
	await writeActivity(ctx, actor, 'USER_UPDATED', { target_user_id: userId });
	return normalizeUser({ ...existing, ...updates, id: userId, user_id: userId, pending_sso: true });
}

async function updateUser(ctx, actor, uid, body) {
	const allowed = new Set(['email', 'first_name', 'last_name', 'name', 'phone', 'institution', 'role', 'status', 'date_of_birth', 'gender', 'url_image']);
	rejectUnknownFields(body, allowed);
	const existing = await getDocument(ctx, 'users', uid);
	if (!existing) fail('user_not_found', 404);
	validateProfileFields(body);
	if (body.email !== undefined && (!validEmail(body.email) || body.email.trim().toLowerCase() !== String(existing.email ?? '').toLowerCase())) {
		fail('email_managed_by_sso', 400);
	}
	if (body.role !== undefined && !ROLES.has(String(body.role).toUpperCase())) fail('invalid_user_role', 400);
	if (body.status !== undefined && !STATUSES.has(String(body.status).toUpperCase())) fail('invalid_user_status', 400);
	if (body.gender !== undefined && typeof body.gender !== 'boolean') fail('invalid_gender', 400);
	const updates = {};
	for (const field of ['first_name', 'last_name', 'phone', 'institution', 'date_of_birth', 'gender', 'url_image']) {
		if (body[field] !== undefined) updates[field] = body[field];
	}
	if (body.name !== undefined) updates.name = String(body.name).trim();
	if (body.role !== undefined) updates.role = String(body.role).toUpperCase();
	if (body.status !== undefined) updates.status = String(body.status).toUpperCase();
	if (body.first_name !== undefined || body.last_name !== undefined || body.name !== undefined) {
		updates.display_name = body.name !== undefined
			? String(body.name).trim()
			: [updates.first_name ?? existing.first_name, updates.last_name ?? existing.last_name].filter(Boolean).join(' ');
	}
	if (!Object.keys(updates).length) fail('no_update_fields', 400);
	updates.updated_at = isoNow();
	const effectiveRole = updates.role ?? existing.role;
	const effectiveStatus = updates.status ?? existing.status;
	const hasAuthorizationChange = body.role !== undefined || body.status !== undefined;
	const shouldBeAdmin = effectiveRole === 'ADMINISTRATOR' && effectiveStatus === 'ACTIVE';
	if (hasAuthorizationChange && !shouldBeAdmin) await syncAdminClaim(ctx, uid, false);
	await patchDocument(ctx, 'users', uid, updates);
	if (hasAuthorizationChange && shouldBeAdmin) await syncAdminClaim(ctx, uid, true);
	await writeActivity(ctx, actor, 'USER_UPDATED', { target_user_id: uid });
	return normalizeUser({ ...existing, ...updates });
}

async function getAdminCoinPackages(ctx, params) {
	const { page, limit, offset } = parsePageAndLimit(params, { limit: 50 });
	const isActiveValue = params.get('isActive');
	if (isActiveValue !== null && !['true', 'false'].includes(isActiveValue)) fail('invalid_coin_package_filter', 400);
	const filters = addFilters({ is_active: isActiveValue === null ? undefined : isActiveValue === 'true' });
	const structuredQuery = buildStructuredQuery('coinPackages', {
		filters,
		orderBy: { field: 'created_at', direction: 'desc' },
		offset,
		limit,
	});
	const [items, total] = await Promise.all([
		runQuery(ctx, structuredQuery),
		countQuery(ctx, buildStructuredQuery('coinPackages', { filters })),
	]);
	return { items: items.map(normalizeCoinPackage), pagination: pagination(total, page, limit) };
}

function validateCoinPackage(body, creating) {
	const allowed = new Set(['name', 'coin_amount', 'bonus_coin', 'price', 'currency', 'is_active']);
	rejectUnknownFields(body, allowed);
	if (creating && (!body.name || body.coin_amount === undefined || body.price === undefined)) fail('invalid_coin_package', 400);
	if (body.name !== undefined && (typeof body.name !== 'string' || !body.name.trim() || body.name.length > 120)) fail('invalid_coin_package', 400);
	if (body.coin_amount !== undefined && (!Number.isSafeInteger(body.coin_amount) || body.coin_amount < 1)) fail('invalid_coin_package', 400);
	if (body.bonus_coin !== undefined && (!Number.isSafeInteger(body.bonus_coin) || body.bonus_coin < 0)) fail('invalid_coin_package', 400);
	if (body.price !== undefined && (!Number.isFinite(body.price) || body.price < 0)) fail('invalid_coin_package', 400);
	if (body.currency !== undefined && (typeof body.currency !== 'string' || body.currency.length < 1 || body.currency.length > 8)) fail('invalid_coin_package', 400);
	if (body.is_active !== undefined && typeof body.is_active !== 'boolean') fail('invalid_coin_package', 400);
}

async function createCoinPackage(ctx, actor, body) {
	validateCoinPackage(body, true);
	const now = isoNow();
	let id;
	const fields = {
		name: body.name.trim(),
		coin_amount: body.coin_amount,
		bonus_coin: body.bonus_coin ?? 0,
		price: body.price,
		currency: body.currency ?? 'VND',
		is_active: body.is_active ?? true,
		created_at: now,
		updated_at: now,
	};
	for (let attempt = 0; attempt < 4; attempt += 1) {
		id = String(Date.now() * 1000 + Math.floor(Math.random() * 1000));
		try {
			await createDocument(ctx, 'coinPackages', id, { package_id: Number(id), ...fields });
			break;
		} catch (error) {
			if (error.firestoreStatus !== 409 || attempt === 3) throw error;
		}
	}
	await writeActivity(ctx, actor, 'COIN_PACKAGE_CREATED', { target_id: id });
	return normalizeCoinPackage({ id, package_id: Number(id), ...fields });
}

async function updateCoinPackage(ctx, actor, id, body) {
	validateCoinPackage(body, false);
	const existing = await getDocument(ctx, 'coinPackages', id);
	if (!existing) fail('coin_package_not_found', 404);
	const updates = {};
	for (const field of ['name', 'coin_amount', 'bonus_coin', 'price', 'currency', 'is_active']) {
		if (body[field] !== undefined) updates[field] = field === 'name' ? body[field].trim() : body[field];
	}
	if (!Object.keys(updates).length) fail('no_update_fields', 400);
	updates.updated_at = isoNow();
	await patchDocument(ctx, 'coinPackages', id, updates);
	await writeActivity(ctx, actor, 'COIN_PACKAGE_UPDATED', { target_id: id });
	return normalizeCoinPackage({ ...existing, ...updates });
}

async function disableCoinPackage(ctx, actor, id) {
	const existing = await getDocument(ctx, 'coinPackages', id);
	if (!existing) fail('coin_package_not_found', 404);
	const updates = { is_active: false, updated_at: isoNow() };
	await patchDocument(ctx, 'coinPackages', id, updates);
	await writeActivity(ctx, actor, 'COIN_PACKAGE_DISABLED', { target_id: id });
	return normalizeCoinPackage({ ...existing, ...updates });
}

async function getAdminPayments(ctx, params) {
	const { page, limit, offset } = parsePageAndLimit(params, { limit: 50 });
	const status = params.get('status');
	const paymentMethod = params.get('paymentMethod');
	const userId = params.get('userId');
	if (status && !['pending', 'success', 'failed', 'cancelled', 'refunded'].includes(status)) fail('invalid_payment_filter', 400);
	if (paymentMethod && paymentMethod.length > 40) fail('invalid_payment_filter', 400);
	if (userId && userId.length > 128) fail('invalid_payment_filter', 400);
	const filters = addFilters({ user_id: userId ?? undefined, payment_status: status ?? undefined, payment_method: paymentMethod ?? undefined });
	const query = buildStructuredQuery('paymentTransactions', { filters, orderBy: { field: 'created_at', direction: 'desc' }, offset, limit });
	const [items, total] = await Promise.all([
		runQuery(ctx, query),
		countQuery(ctx, buildStructuredQuery('paymentTransactions', { filters })),
	]);
	const normalized = items.map(({ _updateTime, ...item }) => ({
		...item,
		transaction_id: item.transaction_id ?? item.id,
		amount: item.amount === undefined ? item.amount : Number(item.amount),
		coin_amount: Number(item.coin_amount ?? 0),
		bonus_coin: Number(item.bonus_coin ?? 0),
		total_coin: Number(item.total_coin ?? 0),
		order_code: item.order_code === undefined || item.order_code === null ? item.order_code : Number(item.order_code),
	}));
	return { items: normalized, pagination: pagination(total, page, limit) };
}

async function getAdminWalletTransactions(ctx, params) {
	const { page, limit, offset } = parsePageAndLimit(params, { limit: 50 });
	const userId = params.get('userId');
	const type = params.get('type');
	if (userId && userId.length > 128) fail('invalid_wallet_filter', 400);
	if (type && !['deposit', 'spend', 'refund', 'admin_adjust'].includes(type)) fail('invalid_wallet_filter', 400);
	const filters = addFilters({ user_id: userId ?? undefined, type: type ?? undefined });
	const query = buildStructuredQuery('walletTransactions', { filters, orderBy: { field: 'created_at', direction: 'desc' }, offset, limit });
	const [items, total] = await Promise.all([
		runQuery(ctx, query),
		countQuery(ctx, buildStructuredQuery('walletTransactions', { filters })),
	]);
	return {
		items: items.map(({ _updateTime, ...item }) => ({
			...item,
			wallet_transaction_id: item.wallet_transaction_id ?? item.id,
			amount: Number(item.amount ?? 0),
			balance_before: Number(item.balance_before ?? 0),
			balance_after: Number(item.balance_after ?? 0),
		})),
		pagination: pagination(total, page, limit),
	};
}

function isFirestoreConflict(error) {
	return error.firestoreStatus === 409 || (error.firestoreStatus === 400 && /FAILED_PRECONDITION|precondition|already exists/i.test(error.firestoreMessage ?? ''));
}

async function adjustWallet(ctx, actor, userId, body) {
	rejectUnknownFields(body, new Set(['amount', 'description']));
	if (!Number.isSafeInteger(body.amount) || body.amount === 0 || Math.abs(body.amount) > 1_000_000_000) fail('invalid_wallet_adjustment', 400);
	if (body.description !== undefined && (typeof body.description !== 'string' || body.description.length > 500)) fail('invalid_wallet_adjustment', 400);
	const user = await getDocument(ctx, 'users', userId);
	if (!user) fail('user_not_found', 404);
	const transactionId = crypto.randomUUID();
	for (let attempt = 0; attempt < 4; attempt += 1) {
		const current = await getDocument(ctx, 'wallets', userId);
		const now = isoNow();
		const walletId = current?.wallet_id ?? crypto.randomUUID();
		const before = Number(current?.balance ?? 0);
		const after = before + body.amount;
		if (!Number.isSafeInteger(after) || after < 0) fail('insufficient_wallet_balance', 409);
		const wallet = {
			wallet_id: walletId,
			user_id: userId,
			balance: after,
			total_deposit: Number(current?.total_deposit ?? 0),
			total_spent: Number(current?.total_spent ?? 0),
			created_at: current?.created_at ?? now,
			updated_at: now,
		};
		const transaction = {
			wallet_transaction_id: transactionId,
			wallet_id: walletId,
			user_id: userId,
			type: 'admin_adjust',
			amount: body.amount,
			balance_before: before,
			balance_after: after,
			payment_transaction_id: null,
			description: body.description?.trim() || null,
			email: user.email ?? '',
			created_at: now,
		};
		const writes = [
			{
				update: {
					name: firestoreResourceName(ctx, 'wallets', userId),
					fields: documentFields(wallet),
				},
				currentDocument: current ? { updateTime: current._updateTime } : { exists: false },
			},
			{
				update: {
					name: firestoreResourceName(ctx, 'walletTransactions', transactionId),
					fields: documentFields(transaction),
				},
				currentDocument: { exists: false },
			},
		];
		try {
			await firestoreRequest(ctx, ':commit', { method: 'POST', body: JSON.stringify({ writes }) });
			await writeActivity(ctx, actor, 'WALLET_ADJUSTED', { target_user_id: userId });
			return { wallet, transaction };
		} catch (error) {
			if (!isFirestoreConflict(error) || attempt === 3) {
				if (isFirestoreConflict(error)) fail('wallet_adjustment_conflict', 409);
				throw error;
			}
		}
	}
	fail('wallet_adjustment_conflict', 409);
}

async function addQueryWithPagination(ctx, collection, params, defaults = {}) {
	const { page, limit, offset } = parsePageAndLimit(params, defaults);
	const query = buildStructuredQuery(collection, {
		orderBy: { field: 'created_at', direction: 'desc' },
		offset,
		limit,
	});
	const [items, total] = await Promise.all([runQuery(ctx, query), countQuery(ctx, buildStructuredQuery(collection))]);
	return { items: items.map(({ _updateTime, ...item }) => item), pagination: pagination(total, page, limit) };
}

async function handleMatchedRoute(request, ctx, actor, path, params, json, corsHeaders) {
	const method = request.method;
	if (path === '/coin-packages' && method === 'GET') {
		const result = await getAdminCoinPackages(ctx, params);
		return json({ success: true, code: 'GET_ADMIN_COIN_PACKAGES_SUCCESS', message: 'Lay danh sach goi coin cho admin thanh cong', data: result.items, pagination: result.pagination });
	}
	if (path === '/coin-packages' && method === 'POST') {
		const result = await createCoinPackage(ctx, actor, await readJsonBody(request));
		return json({ success: true, code: 'CREATE_COIN_PACKAGE_SUCCESS', message: 'Tao goi coin thanh cong', data: result }, 201);
	}
	const coinPackagePath = path.match(/^\/coin-packages\/(\d+)$/);
	if (coinPackagePath && method === 'PUT') {
		const result = await updateCoinPackage(ctx, actor, coinPackagePath[1], await readJsonBody(request));
		return json({ success: true, code: 'UPDATE_COIN_PACKAGE_SUCCESS', message: 'Cap nhat goi coin thanh cong', data: result });
	}
	if (coinPackagePath && method === 'DELETE') {
		const result = await disableCoinPackage(ctx, actor, coinPackagePath[1]);
		return json({ success: true, code: 'DELETE_COIN_PACKAGE_SUCCESS', message: 'Vo hieu hoa goi coin thanh cong', data: result });
	}
	if (path === '/payments' && method === 'GET') {
		const result = await getAdminPayments(ctx, params);
		return json({ success: true, code: 'GET_ADMIN_PAYMENTS_SUCCESS', message: 'Lay danh sach giao dich thanh toan thanh cong', data: result.items, pagination: result.pagination });
	}
	if (path === '/wallet-transactions' && method === 'GET') {
		const result = await getAdminWalletTransactions(ctx, params);
		return json({ success: true, code: 'GET_ADMIN_WALLET_TRANSACTIONS_SUCCESS', message: 'Lay danh sach lich su giao dich coin thanh cong', data: result.items, pagination: result.pagination });
	}
	const walletPath = path.match(/^\/wallets\/([^/]+)\/adjust$/);
	if (walletPath && method === 'POST') {
		let userId;
		try { userId = decodeURIComponent(walletPath[1]); } catch { fail('invalid_user_id', 400); }
		if (!validUserId(userId)) fail('invalid_user_id', 400);
		const result = await adjustWallet(ctx, actor, userId, await readJsonBody(request));
		return json({ success: true, code: 'ADJUST_WALLET_SUCCESS', message: 'Dieu chinh coin thu cong thanh cong', data: result });
	}
	if (path === '/dashboard/summary' && method === 'GET') {
		const count = await countQuery(ctx, buildStructuredQuery('users', { filters: [{ field: 'status', value: 'ACTIVE' }] }));
		return json({ success: true, code: 'GET_SUMMARY_SUCCESS', message: 'Lay so lieu thong ke tong quan thanh cong', data: {
			total_journals: 0,
			journal_growth: 0,
			total_articles: 0,
			article_growth: 0,
			pending_reviews: 0,
			active_users: count,
		} });
	}
	if (path === '/dashboard/publication-trends' && method === 'GET') {
		const year = params.get('year') === null ? new Date().getFullYear() : Number(params.get('year'));
		const limit = params.get('limit') === null ? 5 : Number(params.get('limit'));
		if (!Number.isInteger(year) || year < 1900 || year > 3000 || !Number.isInteger(limit) || limit < 1 || limit > 20) fail('invalid_publication_trends_filter', 400);
		return json({ success: true, code: 'GET_PUBLICATION_TRENDS_SUCCESS', message: 'Lay du lieu xu huong xuat ban thanh cong', data: {
			target_year: year,
			items: Array.from({ length: limit }, (_, index) => ({ year: year - limit + index + 1, manuscripts: 0, published: 0 })),
		} });
	}
	if (path === '/dashboard/volume-issue-status' && method === 'GET') {
		const { page, limit } = parsePageAndLimit(params, { limit: 10 });
		return json({ success: true, code: 'GET_VOLUME_ISSUE_STATUS_SUCCESS', message: 'Lay danh sach Volume & Issue Status thanh cong', data: [], pagination: pagination(0, page, limit) });
	}
	if (path === '/dashboard/volume-issue-status/export' && method === 'GET') {
		const headers = new Headers(corsHeaders(request));
		headers.set('Content-Type', 'text/csv; charset=utf-8');
		headers.set('Content-Disposition', 'attachment; filename="volume_issue_status.csv"');
		return new Response('volume_id,volume_number,publication_year,journal_name,total_issues,status,progress\n', { status: 200, headers });
	}
	if (path === '/dashboard/recent-activities' && method === 'GET') {
		const result = await addQueryWithPagination(ctx, 'adminActivities', params, { limit: 10 });
		return json({ success: true, code: 'GET_RECENT_ACTIVITIES_SUCCESS', message: 'Lay danh sach hoat dong gan day thanh cong', data: result.items, pagination: result.pagination });
	}
	if (path === '/users' && method === 'GET') {
		const result = await getUsers(ctx, params);
		return json({ success: true, data: result.items, pagination: result.pagination });
	}
	if (path === '/users' && method === 'POST') {
		const result = await createUser(ctx, actor, await readJsonBody(request));
		return json({ success: true, data: result }, 201);
	}
	const userPath = path.match(/^\/users\/([^/]+)$/);
	if (userPath) {
		let uid;
		try { uid = decodeURIComponent(userPath[1]); } catch { fail('invalid_user_id', 400); }
		if (!validUserId(uid)) fail('invalid_user_id', 400);
		if (method === 'GET') {
			const isPending = uid.startsWith('pending_');
			const user = await getDocument(ctx, isPending ? 'pendingSsoProfiles' : 'users', isPending ? uid.slice('pending_'.length) : uid);
			if (!user) fail('user_not_found', 404);
			if (isPending) {
				user.id = uid;
				user.user_id = uid;
				user.pending_sso = true;
			}
			return json({ success: true, data: normalizeUser(user) });
		}
		if (method === 'PUT') {
			const body = await readJsonBody(request);
			const result = uid.startsWith('pending_')
				? await updatePendingUser(ctx, actor, uid.slice('pending_'.length), body)
				: await updateUser(ctx, actor, uid, body);
			return json({ success: true, data: result });
		}
	}
	const journalPath = path.match(/^\/repositories\/journals\/([^/]+)\/summary$/);
	if (journalPath && method === 'GET') {
		return json({ success: true, message: 'Lay du lieu tong quan kho luu tru thanh cong', data: {
			total_volumes: 0,
			active_issues: 0,
			total_publications: 0,
			next_release: null,
		} });
	}
	const knownPath = [
		'/coin-packages', '/payments', '/wallet-transactions', '/dashboard/summary',
		'/dashboard/publication-trends', '/dashboard/volume-issue-status',
		'/dashboard/volume-issue-status/export', '/dashboard/recent-activities', '/users',
	].includes(path) || coinPackagePath || walletPath || userPath || journalPath;
	return json({ success: false, code: knownPath ? 'method_not_allowed' : 'not_found', message: knownPath ? 'method_not_allowed' : 'not_found' }, knownPath ? 405 : 404);
}

export async function handleAdminApiRequest(request, env, actor, corsHeaders) {
	const prefix = '/api/v1/admin';
	const path = new URL(request.url).pathname.slice(prefix.length) || '/';
	const params = new URL(request.url).searchParams;
	const json = (body, status = 200, extraHeaders = {}) => jsonResponse(request, corsHeaders, body, status, extraHeaders);
	try {
		const ctx = await createAdminContext(env);
		return await handleMatchedRoute(request, ctx, actor, path, params, json, corsHeaders);
	} catch (error) {
		return errorResponse(request, corsHeaders, error);
	}
}
