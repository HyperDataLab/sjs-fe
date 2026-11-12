import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MuiBox from '@mui/material/Box';
import AuthLayout from '../../../app/layouts/AuthLayout';
import ROUTES from '../../../app/routes/routePaths';
import AuthBanner from '../components/AuthBanner';
import LoginForm from '../components/LoginForm';
import SocialAuthButton from '../components/SocialAuthButton';
import useAuth from '../hooks/useAuth';
import { toast } from '../../../shared/utils/toast';

const DASHBOARD_PAGE = ROUTES.DASHBOARD;

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, loginAsDevUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from
    ? `${location.state.from.pathname}${location.state.from.search || ''}`
    : DASHBOARD_PAGE;

  const handleLoginSubmit = async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(payload.email, payload.password, payload.remember_login);
      navigate(from, { replace: true });
    } catch (authError) {
      setError(authError.response?.data?.message || authError.message || t('auth.dangNhapKhongThanhCongVuiLongK'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await loginWithGoogle(from);
    } catch (authError) {
      setError(authError.message || t('auth.dangNhapThatBai'));
      toast.error(t('auth.dangNhapThatBai'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await loginAsDevUser();
      navigate(from, { replace: true });
    } catch (authError) {
      setError(authError.message || t('auth.dangNhapThatBai'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout banner={<AuthBanner />}>
      <MuiBox component="div" sx={{ marginBottom: '1.5rem' }}>
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
        <SocialAuthButton onClick={handleLoginWithGoogle} disabled={isLoading} />
      </MuiBox>

      {import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR !== 'false' && (
        <MuiBox
          component="button"
          type="button"
          onClick={handleDevLogin}
          disabled={isLoading}
          sx={{ width: '100%', marginBottom: '1.5rem' }}
        >
          Dev login (Firebase Auth Emulator)
        </MuiBox>
      )}

      <MuiBox
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, color: 'text.secondary' }}
      >
        <MuiBox sx={{ width: '100%', height: '1px', background: 'var(--border)' }} />
        <MuiBox component="span" sx={{ px: 2, whiteSpace: 'nowrap', fontSize: '0.75rem' }}>
          {t('auth.hoac')}
        </MuiBox>
        <MuiBox sx={{ width: '100%', height: '1px', background: 'var(--border)' }} />
      </MuiBox>

      <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} apiError={error} />

      <MuiBox sx={{ textAlign: 'center', mt: 4, fontSize: '0.875rem', fontWeight: 500 }}>
        <MuiBox component="span" sx={{ color: 'text.secondary' }}>
          {t('auth.chuaCoTaiKhoan')}{' '}
        </MuiBox>
        <Link to={ROUTES.REGISTER} className="text-decoration-none" style={{ color: 'var(--primary)', fontWeight: 600 }}>
          {t('signUp')}
        </Link>
      </MuiBox>
    </AuthLayout>
  );
}
