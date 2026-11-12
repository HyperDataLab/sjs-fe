import { useTranslation } from "react-i18next";
import { Form } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../../shared/components/Icon';
import { HeaderFilterCard } from '../../../../shared/components/Card';
import { SYSTEM_ROLES, ACCOUNT_STATUSES } from '../../../../shared/constants/systemConstants';


import MuiBox from '@mui/material/Box';


/**
 * UserFilterBar Component
 * Renders filter controls for searching and filtering the user directory.
 *
 * @param {Object} props - Props
 * @param {string} props.search - Current search text
 * @param {function} props.onSearchChange - Search input change handler
 * @param {string} props.selectedRole - Selected role filter value
 * @param {function} props.onRoleChange - Role filter dropdown change handler
 * @param {string} props.selectedStatus - Selected status filter value
 * @param {function} props.onStatusChange - Status filter dropdown change handler
 * @param {number} props.totalCount - Total matching users count
 */
export default function UserFilterBar({
  search,
  onSearchChange,
  selectedRole,
  onRoleChange,
  selectedStatus,
  onStatusChange,
  totalCount
}) {
  const {
    t
  } = useTranslation();
  return <HeaderFilterCard title="All Contributors" count={totalCount} singularLabel="User" pluralLabel="Users">
      {/* Search Field */}
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", borderRadius: "0.5rem" }}  style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border)',
      minWidth: '220px'
    }}>
        <Icon icon="lucide:search" width="16" style={{
        color: 'var(--text-muted)'
      }} />
        <MuiBox component="input" sx={{ border: 0, bgcolor: "transparent", width: "100%" }} type="text" placeholder={t("admin.searchByNameemail")} value={search} onChange={e => onSearchChange(e.target.value)} className="text-main" style={{
        outline: 'none',
        fontSize: '0.85rem'
      }} />
      </MuiBox>

      {/* Filter by Role Dropdown */}
      <Form.Select sx={{ display: "block", width: "100%", px: "0.75rem", py: "0.375rem", fontSize: "1rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.5rem" }} size="sm" value={selectedRole} onChange={e => onRoleChange(e.target.value)}  style={{
      width: '130px',
      height: '34px',
      borderColor: 'var(--border)',
      fontSize: '0.85rem',
      cursor: 'pointer'
    }}>
        <option value="all">All Roles</option>
        {SYSTEM_ROLES.map(r => <option key={r.value} value={r.value}>
            {r.label}
          </option>)}
      </Form.Select>

      {/* Lọc theo trạng thái tài khoản - Lấy động từ hằng số hệ thống */}
      <Form.Select sx={{ display: "block", width: "100%", px: "0.75rem", py: "0.375rem", fontSize: "1rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.5rem" }} size="sm" value={selectedStatus} onChange={e => onStatusChange(e.target.value)}  style={{
      width: '130px',
      height: '34px',
      borderColor: 'var(--border)',
      fontSize: '0.85rem',
      cursor: 'pointer'
    }}>
        <option value="all">All Statuses</option>
        {ACCOUNT_STATUSES.map(status => <option key={status.value} value={status.value}>
            {status.value}
          </option>)}
      </Form.Select>

      {/* Clear Filters indicator */}
      {(search || selectedRole !== 'all' || selectedStatus !== 'all') && <MuiBox component="button" sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", bgcolor: "transparent", color: "primary.main", padding: "0", gap: "0.25rem" }} type="button" onClick={() => {
      onSearchChange('');
      onRoleChange('all');
      onStatusChange('all');
    }} className="text-muted-custom hover-primary" style={{
      fontSize: '0.85rem'
    }}>
          <Icon icon="lucide:x-circle" width="16" />
          <span>Reset</span>
        </MuiBox>}
    </HeaderFilterCard>;
}
