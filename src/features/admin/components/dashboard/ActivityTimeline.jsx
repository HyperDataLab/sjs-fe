import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { Modal } from '@/shared/components/ui/muiAdapters';
import PrimaryButton from '../../../../shared/components/Button/PrimaryButton';


import MuiBox from '@mui/material/Box';

export default function ActivityTimeline({
  items = [],
  loading = false,
  error = ''
}) {
  const {
    t
  } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const safeItems = Array.isArray(items) ? items : [];
  const renderActivityItem = item => {
    const activityType = item.type || 'reviewer';
    return <li key={item.id} className="admin-activity-item">
        <span className={`admin-activity-item__dot admin-activity-item__dot--${activityType}`} />

        <div className="admin-activity-item__content">
          <p className="admin-activity-item__title">{item.title}</p>
          <p className="admin-activity-item__description">{item.description}</p>
          <span className="admin-activity-item__time">{item.time}</span>
        </div>
      </li>;
  };
  return <div className="admin-card admin-activity-card">
      <MuiBox component="h3" sx={{ marginBottom: "1rem" }} className="admin-card__title">Recent Activity</MuiBox>

      {loading ? <MuiBox component="p" sx={{ marginBottom: "0" }} className="admin-muted-text">{t("admin.dangTaiHoatDongGanDay")}</MuiBox> : error ? <MuiBox component="p" sx={{ marginBottom: "0" }} className="admin-error-text">{error}</MuiBox> : safeItems.length === 0 ? <MuiBox component="p" sx={{ marginBottom: "0" }} className="admin-muted-text">{t("admin.chuaCoHoatDongGanDay")}</MuiBox> : <>
          <ul className="admin-activity-list">
            {safeItems.slice(0, 4).map(renderActivityItem)}
          </ul>

          <button type="button" className="admin-link-button admin-activity-card__view-all" onClick={() => setShowAll(true)}>
            View All Activity
          </button>
        </>}

      <Modal show={showAll} onHide={() => setShowAll(false)} centered size="lg" className="admin-activity-modal text-main">
        <Modal.Header sx={{ borderBottom: 0, paddingBottom: "0" }} closeButton >
          <div>
            <Modal.Title sx={{ fontWeight: 500, fontSize: "1.5rem", lineHeight: 1.2, marginBottom: "0.25rem" }} className="font-display text-main">All Activity</Modal.Title>
            <small className="text-muted-custom">Full editorial activity log for the admin dashboard.</small>
          </div>
        </Modal.Header>
        <Modal.Body sx={{ paddingTop: "1rem" }} >
          {safeItems.length === 0 ? <MuiBox component="p" sx={{ marginBottom: "0" }} className="admin-muted-text">{t("admin.chuaCoHoatDongGanDay")}</MuiBox> : <ul className="admin-activity-list admin-activity-list--modal">
              {safeItems.map(renderActivityItem)}
            </ul>}
        </Modal.Body>
        <Modal.Footer sx={{ borderTop: 0, paddingTop: "0" }} >
          <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}  onClick={() => setShowAll(false)}>
            Done
          </PrimaryButton>
        </Modal.Footer>
      </Modal>
    </div>;
}
