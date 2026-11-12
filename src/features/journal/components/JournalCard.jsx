import { useTranslation } from "react-i18next";
import { Button, Row, Col } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import { EntityCard } from '../../../shared/components/Card';
import Icon from '../../../shared/components/Icon';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * Component JournalCard - Hiển thị thông tin tạp chí dưới dạng thẻ khối độc lập (Card View).
 * Tuân thủ chuẩn: Ứng dụng class cấu trúc .journal-dark-card từ Design System.
 * @param {Object} journal - Dữ liệu chi tiết của một tạp chí cụ thể
 */
export default function JournalCard({
  journal
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  return <Col xs={12} sm={6} lg={4}>
      <EntityCard sx={{ height: "100%" }}  title={journal.title} subtitle={<MuiBox component="div" sx={{ fontSize: "0.875em", display: "flex", alignItems: "center", gap: "0.25rem" }} className="text-muted-custom">
            <Icon icon="lucide:building" width="16" />
            <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >{journal.publisher}</MuiBox>
          </MuiBox>} actions={<MuiBox component="div" sx={{ display: "flex", gap: "0.5rem" }} >
            <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", textTransform: "uppercase" }} className="bg-dark-solid" style={{
        fontSize: '0.75rem'
      }}>
              {journal.subjectCategory}
            </MuiBox>
            <MuiBox component="span" sx={getClassNameSx(`badge ${journal.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`)} className={stripMappedClassNames(`badge ${journal.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`)}>
              {journal.status}
            </MuiBox>
          </MuiBox>} meta={<MuiBox component="div" sx={{ bgcolor: "#f8f9fa", padding: "1rem", borderRadius: "0.5rem", marginTop: "1.5rem" }}  style={{
      backgroundColor: 'var(--bg-chip)'
    }}>
            <Row sx={{ gap: "0.5rem", fontSize: "0.875em" }} className="text-main">
              <Col xs={6}>
                <MuiBox component="span" sx={{ color: "text.secondary", display: "block" }}  style={{
            fontSize: '0.75rem'
          }}>{t("journal.maSoIssn")}</MuiBox>
                <MuiBox component="span" sx={{ fontWeight: 500 }} >{journal.issn}</MuiBox>
              </Col>
              <Col xs={6}>
                <MuiBox component="span" sx={{ color: "text.secondary", display: "block" }}  style={{
            fontSize: '0.75rem'
          }}>{t("journal.nhaXuatBan")}</MuiBox>
                <MuiBox component="span" sx={{ fontWeight: 500, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", display: "block" }} >{journal.publisher}</MuiBox>
              </Col>
            </Row>
          </MuiBox>} footer={<MuiBox component="div" sx={{ display: "flex", gap: "0.5rem", width: "100%", paddingTop: "0.5rem", borderTop: "1px solid #dee2e6", mt: "auto" }}  style={{
      borderColor: 'var(--border)'
    }}>
            <Button sx={{ width: "50%" }} variant="light" className="text-main btn-custom-sm" onClick={() => navigate('/admin/journals/repository')}>
              <Icon icon="lucide:layers" width="16" sx={{ mr: 0.5 }} />{t("journal.khoDuLieu")}</Button>
            <Button sx={{ width: "50%" }} variant="outline-dark" className="text-main btn-custom-sm" onClick={() => navigate(`/admin/journals/${journal.id}/edit`)}>
              <Icon icon="lucide:pencil" width="16" sx={{ mr: 0.5 }} />{t("journal.suaDoi")}</Button>
          </MuiBox>} />
    </Col>;
}
