import { useTranslation } from "react-i18next";
import { t } from "i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\components\ArticleTableRow.jsx
 */
import { Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { useNavigate } from 'react-router-dom';
import LatexText from '../../../shared/components/LatexText/LatexText';


import MuiBox from '@mui/material/Box';

export default function ArticleTableRow({
  article,
  index,
  onDetailClick
}) {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();

  // Helper to assign colors to topics
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
  const topicClassName = getTopicClassName(article.primary_topic);

  // Copy DOI link to clipboard
  const handleCopyDoi = (e, doi) => {
    e.stopPropagation();
    if (!doi) return;
    navigator.clipboard.writeText(doi);
    alert(t("article.daSaoChepMaDoiVaoBoNhoTam") + doi);
  };
  const handleJournalClick = (e, journalId) => {
    e.stopPropagation();
    if (journalId) {
      navigate(`/journals/${journalId}`);
    }
  };
  return <MuiBox component="tr" sx={{ verticalAlign: "middle" }} onClick={() => onDetailClick(article.article_id)} style={{
    cursor: 'pointer',
    borderBottom: '1px solid var(--border)',
    transition: 'all 0.15s'
  }} className="article-table-row">
      {/* Index */}
      <MuiBox component="td" sx={{ paddingInlineStart: "1rem" }} className="text-muted-custom font-display" style={{
      width: '40px',
      fontSize: '0.8rem'
    }}>
        {index + 1}
      </MuiBox>

      {/* Article Title */}
      <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} style={{
      maxWidth: '400px'
    }} >
        <div className="text-main font-weight-semibold hover:text-primary transition-colors duration-150 text-sm" style={{
        lineHeight: '1.4',
        fontWeight: 600,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
      }}>
          <LatexText text={article.title} />
        </div>
        {article.abstract && <MuiBox component="div" sx={{ marginTop: "0.25rem" }} className="text-muted-custom text-xs" style={{
        fontWeight: 400,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical'
      }}>
            <LatexText text={article.abstract} />
          </MuiBox>}
      </MuiBox>

      {/* Journal Name */}
      <td style={{
      maxWidth: '180px'
    }}>
        {article.journal_id || article.journal?.journal_id ? <MuiBox component="div" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} onClick={e => handleJournalClick(e, article.journal_id || article.journal?.journal_id)} className="text-main hover:text-primary text-sm" style={{
        textDecoration: 'none',
        cursor: 'pointer',
        fontWeight: 500
      }} title={article.journal_name || article.journal?.display_name}>
            {article.journal_name || article.journal?.display_name || t("article.chuaCoThongTinJournal")}
          </MuiBox> : <MuiBox component="span" sx={{ color: "text.secondary" }} className="text-xs">{t("article.chuaCoThongTinJournal")}</MuiBox>}
      </td>

      {/* Publication Year */}
      <MuiBox component="td" sx={{ textAlign: "center" }} className="font-display" style={{
      width: '80px',
      fontSize: '0.85rem',
      color: 'var(--text-muted)'
    }}>
        {article.publication_year}
      </MuiBox>

      {/* DOI */}
      <td style={{
      maxWidth: '160px'
    }}>
        {article.doi ? <MuiBox component="div" sx={{ display: "flex", alignItems: "center" }} className="gap-1.5">
            <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-muted-custom text-xs font-display" style={{
          fontSize: '0.75rem'
        }}>
              {article.doi}
            </MuiBox>
            <Button sx={{ padding: "0", display: "flex", alignItems: "center" }} variant="link" className="text-muted-custom hover:text-dark" onClick={e => handleCopyDoi(e, article.doi)} title="Copy DOI">
              <Icon icon="lucide:copy" width="12" />
            </Button>
          </MuiBox> : <MuiBox component="span" sx={{ color: "text.secondary" }} className="text-xs">—</MuiBox>}
      </td>

      {/* Topic Badge */}
      <td style={{
      width: '130px'
    }}>
        <span className={`article-topic-badge ${topicClassName}`}>
          {article.primary_topic || t("article.chuaPhanLoai")}
        </span>
      </td>

      {/* Open Access */}
      <MuiBox component="td" sx={{ textAlign: "center" }}  style={{
      width: '80px'
    }}>
        {article.is_open_access ? <span className="article-oa-badge">
            OA
          </span> : <span className="text-muted-custom text-xs">—</span>}
      </MuiBox>

      {/* Actions */}
      <MuiBox component="td" sx={{ textAlign: "right", paddingInlineEnd: "1rem" }}  style={{
      width: '80px'
    }}>
        <MuiBox component="span" sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} className="article-action-link gap-0.5">{t("article.chiTiet1")}<Icon icon="lucide:arrow-right" width="12" />
        </MuiBox>
      </MuiBox>
    </MuiBox>;
}
