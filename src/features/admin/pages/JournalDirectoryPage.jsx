import { useState, useEffect } from 'react';
import { Row } from '@/shared/components/ui/muiAdapters';
import { useJournalManagement } from '../../journal/hooks/useJournalManagement';
import JournalFilterBar from '../components/journals/JournalFilterBar';
import JournalTableAdmin from '../components/journals/JournalTableAdmin';
import JournalCardAdmin from '../components/journals/JournalCardAdmin';
import AddJournalModal from '../components/modals/AddJournalModal';
import Pagination from '../../../shared/components/Pagination';


import MuiBox from '@mui/material/Box';


/**
 * JournalDirectoryPage - Màn hình chính quản lý thư mục các Tạp chí dành cho Admin.
 */
export default function JournalDirectoryPage() {
  const { journals, fetchInitialData, loading, error } = useJournalManagement();

  // Filters state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table');
  const [showAddModal, setShowAddModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  // Fetch fresh backend data on mount so stale mock/store data cannot remain visible.
  useEffect(() => {
    fetchInitialData({ force: true });
  }, [fetchInitialData]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, subjectFilter]);

  // Search & filter logic
  const filteredJournals = (journals || []).filter((journal) => {
    const title = journal.title || journal.display_name || '';
    const issn = journal.issn || '';
    const status = journal.status || 'Draft';
    const category = journal.subjectCategory || '';

    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      issn.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || status === statusFilter;
    const matchesSubject = subjectFilter === 'All' || category === subjectFilter;

    return matchesSearch && matchesStatus && matchesSubject;
  });

  const totalPages = Math.max(1, Math.ceil(filteredJournals.length / limit));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedJournals = filteredJournals.slice(
    (safePage - 1) * limit,
    safePage * limit
  );

  return (
      <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
        {/* Header Title Section */}
        <MuiBox component="div" sx={{ textAlign: "left", marginBottom: "0.5rem" }} >
          <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display text-main">Journal Directory</MuiBox>
          <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">
            Manage and monitor the entire publication lifecycle for your academic portfolio.
          </MuiBox>
        </MuiBox>

        {/* Filters and Search toolbar */}
        <JournalFilterBar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          subjectFilter={subjectFilter}
          onSubjectChange={setSubjectFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenAddModal={() => setShowAddModal(true)}
        />

        {/* Display journals */}
        {loading ? (
          <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem" }} >
            <MuiBox component="div" sx={{ display: "inline-block", width: "2rem", height: "2rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite" }} className="admin-spinner" role="status">
              <MuiBox component="span" sx={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }} >Loading journals...</MuiBox>
            </MuiBox>
          </MuiBox>
        ) : error ? (
          <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: 0, borderRadius: "0.5rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029", fontSize: "0.875em", marginBottom: "0" }} >
            {error}
          </MuiBox>
        ) : filteredJournals.length === 0 ? (
          <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem", bgcolor: "background.paper", borderRadius: "0.5rem", border: "1px solid #dee2e6" }}  style={{ borderColor: 'var(--border)' }}>
            <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom">No journals match the selected filters.</MuiBox>
          </MuiBox>
        ) : viewMode === 'table' ? (
          <MuiBox component="div" sx={{ padding: "0", border: 0, boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", textAlign: "left", bgcolor: "background.paper", borderRadius: "0.5rem", overflow: "hidden" }} className="glass-card">
            <JournalTableAdmin
              journals={paginatedJournals}
              page={safePage}
              limit={limit}
            />
            <MuiBox component="div" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem" }} >
              <Pagination
                totalItems={filteredJournals.length}
                currentPage={safePage}
                limit={limit}
                onPageChange={setCurrentPage}
                entityName="journals"
              />
            </MuiBox>
          </MuiBox>
        ) : (
          <div>
            <Row sx={{ gap: "1rem", marginBottom: "1.5rem" }} >
              {paginatedJournals.map((j) => (
                <JournalCardAdmin key={j.id || j.journal_id} journal={j} />
              ))}
            </Row>
            <MuiBox component="div" sx={{ bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem" }} >
              <Pagination
                totalItems={filteredJournals.length}
                currentPage={safePage}
                limit={limit}
                onPageChange={setCurrentPage}
                entityName="journals"
              />
            </MuiBox>
          </div>
        )}

        {/* Add Journal Modal */}
        <AddJournalModal
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
        />
      </MuiBox>
  );
}
