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


import MuiBox from '@mui/material/Box';


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
    return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} ><MuiBox component="div" sx={{ display: "inline-block", width: "2rem", height: "2rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", color: "primary.main" }}  role="status"><MuiBox component="span" sx={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }} >{t('common.dangTai')}</MuiBox></MuiBox></MuiBox>;
  }

  if (error || !project) {
    return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", minHeight: "100vh", paddingTop: "3rem", paddingBottom: "3rem" }} ><MuiBox component="div" sx={{ width: "100%", mx: "auto", px: "0.75rem", "@media (min-width:576px)": { maxWidth: 540 }, "@media (min-width:768px)": { maxWidth: 720 }, "@media (min-width:992px)": { maxWidth: 960 }, "@media (min-width:1200px)": { maxWidth: 1140 }, "@media (min-width:1400px)": { maxWidth: 1320 } }} ><MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: "1px solid transparent", borderRadius: "0.375rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029" }} role="alert" >{error?.message || t('project.duAnKhongTonTaiHoacDaBiXoa')} <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "underline", bgcolor: "transparent", color: "primary.main" }}  onClick={() => refetch()}>{t('article.thuLai')}</MuiBox><MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "underline", bgcolor: "transparent", color: "primary.main" }}  onClick={() => navigate(ROUTES.PROJECTS)}>{t('auth.quayLai')}</MuiBox></MuiBox></MuiBox></MuiBox>;
  }

  const result = project.analysisSummary?.result;
  const sources = Object.entries(result?.sources || {});
  const years = new Map();
  for (const [, summary] of sources) {
    for (const item of summary.byYear || []) years.set(item.year, (years.get(item.year) || 0) + item.count);
  }

  return (
    <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingBottom: "3rem", minHeight: "100vh" }} className="grid-bg" style={{ paddingTop: '80px' }}>
      <Header />
      <MuiBox component="main" sx={{ width: "100%", mx: "auto", px: "0.75rem", "@media (min-width:576px)": { maxWidth: 540 }, "@media (min-width:768px)": { maxWidth: 720 }, "@media (min-width:992px)": { maxWidth: 960 }, "@media (min-width:1200px)": { maxWidth: 1140 }, "@media (min-width:1400px)": { maxWidth: 1320 }, marginTop: "1.5rem" }}  style={{ maxWidth: '1100px' }}>
        <MuiBox component="nav" sx={{ marginBottom: "1.5rem" }} aria-label="breadcrumb" >
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "1rem", listStyle: "none", fontSize: "0.875em" }} >
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><Link to={ROUTES.PROJECTS}>{t('project.duAnTheoDoi')}</Link></MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} className="active" aria-current="page">{project.title}</MuiBox>
          </MuiBox>
        </MuiBox>

        <MuiBox component="section" sx={{ border: "1px solid #dee2e6", borderRadius: "0.75rem", padding: "1.5rem", "@media (min-width:768px)": { padding: "3rem" }, marginBottom: "1.5rem" }} className="glass-card">
          <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:768px)": { flexDirection: "row" }, justifyContent: "space-between", gap: "1.5rem" }} >
            <div>
              <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "#212529", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem", bgcolor: "#f8f9fa", border: "1px solid #dee2e6", marginBottom: "1rem" }} >{project.subjectArea}</MuiBox>
              <MuiBox component="h1" sx={{ fontWeight: 700 }} className="font-display text-main">{project.title}</MuiBox>
              <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom">Created {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'recently'}</MuiBox>
              {project.keywords.length > 0 && <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }} >{project.keywords.map((keyword) => <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 400, lineHeight: 1, color: "text.secondary", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem", bgcolor: "#f8f9fa", border: "1px solid #dee2e6" }} key={keyword} >{keyword}</MuiBox>)}</MuiBox>}
            </div>
            <MuiBox component="div" sx={{ display: "flex", alignItems: "flex-start" }} >
              <MuiBox component={Link} sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: "1px solid #6c757d", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", bgcolor: "transparent", color: "#6c757d", marginInlineEnd: "0.5rem" }}  to={`/projects/${project.id}/edit`}>Edit project</MuiBox>
              <PrimaryButton onClick={runAnalysis} disabled={analysisLoading} icon="lucide:refresh-cw">
                {analysisLoading ? 'Analyzing…' : result ? 'Run analysis again' : 'Run analysis'}
              </PrimaryButton>
            </MuiBox>
          </MuiBox>
        </MuiBox>

        {analysisError && <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: "1px solid transparent", borderRadius: "0.375rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029" }} role="alert" >{analysisError}</MuiBox>}
        {project.analysisSummary?.status === 'failed' && !analysisError && <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: "1px solid transparent", borderRadius: "0.375rem", bgcolor: "#fff3cd", borderColor: "#ffecb5", color: "#664d03" }} role="status" >{project.analysisSummary.error || 'The last analysis could not finish. You can retry it.'}</MuiBox>}

        {analysisLoading && <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: "1px solid transparent", borderRadius: "0.375rem", bgcolor: "#cff4fc", borderColor: "#b6effb", color: "#055160" }} role="status" >Searching OpenAlex and Crossref and calculating a compact summary…</MuiBox>}
        {result ? (
          <>
            <MuiBox component="div" sx={{ display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", width: "100%", gap: "1rem", marginBottom: "1.5rem" }} >
              <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:768px)": { gridColumn: "span 4" } }} ><MuiBox component="div" sx={{ border: "1px solid #dee2e6", borderRadius: "0.75rem", padding: "1.5rem", height: "100%" }} className="glass-card"><MuiBox component="div" sx={{ fontSize: "0.875em" }} className="text-muted-custom">Records analyzed</MuiBox><MuiBox component="div" sx={{ fontSize: "calc(1.375rem + 1.5vw)", fontWeight: 700, lineHeight: 1.2 }} className="text-main">{result.totalWorks.toLocaleString()}</MuiBox></MuiBox></MuiBox>
              <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:768px)": { gridColumn: "span 4" } }} ><MuiBox component="div" sx={{ border: "1px solid #dee2e6", borderRadius: "0.75rem", padding: "1.5rem", height: "100%" }} className="glass-card"><MuiBox component="div" sx={{ fontSize: "0.875em" }} className="text-muted-custom">Sources</MuiBox><MuiBox component="div" sx={{ fontSize: "calc(1.375rem + 1.5vw)", fontWeight: 700, lineHeight: 1.2 }} className="text-main">{sources.length}</MuiBox></MuiBox></MuiBox>
              <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:768px)": { gridColumn: "span 4" } }} ><MuiBox component="div" sx={{ border: "1px solid #dee2e6", borderRadius: "0.75rem", padding: "1.5rem", height: "100%" }} className="glass-card"><MuiBox component="div" sx={{ fontSize: "0.875em" }} className="text-muted-custom">Analyzed</MuiBox><MuiBox component="div" sx={{ fontSize: "1.25rem", fontWeight: 600, marginTop: "0.5rem" }} className="text-main">{new Date(result.analyzedAt).toLocaleString()}</MuiBox></MuiBox></MuiBox>
            </MuiBox>

            <MuiBox component="div" sx={{ display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", width: "100%", gap: "1.5rem" }} >
              <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:992px)": { gridColumn: "span 6" } }} >
                <MuiBox component="section" sx={{ border: "1px solid #dee2e6", borderRadius: "0.75rem", padding: "1.5rem", height: "100%" }} className="glass-card">
                  <MuiBox component="h2" sx={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "1rem" }} className="text-main">Results by source</MuiBox>
                  {sources.map(([name, summary]) => <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #dee2e6", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} key={name} ><MuiBox component="span" sx={{ textTransform: "capitalize" }} >{name}</MuiBox><MuiBox component="span" sx={{ fontWeight: 600 }} >{summary.workCount} works · {summary.citationCount.toLocaleString()} citations</MuiBox></MuiBox>)}
                </MuiBox>
              </MuiBox>
              <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:992px)": { gridColumn: "span 6" } }} >
                <MuiBox component="section" sx={{ border: "1px solid #dee2e6", borderRadius: "0.75rem", padding: "1.5rem", height: "100%" }} className="glass-card">
                  <MuiBox component="h2" sx={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "1rem" }} className="text-main">Publications by year</MuiBox>
                  {years.size === 0 ? <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom">The sources returned no publication years.</MuiBox> : [...years].sort(([a], [b]) => a - b).map(([year, count]) => <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #dee2e6", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} key={year} ><span>{year}</span><MuiBox component="span" sx={{ fontWeight: 600 }} >{count}</MuiBox></MuiBox>)}
                </MuiBox>
              </MuiBox>
              <MuiBox component="div" sx={{ gridColumn: "span 12" }} >
                <MuiBox component="section" sx={{ border: "1px solid #dee2e6", borderRadius: "0.75rem", padding: "1.5rem" }} className="glass-card">
                  <MuiBox component="h2" sx={{ fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "1rem" }} className="text-main">Frequently listed venues</MuiBox>
                  {sources.flatMap(([source, summary]) => (summary.topVenues || []).map((venue) => ({ ...venue, source }))).length === 0
                    ? <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom">No venue summary is available.</MuiBox>
                    : sources.flatMap(([source, summary]) => (summary.topVenues || []).map((venue) => ({ ...venue, source }))).map((venue) => <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #dee2e6", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} key={`${venue.source}-${venue.name}`} ><span>{venue.name} <small className="text-muted-custom">({venue.source})</small></span><MuiBox component="span" sx={{ fontWeight: 600 }} >{venue.count}</MuiBox></MuiBox>)}
                </MuiBox>
              </MuiBox>
            </MuiBox>
          </>
        ) : !analysisLoading && <MuiBox component="section" sx={{ border: "1px solid #dee2e6", borderRadius: "0.75rem", padding: "1.5rem", textAlign: "center" }} className="glass-card"><Icon sx={{ color: "text.secondary", marginBottom: "0.5rem" }} icon="lucide:chart-no-axes-combined" width="32"  /><MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom">No analysis summary yet. Run the analysis to fetch current results from the configured scholarly sources.</MuiBox></MuiBox>}
      </MuiBox>
    </MuiBox>
  );
}
