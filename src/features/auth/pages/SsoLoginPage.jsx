import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MuiBox from '@mui/material/Box';
import AuthLayout from '../../../app/layouts/AuthLayout';
import ROUTES from '../../../app/routes/routePaths';
import AuthBanner from '../components/AuthBanner';
import SsoLoginButton from '../components/SsoLoginButton';
import useAuth from '../hooks/useAuth';
import { startHyperdatalabSso } from '../services/hyperdatalabSso';
import { toast } from '../../../shared/utils/toast';

export default function SsoLoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAsDevUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const returnTo = location.state?.from
    ? `${location.state.from.pathname}${location.state.from.search || ''}${location.state.from.hash || ''}`
    : ROUTES.DASHBOARD;

  const handleSsoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await startHyperdatalabSso(returnTo);
    } catch (ssoError) {
      const message = [
        'SSO_CONFIGURATION_MISSING',
        'SSO_CONFIGURATION_INVALID',
        'SSO_CONFIGURATION_MUST_USE_HTTPS',
      ].includes(ssoError.message)
        ? t('auth.ssoChuaCauHinh')
        : t('auth.ssoDangNhapThatBai');
      setError(message);
      toast.error(message);
      setIsLoading(false);
    }
  };

  const handleDevLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await loginAsDevUser();
      navigate(returnTo, { replace: true });
    } catch (authError) {
      setError(authError.message || t('auth.dangNhapThatBai'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout banner={<AuthBanner />}>
      <MuiBox sx={{ marginBottom: '1.5rem' }}>
        <MuiBox
          component="h2"
          className="font-display"
          sx={{ fontWeight: 700, marginBottom: '0.25rem' }}
          style={{ fontSize: '1.85rem', color: 'var(--text-main)' }}
        >
          {t('signIn')}
        </MuiBox>
        <MuiBox
          component="p"
          className="text-muted-custom text-sm"
          sx={{ marginBottom: 0 }}
          style={{ color: 'var(--text-muted) !important' }}
        >
          {t('auth.chaoMungTroLaiVuiLongNhapThong')}
        </MuiBox>
      </MuiBox>

      <MuiBox sx={{ marginBottom: '1.5rem' }}>
        <SsoLoginButton onClick={handleSsoLogin} disabled={isLoading} />
      </MuiBox>

      {error && (
        <MuiBox role="alert" component="p" sx={{ color: 'error.main', mb: 2 }}>
          {error}
        </MuiBox>
      )}

      <MuiBox component="p" sx={{ color: 'text.secondary', fontSize: '0.875rem', mb: 3 }}>
        {t('auth.ssoContactAdmin')}
      </MuiBox>

      {import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR !== 'false' && (
        <MuiBox
          component="button"
          type="button"
          onClick={handleDevLogin}
          disabled={isLoading}
          sx={{
            width: '100%',
            mb: 3,
            px: 1.5,
            py: 0.75,
            border: '1px solid #6c757d',
            borderRadius: '0.375rem',
            background: 'transparent',
            color: '#6c757d',
            cursor: 'pointer',
          }}
        >
          Dev login (Firebase Auth Emulator)
        </MuiBox>
      )}
    </AuthLayout>
  );
}
