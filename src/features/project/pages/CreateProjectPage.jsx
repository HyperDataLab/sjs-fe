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

import IconButton from '@mui/material/IconButton';
import { XMarkIcon } from '@heroicons/react/24/outline';

import MuiBox from '@mui/material/Box';


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
    <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingBottom: "1.5rem", minHeight: "100vh", position: "relative", overflow: "hidden" }} className="grid-bg" style={{ paddingTop: '80px' }}>
      <MuiBox component="div" sx={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }} className="radial-fade" style={{ top: 0, left: 0, zIndex: 0 }} />
      <Header />
      <MuiBox component="div" sx={{ width: "100%", mx: "auto", px: "0.75rem", "@media (min-width:576px)": { maxWidth: 540 }, "@media (min-width:768px)": { maxWidth: 720 }, "@media (min-width:992px)": { maxWidth: 960 }, "@media (min-width:1200px)": { maxWidth: 1140 }, "@media (min-width:1400px)": { maxWidth: 1320 }, position: "relative", zIndex: 1 }}  style={{ maxWidth: '650px', marginTop: '40px' }}>
        <MuiBox component="nav" sx={{ marginBottom: "1.5rem" }} aria-label="breadcrumb" >
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "0.5rem", listStyle: "none", fontSize: "0.875em" }} className="text-muted-custom">
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><MuiBox component={Link} sx={{ textDecoration: "none" }} to={ROUTES.DASHBOARD} className="text-muted-custom hover-primary">{t('author.tongQuan')}</MuiBox></MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><MuiBox component={Link} sx={{ textDecoration: "none" }} to={ROUTES.PROJECTS} className="text-muted-custom hover-primary">{t('project.duAnTheoDoi')}</MuiBox></MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} className="active" aria-current="page">{t('journal.taoDuAnMoi')}</MuiBox>
          </MuiBox>
        </MuiBox>

        <MuiBox component="div" sx={{ padding: "1.5rem", "@media (min-width:768px)": { padding: "3rem" }, borderRadius: "0.75rem", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", border: "1px solid #dee2e6" }} className="glass-card">
          <MuiBox component="div" sx={{ marginBottom: "1.5rem", textAlign: "center" }} >
            <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "0.5rem" }} className="font-display text-main">{t('project.khoiTaoDuAnNghienCuuMoi')}</MuiBox>
            <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">{t('project.thietLapKhongGianLamViecDeTuDo')}</MuiBox>
          </MuiBox>

          {error && <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: 0, borderRadius: "0.5rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029", fontSize: "0.875em", paddingTop: "0.5rem", paddingBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }} role="alert" ><Icon icon="lucide:alert-circle" width="18" />{error}</MuiBox>}

          <form onSubmit={handleSubmit}>
            <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
              <MuiBox component="label" sx={{ display: "inline-block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "0.875em", textTransform: "uppercase" }} htmlFor="projectTitle" className="text-main tracking-wider">{t('project.tenDuAn')}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></MuiBox>
              <MuiBox component="input" sx={{ display: "block", width: "100%", px: "1rem", py: "0.5rem", fontSize: "1.25rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.5rem" }} id="projectTitle" className="journal-dark-input" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={200} disabled={loading} required autoFocus />
            </MuiBox>

            <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
              <MuiBox component="label" sx={{ display: "inline-block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "0.875em", textTransform: "uppercase" }} htmlFor="subjectArea" className="text-main tracking-wider">{t('project.linhVucNghienCuuChinh')}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></MuiBox>
              <MuiBox component="input" sx={{ display: "block", width: "100%", px: "1rem", py: "0.5rem", fontSize: "1.25rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.5rem" }} id="subjectArea" className="journal-dark-input" value={subjectArea} onChange={(event) => setSubjectArea(event.target.value)} maxLength={120} placeholder="e.g. Artificial intelligence" disabled={loading} required />
              <MuiBox component="div" sx={{ display: "block", marginTop: "0.25rem", fontSize: "0.875em", color: "text.secondary" }} >Research area is entered directly; the old backend catalog is no longer required.</MuiBox>
            </MuiBox>

            <MuiBox component="div" sx={{ marginBottom: "3rem" }} >
              <MuiBox component="label" sx={{ display: "inline-block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "0.875em", textTransform: "uppercase" }} htmlFor="projectKeywords" className="text-main tracking-wider">{t('project.tuKhoaMuonTheoDoi')}</MuiBox>
              <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0.5rem" }} className="text-muted-custom">Enter keywords separated by commas.</MuiBox>
              <MuiBox component="input" sx={{ display: "block", width: "100%", px: "0.75rem", py: "0.375rem", fontSize: "1rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.375rem" }} id="projectKeywords" className="journal-dark-input" value={keywordDraft} onChange={(event) => setKeywordDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addKeywords(keywordDraft); } }} onBlur={() => keywordDraft && addKeywords(keywordDraft)} placeholder="machine learning, scientific publishing" disabled={loading} />
              {keywords.length > 0 && <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }} >{keywords.map((keyword) => <MuiBox component="span" sx={{ display: "flex", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "#212529", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem", bgcolor: "#f8f9fa", border: "1px solid #dee2e6", alignItems: "center", gap: "0.5rem" }} key={keyword} >{keyword}<IconButton aria-label={`Remove ${keyword}`} onClick={() => setKeywords((current) => current.filter((item) => item !== keyword))} size="small" sx={{ p: 0.25, color: 'text.secondary' }}><XMarkIcon width={14} height={14} /></IconButton></MuiBox>)}</MuiBox>}
            </MuiBox>

            {loading && <MuiBox component="p" sx={{ fontSize: "0.875em" }} className="text-muted-custom" role="status">Saving the project and analyzing OpenAlex and Crossref…</MuiBox>}
            <MuiBox component="div" sx={{ display: "flex", gap: "1rem", justifyContent: "flex-end", paddingTop: "1rem", borderTop: "1px solid #dee2e6" }} >
              <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} type="button" variant="outline"  onClick={() => navigate(-1)} disabled={loading}>{t('admin.huy')}</PrimaryButton>
              <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} type="submit"  disabled={loading || !title.trim() || !subjectArea.trim()}>
                {loading ? <><MuiBox component="span" sx={{ display: "inline-block", width: "1rem", height: "1rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", borderWidth: "0.2em", marginInlineEnd: "0.5rem" }}  role="status" />{t('common.dangTai')}</> : t('journal.taoDuAnMoi')}
              </PrimaryButton>
            </MuiBox>
          </form>
        </MuiBox>
      </MuiBox>
    </MuiBox>
  );
}
