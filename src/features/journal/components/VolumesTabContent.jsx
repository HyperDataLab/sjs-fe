import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\components\VolumesTabContent.jsx
 */
import { useState } from 'react';
import { Spinner, Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../../../shared/components/LoadingSkeleton';
import AdminPagination from '../../../shared/components/Pagination';


import MuiBox from '@mui/material/Box';

export default function VolumesTabContent({
  volumes = [],
  issuesByVolume = {},
  issueErrors = {},
  journalId,
  onVolumeExpand,
  loading,
  error = false,
  volumePagination,
  issuePaginationByVolume = {},
  onVolumePageChange,
  onIssuePageChange
}) {
  const {
    t
  } = useTranslation();
  const MONTH_NAMES = ['', t("journal.thang1"), t("journal.thang2"), t("journal.thang3"), t("journal.thang4"), t("journal.thang5"), t("journal.thang6"), t("journal.thang7"), t("journal.thang8"), t("journal.thang9"), t("journal.thang10"), t("journal.thang11"), t("journal.thang12")];
  const navigate = useNavigate();
  const [expandedVolumes, setExpandedVolumes] = useState({});

  /** Toggle accordion mở/đóng volume; trigger lazy load nếu chưa có data */
  const toggleVolume = volumeId => {
    const isNowExpanded = !expandedVolumes[volumeId];
    setExpandedVolumes(prev => ({
      ...prev,
      [volumeId]: isNowExpanded
    }));
    if (isNowExpanded && onVolumeExpand) {
      onVolumeExpand(volumeId);
    }
  };

  /** Điều hướng đến trang bài báo theo issue */
  const handleViewArticles = (e, issueId) => {
    e.stopPropagation();
    const query = new URLSearchParams({
      issue_id: issueId
    });
    if (journalId) query.set('journal_id', journalId);
    navigate(`/articles?${query.toString()}`);
  };

  /** Render shared pagination controls with API pagination metadata. */
  const renderPagination = (pagination, onPageChange, entityName) => {
    const totalItems = pagination?.total || pagination?.total_items || pagination?.totalItems || 0;
    const currentPage = pagination?.page || 1;
    const limit = pagination?.limit || pagination?.page_size || 10;
    if (totalItems <= limit) return null;
    return <AdminPagination totalItems={totalItems} currentPage={currentPage} limit={limit} onPageChange={onPageChange} entityName={entityName} />;
  };
  if (loading) {
    return <MuiBox component="section" sx={{ padding: "1.5rem" }} className="journal-surface">
        {[1, 2, 3].map(i => <MuiBox component="div" sx={{ marginBottom: "1rem", padding: "1rem", borderBottom: "1px solid #dee2e6" }} key={i} >
            <LoadingSkeleton sx={{ marginBottom: "0.5rem" }} width="200px" height="24px"  />
            <LoadingSkeleton width="120px" height="16px" />
          </MuiBox>)}
      </MuiBox>;
  }
  if (error) {
    return <section className="journal-surface journal-empty-state">
        <Icon sx={{ color: "error.main" }} icon="lucide:alert-triangle" width="36"  />
        <MuiBox component="p" sx={{ marginBottom: "0" }} >{t("journal.khongTheTaiDanhSachVolumesVuiL")}</MuiBox>
      </section>;
  }
  if (!volumes || volumes.length === 0) {
    return <section className="journal-surface journal-empty-state">
        <Icon icon="lucide:folder-x" width="36" />
        <MuiBox component="p" sx={{ marginBottom: "0" }} >{t("journal.journalNayChuaCoDuLieuVolume")}</MuiBox>
      </section>;
  }
  return <div className="journal-volume-list">
      {volumes.map(vol => {

      const volumeId = vol.volume_id || vol.id;
      const volumeYear = vol.publication_year || vol.year;
      const isExpanded = !!expandedVolumes[volumeId];
      const issues = issuesByVolume[volumeId];
      const issueError = issueErrors[volumeId];
      const issuePagination = issuePaginationByVolume[volumeId];
      return <article key={volumeId} className={`journal-volume-card ${isExpanded ? 'is-expanded' : ''}`}>
            <div className="journal-volume-header" onClick={() => toggleVolume(volumeId)}>
              <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }} >
                <Icon icon={isExpanded ? 'lucide:folder-open' : 'lucide:folder'} style={{
              color: 'var(--text-muted)'
            }} width="20" />
                <div>
                  <span className="journal-volume-title">Volume {vol.volume_number || 'N/A'}</span>
                  <span className="journal-volume-meta">{volumeYear || t("author.chuaCapNhat")}</span>
                  {vol.issue_count !== undefined && vol.issue_count > 0 && <MuiBox component="span" sx={{ fontSize: "0.875em", marginInlineStart: "0.5rem" }} className="text-muted-custom">
                      {vol.issue_count} issue
                    </MuiBox>}
                </div>
              </MuiBox>
              <MuiBox component="span" sx={{ display: "flex", alignItems: "center" }} className="text-muted-custom">
                <Icon icon={isExpanded ? 'lucide:chevron-up' : 'lucide:chevron-down'} width="18" />
              </MuiBox>
            </div>

            {isExpanded && <div className="journal-issue-panel">
                {issues === undefined && !issueError ? <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-muted-custom">
                    <Spinner animation="border" size="sm" />{t("journal.dangTaiDanhSachIssue")}</MuiBox> : issueError ? <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingTop: "1rem", paddingBottom: "1rem", color: "error.main" }} >
                    <Icon icon="lucide:alert-triangle" width="16" />{t("journal.khongTheTaiDanhSachIssuesVuiLo")}</MuiBox> : !issues || issues.length === 0 ? <MuiBox component="div" sx={{ paddingTop: "1rem", paddingBottom: "1rem", textAlign: "left" }} className="text-muted-custom">
                    <Icon sx={{ marginInlineEnd: "0.25rem" }} icon="lucide:inbox" width="14"  />{t("journal.volumeNayChuaCoIssue")}</MuiBox> : <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} >
                    {issues.map(issue => {

              const issueId = issue.issue_id || issue.id;
              const issueYear = issue.publication_year || issue.year;
              const issueMonth = issue.month ? MONTH_NAMES[issue.month] || `Tháng ${issue.month}` : null;
              return <div key={issueId} className="journal-issue-row">
                          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }} >
                            <Icon icon="lucide:file-stack" style={{
                    color: 'var(--text-muted)'
                  }} width="15" />
                            <span className="journal-issue-title">Issue {issue.issue_number || 'N/A'}</span>
                            {(issueMonth || issueYear) && <MuiBox component="span" sx={{ fontSize: "0.875em" }} className="text-muted-custom">
                                {[issueMonth, issueYear].filter(Boolean).join(' ')}
                              </MuiBox>}
                            {issue.article_count !== undefined && <MuiBox component="span" sx={{ fontSize: "0.875em" }} className="text-muted-custom">
                                {issue.article_count}{" "}{t("author.baiBao")}</MuiBox>}
                          </MuiBox>

                          <Button sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.25rem", paddingBottom: "0.25rem" }} onClick={e => handleViewArticles(e, issueId)} className="journal-text-btn">{t("journal.xemBaiBao")}<Icon icon="lucide:arrow-right" width="14" />
                          </Button>
                        </div>;
            })}
                    {renderPagination(issuePagination, nextPage => onIssuePageChange && onIssuePageChange(volumeId, nextPage), 'issue')}
                  </MuiBox>}
              </div>}
          </article>;
    })}
      {renderPagination(volumePagination, nextPage => onVolumePageChange && onVolumePageChange(nextPage), 'volume')}
    </div>;
}
