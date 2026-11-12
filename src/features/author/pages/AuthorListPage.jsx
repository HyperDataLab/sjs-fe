import { useTranslation } from "react-i18next";
/**
 * @file AuthorListPage.jsx
 * @description Trang hiển thị Danh mục Đăng ký Tác giả (`/authors`).
 */

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Card } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';
import Header from '../../landing/components/Header';
import useAuthors from '../hooks/useAuthors';
import AuthorTable from '../components/AuthorTable';
import AuthorCard from '../components/AuthorCard';
import LoadingSkeleton from '../../../shared/components/LoadingSkeleton';
import AuthorNavigationTabs from '../components/AuthorNavigationTabs';
import AdminPagination from '../../../shared/components/Pagination';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import { FilterCard } from '../../../shared/components/Card';
import { FilterSearch, FilterSelect } from '../../../shared/components/Input';


import MuiBox from '@mui/material/Box';

export default function AuthorListPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    authors,
    totalAuthors,
    totalPages,
    subjectAreas,
    loadingAuthors,
    errorAuthors,
    fetchAuthors,
    fetchSubjectAreas
  } = useAuthors();
  const [viewMode] = useState('grid');
  const searchVal = searchParams.get('search') || '';
  const pageVal = parseInt(searchParams.get('page') || '1', 10);
  const limitVal = parseInt(searchParams.get('limit') || '10', 10);
  const sortVal = searchParams.get('sort') || 'impact';
  const subjectAreaVal = searchParams.get('subject_area') || '';
  const countryVal = searchParams.get('country') || '';
  const [searchInput, setSearchInput] = useState(searchVal);
  useEffect(() => {
    const params = {
      search: searchVal,
      page: pageVal,
      limit: limitVal,
      sort: sortVal,
      subject_area: subjectAreaVal,
      country: countryVal
    };
    const filteredParams = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== ''));
    fetchAuthors(filteredParams);
  }, [searchVal, pageVal, limitVal, sortVal, subjectAreaVal, countryVal, fetchAuthors]);
  useEffect(() => {
    if (!subjectAreas || subjectAreas.length === 0) {
      fetchSubjectAreas();
    }
  }, [subjectAreas, fetchSubjectAreas]);
  const handleSearchSubmit = e => {
    if (e) e.preventDefault();
    const nextParams = new URLSearchParams(searchParams);
    if (searchInput.trim()) nextParams.set('search', searchInput.trim());else nextParams.delete('search');
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };
  const handleFilterChange = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) nextParams.set(key, value);else nextParams.delete(key);
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };
  const handlePageChange = newPage => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(newPage));
    setSearchParams(nextParams);
  };
  const totalPagesCount = Math.max(1, totalPages);
  const startIndex = (pageVal - 1) * limitVal + 1;
  const formatLocalNumber = value => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) return '0';
    return Number(value).toLocaleString('vi-VN');
  };
  const visibleAuthorsCount = authors.length;
  const featuredAuthorsCount = authors.filter(author => Number(author.h_index ?? author.hindex ?? 0) >= 30).length;
  const totalWorksCount = authors.reduce((sum, author) => sum + (Number(author.works_count ?? author.article_count ?? 0) || 0), 0);
  const totalCitationCount = authors.reduce((sum, author) => sum + (Number(author.cited_by_count ?? author.citation_count ?? 0) || 0), 0);
  const statCards = [{
    label: t("article.tongTacGia"),
    value: formatLocalNumber(totalAuthors),
    icon: 'lucide:users',
    desc: subjectAreaVal
      ? `${t("author.tacGiaTrongLinhVuc", "Tác giả trong lĩnh vực")} ${subjectAreaVal}`
      : t("author.tongTacGiaTrongHeThong")
  }, {
    label: t("author.tacGiaNoiBat"),
    value: formatLocalNumber(featuredAuthorsCount || visibleAuthorsCount),
    icon: 'lucide:award',
    desc: visibleAuthorsCount > 0 ? `Trong ${formatLocalNumber(visibleAuthorsCount)} tác giả đang hiển thị` : t("author.hindexVuotTroi30")
  }, {
    label: t("article.tongBaiBao"),
    value: formatLocalNumber(totalWorksCount),
    icon: 'lucide:file-text',
    desc: t("author.tongBaiBaoTrenTrangHienTai")
  }, {
    label: t("author.tongCitations"),
    value: formatLocalNumber(totalCitationCount),
    icon: 'lucide:quote',
    desc: t("author.tongCitationsTrenTrangHienTai")
  }];
  return <div className="author-list-page">
      <Header />

      <Container>
        <MuiBox component="nav" sx={{ marginBottom: "1.5rem" }} className="author-list-breadcrumb" aria-label="breadcrumb">
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "1rem", listStyle: "none" }} >
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} >
              <span className="author-list-breadcrumb__link" onClick={() => navigate('/')}>{t("author.tongQuan")}</span>
            </MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" }, color: "primary.main" }} className="active" aria-current="page">{t("author.tacGiaNoiBat")}</MuiBox>
          </MuiBox>
        </MuiBox>

        <section className="author-list-hero">
          <div className="author-list-hero__content">
            <div className="author-list-eyebrow">
              <Icon icon="lucide:users-round" width="17" />
              <span>Author registry</span>
            </div>
            <h1 className="author-list-title">{t("author.danhSachNhaKhoaHocTacGia")}</h1>
            <p className="author-list-description">{t("author.traCuuThongTinChiSoHocThuatHin")}</p>
          </div>
        </section>

        <AuthorNavigationTabs activeTab="list" />

        <Row sx={{ gap: "1rem", marginBottom: "1.5rem" }} >
          {statCards.map((stat, idx) => <Col xs={12} sm={6} lg={3} key={idx}>
              <Card className="author-stat-card">
                <div className="author-stat-header">
                  <span className="author-stat-label">{stat.label}</span>
                  <Icon className="author-stat-icon" icon={stat.icon} width="16" />
                </div>
                <div className="author-stat-value">{stat.value}</div>
                <div className="author-stat-desc">{stat.desc}</div>
              </Card>
            </Col>)}
        </Row>

        <FilterCard sx={{ marginBottom: "1.5rem" }} className="author-filter-card">
          <Form onSubmit={handleSearchSubmit}>
            <Row sx={{ gap: "1rem", alignItems: "center" }} className="author-filter-row">
              <Col xs={12} lg={4}>
                <FilterSearch value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder={t("author.timTheoTenVienNghienCuuTuKhoa")} />
              </Col>

              <Col xs={12} sm={6} lg={3} className="author-subject-filter-col">
                <FilterSelect value={subjectAreaVal} onChange={e => handleFilterChange('subject_area', e.target.value)} options={[{
                value: '',
                label: t("admin.chonLinhVuc")
              }, ...(subjectAreas || []).map(area => ({
                value: area.display_name || area.name || '',
                label: area.display_name || area.name || ''
              }))]} />
              </Col>

              <Col sx={{ display: "flex", gap: "0.5rem" }} xs={12} sm={6} lg={1} >
                <PrimaryButton sx={{ width: "100%", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} type="submit" >{t("searchBtn")}</PrimaryButton>
              </Col>
            </Row>
          </Form>
        </FilterCard>

        <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
          {viewMode === 'grid' ? loadingAuthors ? <Row sx={{ gap: "1rem" }} >
                {Array.from({
            length: limitVal
          }).map((_, idx) => <Col xs={12} md={6} key={idx}>
                    <Card className="author-grid-skeleton">
                      <MuiBox component="div" sx={{ display: "flex", gap: "1rem", marginBottom: "1rem" }} >
                        <LoadingSkeleton width="48px" height="48px" borderRadius="50%" />
                        <MuiBox component="div" sx={{ flexGrow: 1 }} >
                          <LoadingSkeleton sx={{ marginBottom: "0.5rem" }} width="60%" height="16px"  />
                          <LoadingSkeleton width="40%" height="12px" />
                        </MuiBox>
                      </MuiBox>
                      <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="100%" height="32px"  />
                      <LoadingSkeleton width="30%" height="18px" />
                    </Card>
                  </Col>)}
              </Row> : authors.length === 0 ? <AuthorTable authors={[]} loading={false} error={errorAuthors} onRetry={() => fetchAuthors()} /> : <Row sx={{ gap: "1rem" }} >
                {authors.map(author => <Col xs={12} md={6} key={author.author_id ?? author.id}>
                    <AuthorCard author={author} />
                  </Col>)}
              </Row> : <AuthorTable authors={authors} loading={loadingAuthors} error={errorAuthors} onRetry={() => fetchAuthors()} startIndex={startIndex} />}
        </MuiBox>

        {authors.length > 0 && totalPagesCount > 1 && <AdminPagination totalItems={totalAuthors} currentPage={pageVal} limit={limitVal} onPageChange={handlePageChange} entityName={t("author.tacGia")} />}
      </Container>
    </div>;
}
