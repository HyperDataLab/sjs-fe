/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\catalog\hooks\useCatalogSearch.js
 */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  getCatalogCountriesApi,
  getCatalogFieldsApi,
  getCatalogSubfieldsApi,
  searchCatalogJournalsApi,
} from '../api/catalogSearchApi';
import { normalizeSearchResponse } from '../services/catalogSearchService';
import { useCatalogSearchStore } from '../store/catalogSearchStore';

/**
 * Custom hook powering the catalog search page.
 * Source of truth: URL search params (for shareability).
 * Default sort: metric (highest metric first), per ISSUE_FE_SEARCH_PAGE.
 */
export function useCatalogSearch(currentUser) {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ----- Local controlled search input (not yet submitted) ----- */
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  /* ----- Auth-gated actions state ----- */
  const [followedJournals, setFollowedJournals] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);

  /* ----- View mode (list | table), stored globally via Zustand ----- */
  const viewMode = useCatalogSearchStore((state) => state.viewMode);
  const setViewMode = useCatalogSearchStore((state) => state.setViewMode);
  const hydrateFromQuery = useCatalogSearchStore((state) => state.hydrateFromQuery);

  /* ----- Parse active filters from URL (single source of truth) ----- */
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  // Default to 'metric' (highest metric first) on first load per ISSUE_FE_SEARCH_PAGE
  const sort = searchParams.get('sort') || 'metric';

  const selectedAreas = searchParams.getAll('area_id').map(String).filter((id) => /^F\d+$/.test(id));
  const selectedCategories = searchParams.getAll('cat_id').map(String).filter((id) => /^S\d+$/.test(id));
  const selectedAccess = searchParams.getAll('access');
  const countryId = (searchParams.get('country_id') || '').toUpperCase();
  const selectedZone = /^[A-Z]{2}$/.test(countryId) ? countryId : '';
  const isInDoaj = searchParams.get('is_in_doaj') === 'true';

  const selectedAreaId = selectedAreas[0] || '';

  const selectedAreasStr = selectedAreas.join(',');
  const selectedCategoriesStr = selectedCategories.join(',');
  const selectedAccessStr = selectedAccess.join(',');

  useEffect(() => {
    hydrateFromQuery({
      keyword: search,
      page,
      limit,
      sort,
      selectedAreas,
      selectedCategories,
      selectedAccess,
      selectedZone,
      isInDoaj,
      viewMode,
    });
  }, [search, page, limit, sort, selectedAreasStr, selectedCategoriesStr, selectedAccessStr, selectedZone, isInDoaj, viewMode, hydrateFromQuery]);

  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    let changed = false;
    for (const key of ['quartile', 'ranking_year']) {
      if (next.has(key)) {
        next.delete(key);
        changed = true;
      }
    }
    const legacyDoaj = next.get('is_oa_diamond');
    if (legacyDoaj !== null) {
      next.delete('is_oa_diamond');
      changed = true;
    }
    if (next.get('country_id') && !/^[A-Za-z]{2}$/.test(next.get('country_id'))) {
      next.delete('country_id');
      changed = true;
    } else if (next.get('country_id')) {
      const countryCode = next.get('country_id').toUpperCase();
      if (countryCode !== next.get('country_id')) {
        next.set('country_id', countryCode);
        changed = true;
      }
    }
    if (next.getAll('area_id').some((id) => !/^F\d+$/.test(id))) {
      next.delete('area_id');
      next.delete('cat_id');
      changed = true;
    }
    if (next.getAll('cat_id').some((id) => !/^S\d+$/.test(id))) {
      next.delete('cat_id');
      changed = true;
    }
    if (changed) setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  /* ----- Load filter dropdown lists on mount (Cached via TanStack Query) ----- */
  const { data: filtersData, isLoading: loadingFilters } = useQuery({
    queryKey: ['catalog', 'filters'],
    queryFn: async ({ signal }) => {
      const [areasRes, zonesRes] = await Promise.all([
        getCatalogFieldsApi({ signal }),
        getCatalogCountriesApi({ signal }),
      ]);
      return {
        subjectAreas: areasRes.items || [],
        zones: zonesRes.items || [],
      };
    },
    staleTime: 86400000, // 24 hours
  });

  /* ----- Load subject categories dependent on the selected subject area ----- */
  const { data: categoriesData = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['catalog', 'categories', selectedAreaId],
    queryFn: async ({ signal }) => {
      if (!selectedAreaId) return [];
      const res = await getCatalogSubfieldsApi({ fieldId: selectedAreaId, signal });
      return res.items || [];
    },
    enabled: Boolean(selectedAreaId),
    staleTime: 300000, // 5 minutes
  });

  const subjectAreas = filtersData?.subjectAreas || [];
  const subjectCategories = categoriesData;
  const zones = filtersData?.zones || [];

  /* ----- Fetch journals whenever URL params change (Cached via TanStack Query) ----- */
  const {
    data: journalsQueryData,
    isLoading: loadingJournals,
    error: journalsError,
    refetch: fetchJournals,
  } = useQuery({
    queryKey: [
      'catalog',
      'search',
      {
        search,
        page,
        limit,
        sort,
        selectedAreasStr,
        selectedCategoriesStr,
        selectedAccessStr,
        selectedZone,
        isInDoaj,
      },
    ],
    queryFn: async ({ signal }) => {
      const params = {
        search: search || undefined,
        page,
        limit,
        sort,
        field_ids: selectedAreas.join(',') || undefined,
        subfield_ids: selectedCategories.join(',') || undefined,
        is_open_access:
          selectedAccess.includes('open_access') && !selectedAccess.includes('subscription')
            ? true
            : !selectedAccess.includes('open_access') && selectedAccess.includes('subscription')
            ? false
            : undefined,
        country_code: selectedZone || undefined,
        is_in_doaj: isInDoaj ? true : undefined,
      };

      const response = await searchCatalogJournalsApi(params, { signal });
      if (response.error || !Array.isArray(response.items)) {
        throw new Error(response.message || response.error || 'The Worker returned an invalid catalog response.');
      }
      return normalizeSearchResponse(response);
    },
    staleTime: 300000, // 5 minutes
    retry: 1,
  });

  const journals = journalsQueryData?.items || [];
  const total = journalsQueryData?.pagination?.total || 0;

  let error = null;
  if (journalsError) {
    const status = journalsError.response?.status;
    if (status === 404) {
      error = 'Không tìm thấy kết quả.';
    } else {
      error = journalsError.response?.data?.message || journalsError.message || 'Lỗi kết nối đến server.';
    }
  }

  /* ----- Ensure default sort is reflected in URL on first load ----- */
  useEffect(() => {
    if (!searchParams.get('sort')) {
      const next = new URLSearchParams(searchParams);
      next.set('sort', 'metric');
      setSearchParams(next, { replace: true });
    }
  }, []);  

  /* ========================= HANDLERS ========================= */

  /** Submit the local search input value. Resets to page 1. */
  const handleSearchSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      next.set('search', searchInput.trim());
    } else {
      next.delete('search');
    }
    next.set('page', '1');
    setSearchParams(next);
  };

  /** Jump-search by clicking a tag / badge label. */
  const searchForTag = (tag) => {
    setSearchInput(tag);
    const next = new URLSearchParams(searchParams);
    next.set('search', tag);
    next.set('page', '1');
    setSearchParams(next);
  };

  /* ----- Multi-value param toggle helper ----- */
  const toggleParamValue = (key, value) => {
    const next = new URLSearchParams(searchParams);
    const current = next.getAll(key);
    if (current.includes(String(value))) {
      const updated = current.filter(v => v !== String(value));
      next.delete(key);
      updated.forEach(v => next.append(key, v));
    } else {
      next.append(key, String(value));
    }
    next.set('page', '1');
    setSearchParams(next);
  };

  const handleAccessToggle = (a) => toggleParamValue('access', a);

  /** Toggle a subject area; if toggled off, removes dependent categories. */
  const handleAreaToggle = (areaId) => {
    const next = new URLSearchParams(searchParams);
    const currentAreas = next.getAll('area_id').map(String);
    const areaIdStr = String(areaId);

    if (currentAreas.includes(areaIdStr)) {
      const remaining = currentAreas.filter(id => id !== areaIdStr);
      next.delete('area_id');
      remaining.forEach(id => next.append('area_id', id));

      const dependent = subjectCategories
        .filter(c => String(c.subject_area_id) === areaIdStr)
        .map(c => String(c.subject_category_id));
      const currentCats = next.getAll('cat_id').map(String);
      const remainingCats = currentCats.filter(id => !dependent.includes(id));
      next.delete('cat_id');
      remainingCats.forEach(id => next.append('cat_id', id));
    } else {
      next.append('area_id', areaIdStr);
    }
    next.set('page', '1');
    setSearchParams(next);
  };

  const handleCategoryToggle = (catId) => toggleParamValue('cat_id', catId);

  /** Single-select area from dropdown. Clears dependent categories. */
  const onAreaSelect = (areaId) => {
    const next = new URLSearchParams(searchParams);
    next.delete('area_id');
    next.delete('cat_id');
    if (areaId && areaId !== 'all') next.set('area_id', String(areaId));
    next.set('page', '1');
    setSearchParams(next);
  };

  const onCategorySelect = (catId) => {
    const next = new URLSearchParams(searchParams);
    next.delete('cat_id');
    if (catId && catId !== 'all') next.set('cat_id', String(catId));
    next.set('page', '1');
    setSearchParams(next);
  };

  const onAccessSelect = (accessVal) => {
    const next = new URLSearchParams(searchParams);
    next.delete('access');
    if (accessVal && accessVal !== 'all') next.set('access', accessVal);
    next.set('page', '1');
    setSearchParams(next);
  };

  const onZoneSelect = (zoneId) => {
    const next = new URLSearchParams(searchParams);
    if (zoneId && zoneId !== 'all') {
      next.set('country_id', String(zoneId));
    } else {
      next.delete('country_id');
    }
    next.set('page', '1');
    setSearchParams(next);
  };

  /** Toggle the OpenAlex DOAJ membership filter. */
  const handleDoajToggle = (val) => {
    const next = new URLSearchParams(searchParams);
    if (val) {
      next.set('is_in_doaj', 'true');
    } else {
      next.delete('is_in_doaj');
    }
    next.delete('is_oa_diamond');
    next.set('page', '1');
    setSearchParams(next);
  };

  /** Reset all filters. Always resets sort back to default metric. */
  const handleClearAll = () => {
    setSearchInput('');
    setSearchParams({ page: '1', limit: String(limit), sort: 'metric' });
  };

  /** Change sort, preserve other params, reset to page 1. */
  const handleSortChange = (newSort) => {
    const next = new URLSearchParams(searchParams);
    next.set('sort', newSort);
    next.set('page', '1');
    setSearchParams(next);
  };

  /** Navigate to a different page. */
  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    const next = new URLSearchParams(searchParams);
    next.set('page', String(newPage));
    setSearchParams(next);
  };

  /** Guest-aware follow toggle (shows login modal for unauthenticated). */
  const handleFollowJournal = async (journalId) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setFollowedJournals(prev => ({ ...prev, [journalId]: !prev[journalId] }));
  };

  return {
    // Controlled input
    searchInput,
    setSearchInput,

    // Filter data
    subjectAreas,
    subjectCategories,
    zones,
    loadingFilters: loadingFilters || (Boolean(selectedAreaId) && loadingCategories),

    // Results
    journals,
    total,
    loadingJournals,
    error,

    // Active URL params
    search,
    page,
    limit,
    sort,
    selectedAreas,
    selectedCategories,
    selectedAccess,
    selectedZone,
    isInDoaj,

    // View mode
    viewMode,
    setViewMode,

    // Auth modal
    followedJournals,
    showAuthModal,
    setShowAuthModal,

    // Handlers
    handleSearchSubmit,
    searchForTag,
    handleAccessToggle,
    handleAreaToggle,
    handleCategoryToggle,
    onAreaSelect,
    onCategorySelect,
    onAccessSelect,
    onZoneSelect,
    handleDoajToggle,
    handleClearAll,
    handleSortChange,
    handlePageChange,
    handleFollowJournal,
    fetchJournals,
  };
}
