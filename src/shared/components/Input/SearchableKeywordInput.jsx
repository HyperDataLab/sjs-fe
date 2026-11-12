import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from 'react';
import Icon from '../Icon.jsx';
import keywordApi from '../../../features/keywords/api/keywordApi';
import { getClassNameSx, stripMappedClassNames } from '../../theme/classNameSx';

import MuiBox from '@mui/material/Box';

export default function SearchableKeywordInput({
  keywords = [],
  onAddKeyword,
  onRemoveKeyword,
  placeholder,
  disabled = false,
  debounceTime = 300,
  subjectAreaId = null
}) {
  const {
    t
  } = useTranslation();
  const resolvedPlaceholder = placeholder || t("common.chonTuKhoa");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const wrapperRef = useRef(null);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (!isOpen) return;
    const fetchSuggestions = async () => {
      const val = searchTerm.trim();
      setIsSearching(true);
      try {
        const queryParams = {
          search: val,
          limit: 20
        };
        if (subjectAreaId) {
          queryParams.subject_area_id = subjectAreaId;
        }
        const res = await keywordApi.getKeywords(queryParams);
        const items = res?.data?.data?.items || res?.data?.data || [];
        setSuggestions(Array.isArray(items) ? items : []);
      } catch (err) {
        console.error(t("common.loiLayDanhSachKeyword"), err);
      } finally {
        setIsSearching(false);
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, debounceTime);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, isOpen, debounceTime, subjectAreaId]);
  const handleSelect = kwName => {
    if (kwName && onAddKeyword) {
      onAddKeyword(kwName);
    }
    setSearchTerm('');
    setIsOpen(false);
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = searchTerm.trim();
      if (val) {
        handleSelect(val);
      }
    }
  };

  // Filter out already selected keywords from suggestions
  const filteredSuggestions = suggestions.filter(s => !keywords.includes(s.display_name || s.name));
  const showCreateOption = searchTerm.trim().length > 0 && !suggestions.find(s => (s.display_name || s.name).toLowerCase() === searchTerm.trim().toLowerCase()) && !keywords.includes(searchTerm.trim());
  return <MuiBox component="div" sx={{ position: "relative" }}  ref={wrapperRef}>
      {/* Main control - looks like SearchableSelect */}
      <MuiBox component="div" sx={getClassNameSx(`form-control form-control-lg d-flex flex-wrap align-items-center gap-2 ${disabled ? 'bg-light text-muted' : ''}`)} className={stripMappedClassNames(`form-control form-control-lg d-flex flex-wrap align-items-center gap-2 ${disabled ? 'bg-light text-muted' : ''}`)} style={{
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor: 'var(--bg-main)',
      color: 'var(--text-main)',
      borderColor: 'var(--border)',
      minHeight: '50px'
    }} onClick={() => !disabled && setIsOpen(!isOpen)}>
        {/* Render keyword badges */}
        {keywords.map(kw => <MuiBox component="span" sx={{ display: "flex", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 400, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem", alignItems: "center", gap: "0.25rem", paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "0.25rem", paddingBottom: "0.25rem" }} key={kw}  style={{
        backgroundColor: 'var(--bg-section)',
        color: 'var(--text-main)',
        border: '1px solid var(--border)',
        fontSize: '0.85rem'
      }}>
            {kw}
            <Icon icon="lucide:x" width="14" className="cursor-pointer hover-danger" onClick={e => {
          e.stopPropagation();
          onRemoveKeyword?.(kw);
        }} />
          </MuiBox>)}

        {/* Placeholder text */}
        {keywords.length === 0 && <span style={{
        color: 'var(--text-muted)'
      }}>{resolvedPlaceholder}</span>}

        {/* Right side indicators */}
        <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0, ml: "auto" }} >
          {isSearching && <MuiBox component="span" sx={{ display: "inline-block", width: "1rem", height: "1rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", borderWidth: "0.2em", color: "primary.main" }}  role="status"></MuiBox>}
          <Icon sx={{ color: "text.secondary" }} icon="lucide:chevron-down" width="18"  />
        </MuiBox>
      </MuiBox>

      {/* Dropdown panel */}
      {isOpen && <MuiBox component="div" sx={{ position: "absolute", width: "100%", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.5rem", boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)", marginTop: "0.25rem", zIndex: 3 }}  style={{
      maxHeight: '350px',
      display: 'flex',
      flexDirection: 'column'
    }}>
          {/* Search input inside dropdown */}
          <MuiBox component="div" sx={{ padding: "0.5rem", borderBottom: "1px solid #dee2e6" }} >
            <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", width: "100%", "& input, & select, & button": { minHeight: 31, fontSize: "0.875rem" } }} >
              <MuiBox component="span" sx={{ display: "flex", alignItems: "center", px: "0.75rem", py: "0.375rem", color: "#212529", textAlign: "center", whiteSpace: "nowrap", bgcolor: "transparent", border: "1px solid #dee2e6", borderRadius: "0.375rem", borderInlineEnd: 0 }} >
                <Icon sx={{ color: "text.secondary" }} icon="lucide:search" width="14"  />
              </MuiBox>
              <MuiBox component="input" sx={{ display: "block", width: "100%", px: "0.75rem", py: "0.375rem", fontSize: "1rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.375rem", borderInlineStart: 0, paddingInlineStart: "0", boxShadow: "none" }} type="text"  placeholder={t("common.timKiemTuKhoa")} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} onClick={e => e.stopPropagation()} autoFocus />
            </MuiBox>
          </MuiBox>

          {/* Results list */}
          <MuiBox component="div" sx={{ overflow: "auto", paddingTop: "0.25rem", paddingBottom: "0.25rem" }}  style={{
        maxHeight: '280px'
      }}>
            {isSearching ? <MuiBox component="div" sx={{ padding: "1rem", textAlign: "center", color: "text.secondary", fontSize: "0.875em" }} >{t("common.dangTimKiem")}</MuiBox> : filteredSuggestions.length === 0 && !showCreateOption ? <MuiBox component="div" sx={{ padding: "1rem", textAlign: "center", color: "text.secondary", fontSize: "0.875em" }} >
                {searchTerm.trim() ? t("common.khongTimThayTuKhoaPhuHop") : t("common.nhapTuKhoaDeTimKiem")}
              </MuiBox> : <>
                {filteredSuggestions.map(kwObj => {
            const name = kwObj.display_name || kwObj.name;
            return <MuiBox component="div" sx={{ display: "flex", width: "100%", px: "1rem", py: "0.25rem", clear: "both", color: "#212529", textAlign: "inherit", textDecoration: "none", whiteSpace: "nowrap", bgcolor: "transparent", border: 0, "&:hover": { bgcolor: "action.hover" }, paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", alignItems: "center", gap: "0.5rem" }} key={kwObj.id || kwObj.keyword_id || name} className="cursor-pointer" onClick={() => handleSelect(name)}>
                      <Icon sx={{ color: "text.secondary", flexShrink: 0 }} icon="lucide:hash" width="14"  />
                      <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} >{name}</MuiBox>
                    </MuiBox>;
          })}
                {showCreateOption && <MuiBox component="div" sx={{ display: "flex", width: "100%", px: "1rem", py: "0.25rem", clear: "both", color: "primary.main", textAlign: "inherit", textDecoration: "none", whiteSpace: "nowrap", bgcolor: "#f8f9fa", border: 0, "&:hover": { bgcolor: "action.hover" }, paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", borderTop: "1px solid #dee2e6", fontWeight: 500, alignItems: "center", gap: "0.5rem" }} className="cursor-pointer" onClick={() => handleSelect(searchTerm.trim())}>
                    <Icon icon="lucide:plus" width="14" />{t("common.taoTuKhoaMoi")}{searchTerm.trim()}"
                  </MuiBox>}
              </>}
          </MuiBox>
        </MuiBox>}
    </MuiBox>;
}
