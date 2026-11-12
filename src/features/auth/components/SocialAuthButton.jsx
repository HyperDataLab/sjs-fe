import { useTranslation } from "react-i18next";
/**
* File source thuộc hệ thống FE ResearchPulse.
*
* File: features\auth\components\SocialAuthButton.jsx
*/
import { Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';


export default function SocialAuthButton({
  onClick,
  disabled = false,
  label
}) {
  const {
    t
  } = useTranslation();
  const resolvedLabel = label || t("auth.tiepTucVoiGoogle");
  return <Button sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", borderRadius: "0.5rem", border: "1px solid #dee2e6" }} variant="light" onClick={onClick} disabled={disabled} className="py-2.5 transition-all text-sm font-semibold" style={{
    background: 'var(--bg-chip)',
    borderColor: 'var(--border)',
    color: 'var(--text-main)',
    boxShadow: 'none',
    transition: 'transform 0.15s ease, background 0.15s ease'
  }} onMouseEnter={e => {
    e.currentTarget.style.transform = 'translateY(-1px)';
    e.currentTarget.style.background = '#ffffff';
    e.currentTarget.style.borderColor = 'var(--primary)';
  }} onMouseLeave={e => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.background = 'var(--bg-chip)';
    e.currentTarget.style.borderColor = 'var(--border)';
  }}>
      <Icon icon="flat-color-icons:google" width="18" />
      <span>{resolvedLabel}</span>
    </Button>;
}
