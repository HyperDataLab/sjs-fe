/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\auth\components\FormErrorMessage.jsx
 */
import { Alert } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';



export default function FormErrorMessage({ message }) {
  if (!message) return null;

  return (
    <Alert sx={{ display: "flex", alignItems: "center", gap: "1rem", paddingLeft: "1rem", paddingRight: "1rem", border: 0, borderRadius: "0.5rem", marginBottom: "1.5rem" }}
      variant="danger"
      className="py-2.5 animate-fade-in"
      style={{
        background: 'rgba(239, 68, 68, 0.15)',
        color: '#fca5a5',
        fontSize: '13px',
        fontWeight: 500
      }}
    >
      <Icon sx={{ color: "error.main", flexShrink: 0 }} icon="lucide:alert-triangle" width="18"  />
      <div>{message}</div>
    </Alert>
  );
}
