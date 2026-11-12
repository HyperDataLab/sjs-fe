import { useTranslation } from "react-i18next";
// CountdownRedirect.jsx
// Hiển thị text đếm ngược + progress bar.
// Đặt trong shared/ để tái sử dụng ở nhiều flow auth.

import ProgressBar from './ProgressBar';


import MuiBox from '@mui/material/Box';

const CountdownRedirect = ({
  countdown,
  total
}) => {
  const {
    t
  } = useTranslation();
  return <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
      <MuiBox component="p" sx={{ textAlign: "center", marginBottom: "0.5rem" }}  style={{
      fontSize: '0.875rem',
      color: 'var(--text-muted, #6B6B6B)'
    }}>
        {t("common.tuDongChuyenDenTrangDangNhapSa")}
        <span style={{
        fontWeight: 600,
        color: 'var(--primary)'
      }}>
          {countdown}{t("common.giay")}</span>
        {'...'}
      </MuiBox>
      <ProgressBar current={countdown} total={total} />
    </MuiBox>;
};
export default CountdownRedirect;
