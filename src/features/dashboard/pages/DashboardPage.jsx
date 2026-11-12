import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\dashboard\pages\DashboardPage.jsx
 */
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import Header from "../../landing/components/Header";
import { useUserStore } from "../../../app/store/userStore";
import useDashboard from "../hooks/useDashboard";
import DashboardStatCards from "../components/DashboardStatCards";
import PublicationTrendChart from "../components/PublicationTrendChart";
import RecentProjectsCard from "../components/RecentProjectsCard";
import TrendingKeywordsCard from "../components/TrendingKeywordsCard";
import QuickAccessGrid from "../components/QuickAccessGrid";
import TopAuthorsTable from "../components/TopAuthorsTable";
import AuthRequiredModal from "../../../shared/components/AuthRequiredModal";
import PrimaryButton from "../../../shared/components/Button/PrimaryButton";


import MuiBox from '@mui/material/Box';


/**
 * DashboardPage — Trang Tổng quan / Dashboard
 * Route: /dashboard
 *
 * Layout:
 *  Header → WelcomeSection → StatCards →
 *  [Chart 70% | RecentProjects 30%] →
 *  [TrendingKeywords | QuickAccess] →
 *  TopAuthorsTable
 */
export default function DashboardPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const email = useUserStore(state => state.email);

  // Year range select state for publication trends ('5', '10', 'all')
  const [trendRange, setTrendRange] = useState("5");
  const {
    projects,
    analytics,
    trendingKeywords,
    topAuthors,
    summaryStats,
    loadingProjects,
    loadingAnalytics,
    isFetchingAnalytics,
    loadingKeywords,
    isFetchingKeywords,
    loadingAuthors,
    errorProjects,
    errorAnalytics,
    errorKeywords,
    errorAuthors,
    refetchAnalytics
  } = useDashboard(email, trendRange);

  // Quick search state
  const [quickSearch, setQuickSearch] = useState("");

  // Auth modal (for "Tạo Project mới" when guest)
  const [showAuthModal, setShowAuthModal] = useState(false);
  const handleQuickSearch = useCallback(e => {
    if (e.key === "Enter" && quickSearch.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(quickSearch.trim())}`);
    }
  }, [quickSearch, navigate]);
  const handleCreateProject = () => {
    if (!email) {
      setShowAuthModal(true);
    } else {
      navigate("/projects/create");
    }
  };
  const handleProjectClick = project => {
    const id = project.project_id ?? project.id;
    if (id) navigate(`/projects/${id}`);
  };
  const handleAuthorClick = author => {
    const id = author.author_id ?? author.id;
    if (id) navigate(`/authors/${id}`);
  };
  const handleKeywordClick = keyword => {
    navigate(`/catalog?search=${encodeURIComponent(keyword)}`);
  };
  return <MuiBox component="div" sx={{ minHeight: "100vh" }}  style={{
    backgroundColor: "var(--bg-main)",
    color: "var(--text-main)",
    paddingTop: "80px"
  }}>
      {/* Sticky Navbar */}
      <Header />

      <Container sx={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }} >
        {/* ── Welcome Hero Banner ─────────────────────────────────── */}
        <MuiBox component="div" sx={{ padding: "1.5rem", "@media (min-width:768px)": { padding: "3rem" }, marginBottom: "1.5rem", position: "relative", overflow: "hidden" }}

          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)"
          }}
        >
          <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:768px)": { flexDirection: "row", alignItems: "center" }, alignItems: "flex-start", justifyContent: "space-between", gap: "1.5rem", position: "relative" }}  style={{ zIndex: 1 }}>
            <div>
              <MuiBox component="div" sx={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", marginBottom: "1rem", borderRadius: "50rem" }}

                style={{
                  backgroundColor: "var(--primary-light)",
                  color: "var(--primary)",
                  fontSize: "0.8rem",
                  fontWeight: "600"
                }}
              >
                <Icon icon="lucide:sparkles" width={14} />
                <span>ResearchPulse Analytics</span>
              </MuiBox>
              <MuiBox component="h1" sx={{ fontWeight: 700, marginBottom: "0.5rem" }}
                className="font-display text-main"
                style={{
                  fontSize: "calc(1.5rem + 0.8vw)",
                  letterSpacing: "-0.02em"
                }}
              >
                {t("dashboard.chaoMungBanDenVoiResearchpulse")}
              </MuiBox>
              <MuiBox component="p" sx={{ marginBottom: "0" }}
                className="text-muted-custom font-display"
                style={{
                  fontSize: "0.95rem",
                  maxWidth: "640px"
                }}
              >
                {t("dashboard.khamPhaXuHuongXepHangTapChiVaC")}
              </MuiBox>
            </div>
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }} >
              <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                className="py-2.5"
                onClick={handleCreateProject}
              >
                <Icon icon="lucide:plus" width={18} />
                <span>{t("dashboard.taoProject")}</span>
              </PrimaryButton>
            </MuiBox>
          </MuiBox>
        </MuiBox>

        {/* ── Stat Cards ──────────────────────────────────────────── */}
        <DashboardStatCards stats={summaryStats} loading={loadingProjects} />

        {/* ── Chart + Recent Projects ─────────────────────────────── */}
        <Row sx={{ gap: "1rem", marginBottom: "1rem" }} >
          <Col xs={12} lg={8}>
            <PublicationTrendChart
              analytics={analytics}
              loading={loadingAnalytics}
              isFetching={isFetchingAnalytics}
              error={errorAnalytics}
              onRetry={() => refetchAnalytics()}
              selectedRange={trendRange}
              onRangeChange={setTrendRange}
            />
          </Col>
          <Col xs={12} lg={4}>
            <RecentProjectsCard projects={projects} loading={loadingProjects} error={errorProjects} onViewAll={() => navigate("/projects")} onProjectClick={handleProjectClick} />
          </Col>
        </Row>

        {/* ── Trending Keywords + Quick Access ────────────────────── */}
        <Row sx={{ gap: "1rem", marginBottom: "1.5rem" }} >
          <Col xs={12} md={6}>
            <TrendingKeywordsCard
              keywords={trendingKeywords}
              loading={loadingKeywords}
              isFetching={isFetchingKeywords}
              error={errorKeywords}
              onKeywordClick={handleKeywordClick}
              onViewMore={() => navigate("/catalog")}
            />
          </Col>
          <Col xs={12} md={6}>
            <QuickAccessGrid />
          </Col>
        </Row>

        {/* ── Top Authors Table ────────────────────────────────────── */}
        <TopAuthorsTable authors={topAuthors} loading={loadingAuthors} error={errorAuthors} onAuthorClick={handleAuthorClick} onViewAll={() => navigate("/authors")} />
      </Container>

      {/* Auth modal for guests clicking "Tạo Project mới" */}
      <AuthRequiredModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
    </MuiBox>;
}
