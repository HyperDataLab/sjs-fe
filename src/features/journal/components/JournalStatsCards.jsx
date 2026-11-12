import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\components\JournalStatsCards.jsx
 */
import { Row, Col, Card } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';


import MuiBox from '@mui/material/Box';

export default function JournalStatsCards({
  stats,
  loading
}) {
  const {
    t
  } = useTranslation();
  const cardData = [{
    title: t("journal.tongJournals"),
    value: stats.totalJournals.toLocaleString('vi-VN'),
    icon: 'lucide:book-open'
  }, {
    title: 'Q1 Journals',
    value: stats.q1Journals.toLocaleString('vi-VN'),
    icon: 'lucide:award'
  }, {
    title: t("journal.quocGia"),
    value: stats.totalCountries.toLocaleString('vi-VN'),
    icon: 'lucide:globe'
  }, {
    title: 'Open Access',
    value: stats.openAccessJournals.toLocaleString('vi-VN'),
    icon: 'lucide:unlock'
  }];
  if (loading) {
    return <Row sx={{ gap: "1.5rem", marginBottom: "1.5rem" }} >
        {[1, 2, 3, 4].map(i => <Col lg={3} md={6} xs={12} key={i}>
            <Card className="journal-stats-skeleton">
              <MuiBox component="div" sx={{ marginBottom: "0.5rem" }} className="skeleton-shimmer journal-stats-skeleton-label" />
              <div className="skeleton-shimmer journal-stats-skeleton-value" />
            </Card>
          </Col>)}
      </Row>;
  }
  return <Row sx={{ gap: "1.5rem", marginBottom: "1.5rem" }} >
      {cardData.map((item, idx) => <Col lg={3} md={6} xs={12} key={idx}>
          <Card className="journal-stats-card">
            <Card.Body sx={{ padding: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }} >
              <div>
                <MuiBox component="span" sx={{ display: "block", marginBottom: "0.25rem" }} className="journal-stats-label">
                  {item.title}
                </MuiBox>
                <span className="journal-stats-value">
                  {item.value}
                </span>
              </div>
              <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="journal-stats-icon">
                <Icon icon={item.icon} width="22" />
              </MuiBox>
            </Card.Body>
          </Card>
        </Col>)}
    </Row>;
}
