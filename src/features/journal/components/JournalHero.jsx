import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\components\JournalHero.jsx
 */
import { Row, Col, Button, Spinner } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';

export default function JournalHero({
  journal,
  isFollowing,
  isAddingToProject,
  onFollow,
  onAddToProject,
  loading
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  if (loading || !journal) {
    return <MuiBox component="section" sx={{ marginBottom: "1.5rem" }} className="journal-surface journal-hero-card" aria-label="Đang tải thông tin tạp chí">
        <Row sx={{ rowGap: "1.5rem" }} className="journal-hero-content">
          <Col lg={8}>
            <MuiBox component="div" sx={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }} >
              <div className="skeleton-shimmer" style={{
              width: '60px',
              height: '24px',
              borderRadius: '6px'
            }} />
              <div className="skeleton-shimmer" style={{
              width: '100px',
              height: '24px',
              borderRadius: '6px'
            }} />
            </MuiBox>
            <MuiBox component="div" sx={{ marginBottom: "1rem" }} className="skeleton-shimmer" style={{
            width: '80%',
            height: '44px'
          }} />
            <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} className="skeleton-shimmer" style={{
            width: '95%',
            height: '64px'
          }} />
            <MuiBox component="div" sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }} >
              {[1, 2, 3].map(i => <div key={i} className="skeleton-shimmer" style={{
              width: '92px',
              height: '32px',
              borderRadius: '999px'
            }} />)}
            </MuiBox>
          </Col>
          <Col sx={{ "@media (min-width:992px)": { textAlign: "right" } }} lg={4} >
            <MuiBox component="div" sx={{ marginBottom: "0.5rem", "@media (min-width:992px)": { ml: "auto" } }} className="skeleton-shimmer" style={{
            width: '150px',
            height: '72px'
          }} />
            <MuiBox component="div" sx={{ marginBottom: "1rem", "@media (min-width:992px)": { ml: "auto" } }} className="skeleton-shimmer" style={{
            width: '160px',
            height: '20px'
          }} />
            <MuiBox component="div" sx={{ display: "flex", gap: "0.5rem", "@media (min-width:992px)": { justifyContent: "flex-end" }, flexWrap: "wrap" }} >
              <div className="skeleton-shimmer" style={{
              width: '110px',
              height: '38px',
              borderRadius: '6px'
            }} />
              <div className="skeleton-shimmer" style={{
              width: '140px',
              height: '38px',
              borderRadius: '6px'
            }} />
            </MuiBox>
          </Col>
        </Row>
      </MuiBox>;
  }
  const {
    display_name,
    title,
    name,
    description,
    publisher_name,
    is_open_access,
    quartile,
    metric_value,
    metric_name,
    metric_year,
    latest_metrics,
    subject_categories = [],
    is_following
  } = journal || {};

  const journalTitle = display_name || title || name || '';
  const displayQuartile = quartile || latest_metrics?.quartile || 'Q1';
  const displayMetricValue = metric_value ?? latest_metrics?.sjr ?? latest_metrics?.value ?? null;
  const displayMetricName = metric_name || 'SJR Score';
  const displayMetricYear = metric_year || latest_metrics?.year || '2025';

  const handleCategoryClick = categoryName => {
    if (!categoryName) return;
    navigate(`/keywords?keyword=${encodeURIComponent(categoryName)}`);
  };
  return <MuiBox component="section" sx={{ marginBottom: "1.5rem" }} className="journal-surface journal-hero-card" aria-labelledby="journal-detail-title">
      <Row sx={{ rowGap: "1.5rem", alignItems: "flex-start" }} className="journal-hero-content">
        <Col lg={8} md={7}>
          <div className="journal-meta-line">
            {displayQuartile && <span>{displayQuartile}</span>}
            {is_open_access && <span>Open Access</span>}
            {publisher_name && <span>{publisher_name}</span>}
          </div>

          <h1 id="journal-detail-title" className="journal-title">
            {journalTitle}
          </h1>

          <p className="journal-description">
            {description || t("journal.chuaCoMoTaChiTietPhamViNghienC")}
          </p>

          {subject_categories.length > 0 && <div className="journal-category-list" aria-label="Chủ đề nghiên cứu">
              {subject_categories.map((cat, idx) => <span key={cat.id || idx} className="journal-category-chip" role="button" tabIndex={0} onClick={() => handleCategoryClick(cat.display_name)} onKeyDown={e => e.key === 'Enter' && handleCategoryClick(cat.display_name)} title={`Tìm keyword ${cat.display_name}`}>
                  {cat.display_name}
                </span>)}
            </div>}
        </Col>

        <Col sx={{ "@media (min-width:768px)": { textAlign: "right" }, textAlign: "left", "@media (min-width:992px)": { marginTop: "0.5rem" } }} lg={4} md={5} >
          {displayMetricValue !== null && displayMetricValue !== undefined ? <MuiBox component="div" sx={{ "@media (min-width:768px)": { ml: "auto" }, marginBottom: "1rem" }} className="journal-metric-panel">
              <div className="journal-metric-value">
                {displayMetricValue}
              </div>
              <div className="journal-metric-label">
                {displayMetricName} {displayMetricYear}
              </div>
            </MuiBox> : <MuiBox component="div" sx={{ "@media (min-width:768px)": { ml: "auto" }, marginBottom: "1rem" }} className="journal-metric-panel">
              <span className="text-muted-custom">{t("journal.chuaCoDuLieuRanking")}</span>
            </MuiBox>}

          <div className="journal-action-row">
            <Button sx={getClassNameSx(`journal-outline-btn px-3 py-2 ${is_following ? 'is-active' : ''}`)} onClick={onFollow} disabled={isFollowing} className={stripMappedClassNames(`journal-outline-btn px-3 py-2 ${is_following ? 'is-active' : ''}`)}>
              {isFollowing ? <Spinner animation="border" size="sm" /> : is_following ? <>
                  <Icon icon="lucide:check" width="16" />{t("journal.dangTheoDoi")}</> : <>
                  <Icon icon="lucide:plus" width="16" />{t("catalog.theoDoi")}</>}
            </Button>

            <PrimaryButton sx={{ gap: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} onClick={onAddToProject} disabled={isAddingToProject} >
              {isAddingToProject ? <Spinner animation="border" size="sm" variant="light" /> : <>
                  <Icon icon="lucide:folder-plus" width="16" />{t("journal.themVaoProject")}</>}
            </PrimaryButton>
          </div>
        </Col>
      </Row>
    </MuiBox>;
}
