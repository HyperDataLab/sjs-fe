import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, InputGroup } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import { useJournalManagement } from '../../journal/hooks/useJournalManagement';
import Pagination from '../../../shared/components/Pagination';
import SwitchJournalModal from '../components/modals/SwitchJournalModal';


import MuiBox from '@mui/material/Box';


/**
 * VolumeArchivePage - Màn hình Lưu trữ các Tập (Volume Archive) của Tạp chí đang chọn (Figma Screen Page 10).
 */
export default function VolumeArchivePage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    currentJournal,
    volumes,
    setSelectedVolume,
    fetchInitialData
  } = useJournalManagement();

  // Dynamic route base path detection
  const isPreview = window.location.pathname.startsWith('/admin-preview');
  const basePath = isPreview ? '/admin-preview' : '/admin';

  // State filters & sort
  const [search, setSearch] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest'
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(6); // 6 cards per page fits nicely in a 3-column grid

  // Load initial data
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, frequencyFilter, sortBy]);

  // Filter volumes for current journal
  const currentVolumes = (volumes || []).filter(v => v.journalId === currentJournal?.id);

  // Apply search & filter & sort
  const filteredVolumes = currentVolumes.filter(vol => {
    const volNum = vol.volumeNumber || '';
    const freq = vol.frequency || '';
    const matchesSearch = volNum.toLowerCase().includes(search.toLowerCase());
    const matchesFreq = frequencyFilter === 'All' || freq === frequencyFilter;
    return matchesSearch && matchesFreq;
  }).sort((a, b) => {
    if (sortBy === 'newest') {
      return b.publicationYear - a.publicationYear;
    } else {
      return a.publicationYear - b.publicationYear;
    }
  });

  // Calculate paginated volumes
  const paginatedVolumes = filteredVolumes.slice((currentPage - 1) * limit, currentPage * limit);
  const handleViewDetails = volumeId => {
    // Set selected volume in store and navigate to Repository Management
    setSelectedVolume(volumeId);
    navigate(`${basePath}/journals/repository`);
  };
  return <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }} >
        {/* Breadcrumb */}
        <div>
          <MuiBox component="div" sx={{ marginBottom: "0.5rem" }} className="admin-breadcrumb">
            <span className="cursor-pointer text-muted-custom" onClick={() => navigate(`${basePath}/journals/repository`)}>
              Repository
            </span>
            <Icon sx={{ marginLeft: "0.25rem", marginRight: "0.25rem" }} icon="lucide:chevron-right"  />
            <span className="admin-breadcrumb__current">Volume Archive</span>
          </MuiBox>

          <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:768px)": { flexDirection: "row", alignItems: "center" }, justifyContent: "space-between", gap: "1rem" }} >
            <div>
              <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display text-main">Volume Archive</MuiBox>
              <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">
                Explore the historical collection of published volumes and issue logs for{' '}
                <MuiBox component="span" sx={{ fontWeight: 600 }} className="text-main">{currentJournal?.title}</MuiBox>.
              </MuiBox>
            </div>
            <Button sx={{ display: "flex", alignItems: "center", paddingTop: "0.5rem", paddingBottom: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem" }} variant="outline-dark" className="gap-1.5 btn-custom-sm font-display" onClick={() => setShowSwitchModal(true)}>
              <Icon icon="lucide:refresh-cw" width="14" />
              <span>Change Journal</span>
            </Button>
          </MuiBox>
        </div>

        {/* Filter Bar */}
        <MuiBox component="div" sx={{ bgcolor: "background.paper", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #dee2e6", marginBottom: "0.5rem", marginTop: "0.5rem" }}  style={{
      borderColor: 'var(--border)'
    }}>
          <Row sx={{ alignItems: "flex-end", gap: "1rem" }} >
            {/* Search by Volume number */}
            <Col xs={12} md={5}>
              <Form.Group>
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em", textTransform: "uppercase", marginBottom: "0.5rem" }} className="text-main" style={{
              letterSpacing: '0.05em'
            }}>
                  Search Volumes
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text style={{
                backgroundColor: 'var(--bg-chip)',
                borderColor: 'var(--border)'
              }}>
                    <Icon sx={{ color: "text.secondary" }} icon="lucide:search" width="16"  />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder={t("admin.searchByVolumeNumberEgVolume1")} value={search} onChange={e => setSearch(e.target.value)} style={{
                backgroundColor: 'var(--bg-chip)',
                borderColor: 'var(--border)',
                fontSize: '0.9rem'
              }} />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Filter by Frequency */}
            <Col xs={12} sm={6} md={3.5}>
              <Form.Group>
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em", textTransform: "uppercase", marginBottom: "0.5rem" }} className="text-main" style={{
              letterSpacing: '0.05em'
            }}>
                  Publication Period
                </Form.Label>
                <Form.Select value={frequencyFilter} onChange={e => setFrequencyFilter(e.target.value)} style={{
              backgroundColor: 'var(--bg-chip)',
              borderColor: 'var(--border)',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}>
                  <option value="All">All Periods</option>
                  <option value="Quarterly">{t("admin.quarterlyHangQuy")}</option>
                  <option value="Bi-annual">{t("admin.biannualNuaNam")}</option>
                  <option value="Annual">{t("admin.annualHangNam")}</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Sort by Year */}
            <Col xs={12} sm={6} md={3.5}>
              <Form.Group>
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em", textTransform: "uppercase", marginBottom: "0.5rem" }} className="text-main" style={{
              letterSpacing: '0.05em'
            }}>
                  Sort Order
                </Form.Label>
                <Form.Select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              backgroundColor: 'var(--bg-chip)',
              borderColor: 'var(--border)',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}>
                  <option value="newest">Newest to Oldest</option>
                  <option value="oldest">Oldest to Newest</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </MuiBox>

        {/* Volumes Grid */}
        {filteredVolumes.length === 0 ? <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem", bgcolor: "background.paper", borderRadius: "0.5rem", border: "1px solid #dee2e6" }}  style={{
      borderColor: 'var(--border)'
    }}>
            <Icon sx={{ marginBottom: "1rem" }} icon="lucide:archive-x" width="48" className="text-muted-custom" />
            <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom">No volumes found matching the search criteria.</MuiBox>
          </MuiBox> : <div>
            <Row sx={{ gap: "1.5rem", marginBottom: "1.5rem" }} >
              {paginatedVolumes.map(vol => <Col xs={12} md={6} lg={4} key={vol.id}>
                  <Card sx={{ bgcolor: "background.paper", height: "100%", border: "1px solid #dee2e6", borderRadius: "0.5rem", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)" }} className="transition-hover" style={{
            borderColor: 'var(--border)'
          }}>
                    <Card.Body sx={{ display: "flex", flexDirection: "column", padding: "1.5rem" }} >

                      {/* Top row: Status & Page badge */}
                      <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }} >
                        <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "text.secondary", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", bgcolor: "#f8f9fa", border: "1px solid #dee2e6", paddingTop: "0.25rem", paddingBottom: "0.25rem", textTransform: "uppercase" }} className="px-2.5 text-xs font-semibold">
                          ARCHIVED
                        </MuiBox>
                        <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.25rem", bgcolor: "#f8f9fa", paddingTop: "0.25rem", paddingBottom: "0.25rem", borderRadius: "0.375rem", color: "text.secondary", fontFamily: "monospace", border: "1px solid #dee2e6" }} className="px-2.5 text-xs" style={{
                  borderColor: 'var(--border)'
                }}>
                          <Icon icon="lucide:book-open" width="12" />
                          <span>V{vol.volumeNumber ? vol.volumeNumber.replace(/\D/g, '') : '13'}</span>
                        </MuiBox>
                      </MuiBox>

                      {/* Title */}
                      <Card.Title sx={{ fontWeight: 500, marginBottom: "1.5rem", fontSize: "1.25rem", lineHeight: 1.2 }} className="font-display text-main">
                        {vol.volumeNumber} ({vol.publicationYear})
                      </Card.Title>

                      {/* Detail list rows */}
                      <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem", mt: "auto" }} >
                        <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #dee2e6", paddingBottom: "0.5rem" }}  style={{
                  borderColor: 'var(--border)'
                }}>
                          <MuiBox component="span" sx={{ fontSize: "0.875em" }} className="text-muted-custom">Total Issues</MuiBox>
                          <MuiBox component="span" sx={{ fontWeight: 700, fontFamily: "monospace" }} className="text-main">0{vol.totalIssues || 4}</MuiBox>
                        </MuiBox>
                        <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #dee2e6", paddingBottom: "0.5rem" }}  style={{
                  borderColor: 'var(--border)'
                }}>
                          <MuiBox component="span" sx={{ fontSize: "0.875em" }} className="text-muted-custom">Total Articles</MuiBox>
                          <MuiBox component="span" sx={{ fontWeight: 700, fontFamily: "monospace" }} className="text-main">{vol.totalArticles || 128}</MuiBox>
                        </MuiBox>
                        <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.25rem" }} >
                          <MuiBox component="span" sx={{ fontSize: "0.875em" }} className="text-muted-custom">Period</MuiBox>
                          <MuiBox component="span" sx={{ fontWeight: 700, fontSize: "0.875em" }} className="text-main font-display">{vol.period || `Jan — Dec ${vol.publicationYear}`}</MuiBox>
                        </MuiBox>
                      </MuiBox>

                      {/* Actions */}
                      <MuiBox component="div" sx={{ display: "flex", gap: "0.5rem", width: "100%", mt: "auto", paddingTop: "1rem", borderTop: "1px solid #dee2e6" }}  style={{
                borderColor: 'var(--border)'
              }}>
                        <Button sx={{ width: "100%", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} className="font-display btn-custom-sm admin-btn-outline-accent gap-1.5" onClick={() => handleViewDetails(vol.id)}>
                          <span>View Details</span>
                        </Button>
                        <Button sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem", borderRadius: "0.375rem" }} variant="outline-dark" className="btn-custom-sm" title="Restore/History" onClick={() => alert(`Showing history for ${vol.volumeNumber}...`)}>
                          <Icon icon="lucide:history" width="16" />
                        </Button>
                      </MuiBox>

                    </Card.Body>
                  </Card>
                </Col>)}
            </Row>

            {/* Pagination Controls */}
            <Pagination totalItems={filteredVolumes.length} currentPage={currentPage} limit={limit} onPageChange={setCurrentPage} entityName="volumes" />
          </div>}

        {/* Switch Journal Modal */}
        <SwitchJournalModal show={showSwitchModal} handleClose={() => setShowSwitchModal(false)} />
      </MuiBox>;
}
