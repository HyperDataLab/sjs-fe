function countryDisplayName(countryCode) {
  if (typeof countryCode !== 'string' || !/^[A-Z]{2}$/.test(countryCode)) return '';
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) || countryCode;
  } catch {
    return countryCode;
  }
}

/**
 * Normalize a single OpenAlex source to the shape expected by catalog components.
 * @param {Object} raw - Raw source object from the Worker.
 * @returns {Object} Normalized journal object.
 */
export function normalizeJournalItem(raw = {}) {
  const journalId = String(raw.journal_id || raw.id || '');
  const countryCode = raw.country_code || '';
  const openAlexUrl = typeof raw.openalex_url === 'string' && raw.openalex_url.startsWith('https://openalex.org/')
    ? raw.openalex_url
    : (/^S\d+$/.test(journalId) ? `https://openalex.org/${journalId}` : '');

  return {
    id: journalId,
    journal_id: journalId,
    openalex_url: openAlexUrl,
    display_name: raw.display_name || 'Unnamed journal',
    issn: raw.issn || raw.issn_l || '',
    type: raw.type || 'journal',
    coverage: raw.coverage || '',
    is_open_access: raw.is_open_access ?? raw.is_oa ?? false,
    is_in_doaj: raw.is_in_doaj ?? false,

    // Publisher / Country
    publisher: raw.publisher_name || raw.publisher || '',
    country: raw.country_name || raw.country || countryDisplayName(countryCode),
    country_code: countryCode,

    // OpenAlex source metrics
    metric_value: raw.metric_value != null ? Number(raw.metric_value) : null,
    metric_name: raw.metric_name || '2yr mean citedness',
    metric_year: null,
    quartile: '',

    // Subject info from the source's most prominent topic
    subject_area_name: raw.subject_area_name || '',
    subject_category_name: raw.subject_category_name || '',
  };
}

/**
 * Normalize a Worker catalog response for the catalog components.
 * @param {Object} responseData - Worker response containing items and pagination.
 * @returns {{ items: Array, pagination: { page: number, limit: number, total: number } }}
 */
export function normalizeSearchResponse(responseData = {}) {
  const data = responseData.data || responseData;
  const rawItems = Array.isArray(data.items) ? data.items : [];
  const items = rawItems.map(normalizeJournalItem);
  const pagination = data.pagination || {};
  const total = pagination.total ?? data.total ?? items.length;

  return {
    items,
    pagination: {
      page: pagination.page ?? 1,
      limit: pagination.limit ?? 10,
      total: Number(total) || 0,
    },
  };
}
