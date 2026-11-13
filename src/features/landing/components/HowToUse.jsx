/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\landing\components\HowToUse.jsx
 */
import { useTranslation } from 'react-i18next';
import { Container } from '@/shared/components/ui/muiAdapters';
import { Row } from '@/shared/components/ui/muiAdapters';
import { Col } from '@/shared/components/ui/muiAdapters';


import MuiBox from '@mui/material/Box';


/**
 * Reusable StepItem component
 */
function StepItem({ number, title, description }) {
  return (
    <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingLeft: "1rem", paddingRight: "1rem", position: "relative", zIndex: 3 }} className="group">
      {/* Circle Number Badge */}
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", marginBottom: "1.5rem" }}
        className="font-display"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--btn-dark)',
          fontWeight: 800,
          fontSize: '1.25rem',
          boxShadow: '0 4px 16px rgba(18, 35, 49, 0.2)'
        }}
      >
        {number}
      </MuiBox>

      {/* Step Content */}
      <MuiBox component="h3" sx={{ marginBottom: "0.5rem" }}
        className="font-display text-main"
        style={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.02em' }}
      >
        {title}
      </MuiBox>
      <MuiBox component="p" sx={{ mx: "auto" }}
        className="text-muted-custom leading-relaxed"
        style={{ fontSize: '0.85rem', maxWidth: '240px', lineHeight: 1.6 }}
      >
        {description}
      </MuiBox>
    </MuiBox>
  );
}

export default function HowToUse() {
  const { t } = useTranslation();

  const steps = [
    { number: 1, titleKey: 'step1Title', descKey: 'step1Desc' },
    { number: 2, titleKey: 'step2Title', descKey: 'step2Desc' },
    { number: 3, titleKey: 'step3Title', descKey: 'step3Desc' },
    { number: 4, titleKey: 'step4Title', descKey: 'step4Desc' },
  ];

  return (
    <MuiBox component="section" sx={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      id="how-to-use"

      style={{ backgroundColor: 'var(--bg-section)', borderTop: '1px solid var(--border)' }}
    >
      <Container sx={{ paddingTop: "3rem", paddingBottom: "3rem", position: "relative" }} >

        {/* Section Header */}
        <MuiBox component="div" sx={{ textAlign: "center", marginBottom: "3rem" }} className="reveal-on-scroll">
          <MuiBox component="div" sx={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", textTransform: "uppercase" }}
            className="font-bold tracking-wider"
            style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.1em' }}
          >
            <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--primary)' }} />
            <span>{t('howToUseSubtitle')}</span>
          </MuiBox>
          <MuiBox component="h2" sx={{ marginBottom: "1rem" }}
            className="font-display text-main"
            style={{ fontWeight: 800, fontSize: 'calc(1.5rem + 1.2vw)', letterSpacing: '-0.01em' }}
          >
            {t('howToUseTitle')}
          </MuiBox>
          <MuiBox component="p" sx={{ mx: "auto" }}
            className="text-muted-custom"
            style={{ fontSize: '0.9rem', maxWidth: '420px', lineHeight: 1.5 }}
          >
            {t('howToUseDesc')}
          </MuiBox>
        </MuiBox>

        {/* Steps container */}
        <MuiBox component="div" sx={{ position: "relative" }} >
          {/* Horizontal dotted connector line (hidden on mobile, visible on desktop) */}
          <MuiBox component="div" sx={{ position: "absolute", display: "none", "@media (min-width:992px)": { display: "block" }, width: "75%", pointerEvents: "none" }}

            style={{
              top: '28px',
              left: '12.5%',
              height: '1px',
              borderTop: '2px dashed var(--border)',
              zIndex: 1
            }}
          />

          {/* Steps layout grid */}
          <Row sx={{ rowGap: "3rem", "@media (min-width:992px)": { rowGap: "0" }, justifyContent: "center" }} >
            {steps.map((step, idx) => (
              <Col xs={12} sm={6} lg={3} key={step.number} className={`reveal-scale delay-${(idx + 1) * 100}`}>
                <StepItem
                  number={step.number}
                  title={t(step.titleKey)}
                  description={t(step.descKey)}
                />
              </Col>
            ))}
          </Row>
        </MuiBox>

      </Container>
    </MuiBox>
  );
}
