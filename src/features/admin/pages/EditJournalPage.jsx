import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState, useEffect } from 'react';
import { Form, Row, Col, Card } from '@/shared/components/ui/muiAdapters';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import { useJournalManagement } from '../../journal/hooks/useJournalManagement';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';


import MuiBox from '@mui/material/Box';

export default function EditJournalPage() {
  const { t: _t } = useTranslation();
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    updateJournal
  } = useJournalManagement();
  const isPreview = window.location.pathname.startsWith('/admin-preview');
  const basePath = isPreview ? '/admin-preview' : '/admin';
  const [formData, setFormData] = useState({
    title: '',
    issn: '',
    onlineIssn: '',
    aimScope: '',
    visibility: 'Public',
    publisher: '',
    subjectCategory: '',
    subjectArea: ''
  });
  const [errors, setErrors] = useState({});
  const [publishers, setPublishers] = useState([]);
  const [subjectAreas, setSubjectAreas] = useState([]);
  const [subjectCategories, setSubjectCategories] = useState([]);
  const [zones, setZones] = useState({
    countryZoneId: 1,
    regionZoneId: 2
  });
  const [loadingDeps, setLoadingDeps] = useState(false);
  useEffect(() => {
    const loadDependencies = async () => {
      setLoadingDeps(true);
      try {
        const {
          getPublishersApi,
          getSubjectAreasApi,
          getSubjectCategoriesApi
        } = await import('../../journal/api/journalApi');
        const {
          getCountryStatsApi,
          getRegionStatsApi
        } = await import('../../zone/api/zone.api');
        const [pubRes, countryRes, regionRes, areaRes, catRes] = await Promise.all([getPublishersApi({
          page: 1,
          limit: 100
        }), getCountryStatsApi({
          limit: 1
        }), getRegionStatsApi({
          limit: 1
        }), getSubjectAreasApi({
          page: 1,
          limit: 5000
        }), getSubjectCategoriesApi({
          page: 1,
          limit: 5000
        })]);
        const pubItems = pubRes.data?.data?.items || pubRes.data?.data || [];
        setPublishers(pubItems);
        const areaItems = areaRes.data?.data?.items || areaRes.data?.data || [];
        setSubjectAreas(areaItems);
        const catItems = catRes.data?.data?.items || catRes.data?.data || [];
        setSubjectCategories(catItems);
        const countryItems = countryRes.data?.data?.items || countryRes.data?.data || [];
        const regionItems = regionRes.data?.data?.items || regionRes.data?.data || [];
        setZones({
          countryZoneId: countryItems[0]?.zone_id || 1,
          regionZoneId: regionItems[0]?.zone_id || 2
        });
      } catch (err) {
        console.error('Failed to load publishers, zones or subjects', err);
      } finally {
        setLoadingDeps(false);
      }
    };
    loadDependencies();
  }, []);
  useEffect(() => {
    const loadJournalDetail = async () => {
      try {
        const { getJournalByIdApi } = await import('../../journal/api/journalApi');
        const res = await getJournalByIdApi(id);
        const journal = res.data?.data || res.data;
        if (journal) {
          setFormData({
            title: journal.display_name || journal.title || '',
            issn: journal.issn || '',
            onlineIssn: journal.onlineIssn || '',
            aimScope: journal.coverage || journal.description || journal.aimScope || '',
            visibility: journal.is_open_access ? 'Public' : (journal.visibility || 'Public'),
            publisher: journal.publisher_id || '',
            subjectCategory: journal.subjectCategory || '',
            subjectArea: journal.subjectArea || ''
          });
        }
      } catch (err) {
        console.error('Failed to load journal detail for editing', err);
      }
    };
    if (id) loadJournalDetail();
  }, [id]);
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handleToggleVisibility = () => {
    setFormData(prev => ({
      ...prev,
      visibility: prev.visibility === 'Public' ? 'Private' : 'Public'
    }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = t("admin.tenTapChiKhongDuocDeTrong");
    if (!formData.issn.trim()) newErrors.issn = t("admin.maSoIssnKhongDuocDeTrong");
    if (!formData.subjectCategory) newErrors.subjectCategory = t("admin.vuiLongChonDanhMucChinh");
    if (!formData.subjectArea.trim()) newErrors.subjectArea = t("admin.linhVucNghienCuuCuTheKhongDuoc");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    let formattedIssn = formData.issn.trim();
    if (/^\d{7}[\dX]$/i.test(formattedIssn.replace(/-/g, ''))) {
      const cleanIssn = formattedIssn.replace(/-/g, '');
      formattedIssn = cleanIssn.slice(0, 4) + '-' + cleanIssn.slice(4).toUpperCase();
    }

    let formattedOnlineIssn = formData.onlineIssn.trim();
    if (formattedOnlineIssn && /^\d{7}[\dX]$/i.test(formattedOnlineIssn.replace(/-/g, ''))) {
      const cleanOnline = formattedOnlineIssn.replace(/-/g, '');
      formattedOnlineIssn = cleanOnline.slice(0, 4) + '-' + cleanOnline.slice(4).toUpperCase();
    }

    const selectedPub = publishers.find(p => String(p.publisher_id || p.id) === String(formData.publisher));
    const payload = {
      display_name: formData.title,
      publisher_id: parseInt(formData.publisher),
      country: parseInt(zones.countryZoneId),
      region: parseInt(zones.regionZoneId),
      title: formData.title,
      issn: formattedIssn,
      onlineIssn: formattedOnlineIssn,
      aimScope: formData.aimScope,
      visibility: formData.visibility,
      subjectCategory: formData.subjectCategory,
      subjectArea: formData.subjectArea,
      publisher_name: selectedPub ? selectedPub.display_name : 'ResearchPulse Press',
      publisher: formData.publisher
    };

    try {
      await updateJournal(id, payload);
      navigate(`${basePath}/journals`);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      alert(t("admin.loiCapNhatTapChi") + " " + errorMsg);
    }
  };
  return <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }} >
      <div>
        <MuiBox component="div" sx={{ marginBottom: "0.5rem" }} className="admin-breadcrumb">
          <span className="cursor-pointer text-muted-custom" onClick={() => navigate(`${basePath}/journals`)}>
            Journals
          </span>
          <Icon sx={{ marginLeft: "0.25rem", marginRight: "0.25rem" }} icon="lucide:chevron-right"  />
          <span className="admin-breadcrumb__current">Edit Journal</span>
        </MuiBox>
        <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display text-main">Edit Journal</MuiBox>
        <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">
          Modify general information, editorial settings, and visibility for your journal.
        </MuiBox>
      </div>

      <Form sx={{ marginTop: "0.5rem" }} onSubmit={handleSubmit} >
        <Row sx={{ gap: "1.5rem" }} >
          {/* Left Column */}
          <Col xs={12} lg={8}>
            <Card sx={{ border: "1px solid #dee2e6", padding: "1.5rem", boxShadow: "none", bgcolor: "background.paper", borderRadius: "0.5rem" }} >
              <MuiBox component="h5" sx={{ fontWeight: 700, borderBottom: "1px solid #dee2e6", marginBottom: "1.5rem" }} className="font-display text-main pb-2.5">
                General Information
              </MuiBox>

              {/* Journal Title */}
              <Form.Group sx={{ marginBottom: "1.5rem" }} >
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">Journal Title <MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} isInvalid={!!errors.title} placeholder={t("admin.egJournalOfComputerScience")} />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>

              {/* ISSN inputs */}
              <Row sx={{ gap: "1rem", marginBottom: "1.5rem" }} >
                <Col xs={12} sm={6}>
                  <Form.Group>
                    <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">Print ISSN <MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
                    <Form.Control type="text" name="issn" value={formData.issn} onChange={handleChange} isInvalid={!!errors.issn} placeholder={t("admin.eg15493636")} />
                    <Form.Control.Feedback type="invalid">{errors.issn}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group>
                    <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">Online ISSN</Form.Label>
                    <Form.Control type="text" name="onlineIssn" value={formData.onlineIssn} onChange={handleChange} placeholder={t("admin.eg1937478x")} />
                  </Form.Group>
                </Col>
              </Row>

              {/* Aim & Scope */}
              <Form.Group sx={{ marginBottom: "0" }} >
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">Aim and Scope</Form.Label>
                <Form.Control as="textarea" rows={6} name="aimScope" value={formData.aimScope} onChange={handleChange} placeholder={t("admin.describeTheEditorialAimsScopes")} />
              </Form.Group>
            </Card>
          </Col>

          {/* Right Column */}
          <Col xs={12} lg={4}>
            <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} >
              {/* Visibility Card */}
              <Card sx={{ border: "1px solid #dee2e6", padding: "1.5rem", boxShadow: "none", bgcolor: "background.paper", borderRadius: "0.5rem" }} >
                <MuiBox component="h5" sx={{ fontWeight: 700, borderBottom: "1px solid #dee2e6", marginBottom: "1rem" }} className="font-display text-main pb-2.5">
                  Visibility
                </MuiBox>
                <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} >
                  <div>
                    <MuiBox component="div" sx={{ fontWeight: 700, fontSize: "0.875em" }} className="text-main mb-0.5">Publicly Listed</MuiBox>
                    <small className="text-muted-custom">Visible in main index</small>
                  </div>
                  <Form.Check type="switch" id="visibility-switch" className="admin-toggle-switch" checked={formData.visibility === 'Public'} onChange={handleToggleVisibility} style={{
                  fontSize: '1.2rem',
                  cursor: 'pointer'
                }} />
                </MuiBox>
              </Card>

              {/* Editorial Board Card */}
              <Card sx={{ border: "1px solid #dee2e6", padding: "1.5rem", boxShadow: "none", bgcolor: "background.paper", borderRadius: "0.5rem" }} >
                <MuiBox component="h5" sx={{ fontWeight: 700, borderBottom: "1px solid #dee2e6", marginBottom: "1.5rem" }} className="font-display text-main pb-2.5">
                  Editorial Board
                </MuiBox>

                {/* Publisher Select Dropdown */}
                <Form.Group sx={{ marginBottom: "1.5rem" }} >
                  <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">{t("admin.nhaXuatBanPublisher")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
                  <Form.Select name="publisher" value={formData.publisher} onChange={handleChange} isInvalid={!!errors.publisher} style={{
                  cursor: 'pointer'
                }}>
                    {loadingDeps ? <option>{t("admin.dangTaiDanhSachNhaXuatBan")}</option> : publishers.length === 0 ? <option value="">{t("admin.khongCoNhaXuatBanNao")}</option> : publishers.map(pub => <option key={pub.publisher_id || pub.id} value={pub.publisher_id || pub.id}>
                          {pub.display_name}
                        </option>)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.publisher}</Form.Control.Feedback>
                </Form.Group>

                {/* Category Selector */}
                <Form.Group sx={{ marginBottom: "1.5rem" }} >
                  <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">Broad Category <MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
                  <Form.Select name="subjectCategory" value={formData.subjectCategory} onChange={handleChange} isInvalid={!!errors.subjectCategory} style={{
                  cursor: 'pointer'
                }}>
                    <option value="">-- Choose category --</option>
                    {Array.from(new Map(subjectCategories.map(cat => [cat.display_name || cat.name, cat])).values()).map(cat => <option key={cat.subject_category_id || cat.id || cat.display_name} value={cat.display_name || cat.name}>
                        {cat.display_name || cat.name}
                      </option>)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.subjectCategory}</Form.Control.Feedback>
                </Form.Group>

                {/* Specific Research Area */}
                <Form.Group sx={{ marginBottom: "0" }} >
                  <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">Specific Research Area <MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
                  <Form.Select name="subjectArea" value={formData.subjectArea} onChange={handleChange} isInvalid={!!errors.subjectArea} style={{
                  cursor: 'pointer'
                }}>
                    <option value="">-- Choose area --</option>
                    {Array.from(new Map(subjectAreas.map(area => [area.display_name || area.name, area])).values()).map(area => <option key={area.subject_area_id || area.id || area.display_name} value={area.display_name || area.name}>
                        {area.display_name || area.name}
                      </option>)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.subjectArea}</Form.Control.Feedback>
                </Form.Group>
              </Card>
            </MuiBox>
          </Col>
        </Row>

        {/* Form Actions Footer */}
        <MuiBox component="div" sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #dee2e6" }}  style={{
        borderColor: 'var(--border)'
      }}>
          <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }} type="button" variant="outline" className="py-2.5" onClick={() => navigate(`${basePath}/journals`)}>
            Cancel Changes
          </PrimaryButton>
          <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }} type="submit" className="py-2.5">
            Update Journal
          </PrimaryButton>
        </MuiBox>
      </Form>
    </MuiBox>;
}
