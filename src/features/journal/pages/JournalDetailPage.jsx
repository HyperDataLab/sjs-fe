import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\pages\JournalDetailPage.jsx
 */
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Breadcrumb } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';

// Shared Layout Header
import Header from '../../landing/components/Header';

// Auth Hook
import useAuth from '../../auth/hooks/useAuth';

// Feature Components & Hooks
import { useJournalDetail } from '../hooks/useJournalDetail';
import JournalHero from '../components/JournalHero';
import JournalMetadataGrid from '../components/JournalMetadataGrid';
import JournalTabs from '../components/JournalTabs';
import RankingTabContent from '../components/RankingTabContent';
import VolumesTabContent from '../components/VolumesTabContent';
import ArticlesTabContent from '../components/ArticlesTabContent';
import AuthRequiredModal from '../../../shared/components/AuthRequiredModal';
import AddToProjectModal from '../components/AddToProjectModal';


import MuiBox from '@mui/material/Box';

export default function JournalDetailPage() {
  const {
    t
  } = useTranslation();
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const currentUser = auth?.user;
  const {
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
    notFound,
    showAuthModal,
    setShowAuthModal,
    showProjectModal,
    setShowProjectModal,
    isFollowing,
    isAddingToProject,
    handleFollow,
    handleAddToProject,
    fetchIssuesForVolume,
    handleVolumePageChange,
    handleIssuePageChange
  } = useJournalDetail(id, currentUser);

  // Fallback for not found or empty ID
  if (notFound) {
    return <MuiBox component="div" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }} className="grid-bg text-main">
        <Header />
        <Container sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingTop: "3rem", paddingBottom: "3rem" }} >
          <MuiBox component="div" sx={{ padding: "3rem", textAlign: "center" }} className="journal-dark-card" style={{
          maxWidth: '500px'
        }}>
            <Icon sx={{ color: "error.main", marginBottom: "1.5rem" }} icon="lucide:alert-circle"  width="64" />
            <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "1rem" }} className="font-display text-main">{t("journal.khongTimThayTapChi")}</MuiBox>
            <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="text-muted-custom">{t("journal.tapChiBanDangTimKiemKhongTonTa")}</MuiBox>
            <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}  onClick={() => navigate('/')}>{t("journal.quayLaiTrangChu")}</PrimaryButton>
          </MuiBox>
        </Container>
      </MuiBox>;
  }
  return <MuiBox component="div" sx={{ minHeight: "100vh", paddingBottom: "3rem" }} className="grid-bg text-main journal-detail-page">
      {/* Top Navbar */}
      <Header />

      {/* Main Container */}
      <Container sx={{ paddingTop: "3rem", marginTop: "3rem" }} className="journal-detail-shell">

        {/* Custom Breadcrumb Nav */}
        <div aria-label="breadcrumb" className="journal-breadcrumb">
          <Breadcrumb sx={{ marginBottom: "0", display: "flex", alignItems: "center" }} className="custom-breadcrumb">
            <Breadcrumb.Item sx={{ display: "flex", alignItems: "center" }} onClick={() => navigate('/')}  linkProps={{
            style: {
              cursor: 'pointer',
              fontSize: '0.85rem',
              lineHeight: 1,
              color: 'var(--text-muted)',
              textDecoration: 'none'
            }
          }}>{t("home")}</Breadcrumb.Item>
            <Breadcrumb.Item sx={{ display: "flex", alignItems: "center" }} onClick={() => navigate('/search')}  linkProps={{
            style: {
              cursor: 'pointer',
              fontSize: '0.85rem',
              lineHeight: 1,
              color: 'var(--text-muted)',
              textDecoration: 'none'
            }
          }}>{t("search")}</Breadcrumb.Item>
            <Breadcrumb.Item sx={{ display: "flex", alignItems: "center" }} active  style={{
            fontSize: '0.85rem',
            color: 'var(--text-main)',
            fontWeight: 500
          }}>
              {loadingJournal ? t("common.dangTai") : journal?.display_name}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        {/* Hero Section */}
        <JournalHero journal={journal} isFollowing={isFollowing} isAddingToProject={isAddingToProject} onFollow={handleFollow} onAddToProject={() => handleAddToProject()} loading={loadingJournal} />

        {/* Grid Metadata metrics */}
        <JournalMetadataGrid journal={journal} loading={loadingJournal} />

        {/* Tab Controls */}
        <JournalTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Contents */}
        <div className="journal-tab-panel">
          {activeTab === 'ranking' && <RankingTabContent rankingHistory={rankingHistory} metricName={journal?.metric_name || 'Impact Factor'} loading={loadingRanking} />}

          {activeTab === 'volumes' && <VolumesTabContent volumes={volumes} issuesByVolume={issuesByVolume} issueErrors={issueErrors} journalId={id} onVolumeExpand={fetchIssuesForVolume} loading={loadingVolumes} error={volumesError} volumePagination={volumePagination} issuePaginationByVolume={issuePaginationByVolume} onVolumePageChange={handleVolumePageChange} onIssuePageChange={handleIssuePageChange} />}

          {activeTab === 'articles' && <ArticlesTabContent recentArticles={recentArticles} loading={loadingArticles} onArticleClick={artId => navigate(`/articles/${artId}/visual`)} />}
        </div>
      </Container>

      {/* Guest warning auth modal */}
      <AuthRequiredModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />

      {/* Project selection modal */}
      <AddToProjectModal show={showProjectModal} onHide={() => setShowProjectModal(false)} journalId={id} onConfirm={handleAddToProject} />
    </MuiBox>;
}
