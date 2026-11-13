import { createTheme } from '@mui/material/styles';

const brand = {
  blue: '#0071bc',
  blueDark: '#005f9e',
  blueTint: '#f0f7fc',
  ink: '#122331',
  muted: '#647381',
  canvas: '#f7f9fa',
  surface: '#ffffff',
  border: '#dce4e9',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: brand.blue,
      light: brand.blueTint,
      dark: brand.blueDark,
      contrastText: brand.surface,
    },
    secondary: {
      main: brand.ink,
      contrastText: brand.surface,
    },
    background: {
      default: brand.canvas,
      paper: brand.surface,
    },
    text: {
      primary: brand.ink,
      secondary: brand.muted,
    },
    divider: brand.border,
    error: { main: '#b42332' },
    warning: { main: '#a86400' },
    success: { main: '#16805d' },
    info: { main: brand.blue },
  },
  typography: {
    fontFamily: '"Manrope Variable", Manrope, "Segoe UI", sans-serif',
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
    h1: { fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 1.08 },
    h2: { fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.15 },
    h3: { fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2 },
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    body1: { lineHeight: 1.65 },
    body2: { lineHeight: 1.6 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 12,
          fontWeight: 700,
          boxShadow: 'none',
          transition: 'background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease, transform 180ms ease',
          '&:active': { transform: 'translateY(1px)' },
        },
        containedPrimary: {
          boxShadow: '0 8px 20px rgba(0, 113, 188, 0.16)',
          '&:hover': {
            backgroundColor: brand.blueDark,
            boxShadow: '0 10px 24px rgba(0, 113, 188, 0.2)',
          },
        },
        outlined: {
          borderColor: brand.border,
          '&:hover': { borderColor: brand.blue, backgroundColor: brand.blueTint },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${brand.border}`,
          borderRadius: 20,
          boxShadow: '0 16px 44px rgba(18, 55, 82, 0.08)',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        rounded: { borderRadius: 16 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: brand.surface,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: brand.border },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9fb5c3' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: brand.blue, borderWidth: 1.5 },
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 8, fontWeight: 700 } },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          backgroundImage: 'none',
          boxShadow: '0 24px 64px rgba(18, 55, 82, 0.16)',
        },
      },
    },
  },
});

export default theme;
