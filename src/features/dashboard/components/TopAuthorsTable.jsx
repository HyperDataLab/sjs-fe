import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\dashboard\components\TopAuthorsTable.jsx
 */
import Icon from '../../../shared/components/Icon.jsx';
import { useNavigate } from 'react-router-dom';
import { EntityCard } from '../../../shared/components/Card';
import { formatCount } from '../../../shared/utils/formatNumber';
import { truncate } from '../../../shared/utils/formatNumber';


import MuiBox from '@mui/material/Box';


/** Rank badge — top 3 có màu riêng */
function RankBadge({
  rank
}) {
  const cfg = {
    1: {
      bg: 'rgba(245, 158, 11, 0.15)',
      color: '#d97706',
      icon: 'lucide:crown'
    },
    2: {
      bg: 'rgba(156, 163, 175, 0.15)',
      color: '#6b7280',
      icon: null
    },
    3: {
      bg: 'rgba(217, 119, 6, 0.1)',
      color: '#b45309',
      icon: null
    }
  }[rank] ?? {
    bg: 'transparent',
    color: 'var(--text-muted)',
    icon: null
  };
  return <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", flexShrink: 0 }}  style={{
    width: 28,
    height: 28,
    backgroundColor: cfg.bg,
    color: cfg.color,
    fontSize: '0.75rem',
    fontWeight: 700
  }}>
      {cfg.icon ? <Icon icon={cfg.icon} width={12} /> : rank}
    </MuiBox>;
}

/** Author field badge */
function FieldBadge({
  field
}) {
  return <MuiBox component="span" sx={{ paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", borderRadius: "50rem", display: "none", "@media (min-width:576px)": { display: "inline" } }}  style={{
    fontSize: '0.65rem',
    fontWeight: 600,
    backgroundColor: 'var(--bg-section)',
    color: 'var(--text-muted)',
    border: '1px solid var(--border)',
    justifySelf: 'start'
  }}>
      {field}
    </MuiBox>;
}

/** Author avatar initials */
function AuthorAvatar({
  name
}) {
  const initials = (name || '?').split(' ').slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('');
  return <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff" }}  style={{
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'var(--btn-dark)',
    fontSize: '0.7rem',
    fontWeight: 700
  }}>
      {initials}
    </MuiBox>;
}

/**
 * TopAuthorsTable — bảng top 5 tác giả nổi bật tuần này.
 * Reusable: có thể dùng lại cho Author Leaderboard page.
 */
