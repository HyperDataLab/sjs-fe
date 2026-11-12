/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\auth\components\CheckboxField.jsx
 */
import { Form } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';


export default function CheckboxField({
  name,
  checked,
  onChange,
  error,
  disabled = false,
  labelMarkup
}) {
  return (
    <Form.Group sx={{ marginBottom: "1.5rem" }} >
      <MuiBox component="div" sx={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }} >
        <Form.Check
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          id={`checkbox-${name}`}
          className="mt-0.5"
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            borderColor: error ? '#ef4444' : 'var(--border)',
          }}
        />
        <Form.Label sx={{ marginBottom: "0" }}
          htmlFor={`checkbox-${name}`}
          className="text-muted-custom text-xs font-normal select-none"
          style={{ cursor: disabled ? 'not-allowed' : 'pointer', lineHeight: '1.4' }}
        >
          {labelMarkup}
        </Form.Label>
      </MuiBox>

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
