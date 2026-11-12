import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\catalog\pages\CatalogSearchPage.jsx
 */
import { Container, Dropdown, Breadcrumb } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { useNavigate } from 'react-router-dom';
import { useCatalogSearch } from '../hooks/useCatalogSearch';
import FilterPanel from '../components/FilterPanel';
import JournalTable from '../components/JournalTable';
import LoadingSkeleton from '../../../shared/components/LoadingSkeleton';
import AuthRequiredModal from '../../../shared/components/AuthRequiredModal';
import Header from '../../landing/components/Header';
import useAuth from '../../auth/hooks/useAuth';
import AdminPagination from '../../../shared/components/Pagination';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';


import MuiBox from '@mui/material/Box';

export default function CatalogSearchPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    searchInput,
    setSearchInput,
    subjectAreas,
    subjectCategories,
    loadingFilters,
    journals,
    total,
    loadingJournals,
    error,
    page,
    sort,
    selectedAreas,
    selectedCategories,
    selectedAccess,
    selectedZone,
    zones,
    isInDoaj,
    followedJournals,
    showAuthModal,
    setShowAuthModal,
    handleSearchSubmit,
    onAreaSelect,
    onCategorySelect,
    onAccessSelect,
    onZoneSelect,
    handleDoajToggle,
    handleClearAll,
    handleSortChange,
    handlePageChange,
    handleFollowJournal,
    fetchJournals
  } = useCatalogSearch(user);
  const pageLimit = 10;
  const totalPages = Math.ceil(total / pageLimit) || 1;
  return <MuiBox component="div" sx={{ minHeight: "100vh" }} className="text-main catalog-search-page">
      {/* Navbar Header */}
      <Header />

      <Container className="catalog-shell">
        {/* Breadcrumbs */}
        <div aria-label="breadcrumb" className="catalog-breadcrumb">
          <Breadcrumb sx={{ marginBottom: "0", display: "flex", alignItems: "center" }} className="custom-breadcrumb">
            <Breadcrumb.Item sx={{ display: "flex", alignItems: "center" }} onClick={() => navigate('/')}  linkProps={{
            style: {
              cursor: 'pointer'
            }
          }}>{t("home")}</Breadcrumb.Item>
            <Breadcrumb.Item sx={{ display: "flex", alignItems: "center" }} active >{t("search")}</Breadcrumb.Item>

          </Breadcrumb>
        </div>

        {/* Page Title & Subtitle */}
        <MuiBox component="section" sx={{ textAlign: "left" }} className="catalog-hero">
          <h1 className="catalog-title">{t("catalog.danhMucTimKiem")}</h1>
          <p className="catalog-subtitle">{t("catalog.timKiemJournalLocTheoLinhVucXe")}</p>
        </MuiBox>

        {/* Catalog Main Layout */}
        <MuiBox component="div" sx={{ width: "100%" }} >
          {/* Toolbar Filter Panel */}
          <FilterPanel searchInput={searchInput} setSearchInput={setSearchInput} onSearchSubmit={handleSearchSubmit} subjectAreas={subjectAreas} subjectCategories={subjectCategories} selectedAreas={selectedAreas} selectedCategories={selectedCategories} selectedAccess={selectedAccess} onAreaSelect={onAreaSelect} onCategorySelect={onCategorySelect} onAccessSelect={onAccessSelect} selectedZone={selectedZone} zones={zones} onZoneSelect={onZoneSelect} isInDoaj={isInDoaj} onDoajToggle={handleDoajToggle} onClearAll={handleClearAll} loading={loadingFilters} />

          {/* Toolbar Panel */}
          <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:576px)": { flexDirection: "row", alignItems: "center" }, justifyContent: "space-between", gap: "1rem", textAlign: "left" }} className="catalog-toolbar">

            {/* Summary Counter text */}
            <div className="text-muted-custom catalog-count">
              {loadingJournals ? (
                <span>{t("catalog.dangTimKiemTapChi")}</span>
              ) : (
                <span>
                  {t("catalog.timThay", "Found ")}
                  <strong>{total}</strong> {t("catalog.tapChiCount", "journals")} · {t("pagination.page", "Page")} <span className="catalog-number">{page}/{totalPages}</span>
                </span>
              )}
            </div>

            {/* Sort Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="sort-dropdown" className="catalog-sort-toggle">
                  <Icon icon="lucide:arrow-up-down" width="14" />
                  <span>
                    {sort === 'metric' && t("catalog.macDinh")}
                    {sort === 'name' && t("catalog.tenAz")}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="catalog-dropdown-menu">
                  <Dropdown.Item onClick={() => handleSortChange('metric')}>{t("catalog.macDinh")}</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortChange('name')}>{t("catalog.tenAz")}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

          </MuiBox>

          {/* Main Result Area */}
          {loadingJournals ?
        // 3 Skeleton list cards loading placeholder
        <div>
              {[1, 2, 3].map(s => <MuiBox component="section" sx={{ padding: "1.5rem", marginBottom: "1rem", textAlign: "left" }} key={s} className="catalog-surface">
                  <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="60%" height="1.4rem"  />
                  <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="45%" height="0.8rem"  />
                  <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }} >
                    <LoadingSkeleton width="50px" height="1.2rem" />
                    <LoadingSkeleton width="100px" height="1.2rem" />
                    <LoadingSkeleton width="120px" height="1.2rem" />
                  </MuiBox>
                </MuiBox>)}
            </div> : error && journals.length === 0 ? <section className="catalog-surface catalog-state-card">
              <Icon icon={error?.includes(t("catalog.dangNhap")) ? 'lucide:lock' : 'lucide:alert-triangle'} className="catalog-state-icon" width="44" />
              <h2 className="catalog-state-title">
                {error?.includes(t("catalog.dangNhap")) ? t("catalog.canDangNhapDeTimKiem") : t("catalog.khongTheTaiDuLieuTimKiem")}
              </h2>
              <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="text-muted-custom">{error}</MuiBox>
              {error?.includes(t("catalog.dangNhap")) ? <PrimaryButton onClick={() => window.location.href = '/login'} variant="outline">{t("signIn")}</PrimaryButton> : <PrimaryButton onClick={() => fetchJournals()} variant="outline">{t("article.thuLai")}</PrimaryButton>}
            </section> : journals.length === 0 ?
        // Empty State Card
        <section className="catalog-surface catalog-state-card">
              <Icon icon="lucide:folder-search" className="catalog-state-icon" width="44" />
              <h2 className="catalog-state-title">{t("catalog.khongTimThayJournalPhuHop")}</h2>
              <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="text-muted-custom">{t("catalog.hayThuThayDoiTuKhoaTimKiemHoac")}</MuiBox>
              <PrimaryButton onClick={handleClearAll} variant="outline">{t("article.xoaBoLoc")}</PrimaryButton>
            </section> : <JournalTable journals={journals} followedJournals={followedJournals} onFollow={handleFollowJournal} />}

          {/* Pagination Controls */}
          {totalPages > 1 && !loadingJournals && <MuiBox component="div" sx={{ marginTop: "3rem" }} >
              <AdminPagination totalItems={total} currentPage={page} limit={pageLimit} onPageChange={handlePageChange} entityName="journals" />
            </MuiBox>}
        </MuiBox>
      </Container>

      {/* Guest Authentication Interception Modal */}
      <AuthRequiredModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
    </MuiBox>;
}
