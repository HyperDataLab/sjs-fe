import { useTranslation } from "react-i18next";
// ErrorState.jsx
// Hiển thị khi token không hợp lệ, hết hạn, hoặc không có token trên URL.
// Không tự redirect — user tự chọn hành động tiếp theo.

import ErrorIcon from './ErrorIcon';
import AuthActionButtons from './AuthActionButtons';


import MuiBox from '@mui/material/Box';

const ErrorState = ({
  message,
  onLogin,
  onRegister
}) => {
  const {
    t
  } = useTranslation();
  return <div>
      {/* Icon cảnh báo màu cam */}
      <ErrorIcon />

      {/* Heading */}
      <MuiBox component="h4" sx={{ textAlign: "center", marginBottom: "0.5rem" }}  style={{
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      color: 'var(--text-main, #0D1B1C)'
    }}>{t("auth.kichHoatTaiKhoanThatBai")}</MuiBox>

      {/* Message lỗi — từ BE hoặc default */}
      <MuiBox component="p" sx={{ textAlign: "center", marginBottom: "1.5rem" }}  style={{
      fontSize: '0.93rem',
      color: 'var(--text-muted, #6B6B6B)',
      lineHeight: 1.6
    }}>
        {message || t("auth.lienKetKichHoatKhongHopLeHoacD")}
      </MuiBox>

      {/* Buttons */}
      <AuthActionButtons status="error" onLogin={onLogin} onRegister={onRegister} />
    </div>;
};
export default ErrorState;
