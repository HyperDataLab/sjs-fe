import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import ROUTES from '../../../app/routes/routePaths';
import Header from '../../landing/components/Header';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import { useAuthStore } from '../../../app/store/authStore';
import { getProjectByIdApi, saveProjectAnalysisApi } from '../api/project.api';
import { runProjectAnalysisApi } from '../api/research.api';

export default function ProjectSummaryPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const uid = useAuthStore((state) => state.user?.uid);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const queryKey = ['projects', 'detail', id, uid];

  const { data: project, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => getProjectByIdApi(id),
    enabled: Boolean(id && uid),
    meta: { persist: false },
  });

  const runAnalysis = async () => {
    if (!project) return;
    setAnalysisLoading(true);
    setAnalysisError(null);
    const parameters = project.analysisSummary?.parameters || {
      query: [project.title, project.subjectArea, ...(project.keywords || [])].filter(Boolean).join(' ').slice(0, 500),
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
      await queryClient.invalidateQueries({ queryKey });
    } catch (error) {
      setAnalysisError(error.message);
      await saveProjectAnalysisApi(project.id, {
        status: 'failed',
        parameters,
        error: error.message.slice(0, 300),
        analyzedAt: new Date().toISOString(),
      }).catch(() => {});
      await queryClient.invalidateQueries({ queryKey });
    } finally {
      setAnalysisLoading(false);
    }
  };

  if (isLoading) {
    return <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">{t('common.dangTai')}</span></div></div>;
  }

  if (error || !project) {
    return <div className="container-fluid min-vh-100 py-5"><div className="container"><div role="alert" className="alert alert-danger">{error?.message || t('project.duAnKhongTonTaiHoacDaBiXoa')} <button className="btn btn-link" onClick={() => refetch()}>{t('article.thuLai')}</button><button className="btn btn-link" onClick={() => navigate(ROUTES.PROJECTS)}>{t('auth.quayLai')}</button></div></div></div>;
  }

  const result = project.analysisSummary?.result;
  const sources = Object.entries(result?.sources || {});
  const years = new Map();
  for (const [, summary] of sources) {
    for (const item of summary.byYear || []) years.set(item.year, (years.get(item.year) || 0) + item.count);
  }

  return (
    <div className="container-fluid pb-5 grid-bg min-vh-100" style={{ paddingTop: '80px' }}>
      <Header />
      <main className="container mx-auto mt-4" style={{ maxWidth: '1100px' }}>
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item"><Link to={ROUTES.PROJECTS}>{t('project.duAnTheoDoi')}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{project.title}</li>
          </ol>
        </nav>

        <section className="glass-card border rounded-4 p-4 p-md-5 mb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-4">
            <div>
              <span className="badge rounded-pill bg-light text-dark border mb-3">{project.subjectArea}</span>
              <h1 className="font-display fw-bold text-main">{project.title}</h1>
              <p className="text-muted-custom mb-0">Created {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'recently'}</p>
              {project.keywords.length > 0 && <div className="d-flex flex-wrap gap-2 mt-3">{project.keywords.map((keyword) => <span key={keyword} className="badge rounded-pill bg-light text-muted border fw-normal">{keyword}</span>)}</div>}
            </div>
            <div className="d-flex align-items-start">
              <Link className="btn btn-outline-secondary me-2" to={`/projects/${project.id}/edit`}>Edit project</Link>
              <PrimaryButton onClick={runAnalysis} disabled={analysisLoading} icon="lucide:refresh-cw">
                {analysisLoading ? 'Analyzing…' : result ? 'Run analysis again' : 'Run analysis'}
              </PrimaryButton>
            </div>
          </div>
        </section>

        {analysisError && <div role="alert" className="alert alert-danger">{analysisError}</div>}
        {project.analysisSummary?.status === 'failed' && !analysisError && <div role="status" className="alert alert-warning">{project.analysisSummary.error || 'The last analysis could not finish. You can retry it.'}</div>}

        {analysisLoading && <div role="status" className="alert alert-info">Searching OpenAlex and Crossref and calculating a compact summary…</div>}
        {result ? (
          <>
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4"><div className="glass-card border rounded-4 p-4 h-100"><div className="text-muted-custom small">Records analyzed</div><div className="display-6 fw-bold text-main">{result.totalWorks.toLocaleString()}</div></div></div>
              <div className="col-12 col-md-4"><div className="glass-card border rounded-4 p-4 h-100"><div className="text-muted-custom small">Sources</div><div className="display-6 fw-bold text-main">{sources.length}</div></div></div>
              <div className="col-12 col-md-4"><div className="glass-card border rounded-4 p-4 h-100"><div className="text-muted-custom small">Analyzed</div><div className="fs-5 fw-semibold text-main mt-2">{new Date(result.analyzedAt).toLocaleString()}</div></div></div>
            </div>

            <div className="row g-4">
              <div className="col-12 col-lg-6">
                <section className="glass-card border rounded-4 p-4 h-100">
                  <h2 className="h5 fw-bold text-main mb-3">Results by source</h2>
                  {sources.map(([name, summary]) => <div key={name} className="d-flex justify-content-between align-items-center border-bottom py-2"><span className="text-capitalize">{name}</span><span className="fw-semibold">{summary.workCount} works · {summary.citationCount.toLocaleString()} citations</span></div>)}
                </section>
              </div>
              <div className="col-12 col-lg-6">
                <section className="glass-card border rounded-4 p-4 h-100">
                  <h2 className="h5 fw-bold text-main mb-3">Publications by year</h2>
                  {years.size === 0 ? <p className="text-muted-custom mb-0">The sources returned no publication years.</p> : [...years].sort(([a], [b]) => a - b).map(([year, count]) => <div key={year} className="d-flex justify-content-between border-bottom py-2"><span>{year}</span><span className="fw-semibold">{count}</span></div>)}
                </section>
              </div>
              <div className="col-12">
                <section className="glass-card border rounded-4 p-4">
                  <h2 className="h5 fw-bold text-main mb-3">Frequently listed venues</h2>
                  {sources.flatMap(([source, summary]) => (summary.topVenues || []).map((venue) => ({ ...venue, source }))).length === 0
                    ? <p className="text-muted-custom mb-0">No venue summary is available.</p>
                    : sources.flatMap(([source, summary]) => (summary.topVenues || []).map((venue) => ({ ...venue, source }))).map((venue) => <div key={`${venue.source}-${venue.name}`} className="d-flex justify-content-between border-bottom py-2"><span>{venue.name} <small className="text-muted-custom">({venue.source})</small></span><span className="fw-semibold">{venue.count}</span></div>)}
                </section>
              </div>
            </div>
          </>
        ) : !analysisLoading && <section className="glass-card border rounded-4 p-4 text-center"><Icon icon="lucide:chart-no-axes-combined" width="32" className="text-muted mb-2" /><p className="text-muted-custom mb-0">No analysis summary yet. Run the analysis to fetch current results from the configured scholarly sources.</p></section>}
      </main>
    </div>
  );
}
