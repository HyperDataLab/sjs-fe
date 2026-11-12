import { useTranslation } from "react-i18next";
import { Row, Col, Form, Button, InputGroup } from '@/shared/components/ui/muiAdapters';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import Icon from '../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';


/**
 * Component JournalFilterBar - Thanh công cụ lọc, tìm kiếm và chuyển đổi giao diện hiển thị.
 * @param {string} search - Từ khóa tìm kiếm hiện tại
 * @param {function} onSearchChange - Hàm callback khi thay đổi từ khóa tìm kiếm
 * @param {string} statusFilter - Trạng thái lọc (Active/Draft/All)
 * @param {function} onStatusChange - Hàm callback khi thay đổi bộ lọc trạng thái
 * @param {string} viewMode - Chế độ hiển thị ('table' hoặc 'card')
 * @param {function} onViewModeChange - Hàm callback khi bấm chuyển đổi chế độ xem
 * @param {function} onOpenAddModal - Hàm mở Modal thêm Tạp chí mới
 */
export default function JournalFilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  viewMode,
  onViewModeChange,
  onOpenAddModal
}) {
  const {
    t
  } = useTranslation();
  return <Row sx={{ marginBottom: "1.5rem", alignItems: "center", gap: "1rem" }} >
      {/* Cột 1: Ô tìm kiếm Tạp chí theo Tên hoặc ISSN */}
      <Col xs={12} md={4}>
        <InputGroup>
          <Form.Control type="text" placeholder={t("journal.timKiemTheoTenTapChiHoacIssn")} value={search} onChange={e => onSearchChange(e.target.value)} style={{
          backgroundColor: 'var(--bg-chip)',
          borderColor: 'var(--border)'
        }} />
        </InputGroup>
      </Col>

      {/* Cột 2: Bộ lọc theo trạng thái (Active / Draft) */}
      <Col xs={6} md={3}>
        <Form.Select value={statusFilter} onChange={e => onStatusChange(e.target.value)} style={{
        backgroundColor: 'var(--bg-chip)',
        borderColor: 'var(--border)'
      }}>
          <option value="All">{t("journal.tatCaTrangThai")}</option>
          <option value="Active">{t("journal.dangHoatDongActive")}</option>
          <option value="Draft">{t("journal.banNhapDraft")}</option>
        </Form.Select>
      </Col>

      {/* Cột 3: Nút Chuyển đổi hiển thị Table / Card và Nút thêm mới */}
      <Col sx={{ display: "flex", "@media (min-width:768px)": { justifyContent: "flex-end" }, alignItems: "center", gap: "0.5rem" }} xs={6} md={5} >
        {/* Toggle View Mode */}
        <MuiBox component="div" sx={{ display: "inline-flex", verticalAlign: "middle", "& > :not(:first-of-type)": { ml: "-1px" } }}  role="group">
          <Button variant={viewMode === 'table' ? 'dark' : 'light'} onClick={() => onViewModeChange('table')} className="btn-custom-sm">
            <Icon icon="lucide:table" width="16" sx={{ mr: 0.5 }} />{t("journal.bang")}</Button>
          <Button variant={viewMode === 'card' ? 'dark' : 'light'} onClick={() => onViewModeChange('card')} className="btn-custom-sm">
            <Icon icon="lucide:layout-grid" width="16" sx={{ mr: 0.5 }} />{t("journal.the")}</Button>
        </MuiBox>

        {/* Nút Tạo Tạp chí Mới (Add Journal) */}
        <PrimaryButton sx={{ gap: "0.25rem" }}  icon="bi:plus-circle" onClick={onOpenAddModal}>{t("journal.themTapChi")}</PrimaryButton>
      </Col>
    </Row>;
}
