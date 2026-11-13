import { useTranslation } from "react-i18next";
import { t } from "i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\pages\ArticleDetailPage.jsx
 */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Modal } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';

// Layout
import Header from '../../landing/components/Header';

// Auth
import useAuth from '../../auth/hooks/useAuth';

// API
import { getArticleDetailApi, getArticlesListApi } from '../api/articleApi';

// Subcomponents
import ArticleDetailSkeleton from '../components/ArticleDetailSkeleton';
import ArticleDetailEmpty from '../components/ArticleDetailEmpty';
import ArticleDetailError from '../components/ArticleDetailError';
import ArticlesTabContent from '../../journal/components/ArticlesTabContent';
import AuthRequiredModal from '../../../shared/components/AuthRequiredModal';
import { toast } from '../../../shared/utils/toast';
import { getDoiUrl, normalizeArticleDetail } from '../utils/articleFormatters';
import LatexText from '../../../shared/components/LatexText/LatexText';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';

const formatAuthorsLine = (authors = [], limit = 3) => {  if (!authors || authors.length === 0) return t("article.dangCapNhatTacGia");
  const names = authors.slice(0, limit).map(author => author.display_name || author.name || author.author_name || t("typeAuthor")).join(', ');
  return authors.length > limit ? `${names}...` : names;
};
const normalizeRecommendedArticle = (item = {}) => ({
  ...item,
  article_id: item.article_id || item.id,
  title: item.title || 'Untitled Article',
  publication_year: item.publication_year || item.year || '—',
  doi: item.doi || '',
  abstract: item.abstract || item.description || 'No abstract is available for this article.',
  authors: Array.isArray(item.authors) ? formatAuthorsLine(item.authors, 3) : item.authors || item.authors_text || ''
});
const topicKeywordChipStyle = {
  border: '1px solid var(--border)',
  color: 'var(--text-main)',
  backgroundColor: 'var(--bg-main)',
  borderRadius: '999px'
};
const formatReferenceLabel = (referenceUrl = '', index = 0) => {
  const rawValue = String(referenceUrl || '').trim();
  if (!rawValue) return `Reference ${index + 1}`;
  const workId = rawValue.split('/').filter(Boolean).pop();
  return workId ? `OpenAlex ${workId}` : `Reference ${index + 1}`;
};
const smoothScrollTo = targetId => {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
export default function ArticleDetailPage() {
  const { t: _t } = useTranslation();
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const currentUser = auth?.user;
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [isRecommendedLoading, setIsRecommendedLoading] = useState(false);
  const [showAllAuthors, setShowAllAuthors] = useState(false);
  const [showCitationsModal, setShowCitationsModal] = useState(false);
  const [referencePage, setReferencePage] = useState(1);
  const referencesPerPage = 2;
  const visibleAuthors = useMemo(() => {
    const authors = article?.authors || [];
    if (showAllAuthors) return authors;
    return authors.slice(0, 3);
  }, [article?.authors, showAllAuthors]);
  const hiddenAuthorCount = Math.max((article?.authors?.length || 0) - 3, 0);
  const references = article?.references || [];
  const referenceTotalPages = Math.max(1, Math.ceil(references.length / referencesPerPage));
  const paginatedReferences = references.slice((referencePage - 1) * referencesPerPage, referencePage * referencesPerPage);
  const keywordsText = useMemo(() => {    const keywords = article?.keywords || [];
    if (!keywords.length) return t("article.dangCapNhatTuKhoa");
    return keywords.map(keyword => keyword.display_name || keyword.name || keyword.keyword).filter(Boolean).join('; ');
  }, [article?.keywords]);
  const fetchRecommendedArticles = useCallback(async parsedArticle => {
    try {
      setIsRecommendedLoading(true);
      const params = {
        limit: 4,
        page: 1
      };
      const journalId = Number(parsedArticle.journal_id);
      const topicId = Number(parsedArticle.primary_topic || parsedArticle.topic_id);
      if (Number.isFinite(journalId)) params.journal_id = journalId;
      if (Number.isFinite(topicId)) params.topic_id = topicId;
      const response = await getArticlesListApi(params);
      const payload = response.data?.data || response.data || {};
      const rawItems = payload.items || payload.articles || payload.data || [];
      const normalizedItems = rawItems.map(normalizeRecommendedArticle).filter(item => String(item.article_id) !== String(parsedArticle.article_id)).slice(0, 3);
      setRecommendedArticles(normalizedItems);
    } catch (err) {
      console.warn('Error fetching recommended articles:', err);
      setRecommendedArticles([]);
    } finally {
      setIsRecommendedLoading(false);
    }
  }, []);
  const fetchArticleDetail = useCallback(async () => {    setIsLoading(true);
    setError(null);
    try {
      const response = await getArticleDetailApi(id);
      if (response.data && response.data.success !== false) {
        const apiData = response.data.data || {};
        const parsedArticle = normalizeArticleDetail(apiData, id);
        setArticle(parsedArticle);
        fetchRecommendedArticles(parsedArticle);
        const localBookmarkKey = `bookmark_${currentUser?.uid || 'guest'}_${id}`;
        const isLocallyBookmarked = localStorage.getItem(localBookmarkKey) === 'true';
        setIsBookmarked(apiData.is_bookmarked || isLocallyBookmarked);
      } else {
        throw new Error(t("article.khongTheTaiChiTietBaiBaoKhoaHo"));
      }
    } catch (err) {
      console.error('Error fetching article detail:', err);
      setError(err.response?.data?.message || err.message || t("article.loiKhiTaiDuLieuBaiBaoKhoaHoc"));
    } finally {
      setIsLoading(false);
    }
  }, [id, currentUser, fetchRecommendedArticles]);
  useEffect(() => {
    fetchArticleDetail();
  }, [fetchArticleDetail]);
  const handleBookmarkToggle = () => {    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }
    const localBookmarkKey = `bookmark_${currentUser.uid}_${id}`;
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    localStorage.setItem(localBookmarkKey, String(nextState));
    toast.success(nextState ? 'Saved in this browser.' : 'Removed from this browser.');
  };
  const handleDoiClick = () => {
    if (!articleDoiUrl) return;
    window.open(articleDoiUrl, '_blank', 'noopener,noreferrer');
  };
  const handleShareArticle = async () => {    const shareUrl = window.location.href;
    const shareData = {
      title: article?.title || 'Article detail',
      text: `Khám phá bài báo: ${article?.title || ''}`,
      url: shareUrl
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success(t("article.daMoChiaSeBaiBao"));
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      toast.success(t("article.daSaoChepLienKetBaiBao"));
    } catch (err) {
      if (err?.name === 'AbortError') return;
      console.warn('Unable to share article:', err);
      toast.error(t("article.khongTheChiaSeBaiBaoLucNay"));
    }
  };
  const handleKeywordClick = keyword => {
    const keywordId = keyword.keyword_id || keyword.id;
    if (keywordId) {
      navigate(`/keywords/${keywordId}/articles`);
      return;
    }
    const label = keyword.display_name || keyword.name || keyword.keyword;
    if (label) {
      navigate(`/articles?search=${encodeURIComponent(label)}`);
    }
  };
  const handleTopicClick = topic => {
    const topicId = topic?.topic_id || topic?.id;
    if (topicId) {
      navigate(`/topics/${topicId}`);
      return;
    }
    const label = topic?.display_name || topic?.name || '';
    if (!label) return;
    navigate(`/articles?search=${encodeURIComponent(label)}`);
  };
  const handleOrganizationAccess = () => {    if (article?.is_open_access && article?.doi) {
      window.open(getDoiUrl(article.doi), '_blank', 'noopener,noreferrer');
      return;
    }
    toast.info(t("article.hienChuaCoCongTruyCapToChucRie"));
  };
  const articleDoiUrl = getDoiUrl(article?.doi);
  return <div className="article-detail-page grid-bg">
      <Header />

      <Container sx={{ position: "relative", zIndex: 1, paddingLeft: "1rem", paddingRight: "1rem", "@media (min-width:1200px)": { paddingLeft: "3rem", paddingRight: "3rem" } }} fluid >
        {isLoading ? <ArticleDetailSkeleton /> : error ? <ArticleDetailError errorMsg={error} onRetry={fetchArticleDetail} /> : !article ? <ArticleDetailEmpty articleId={id} /> : <main className="article-detail-container">
            <div className="article-detail-shell">
              <MuiBox component="aside" sx={{ display: "none", "@media (min-width:1200px)": { display: "block" } }} className="article-detail-sidebar">
                <MuiBox component="h2" sx={getClassNameSx(`article-detail-journal-title mb-4 ${article.journal_id ? 'is-clickable' : ''}`)} className={stripMappedClassNames(`article-detail-journal-title mb-4 ${article.journal_id ? 'is-clickable' : ''}`)} role={article.journal_id ? 'button' : undefined} onClick={() => article.journal_id && navigate(`/journals/${article.journal_id}`)}>
                  {article.journal_name || 'Scientific Journal'}
                </MuiBox>

                <div className="article-detail-meta-list">
                  <span><strong>Date:</strong> {article.publication_year || t("article.dangCapNhat")}</span>
                  <span><strong>Article:</strong> {article.article_id}</span>
                  <span>
                    <strong>Volume:</strong>{' '}
                    <Button variant="link" disabled={!article.volume_id} onClick={() => article.volume_id && navigate(`/articles?volume_id=${article.volume_id}`)} className="article-detail-meta-link">
                      {article.volume_number || '—'}
                    </Button>
                  </span>
                  <span>
                    <strong>Issue:</strong>{' '}
                    <Button variant="link" disabled={!article.issue_id} onClick={() => article.issue_id && navigate(`/articles?issue_id=${article.issue_id}`)} className="article-detail-meta-link">
                      {article.issue_number || '—'}
                    </Button>
                  </span>
                  <span><strong>Access:</strong> {article.is_open_access ? 'Open access' : 'Restricted'}</span>
                </div>

                <div className="article-detail-divider" />

                <MuiBox component="div" sx={{ fontWeight: 700, textTransform: "uppercase", marginBottom: "0.5rem" }} className="text-muted-custom text-xs">{t("article.publisher")}</MuiBox>
                <MuiBox component="div" sx={{ fontWeight: 600, textTransform: "uppercase", display: "flex", flexDirection: "column", gap: "0.25rem" }} className="text-xs text-muted-custom">
                  <span>{article.publisher_name || t("article.dangCapNhat")}</span>
                  <span>Coverage: {article.publication_year || '—'}</span>
                </MuiBox>
              </MuiBox>

              <section className="article-detail-main">
                <div className="article-detail-breadcrumb">
                  <span role="button" onClick={() => navigate('/articles')} className="article-detail-breadcrumb-link">{t("articles")}</span>
                  <Icon icon="lucide:chevron-right" width="12" />
                  <span style={{
                color: 'var(--text-main)'
              }}>{t("article.chiTietBaiBao")}</span>
                </div>


                <h1 className="article-detail-title">
                  <LatexText text={article.title} />
                </h1>

                <div className="article-detail-authors">
                  {visibleAuthors.length > 0 ? visibleAuthors.map((author, index) => {                const authorLabel = author.display_name || author.name || author.author_name || t("typeAuthor");
                const authorId = author.author_id || author.id;
                return <Button key={authorId || `${authorLabel}-${index}`} variant="link" disabled={!authorId} onClick={() => authorId && navigate(`/authors/${authorId}`)} className="article-detail-author-link" title={authorId ? `Xem chi tiết ${authorLabel}` : authorLabel}>
                          {authorLabel}{index < visibleAuthors.length - 1 ? ',' : ''}
                        </Button>;
              }) : <span>{t("article.dangCapNhatTacGia")}</span>}
                  {hiddenAuthorCount > 0 && !showAllAuthors && <Button variant="link" onClick={() => setShowAllAuthors(true)} className="article-detail-author-toggle">
                      Show more +{hiddenAuthorCount}
                    </Button>}
                  {showAllAuthors && (article?.authors?.length || 0) > 3 && <Button variant="link" onClick={() => setShowAllAuthors(false)} className="article-detail-author-toggle">
                      Show less
                    </Button>}
                </div>


                <div className="article-detail-action-bar">
                  <div className="article-detail-actions">
                    <Button variant="link" onClick={() => setShowCitationsModal(true)} className="article-detail-action-btn">
                      <Icon icon="lucide:quote" width="15" />
                      {t("article.citations")}: {article.semantic_citation_count ?? article.citations ?? 0}
                    </Button>
                    <Button variant="link" onClick={handleBookmarkToggle} className={`article-detail-action-btn ${isBookmarked ? 'is-active' : ''}`}>
                      <Icon icon={isBookmarked ? 'lucide:bookmark-check' : 'lucide:bookmark-plus'} width="15" />
                      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </Button>
                    <Button variant="link" onClick={handleShareArticle} className="article-detail-action-btn">
                      <Icon icon="lucide:share-2" width="15" />
                      {t("article.share")}
                    </Button>

                  </div>
                </div>

                <div className="article-detail-external-bar">
                  {articleDoiUrl && <a href={articleDoiUrl} target="_blank" rel="noreferrer" className="article-detail-doi-link">
                      {articleDoiUrl}
                      <Icon icon="lucide:external-link" width="14" />
                    </a>}
                  <span className="article-detail-access-badge">
                    <span className={`article-detail-access-dot ${article.is_open_access ? 'is-open' : ''}`} />
                    {article.is_open_access ? 'Open access' : 'Restricted access'}
                  </span>
                </div>

                <div className="article-detail-tabs">
                  <Button variant="link" onClick={() => setActiveTab('preview')} className={`article-detail-tab-btn ${activeTab === 'preview' ? 'is-active' : ''}`}>
                    Article Preview
                  </Button>
                  <Button variant="link" onClick={() => setActiveTab('keywords_topics')} className={`article-detail-tab-btn ${activeTab === 'keywords_topics' ? 'is-active' : ''}`}>
                    Keywords & Topics
                  </Button>
                  <Button variant="link" onClick={() => setActiveTab('references')} className={`article-detail-tab-btn ${activeTab === 'references' ? 'is-active' : ''}`}>
                    References ({(article.references || []).length})
                  </Button>
                  <Button variant="link" onClick={() => setActiveTab('recommended')} className={`article-detail-tab-btn ${activeTab === 'recommended' ? 'is-active' : ''}`}>
                    Recommended Articles
                  </Button>
                  <Button variant="link" onClick={() => navigate(`/articles/${id}/visual`)} className="article-detail-tab-btn" style={{
                color: 'var(--primary)',
                fontWeight: 'bold'
              }}>
                    <Icon sx={{ marginInlineEnd: "0.25rem" }} icon="lucide:network" width="14"  />
                    Interactive Graph
                  </Button>
                </div>

                {activeTab === 'preview' ? <div className="article-preview-grid">
                    <article>
                      {/* TL;DR section */}
                      {article.semantic_tldr && <section id="tldr" className="article-section">
                          <h2 className="article-section-title" style={{
                    fontSize: '1.4rem'
                  }}>TL;DR</h2>
                          <MuiBox component="div" sx={{ padding: "1rem", borderRadius: "0.375rem" }}  style={{
                    backgroundColor: 'var(--primary-light)',
                    borderLeft: '4px solid var(--primary)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    lineHeight: '1.65'
                  }}>
                            <strong>Summary:</strong> {article.semantic_tldr}
                          </MuiBox>
                        </section>}

                      <section id="abstract" className="article-section">
                        <h2 className="article-section-title" style={{
                    fontSize: '1.65rem'
                  }}>{t("article.abstract")}</h2>
                        {(article.abstract || 'No abstract is available for this article.').split('\n').filter(Boolean).map((paragraph, index) => (
                             <LatexText key={index} text={paragraph} as="p" className="article-section-text" />
                        ))}
                      </section>


                      <section id="section-snippets" className="article-section">
                        <h2 className="article-section-title">Section snippets</h2>
                        <p className="article-section-text" style={{
                    fontSize: '0.98rem'
                  }}>{t("article.tomTatNhanhBaiBaoThuocChuDe")} <strong>{article.topic_name || 'Research'}</strong>{t("article.congBoTrong")} <strong>{article.journal_name || 'Scientific Journal'}</strong>
                          {article.publication_year ? ` năm ${article.publication_year}` : ''}.
                        </p>
                      </section>
                    </article>

                    <MuiBox component="aside" sx={{ display: "none", "@media (min-width:992px)": { display: "block" } }} className="article-toc-aside">
                      <div className="article-toc-title">Article preview</div>
                      <MuiBox component="nav" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }} >
                        {article.semantic_tldr && <Button variant="link" onClick={() => smoothScrollTo('tldr')} className="article-toc-link">TL;DR</Button>}
                        <Button variant="link" onClick={() => smoothScrollTo('abstract')} className="article-toc-link is-active">Abstract</Button>
                        <Button variant="link" onClick={() => smoothScrollTo('section-snippets')} className="article-toc-link">Section snippets</Button>
                      </MuiBox>
                    </MuiBox>
                  </div> : activeTab === 'keywords_topics' ? <div className="keywords-topics-tab-panel">
                    <MuiBox component="section" sx={{ marginBottom: "3rem" }} >
                      <MuiBox component="h2" sx={{ marginBottom: "1.5rem" }} className="article-section-title">{t("article.keywords")}</MuiBox>
                      {(article.keywords || []).length > 0 ? <MuiBox component="div" sx={{ display: "grid", gridTemplateColumns: "repeat(12,minmax(0,1fr))", width: "100%", gap: "1.5rem" }} >
                          {article.keywords.map((keyword, index) => {                    const label = keyword.display_name || keyword.name || keyword.keyword;
                    const keywordId = keyword.keyword_id || keyword.id;
                    return <MuiBox component="div" sx={{ gridColumn: "span 12", "@media (min-width:768px)": { gridColumn: "span 6" }, "@media (min-width:992px)": { gridColumn: "span 4" } }} key={keywordId || `${label}-${index}`} >
                                <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }} className="keyword-card">
                                  <MuiBox component="div" sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }} >
                                    <div>
                                      <div className="keyword-card-label">Research keyword</div>
                                      <h3 className="keyword-card-title">{label}</h3>
                                    </div>
                                    <Icon icon="lucide:tags" width="18" className="keyword-card-icon" />
                                  </MuiBox>
                                  <Button sx={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }} id={`keyword-view-${keywordId || label}`} type="button" onClick={() => handleKeywordClick(keyword)} className="keyword-card-action" style={{
                          width: 'fit-content'
                        }}>
                                    <span>{t("article.xemBaiBaoLienQuan")}</span>
                                    <Icon icon="lucide:arrow-up-right" width="16" />
                                  </Button>
                                </MuiBox>
                              </MuiBox>;
                  })}
                        </MuiBox> : <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem" }} className="article-reference-card-empty">
                          <Icon sx={{ color: "text.secondary", marginBottom: "1rem" }} icon="lucide:tags" width="48"  />
                          <MuiBox component="p" sx={{ marginBottom: "0" }} >{keywordsText}</MuiBox>
                        </MuiBox>}
                    </MuiBox>

                    {article.topics?.length > 0 && <MuiBox component="section" sx={{ marginTop: "3rem" }} >
                        <MuiBox component="h2" sx={{ marginBottom: "1rem" }} className="article-section-title">Topics</MuiBox>
                        <MuiBox component="div" sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }} >
                          {article.topics.map(topic => <Button key={topic.topic_id || topic.display_name} variant="light" onClick={() => handleTopicClick(topic)} className="article-topic-chip" style={topicKeywordChipStyle}>
                              {topic.display_name}
                            </Button>)}
                        </MuiBox>
                      </MuiBox>}
                  </div> : activeTab === 'references' ? <div className="references-tab-panel">
                    <MuiBox component="h2" sx={{ marginBottom: "1.5rem" }} className="article-section-title">{t("article.references")}</MuiBox>
                    <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="article-section-text" style={{
                fontSize: '0.98rem'
              }}>{t("article.baiBaoHienCo")}{" "}<strong>{(article.references || []).length}</strong>{" "}{t("article.taiLieuThamKhaoDuocDongBoTrong")}{" "}<strong>{article.semantic_citation_count ?? article.citations ?? 0}</strong>.
                    </MuiBox>

                    {(article.references || []).length > 0 ? <MuiBox component="div" sx={{ display: "grid", gap: "1rem" }} >
                        {(article.references || []).map((referenceUrl, index) => {                  return <a key={`${referenceUrl}-${index}`} href={referenceUrl} target="_blank" rel="noreferrer" className="article-reference-card">
                              <MuiBox component="div" sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }} >
                                <div className="min-w-0">
                                  <div className="article-reference-label">
                                    {t("article.referenceLabel")} {index + 1}
                                  </div>
                                  <div className="article-reference-title">
                                    {formatReferenceLabel(referenceUrl, index)}
                                  </div>
                                  <div className="article-reference-url">
                                    {referenceUrl}
                                  </div>
                                </div>
                                <span className="article-reference-action">
                                  <Icon icon="lucide:external-link" width="16" />{t("article.moNguon")}</span>
                              </MuiBox>
                            </a>;
                })}
                      </MuiBox> : <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem" }} className="article-reference-card-empty">{t("article.chuaCoDanhSachReferenceChiTiet")}</MuiBox>}
                  </div> : <ArticlesTabContent recentArticles={recommendedArticles} loading={isRecommendedLoading} onArticleClick={articleId => navigate(`/articles/${articleId}/visual`)} />}
              </section>
            </div>

          </main>}
      </Container>

      <Modal show={showCitationsModal} onHide={() => setShowCitationsModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title sx={{ fontWeight: 700 }} className="font-display">{t("article.citationsCitedBy")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="article-modal-stat-box">
            <MuiBox component="div" sx={{ fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem" }} className="text-muted-custom text-xs">{t("article.tongLuotTrichDan")}</MuiBox>
            <MuiBox component="div" sx={{ fontWeight: 700 }} className="font-display" style={{
            fontSize: '2rem',
            color: 'var(--text-main)'
          }}>
              {(article?.citations ?? 0).toLocaleString('en-US')}
            </MuiBox>
          </div>

          <MuiBox component="p" sx={{ marginBottom: "1rem" }} className="text-muted-custom" style={{
          lineHeight: 1.7
        }}>
            <strong style={{
            color: 'var(--text-main)'
          }}>Citations</strong>{t("article.laSoLuongBaiBaoHoacCongTrinhKh")}</MuiBox>

          <MuiBox component="div" sx={{ display: "grid", gap: "0.5rem" }}  style={{
          fontSize: '0.94rem'
        }}>
            <div><strong>DOI:</strong>{t("article.maDinhDanhCoDinhCuaBaiBao")}</div>
            <div><strong>References:</strong>{t("article.danhSachTaiLieuMaBaiBaoNayTric")}</div>
            <div><strong>Citations / Cited by:</strong>{t("article.soCongTrinhKhacTrichDanLaiBaiB")}</div>
          </MuiBox>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowCitationsModal(false)}>{t("article.dong")}</Button>
        </Modal.Footer>
      </Modal>

      <AuthRequiredModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
    </div>;
}
