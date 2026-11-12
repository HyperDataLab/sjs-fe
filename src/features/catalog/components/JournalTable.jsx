import { t } from 'i18next';
import { Table } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { useNavigate } from 'react-router-dom';
import MuiBox from '@mui/material/Box';

const cellSx = { paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '1rem', paddingBottom: '1rem' };

export default function JournalTable({ journals = [], followedJournals = {}, onFollow }) {
  const navigate = useNavigate();

  const openJournal = (journal, id) => {
    if (journal.openalex_url) {
      window.open(journal.openalex_url, '_blank', 'noopener,noreferrer');
      return;
    }
    navigate(`/journals/${id}`);
  };

  return <section className="catalog-surface catalog-table-card">
      <MuiBox component="div" sx={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <Table sx={{ verticalAlign: 'middle', marginBottom: 0, textAlign: 'left' }} hover className="catalog-table">
          <thead>
            <tr>
              <MuiBox component="th" sx={{ ...cellSx, paddingLeft: '1.5rem' }}>Journal</MuiBox>
              <MuiBox component="th" sx={cellSx}>ISSN</MuiBox>
              <MuiBox component="th" sx={cellSx}>Publisher</MuiBox>
              <MuiBox component="th" sx={cellSx}>Country</MuiBox>
              <MuiBox component="th" sx={cellSx}>2yr Mean Citedness</MuiBox>
              <MuiBox component="th" sx={cellSx}>Access</MuiBox>
              <MuiBox component="th" sx={{ ...cellSx, paddingRight: '1.5rem', textAlign: 'right' }}>Action</MuiBox>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal) => {
              const id = journal.id || journal.journal_id;
              const isFollowed = Boolean(followedJournals[id]);
              return <tr key={id} onClick={() => openJournal(journal, id)} title="Open this journal in OpenAlex">
                  <MuiBox component="td" sx={{ ...cellSx, paddingLeft: '1.5rem' }}>
                    <div className="catalog-journal-name">{journal.display_name}</div>
                  </MuiBox>
                  <MuiBox component="td" sx={cellSx} className="text-muted-custom catalog-mono">{journal.issn || '—'}</MuiBox>
                  <MuiBox component="td" sx={cellSx} className="text-main">{journal.publisher || '—'}</MuiBox>
                  <MuiBox component="td" sx={cellSx} className="text-main">{journal.country || '—'}</MuiBox>
                  <MuiBox component="td" sx={{ ...cellSx, fontWeight: 600 }} className="text-main catalog-mono">{journal.metric_value ?? '—'}</MuiBox>
                  <MuiBox component="td" sx={cellSx}>
                    <span className="catalog-badge catalog-access-badge">
                      {journal.is_open_access ? 'Open Access' : 'Not fully OA'}
                    </span>
                  </MuiBox>
                  <MuiBox component="td" sx={{ ...cellSx, paddingRight: '1.5rem', textAlign: 'right' }}>
                    <MuiBox component="div" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                      <button type="button" onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onFollow(id);
                      }} className={`catalog-follow-btn ${isFollowed ? 'is-followed' : ''}`}>
                        <Icon icon={isFollowed ? 'lucide:check' : 'lucide:plus'} width="13" />
                        <span>{isFollowed ? t('catalog.daTheoDoi') : t('catalog.theoDoi')}</span>
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
