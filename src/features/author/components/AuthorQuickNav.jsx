import { useState, useEffect } from "react";
import Icon from "../../../shared/components/Icon";
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * @file AuthorQuickNav.jsx
 * @description Horizontal sticky navigation bar for smooth scrolling across profile sections.
 */
export default function AuthorQuickNav() {
  const [activeSection, setActiveSection] = useState("overview");

  const navItems = [
    { id: "overview", label: "Overview", icon: "lucide:user" },
    { id: "affiliations", label: "Affiliations & Centers", icon: "lucide:building" },
    { id: "research", label: "Research & Impact", icon: "lucide:activity" },
    { id: "publications", label: "Publications", icon: "lucide:book-open" },
    { id: "venues", label: "Journals & Most Cited", icon: "lucide:bookmark" },
    { id: "collaborators", label: "Collaborators & Network", icon: "lucide:users" },
    { id: "awards", label: "Awards & Career", icon: "lucide:award" },
    { id: "related", label: "Related Researchers", icon: "lucide:sparkles" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="ap-quicknav">
      <div className="ap-quicknav-container">
        {navItems.map((item) => (
          <MuiBox component="button" sx={getClassNameSx(`ap-quicknav-item ${activeSection === item.id ? "active" : ""}`)}
            key={item.id}
            type="button"
            className={stripMappedClassNames(`ap-quicknav-item ${activeSection === item.id ? "active" : ""}`)}
            onClick={() => scrollToSection(item.id)}
          >
            <Icon icon={item.icon} width="13" />
            <span>{item.label}</span>
          </MuiBox>
        ))}
      </div>
    </div>
  );
}
