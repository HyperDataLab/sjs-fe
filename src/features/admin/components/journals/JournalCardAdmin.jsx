import { useTranslation } from "react-i18next";
import { Card, Col, Row, Button } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../../shared/components/Icon.jsx';


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
  const isPreview = window.location.pathname.startsWith('/admin-preview');
  const basePath = isPreview ? '/admin-preview' : '/admin';
  const idStr = id ? String(id) : '';
  const cleanId = idStr.replace(/\D/g, '') || '101';
  const displayId = `ID: #${cleanId}`;
  const isPublished = journal.status === 'Active' || journal.status === 'Published';
  const isReview = journal.status === 'Under Review' || journal.status === 'Draft';
  const statusClass = isPublished ? 'admin-status-dot admin-status-dot--accent' : isReview ? 'admin-status-dot admin-status-dot--warning' : 'admin-status-dot admin-status-dot--muted';
  return <Col xs={12} sm={6} lg={4}>
      <Card sx={{ height: "100%", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", borderWidth: 1, borderStyle: "solid" }} className="journal-dark-card transition-hover admin-clickable-card" onClick={() => navigate(`${basePath}/journals/repository`)} tabIndex={0} onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navigate(`${basePath}/journals/repository`);
      }
    }}>
        <Card.Body sx={{ display: "flex", flexDirection: "column", padding: "1.5rem", textAlign: "left" }} >
          <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }} >
            <MuiBox component="span" sx={{ fontSize: "0.875em", fontWeight: 600, fontFamily: "monospace" }} className="text-muted-custom">{displayId}</MuiBox>
            <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", bgcolor: "#212529", paddingTop: "0.25rem", paddingBottom: "0.25rem", textTransform: "uppercase" }} className="px-2.5 text-xs">
              {journal.subjectCategory || 'General'}
            </MuiBox>
          </MuiBox>

          <Card.Title sx={{ fontWeight: 500, marginBottom: "0.25rem", fontSize: "1.25rem", lineHeight: 1.2 }} className="font-display text-main line-clamp-2">
            {title}
          </Card.Title>
          <MuiBox component="div" sx={{ fontFamily: "monospace", fontSize: "0.875em", marginBottom: "1rem" }} className="text-muted-custom">
            ISSN: {journal.issn || '—'}
          </MuiBox>

          <MuiBox component="div" sx={{ bgcolor: "#f8f9fa", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}  style={{
          backgroundColor: 'var(--bg-chip)',
          fontSize: '0.8rem'
        }}>
            <Row sx={{ gap: "0.5rem" }} >
              <Col sx={{ borderInlineEnd: "1px solid #dee2e6", borderBottom: "1px solid #dee2e6" }} xs={6} className="pb-1.5" style={{
              borderColor: 'var(--border)'
            }}>
                <MuiBox component="span" sx={{ display: "block", textTransform: "uppercase", fontWeight: 600 }} className="text-muted-custom text-xs" style={{
                fontSize: '0.65rem'
              }}>Publisher</MuiBox>
                <MuiBox component="span" sx={{ fontWeight: 700, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", display: "block" }} className="text-main">{journal.publisher || 'ResearchPulse'}</MuiBox>
              </Col>
              <Col sx={{ paddingInlineStart: "1rem", borderBottom: "1px solid #dee2e6" }} xs={6} className="pb-1.5" style={{
              borderColor: 'var(--border)'
            }}>
                <MuiBox component="span" sx={{ display: "block", textTransform: "uppercase", fontWeight: 600 }} className="text-muted-custom text-xs" style={{
                fontSize: '0.65rem'
              }}>Type</MuiBox>
                <MuiBox component="span" sx={{ fontWeight: 700, display: "block" }} className="text-main">{journal.type || 'Journal'}</MuiBox>
              </Col>
              <Col sx={{ borderInlineEnd: "1px solid #dee2e6" }} xs={6} className="pt-1.5" style={{
              borderColor: 'var(--border)'
            }}>
                <MuiBox component="span" sx={{ display: "block", textTransform: "uppercase", fontWeight: 600 }} className="text-muted-custom text-xs" style={{
                fontSize: '0.65rem'
              }}>Coverage</MuiBox>
                <MuiBox component="span" sx={{ fontWeight: 700, display: "block" }} className="text-main">{journal.coverage || '1980-2026'}</MuiBox>
              </Col>
              <Col sx={{ paddingInlineStart: "1rem" }} xs={6} className="pt-1.5">
                <MuiBox component="span" sx={{ display: "block", textTransform: "uppercase", fontWeight: 600 }} className="text-muted-custom text-xs" style={{
                fontSize: '0.65rem'
              }}>Region</MuiBox>
                <MuiBox component="span" sx={{ fontWeight: 700, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", display: "block" }} className="text-main">{journal.country || 'Vietnam'}</MuiBox>
              </Col>
            </Row>
          </MuiBox>

          <MuiBox component="div" sx={{ display: "flex", marginBottom: "1rem", flexWrap: "wrap" }} className="gap-1.5">
            <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem", paddingTop: "0.25rem", paddingBottom: "0.25rem" }} className="admin-status-badge admin-status-badge--accent text-xs px-2.5">
              OPEN ACCESS
            </MuiBox>
            <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "warning.main", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem", bgcolor: "rgba(255,193,7,.18)", border: "1px solid #dee2e6", borderColor: "#ffecb5", paddingTop: "0.25rem", paddingBottom: "0.25rem" }} className="text-xs px-2.5">
              DIAMOND OA
            </MuiBox>
          </MuiBox>

          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", bgcolor: "#f8f9fa", borderRadius: "0.5rem", marginBottom: "1.5rem", mt: "auto" }} className="gap-2.5 p-2.5" style={{
          backgroundColor: 'var(--bg-chip)'
        }}>
            <MuiBox component="div" sx={{ borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center" }} className="text-muted-custom" style={{
            width: '36px',
            height: '36px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            flexShrink: 0
          }} aria-hidden="true">
              <Icon icon="lucide:building-2" width="16" />
            </MuiBox>
            <MuiBox component="div" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >
              <MuiBox component="span" sx={{ fontWeight: 700, display: "block", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-main" style={{
              fontSize: '0.85rem'
            }}>
                {journal.publisher || t("admin.chuaChiDinh")}
              </MuiBox>
              <MuiBox component="span" sx={{ textTransform: "uppercase", fontWeight: 600 }} className="text-muted-custom text-xs" style={{
              fontSize: '0.65rem',
              letterSpacing: '0.02em'
            }}>
                Publisher
              </MuiBox>
            </MuiBox>
          </MuiBox>

          <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid #dee2e6", width: "100%" }}  style={{
          borderColor: 'var(--border)'
        }}>
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center" }} className="gap-1.5">
              <span className={statusClass} />
              <MuiBox component="span" sx={{ fontWeight: 700, textTransform: "uppercase" }} className="text-main" style={{
              fontSize: '0.75rem'
            }}>
                {journal.status || 'Draft'}
              </MuiBox>
            </MuiBox>

            <MuiBox component="div" sx={{ display: "flex" }} className="gap-1.5">
              <Button sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #dee2e6" }} variant="light" size="sm" className="btn-custom-sm" onClick={event => {
              event.stopPropagation();
              navigate(`${basePath}/journals/repository`);
            }} title="View repository log">
                <Icon icon="lucide:eye" width="14" />
              </Button>
              <Button sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.5rem", borderRadius: "0.375rem" }} variant="outline-dark" size="sm" className="btn-custom-sm" onClick={event => {
              event.stopPropagation();
              navigate(`${basePath}/journals/${id}/edit`);
            }} title="Edit configurations">
                <Icon icon="lucide:edit-2" width="14" />
              </Button>
            </MuiBox>
          </MuiBox>
        </Card.Body>
      </Card>
    </Col>;
}
