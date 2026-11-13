import { useTranslation } from "react-i18next";
/**
 * @file AuthorLeaderboardTable.jsx
 * @description Hiển thị bảng xếp hạng các tác giả hàng đầu trong hệ thống dưới dạng bảng.
 */

import { Table } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import AuthorAvatar from './AuthorAvatar';
import AuthorRankBadge from './AuthorRankBadge';
import LoadingSkeleton from '../../../shared/components/LoadingSkeleton';
import EmptyState from '../../../shared/components/EmptyState';
import ErrorState from '../../../shared/components/ErrorState';


import MuiBox from '@mui/material/Box';

export default function AuthorLeaderboardTable({
  authors = [],
  loading = false,
  error = null,
  onRetry = null,
  limit = null
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }
  if (!loading && authors.length === 0) {
    return <EmptyState title={t("author.chuaCoDuLieuBangXepHang")} description={t("author.duLieuXepHangSeHienThiODay")} icon="lucide:trophy" />;
  }
  const displayList = limit ? authors.slice(0, limit) : authors;
  const formatLocalNumber = num => {
    if (num == null) return '0';
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  const handleAuthorClick = author => {
    const id = author.author_id ?? author.id;
    if (id) navigate(`/authors/${id}`);
  };
  return <div className="author-leaderboard-table-shell">
      <Table sx={{ margin: "0", verticalAlign: "middle" }} hover responsive className="author-leaderboard-table">
        <thead>
          <tr>
            <MuiBox component="th" sx={{ textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem" }} className="author-leaderboard-rank-col">{t("author.thuHang")}</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >{t("typeAuthor")}</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >{t("author.linhVucChinh")}</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >{t("articles")}</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >Citations</MuiBox>
          </tr>
        </thead>
        <tbody>
          {loading ? Array.from({
          length: limit || 5
        }).map((_, idx) => <tr key={idx}>
                <MuiBox component="td" sx={{ textAlign: "center" }} ><LoadingSkeleton width="30px" height="30px" borderRadius="50%" /></MuiBox>
                <td>
                  <div className="author-leaderboard-author">
                    <LoadingSkeleton width="32px" height="32px" borderRadius="50%" />
                    <LoadingSkeleton width="120px" height="14px" />
                  </div>
                </td>
                <td><LoadingSkeleton width="80px" height="18px" borderRadius="12px" /></td>
                <td><LoadingSkeleton width="40px" height="14px" /></td>
                <td><LoadingSkeleton width="50px" height="14px" /></td>
              </tr>) : displayList.filter(Boolean).map((author, idx) => {
          const id = author.author_id ?? author.id;
          const name = author.display_name ?? author.full_name ?? author.author_name ?? author.name ?? 'Unknown';
          const orcid = author.orcid ?? '';
          const field = author.subject_area ?? author.primary_subject_area ?? author.field ?? author.area ?? '—';
          const articles = author.article_count ?? author.papers ?? author.works_count ?? 0;
          const citations = author.citation_count ?? author.citations ?? author.cited_by_count ?? 0;
          const rank = author.final_rank ?? idx + 1;
          const avatarColor = author.avatar_color ?? (rank === 1 ? 'var(--primary)' : rank === 2 ? '#6366F1' : rank === 3 ? '#0EA5E9' : '#122331');
          return <tr key={id ?? idx} onClick={() => handleAuthorClick(author)} className="author-leaderboard-row">
                  <MuiBox component="td" sx={{ textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem" }} >
                    <MuiBox component="div" sx={{ display: "flex", justifyContent: "center" }} >
                      <AuthorRankBadge rank={rank} />
                    </MuiBox>
                  </MuiBox>
                  <td>
                    <div className="author-leaderboard-author">
                      <AuthorAvatar name={name} size="sm" bgColor={avatarColor} />
                      <div>
                        <div className="author-leaderboard-name">{name}</div>
                        {orcid ? <div className="author-leaderboard-orcid">{orcid}</div> : null}
                      </div>
                    </div>
                  </td>
                  <td>
                    {!field || field === '' ? '—' : <span className="author-leaderboard-field-chip">{field}</span>}
                  </td>
                  <td className="author-leaderboard-cell">{formatLocalNumber(articles)}</td>
                  <td className="author-leaderboard-cell author-leaderboard-citations">↑ {formatLocalNumber(citations)}</td>
                </tr>;
        })}
        </tbody>
      </Table>
    </div>;
}
