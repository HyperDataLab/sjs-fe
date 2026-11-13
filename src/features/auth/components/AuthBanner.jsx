import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Icon from '../../../shared/components/Icon';

export default function AuthBanner() {
  const { t } = useTranslation();
  const features = [
    t('auth.mienPhiHoanToanKhongCanThe'),
    t('auth.truyCap200mBaiBaoKhoaHoc'),
    t('auth.theoDoiKeywordVaNhanThongBao'),
    t('auth.taoProjectVaQuanLyJournal'),
  ];

  return (
    <Box component="section" aria-labelledby="auth-banner-title" sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', py: { xs: 1, md: 3 } }}>
      <Box sx={{ maxWidth: 650 }}>
        <Box
          component="span"
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2.5, px: 1.75, py: 0.8, border: '1px solid', borderColor: 'rgba(0, 113, 188, 0.14)', borderRadius: 10, bgcolor: 'primary.light', color: 'primary.main', fontSize: '0.875rem', fontWeight: 700 }}
        >
          <Icon icon="lucide:sparkles" width="17" />
          <span>HyperData Lab · ResearchPulse</span>
        </Box>

        <Typography
          id="auth-banner-title"
          component="h1"
          variant="h1"
          sx={{ maxWidth: 700, mb: 2.5, fontSize: { xs: '2.25rem', sm: '2.75rem', md: 'clamp(2.65rem, 4vw, 3.75rem)' }, color: 'text.primary', textWrap: 'balance' }}
        >
          {t('auth.thamGiaCongDongNghienCuu')}
        </Typography>

        <Typography variant="body1" sx={{ maxWidth: 610, mb: 3.5, color: 'text.secondary', fontSize: { xs: '1rem', md: '1.1rem' } }}>
          {t('auth.cungHangNghinNhaNghienCuuSuDun')}
        </Typography>

        <Stack component="ul" spacing={1.4} sx={{ p: 0, m: 0, listStyle: 'none' }}>
          {features.map((feature) => (
            <Box component="li" key={feature} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.primary' }}>
              <Box sx={{ display: 'grid', placeItems: 'center', width: 26, height: 26, flexShrink: 0, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.main' }}>
                <Icon icon="lucide:check" width="16" />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{feature}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
