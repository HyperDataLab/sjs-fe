import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\components\LoginRequiredModal.jsx
 */
import { Modal, Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';


import MuiBox from '@mui/material/Box';

export default function LoginRequiredModal({
  show,
  onHide
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const handleLogin = () => {
    onHide();
    navigate('/login');
  };
  const handleRegister = () => {
    onHide();
    navigate('/register');
  };
  return <Modal show={show} onHide={onHide} centered contentClassName="border-0 shadow-lg" style={{
    backdropFilter: 'blur(4px)'
  }}>
      <MuiBox component="div" sx={{ padding: "1.5rem", textAlign: "center", borderRadius: "0.5rem", bgcolor: "background.paper" }}  style={{
      border: '1px solid var(--border)'
    }}>
        {/* Header Icon */}
        <MuiBox component="div" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}  style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-light)',
        border: '1px solid rgba(0, 113, 188, 0.2)'
      }}>
          <Icon sx={{ color: "primary.main" }} icon="lucide:lock"  width="30" />
        </MuiBox>

        {/* Modal Title */}
        <MuiBox component="h4" sx={{ fontWeight: 700, marginBottom: "0.5rem" }} className="font-display text-main">{t("article.dangNhapDeLuuBaiBao")}</MuiBox>

        {/* Modal Content */}
        <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="text-muted-custom text-sm leading-relaxed" style={{
        fontSize: '0.9rem'
      }}>{t("article.banCanDangNhapTaiKhoanResearch")}</MuiBox>

        {/* Buttons Grid */}
        <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }} >
          <PrimaryButton sx={{ width: "100%" }}  onClick={handleLogin}>{t("article.dangNhapNgay")}</PrimaryButton>

          <PrimaryButton sx={{ width: "100%" }} variant="outline"  onClick={handleRegister}>{t("article.dangKyTaiKhoan")}</PrimaryButton>

          <Button sx={{ marginTop: "0.25rem", padding: "0", textDecoration: "none" }} variant="link" className="w-full text-muted-custom hover:text-dark text-xs font-semibold" onClick={onHide}>{t("article.dongCuaSo")}</Button>
        </MuiBox>
      </MuiBox>
    </Modal>;
}
