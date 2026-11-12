import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState } from 'react';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../../shared/services/firebase';
import { useSearchParams, Link } from 'react-router-dom';
import AuthLayout from '../../../app/layouts/AuthLayout';
import AuthBanner from '../components/AuthBanner';
import ResetPasswordForm from '../components/ResetPasswordForm';
import ResetPasswordSuccess from '../components/ResetPasswordSuccess';
import Icon from '../../../shared/components/Icon';
import ROUTES from '../../../app/routes/routePaths';
import { getClassNameSx } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';

export default function ResetPasswordPage() {
  const { t: _t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('oobCode') || searchParams.get('token');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleResetPasswordSubmit = async password => {
    if (!token) {
      setError(t("auth.thieuMaXacThucKhoiPhucMatKhauV"));
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await confirmPasswordReset(auth, token, password);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Password reset failed:', err.message);
      setError(err.message || t("auth.thayDoiMatKhauThatBaiVuiLongTh"));
    } finally {
      setIsLoading(false);
    }
  };
  return <AuthLayout banner={<AuthBanner />}>
      {isSubmitted ? <ResetPasswordSuccess /> : <>
          {/* Logo on mobile only */}
          <MuiBox component="div" sx={{ display: "flex", "@media (min-width:768px)": { display: "none" }, alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }} >
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}  style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: 'var(--btn-dark)',
          boxShadow: '0 4px 10px rgba(7, 26, 28, 0.15)'
        }}>
              <Icon sx={{ color: "#fff" }} icon="lucide:activity" className="text-sm" />
            </MuiBox>
            <MuiBox component="span" sx={{ fontSize: "1.25rem", fontWeight: 700 }} className="font-display" style={{
          letterSpacing: '0.03em',
          color: 'var(--text-main)'
        }}>
              ResearchPulse
            </MuiBox>
          </MuiBox>

          <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
            <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display" style={{
          fontSize: '1.85rem',
          color: 'var(--text-main)'
        }}>{t("auth.datLaiMatKhau")}</MuiBox>
            <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom text-sm" style={{
          color: 'var(--text-muted)'
        }}>{t("auth.vuiLongNhapMatKhauMoiCuaBanBen")}</MuiBox>
          </MuiBox>

          {!token ? <MuiBox component="div" sx={getClassNameSx("alert alert-danger d-flex align-items-center gap-3 py-3 px-3 border-0 rounded-3 mb-4 text-danger bg-danger bg-opacity-10")} style={{
        fontSize: '13px',
        fontWeight: 500
      }}>
              <Icon sx={{ flexShrink: 0 }} icon="lucide:alert-triangle" width="18"  />
              <div>{t("auth.lienKetKhoiPhucMatKhauKhongHop")}<MuiBox component="div" sx={{ marginTop: "0.5rem" }} >
                  <Link to={ROUTES.FORGOT_PASSWORD} style={{
              color: 'var(--primary)',
              textDecoration: 'none',
              fontWeight: 600
            }}>{t("auth.yeuCauLienKetMoi")}</Link>
                </MuiBox>
              </div>
            </MuiBox> : <ResetPasswordForm onSubmit={handleResetPasswordSubmit} isLoading={isLoading} apiError={error} />}

          {/* Link back to Login */}
          {!isSubmitted && <MuiBox component="div" sx={{ textAlign: "center", marginTop: "1.5rem" }} className="text-sm font-medium">
              <span className="text-muted-custom">{t("auth.quayLai")}</span>{' '}
              <MuiBox component={Link} sx={{ textDecoration: "none" }} to={ROUTES.LOGIN} className="transition-all" style={{
          color: 'var(--primary)',
          fontWeight: 600
        }}>{t("signIn")}</MuiBox>
            </MuiBox>}
        </>}
    </AuthLayout>;
}
