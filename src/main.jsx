import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import './assets/fonts/manrope.css';
import './shared/i18n/i18n';
import App from './App.jsx';
import theme from './shared/theme/theme.js';
import legacyGlobalStyles from './shared/theme/legacyGlobalStyles.js';
import { queryClient, localStoragePersister } from './shared/services/queryClient';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={legacyGlobalStyles} />
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{
            persister: localStoragePersister,
            maxAge: 1000 * 60 * 60 * 24,
          }}
        >
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </PersistQueryClientProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
