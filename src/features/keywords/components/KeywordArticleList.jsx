import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\keywords\components\KeywordArticleList.jsx
 */
import Icon from '../../../shared/components/Icon.jsx';
import LoadingSkeleton from '../../../shared/components/LoadingSkeleton';
import AdminPagination from '../../../shared/components/Pagination';
import KeywordArticleItem from './KeywordArticleItem';


import MuiBox from '@mui/material/Box';


/**
 * Danh sách bài báo theo keyword với trạng thái và phân trang.
 */
export default function KeywordArticleList({
  articles,
  loading,
  error,
  pagination,
  onPageChange,
  onViewDetail,
  onRetry
}) {
  const {
    t
  } = useTranslation();
  const totalItems = pagination?.total || pagination?.total_items || pagination?.totalItems || 0;
  const currentPage = pagination?.page || 1;
  const limit = pagination?.limit || pagination?.page_size || 10;
  if (loading) {
    return <div className="keyword-article-list">
        {[1, 2, 3].map(item => <div key={item} className="keyword-article-skeleton">
            <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="160px" height="18px"  />
            <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="80%" height="28px"  />
            <LoadingSkeleton sx={{ marginBottom: "1.5rem" }} width="100%" height="44px"  />
            <LoadingSkeleton width="140px" height="38px" />
          </div>)}
      </div>;
  }
  if (error) {
    return <div className="keyword-article-state">
        <Icon sx={{ marginBottom: "1rem" }} icon="lucide:alert-triangle" width="42" className="keyword-article-state-icon" />
        <h3 className="keyword-article-state-title">{t("keywords.khongTheTaiDanhSachBaiBao")}</h3>
        <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="text-muted-custom">{error}</MuiBox>
        <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: "1px solid transparent", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", paddingLeft: "1.5rem", paddingRight: "1.5rem" }} type="button" className="keyword-article-retry" onClick={onRetry}>{t("article.thuLai")}</MuiBox>
      </div>;
  }
  if (!articles || articles.length === 0) {
    return <div className="keyword-article-state">
        <Icon sx={{ marginBottom: "1rem" }} icon="lucide:file-x" width="42" className="text-muted-custom" />
        <h3 className="keyword-article-state-title">{t("keywords.keywordNayChuaCoBaiBaoLienQuan")}</h3>
        <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom">{t("keywords.hayThuKeywordKhacDeKhamPhaThem")}</MuiBox>
      </div>;
  }
  return <>
      <div className="keyword-article-list">
        {articles.map(article => <KeywordArticleItem key={article.article_id} article={article} onViewDetail={onViewDetail} />)}
      </div>
      {totalItems > limit && <AdminPagination totalItems={totalItems} currentPage={currentPage} limit={limit} onPageChange={onPageChange} entityName="bài báo" />}
    </>;
}
