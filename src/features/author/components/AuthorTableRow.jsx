import { useTranslation } from "react-i18next";
/**
 * @file AuthorTableRow.jsx
 * @description Component dòng con của `AuthorTable`.
 */

import { useNavigate } from 'react-router-dom';
import AuthorAvatar from './AuthorAvatar';


import MuiBox from '@mui/material/Box';

export default function AuthorTableRow({
  author,
  index
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  if (!author) return null;
  const id = author.author_id ?? author.id;
  const name = author.display_name ?? author.full_name ?? author.name ?? t("typeAuthor");
  const orcid = author.orcid ?? '—';
  const institution1 = author.institution_1 ?? author.affiliation ?? author.institution ?? '—';
  const institution2 = author.institution_2 ?? author.department ?? '';
  const avatarUrl = author.url_image || author.avatar_url || '';
  const institutionText = institution2 ? `${institution1} - ${institution2}` : institution1;
  const hIndex = author.h_index ?? '—';
  const citations = author.citation_count ?? author.citations ?? 0;
  const articlesCount = author.article_count ?? author.papers ?? 0;
  const avatarColor = author.avatar_color ?? 'var(--primary)';
  const formatLocalNumber = num => {
    if (num == null || isNaN(num)) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  const handleRowClick = () => {
    if (id) navigate(`/authors/${id}`);
  };
  return <MuiBox component="tr" sx={{ verticalAlign: "middle" }} onClick={handleRowClick} className="author-table-row">
      <MuiBox component="td" sx={{ textAlign: "center" }} className="author-table-index">{index}</MuiBox>
      <td>
        <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
          <AuthorAvatar name={name} url={avatarUrl} size="sm" bgColor={avatarColor} />
          <div className="min-w-0">
            <MuiBox component="div" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="author-table-name">{name}</MuiBox>
            {orcid && orcid !== '—' && <div className="author-table-orcid">ORCID: {orcid}</div>}
          </div>
        </MuiBox>
      </td>
      <MuiBox component="td" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="author-table-cell author-table-org">{institutionText}</MuiBox>
      <td className="author-table-cell">{formatLocalNumber(articlesCount)}</td>
      <td className="author-table-cell">{formatLocalNumber(citations)}</td>
      <td className="author-table-cell author-table-hindex">{hIndex}</td>
      <td>
        <span className="author-table-link">{t("author.chiTiet")}</span>
      </td>
    </MuiBox>;
}
