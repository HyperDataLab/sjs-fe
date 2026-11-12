import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import ROUTES from '../../../app/routes/routePaths';
import Header from '../../landing/components/Header';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import useProjects from '../hooks/useProjects';
import { runProjectAnalysisApi } from '../api/research.api';
import { saveProjectAnalysisApi } from '../api/project.api';

export default function CreateProjectPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createProject } = useProjects();
  const [title, setTitle] = useState('');
  const [subjectArea, setSubjectArea] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [keywordDraft, setKeywordDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addKeywords = (value) => {
    const additions = value.split(',').map((keyword) => keyword.trim()).filter(Boolean);
    setKeywords((current) => [...new Set([...current, ...additions])].slice(0, 20));
    setKeywordDraft('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !subjectArea.trim()) {
      setError('Enter a project title and research area.');
      return;
    }

    setLoading(true);
    setError(null);
    let project;
    try {
      const cleanedKeywords = [...new Set([...keywords, ...keywordDraft.split(',').map((item) => item.trim()).filter(Boolean)])].slice(0, 20);
      project = await createProject({ title: title.trim(), subjectArea: subjectArea.trim(), keywords: cleanedKeywords });

      const parameters = {
        query: [title.trim(), subjectArea.trim(), ...cleanedKeywords].join(' ').slice(0, 500),
        sources: ['openalex', 'crossref'],
        limit: 100,
      };

      try {
        const result = await runProjectAnalysisApi(parameters);
        await saveProjectAnalysisApi(project.id, {
          status: 'complete',
          parameters,
          result,
          analyzedAt: new Date().toISOString(),
        });
      } catch (analysisError) {
        await saveProjectAnalysisApi(project.id, {
          status: 'failed',
          parameters,
          error: analysisError.message,
          analyzedAt: new Date().toISOString(),
        }).catch(() => {});
      }

      navigate(`/projects/${project.id}`);
    } catch (createError) {
      setError(createError.message || t('project.daCoLoiXayRaKhiTaoDuAn'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid pb-4 grid-bg min-vh-100 position-relative overflow-hidden" style={{ paddingTop: '80px' }}>
      <div className="position-absolute w-100 h-100 radial-fade pe-none" style={{ top: 0, left: 0, zIndex: 0 }} />
      <Header />
      <div className="container mx-auto position-relative z-1" style={{ maxWidth: '650px', marginTop: '40px' }}>
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb mb-2 text-muted-custom small">
            <li className="breadcrumb-item"><Link to={ROUTES.DASHBOARD} className="text-decoration-none text-muted-custom hover-primary">{t('author.tongQuan')}</Link></li>
            <li className="breadcrumb-item"><Link to={ROUTES.PROJECTS} className="text-decoration-none text-muted-custom hover-primary">{t('project.duAnTheoDoi')}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{t('journal.taoDuAnMoi')}</li>
          </ol>
        </nav>

        <div className="glass-card p-4 p-md-5 rounded-4 shadow-sm border">
          <div className="mb-4 text-center">
            <h2 className="font-display fw-bold text-main mb-2">{t('project.khoiTaoDuAnNghienCuuMoi')}</h2>
            <p className="text-muted-custom small mb-0">{t('project.thietLapKhongGianLamViecDeTuDo')}</p>
          </div>

          {error && <div role="alert" className="alert alert-danger border-0 rounded-3 small py-2 d-flex align-items-center gap-2"><Icon icon="lucide:alert-circle" width="18" />{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="projectTitle" className="form-label fw-semibold text-main mb-2 small text-uppercase tracking-wider">{t('project.tenDuAn')}<span className="text-danger">*</span></label>
              <input id="projectTitle" className="form-control form-control-lg journal-dark-input" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={200} disabled={loading} required autoFocus />
            </div>

            <div className="mb-4">
              <label htmlFor="subjectArea" className="form-label fw-semibold text-main mb-2 small text-uppercase tracking-wider">{t('project.linhVucNghienCuuChinh')}<span className="text-danger">*</span></label>
              <input id="subjectArea" className="form-control form-control-lg journal-dark-input" value={subjectArea} onChange={(event) => setSubjectArea(event.target.value)} maxLength={120} placeholder="e.g. Artificial intelligence" disabled={loading} required />
              <div className="form-text">Research area is entered directly; the old backend catalog is no longer required.</div>
            </div>

            <div className="mb-5">
              <label htmlFor="projectKeywords" className="form-label fw-semibold text-main mb-2 small text-uppercase tracking-wider">{t('project.tuKhoaMuonTheoDoi')}</label>
              <p className="text-muted-custom small mb-2">Enter keywords separated by commas.</p>
              <input id="projectKeywords" className="form-control journal-dark-input" value={keywordDraft} onChange={(event) => setKeywordDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addKeywords(keywordDraft); } }} onBlur={() => keywordDraft && addKeywords(keywordDraft)} placeholder="machine learning, scientific publishing" disabled={loading} />
              {keywords.length > 0 && <div className="d-flex flex-wrap gap-2 mt-3">{keywords.map((keyword) => <span key={keyword} className="badge rounded-pill bg-light text-dark border d-flex align-items-center gap-2">{keyword}<button type="button" className="btn-close" aria-label={`Remove ${keyword}`} onClick={() => setKeywords((current) => current.filter((item) => item !== keyword))} /></span>)}</div>}
            </div>

            {loading && <p className="small text-muted-custom" role="status">Saving the project and analyzing OpenAlex and Crossref…</p>}
            <div className="d-flex gap-3 justify-content-end pt-3 border-top">
              <PrimaryButton type="button" variant="outline" className="px-4 py-2" onClick={() => navigate(-1)} disabled={loading}>{t('admin.huy')}</PrimaryButton>
              <PrimaryButton type="submit" className="px-4 py-2" disabled={loading || !title.trim() || !subjectArea.trim()}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2" role="status" />{t('common.dangTai')}</> : t('journal.taoDuAnMoi')}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
