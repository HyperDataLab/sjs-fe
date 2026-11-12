import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import Icon from '../../../shared/components/Icon.jsx';

const MotionPaper = motion.create(Paper);

export default function ChartRangeDropdown({ value, onChange }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const options = [
    { label: t('dashboard.5NamGanNhat'), value: '5' },
    { label: t('dashboard.10NamGanNhat'), value: '10' },
    { label: t('dashboard.tatCa'), value: 'all' },
  ];
  const selected = options.find((option) => option.value === value) || options[0];
  const close = () => setAnchorEl(null);
  const select = (nextValue) => {
    onChange(nextValue);
    close();
  };

  return (
    <>
      <Button
        aria-haspopup="menu"
        aria-expanded={Boolean(anchorEl)}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        endIcon={<Icon icon="lucide:chevron-down" width={16} />}
        variant="outlined"
        size="small"
        sx={{
          minHeight: 34,
          px: 1.25,
          borderColor: 'divider',
          borderRadius: 2,
          color: 'text.primary',
          fontSize: '0.75rem',
          fontWeight: 500,
          '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
        }}
      >
        {selected.label}
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { component: MotionPaper, initial: { opacity: 0, y: -5 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -5 } } }}
      >
        <Box sx={{ width: 230, p: 1.5 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="subtitle2" fontWeight={700}>
              {t('dashboard.khoangThoiGian')}
            </Typography>
            <Button
              size="small"
              onClick={() => select('5')}
              sx={{ minWidth: 0, px: 0.5, color: 'text.secondary', fontSize: '0.75rem' }}
            >
              Reset
            </Button>
          </Stack>
          <List disablePadding>
            {options.map((option) => {
              const checked = option.value === value;
              return (
                <ListItemButton
                  key={option.value}
                  selected={checked}
                  onClick={() => select(option.value)}
                  sx={{ minHeight: 36, px: 0.5, gap: 0.75, borderRadius: 1.5 }}
                >
                  <Checkbox checked={checked} size="small" tabIndex={-1} sx={{ p: 0.25 }} />
                  <Typography variant="body2">{option.label}</Typography>
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Popover>
    </>
  );
}
