import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\keywords\pages\KeywordListPage.jsx
 */
import { Container } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import Header from '../../landing/components/Header';
import KeywordSearchBar from '../components/KeywordSearchBar';
import KeywordSortDropdown from '../components/KeywordSortDropdown';
import KeywordList from '../components/KeywordList';
import { useKeywords } from '../hooks/useKeywords';


import MuiBox from '@mui/material/Box';

/**
 * Trang danh sách Keywords.
 * Route: /keywords
 */
export default function KeywordListPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    keywords,
    pagination,
    loading,
    error,
    filters,
    actions
  } = useKeywords();
  const handleSearch = q => {
    actions.setKeyword(q);
  };
  const handleClearSearch = () => {
    actions.setKeyword('');
  };
  const handleSortChange = (sortBy, sortOrder) => {
    actions.setSort(sortBy, sortOrder);
  };
  const handlePageChange = page => {
    actions.setPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleViewArticles = keywordId => {
    navigate(`/keywords/${keywordId}/articles`);
  };
  return <MuiBox component="div" sx={{ display: "flex", flexDirection: "column" }} className="grid-bg keyword-list-page">
      <Header />

      <Container sx={{ paddingBottom: "3rem", flexGrow: 1 }} >
        <MuiBox component="nav" sx={{ marginBottom: "1.5rem" }} aria-label="breadcrumb" className="keyword-list-breadcrumb">
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "1rem", listStyle: "none" }} >
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" }, fontWeight: 600 }} className="active text-main" aria-current="page">Keywords</MuiBox>
          </MuiBox>
        </MuiBox>

        <section className="keyword-list-hero">
          <div className="keyword-list-hero__content">
            <div className="keyword-list-eyebrow">
              <Icon icon="lucide:tags" width="18" />
              <span>Research Keywords</span>
            </div>
            <h1 className="keyword-list-title">{t("keywords.khamPhaKeywords")}</h1>
            <p className="keyword-list-description">{t("keywords.timKiemCacTuKhoaNghienCuuVaMoN")}</p>
            {pagination.total > 0 && <div className="keyword-list-total-pill">
                <Icon icon="lucide:database" width="16" />
                <span>{t("keywords.tongCong")}<strong>{pagination.total.toLocaleString()}</strong>{t("keywords.keywordTrongHeThong")}</span>
              </div>}
          </div>
        </section>

        <div className="keyword-toolbar">
          <div className="keyword-toolbar__search">
            <KeywordSearchBar value={filters.keyword} onSearch={handleSearch} onClear={handleClearSearch} />
          </div>
          <KeywordSortDropdown sortBy={filters.sortBy} sortOrder={filters.sortOrder} onChange={handleSortChange} />
        </div>

        {/* Active filter context */}
        {filters.keyword && <div className="keyword-active-filter">
            <span>{t("keywords.ketQuaTimKiemCho")}</span>
            <span className="keyword-active-filter__term">
              "{filters.keyword}"
            </span>
            <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: 0, borderRadius: "0.25rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "underline", bgcolor: "transparent", color: "primary.main", padding: "0" }} type="button" className="keyword-active-filter__clear" onClick={handleClearSearch}>
              <Icon sx={{ marginInlineEnd: "0.25rem" }} icon="lucide:x" width="14"  />{t("keyword.xoa")}</MuiBox>
          </div>}

        {/* Keyword grid */}
        <KeywordList keywords={keywords} loading={loading} error={error} pagination={pagination} onPageChange={handlePageChange} onViewArticles={handleViewArticles} onRetry={actions.refetch} />
      </Container>
    </MuiBox>;
}
