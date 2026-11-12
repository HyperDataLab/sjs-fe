import { useTranslation } from "react-i18next";
/**
* File source thuộc hệ thống FE ResearchPulse.
*
* File: features\article\components\AuthorsCard.jsx
*/
import { Card } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { useNavigate } from 'react-router-dom';
import { getInitials, normalizeAuthors } from '../utils/articleFormatters';


import MuiBox from '@mui/material/Box';

export default function AuthorsCard({
  authors
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const parsedAuthors = normalizeAuthors(authors);
  const handleAuthorClick = author => {
    if (author.author_id) {
      navigate(`/authors/${author.author_id}`);
      return;
    }
    navigate(`/catalog?search=${encodeURIComponent(author.display_name)}`);
  };
  return <Card sx={{ border: 0, padding: "1.5rem", marginBottom: "1.5rem" }} className="journal-dark-card" style={{
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)'
  }}>
      <MuiBox component="h5" sx={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid #dee2e6", borderColor: "#dee2e6", paddingBottom: "0.5rem" }} className="font-display font-weight-bold text-main">
        <Icon icon="lucide:users" style={{
        color: 'var(--primary)'
      }} width="20" />{t("article.nhomTacGiaAuthors")}</MuiBox>

      {parsedAuthors.length === 0 ? <span className="text-muted-custom text-sm">{t("article.chuaCapNhatThongTinTacGia")}</span> : <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
          {parsedAuthors.map((author, index) => <MuiBox component="div" sx={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "0.5rem", borderRadius: "0.5rem" }} key={author.author_id || `${author.display_name}-${index}`} className="hover:bg-light transition-all" style={{
        transition: 'all 0.2s'
      }}>
              <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", borderRadius: "50%" }} className="text-xs font-bold font-display" style={{
          width: '36px',
          height: '36px',
          background: 'linear-gradient(135deg, var(--btn-dark) 0%, var(--primary) 100%)',
          flexShrink: 0
        }}>
                {getInitials(author.display_name)}
              </MuiBox>

              <MuiBox component="div" sx={{ flexGrow: 1 }} >
                <div onClick={() => handleAuthorClick(author)} className="text-sm text-main font-weight-semibold hover:text-primary transition-colors" style={{
            cursor: 'pointer',
            fontWeight: 700,
            textDecoration: 'none'
          }}>
                  {author.display_name}
                </div>
                {author.last_known_institution && <MuiBox component="div" sx={{ marginTop: "0.25rem" }} className="text-muted-custom text-xs" style={{
            fontSize: '0.75rem'
          }}>
                    <Icon sx={{ marginInlineEnd: "0.25rem", opacity: 0.75 }} icon="lucide:building" width="12"  />
                    {author.last_known_institution}
                  </MuiBox>}
                {author.works_count !== null && author.works_count !== undefined && <MuiBox component="div" sx={{ marginTop: "0.25rem" }} className="text-muted-custom text-xs" style={{
            fontSize: '0.72rem'
          }}>
                    <Icon sx={{ marginInlineEnd: "0.25rem", opacity: 0.75 }} icon="lucide:file-text" width="12"  />
                    {Number(author.works_count).toLocaleString('vi-VN')}{t("article.congTrinh")}</MuiBox>}
              </MuiBox>
            </MuiBox>)}
        </MuiBox>}
    </Card>;
}
