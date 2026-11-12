import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\components\JournalTabs.jsx
 */
import { Nav } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';


import MuiBox from '@mui/material/Box';

export default function JournalTabs({
  activeTab,
  onTabChange
}) {
  const {
    t
  } = useTranslation();
  return <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} className="journal-tabs-wrap" aria-label="Điều hướng chi tiết tạp chí">
      <Nav sx={{ border: 0, display: "flex", flexWrap: "nowrap", overflow: "auto" }} variant="tabs" activeKey={activeTab} onSelect={onTabChange} className="tab-nav-custom">
        <Nav.Item>
          <Nav.Link sx={{ display: "flex", alignItems: "center", gap: "0.5rem", whiteSpace: "nowrap" }} eventKey="ranking" >
            <Icon icon="lucide:bar-chart-3" width="16" />{t("journal.lichSuRanking")}</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link sx={{ display: "flex", alignItems: "center", gap: "0.5rem", whiteSpace: "nowrap" }} eventKey="volumes" >
            <Icon icon="lucide:book-open" width="16" />
            Volumes & Issues
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link sx={{ display: "flex", alignItems: "center", gap: "0.5rem", whiteSpace: "nowrap" }} eventKey="articles" >
            <Icon icon="lucide:file-text" width="16" />{t("journal.baiBaoGanDay")}</Nav.Link>
        </Nav.Item>
      </Nav>
    </MuiBox>;
}
