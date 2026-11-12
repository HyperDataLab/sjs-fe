import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\keywords\components\KeywordList.jsx
 */
import { Row, Col } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import LoadingSkeleton from '../../../shared/components/LoadingSkeleton';
import AdminPagination from '../../../shared/components/Pagination';
import KeywordListItem from './KeywordListItem';


import MuiBox from '@mui/material/Box';


/**
 * Danh sách keyword kèm loading, empty, error và pagination.
 */
export default function KeywordList({
  keywords,
  loading,
  error,
  pagination,
  onPageChange,
  onViewArticles,
  onRetry
}) {
  const {
    t
  } = useTranslation();
  const totalItems = pagination?.total || pagination?.total_items || pagination?.totalItems || 0;
  const currentPage = pagination?.page || 1;
  const limit = pagination?.limit || pagination?.page_size || 10;
  if (loading) {
    return <Row sx={{ gap: "1rem" }} >
        {[1, 2, 3, 4, 5, 6].map(item => <Col md={6} xl={4} key={item}>
            <div className="keyword-skeleton-card">
              <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="120px" height="14px"  />
              <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="80%" height="28px"  />
              <LoadingSkeleton sx={{ marginBottom: "1.5rem" }} width="140px" height="22px"  />
              <LoadingSkeleton width="180px" height="40px" />
            </div>
          </Col>)}
      </Row>;
  }
  if (error) {
    return <div className="keyword-state-card">
        <Icon sx={{ marginBottom: "1rem" }} icon="lucide:alert-triangle" width="42" className="keyword-state-icon" />
        <MuiBox component="h3" sx={{ marginBottom: "0.5rem" }} className="keyword-state-title">{t("keywords.khongTheTaiDanhSachKeywords")}</MuiBox>
        <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="text-muted-custom">{error}</MuiBox>
        <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: "1px solid transparent", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", paddingLeft: "1.5rem", paddingRight: "1.5rem" }} type="button" onClick={onRetry} className="keyword-retry-btn">{t("article.thuLai")}</MuiBox>
      </div>;
  }
  if (!keywords || keywords.length === 0) {
    return <div className="keyword-state-card">
        <Icon sx={{ marginBottom: "1rem" }} icon="lucide:inbox" width="42" className="text-muted-custom" />
        <MuiBox component="h3" sx={{ marginBottom: "0.5rem" }} className="keyword-state-title">{t("keywords.khongTimThayKeywordPhuHop")}</MuiBox>
        <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom">{t("keywords.thuDoiTuKhoaTimKiemHoacResetBo")}</MuiBox>
      </div>;
  }
  return <>
      <Row sx={{ gap: "1rem" }} >
        {keywords.map(keyword => <Col md={6} xl={4} key={keyword.keyword_id}>
            <KeywordListItem keyword={keyword} onViewArticles={onViewArticles} />
          </Col>)}
      </Row>
      {totalItems > limit && <AdminPagination totalItems={totalItems} currentPage={currentPage} limit={limit} onPageChange={onPageChange} entityName="keywords" />}
    </>;
}
