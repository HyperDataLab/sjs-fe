import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\auth\components\GenderSelect.jsx
 */
import { Form } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';

export default function GenderSelect({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  disabled = false
}) {
  const {
    t
  } = useTranslation();
  const handleSelect = val => {
    if (disabled) return;
    onChange({
      target: {
        name,
        value: val
      }
    });
  };
  const optionSx = (selected) => [
    getClassNameSx(`gender-option ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''} flex-fill h-100 d-flex align-items-center justify-content-center gap-2 rounded-2 select-none`),
    {
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: selected ? '#ffffff' : 'transparent',
      color: selected ? 'var(--primary)' : 'var(--text-muted)',
      fontWeight: selected ? 600 : 500,
      fontSize: 14,
      border: selected ? '1px solid rgba(0, 113, 188, 0.15)' : '1px solid transparent',
      opacity: disabled ? 0.6 : 1,
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover:not(.disabled):not(.selected)': {
        backgroundColor: 'rgba(0, 113, 188, 0.05)',
        color: 'var(--primary)',
      },
      '&.selected': { boxShadow: '0 2px 6px rgba(0, 113, 188, 0.12)' },
    },
  ];
  return <Form.Group sx={{ marginBottom: "1rem" }} >
      {label && <Form.Label sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="text-xs font-bold mb-1.5" style={{
      letterSpacing: '0.05em',
      color: 'var(--text-main)',
      textTransform: 'uppercase'
    }}>
          {label}
          {required && <MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox>}
        </Form.Label>}

      <MuiBox component="div" sx={{ padding: "0.25rem", borderRadius: "0.5rem", display: "flex", alignItems: "center" }}  style={{
      background: 'var(--bg-chip)',
      border: '1px solid var(--border)',
      width: '100%',
      height: '44px'
    }}>
        {/* Option: Male */}
        <MuiBox component="div" sx={optionSx(value === true)} onClick={() => handleSelect(true)} className={stripMappedClassNames(`gender-option ${value === true ? 'selected' : ''} ${disabled ? 'disabled' : ''} flex-fill h-100 d-flex align-items-center justify-content-center gap-2 rounded-2 select-none`)}>
          <Icon sx={{ opacity: value === true ? 1 : 0, transition: 'opacity 0.2s' }} icon="lucide:check-circle" width="16" />
          <span>{t("auth.nam")}</span>
        </MuiBox>

        {/* Option: Female */}
        <MuiBox component="div" sx={optionSx(value === false)} onClick={() => handleSelect(false)} className={stripMappedClassNames(`gender-option ${value === false ? 'selected' : ''} ${disabled ? 'disabled' : ''} flex-fill h-100 d-flex align-items-center justify-content-center gap-2 rounded-2 select-none`)}>
          <Icon sx={{ opacity: value === false ? 1 : 0, transition: 'opacity 0.2s' }} icon="lucide:check-circle" width="16" />
          <span>{t("auth.nu")}</span>
        </MuiBox>
      </MuiBox>

      {error && <MuiBox component="div" sx={{ color: "error.main", display: "flex", alignItems: "center", gap: "0.25rem", fontWeight: 500 }} className="text-xs mt-1.5 animate-fade-in">
          <Icon icon="lucide:alert-circle" width="12" />
          <span>{error}</span>
        </MuiBox>}

    </Form.Group>;
}
