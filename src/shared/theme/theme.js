import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff7a33',
      light: '#fff0e8',
      dark: '#e8632a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#071a1c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#0d1b1c',
      secondary: '#6b6b6b',
    },
    divider: '#e6e6e6',
    error: {
      main: '#b02a37',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 999,
          fontWeight: 600,
          transition: 'background-color 180ms ease, border-color 180ms ease, color 180ms ease',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #e6e6e6',
          borderRadius: 12,
          boxShadow: 'none',
          backgroundImage: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
