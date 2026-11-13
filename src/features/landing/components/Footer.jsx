import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Logo from '../../../shared/components/Logo';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const links = [
    { labelKey: 'footerAbout', href: '#' },
    { labelKey: 'footerTerms', href: '#' },
    { labelKey: 'footerPrivacy', href: '#' },
    { labelKey: 'footerContact', href: '#' },
  ];

  return (
    <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' }, justifyContent: 'space-between', gap: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, gap: 1 }}>
            <Logo size={38} fontSize="1.2rem" />
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, textAlign: { xs: 'center', md: 'left' } }}>
              {t('footerDesc')}
            </Typography>
          </Box>

          <Box component="nav" aria-label={t('home')} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 1.5, sm: 2.5 } }}>
            {links.map((link) => (
              <Box
                component="a"
                key={link.labelKey}
                href={link.href}
                sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 180ms ease', '&:hover': { color: 'primary.main' }, '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main', outlineOffset: 3 } }}
              >
                {t(link.labelKey)}
              </Box>
            ))}
          </Box>
        </Box>

        <Typography component="p" variant="caption" color="text.secondary" sx={{ mt: 3, pt: 2, mb: 0, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
          © {currentYear} HyperData Lab · ResearchPulse. {t('footerRights')}
        </Typography>
      </Container>
    </Box>
  );
}
