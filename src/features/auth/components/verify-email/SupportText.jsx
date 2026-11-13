import { useTranslation } from "react-i18next";


import MuiBox from '@mui/material/Box';

const SupportText = () => {
  const {
    t
  } = useTranslation();
  return <MuiBox component="p" sx={{ textAlign: "center", marginTop: "1.5rem" }}  style={{
    fontSize: '0.85rem',
    color: 'var(--text-muted, #647381)'
  }}>
      <span>{t("auth.canHoTro")}</span>{' '}
      <a href="mailto:support@researchpulse.io" className="transition-all" style={{
      color: 'var(--primary)',
      textDecoration: 'none',
      fontWeight: 500
    }}>{t("auth.lienHeChungToi")}</a>
    </MuiBox>;
};
export default SupportText;
