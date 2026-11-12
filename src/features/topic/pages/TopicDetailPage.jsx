import { useTranslation } from "react-i18next";
import { t } from "i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\topic\pages\TopicDetailPage.jsx
 */
import { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert } from '@/shared/components/ui/muiAdapters';
import { StateCard } from '../../../shared/components/Card';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import Header from '../../landing/components/Header';
import { getTopicByIdApi, getTopicArticlesApi } from '../api/topic.api';
import AdminPagination from '../../../shared/components/Pagination';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import LatexText from '../../../shared/components/LatexText/LatexText';


import MuiBox from '@mui/material/Box';

const PAGE_SIZE = 10;
const normalizeArticle = (item = {}) => ({
  id: item.article_id,
  title: item.title || 'Untitled article',
  year: item.publication_year,
  doi: item.doi,
  citations: item.citations_count ?? item.citations ?? 0
});
export default function TopicDetailPage() {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();
  const {
    topicId
  } = useParams();
  const [topic, setTopic] = useState(null);
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_SIZE,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    const fetchTopicDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const [topicResponse, articlesResponse] = await Promise.all([getTopicByIdApi(topicId), getTopicArticlesApi(topicId, {
          page: 1,
          limit: PAGE_SIZE
        })]);
        const topicData = topicResponse?.data?.data;
        const articlePayload = articlesResponse?.data?.data;
        if (!active) return;
        setTopic(topicData || null);
        setArticles((articlePayload?.articles || []).map(normalizeArticle));
        setPagination({
          page: articlePayload?.pagination?.page || 1,
          limit: articlePayload?.pagination?.limit || PAGE_SIZE,
          total: articlePayload?.pagination?.total || 0
        });
      } catch (err) {
        if (!active) return;
        setError(err.response?.data?.message || t("topic.khongTheTaiThongTinTopic"));
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchTopicDetail();
    return () => {
      active = false;
    };
  }, [topicId]);
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil((pagination.total || 0) / (pagination.limit || PAGE_SIZE)));
  }, [pagination]);
  const handlePageChange = async nextPage => {
    if (nextPage === pagination.page || nextPage < 1 || nextPage > totalPages) return;
    setLoading(true);
    setError('');
    try {
      const response = await getTopicArticlesApi(topicId, {
        page: nextPage,
        limit: pagination.limit || PAGE_SIZE
      });
      const payload = response?.data?.data;
      setArticles((payload?.articles || []).map(normalizeArticle));
      setPagination({
        page: payload?.pagination?.page || nextPage,
        limit: payload?.pagination?.limit || PAGE_SIZE,
        total: payload?.pagination?.total || 0
      });
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (err) {
      setError(err.response?.data?.message || t("topic.khongTheTaiDanhSachBaiBaoCuaTo"));
    } finally {
      setLoading(false);
    }
  };
  return <div className="topic-detail-page grid-bg">
      <Header />

      <Container sx={{ flexGrow: 1 }} >
        <MuiBox component="nav" sx={{ marginBottom: "1.5rem" }} aria-label="breadcrumb" className="topic-detail-breadcrumb">
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "1rem", listStyle: "none" }} >
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} >
              <span role="button" tabIndex={0} onClick={() => navigate('/articles')} onKeyDown={e => e.key === 'Enter' && navigate('/articles')} className="topic-detail-breadcrumb__link">{t("topic.baiBao")}</span>
            </MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" }, fontWeight: 600 }} className="active text-main" aria-current="page">{t("topic.chuDeNghienCuu")}</MuiBox>
          </MuiBox>
        </MuiBox>

        <Card className="topic-detail-hero">
          <Card.Body className="topic-detail-hero__body">
            <Row sx={{ gap: "3rem", alignItems: "center" }} >
              <Col lg={8}>
                <div className="topic-detail-eyebrow">
                  <Icon icon="solar:atom-bold-duotone" width="20" />
                  <span>Research Topic</span>
                </div>

                <h1 className="topic-detail-title">
                  {topic?.display_name || t("topic.dangTaiTopic")}
                </h1>

                <p className="topic-detail-description">{t("topic.khamPhaCacBaiBaoThuocChuDeNayD")}</p>
              </Col>

              <Col lg={4}>
                <div className="topic-detail-summary">
                  <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }} >
                    <div className="topic-detail-summary__label">{t("topic.maTopic")}</div>
                    <Badge className="topic-detail-summary__badge">
                      #{topic?.topic_id || topicId}
                    </Badge>
                  </MuiBox>

                  <hr className="topic-detail-summary__divider" />

                  <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                    <div className="topic-detail-summary__label">{t("project.tongSoBaiBao")}</div>
                    <div className="topic-detail-summary__value">
                      {(pagination.total || 0).toLocaleString('en-US')}
                    </div>
                  </MuiBox>

                  <PrimaryButton sx={{ marginTop: "0.5rem", width: "100%", justifyContent: "center" }} id="topic-view-all-articles" onClick={() => navigate(`/articles?topic_id=${topicId}`)} className="topic-detail-action">{t("topic.moBoLocBaiBao")}<Icon icon="lucide:arrow-right" width="18" />
                  </PrimaryButton>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }} className="topic-detail-section-heading">
          <div>
            <h2 className="topic-detail-section-title">{t("topic.baiBaoThuocTopic")}</h2>
            <p className="topic-detail-section-subtitle">
              {t("pagination.page", "Page")} {pagination.page} / {totalPages}
            </p>
          </div>
          <Badge className="topic-detail-count-badge">
            {(pagination.total || 0).toLocaleString('en-US')}{t("author.baiBao")}</Badge>
        </MuiBox>

        {error && <Alert sx={{ marginBottom: "1.5rem" }} variant="danger" className="topic-detail-alert">
            {error}
          </Alert>}

        {loading ? <MuiBox component="div" sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "3rem", paddingBottom: "3rem" }} >
            <Spinner animation="border" role="status" className="topic-detail-spinner">
              <MuiBox component="span" sx={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }} >Loading...</MuiBox>
            </Spinner>
          </MuiBox> : <MuiBox component="div" sx={{ display: "grid", gap: "1rem" }} >
            {articles.length === 0 ? <StateCard sx={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} variant="neutral" icon="lucide:file-question" title={t("topic.khongCoDuLieu")} description={t("topic.chuaCoBaiBaoNaoChoTopicNay")}  /> : articles.map(article => <Card key={article.id} className="topic-detail-article-card">
                  <Card.Body sx={{ padding: "1.5rem" }} >
                    <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }} >
                      <MuiBox component="div" sx={{ flexGrow: 1 }} >
                        <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "underline", bgcolor: "transparent", color: "primary.main", marginBottom: "0.5rem" }} type="button" className="topic-detail-article-title" onClick={() => navigate(`/articles/${article.id}/visual`)}>
                          <LatexText text={article.title} />
                        </MuiBox>

                        <div className="topic-detail-article-meta">
                          <MuiBox component="span" sx={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }} >
                            <Icon icon="lucide:calendar-range" width="15" />
                            {article.year || 'N/A'}
                          </MuiBox>
                          {article.doi && <MuiBox component="a" sx={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }} href={article.doi.startsWith('http') ? article.doi : `https://doi.org/${article.doi}`} target="_blank" rel="noreferrer" >
                              <Icon icon="lucide:link-2" width="15" />
                              DOI
                            </MuiBox>}
                        </div>
                      </MuiBox>
                    </MuiBox>
                  </Card.Body>
                </Card>)}
          </MuiBox>}

        {articles.length > 0 && totalPages > 1 && <AdminPagination totalItems={pagination.total} currentPage={pagination.page} limit={pagination.limit} onPageChange={handlePageChange} entityName="bài báo" />}
      </Container>
    </div>;
}
