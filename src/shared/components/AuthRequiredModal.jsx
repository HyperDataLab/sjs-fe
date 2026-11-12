import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: shared\components\AuthRequiredModal.jsx
 */
import { Modal } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import PrimaryButton from './Button/PrimaryButton';


import MuiBox from '@mui/material/Box';

export default function AuthRequiredModal({
  show,
  onHide
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const handleLoginClick = () => {
    onHide();
    navigate('/login');
  };
  const handleRegisterClick = () => {
    onHide();
    navigate('/register');
  };
  return <Modal show={show} onHide={onHide} centered contentClassName="border-0 text-start bg-white rounded-3 shadow" style={{
    backdropFilter: 'blur(4px)'
  }}>
      <Modal.Header sx={{ border: 0, paddingBottom: "0" }} closeButton  style={{
      backgroundColor: 'var(--bg-card)'
    }}>
        <Modal.Title sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }} className="font-display text-main" style={{
        fontSize: '1.25rem'
      }}>
          <Icon sx={{ color: "warning.main" }} icon="lucide:shield-alert"  width="22" />{t("common.yeuCauDangNhap")}</Modal.Title>
      </Modal.Header>

      <Modal.Body sx={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}  style={{
      backgroundColor: 'var(--bg-card)',
      color: 'var(--text-main)'
    }}>
        <MuiBox component="p" sx={{ marginBottom: "0" }}  style={{
        fontSize: '1rem',
        lineHeight: '1.5'
      }}>{t("common.banCanDangNhapDeSuDungTinhNang")}</MuiBox>
      </Modal.Body>

      <Modal.Footer sx={{ border: 0, paddingTop: "0" }}  style={{
      backgroundColor: 'var(--bg-card)',
      gap: '8px'
    }}>

        <PrimaryButton variant="outline" onClick={handleRegisterClick}>{t("common.dangKy")}</PrimaryButton>

        <PrimaryButton onClick={handleLoginClick}>{t("signIn")}</PrimaryButton>
      </Modal.Footer>
    </Modal>;
}
