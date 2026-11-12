import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import ROUTES from '../../../app/routes/routePaths';
import { useQueryClient } from '@tanstack/react-query';
import { useKeywordTracking } from '../../keyword/hooks/useKeywordTracking';
import { useProjectOverviewQuery } from '../hooks/useProjectOverviewQuery';
import { useProjectMembersQuery } from '../hooks/useProjectMembersQuery';
import KeywordWatchList from '../../keyword/components/KeywordWatchList';
import AddKeywordModal from '../../keyword/components/AddKeywordModal';
import ManageKeywordsModal from '../../keyword/components/ManageKeywordsModal';
import UpgradePlanModal from '../components/UpgradePlanModal';
import ProjectMembersList from '../components/ProjectMembersList';
import InviteMemberModal from '../components/InviteMemberModal';
import Icon from '../../../shared/components/Icon.jsx';
import { Modal } from '@/shared/components/ui/muiAdapters';
import Header from '../../landing/components/Header';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import projectService from '../../project/services/projectService';
import LatexText from '../../../shared/components/LatexText/LatexText';
import useAuth from '../../auth/hooks/useAuth';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';

const ProjectDetailPage = () => {
  const { t: _t, i18n } = useTranslation();
  const {
    id: projectId
  } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const auth = useAuth();
  const currentUser = auth?.user;
  const {
    project,
    watchArticles,
    keywordArticles,
    watchedKeywords,
    watchArticlesPagination,
    keywordArticlesPagination,
    loading,
    error,
    actionLoading,
    addKeywordWatch,
    removeKeywordWatch,
    fetchWatchArticles,
    fetchKeywordArticles,
    refetch: refetchProjectDetails
  } = useKeywordTracking(projectId);
  const [activeTab, setActiveTab] = useState(tabParam && ['overview', 'articles', 'keywords', 'members'].includes(tabParam) ? tabParam : 'articles');

  useEffect(() => {
    if (tabParam && ['overview', 'articles', 'keywords', 'members'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab }, { replace: true });
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ show: false, userId: null });

  const queryClient = useQueryClient();
  const { data: overviewData, isLoading: overviewLoading, error: overviewErrorRaw, refetch: fetchProjectOverview } = useProjectOverviewQuery(projectId);
  const overviewError = overviewErrorRaw ? t("project.khongTheTaiDuLieuTongQuanVuiLo") : null;

  const { data: membersData, isLoading: membersLoading } = useProjectMembersQuery(projectId);
  const members = membersData || [];

  const [membersActionLoading, setMembersActionLoading] = useState(false);

  const chartColors = ['#ff702f', '#ff9f68', '#ffc09b', '#334155', '#64748b', '#94a3b8'];

  const handleInviteMember = async (email, role) => {
    setMembersActionLoading(true);
    try {
      await projectService.inviteProjectMember(projectId, email, role);
      setShowInviteModal(false);
      queryClient.invalidateQueries({ queryKey: ['project', projectId, 'members'] });
    } catch (err) {
      console.error('Error inviting member', err);
      alert(err.response?.data?.message || 'Có lỗi xảy ra khi mời thành viên.');
    } finally {
      setMembersActionLoading(false);
    }
  };

  const handleChangeRole = async (userId, role) => {
    setMembersActionLoading(true);
    try {
      await projectService.updateProjectMemberRole(projectId, userId, role);
      queryClient.invalidateQueries({ queryKey: ['project', projectId, 'members'] });
    } catch (err) {
      console.error('Error updating role', err);
      alert('Không thể cập nhật quyền.');
    } finally {
      setMembersActionLoading(false);
    }
  };

  const handleRemoveMember = (userId) => {
    setConfirmModal({ show: true, userId });
  };

  const confirmRemoveMember = async () => {
    if (!confirmModal.userId) return;
    setMembersActionLoading(true);
    setConfirmModal({ show: false, userId: null });
    try {
      await projectService.removeProjectMember(projectId, confirmModal.userId);
      queryClient.invalidateQueries({ queryKey: ['project', projectId, 'members'] });
    } catch (err) {
      console.error('Error removing member', err);
      alert('Không thể xóa thành viên.');
    } finally {
      setMembersActionLoading(false);
    }
  };
  const formatNumber = value => Number(value || 0).toLocaleString('vi-VN');
  const formatDate = value => {
    if (!value) return t("author.chuaCapNhat");
    return new Date(value).toLocaleDateString('vi-VN');
  };
  const mapChartData = chart => {
    const labels = chart?.labels || [];
    const values = chart?.datasets?.[0]?.data || [];
    return labels.map((label, index) => ({
      name: label,
      value: values[index] || 0
    }));
  };
  const hasChartData = chart => mapChartData(chart).some(item => item.value > 0);
  const chartTooltipStyle = {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
    color: 'var(--text-main)',
    fontFamily: 'var(--font-display)',
    fontSize: '12px'
  };
  const renderEmptyChart = (message = t("project.chuaCoDuLieuBieuDo")) => <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", paddingTop: "3rem", paddingBottom: "3rem" }} className="text-muted-custom">
      <Icon sx={{ marginBottom: "0.5rem", opacity: 0.5 }} icon="lucide:chart-no-axes-column" width="42"  />
      <MuiBox component="span" sx={{ fontSize: "0.875em" }} >{message}</MuiBox>
    </MuiBox>;
  const renderDonutChart = (chart, centerLabel) => {
    let data = mapChartData(chart);
    if (!hasChartData(chart)) return renderEmptyChart();

    // Group items beyond top 5 into "Lĩnh vực khác" / "Nguồn khác"
    if (data.length > 5) {
      const sorted = [...data].sort((a, b) => b.value - a.value);
      const top5 = sorted.slice(0, 5);
      const remainingSum = sorted.slice(5).reduce((sum, item) => sum + item.value, 0);
      if (remainingSum > 0) {
        const otherLabel = centerLabel === 'Subject Areas' ? t("project.linhVucKhac") : t("project.nguonKhac");
        top5.push({
          name: otherLabel,
          value: remainingSum
        });
      }
      data = top5;
    }
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return <MuiBox component="div" sx={{ display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", width: "100%", alignItems: "center", gap: "1rem" }} >
        <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:576px)": { gridColumn: "span 6" }, display: "flex", justifyContent: "center", position: "relative" }} >
          <div style={{
          width: '100%',
          height: '220px'
        }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={3} dataKey="value" nameKey="name">
                  {data.map((_, index) => <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />)}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} formatter={value => [formatNumber(value), centerLabel]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <MuiBox component="div" sx={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}  style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          pointerEvents: 'none'
        }}>
            <MuiBox component="span" sx={{ fontWeight: 700 }} className="text-main" style={{
            fontSize: '1.25rem'
          }}>{formatNumber(total)}</MuiBox>
            <span className="text-muted-custom" style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 600
          }}>{t("project.tongSo")}</span>
          </MuiBox>
        </MuiBox>
        <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:576px)": { gridColumn: "span 6" } }} >
          <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingInlineEnd: "0.5rem" }} className="custom-scrollbar" style={{
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
            {data.map((item, index) => {
            const percentage = total > 0 ? (item.value / total * 100).toFixed(1) : 0;
            return <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.25rem", paddingBottom: "0.25rem", borderBottom: "1px solid #dee2e6", borderColor: "#dee2e6" }} key={index} >
                  <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}  style={{
                maxWidth: '70%'
              }}>
                    <MuiBox component="span" sx={{ borderRadius: "50%", flexShrink: 0 }}  style={{
                  width: 8,
                  height: 8,
                  backgroundColor: chartColors[index % chartColors.length]
                }} />
                    <MuiBox component="span" sx={{ fontSize: "0.875em", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontWeight: 500 }} className="text-main" title={item.name}>{item.name}</MuiBox>
                  </MuiBox>
                  <MuiBox component="div" sx={{ fontSize: "0.875em", whiteSpace: "nowrap" }} className="text-muted-custom">
                    <MuiBox component="span" sx={{ fontWeight: 600, marginInlineEnd: "0.25rem" }} className="text-main">{formatNumber(item.value)}</MuiBox>
                    <span style={{
                  fontSize: '0.85em'
                }}>({percentage}%)</span>
                  </MuiBox>
                </MuiBox>;
          })}
          </MuiBox>
        </MuiBox>
      </MuiBox>;
  };
  const renderLineChart = chart => {
    const data = mapChartData(chart);
    if (!hasChartData(chart)) return renderEmptyChart();
    return <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{
        top: 12,
        right: 18,
        left: -10,
        bottom: 8
      }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="name" tick={{
          fill: 'var(--text-muted)',
          fontSize: 12,
          fontFamily: 'var(--font-display)'
        }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{
          fill: 'var(--text-muted)',
          fontSize: 12,
          fontFamily: 'var(--font-display)'
        }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={chartTooltipStyle} formatter={value => [formatNumber(value), chart?.datasets?.[0]?.label || 'Publications']} />
          <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} dot={{
          r: 4,
          strokeWidth: 2,
          fill: 'var(--bg-card)',
          stroke: 'var(--primary)'
        }} activeDot={{
          r: 6,
          fill: 'var(--primary)'
        }} />
        </LineChart>
      </ResponsiveContainer>;
  };
  const renderOverviewTab = () => {
    const summary = overviewData?.summary || {};
    const charts = overviewData?.charts || {};
    if (overviewLoading) {
      return <MuiBox component="div" sx={{ borderRadius: "0.5rem", border: 0, padding: "3rem", textAlign: "center" }} className="glass-card text-muted-custom">
          <Icon sx={{ marginBottom: "1rem" }} icon="lucide:loader-circle" width="32" className="animate-spin-slow" style={{ color: 'var(--primary)' }} />
          <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0", marginTop: "1rem" }} >{t("project.dangTaiDuLieuTongQuan")}</MuiBox>
        </MuiBox>;
    }
    if (overviewError) {
      return <MuiBox component="div" sx={{ borderRadius: "0.5rem", border: 0, padding: "1.5rem", textAlign: "center" }} className="glass-card">
          <Icon sx={{ color: "error.main", marginBottom: "1rem" }} icon="lucide:circle-alert" width="42"  />
          <MuiBox component="h6" sx={{ fontWeight: 700 }} className="text-main">{t("article.khongTheTaiBieuDo")}</MuiBox>
          <MuiBox component="p" sx={{ fontSize: "0.875em" }} className="text-muted-custom">{overviewError}</MuiBox>
          <PrimaryButton sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}  onClick={fetchProjectOverview}>{t("article.thuLai")}</PrimaryButton>
        </MuiBox>;
    }
    return <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
        <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} className="po-metrics" style={{ borderTop: 0, paddingTop: 0, marginTop: 0 }}>
          <div className="po-metric">
            <div className="po-metric__label">{t("project.tongSoBaiBao")}</div>
            <div className="po-metric__value">{formatNumber(summary.totalArticles)}</div>
          </div>
          <div className="po-metric">
            <div className="po-metric__label">{t("project.keywordTheoDoi")}</div>
            <div className="po-metric__value">{formatNumber(summary.totalKeywords)}</div>
          </div>
          <div className="po-metric">
            <div className="po-metric__label">{t("project.tongSoTapChi")}</div>
            <div className="po-metric__value">{formatNumber(summary.totalJournals)}</div>
          </div>
          <div className="po-metric">
            <div className="po-metric__label">{t("project.capNhatGanNhat")}</div>
            <div className="po-metric__value" style={{ fontSize: '1.125rem' }}>{formatDate(summary.lastUpdatedAt)}</div>
          </div>
        </MuiBox>

        <MuiBox component="div" sx={{ borderRadius: "0.5rem", padding: "1.5rem" }} className="glass-card glass-card--flat">
          <MuiBox component="div" sx={{ marginBottom: "1rem" }} >
            <MuiBox component="h6" sx={{ fontWeight: 600, marginBottom: "0.25rem" }} className="text-main" style={{ letterSpacing: '-0.005em' }}>{t("project.xuHuongXuatBan")}</MuiBox>
            <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">{t("project.soLuongBaiBaoLienQuanTheoTungN")}</MuiBox>
          </MuiBox>
          {renderLineChart(charts.publicationTrend)}
        </MuiBox>

        <MuiBox component="div" sx={{ display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", width: "100%", gap: "1rem" }} >
          <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:992px)": { gridColumn: "span 6" } }} >
            <MuiBox component="div" sx={{ borderRadius: "0.5rem", padding: "1.5rem", height: "100%" }} className="glass-card glass-card--flat">
              <MuiBox component="h6" sx={{ fontWeight: 600, marginBottom: "0.25rem" }} className="text-main" style={{ letterSpacing: '-0.005em' }}>{t("project.phanBoLinhVuc")}</MuiBox>
              <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "1rem" }} className="text-muted-custom">{t("project.tyTrongBaiBaoTheoSubjectArea")}</MuiBox>
              {renderDonutChart(charts.subjectAreaDistribution, 'Subject Areas')}
            </MuiBox>
          </MuiBox>
          <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:992px)": { gridColumn: "span 6" } }} >
            <MuiBox component="div" sx={{ borderRadius: "0.5rem", padding: "1.5rem", height: "100%" }} className="glass-card glass-card--flat">
              <MuiBox component="h6" sx={{ fontWeight: 600, marginBottom: "0.25rem" }} className="text-main" style={{ letterSpacing: '-0.005em' }}>{t("project.loaiNguonXuatBan")}</MuiBox>
              <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "1rem" }} className="text-muted-custom">{t("project.phanBoTheoJournalConferenceBoo")}</MuiBox>
              {renderDonutChart(charts.publicationTypeDistribution, 'Publication Types')}
            </MuiBox>
          </MuiBox>
        </MuiBox>
      </MuiBox>;
  };
  const renderPagination = type => {
    const pagination = type === 'keywords' ? keywordArticlesPagination : watchArticlesPagination;
    const fetchFn = type === 'keywords' ? fetchKeywordArticles : fetchWatchArticles;
    if (!pagination || pagination.totalPages <= 1) return null;
    const {
      page,
      totalPages
    } = pagination;
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    return <MuiBox component="div" sx={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }} >
        <MuiBox component="ul" sx={{ display: "flex", paddingLeft: 0, listStyle: "none", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)" }} >
          <MuiBox component="li" sx={{ display: "flex" }}>
            <MuiBox component="button" sx={{ position: "relative", display: "block", minWidth: 36, px: "0.75rem", py: "0.375rem", color: "text.primary", textDecoration: "none", bgcolor: "background.paper", border: "1px solid #dee2e6", cursor: page <= 1 ? "not-allowed" : "pointer", "&:hover:not(:disabled)": { bgcolor: "action.hover" }, "&:disabled": { color: "text.disabled" } }} disabled={page <= 1} onClick={() => fetchFn(page - 1)}>
              <Icon icon="lucide:chevron-left" />
            </MuiBox>
          </MuiBox>
          {pages.map((p, idx) => <MuiBox component="li" sx={{ display: "flex" }} key={idx}>
              <MuiBox component="button" sx={{ position: "relative", display: "block", minWidth: 36, px: "0.75rem", py: "0.375rem", color: p === page ? "#fff" : "text.primary", textDecoration: "none", bgcolor: p === page ? "#fd7e14" : "background.paper", border: "1px solid", borderColor: p === page ? "#fd7e14" : "#dee2e6", cursor: p === '...' || p === page ? "default" : "pointer", "&:hover:not(:disabled)": { bgcolor: p === page ? "#fd7e14" : "action.hover" }, "&:disabled": { color: "text.disabled" } }} disabled={p === '...'} aria-current={p === page ? "page" : undefined} style={p === page ? {
            backgroundColor: '#fd7e14',
            borderColor: '#fd7e14',
            color: '#fff',
            cursor: 'default'
          } : {
            cursor: p === '...' ? 'default' : 'pointer'
          }} onClick={() => p !== '...' && p !== page && fetchFn(p)}>
                {p}
              </MuiBox>
            </MuiBox>)}
          <MuiBox component="li" sx={{ display: "flex" }}>
            <MuiBox component="button" sx={{ position: "relative", display: "block", minWidth: 36, px: "0.75rem", py: "0.375rem", color: "text.primary", textDecoration: "none", bgcolor: "background.paper", border: "1px solid #dee2e6", cursor: page >= totalPages ? "not-allowed" : "pointer", "&:hover:not(:disabled)": { bgcolor: "action.hover" }, "&:disabled": { color: "text.disabled" } }} disabled={page >= totalPages} onClick={() => fetchFn(page + 1)}>
              <Icon icon="lucide:chevron-right" />
            </MuiBox>
          </MuiBox>
        </MuiBox>
      </MuiBox>;
  };
  if (loading) {
    return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingTop: "1.5rem", paddingBottom: "1.5rem", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} className="grid-bg">
        <MuiBox component="div" sx={{ display: "inline-block", width: "2rem", height: "2rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", color: "primary.main" }}  role="status"></MuiBox>
      </MuiBox>;
  }
  if (error || !project) {
    return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingTop: "1.5rem", paddingBottom: "1.5rem", minHeight: "100vh" }} className="grid-bg">
        <MuiBox component="div" sx={{ width: "100%", mx: "auto", px: "0.75rem", "@media (min-width:576px)": { maxWidth: 540 }, "@media (min-width:768px)": { maxWidth: 720 }, "@media (min-width:992px)": { maxWidth: 960 }, "@media (min-width:1200px)": { maxWidth: 1140 }, "@media (min-width:1400px)": { maxWidth: 1320 } }}  style={{
        maxWidth: '1000px',
        marginTop: '20px'
      }}>
          <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: 0, borderRadius: "0.75rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }} >
            <Icon sx={{ color: "error.main", flexShrink: 0 }} icon="lucide:alert-triangle" width="24"  />
            <div>
              <MuiBox component="h6" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} >{t("project.khongTheTaiDuAn")}</MuiBox>
              <MuiBox component="p" sx={{ marginBottom: "0", fontSize: "0.875em" }} >{error || t("project.duAnKhongTonTaiHoacDaBiXoa")}</MuiBox>
            </div>
            <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: "1px solid", borderRadius: "0.25rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", borderColor: "error.main", bgcolor: "transparent", color: "error.main", ml: "auto" }}  onClick={() => navigate(ROUTES.PROJECTS)}>{t("auth.quayLai")}</MuiBox>
          </MuiBox>
        </MuiBox>
      </MuiBox>;
  }
  const title = project.title || 'Untitled Project';
  const areaName = project.subject_area?.display_name || project.subject_area?.name || (typeof project.subject_area === 'string' ? project.subject_area : t("project.chuaXacDinhLinhVuc"));
  const createdAt = project.created_at ? new Date(project.created_at).toLocaleDateString('vi-VN') : 'N/A';
  const keywordCount = watchedKeywords?.length || 0;
  const articleCount = watchArticlesPagination?.total || 0;
  const isProjectActive = String(project.status || '').toUpperCase() === 'ACTIVE';
  return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingBottom: "1.5rem", minHeight: "100vh", position: "relative", overflow: "hidden" }} className="grid-bg" style={{
    paddingTop: '80px'
  }}>
      <MuiBox component="div" sx={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }} className="radial-fade" style={{
      top: 0,
      left: 0,
      zIndex: 0
    }} />
      <Header />
      <MuiBox component="div" sx={{ width: "100%", mx: "auto", px: "0.75rem", "@media (min-width:576px)": { maxWidth: 540 }, "@media (min-width:768px)": { maxWidth: 720 }, "@media (min-width:992px)": { maxWidth: 960 }, "@media (min-width:1200px)": { maxWidth: 1140 }, "@media (min-width:1400px)": { maxWidth: 1320 }, position: "relative", zIndex: 1 }}  style={{
      maxWidth: '1200px',
      marginTop: '40px'
    }}>
        {/* Breadcrumb */}
        <MuiBox component="nav" sx={{ marginBottom: "0.5rem" }} aria-label="breadcrumb" className="po-breadcrumb">
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "0", listStyle: "none" }} >
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><MuiBox component={Link} sx={{ textDecoration: "none" }} to={ROUTES.DASHBOARD} >{t("author.tongQuan")}</MuiBox></MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><MuiBox component={Link} sx={{ textDecoration: "none" }} to={ROUTES.PROJECTS} >{t("project.duAnTheoDoi")}</MuiBox></MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} className="active" aria-current="page">{title}</MuiBox>
          </MuiBox>
        </MuiBox>

        {/* Header section (Mockup 3) */}
        <MuiBox component="div" sx={{ marginBottom: "1rem" }} className="po-header">
          <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }} >

            {/* LEFT: meta + title + status */}
            <div className="min-w-0" style={{ flex: '1 1 320px' }}>
              <div className="po-meta">
                <span>{areaName}</span>
                <span className="po-meta__sep">·</span>
                <span>{t("project.capNhatLuc")}{createdAt}</span>
              </div>
              <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }} >
                <MuiBox component="h1" sx={{ marginBottom: "0" }} className="font-display text-main" style={{ fontSize: 'clamp(2rem, 1.625rem + 1.5vw, 2.625rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>{title}</MuiBox>
                <span className={`po-status ${isProjectActive ? 'is-active' : ''}`}>
                  <span className="po-status__dot" aria-hidden="true" />
                  {isProjectActive ? t("project.dangHoatDong") : t("project.chuaKichHoat", "Chưa kích hoạt")}
                </span>
              </MuiBox>
            </div>

            {/* RIGHT: action buttons */}
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }} >
              {!isProjectActive && (
                <PrimaryButton sx={{ paddingLeft: "1rem", paddingRight: "1rem" }}

                  variant="outline"
                  style={{ minHeight: 36, padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
                  onClick={() => setShowUpgradeModal(true)}
                >
                  <Icon icon="lucide:crown" width="14" />
                  {t("project.kichHoatGoi")}
                </PrimaryButton>
              )}

              <PrimaryButton sx={{ paddingLeft: "1rem", paddingRight: "1rem" }}

                variant={isProjectActive ? 'primary' : 'outline'}
                disabled={!isProjectActive}
                style={!isProjectActive ? { opacity: 0.55, cursor: 'not-allowed', minHeight: 36, padding: '0.4rem 0.85rem', fontSize: '0.85rem' } : { minHeight: 36, padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
                onClick={() => {
                  if (!isProjectActive) return;
                  const originUrl = import.meta.env.VITE_ORIGIN_URL || 'http://localhost:5174';
                  const lang = i18n.language ? i18n.language.split('-')[0] : 'vi';
                  window.location.href = `${originUrl}/${lang}/project/${projectId}/dashboard`;
                }}
              >
                <Icon icon={isProjectActive ? "lucide:sparkles" : "lucide:lock"} width="14" />
                {t("project.phanTichChuyenSau")}
              </PrimaryButton>
            </MuiBox>
          </MuiBox>

          {/* Single information-dense metrics row, no individual cards.
              Reading order (left → right): hero → strong → default → muted.
              Tier classes control size + weight for selective hierarchy. */}
          <div className="po-metrics">
            <div className="po-metric">
              <div className="po-metric__label">{t("keywords.baiBaoLienQuan")}</div>
              <div className="po-metric__value po-metric__value--hero">{articleCount.toLocaleString('vi-VN')}</div>
            </div>
            <div className="po-metric">
              <div className="po-metric__label">{t("project.mucDoTangTruong")}</div>
              <div className={`po-metric__value po-metric__value--strong ${
                (project?.alerts_24h?.growthRate || 0) > 0 ? 'is-positive'
                : (project?.alerts_24h?.growthRate || 0) < 0 ? 'is-negative'
                : ''
              }`}>
                <Icon
                  icon={(project?.alerts_24h?.growthRate || 0) > 0 ? "lucide:trending-up"
                    : (project?.alerts_24h?.growthRate || 0) < 0 ? "lucide:trending-down"
                    : "lucide:minus"}
                  width="14"
                />
                {(project?.alerts_24h?.growthRate || 0) > 0 ? '+' : ''}{project?.alerts_24h?.growthRate || 0}%
              </div>
            </div>
            <div className="po-metric">
              <div className="po-metric__label">{t("project.tuKhoaTheoDoi1")}</div>
              <div className="po-metric__value po-metric__value--muted">{keywordCount.toLocaleString('vi-VN')}</div>
            </div>
            <div className="po-metric">
              <div className="po-metric__label">{t("project.canhBaoMoi24h")}</div>
              <div className="po-metric__value po-metric__value--muted">{project?.alerts_24h?.todayCount || 0}</div>
            </div>
          </div>
        </MuiBox>

        <nav className="po-tabs" role="tablist" aria-label="Project sections">
          <button role="tab" aria-selected={activeTab === 'overview'}
            className={`po-tab ${activeTab === 'overview' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('overview')}>
            <Icon icon="lucide:bar-chart-2" width="15" />
            {t("project.tongQuanBieuDo", "Overview & Charts")}
          </button>
          <button role="tab" aria-selected={activeTab === 'articles'}
            className={`po-tab ${activeTab === 'articles' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('articles')}>
            <Icon icon="lucide:file-text" width="15" />
            {t("project.luongBaiBao", "News Feed")}
            <span className="po-tab__count">({articleCount.toLocaleString()})</span>
          </button>
          <button role="tab" aria-selected={activeTab === 'keywords'}
            className={`po-tab ${activeTab === 'keywords' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('keywords')}>
            <Icon icon="lucide:key" width="15" />
            {t("project.keywordsGiamSat", "Keywords & Monitoring")}
            <span className="po-tab__count">({keywordCount.toLocaleString()})</span>
          </button>
          <button role="tab" aria-selected={activeTab === 'members'}
            className={`po-tab ${activeTab === 'members' ? 'is-active' : ''}`}
            onClick={() => handleTabChange('members')}>
            <Icon icon="lucide:users" width="15" />
            {t("project.thanhVien", "Members")}
            <span className="po-tab__count">({members.length})</span>
          </button>
        </nav>

        {/* Tab Content */}
        <MuiBox component="div" sx={{ marginBottom: "3rem" }} >
          {activeTab === 'overview' && renderOverviewTab()}

          {activeTab === 'articles' && <MuiBox component="div" sx={{ borderRadius: "0.75rem", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", border: "1px solid #dee2e6", padding: "1.5rem" }} className="glass-card">
              <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
                <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="text-main">{t("project.luongBaiVietCapNhat")}</MuiBox>
                <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">{t("project.danhSachCacBaiBaoKhoaHocXuatBa")}</MuiBox>
              </MuiBox>

              {watchArticles.length === 0 ? <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem" }} className="text-muted-custom">
                  <Icon sx={{ marginBottom: "1rem", opacity: 0.5 }} icon="lucide:file-x" width="48"  />
                  <MuiBox component="p" sx={{ marginBottom: "0" }} >{t("project.chuaCoBaiBaoNaoKhopVoiTuKhoaCu")}</MuiBox>
                </MuiBox> : <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", paddingLeft: 0, marginBottom: 0, borderRadius: 0, borderTop: "1px solid #dee2e6", paddingTop: "0.5rem" }} >
                  {watchArticles.map((article, index) => <MuiBox component="div" sx={{ position: "relative", display: "block", p: "0.5rem 1rem", color: "text.primary", textDecoration: "none", bgcolor: "transparent", border: "1px solid rgba(0,0,0,.125)", paddingLeft: "0", paddingRight: "0", paddingTop: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #dee2e6" }} key={index} >
                      <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }} >
                        <MuiBox component="span" sx={{ fontSize: "0.875em" }} className="text-muted-custom">{article.journal_name || article.journal?.title || t("author.tapChiKhoaHoc")}</MuiBox>
                        <MuiBox component="span" sx={{ fontSize: "0.875em" }} className="text-muted-custom">{article.publication_year || new Date(article.publication_date).getFullYear()}</MuiBox>
                      </MuiBox>
                      <MuiBox component={Link} sx={{ textDecoration: "none" }} to={`/articles/${article.article_id || article.id}/visual`} >
                        <MuiBox component="h6" sx={{ fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.5 }} className="text-main hover-primary">
                          <LatexText text={article.title} />
                        </MuiBox>
                      </MuiBox>
                      <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }} >
                        <MuiBox component="div" sx={{ fontSize: "0.875em", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", paddingInlineEnd: "1rem" }} className="text-muted-custom">
                          {article.doi && <>
                              DOI: <MuiBox component="a" sx={{ textDecoration: "none" }} href={article.doi.startsWith('http') ? article.doi : `https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer" className="text-muted-custom hover-primary">{article.doi}</MuiBox>
                            </>}
                        </MuiBox>
                        <MuiBox component="div" sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }} >
                          {article.matched_areas?.map((area, aIdx) => <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 500, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem" }} key={`area-${aIdx}`}  style={{
                    fontSize: '0.7rem',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    border: 'none',
                    boxShadow: 'none'
                  }}>
                              <Icon sx={{ marginInlineEnd: "0.25rem" }} icon="lucide:book-open"  width="12" />
                              {area}
                            </MuiBox>)}
                          {article.matched_keywords?.map((kw, kwIdx) => <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 500, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem" }} key={`kw-${kwIdx}`}  style={{
                    fontSize: '0.7rem',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    border: 'none',
                    boxShadow: 'none'
                  }}>
                              <Icon sx={{ marginInlineEnd: "0.25rem" }} icon="lucide:sparkles"  width="12" />
                              {kw}
                            </MuiBox>)}
                          {!article.matched_keywords?.length && !article.matched_areas?.length && <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 500, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem" }}  style={{
                    fontSize: '0.7rem',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    border: 'none',
                    boxShadow: 'none'
                  }}>{t("project.doTrungKhopCao")}</MuiBox>}
                        </MuiBox>
                      </MuiBox>
                    </MuiBox>)}
                </MuiBox>}

              {renderPagination('articles')}
            </MuiBox>}

          {activeTab === 'keywords' && <MuiBox component="div" sx={{ borderRadius: "0.75rem", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", border: "1px solid #dee2e6", padding: "1.5rem" }} className="glass-card">
              <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }} >
                <div>
                  <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="text-main">{t("project.quanLyWatchlistTuKhoa")}</MuiBox>
                  <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">{t("project.heThongSeLienTucQuetBaiBaoMoiV")}</MuiBox>
                </div>
                <PrimaryButton sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} variant="outline"  onClick={() => navigate(`/projects/${projectId}/edit`)}>
                  <Icon icon="lucide:edit-2" width="16" />{t("project.chinhSuaDanhSach")}</PrimaryButton>
              </MuiBox>

              <KeywordWatchList watchedKeywords={watchedKeywords} articles={keywordArticles} loading={loading} onManageClick={() => setShowManageModal(true)} />

              {renderPagination('keywords')}
            </MuiBox>}

          {activeTab === 'members' && (
            <ProjectMembersList
              project={project}
              members={members}
              loading={membersLoading}
              onInviteClick={() => setShowInviteModal(true)}
              onChangeRole={handleChangeRole}
              onRemoveMember={handleRemoveMember}
              actionLoading={membersActionLoading}
              currentUser={currentUser}
            />
          )}
        </MuiBox>
      </MuiBox>

      {/* Modals */}
      <AddKeywordModal show={showAddModal} onHide={() => setShowAddModal(false)} onAdd={addKeywordWatch} actionLoading={actionLoading} />

      <ManageKeywordsModal show={showManageModal} onHide={() => setShowManageModal(false)} watchedKeywords={watchedKeywords} onRemove={removeKeywordWatch} actionLoading={actionLoading} />

      <InviteMemberModal
        show={showInviteModal}
        onHide={() => setShowInviteModal(false)}
        onInvite={handleInviteMember}
        actionLoading={membersActionLoading}
      />

      <Modal show={confirmModal.show} onHide={() => setConfirmModal({ show: false, userId: null })} centered>
        <Modal.Header sx={{ border: 0, paddingBottom: "0" }} closeButton >
          <Modal.Title sx={{ fontWeight: 700 }} className="text-main">
            {t("project.xoaThanhVienTitle", "Xóa thành viên")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted-custom">{t("project.banCoChacMuonXoaThanhVien", "Bạn có chắc chắn muốn xóa thành viên này / hủy lời mời khỏi dự án không?")}</p>
        </Modal.Body>
        <Modal.Footer sx={{ border: 0, paddingTop: "0" }} >
          <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }} variant="outline"  onClick={() => setConfirmModal({ show: false, userId: null })}>
            {t("admin.huy", "Hủy")}
          </PrimaryButton>
          <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: "1px solid transparent", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", bgcolor: "error.main", borderColor: "error.main", color: "#fff", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}  onClick={confirmRemoveMember} style={{ fontWeight: 600, borderRadius: '12px' }}>
            {t("project.xoa", "Xóa")}
          </MuiBox>
        </Modal.Footer>
      </Modal>

      <UpgradePlanModal show={showUpgradeModal} onHide={() => setShowUpgradeModal(false)} projectId={projectId} onSuccess={() => {
      fetchProjectOverview();
      if (refetchProjectDetails) refetchProjectDetails();
      setShowUpgradeModal(false);
    }} />
    </MuiBox>;
};
export default ProjectDetailPage;
