import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Icon from '../../Icon';
import { formatCount, formatGrowth } from '../../../utils/formatNumber';
import { MotionCard } from '../../ui/MotionBox';

export default function StatCard({
  label,
  value,
  icon,
  accentColor = 'primary.main',
  description,
  trend,
  growth,
  growthLabel,
  loading = false,
  formatValue = true,
  onClick,
  className = '',
  sx,
  ...props
}) {
  const { t } = useTranslation();
  const growthLabelText = growthLabel || t('common.tuanNay');
  const isPositive = growth > 0;
  const isNeutral = growth === 0 || growth == null;
  const renderedValue = formatValue && typeof value === 'number' ? formatCount(value) : value;
  const renderedTrend = trend ?? (growth !== undefined ? (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        color: isNeutral ? 'text.secondary' : isPositive ? 'primary.main' : 'error.main',
      }}
    >
      <Icon icon={isNeutral ? 'lucide:minus' : isPositive ? 'lucide:trending-up' : 'lucide:trending-down'} width="12" />
      <span>{isNeutral ? t('common.khongDoi') : `${formatGrowth(growth)} ${growthLabelText}`}</span>
    </Box>
  ) : null);

  return (
    <MotionCard
      component={onClick ? 'button' : 'article'}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={className}
      whileHover={onClick ? { y: -2 } : undefined}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      sx={[
        {
          width: '100%',
          minHeight: '100%',
          p: 2,
          textAlign: 'left',
          color: 'text.primary',
          fontFamily: 'inherit',
          borderRadius: 2,
          cursor: onClick ? 'pointer' : 'default',
          transition: 'border-color 180ms ease, box-shadow 180ms ease',
          '&:hover': onClick ? {
            borderColor: 'primary.main',
            boxShadow: '0 8px 24px rgba(0, 113, 188, 0.1)',
          } : undefined,
          '&:focus-visible': onClick ? {
            outline: '3px solid',
            outlineColor: 'primary.light',
            outlineOffset: 2,
          } : undefined,
        },
        sx,
      ]}
      {...props}
    >
      {loading ? (
        <Stack spacing={1.25} aria-label="Đang tải thống kê">
          <Skeleton variant="rounded" width={36} height={36} />
          <Skeleton variant="text" width="60%" height={36} />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="50%" />
        </Stack>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, mb: 1.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, lineHeight: 1.35 }}>
              {label}
            </Typography>
            {icon && (
              <Box
                aria-hidden="true"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  flexShrink: 0,
                  borderRadius: 1.5,
                  backgroundColor: 'primary.light',
                  color: accentColor,
                }}
              >
                <Icon icon={icon} width="16" />
              </Box>
            )}
          </Box>

          <Typography variant="h4" sx={{ color: accentColor, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {renderedValue}
          </Typography>

          {(description || renderedTrend) && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, mt: 1.5 }}>
              {description && (
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                  {description}
                </Typography>
              )}
              {renderedTrend && (
                <Typography component="span" variant="caption" sx={{ color: 'primary.main', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {renderedTrend}
                </Typography>
              )}
            </Box>
          )}
        </>
      )}
    </MotionCard>
  );
}
