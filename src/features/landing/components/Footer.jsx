/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\landing\components\Footer.jsx
 */
import { useTranslation } from 'react-i18next';
import { Container } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';


export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const links = [
    { labelKey: 'footerAbout', href: '#' },
    { labelKey: 'footerTerms', href: '#' },
    { labelKey: 'footerPrivacy', href: '#' },
    { labelKey: 'footerContact', href: '#' },
  ];

  return (
    <MuiBox component="footer" sx={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}

      style={{
        backgroundColor: 'var(--bg-section)',
        borderTop: '1px solid var(--border)'
      }}
    >
      <Container>
        <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:768px)": { flexDirection: "row" }, alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }} >
          {/* Brand and Description */}
          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} >
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}

              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--text-main)',
                color: 'white'
              }}
            >
              <Icon sx={{ fontSize: "1.25rem" }} icon="lucide:line-chart"  />
            </MuiBox>
            <div>
              <div className="font-display text-main" style={{ fontWeight: 800, fontSize: '1.25rem' }}>
                ResearchPulse
              </div>
              <div className="text-muted-custom" style={{ fontSize: '0.8rem', maxWidth: '300px' }}>
                {t('footerDesc')}
              </div>
            </div>
          </MuiBox>

          {/* Navigation Links */}
          <MuiBox component="nav" sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }} >
            {links.map((link) => (
              <MuiBox component="a" sx={{ textDecoration: "none" }}
                key={link.labelKey}
                href={link.href}
                className="text-muted-custom"
                style={{ fontSize: '0.85rem', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {t(link.labelKey)}
              </MuiBox>
            ))}
          </MuiBox>
        </MuiBox>

        {/* Copyright */}
        <MuiBox component="div" sx={{ textAlign: "center", marginTop: "1.5rem", paddingTop: "1.5rem" }}
          className="text-muted-custom"
          style={{ borderTop: '1px solid var(--border)', fontSize: '0.75rem' }}
        >
          © {currentYear} ResearchPulse. {t('footerRights')}
        </MuiBox>
      </Container>
    </MuiBox>
  );
}
