import { useTranslation } from "react-i18next";
/**
 * @file AuthorArticlesSection.jsx
 * @description Full publications list with sort tabs and pagination.
 */
import { useState } from "react";
import AuthorArticleRow from "./AuthorArticleRow";
import LoadingSkeleton from "../../../shared/components/LoadingSkeleton";
import EmptyState from "../../../shared/components/EmptyState";
import ErrorState from "../../../shared/components/ErrorState";
import AdminPagination from "../../../shared/components/Pagination";


import MuiBox from '@mui/material/Box';


const SORT_OPTIONS = [
  { key: "year-desc", labelKey: "author.namXuatBanMoiNhat" },
  { key: "year-asc",  labelKey: "author.namXuatBanCuNhat"  },
  { key: "cite-desc", labelKey: "author.trichDanNhieuNhat"  },
];

export default function AuthorArticlesSection({ articles = [], loading = false, error = null, onRetry = null }) {
  const { t } = useTranslation();
  const [sortKey, setSortKey]       = useState("year-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 5;

  if (error) {
    return (
      <div className="adp-card adp-pubs" id="adp-publications">
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    );
  }

  const sorted = [...articles].sort((a, b) => {
    if (sortKey === "year-desc") return (b.publication_year ?? 0) - (a.publication_year ?? 0);
    if (sortKey === "year-asc")  return (a.publication_year ?? 0) - (b.publication_year ?? 0);
    if (sortKey === "cite-desc") return (b.citation_count ?? 0) - (a.citation_count ?? 0);
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const pageItems  = sorted.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleSort = (key) => {
    setSortKey(key);
    setCurrentPage(1);
  };

  return (
    <div className="adp-card adp-pubs" id="adp-publications">
      {/* Header */}
      <div className="adp-pubs-header">
        <div className="adp-pubs-title-area">
          <h2 className="adp-section-title">{t("author.congTrinhCongBoKhoaHoc")}</h2>
          {!loading && (
            <span className="adp-pubs-count">
              {articles.length} {t("articles")}
            </span>
          )}
        </div>

        {!loading && articles.length > 0 && (
          <div className="adp-sort-tabs">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                className={`adp-sort-tab${sortKey === opt.key ? " adp-sort-tab--active" : ""}`}
                onClick={() => handleSort(opt.key)}
              >
                {t(opt.labelKey)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="adp-article-row">
              <LoadingSkeleton sx={{ marginBottom: "0.5rem" }} width="45%" height="10px"  />
              <LoadingSkeleton sx={{ marginBottom: "0.5rem" }} width="80%" height="14px"  />
              <LoadingSkeleton width="30%" height="10px" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <EmptyState sx={{ border: 0, paddingTop: "1rem", paddingBottom: "1rem" }}
          title={t("author.chuaCoCongTrinhCongBo")}
          description={t("author.tacGiaNayChuaCoBaiBaoKhoaHocNa")}
          icon="lucide:file-question"

        />
      ) : (
        <div>
          {pageItems.map((article, idx) => (
            <AuthorArticleRow
              key={article.article_id ?? article.id ?? idx}
              article={article}
              isLast={idx === pageItems.length - 1}
            />
          ))}
          {totalPages > 1 && (
            <MuiBox component="div" sx={{ marginTop: "1rem" }} >
              <AdminPagination
                totalItems={sorted.length}
                currentPage={currentPage}
                limit={PER_PAGE}
                onPageChange={setCurrentPage}
                entityName="bài báo"
              />
            </MuiBox>
          )}
        </div>
      )}
    </div>
  );
}
