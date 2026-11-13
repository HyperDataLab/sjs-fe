import MuiBox from '@mui/material/Box';

export default function Logo({ size = 36, fontSize = '1.25rem', className = '', sx, ...props }) {
  return (
    <MuiBox
      component="span"
      className={className}
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, color: 'text.primary', fontWeight: 800, letterSpacing: '-0.045em', whiteSpace: 'nowrap', ...sx }}
      {...props}
    >
      <MuiBox component="img" src="/hyperdatalab-mark.png" alt="" sx={{ display: 'block', width: size, height: size, objectFit: 'contain', flexShrink: 0 }} />
      <MuiBox component="span" sx={{ fontSize, lineHeight: 1.1 }}>HyperData Lab</MuiBox>
    </MuiBox>
  );
}
