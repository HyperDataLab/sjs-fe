import { useTranslation } from "react-i18next";
import { t } from "i18next";
/**
 * Trang đăng ký tài khoản mới.
 *
 * File: features/auth/pages/RegisterPage.jsx
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthLayout from '../../../app/layouts/AuthLayout';
import AuthBanner from '../components/AuthBanner';
import RegisterForm from '../components/RegisterForm';
import Icon from '../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';

export default function RegisterPage() {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();
  const {
    register
  } = useAuth();

  // State phục vụ UI đăng ký: loading, lỗi API, màn hình thành công.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  /**
   * Gửi form đăng ký lên backend.
   * Nếu API không ném lỗi, hiển thị màn hình thông báo xác thực email.
   */
  const handleRegisterSubmit = async payload => {
    setIsLoading(true);
    setError(null);
    try {
      setRegisteredEmail(payload.email);
      await register(payload);
      setIsSuccess(true);
    } catch (err) {
      console.error('Registration failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message || t("auth.dangKyKhongThanhCongVuiLongThu"));
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Placeholder cho Google OAuth ở trang đăng ký.
   * Hiện chức năng này chưa bật trực tiếp tại màn hình register.
   */
  const handleGoogleAuth = () => {
    alert(t("auth.dangNhapdangKyBangGoogleOauthD"));
  };
  return <AuthLayout banner={<AuthBanner />}>
      {isSuccess ? <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "1.5rem" }} className="animate-fade-in">
          <MuiBox component="div" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}  style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(16, 185, 129, 0.08)',
        border: '2px solid #10b981',
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.1)'
      }}>
            <Icon sx={{ color: "success.main" }} icon="lucide:check-circle"  style={{
          fontSize: '40px'
        }} />
          </MuiBox>

          <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "1rem" }} className="font-display" style={{
        fontSize: '1.75rem',
        color: 'var(--text-main)'
      }}>{t("auth.dangKyThanhCong")}</MuiBox>

          <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="text-muted-custom" style={{
        color: 'var(--text-muted) !important',
        lineHeight: '1.6',
        fontSize: '14px'
      }}>{t("auth.motEmailXacThucDaDuocGuiToiDia")}{' '}<strong style={{
          color: 'var(--text-main)',
          margin: '0 4px'
        }}>{registeredEmail}</strong>{' '}{t("auth.vuiLongKiemTraHopThuHoacThuRac")}</MuiBox>

          <MuiBox component="button" sx={{ width: "100%", borderRadius: "0.5rem", border: 0 }} onClick={() => navigate('/login')} className="py-2.5 text-sm font-semibold transition-all" style={{
        background: 'var(--btn-dark)',
        color: '#ffffff',
        boxShadow: 'none'
      }} onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--primary)';
      }} onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--btn-dark)';
      }}>{t("auth.diDenDangNhap")}</MuiBox>
        </MuiBox> : <>
          <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
            <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display" style={{
          fontSize: '1.85rem',
          color: 'var(--text-main)'
        }}>{t("auth.taoTaiKhoan")}</MuiBox>
            <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom text-sm" style={{
          color: 'var(--text-muted) !important'
        }}>{t("auth.dangKyMienPhiKhongCanTheTinDun")}</MuiBox>
          </MuiBox>

          {/* Đường phân cách giữa phần tiêu đề và form đăng ký. */}
          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }} className="text-xs font-semibold select-none text-muted-custom" style={{
        color: 'var(--text-muted) !important'
      }}>
            <MuiBox component="div" sx={{ width: "100%" }}  style={{
          height: '1px',
          background: 'var(--border)'
        }} />
            <MuiBox component="div" sx={{ width: "100%" }}  style={{
          height: '1px',
          background: 'var(--border)'
        }} />
          </MuiBox>

          <RegisterForm onSubmit={handleRegisterSubmit} isLoading={isLoading} apiError={error} onGoogleAuth={handleGoogleAuth} />
        </>}
    </AuthLayout>;
}
