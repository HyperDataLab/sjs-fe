import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\components\ArticleStatsCards.jsx
 */
import { Row, Col, Card } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';


import MuiBox from '@mui/material/Box';

export default function ArticleStatsCards({
  stats,
  isLoading
}) {
  const {
    t
  } = useTranslation();
  const formatNumber = num => {
    return new Intl.NumberFormat().format(num);
  };
  const statItems = [{
    label: t("article.tongBaiBao"),
    value: stats?.totalArticles || 0,
    icon: 'lucide:file-text'
  }, {
    label: 'Open Access',
    value: stats?.openAccessCount || 0,
    icon: 'lucide:unlock'
  }, {
    label: t("article.tongTacGia"),
    value: stats?.authorsCount || 0,
    icon: 'lucide:users'
  }, {
    label: t("typeArea"),
    value: stats?.topicsCount || 0,
    icon: 'lucide:layers'
  }];
  if (isLoading) {
    return <Row sx={{ gap: "1rem", marginBottom: "1.5rem" }} >
        {[1, 2, 3, 4].map(i => <Col key={i} xs={12} sm={6} md={3}>
            <Card className="article-stats-card" style={{
          height: '100px'
        }}>
              <MuiBox component="div" sx={{ position: "absolute", width: "100%", height: "100%" }} className="skeleton-shimmer" />
              <Card.Body sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                <div>
                  <MuiBox component="div" sx={{ borderRadius: "0.375rem", marginBottom: "0.5rem" }} className="skeleton-shimmer" style={{
                width: '80px',
                height: '14px'
              }} />
                  <MuiBox component="div" sx={{ borderRadius: "0.375rem" }} className="skeleton-shimmer" style={{
                width: '120px',
                height: '24px'
              }} />
                </div>
                <MuiBox component="div" sx={{ borderRadius: "50%" }} className="skeleton-shimmer" style={{
              width: '40px',
              height: '40px'
            }} />
              </Card.Body>
            </Card>
          </Col>)}
      </Row>;
  }
  return <Row sx={{ gap: "1rem", marginBottom: "1.5rem" }} >
      {statItems.map((item, index) => <Col key={index} xs={12} sm={6} md={3}>
          <Card className="article-stats-card">
            <Card.Body sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem" }} >
              <div>
                <MuiBox component="div" sx={{ marginBottom: "0.25rem" }} className="text-muted-custom font-weight-bold" style={{
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
                  {item.label}
                </MuiBox>
                <MuiBox component="h3" sx={{ marginBottom: "0" }} className="text-main font-display font-weight-bold" style={{
              fontSize: '1.75rem'
            }}>
                  {formatNumber(item.value)}
                </MuiBox>
              </div>
              <div className="article-stats-icon">
                <Icon icon={item.icon} width="22" height="22" />
              </div>
            </Card.Body>
          </Card>
        </Col>)}
    </Row>;
}
