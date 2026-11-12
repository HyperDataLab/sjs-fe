import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import LatexText from '../../../shared/components/LatexText/LatexText';


import MuiBox from '@mui/material/Box';

const KeywordRelatedArticleList = ({
  articles,
  loading
}) => {
  const {
    t
  } = useTranslation();
  if (loading) {
    return <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
        {[...Array(3)].map((_, i) => <MuiBox component="div" sx={{ padding: "1rem", border: "1px solid #dee2e6", borderRadius: "0.375rem" }} key={i} >
            <MuiBox component="div" sx={{ marginBottom: "0.5rem" }} className="skeleton-shimmer" style={{
          width: '40%',
          height: '20px'
        }}></MuiBox>
            <MuiBox component="div" sx={{ marginBottom: "0.5rem" }} className="skeleton-shimmer" style={{
          width: '100%',
          height: '24px'
        }}></MuiBox>
            <div className="skeleton-shimmer" style={{
          width: '60%',
          height: '16px'
        }}></div>
          </MuiBox>)}
      </MuiBox>;
  }
  if (!Array.isArray(articles) || articles.length === 0) {
    return <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "1.5rem", border: "1px solid #dee2e6", borderRadius: "0.375rem" }} className="text-muted-custom">{t("keyword.khongCoBaiBaoNaoLienQuanDenCac")}</MuiBox>;
  }
  return <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
      {articles.map((article, idx) => <MuiBox component="div" sx={{ padding: "1rem", border: "1px solid #dee2e6", borderRadius: "0.375rem" }} key={article.id || idx} className="bg-card hover-shadow transition-all">
          <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }} >
            <MuiBox component="div" sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }} >
              {article.matched_keywords?.map((kw, kwIdx) => <MuiBox component="span" sx={{ display: "inline-flex", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 500, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", marginBottom: "0.5rem", alignItems: "center" }} key={kwIdx}  style={{
            fontSize: '0.7rem',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)'
          }}>
                  <Icon sx={{ marginInlineEnd: "0.25rem" }} icon="lucide:sparkles"  width="12" />
                  {kw}
                </MuiBox>)}
            </MuiBox>
            <MuiBox component="span" sx={{ fontSize: "0.875em" }} className="text-muted-custom">
              {article.publication_year || article.year || t("keyword.ganDay")}
            </MuiBox>
          </MuiBox>
          <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "0.5rem" }} className="font-display">
            <MuiBox component={Link} sx={{ textDecoration: "none" }} to={`/articles/${article.id || article.article_id}/visual`} className="text-main">
              <LatexText text={article.title} />
            </MuiBox>
          </MuiBox>
          <MuiBox component="div" sx={{ fontSize: "0.875em", display: "flex", flexWrap: "wrap", gap: "1rem" }} className="text-muted-custom">
            {article.journal_name && <span><Icon icon="lucide:book-open" width="16" sx={{ mr: 0.5 }} />{article.journal_name}</span>}
            {article.doi && <span><Icon icon="lucide:link" width="16" sx={{ mr: 0.5 }} />{article.doi}</span>}
            {article.citations != null && <span><Icon icon="lucide:quote" width="16" sx={{ mr: 0.5 }} />{article.citations} citations</span>}
          </MuiBox>
        </MuiBox>)}
    </MuiBox>;
};
export default KeywordRelatedArticleList;
