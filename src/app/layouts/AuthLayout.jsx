import { Box, Button, Container, Paper } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../shared/components/Logo';
import { MotionBox } from '../../shared/components/ui/MotionBox';

export default function AuthLayout({ banner, children }) {
  const { lang = 'vi' } = useParams();
  const { t } = useTranslation();
  const homePath = `/${lang}`;

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default', color: 'text.primary' }}>
      <Box component="header" sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container
          maxWidth={false}
          sx={{ maxWidth: 1360, minHeight: 76, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box
            component={RouterLink}
            to={homePath}
            aria-label="HyperData Lab"
            sx={{ color: 'inherit', textDecoration: 'none', borderRadius: 1, '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main', outlineOffset: 4 } }}
          >
            <Logo size={40} fontSize="1.25rem" />
          </Box>
          <Button component={RouterLink} to={homePath} variant="outlined" sx={{ px: 2.5 }}>
            {t('home')}
          </Button>
        </Container>
      </Box>

      <Container
        component="main"
        maxWidth={false}
        sx={{
          maxWidth: 1360,
          minHeight: 'calc(100dvh - 76px)',
          mx: 'auto',
          px: { xs: 2, sm: 3, lg: 4 },
          py: { xs: 3, md: 5 },
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1.08fr) minmax(400px, 0.92fr)' },
          alignItems: 'center',
          gap: { xs: 4, md: 7 },
        }}
      >
        <Box component="section" sx={{ minWidth: 0 }}>{banner}</Box>
        <Box component="section" sx={{ minWidth: 0, width: '100%', maxWidth: 620, mx: 'auto' }}>
          <MotionBox initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, ease: 'easeOut' }}>
            <Paper
              elevation={0}
              sx={{ p: { xs: 3, sm: 4, md: 5 }, border: '1px solid', borderColor: 'divider', borderRadius: { xs: 3, sm: 3.5 }, boxShadow: '0 20px 52px rgba(18, 55, 82, 0.1)' }}
            >
              {children}
            </Paper>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
