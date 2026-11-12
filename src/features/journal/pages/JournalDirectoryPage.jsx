import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Container, Row } from '@/shared/components/ui/muiAdapters';
import { useJournalManagement } from "../hooks/useJournalManagement";
import JournalFilterBar from "../components/JournalFilterBar";
import JournalTableAdmin from "../components/JournalTableAdmin";
import JournalCardAdmin from "../components/JournalCardAdmin";
import AddJournalModal from "../components/modals/AddJournalModal";
import { StateCard } from "../../../shared/components/Card";


import MuiBox from '@mui/material/Box';


/**
 * Page JournalDirectoryPage - Màn hình chính quản lý thư mục các Tạp chí dành cho Admin.
 * Tuân thủ chuẩn: Lấy dữ liệu từ Hook Store -> Thực hiện Filter cục bộ -> Đổ ra Component hiển thị.
 */
export default function JournalDirectoryPage() {
  const {
    t
  } = useTranslation();
  // --- 1. LẤY TRẠNG THÁI VÀ HÀM TỪ ZUSTAND STORE ---
  const {
    journals,
    fetchInitialData,
    loading
  } = useJournalManagement();

  // --- 2. CÁC STATE CỤC BỘ DÙNG CHO PHÂN TRANG VÀ BỘ LỌC UI ---
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("table"); // Mặc định hiển thị dạng bảng (Table view)
  const [showAddModal, setShowAddModal] = useState(false);

  // State phục vụ phân trang hiển thị (giúp tính toán số index # chính xác trong table)
  const [page] = useState(1);
  const [limit] = useState(10);

  // --- 3. ĐỔ DỮ LIỆU BAN ĐẦU KHI MÀN HÌNH ĐƯỢC MỞ (MOUNT) ---
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // --- 4. LOGIC XỬ LÝ LỌC TÌM KIẾM DỮ LIỆU (SEARCH & FILTER) ---
  // Logic xử lý an toàn đề phòng journals bị undefined lúc đầu
  const filteredJournals = (journals || []).filter(journal => {
    const journalTitle = journal.title || journal.display_name || "";
    const journalIssn = journal.issn || "";
    const journalStatus = journal.status || "Draft";
    const matchesSearch = journalTitle.toLowerCase().includes(search.toLowerCase()) || journalIssn.includes(search);
    const matchesStatus = statusFilter === "All" || journalStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return <Container sx={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }} fluid className="grid-bg">
      {/* KHỐI TIÊU ĐỀ TRANG QUẢN TRỊ */}
      <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }} >
        <div>
          <MuiBox component="h1" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display text-main">{t("journal.quanLyTapChi")}</MuiBox>
          <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom">{t("journal.heThongPhanCapVaLuuTruCauTrucJ")}</MuiBox>
        </div>
      </MuiBox>

      {/* THANH BỘ LỌC ĐA NĂNG (TÌM KIẾM, TOGGLE VIEW, NÚT THÊM MỚI) */}
      <JournalFilterBar search={search} onSearchChange={setSearch} statusFilter={statusFilter} onStatusChange={setStatusFilter} viewMode={viewMode} onViewModeChange={setViewMode} onOpenAddModal={() => setShowAddModal(true)} />

      {/* KHU VỰC RENDER DANH SÁCH THEO TRẠNG THÁI HỆ THỐNG */}
      {loading ? <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem" }} >
          <MuiBox component="div" sx={{ display: "inline-block", width: "2rem", height: "2rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", color: "warning.main" }} className="skeleton-shimmer" role="status">
            <MuiBox component="span" sx={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }} >{t("journal.dangTaiDuLieu")}</MuiBox>
          </MuiBox>
        </MuiBox> : filteredJournals.length === 0 ? <StateCard sx={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} variant="neutral" icon="lucide:search-x" title={t("journal.khongTimThayDuLieu")} description={t("journal.khongTimThayTapChiNaoPhuHopVoi")} className="border-dashed" /> : viewMode === "table" ? (/* CHẾ ĐỘ XEM BẢNG DÀNH CHO ADMIN */
    <MuiBox component="div" sx={{ padding: "0", border: 0, boxShadow: "none" }} className="glass-card">
          <JournalTableAdmin journals={filteredJournals} page={page} limit={limit} />
        </MuiBox>) : (/* CHẾ ĐỘ XEM LƯỚI THẺ DÀNH CHO ADMIN */
    <Row sx={{ gap: "1rem" }} >
          {filteredJournals.map(j => <JournalCardAdmin key={j.id || j.journal_id} journal={j} />)}
        </Row>)}

      {/* MODAL THÊM TẠP CHÍ MỚI DÀNH CHO ADMIN */}
      <AddJournalModal show={showAddModal} handleClose={() => setShowAddModal(false)} />
    </Container>;
}
