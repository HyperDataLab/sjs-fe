import { Card } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';


/**
 * UploadFeatureCard Component
 * Displays a feature highlight badge card used below upload file zone.
 *
 * @param {Object} props - Props
 * @param {string} props.title - Feature title
 * @param {string} props.description - Feature details text
 * @param {string} props.icon - Heroicons bridge name
 */
export default function UploadFeatureCard({ title, description, icon }) {
  return (
    <Card sx={{ padding: "1rem", border: "1px solid #dee2e6", borderRadius: "0.5rem", bgcolor: "background.paper", height: "100%" }}

      style={{ boxShadow: 'none' }}
    >
      <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }} >
        {/* Bullet Icon indicator */}
        <MuiBox component="div" sx={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}

          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)'
          }}
        >
          <Icon icon={icon} width="16" />
        </MuiBox>

        {/* Feature title & description details */}
        <div>
          <MuiBox component="h6" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="text-main" style={{ fontSize: '0.88rem' }}>{title}</MuiBox>
          <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0", lineHeight: 1.25 }} className="text-muted-custom" style={{ fontSize: '0.78rem' }}>
            {description}
          </MuiBox>
        </div>
      </MuiBox>
    </Card>
  );
}
