import { useTranslation } from "react-i18next";
// SuccessState.jsx
// Hiển thị khi API verify trả về thành công.
// Gồm: icon, heading, mô tả, countdown, buttons.

import SuccessIcon from './SuccessIcon';
import CountdownRedirect from '../../../../shared/components/CountdownRedirect';
import AuthActionButtons from './AuthActionButtons';


import MuiBox from '@mui/material/Box';

const SuccessState = ({
  countdown,
  totalSeconds,
  onLogin,
  onHome
}) => {
  const {
    t
  } = useTranslation();
  return <div>
      {/* Icon checkmark xanh lá */}
      <SuccessIcon />

      {/* Heading */}
      <MuiBox component="h4" sx={{ textAlign: "center", marginBottom: "0.5rem" }}  style={{
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      color: 'var(--text-main, #0D1B1C)'
    }}>{t("auth.kichHoatTaiKhoanThanhCong")}</MuiBox>

      {/* Mô tả */}
      <MuiBox component="p" sx={{ textAlign: "center", marginBottom: "1.5rem" }}  style={{
      fontSize: '0.93rem',
      color: 'var(--text-muted, #6B6B6B)',
      lineHeight: 1.6
    }}>{t("auth.taiKhoanCuaBanDaDuocKichHoatTh")}{' '}
        <span style={{
        color: 'var(--primary)',
        fontWeight: 600
      }}>
          ResearchPulse
        </span>
        .
      </MuiBox>

      {/* Countdown + Progress bar */}
      <CountdownRedirect countdown={countdown} total={totalSeconds} />

      {/* Buttons */}
      <AuthActionButtons status="success" onLogin={onLogin} onHome={onHome} />
    </div>;
};
export default SuccessState;
