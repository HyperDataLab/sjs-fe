import { useTranslation } from "react-i18next";
import KeywordChip from './KeywordChip';
import KeywordRelatedArticleList from './KeywordRelatedArticleList';


import MuiBox from '@mui/material/Box';

const KeywordWatchList = ({
  watchedKeywords,
  articles,
  loading,
  onManageClick
}) => {
  const {
    t
  } = useTranslation();
  return <MuiBox component="div" sx={{ marginTop: "0.5rem" }} >
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }} >
        <MuiBox component="h4" sx={{ marginBottom: "0", fontWeight: 700 }} className="font-display text-main">
          <MuiBox component="span" sx={{ color: "warning.main", marginInlineEnd: "0.5rem" }} >★</MuiBox>{t("keyword.keywordsDangTheoDoi")}{Array.isArray(watchedKeywords) ? watchedKeywords.length : 0})
        </MuiBox>
      </MuiBox>

      {loading ? <MuiBox component="div" sx={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem" }} >
           {[...Array(3)].map((_, i) => <div key={i} className="skeleton-shimmer" style={{
        width: '100px',
        height: '32px',
        borderRadius: '16px'
      }}></div>)}
        </MuiBox> : Array.isArray(watchedKeywords) && watchedKeywords.length > 0 ? <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
          {watchedKeywords.map((kw, idx) => {
        const label = typeof kw === 'string' ? kw : kw.keyword || kw.name;
        return <KeywordChip key={idx} keyword={label} icon={<MuiBox component="span" sx={{ marginInlineStart: "0.25rem" }} >★</MuiBox>} />;
      })}
        </MuiBox> : <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem", marginBottom: "1.5rem" }} className="text-muted-custom">{t("keyword.banChuaTheoDoiKeywordNaoTrongP")}</MuiBox>}

      <MuiBox component="div" sx={{ marginTop: "1.5rem" }} >
        <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "1rem" }} className="text-muted-custom">{t("keyword.baiBaoMoiNhatTheoKeywordDangWa")}</MuiBox>
        <KeywordRelatedArticleList articles={articles} loading={loading} />
      </MuiBox>
    </MuiBox>;
};
export default KeywordWatchList;
