import { ScholarlySourceError } from '../scholarly-source.errors.js';
import { asInteger, fetchJson, normalizeDoi } from './provider-http.js';

const MAX_PER_PAGE = 100;
const MAX_GROUPS_PER_PAGE = 200;
const BASIC_PAGING_LIMIT = 10000;
const SEARCHABLE_ENTITIES = new Set([
  'authors',
  'countries',
  'fields',
  'institutions',
  'keywords',
  'publishers',
  'sources',
  'subfields',
  'topics',
  'works',
]);
const OPENALEX_SOURCE_FIELDS = 'id,display_name,issn_l,issn,type,host_organization_name,country_code,is_oa,is_in_doaj,summary_stats,topics';

function configurationError() {
  return new ScholarlySourceError({
    source: 'openalex',
    statusCode: 503,
    code: 'SOURCE_NOT_CONFIGURED',
    message: 'OpenAlex request configuration is incomplete.',
  });
}

function entityUrl(baseUrl, entity) {
  try {
    const url = new URL(baseUrl);
    if (url.protocol !== 'https:') throw configurationError();
    url.pathname = `${url.pathname.replace(/\/+$/, '')}/${entity}`;
    url.search = '';
    url.hash = '';
    return url;
  } catch {
    throw configurationError();
  }
}

function worksUrl(baseUrl) {
  return entityUrl(baseUrl, 'works');
}

function timeoutMilliseconds(timeoutSeconds) {
  const seconds = Number(timeoutSeconds);
  if (!Number.isFinite(seconds) || seconds <= 0) throw configurationError();
  return Math.ceil(seconds * 1000);
}

function lastOpenAlexId(value) {
  if (typeof value !== 'string') return '';
  return value.split('/').filter(Boolean).pop() || '';
}

function normalizeJournalSource(source = {}) {
  const id = lastOpenAlexId(source.id);
  const topic = Array.isArray(source.topics) ? source.topics[0] : null;
  const meanCitedness = source.summary_stats?.['2yr_mean_citedness'];

  return {
    id,
    openalex_url: /^S\d+$/.test(id) ? `https://openalex.org/${id}` : '',
    display_name: typeof source.display_name === 'string' ? source.display_name : '',
    issn: source.issn_l || (Array.isArray(source.issn) ? source.issn[0] : '') || '',
    type: typeof source.type === 'string' ? source.type : 'journal',
    publisher_name: typeof source.host_organization_name === 'string' ? source.host_organization_name : '',
    country_code: typeof source.country_code === 'string' ? source.country_code : '',
    is_open_access: source.is_oa === true,
    is_in_doaj: source.is_in_doaj === true,
    metric_value: meanCitedness !== null && meanCitedness !== undefined && Number.isFinite(Number(meanCitedness)) ? Number(meanCitedness) : null,
    metric_name: '2yr mean citedness',
    metric_year: null,
    quartile: '',
    subject_area_name: typeof topic?.field?.display_name === 'string' ? topic.field.display_name : '',
    subject_category_name: typeof topic?.subfield?.display_name === 'string' ? topic.subfield.display_name : '',
  };
}

function normalizeTaxonomyItems(payload, idPrefix) {
  const results = Array.isArray(payload?.results) ? payload.results : [];
  return results.map((item) => {
    const rawId = lastOpenAlexId(item?.id);
    const id = new RegExp(`^${idPrefix}\\d+$`).test(rawId) ? rawId : /^\d+$/.test(rawId) ? `${idPrefix}${rawId}` : '';
    if (!id || typeof item?.display_name !== 'string') return null;
    return { id, display_name: item.display_name };
  }).filter(Boolean);
}

