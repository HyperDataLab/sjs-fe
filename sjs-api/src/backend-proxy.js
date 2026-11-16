const BACKEND_ROUTES = [
  {
    name: 'sjs-be',
    prefix: '/api/v1/upstream/sjs-be',
    baseUrlEnv: 'SJS_BE_API_BASE_URL',
  },
  {
    name: 'sjs-trending-be',
    prefix: '/api/v1/upstream/sjs-trending-be',
    baseUrlEnv: 'SJS_TRENDING_BE_API_BASE_URL',
  },
];

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

function removeHopByHopHeaders(headers) {
  const connectionHeaders = (headers.get('Connection') ?? '')
    .split(',')
    .map((header) => header.trim().toLowerCase())
    .filter(Boolean);

  for (const header of [...HOP_BY_HOP_HEADERS, ...connectionHeaders]) headers.delete(header);
  headers.delete('host');
}

function findBackendRoute(pathname) {
  return BACKEND_ROUTES.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function resolveUpstreamUrl(baseUrlValue, route, requestUrl) {
  let baseUrl;
  try {
    baseUrl = new URL(baseUrlValue);
  } catch {
    return null;
  }

  if (!['http:', 'https:'].includes(baseUrl.protocol) || baseUrl.username || baseUrl.password || baseUrl.search || baseUrl.hash) {
    return null;
  }

  const suffix = requestUrl.pathname.slice(route.prefix.length) || '/';
  baseUrl.pathname = `${baseUrl.pathname.replace(/\/+$/, '')}${suffix}`;
  baseUrl.search = requestUrl.search;
  return baseUrl;
}

function proxyError(request, env, corsHeaders, route, error, status) {
  const body = JSON.stringify({ error, backend: route.name });
  return new Response(request.method === 'HEAD' ? null : body, {
    status,
    headers: {
      ...Object.fromEntries(corsHeaders(request, env)),
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

/**
 * Forwards a namespaced Worker route to one of the existing SJS backends.
 * The backend base URL must include its API prefix, usually `/api/v1`.
 */
export async function proxyBackendRequest(request, env, corsHeaders) {
  const requestUrl = new URL(request.url);
  const route = findBackendRoute(requestUrl.pathname);
  if (!route) return null;

  const baseUrlValue = env[route.baseUrlEnv];
  if (!baseUrlValue) return proxyError(request, env, corsHeaders, route, 'upstream_not_configured', 503);

  const upstreamUrl = resolveUpstreamUrl(baseUrlValue.trim(), route, requestUrl);
  if (!upstreamUrl) return proxyError(request, env, corsHeaders, route, 'invalid_upstream_configuration', 503);

  try {
    const upstreamRequest = new Request(upstreamUrl, request);
    removeHopByHopHeaders(upstreamRequest.headers);
    const upstreamResponse = await fetch(upstreamRequest, { redirect: 'manual' });
    const headers = new Headers(upstreamResponse.headers);
    removeHopByHopHeaders(headers);

    for (const [name, value] of corsHeaders(request, env)) {
      if (name.toLowerCase() === 'vary' && headers.has(name)) {
        const varyValues = new Set(`${headers.get(name)}, ${value}`.split(',').map((item) => item.trim()).filter(Boolean));
        headers.set(name, [...varyValues].join(', '));
      } else {
        headers.set(name, value);
      }
    }

    const hasNoBody = request.method === 'HEAD' || [204, 205, 304].includes(upstreamResponse.status);
    return new Response(hasNoBody ? null : upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers,
    });
  } catch {
    return proxyError(request, env, corsHeaders, route, 'upstream_unavailable', 502);
  }
}
