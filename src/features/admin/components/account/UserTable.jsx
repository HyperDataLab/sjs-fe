import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { Table } from '@/shared/components/ui/muiAdapters';
import RoleBadge from './RoleBadge';
import UserStatusBadge from './UserStatusBadge';
import Icon from '../../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';


/**
 * UserTable Component
 * Renders the users list in a structured table.
 *
 * @param {Object} props - Props
 * @param {Array} props.users - List of user objects
 * @param {function} props.onEdit - Edit action handler: (userId) => void
 * @param {function} props.onDelete - Delete action handler: (userId) => void
 */
export default function UserTable({
  users = [],
  onEdit,
  onDelete
}) {
  const { t: _t } = useTranslation();
  if (users.length === 0) {
    return <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem", border: "1px solid #dee2e6", borderRadius: "0.5rem", bgcolor: "background.paper" }} >
        <Icon sx={{ color: "text.secondary", marginBottom: "0.5rem", opacity: 0.5 }} icon="lucide:users" width="48"  />
        <MuiBox component="h6" sx={{ fontWeight: 700 }} className="text-main">No Users Found</MuiBox>
        <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">Try adjusting your search query or role/status filters.</MuiBox>
      </MuiBox>;
  }
  return <MuiBox component="div" sx={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch", bgcolor: "background.paper", borderRadius: "0.5rem", border: "1px solid #dee2e6" }} >
      <Table sx={{ verticalAlign: "middle", marginBottom: "0" }}  hover style={{
      borderCollapse: 'collapse'
    }}>
        {/* Table Header */}
        <MuiBox component="thead" sx={{ borderBottom: "1px solid #dee2e6" }} className="text-muted-custom" style={{
        fontSize: '0.75rem',
        letterSpacing: '0.05em'
      }}>
          <tr>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", fontWeight: 700, textTransform: "uppercase" }}  style={{
            width: '45%',
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>User Profile</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "1rem", paddingRight: "1rem", fontWeight: 700, textTransform: "uppercase" }}  style={{
            width: '20%',
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>Role</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "1rem", paddingRight: "1rem", fontWeight: 700, textTransform: "uppercase" }}  style={{
            width: '15%',
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>Status</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", fontWeight: 700, textTransform: "uppercase", textAlign: "right" }}  style={{
            width: '20%',
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>Actions</MuiBox>
          </tr>
        </MuiBox>

        {/* Table Body */}
        <tbody>
          {users.map(user => <MuiBox component="tr" sx={{ borderBottom: "1px solid #dee2e6" }} key={user.id} className="hover-row" style={{
          height: '70px'
        }}>
              {/* Profile details column */}
              <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }} >
                <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} >
                  {/* User profile picture */}
                  <MuiBox component="div" sx={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontWeight: 700 }}  style={{
                width: '42px',
                height: '42px',
                background: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)',
                fontSize: '0.95rem',
                boxShadow: '0 8px 18px rgba(234, 88, 12, 0.14)'
              }} aria-label={`Avatar chữ cái đầu của ${user.name || user.email || t("admin.nguoiDung")}`}>
                    {String(user.name || user.email || 'U').trim().charAt(0).toUpperCase() || 'U'}
                  </MuiBox>
                  <div>
                    <MuiBox component="div" sx={{ fontWeight: 700 }} className="text-main" style={{
                  fontSize: '0.9rem'
                }}>{user.name}</MuiBox>
                    <div className="text-muted-custom" style={{
                  fontSize: '0.78rem'
                }}>{user.email}</div>
                  </div>
                </MuiBox>
              </MuiBox>

              {/* Role badge column */}
              <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "1rem", paddingRight: "1rem" }} >
                <RoleBadge role={user.role} />
              </MuiBox>

              {/* Status bullet column */}
              <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "1rem", paddingRight: "1rem" }} >
                <UserStatusBadge status={user.status} />
              </MuiBox>

              {/* Action operations column */}
              <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", textAlign: "right" }} >
                <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} className="gap-2.5">
                  {/* Edit action */}
                  <MuiBox component="button" sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "50%", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", bgcolor: "transparent", color: "primary.main", padding: "0.25rem" }} type="button" onClick={() => onEdit?.(user.id)} className="text-muted-custom hover-primary" style={{
                width: '32px',
                height: '32px',
                transition: 'all 0.2s'
              }} title="Edit User">
                    <Icon icon="lucide:edit-2" width="16" />
                  </MuiBox>

                  {/* Delete action */}
                  <MuiBox component="button" sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "50%", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", bgcolor: "transparent", color: "primary.main", padding: "0.25rem" }} type="button" onClick={() => {
                if (window.confirm(`Are you sure you want to delete contributor "${user.name}"?`)) {
                  onDelete?.(user.id);
                }
              }} className="text-muted-custom hover-danger" style={{
                width: '32px',
                height: '32px',
                transition: 'all 0.2s'
              }} title="Delete User">
                    <Icon icon="lucide:trash-2" width="16" />
                  </MuiBox>
                </MuiBox>
              </MuiBox>
            </MuiBox>)}
        </tbody>
      </Table>
    </MuiBox>;
}
