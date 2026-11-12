import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\components\ArticleTable.jsx
 */
import { Table, Card, Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import ArticleTableRow from './ArticleTableRow';
import LatexText from '../../../shared/components/LatexText/LatexText';


import MuiBox from '@mui/material/Box';

export default function ArticleTable({
  articles,
  isLoading,
  onDetailClick,
  onClearFilters
}) {
  const {
    t
  } = useTranslation();
  // Renders a loader with multiple shimmer rows
  const renderSkeletons = () => <tbody>
      {[1, 2, 3, 4, 5].map(i => <tr key={i} style={{
      borderBottom: '1px solid var(--border)'
    }}>
          <MuiBox component="td" sx={{ paddingInlineStart: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }}  style={{
        width: '40px'
      }}>
            <MuiBox component="div" sx={{ borderRadius: "0.375rem" }} className="skeleton-shimmer" style={{
          width: '15px',
          height: '14px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >
            <MuiBox component="div" sx={{ borderRadius: "0.375rem", marginBottom: "0.5rem" }} className="skeleton-shimmer" style={{
          width: '80%',
          height: '18px'
        }} />
            <MuiBox component="div" sx={{ borderRadius: "0.375rem" }} className="skeleton-shimmer" style={{
          width: '45%',
          height: '12px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >
            <MuiBox component="div" sx={{ borderRadius: "0.375rem" }} className="skeleton-shimmer" style={{
          width: '100px',
          height: '14px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", textAlign: "center" }} >
            <MuiBox component="div" sx={{ borderRadius: "0.375rem", mx: "auto" }} className="skeleton-shimmer" style={{
          width: '40px',
          height: '14px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >
            <MuiBox component="div" sx={{ borderRadius: "0.375rem" }} className="skeleton-shimmer" style={{
          width: '120px',
          height: '12px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >
            <MuiBox component="div" sx={{ borderRadius: "0.375rem" }} className="skeleton-shimmer" style={{
          width: '80px',
          height: '20px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", textAlign: "center" }} >
            <MuiBox component="div" sx={{ borderRadius: "0.375rem", mx: "auto" }} className="skeleton-shimmer" style={{
          width: '30px',
          height: '20px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingInlineEnd: "1rem", textAlign: "right", paddingTop: "1rem", paddingBottom: "1rem" }} >
            <MuiBox component="div" sx={{ borderRadius: "0.375rem", ml: "auto" }} className="skeleton-shimmer" style={{
          width: '50px',
          height: '16px'
        }} />
          </MuiBox>
        </tr>)}
    </tbody>;

  // Helper for topic colors
  const getTopicClassName = topic => {
    if (!topic) return '';
    const name = String(topic).toLowerCase();
    if (name.includes('machine learning') || name.includes('ml')) {
      return 'article-topic-badge--ml';
    }
    if (name.includes('computer science') || name.includes('cs')) {
      return 'article-topic-badge--cs';
    }
    if (name.includes('medicine') || name.includes('bio')) {
      return 'article-topic-badge--medicine';
    }
    if (name.includes('physic')) {
      return 'article-topic-badge--physics';
    }
    return 'article-topic-badge--other';
  };

  // If loading and there are no items
  if (isLoading && articles.length === 0) {
    return <MuiBox component="div" sx={{ width: "100%" }} className="article-table-card">
        <Table sx={{ margin: "0", border: 0 }} responsive hover className="article-table">
          <thead>
            <tr>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }}  style={{
              width: '40px'
            }}>#</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >{t("article.tenBaiBao")}</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >JOURNAL</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "center" }} >{t("article.nam1")}</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >DOI</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >TOPIC</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "center" }} >OA</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "right" }} >{t("article.chiTiet")}</MuiBox>
            </tr>
          </thead>
          {renderSkeletons()}
        </Table>
      </MuiBox>;
  }

  // If search matches nothing
  if (articles.length === 0) {
    return <MuiBox component="div" sx={{ textAlign: "center", padding: "3rem", borderRadius: "0.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}  style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border)',
      minHeight: '320px'
    }}>
        <MuiBox component="div" sx={{ marginBottom: "1rem" }} className="article-empty-icon">
          <Icon icon="lucide:search-code" width="30" height="30" />
        </MuiBox>
        <MuiBox component="h5" sx={{ marginBottom: "0.5rem" }} className="text-main font-weight-bold font-display">{t("article.khongTimThayBaiBaoPhuHop")}</MuiBox>
        <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="text-muted-custom text-sm max-w-md">{t("article.hayThuThayDoiTuKhoaHoacXoaCacB")}</MuiBox>
        {onClearFilters && <Button sx={{ display: "flex", alignItems: "center", paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", borderRadius: "50rem" }} variant="outline-primary" onClick={onClearFilters} className="gap-1.5 text-xs font-semibold">
            <Icon icon="lucide:rotate-ccw" width="14" />
            <span>{t("article.xoaBoLoc")}</span>
          </Button>}
      </MuiBox>;
  }
  return <>
      {/* 1. TABLE LAYOUT (Desktop & Tablet) */}
      <MuiBox component="div" sx={{ width: "100%", display: "none", "@media (min-width:768px)": { display: "block" } }} className="article-table-card">
        <Table sx={{ margin: "0", border: 0 }} responsive hover className="article-table">
          <thead>
            <tr>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }}  style={{
              width: '40px'
            }}>#</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >{t("article.tenBaiBao")}</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >JOURNAL</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "center" }} >{t("article.nam1")}</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >DOI</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }} >TOPIC</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "center" }} >OA</MuiBox>
              <MuiBox component="th" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "right" }} >{t("article.chiTiet")}</MuiBox>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => <ArticleTableRow key={article.article_id} article={article} index={index} onDetailClick={onDetailClick} />)}
          </tbody>
        </Table>
      </MuiBox>

      {/* 2. CARD LAYOUT (Mobile) */}
      <MuiBox component="div" sx={{ display: "block", "@media (min-width:768px)": { display: "none" } }} >
        <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
          {articles.map((article, index) => {
          const topicClassName = getTopicClassName(article.primary_topic);
          return <Card key={article.article_id} onClick={() => onDetailClick(article.article_id)} className="article-mobile-card">
                <Card.Body sx={{ padding: "1rem" }} >
                  <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }} >
                    <span className="text-muted-custom text-xs font-display">#{index + 1}</span>
                    <MuiBox component="div" sx={{ display: "flex", alignItems: "center" }} className="gap-1.5">
                      <span className={`article-topic-badge ${topicClassName}`}>
                        {article.primary_topic || t("article.chuaPhanLoai")}
                      </span>
                      {article.is_open_access && <span className="article-oa-badge">
                          OA
                        </span>}
                    </MuiBox>
                  </MuiBox>

                  <MuiBox component="h6" sx={{ marginBottom: "0.5rem" }} className="text-main font-weight-semibold" style={{
                lineHeight: '1.4',
                fontSize: '0.9rem'
              }}>
                    <LatexText text={article.title} />
                  </MuiBox>

                  {article.abstract && <MuiBox component="p" sx={{ marginBottom: "1rem" }} className="text-muted-custom text-xs text-truncate-2" style={{
                fontSize: '0.75rem',
                lineHeight: '1.4'
              }}>
                      <LatexText text={article.abstract} />
                    </MuiBox>}

                  <MuiBox component="div" sx={{ paddingTop: "0.5rem", borderTop: "1px solid #dee2e6", borderColor: "#dee2e6", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }} >
                    <div>
                      {article.journal && <MuiBox component="div" sx={{ color: "primary.main" }} className="text-xs font-weight-semibold" style={{
                    fontSize: '0.75rem'
                  }}>
                          {article.journal.display_name}
                        </MuiBox>}
                      <div className="text-muted-custom text-xs font-display mt-0.5" style={{
                    fontSize: '0.7rem'
                  }}>{t("article.nam2")}{article.publication_year} {article.doi ? `· DOI: ${article.doi}` : ''}
                      </div>
                    </div>
                    <MuiBox component="span" sx={{ display: "flex", alignItems: "center" }} className="article-action-link gap-0.5">{t("article.chiTiet1")}<Icon icon="lucide:arrow-right" width="12" />
                    </MuiBox>
                  </MuiBox>
                </Card.Body>
              </Card>;
        })}
        </MuiBox>
      </MuiBox>
    </>;
}
