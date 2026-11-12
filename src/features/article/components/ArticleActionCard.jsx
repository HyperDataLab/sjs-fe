import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\components\ArticleActionCard.jsx
 */
import { useState } from 'react';
import { Card, Button, Spinner } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';
import { MotionBox } from '../../../shared/components/ui/MotionBox';

import MuiBox from '@mui/material/Box';

export default function ArticleActionCard({
  article,
  isBookmarked,
  onBookmarkToggle,
  isBookmarkLoading
}) {
  const {
    t
  } = useTranslation();
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const handleCopyDoi = () => {
    if (!article?.doi) return;
    navigator.clipboard.writeText(article.doi);
    setShowCopiedToast(true);
    setTimeout(() => {
      setShowCopiedToast(false);
    }, 2500);
  };
  const handleOpenSource = () => {
    const url = article?.source_url || article?.doi_url || (article?.doi?.startsWith('http') ? article.doi : article?.doi ? `https://doi.org/${article.doi}` : '');
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return <Card sx={{ border: 0, padding: "1.5rem", marginBottom: "1.5rem", position: "relative" }} className="journal-dark-card" style={{
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)'
  }}>
      <MuiBox component="h5" sx={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid #dee2e6", borderColor: "#dee2e6", paddingBottom: "0.5rem" }} className="font-display font-weight-bold text-main">
        <Icon icon="lucide:sliders" style={{
        color: 'var(--primary)'
      }} width="20" />{t("article.hanhDongActions")}</MuiBox>

      {/* Floating Copied Message */}
      {showCopiedToast && <MotionBox initial={{ opacity: 0, y: 10, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} transition={{ duration: 0.2, ease: 'easeOut' }} sx={{ position: "absolute", left: "50%", top: -24, zIndex: 100, whiteSpace: 'nowrap', display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)", background: '#f0fdf4', borderLeft: '4px solid #22c55e', borderRadius: '14px', color: '#166534' }}>
          <Icon sx={{ color: '#22c55e', flexShrink: 0 }} icon="solar:check-circle-bold" width="18" />
          <MuiBox component="span" sx={{ fontWeight: 500 }}>{t("article.daSaoChepMaDoi")}</MuiBox>
        </MotionBox>}

      <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
        {/* Bookmark Button */}
        <Button sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }} onClick={onBookmarkToggle} disabled={isBookmarkLoading} className="w-full py-2.5 font-semibold text-sm transition-all" style={{
        borderRadius: '8px',
        backgroundColor: isBookmarked ? 'var(--primary-light)' : 'transparent',
        color: isBookmarked ? 'var(--primary)' : 'var(--text-main)',
        border: isBookmarked ? '1px solid var(--primary)' : '1px solid var(--border)'
      }} onMouseEnter={e => {
        if (!isBookmarked) {
          e.currentTarget.style.borderColor = 'var(--primary)';
          e.currentTarget.style.color = 'var(--primary)';
        }
      }} onMouseLeave={e => {
        if (!isBookmarked) {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.color = 'var(--text-main)';
        }
      }}>
          {isBookmarkLoading ? <Spinner sx={{ color: "primary.main" }} animation="border" size="sm"  /> : <Icon sx={getClassNameSx(isBookmarked ? "text-primary" : "")} icon={isBookmarked ? "lucide:bookmark-check" : "lucide:bookmark"} width="18" className={stripMappedClassNames(isBookmarked ? "text-primary" : "")} />}
          <span>{isBookmarked ? t("article.daBookmarkBaiBao") : t("article.bookmarkBaiBao")}</span>
        </Button>

        {/* Copy DOI Button */}
        {article?.doi && <Button sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", bgcolor: "transparent" }} onClick={handleCopyDoi} className="w-full py-2.5 font-semibold text-sm transition-all text-main" style={{
        borderRadius: '8px',
        border: '1px solid var(--border)'
      }} onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--primary)';
        e.currentTarget.style.color = 'var(--primary)';
      }} onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.color = 'var(--text-main)';
      }}>
            <Icon icon="lucide:copy" width="18" />
            <span>{t("article.copyMaDoi")}</span>
          </Button>}

        {/* View Source Button */}
        {article?.doi && <Button sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }} onClick={handleOpenSource} className="w-full py-2.5 font-semibold text-sm btn-dark-solid" style={{
        borderRadius: '8px'
      }}>
            <Icon icon="lucide:external-link" width="18" />
            <span>{t("article.xemNguonBaiBao")}</span>
          </Button>}
      </MuiBox>

    </Card>;
}
