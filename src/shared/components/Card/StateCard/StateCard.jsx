import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Icon from '../../Icon';

const iconStyles = {
  neutral: { backgroundColor: 'primary.light', color: 'primary.main' },
  info: { backgroundColor: 'primary.light', color: 'primary.main' },
  warning: { backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#b45309' },
  error: { backgroundColor: 'rgba(220, 53, 69, 0.12)', color: 'error.main' },
};

export default function StateCard({
  title,
  description,
  icon,
  variant = 'neutral',
  actions,
  className = '',
  style,
  sx,
}) {
  return (
    <Paper
      component="section"
      variant="outlined"
      className={className}
      style={style}
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          px: 2.5,
          py: 4,
          borderColor: 'divider',
          borderRadius: '18px',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          textAlign: 'center',
          fontFamily: 'inherit',
        },
        sx,
      ]}
    >
      {icon && (
        <Box
          aria-hidden="true"
          sx={[
            {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '50%',
            },
            iconStyles[variant] ?? iconStyles.neutral,
          ]}
        >
          <Icon icon={icon} width="24" />
        </Box>
      )}

      <Typography component="h2" variant="h6" sx={{ lineHeight: 1.3, fontWeight: 700 }}>
        {title}
      </Typography>
      {description && (
        <Typography
          component="p"
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: '34rem', m: 0, lineHeight: 1.6 }}
        >
          {description}
        </Typography>
      )}
      {actions && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mt: 0.25 }}>
          {actions}
        </Box>
      )}
    </Paper>
  );
}
