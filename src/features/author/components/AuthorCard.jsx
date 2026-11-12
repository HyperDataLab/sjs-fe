import { useTranslation } from "react-i18next";
/**
 * @file AuthorCard.jsx
 * @description Component thẻ hiển thị thông tin tóm tắt của một tác giả.
 */

import { useNavigate } from 'react-router-dom';
import { EntityCard } from '../../../shared/components/Card';
import AuthorAvatar from './AuthorAvatar';


import MuiBox from '@mui/material/Box';

export default function AuthorCard({
  author
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  if (!author) return null;
  const id = author.author_id ?? author.id;
  const name = author.display_name ?? author.full_name ?? author.name ?? t("typeAuthor");
  const institution1 = author.institution_1 ?? author.affiliation ?? author.institution ?? '—';
  const institution2 = author.institution_2 ?? author.department ?? '';
  const hIndex = author.h_index ?? author.hindex ?? 0;
  const citations = author.citation_count ?? author.citations ?? 0;
  const articlesCount = author.article_count ?? author.papers ?? author.article_count ?? 0;
  const tags = Array.isArray(author.subject_areas) ? author.subject_areas : author.subject_area ? [author.subject_area] : [];
  const avatarUrl = author.url_image || author.avatar_url || '';
  const avatarColor = author.avatar_color ?? '#FF7A33';
  const formatLocalNumber = num => {
    if (num == null) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  const handleCardClick = () => {
    if (id) navigate(`/authors/${id}`);
  };
  return <EntityCard sx={{ height: "100%" }} onClick={handleCardClick} className="author-card-animated" media={<AuthorAvatar sx={{ flexShrink: 0 }} name={name} url={avatarUrl} size="md" bgColor={avatarColor}  />} title={name}        subtitle={<>
          <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", display: "block" }} >{institution1}</MuiBox>
          {institution2 && <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", marginTop: "0.25rem", display: "block" }}  style={{
      fontSize: '0.85em',
    }}>{institution2}</MuiBox>}
        </>} meta={<MuiBox component="div" sx={{ marginTop: "1rem" }} className="author-card-metrics">
          <div>
            <div className="author-metric-label">H-index</div>
            <div className="author-metric-value">{hIndex}</div>
          </div>
          <div>
            <div className="author-metric-label">{t("author.trichDan")}</div>
            <div className="author-metric-value">{formatLocalNumber(citations)}</div>
          </div>
          <div>
            <div className="author-metric-label">{t("articles")}</div>
            <div className="author-metric-value">{formatLocalNumber(articlesCount)}</div>
          </div>
        </MuiBox>} footer={<MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", paddingTop: "0.5rem" }} className="gap-1.5">
          {tags.length === 0 ? <span className="author-tag-empty">{t("author.chuaCapNhatLinhVuc")}</span> : tags.map((tag, idx) => <span key={idx} className="author-tag" onClick={e => {
      e.stopPropagation();
      navigate(`/catalog?search=${encodeURIComponent(tag)}`);
    }}>
                {tag}
              </span>)}
        </MuiBox>} />;
}
