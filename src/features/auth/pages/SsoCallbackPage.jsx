import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MuiBox from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { getDefaultLang } from '../../../app/routes/languageRouting';
import { completeHyperdatalabSsoCallback } from '../services/hyperdatalabSso';

const errorMessageKey = (error) => {
  switch (error?.message) {
    case 'SSO_CONFIGURATION_MISSING':
    case 'SSO_CONFIGURATION_INVALID':
    case 'SSO_CONFIGURATION_MUST_USE_HTTPS':
      return 'auth.ssoChuaCauHinh';
    case 'SSO_ATTEMPT_EXPIRED':
    case 'SSO_ATTEMPT_MISSING':
    case 'SSO_ATTEMPT_INVALID':
    case 'SSO_STATE_INVALID':
    case 'SSO_CODE_MISSING':
      return 'auth.ssoPhienKhongHopLe';
    case 'SSO_PROFILE_NOT_ELIGIBLE':
      return 'auth.ssoTaiKhoanChuaDuDieuKien';
    default:
      return 'auth.ssoDangNhapThatBai';
  }
};

export default function SsoCallbackPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorKey, setErrorKey] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const callbackHref = window.location.href;
    window.history.replaceState({}, document.title, window.location.pathname);

    completeHyperdatalabSsoCallback(callbackHref)
      .then(({ returnTo }) => {
        if (!cancelled) navigate(returnTo, { replace: true });
      })
      .catch((error) => {
        if (!cancelled) setErrorKey(errorMessageKey(error));
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const loginPath = `/${getDefaultLang()}/login`;

  return (
    <MuiBox sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
      <MuiBox sx={{ textAlign: 'center', maxWidth: 420 }}>
        {errorKey ? (
          <>
            <MuiBox component="h1" sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>
              {t('auth.ssoDangNhapThatBai')}
            </MuiBox>
            <MuiBox component="p" sx={{ color: 'text.secondary', mb: 2 }}>
              {t(errorKey)}
            </MuiBox>
            <Link to={loginPath}>{t('auth.veTrangDangNhap')}</Link>
          </>
        ) : (
          <>
            <CircularProgress size={28} aria-label={t('auth.ssoDangXuLy')} />
            <MuiBox component="p" sx={{ color: 'text.secondary', mt: 2 }}>
              {t('auth.ssoDangXuLy')}
            </MuiBox>
          </>
        )}
      </MuiBox>
    </MuiBox>
  );
}
