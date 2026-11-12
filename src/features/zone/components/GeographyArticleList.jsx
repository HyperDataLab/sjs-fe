import { useTranslation } from "react-i18next";
import { Table, Card, Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import AdminPagination from '../../../shared/components/Pagination';
import LatexText from '../../../shared/components/LatexText/LatexText';


import MuiBox from '@mui/material/Box';

export default function GeographyArticleList({
  articles = [],
  loading = false,
  total = 0,
  page = 1,
  totalPages = 1,
  onPageChange,
  onDetailClick,
  countryName = ''
}) {
  const { t } = useTranslation();
  // Copy DOI to clipboard helper
  const handleCopyDoi = (e, doi) => {    e.stopPropagation();
    if (!doi) return;
    navigator.clipboard.writeText(doi);
    alert(t("article.daSaoChepMaDoiVaoBoNhoTam") + doi);
  };

  // Assign colors to topics from dev branch
  const getTopicStyle = topic => {
    if (!topic) return {
      bg: 'var(--bg-main)',
      color: 'var(--text-muted)'
    };
    const name = String(topic).toLowerCase();
    if (name.includes('machine learning') || name.includes('ml')) {
      return {
        bg: 'var(--primary-light)',
        color: 'var(--primary)'
      };
    }
    if (name.includes('computer science') || name.includes('cs')) {
      return {
        bg: 'rgba(6, 182, 212, 0.1)',
        color: '#0891b2'
      };
    }
    if (name.includes('medicine') || name.includes('bio')) {
      return {
        bg: 'rgba(16, 185, 129, 0.1)',
        color: '#059669'
      };
    }
    if (name.includes('physic')) {
      return {
        bg: 'rgba(245, 158, 11, 0.1)',
        color: '#d97706'
      };
    }
    return {
      bg: 'rgba(139, 92, 246, 0.1)',
      color: '#7c3aed'
    };
  };

  // Render skeletons for loading state
  const renderSkeletons = () => <tbody>
      {[1, 2, 3, 4, 5].map(i => <tr key={i} style={{
      borderBottom: '1px solid var(--border)'
    }}>
          <MuiBox component="td" sx={{ paddingInlineStart: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }}  style={{
        width: '40px'
      }}>
            <div className="skeleton-shimmer" style={{
          width: '15px',
          height: '14px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >
            <MuiBox component="div" sx={{ marginBottom: "0.5rem" }} className="skeleton-shimmer" style={{
          width: '80%',
          height: '18px'
        }} />
            <div className="skeleton-shimmer" style={{
          width: '45%',
          height: '12px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >
            <div className="skeleton-shimmer" style={{
          width: '120px',
          height: '14px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", textAlign: "center" }} >
            <MuiBox component="div" sx={{ mx: "auto" }} className="skeleton-shimmer" style={{
          width: '40px',
          height: '14px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >
            <div className="skeleton-shimmer" style={{
          width: '100px',
          height: '12px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >
            <div className="skeleton-shimmer" style={{
          width: '90px',
          height: '20px',
          borderRadius: '4px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", textAlign: "center" }} >
            <MuiBox component="div" sx={{ mx: "auto" }} className="skeleton-shimmer" style={{
          width: '25px',
          height: '16px',
          borderRadius: '3px'
        }} />
          </MuiBox>
          <MuiBox component="td" sx={{ paddingInlineEnd: "1rem", textAlign: "right", paddingTop: "1rem", paddingBottom: "1rem" }} >
            <MuiBox component="div" sx={{ ml: "auto" }} className="skeleton-shimmer" style={{
          width: '50px',
          height: '16px'
        }} />
          </MuiBox>
        </tr>)}
    </tbody>;
  return <MuiBox component="div" sx={{ marginTop: "1.5rem", padding: "1.5rem" }} className="journal-dark-card">
      {/* Title */}
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }} >
        <div>
          <MuiBox component="h3" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display text-main" style={{
          fontSize: '1.25rem'
        }}>{t("zone.danhSachBaiBaoKhoaHocTai")} {countryName}
          </MuiBox>
          {!loading && articles.length > 0 && <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom text-xs font-display">{t("zone.hienThiBaiBaoThu")} <MuiBox component="span" sx={{ fontWeight: 600 }} className="text-main">{(page - 1) * 10 + 1}</MuiBox> - <MuiBox component="span" sx={{ fontWeight: 600 }} className="text-main">{Math.min(page * 10, total)}</MuiBox> {t("zone.trongTongSo")} <MuiBox component="span" sx={{ fontWeight: 600 }} className="text-main">{total}</MuiBox> {t("zone.baiBao")}</MuiBox>}
        </div>
      </MuiBox>

      {loading && articles.length === 0 ? <MuiBox component="div" sx={{ width: "100%", borderRadius: "0.5rem", overflow: "hidden" }}  style={{
      border: '1px solid var(--border)'
    }}>
          <Table sx={{ margin: "0", bgcolor: "transparent", border: 0 }} responsive hover className="text-main geography-table" style={{
        fontSize: '0.85rem'
      }}>
            <thead>
              <tr style={{
            borderBottom: '1px solid var(--border)'
          }}>
                <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem", paddingInlineStart: "1rem" }} className="text-muted-custom text-xs" style={{
              width: '40px'
            }}>#</MuiBox>
                <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-muted-custom text-xs">{t("article.tenBaiBao")}</MuiBox>
                <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-muted-custom text-xs">JOURNAL</MuiBox>
                <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "center" }} className="text-muted-custom text-xs" style={{
              width: '80px'
            }}>{t("article.nam1")}</MuiBox>
                <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-muted-custom text-xs">DOI</MuiBox>
                <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-muted-custom text-xs">TOPIC</MuiBox>
                <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "center" }} className="text-muted-custom text-xs" style={{
              width: '60px'
            }}>OA</MuiBox>
                <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "right", paddingInlineEnd: "1rem" }} className="text-muted-custom text-xs">{t("article.chiTiet")}</MuiBox>
              </tr>
            </thead>
            {renderSkeletons()}
          </Table>
        </MuiBox> : articles.length === 0 ? <MuiBox component="div" sx={{ textAlign: "center", padding: "3rem", borderRadius: "0.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}  style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border)',
      minHeight: '220px'
    }}>
          <MuiBox component="div" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}  style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        color: '#ef4444'
      }}>
            <Icon icon="lucide:file-x" width="24" height="24" />
          </MuiBox>
          <MuiBox component="h5" sx={{ marginBottom: "0.25rem" }} className="text-main font-weight-bold font-display" style={{
        fontSize: '1rem'
      }}>{t("zone.khongCoBaiBaoNao")}</MuiBox>
          <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom text-xs max-w-md font-display">{t("zone.hienTaiChuaCoBaiBaoKhoaHocNaoT")}</MuiBox>
        </MuiBox> : <>
          {/* Table for Desktop & Tablet */}
          <MuiBox component="div" sx={{ width: "100%", borderRadius: "0.5rem", overflow: "hidden", display: "none", "@media (min-width:768px)": { display: "block" }, boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)" }}  style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)'
      }}>
            <Table sx={{ margin: "0", bgcolor: "transparent", border: 0 }} responsive hover className="text-main geography-table" style={{
          fontSize: '0.85rem'
        }}>
              <thead>
                <tr style={{
              borderBottom: '1px solid var(--border)'
            }}>
                  <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem", paddingInlineStart: "1rem" }} className="text-muted-custom text-xs" style={{
                width: '40px',
                letterSpacing: '0.05em'
              }}>#</MuiBox>
                  <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-muted-custom text-xs" style={{
                letterSpacing: '0.05em'
              }}>{t("article.tenBaiBao")}</MuiBox>
                  <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-muted-custom text-xs" style={{
                letterSpacing: '0.05em'
              }}>JOURNAL</MuiBox>
                  <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "center" }} className="text-muted-custom text-xs" style={{
                width: '80px',
                letterSpacing: '0.05em'
              }}>{t("article.nam1")}</MuiBox>
                  <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-muted-custom text-xs" style={{
                letterSpacing: '0.05em'
              }}>DOI</MuiBox>
                  <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem" }} className="text-muted-custom text-xs" style={{
                letterSpacing: '0.05em'
              }}>TOPIC</MuiBox>
                  <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "center" }} className="text-muted-custom text-xs" style={{
                width: '60px',
                letterSpacing: '0.05em'
              }}>OA</MuiBox>
                  <MuiBox component="th" sx={{ bgcolor: "transparent", paddingTop: "1rem", paddingBottom: "1rem", textAlign: "right", paddingInlineEnd: "1rem" }} className="text-muted-custom text-xs" style={{
                width: '80px',
                letterSpacing: '0.05em'
              }}>{t("article.chiTiet")}</MuiBox>
                </tr>
              </thead>
              <tbody>
                {articles.map((article, index) => {              const topicStyle = getTopicStyle(article.topic_name);
              return <MuiBox component="tr" sx={{ verticalAlign: "middle" }} key={article.article_id} onClick={() => onDetailClick(article.article_id)} className="geography-article-row">
                      <MuiBox component="td" sx={{ paddingInlineStart: "1rem" }} className="text-muted-custom font-display" style={{
                  fontSize: '0.8rem'
                }}>
                        {(page - 1) * 10 + index + 1}
                      </MuiBox>
                      <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} style={{
                  maxWidth: '380px'
                }} >
                        <div className="geography-article-title line-clamp-2">
                          <LatexText text={article.title} />
                        </div>
                        {article.abstract && <MuiBox component="div" sx={{ marginTop: "0.25rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-muted-custom text-xs font-display">
                            <LatexText text={article.abstract} />
                          </MuiBox>}
                      </MuiBox>
                      <td style={{
                  maxWidth: '180px'
                }}>
                        <MuiBox component="div" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-main text-sm font-display" style={{
                    fontWeight: 500
                  }}>
                          {article.journal_name}
                        </MuiBox>
                      </td>
                      <MuiBox component="td" sx={{ textAlign: "center" }} className="font-display" style={{
                  color: 'var(--text-muted)'
                }}>
                        {article.publication_year}
                      </MuiBox>
                      <td style={{
                  maxWidth: '140px'
                }}>
                        {article.doi ? <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="font-display">
                            <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-muted-custom text-xs" style={{
                      fontSize: '0.75rem'
                    }}>
                              {article.doi}
                            </MuiBox>
                            <Button sx={{ padding: "0", display: "flex", alignItems: "center" }} variant="link" className="text-muted-custom hover:text-dark" onClick={e => handleCopyDoi(e, article.doi)} title="Copy DOI">
                              <Icon icon="lucide:copy" width="12" />
                            </Button>
                          </MuiBox> : <MuiBox component="span" sx={{ color: "text.secondary" }} className="text-xs font-display">—</MuiBox>}
                      </td>
                      <td>
                        <span className="geography-topic-badge" style={{
                    backgroundColor: topicStyle.bg,
                    color: topicStyle.color,
                    border: 'none'
                  }}>
                          {article.topic_name || t("article.chuaPhanLoai")}
                        </span>
                      </td>
                      <MuiBox component="td" sx={{ textAlign: "center" }} >
                        {article.is_open_access ? <span className="geography-oa-badge">
                            OA
                          </span> : <span className="text-muted-custom text-xs">—</span>}
                      </MuiBox>
                      <MuiBox component="td" sx={{ textAlign: "right", paddingInlineEnd: "1rem" }} >
                        <span className="geography-link-accent">{t("article.chiTiet1")}<Icon icon="lucide:arrow-right" width="12" />
                        </span>
                      </MuiBox>
                    </MuiBox>;
            })}
              </tbody>
            </Table>
          </MuiBox>

          {/* Cards list for Mobile */}
          <MuiBox component="div" sx={{ display: "block", "@media (min-width:768px)": { display: "none" } }} >
            <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
              {articles.map((article, index) => {            const topicStyle = getTopicStyle(article.topic_name);
            return <Card sx={{ boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", border: 0 }} key={article.article_id} onClick={() => onDetailClick(article.article_id)} className="journal-dark-card geography-article-row">
                    <Card.Body sx={{ padding: "1rem" }} >
                      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }} >
                        <span className="text-muted-custom text-xs font-display">#{(page - 1) * 10 + index + 1}</span>
                        <MuiBox component="div" sx={{ display: "flex", alignItems: "center" }} className="gap-1.5">
                          <span className="geography-topic-badge" style={{
                      fontSize: '0.65rem',
                      padding: '0.15rem 0.45rem',
                      backgroundColor: topicStyle.bg,
                      color: topicStyle.color,
                      border: 'none'
                    }}>
                            {article.topic_name || t("article.chuaPhanLoai")}
                          </span>
                          {article.is_open_access && <span className="geography-oa-badge" style={{
                      fontSize: '0.65rem',
                      padding: '0.15rem 0.45rem'
                    }}>
                              OA
                            </span>}
                        </MuiBox>
                      </MuiBox>

                      <MuiBox component="h6" sx={{ marginBottom: "0.5rem" }} className="geography-article-title" style={{
                  lineHeight: '1.4',
                  fontSize: '0.9rem'
                }}>
                        <LatexText text={article.title} />
                      </MuiBox>

                      <MuiBox component="div" sx={{ paddingTop: "0.5rem", borderTop: "1px solid #dee2e6", borderColor: "#dee2e6", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }} >
                        <div>
                          <MuiBox component="div" sx={{ color: "primary.main" }} className="text-xs font-weight-semibold font-display" style={{
                      fontSize: '0.75rem'
                    }}>
                            {article.journal_name}
                          </MuiBox>
                          <div className="text-muted-custom text-xs font-display mt-0.5" style={{
                      fontSize: '0.7rem'
                    }}>{t("article.nam2")}{article.publication_year} {article.doi ? ` · DOI: ${article.doi}` : ''}
                          </div>
                        </div>
                        <span className="geography-link-accent" style={{
                    fontSize: '0.75rem'
                  }}>{t("article.chiTiet1")}<Icon icon="lucide:arrow-right" width="12" />
                        </span>
                      </MuiBox>
                    </Card.Body>
                  </Card>;
          })}
            </MuiBox>
          </MuiBox>

          {total > 0 && totalPages > 1 && <AdminPagination totalItems={total} currentPage={page} limit={10} onPageChange={onPageChange} entityName="bài báo" />}
        </>}
    </MuiBox>;
}
