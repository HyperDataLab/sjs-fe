import { useTranslation } from "react-i18next";
import { Form, Row, Col } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


export default function RoleSelect({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  disabled = false
}) {
  const { t } = useTranslation();

  const roles = [
    {
      key: 'STUDENT',
      label: t("auth.sinhVien"),
      desc: t("auth.dangDiHoc"),
      icon: 'lucide:graduation-cap'
    },
    {
      key: 'LECTURER',
      label: t("auth.giangVien"),
      desc: t("auth.dangGiangDay"),
      icon: 'lucide:user-check'
    },
    {
      key: 'RESEARCHER',
      label: t("auth.nhaNghienCuu"),
      desc: t("auth.dangLamViec"),
      icon: 'lucide:flask-conical'
    }
  ];

  const handleSelect = roleKey => {
    if (disabled) return;
    onChange({
      target: {
        name,
        value: roleKey
      }
    });
  };

  return <Form.Group sx={{ marginBottom: "1.5rem" }} >
      {label && <Form.Label sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="text-xs font-bold mb-1.5" style={{
      letterSpacing: '0.05em',
      color: 'var(--text-main)',
      textTransform: 'uppercase'
    }}>
          {label}
          {required && <MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox>}
        </Form.Label>}

      <Row sx={{ gap: "1rem" }} >
        {roles.map(role => {
        const isSelected = value === role.key;
        return <Col key={role.key} xs={4}>
              <MuiBox component="div" sx={[
                getClassNameSx(`role-card-item ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''} w-100 p-3 rounded-3 text-center d-flex flex-column align-items-center justify-content-center gap-2 select-none`),
                {
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  background: '#ffffff',
                  border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border)',
                  opacity: disabled ? 0.6 : 1,
                  minHeight: 110,
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover:not(.disabled):not(.selected)': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(255, 122, 51, 0.08)',
                  },
                  '&.selected': { borderColor: 'primary.main', boxShadow: '0 0 0 3px rgba(255, 122, 51, 0.15)' },
                  '&.selected .icon-container': { transform: 'scale(1.08)', color: 'primary.main' },
                },
              ]} onClick={() => handleSelect(role.key)} className={stripMappedClassNames(`role-card-item ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''} w-100 p-3 rounded-3 text-center d-flex flex-column align-items-center justify-content-center gap-2 select-none`)}>
                <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", width: 32, height: 32, color: isSelected ? 'primary.main' : 'text.secondary', transition: 'all 0.2s' }} className="icon-container">
                  <Icon icon={role.icon} width="22" />
                </MuiBox>
                <MuiBox component="div">
                  <MuiBox component="div" className="font-semibold title" sx={{ fontSize: 13, color: 'text.primary', fontWeight: isSelected ? 700 : 600 }}>
                    {role.label}
                  </MuiBox>
                  <MuiBox component="div" sx={{ fontSize: 10, color: 'text.secondary', mt: '2px' }}>
                    {role.desc}
                  </MuiBox>
                </MuiBox>
              </MuiBox>
            </Col>;
      })}
      </Row>

      {error && <MuiBox component="div" sx={{ color: "error.main", display: "flex", alignItems: "center", gap: "0.25rem", fontWeight: 500 }} className="text-xs mt-1.5 animate-fade-in">
          <Icon icon="lucide:alert-circle" width="12" />
          <span>{error}</span>
        </MuiBox>}

    </Form.Group>;
}
