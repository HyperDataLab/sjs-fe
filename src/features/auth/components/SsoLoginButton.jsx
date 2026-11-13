import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Icon from '../../../shared/components/Icon';

export default function SsoLoginButton({ onClick, disabled = false }) {
  const { t } = useTranslation();

  return (
    <Button
      type="button"
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      onClick={onClick}
      disabled={disabled}
      startIcon={<Icon icon="lucide:shield-check" width="19" />}
      sx={{ minHeight: 56, borderRadius: 12, fontSize: '1rem', fontWeight: 800 }}
    >
      {t('auth.dangNhapBangSso')}
    </Button>
  );
}
