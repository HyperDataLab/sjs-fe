const WORK_SELECT = [
  'id', 'doi', 'title', 'abstract_inverted_index', 'publication_year', 'publication_date',
  'type', 'primary_location', 'best_oa_location', 'cited_by_count', 'authorships',
  'open_access', 'primary_topic', 'topics', 'keywords', 'referenced_works',
].join(',');
const AUTHOR_SELECT = [
  'id', 'display_name', 'orcid', 'works_count', 'cited_by_count', 'summary_stats',
  'last_known_institutions', 'topics',
].join(',');
const TOPIC_SELECT = 'id,display_name,works_count,cited_by_count,field,subfield,domain';
const KEYWORD_SELECT = 'id,display_name,works_count,cited_by_count,topics';
const SOURCE_SELECT = [
  'id', 'display_name', 'issn_l', 'issn', 'type', 'host_organization_name', 'country_code',
  'is_oa', 'is_in_doaj', 'summary_stats', 'topics', 'works_count', 'cited_by_count',
].join(',');

function pageOptions(params, defaultLimit = 10) {
  const page = params.get('page') === null ? 1 : Number(params.get('page'));
  const limit = params.get('limit') === null ? defaultLimit : Number(params.get('limit'));
  if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100 || page * limit > 10000) {
    return null;
  }
  return { page, limit };
}

function lastId(value) {
  return typeof value === 'string' ? value.split('/').filter(Boolean).pop() ?? '' : '';
}

function entityId(value, prefix) {
  const id = lastId(value);
  return new RegExp(`^${prefix}\\d+$`).test(id) ? id : '';
}

function success(data, extra = {}) {
  return { success: true, data, ...extra };
}

function pagination(payload, page, limit) {
  const count = Number(payload?.meta?.count);
  const total = Number.isFinite(count) ? Math.min(count, 10000) : (payload?.results?.length ?? 0);
  return { page, limit, total, total_pages: Math.max(1, Math.ceil(total / limit)) };
}

function abstractText(index) {
  if (!index || typeof index !== 'object') return null;
  const words = [];
  for (const [word, positions] of Object.entries(index)) {
    for (const position of positions ?? []) words[position] = word;
  }
  return words.filter(Boolean).join(' ') || null;
}

function normalizeWork(work) {
  const id = entityId(work?.id, 'W');
  const source = work?.primary_location?.source ?? work?.best_oa_location?.source ?? null;
  const topic = work?.primary_topic ?? null;
  const topicId = entityId(topic?.id, 'T');
  const references = (Array.isArray(work?.referenced_works) ? work.referenced_works : [])
    .map((reference) => entityId(reference, 'W'))
    .filter(Boolean)
    .slice(0, 100)
    .map((referenceId) => `https://openalex.org/${referenceId}`);
  const authors = (Array.isArray(work?.authorships) ? work.authorships : [])
    .map(({ author, institutions = [] }) => ({
      id: entityId(author?.id, 'A'),
      author_id: entityId(author?.id, 'A'),
      name: author?.display_name ?? '',
      display_name: author?.display_name ?? '',
      orcid: author?.orcid ?? null,
      institutions: institutions.map((institution) => institution?.display_name).filter(Boolean),
    }))
    .filter((author) => author.name);
  return {
    id,
    article_id: id,
    openalex_id: work?.id ?? null,
    doi: work?.doi ?? null,
    title: work?.title ?? '',
    abstract: abstractText(work?.abstract_inverted_index),
    publication_year: work?.publication_year ?? null,
    publication_date: work?.publication_date ?? null,
    type: work?.type ?? '',
    is_open_access: work?.open_access?.is_oa === true,
    semantic_citation_count: Number(work?.cited_by_count) || 0,
    citation_count: Number(work?.cited_by_count) || 0,
    journal_id: entityId(source?.id, 'S') || null,
    journal_name: source?.display_name ?? null,
    publisher_name: source?.host_organization_name ?? null,
    journal: source ? { journal_id: entityId(source.id, 'S'), display_name: source.display_name, name: source.display_name } : null,
    topic_id: topicId || null,
    primary_topic: topic?.display_name ?? null,
    topic_name: topic?.display_name ?? null,
    topics: topicId && topic?.display_name ? [{ topic_id: topicId, id: topicId, display_name: topic.display_name, is_primary: true }] : [],
    subject_area: topic?.field?.display_name ? { name: topic.field.display_name } : null,
    authors,
    keywords: (Array.isArray(work?.keywords) ? work.keywords : [])
      .filter((keyword) => typeof keyword?.display_name === 'string' && keyword.display_name)
      .map((keyword) => ({
        id: lastId(keyword.id),
        keyword_id: lastId(keyword.id),
        display_name: keyword.display_name,
        score: Number(keyword.score) || null,
      })),
    references,
    reference_count: Array.isArray(work?.referenced_works) ? work.referenced_works.length : 0,
  };
}

