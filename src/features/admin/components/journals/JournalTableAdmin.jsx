import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { Table, Button } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../../shared/components/Icon.jsx';
import { StateCard } from '../../../../shared/components/Card';
import { getClassNameSx, stripMappedClassNames } from '../../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * Component JournalTableAdmin - Bảng hiển thị danh sách tạp chí phục vụ mục đích quản trị.
 *
 * @param {Array} journals - Danh sách tạp chí sau khi đã qua bộ lọc search/status
 */
export default function JournalTableAdmin({
  journals
}) {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();
  if (!journals || journals.length === 0) {
    return <StateCard sx={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} variant="neutral" icon="lucide:search-x" title={t("admin.khongTimThayTapChiNao")} description={t("admin.hayThuThayDoiTuKhoaTimKiemHoac")} className="border-dashed" />;
  }
  const isPreview = window.location.pathname.startsWith('/admin-preview');
  const basePath = isPreview ? '/admin-preview' : '/admin';
  return <MuiBox component="div" sx={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", borderRadius: "0.5rem", overflow: "hidden" }} className="journal-table-shell">
      <Table sx={{ verticalAlign: "middle", marginBottom: "0", textAlign: "left", bgcolor: "background.paper" }} hover className="journal-table">
        <MuiBox component="thead" sx={{ "& th, & td": { bgcolor: "#f8f9fa" } }} >
          <tr>
            <MuiBox component="th" sx={{ paddingInlineStart: "1.5rem" }} className="py-3.5 text-muted-custom">JOURNAL TITLE & CATEGORY</MuiBox>
            <th className="py-3.5 text-muted-custom">ISSN</th>
            <th className="py-3.5 text-muted-custom">PUBLISHER</th>
            <th className="py-3.5 text-muted-custom">LAST UPDATED</th>
            <th className="py-3.5 text-muted-custom">STATUS</th>
            <MuiBox component="th" sx={{ paddingInlineEnd: "1.5rem", textAlign: "right" }} className="py-3.5 text-muted-custom" style={{
            width: '120px'
          }}>ACTIONS</MuiBox>
          </tr>
        </MuiBox>
        <tbody>
          {journals.map(journal => {
          const id = journal.id || journal.journal_id;
          return <tr key={id} className="journal-table-row transition-hover admin-clickable-row" onClick={() => navigate(`${basePath}/journals/repository`)} tabIndex={0} onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              navigate(`${basePath}/journals/repository`);
            }
          }}>
                <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingInlineStart: "1.5rem" }} >
                  <MuiBox component="button" sx={{ fontWeight: 700, padding: "0", textAlign: "left" }} type="button" className="admin-link-button text-main line-clamp-1" onClick={event => {
                event.stopPropagation();
                navigate(`${basePath}/journals/repository`);
              }}>
                    {journal.title || journal.display_name}
                  </MuiBox>
                  <MuiBox component="div" sx={{ fontSize: "0.875em" }} className="text-muted-custom mt-0.5">
                    {journal.subjectCategory || 'General Category'} • Quarterly
                  </MuiBox>
                </MuiBox>

                <MuiBox component="td" sx={{ fontFamily: "monospace", fontSize: "0.875em" }} className="text-main">
                  {journal.issn || '—'}
                </MuiBox>

                <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >
                  <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
                    <MuiBox component="div" sx={{ borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center" }} className="text-muted-custom" style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'var(--bg-chip)',
                  border: '1px solid var(--border)',
                  flexShrink: 0
                }} aria-hidden="true">
                      <Icon icon="lucide:building-2" width="15" />
                    </MuiBox>
                    <MuiBox component="span" sx={{ fontWeight: 600 }} className="text-main">{journal.publisher || t("admin.chuaChiDinh")}</MuiBox>
                  </MuiBox>
                </MuiBox>

                <MuiBox component="td" sx={{ fontSize: "0.875em", fontFamily: "monospace" }} className="text-muted-custom">
                  {journal.lastUpdated || '—'}
                </MuiBox>

                <td>
                  <MuiBox component="span" sx={getClassNameSx(`badge px-2.5 py-1.5 rounded-pill text-uppercase text-xs font-semibold ${journal.status === 'Active' || journal.status === 'Published' ? 'admin-status-badge admin-status-badge--accent' : journal.status === 'Under Review' || journal.status === 'Draft' ? 'admin-status-badge admin-status-badge--warning' : 'admin-status-badge admin-status-badge--muted'}`)} className={stripMappedClassNames(`badge px-2.5 py-1.5 rounded-pill text-uppercase text-xs font-semibold ${journal.status === 'Active' || journal.status === 'Published' ? 'admin-status-badge admin-status-badge--accent' : journal.status === 'Under Review' || journal.status === 'Draft' ? 'admin-status-badge admin-status-badge--warning' : 'admin-status-badge admin-status-badge--muted'}`)}>
                    {journal.status || 'Draft'}
                  </MuiBox>
                </td>

                <MuiBox component="td" sx={{ paddingInlineEnd: "1.5rem", textAlign: "right" }} >
                  <MuiBox component="div" sx={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }} >
                    <Button sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #dee2e6" }} variant="light" size="sm" className="btn-custom-sm" onClick={event => {
                  event.stopPropagation();
                  navigate(`${basePath}/journals/repository`);
                }} title={t("admin.quanLyRepoVolumeIssue")}>
                      <Icon sx={{ color: "#212529" }} icon="lucide:eye" width="16"  />
                    </Button>

                    <Button sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.5rem", borderRadius: "0.375rem" }} variant="outline-dark" size="sm" className="btn-custom-sm" onClick={event => {
                  event.stopPropagation();
                  navigate(`${basePath}/journals/${id}/edit`);
                }} title={t("admin.chinhSuaThongTinTapChi")}>
                      <Icon icon="lucide:edit-2" width="16" />
                    </Button>
                  </MuiBox>
                </MuiBox>
              </tr>;
        })}
        </tbody>
      </Table>
    </MuiBox>;
}
