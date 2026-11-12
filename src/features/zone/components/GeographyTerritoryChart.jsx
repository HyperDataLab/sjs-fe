import { useTranslation } from "react-i18next";
import { useMemo } from 'react';
import Icon from '../../../shared/components/Icon';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


// Helper function to map country code to circle-flags icon code
const getCountryFlagCode = (item) => {
  const rawCode = (item.code || item.iso_code || item.iso2 || item.name?.substring(0, 2) || '').toLowerCase().trim();
  const isoMap = {
    gb: 'gb', gbr: 'gb', uk: 'gb',
    us: 'us', usa: 'us',
    de: 'de', deu: 'de',
    nl: 'nl', nld: 'nl',
    ch: 'ch', che: 'ch',
    vn: 'vn', vnm: 'vn',
    jp: 'jp', jpn: 'jp',
    kr: 'kr', kor: 'kr',
    cn: 'cn', chn: 'cn',
    in: 'in', ind: 'in',
    br: 'br', bra: 'br',
    ru: 'ru', rus: 'ru',
    ca: 'ca', can: 'ca',
    fr: 'fr', fra: 'fr',
    au: 'au', aus: 'au'
  };
  return isoMap[rawCode] || (rawCode.length === 2 ? rawCode : 'un');
};

// Component biểu đồ dạng Horizontal Bar Chart hiển thị Top 10 Quốc gia
export default function GeographyTerritoryChart({
  data = [],
  loading = false,
  selectedCountry = null,
  onSelectCountry,
  selectedYear = 'All'
}) {
  const {
    t
  } = useTranslation();

  // Top 10 countries sorted by article count
  const top10 = useMemo(() => {
    const sorted = [...data].sort((a, b) => (Number(b.article_count) || 0) - (Number(a.article_count) || 0));
    return sorted.slice(0, 10);
  }, [data]);

  // Max value for width scaling
  const maxVal = useMemo(() => {
    const max = Math.max(...top10.map(item => Number(item.article_count) || 0), 0);
    return max > 0 ? max : 1;
  }, [top10]);

  const gridTicks = useMemo(() => {
    if (maxVal === 1) return [0, 1];
    return [0, Math.round(maxVal * 0.25), Math.round(maxVal * 0.5), Math.round(maxVal * 0.75), maxVal];
  }, [maxVal]);

  return (
    <MuiBox component="div" sx={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column" }} className="journal-dark-card">
      {/* Header */}
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }} >
        <div>
          <MuiBox component="h3" sx={{ fontWeight: 700, marginBottom: "0" }} className="font-display text-main" style={{ fontSize: '1.1rem' }}>
            {t("zone.top10QuocGiaCoSanLuongArticleCa", "Top 10 Countries by Article Output")}
          </MuiBox>
          <MuiBox component="p" sx={{ marginBottom: "0", marginTop: "0.25rem" }} className="text-muted-custom" style={{ fontSize: '0.8rem' }}>
            {t("zone.phanBoSoLuongBaiBaoKhoaHocXuat")}
          </MuiBox>
        </div>
        <MuiBox component="span" sx={{ paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", borderRadius: "0.375rem" }}
          className="text-muted-custom"
          style={{
            fontSize: '0.75rem',
            backgroundColor: 'var(--bg-chip)',
            fontWeight: 500,
            alignSelf: 'flex-start'
          }}
        >
          {selectedYear === 'All' ? t("zone.tatCaCacNam") : `Thống kê ${selectedYear}`}
        </MuiBox>
      </MuiBox>

      {loading ? (
        <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center", flexGrow: 1 }}  style={{ minHeight: '380px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} key={i} >
              <MuiBox component="div" sx={{ borderRadius: "50%" }} className="skeleton-shimmer" style={{ width: '28px', height: '28px' }} />
              <MuiBox component="div" sx={{ borderRadius: "0.375rem" }} className="skeleton-shimmer" style={{ width: '100px', height: '18px' }} />
              <MuiBox component="div" sx={{ flexGrow: 1, borderRadius: "0.375rem" }} className="skeleton-shimmer" style={{ height: '32px' }} />
            </MuiBox>
          ))}
        </MuiBox>
      ) : top10.length === 0 ? (
        <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexGrow: 1, paddingTop: "3rem", paddingBottom: "3rem" }}
          className="text-muted-custom"
          style={{ minHeight: '380px', fontSize: '0.9rem' }}
        >
          {t("topic.khongCoDuLieu")}
        </MuiBox>
      ) : (
        <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", paddingTop: "0.5rem" }} >

          {/* Main Horizontal Bars Area */}
          <MuiBox component="div" sx={{ position: "relative", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-around" }} className="gap-2.5">

            {/* Vertical Background Gridlines */}
            <MuiBox component="div" sx={{ position: "absolute", height: "100%", display: "flex", justifyContent: "space-between", paddingInlineEnd: "0.5rem" }}

              style={{
                left: '191px',
                right: 0,
                top: 0,
                pointerEvents: 'none',
                zIndex: 0
              }}
            >
              {gridTicks.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRight: '1px dashed rgba(0, 0, 0, 0.07)',
                    height: '100%'
                  }}
                />
              ))}
            </MuiBox>

            {/* Horizontal Rows */}
            {top10.map((item, index) => {
              const val = Number(item.article_count) || 0;
              const widthPercent = maxVal > 0 ? (val / maxVal) * 100 : 0;
              const displayWidth = Math.max(widthPercent, 12);
              const flagCode = getCountryFlagCode(item);
              const isSelected = selectedCountry?.zone_id === item.zone_id;

              return (
                <MuiBox component="div" sx={getClassNameSx(`d-flex align-items-center gap-3 w-100 bar-row-container position-relative z-1 py-1 ${
                    isSelected ? 'is-selected' : ''
                  }`)}
                  key={item.zone_id || index}
                  onClick={() => onSelectCountry?.(item)}
                  className={stripMappedClassNames(`d-flex align-items-center gap-3 w-100 bar-row-container position-relative z-1 py-1 ${
                    isSelected ? 'is-selected' : ''
                  }`)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Left Column: Flag + Country Name & Code */}
                  <MuiBox component="div" sx={{ display: "flex", alignItems: "center" }}  style={{ width: '175px', flexShrink: 0, gap: '10px' }}>
                    <MuiBox component="div" sx={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }} className="flag-wrapper">
                      <Icon sx={{ boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", borderRadius: "50%" }} icon={`circle-flags:${flagCode}`} width={24} height={24}  />
                    </MuiBox>
                    <MuiBox component="div" sx={{ display: "flex", flexDirection: "column" }} className="min-w-0">
                      <MuiBox component="span" sx={{ fontWeight: 700, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                        className="text-main font-display"
                        style={{ fontSize: '0.82rem' }}
                        title={item.name}
                      >
                        {item.name || item.code}
                      </MuiBox>
                      <span className="text-muted-custom font-display text-xs" style={{ fontSize: '0.68rem' }}>
                        {item.code || item.iso_code || '—'}
                      </span>
                    </MuiBox>
                  </MuiBox>

                  {/* Right Column: Horizontal Bar */}
                  <MuiBox component="div" sx={{ flexGrow: 1, position: "relative", display: "flex", alignItems: "center", paddingInlineEnd: "0.5rem" }}  style={{ height: '34px' }}>
                    {/* Background Bar Track */}
                    <MuiBox component="div" sx={{ position: "absolute", width: "100%", height: "100%", borderRadius: "0.5rem" }}

                      style={{ backgroundColor: 'var(--bg-chip)', opacity: 0.4, zIndex: 0 }}
                    />

                    {/* The Fill Bar */}
                    <MuiBox component="div" sx={getClassNameSx(`geography-chart-bar-horizontal rounded-3 d-flex align-items-center justify-content-end px-3 position-relative ${
                        isSelected ? 'is-active' : ''
                      }`)}
                      className={stripMappedClassNames(`geography-chart-bar-horizontal rounded-3 d-flex align-items-center justify-content-end px-3 position-relative ${
                        isSelected ? 'is-active' : ''
                      }`)}
                      style={{
                        width: `${displayWidth}%`,
                        height: '100%',
                        zIndex: 1,
                        transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      {/* Value Label INSIDE the Horizontal Bar */}
                      <MuiBox component="span" sx={{ fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}
                        className="font-display bar-value-inside"
                        style={{ fontSize: '0.78rem', letterSpacing: '0.01em' }}
                      >
                        {val > 0 ? val.toLocaleString() : '0'}
                      </MuiBox>
                    </MuiBox>
                  </MuiBox>
                </MuiBox>
              );
            })}

          </MuiBox>
        </MuiBox>
      )}
    </MuiBox>
  );
}
