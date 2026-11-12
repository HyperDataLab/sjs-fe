import { useTranslation } from "react-i18next";
import { t } from "i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\components\ArticlesTabContent.jsx
 */
import { Card, Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import LoadingSkeleton from '../../../shared/components/LoadingSkeleton';
import LatexText from '../../../shared/components/LatexText/LatexText';


import MuiBox from '@mui/material/Box';

export default function ArticlesTabContent({
  recentArticles = [],
  loading,
  onArticleClick
}) {
  const { t: _t } = useTranslation();
  if (loading) {
    return <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
        {[1, 2].map(i => <MuiBox component="section" sx={{ padding: "1.5rem" }} key={i} className="journal-surface">
            <LoadingSkeleton sx={{ marginBottom: "0.5rem" }} width="120px" height="18px"  />
            <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="80%" height="28px"  />
            <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="200px" height="16px"  />
            <LoadingSkeleton width="100%" height="60px" />
          </MuiBox>)}
      </MuiBox>;
  }
  if (!recentArticles || recentArticles.length === 0) {
    return <section className="journal-surface journal-empty-state">{t("journal.journalNayChuaCoBaiBaoGanDay")}</section>;
  }
  return <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }} >
      {recentArticles.map((article, index) => {
      const articleId = article.article_id || article.id || article.articleId;
      const hasArticleId = articleId !== undefined && articleId !== null && String(articleId).trim() !== '';
      const handleArticleOpen = () => {
        if (hasArticleId && onArticleClick) onArticleClick(articleId);
      };
      return <Card key={articleId || `${article.title || 'article'}-${index}`} className="journal-article-card">
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }} >
              <MuiBox component="span" sx={{ fontSize: "0.875em" }} className="text-muted-custom">
                {article.publication_year || article.year || 'N/A'}
              </MuiBox>
              {article.doi && <MuiBox component="span" sx={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.875em" }} className="text-muted-custom">
                  <Icon icon="lucide:link-2" width="14" />
                  DOI: {article.doi}
                </MuiBox>}
            </MuiBox>

            <h3 className={`journal-article-title ${hasArticleId ? '' : 'text-muted-custom'}`} onClick={handleArticleOpen} role={hasArticleId ? 'button' : undefined} title={hasArticleId ? t("article.xemChiTietBaiBao") : t("journal.baiBaoNayChuaCoMaDinhDanh")}>
              <LatexText text={article.title || 'Untitled Article'} />
            </h3>

            {article.authors && <MuiBox component="div" sx={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875em" }} className="text-muted-custom">
                <Icon icon="lucide:users" width="16" style={{
            color: 'var(--text-muted)'
          }} />
                <span>{Array.isArray(article.authors) ? article.authors.map(author => author.display_name || author.name || author.author_name).filter(Boolean).join(', ') : article.authors}</span>
              </MuiBox>}

            {article.abstract && <p className="journal-article-abstract">
                <LatexText text={article.abstract} />
              </p>}

            <MuiBox component="div" sx={{ mt: "auto", display: "flex", justifyContent: "flex-end" }} >
              <Button sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.25rem", paddingBottom: "0.25rem" }} disabled={!hasArticleId} onClick={handleArticleOpen} className="journal-text-btn">{t("journal.xemChiTiet")}<Icon icon="lucide:arrow-right" width="14" />
              </Button>
            </MuiBox>
          </Card>;
    })}
    </MuiBox>;
}
