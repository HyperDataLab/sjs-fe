/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\auth\components\PasswordInput.jsx
 */
import { useState } from 'react';
import { Form, InputGroup } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';


export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group sx={{ marginBottom: "1rem" }} >
      {label && (
        <Form.Label sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          className="text-xs font-bold mb-1.5"
          style={{
            letterSpacing: '0.05em',
            color: 'var(--text-main)',
            textTransform: 'uppercase'
          }}
        >
          {label}
          {required && <MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox>}
        </Form.Label>
      )}

      <InputGroup sx={{ borderRadius: "0.5rem", overflow: "hidden", border: "1px solid #dee2e6" }}

        style={{
          borderColor: error ? '#ef4444' : (isFocused ? 'var(--primary)' : 'var(--border)'),
          background: '#ffffff',
          transition: 'all 0.2s ease-in-out',
          boxShadow: error
            ? '0 0 0 3px rgba(239, 68, 68, 0.12)'
            : (isFocused ? '0 0 0 3px rgba(0, 113, 188, 0.15)' : '0 1px 2px rgba(0, 0, 0, 0.02)')
        }}
      >
        <InputGroup.Text sx={{ bgcolor: "transparent", border: 0, paddingInlineEnd: "0.25rem", display: "flex", alignItems: "center", justifyContent: "center" }}
          className="text-muted-custom"
          style={{ width: '40px' }}
        >
          <Icon icon="lucide:lock" width="18" className="text-muted-custom opacity-70" />
        </InputGroup.Text>

        <Form.Control sx={{ bgcolor: "transparent", border: 0, paddingInlineStart: "0.5rem" }}
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="text-main text-sm py-2.5"
          style={{
            boxShadow: 'none',
            outline: 'none',
            color: 'var(--text-main)'
          }}
          {...props}
        />

        <InputGroup.Text sx={{ bgcolor: "transparent", border: 0, paddingInlineStart: "0.25rem", display: "flex", alignItems: "center", justifyContent: "center" }}

          style={{ width: '40px', cursor: 'pointer' }}
          onClick={togglePasswordVisibility}
        >
          <Icon
            icon={showPassword ? 'lucide:eye-off' : 'lucide:eye'}
            width="18"
            className="text-muted-custom opacity-70 hover:opacity-100 transition-opacity"
          />
        </InputGroup.Text>
      </InputGroup>

      {error && (
        <MuiBox component="div" sx={{ color: "error.main", display: "flex", alignItems: "center", gap: "0.25rem" }}
          className="text-xs mt-1.5 animate-fade-in"
          style={{ fontWeight: 500 }}
        >
          <Icon icon="lucide:alert-circle" width="12" />
          <span>{error}</span>
        </MuiBox>
      )}
    </Form.Group>
  );
}
