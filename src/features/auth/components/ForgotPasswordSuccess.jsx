import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/muiAdapters';
import { Link } from 'react-router-dom';
import Icon from '../../../shared/components/Icon';
import ROUTES from '../../../app/routes/routePaths';


import MuiBox from '@mui/material/Box';

export default function ForgotPasswordSuccess({
  onResend,
  isLoading
}) {
  const {
    t
  } = useTranslation();
  const [countdown, setCountdown] = useState(60);
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);
  const handleResendClick = () => {
    if (countdown > 0 || isLoading) return;
    onResend();
    setCountdown(60); // Reset timer
  };
  return <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "1.5rem" }} className="animate-fade-in">
      <MuiBox component="div" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", marginBottom: "1.5rem" }}  style={{
      width: '4.5rem',
      height: '4.5rem',
      backgroundColor: 'var(--primary-light)',
      color: 'var(--primary)'
    }}>
        <Icon icon="lucide:check-circle" width="40" height="40" />
      </MuiBox>

      <MuiBox component="h3" sx={{ fontWeight: 700, marginBottom: "1rem" }} className="font-display text-main" style={{
      fontSize: '1.75rem'
    }}>{t("auth.kiemTraEmailCuaBan")}</MuiBox>

      <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="text-muted-custom text-sm leading-relaxed" style={{
      lineHeight: 1.6
    }}>{t("auth.neuEmailTonTaiTrongHeThongLien")}</MuiBox>

      {/* Actions */}
      <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
        <Button sx={{ textDecoration: "none", padding: "0", border: 0 }} variant="link" onClick={handleResendClick} disabled={countdown > 0 || isLoading} className="text-sm font-semibold" style={{
        color: countdown > 0 ? 'var(--text-muted)' : 'var(--primary)',
        cursor: countdown > 0 ? 'not-allowed' : 'pointer'
      }}>
          {countdown > 0 ? `Gửi lại email (${countdown}s)` : t("auth.guiLaiEmail")}
        </Button>

        <MuiBox component="div" sx={{ width: "100%" }}  style={{
        height: '1px',
        background: 'var(--border)'
      }} />

        <MuiBox component={Link} sx={{ textDecoration: "none", paddingTop: "0.5rem", paddingBottom: "0.5rem", display: "inline-flex", alignItems: "center", justifyContent: "center" }} to={ROUTES.LOGIN} className="text-sm font-semibold gap-1.5 transition-all" style={{
        color: 'var(--btn-dark)'
      }}>
          <Icon icon="lucide:arrow-left" width="16" />
          <span>{t("auth.quayLaiDangNhap")}</span>
        </MuiBox>
      </MuiBox>
    </MuiBox>;
}
