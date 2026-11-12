import { useTranslation } from "react-i18next";
/**
* Card hiển thị keyword và topic trong trang chi tiết bài báo.
* - Keywords: click được, điều hướng tới /keywords/:id/articles hoặc /keywords?keyword=...
* - Topics: chỉ hiển thị, KHÔNG click vì route /topics/:id/articles chưa có trong AppRoutes.
*
* File: features/article/components/KeywordTopicCard.jsx
*/
import { Card, Badge } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { useNavigate } from 'react-router-dom';
import { normalizeKeywords } from '../utils/articleFormatters';


import MuiBox from '@mui/material/Box';

export default function KeywordTopicCard({
  primaryTopic,
  keywords,
  topics = []
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const keywordList = normalizeKeywords(keywords);
  const topicList = Array.isArray(topics) ? topics.filter(topic => topic?.display_name) : [];
  const fallbackTopic = primaryTopic ? [{
    topic_id: null,
    display_name: primaryTopic,
    is_primary: true
  }] : [];

  // Dùng topics từ BE nếu có, nếu không thì fallback về primaryTopic string
  const displayTopics = topicList.length > 0 ? topicList : fallbackTopic;

  /**
   * Điều hướng khi bấm vào keyword trong trang chi tiết bài báo.
   *
   * - Nếu BE trả `keyword_id`, đi thẳng tới danh sách bài báo theo keyword.
   * - Nếu chỉ có text keyword, dùng trang keyword list và truyền query search.
   */
  const handleKeywordClick = keyword => {
    if (keyword.keyword_id) {
      navigate(`/keywords/${keyword.keyword_id}/articles`);
      return;
    }
    navigate(`/keywords?keyword=${encodeURIComponent(keyword.display_name)}`);
  };
  const hasKeywords = keywordList.length > 0;
  const hasTopics = displayTopics.length > 0;
  const hasContent = hasKeywords || hasTopics;
  return <Card sx={{ border: 0, padding: "1.5rem", marginBottom: "1.5rem" }} className="journal-dark-card" style={{
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)'
  }}>
      <MuiBox component="h5" sx={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }} className="font-display font-weight-bold text-main">
        <Icon icon="lucide:tags" style={{
        color: 'var(--primary)'
      }} width="20" />{t("article.tuKhoaChuDeKeywordsTopics")}</MuiBox>

      {!hasContent ? <span className="text-muted-custom text-sm">{t("article.chuaCoThongTinTuKhoaHoacChuDe")}</span> : <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >

          {/* ── Keywords ── click được, route /keywords/:id/articles */}
          <section>
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }} >
              <Icon icon="lucide:key-round" width="14" style={{
            color: 'var(--primary)'
          }} />
              <MuiBox component="span" sx={{ textTransform: "uppercase", fontWeight: 600 }}  style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.5px'
          }}>
                Keywords
              </MuiBox>
            </MuiBox>

            {hasKeywords ? <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }} >
                {keywordList.map(keyword => <MuiBox component="span" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", borderRadius: "50rem", fontWeight: 600 }} key={`keyword-${keyword.keyword_id || keyword.display_name}`} onClick={() => handleKeywordClick(keyword)} className="font-display text-main" title={t("article.xemCacBaiBaoTheoKeywordNay")} style={{
            cursor: 'pointer',
            backgroundColor: 'rgba(0,0,0,0.07)',
            border: '1px solid rgba(0,0,0,0.10)'
          }}>
                    {keyword.display_name}
                  </MuiBox>)}
              </MuiBox> : <MuiBox component="div" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", borderRadius: "0.5rem" }} className="text-xs" style={{
          color: 'var(--text-muted)',
          backgroundColor: 'rgba(0,0,0,0.03)',
          border: '1px dashed var(--border)'
        }}>{t("article.baiBaoNayChuaCoKeywordTuDuLieu")}</MuiBox>}
          </section>

          {/* ── Topics ── chỉ hiển thị, KHÔNG click (route chưa hoàn thiện) */}
          {hasTopics && <section>
              <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }} >
              <Icon icon="lucide:network" width="14" style={{
            color: 'var(--primary)'
          }} />
              <MuiBox component="span" sx={{ textTransform: "uppercase", fontWeight: 600 }}  style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.5px'
          }}>{t("article.topicsDangPhatTrien")}</MuiBox>
            </MuiBox>

              <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }} >
                {displayTopics.map(topic => <MuiBox component="span" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", borderRadius: "50rem", fontWeight: 600 }} key={`topic-${topic.topic_id || topic.display_name}`} className="font-display text-main" title={t("article.topicRouteChuaHoanThien")} style={{
            cursor: 'pointer',
            backgroundColor: 'rgba(0,0,0,0.07)',
            border: '1px solid rgba(0,0,0,0.10)'
          }}>
                    {topic.is_primary && <Icon icon="lucide:star" width="12" />}
                    {topic.display_name}
                  </MuiBox>)}
              </MuiBox>
            </section>}

        </MuiBox>}
    </Card>;
}
