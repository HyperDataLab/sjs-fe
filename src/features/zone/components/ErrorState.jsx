import { useTranslation } from "react-i18next";
import Icon from '../../../shared/components/Icon.jsx';
import { combineSx, getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';

export default function ErrorState({
  message,
  onRetry,
  className = '',
  style = {},
  sx,
}) {
  const {
    t
  } = useTranslation();
  const resolvedMessage = message || t("zone.daXayRaLoiKhiTaiDuLieu");
  return <MuiBox component="div" sx={combineSx(getClassNameSx(`text-center py-5 px-4 border border-danger border-opacity-10 d-flex flex-column align-items-center justify-content-center ${className}`), sx)} className={stripMappedClassNames(`text-center py-5 px-4 border border-danger border-opacity-10 d-flex flex-column align-items-center justify-content-center ${className}`)} style={{
    backgroundColor: 'var(--bg-card)',
    borderRadius: '16px',
    minHeight: '220px',
    ...style
  }}>
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}  style={{
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      backgroundColor: '#fee2e2',
      color: '#ef4444'
    }}>
        <Icon icon="lucide:alert-circle" width="24" height="24" />
      </MuiBox>
      <MuiBox component="h5" sx={{ fontWeight: 600, marginBottom: "0.5rem" }} className="font-display text-main" style={{
      fontSize: '1.05rem'
    }}>{t("profile.daXayRaLoi")}</MuiBox>
      <MuiBox component="p" sx={{ marginBottom: "1rem", textAlign: "center" }} className="text-muted-custom" style={{
      fontSize: '0.8rem',
      maxWidth: '320px',
      lineHeight: '1.5'
    }}>
        {resolvedMessage}
      </MuiBox>
      {onRetry && <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: "1px solid transparent", borderRadius: "0.25rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", paddingLeft: "1rem", paddingRight: "1rem" }} className="btn-dark-solid gap-1.5 py-1.5" onClick={onRetry} style={{
      fontSize: '0.78rem',
      borderRadius: '8px'
    }}>
          <Icon icon="lucide:refresh-cw" width="14" />
          <span>{t("article.thuLai")}</span>
        </MuiBox>}
    </MuiBox>;
}
