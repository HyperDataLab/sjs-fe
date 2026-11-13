/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\landing\components\Features.jsx
 */
import { useTranslation } from 'react-i18next';
import { Container } from '@/shared/components/ui/muiAdapters';
import { Row } from '@/shared/components/ui/muiAdapters';
import { Col } from '@/shared/components/ui/muiAdapters';
import { Card } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';


/**
 * Reusable Feature Card Component
 */
function FeatureCard({ icon, title, description }) {
  return (
    <Card sx={{ borderRadius: "0.75rem", padding: "1.5rem", height: "100%", textAlign: "left", position: "relative", overflow: "hidden" }}
      className="glass-card"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Icon Wrapper */}
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}

        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: 'var(--primary-light)',
          border: '1px solid var(--border)',
          color: 'var(--primary)',
          transition: 'all 0.3s ease'
        }}
      >
        <Icon sx={{ fontSize: "1.5rem" }} icon={icon}  />
      </MuiBox>

      {/* Card Content */}
      <Card.Title sx={{ marginBottom: "0.5rem" }}
        className="font-display text-main"
        style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.01em' }}
      >
        {title}
      </Card.Title>
      <Card.Text sx={{ marginBottom: "0" }}
        className="text-muted-custom leading-relaxed"
        style={{ fontSize: '0.85rem', lineHeight: 1.6 }}
      >
        {description}
      </Card.Text>
    </Card>
  );
}

export default function Features() {
  const { t } = useTranslation();

  const featureList = [
    {
      icon: 'lucide:search',
      color: 'text-cyan-400',
      titleKey: 'feature1Title',
      descKey: 'feature1Desc',
    },
    {
      icon: 'lucide:trending-up',
      color: 'text-blue-400',
      titleKey: 'feature2Title',
      descKey: 'feature2Desc',
    },
    {
      icon: 'lucide:bell',
      color: 'text-amber-400',
      titleKey: 'feature3Title',
      descKey: 'feature3Desc',
    },
    {
      icon: 'lucide:folder',
      color: 'text-emerald-400',
      titleKey: 'feature4Title',
      descKey: 'feature4Desc',
    },
    {
      icon: 'lucide:file-text',
      color: 'text-indigo-400',
      titleKey: 'feature5Title',
      descKey: 'feature5Desc',
    },
    {
      icon: 'lucide:gift',
      color: 'text-purple-400',
      titleKey: 'feature6Title',
      descKey: 'feature6Desc',
    },
  ];

  return (
    <MuiBox component="section" sx={{ paddingTop: "3rem", paddingBottom: "3rem", position: "relative" }}
      id="features"

      style={{
        backgroundColor: 'var(--bg-main)',
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)'
      }}
    >
      {/* Subtle glowing lights behind features */}
      <MuiBox component="div" sx={{ position: "absolute", pointerEvents: "none" }}

        style={{
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          backgroundColor: 'rgba(0, 113, 188, 0.03)',
          borderRadius: '50%',
          filter: 'blur(100px)'
        }}
      />
      <MuiBox component="div" sx={{ position: "absolute", pointerEvents: "none" }}

        style={{
          bottom: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          backgroundColor: 'rgba(199, 238, 255, 0.2)',
          borderRadius: '50%',
          filter: 'blur(100px)'
        }}
      />

      <Container sx={{ position: "relative", zIndex: 3, paddingTop: "3rem", paddingBottom: "3rem" }} >

        {/* Section Header */}
        <MuiBox component="div" sx={{ textAlign: "center", marginBottom: "3rem" }} className="reveal-on-scroll">
          <MuiBox component="div" sx={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", textTransform: "uppercase" }} className="text-xs font-bold tracking-wider" style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>
            <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--primary)' }} />
            <span>{t('featuresSubtitle')}</span>
          </MuiBox>
          <h2
            className="font-display text-main"
            style={{ fontWeight: 800, fontSize: 'calc(1.5rem + 1.2vw)', letterSpacing: '-0.01em' }}
          >
            {t('featuresTitle')}
          </h2>
          <MuiBox component="p" sx={{ color: "#6c757d", fontSize: "1rem", mx: "auto", marginBottom: "0" }}  style={{ color: '#adb5bd', maxWidth: '36rem' }}>
            {t('featuresDesc')}
          </MuiBox>
        </MuiBox>

        {/* Grid of Feature Cards */}
        <Row sx={{ gap: "1.5rem" }} >
          {featureList.map((feature, index) => (
            <Col xs={12} md={6} lg={4} key={index} className={`reveal-on-scroll delay-${(index + 1) * 100}`}>
              <FeatureCard
                icon={feature.icon}
                title={t(feature.titleKey)}
                description={t(feature.descKey)}
              />
            </Col>
          ))}
        </Row>

      </Container>
    </MuiBox>
  );
}
