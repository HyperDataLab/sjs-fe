import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import ROUTES from '../../../app/routes/routePaths';
import projectService from '../services/projectService';
import Icon from '../../../shared/components/Icon.jsx';
import { getSubjectAreasApi } from '../../catalog/api/catalogApi';
import keywordApi from '../../keywords/api/keywordApi';
import keywordService from '../../keyword/services/keywordService';
import SearchableKeywordInput from '../../../shared/components/Input/SearchableKeywordInput';
import Header from '../../landing/components/Header';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';


import MuiBox from '@mui/material/Box';

const EditProjectPage = () => {
  const { t: _t } = useTranslation();
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form State
  const [title, setTitle] = useState('');
  const [subjectAreaId, setSubjectAreaId] = useState('');
  const [keywords, setKeywords] = useState([]);

  // API Data State
  const [areas, setAreas] = useState([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);

  // Loading States
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const [areasRes, projectRes] = await Promise.all([getSubjectAreasApi(), projectService.getProjectById(id)]);
        if (areasRes?.data) setAreas(areasRes.data?.data?.items || areasRes.data?.data || areasRes.data || []);

        // Pre-fill
        if (projectRes && projectRes.data) {
          const p = projectRes.data;
          setTitle(p.title || '');
          setSubjectAreaId(p.subject_area?.subject_area_id || p.subject_area || '');
          if (p.watched_keywords && Array.isArray(p.watched_keywords) && p.watched_keywords.length > 0) {
            setKeywords(p.watched_keywords);
          } else {
            try {
              const trendingList = await keywordService.getTrendingKeywords(id, 100);
              if (trendingList && trendingList.length > 0) {
                setKeywords(trendingList.map(t => t.keyword || t.display_name));
              } else if (p.project_keywords) {
                setKeywords(p.project_keywords.map(pk => pk.keyword_text || pk.keyword || pk));
              }
            } catch (e) {
              console.error('Error fetching trending keywords:', e);
            }
          }
        }
      } catch (err) {
        console.error(t("project.loiTaiDuLieuDuAn"), err);
        setError(t("project.khongTheTaiDuLieuDuAnVuiLongTa"));
      } finally {
        setLoadingData(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  useEffect(() => {
    if (!subjectAreaId) {
      setSuggestedKeywords([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoadingSuggestions(true);
      try {
        const queryParams = { limit: 10, subject_area_id: subjectAreaId };
        const res = await keywordApi.getKeywords(queryParams);
        const items = res?.data?.data?.items || res?.data?.data || res?.data || [];
        setSuggestedKeywords(Array.isArray(items) ? items.map(k => k.display_name || k.name).filter(Boolean) : []);
      } catch (err) {
        console.error(t("project.loiTaiGoiYTuKhoa"), err);
      } finally {
        setLoadingSuggestions(false);
      }
    };
    fetchSuggestions();
  }, [subjectAreaId]);
  const selectedAreaObj = areas.find(a => String(a.id || a.subject_area_id) === String(subjectAreaId));
  const selectedAreaName = selectedAreaObj ? selectedAreaObj.display_name || selectedAreaObj.name || selectedAreaObj.area_name : '';
  const removeKeyword = kw => {
    setKeywords(keywords.filter(k => k !== kw));
  };
  const addSuggestedKeyword = kw => {
    if (!keywords.includes(kw)) {
      setKeywords([...keywords, kw]);
    }
  };

  // Handle Area Change
  const handleAreaChange = e => {
    setSubjectAreaId(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim() || !subjectAreaId) {
      setError(t("project.vuiLongNhapTenDuAnVaChonLinhVu"));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // 1. Cập nhật thông tin dự án (không kèm keywords vì BE đã revert)
      const res = await projectService.updateProject(id, {
        title: title.trim(),
        subject_area_id: parseInt(subjectAreaId, 10),
        subject_category_ids: [],
        journal_ids: []
      });

      // 2. Đồng bộ keywords từ Frontend
      if (res && res.success !== false) {
        await keywordService.syncProjectKeywordsFEOnly(id, keywords);
        queryClient.invalidateQueries(['project', id, 'overview']);
        navigate(`/projects/${id}`);
      } else {
        setError(res?.message || t("project.capNhatDuAnThatBai"));
      }
    } catch (err) {
      console.error('Error updating project:', err);
      setError(err.response?.data?.message || err.message || t("project.daCoLoiXayRaKhiCapNhatDuAn"));
    } finally {
      setLoading(false);
    }
  };
  if (loadingData) {
    return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingTop: "1.5rem", paddingBottom: "1.5rem", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} className="grid-bg">
        <MuiBox component="div" sx={{ display: "inline-block", width: "2rem", height: "2rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", color: "primary.main" }}  role="status"></MuiBox>
      </MuiBox>;
  }
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
      maxWidth: '650px',
      marginTop: '40px'
    }}>
        <MuiBox component="nav" sx={{ marginBottom: "1.5rem" }} aria-label="breadcrumb" >
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "0.5rem", listStyle: "none", fontSize: "0.875em" }} className="text-muted-custom">
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><MuiBox component={Link} sx={{ textDecoration: "none" }} to="/dashboard" className="text-muted-custom hover-primary">{t("author.tongQuan")}</MuiBox></MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><MuiBox component={Link} sx={{ textDecoration: "none" }} to="/projects" className="text-muted-custom hover-primary">{t("project.duAnTheoDoi")}</MuiBox></MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><MuiBox component={Link} sx={{ textDecoration: "none" }} to={`/projects/${id}`} className="text-muted-custom hover-primary">{title || t("landing.duAn")}</MuiBox></MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} className="active" aria-current="page">{t("project.quanLyTuKhoa")}</MuiBox>
          </MuiBox>
        </MuiBox>

        <MuiBox component="div" sx={{ padding: "1.5rem", "@media (min-width:768px)": { padding: "3rem" }, borderRadius: "0.75rem", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", border: "1px solid #dee2e6", bgcolor: "background.paper" }} className="glass-card">
          <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
            <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "0.5rem" }} className="font-display text-main" style={{
            fontSize: '1.75rem'
          }}>{t("project.quanLyTuKhoaTheoDoi")}</MuiBox>
            <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">{t("project.themHoacXoaCacCumTuKhoaNghienC")}</MuiBox>
          </MuiBox>

          {error && <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: 0, borderRadius: "0.5rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029", fontSize: "0.875em", paddingTop: "0.5rem", paddingBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }} >
              <Icon icon="lucide:alert-circle" width="18" />
              {error}
            </MuiBox>}

          <form onSubmit={handleSubmit}>
            <MuiBox component="div" sx={{ marginBottom: "3rem" }} >
              <MuiBox component="label" sx={{ display: "inline-block", marginBottom: "0.5rem", fontWeight: 600, fontSize: "0.875em", textTransform: "uppercase" }} className="text-muted-custom tracking-wider">{t("project.tuKhoaDangTheoDoi")}</MuiBox>
              <SearchableKeywordInput keywords={keywords} subjectAreaId={subjectAreaId} placeholder={t("project.chonTuKhoaTheoDoi")} disabled={loading} onAddKeyword={val => {
              if (val && !keywords.includes(val)) {
                setKeywords([...keywords, val]);
              }
            }} onRemoveKeyword={removeKeyword} />

              {subjectAreaId && suggestedKeywords.length > 0 && <MuiBox component="div" sx={{ marginTop: "1rem", fontSize: "0.875em" }} >
                  <span className="text-muted-custom">{t("project.goiYTuKhoaNoiBat")}</span>
                  {loadingSuggestions ? <MuiBox component="span" sx={{ marginInlineStart: "0.5rem" }} className="text-muted-custom">{t("common.dangTai")}</MuiBox> : <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }} >
                      {suggestedKeywords.filter(k => !keywords.includes(k)).map(sugg => <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "#212529", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem", bgcolor: "#f8f9fa", border: "1px solid #dee2e6" }} key={sugg} className="cursor-pointer hover-primary" onClick={() => addSuggestedKeyword(sugg)}>
                          + {sugg}
                        </MuiBox>)}
                    </MuiBox>}
                </MuiBox>}
            </MuiBox>

            <MuiBox component="div" sx={{ display: "flex", gap: "1rem", justifyContent: "flex-end", paddingTop: "1.5rem", marginTop: "1.5rem", borderTop: "1px solid #dee2e6" }} >
              <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} type="button" variant="outline"  onClick={() => navigate(-1)} disabled={loading}>{t("auth.quayLai")}</PrimaryButton>
              <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} type="submit"  disabled={loading}>
                {loading ? <>
                    <MuiBox component="span" sx={{ display: "inline-block", width: "1rem", height: "1rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", borderWidth: "0.2em" }}  role="status" aria-hidden="true"></MuiBox>{t("project.dangLuu")}</> : <>
                    <Icon icon="lucide:save" width="18" />{t("admin.luuThayDoi")}</>}
              </PrimaryButton>
            </MuiBox>
          </form>
        </MuiBox>
      </MuiBox>
    </MuiBox>;
};
export default EditProjectPage;
