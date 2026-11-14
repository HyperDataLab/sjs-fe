import { ScholarlySourceError } from '../scholarly-source.errors.js';

const REQUEST_TIMEOUT_MS = 15000;

export async function fetchJson(url, source, fetchImpl = globalThis.fetch, timeoutMs = REQUEST_TIMEOUT_MS) {
  let response;
  try {
    response = await fetchImpl(url, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    const timedOut = error?.name === 'TimeoutError' || error?.name === 'AbortError';
    throw new ScholarlySourceError({
      source,
      statusCode: timedOut ? 504 : 502,
      code: timedOut ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_UNAVAILABLE',
      message: timedOut ? 'The scholarly data source did not respond in time.' : 'The scholarly data source is temporarily unavailable.',
    });
  }

  if (!response.ok) {
    const rateLimited = response.status === 429;
    let dailyBudgetExhausted = false;
    if (rateLimited && source === 'openalex') {
      try {
        const upstreamError = await response.clone().json();
        dailyBudgetExhausted = upstreamError?.error === 'Rate limit exceeded'
          && Number.isFinite(Number(upstreamError?.dailyRemainingUsd));
      } catch {
        // Fall back to the generic rate limit message when the provider body is not JSON.
      }
    }
    throw new ScholarlySourceError({
      source,
      statusCode: rateLimited ? 503 : 502,
      code: rateLimited ? 'UPSTREAM_RATE_LIMITED' : 'UPSTREAM_SOURCE_ERROR',
      message: dailyBudgetExhausted
        ? 'The OpenAlex daily API budget is exhausted. It resets at midnight UTC.'
        : rateLimited ? 'The scholarly data source is rate limiting requests. Retry later.' : 'The scholarly data source could not complete the request.',
      upstreamStatus: response.status,
      retryAfter: response.headers?.get('retry-after') ?? null,
    });
  }

  try {
    return await response.json();
  } catch {
    throw new ScholarlySourceError({ source, statusCode: 502, code: 'UPSTREAM_INVALID_RESPONSE', message: 'The scholarly data source returned an invalid response.', upstreamStatus: response.status });
  }
}

export function normalizeDoi(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  return value.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').replace(/^doi:\s*/i, '').toLowerCase();
}

export function firstString(value) {
  if (typeof value === 'string') return value.trim() || null;
  if (Array.isArray(value)) return firstString(value[0]);
  return null;
}

export function asInteger(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isSafeInteger(number) ? number : null;
}
