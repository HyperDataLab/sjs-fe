import { useTranslation } from "react-i18next";
import KeywordChip from './KeywordChip';


import MuiBox from '@mui/material/Box';

const TrendingKeywordList = ({
  trendingKeywords,
  loading,
  onKeywordClick
}) => {
  const {
    t
  } = useTranslation();
  return <MuiBox component="div" sx={{ padding: "1.5rem", borderRadius: "0.75rem", marginBottom: "1.5rem" }} className="glass-card">
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }} >
        <MuiBox component="h4" sx={{ marginBottom: "0", fontWeight: 700 }} className="font-display text-main">🔥 Top 20 Trending Keywords</MuiBox>
      </MuiBox>
      <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "1.5rem" }} className="text-muted-custom">{t("keyword.tinhTrong30NgayGanNhat")}</MuiBox>

      {loading ? <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }} >
          {[...Array(10)].map((_, i) => <div key={i} className="skeleton-shimmer" style={{
        // eslint-disable-next-line react-hooks/purity
        width: `${Math.random() * 80 + 80}px`,
        height: '32px',
        borderRadius: '16px'
      }}></div>)}
        </MuiBox> : Array.isArray(trendingKeywords) && trendingKeywords.length > 0 ? <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap" }} >
          {trendingKeywords.map((item, idx) => <KeywordChip key={idx} keyword={item.keyword || item.name} count={item.count || item.score} isTrending={true} onClick={() => onKeywordClick && onKeywordClick(item.keyword || item.name)} />)}
        </MuiBox> : <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "1.5rem" }} className="text-muted-custom">{t("keyword.chuaCoDuLieuTrending")}</MuiBox>}

      <MuiBox component="div" sx={{ marginTop: "1.5rem", padding: "1rem", borderRadius: "0.375rem", fontSize: "0.875em" }} className="text-muted-custom" style={{
      backgroundColor: 'var(--bg-chip)',
      border: '1px solid var(--border)'
    }}>{t("keyword.clickVaoKeywordDeTheoDoiCacKey")}</MuiBox>
    </MuiBox>;
};
export default TrendingKeywordList;
