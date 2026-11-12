import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\dashboard\components\PublicationTrendChart.jsx
 */
import { useState } from 'react';
import Icon from '../../../shared/components/Icon.jsx';
import ChartRangeDropdown from './ChartRangeDropdown';


import MuiBox from '@mui/material/Box';


/**
 * PublicationTrendChart — line chart xu hướng publication theo năm.
 * Dùng SVG thuần (không cần thư viện nặng như Chart.js / Recharts)
 * để giữ bundle nhỏ. Có thể swap thành Recharts sau này.
 *
 * Props:
 *   analytics  - object trả từ BE: { years: [...], series: [{label, data:[...]}] }
 *   loading
 *   error
 */

const LINE_COLORS = ['var(--primary)', '#3b82f6', '#10b981', '#a855f7'];
function SimpleSvgChart({
  years,
  series
}) {
  const {
    t
  } = useTranslation();
  const [hoveredPoint, setHoveredPoint] = useState(null);
  if (!years?.length || !series?.length) return null;
  const W = 480,
    H = 160,
    PAD = {
      top: 12,
      right: 16,
      bottom: 28,
      left: 36
    };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  // flatten all values to get global min/max
  const allVals = series.flatMap(s => s.data ?? []).filter(Number.isFinite);
  const minVal = Math.min(0, ...allVals);
  const maxVal = Math.max(1, ...allVals);
  const xScale = i => PAD.left + i / (years.length - 1 || 1) * chartW;
  const yScale = v => PAD.top + chartH - (v - minVal) / (maxVal - minVal || 1) * chartH;
  return <MuiBox component="div" sx={{ position: "relative", width: "100%", height: "100%" }} >
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{
      overflow: 'visible'
    }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const y = PAD.top + (1 - t) * chartH;
        return <line key={t} x1={PAD.left} x2={PAD.left + chartW} y1={y} y2={y} stroke="var(--border)" strokeWidth={0.6} strokeDasharray="3 3" />;
      })}

        {/* X axis labels */}
        {years.map((yr, i) => {
        // Calculate dynamic step to avoid label overlaps for long year ranges
        const maxLabels = 8;
        const step = Math.ceil(years.length / maxLabels);

        // Always show the first and the last years, and other years at step intervals
        const shouldShow = i === 0 || i === years.length - 1 || i % step === 0;

        // Prevent showing label if it is too close to the last year label
        const isTooCloseToLast = i % step === 0 && years.length - 1 - i < step * 0.5 && i !== years.length - 1;
        if (!shouldShow || isTooCloseToLast) return null;
        return <text key={yr} x={xScale(i)} y={H - 4} textAnchor="middle" style={{
          fontSize: 9,
          fill: 'var(--text-muted)',
          fontFamily: 'var(--font-display)'
        }}>
              {yr}
            </text>;
      })}

        {/* Series lines */}
        {series.map((s, si) => {
        if (!s.data?.length) return null;
        const color = LINE_COLORS[si % LINE_COLORS.length];
        const pts = s.data.map((v, i) => `${xScale(i)},${yScale(v ?? 0)}`).join(' ');
        const pts0 = `${xScale(0)},${yScale(0)}`;
        const ptsN = `${xScale(s.data.length - 1)},${yScale(0)}`;

        // Hide small dots visually if there are too many data points (to keep the line clean)
        const showDots = years.length <= 25;
        return <g key={si}>
              {/* Area fill */}
              <polygon points={`${pts0} ${pts} ${ptsN}`} fill={color} fillOpacity={0.08} style={{ transition: 'all 0.35s ease' }} />
              {/* Line */}
              <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" style={{ transition: 'all 0.35s ease' }} />
              {/* Dots */}
              {showDots && s.data.map((v, i) => <circle key={i} cx={xScale(i)} cy={yScale(v ?? 0)} r={3} fill={color} stroke="var(--bg-card)" strokeWidth={1.5} style={{ transition: 'all 0.35s ease' }} />)}
              {/* Transparent larger hover targets (always active) */}
              {s.data.map((v, i) => <circle key={`hover-${i}`} cx={xScale(i)} cy={yScale(v ?? 0)} r={12} fill="transparent" style={{
            cursor: 'pointer'
          }} onMouseEnter={() => setHoveredPoint({
            year: years[i],
            value: v ?? 0,
            x: xScale(i),
            y: yScale(v ?? 0)
          })} onMouseLeave={() => setHoveredPoint(null)} />)}
            </g>;
      })}
      </svg>
      {/* Tooltip Overlay */}
      {hoveredPoint && <div className="chart-svg-tooltip" style={{
      left: `${hoveredPoint.x / W * 100}%`,
      top: `${hoveredPoint.y / H * 100}%`,
      transform: 'translate(-50%, -100%) translateY(-8px)'
    }}>
          <MuiBox component="div" sx={{ fontWeight: 600, marginBottom: "0" }}  style={{
        fontSize: '10px',
        color: 'var(--text-muted)'
      }}>{t("article.nam")}{hoveredPoint.year}</MuiBox>
          <MuiBox component="div" sx={{ fontWeight: 700 }}  style={{
        fontSize: '12px',
        color: 'var(--primary)'
      }}>{hoveredPoint.value}{t("author.baiBao")}</MuiBox>
        </div>}
    </MuiBox>;
}
export default function PublicationTrendChart({
  analytics,
  loading,
  isFetching,
  error,
  onRetry,
  selectedRange,
  onRangeChange
}) {
  const {
    t
  } = useTranslation();
  // Normalise BE response shape
  const years = analytics?.years ?? analytics?.year_range ?? [];
  const series = analytics?.series ?? (analytics?.data ? [{
    label: t("articles"),
    data: analytics.data
  }] : []);
  const legend = series.length > 0 ? <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "flex-end", marginInlineEnd: "1rem" }} >
      {series.map((s, i) => <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }} key={i} >
          <div style={{
        width: 10,
        height: 3,
        borderRadius: 2,
        backgroundColor: LINE_COLORS[i % LINE_COLORS.length]
      }} />
          <span className="text-muted-custom" style={{
        fontSize: '0.65rem'
      }}>{s.label ? t(s.label, s.label) : `Series ${i + 1}`}</span>
        </MuiBox>)}
    </MuiBox> : null;
  const description = <>
      <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }} >
        <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom" style={{
          fontSize: '0.72rem'
        }}>{t("dashboard.soBaiBaoTheoNamTrongProjectsCu")}</MuiBox>
        {isFetching && (
          <MuiBox component="span" sx={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }} className="text-muted-custom" style={{ fontSize: '0.7rem' }}>
            <Icon icon="lucide:loader" className="spin-animation" width={12} />
            <span>{t("common.dangCapNhat", "Đang cập nhật...")}</span>
          </MuiBox>
        )}
      </MuiBox>
      <div style={{
      minHeight: 160
    }}>
        {loading && years.length === 0 ? <MuiBox component="div" sx={{ borderRadius: "0.5rem", width: "100%" }} className="skeleton-shimmer" style={{
        height: 160
      }} /> : error && years.length === 0 ? <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem", paddingTop: "3rem", paddingBottom: "3rem" }} >
            <Icon icon="lucide:alert-triangle" width={28} style={{
          color: '#ef4444'
        }} />
            <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom" style={{
          fontSize: '0.8rem'
        }}>{error}</MuiBox>
            {onRetry && <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: "1px solid", borderRadius: "0.25rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", borderColor: "primary.main", bgcolor: "transparent", color: "primary.main", "&:hover": { bgcolor: "primary.main", color: "primary.contrastText" }, marginTop: "0.5rem" }}  onClick={onRetry}>{t("article.thuLai")}</MuiBox>}
          </MuiBox> : years.length === 0 ? <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem", paddingTop: "3rem", paddingBottom: "3rem" }} >
            <Icon icon="lucide:bar-chart-2" width={36} style={{
          color: 'var(--text-muted)'
        }} />
            <MuiBox component="p" sx={{ fontWeight: 600, marginBottom: "0.25rem" }} className="text-main" style={{
          fontSize: '0.85rem'
        }}>{t("dashboard.chuaCoDuLieuXuHuongPublication")}</MuiBox>
            <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom" style={{
          fontSize: '0.75rem'
        }}>{t("dashboard.taoProjectDauTienDeBatDauTheoD")}</MuiBox>
          </MuiBox> : <div style={{
            opacity: isFetching ? 0.6 : 1,
            transition: 'opacity 0.25s ease',
            width: '100%',
            height: '100%'
          }}>
            <SimpleSvgChart years={years} series={series} />
          </div>}
      </div>
    </>;
  return <MuiBox component="div" sx={{ height: "100%" }} className="publication-trend-card">
      <div className="ptc-header">
        <div className="ptc-title">
          <Icon icon="lucide:trending-up" width={16} style={{
          color: 'var(--primary)'
        }} />
          <span>{t("dashboard.xuHuongPublication")}</span>
        </div>
        <MuiBox component="div" sx={{ display: "flex", alignItems: "center" }} className="ptc-actions">
          {legend}
          {onRangeChange && <ChartRangeDropdown value={selectedRange} onChange={onRangeChange} />}
        </MuiBox>
      </div>
      <div className="ptc-body">
        {description}
      </div>
    </MuiBox>;
}
