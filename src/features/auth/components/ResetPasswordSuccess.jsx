import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon';
import SubmitButton from './SubmitButton';


import MuiBox from '@mui/material/Box';

export default function ResetPasswordSuccess() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/login', {
        replace: true
      });
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);
  const handleRedirect = () => {
    navigate('/login', {
      replace: true
    });
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
    }}>{t("auth.datLaiMatKhauThanhCong")}</MuiBox>

      <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="text-muted-custom text-sm leading-relaxed" style={{
      lineHeight: 1.6
    }}>{t("auth.matKhauCuaBanDaDuocCapNhatThan")}<strong>{countdown}</strong>{t("auth.giay")}</MuiBox>

      {/* Button Action */}
      <SubmitButton isLoading={false} onClick={handleRedirect} label={t("article.dangNhapNgay")} />
    </MuiBox>;
}
