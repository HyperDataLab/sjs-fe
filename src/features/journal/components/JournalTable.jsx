import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\components\JournalTable.jsx
 */
import { Table, Badge, Button } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';


import MuiBox from '@mui/material/Box';

export default function JournalTable({
  journals,
  page,
  limit
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getQuartileClassName = quartile => {
    const normalized = (quartile || '').toLowerCase();
    if (normalized === 'q1') return 'journal-quartile-badge journal-quartile-badge--q1';
    if (normalized === 'q2') return 'journal-quartile-badge journal-quartile-badge--q2';
    if (normalized === 'q3') return 'journal-quartile-badge journal-quartile-badge--q3';
    if (normalized === 'q4') return 'journal-quartile-badge journal-quartile-badge--q4';
    return 'journal-quartile-badge';
  };
  if (journals.length === 0) {
    return <div className="journal-empty-state">
        <Icon sx={{ marginBottom: "1rem" }} icon="lucide:search-x" width="48" className="text-muted-custom" />
        <h5 className="journal-empty-title">{t("admin.khongTimThayTapChiNao")}</h5>
        <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom text-xs">{t("journal.hayThuThayDoiTuKhoaTimKiemHoac")}</MuiBox>
      </div>;
  }
  return <MuiBox component="div" sx={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)" }} className="journal-table-shell">
      <Table sx={{ verticalAlign: "middle", marginBottom: "0", textAlign: "left" }} hover className="journal-table">
        <thead>
          <tr>
            <MuiBox component="th" sx={{ paddingInlineStart: "1.5rem" }} className="journal-table-index-col py-3.5">#</MuiBox>
            <th className="py-3.5">{t("admin.tenJournal")}</th>
            <th className="py-3.5">Publisher</th>
            <th className="py-3.5">Quartile</th>
            <th className="py-3.5">Metric / IF</th>
            <th className="py-3.5">{t("journal.quocGia")}</th>
            <th className="py-3.5">Open Access</th>
            <MuiBox component="th" sx={{ paddingInlineEnd: "1.5rem", textAlign: "right" }} className="journal-table-action-col py-3.5">{t("article.chiTiet1")}</MuiBox>
          </tr>
        </thead>
        <tbody>
          {journals.map((journal, index) => {
          const displayIndex = (page - 1) * limit + index + 1;
          const id = journal.journal_id;
          return <tr key={id} className="journal-table-row" onClick={() => navigate(`/journals/${id}`)}>
                <MuiBox component="td" sx={{ paddingInlineStart: "1.5rem" }} className="journal-index">
                  {displayIndex}
                </MuiBox>
                <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >
                  <div className="journal-name">
                    {journal.display_name}
                  </div>
                  {journal.issn && <MuiBox component="div" sx={{ fontFamily: "monospace" }} className="journal-issn">
                      ISSN: {journal.issn}
                    </MuiBox>}
                </MuiBox>
                <td className="journal-cell-muted">
                  {journal.publisher || '—'}
                </td>
                <td>
                  <Badge className={getQuartileClassName(journal.quartile)}>
                    {journal.quartile}
                  </Badge>
                </td>
                <td>
                  <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }} >
                    <MuiBox component="span" sx={{ fontFamily: "monospace" }} className="journal-metric-value">
                      {journal.metric_value}
                    </MuiBox>
                    <span className="journal-metric-label">
                      SJR
                    </span>
                  </MuiBox>
                </td>
                <td className="journal-cell-muted">
                  {journal.country || '—'}
                </td>
                <td>
                  {journal.is_open_access ? <Badge className="journal-oa-badge">
                      <Icon icon="lucide:unlock" width="10" />
                      <span>OA</span>
                    </Badge> : <MuiBox component="span" sx={{ fontFamily: "monospace" }} className="journal-cell-muted">—</MuiBox>}
                </td>
                <MuiBox component="td" sx={{ paddingInlineEnd: "1.5rem", textAlign: "right" }}  onClick={e => e.stopPropagation()}>
                  <Button sx={{ padding: "0", display: "inline-flex", alignItems: "center", gap: "0.25rem" }} variant="link" className="journal-detail-link" onClick={() => navigate(`/journals/${id}`)}>
                    <span>{t("article.chiTiet1")}</span>
                    <Icon icon="lucide:arrow-right" width="14" />
                  </Button>
                </MuiBox>
              </tr>;
        })}
        </tbody>
      </Table>
    </MuiBox>;
}
