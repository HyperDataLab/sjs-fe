import { useTranslation } from "react-i18next";
/**
 * @file AuthorLeaderboardPage.jsx
 * @description Trang hiển thị Bảng xếp hạng Tác giả.
 */

import { useEffect, useState } from 'react';
import { Container, Row, Col } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon';
import Header from '../../landing/components/Header';
import useAuthors from '../hooks/useAuthors';
import AuthorLeaderboardTable from '../components/AuthorLeaderboardTable';
import AuthorNavigationTabs from '../components/AuthorNavigationTabs';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import { FilterCard } from '../../../shared/components/Card';
import { FilterSelect } from '../../../shared/components/Input';
import AdminPagination from '../../../shared/components/Pagination';


import MuiBox from '@mui/material/Box';

export default function AuthorLeaderboardPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    leaderboard,
    loadingLeaderboard,
    errorLeaderboard,
    fetchLeaderboard,
    totalLeaderboard,
    leaderboardTotalPages,
    subjectAreas,
    fetchSubjectAreas,
  } = useAuthors();
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    if (!subjectAreas || subjectAreas.length === 0) {
      fetchSubjectAreas();
    }
  }, [subjectAreas, fetchSubjectAreas]);

  useEffect(() => {
    fetchLeaderboard({
      subject_area: selectedArea,
      period: selectedPeriod,
      page: currentPage,
      limit: limit
    });
  }, [selectedArea, selectedPeriod, currentPage, fetchLeaderboard]);
  const handleAreaChange = e => {
    setSelectedArea(e.target.value);
    setCurrentPage(1);
  };
  const handlePeriodChange = e => {
    setSelectedPeriod(e.target.value);
    setCurrentPage(1);
  };
  return <div className="author-leaderboard-page">
      <Header />

      <Container>
        <MuiBox component="nav" sx={{ marginBottom: "1.5rem" }} className="author-leaderboard-breadcrumb" aria-label="breadcrumb">
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "1rem", listStyle: "none" }} >
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} >
              <span className="author-leaderboard-breadcrumb__link" onClick={() => navigate('/')}>{t("author.tongQuan")}</span>
            </MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} >
              <span className="author-leaderboard-breadcrumb__link" onClick={() => navigate('/authors')}>{t("author.tacGiaNoiBat")}</span>
            </MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" }, color: "primary.main" }} className="active" aria-current="page">{t("author.bangXepHang")}</MuiBox>
          </MuiBox>
        </MuiBox>

        <section className="author-leaderboard-hero">
          <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:768px)": { flexDirection: "row" }, justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }} className="author-leaderboard-hero__content">
            <div>
              <div className="author-leaderboard-eyebrow">
                <Icon icon="lucide:trophy" width="17" />
                <span>Author leaderboard</span>
              </div>
              <h1 className="author-leaderboard-title">{t("author.bangXepHangTacGia")}</h1>
              <p className="author-leaderboard-description">{t("author.cacTacGiaNoiBatNhatHeThongDuoc")}</p>
            </div>
            <PrimaryButton sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} variant="outline" onClick={() => navigate('/authors')}  icon="lucide:arrow-left">
              <span>{t("author.quayLaiDanhSachTacGia")}</span>
            </PrimaryButton>
          </MuiBox>
        </section>

        <AuthorNavigationTabs activeTab="leaderboard" />

        <FilterCard className="author-leaderboard-filter-card">
          <Row sx={{ gap: "1rem", alignItems: "center" }} >
            <Col xs={12} sm={6} md={4}>
              <div className="author-leaderboard-filter-control">
                <span className="author-leaderboard-label">{t("author.linhVuc1")}</span>
                <FilterSelect value={selectedArea} onChange={handleAreaChange} options={[{
                value: '',
                label: t("author.tatCaLinhVuc")
              }, ...(subjectAreas || []).map(area => ({
                value: area.display_name || area.name || '',
                label: area.display_name || area.name || ''
              }))]} />
              </div>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <div className="author-leaderboard-filter-control">
                <span className="author-leaderboard-label">{t("author.thoiGian")}</span>
                <FilterSelect value={selectedPeriod} onChange={handlePeriodChange} options={[{
                value: 'all',
                label: t("author.tatCaThoiGian")
              }, {
                value: 'month',
                label: t("author.thangNay")
              }, {
                value: 'year',
                label: t("author.namNay")
              }]} />
              </div>
            </Col>
          </Row>
        </FilterCard>

        <AuthorLeaderboardTable authors={leaderboard} loading={loadingLeaderboard} error={errorLeaderboard} onRetry={() => fetchLeaderboard({
        subject_area: selectedArea,
        period: selectedPeriod,
        page: currentPage,
        limit: limit
      })} />

        {leaderboard.length > 0 && leaderboardTotalPages > 1 && <AdminPagination totalItems={totalLeaderboard} currentPage={currentPage} limit={limit} onPageChange={setCurrentPage} entityName={t("author.tacGia")} />}
      </Container>
    </div>;
}
