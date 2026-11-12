import { useTranslation } from "react-i18next";
/**
 * @file AuthorNavigationTabs.jsx
 * @description Component thanh điều hướng phụ cho trang tác giả.
 */

import { Nav } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon';


export default function AuthorNavigationTabs({
  activeTab
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  return <Nav sx={{ marginBottom: "1.5rem", border: 0, display: "flex", flexWrap: "nowrap", overflowX: "auto" }} variant="tabs" activeKey={activeTab} className="author-tabs">
      <Nav.Item>
        <Nav.Link sx={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", whiteSpace: "nowrap" }} eventKey="list" onClick={() => navigate('/authors')} >
          <Icon icon="lucide:users" width="16" />{t("author.danhSachTacGia")}</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link sx={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", whiteSpace: "nowrap" }} eventKey="leaderboard" onClick={() => navigate('/authors/leaderboard')} >
          <Icon icon="lucide:trophy" width="16" />{t("author.bangXepHang")}</Nav.Link>
      </Nav.Item>
    </Nav>;
}
