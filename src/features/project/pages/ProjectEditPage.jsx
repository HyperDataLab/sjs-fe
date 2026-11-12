import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../app/store/authStore';
import Icon from '../../../shared/components/Icon.jsx';
import ROUTES from '../../../app/routes/routePaths';
import Header from '../../landing/components/Header';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import { getProjectByIdApi, updateProjectApi } from '../api/project.api';


import MuiBox from '@mui/material/Box';


export default function ProjectEditPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const uid = useAuthStore((state) => state.user?.uid);
  const queryKey = ['projects', 'detail', id, uid];
  const [title, setTitle] = useState('');
  const [subjectArea, setSubjectArea] = useState('');
  const [keywords, setKeywords] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const { data: project, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => getProjectByIdApi(id),
    enabled: Boolean(id && uid),
    meta: { persist: false },
  });

  useEffect(() => {
    if (!project) return;
    setTitle(project.title || '');
    setSubjectArea(project.subjectArea || '');
    setKeywords((project.keywords || []).join(', '));
  }, [project]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !subjectArea.trim()) {
      setSaveError('Enter a project title and research area.');
      return;
    }

    setSaving(true);
    setSaveError(null);
    try {
      await updateProjectApi(id, {
        title: title.trim(),
        subjectArea: subjectArea.trim(),
        keywords: [...new Set(keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean))].slice(0, 20),
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey }),
        queryClient.invalidateQueries({ queryKey: ['projects', 'list', uid] }),
      ]);
      navigate(`/projects/${id}`);
    } catch (updateError) {
      setSaveError(updateError.message || 'Could not update the project.');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} ><MuiBox component="div" sx={{ display: "inline-block", width: "2rem", height: "2rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", color: "primary.main" }}  role="status"><MuiBox component="span" sx={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }} >{t('common.dangTai')}</MuiBox></MuiBox></MuiBox>;
  }

  if (error || !project) {
    return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", minHeight: "100vh", paddingTop: "3rem", paddingBottom: "3rem" }} ><MuiBox component="main" sx={{ width: "100%", mx: "auto", px: "0.75rem", "@media (min-width:576px)": { maxWidth: 540 }, "@media (min-width:768px)": { maxWidth: 720 }, "@media (min-width:992px)": { maxWidth: 960 }, "@media (min-width:1200px)": { maxWidth: 1140 }, "@media (min-width:1400px)": { maxWidth: 1320 } }} ><MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: "1px solid transparent", borderRadius: "0.375rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029" }} role="alert" >{error?.message || t('project.duAnKhongTonTaiHoacDaBiXoa')} <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "underline", bgcolor: "transparent", color: "primary.main" }}  onClick={() => refetch()}>{t('article.thuLai')}</MuiBox><MuiBox component={Link} sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "underline", bgcolor: "transparent", color: "primary.main" }}  to={ROUTES.PROJECTS}>{t('auth.quayLai')}</MuiBox></MuiBox></MuiBox></MuiBox>;
  }

  return (
    <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingBottom: "3rem", minHeight: "100vh" }} className="grid-bg" style={{ paddingTop: '80px' }}>
      <Header />
      <MuiBox component="main" sx={{ width: "100%", mx: "auto", px: "0.75rem", "@media (min-width:576px)": { maxWidth: 540 }, "@media (min-width:768px)": { maxWidth: 720 }, "@media (min-width:992px)": { maxWidth: 960 }, "@media (min-width:1200px)": { maxWidth: 1140 }, "@media (min-width:1400px)": { maxWidth: 1320 }, marginTop: "1.5rem" }}  style={{ maxWidth: '760px' }}>
        <MuiBox component="nav" sx={{ marginBottom: "1.5rem" }} aria-label="breadcrumb" >
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "1rem", listStyle: "none", fontSize: "0.875em" }} >
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><Link to={ROUTES.PROJECTS}>{t('project.duAnTheoDoi')}</Link></MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><Link to={`/projects/${id}`}>{project.title}</Link></MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} className="active" aria-current="page">Edit project</MuiBox>
          </MuiBox>
        </MuiBox>

        <MuiBox component="section" sx={{ border: "1px solid #dee2e6", borderRadius: "0.75rem", padding: "1.5rem", "@media (min-width:768px)": { padding: "3rem" } }} className="glass-card">
          <MuiBox component="h1" sx={{ fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "1.5rem" }} className="font-display text-main">Edit project</MuiBox>
          {saveError && <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: "1px solid transparent", borderRadius: "0.375rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029" }} role="alert" >{saveError}</MuiBox>}
          <form onSubmit={handleSubmit}>
            <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
              <MuiBox component="label" sx={{ display: "inline-block", marginBottom: "0.5rem", fontWeight: 600 }} htmlFor="projectTitle" >{t('project.tenDuAn')}</MuiBox>
              <MuiBox component="input" sx={{ display: "block", width: "100%", px: "0.75rem", py: "0.375rem", fontSize: "1rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.375rem" }} id="projectTitle"  value={title} onChange={(event) => setTitle(event.target.value)} maxLength={200} required disabled={saving} />
            </MuiBox>
            <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
              <MuiBox component="label" sx={{ display: "inline-block", marginBottom: "0.5rem", fontWeight: 600 }} htmlFor="subjectArea" >{t('project.linhVucNghienCuuChinh')}</MuiBox>
              <MuiBox component="input" sx={{ display: "block", width: "100%", px: "0.75rem", py: "0.375rem", fontSize: "1rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.375rem" }} id="subjectArea"  value={subjectArea} onChange={(event) => setSubjectArea(event.target.value)} maxLength={120} required disabled={saving} />
            </MuiBox>
            <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
              <MuiBox component="label" sx={{ display: "inline-block", marginBottom: "0.5rem", fontWeight: 600 }} htmlFor="projectKeywords" >{t('project.tuKhoaMuonTheoDoi')}</MuiBox>
              <MuiBox component="input" sx={{ display: "block", width: "100%", px: "0.75rem", py: "0.375rem", fontSize: "1rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.375rem" }} id="projectKeywords"  value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder="machine learning, scientific publishing" disabled={saving} />
              <MuiBox component="div" sx={{ display: "block", marginTop: "0.25rem", fontSize: "0.875em", color: "text.secondary" }} >Separate up to 20 keywords with commas.</MuiBox>
            </MuiBox>
            <MuiBox component="div" sx={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", borderTop: "1px solid #dee2e6", paddingTop: "1.5rem" }} >
              <PrimaryButton type="button" variant="outline" onClick={() => navigate(`/projects/${id}`)} disabled={saving}>{t('admin.huy')}</PrimaryButton>
              <PrimaryButton type="submit" disabled={saving || !title.trim() || !subjectArea.trim()}>
                {saving ? <><MuiBox component="span" sx={{ display: "inline-block", width: "1rem", height: "1rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", borderWidth: "0.2em", marginInlineEnd: "0.5rem" }}  role="status" /><span>{t('project.dangLuu')}</span></> : <><Icon icon="lucide:save" width="18" /><span>{t('admin.luuThayDoi')}</span></>}
              </PrimaryButton>
            </MuiBox>
          </form>
        </MuiBox>
      </MuiBox>
    </MuiBox>
  );
}
