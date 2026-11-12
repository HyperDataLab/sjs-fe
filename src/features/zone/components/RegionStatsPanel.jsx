import { useTranslation } from "react-i18next";
import { Table } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';


import MuiBox from '@mui/material/Box';

export default function RegionStatsPanel({
  regions = [],
  selectedCountry = null,
  loading = false,
  error = null,
  onRetry
}) {
  const {
    t
  } = useTranslation();
  if (!selectedCountry) {
    return <EmptyState icon="lucide:map" title={t("zone.chuaChonQuocGia")} description={t("zone.chonMotQuocGiaTuBangBenTraiDeX")} style={{
      height: '100%',
      minHeight: '420px'
    }} />;
  }
  if (error) {
    return <ErrorState message={error} onRetry={onRetry} style={{
      height: '100%',
      minHeight: '420px'
    }} />;
  }
  return <MuiBox component="div" sx={{ padding: "1.5rem", display: "flex", flexDirection: "column", height: "100%" }} className="journal-dark-card" style={{
    minHeight: '420px'
  }}>
      {/* Panel Header */}
      <MuiBox component="div" sx={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #dee2e6", borderColor: "#dee2e6" }} >
        <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }} >
          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}  style={{
          width: '24px',
          height: '24px',
          borderRadius: '6px',
          background: 'var(--btn-dark)',
          fontSize: '0.75rem',
          fontWeight: 700
        }}>
            {selectedCountry.code || selectedCountry.iso_code || '??'}
          </MuiBox>
          <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "0" }} className="font-display text-main" style={{
          fontSize: '1.2rem'
        }}>{t("zone.khuVucTrong")}{selectedCountry.name}
          </MuiBox>
        </MuiBox>
        <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom text-xs" style={{
        fontSize: '0.75rem'
      }}>{t("zone.sanLuongXuatBanKhoaHocChiTietT")}</MuiBox>
      </MuiBox>

      {/* Loading Skeleton */}
      {loading ? <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }} className="gap-2.5">
          <div className="skeleton-shimmer" style={{
        width: '100%',
        height: '36px',
        borderRadius: '6px'
      }} />
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="skeleton-shimmer" style={{
        width: '100%',
        height: '48px',
        borderRadius: '6px'
      }} />)}
        </MuiBox> : regions.length === 0 ? <EmptyState sx={{ flexGrow: 1, border: 0, boxShadow: "none" }} icon="lucide:map-pin" title={t("zone.khongCoVungCon")} description={`Không tìm thấy dữ liệu phân vùng nội bộ nào cho ${selectedCountry.name} trong hệ thống.`}  style={{
      minHeight: '200px'
    }} /> : <MuiBox component="div" sx={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch", flexGrow: 1 }}  style={{
      overflowY: 'auto',
      maxHeight: '350px'
    }}>
          <Table sx={{ verticalAlign: "middle", marginBottom: "0", textAlign: "left" }} hover  style={{
        fontSize: '0.82rem'
      }}>
            <thead style={{
          backgroundColor: 'var(--bg-chip)',
          borderBottom: '1px solid var(--border)',
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}>
              <tr>
                <MuiBox component="th" sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", textTransform: "uppercase" }} className="text-muted-custom font-semibold text-xs" style={{
              width: '50px'
            }}>#</MuiBox>
                <MuiBox component="th" sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", textTransform: "uppercase" }} className="text-muted-custom font-semibold text-xs">{t("zone.tenRegioncity")}</MuiBox>
                <MuiBox component="th" sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", textTransform: "uppercase" }} className="text-muted-custom font-semibold text-xs" style={{
              width: '80px'
            }}>{t("zone.ma")}</MuiBox>
                <MuiBox component="th" sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", paddingInlineEnd: "1rem", textAlign: "right", textTransform: "uppercase" }} className="text-muted-custom font-semibold text-xs" style={{
              width: '100px'
            }}>{t("articles")}</MuiBox>
              </tr>
            </thead>
            <tbody>
              {regions.map((region, index) => <tr key={region.zone_id || region.code} className="transition-all duration-150">
                  <MuiBox component="td" sx={{ paddingInlineStart: "1rem", fontFamily: "monospace" }} className="text-muted-custom" style={{
              fontSize: '0.75rem'
            }}>
                    {index + 1}
                  </MuiBox>
                  <MuiBox component="td" sx={{ fontWeight: 500 }} className="py-2.5 text-main font-display">
                    {region.name || '—'}
                  </MuiBox>
                  <MuiBox component="td" sx={{ fontFamily: "monospace" }} className="text-muted-custom">
                    {region.code || '—'}
                  </MuiBox>
                  <MuiBox component="td" sx={{ paddingInlineEnd: "1rem", textAlign: "right", fontWeight: 700, fontFamily: "monospace" }} className="text-main">
                    {Number(region.article_count || 0).toLocaleString()}
                  </MuiBox>
                </tr>)}
            </tbody>
          </Table>
        </MuiBox>}
    </MuiBox>;
}
