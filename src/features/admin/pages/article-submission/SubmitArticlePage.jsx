import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState } from 'react';
import { Card, Button, Row, Col, Modal, Form } from '@/shared/components/ui/muiAdapters';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../../../shared/components/Icon';
import SubmissionTabs from '../../components/article-submission/SubmissionTabs';
import ManualArticleForm from '../../components/article-submission/ManualArticleForm';
import PdfDropzone from '../../components/article-submission/PdfDropzone';
import UploadFeatureCard from '../../components/article-submission/UploadFeatureCard';
import { useAdminStore } from '../../../../app/store/adminStore';
import PrimaryButton from '../../../../shared/components/Button/PrimaryButton';


import MuiBox from '@mui/material/Box';


/**
 * SubmitArticlePage Component
 * Orchestrates the full submit article flow (Page 15 & 16).
 */
export default function SubmitArticlePage() {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();
  const {
    saveDraft
  } = useAdminStore();

  // Tab State
  const [activeTab, setActiveTab] = useState('manual'); // 'manual' or 'pdf'

  // Shared state: values are preserved when switching tabs
  const [manualFormData, setManualFormData] = useState({
    title: '',
    abstract: '',
    keywords: [],
    author: '',
    journalId: '',
    categoryId: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Operation / Feedback UX states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);

  /**
   * Safe Draft submission handler.
   */
  const handleSaveDraft = () => {
    const draftItem = {
      type: activeTab,
      data: activeTab === 'manual' ? manualFormData : {
        fileName: selectedFile?.name,
        fileSize: selectedFile?.size
      },
      savedAt: new Date().toLocaleTimeString()
    };
    saveDraft(draftItem);
    alert(`Draft saved successfully at ${draftItem.savedAt}!`);
  };

  /**
   * Submits the article. Triggers client-side checks and uses available APIs only.
   */
  const handleSubmitArticle = async e => {
    e.preventDefault();
    if (activeTab === 'manual') {
      // Validate manual form fields
      const {
        title,
        abstract,
        author,
        journalId,
        categoryId,
        keywords
      } = manualFormData;
      if (!title || !abstract || !author || !journalId || !categoryId) {
        alert('Please fill in all required fields in the Manual Entry form.');
        return;
      }
      setIsSubmitting(true);
      try {
        const {
          getAuthorsApi,
          createAuthorApi
        } = await import('../../../../features/author/api/author.api');
        const {
          createArticleApi
        } = await import('../../../../features/article/api/articleApi');

        // Resolve author
        const authorNames = author.split(',').map(n => n.trim()).filter(Boolean);
        const authorIds = [];
        for (const name of authorNames) {
          const searchRes = await getAuthorsApi({
            search: name,
            limit: 1
          });
          const items = searchRes.data?.data?.items || searchRes.data?.data || [];
          if (items.length > 0 && items[0].display_name.toLowerCase() === name.toLowerCase()) {
            authorIds.push(Number(items[0].author_id || items[0].id));
          } else {
            const createRes = await createAuthorApi({
              display_name: name
            });
            authorIds.push(Number(createRes.data?.data?.author_id || createRes.data?.data?.id));
          }
        }

        // Prepare article payload
        const payload = {
          title,
          abstract,
          issue_id: null,
          publication_year: new Date().getFullYear(),
          primary_topic: parseInt(categoryId),
          authors: authorIds,
          keywords: keywords || []
        };
        await createArticleApi(payload);
        setIsSubmitting(false);
        setSuccessInfo({
          mode: 'manual',
          title: title,
          author: author
        });
        setShowSuccessModal(true);
      } catch (err) {
        setIsSubmitting(false);
        alert('Error submitting article: ' + (err.response?.data?.message || err.message));
      }
    } else {
      // Validate PDF upload file selection
      if (!selectedFile) {
        alert('Please select or drop a valid PDF manuscript to submit.');
        return;
      }
      setIsSubmitting(true);
      setIsSubmitting(false);
      alert(t("admin.chaCaApiSubmitPdfArticleAaXaaD"));
    }
  };

  /**
   * Reset form and file values.
   */
  const resetSubmissionForm = () => {
    setManualFormData({
      title: '',
      abstract: '',
      keywords: [],
      author: '',
      journalId: '',
      categoryId: ''
    });
    setSelectedFile(null);
    setShowSuccessModal(false);
  };
  return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} >
      {/* Page Breadcrumbs */}
      <MuiBox component="nav" sx={{ marginBottom: "1rem" }} aria-label="breadcrumb" >
        <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "0", listStyle: "none", fontSize: "0.875em" }} className="text-muted-custom">
          <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><MuiBox component={Link} sx={{ textDecoration: "none" }} to="/dashboard" className="text-muted-custom hover-primary">Articles</MuiBox></MuiBox>
          <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} className="active" aria-current="page">New Submission</MuiBox>
        </MuiBox>
      </MuiBox>

      {/* Main Header banner with Save Draft */}
      <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }} >
        <div>
          <MuiBox component="h1" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display text-main" style={{
          fontSize: '1.8rem'
        }}>Submit Article</MuiBox>
        </div>

        {/* Top Aligned Save Draft Button */}
        <Button sx={{ border: "1px solid #dee2e6", borderRadius: "0.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", fontWeight: 600 }} variant="light" onClick={handleSaveDraft} className="text-main hover-primary-light" style={{
        fontSize: '0.85rem'
      }}>
          Save Draft
        </Button>
      </MuiBox>

      <MuiBox component="div" sx={{ mx: "auto" }}  style={{
      maxWidth: '850px'
    }}>
        {/* Primary submission wrapper card */}
        <Card sx={{ padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #dee2e6", bgcolor: "background.paper", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", marginBottom: "3rem" }} >
          {/* Tab nav selectors */}
          <SubmissionTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <Form onSubmit={handleSubmitArticle}>
            {/* Conditional Tab Body Rendering */}
            <MuiBox component="div" sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", marginBottom: "1.5rem" }} >
              {activeTab === 'manual' ?
            // Tab 1: Manual Form Fields
            <ManualArticleForm formData={manualFormData} onChange={setManualFormData} /> :
            // Tab 2: PDF dropzone upload area
            <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} >
                  <PdfDropzone selectedFile={selectedFile} onFileSelect={setSelectedFile} onFileRemove={() => setSelectedFile(null)} />

                  {/* Highlight feature cards rendered at the bottom of upload view (Page 16) */}
                  <Row sx={{ gap: "1rem", marginTop: "0.25rem" }} >
                    <Col xs={12} md={4}>
                      <UploadFeatureCard title="OCR Processing" description="System automatically extracts metadata from your uploaded PDF." icon="lucide:scan-eye" />
                    </Col>
                    <Col xs={12} md={4}>
                      <UploadFeatureCard title="Secure Upload" description="Encrypted storage ensures your intellectual property is protected." icon="lucide:lock" />
                    </Col>
                    <Col xs={12} md={4}>
                      <UploadFeatureCard title="Fast Review" description="Uploaded PDFs enter the review queue immediately." icon="lucide:zap" />
                    </Col>
                  </Row>
                </MuiBox>}
            </MuiBox>

            {/* Bottom-right alignment Submit Action Button */}
            <MuiBox component="div" sx={{ display: "flex", justifyContent: "flex-end", paddingTop: "1rem", borderTop: "1px solid #dee2e6" }} >
              <PrimaryButton sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }} type="submit" disabled={isSubmitting} className="px-4.5" style={{
              minWidth: '150px'
            }}>
                {isSubmitting ? <>
                    <MuiBox component="span" sx={{ display: "inline-block", width: "1rem", height: "1rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", borderWidth: "0.2em", marginInlineEnd: "0.5rem" }}  role="status" aria-hidden="true"></MuiBox>
                    Submitting...
                  </> : 'Submit Article'}
              </PrimaryButton>
            </MuiBox>
          </Form>
        </Card>
      </MuiBox>

      {/* Success modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered backdrop="static" contentClassName="border-0 rounded-4 shadow-lg">
        <Modal.Body sx={{ padding: "1.5rem", "@media (min-width:768px)": { padding: "3rem" }, textAlign: "center" }} >
          {/* Animated/Glowing Check Icon */}
          <MuiBox component="div" sx={{ borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }} className="success-glow" style={{
          width: '72px',
          height: '72px',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)'
        }}>
            <Icon icon="lucide:check-circle" width="36" />
          </MuiBox>

          <MuiBox component="h3" sx={{ fontWeight: 700, marginBottom: "0.5rem" }} className="font-display text-main">Submission Successful!</MuiBox>
          <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "1.5rem" }} className="text-muted-custom">
            Your manuscript has been safely received. The review board and OCR pipelines will evaluate this entry.
          </MuiBox>

          {successInfo && <MuiBox component="div" sx={{ borderRadius: "0.5rem", border: "1px solid #dee2e6", marginBottom: "1.5rem", textAlign: "left" }} className="p-3.5" style={{
          backgroundColor: '#f8fafc',
          fontSize: '0.85rem'
        }}>
              <MuiBox component="div" sx={{ marginBottom: "0.5rem" }} >
                <span className="text-muted-custom">Mode: </span>
                <MuiBox component="strong" sx={{ textTransform: "capitalize" }} className="text-main">{successInfo.mode} Entry</MuiBox>
              </MuiBox>
              <MuiBox component="div" sx={{ marginBottom: "0.5rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >
                <span className="text-muted-custom">Identifier: </span>
                <strong className="text-main">{successInfo.title}</strong>
              </MuiBox>
              <MuiBox component="div" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >
                <span className="text-muted-custom">Author: </span>
                <strong className="text-main">{successInfo.author}</strong>
              </MuiBox>
            </MuiBox>}

          <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }} >
            <PrimaryButton className="py-2.5" onClick={() => {
            setShowSuccessModal(false);
            navigate('/dashboard');
          }}>
              Go to Dashboard
            </PrimaryButton>
            <PrimaryButton sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }} variant="outline"  onClick={resetSubmissionForm}>
              Submit Another Article
            </PrimaryButton>
          </MuiBox>
        </Modal.Body>
      </Modal>
    </MuiBox>;
}
