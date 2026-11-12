import { useTranslation } from "react-i18next";
/**
* File source thuộc hệ thống FE ResearchPulse.
*
* File: features\article\components\ArticleHeaderCard.jsx
*/
import { Card, Badge } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { useNavigate } from 'react-router-dom';
import LatexText from '../../../shared/components/LatexText/LatexText';


import MuiBox from '@mui/material/Box';

export default function ArticleHeaderCard({
  article
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  if (!article) return null;

  // Extract author info from normalized array
  let authorText = '';
  let mainAuthorInitials = 'A';
  let hasMultipleAuthors = false;
  let additionalCount = 0;
  const authors = Array.isArray(article.authors) ? article.authors : [];
  if (authors.length > 0) {
    const firstAuthor = authors[0];
    authorText = firstAuthor.display_name || firstAuthor.name || t("typeAuthor");
    mainAuthorInitials = authorText.charAt(0).toUpperCase();
    if (authors.length > 1) {
      hasMultipleAuthors = true;
      additionalCount = authors.length - 1;
    }
  }
  const handleJournalClick = () => {
    const journalId = article.journal_id;
    if (journalId) {
      navigate(`/journals/${journalId}`);
    }
  };
  return <Card sx={{ border: 0, padding: "1.5rem", marginBottom: "1.5rem" }} className="journal-dark-card" style={{
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)'
  }}>
      {/* Badges row */}
      <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }} >
        {article.is_open_access && <Badge className="py-1.5 px-2.5 text-xs font-semibold" style={{
        borderRadius: '6px',
        fontSize: '0.75rem',
        backgroundColor: 'rgba(47, 198, 70, 0.12)',
        color: 'var(--q1-color)',
        border: '1px solid rgba(47, 198, 70, 0.3)'
      }}>
            Open Access
          </Badge>}
        {article.publication_year && <MuiBox component="span" sx={{ borderTop: "1px solid #dee2e6", borderColor: "#dee2e6" }} className="text-muted-custom" style={{
        fontSize: '0.9rem'
      }}>{t("article.namXuatBan")}{article.publication_year}
          </MuiBox>}
      </MuiBox>

      {/* Title */}
      <MuiBox component="h1" sx={{ marginBottom: "1rem" }} className="font-display text-main" style={{
      fontSize: '2rem',
      lineHeight: '1.3',
      fontWeight: 700
    }}>
        <LatexText text={article.title} />
      </MuiBox>

      {/* Main Author Row */}
      {authorText && <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }} >
          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", borderRadius: "50%" }} className="text-xs font-bold font-display" style={{
        width: '36px',
        height: '36px',
        background: 'linear-gradient(135deg, var(--btn-dark) 0%, var(--text-muted) 100%)',
        flexShrink: 0
      }}>
            {mainAuthorInitials}
          </MuiBox>
          <div>
            <div className="text-sm text-main font-weight-semibold" style={{
          fontWeight: 600
        }}>
              {authorText}
              {hasMultipleAuthors && <MuiBox component="span" sx={{ marginInlineStart: "0.25rem" }} className="text-muted-custom font-weight-normal text-xs">{t("article.va")}{additionalCount}{t("article.tacGiaKhac")}</MuiBox>}
            </div>
          </div>
        </MuiBox>}

      {/* Journal Link */}
      {article.journal_name && <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingTop: "1rem", borderTop: "1px solid #dee2e6", borderColor: "#dee2e6" }} className="text-muted-custom" style={{
      fontSize: '0.9rem'
    }}>
          <Icon icon="lucide:book-open" style={{
        color: 'var(--primary)'
      }} width="20" />
          <span>{t("article.xuatBanTrong")}</span>
          {article.journal_id ? <span onClick={handleJournalClick} className="text-main font-weight-semibold hover:text-dark transition-colors" style={{
        cursor: 'pointer',
        fontWeight: 600,
        textDecoration: 'underline'
      }}>
              {article.journal_name}
            </span> : <span className="text-main font-weight-semibold" style={{
        fontWeight: 600
      }}>
              {article.journal_name}
            </span>}
        </MuiBox>}
    </Card>;
}
