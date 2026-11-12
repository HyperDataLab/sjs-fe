import { useTranslation } from "react-i18next";
import { Col, Button } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import { EntityCard } from '../../../shared/components/Card';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * Component JournalCardAdmin - Hiển thị thông tin tạp chí dưới dạng thẻ khối độc lập dành cho Admin.
 * Thỏa mãn tiêu chuẩn: Ứng dụng token class cấu trúc .journal-dark-card từ Design System.
 */
export default function JournalCardAdmin({
  journal
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const id = journal.id || journal.journal_id;
  const title = journal.title || journal.display_name;
  return <Col xs={12} sm={6} lg={4}>
      <EntityCard sx={{ height: "100%" }}  title={title} subtitle={<MuiBox component="div" sx={{ fontSize: "0.875em", display: "flex", alignItems: "center", gap: "0.25rem" }} className="text-muted-custom">
            <Icon icon="lucide:building" width="14" />
            <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >{journal.publisher || t("journal.chuaCoNhaXuatBan")}</MuiBox>
          </MuiBox>} actions={<MuiBox component="div" sx={{ display: "flex", gap: "0.5rem" }} >
            <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.875em", fontWeight: 700, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", bgcolor: "#212529", paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", textTransform: "uppercase" }} >
              {journal.subjectCategory || 'General'}
            </MuiBox>
            <MuiBox component="span" sx={getClassNameSx(`badge px-2 py-1 ${journal.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`)} className={stripMappedClassNames(`badge px-2 py-1 ${journal.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`)}>
              {journal.status || 'Draft'}
            </MuiBox>
          </MuiBox>} meta={<MuiBox component="div" sx={{ bgcolor: "#f8f9fa", padding: "1rem", borderRadius: "0.5rem", marginTop: "1.5rem" }}  style={{
      backgroundColor: 'var(--bg-chip)'
    }}>
            <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.875em" }} >
              <span className="text-muted-custom">{t("journal.maSoIssn")}</span>
              <MuiBox component="span" sx={{ fontWeight: 500, fontFamily: "monospace" }} className="text-main">{journal.issn || '—'}</MuiBox>
            </MuiBox>
            <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.875em" }} >
              <span className="text-muted-custom">{t("journal.tongBienTap")}</span>
              <MuiBox component="span" sx={{ fontWeight: 500, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-main" style={{
          maxWidth: '150px'
        }}>
                {journal.editorInChief || t("admin.chuaChiDinh")}
              </MuiBox>
            </MuiBox>
          </MuiBox>} footer={<MuiBox component="div" sx={{ display: "flex", gap: "0.5rem", width: "100%", paddingTop: "1rem", borderTop: "1px solid #dee2e6", mt: "auto" }}  style={{
      borderColor: 'var(--border)'
    }}>
            <Button sx={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.25rem" }} variant="light" className="text-main btn-custom-sm" onClick={() => navigate('/admin/journals/repository')}>
              <Icon icon="lucide:layers" width="14" />
              <span>{t("journal.khoDuLieu")}</span>
            </Button>
            <Button sx={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.25rem" }} variant="outline-dark" className="text-main btn-custom-sm" onClick={() => navigate(`/admin/journals/${id}/edit`)}>
              <Icon icon="lucide:edit-3" width="14" />
              <span>{t("journal.suaDoi")}</span>
            </Button>
          </MuiBox>} />
    </Col>;
}
