import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\dashboard\components\RecentProjectsCard.jsx
 */
import { useState } from 'react';
import Icon from '../../../shared/components/Icon.jsx';
import { EntityCard } from '../../../shared/components/Card';


import MuiBox from '@mui/material/Box';


function ProjectStatusBadge({
  status
}) {
  const { t } = useTranslation();

  const STATUS_CONFIG = {
    active: {
      label: t("admin.hoatDong"),
      bg: 'var(--bg-chip)',
      color: 'var(--text-main)',
      border: 'var(--border)'
    },
    new: {
      label: 'New',
      bg: 'var(--primary-light)',
      color: 'var(--primary)',
      border: 'transparent'
    },
    paused: {
      label: t("dashboard.tamDung"),
      bg: 'var(--bg-section)',
      color: 'var(--text-muted)',
      border: 'var(--border)'
    },
    archived: {
      label: t("dashboard.luuTru"),
      bg: 'var(--bg-section)',
      color: 'var(--text-muted)',
      border: 'var(--border)'
    },
    deleted: {
      label: 'Deleted',
      bg: '#fee2e2',
      color: '#dc2626',
      border: 'transparent'
    }
  };

  const cfg = STATUS_CONFIG[status?.toLowerCase()] ?? STATUS_CONFIG.active;
  return <MuiBox component="span" sx={{ display: "inline-flex", alignItems: "center", paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", borderRadius: "50rem", flexShrink: 0, whiteSpace: "nowrap" }} className="font-display" style={{
    fontSize: '0.7rem',
    fontWeight: 600,
    backgroundColor: cfg.bg,
    color: cfg.color,
    border: `1px solid ${cfg.border}`
  }}>
      {cfg.label}
    </MuiBox>;
}

/**
 * RecentProjectItem — một row project trong danh sách
 */
function RecentProjectItem({
  project,
  onClick
}) {
  const {
    t
  } = useTranslation();
  const name = project.project_name ?? project.name ?? project.title ?? 'Untitled';
  const journalCount = project.journal_count ?? project.journals?.length ?? 0;
  const articleCount = project.article_count ?? 0;
  const status = project.status ?? 'active';

  // Avatar initials from name (Up to 3 letters)
  const initials = name.split(' ').filter(w => w.length > 0).slice(0, 3).map(w => w[0]?.toUpperCase() ?? '').join('');
  return <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "1rem", paddingRight: "1rem", borderRadius: "0.5rem" }}  style={{
    cursor: 'pointer',
    transition: 'background 0.15s ease',
    borderBottom: '1px solid var(--border)'
  }} onClick={onClick} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-section)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
      {/* Avatar */}
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff" }} className="font-display" style={{
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'var(--btn-dark)',
      fontSize: initials.length >= 3 ? '0.65rem' : '0.75rem',
      fontWeight: 700
    }}>
        {initials}
      </MuiBox>

      {/* Info */}
      <MuiBox component="div" sx={{ flexGrow: 1 }}  style={{
      minWidth: 0
    }}>
        <MuiBox component="div" sx={{ fontWeight: 600, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-main" style={{
        fontSize: '0.85rem'
      }} title={name}>
          {name}
        </MuiBox>
        <MuiBox component="div" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-muted-custom" style={{
        fontSize: '0.72rem'
      }}>
          {journalCount} {t("project.tapChi")} · {articleCount} {t("author.baiBao")}</MuiBox>
      </MuiBox>

      {/* Status */}
      <ProjectStatusBadge status={status} />
    </MuiBox>;
}

/**
 * RecentProjectsCard — card chứa danh sách 3 project gần đây
 */
