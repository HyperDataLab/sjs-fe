import { useTranslation } from "react-i18next";
/**
* File source thuộc hệ thống FE ResearchPulse.
*
* File: features\article\components\ArticleStatisticsCard.jsx
*/
import { Card, Row, Col } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';


import MuiBox from '@mui/material/Box';

export default function ArticleStatisticsCard({
  article
}) {
  const {
    t
  } = useTranslation();
  if (!article) return null;
  const safeValue = value => value !== undefined && value !== null && String(value).trim() !== '' ? value : '—';
  const citations = article.citations ?? article.citations_count ?? '—';
  const publicationYear = safeValue(article.publication_year);
  const volume = safeValue(article.volume_number || article.volume);
  const issue = safeValue(article.issue_number || article.issue);
  const pages = safeValue(article.pages);
  const doi = safeValue(article.doi);
  const metricCards = [{
    label: t("admin.namXuatBan"),
    value: publicationYear,
    icon: 'lucide:calendar-days'
  }, {
    label: t("article.truyCapMo"),
    value: article.is_open_access ? t("article.co") : t("article.khong"),
    icon: 'lucide:unlock'
  }, {
    label: 'Volume',
    value: volume,
    icon: 'lucide:layers'
  }, {
    label: 'Issue',
    value: issue,
    icon: 'lucide:book-copy'
  }];
  return <Card sx={{ border: 0, padding: "1.5rem" }} className="journal-dark-card" style={{
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)'
  }}>
      <MuiBox component="h5" sx={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid #dee2e6", borderColor: "#dee2e6", paddingBottom: "0.5rem" }} className="font-display font-weight-bold text-main">
        <Icon icon="lucide:bar-chart-3" style={{
        color: 'var(--primary)'
      }} width="20" />{t("article.thongKeBaiBaoMetrics")}</MuiBox>

      <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
        <MuiBox component="div" sx={{ padding: "1rem", borderRadius: "0.5rem", textAlign: "center" }}  style={{
        backgroundColor: 'var(--bg-section)'
      }}>
          <MuiBox component="div" sx={{ marginBottom: "0.25rem" }} className="text-muted-custom text-xs font-semibold uppercase tracking-wider" style={{
          fontSize: '0.7rem'
        }}>{t("article.soLuotTrichDanCitations")}</MuiBox>
          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }} className="text-main gap-1.5" style={{
          fontWeight: 700
        }}>
            <Icon icon="lucide:quote" />
            <span>{citations}</span>
          </MuiBox>
        </MuiBox>

        <Row sx={{ gap: "0.5rem" }} className="text-sm text-main">
          {metricCards.map(metric => <Col xs={6} key={metric.label}>
              <MuiBox component="div" sx={{ paddingTop: "0.25rem", paddingBottom: "0.25rem", paddingInlineEnd: "0.5rem", borderRadius: "0.5rem", border: "1px solid #dee2e6", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}  style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-card)',
            paddingLeft: '1rem'
          }}>
                <div className="text-muted-custom text-xxs font-semibold uppercase" style={{
              fontSize: '0.65rem'
            }}>
                  {metric.label}
                </div>
                <MuiBox component="div" sx={{ marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.25rem" }} className="font-weight-bold text-xs" style={{
              fontWeight: 700
            }}>
                  <Icon icon={metric.icon} style={{
                color: 'var(--primary)'
              }} />
                  <span>{metric.value}</span>
                </MuiBox>
              </MuiBox>
            </Col>)}
        </Row>

        <MuiBox component="div" sx={{ borderTop: "1px solid #dee2e6", borderColor: "#dee2e6", paddingTop: "1rem", marginTop: "0.25rem" }} >
          <MuiBox component="div" sx={{ justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem", gap: "1rem" }} className="text-xs">
            <span className="text-muted-custom">DOI:</span>
            <MuiBox component="span" sx={{ textAlign: "right" }} className="text-main font-semibold" style={{
            fontWeight: 600
          }}> {doi}</MuiBox>
          </MuiBox>
          <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="text-xs">
            <span className="text-muted-custom">{t("article.soTrangPages")}</span>
            <span className="text-main font-semibold" style={{
            fontWeight: 600
          }}>{pages}</span>
          </MuiBox>
        </MuiBox>
      </MuiBox>
    </Card>;
}
