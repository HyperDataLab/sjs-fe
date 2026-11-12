import { useState, useMemo } from "react";
import Icon from "../../../shared/components/Icon";
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * @file AuthorPublications.jsx
 * @description Searchable, filterable scientific publication catalogue.
 */
export default function AuthorPublications({ publications = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent"); // "recent" | "cited" | "title"
  const [selectedJournal, setSelectedJournal] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);

  const PAGE_SIZE = 5;

  // Extract unique journals
  const availableJournals = useMemo(() => {
    const set = new Set();
    publications.forEach((p) => {
      if (p.journal) set.add(p.journal);
    });
    return Array.from(set);
  }, [publications]);

  const handleCopyDoi = (doi, id) => {
    if (!doi) return;
    navigator.clipboard.writeText(doi);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter & sort
  const filteredAndSorted = useMemo(() => {
    let result = [...publications];

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.journal?.toLowerCase().includes(q) ||
          p.authors?.some((a) => a.toLowerCase().includes(q)) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Journal filter
    if (selectedJournal !== "ALL") {
      result = result.filter((p) => p.journal === selectedJournal);
    }

    // Sort
    if (sortBy === "recent") {
      result.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === "cited") {
      result.sort((a, b) => (b.citations || 0) - (a.citations || 0));
    } else if (sortBy === "title") {
      result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }

    return result;
  }, [publications, searchTerm, selectedJournal, sortBy]);

  const totalPages = Math.ceil(filteredAndSorted.length / PAGE_SIZE) || 1;
  const paginated = filteredAndSorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="ap-section" id="publications">
      {/* Header */}
      <div className="ap-section-header">
        <div className="ap-section-header-left">
          <Icon icon="lucide:book-open" width="16" className="ap-section-icon" />
          <h2 className="ap-section-title">Scientific Publications</h2>
        </div>
        <span className="ap-section-badge">
          {filteredAndSorted.length} of {publications.length} works
        </span>
      </div>

      {/* Control Bar: Search + Filter + Sort */}
      <div className="ap-pubs-toolbar">
        <div className="ap-pubs-search-wrap">
          <Icon icon="lucide:search" width="14" className="ap-pubs-search-icon" />
          <input
            type="text"
            placeholder="Search by title, co-author, topic, or journal..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="ap-pubs-search-input"
          />
          {searchTerm && (
            <button
              type="button"
              className="ap-pubs-search-clear"
              onClick={() => setSearchTerm("")}
            >
              <Icon icon="lucide:x" width="12" />
            </button>
          )}
        </div>

        <div className="ap-pubs-filters">
          {/* Journal filter */}
          <select
            className="ap-pubs-select"
            value={selectedJournal}
            onChange={(e) => {
              setSelectedJournal(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">All Publication Venues</option>
            {availableJournals.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>

          {/* Sort Buttons */}
          <div className="ap-pubs-sort-group">
            <span className="ap-pubs-sort-label">Sort:</span>
            <MuiBox component="button" sx={getClassNameSx(`ap-pubs-sort-pill ${sortBy === "recent" ? "active" : ""}`)}
              type="button"
              className={stripMappedClassNames(`ap-pubs-sort-pill ${sortBy === "recent" ? "active" : ""}`)}
              onClick={() => {
                setSortBy("recent");
                setCurrentPage(1);
              }}
            >
              Most Recent
            </MuiBox>
            <MuiBox component="button" sx={getClassNameSx(`ap-pubs-sort-pill ${sortBy === "cited" ? "active" : ""}`)}
              type="button"
              className={stripMappedClassNames(`ap-pubs-sort-pill ${sortBy === "cited" ? "active" : ""}`)}
              onClick={() => {
                setSortBy("cited");
                setCurrentPage(1);
              }}
            >
              Most Cited
            </MuiBox>
            <MuiBox component="button" sx={getClassNameSx(`ap-pubs-sort-pill ${sortBy === "title" ? "active" : ""}`)}
              type="button"
              className={stripMappedClassNames(`ap-pubs-sort-pill ${sortBy === "title" ? "active" : ""}`)}
              onClick={() => {
                setSortBy("title");
                setCurrentPage(1);
              }}
            >
              Title A-Z
            </MuiBox>
          </div>
        </div>
      </div>

      {/* Publications List */}
      <div className="ap-pubs-list">
        {paginated.length === 0 ? (
          <div className="ap-pubs-empty">
            <Icon sx={{ color: "text.secondary", marginBottom: "0.5rem" }} icon="lucide:file-question" width="32"  />
            <MuiBox component="div" sx={{ fontWeight: 600 }} >No publications match your filter.</MuiBox>
            <MuiBox component="div" sx={{ color: "text.secondary", fontSize: "0.875em", marginTop: "0.25rem" }} >Try changing the keywords or resetting the journal filter.</MuiBox>
          </div>
        ) : (
          paginated.map((pub) => (
            <div key={pub.id} className="ap-pub-card">
              <div className="ap-pub-top-meta">
                <span className="ap-pub-journal">{pub.journal}</span>
                <span className="ap-pub-divider">·</span>
                <span className="ap-pub-year">{pub.year}</span>
              </div>

              <h3 className="ap-pub-title">{pub.title}</h3>

              <div className="ap-pub-authors">
                <Icon sx={{ marginInlineEnd: "0.25rem" }} icon="lucide:users" width="12"  />
                <span>{pub.authors?.join(" · ")}</span>
              </div>

              <div className="ap-pub-footer">
                <div className="ap-pub-tags-badges">
                  <span className="ap-pub-citations-badge">
                    <Icon icon="lucide:quote" width="10" />
                    <strong>{pub.citations?.toLocaleString()}</strong> citations
                  </span>

                  {pub.doi && (
                    <button
                      type="button"
                      className="ap-pub-doi-btn"
                      onClick={() => handleCopyDoi(pub.doi, pub.id)}
                      title="Copy DOI identifier"
                    >
                      <Icon icon={copiedId === pub.id ? "lucide:check" : "lucide:copy"} width="10" />
                      <span>DOI: {pub.doi}</span>
                    </button>
                  )}

                  {pub.tags?.map((tag, tIdx) => (
                    <span key={tIdx} className="ap-pub-topic-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="ap-pub-actions">
                  <span className="ap-pub-view-link">
                    <span>View Paper</span>
                    <Icon icon="lucide:chevron-right" width="12" />
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="ap-pubs-pagination">
          <button
            type="button"
            className="ap-pubs-page-nav"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <Icon icon="lucide:chevron-left" width="14" />
            <span>Previous</span>
          </button>

          <div className="ap-pubs-page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <MuiBox component="button" sx={getClassNameSx(`ap-pubs-page-number ${pg === currentPage ? "active" : ""}`)}
                key={pg}
                type="button"
                className={stripMappedClassNames(`ap-pubs-page-number ${pg === currentPage ? "active" : ""}`)}
                onClick={() => setCurrentPage(pg)}
              >
                {pg}
              </MuiBox>
            ))}
          </div>

          <button
            type="button"
            className="ap-pubs-page-nav"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            <span>Next</span>
            <Icon icon="lucide:chevron-right" width="14" />
          </button>
        </div>
      )}
    </div>
  );
}
