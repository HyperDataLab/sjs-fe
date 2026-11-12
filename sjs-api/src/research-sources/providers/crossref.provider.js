import { asInteger, fetchJson, firstString, normalizeDoi } from './provider-http.js';

const WORKS_URL = 'https://api.crossref.org/works';
const MAX_ROWS = 100;

function publicationYear(work) {
  const dates = [work?.['published-print']?.['date-parts'], work?.['published-online']?.['date-parts'], work?.issued?.['date-parts'], work?.published?.['date-parts'], work?.created?.['date-parts']];
  return asInteger(dates.find((parts) => Array.isArray(parts?.[0]))?.[0]?.[0]);
}

function normalizeWork(work) {
  const doi = normalizeDoi(work.DOI);
  return {
    source: 'crossref',
    sourceId: doi ?? (typeof work.URL === 'string' ? work.URL : null),
    doi,
    title: firstString(work.title),
    publicationYear: publicationYear(work),
    type: typeof work.type === 'string' ? work.type : null,
    venue: firstString(work['container-title']),
    citationCount: asInteger(work['is-referenced-by-count']),
    url: typeof work.URL === 'string' ? work.URL : (doi ? `https://doi.org/${doi}` : null),
    authors: (Array.isArray(work.author) ? work.author : [])
      .map((author) => ({
        name: [author.given, author.family].filter(Boolean).join(' ').trim() || (typeof author.name === 'string' ? author.name : null),
        orcid: typeof author.ORCID === 'string' ? author.ORCID : null,
      }))
      .filter((author) => author.name || author.orcid),
  };
}

export function createCrossrefProvider({ mailto = '', fetchImpl = globalThis.fetch } = {}) {
  const normalizedMailto = typeof mailto === 'string' ? mailto.trim() : '';
  return {
    async searchWorks({ query, limit, cursor }) {
      const url = new URL(WORKS_URL);
      url.searchParams.set('query.bibliographic', query);
      url.searchParams.set('rows', String(Math.min(limit, MAX_ROWS)));
      url.searchParams.set('cursor', cursor || '*');
      url.searchParams.set('select', 'DOI,title,published-print,published-online,issued,created,type,container-title,is-referenced-by-count,URL,author');
      if (normalizedMailto) url.searchParams.set('mailto', normalizedMailto);
      const payload = await fetchJson(url, 'crossref', fetchImpl);
      const message = payload?.message ?? {};
      const items = Array.isArray(message.items) ? message.items : [];
      const nextCursor = typeof message['next-cursor'] === 'string' && message['next-cursor'] ? message['next-cursor'] : null;
      return { works: items.map(normalizeWork), nextCursor };
    },
  };
}
