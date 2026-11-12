
import MuiBox from '@mui/material/Box';

/**
 * UserStatusBadge Component
 * Renders user status with bullet indicators matching Page 3 mockup.
 *
 * @param {Object} props - Props
 * @param {string} props.status - User status: 'Active', 'Inactive', 'Pending'
 */
export default function UserStatusBadge({ status }) {
  // Map color points and font color values for statuses
  const statusConfig = {
    Active: {
      dotColor: 'var(--primary)',
      textColor: 'var(--primary)',
    },
    Inactive: {
      dotColor: 'var(--text-muted)',
      textColor: 'var(--text-muted)',
    },
    Pending: {
      dotColor: 'var(--primary)',
      textColor: 'var(--primary)',
    }
  };

  const config = statusConfig[status] || statusConfig.Pending;

  return (
    <MuiBox component="div" sx={{ display: "inline-flex", alignItems: "center", fontWeight: 500 }} className="text-xs" style={{ fontSize: '0.825rem', color: config.textColor, gap: '8px' }}>
      <MuiBox component="span" sx={{ borderRadius: "50%", display: "inline-block" }}

        style={{
          width: '6px',
          height: '6px',
          backgroundColor: config.dotColor,
        }}
      />
      <span>{status}</span>
    </MuiBox>
  );
}
