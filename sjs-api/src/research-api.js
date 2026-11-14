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
const INSTITUTION_SELECT = [
  'id', 'display_name', 'country_code', 'type', 'works_count', 'cited_by_count', 'homepage_url',
  'ror', 'geo', 'associated_institutions',
].join(',');
const PUBLISHER_SELECT = 'id,display_name,works_count,cited_by_count,country_codes,hierarchy_level';
// Reserve three OpenAlex requests for the other aggregates under the Workers Free 50-subrequest limit.
const PROJECT_OVERVIEW_SOURCE_PAGE_LIMIT = 45;

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

function taxonomyId(value, prefix) {
  const id = lastId(value);
  if (new RegExp(`^${prefix}\\d+$`).test(id)) return id;
  return /^\d+$/.test(id) ? `${prefix}${id}` : '';
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

function normalizeInstitution(institution) {
  const id = entityId(institution?.id, 'I');
  return {
    id,
    institution_id: id,
    openalex_id: institution?.id ?? null,
    name: institution?.display_name ?? '',
    display_name: institution?.display_name ?? '',
    country_code: institution?.country_code ?? '',
    type: institution?.type ?? '',
    works_count: Number(institution?.works_count) || 0,
    cited_by_count: Number(institution?.cited_by_count) || 0,
    homepage_url: institution?.homepage_url ?? null,
    ror: institution?.ror ?? null,
    city: institution?.geo?.city ?? '',
    region: institution?.geo?.region ?? '',
  };
}

function normalizePublisher(publisher) {
  const id = entityId(publisher?.id, 'P');
  return {
    id,
    display_name: publisher?.display_name ?? '',
    works_count: Number(publisher?.works_count) || 0,
  };
}

function pipeValues(value, pattern) {
  const values = (value ?? '').split('|').map((item) => item.trim()).filter(Boolean);
  return values.length && values.every((item) => pattern.test(item)) ? [...new Set(values)].join('|') : '';
}

function authorsFilter(params, omittedField) {
  const filters = [];
  const institutionIds = omittedField === 'institution_id' ? '' : pipeValues(params.get('institution_id'), /^I\d+$/);
  const countryCodes = omittedField === 'country_code' ? '' : pipeValues((params.get('country_code') ?? '').toUpperCase(), /^[A-Z]{2}$/);
  const hasOrcid = omittedField === 'has_orcid' ? null : params.get('has_orcid');
  if (institutionIds) filters.push(`last_known_institutions.id:${institutionIds}`);
  if (countryCodes) filters.push(`last_known_institutions.country_code:${countryCodes}`);
  if (hasOrcid === 'true' || hasOrcid === 'false') filters.push(`has_orcid:${hasOrcid}`);
  return filters.join(',');
}

function worksFilter(params, omittedField) {
  const filters = [];
  const year = pipeValues(params.get('publication_year') ?? params.get('year'), /^\d{4}$/);
  if (year && omittedField !== 'publication_year') filters.push(`publication_year:${year}`);
  const journalId = params.get('journal_id') ?? params.get('journal');
  if (/^S\d+$/.test(journalId ?? '')) filters.push(`primary_location.source.id:${journalId}`);
  const topicId = params.get('topic_id') ?? params.get('topic');
  if (/^T\d+$/.test(topicId ?? '')) filters.push(`topics.id:${topicId}`);
  const institutionIds = pipeValues(params.get('institution_id'), /^I\d+$/);
  if (institutionIds && omittedField !== 'institution_id') filters.push(`authorships.institutions.id:${institutionIds}`);
  const countryCodes = pipeValues((params.get('country_code') ?? params.get('country_id') ?? params.get('country') ?? '').toUpperCase(), /^[A-Z]{2}$/);
  if (countryCodes && omittedField !== 'country_code') filters.push(`authorships.countries:${countryCodes}`);
  const types = pipeValues(params.get('type'), /^[a-z][a-z0-9-]{0,59}$/i);
  if (types && omittedField !== 'type') filters.push(`type:${types}`);
  const access = params.get('is_open_access') ?? params.get('access');
  if (omittedField !== 'is_open_access' && ['true', 'oa'].includes(access)) filters.push('open_access.is_oa:true');
  if (omittedField !== 'is_open_access' && ['false', 'closed', 'non-oa'].includes(access)) filters.push('open_access.is_oa:false');
  return filters.join(',');
}

function institutionsFilter(params, omittedField) {
  const filters = [];
  const countryCodes = omittedField === 'country_code' ? '' : pipeValues((params.get('country_code') ?? '').toUpperCase(), /^[A-Z]{2}$/);
  const types = omittedField === 'type' ? '' : pipeValues(params.get('type'), /^[a-z][a-z0-9-]{0,59}$/i);
  if (countryCodes) filters.push(`country_code:${countryCodes}`);
  if (types) filters.push(`type:${types}`);
  return filters.join(',');
}

function sourcesFilter(params, omittedField) {
  const filters = [];
  const validTypes = new Set(['journal', 'ebook platform', 'conference', 'repository', 'book series', 'other', 'metadata']);
  const types = (params.get('type') ?? '').split('|').map((value) => value.trim().toLowerCase()).filter((value) => validTypes.has(value));
  const topicIds = pipeValues(params.get('topic_id'), /^T\d+$/);
  const publisherIds = pipeValues(params.get('publisher_id'), /^P\d+$/);
  const isOpenAccess = params.get('is_open_access');
  if (types.length && omittedField !== 'type') filters.push(`type:${[...new Set(types)].join('|')}`);
  if (topicIds && omittedField !== 'topic_id') filters.push(`topics.id:${topicIds}`);
  if (publisherIds && omittedField !== 'publisher_id') filters.push(`host_organization.id:${publisherIds}`);
  if (omittedField !== 'is_open_access' && (isOpenAccess === 'true' || isOpenAccess === 'false')) filters.push(`is_oa:${isOpenAccess}`);
  return filters.join(',');
}

function filterForFacet(entity, params, omittedField) {
  if (entity === 'authors') return authorsFilter(params, omittedField);
  if (entity === 'works') return worksFilter(params, omittedField);
  if (entity === 'institutions') return institutionsFilter(params, omittedField);
  if (entity === 'sources') return sourcesFilter(params, omittedField);
  return '';
}

async function filterLookupCandidates(entity, contextEntity, contextQuery, params, candidates, service) {
  const contexts = {
    institutions: {
      authors: { groupBy: 'last_known_institutions.id', filterField: 'last_known_institutions.id', facetKey: 'institution_id', omit: 'institution_id' },
      works: { groupBy: 'authorships.institutions.id', filterField: 'authorships.institutions.id', facetKey: 'institution_id', omit: 'institution_id' },
    },
    topics: {
      sources: { groupBy: 'topics.id', filterField: 'topics.id', facetKey: 'topic_id', omit: 'topic_id' },
    },
    publishers: {
      sources: { groupBy: 'host_organization', filterField: 'host_organization.id', facetKey: 'publisher_id', omit: 'publisher_id' },
    },
  };
  const context = contexts[entity]?.[contextEntity];
  const defaultOptions = candidates.map((item) => ({ value: item.id, label: item.display_name, count: item.works_count }));
  if (!context || candidates.length === 0) return defaultOptions;

  const contextualFilter = filterForFacet(contextEntity, params, context.omit);
  if (!contextualFilter && !contextQuery) return defaultOptions;

  const candidateIds = candidates.map((item) => item.id).filter(Boolean);
  if (candidateIds.length === 0) return [];
  const candidateFilter = `${context.filterField}:${[...new Set(candidateIds)].join('|')}`;
  const payload = await service.listEntity(contextEntity, {
    page: 1,
    limit: 200,
    search: contextQuery || undefined,
    filter: [contextualFilter, candidateFilter].filter(Boolean).join(','),
    groupBy: context.groupBy,
  });
  const counts = new Map(normalizeFacetGroups(collectFacetGroups(payload?.group_by, 0), context.facetKey).map((item) => [item.value, item.count]));
  return candidates
    .filter((item) => counts.has(item.id))
    .map((item) => ({ value: item.id, label: item.display_name, count: counts.get(item.id) ?? 0 }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 10);
}

function sortWorks(params) {
  const sortBy = params.get('sortBy') ?? params.get('sort') ?? 'cited_by_count';
  const field = sortBy === 'publication_year' || sortBy === 'year' ? 'publication_year'
    : sortBy === 'title' ? 'title' : 'cited_by_count';
  const direction = (params.get('sortOrder') ?? 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc';
  return `${field}:${direction}`;
}

function normalizeFacetGroups(groups, key) {
  const values = new Map();
  for (const group of Array.isArray(groups) ? groups : []) {
    const rawValue = String(group?.key ?? '');
    const value = rawValue.startsWith('http') ? lastId(rawValue) : rawValue;
    if (!value) continue;
    const previous = values.get(value);
    values.set(value, {
      value,
      label: String(group?.key_display_name ?? previous?.label ?? value),
      count: (previous?.count ?? 0) + (Number(group?.count) || 0),
    });
  }
  const facets = [...values.values()];
  if (key === 'publication_year') facets.sort((left, right) => Number(right.value) - Number(left.value));
  else facets.sort((left, right) => right.count - left.count);
  const limit = key === 'country_code' ? 200 : key === 'institution_id' ? 20 : key === 'topic_id' || key === 'publisher_id' ? 30 : 10;
  return facets.slice(0, limit);
}

function collectFacetGroups(groups, depth) {
  const items = Array.isArray(groups) ? groups : [];
  if (depth === 0) return items;
  return items.flatMap((group) => collectFacetGroups(group?.groups, depth - 1));
}

function projectSourceTypeGroups(groups) {
  const counts = new Map([['Journal', 0], ['Conference', 0], ['Other', 0], ['Unknown', 0]]);
  for (const group of Array.isArray(groups) ? groups : []) {
    const rawType = String(group?.key_display_name ?? group?.key ?? '').trim().toLowerCase();
    const type = rawType.split('/').pop();
    const label = type === 'journal' ? 'Journal'
      : type === 'conference' ? 'Conference'
        : !type || type === 'unknown' ? 'Unknown' : 'Other';
    counts.set(label, (counts.get(label) ?? 0) + (Number(group?.count) || 0));
  }
  return [...counts].map(([label, count]) => ({ label, count }));
}

function projectSubjectGroups(groups) {
  const counts = new Map();
  let unknownCount = 0;
  for (const group of Array.isArray(groups) ? groups : []) {
    const rawLabel = String(group?.key_display_name ?? group?.key ?? '').trim();
    const label = rawLabel.split('/').pop();
    const count = Number(group?.count) || 0;
    if (!label || label.toLowerCase() === 'unknown') {
      unknownCount += count;
      continue;
    }
    counts.set(label, (counts.get(label) ?? 0) + count);
  }

  const sorted = [...counts].map(([label, count]) => ({ label, count }))
    .sort((left, right) => right.count - left.count);
  const topSubjects = sorted.slice(0, 3);
  const otherCount = sorted.slice(3).reduce((total, subject) => total + subject.count, 0);
  return [
    ...topSubjects,
    ...(otherCount ? [{ label: 'Others', count: otherCount }] : []),
    ...(unknownCount ? [{ label: 'Unknown', count: unknownCount }] : []),
  ];
}

async function countProjectJournalSources(service, search) {
  let cursor = '*';
  let count = 0;
  let pages = 0;
  while (cursor && pages < PROJECT_OVERVIEW_SOURCE_PAGE_LIMIT) {
    const result = await service.groupWorks({
      search,
      filter: 'primary_location.source.type:journal',
      groupBy: 'primary_location.source.id',
      limit: 200,
      cursor,
    });
    count += result.groups.length;
    cursor = result.nextCursor;
    pages += 1;
  }
  return { count, complete: cursor === null };
}

async function projectOverview(search, service) {
  const currentYear = new Date().getUTCFullYear();
  const firstTrendYear = currentYear - 4;
  const [sourceTypes, yearsResult, subjectsResult, journalSources] = await Promise.all([
    service.groupWorks({ search, groupBy: 'primary_location.source.type:include_unknown', limit: 200 }),
    service.groupWorks({
      search,
      filter: `publication_year:${firstTrendYear}-${currentYear}`,
      groupBy: 'publication_year',
      limit: 10,
    }),
    service.groupWorks({ search, groupBy: 'primary_topic.field.id:include_unknown', limit: 200 }),
    countProjectJournalSources(service, search),
  ]);

  const yearCounts = new Map(yearsResult.groups.map((group) => [
    Number(group.key), Number(group.count) || 0,
  ]));
  const years = Array.from({ length: 5 }, (_, index) => {
    const year = firstTrendYear + index;
    return { year, count: yearCounts.get(year) ?? 0 };
  });
  const previousCompleteYear = yearCounts.get(currentYear - 2) ?? 0;
  const latestCompleteYear = yearCounts.get(currentYear - 1) ?? 0;
  const growthRate = previousCompleteYear > 0
    ? ((latestCompleteYear - previousCompleteYear) / previousCompleteYear) * 100
    : null;

  return {
    total_works: sourceTypes.count,
    years,
    source_types: projectSourceTypeGroups(sourceTypes.groups),
    subject_areas: projectSubjectGroups(subjectsResult.groups),
    journal_count: journalSources.count,
    journal_count_complete: journalSources.complete,
    growth_rate: growthRate,
    updated_at: new Date().toISOString(),
  };
}

async function searchFacets(entity, search, params, service) {
  const groupings = {
    authors: [
      { groupBy: 'last_known_institutions.id', facets: { institution_id: 0 }, omit: 'institution_id' },
      { groupBy: 'last_known_institutions.country_code', facets: { country_code: 0 }, omit: 'country_code' },
      { groupBy: 'has_orcid', facets: { has_orcid: 0 }, omit: 'has_orcid' },
    ],
    works: [
      { groupBy: 'publication_year', facets: { publication_year: 0 }, omit: 'publication_year' },
      { groupBy: 'type', facets: { type: 0 }, omit: 'type' },
      { groupBy: 'open_access.is_oa', facets: { is_open_access: 0 }, omit: 'is_open_access' },
      { groupBy: 'authorships.institutions.id', facets: { institution_id: 0 }, omit: 'institution_id' },
      { groupBy: 'authorships.countries', facets: { country_code: 0 }, omit: 'country_code' },
    ],
    institutions: [
      { groupBy: 'country_code', facets: { country_code: 0 }, omit: 'country_code' },
      { groupBy: 'type', facets: { type: 0 }, omit: 'type' },
    ],
    sources: [
      { groupBy: 'type', facets: { type: 0 }, omit: 'type' },
      { groupBy: 'topics.id', facets: { topic_id: 0 }, omit: 'topic_id' },
      { groupBy: 'is_oa', facets: { is_open_access: 0 }, omit: 'is_open_access' },
      { groupBy: 'host_organization', facets: { publisher_id: 0 }, omit: 'publisher_id' },
    ],
  }[entity];
  const facetGroups = Object.fromEntries([...new Set(groupings.flatMap(({ facets }) => Object.keys(facets)))].map((key) => [key, []]));
  const results = await Promise.allSettled(groupings.map(({ groupBy, omit }) => service.listEntity(entity, {
    page: 1,
    limit: 200,
    search: search || undefined,
    filter: filterForFacet(entity, params, omit) || undefined,
    groupBy,
  })));
  results.forEach((result, index) => {
    if (result.status !== 'fulfilled') return;
    for (const [key, depth] of Object.entries(groupings[index].facets)) {
      facetGroups[key].push(...collectFacetGroups(result.value?.group_by, depth));
    }
  });
  return Object.fromEntries(Object.entries(facetGroups).map(([key, groups]) => [key, normalizeFacetGroups(groups, key)]));
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

  if (path === '/api/v1/catalog/filter-values') {
    const entity = (params.get('entity') ?? '').trim().toLowerCase();
    const query = (params.get('query') ?? '').trim();
    if (!query || query.length > 200) return { status: 400, body: { success: false, message: 'A valid filter search query is required.' } };

    const catalogs = {
      institutions: { select: INSTITUTION_SELECT, normalize: normalizeInstitution },
      topics: { select: TOPIC_SELECT, normalize: normalizeTopic },
      publishers: { select: PUBLISHER_SELECT, normalize: normalizePublisher },
    };
    const catalog = catalogs[entity];
    if (!catalog) return { status: 400, body: { success: false, message: 'Unsupported filter value entity.' } };
    const contextEntity = (params.get('context_entity') ?? '').trim().toLowerCase();
    const contextQuery = (params.get('context_query') ?? '').trim();
    if (contextQuery.length > 300) return { status: 400, body: { success: false, message: 'Context query is too long.' } };

    const payload = await service.listEntity(entity, {
      page: 1,
      limit: 50,
      search: query,
      filter: entity === 'institutions' && contextEntity === 'authors' ? institutionsFilter(params) || undefined : undefined,
      sort: 'works_count:desc',
      select: catalog.select,
    });
    const candidates = (Array.isArray(payload?.results) ? payload.results : []).map(catalog.normalize)
      .filter((item) => item.id && item.display_name);
    const items = await filterLookupCandidates(entity, contextEntity, contextQuery, params, candidates, service);
    return { body: success(items) };
  }

  if (path === '/api/v1/projects/overview') {
    const search = (params.get('query') ?? '').trim();
    if (!search || search.length > 300) {
      return { status: 400, body: { success: false, message: 'A valid project search query is required.' } };
    }
    return { body: success(await projectOverview(search, service)) };
  }

  const searchMatch = path.match(/^\/api\/v1\/search(?:\/(.+))?$/);
  if (searchMatch) {
    const search = decodeURIComponent(searchMatch[1] ?? params.get('query') ?? '').trim();
    const entity = (params.get('entity') ?? '').toLowerCase();
    if (search.length > 300) return { status: 400, body: { success: false, message: 'Search query is too long.' } };

    if (entity) {
      if (!['authors', 'works', 'institutions', 'sources'].includes(entity)) {
        return { status: 400, body: { success: false, message: 'Unsupported search entity.' } };
      }
      const paging = pageOptions(params, 10);
      if (!paging) return { status: 400, body: { success: false, message: 'Invalid paging parameters.' } };
      const includeFacets = params.get('include_facets') !== '0';

      if (entity === 'authors') {
        const sortBy = params.get('sortBy') === 'cited_by_count' ? 'cited_by_count' : 'works_count';
        const sortOrder = (params.get('sortOrder') ?? 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc';
        const [payload, facets] = await Promise.all([
          service.listEntity('authors', {
          page: paging.page, limit: paging.limit, search: search || undefined,
          filter: authorsFilter(params), sort: `${sortBy}:${sortOrder}`, select: AUTHOR_SELECT,
          }),
          includeFacets ? searchFacets(entity, search, params, service) : Promise.resolve(undefined),
        ]);
        const data = toPageData(payload, paging.page, paging.limit, normalizeAuthor);
        return { body: success(data.items, { pagination: data.pagination, total: data.total, ...(facets ? { facets } : {}) }) };
      }

      if (entity === 'works') {
        const [payload, facets] = await Promise.all([
          service.listEntity('works', {
          page: paging.page, limit: paging.limit, search: search || undefined,
          filter: worksFilter(params), sort: sortWorks(params), select: WORK_SELECT,
          }),
          includeFacets ? searchFacets(entity, search, params, service) : Promise.resolve(undefined),
        ]);
        const data = toPageData(payload, paging.page, paging.limit, normalizeWork);
        return { body: success(data.items, { pagination: data.pagination, total: data.total, ...(facets ? { facets } : {}) }) };
      }

      if (entity === 'sources') {
        const sortBy = params.get('sortBy');
        const sortField = sortBy === 'cited_by_count' ? 'cited_by_count'
          : sortBy === 'metric_value' ? 'summary_stats.2yr_mean_citedness'
            : sortBy === 'display_name' ? 'display_name' : 'works_count';
        const sortOrder = (params.get('sortOrder') ?? 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc';
        const [payload, facets] = await Promise.all([
          service.listEntity('sources', {
            page: paging.page, limit: paging.limit, search: search || undefined,
            filter: sourcesFilter(params), sort: `${sortField}:${sortOrder}`, select: SOURCE_SELECT,
          }),
          includeFacets ? searchFacets(entity, search, params, service) : Promise.resolve(undefined),
        ]);
        const data = toPageData(payload, paging.page, paging.limit, normalizeSource);
        return { body: success(data.items, { pagination: data.pagination, total: data.total, ...(facets ? { facets } : {}) }) };
      }

      const sortBy = params.get('sortBy') === 'cited_by_count' ? 'cited_by_count' : 'works_count';
      const sortOrder = (params.get('sortOrder') ?? 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc';
      const [payload, facets] = await Promise.all([
        service.listEntity('institutions', {
        page: paging.page, limit: paging.limit, search: search || undefined,
        filter: institutionsFilter(params), sort: `${sortBy}:${sortOrder}`, select: INSTITUTION_SELECT,
        }),
        includeFacets ? searchFacets(entity, search, params, service) : Promise.resolve(undefined),
      ]);
      const data = toPageData(payload, paging.page, paging.limit, normalizeInstitution);
      return { body: success(data.items, { pagination: data.pagination, total: data.total, ...(facets ? { facets } : {}) }) };
    }

    if (!search) return { status: 400, body: { success: false, message: 'Search query is required.' } };
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
      filter: !isFields && /^F\d+$/.test(fieldId ?? '') ? `field.id:${fieldId.slice(1)}` : undefined,
      sort: 'display_name:asc',
      select: isFields ? 'id,display_name' : 'id,display_name,field',
    });
    const items = (payload.results ?? []).map((item) => ({
      id: taxonomyId(item.id, prefix),
      subject_area_id: taxonomyId(item.id, prefix),
      subject_category_id: taxonomyId(item.id, prefix),
      display_name: item.display_name ?? '',
      name: item.display_name ?? '',
      field_id: isFields ? undefined : taxonomyId(item.field?.id, 'F'),
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
