/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: app\layouts\AuthLayout.jsx
 */
import { Row, Col } from '@/shared/components/ui/muiAdapters';
import { MotionBox } from '../../shared/components/ui/MotionBox';


import MuiBox from '@mui/material/Box';


export default function AuthLayout({ banner, children }) {
  return (
    <MuiBox component="div" sx={{ minHeight: "100vh", width: "100%", overflowX: "hidden", display: "flex" }}

      style={{
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-main)',
        fontFamily: 'var(--font-display)'
      }}
    >
      <Row sx={{ gap: "0", width: "100%", minHeight: "100vh" }} >
        {/* Left Column: Banner (Hidden on Mobile) */}
        <Col sx={{ display: "none", "@media (min-width:768px)": { display: "block" }, height: "100%", minHeight: "100vh", position: "sticky", top: "0" }}
          md={6}

        >
          {banner}
        </Col>

        {/* Right Column: Auth Forms */}
        <Col sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "3rem", paddingBottom: "3rem", paddingLeft: "1rem", paddingRight: "1rem", "@media (min-width:576px)": { paddingLeft: "1.5rem", paddingRight: "1.5rem" }, "@media (min-width:768px)": { paddingLeft: "3rem", paddingRight: "3rem" }, minHeight: "100vh", overflowY: "auto" }}
          xs={12}
          md={6}

          style={{ backgroundColor: 'var(--bg-main)' }}
        >
          <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }} sx={{ width: "100%", maxWidth: 440 }}>
            {children}
          </MotionBox>
        </Col>
      </Row>

    </MuiBox>
  );
}
