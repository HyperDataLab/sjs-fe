const TREND_WINDOW_YEARS = 5;
const GROUP_LIMIT = 200;

const JOURNAL_WORK_TYPES = new Set([
  'article',
  'review',
  'editorial',
  'letter',
  'erratum',
  'retraction',
  'book-review',
  'journal-article',
  'peer-review',
  'data-paper',
]);

const CONFERENCE_WORK_TYPES = new Set(['conference-paper', 'proceedings-article']);

function normalizeGroups(groups) {
  return (Array.isArray(groups) ? groups : [])
    .map((group) => ({
      label: String(group?.key_display_name ?? group?.key ?? '').trim(),
      count: Number(group?.count) || 0,
    }))
    .filter((group) => group.label && group.count > 0);
}

function publicationTypeLabel(type) {
  const normalized = String(type ?? '').toLowerCase();
  if (CONFERENCE_WORK_TYPES.has(normalized)) return 'Conference';
  return JOURNAL_WORK_TYPES.has(normalized) ? 'Journal' : 'Other';
}

export async function getProjectOverview(query, service) {
  const currentYear = new Date().getUTCFullYear();
  const firstYear = currentYear - TREND_WINDOW_YEARS + 1;
  const yearFilter = `publication_year:${firstYear}-${currentYear}`;

  const [yearResult, typeResult, subjectResult, journalResult] = await Promise.all([
    service.groupWorks({
      search: query,
      filter: yearFilter,
      groupBy: 'publication_year',
      sort: 'key:asc',
      limit: TREND_WINDOW_YEARS,
    }),
    service.groupWorks({ search: query, groupBy: 'type', limit: 100 }),
    service.groupWorks({ search: query, groupBy: 'primary_topic.field.id', limit: 100 }),
    service.groupWorks({
      search: query,
      filter: 'primary_location.source.type:journal',
      groupBy: 'primary_location.source.id',
      sort: 'count:desc',
      limit: GROUP_LIMIT,
      cursor: '*',
    }),
  ]);

  const yearCounts = new Map(normalizeGroups(yearResult.groups).map(({ label, count }) => [Number(label), count]));
  const years = Array.from({ length: TREND_WINDOW_YEARS }, (_, index) => {
    const year = firstYear + index;
    return { year, count: yearCounts.get(year) ?? 0 };
  });
  const previousCompleteYear = currentYear - 2;
  const latestCompleteYear = currentYear - 1;
  const previousCount = yearCounts.get(previousCompleteYear) ?? 0;
  const latestCount = yearCounts.get(latestCompleteYear) ?? 0;
  const growthRate = previousCount > 0 ? ((latestCount - previousCount) / previousCount) * 100 : null;

  const typeCounts = new Map([['Journal', 0], ['Conference', 0], ['Other', 0]]);
  for (const group of typeResult.groups ?? []) {
    const label = publicationTypeLabel(group?.key_display_name ?? group?.key);
    typeCounts.set(label, (typeCounts.get(label) ?? 0) + (Number(group?.count) || 0));
  }

  const journalGroups = normalizeGroups(journalResult.groups);
  return {
    total_works: Number(typeResult.count) || 0,
    years,
    source_types: [...typeCounts].map(([label, count]) => ({ label, count })),
    subject_areas: normalizeGroups(subjectResult.groups).slice(0, 6),
    journal_count: journalGroups.length,
    journal_count_complete: journalGroups.length < GROUP_LIMIT && !journalResult.nextCursor,
    growth_rate: growthRate,
    updated_at: new Date().toISOString(),
  };
}
