import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\pages\JournalListPage.jsx
 */
import { Container } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import Header from '../../landing/components/Header';
import JournalStatsCards from '../components/JournalStatsCards';
import JournalSearchBar from '../components/JournalSearchBar';
import JournalTable from '../components/JournalTable';
import useJournalList from '../hooks/useJournalList';
import AdminPagination from '../../../shared/components/Pagination';


import MuiBox from '@mui/material/Box';

export default function JournalListPage() {
  const {
    t
  } = useTranslation();
  const {
    journals,
    pagination,
    isLoading,
    loadingStats,
    error,
    stats,
    searchInput,
    setSearchInput,
    quartile,
    setQuartile,
    isOpenAccess,
    setIsOpenAccess,
    handleSearchSubmit,
    handlePageChange
  } = useJournalList();
  const totalPages = Math.ceil(pagination.total / pagination.limit) || 1;

  // Clear all filters handler
  const handleClearAll = () => {
    setSearchInput('');
    setQuartile('all');
    setIsOpenAccess('all');
    // Force reset page and refetch via hook states indirectly
    window.location.reload();
  };
  return <div className="journal-list-page text-main">
      <Header />

      <Container>
        <MuiBox component="nav" sx={{ marginBottom: "1.5rem" }} aria-label="breadcrumb" className="journal-list-breadcrumb">
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "1rem", listStyle: "none" }} >
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} >
              <span className="journal-list-breadcrumb__link" onClick={() => window.location.href = '/'}>
                Home
              </span>
            </MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" }, color: "primary.main" }} className="active" aria-current="page">{t("typeJournal")}</MuiBox>
          </MuiBox>
        </MuiBox>

        <section className="journal-list-hero">
          <div className="journal-list-hero__content">
            <div className="journal-list-eyebrow">
              <Icon icon="lucide:library" width="17" />
              <span>Journal catalog</span>
            </div>
            <h1 className="journal-list-title">{t("typeJournal")}</h1>
            <p className="journal-list-description">{t("journal.danhSachTapChiKhoaHocTrongHeTh")}</p>
          </div>
        </section>

        {/* Statistic Cards */}
        <JournalStatsCards stats={stats} loading={loadingStats} />

        {/* Search & Filter Bar */}
        <JournalSearchBar searchInput={searchInput} setSearchInput={setSearchInput} quartile={quartile} setQuartile={setQuartile} isOpenAccess={isOpenAccess} setIsOpenAccess={setIsOpenAccess} onSubmit={handleSearchSubmit} onClear={handleClearAll} />

        {/* Error State */}
        {error && <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: "1px solid transparent", borderRadius: "0.375rem", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }} className="journal-alert" role="alert">
            <Icon icon="lucide:alert-circle" width="18" />
            <div>{error}</div>
          </MuiBox>}

        {/* Table & Loading Skeleton wrapper */}
        {isLoading ? <div className="journal-loading-panel">
            <MuiBox component="div" sx={{ marginBottom: "1rem" }} className="skeleton-shimmer journal-skeleton-line" />
            {[1, 2, 3, 4, 5].map(i => <MuiBox component="div" sx={{ marginBottom: "0.5rem" }} key={i} className="skeleton-shimmer journal-skeleton-row" />)}
          </div> : <>
            {/* Journal Table */}
            <JournalTable journals={journals} page={pagination.page} limit={pagination.limit} />

            {/* Pagination Controls */}
            {journals.length > 0 && totalPages > 1 && <AdminPagination totalItems={pagination.total} currentPage={pagination.page} limit={pagination.limit} onPageChange={handlePageChange} entityName="tạp chí" />}
          </>}
      </Container>
    </div>;
}
