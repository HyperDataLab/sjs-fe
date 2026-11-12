import { useTranslation } from "react-i18next";
import React, { useState, useMemo } from 'react';
import { Table, InputGroup, Form } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import AdminPagination from '../../../shared/components/Pagination';


import MuiBox from '@mui/material/Box';

export default function CountryStatsTable({
  countries = [],
  selectedCountry = null,
  onSelectCountry
}) {
  const {
    t
  } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('article_count'); // 'name' or 'article_count'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter countries by search term
  const filteredCountries = useMemo(() => {
    return countries.filter(c => c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || c.code?.toLowerCase().includes(searchTerm.toLowerCase()) || c.iso_code?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [countries, searchTerm]);

  // Sort countries
  const sortedCountries = useMemo(() => {
    const sorted = [...filteredCountries];
    sorted.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (sortKey === 'article_count') {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
      } else {
        valA = String(valA || '').toLowerCase();
        valB = String(valB || '').toLowerCase();
      }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredCountries, sortKey, sortOrder]);

  // Reset page when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedCountries.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedCountries = sortedCountries.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };
  const toggleSort = key => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc'); // Default to descending for numbers, or ascending for names can be adjusted
    }
  };
  return <MuiBox component="div" sx={{ padding: "1.5rem", display: "flex", flexDirection: "column", height: "100%" }} className="journal-dark-card" style={{
    minHeight: '520px'
  }}>
      {/* Table Header / Action Section */}
      <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:576px)": { flexDirection: "row", alignItems: "center" }, justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }} >
        <div>
          <MuiBox component="h2" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display text-main" style={{
          fontSize: '1.2rem'
        }}>{t("zone.thongKeTheoQuocGia")}</MuiBox>
          <MuiBox component="p" sx={{ marginBottom: "0" }} className="text-muted-custom" style={{
          fontSize: '0.75rem'
        }}>{t("zone.danhSachCacQuocGiaCungTongSoLu")}</MuiBox>
        </div>
      </MuiBox>

      {/* Search Input */}
      <MuiBox component="div" sx={{ marginBottom: "1rem" }} >
        <InputGroup sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", borderRadius: "0.5rem" }}  style={{
        backgroundColor: 'var(--bg-chip)',
        border: '1px solid var(--border)',
        transition: 'border-color 0.2s ease'
      }}>
          <InputGroup.Text sx={{ bgcolor: "transparent", border: 0, padding: "0", marginInlineEnd: "0.5rem" }} >
            <Icon icon="lucide:search" width="16" style={{
            color: 'var(--text-muted)'
          }} />
          </InputGroup.Text>
          <Form.Control sx={{ border: 0, bgcolor: "transparent", width: "100%", padding: "0.25rem" }} type="text" placeholder={t("zone.timKiemQuocGia")} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="text-main" style={{
          outline: 'none',
          fontSize: '0.82rem',
          boxShadow: 'none'
        }} />
          {searchTerm && <MuiBox component="button" sx={{ bgcolor: "transparent", border: 0, padding: "0" }} className="text-muted-custom hover:text-main" onClick={() => setSearchTerm('')}>
              <Icon icon="lucide:x" width="16" />
            </MuiBox>}
        </InputGroup>
      </MuiBox>

      {/* Table */}
      <MuiBox component="div" sx={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch", flexGrow: 1 }}  style={{
      overflowX: 'auto'
    }}>
        <Table sx={{ verticalAlign: "middle", marginBottom: "0", textAlign: "left" }} hover  style={{
        minWidth: '400px',
        fontSize: '0.85rem'
      }}>
          <thead style={{
          backgroundColor: 'var(--bg-chip)',
          borderBottom: '1px solid var(--border)'
        }}>
            <tr>
              <MuiBox component="th" sx={{ paddingInlineStart: "1rem", textTransform: "uppercase" }} className="py-2.5 text-muted-custom font-semibold text-xs" style={{
              width: '50px'
            }}>
                #
              </MuiBox>
              <MuiBox component="th" sx={{ textTransform: "uppercase" }} className="py-2.5 text-muted-custom font-semibold text-xs cursor-pointer select-none" onClick={() => toggleSort('name')} style={{
              cursor: 'pointer'
            }}>
                <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }} >
                  <span>{t("journal.quocGia")}</span>
                  <Icon sx={{ color: "text.secondary" }} icon={sortKey === 'name' ? sortOrder === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down' : 'lucide:arrow-up-down'} width="12"  />
                </MuiBox>
              </MuiBox>
              <MuiBox component="th" sx={{ textTransform: "uppercase" }} className="py-2.5 text-muted-custom font-semibold text-xs" style={{
              width: '70px'
            }}>{t("zone.ma")}</MuiBox>
              <MuiBox component="th" sx={{ textTransform: "uppercase" }} className="py-2.5 text-muted-custom font-semibold text-xs cursor-pointer select-none" onClick={() => toggleSort('article_count')} style={{
              cursor: 'pointer'
            }}>
                <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }} >
                  <span>{t("articles")}</span>
                  <Icon sx={{ color: "text.secondary" }} icon={sortKey === 'article_count' ? sortOrder === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down' : 'lucide:arrow-up-down'} width="12"  />
                </MuiBox>
              </MuiBox>
              <MuiBox component="th" sx={{ paddingInlineEnd: "1rem", textAlign: "right", textTransform: "uppercase" }} className="py-2.5 text-muted-custom font-semibold text-xs" style={{
              width: '100px'
            }}>{t("article.chiTiet1")}</MuiBox>
            </tr>
          </thead>
          <tbody>
            {paginatedCountries.length === 0 ? <tr>
                <MuiBox component="td" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem" }} colSpan="5" className="text-muted-custom">{t("zone.khongTimThayQuocGiaPhuHop")}</MuiBox>
              </tr> : paginatedCountries.map((country, index) => {
            const globalIndex = startIndex + index + 1;
            const isSelected = selectedCountry?.code === country.code;
            return <tr key={country.zone_id || country.code} className="transition-all duration-150" style={{
              cursor: 'pointer',
              backgroundColor: isSelected ? 'var(--primary-light)' : 'transparent',
              fontWeight: isSelected ? 600 : 400
            }} onClick={() => onSelectCountry(country)}>
                    <MuiBox component="td" sx={{ paddingInlineStart: "1rem", fontFamily: "monospace" }} className="text-muted-custom" style={{
                fontSize: '0.8rem'
              }}>
                      {globalIndex}
                    </MuiBox>
                    <td className="py-2.5 font-display text-main">
                      {country.name || '—'}
                    </td>
                    <MuiBox component="td" sx={{ fontFamily: "monospace" }} className="text-muted-custom">
                      {country.code || country.iso_code || '—'}
                    </MuiBox>
                    <MuiBox component="td" sx={{ fontWeight: 700, fontFamily: "monospace" }} className="text-main">
                      {Number(country.article_count || 0).toLocaleString()}
                    </MuiBox>
                    <MuiBox component="td" sx={{ paddingInlineEnd: "1rem", textAlign: "right" }} >
                      <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "0.375rem", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", bgcolor: "transparent", color: "primary.main", padding: "0", gap: "0.25rem" }} className="hover:translate-x-1" style={{
                  fontSize: '0.78rem',
                  transition: 'all 0.15s ease'
                }} onClick={e => {
                  e.stopPropagation();
                  onSelectCountry(country);
                }}>
                        <span>Xem region</span>
                        <Icon icon="lucide:chevron-right" width="14" />
                      </MuiBox>
                    </MuiBox>
                  </tr>;
          })}
          </tbody>
        </Table>
      </MuiBox>

      {/* Pagination Controls */}
      {sortedCountries.length > 0 && totalPages > 1 && <MuiBox component="div" sx={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #dee2e6", borderColor: "#dee2e6" }} >
          <AdminPagination totalItems={sortedCountries.length} currentPage={safeCurrentPage} limit={itemsPerPage} onPageChange={handlePageChange} entityName="quốc gia" />
        </MuiBox>}
    </MuiBox>;
}
