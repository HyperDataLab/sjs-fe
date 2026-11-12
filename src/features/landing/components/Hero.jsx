/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\landing\components\Hero.jsx
 */
import { useTranslation } from 'react-i18next';
import { Container } from '@/shared/components/ui/muiAdapters';
import { Row } from '@/shared/components/ui/muiAdapters';
import { Col } from '@/shared/components/ui/muiAdapters';
import { Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';


export default function Hero() {
  const { t } = useTranslation();

  const stats = [
    { valueKey: 'papersValue', labelKey: 'papersLabel', color: '#000000' },
    { valueKey: 'periodValue', labelKey: 'periodLabel', color: '#000000' },
    { valueKey: 'keywordsValue', labelKey: 'keywordsLabel', color: '#000000' },
    { valueKey: 'freeValue', labelKey: 'freeLabel', color: '#AB7E55' },
  ];

  return (
    <MuiBox component="section" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: "3rem", paddingBottom: "3rem", overflow: "hidden" }} className="relative grid-bg">
      {/* Radial overlay to fade out the grid pattern */}
      <MuiBox component="div" sx={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }} className="radial-fade" style={{ top: 0, left: 0 }} />

      {/* Hero content container */}
      <Container sx={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", flexGrow: 1, zIndex: 3, paddingTop: "3rem" }} >

        {/* Animated OpenAlex Badge */}
        <MuiBox component="div" sx={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", borderRadius: "50rem", marginBottom: "1.5rem" }}
          className="reveal-on-scroll delay-100"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            color: '#000000',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.05em'
          }}
        >
          <Icon sx={{ color: "warning.main" }} icon="lucide:sparkles" className="animate-pulse" />
          <span>{t('badgeText')}</span>
        </MuiBox>

        {/* Main Heading */}
        <MuiBox component="h1" sx={{ marginBottom: "1.5rem" }}
          className="font-display text-main reveal-on-scroll delay-200"
          style={{
            fontWeight: 800,
            fontSize: 'calc(1.8rem + 2.5vw)',
            lineHeight: 1.15,
            maxWidth: '900px',
            letterSpacing: '-0.02em'
          }}
        >
          {t('headingPrefix')}{' '}
          <span className="glow-gradient-text glow-text-cyan font-display">
            {t('headingHighlight')}
          </span>
        </MuiBox>

        {/* Sub Heading */}
        <MuiBox component="p" sx={{ marginBottom: "3rem" }}
          className="text-main max-w-2xl reveal-on-scroll delay-300"
          style={{
            fontSize: 'calc(0.95rem + 0.15vw)',
            lineHeight: 1.6,
            maxWidth: '650px'
          }}
        >
          {t('subheading')}
        </MuiBox>

        {/* Action CTA Buttons */}
        <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:576px)": { flexDirection: "row", width: "auto" }, justifyContent: "center", alignItems: "center", gap: "1rem", width: "100%", marginBottom: "3rem" }} className="reveal-on-scroll delay-400">
          {/* Start Searching Button */}
          <Button sx={{ borderRadius: "50rem", paddingLeft: "3rem", paddingRight: "3rem", paddingTop: "1rem", paddingBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            href="#search-sandbox"
            className="btn-primary-glow"
            style={{ fontSize: '0.875rem', letterSpacing: '0.03em' }}
          >
            <Icon sx={{ fontSize: "1.25rem" }} icon="lucide:rocket"  />
            <span>{t('ctaSearch')}</span>
          </Button>

          {/* View Trends Button */}
          <Button sx={{ borderRadius: "50rem", paddingLeft: "3rem", paddingRight: "3rem", paddingTop: "1rem", paddingBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            href="#features"
            variant="outline-secondary"
            className="btn-view-trends"
          >
            <Icon sx={{ fontSize: "1.25rem" }} icon="lucide:bar-chart-2" className="btn-view-trends-icon" />
            <span>{t('ctaTrends')}</span>
          </Button>
        </MuiBox>
      </Container>

      {/* Stats Counter Row Container */}
      <MuiBox component="div" sx={{ position: "relative", width: "100%", zIndex: 3 }} className="reveal-scale delay-500" style={{ borderTop: '1px solid var(--border)' }}>
        <Container sx={{ paddingTop: "1.5rem", paddingBottom: "0.5rem" }} >
          <Row sx={{ rowGap: "1.5rem", "@media (min-width:768px)": { rowGap: "0" }, textAlign: "center" }} >
            {stats.map((stat, idx) => (
              <Col
                xs={6}
                md={3}
                key={idx}
                className={idx > 0 ? 'border-start-md border-white-10' : ''}
                style={{
                  borderLeft: (idx > 0 && window.innerWidth >= 768) ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
                }}
              >
                <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
                  {/* Stat Value */}
                  <MuiBox component="span" sx={{ marginBottom: "0.25rem" }}
                    className="font-display"
                    style={{
                      fontWeight: 800,
                      fontSize: 'calc(1.3rem + 1vw)',
                      color: stat.color,
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {t(stat.valueKey)}
                  </MuiBox>
                  {/* Stat Label */}
                  <span
                    className="text-muted-custom font-weight-bold"
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {t(stat.labelKey)}
                  </span>
                </MuiBox>
              </Col>
            ))}
          </Row>
        </Container>
      </MuiBox>
    </MuiBox>
  );
}
