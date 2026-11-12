import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\dashboard\components\TrendingKeywordsCard.jsx
 */
import Icon from '../../../shared/components/Icon.jsx';
import { EntityCard } from '../../../shared/components/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


import MuiBox from '@mui/material/Box';

function KeywordsRechart({
  chartData,
  onKeywordClick
}) {
  const {
    t
  } = useTranslation();
  const labels = chartData?.labels || [];
  const dataset = chartData?.datasets?.[0] || {
    data: []
  };
  const mappedData = labels.map((label, index) => ({
    keyword: label,
    value: dataset.data[index] ?? 0
  }));
  return <ResponsiveContainer width="100%" height={260}>
      <BarChart data={mappedData} layout="vertical" margin={{
      left: 5,
      right: 10,
      top: 5,
      bottom: 5
    }}>
        <XAxis type="number" hide />
        <YAxis dataKey="keyword" type="category" width={110} tick={{
        fill: 'var(--text-muted)',
        fontSize: 11,
        fontFamily: 'var(--font-display)'
      }} axisLine={false} tickLine={false} />
        <Tooltip cursor={{
        fill: 'var(--bg-section)',
        opacity: 0.5
      }} contentStyle={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        color: 'var(--text-main)',
        fontSize: '11px',
        fontFamily: 'var(--font-display)'
      }} />
        <Bar dataKey="value" fill="var(--primary)" name={dataset.label || t("publications")} radius={[0, 4, 4, 0]} barSize={14} isAnimationActive={true} animationDuration={400} onClick={data => {
        if (data && data.keyword) {
          onKeywordClick?.(data.keyword);
        }
      }} style={{
        cursor: 'pointer'
      }} />
      </BarChart>
    </ResponsiveContainer>;
}

/**
 * TrendingKeywordsCard — card trending keywords với biểu đồ BarChart của Recharts
 */
export default function TrendingKeywordsCard({
  keywords,
  loading,
  isFetching,
  error,
  onKeywordClick,
  onViewMore
}) {
  const {
    t
  } = useTranslation();
  const labels = keywords?.labels || [];
  const dataset = keywords?.datasets?.[0] || {
    data: []
  };
  const hasData = labels.length > 0 && dataset.data?.length > 0;

  const actions = <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
    {isFetching && (
      <Icon icon="lucide:loader" className="spin-animation text-muted-custom" width={14} />
    )}
    {onViewMore && (
      <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", bgcolor: "transparent", color: "primary.main", padding: "0" }}  onClick={onViewMore} style={{
        fontSize: '0.75rem',
        color: 'var(--primary)'
      }} onMouseEnter={e => {
        e.currentTarget.style.textDecoration = 'underline';
        e.currentTarget.style.textUnderlineOffset = '4px';
      }} onMouseLeave={e => {
        e.currentTarget.style.textDecoration = 'none';
      }}>{t("dashboard.xemThem")}</MuiBox>
    )}
  </MuiBox>;

  const description = loading && !hasData ? <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} >
      {[1, 2, 3, 4, 5].map((_, i) => <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} key={i} >
          <MuiBox component="div" sx={{ borderRadius: "0.375rem" }} className="skeleton-shimmer" style={{
        width: 80,
        height: 16
      }} />
          <MuiBox component="div" sx={{ borderRadius: "0.375rem", flexGrow: 1 }} className="skeleton-shimmer" style={{
        height: 16
      }} />
        </MuiBox>)}
    </MuiBox> : error && !hasData ? <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "1.5rem" }} >
      <Icon icon="lucide:alert-circle" width={28} style={{
      color: '#ef4444'
    }} />
      <MuiBox component="p" sx={{ marginTop: "0.5rem", marginBottom: "0" }} className="text-muted-custom" style={{
      fontSize: '0.8rem'
    }}>{error}</MuiBox>
    </MuiBox> : !hasData ? <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "1.5rem" }} >
      <Icon icon="lucide:tag" width={32} style={{
      color: 'var(--text-muted)'
    }} />
      <MuiBox component="p" sx={{ fontWeight: 600, marginTop: "0.5rem", marginBottom: "0.25rem" }} className="text-main" style={{
      fontSize: '0.85rem'
    }}>{t("dashboard.chuaCoKeywordNao")}</MuiBox>
      <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom" style={{
      fontSize: '0.75rem'
    }}>{t("dashboard.themKeywordVaoProjectDeBatDauT")}</MuiBox>
    </MuiBox> : <div style={{
      opacity: isFetching ? 0.6 : 1,
      transition: 'opacity 0.25s ease',
      width: '100%'
    }}>
      <KeywordsRechart chartData={keywords} onKeywordClick={onKeywordClick} />
    </div>;

  return <EntityCard sx={{ height: "100%" }}  title={<MuiBox component="span" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
          <Icon icon="lucide:flame" width={16} style={{
      color: 'var(--primary)'
    }} />
          <span>Trending Keywords</span>
        </MuiBox>} actions={actions} description={description} bodyClassName="flex-column align-items-stretch" />;
}
