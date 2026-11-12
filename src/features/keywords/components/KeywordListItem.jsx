import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\keywords\components\KeywordListItem.jsx
 */
import { Badge, Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';


import MuiBox from '@mui/material/Box';


/**
 * Card hiển thị một keyword trong danh sách.
 */
export default function KeywordListItem({
  keyword,
  onViewArticles
}) {
  const {
    t
  } = useTranslation();
  const keywordId = keyword.keyword_id || keyword.id || keyword.keywordId;
  const articleCount = Number(keyword.article_count || 0);
  return <div className="keyword-card">
      <MuiBox component="div" sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }} >
        <div>
          <div className="keyword-card-label">
            Research keyword
          </div>
          <h3 className="keyword-card-title">
            {keyword.display_name}
          </h3>
        </div>
        <Icon icon="lucide:sparkles" width="18" className="keyword-card-icon" />
      </MuiBox>

      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }} >
        {articleCount > 0 && <Badge className="keyword-count-badge">
            {articleCount}{t("author.baiBao")}</Badge>}
        {(keyword.topic_name || keyword.topic) && <Badge className="keyword-topic-badge">
            {keyword.topic_name || keyword.topic}
          </Badge>}
      </MuiBox>

      <Button sx={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }} id={`keyword-view-${keywordId || keyword.display_name}`} type="button" disabled={!keywordId} onClick={() => keywordId && onViewArticles && onViewArticles(keywordId)} className="keyword-card-action">
        <span>{t("article.xemBaiBaoLienQuan")}</span>
        <Icon icon="lucide:arrow-up-right" width="16" />
      </Button>
    </div>;
}
