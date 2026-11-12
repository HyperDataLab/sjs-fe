import { useTranslation } from "react-i18next";
import Icon from '../../../shared/components/Icon.jsx';
import { combineSx, getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';

export default function EmptyState({
  icon = 'lucide:info',
  title,
  description,
  className = '',
  style = {},
  sx,
}) {
  const {
    t
  } = useTranslation();
  const resolvedTitle = title || t("topic.khongCoDuLieu");
  const resolvedDescription = description || t("zone.khongTimThayThongTinPhuHop");
  return <MuiBox component="div" sx={combineSx(getClassNameSx(`text-center py-5 px-4 border border-light d-flex flex-column align-items-center justify-content-center ${className}`), sx)} className={stripMappedClassNames(`text-center py-5 px-4 border border-light d-flex flex-column align-items-center justify-content-center ${className}`)} style={{
    backgroundColor: 'var(--bg-card)',
    borderRadius: '16px',
    minHeight: '220px',
    ...style
  }}>
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}  style={{
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      backgroundColor: 'var(--primary-light)',
      color: 'var(--primary)'
    }}>
        <Icon icon={icon} width="24" height="24" />
      </MuiBox>
      <MuiBox component="h5" sx={{ fontWeight: 600, marginBottom: "0.5rem" }} className="font-display text-main" style={{
      fontSize: '1.05rem'
    }}>{resolvedTitle}</MuiBox>
      <MuiBox component="p" sx={{ marginBottom: "0", textAlign: "center" }} className="text-muted-custom" style={{
      fontSize: '0.8rem',
      maxWidth: '320px',
      lineHeight: '1.5'
    }}>
        {resolvedDescription}
      </MuiBox>
    </MuiBox>;
}
