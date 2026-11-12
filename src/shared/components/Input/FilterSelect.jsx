import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function FilterSelect({
  value,
  onChange,
  options = [],
  disabled = false,
  className = '',
  style = {},
  sx,
  ...props
}) {
  return (
    <FormControl size="small" disabled={disabled} sx={{ minWidth: 0 }}>
      <Select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={className}
        style={style}
        sx={[
          {
            minHeight: 30,
            borderRadius: '8px',
            color: 'text.secondary',
            fontSize: '0.875rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
            '& .MuiSelect-select': { py: 0.5, pl: 1.5, pr: 4 },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'divider', borderWidth: 1 },
            '&.Mui-disabled': { opacity: 0.65 },
          },
          sx,
        ]}
        {...props}
      >
        {options.map((option, index) => (
          <MenuItem key={option.value || index} value={option.value} title={option.title || option.label}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
