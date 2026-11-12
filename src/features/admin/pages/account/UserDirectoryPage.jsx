import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useEffect, useState } from 'react';
import { Row, Col, Card, ProgressBar } from '@/shared/components/ui/muiAdapters';
import Pagination from '../../../../shared/components/Pagination';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../../shared/components/Icon';
import PrimaryButton from '../../../../shared/components/Button/PrimaryButton';
import UserTable from '../../components/account/UserTable';
import UserFilterBar from '../../components/account/UserFilterBar';
import { getAdminUsers } from '../../api/adminUsers.api';
import ROUTES from '../../../../app/routes/routePaths';


import MuiBox from '@mui/material/Box';

const ITEMS_PER_PAGE = 10;
const getApiErrorMessage = error => {
  if (error.response?.status === 403) {
    return t("admin.backendTuChoiQuyenAdminTokenHi");
  }
  return error.response?.data?.message || t("admin.khongTheTaiDanhSachNguoiDung");
};
const extractUsers = payload => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.rows)) return payload.rows;
  if (Array.isArray(payload?.users)) return payload.users;
  return [];
};
const extractTotal = (payload, fallback) => {
  return Number(payload?.total || payload?.totalItems || payload?.pagination?.total || payload?.meta?.total || fallback);
};
const ROLE_LABELS = {
  RESEARCHER: 'Researcher',
  LECTURER: 'Lecturer',
  STUDENT: 'Student',
  ADMINISTRATOR: 'Administrator'
};
const toRoleLabel = (role = 'RESEARCHER') => ROLE_LABELS[role] || role;
const toTitleCaseEnum = (value = '') => {
  return String(value).toLowerCase().split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
};
const normalizeUser = (user = {}) => {
  const firstName = user.first_name || user.firstName || '';
  const lastName = user.last_name || user.lastName || '';
  const fullName = user.name || [firstName, lastName].filter(Boolean).join(' ').trim();
  return {
    id: user.id || user.user_id || user.uuid,
    name: fullName || user.email || 'Unnamed user',
    email: user.email || 'No email',
    role: user.role || 'RESEARCHER',
    roleLabel: toRoleLabel(user.role || 'RESEARCHER'),
    status: toTitleCaseEnum(user.status || 'INACTIVE'),
    avatar: user.avatar || user.avatar_url || ''
  };
};

/**
 * UserDirectoryPage Component
 * Renders the administrator's account directory page with real admin users API data.
 */
