import { FirebaseCertificateError, verifyFirebaseIdToken } from './firebase-auth.js';
import { ScholarlySourceError } from './research-sources/scholarly-source.errors.js';
import { createResearchSourceService } from './research-sources/research-sources.service.js';

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };

function allowedOrigins(env) {
  return new Set((env.ALLOWED_ORIGINS ?? '').split(',').map((origin) => origin.trim()).filter(Boolean));
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin');
  const headers = new Headers({ Vary: 'Origin' });
  if (origin && allowedOrigins(env).has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    if (request.method === 'OPTIONS') headers.set('Access-Control-Max-Age', '86400');
  }
  return headers;
}

function jsonResponse(request, env, body, status = 200, extraHeaders = {}) {
  const headers = corsHeaders(request, env);
  for (const [name, value] of Object.entries(JSON_HEADERS)) headers.set(name, value);
  for (const [name, value] of Object.entries(extraHeaders)) if (value) headers.set(name, value);
  return new Response(JSON.stringify(body), { status, headers });
}

function bearerToken(request) {
  const match = (request.headers.get('Authorization') ?? '').match(/^Bearer\s+([^\s]+)$/i);
  return match?.[1] ?? null;
}

async function verifyEmulatorIdToken(token, env) {
  let emulatorUrl;
  try {
    emulatorUrl = new URL(env.FIREBASE_AUTH_EMULATOR_HOST);
  } catch {
    throw new FirebaseCertificateError('Firebase Auth Emulator URL is invalid');
  }
  if (!['localhost', '127.0.0.1', '[::1]'].includes(emulatorUrl.hostname)) {
    throw new FirebaseCertificateError('Firebase Auth Emulator must use a loopback URL');
  }

  const lookupUrl = new URL('/identitytoolkit.googleapis.com/v1/accounts:lookup', emulatorUrl);
  lookupUrl.searchParams.set('key', env.FIREBASE_API_KEY || 'demo-api-key');
  let response;
  try {
    response = await fetch(lookupUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
    });
  } catch {
    throw new FirebaseCertificateError('Firebase Auth Emulator is unavailable');
  }
  if (!response.ok) throw new Error('Invalid Firebase Auth Emulator token');
  const payload = await response.json();
  const user = payload?.users?.[0];
  if (typeof user?.localId !== 'string' || !user.localId) throw new Error('Invalid Firebase Auth Emulator token');
  return { uid: user.localId, email: typeof user.email === 'string' ? user.email : undefined };
}

async function authenticate(request, env) {
  const token = bearerToken(request);
  if (!token) return { response: jsonResponse(request, env, { error: 'unauthorized' }, 401) };
  if (env.FIREBASE_AUTH_EMULATOR_HOST) {
    try {
      return { user: await verifyEmulatorIdToken(token, env) };
    } catch (error) {
      const status = error instanceof FirebaseCertificateError ? 503 : 401;
      return { response: jsonResponse(request, env, { error: status === 503 ? 'firebase_auth_unavailable' : 'unauthorized' }, status) };
    }
  }
  if (!env.FIREBASE_PROJECT_ID) return { response: jsonResponse(request, env, { error: 'firebase_not_configured' }, 503) };
  try {
    return { user: await verifyFirebaseIdToken(token, env.FIREBASE_PROJECT_ID) };
  } catch (error) {
    const status = error instanceof FirebaseCertificateError ? 503 : 401;
    return { response: jsonResponse(request, env, { error: status === 503 ? 'firebase_auth_unavailable' : 'unauthorized' }, status) };
  }
}

function parseLimit(value, fallback = 100) {
  const limit = value === null || value === undefined || value === '' ? fallback : Number(value);
  return Number.isInteger(limit) && limit >= 1 && limit <= 100 ? limit : null;
}

function parsePage(value) {
  const page = value === null || value === '' ? 1 : Number(value);
  return Number.isSafeInteger(page) && page >= 1 ? page : null;
}

function parseOpenAlexIdList(value, prefix) {
  if (value === null || value === '') return [];
  const ids = value.split(',').map((id) => id.trim()).filter(Boolean);
  if (ids.length > 5 || ids.some((id) => !new RegExp(`^${prefix}\\d+$`).test(id))) return null;
  return [...new Set(ids)];
}

function parseOptionalBoolean(value) {
  if (value === null) return undefined;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return null;
}

function summarizeWorks(works) {
  const years = new Map();
  const venues = new Map();
  let citationCount = 0;
  for (const work of works) {
    if (Number.isInteger(work.publicationYear)) years.set(work.publicationYear, (years.get(work.publicationYear) ?? 0) + 1);
    if (work.venue) venues.set(work.venue, (venues.get(work.venue) ?? 0) + 1);
    citationCount += work.citationCount || 0;
  }
  return {
    workCount: works.length,
    citationCount,
    byYear: [...years].sort(([a], [b]) => a - b).map(([year, count]) => ({ year, count })),
    topVenues: [...venues].sort(([, a], [, b]) => b - a).slice(0, 8).map(([name, count]) => ({ name, count })),
  };
}

