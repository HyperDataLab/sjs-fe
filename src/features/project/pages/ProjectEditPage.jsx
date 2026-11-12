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
    return <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">{t('common.dangTai')}</span></div></div>;
  }

  if (error || !project) {
    return <div className="container-fluid min-vh-100 py-5"><main className="container"><div role="alert" className="alert alert-danger">{error?.message || t('project.duAnKhongTonTaiHoacDaBiXoa')} <button className="btn btn-link" onClick={() => refetch()}>{t('article.thuLai')}</button><Link className="btn btn-link" to={ROUTES.PROJECTS}>{t('auth.quayLai')}</Link></div></main></div>;
  }

  return (
    <div className="container-fluid pb-5 grid-bg min-vh-100" style={{ paddingTop: '80px' }}>
      <Header />
      <main className="container mx-auto mt-4" style={{ maxWidth: '760px' }}>
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item"><Link to={ROUTES.PROJECTS}>{t('project.duAnTheoDoi')}</Link></li>
            <li className="breadcrumb-item"><Link to={`/projects/${id}`}>{project.title}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Edit project</li>
          </ol>
        </nav>

        <section className="glass-card border rounded-4 p-4 p-md-5">
          <h1 className="h3 font-display fw-bold text-main mb-4">Edit project</h1>
          {saveError && <div role="alert" className="alert alert-danger">{saveError}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="projectTitle" className="form-label fw-semibold">{t('project.tenDuAn')}</label>
              <input id="projectTitle" className="form-control" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={200} required disabled={saving} />
            </div>
            <div className="mb-4">
              <label htmlFor="subjectArea" className="form-label fw-semibold">{t('project.linhVucNghienCuuChinh')}</label>
              <input id="subjectArea" className="form-control" value={subjectArea} onChange={(event) => setSubjectArea(event.target.value)} maxLength={120} required disabled={saving} />
            </div>
            <div className="mb-4">
              <label htmlFor="projectKeywords" className="form-label fw-semibold">{t('project.tuKhoaMuonTheoDoi')}</label>
              <input id="projectKeywords" className="form-control" value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder="machine learning, scientific publishing" disabled={saving} />
              <div className="form-text">Separate up to 20 keywords with commas.</div>
            </div>
            <div className="d-flex justify-content-end gap-2 border-top pt-4">
              <PrimaryButton type="button" variant="outline" onClick={() => navigate(`/projects/${id}`)} disabled={saving}>{t('admin.huy')}</PrimaryButton>
              <PrimaryButton type="submit" disabled={saving || !title.trim() || !subjectArea.trim()}>
                {saving ? <><span className="spinner-border spinner-border-sm me-2" role="status" /><span>{t('project.dangLuu')}</span></> : <><Icon icon="lucide:save" width="18" /><span>{t('admin.luuThayDoi')}</span></>}
              </PrimaryButton>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
