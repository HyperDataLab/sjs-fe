
import MuiBox from '@mui/material/Box';
// AuthLogo.jsx
// Hiển thị logo ResearchPulse phía trên card.
// Tách riêng để dễ thay đổi logo sau này mà không ảnh hưởng page.

const AuthLogo = () => {
  return (
    <MuiBox component="div" sx={{ textAlign: "center", marginBottom: "1.5rem" }} >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: '1.8rem',
          fontWeight: 700,
          color: 'var(--primary)',
          letterSpacing: '-0.5px',
        }}
      >
        ResearchPulse
      </span>
    </MuiBox>
  );
};

export default AuthLogo;
