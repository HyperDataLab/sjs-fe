import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\keywords\pages\KeywordArticlesPage.jsx
 */
import { Container } from '@/shared/components/ui/muiAdapters';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import Header from '../../landing/components/Header';
import LoadingSkeleton from '../../../shared/components/LoadingSkeleton';
import KeywordArticleList from '../components/KeywordArticleList';
import { useKeywordArticles } from '../hooks/useKeywordArticles';


import MuiBox from '@mui/material/Box';

/**
 * Trang bài báo theo Keyword.
 * Route: /keywords/:keywordId/articles
 */
export default function KeywordArticlesPage() {
  const {
    t
  } = useTranslation();
  const {
    keywordId
  } = useParams();
  const navigate = useNavigate();
  const {
    keyword,
    articles,
    pagination,
    loadingKeyword,
    loadingArticles,
    keywordError,
    articlesError,
    handlePageChange
  } = useKeywordArticles(keywordId);
  const handleViewDetail = articleId => {
    navigate(`/articles/${articleId}/visual`);
  };
  const handleRetry = () => {
    handlePageChange(1);
  };
  return <MuiBox component="div" sx={{ display: "flex", flexDirection: "column" }} className="grid-bg keyword-articles-page">
      <Header />

      <Container sx={{ paddingBottom: "3rem", flexGrow: 1 }} >
        <MuiBox component="nav" sx={{ marginBottom: "1.5rem" }} aria-label="breadcrumb" className="keyword-articles-breadcrumb">
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "1rem", listStyle: "none" }} >
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} >
              <span role="button" tabIndex={0} onClick={() => navigate('/keywords')} onKeyDown={e => e.key === 'Enter' && navigate('/keywords')} className="keyword-articles-back-link">
                Keywords
              </span>
            </MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" }, fontWeight: 600 }} className="active text-main" aria-current="page">{t("keywords.baiBaoTheoKeyword")}</MuiBox>
          </MuiBox>
        </MuiBox>

        <section className="keyword-articles-hero">
          <div className="keyword-articles-hero__content">
            {loadingKeyword ? <>
                <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="200px" height="14px"  />
                <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="400px" height="36px"  />
                <LoadingSkeleton width="280px" height="18px" />
              </> : keywordError ? <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} >
                <Icon icon="lucide:alert-circle" width="28" className="keyword-article-state-icon" />
                <div>
                  <h1 className="keyword-articles-empty-title">{t("keywords.keywordKhongTimThay")}</h1>
                  <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom">ID: {keywordId}</MuiBox>
                </div>
              </MuiBox> : keyword ? <div>
                <div className="keyword-articles-eyebrow">
                  <Icon icon="lucide:tag" width="16" />
                  <span>
                    Research Keyword
                  </span>
                </div>
                <h1 className="keyword-articles-title">
                  {keyword.display_name}
                </h1>
                <p className="keyword-articles-summary">
                  {pagination.total > 0 ? <><strong>{pagination.total.toLocaleString()}</strong>{t("keywords.baiBaoDangDuocLienKetVoiKeywor")}</> : t("keywords.keywordNayHienChuaCoBaiBaoLien")}
                </p>
              </div> : null}
          </div>
        </section>

        <div>
          <div className="keyword-articles-heading">
            <h2 className="keyword-articles-section-title">{t("keywords.baiBaoLienQuan")}</h2>
            <MuiBox component="button" sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: 0, borderRadius: "0.25rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "underline", bgcolor: "transparent", color: "primary.main", gap: "0.5rem" }} type="button" className="keyword-articles-return" onClick={() => navigate('/keywords')}>
              <Icon icon="lucide:arrow-left" width="16" />{t("keywords.quayLaiKeywords")}</MuiBox>
          </div>

          <KeywordArticleList articles={articles} loading={loadingArticles} error={articlesError} pagination={pagination} onPageChange={page => {
          handlePageChange(page);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }} onViewDetail={handleViewDetail} onRetry={handleRetry} />
        </div>
      </Container>
    </MuiBox>;
}
