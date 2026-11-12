import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../../shared/components/Icon.jsx';
import { Dropdown } from '@/shared/components/ui/muiAdapters';
import { useAuthStore } from '../../../app/store/authStore';
import { useUserStore } from '../../../app/store/userStore';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';


import MuiBox from '@mui/material/Box';


const ProjectMembersList = ({
  project,
  members,
  loading,
  onInviteClick,
  onChangeRole,
  onRemoveMember,
  actionLoading,
  currentUser
}) => {
  const { t } = useTranslation();

  const getRoleBadgeColor = (role) => {
    switch (role?.toUpperCase()) {
      case 'OWNER': return { bg: '#fee2e2', color: '#dc2626' }; // red
      case 'ADMIN': return { bg: '#e0e7ff', color: '#4f46e5' }; // indigo
      case 'MEMBER': return { bg: '#dcfce7', color: '#16a34a' }; // green
      case 'VIEWER': return { bg: '#f1f5f9', color: '#64748b' }; // slate
      default: return { bg: '#f1f5f9', color: '#64748b' };
    }
  };

  const translateRole = (role) => {
    switch (role?.toUpperCase()) {
      case 'OWNER': return t('project.chuSoHuu', 'Chủ sở hữu');
      case 'ADMIN': return t('project.quanTriVien', 'Quản trị viên');
      case 'MEMBER': return t('project.thanhVien', 'Thành viên');
      case 'VIEWER': return t('project.nguoiXem', 'Người xem');
      default: return role || 'MEMBER';
    }
  };

  const getStatusBadge = (status) => {
    if (status?.toUpperCase() === 'INVITED') {
      return (
        <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 500, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem", paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "0.25rem", paddingBottom: "0.25rem" }}  style={{ backgroundColor: '#fef3c7', color: '#d97706', fontSize: '0.75rem' }}>
          {t("project.daMoi", "Đã mời")}
        </MuiBox>
      );
    }
    return (
      <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 500, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem", paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "0.25rem", paddingBottom: "0.25rem" }}  style={{ backgroundColor: '#dcfce7', color: '#16a34a', fontSize: '0.75rem' }}>
        {t("project.dangHoatDong", "Đang hoạt động")}
      </MuiBox>
    );
  };

  const authStateUser = useAuthStore.getState()?.user;
  const userStoreEmail = useUserStore.getState()?.email;

  const currentUserId = currentUser?.user_id || currentUser?.id || authStateUser?.user_id || authStateUser?.id;
  const currentEmail = (currentUser?.email || authStateUser?.email || userStoreEmail || '').trim().toLowerCase();

  // 1. Vai trò từ project do backend trả về trực tiếp (getProjectById trả về p.user_role)
  const projectUserRole = (project?.user_role || '').toUpperCase();

  // 2. Tìm member tương ứng với user hiện tại trong danh sách members
  const matchedMember = members?.find(m => {
    const mUserId = m.user_id || m.id;
    const mEmail = (m.email || '').trim().toLowerCase();
    if (mUserId && currentUserId && String(mUserId) === String(currentUserId)) return true;
    if (mEmail && currentEmail && mEmail === currentEmail) return true;
    return false;
  });

  const memberRole = matchedMember?.role?.toUpperCase();

  // 3. Kiểm tra quyền Owner
  const isOwner = Boolean(
    projectUserRole === 'OWNER' ||
    memberRole === 'OWNER' ||
    (project?.user_id && currentUserId && String(project.user_id) === String(currentUserId)) ||
    (currentEmail && members?.some(m => m.role?.toUpperCase() === 'OWNER' && (m.email || '').trim().toLowerCase() === currentEmail)) ||
    // Nếu project chỉ có 1 member duy nhất là OWNER và user đang xem được trang này -> user chính là Owner
    (members?.length === 1 && members[0]?.role?.toUpperCase() === 'OWNER') ||
    // Mặc định cho phép nếu projectUserRole chưa xác định hoặc là OWNER
    (!projectUserRole || projectUserRole === 'OWNER')
  );

  // 4. Cho phép quản lý/mời nếu là Owner, Admin, Administrator, hoặc mặc định nếu không bị gán rõ là VIEWER
  const canManageOthers = Boolean(
    isOwner ||
    projectUserRole === 'ADMIN' ||
    memberRole === 'ADMIN' ||
    currentUser?.role === 'ADMINISTRATOR' ||
    authStateUser?.role === 'ADMINISTRATOR' ||
    (projectUserRole !== 'VIEWER' && projectUserRole !== 'MEMBER' && memberRole !== 'VIEWER' && memberRole !== 'MEMBER')
  );

  return (
    <MuiBox component="div" sx={{ borderRadius: "0.75rem", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", border: "1px solid #dee2e6", padding: "1.5rem" }} className="glass-card">
      <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }} >
        <div>
          <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="text-main">{t("project.thanhVienDuAn", "Project Members")}</MuiBox>
          <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">{t("project.quanLyNhungNguoiCoQuyen", "Manage people with access to this project.")}</MuiBox>
        </div>
        {canManageOthers && (
          <PrimaryButton sx={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
            id="btn-invite-member"

            onClick={onInviteClick}
          >
            <Icon icon="lucide:user-plus" width="18" /> {t("project.themThanhVien", "Add Member")}
          </PrimaryButton>
        )}
      </MuiBox>

      {loading ? (
        <MuiBox component="div" sx={{ display: "flex", justifyContent: "center", paddingTop: "3rem", paddingBottom: "3rem" }} >
          <MuiBox component="div" sx={{ display: "inline-block", width: "2rem", height: "2rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", color: "primary.main" }}  role="status" />
        </MuiBox>
      ) : members?.length === 0 ? (
        <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem" }} className="text-muted-custom">
          <Icon sx={{ marginBottom: "1rem", opacity: 0.5 }} icon="lucide:users" width="48"  />
          <MuiBox component="p" sx={{ marginBottom: "0" }} >{t("project.duAnNayChuaCoThanhVien")}</MuiBox>
        </MuiBox>
      ) : (
        <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", paddingLeft: 0, marginBottom: 0, borderRadius: 0, borderTop: "1px solid #dee2e6", paddingTop: "0.5rem" }} >
          {members?.map((member) => {
            const roleStyle = getRoleBadgeColor(member.role);

            return (
              <MuiBox component="div" sx={{ position: "relative", display: "flex", p: "0.5rem 1rem", color: "text.primary", textDecoration: "none", bgcolor: "transparent", border: "1px solid rgba(0,0,0,.125)", paddingLeft: "0", paddingRight: "0", paddingTop: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #dee2e6", justifyContent: "space-between", alignItems: "center" }} key={member.id || member.user_id} >
                <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} >
                  <MuiBox component="div" sx={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}  style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}>
                    {((member.first_name?.[0] || member.last_name?.[0] || member.user?.full_name?.[0] || member.email?.[0] || 'U')).toUpperCase()}
                  </MuiBox>
                  <div>
                    <MuiBox component="h6" sx={{ fontWeight: 700, marginBottom: "0", display: "flex", alignItems: "center", gap: "0.5rem" }} className="text-main">
                      {(member.first_name || member.last_name)
                        ? `${member.first_name || ''} ${member.last_name || ''}`.trim()
                        : (member.user?.full_name || member.name || member.email || t("project.nguoiDung"))}
                      {getStatusBadge(member.status)}
                    </MuiBox>
                    <MuiBox component="div" sx={{ fontSize: "0.875em", marginTop: "0.25rem" }} className="text-muted-custom">
                      {member.email || member.user?.email}
                    </MuiBox>
                  </div>
                </MuiBox>

                <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} >
                  <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 500, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "0.25rem", paddingBottom: "0.25rem" }}  style={{
                    backgroundColor: roleStyle.bg,
                    color: roleStyle.color,
                    border: 'none'
                  }}>
                    {translateRole(member.role)}
                  </MuiBox>
                  {(() => {
                    const memberUserId = member.user_id || member.id;
                    const isSelf = Boolean(
                      (memberUserId && currentUserId && String(memberUserId) === String(currentUserId)) ||
                      (member.email && currentUser?.email && member.email.toLowerCase() === currentUser.email.toLowerCase())
                    );

                    const isOwner = member.role?.toUpperCase() === 'OWNER';

                    if (isOwner) return null; // Owner cannot be kicked/leave via this list

                    if (isSelf) {
                      // Bản thân có thể tự rời đi
                      return (
                        <Dropdown>
                          <Dropdown.Toggle sx={{ px: "0.5rem", py: "0.25rem", fontSize: "0.875rem", borderRadius: "0.25rem", border: 0, bgcolor: "transparent" }}
                            variant="light"
                            className="text-muted-custom"
                            id={`dropdown-${member.id || member.user_id}`}
                            disabled={actionLoading}
                          >
                            <Icon icon="lucide:more-vertical" width="18" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu sx={{ boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)", border: 0, borderRadius: "0.5rem" }} align="end" >
                            <Dropdown.Item sx={{ fontSize: "0.875em", color: "error.main" }}
                              onClick={() => onRemoveMember(member.user_id)}
                              className="dropdown-item-custom-hover"
                            >
                              <Icon sx={{ marginInlineEnd: "0.5rem" }} icon="lucide:log-out" width="16"  />
                              {t("project.roiKhoiDuAn", "Rời khỏi dự án")}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      );
                    }

                    if (canManageOthers) {
                      // Có quyền quản lý người khác
                      return (
                        <Dropdown>
                          <Dropdown.Toggle sx={{ px: "0.5rem", py: "0.25rem", fontSize: "0.875rem", borderRadius: "0.25rem", border: 0, bgcolor: "transparent" }}
                            variant="light"
                            className="text-muted-custom"
                            id={`dropdown-${member.id || member.user_id}`}
                            disabled={actionLoading}
                          >
                            <Icon icon="lucide:more-vertical" width="18" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu sx={{ boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)", border: 0, borderRadius: "0.5rem" }} align="end" >
                            <Dropdown.Item sx={{ fontSize: "0.875em" }}
                              onClick={() => onChangeRole(member.user_id, 'ADMIN')}
                              className="dropdown-item-custom-hover"
                            >
                              <Icon sx={{ marginInlineEnd: "0.5rem" }} icon="lucide:shield" width="16"  /> {t("project.datLamAdmin")}
                            </Dropdown.Item>
                            <Dropdown.Item sx={{ fontSize: "0.875em" }}
                              onClick={() => onChangeRole(member.user_id, 'MEMBER')}
                              className="dropdown-item-custom-hover"
                            >
                              <Icon sx={{ marginInlineEnd: "0.5rem" }} icon="lucide:user" width="16"  /> {t("project.datLamMember")}
                            </Dropdown.Item>
                            <Dropdown.Item sx={{ fontSize: "0.875em" }}
                              onClick={() => onChangeRole(member.user_id, 'VIEWER')}
                              className="dropdown-item-custom-hover"
                            >
                              <Icon sx={{ marginInlineEnd: "0.5rem" }} icon="lucide:eye" width="16"  /> {t("project.datLamViewer")}
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item sx={{ fontSize: "0.875em", color: "error.main" }}
                              onClick={() => onRemoveMember(member.user_id)}
                              className="dropdown-item-custom-hover"
                            >
                              <Icon sx={{ marginInlineEnd: "0.5rem" }} icon="lucide:user-x" width="16"  />
                              {member.status?.toUpperCase() === 'INVITED' ? t("project.huyLoiMoi") : t("project.xoaThanhVien")}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      );
                    }

                    return null;
                  })()}
                </MuiBox>
              </MuiBox>
            );
          })}
        </MuiBox>
      )}
    </MuiBox>
  );
};

export default ProjectMembersList;
