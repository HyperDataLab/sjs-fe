import { useTranslation } from "react-i18next";
import { t } from "i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\catalog\components\JournalTable.jsx
 */
import { Table } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { useNavigate } from 'react-router-dom';


import MuiBox from '@mui/material/Box';

export default function JournalTable({
  journals = [],
  followedJournals = {},
  onFollow
}) {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();
  const renderAccessBadge = journal => <span className="catalog-badge catalog-access-badge">
      {journal.is_open_access ? 'Open Access' : 'Subscription'}
    </span>;
  const getQuartileBadgeClass = (quartile = '') => {
    if (quartile === 'Q1') return 'catalog-badge catalog-badge--q1';
    if (quartile === 'Q2') return 'catalog-badge catalog-badge--q2';
    return 'catalog-badge';
  };
  return <section className="catalog-surface catalog-table-card">
      <MuiBox component="div" sx={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" }} >
        <Table sx={{ verticalAlign: "middle", marginBottom: "0", textAlign: "left" }} hover className="catalog-table">
          <thead>
            <tr>
              <MuiBox component="th" sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "1rem", paddingBottom: "1rem" }} >Journal</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >ISSN</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >Publisher</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >Country</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >Quartile</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >Metric</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >Year</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >Access</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "right" }} >Action</MuiBox>
            </tr>
          </thead>
          <tbody>
            {journals.map(journal => {
            const id = journal.id || journal.journal_id;
            const isFollowed = !!followedJournals[id];
            return <tr key={id} onClick={() => navigate(`/journals/${id}`)}>
                  <MuiBox component="td" sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "1rem", paddingBottom: "1rem" }} >
                    <div className="catalog-journal-name">{journal.display_name}</div>
                  </MuiBox>
                  <MuiBox component="td" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-muted-custom catalog-mono">{journal.issn || '—'}</MuiBox>
                  <MuiBox component="td" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-main">{journal.publisher || '—'}</MuiBox>
                  <MuiBox component="td" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-main">{journal.country || '—'}</MuiBox>
                  <MuiBox component="td" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >
                    {journal.quartile ? <span className={getQuartileBadgeClass(journal.quartile)}>
                        {journal.quartile}
                      </span> : '—'}
                  </MuiBox>
                  <MuiBox component="td" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem", fontWeight: 600 }} className="text-main catalog-mono">{journal.metric_value ?? '—'}</MuiBox>
                  <MuiBox component="td" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-main">{journal.metric_year || '—'}</MuiBox>
                  <MuiBox component="td" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >{renderAccessBadge(journal)}</MuiBox>
                  <MuiBox component="td" sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "right" }} >
                    <MuiBox component="div" sx={{ display: "inline-flex", alignItems: "center" }} >
                      <button type="button" onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onFollow(id);
                  }} className={`catalog-follow-btn ${isFollowed ? 'is-followed' : ''}`}>
                        <Icon icon={isFollowed ? 'lucide:check' : 'lucide:plus'} width="13" />
                        <span>{isFollowed ? t("catalog.daTheoDoi") : t("catalog.theoDoi")}</span>
                      </button>
                    </MuiBox>
                  </MuiBox>
                </tr>;
          })}
          </tbody>
        </Table>
      </MuiBox>
    </section>;
}