function normalizeAuthor(author) {
  const id = entityId(author?.id, 'A');
  const institutions = Array.isArray(author?.last_known_institutions) ? author.last_known_institutions : [];
  const topics = Array.isArray(author?.topics) ? author.topics : [];
  const worksCount = Number(author?.works_count) || 0;
  const citationCount = Number(author?.cited_by_count) || 0;
  return {
    id,
    author_id: id,
    openalex_id: author?.id ?? null,
    name: author?.display_name ?? '',
    full_name: author?.display_name ?? '',
    display_name: author?.display_name ?? '',
    orcid: author?.orcid ?? null,
    works_count: worksCount,
    article_count: worksCount,
    cited_by_count: citationCount,
    citation_count: citationCount,
    h_index: Number(author?.summary_stats?.h_index) || 0,
    institution_1: institutions[0]?.display_name ?? '',
    institution_2: institutions[1]?.display_name ?? '',
    subject_areas: topics.map((item) => item?.field?.display_name ?? item?.display_name).filter(Boolean),
    topics,
  };
}

function normalizeTopic(topic) {
  const id = entityId(topic?.id, 'T');
  return {
    id,
    topic_id: id,
    openalex_id: topic?.id ?? null,
    name: topic?.display_name ?? '',
    display_name: topic?.display_name ?? '',
    works_count: Number(topic?.works_count) || 0,
    cited_by_count: Number(topic?.cited_by_count) || 0,
    field: topic?.field?.display_name ?? '',
    subfield: topic?.subfield?.display_name ?? '',
    domain: topic?.domain?.display_name ?? '',
  };
}

function normalizeKeyword(keyword) {
  const id = lastId(keyword?.id);
  return {
    id,
    keyword_id: id,
    openalex_id: keyword?.id ?? null,
    name: keyword?.display_name ?? '',
    display_name: keyword?.display_name ?? '',
    keyword: keyword?.display_name ?? '',
    works_count: Number(keyword?.works_count) || 0,
    cited_by_count: Number(keyword?.cited_by_count) || 0,
  };
}

function normalizeSource(source) {
  const id = entityId(source?.id, 'S');
  const topic = Array.isArray(source?.topics) ? source.topics[0] : null;
  return {
    id,
    journal_id: id,
    openalex_id: source?.id ?? null,
    openalex_url: id ? `https://openalex.org/${id}` : '',
    name: source?.display_name ?? '',
    display_name: source?.display_name ?? '',
    issn: source?.issn_l ?? source?.issn?.[0] ?? '',
    issn_l: source?.issn_l ?? '',
    type: source?.type ?? 'journal',
    publisher_name: source?.host_organization_name ?? '',
    country_code: source?.country_code ?? '',
    is_open_access: source?.is_oa === true,
    is_in_doaj: source?.is_in_doaj === true,
    metric_value: Number(source?.summary_stats?.['2yr_mean_citedness']) || 0,
    metric_name: '2yr mean citedness',
    metric_year: null,
    quartile: '',
    subject_area_name: topic?.field?.display_name ?? '',
    subject_category_name: topic?.subfield?.display_name ?? '',
    works_count: Number(source?.works_count) || 0,
    cited_by_count: Number(source?.cited_by_count) || 0,
  };
}

