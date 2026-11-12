import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

export default function SsoLoginButton({ onClick, disabled = false }) {
  const { t } = useTranslation();

  return (
    <Button
      type="button"
      variant="light"
      onClick={onClick}
      disabled={disabled}
      className={stripMappedClassNames('w-100 d-flex align-items-center justify-content-center gap-2 py-2.5 rounded-3 border transition-all text-sm font-semibold')}
      sx={{
        ...getClassNameSx('w-100 d-flex align-items-center justify-content-center gap-2 py-2.5 rounded-3 border transition-all text-sm font-semibold'),
        background: 'var(--bg-chip)',
        borderColor: 'var(--border)',
        color: 'var(--text-main)',
        boxShadow: 'none',
        '&:hover': { background: '#fff', borderColor: 'var(--primary)' },
      }}
    >
      <Icon icon="lucide:shield-check" width="18" />
      <span>{t('auth.dangNhapBangSso')}</span>
    </Button>
  );
}
