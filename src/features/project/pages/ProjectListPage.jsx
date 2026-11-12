import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../../../app/routes/routePaths';
import useProjects from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import EmptyState from '../../../shared/components/EmptyState';
import LoadingSkeleton from '../../../shared/components/LoadingSkeleton';
import Icon from '../../../shared/components/Icon.jsx';
import { Modal, Button } from '@/shared/components/ui/muiAdapters';
import Header from '../../landing/components/Header';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import useAuth from '../../auth/hooks/useAuth';


import MuiBox from '@mui/material/Box';

const ProjectListPage = () => {
  const navigate = useNavigate();
  const {
    projects,
    isLoading,
    error,
    deleteProject,
    restoreProject,
    refetch
  } = useProjects();
  const [recentIds, setRecentIds] = useState([]);
  const [confirmModal, setConfirmModal] = useState({ show: false, projectId: null, action: null });
  const { t } = useTranslation();
  const auth = useAuth();
  const currentUser = auth?.user;

  useEffect(() => {
    try {
      const raw = localStorage.getItem('recently_viewed_projects');
      if (raw) {
        setRecentIds(JSON.parse(raw));
      }
    } catch (e) {
      console.error(t("project.loiDocDuAnXemGanDay"), e);
    }
  }, []);
  const handleDelete = async id => {
    setConfirmModal({ show: true, projectId: id, action: 'delete' });
  };

  const executeDelete = async () => {
    if (!confirmModal.projectId) return;
    const id = confirmModal.projectId;
    setConfirmModal({ show: false, projectId: null, action: null });
    try {
      await deleteProject(id);

      // Xóa khỏi danh sách xem gần đây
      const storageKey = 'recently_viewed_projects';
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const list = JSON.parse(raw).filter(recentId => String(recentId) !== String(id));
        localStorage.setItem(storageKey, JSON.stringify(list));
        setRecentIds(list);
      }
    } catch (err) {
      alert(err.message || t("project.khongTheXoaDuAn"));
    }
  };

  const handleRestore = async id => {
    setConfirmModal({ show: true, projectId: id, action: 'restore' });
  };

  const executeRestore = async () => {
    if (!confirmModal.projectId) return;
    const id = confirmModal.projectId;
    setConfirmModal({ show: false, projectId: null, action: null });
    try {
      await restoreProject(id);
    } catch (err) {
      alert(err.message || "Không thể khôi phục dự án");
    }
  };

  const activeProjects = projects.filter(p => p.status !== 'DELETED');

  // Lọc các dự án xem gần đây từ danh sách active projects
  const recentProjects = recentIds.map(id => activeProjects.find(p => (p.project_id || p.id) === id)).filter(Boolean);
  return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingBottom: "1.5rem", minHeight: "100vh", position: "relative", overflow: "hidden" }} className="grid-bg" style={{
    paddingTop: '80px'
  }}>
      <MuiBox component="div" sx={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }} className="radial-fade" style={{
      top: 0,
      left: 0,
      zIndex: 0
    }} />
      <Header />
      <MuiBox component="div" sx={{ width: "100%", mx: "auto", px: "0.75rem", "@media (min-width:576px)": { maxWidth: 540 }, "@media (min-width:768px)": { maxWidth: 720 }, "@media (min-width:992px)": { maxWidth: 960 }, "@media (min-width:1200px)": { maxWidth: 1140 }, "@media (min-width:1400px)": { maxWidth: 1320 }, position: "relative", zIndex: 1 }}  style={{
      maxWidth: '1200px',
      marginTop: '40px'
    }}>
        {/* Breadcrumb */}
        <MuiBox component="nav" sx={{ marginBottom: "1.5rem" }} aria-label="breadcrumb" >
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "0.5rem", listStyle: "none", fontSize: "0.875em" }} className="text-muted-custom">
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><MuiBox component={Link} sx={{ textDecoration: "none" }} to={ROUTES.DASHBOARD} className="text-muted-custom hover-primary">{t("author.tongQuan")}</MuiBox></MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} className="active" aria-current="page">{t("project.duAnTheoDoi")}</MuiBox>
          </MuiBox>
        </MuiBox>

        {/* Page Header */}
        <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:768px)": { flexDirection: "row", alignItems: "center" }, justifyContent: "space-between", gap: "1rem", marginBottom: "3rem" }} >
          <div>
            <MuiBox component="h1" sx={{ fontWeight: 700, marginBottom: "0.5rem" }} className="font-display text-main">{t("project.duAnNghienCuuCuaToi")}</MuiBox>
            <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom">{t("project.quanLyCacKeywordWatchlistsPhan")}</MuiBox>
          </div>
          <PrimaryButton icon="lucide:plus" onClick={() => navigate(ROUTES.PROJECT_CREATE)}>{t("journal.taoDuAnMoi")}</PrimaryButton>
        </MuiBox>

        {/* Filter / Search Bar Placeholder */}
        <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid #dee2e6" }} >
          <MuiBox component="div" sx={{ position: "relative" }}  style={{
          maxWidth: '300px',
          width: '100%'
        }}>
            <Icon sx={{ position: "absolute", top: "50%", translate: "0 -50%", color: "text.secondary" }} icon="lucide:search" width="18"  style={{
            left: '12px'
          }} />
            <MuiBox component="input" sx={{ display: "block", width: "100%", px: "0.75rem", py: "0.375rem", fontSize: "1rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.375rem", paddingInlineStart: "3rem" }} type="text"  placeholder={t("project.timKiemDuAn")} style={{
            fontSize: '0.9rem',
            borderRadius: '15px',
            boxShadow: 'none'
          }} onFocus={e => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.outline = 'none';
          }} onBlur={e => {
            e.currentTarget.style.borderColor = 'var(--border)';
          }} />
          </MuiBox>
          <MuiBox component="div" sx={{ display: "flex", gap: "1.5rem", fontSize: "0.875em" }} className="text-muted-custom">
            <span>{t("project.tongSoDuAn")}{" "}<strong className="text-main">{activeProjects.length}</strong></span>
            <span>{t("project.dangHoatDong")}{" "}<MuiBox component="strong" sx={{ color: "success.main" }} >{activeProjects.filter(p => p.status === 'ACTIVE').length}</MuiBox></span>
          </MuiBox>
        </MuiBox>

        {/* Content */}
        {error ? <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: 0, borderRadius: "0.75rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }} >
            <Icon sx={{ color: "error.main", flexShrink: 0 }} icon="lucide:alert-triangle" width="24"  />
            <div>
              <MuiBox component="h6" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} >{t("article.loiTaiDuLieu")}</MuiBox>
              <MuiBox component="p" sx={{ marginBottom: "0", fontSize: "0.875em" }} >{error}</MuiBox>
            </div>
            <PrimaryButton sx={{ ml: "auto" }} variant="outline"  onClick={() => refetch()}>{t("article.thuLai")}</PrimaryButton>
          </MuiBox> : isLoading ? <MuiBox component="div" sx={{ display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", width: "100%", gap: "1.5rem" }} >
            {[1, 2, 3].map(i => <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:768px)": { gridColumn: "span 6" }, "@media (min-width:992px)": { gridColumn: "span 4" } }} key={i} >
                <MuiBox component="div" sx={{ position: "relative", display: "flex", flexDirection: "column", minWidth: 0, wordWrap: "break-word", bgcolor: "background.paper", backgroundClip: "border-box", border: 0, borderRadius: "0.75rem", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", padding: "1.5rem", height: "100%" }} className="glass-card">
                  <LoadingSkeleton sx={{ marginBottom: "1rem", borderRadius: "50rem" }} height="24px" width="40%"  />
                  <LoadingSkeleton sx={{ marginBottom: "1.5rem", borderRadius: "0.375rem" }} height="28px" width="80%"  />
                  <LoadingSkeleton sx={{ marginBottom: "0.5rem", borderRadius: "0.375rem" }} height="16px" width="60%"  />
                  <LoadingSkeleton sx={{ marginBottom: "1.5rem", borderRadius: "0.375rem" }} height="16px" width="50%"  />
                  <LoadingSkeleton sx={{ marginBottom: "1rem", borderRadius: "0.375rem" }} height="1px" width="100%"  />
                  <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", mt: "auto" }} >
                    <LoadingSkeleton sx={{ borderRadius: "0.375rem" }} height="16px" width="40%"  />
                    <LoadingSkeleton sx={{ borderRadius: "0.375rem" }} height="16px" width="20%"  />
                  </MuiBox>
                </MuiBox>
              </MuiBox>)}
          </MuiBox> : projects.length === 0 ? <EmptyState sx={{ marginTop: "1.5rem" }} title={t("project.banChuaCoDuAnNao")} description={t("project.taoDuAnDauTienDeBatDauTheoDoiT")} icon="lucide:folder-open" actionLabel="+ Tạo dự án mới" onAction={() => navigate(ROUTES.PROJECT_CREATE)}  /> : <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "3rem" }} >
            {/* Section: Dự án xem gần đây */}
            {recentProjects.length > 0 && <div>
                <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }} className="font-display text-main">
                  <Icon icon="lucide:clock" width={18} style={{
              color: 'var(--primary)'
            }} />
                  <span>{t("project.duAnXemGanDay")}</span>
                </MuiBox>
                <MuiBox component="div" sx={{ display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", width: "100%", gap: "1.5rem" }} >
                  {recentProjects.map(project => <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:768px)": { gridColumn: "span 6" }, "@media (min-width:992px)": { gridColumn: "span 4" } }} key={`recent-${project.project_id || project.id}`} >
                      <ProjectCard project={project} onDelete={handleDelete} onRestore={handleRestore} isRecent={true} currentUser={currentUser} />
                    </MuiBox>)}
                </MuiBox>
              </div>}

            {/* Section: Tất cả dự án */}
            <div>
              <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }} className="font-display text-main">
                <Icon icon="lucide:folder" width={18} style={{
              color: 'var(--primary)'
            }} />
                <span>{t("project.tatCaDuAn")} ({activeProjects.length})</span>
              </MuiBox>
              <MuiBox component="div" sx={{ display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", width: "100%", gap: "1.5rem" }} >
                {activeProjects.map(project => <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:768px)": { gridColumn: "span 6" }, "@media (min-width:992px)": { gridColumn: "span 4" } }} key={project.project_id || project.id} >
                    <ProjectCard project={project} onDelete={handleDelete} onRestore={handleRestore} currentUser={currentUser} />
                  </MuiBox>)}
              </MuiBox>
            </div>
          </MuiBox>}
      </MuiBox>

      <Modal show={confirmModal.show} onHide={() => setConfirmModal({ show: false, projectId: null, action: null })} centered>
        <Modal.Header border="0" closeButton>
          <Modal.Title sx={{ fontWeight: 700 }} >
            {confirmModal.action === 'delete' ? t("project.xacNhanXoaDuAn", "Xác nhận xóa dự án") : "Xác nhận khôi phục dự án"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom">
            {confirmModal.action === 'delete'
              ? (t("project.banCoChacMuonXoaDuAnNayHanhDon") || "Bạn có chắc muốn xóa dự án này? Hành động này không thể hoàn tác.")
              : "Bạn có chắc muốn khôi phục dự án này?"}
          </MuiBox>
        </Modal.Body>
        <Modal.Footer sx={{ gap: "0.5rem" }} border="0" >
          <Button sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", fontWeight: 500 }} variant="light"  onClick={() => setConfirmModal({ show: false, projectId: null, action: null })} style={{ borderRadius: '10px' }}>
            Hủy bỏ
          </Button>
          <Button sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", fontWeight: 500, color: "#fff" }}
            variant={confirmModal.action === 'delete' ? "danger" : "success"}

            onClick={confirmModal.action === 'delete' ? executeDelete : executeRestore}
            style={{ borderRadius: '10px' }}
          >
            {confirmModal.action === 'delete' ? t("project.xoaDuAn") : "Khôi phục"}
          </Button>
        </Modal.Footer>
      </Modal>
    </MuiBox>;
};
export default ProjectListPage;
