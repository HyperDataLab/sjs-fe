import { Card } from '@/shared/components/ui/muiAdapters';
import PrimaryButton from '../../../../shared/components/Button/PrimaryButton';


import MuiBox from '@mui/material/Box';


/**
 * PendingRequestCard Component
 * Displays a single authorization upgrade or role request.
 *
 * @param {Object} props - Props
 * @param {Object} props.request - The request item object
 * @param {function} props.onApprove - Callback for approval action
 * @param {function} props.onDecline - Callback for declination action
 */
export default function PendingRequestCard({ request, onApprove, onDecline }) {
  const { id, name, roleRequested, institution } = request;

  // Extract initials for mock avatar circle
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card sx={{ padding: "1rem", marginBottom: "1rem", border: "1px solid #dee2e6", borderRadius: "0.5rem", bgcolor: "background.paper" }}

      style={{ boxShadow: 'none', transition: 'border-color 0.2s' }}
    >
      {/* Card Header section: Initials Avatar + Info metadata */}
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} className="mb-2.5">
        {/* Mock Circle Avatar with initials */}
        <MuiBox component="div" sx={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}

          style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#e0f2fe',
            color: '#0369a1',
            fontSize: '0.9rem'
          }}
        >
          {initials}
        </MuiBox>
        <MuiBox component="div" sx={{ overflow: "hidden" }} >
          <MuiBox component="div" sx={{ fontWeight: 700, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-main" style={{ fontSize: '0.88rem' }}>{name}</MuiBox>
          <MuiBox component="div" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-muted-custom" style={{ fontSize: '0.72rem', letterSpacing: '0.02em' }}>{institution}</MuiBox>
        </MuiBox>
      </MuiBox>

      {/* Description payload */}
      <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "1rem", lineHeight: 1.25 }} className="text-muted-custom">
        Requesting <strong className="text-main">{roleRequested}</strong> role for the Platform.
      </MuiBox>

      {/* Action buttons */}
      <MuiBox component="div" sx={{ display: "flex", gap: "0.5rem" }} >
        <PrimaryButton sx={{ flexGrow: 1 }}
          onClick={() => onApprove(id)}
          className="py-1.5 text-xs"
          style={{ fontSize: '0.8rem' }}
        >
          Approve
        </PrimaryButton>
        <PrimaryButton sx={{ flexGrow: 1 }}
          onClick={() => onDecline(id)}
          variant="outline"
          className="py-1.5 text-xs"
          style={{ fontSize: '0.8rem' }}
        >
          Decline
        </PrimaryButton>
      </MuiBox>
    </Card>
  );
}