function worksFilter(params) {
  const filters = [];
  const year = params.get('publication_year') ?? params.get('year');
  if (year && /^\d{4}$/.test(year)) filters.push(`publication_year:${year}`);
  const journalId = params.get('journal_id') ?? params.get('journal');
  if (/^S\d+$/.test(journalId ?? '')) filters.push(`primary_location.source.id:${journalId}`);
  const topicId = params.get('topic_id') ?? params.get('topic');
  if (/^T\d+$/.test(topicId ?? '')) filters.push(`topics.id:${topicId}`);
  const countryCode = (params.get('country_id') ?? params.get('country') ?? '').toUpperCase();
  if (/^[A-Z]{2}$/.test(countryCode)) filters.push(`authorships.countries:${countryCode}`);
  const access = params.get('is_open_access') ?? params.get('access');
  if (['true', 'oa'].includes(access)) filters.push('open_access.is_oa:true');
  if (['false', 'closed', 'non-oa'].includes(access)) filters.push('open_access.is_oa:false');
  return filters.join(',');
}

function sortWorks(params) {
  const sortBy = params.get('sortBy') ?? params.get('sort') ?? 'cited_by_count';
  const field = sortBy === 'publication_year' || sortBy === 'year' ? 'publication_year'
    : sortBy === 'title' ? 'title' : 'cited_by_count';
  const direction = (params.get('sortOrder') ?? 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc';
  return `${field}:${direction}`;
}

function toPageData(payload, page, limit, mapper) {
  const items = (Array.isArray(payload?.results) ? payload.results : []).map(mapper);
  return { items, pagination: pagination(payload, page, limit), total: pagination(payload, page, limit).total };
}

export async function handleResearchApiRequest(url, service) {
  const path = url.pathname.replace(/\/$/, '') || '/';
  const params = url.searchParams;

  if (path === '/api/v1/articles/filter-options') {
    const [sources, topics] = await Promise.all([
      service.searchJournals({ page: 1, limit: 10, sort: 'metric' }),
      service.listEntity('topics', { page: 1, limit: 10, sort: 'works_count:desc', select: TOPIC_SELECT }),
    ]);
    return { body: success({
      years: Array.from({ length: 15 }, (_, index) => new Date().getFullYear() - index),
      journals: sources.items.map(normalizeSource),
      topics: (sourcesAndTopics(topics)).map(normalizeTopic),
    }) };
  }

  if (/^\/api\/v1\/search\//.test(path)) {
    const search = decodeURIComponent(path.slice('/api/v1/search/'.length)).trim();
    const [works, authors, sources, keywords] = await Promise.all([
      service.listEntity('works', { page: 1, limit: 5, search, sort: 'cited_by_count:desc', select: WORK_SELECT }),
      service.listEntity('authors', { page: 1, limit: 5, search, sort: 'cited_by_count:desc', select: AUTHOR_SELECT }),
      service.listEntity('sources', { page: 1, limit: 5, filter: 'type:journal', search, sort: 'summary_stats.2yr_mean_citedness:desc', select: SOURCE_SELECT }),
      service.listEntity('keywords', { page: 1, limit: 5, search, sort: 'works_count:desc', select: KEYWORD_SELECT }),
    ]);
    const items = [
      ...(sources.results ?? []).map((item) => {
        const source = normalizeSource(item);
        return { id: source.id, type: 'JOURNAL', title: source.display_name, name: source.display_name, subject_area: { name: source.subject_area_name } };
      }),
      ...(authors.results ?? []).map((item) => {
        const author = normalizeAuthor(item);
        return { id: author.id, type: 'AUTHOR', title: author.display_name, name: author.display_name, subject_area: { name: author.subject_areas[0] ?? '' } };
      }),
      ...(works.results ?? []).map((item) => {
        const work = normalizeWork(item);
        return { id: work.id, type: 'ARTICLE', title: work.title, name: work.title, authors: work.authors, journal: work.journal, subject_area: work.subject_area };
      }),
      ...(keywords.results ?? []).map((item) => {
        const keyword = normalizeKeyword(item);
        return { id: keyword.id, type: 'KEYWORD', title: keyword.display_name, name: keyword.display_name };
      }),
    ];
    return { body: success(items) };
  }

  if (path === '/api/v1/articles') {
    const paging = pageOptions(params, 10);
    if (!paging) return { status: 400, body: { success: false, message: 'Invalid paging parameters.' } };
    const search = (params.get('search') ?? '').trim();
    const payload = await service.listEntity('works', {
      page: paging.page,
      limit: paging.limit,
      search: search || undefined,
      filter: worksFilter(params),
      sort: sortWorks(params),
      select: WORK_SELECT,
    });
    const data = toPageData(payload, paging.page, paging.limit, normalizeWork);
    const openAccessCount = data.items.filter((item) => item.is_open_access).length;
    return { body: success({
      articles: data.items,
      items: data.items,
      pagination: data.pagination,
      stats: { totalArticles: data.total, openAccessCount, authorsCount: 0, topicsCount: 0 },
    }) };
  }

  const articleMatch = path.match(/^\/api\/v1\/articles\/([^/]+)$/);
  if (articleMatch) {
    const id = decodeURIComponent(articleMatch[1]);
    if (!/^W\d+$/.test(id)) return { status: 400, body: { success: false, message: 'Unsupported article ID.' } };
    const work = await service.getEntity('works', id, { select: WORK_SELECT });
    return { body: success(normalizeWork(work)) };
  }

  if (path === '/api/v1/author' || path === '/api/v1/author/leaderboard') {
    const paging = pageOptions(params, path.endsWith('/leaderboard') ? 5 : 10);
    if (!paging) return { status: 400, body: { success: false, message: 'Invalid paging parameters.' } };
    const sort = path.endsWith('/leaderboard')
      ? 'cited_by_count:desc'
      : `${params.get('sortBy') === 'works_count' ? 'works_count' : 'cited_by_count'}:${(params.get('sortOrder') ?? 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc'}`;
    const payload = await service.listEntity('authors', {
      page: paging.page,
      limit: paging.limit,
      search: (params.get('search') ?? '').trim() || undefined,
      sort,
      select: AUTHOR_SELECT,
    });
    const data = toPageData(payload, paging.page, paging.limit, normalizeAuthor);
    return { body: success(data.items, { pagination: data.pagination, total: data.total }) };
  }

  const authorBreakdown = path.match(/^\/api\/v1\/author\/([^/]+)\/areas-breakdown$/);
  const authorArticles = path.match(/^\/api\/v1\/author\/([^/]+)\/articles$/);
  const authorDetail = path.match(/^\/api\/v1\/author\/([^/]+)$/);
  if (authorBreakdown || authorArticles || authorDetail) {
    const id = decodeURIComponent((authorBreakdown ?? authorArticles ?? authorDetail)[1]);
    if (!/^A\d+$/.test(id)) return { status: 400, body: { success: false, message: 'Unsupported author ID.' } };
    if (authorArticles) {
      const paging = pageOptions(params, 10);
      if (!paging) return { status: 400, body: { success: false, message: 'Invalid paging parameters.' } };
      const payload = await service.listEntity('works', {
        page: paging.page,
        limit: paging.limit,
        filter: `authorships.author.id:${id}`,
        sort: sortWorks(params),
        select: WORK_SELECT,
      });
      const data = toPageData(payload, paging.page, paging.limit, normalizeWork);
      return { body: success(data.items, { pagination: data.pagination, total: data.total }) };
    }
    const author = await service.getEntity('authors', id, { select: AUTHOR_SELECT });
    const normalized = normalizeAuthor(author);
    if (authorBreakdown) {
      const worksCount = Math.max(1, normalized.works_count);
      const breakdown = (author.topics ?? []).map((topic) => ({
        name: topic?.field?.display_name ?? topic?.display_name ?? 'Other',
        subject_area: topic?.field?.display_name ?? topic?.display_name ?? 'Other',
        subject_area_name: topic?.field?.display_name ?? topic?.display_name ?? 'Other',
        count: Number(topic?.works_count) || 0,
        percentage: ((Number(topic?.works_count) || 0) / worksCount) * 100,
      }));
      return { body: success({ ...normalized, breakdown }) };
    }
    return { body: success(normalized) };
  }

  if (path === '/api/v1/topics') {
    const paging = pageOptions(params, 10);
    if (!paging) return { status: 400, body: { success: false, message: 'Invalid paging parameters.' } };
    const payload = await service.listEntity('topics', {
      page: paging.page, limit: paging.limit, search: (params.get('search') ?? '').trim() || undefined,
      sort: 'works_count:desc', select: TOPIC_SELECT,
    });
    const data = toPageData(payload, paging.page, paging.limit, normalizeTopic);
    return { body: success(data.items, { pagination: data.pagination, total: data.total }) };
  }

  const topicArticles = path.match(/^\/api\/v1\/topics\/([^/]+)\/articles$/);
  const topicDetail = path.match(/^\/api\/v1\/topics\/([^/]+)$/);
  if (topicArticles || topicDetail) {
    const id = decodeURIComponent((topicArticles ?? topicDetail)[1]);
    if (!/^T\d+$/.test(id)) return { status: 400, body: { success: false, message: 'Unsupported topic ID.' } };
    if (topicArticles) {
      const paging = pageOptions(params, 10);
      if (!paging) return { status: 400, body: { success: false, message: 'Invalid paging parameters.' } };
      const payload = await service.listEntity('works', {
        page: paging.page, limit: paging.limit, filter: `topics.id:${id}`, search: (params.get('search') ?? '').trim() || undefined,
        sort: sortWorks(params), select: WORK_SELECT,
      });
      const data = toPageData(payload, paging.page, paging.limit, normalizeWork);
      return { body: success({ articles: data.items, items: data.items, pagination: data.pagination }) };
    }
    const topic = await service.getEntity('topics', id, { select: TOPIC_SELECT });
    return { body: success(normalizeTopic(topic)) };
  }

  if (path === '/api/v1/keywords') {
    const paging = pageOptions(params, 10);
    if (!paging) return { status: 400, body: { success: false, message: 'Invalid paging parameters.' } };
    const payload = await service.listEntity('keywords', {
      page: paging.page, limit: paging.limit, search: (params.get('search') ?? '').trim() || undefined,
      sort: 'works_count:desc', select: KEYWORD_SELECT,
    });
    const data = toPageData(payload, paging.page, paging.limit, normalizeKeyword);
    return { body: success(data.items, { pagination: data.pagination, total: data.total }) };
  }

  const keywordArticles = path.match(/^\/api\/v1\/keywords\/([^/]+)\/articles$/);
  const keywordDetail = path.match(/^\/api\/v1\/keywords\/([^/]+)$/);
  if (keywordArticles || keywordDetail) {
    const id = decodeURIComponent((keywordArticles ?? keywordDetail)[1]);
    if (!/^[a-z0-9-]{1,120}$/i.test(id)) return { status: 400, body: { success: false, message: 'Unsupported keyword ID.' } };
    if (keywordArticles) {
      const paging = pageOptions(params, 10);
      if (!paging) return { status: 400, body: { success: false, message: 'Invalid paging parameters.' } };
      const payload = await service.listEntity('works', {
        page: paging.page, limit: paging.limit, filter: `keywords.id:${id}`, sort: sortWorks(params), select: WORK_SELECT,
      });
      const data = toPageData(payload, paging.page, paging.limit, normalizeWork);
      return { body: success({ articles: data.items, items: data.items, pagination: data.pagination }) };
    }
    const keyword = await service.getEntity('keywords', id, { select: KEYWORD_SELECT });
    return { body: success(normalizeKeyword(keyword)) };
  }

  if (path === '/api/v1/subject-areas' || path === '/api/v1/subject-categories' || path === '/api/v1/catalog/subject-categories') {
    const isFields = path.endsWith('/subject-areas');
    const entity = isFields ? 'fields' : 'subfields';
    const prefix = isFields ? 'F' : 'S';
    const fieldId = params.get('subject_area_id') ?? params.get('field_id');
    const payload = await service.listEntity(entity, {
      page: 1,
      limit: 100,
      filter: !isFields && /^F\d+$/.test(fieldId ?? '') ? `field.id:${fieldId}` : undefined,
      sort: 'display_name:asc',
      select: 'id,display_name,field',
    });
    const items = (payload.results ?? []).map((item) => ({
      id: entityId(item.id, prefix),
      subject_area_id: entityId(item.id, prefix),
      subject_category_id: entityId(item.id, prefix),
      display_name: item.display_name ?? '',
      name: item.display_name ?? '',
      field_id: isFields ? undefined : entityId(item.field?.id, 'F'),
    })).filter((item) => item.id);
    return { body: success(items) };
  }

  if (path === '/api/v1/journal' || path === '/api/v1/journals') {
    const paging = pageOptions(params, 10);
    if (!paging) return { status: 400, body: { success: false, message: 'Invalid paging parameters.' } };
    const fieldIds = (params.get('subject_area_ids') ?? '').split(',').filter((id) => /^F\d+$/.test(id));
    const categoryIds = (params.get('subject_category_ids') ?? '').split(',').filter((id) => /^S\d+$/.test(id));
    const countryCode = (params.get('country_code') ?? '').toUpperCase();
    const result = await service.searchJournals({
      search: (params.get('search') ?? '').trim(), page: paging.page, limit: paging.limit,
      sort: params.get('sort') === 'name' ? 'name' : 'metric', fieldIds, subfieldIds: categoryIds,
      countryCode: /^[A-Z]{2}$/.test(countryCode) ? countryCode : undefined,
      isOpenAccess: params.has('is_open_access') ? params.get('is_open_access') === 'true' : undefined,
      isInDoaj: params.has('is_in_doaj') ? params.get('is_in_doaj') === 'true' : undefined,
    });
    const items = result.items.map((item) => ({
      ...item,
      journal_id: item.id,
      name: item.display_name,
    }));
    return { body: success({ items, journals: items, pagination: result.pagination, total: result.pagination.total }) };
  }

  const journalDetail = path.match(/^\/api\/v1\/journal\/([^/]+)$/);
  const journalRankings = path.match(/^\/api\/v1\/catalog\/journals\/([^/]+)\/rankings$/);
  if (journalDetail || journalRankings) {
    const id = decodeURIComponent((journalDetail ?? journalRankings)[1]);
    if (!/^S\d+$/.test(id)) return { status: 400, body: { success: false, message: 'Unsupported journal ID.' } };
    const source = await service.getEntity('sources', id, { select: SOURCE_SELECT });
    const normalized = normalizeSource(source);
    return { body: success(journalRankings ? {
      journal_id: id,
      current_metric: normalized.metric_value,
      metric_name: normalized.metric_name,
      rankings: [],
      source: 'openalex',
    } : normalized) };
  }

  if (path === '/api/v1/catalog/volumes' || path === '/api/v1/catalog/issues') {
    return { body: success([]) };
  }

  if (path === '/api/v1/statistics/publication-trends') {
    const currentYear = new Date().getFullYear();
    const fromYear = Number(params.get('fromYear')) || currentYear - 4;
    const toYear = Number(params.get('toYear')) || currentYear;
    if (fromYear < 1900 || toYear < fromYear || toYear > currentYear + 1 || toYear - fromYear > 50) {
      return { status: 400, body: { success: false, message: 'Invalid year range.' } };
    }
    const result = await service.groupWorks({
      filter: `from_publication_date:${fromYear}-01-01,to_publication_date:${toYear}-12-31`,
      groupBy: 'publication_year',
      limit: 100,
    });
    const data = result.groups.map((item) => ({ year: Number(item.key), totalPublications: Number(item.count) || 0 }))
      .filter((item) => Number.isInteger(item.year)).sort((left, right) => left.year - right.year);
    return { body: success(data) };
  }

  if (path === '/api/v1/dashboard/trending-keywords') {
    const paging = pageOptions(new URLSearchParams({ page: '1', limit: String(Math.min(Number(params.get('limit')) || 10, 100)) }), 10);
    const payload = await service.listEntity('keywords', { page: paging.page, limit: paging.limit, sort: 'works_count:desc', select: KEYWORD_SELECT });
    const labels = (payload.results ?? []).map((item) => item.display_name ?? '');
    const data = (payload.results ?? []).map((item) => Number(item.works_count) || 0);
    return { body: success({ labels, datasets: [{ label: 'Works', data }], data: labels.map((label, index) => ({ label, count: data[index] })) }) };
  }

  if (path === '/api/v1/zones/countries/stats') {
    const yearFilter = yearRangeFilter(params);
    const result = await service.groupWorks({
      filter: yearFilter,
      groupBy: 'authorships.countries',
      limit: 100,
    });
    const countries = await service.listCountries();
    const names = new Map(countries.map((country) => [country.zone_id, country.name]));
    const data = result.groups.map((item) => ({
      country_code: item.key,
      country_id: item.key,
      country_name: names.get(item.key) ?? item.key_display_name ?? item.key,
      name: names.get(item.key) ?? item.key_display_name ?? item.key,
      total_publications: Number(item.count) || 0,
      publication_count: Number(item.count) || 0,
    }));
    return { body: success(data, { pagination: { page: 1, limit: 100, total: data.length, total_pages: 1 } }) };
  }

  if (path === '/api/v1/zones/regions/stats') {
    const result = await service.groupWorks({
      filter: yearRangeFilter(params),
      groupBy: 'authorships.institutions.continent',
      limit: 100,
    });
    return { body: success(result.groups.map((item) => ({
      region: item.key_display_name ?? item.key,
      region_name: item.key_display_name ?? item.key,
      total_publications: Number(item.count) || 0,
      publication_count: Number(item.count) || 0,
    }))) };
  }

  const countryRegions = path.match(/^\/api\/v1\/zones\/countries\/([A-Z]{2})\/regions\/stats$/i);
  if (countryRegions) {
    const countryCode = countryRegions[1].toUpperCase();
    const result = await service.groupWorks({
      filter: `authorships.countries:${countryCode}`,
      groupBy: 'authorships.institutions.geo.region',
      limit: 100,
    });
    return { body: success({
      country: { country_code: countryCode, name: countryCode },
      regions: result.groups.map((item) => ({
        region: item.key_display_name ?? item.key,
        region_name: item.key_display_name ?? item.key,
        total_publications: Number(item.count) || 0,
        publication_count: Number(item.count) || 0,
      })),
    }) };
  }

  return null;
}

function sourcesAndTopics(payload) {
  return Array.isArray(payload?.results) ? payload.results : [];
}

function yearRangeFilter(params) {
  const fromYear = params.get('fromYear');
  const toYear = params.get('toYear');
  if (!/^\d{4}$/.test(fromYear ?? '') || !/^\d{4}$/.test(toYear ?? '')) return undefined;
  if (Number(fromYear) > Number(toYear)) return undefined;
  return `from_publication_date:${fromYear}-01-01,to_publication_date:${toYear}-12-31`;
}
