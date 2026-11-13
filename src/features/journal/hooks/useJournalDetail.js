/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\hooks\useJournalDetail.js
 */
import { useState, useEffect, useCallback } from 'react';
import {
  getJournalByIdApi,
  getJournalRankingsApi,
  getCatalogVolumesApi,
  getCatalogIssuesApi,
  getJournalArticlesApi,
} from '../api/journalApi';

export function useJournalDetail(journalId) {
  // Page core states
  const [journal, setJournal] = useState(null);
  const [rankingHistory, setRankingHistory] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [issuesByVolume, setIssuesByVolume] = useState({});
  const [issueErrors, setIssueErrors] = useState({});
  const [volumePagination, setVolumePagination] = useState({ page: 1, limit: 10, total: 0, total_pages: 1 });
  const [issuePaginationByVolume, setIssuePaginationByVolume] = useState({});
  const [recentArticles, setRecentArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('ranking');

  // Loading & error states
  const [loadingJournal, setLoadingJournal] = useState(true);
  const [loadingRanking, setLoadingRanking] = useState(false);
  const [loadingVolumes, setLoadingVolumes] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [volumesError, setVolumesError] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Fetch Core Journal Info
  const fetchJournalInfo = useCallback(async () => {
    if (!journalId) return;
    setLoadingJournal(true);
    setError(null);
    setNotFound(false);

    try {
      const response = await getJournalByIdApi(journalId);
      if (response.data && response.data.data) {
        setJournal(response.data.data);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error('API error fetching journal info:', err);
      setError(err.response?.data?.message || err.message);
      setNotFound(true);
    } finally {
      setLoadingJournal(false);
    }
  }, [journalId]);

  // Fetch Rankings History
  const fetchRankingHistory = useCallback(async () => {
    if (!journalId) return;
    setLoadingRanking(true);
    try {
      const response = await getJournalRankingsApi(journalId);
      const rawData = response.data?.data;
      
      if (rawData) {
        let grouped = {};
        if (Array.isArray(rawData)) {
          rawData.forEach(item => {
            const yr = item.year;
            if (yr) {
              if (!grouped[yr]) grouped[yr] = [];
              grouped[yr].push(item);
            }
          });
        } else if (typeof rawData === 'object') {
          grouped = rawData;
        }

        const flatList = Object.keys(grouped).map(yr => {
          const metrics = grouped[yr] || [];
          const sjrMetric = metrics.find(m => m.metric_code === 'SJR' || m.metric_code === 'SJR_SCORE');
          const hindexMetric = metrics.find(m => m.metric_code === 'H_INDEX');
          const quartileMetric = metrics.find(m => m.metric_code === 'SJR_BEST_QUARTILE' || m.metric_code === 'SJR_QUARTILE_BY_CAT' || m.metric_type === 'QUARTILE');
          const scoreMetric = sjrMetric || metrics.find(m => m.metric_type === 'SCORE' || typeof m.value === 'number');
          
          return {
            year: parseInt(yr, 10),
            value: scoreMetric ? parseFloat(scoreMetric.value) : null,
            h_index: hindexMetric ? parseInt(hindexMetric.value, 10) : null,
            quartile: quartileMetric ? (quartileMetric.value || 'Q1') : 'Q1',
          };
        }).filter(item => !isNaN(item.year) && item.value !== null).sort((a, b) => b.year - a.year);

        setRankingHistory(flatList);
      } else {
        setRankingHistory([]);
      }
    } catch (err) {
      console.error('API error fetching rankings:', err);
      setRankingHistory([]);
    } finally {
      setLoadingRanking(false);
    }
  }, [journalId]);

  // Fetch Volumes
  const fetchVolumes = useCallback(async (nextPage = 1) => {
    setLoadingVolumes(true);
    setVolumesError(false);
    try {
      const response = await getCatalogVolumesApi({ journal_id: journalId, page: nextPage, limit: volumePagination.limit });
      if (response.data && response.data.data) {
        const payload = response.data.data;
        setVolumes(payload.items || payload || []);
        setVolumePagination(payload.pagination || { page: nextPage, limit: volumePagination.limit, total: payload.length || 0, total_pages: 1 });
      } else {
        setVolumes([]);
      }
    } catch (err) {
      console.error('API error fetching volumes:', err);
      setVolumesError(true);
      setVolumes([]);
    } finally {
      setLoadingVolumes(false);
    }
  }, [journalId, volumePagination.limit]);

  // Fetch Issues for a specific volume
  const fetchIssuesForVolume = useCallback(async (volumeId, nextPage = 1) => {
    const currentPagination = issuePaginationByVolume[volumeId] || { limit: 10 };
    if (issuesByVolume[volumeId] && !issueErrors[volumeId] && currentPagination.page === nextPage) return; // already loaded successfully
    setIssueErrors(prev => ({ ...prev, [volumeId]: false }));
    try {
      const response = await getCatalogIssuesApi({ volume_id: volumeId, page: nextPage, limit: currentPagination.limit || 10 });
      if (response.data && response.data.data) {
        const payload = response.data.data;
        setIssuesByVolume(prev => ({ ...prev, [volumeId]: payload.items || payload || [] }));
        setIssuePaginationByVolume(prev => ({
          ...prev,
          [volumeId]: payload.pagination || { page: nextPage, limit: currentPagination.limit || 10, total: (payload || []).length, total_pages: 1 }
        }));
      } else {
        setIssuesByVolume(prev => ({ ...prev, [volumeId]: [] }));
      }
    } catch (err) {
      console.error(`API error fetching issues for volume ${volumeId}:`, err);
      setIssueErrors(prev => ({ ...prev, [volumeId]: true }));
    }
  }, [issuesByVolume, issueErrors, issuePaginationByVolume]);

  // Fetch Recent Articles
  const fetchRecentArticles = useCallback(async () => {
    if (recentArticles.length > 0) return; // cache loaded
    setLoadingArticles(true);
    try {
      const response = await getJournalArticlesApi({ journal_id: journalId, limit: 6, sortBy: 'publication_year', sortOrder: 'DESC' });
      const payload = response.data?.data;
      if (payload) {
        setRecentArticles(payload.items || payload.articles || payload.data || []);
      } else {
        setRecentArticles([]);
      }
    } catch (err) {
      console.error('API error fetching articles:', err);
      setRecentArticles([]);
    } finally {
      setLoadingArticles(false);
    }
  }, [journalId, recentArticles.length]);

  // Init fetch
  useEffect(() => {
    fetchJournalInfo();
    fetchRankingHistory();
  }, [fetchJournalInfo, fetchRankingHistory]);

  // Enrich journal with latest ranking details when rankingHistory updates
  useEffect(() => {
    if (rankingHistory.length > 0 && journal && !journal.metric_value) {
      const latest = rankingHistory[0]; // Already sorted descending by year
      setJournal(prev => ({
        ...prev,
        quartile: latest.quartile || prev.quartile || 'Q1',
        metric_value: latest.value || prev.metric_value,
        metric_name: 'SJR Score',
        metric_year: String(latest.year)
      }));
    }
  }, [rankingHistory, journal]);

  // Lazy load tabs
  useEffect(() => {
    if (activeTab === 'volumes') {
      fetchVolumes();
    } else if (activeTab === 'articles') {
      fetchRecentArticles();
    }
  }, [activeTab, fetchVolumes, fetchRecentArticles]);

  /** Chuyển trang volume trong tab Volumes & Issues */
  const handleVolumePageChange = useCallback((nextPage) => {
    fetchVolumes(nextPage);
  }, [fetchVolumes]);

  /** Chuyển trang issue bên trong một volume accordion */
  const handleIssuePageChange = useCallback((volumeId, nextPage) => {
    fetchIssuesForVolume(volumeId, nextPage);
  }, [fetchIssuesForVolume]);

  return {
    journal,
    rankingHistory,
    volumes,
    issuesByVolume,
    issueErrors,
    volumePagination,
    issuePaginationByVolume,
    recentArticles,
    activeTab,
    setActiveTab,
    loadingJournal,
    loadingRanking,
    loadingVolumes,
    loadingArticles,
    volumesError,
    error,
    notFound,
    fetchIssuesForVolume,
    handleVolumePageChange,
    handleIssuePageChange
  };
}
