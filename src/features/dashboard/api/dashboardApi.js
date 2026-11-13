/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\dashboard\api\dashboardApi.js
 */
import api from '../../../shared/services/api';
import { getProjectsApi, getProjectByIdApi } from '../../project/api/project.api';

/**
 * Get list of user projects (stat cards & recent projects)
 * BE: GET /api/v1/projects  [requireAuth]
 */
export const getDashboardProjectsApi = async () => ({ data: await getProjectsApi() });

/**
 * Get project analytics / publication trend (Deprecated, use getPublicationTrendsApi instead for dashboard)
 * BE: GET /api/v1/projects/:id/analytics  [requireAuth]
 */
export const getProjectAnalyticsApi = async (projectId) => {
  const project = await getProjectByIdApi(projectId);
  return { data: { data: project.analysisSummary?.result ?? null } };
};

/**
 * Get overall or project-specific publication trends
 * BE: GET /api/v1/statistics/publication-trends
 */
export const getPublicationTrendsApi = (params = {}) =>
  api.get('/statistics/publication-trends', { params });

/**
 * Get trending keywords for a project
 * BE: GET /api/v1/projects/:id/keywords/trending  [requireAuth]
 * (via keyword route mounted under /projects)
 */
export const getTrendingKeywordsApi = (projectId, limit = 12) =>
  api.get('/keywords', { params: { limit, projectId } });

/**
 * Get overall trending keywords for dashboard
 * BE: GET /api/v1/dashboard/trending-keywords
 */
export const getDashboardTrendingKeywordsApi = (params = {}) =>
  api.get('/dashboard/trending-keywords', { params });

/**
 * Get top author leaderboard
 * BE: GET /api/v1/author/leaderboard  [requireAuth]
 */
export const getTopAuthorsApi = (limit = 5) =>
  api.get('/author/leaderboard', { params: { limit } });

/**
 * Get related articles for a project
 * BE: GET /api/v1/projects/:id/related-articles  [requireAuth]
 */
export const getRelatedArticlesApi = (projectId, limit = 5) =>
  api.get('/articles', { params: { limit, projectId } });
