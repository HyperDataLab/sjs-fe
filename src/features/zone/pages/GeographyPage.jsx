import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback, useRef } from 'react';
import { Container, Row, Col, Form } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import useZoneStats from '../hooks/useZoneStats';
import { getCountryArticlesApi } from '../api/zone.api';
import GeographyTerritoryChart from '../components/GeographyTerritoryChart';
import GeographyRankingTable from '../components/GeographyRankingTable';
import GeographyArticleList from '../components/GeographyArticleList';
import Header from '../../landing/components/Header';
import AuthRequiredModal from '../../../shared/components/AuthRequiredModal';
import { useAuthStore } from '../../../app/store/authStore';
import { isAuthenticated as checkAuthSession } from '../../../shared/utils/auth';


import MuiBox from '@mui/material/Box';

export default function GeographyPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticatedState = useAuthStore(state => state.isAuthenticated);

  // Khôi phục phiên đăng nhập từ cookie khi mount component ở route công khai
  useEffect(() => {
    checkAuthSession();
  }, []);
  const {
    countryStats,
    loadingCountries,
    errorCountries,
    fetchCountryStats
  } = useZoneStats();

  // Selected country state
  const [selectedCountry, setSelectedCountry] = useState(null);

  // State lưu trữ năm xuất bản được chọn để lọc (Mặc định: 'All' - hiển thị tất cả các năm)
  const [selectedYear, setSelectedYear] = useState('All');

  // Articles listing states
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [articlesPage, setArticlesPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  // Auth Modal state
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Ref to scroll to articles list
  const articlesRef = useRef(null);

  // Hook tự động gọi lại API để tải thống kê theo quốc gia bất cứ khi nào năm lọc (selectedYear) thay đổi
  useEffect(() => {
    fetchCountryStats({
      limit: 1000,
      year: selectedYear === 'All' ? undefined : selectedYear
    });
  }, [selectedYear, fetchCountryStats]);

  // Hàm phụ trợ dùng để lấy danh sách bài viết thuộc quốc gia đang chọn (có hỗ trợ lọc theo năm)
  const fetchArticles = useCallback(async (countryId, pageNum, yearFilter) => {
    setLoadingArticles(true);
    try {
      const params = {
        page: pageNum,
        limit: 10
      };
      // Nếu có bộ lọc năm hoạt động, ta sẽ gửi kèm tham số publication_year lên API bài báo
      if (yearFilter && yearFilter !== 'All') {
        params.publication_year = Number(yearFilter);
      }
      const res = await getCountryArticlesApi(countryId, params);
      if (res.data && res.data.success !== false) {
        const resData = res.data.data || {};
        setArticles(resData.articles || resData.items || []);
        if (resData.pagination) {
          setTotalArticles(resData.pagination.total || 0);
          setTotalPages(resData.pagination.total_pages || 1);
        }
      }
    } catch (err) {
      console.error(t("zone.loiKhiLayDanhSachBaiBaoCuaQuoc"), err);
      setArticles([]);
      setTotalArticles(0);
      setTotalPages(1);
    } finally {
      setLoadingArticles(false);
    }
  }, []);

  // Hook tự động kích hoạt tải lại danh sách bài báo khi thay đổi quốc gia được chọn, trang phân trang, hoặc năm được chọn lọc
  useEffect(() => {
    if (selectedCountry) {
      fetchArticles(selectedCountry.zone_id, articlesPage, selectedYear);
    } else {
      setArticles([]);
      setTotalArticles(0);
      setTotalPages(1);
    }
  }, [selectedCountry, articlesPage, selectedYear, fetchArticles]);

  // Handle country row or bar chart click
  const handleSelectCountry = country => {
    if (selectedCountry?.zone_id === country.zone_id) {
      // Toggle off
      setSelectedCountry(null);
      setArticlesPage(1);
    } else {
      setSelectedCountry(country);
      setArticlesPage(1);
      // Scroll to articles listing
      setTimeout(() => {
        articlesRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  // Bắt sự kiện click vào bài báo: yêu cầu đăng nhập nếu chưa có phiên hợp lệ
  const handleDetailClick = id => {
    if (!isAuthenticatedState) {
      setShowAuthModal(true);
    } else {
      navigate(`/articles/${id}/visual`);
    }
  };
  return <div className="geography-page-wrapper grid-bg">
      <MuiBox component="div" sx={{ position: "absolute" }} className="radial-fade inset-0" style={{
      pointerEvents: 'none',
      zIndex: 0
    }} />
      <Header />
      <Container sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "1.5rem", paddingBottom: "1.5rem", position: "relative" }} fluid  style={{
      zIndex: 1
    }}>
        {/* Breadcrumb */}
        <MuiBox component="div" sx={{ marginBottom: "0.5rem" }} className="geography-breadcrumb">
          <span>{t("author.tongQuan")}<MuiBox component="span" sx={{ marginLeft: "0.25rem", marginRight: "0.25rem" }} >&rsaquo;</MuiBox> <span className="geography-breadcrumb-active">{t("zone.phanBoDiaLy")}</span>
          </span>
        </MuiBox>

        {/* Header */}
        <MuiBox component="div" sx={{ marginBottom: "1.5rem", paddingBottom: "0.5rem", display: "flex", flexDirection: "column", "@media (min-width:768px)": { flexDirection: "row", alignItems: "center" }, justifyContent: "space-between", gap: "1rem" }} >
          <div>
            <h1 className="geography-title">{t("zone.phanBoTapChiTheoQuocGia")}</h1>
            <p className="geography-subtitle">{t("zone.xemThongKeSoLuongAnPhamKhoaHoc")}</p>
          </div>

          {/* Year Filter Dropdown */}
          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}  style={{
          minWidth: '220px'
        }}>
            <MuiBox component="span" sx={{ fontWeight: 600, whiteSpace: "nowrap" }} className="text-muted-custom" style={{
            fontSize: '0.82rem'
          }}>{t("article.namXuatBan")}</MuiBox>
            <Form.Select sx={{ boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)" }} value={selectedYear} onChange={e => {
            setSelectedYear(e.target.value);
            setArticlesPage(1);
          }} className="geography-select">
              <option value="All">{t("zone.tatCaCacNam")}</option>
              {['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'].map(yr => <option key={yr} value={yr}>{yr}</option>)}
            </Form.Select>
          </MuiBox>
        </MuiBox>

        {/* Error handling for countries */}
        {errorCountries && <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: "1px solid transparent", borderRadius: "0.375rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}  role="alert">
            <div>
              <strong>{t("zone.loiTaiDuLieu")}</strong>
              {errorCountries}
            </div>
            <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: "1px solid", borderRadius: "0.25rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", borderColor: "error.main", bgcolor: "transparent", color: "error.main", ml: "auto" }}  onClick={() => fetchCountryStats({
          limit: 1000,
          year: selectedYear === 'All' ? undefined : selectedYear
        })}>{t("article.thuLai")}</MuiBox>
          </MuiBox>}

        {/* Main Content Layout */}
        <Row sx={{ gap: "1.5rem" }} >
          {/* Left Column: Chart Area */}
          <Col xs={12} lg={7} xl={8}>
            <GeographyTerritoryChart data={countryStats} loading={loadingCountries} selectedCountry={selectedCountry} onSelectCountry={handleSelectCountry} selectedYear={selectedYear} />
          </Col>

          {/* Right Column: Ranking Table */}
          <Col xs={12} lg={5} xl={4}>
            <GeographyRankingTable data={countryStats} loading={loadingCountries} selectedCountry={selectedCountry} onSelectCountry={handleSelectCountry} />
          </Col>
        </Row>

        {/* Selected Country Articles List */}
        {selectedCountry && <Row sx={{ marginTop: "1.5rem" }}  ref={articlesRef}>
            <Col xs={12}>
              <GeographyArticleList articles={articles} loading={loadingArticles} total={totalArticles} page={articlesPage} totalPages={totalPages} onPageChange={setArticlesPage} onDetailClick={handleDetailClick} countryName={selectedCountry.name} />
            </Col>
          </Row>}
      </Container>

      {/* Login guard modal */}
      <AuthRequiredModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
    </div>;
}
