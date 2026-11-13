
import MuiBox from '@mui/material/Box';

/**
 * AdminFooter Component
 * Renders the page footer aligned at the bottom of administrative content.
 */
export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:768px)": { flexDirection: "row" }, alignItems: "center", justifyContent: "space-between", paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "1rem", paddingBottom: "1rem", borderTop: "1px solid #dee2e6", mt: "auto", bgcolor: "background.paper" }}

      style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
    >
      {/* Copyright branding */}
      <MuiBox component="div" sx={{ marginBottom: "0.5rem", "@media (min-width:768px)": { marginBottom: "0" } }} >
        © {currentYear} HyperData Lab · ResearchPulse. All rights reserved.
      </MuiBox>

      {/* Useful helper links matching the mockup footer */}
      <MuiBox component="div" sx={{ display: "flex", gap: "1.5rem" }} >
        <MuiBox component="a" sx={{ textDecoration: "none" }} href="#privacy" className="text-muted-custom hover-primary">Privacy Policy</MuiBox>
        <MuiBox component="a" sx={{ textDecoration: "none" }} href="#terms" className="text-muted-custom hover-primary">Terms of Service</MuiBox>
        <MuiBox component="a" sx={{ textDecoration: "none" }} href="#docs" className="text-muted-custom hover-primary">Documentation</MuiBox>
        <MuiBox component="a" sx={{ textDecoration: "none" }} href="#support" className="text-muted-custom hover-primary">Contact Support</MuiBox>
      </MuiBox>
    </MuiBox>
  );
}
