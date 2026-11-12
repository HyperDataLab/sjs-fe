import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function HeaderFilterCard({
  title,
  count,
  singularLabel = 'Item',
  pluralLabel = 'Items',
  children,
  className = '',
  sx,
}) {
  const hasCount = count !== undefined && count !== null;
  const label = Number(count) === 1 ? singularLabel : pluralLabel;

  return (
    <Stack
      className={className}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'stretch', md: 'center' }}
      justifyContent="space-between"
      spacing={1.5}
      sx={[{ mb: 3, pb: 2, borderBottom: 1, borderColor: 'divider' }, sx]}
    >
      <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={1.5}>
        <Typography component="h2" variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {hasCount && <Chip label={`${count} ${label}`} color="primary" size="small" />}
      </Stack>

      {children && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.25 }}>
          {children}
        </Box>
      )}
    </Stack>
  );
}
