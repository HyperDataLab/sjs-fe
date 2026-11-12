import { useTranslation } from "react-i18next";
/**
 * @file AuthorAreasBreakdown.jsx
 * @description Donut chart + ranked area list for the author research distribution.
 */
import { Card } from '@/shared/components/ui/muiAdapters';
import LoadingSkeleton from "../../../shared/components/LoadingSkeleton";
import EmptyState from "../../../shared/components/EmptyState";



const COLORS = ["#FF7A33", "#6366F1", "#0EA5E9", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

export default function AuthorAreasBreakdown({ breakdown = [], loading = false, error = null }) {
  const { t } = useTranslation();
  const items = Array.isArray(breakdown) ? breakdown : [];
  const MAX_VISIBLE = 5;

  const sorted = [...items].sort(
    (a, b) => (Number(b.percentage ?? b.percent ?? 0) || 0) - (Number(a.percentage ?? a.percent ?? 0) || 0)
  );
  const visible = sorted.slice(0, MAX_VISIBLE);
  const hiddenCount = Math.max(0, sorted.length - MAX_VISIBLE);
  const hiddenArticles = sorted
    .slice(MAX_VISIBLE)
    .reduce((s, x) => s + (Number(x.count ?? x.article_count ?? 0) || 0), 0);

  if (loading) {
    return (
      <div className="adp-card adp-areas">
        <div className="adp-section-label">{t("author.phanBoLinhVucNghienCuu")}</div>
        <div className="adp-areas-inner">
          <div className="skeleton-shimmer adp-areas-skeleton-chart" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <LoadingSkeleton width="90%" height="12px" />
            <LoadingSkeleton width="75%" height="12px" />
            <LoadingSkeleton width="60%" height="12px" />
          </div>
        </div>
      </div>
    );
  }

  if (error || items.length === 0) {
    return (
      <div className="adp-card adp-areas">
        <div className="adp-section-label">{t("author.phanBoLinhVucNghienCuu")}</div>
        <EmptyState sx={{ border: 0, paddingTop: "1rem", paddingBottom: "1rem" }}
          title={t("author.chuaCoDuLieuPhanBo")}
          description={t("author.chuaCoDuLieuPhanBoLinhVucNghie")}
          icon="lucide:pie-chart"

        />
      </div>
    );
  }

  // Build SVG donut
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  let acc = 0;

  return (
    <div className="adp-card adp-areas">
      <div className="adp-section-label">{t("author.phanBoLinhVucNghienCuu1")}</div>

      <div className="adp-areas-inner">
        {/* Donut chart */}
        <div className="adp-areas-chart-wrap">
          <svg width="130" height="130" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r={radius} fill="transparent" stroke="var(--bg-section)" strokeWidth="12" />
            {visible.map((item, idx) => {
              const pct = Number(item.percentage ?? 0) || 0;
              const dashArray = `${(pct / 100) * circumference} ${circumference}`;
              const dashOffset = -((acc / 100) * circumference);
              acc += pct;
              return (
                <circle
                  key={idx}
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="transparent"
                  stroke={COLORS[idx % COLORS.length]}
                  strokeWidth="13"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                />
              );
            })}
          </svg>
          <div className="adp-areas-donut-center">
            <span className="adp-areas-donut-value">{items.length}</span>
            <span className="adp-areas-donut-label">{t("author.linhVuc")}</span>
          </div>
        </div>

        {/* Area list */}
        <div className="adp-areas-list">
          {visible.map((item, idx) => {
            const color = COLORS[idx % COLORS.length];
            const name =
              item.subject_area ??
              item.category_name ??
              item.subject_area_name ??
              item.display_name ??
              item.name ??
              t("article.chuaPhanLoai");
            const pct = Number(item.percentage ?? 0) || 0;
            const count = Number(item.count ?? item.article_count ?? 0) || 0;
            return (
              <div key={idx} className="adp-areas-row">
                <div className="adp-areas-row-head">
                  <div className="adp-areas-row-name">
                    <span className="adp-areas-dot" style={{ backgroundColor: color }} />
                    <span>{name}</span>
                  </div>
                  <div className="adp-areas-row-stats">
                    <span>{count}{t("author.baiBao")}</span>
                    <span>·</span>
                    <span>{pct}%</span>
                  </div>
                </div>
                <div className="adp-areas-track">
                  <div className="adp-areas-fill" style={{ width: `${pct}%`, backgroundColor: color }} />
                </div>
              </div>
            );
          })}
          {hiddenCount > 0 && (
            <div className="adp-areas-more">
              +{hiddenCount} {t("author.linhVucKhac")}
              {hiddenArticles > 0 ? ` (${hiddenArticles} ${t("author.baiBao")})` : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
