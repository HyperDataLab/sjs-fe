import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\pages\ArticleListPage.jsx
 */
import { Container, Modal, Breadcrumb } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { useNavigate } from 'react-router-dom';
import Header from '../../landing/components/Header';
import useArticleList from '../hooks/useArticleList';
import ArticleStatsCards from '../components/ArticleStatsCards';
import ArticleFilterBar from '../components/ArticleFilterBar';
import ArticleTable from '../components/ArticleTable';
import AdminPagination from '../../../shared/components/Pagination';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';


import MuiBox from '@mui/material/Box';

export default function ArticleListPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    articles,
    total,
    currentPage,
    totalPages,
    isLoading,
    stats,
    filters,
    updateFilters,
    clearFilters,
    handlePageChange,
    handleDetailClick,
    showAuthModal,
    setShowAuthModal,
    handleAuthRedirect
  } = useArticleList();
  return <div className="article-list-page grid-bg">
      <Header />

      <Container className="article-list-shell">
        {/* Breadcrumb */}
        <MuiBox component="nav" sx={{ marginBottom: "1.5rem" }} aria-label="breadcrumb" className="article-list-breadcrumb">
          <Breadcrumb sx={{ marginBottom: "0", display: "flex", alignItems: "center" }} >
            <Breadcrumb.Item onClick={() => navigate('/')} linkProps={{
            style: {
              cursor: 'pointer'
            }
          }}>{t("home")}</Breadcrumb.Item>
            <Breadcrumb.Item active>{t("articles")}</Breadcrumb.Item>
          </Breadcrumb>
        </MuiBox>

        {/* Page Header */}
        <section className="article-list-hero" aria-labelledby="article-list-title">
          <div>
            <div className="article-list-eyebrow">
              <Icon icon="lucide:library-big" width="15" height="15" />
              ResearchPulse Articles
            </div>
            <h1 id="article-list-title" className="article-list-title">{t("article.khoLuuTruBaiBaoKhoaHoc")}</h1>
            <p className="article-list-description">{t("article.duyetQuaTimKiemVaLocHangNghinB")}</p>

            {filters.selectedVolume && <div className="article-list-scope">
                <Icon icon="solar:folder-with-files-bold" width="15" />
                <span>{t("article.dangXemBaiBaoThuocVolume")}{filters.selectedVolume}</span>
              </div>}
            {filters.selectedIssue && <div className="article-list-scope">
                <Icon icon="lucide:layers-3" width="15" />
                <span>{t("article.dangXemBaiBaoThuocIssue")}{filters.selectedIssue}</span>
              </div>}
          </div>

          <aside className="article-list-summary" aria-label="Tổng kết bài báo">
            <div className="article-list-summary__label">{t("article.tongKetQua")}</div>
            <div className="article-list-summary__value">
              {new Intl.NumberFormat().format(total)}
            </div>
          </aside>
        </section>

        {/* Thẻ thống kê */}
        <ArticleStatsCards stats={stats} isLoading={isLoading} />

        {/* Thanh lọc & Sắp xếp */}
        <ArticleFilterBar filters={filters} updateFilters={updateFilters} clearFilters={clearFilters} />

        {/* Kết quả đếm */}
        <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }} >
          <div className="text-muted-custom text-xs">
            {t("pagination.showing", "Showing")}{" "}
            <span className="text-main font-weight-bold">{articles.length}</span>{" "}
            {t("pagination.of", "of")}{" "}
            <span className="text-main font-weight-bold">{total ? total.toLocaleString() : 0}</span>{" "}
            {t("article.baiBaoKhoaHoc", "scientific papers")}
          </div>
        </MuiBox>

        {/* Bảng dữ liệu */}
        <ArticleTable articles={articles} isLoading={isLoading} onDetailClick={handleDetailClick} onClearFilters={clearFilters} />

        {/* Phân trang */}
        {total > 0 && totalPages > 1 && <AdminPagination totalItems={total} currentPage={currentPage} limit={10} onPageChange={handlePageChange} entityName="bài báo" />}
      </Container>

      {/* Warning Auth Modal */}
      <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)} centered contentClassName="border-0 text-main" contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: '16px' }}>
        <Modal.Body sx={{ padding: "1.5rem", textAlign: "center" }} >
          <MuiBox component="div" sx={{ marginBottom: "1rem" }} className="article-modal-icon">
            <Icon icon="lucide:lock" width="30" height="30" />
          </MuiBox>
          <MuiBox component="h4" sx={{ marginBottom: "1rem" }} className="font-display font-weight-bold text-main">{t("article.yeuCauDangNhap")}</MuiBox>
          <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="text-muted-custom text-sm" style={{
          lineHeight: '1.6'
        }}>{t("article.deXemToanBoNoiDungChiTietBaiBa")}</MuiBox>
          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }} >
            <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} variant="outline" onClick={() => setShowAuthModal(false)} className="text-xs" style={{
            fontSize: '0.85rem'
          }}>{t("article.dong")}</PrimaryButton>
            <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} className="text-xs" onClick={handleAuthRedirect} style={{
            fontSize: '0.85rem'
          }}>{t("article.dangNhapNgay")}</PrimaryButton>
          </MuiBox>
        </Modal.Body>
      </Modal>
    </div>;
}
