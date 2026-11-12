import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Icon from '../Icon.jsx';

export default function FilterSearch({
  value,
  onChange,
  initialValue,
  onSearchChange,
  placeholder,
  className = '',
  actionButton = null,
  style = {},
  sx,
}) {
  const { t } = useTranslation();
  const resolvedPlaceholder = placeholder || t('common.timKiem');
  const isControlled = value !== undefined;
  const [internalVal, setInternalVal] = useState(initialValue || '');

  useEffect(() => {
    if (!isControlled && initialValue !== undefined) {
      setInternalVal(initialValue);
    }
  }, [initialValue, isControlled]);

  const onSearchChangeRef = useRef(onSearchChange);
  useEffect(() => {
    onSearchChangeRef.current = onSearchChange;
  }, [onSearchChange]);

  useEffect(() => {
    if (isControlled) return undefined;
    const timer = setTimeout(() => {
      onSearchChangeRef.current?.(internalVal);
    }, 400);
    return () => clearTimeout(timer);
  }, [internalVal, isControlled]);

  const handleChange = (event) => {
    if (isControlled) {
      onChange?.(event);
    } else {
      setInternalVal(event.target.value);
    }
  };

  const handleClear = () => {
    if (isControlled) {
      onChange?.({ target: { value: '' } });
    } else {
      setInternalVal('');
    }
  };

  const displayValue = isControlled ? value : internalVal;

  return (
    <Box
      className={className}
      style={style}
      sx={[
        {
          display: 'flex',
          alignItems: 'stretch',
          width: '100%',
          minHeight: 44,
          overflow: 'hidden',
          border: 1,
          borderColor: 'divider',
          borderRadius: 999,
          backgroundColor: 'background.paper',
          transition: 'border-color 180ms ease',
          '&:focus-within': { borderColor: 'text.disabled' },
          '& .MuiInputBase-root': { flex: '1 1 auto', minWidth: 0 },
          '& .MuiInputBase-input': {
            width: '100%',
            minWidth: 0,
            px: 0.25,
            py: 1,
            color: 'text.primary',
            fontFamily: 'inherit',
            fontSize: '0.92rem',
            '&::placeholder': { color: 'text.secondary', opacity: 1 },
          },
        },
        sx,
      ]}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 1.5, color: 'text.secondary' }}>
        <Icon icon="lucide:search" width="18" height="18" />
      </Box>

      <InputBase
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={resolvedPlaceholder}
        inputProps={{ 'aria-label': resolvedPlaceholder }}
      />

      {displayValue && (
        <IconButton
          type="button"
          aria-label={t('common.xoaTimKiem')}
          title={t('common.xoaTimKiem')}
          onClick={handleClear}
          size="small"
          sx={{ px: 1.5, color: 'text.secondary', '&:hover': { color: 'text.primary', backgroundColor: 'transparent' } }}
        >
          <Icon icon="lucide:x" width="16" height="16" />
        </IconButton>
      )}

      {actionButton && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            '& button': { minHeight: '100%', m: 0, borderRadius: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0 },
          }}
        >
          {actionButton}
        </Box>
      )}
    </Box>
  );
}