function openAlexTaxonomyId(value, prefix) {
  const id = lastOpenAlexId(value);
  if (/^\d+$/.test(id)) return id;
  return new RegExp(`^${prefix}\\d+$`).test(id) ? id.slice(prefix.length) : '';
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

  async function fetchEntityList(entity, {
    filter,
    search,
    sort,
    groupBy,
    page = 1,
    limit = MAX_PER_PAGE,
    select,
    cursor,
  } = {}) {
    const url = entityUrl(baseUrl, entity);
    url.searchParams.set('per_page', String(Math.min(limit, groupBy ? MAX_GROUPS_PER_PAGE : MAX_PER_PAGE)));
    if (!groupBy) url.searchParams.set('page', String(page));
    if (filter) url.searchParams.set('filter', filter);
    if (search) url.searchParams.set('search', search);
    if (sort) url.searchParams.set('sort', sort);
    if (groupBy) url.searchParams.set('group_by', groupBy);
    if (groupBy && cursor) url.searchParams.set('cursor', cursor);
    if (select) url.searchParams.set('select', select);
    if (normalizedApiKey) url.searchParams.set('api_key', normalizedApiKey);
    if (normalizedEmail) url.searchParams.set('mailto', normalizedEmail);
    return fetchJson(url, 'openalex', fetchImpl, timeoutMilliseconds(timeout));
  }

  return {
    async listEntity(entity, options = {}) {
      if (!SEARCHABLE_ENTITIES.has(entity)) {
        throw new ScholarlySourceError({
          source: 'openalex',
          statusCode: 400,
          code: 'UNSUPPORTED_ENTITY',
          message: 'The requested OpenAlex entity is not supported.',
        });
      }
      return fetchEntityList(entity, options);
    },

    async getEntity(entity, id, { select } = {}) {
      if (!SEARCHABLE_ENTITIES.has(entity) || typeof id !== 'string' || !id.trim()) {
        throw new ScholarlySourceError({
          source: 'openalex',
          statusCode: 400,
          code: 'INVALID_ENTITY_ID',
          message: 'The requested OpenAlex entity ID is invalid.',
        });
      }
      const url = entityUrl(baseUrl, entity);
      url.pathname = `${url.pathname.replace(/\/+$/, '')}/${encodeURIComponent(id.trim())}`;
      if (select) url.searchParams.set('select', select);
      if (normalizedApiKey) url.searchParams.set('api_key', normalizedApiKey);
      if (normalizedEmail) url.searchParams.set('mailto', normalizedEmail);
      return fetchJson(url, 'openalex', fetchImpl, timeoutMilliseconds(timeout));
    },

    async groupWorks({ filter, search, groupBy, limit = MAX_GROUPS_PER_PAGE, cursor } = {}) {
      const payload = await fetchEntityList('works', {
        filter,
        search,
        groupBy,
        page: 1,
        limit: Math.min(limit, MAX_GROUPS_PER_PAGE),
        cursor,
      });
      return {
        groups: Array.isArray(payload?.group_by) ? payload.group_by : [],
        count: asInteger(payload?.meta?.count) ?? 0,
        nextCursor: typeof payload?.meta?.next_cursor === 'string' && payload.meta.next_cursor
          ? payload.meta.next_cursor
          : null,
      };
    },

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

    async searchJournals({ search, page = 1, limit = 10, sort = 'metric', fieldIds = [], subfieldIds = [], countryCode, isOpenAccess, isInDoaj } = {}) {
      const filters = ['type:journal'];
      const openAlexFieldIds = fieldIds.map((id) => openAlexTaxonomyId(id, 'F')).filter(Boolean);
      const openAlexSubfieldIds = subfieldIds.map((id) => openAlexTaxonomyId(id, 'S')).filter(Boolean);
      if (openAlexFieldIds.length) filters.push(`topics.field.id:${openAlexFieldIds.join('|')}`);
      if (openAlexSubfieldIds.length) filters.push(`topics.subfield.id:${openAlexSubfieldIds.join('|')}`);
      if (countryCode) filters.push(`country_code:${countryCode}`);
      if (typeof isOpenAccess === 'boolean') filters.push(`is_oa:${isOpenAccess}`);
      if (typeof isInDoaj === 'boolean') filters.push(`is_in_doaj:${isInDoaj}`);

      const payload = await fetchEntityList('sources', {
        filter: filters.join(','),
        search: typeof search === 'string' ? search.trim() : '',
        sort: sort === 'name' ? 'display_name' : 'summary_stats.2yr_mean_citedness:desc',
        page,
        limit,
        select: OPENALEX_SOURCE_FIELDS,
      });
      const results = Array.isArray(payload?.results) ? payload.results : [];
      const count = asInteger(payload?.meta?.count);
      return {
        items: results.map(normalizeJournalSource),
        pagination: { page, limit, total: Math.min(count ?? results.length, BASIC_PAGING_LIMIT) },
        source: 'openalex',
      };
    },

    async listFields() {
      const payload = await fetchEntityList('fields', { page: 1, limit: 100, sort: 'display_name', select: 'id,display_name' });
      return normalizeTaxonomyItems(payload, 'F').map(({ id, display_name }) => ({ subject_area_id: id, display_name }));
    },

    async listSubfields({ fieldId }) {
      const payload = await fetchEntityList('subfields', {
        filter: `field.id:${openAlexTaxonomyId(fieldId, 'F')}`,
        page: 1,
        limit: 100,
        sort: 'display_name',
        select: 'id,display_name',
      });
      return normalizeTaxonomyItems(payload, 'S').map(({ id, display_name }) => ({
        subject_category_id: id,
        subject_area_id: fieldId,
        display_name,
      }));
    },

    async listCountries() {
      const pageSize = 100;
      const select = 'id,display_name,country_code';
      const firstPage = await fetchEntityList('countries', { page: 1, limit: pageSize, sort: 'display_name', select });
      const count = asInteger(firstPage?.meta?.count) ?? 0;
      const pageCount = Math.min(Math.ceil(count / pageSize), 10);
      const remainingPages = await Promise.all(Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) => (
        fetchEntityList('countries', { page: index + 2, limit: pageSize, sort: 'display_name', select })
      )));
      const countries = [firstPage, ...remainingPages]
        .flatMap((payload) => Array.isArray(payload?.results) ? payload.results : [])
        .map((country) => ({
          zone_id: typeof country.country_code === 'string' ? country.country_code : lastOpenAlexId(country.id),
          name: typeof country.display_name === 'string' ? country.display_name : '',
        }))
        .filter((country) => /^[A-Z]{2}$/.test(country.zone_id) && country.name);
      return [...new Map(countries.map((country) => [country.zone_id, country])).values()];
    },
  };
}
