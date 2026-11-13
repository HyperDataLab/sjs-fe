import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../../features/landing/pages/LandingPage';
import JournalDetailPage from '../../features/journal/pages/JournalDetailPage';
import CatalogSearchPage from '../../features/catalog/pages/CatalogSearchPage';
import ArticleListPage from '../../features/article/pages/ArticleListPage';
import ArticleDetailPage from '../../features/article/pages/ArticleDetailPage';
import ArticleVisualDetailPage from '../../features/article/pages/ArticleVisualDetailPage';
import DashboardPage from '../../features/dashboard/pages/DashboardPage';

import SsoLoginPage from '../../features/auth/pages/SsoLoginPage';
import SsoCallbackPage from '../../features/auth/pages/SsoCallbackPage';
import ProfilePage from '../../features/profile/pages/ProfilePage';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import AuthLayoutWithUser from '../layouts/AuthLayoutWithUser';
import LangLayout from '../layouts/LangLayout';
import LanguageRedirect from './LanguageRedirect';

import ProjectListPage from '../../features/project/pages/ProjectListPage';
import CreateProjectPage from '../../features/project/pages/CreateProjectPage';
import ProjectEditPage from '../../features/project/pages/ProjectEditPage';
import ProjectDetailPage from '../../features/project/pages/ProjectSummaryPage';

import {
  KeywordListPage,
  KeywordArticlesPage,
} from '../../features/keywords';

import AuthorLeaderboardPage from '../../features/author/pages/AuthorLeaderboardPage';
import AuthorDetailPage from '../../features/author/pages/AuthorDetailPage';
import AuthorListPage from '../../features/author/pages/AuthorListPage';

import TopicDetailPage from '../../features/topic/pages/TopicDetailPage';


import GeographyPage from '../../features/zone/pages/GeographyPage';

// --- ĐỒNG BỘ ĐƯỜNG DẪN IMPORT THEO CHUẨN CỦA NHÓM ---

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth/sso/callback" element={<SsoCallbackPage />} />

      {/* Root redirect to language-prefixed root */}
      <Route path="/" element={<LanguageRedirect />} />

      {/* Language Prefixed Route Tree */}
      <Route path="/:lang" element={<LangLayout />}>
        <Route index element={<LandingPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="authors/leaderboard" element={<AuthorLeaderboardPage />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="login" element={<SsoLoginPage />} />
          <Route path="register" element={<Navigate to="../login" relative="path" replace />} />
        </Route>

        {/* Routes sử dụng layout chung */}
        <Route element={<AuthLayoutWithUser />}>
          
          {/* 🔐 Tuyến đường yêu cầu bảo mật (Đã đăng nhập) */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            
            <Route path="projects" element={<ProjectListPage />} />
            <Route path="projects/create" element={<CreateProjectPage />} />
            <Route path="projects/:id/edit" element={<ProjectEditPage />} />
            <Route path="projects/:id" element={<ProjectDetailPage />} />
            <Route
              path="authors/leaderboard"
              element={<AuthorLeaderboardPage />}
            />

          </Route>

          {/* Public pages inside layout */}
          <Route path="search" element={<CatalogSearchPage />} />
          <Route path="catalog" element={<CatalogSearchPage />} />

          <Route path="articles" element={<ArticleListPage />} />
          <Route path="articles/:id" element={<ArticleDetailPage />} />
          <Route
            path="articles/:id/visual"
            element={<ArticleVisualDetailPage />}
          />

          <Route path="profile" element={<ProfilePage />} />

          <Route path="authors" element={<AuthorListPage />} />
          <Route path="authors/:id" element={<AuthorDetailPage />} />

          <Route path="journals/:id" element={<JournalDetailPage />} />

          <Route path="keywords" element={<KeywordListPage />} />
          <Route
            path="keywords/:keywordId/articles"
            element={<KeywordArticlesPage />}
          />

          <Route path="forgot-password" element={<Navigate to="../login" relative="path" replace />} />
          <Route path="reset-password" element={<Navigate to="../login" relative="path" replace />} />

          <Route path="geography" element={<GeographyPage />} />

          <Route path="topics/:topicId" element={<TopicDetailPage />} />
        </Route>

        <Route path="topics/:topicId" element={<TopicDetailPage />} />

        {/* Fallback inside language to LandingPage */}
        <Route path="*" element={<LandingPage />} />
      </Route>

      {/* Legacy/Invalid Route Fallback Handler (Matches any URL not caught above, e.g. /login or /jp/login) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