async function handleRequest(request, env) {
  const origin = request.headers.get('Origin');
  if (origin && !allowedOrigins(env).has(origin)) return jsonResponse(request, env, { error: 'origin_not_allowed' }, 403);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(request, env) });

  const url = new URL(request.url);
  if (url.pathname === '/' && request.method === 'GET') {
    return new Response('SJS scholarly research API', {
      headers: { ...Object.fromEntries(corsHeaders(request, env)), 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  if (url.pathname === '/health' && request.method === 'GET') return jsonResponse(request, env, { status: 'ok' });

  const service = createResearchSourceService({ env });
  const catalogCacheHeaders = { 'Cache-Control': 'public, max-age=300' };
  if (url.pathname === '/api/v1/catalog/fields' && request.method === 'GET') {
    return jsonResponse(request, env, { source: 'openalex', items: await service.listFields() }, 200, catalogCacheHeaders);
  }
  if (url.pathname === '/api/v1/catalog/subfields' && request.method === 'GET') {
    const fieldId = (url.searchParams.get('field_id') ?? '').trim();
    if (!/^F\d+$/.test(fieldId)) return jsonResponse(request, env, { error: 'invalid_catalog_filter' }, 400);
    return jsonResponse(request, env, { source: 'openalex', items: await service.listSubfields({ fieldId }) }, 200, catalogCacheHeaders);
  }
  if (url.pathname === '/api/v1/catalog/countries' && request.method === 'GET') {
    return jsonResponse(request, env, { source: 'openalex', items: await service.listCountries() }, 200, catalogCacheHeaders);
  }
  if (url.pathname === '/api/v1/catalog/journals' && request.method === 'GET') {
    const search = (url.searchParams.get('search') ?? '').trim();
    const page = parsePage(url.searchParams.get('page'));
    const limit = parseLimit(url.searchParams.get('limit'), 10);
    const sort = url.searchParams.get('sort') ?? 'metric';
    const fieldIds = parseOpenAlexIdList(url.searchParams.get('field_ids'), 'F');
    const subfieldIds = parseOpenAlexIdList(url.searchParams.get('subfield_ids'), 'S');
    const countryCode = (url.searchParams.get('country_code') ?? '').trim().toUpperCase();
    const isOpenAccess = parseOptionalBoolean(url.searchParams.get('is_open_access'));
    const isInDoaj = parseOptionalBoolean(url.searchParams.get('is_in_doaj'));
    if (
      search.length > 300 || page === null || limit === null || page * limit > 10000 ||
      !['metric', 'name'].includes(sort) || fieldIds === null || subfieldIds === null ||
      (countryCode && !/^[A-Z]{2}$/.test(countryCode)) || isOpenAccess === null || isInDoaj === null
    ) {
      return jsonResponse(request, env, { error: 'invalid_catalog_search_parameters' }, 400);
    }
    return jsonResponse(request, env, await service.searchJournals({
      search,
      page,
      limit,
      sort,
      fieldIds,
      subfieldIds,
      countryCode: countryCode || undefined,
      isOpenAccess,
      isInDoaj,
    }), 200, catalogCacheHeaders);
  }

  if (url.pathname === '/api/v1/research/works' && request.method === 'GET') {
    const auth = await authenticate(request, env);
    if (auth.response) return auth.response;
    const source = (url.searchParams.get('source') ?? '').toLowerCase();
    const query = (url.searchParams.get('query') ?? '').trim();
    const limit = parseLimit(url.searchParams.get('limit'), 25);
    const cursor = url.searchParams.get('cursor') ?? undefined;
    if (!service.supports(source) || !query || query.length > 500 || limit === null || (cursor && cursor.length > 4096)) {
      return jsonResponse(request, env, { error: 'invalid_search_parameters' }, 400);
    }
    return jsonResponse(request, env, { source, query, ...(await service.searchWorks({ source, query, limit, cursor })) });
  }

  if (url.pathname === '/api/v1/research/analyze' && request.method === 'POST') {
    const auth = await authenticate(request, env);
    if (auth.response) return auth.response;
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(request, env, { error: 'invalid_json' }, 400);
    }
    const query = typeof body?.query === 'string' ? body.query.trim() : '';
    const sources = Array.isArray(body?.sources) ? [...new Set(body.sources.map((source) => String(source).toLowerCase()))] : ['openalex', 'crossref'];
    const limit = parseLimit(body?.limit);
    if (!query || query.length > 500 || limit === null || sources.length === 0 || sources.length > 5 || sources.some((source) => !service.supports(source))) {
      return jsonResponse(request, env, { error: 'invalid_analysis_parameters' }, 400);
    }
    const summaries = await Promise.all(sources.map(async (source) => {
      const { works } = await service.searchWorks({ source, query, limit });
      return [source, summarizeWorks(works)];
    }));
    return jsonResponse(request, env, {
      query,
      totalWorks: summaries.reduce((total, [, summary]) => total + summary.workCount, 0),
      sources: Object.fromEntries(summaries),
      analyzedAt: new Date().toISOString(),
    });
  }

  if (url.pathname.startsWith('/api/v1/research/') || url.pathname.startsWith('/api/v1/catalog/')) {
    return jsonResponse(request, env, { error: 'method_not_allowed' }, 405);
  }
  return jsonResponse(request, env, { error: 'not_found' }, 404);
}

function sourceErrorResponse(request, env, error) {
  if (error instanceof ScholarlySourceError) {
    return jsonResponse(request, env, {
      error: error.code,
      message: error.message,
      source: error.source,
      upstreamStatus: error.upstreamStatus,
    }, error.statusCode, { 'Retry-After': error.retryAfter });
  }
  return jsonResponse(request, env, { error: 'internal_error' }, 500);
}

export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env);
    } catch (error) {
      return sourceErrorResponse(request, env, error);
    }
  },
};
