import { useTranslation } from "react-i18next";


import MuiBox from '@mui/material/Box';

// AuthActionButtons.jsx
// Nhóm các button hành động — tách riêng để dễ thay đổi layout button.
// Nhận props để biết đang ở state success hay error.

const AuthActionButtons = ({
  status,
  onLogin,
  onHome,
  onRegister
}) => {
  const {
    t
  } = useTranslation();
  // ─── Buttons cho trạng thái SUCCESS ───────────────────────────────────────
  if (status === 'success') {
    return <MuiBox component="div" sx={{ display: "grid", gap: "0.5rem" }} >
        {/* Button chính — đi thẳng đến login không chờ countdown */}
        <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: "1px solid transparent", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none" }} onClick={onLogin}  style={{
        backgroundColor: 'var(--primary, #0071bc)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '0.65rem 1rem',
        fontWeight: 600,
        fontSize: '0.95rem'
      }}>{t("article.dangNhapNgay")}</MuiBox>

        {/* Link phụ — về trang chủ */}
        <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "underline", bgcolor: "transparent", color: "primary.main" }} onClick={onHome}  style={{
        color: 'var(--text-muted, #647381)',
        textDecoration: 'none',
        fontSize: '0.9rem'
      }}>{t("auth.veTrangChu")}</MuiBox>
      </MuiBox>;
  }

  // ─── Buttons cho trạng thái ERROR ─────────────────────────────────────────
  if (status === 'error') {
    return <MuiBox component="div" sx={{ display: "grid", gap: "0.5rem" }} >
        {/* Button chính — đăng ký lại */}
        <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: "1px solid transparent", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none" }} onClick={onRegister}  style={{
        backgroundColor: 'var(--primary)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '0.65rem 1rem',
        fontWeight: 600,
        fontSize: '0.95rem'
      }}>{t("auth.dangKyLai")}</MuiBox>

        {/* Link phụ — về trang đăng nhập */}
        <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "underline", bgcolor: "transparent", color: "primary.main" }} onClick={onLogin}  style={{
        color: 'var(--text-muted, #647381)',
        textDecoration: 'none',
        fontSize: '0.9rem'
      }}>{t("auth.veTrangDangNhap")}</MuiBox>
      </MuiBox>;
  }

  // Loading state — không hiển thị button
  return null;
};
export default AuthActionButtons;
