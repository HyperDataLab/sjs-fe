import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Breadcrumb } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from "react-router-dom";
import Icon from '../../../shared/components/Icon.jsx';
import { useJournalManagement } from "../hooks/useJournalManagement";
import VolumeList from "../components/VolumeList";
import IssueTable from "../components/IssueTable";
import SwitchJournalModal from "../components/modals/SwitchJournalModal";
import CreateVolumeModal from "../components/modals/CreateVolumeModal";
import CreateIssueModal from "../components/modals/CreateIssueModal";
import PrimaryButton from "../../../shared/components/Button/PrimaryButton";


import MuiBox from '@mui/material/Box';


/**
 * Page RepositoryManagementPage - Màn hình điều phối quản lý Tập (Volume) và Số (Issue) tập trung của Admin.
 * Đáp ứng đầy đủ tiêu chí logic liên kết dữ liệu cha - con trên Mock State.
 */
export default function RepositoryManagementPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();

  // --- LẤY DỮ LIỆU TỪ ZUSTAND STORE ---
  const {
    currentJournal,
    volumes,
    issues,
    selectedVolume,
    setSelectedVolume,
    fetchInitialData
  } = useJournalManagement();

  // --- CÁC STATE ĐIỀU KHIỂN ĐÓNG/MỞ MODAL FORM ---
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showVolumeModal, setShowVolumeModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);

  // Đảm bảo dữ liệu được nạp vào store đầy đủ khi Admin truy cập trang
  useEffect(() => {
    if (!currentJournal) {
      fetchInitialData();
    }
  }, [currentJournal, fetchInitialData]);

  // --- LỌC DỮ LIỆU CẤU TRÚC PHỤ THUỘC (CASCADING FILTER) ---
  // 1. Lọc ra toàn bộ Volume thuộc về Tạp chí đang active hiện tại (đảm bảo bảo vệ nếu volumes undefined)
  const currentVolumes = (volumes || []).filter(v => v.journalId === currentJournal?.id);
  // Tự động chọn mặc định Volume đầu tiên trong danh sách nếu Admin chưa click chọn dòng nào cụ thể
  useEffect(() => {
    if (currentVolumes.length > 0 && !selectedVolume) {
      setSelectedVolume(currentVolumes[0].id);
    }
  }, [currentVolumes, selectedVolume, setSelectedVolume]);

  // 2. Lọc ra toàn bộ Issue thuộc về Volume đang được Admin click chọn ở cột bên trái (đảm bảo bảo vệ nếu issues undefined)
  const currentIssues = (issues || []).filter(i => i.volumeId === selectedVolume);
  return <Container sx={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }} fluid className="grid-bg">
      {/* THANH ĐIỀU HƯỚNG BREADCRUMB CHUẨN UX */}
      <Breadcrumb sx={{ marginBottom: "1rem", fontSize: "0.875em" }} >
        <Breadcrumb.Item onClick={() => navigate("/admin/journals")}>{t("journal.quanLyTapChi")}</Breadcrumb.Item>
        <Breadcrumb.Item active>{t("journal.khoDuLieuTapSoRepository")}</Breadcrumb.Item>
      </Breadcrumb>

      {/* KHỐI TIÊU ĐỀ TRANG VÀ THÔNG TIN TẠP CHÍ ĐANG CHỌN */}
      <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:768px)": { flexDirection: "row", alignItems: "center" }, justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }} >
        <div>
          <MuiBox component="span" sx={{ fontSize: "0.875em", textTransform: "uppercase", fontWeight: 700 }} className="text-muted-custom tracking-wider">
            Repository Management
          </MuiBox>
          <MuiBox component="h1" sx={{ fontWeight: 700, marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }} className="font-display text-main mt-0.5">
            <Icon sx={{ color: "warning.main" }} icon="lucide:database"  />
            {currentJournal ? currentJournal.title : t("journal.dangTaiThongTin")}
          </MuiBox>
          <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">{t("journal.maSoIssn")}{" "}
            <MuiBox component="span" sx={{ fontFamily: "monospace", fontWeight: 500 }} >
              {currentJournal?.issn}
            </MuiBox>{" "}{t("journal.nguoiPhuTrach")}{" "}
            <MuiBox component="span" sx={{ fontWeight: 500 }} >{currentJournal?.publisher}</MuiBox>
          </MuiBox>
        </div>

        {/* Nút bấm mở Switch Journal Modal để đổi nhanh tạp chí cần cấu hình */}
        <Button sx={{ display: "flex", alignItems: "center" }} variant="outline-dark" className="btn-custom-sm gap-1.5" onClick={() => setShowSwitchModal(true)}>
          <Icon icon="lucide:refresh-cw" width="14" />
          <span>{t("journal.doiTapChi")}</span>
        </Button>
      </MuiBox>

      {/* THẺ TỔNG QUAN THỐNG KÊ NHANH (SUMMARY CARD) */}
      <Row sx={{ gap: "1rem", marginBottom: "1.5rem", textAlign: "left" }} >
        <Col xs={12} sm={4}>
          <Card sx={{ border: "1px solid #dee2e6", padding: "1rem", boxShadow: "none", bgcolor: "background.paper" }} >
            <MuiBox component="div" sx={{ fontSize: "0.875em", marginBottom: "0.25rem" }} className="text-muted-custom">{t("journal.tongSoVolumeTap")}</MuiBox>
            <MuiBox component="h3" sx={{ fontWeight: 700, margin: "0", fontFamily: "monospace" }} className="text-main">
              {currentVolumes.length}
            </MuiBox>
          </Card>
        </Col>
        <Col xs={12} sm={4}>
          <Card sx={{ border: "1px solid #dee2e6", padding: "1rem", boxShadow: "none", bgcolor: "background.paper" }} >
            <MuiBox component="div" sx={{ fontSize: "0.875em", marginBottom: "0.25rem" }} className="text-muted-custom">{t("journal.tongSoIssuePhatHanh")}</MuiBox>
            <MuiBox component="h3" sx={{ fontWeight: 700, margin: "0", fontFamily: "monospace" }} className="text-main">
              {issues.filter(i => currentVolumes.map(v => v.id).includes(i.volumeId)).length}
            </MuiBox>
          </Card>
        </Col>
        <Col xs={12} sm={4}>
          <Card sx={{ border: "1px solid #dee2e6", padding: "1rem", boxShadow: "none", bgcolor: "background.paper" }} >
            <MuiBox component="div" sx={{ fontSize: "0.875em", marginBottom: "0.25rem" }} className="text-muted-custom">{t("journal.trangThaiCauTruc")}</MuiBox>
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.25rem" }} >
              <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "success.main", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", bgcolor: "rgba(25,135,84,.12)" }} >{t("journal.dongBoMockState")}</MuiBox>
            </MuiBox>
          </Card>
        </Col>
      </Row>

      {/* KHU VỰC CHIA ĐÔI GIAO DIỆN CHÍNH (VOLUME BÊN TRÁI - ISSUE BÊN PHẢI) */}
      <Row sx={{ gap: "1.5rem", textAlign: "left" }} >
        {/* CỘT BÊN TRÁI: QUẢN LÝ VOLUME */}
        <Col xs={12} lg={4}>
          <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }} >
            <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "0" }} className="font-display text-main">{t("journal.danhSachCacTapVolumes")}</MuiBox>
            <Button sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }} variant="dark" size="sm" className="btn-custom-sm px-2.5 py-1.5" onClick={() => setShowVolumeModal(true)}>
              <Icon icon="lucide:plus" width="14" />
              <span>{t("journal.tapMoi")}</span>
            </Button>
          </MuiBox>
          <VolumeList volumes={currentVolumes} selectedVolumeId={selectedVolume} onSelectVolume={setSelectedVolume} />
        </Col>

        {/* CỘT BÊN PHẢI: QUẢN LÝ CÁC ISSUE THUỘC VOLUME ĐƯỢC CHỌN */}
        <Col xs={12} lg={8}>
          <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }} >
            <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "0" }} className="font-display text-main">{t("journal.soPhatHanhIssuesThuocTapDaChon")}</MuiBox>
            <PrimaryButton sx={{ gap: "0.25rem" }} className="px-2.5 py-1.5" disabled={!selectedVolume} // Khóa nút lại nếu chưa có Volume nào được chọn
          onClick={() => setShowIssueModal(true)}>
              <Icon icon="lucide:plus-circle" width="14" />
              <span>{t("journal.soPhatHanhMoi")}</span>
            </PrimaryButton>
          </MuiBox>
          <IssueTable issues={currentIssues} />
        </Col>
      </Row>

      {/* TOÀN BỘ HỆ THỐNG MODAL ĐIỀU KHIỂN BIẾN ĐỘNG STATE TẠI TRANG */}
      <SwitchJournalModal show={showSwitchModal} handleClose={() => setShowSwitchModal(false)} />
      <CreateVolumeModal show={showVolumeModal} handleClose={() => setShowVolumeModal(false)} />
      <CreateIssueModal show={showIssueModal} handleClose={() => setShowIssueModal(false)} />
    </Container>;
}
