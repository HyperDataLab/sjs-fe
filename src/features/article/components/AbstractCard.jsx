import { useTranslation } from "react-i18next";
/**
* File source thuộc hệ thống FE ResearchPulse.
*
* File: features\article\components\AbstractCard.jsx
*/
import { useState } from 'react';
import { Card, Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';


import MuiBox from '@mui/material/Box';

export default function AbstractCard({
  abstract
}) {
  const {
    t
  } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const content = abstract || t("article.khongCoTomTatChoBaiBaoNay");
  const isLong = content.length > 400;
  const displayContent = isLong && !isExpanded ? `${content.substring(0, 400)}...` : content;
  return <Card sx={{ border: 0, padding: "1.5rem", marginBottom: "1.5rem" }} className="journal-dark-card" style={{
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)'
  }}>
      <MuiBox component="h5" sx={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }} className="font-display font-weight-bold text-main">
        <Icon icon="lucide:align-left" style={{
        color: 'var(--primary)'
      }} width="20" />{t("article.tomTatBaiBaoAbstract")}</MuiBox>
      <MuiBox component="p" sx={{ padding: "1rem", borderRadius: "0.5rem", marginBottom: "0" }} className="text-main" style={{
      fontSize: '0.95rem',
      lineHeight: '1.7',
      backgroundColor: 'var(--bg-section)',
      borderLeft: '4px solid var(--primary)',
      whiteSpace: 'pre-line'
    }}>
        {displayContent}
      </MuiBox>

      {isLong && <MuiBox component="div" sx={{ display: "flex", justifyContent: "flex-start", marginTop: "0.5rem" }} >
          <Button sx={{ padding: "0", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.5rem" }} variant="link" className="text-main hover:text-dark font-semibold" style={{
        fontSize: '0.875rem',
        fontWeight: 600
      }} onClick={() => setIsExpanded(!isExpanded)}>
            <span>{isExpanded ? t("article.thuGon") : t("article.xemThem")}</span>
            <Icon icon={isExpanded ? "lucide:chevron-up" : "lucide:chevron-down"} width="16" />
          </Button>
        </MuiBox>}
    </Card>;
}
