import { ScholarlySourceError } from '../scholarly-source.errors.js';
import { asInteger, fetchJson, normalizeDoi } from './provider-http.js';

const MAX_PER_PAGE = 100;
const BASIC_PAGING_LIMIT = 10000;

function configurationError() {
  return new ScholarlySourceError({
    source: 'openalex',
    statusCode: 503,
    code: 'SOURCE_NOT_CONFIGURED',
    message: 'OpenAlex request configuration is incomplete.',
  });
}

function worksUrl(baseUrl) {
  try {
    const url = new URL(baseUrl);
    if (!['https:', 'http:'].includes(url.protocol)) throw configurationError();
    url.pathname = `${url.pathname.replace(/\/+$/, '')}/works`;
    url.search = '';
    url.hash = '';
    return url;
  } catch {
    throw configurationError();
  }
}

function timeoutMilliseconds(timeoutSeconds) {
  const seconds = Number(timeoutSeconds);
  if (!Number.isFinite(seconds) || seconds <= 0) throw configurationError();
  return Math.ceil(seconds * 1000);
}

function normalizeWork(work) {
  const location = work.primary_location ?? work.best_oa_location ?? null;
  const venue = location?.source ?? null;
  return {
    source: 'openalex',
    sourceId: typeof work.id === 'string' ? work.id : null,
    doi: normalizeDoi(work.doi),
    title: typeof work.title === 'string' ? work.title : null,
    publicationYear: asInteger(work.publication_year),
    type: typeof work.type === 'string' ? work.type : null,
    venue: typeof venue?.display_name === 'string' ? venue.display_name : null,
    citationCount: asInteger(work.cited_by_count),
    url: location?.landing_page_url ?? work.doi ?? null,
    authors: (Array.isArray(work.authorships) ? work.authorships : [])
      .map(({ author }) => ({ name: author?.display_name ?? null, orcid: author?.orcid ?? null }))
      .filter((author) => author.name || author.orcid),
  };
}

export function createOpenAlexProvider({ apiKey = '', baseUrl, email = '', timeout, fetchImpl = globalThis.fetch } = {}) {
  const normalizedApiKey = typeof apiKey === 'string' ? apiKey.trim() : '';
  const normalizedEmail = typeof email === 'string' ? email.trim() : '';
  return {
    async searchWorks({ query, limit, cursor }) {
      const url = worksUrl(baseUrl);
      const timeoutMs = timeoutMilliseconds(timeout);
      url.searchParams.set('search', query);
      url.searchParams.set('per_page', String(Math.min(limit, MAX_PER_PAGE)));
      url.searchParams.set('select', 'id,doi,title,publication_year,type,primary_location,best_oa_location,cited_by_count,authorships');
      let page = 1;
      if (normalizedApiKey) {
        url.searchParams.set('api_key', normalizedApiKey);
        url.searchParams.set('cursor', cursor || '*');
      } else {
        page = cursor === undefined ? 1 : Number(cursor);
        if (!Number.isSafeInteger(page) || page < 1) {
          throw new ScholarlySourceError({ source: 'openalex', statusCode: 400, code: 'INVALID_CURSOR', message: 'The OpenAlex continuation cursor is invalid.' });
        }
        url.searchParams.set('page', String(page));
      }
      if (normalizedEmail) url.searchParams.set('mailto', normalizedEmail);

      const payload = await fetchJson(url, 'openalex', fetchImpl, timeoutMs);
      const results = Array.isArray(payload?.results) ? payload.results : [];
      const meta = payload?.meta ?? {};
      let nextCursor = null;
      if (normalizedApiKey) {
        nextCursor = typeof meta.next_cursor === 'string' && meta.next_cursor ? meta.next_cursor : null;
      } else {
        const count = asInteger(meta.count);
        const accessible = Math.min(count ?? 0, BASIC_PAGING_LIMIT);
        if (count !== null && (page + 1) * limit <= accessible) nextCursor = String(page + 1);
      }
      return { works: results.map(normalizeWork), nextCursor };
    },
  };
}