export default function RecentProjectsCard({
  projects,
  loading,
  error,
  onViewAll,
  onProjectClick
}) {
  const {
    t
  } = useTranslation();
  const ITEMS_PER_PAGE = 4;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil((projects?.length ?? 0) / ITEMS_PER_PAGE));
  const paginatedProjects = projects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const actions = onViewAll ? <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", bgcolor: "transparent", color: "primary.main", padding: "0" }}  onClick={onViewAll} style={{
    fontSize: '0.75rem',
    color: 'var(--primary)'
  }} onMouseEnter={e => {
    e.currentTarget.style.textDecoration = 'underline';
    e.currentTarget.style.textUnderlineOffset = '4px';
  }} onMouseLeave={e => {
    e.currentTarget.style.textDecoration = 'none';
  }}>{t("dashboard.xemTatCa")}</MuiBox> : null;
  const description = <MuiBox component="div" sx={{ paddingLeft: "0.25rem", paddingRight: "0.25rem" }} >
      {loading ? [1, 2, 3].map(i => <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} key={i} >
            <MuiBox component="div" sx={{ borderRadius: "0.5rem" }} className="skeleton-shimmer" style={{
        width: 40,
        height: 40,
        flexShrink: 0
      }} />
            <MuiBox component="div" sx={{ flexGrow: 1 }} >
              <MuiBox component="div" sx={{ borderRadius: "0.375rem", marginBottom: "0.25rem" }} className="skeleton-shimmer" style={{
          width: '70%',
          height: 14
        }} />
              <MuiBox component="div" sx={{ borderRadius: "0.375rem" }} className="skeleton-shimmer" style={{
          width: '50%',
          height: 11
        }} />
            </MuiBox>
          </MuiBox>) : error ? <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem", paddingLeft: "1rem", paddingRight: "1rem" }} >
          <Icon icon="lucide:alert-circle" width={32} style={{
        color: '#ef4444'
      }} />
          <MuiBox component="p" sx={{ marginTop: "0.5rem", marginBottom: "0" }} className="text-muted-custom" style={{
        fontSize: '0.8rem'
      }}>{error}</MuiBox>
        </MuiBox> : projects.length === 0 ? <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem", paddingLeft: "1rem", paddingRight: "1rem" }} >
          <Icon icon="lucide:folder-plus" width={36} style={{
        color: 'var(--text-muted)'
      }} />
          <MuiBox component="p" sx={{ fontWeight: 600, marginTop: "0.5rem", marginBottom: "0.25rem" }} className="text-main" style={{
        fontSize: '0.85rem'
      }}>{t("dashboard.chuaCoProjectNao")}</MuiBox>
          <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom" style={{
        fontSize: '0.75rem'
      }}>{t("dashboard.taoProjectDauTienDeBatDauTheoD")}</MuiBox>
        </MuiBox> : <>
          {paginatedProjects.map((p, i) => <RecentProjectItem key={p.project_id ?? p.id ?? i} project={p} onClick={() => onProjectClick?.(p)} />)}

          {totalPages > 1 && <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "0.5rem" }} >
              <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: "1px solid transparent", borderRadius: "0.25rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none" }} type="button"  onClick={() => setPage(prev => Math.max(1, prev - 1))} disabled={page === 1} style={{
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          color: page === 1 ? 'var(--text-muted)' : 'var(--text-main)',
          fontSize: '0.72rem',
          fontWeight: 600
        }}>{t("dashboard.truoc")}</MuiBox>

              <span className="text-muted-custom" style={{
          fontSize: '0.72rem'
        }}>
                {t("dashboard.trang")} {page}/{totalPages}
              </span>

              <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: "1px solid transparent", borderRadius: "0.25rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none" }} type="button"  onClick={() => setPage(prev => Math.min(totalPages, prev + 1))} disabled={page === totalPages} style={{
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          color: page === totalPages ? 'var(--text-muted)' : 'var(--text-main)',
          fontSize: '0.72rem',
          fontWeight: 600
        }}>
                {t("dashboard.sau")} →
              </MuiBox>
            </MuiBox>}
        </>}
    </MuiBox>;
  return <EntityCard sx={{ height: "100%" }}  title={<MuiBox component="span" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
          <Icon icon="lucide:folder-open" width={16} style={{
      color: 'var(--primary)'
    }} />
          <span>{t("dashboard.projectsGanDay")}</span>
        </MuiBox>} actions={actions} description={description} bodyClassName="flex-column align-items-stretch" />;
}