export default function UserDirectoryPage() {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();

  // Search and filter states
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getAdminUsers({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          search: search || undefined,
          role: selectedRole === 'all' ? undefined : selectedRole,
          status: selectedStatus === 'all' ? undefined : selectedStatus.toUpperCase(),
          sortBy: 'email',
          sortOrder: 'asc'
        });
        const payload = response.data?.data;
        const rawUsers = extractUsers(payload);
        if (!isMounted) return;
        setUsers(rawUsers.map(normalizeUser));
        setTotalItems(extractTotal(response.data, rawUsers.length));
      } catch (apiError) {
        if (!isMounted) return;
        setUsers([]);
        setTotalItems(0);
        setError(getApiErrorMessage(apiError));
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, [currentPage, search, selectedRole, selectedStatus]);

  /**
   * Pagination is API-driven, so changing page triggers a fresh request.
   */
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };
  const handleFilterChange = setter => value => {
    setter(value);
    setCurrentPage(1);
  };
  const handleUnavailableDelete = () => {
    alert(t("admin.beHienChuaCoApiXoaUserCanBoSun"));
  };
  return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} >
      {/* Page Breadcrumbs */}
      <MuiBox component="nav" sx={{ marginBottom: "1rem" }} aria-label="breadcrumb" >
        <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "0", listStyle: "none", fontSize: "0.875em" }} className="text-muted-custom">
          <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} >Management</MuiBox>
          <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} className="active" aria-current="page">User Directory</MuiBox>
        </MuiBox>
      </MuiBox>

      {/* Main Header title & actions section */}
      <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:768px)": { flexDirection: "row", alignItems: "flex-start" }, justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }} >
        <div>
          <MuiBox component="h1" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display text-main" style={{
          fontSize: '1.8rem'
        }}>User Directory</MuiBox>
          <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom" style={{
          maxWidth: '680px'
        }}>
            Manage platform contributors, their access levels, and account status within the ResearchPulse ecosystem.
          </MuiBox>
        </div>

        {/* Submit New Account button (leads to Page 17) - Sử dụng hằng số định tuyến */}
        <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} onClick={() => navigate(ROUTES.ADMIN_USERS_CREATE)} icon="lucide:plus-circle"  style={{
        fontSize: '0.88rem'
      }}>
          <span>Submit New Account</span>
        </PrimaryButton>
      </MuiBox>

      <Row sx={{ gap: "1.5rem" }} >
        {/* Left column: User filter bar and User Table */}
        <Col sx={{ "@media (min-width:992px)": { gridColumn: "span 8" } }} xs={12} lg={8.5} >
          <Card sx={{ padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #dee2e6", bgcolor: "background.paper", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)" }} >
            {/* Filter controls */}
            <UserFilterBar search={search} onSearchChange={handleFilterChange(setSearch)} selectedRole={selectedRole} onRoleChange={handleFilterChange(setSelectedRole)} selectedStatus={selectedStatus} onStatusChange={handleFilterChange(setSelectedStatus)} totalCount={totalItems} />

            {loading ? <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem", fontSize: "0.875em" }} className="text-muted-custom">{t("admin.dangTaiDanhSachNguoiDung")}</MuiBox> : error ? <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem", border: "1px solid #dee2e6", borderRadius: "0.5rem", bgcolor: "background.paper" }} >
                <Icon sx={{ color: "error.main", marginBottom: "0.5rem", opacity: 0.75 }} icon="lucide:shield-alert" width="48"  />
                <MuiBox component="h6" sx={{ fontWeight: 700 }} className="text-main">{t("admin.khongTheTaiNguoiDung")}</MuiBox>
                <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">{error}</MuiBox>
              </MuiBox> : <UserTable users={users} onEdit={id => navigate(ROUTES.ADMIN_USERS_EDIT.replace(':id', id))} onDelete={handleUnavailableDelete} />}

            {/* Pagination Controls */}
            {!loading && !error && totalItems > 0 && <MuiBox component="div" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem", paddingTop: "0.5rem" }} >
                <Pagination totalItems={totalItems} currentPage={currentPage} limit={ITEMS_PER_PAGE} onPageChange={handlePageChange} entityName="users" />
              </MuiBox>}
          </Card>
        </Col>

        {/* Right column: Access Control and Pending Requests widgets */}
        <Col sx={{ "@media (min-width:992px)": { gridColumn: "span 4" }, display: "flex", flexDirection: "column", gap: "1.5rem" }} xs={12} lg={3.5} >
          {/* Access Control Information box */}
          <Card sx={{ padding: "1.5rem", borderRadius: "0.75rem", border: 0, color: "#fff" }}  style={{
          background: 'linear-gradient(135deg, #ff7a33 0%, #ea580c 100%)',
          boxShadow: '0 4px 20px rgba(234, 88, 12, 0.15)'
        }}>
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="mb-2.5">
              <Icon sx={{ color: "#fff" }} icon="lucide:shield-check" width="22"  />
              <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "0" }}  style={{
              fontSize: '1.05rem',
              letterSpacing: '-0.01em'
            }}>Access Control</MuiBox>
            </MuiBox>
            <MuiBox component="p" sx={{ marginBottom: "1.5rem", color: "rgba(255,255,255,.5)", fontSize: "0.875em", lineHeight: 1.25 }} >
              Review system permissions and security logs for auditing purposes. Maintain strict compliance across all journal volumes.
            </MuiBox>
            <MuiBox component="a" sx={{ color: "#fff", fontWeight: 600, fontSize: "0.875em", textDecoration: "none", display: "flex", alignItems: "center" }} href="#security" onClick={e => {
            e.preventDefault();
            alert('Redirecting to Security Logs Overview...');
          }} className="gap-1.5 hover-white-glow">
              <span>Security Overview</span>
              <Icon icon="lucide:arrow-right" width="16" />
            </MuiBox>
          </Card>

          {/* Pending Requests Sidebar Widget */}
          <Card sx={{ padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #dee2e6", bgcolor: "background.paper", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)" }} >
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="mb-3.5">
              <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
                <MuiBox component="h6" sx={{ fontWeight: 700, marginBottom: "0" }} className="text-main" style={{
                fontSize: '0.925rem'
              }}>PENDING REQUESTS</MuiBox>
              </MuiBox>
            </MuiBox>

            <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "1.5rem", fontSize: "0.875em" }} className="text-muted-custom">
              <Icon sx={{ marginBottom: "0.5rem", opacity: 0.5 }} icon="lucide:check-circle-2" width="32" className="admin-accent-text" />
              <MuiBox component="p" sx={{ marginBottom: "0.25rem" }} >{t("admin.chuaCoApiPendingRoleRequests")}</MuiBox>
              <MuiBox component="p" sx={{ marginBottom: "0" }} >{t("admin.daXoaDuLieuMockKhoiKhuVucNay")}</MuiBox>
            </MuiBox>
          </Card>

          {/* Platform Health indicators widget */}
          <Card sx={{ padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #dee2e6", bgcolor: "background.paper", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)" }} >
            <MuiBox component="h6" sx={{ fontWeight: 700, marginBottom: "1rem", textTransform: "uppercase" }} className="text-main tracking-wider" style={{
            fontSize: '0.78rem'
          }}>
              Platform Health
            </MuiBox>

            {/* Storage indicator */}
            <div className="mb-3.5">
              <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.875em" }} className="text-muted-custom mb-1.5" style={{
              fontSize: '0.825rem'
            }}>
                <span>Storage Capacity</span>
                <MuiBox component="strong" sx={{ fontWeight: 600 }} className="text-main">N/A</MuiBox>
              </MuiBox>
              <ProgressBar now={0} variant="warning" style={{
              height: '5px'
            }} />
            </div>

            {/* Active Authors indicator */}
            <div>
              <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.875em" }} className="text-muted-custom mb-1.5" style={{
              fontSize: '0.825rem'
            }}>
                <span>Active Authors</span>
                <MuiBox component="strong" sx={{ fontWeight: 600 }} className="text-main">N/A</MuiBox>
              </MuiBox>
              <ProgressBar now={0} sx={{ height: 5, bgcolor: '#e2e8f0', '& .MuiLinearProgress-bar': { bgcolor: 'var(--btn-dark)' } }} />
            </div>
          </Card>
        </Col>
      </Row>
    </MuiBox>;
}