export default function TopAuthorsTable({
  authors,
  loading,
  error,
  onAuthorClick,
  onViewAll
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const actions = onViewAll ? <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", bgcolor: "transparent", color: "primary.main", padding: "0" }}  onClick={onViewAll} style={{
    fontSize: '0.75rem',
    color: 'var(--primary)'
  }} onMouseEnter={e => {
    e.currentTarget.style.textDecoration = 'underline';
    e.currentTarget.style.textUnderlineOffset = '4px';
  }} onMouseLeave={e => {
    e.currentTarget.style.textDecoration = 'none';
  }}>{t("dashboard.bangXepHang")}</MuiBox> : null;
  const description = loading ? <MuiBox component="div" sx={{ padding: "1.5rem" }} >
      {[1, 2, 3, 4, 5].map(i => <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} key={i} >
          <MuiBox component="div" sx={{ borderRadius: "50%" }} className="skeleton-shimmer" style={{
        width: 28,
        height: 28
      }} />
          <MuiBox component="div" sx={{ borderRadius: "50%" }} className="skeleton-shimmer" style={{
        width: 32,
        height: 32
      }} />
          <MuiBox component="div" sx={{ flexGrow: 1 }} >
            <MuiBox component="div" sx={{ borderRadius: "0.375rem", marginBottom: "0.25rem" }} className="skeleton-shimmer" style={{
          width: '50%',
          height: 13
        }} />
            <MuiBox component="div" sx={{ borderRadius: "0.375rem" }} className="skeleton-shimmer" style={{
          width: '30%',
          height: 10
        }} />
          </MuiBox>
          <MuiBox component="div" sx={{ borderRadius: "0.375rem" }} className="skeleton-shimmer" style={{
        width: 60,
        height: 13
      }} />
        </MuiBox>)}
    </MuiBox> : error ? <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }} >
      <Icon icon="lucide:alert-circle" width={32} style={{
      color: '#ef4444'
    }} />
      <MuiBox component="p" sx={{ marginTop: "0.5rem", marginBottom: "0" }} className="text-muted-custom" style={{
      fontSize: '0.8rem'
    }}>{error}</MuiBox>
    </MuiBox> : authors.length === 0 ? <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }} >
      <Icon icon="lucide:users" width={36} style={{
      color: 'var(--text-muted)'
    }} />
      <MuiBox component="p" sx={{ fontWeight: 600, marginTop: "0.5rem", marginBottom: "0.25rem" }} className="text-main" style={{
      fontSize: '0.85rem'
    }}>{t("dashboard.chuaCoDuLieuTacGia")}</MuiBox>
      <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom" style={{
      fontSize: '0.75rem'
    }}>{t("dashboard.duLieuLeaderboardSeHienThiODay")}</MuiBox>
    </MuiBox> : <div>
      {/* Table header */}
      <MuiBox component="div" sx={{ display: "none", "@media (min-width:768px)": { display: "grid" }, paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", marginBottom: "0.5rem", borderRadius: "0.5rem", marginLeft: "0.5rem", marginRight: "0.5rem", marginTop: "0.5rem" }}  style={{
      gridTemplateColumns: '40px 200px 1fr 80px 90px',
      gap: '12px',
      alignItems: 'center',
      backgroundColor: 'var(--bg-section)'
    }}>
        {['#', t("typeAuthor"), t("author.linhVuc"), t("articles"), 'Citations'].map(h => <span key={h} className="text-muted-custom" style={{
        fontSize: '0.7rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>{h}</span>)}
      </MuiBox>

      {/* Rows */}
      <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingBottom: "1rem", paddingLeft: "0.5rem", paddingRight: "0.5rem" }} >
      {authors.map((author, i) => {
      const name = author.display_name ?? author.full_name ?? author.author_name ?? author.name ?? 'Unknown';
      const orcid = author.orcid ?? null;
      const field = author.subject_area ?? author.primary_subject_area ?? author.field ?? author.area ?? '—';
      const articles = author.article_count ?? author.papers ?? author.works_count ?? 0;
      const citations = author.citation_count ?? author.citations ?? author.cited_by_count ?? 0;
      const rank = i + 1;
      return <MuiBox component="div" sx={{ display: "flex", "@media (min-width:768px)": { display: "grid" }, paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem", alignItems: "center", gap: "1rem", borderRadius: "0.75rem" }} key={author.author_id ?? author.id ?? i} className="font-display" style={{
        gridTemplateColumns: '40px 200px 1fr 80px 90px',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid transparent'
      }} onClick={() => onAuthorClick?.(author)} onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = 'var(--bg-section)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
      }} onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.boxShadow = 'none';
      }}>
            <RankBadge rank={rank} />
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
              <AuthorAvatar name={name} />
              <MuiBox component="div" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}  style={{
            minWidth: 0
          }}>
                <MuiBox component="div" sx={{ fontWeight: 600 }} className="text-main" style={{
              fontSize: '0.85rem'
            }}>
                  {truncate(name, 24)}
                </MuiBox>
                {orcid ? <div className="text-muted-custom" style={{
              fontSize: '0.75rem'
            }}>
                    {truncate(orcid, 32)}
                  </div> : null}
              </MuiBox>
            </MuiBox>
            <FieldBadge field={field == "" ? "—" : field} />
            <span className="text-muted-custom" style={{
          fontSize: '0.85rem'
        }}>
              {formatCount(articles)}
            </span>
            <span style={{
          fontSize: '0.85rem',
          color: 'var(--text-main)',
          fontWeight: 600
        }}>
              ↑ {formatCount(citations)}
            </span>
          </MuiBox>;
    })}
      </MuiBox>
    </div>;
  return <EntityCard title={t("dashboard.topAuthorsTuanNay")} actions={actions} description={description} bodyClassName="flex-column align-items-stretch" />;
}
