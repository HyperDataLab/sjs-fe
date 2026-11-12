/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\landing\components\FooterCTA.jsx
 */
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/shared/components/ui/muiAdapters';
import { Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';


export default function FooterCTA() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/login');
  };

  return (
    <MuiBox component="section" sx={{ paddingTop: "3rem", paddingBottom: "3rem", position: "relative", overflow: "hidden", textAlign: "center" }}
      id="footer-cta"

      style={{
        backgroundColor: 'var(--bg-main)',
        borderTop: '1px solid var(--border)'
      }}
    >
      {/* Background Spotlight glow effect */}
      <MuiBox component="div" sx={{ position: "absolute", pointerEvents: "none" }}

        style={{
          bottom: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(circle, var(--primary-light) 0%, rgba(199, 238, 255, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}
      />

      <Container sx={{ paddingTop: "3rem", paddingBottom: "3rem", position: "relative", zIndex: 3 }} className="reveal-scale">

        {/* Main Heading */}
        <MuiBox component="h2" sx={{ marginBottom: "1rem" }}
          className="font-display text-main"
          style={{ fontWeight: 800, fontSize: 'calc(1.5rem + 1.8vw)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
        >
          {t('ctaHeading')}
        </MuiBox>

        {/* Sub Heading */}
        <MuiBox component="p" sx={{ mx: "auto", marginBottom: "3rem" }}
          className="text-muted-custom leading-relaxed"
          style={{ fontSize: 'calc(0.9rem + 0.1vw)', maxWidth: '600px', lineHeight: 1.6 }}
        >
          {t('ctaSubheading')}
        </MuiBox>

        {/* Buttons */}
        <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:576px)": { flexDirection: "row", width: "auto" }, justifyContent: "center", alignItems: "center", gap: "1rem", width: "100%" }} >
          {/* Try Searching Now Button */}
          <Button sx={{ width: "100%", "@media (min-width:576px)": { width: "auto" }, borderRadius: "50rem", paddingLeft: "3rem", paddingRight: "3rem", paddingTop: "1rem", paddingBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            href="#search-sandbox"
            variant="outline-secondary"
            className="btn-view-trends"
            style={{ fontSize: '0.875rem', fontWeight: 600 }}
          >
            <Icon sx={{ fontSize: "1.25rem" }} icon="lucide:search" className="btn-view-trends-icon" />
            <span>{t('ctaTryNowBtn')}</span>
          </Button>

          {/* Create Free Account Button */}
          <Button sx={{ width: "100%", "@media (min-width:576px)": { width: "auto" }, borderRadius: "50rem", paddingLeft: "3rem", paddingRight: "3rem", paddingTop: "1rem", paddingBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", border: 0 }}
            onClick={handleCreateAccount}
            className="btn-primary-glow"
            style={{ fontSize: '0.875rem', fontWeight: 700 }}
          >
            <Icon sx={{ fontSize: "1.25rem" }} icon="lucide:user-plus"  />
            <span>{t('ctaCreateAccountBtn')}</span>
          </Button>
        </MuiBox>

      </Container>
    </MuiBox>
  );
}
