import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../shared/services/firebase';
import AuthLayout from '../../../app/layouts/AuthLayout';
import AuthBanner from '../components/AuthBanner';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import ForgotPasswordSuccess from '../components/ForgotPasswordSuccess';
import Logo from '../../../shared/components/Logo';


import MuiBox from '@mui/material/Box';

export default function ForgotPasswordPage() {
  const { t: _t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const handleForgotPasswordSubmit = async email => {
    setIsLoading(true);
    setError(null);
    try {
      setSubmittedEmail(email);
      await sendPasswordResetEmail(auth, email, { url: `${window.location.origin}/login` });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Password reset request failed:', err.message);
      setError(err.message || t("auth.guiYeuCauKhoiPhucMatKhauThatBa"));
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendEmail = async () => {
    if (!submittedEmail) return;
    setIsLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, submittedEmail, { url: `${window.location.origin}/login` });
    } catch (err) {
      console.error('Resending password reset failed:', err.message);
      setError(err.message || t("auth.guiLaiYeuCauKhoiPhucThatBai"));
    } finally {
      setIsLoading(false);
    }
  };
  return <AuthLayout banner={<AuthBanner />}>
      {!isSubmitted ? <>
          {/* Logo on mobile only */}
          <MuiBox component="div" sx={{ display: "flex", "@media (min-width:768px)": { display: "none" }, alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }} >
            <Logo size={32} fontSize="1.125rem" />
          </MuiBox>

          <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
            <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display" style={{
          fontSize: '1.85rem',
          color: 'var(--text-main)'
        }}>{t("auth.quenMatKhau")}</MuiBox>
            <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom text-sm" style={{
          color: 'var(--text-muted)'
        }}>{t("auth.nhapEmailTaiKhoanCuaBanNeuEmai")}</MuiBox>
          </MuiBox>

          <ForgotPasswordForm onSubmit={handleForgotPasswordSubmit} isLoading={isLoading} apiError={error} />
        </> : <ForgotPasswordSuccess onResend={handleResendEmail} isLoading={isLoading} />}
    </AuthLayout>;
}
