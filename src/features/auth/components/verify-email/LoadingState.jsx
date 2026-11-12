import { useTranslation } from "react-i18next";


import MuiBox from '@mui/material/Box';

// LoadingState.jsx
// Hiển thị khi đang gọi API verify token.
// Không có button — user chỉ cần chờ.

const LoadingState = () => {
  const {
    t
  } = useTranslation();
  return <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem" }} >
      {/* Circular loading indicator styled through MUI sx. */}
      <MuiBox component="div" sx={{ display: "inline-block", width: "2rem", height: "2rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", marginBottom: "1.5rem" }}  role="status" style={{
      color: 'var(--primary, #FF7A33)',
      width: '3rem',
      height: '3rem'
    }}>
        <MuiBox component="span" sx={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }} >{t("common.dangTai")}</MuiBox>
      </MuiBox>

      {/* Heading */}
      <h5 style={{
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      color: 'var(--text-main, #0D1B1C)',
      marginBottom: '0.5rem'
    }}>{t("auth.dangXacThucTaiKhoan")}</h5>

      {/* Mô tả */}
      <p style={{
      fontSize: '0.9rem',
      color: 'var(--text-muted, #6B6B6B)',
      marginBottom: 0
    }}>{t("auth.vuiLongChoTrongGiayLat")}</p>
    </MuiBox>;
};
export default LoadingState;
