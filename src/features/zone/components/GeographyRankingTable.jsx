import { useTranslation } from "react-i18next";
import { useState, useMemo } from 'react';
import Icon from '../../../shared/components/Icon.jsx';


import MuiBox from '@mui/material/Box';

export default function GeographyRankingTable({
  data = [],
  loading = false,
  selectedCountry = null,
  onSelectCountry
}) {
  const {
    t
  } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const rankedData = useMemo(() => {
    return [...data].sort((a, b) => (Number(b.article_count) || 0) - (Number(a.article_count) || 0)).map((item, index) => ({
      ...item,
      rank: index + 1
    }));
  }, [data]);
  const filteredData = useMemo(() => {
    return rankedData.filter(item => item.name?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [rankedData, searchTerm]);
  return <MuiBox component="div" sx={{ padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column" }} className="journal-dark-card">
      {/* Header */}
      <MuiBox component="div" sx={{ marginBottom: "1rem" }} >
        <MuiBox component="h3" sx={{ fontWeight: 700, marginBottom: "0" }} className="font-display text-main" style={{
        fontSize: '1.1rem'
      }}>{t("zone.xepHangQuocGia")}</MuiBox>
      </MuiBox>

      {/* Search Bar */}
      <MuiBox component="div" sx={{ marginBottom: "1rem" }} className="geography-search-wrapper">
        <Icon icon="lucide:search" width="14" className="geography-search-icon" />
        <MuiBox component="input" sx={{ width: "100%", display: "block", px: "0.75rem", py: "0.375rem", fontSize: "1rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.375rem", boxShadow: "none" }} type="text" placeholder={t("zone.timQuocGia")} className="geography-search-input" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </MuiBox>

      {/* Table */}
      <MuiBox component="div" sx={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch", flexGrow: 1 }}  style={{
      overflowY: 'auto',
      maxHeight: '400px'
    }}>
        <MuiBox component="table" sx={{ width: "100%", marginBottom: "0", color: "text.primary", verticalAlign: "middle", borderColor: "divider", borderCollapse: "collapse", "& tbody tr:hover": { bgcolor: "action.hover" } }} className="geography-table" style={{
        fontSize: '0.85rem'
      }}>
          <thead style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--bg-card)',
          zIndex: 1
        }}>
            <tr>
              <MuiBox component="th" sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", fontWeight: 700, borderBottom: "1px solid #dee2e6" }} className="text-main font-display" style={{
              width: '60px'
            }}>{t("zone.hang")}</MuiBox>
              <MuiBox component="th" sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", fontWeight: 700, borderBottom: "1px solid #dee2e6" }} className="text-main font-display">{t("journal.quocGia")}</MuiBox>
              <MuiBox component="th" sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", textAlign: "right", fontWeight: 700, borderBottom: "1px solid #dee2e6" }} className="text-main font-display" style={{
              width: '80px'
            }}>Article</MuiBox>
            </tr>
          </thead>
          <tbody>
            {loading ? [1, 2, 3, 4, 5, 6].map(i => <tr key={i}>
                  <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} ><div className="skeleton-shimmer" style={{
                width: '20px',
                height: '16px'
              }} /></MuiBox>
                  <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} ><div className="skeleton-shimmer" style={{
                width: '120px',
                height: '16px'
              }} /></MuiBox>
                  <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", textAlign: "right" }} ><MuiBox component="div" sx={{ ml: "auto" }} className="skeleton-shimmer" style={{
                width: '40px',
                height: '16px'
              }} /></MuiBox>
                </tr>) : filteredData.length === 0 ? <tr>
                <MuiBox component="td" sx={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "1.5rem" }} colSpan="3" className="text-muted-custom">{t("zone.khongTimThayQuocGiaPhuHop")}</MuiBox>
              </tr> : filteredData.map(item => <tr key={item.zone_id} onClick={() => onSelectCountry?.(item)} className={`geography-ranking-row ${selectedCountry?.zone_id === item.zone_id ? 'is-active' : ''}`}>
                  <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", fontWeight: 700 }} className="text-main font-display">
                    {item.rank}
                  </MuiBox>
                  <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", fontWeight: 600 }} className="text-main font-display">
                    {item.name || '—'}
                  </MuiBox>
                  <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", textAlign: "right" }} className="text-main font-display">
                    {Number(item.article_count || 0).toLocaleString()}
                  </MuiBox>
                </tr>)}
          </tbody>
        </MuiBox>
      </MuiBox>
    </MuiBox>;
}
