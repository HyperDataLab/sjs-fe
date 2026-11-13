import { useTranslation } from "react-i18next";
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import { EntityCard } from '../../../shared/components/Card';


import MuiBox from '@mui/material/Box';

const ProjectCard = ({
  project,
  onDelete,
  onRestore,
  isRecent = false,
  currentUser = null
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleDelete = e => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(project.project_id || project.id);
  };
  const handleRestore = e => {
    e.preventDefault();
    e.stopPropagation();
    if (onRestore) onRestore(project.project_id || project.id);
  };
  const title = project.title || 'Untitled Project';
  const areaName = project.subject_area?.name || project.subject_area || t("project.chuaXacDinhLinhVuc");
  const createdAt = project.created_at ? new Date(project.created_at).toLocaleDateString('vi-VN') : 'N/A';

  // Try to find counts
  const keywordCount = project.keywords_count || project.watch_keywords?.length || 0;

  const getInitials = (first, last, email) => {
    if (first && last) return `${first[0]}${last[0]}`.toUpperCase();
    if (email) return email.substring(0, 2).toUpperCase();
    return 'U';
  };

  const renderAvatarGroup = () => {
    const owner = project.owner;
    const members = project.members || [];
    const allUsers = [];
    if (owner) allUsers.push({ ...owner, isOwner: true });
    members.forEach(m => allUsers.push(m));

    if (allUsers.length === 0) return null;

    const maxDisplay = 3;
    const displayUsers = allUsers.slice(0, maxDisplay);
    const extraCount = allUsers.length - maxDisplay;

    const handleMembersClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleCardClick();
      navigate(`/projects/${project.project_id || project.id}?tab=members`);
    };

    return (
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center" }}

        onClick={handleMembersClick}
        title={t("project.quanLyThanhVien", "Quản lý thành viên")}
        style={{ cursor: 'pointer' }}
      >
        {displayUsers.map((u, idx) => (
          <MuiBox component="div" sx={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)" }}
            key={idx}

            style={{
              width: '26px', height: '26px', fontSize: '10px',
              backgroundColor: u.isOwner ? 'var(--primary)' : '#6b7280',
              marginLeft: idx > 0 ? '-8px' : '0',
              border: '2px solid white',
              zIndex: 10 - idx
            }}
            title={`${u.first_name || ''} ${u.last_name || ''} ${u.isOwner ? '(Owner)' : ''}`}
          >
            {getInitials(u.first_name, u.last_name, u.email)}
          </MuiBox>
        ))}
        {extraCount > 0 && (
          <MuiBox component="div" sx={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#6c757d", fontWeight: 500, boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", bgcolor: "#f8f9fa" }}

            style={{
              width: '26px', height: '26px', fontSize: '10px',
              marginLeft: '-8px',
              border: '2px solid white',
              zIndex: 0
            }}
          >
            +{extraCount}
          </MuiBox>
        )}
      </MuiBox>
    );
  };
  const handleCardClick = () => {
    try {
      const storageKey = 'recently_viewed_projects';
      const raw = localStorage.getItem(storageKey);
      let list = raw ? JSON.parse(raw) : [];
      const projectId = project.project_id || project.id;
      list = list.filter(id => id !== projectId);
      list.unshift(projectId);
      list = list.slice(0, 3); // Giới hạn tối đa 3 dự án xem gần nhất
      localStorage.setItem(storageKey, JSON.stringify(list));
    } catch (e) {
      console.error(t("project.loiLuuDuAnXemGanDay"), e);
    }
  };
  if (isRecent) {
    return <MuiBox component={Link} sx={{ textDecoration: "none", height: "100%", display: "block" }} to={`/projects/${project.project_id || project.id}`}  onClick={handleCardClick}>
        <MuiBox component="div" sx={{ borderRadius: "0.75rem", border: "1px solid #dee2e6", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", padding: "1rem", height: "100%", display: "flex", alignItems: "center", gap: "1rem" }} className="glass-card project-card-recent-hover">
          <MuiBox component="div" sx={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}  style={{
          width: '46px',
          height: '46px',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)'
        }}>
            <Icon icon="lucide:folder-open" width="22" />
          </MuiBox>
          <MuiBox component="div" sx={{ flexGrow: 1 }} className="min-w-0" style={{
          minWidth: 0
        }}>
            <MuiBox component="h6" sx={{ fontWeight: 700, marginBottom: "0.25rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-main">{title}</MuiBox>
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >
              <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 500, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", overflow: "hidden", textOverflow: "ellipsis" }}  style={{
              fontSize: '0.65rem',
              backgroundColor: 'var(--bg-chip)',
              color: 'var(--text-muted)'
            }}>
                {areaName}
              </MuiBox>
              <MuiBox component="span" sx={{ fontSize: "0.875em", flexShrink: 0 }} className="text-muted-custom">• {createdAt}</MuiBox>
            </MuiBox>
          </MuiBox>
          <MuiBox component="div" sx={{ flexShrink: 0 }} className="text-muted-custom recent-arrow-icon">
            <Icon icon="lucide:chevron-right" width="20" />
          </MuiBox>
        </MuiBox>
      </MuiBox>;
  }
  const isDeleted = project.status === 'DELETED';
  const meta = (
    <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
      <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 500, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem" }}  style={{
        backgroundColor: 'var(--primary-light)',
        color: 'var(--primary)'
      }}>
        {areaName}
      </MuiBox>
      {isDeleted && (
        <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 500, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem", bgcolor: "error.main" }}  style={{ fontSize: '0.7rem' }}>
          {t("project.daXoa", "Đã xóa")}
        </MuiBox>
      )}
    </MuiBox>
  );

  // Kiểm tra quyền owner
  const currentUserId = currentUser?.user_id || currentUser?.id;
  const isOwner = project.user_role === 'OWNER' || (currentUser && (
    (project.user_id && project.user_id === currentUserId) ||
    (project.owner && project.owner.user_id === currentUserId) ||
    (project.owner_id && project.owner_id === currentUserId)
  ));

  const actions = isOwner ? (isDeleted ? (
    <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: 0, borderRadius: "0.25rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "underline", bgcolor: "transparent", color: "success.main", padding: "0", marginInlineStart: "0.5rem" }} className="hover-primary" onClick={handleRestore} title={t("project.khoiPhucDuAn", "Khôi phục dự án")}>
      <Icon icon="lucide:refresh-cw" width="18" />
    </MuiBox>
  ) : (
    <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: 0, borderRadius: "0.25rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "underline", bgcolor: "transparent", color: "text.secondary", padding: "0", marginInlineStart: "0.5rem" }} className="hover-danger" onClick={handleDelete} title={t("project.xoaDuAn", "Xóa dự án")}>
      <Icon icon="lucide:trash-2" width="18" />
    </MuiBox>
  )) : null;
  const description = keywordCount > 0 ? <div>
      <MuiBox component="span" sx={{ fontSize: "0.875em", display: "block", marginBottom: "0.25rem" }} className="text-muted-custom">{t("project.tuKhoaTheoDoi")}{keywordCount}):</MuiBox>
      <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }} >
        {project.watch_keywords?.slice(0, 3).map((kw, idx) => <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 400, lineHeight: 1, color: "text.secondary", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", bgcolor: "#f8f9fa", border: "1px solid #dee2e6" }} key={idx}  style={{
        fontSize: '0.75rem'
      }}>
            {kw.keyword || kw}
          </MuiBox>)}
        {keywordCount > 3 && <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 400, lineHeight: 1, color: "text.secondary", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", bgcolor: "#f8f9fa", border: "1px solid #dee2e6" }}  style={{
        fontSize: '0.75rem'
      }}>
            +{keywordCount - 3}
          </MuiBox>}
      </MuiBox>
    </div> : null;
  const footer = <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "0.5rem" }} >
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
        {renderAvatarGroup()}
        <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}  style={{ lineHeight: '1.2' }}>
          <span className="text-muted-custom" style={{ fontSize: '0.7rem' }}>
            Tạo bởi <MuiBox component="span" sx={{ fontWeight: 600 }} className="text-main">{project.owner?.last_name || 'Admin'}</MuiBox>
          </span>
          <span className="text-muted-custom" style={{ fontSize: '0.65rem' }}>{createdAt}</span>
        </MuiBox>
      </MuiBox>
      <MuiBox component="span" sx={{ fontSize: "0.875em", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.25rem" }}  style={{
      color: 'var(--primary)'
    }}>{t("article.chiTiet1")}<Icon icon="lucide:arrow-right" width="14" />
      </MuiBox>
    </MuiBox>;
  return <MuiBox component={Link} sx={{ textDecoration: "none", height: "100%", display: "block" }} to={`/projects/${project.project_id || project.id}`}  onClick={handleCardClick}>
      <EntityCard sx={{ height: "100%" }}  title={title} meta={meta} actions={actions} description={description} footer={footer} bodyClassName="flex-column align-items-stretch" />
    </MuiBox>;
};
export default ProjectCard;
