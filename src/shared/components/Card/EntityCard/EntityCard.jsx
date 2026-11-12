import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function EntityCard({
  title,
  subtitle,
  description,
  media,
  meta,
  actions,
  footer,
  onClick,
  className = '',
  bodyClassName = '',
  contentClassName = '',
  sx,
  ...props
}) {
  return (
    <Card
      component={onClick ? 'button' : 'article'}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={className}
      sx={[
        {
          width: '100%',
          p: 2,
          color: 'text.primary',
          textAlign: 'left',
          fontFamily: 'inherit',
          cursor: onClick ? 'pointer' : 'default',
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
      <Box
        className={bodyClassName}
        sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, '@media (max-width:575.98px)': { flexDirection: 'column' } }}
      >
        {media && <Box sx={{ flexShrink: 0 }}>{media}</Box>}

        <Box className={contentClassName} sx={{ minWidth: 0, flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, '@media (max-width:575.98px)': { flexDirection: 'column' } }}>
            <Box sx={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
              <Typography
                component="h3"
                variant="subtitle1"
                title={typeof title === 'string' ? title : undefined}
                sx={{ color: 'text.primary', fontWeight: 700, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography component="p" variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 0, lineHeight: 1.4 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
            {actions && <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>{actions}</Box>}
          </Box>

          {description && (
            <Typography component="div" variant="body2" color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.55 }}>
              {description}
            </Typography>
          )}
          {meta && <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>{meta}</Box>}
        </Box>
      </Box>

      {footer && <Box sx={{ mt: 2, pt: 1.75, borderTop: 1, borderColor: 'divider' }}>{footer}</Box>}
    </Card>
  );
}
