import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useEffect, useMemo, useState } from 'react';
import { Row, Col, Card } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { useJournalManagement } from '../../journal/hooks/useJournalManagement';
import { getJournalArticlesApi } from '../../journal/api/journalApi';
import { getAdminJournalRepositorySummary } from '../api/adminDashboard.api';
import VolumeList from '../components/repository/VolumeList';
import IssueTable from '../components/repository/IssueTable';
import SwitchJournalModal from '../components/modals/SwitchJournalModal';
import CreateVolumeModal from '../components/modals/CreateVolumeModal';
import CreateIssueModal from '../components/modals/CreateIssueModal';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';


import MuiBox from '@mui/material/Box';


/**
 * RepositoryManagementPage - Admin repository coordinator for selected journal volumes and issues.
 */
export default function RepositoryManagementPage() {
  const { t: _t } = useTranslation();
  const {
    currentJournal,
    volumes,
    issues,
    selectedVolume,
    setSelectedVolume,
    fetchInitialData
  } = useJournalManagement();
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showVolumeModal, setShowVolumeModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [repositorySummary, setRepositorySummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');
  const [articleCountsByIssueId, setArticleCountsByIssueId] = useState({});
  const [volumeStatsById, setVolumeStatsById] = useState({});
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);
  useEffect(() => {
    let isMounted = true;
    const fetchRepositorySummary = async () => {
      if (!currentJournal?.id) {
        setRepositorySummary(null);
        setSummaryError('');
        return;
      }
      try {
        setSummaryLoading(true);
        setSummaryError('');
        const response = await getAdminJournalRepositorySummary(currentJournal.id);
        if (!isMounted) return;
        setRepositorySummary(response.data?.data || null);
      } catch (error) {
        if (!isMounted) return;
        setRepositorySummary(null);
        setSummaryError(error.response?.status === 403 ? t("admin.backendTuChoiQuyenAdminTokenHi") : t("admin.khongTheTaiThongKeRepositoryTu"));
      } finally {
        if (isMounted) setSummaryLoading(false);
      }
    };
    fetchRepositorySummary();
    return () => {
      isMounted = false;
    };
  }, [currentJournal?.id]);
  const currentVolumes = useMemo(() => (volumes || []).filter(volume => volume.journalId === currentJournal?.id), [volumes, currentJournal?.id]);
  useEffect(() => {
    if (currentVolumes.length > 0 && !selectedVolume) {
      setSelectedVolume(currentVolumes[0].id);
    }
  }, [currentVolumes, selectedVolume, setSelectedVolume]);
  const currentIssues = useMemo(() => (issues || []).filter(issue => (issue.volume_id || issue.volumeId) === selectedVolume), [issues, selectedVolume]);
  useEffect(() => {
    let isMounted = true;
    const fetchRepositoryVolumeStats = async () => {
      const issuesByVolumeId = currentVolumes.reduce((acc, volume) => {
        acc[volume.id] = (issues || []).filter(issue => (issue.volume_id || issue.volumeId) === volume.id);
        return acc;
      }, {});
      const allIssues = Object.values(issuesByVolumeId).flat();
      if (!allIssues.length) {
        if (isMounted) {
          setArticleCountsByIssueId({});
          setVolumeStatsById(Object.fromEntries(currentVolumes.map(volume => [volume.id, {
            issueCount: 0,
            articleCount: 0
          }])));
        }
        return;
      }
      try {
        const countEntries = await Promise.all(allIssues.map(async issue => {
          const issueId = issue.issue_id || issue.id;
          const response = await getJournalArticlesApi({
            issue_id: issueId,
            page: 1,
            limit: 1
          });
          const payload = response.data?.data;
          const count = payload?.pagination?.total ?? payload?.total ?? (Array.isArray(payload) ? payload.length : 0);
          return [issueId, count];
        }));
        if (isMounted) {
          const nextArticleCounts = Object.fromEntries(countEntries);
          setArticleCountsByIssueId(nextArticleCounts);
          setVolumeStatsById(Object.fromEntries(currentVolumes.map(volume => {
            const volumeIssues = issuesByVolumeId[volume.id] || [];
            const articleCount = volumeIssues.reduce((sum, issue) => sum + (nextArticleCounts[issue.issue_id || issue.id] || 0), 0);
            return [volume.id, {
              issueCount: volumeIssues.length,
              articleCount
            }];
          })));
        }
      } catch {
        if (isMounted) {
          setArticleCountsByIssueId({});
          setVolumeStatsById(Object.fromEntries(currentVolumes.map(volume => [volume.id, {
            issueCount: (issuesByVolumeId[volume.id] || []).length,
            articleCount: undefined
          }])));
        }
      }
    };
    fetchRepositoryVolumeStats();
    return () => {
      isMounted = false;
    };
  }, [currentVolumes, issues]);
  const totalVolumes = repositorySummary?.total_volumes ?? 0;
  const activeIssues = repositorySummary?.active_issues ?? 0;
  const totalPublications = repositorySummary?.total_publications ?? 0;
  const nextRelease = repositorySummary?.next_release ? new Date(repositorySummary.next_release).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }) : 'N/A';
  const activeVolObj = currentVolumes.find(volume => volume.id === selectedVolume);
  return <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }} >
      <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }} >
        <div>
          <MuiBox component="span" sx={{ fontSize: "0.875em", textTransform: "uppercase", fontWeight: 600 }} className="text-muted-custom" style={{
          letterSpacing: '0.05em'
        }}>
            Resource Management
          </MuiBox>
          <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display text-main">Repository Management</MuiBox>
          <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">
            Manage volumes and publication issues for your active journals.
          </MuiBox>
        </div>
        <PrimaryButton sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem" }}  onClick={() => setShowVolumeModal(true)}>
          <Icon icon="lucide:plus" width="16" />
          <span>New Volume</span>
        </PrimaryButton>
      </MuiBox>

      <MuiBox component="div" sx={{ bgcolor: "background.paper", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #dee2e6", display: "flex", flexDirection: "column", "@media (min-width:768px)": { flexDirection: "row", alignItems: "center" }, justifyContent: "space-between", gap: "1rem", marginBottom: "0.5rem" }}  style={{
      borderColor: 'var(--border)'
    }}>
        <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} >
          <MuiBox component="div" sx={{ display: "none", "@media (min-width:576px)": { display: "flex" } }} className="admin-icon-tile">
            <Icon icon="lucide:book-open" width="24" />
          </MuiBox>
          <div>
            <MuiBox component="div" sx={{ textTransform: "uppercase", fontSize: "0.875em", fontWeight: 700 }} className="text-muted-custom" style={{
            fontSize: '0.7rem',
            letterSpacing: '0.05em'
          }}>
              Select Journal Repository
            </MuiBox>
            <MuiBox component="h5" sx={{ fontWeight: 700, margin: "0", display: "flex", alignItems: "center", gap: "0.5rem" }} className="font-display text-main">
              {currentJournal ? currentJournal.title : 'No active journal selected'}
              <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", paddingLeft: "0.5rem", paddingRight: "0.5rem" }} className="admin-status-badge admin-status-badge--accent text-xs font-display py-0.5">
                ACTIVE
              </MuiBox>
            </MuiBox>
            <MuiBox component="small" sx={{ fontFamily: "monospace" }} className="text-muted-custom">
              ISSN: {currentJournal?.issn} • Publisher: {currentJournal?.publisher || 'N/A'}
            </MuiBox>
          </div>
        </MuiBox>
        <PrimaryButton sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem" }} variant="outline" className="btn-custom-sm" onClick={() => setShowSwitchModal(true)}>
          <Icon icon="lucide:refresh-cw" width="14" />
          <span>Switch Journal</span>
        </PrimaryButton>
      </MuiBox>

      {summaryError && <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: 0, borderRadius: "0.5rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029", fontSize: "0.875em", marginBottom: "0.5rem" }} >
          {summaryError}
        </MuiBox>}

      <Row sx={{ gap: "1rem", marginBottom: "0.5rem" }} >
        <Col xs={12} sm={6} md={3}>
          <Card sx={{ border: "1px solid #dee2e6", padding: "1rem", boxShadow: "none", bgcolor: "background.paper", borderRadius: "0.5rem" }} >
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }} >
              <MuiBox component="div" sx={{ fontSize: "0.875em", textTransform: "uppercase", fontWeight: 600 }} className="text-muted-custom">Total Volumes</MuiBox>
              <MuiBox component="div" sx={{ color: "text.secondary", bgcolor: "#f8f9fa", borderRadius: "0.375rem", display: "flex" }} className="p-1.5"><Icon icon="lucide:layers" width="16" /></MuiBox>
            </MuiBox>
            <MuiBox component="h3" sx={{ fontWeight: 700, margin: "0", fontFamily: "monospace" }} className="text-main">{summaryLoading ? '...' : totalVolumes}</MuiBox>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card sx={{ border: "1px solid #dee2e6", padding: "1rem", boxShadow: "none", bgcolor: "background.paper", borderRadius: "0.5rem" }} >
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }} >
              <MuiBox component="div" sx={{ fontSize: "0.875em", textTransform: "uppercase", fontWeight: 600 }} className="text-muted-custom">Active Issues</MuiBox>
              <MuiBox component="div" sx={{ color: "text.secondary", bgcolor: "#f8f9fa", borderRadius: "0.375rem", display: "flex" }} className="p-1.5"><Icon icon="lucide:book-marked" width="16" /></MuiBox>
            </MuiBox>
            <MuiBox component="h3" sx={{ fontWeight: 700, margin: "0", fontFamily: "monospace" }} className="text-main">{summaryLoading ? '...' : activeIssues}</MuiBox>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card sx={{ border: "1px solid #dee2e6", padding: "1rem", boxShadow: "none", bgcolor: "background.paper", borderRadius: "0.5rem" }} >
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }} >
              <MuiBox component="div" sx={{ fontSize: "0.875em", textTransform: "uppercase", fontWeight: 600 }} className="text-muted-custom">Total Articles</MuiBox>
              <MuiBox component="div" sx={{ color: "text.secondary", bgcolor: "#f8f9fa", borderRadius: "0.375rem", display: "flex" }} className="p-1.5"><Icon icon="lucide:file-text" width="16" /></MuiBox>
            </MuiBox>
            <MuiBox component="h3" sx={{ fontWeight: 700, margin: "0", fontFamily: "monospace" }} className="text-main">{summaryLoading ? '...' : totalPublications}</MuiBox>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card sx={{ border: "1px solid #dee2e6", padding: "1rem", boxShadow: "none", bgcolor: "background.paper", borderRadius: "0.5rem" }} >
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }} >
              <MuiBox component="div" sx={{ fontSize: "0.875em", textTransform: "uppercase", fontWeight: 600 }} className="text-muted-custom">Next Release</MuiBox>
              <MuiBox component="div" sx={{ color: "text.secondary", bgcolor: "#f8f9fa", borderRadius: "0.375rem", display: "flex" }} className="p-1.5"><Icon icon="lucide:calendar" width="16" /></MuiBox>
            </MuiBox>
            <MuiBox component="h3" sx={{ fontWeight: 700, margin: "0", fontFamily: "monospace" }} className="text-main admin-accent-text" style={{
            fontSize: '1.25rem'
          }}>
              {summaryLoading ? '...' : nextRelease}
            </MuiBox>
          </Card>
        </Col>
      </Row>

      <Row sx={{ gap: "1.5rem", alignItems: "flex-start" }} >
        <Col xs={12} lg={4}>
          <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }} >
            <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "0", display: "flex", alignItems: "center", gap: "0.5rem" }} className="font-display text-main">
              Volumes Repository
              <Icon sx={{ color: "text.secondary" }} icon="lucide:sliders-horizontal"  width="16" />
            </MuiBox>
          </MuiBox>
          <VolumeList volumes={currentVolumes} selectedVolumeId={selectedVolume} onSelectVolume={setSelectedVolume} volumeStatsById={volumeStatsById} />
        </Col>

        <Col xs={12} lg={8}>
          <MuiBox component="div" sx={{ bgcolor: "background.paper", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #dee2e6" }}  style={{
          borderColor: 'var(--border)'
        }}>
            <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #dee2e6", paddingBottom: "1rem", marginBottom: "1rem" }} >
              <div>
                <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display text-main">
                  {activeVolObj ? `${activeVolObj.volumeNumber} Overview` : 'Volume Overview'}
                </MuiBox>
                <small className="text-muted-custom">
                  Published: {activeVolObj?.frequency || 'Quarterly'} • Frequency: Q1, Q2, Q3, Q4
                </small>
              </div>
              <PrimaryButton sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} className="btn-custom-sm" disabled={!selectedVolume} onClick={() => setShowIssueModal(true)}>
                <Icon icon="lucide:plus-circle" width="14" />
                <span>Add Issue</span>
              </PrimaryButton>
            </MuiBox>

            <IssueTable issues={currentIssues} articleCountsByIssueId={articleCountsByIssueId} />
          </MuiBox>
        </Col>
      </Row>

      <SwitchJournalModal show={showSwitchModal} handleClose={() => setShowSwitchModal(false)} />
      <CreateVolumeModal show={showVolumeModal} handleClose={() => setShowVolumeModal(false)} />
      <CreateIssueModal show={showIssueModal} handleClose={() => setShowIssueModal(false)} />
    </MuiBox>;
}
