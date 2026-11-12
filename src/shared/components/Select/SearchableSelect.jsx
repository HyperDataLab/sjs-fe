import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from 'react';
import Icon from '../Icon.jsx';
import { getClassNameSx, stripMappedClassNames } from '../../theme/classNameSx';

import MuiBox from '@mui/material/Box';

export default function SearchableSelect({
  options = [],
  value = '',
  onChange,
  placeholder,
  disabled = false,
  loading = false,
  limit = 20,
  fetchOptions = null,
  debounceTime = 300
}) {
  const {
    t
  } = useTranslation();
  const resolvedPlaceholder = placeholder || t("common.chon");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [asyncOptions, setAsyncOptions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  useEffect(() => {
    if (!fetchOptions) return;
    const fetchItems = async () => {
      const val = searchTerm.trim();
      setIsSearching(true);
      try {
        const results = await fetchOptions(val);
        setAsyncOptions(results || []);
      } catch (err) {
        console.error(t("common.loiFetchOptions"), err);
      } finally {
        setIsSearching(false);
      }
    };
    const timeoutId = setTimeout(fetchItems, debounceTime);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, fetchOptions, debounceTime]);
  const displayOptions = fetchOptions ? asyncOptions : options;
  const allFiltered = fetchOptions ? displayOptions : displayOptions.filter(opt => (opt.label || '').toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredOptions = fetchOptions ? allFiltered : allFiltered.slice(0, limit);
  const selectedOption = options.find(opt => String(opt.value) === String(value)) || asyncOptions.find(opt => String(opt.value) === String(value));
  const selectOption = optionValue => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };
  const handleClear = e => {
    e.stopPropagation();
    onChange('');
  };
  return <MuiBox component="div" sx={{ position: "relative" }}  ref={wrapperRef}>
      <MuiBox component="div" sx={getClassNameSx(`form-control form-control-lg d-flex align-items-center gap-2 ${disabled ? 'bg-light text-muted' : ''}`)} className={stripMappedClassNames(`form-control form-control-lg d-flex align-items-center gap-2 ${disabled ? 'bg-light text-muted' : ''}`)} style={{
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor: 'var(--bg-main)',
      color: 'var(--text-main)',
      borderColor: 'var(--border)'
    }} onClick={() => !disabled && setIsOpen(!isOpen)}>
        <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", flexGrow: 1 }}  style={{
        color: selectedOption ? 'inherit' : 'var(--text-muted)'
      }}>
          {selectedOption ? selectedOption.label : resolvedPlaceholder}
        </MuiBox>

        <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }} >
          {(loading || isSearching) && <MuiBox component="span" sx={{ display: "inline-block", width: "1rem", height: "1rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", borderWidth: "0.2em", color: "primary.main" }}  role="status"></MuiBox>}
          {selectedOption && !disabled && <Icon sx={{ color: "text.secondary" }} icon="lucide:x" width="16" className="hover-danger cursor-pointer" onClick={handleClear} />}
          <Icon sx={{ color: "text.secondary" }} icon="lucide:chevron-down" width="18"  />
        </MuiBox>
      </MuiBox>

      {isOpen && <MuiBox component="div" sx={{ position: "absolute", width: "100%", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.5rem", boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)", marginTop: "0.25rem", zIndex: 3 }}  style={{
      maxHeight: '300px',
      display: 'flex',
      flexDirection: 'column'
    }}>
          <MuiBox component="div" sx={{ padding: "0.5rem", borderBottom: "1px solid #dee2e6" }} >
            <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", width: "100%", "& input, & select, & button": { minHeight: 31, fontSize: "0.875rem" } }} >
              <MuiBox component="span" sx={{ display: "flex", alignItems: "center", px: "0.75rem", py: "0.375rem", color: "#212529", textAlign: "center", whiteSpace: "nowrap", bgcolor: "transparent", border: "1px solid #dee2e6", borderRadius: "0.375rem", borderInlineEnd: 0 }} >
                <Icon sx={{ color: "text.secondary" }} icon="lucide:search" width="14"  />
              </MuiBox>
              <MuiBox component="input" sx={{ display: "block", width: "100%", px: "0.75rem", py: "0.375rem", fontSize: "1rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.375rem", borderInlineStart: 0, paddingInlineStart: "0", boxShadow: "none" }} type="text"  placeholder={t("common.timKiem")} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onClick={e => e.stopPropagation()} autoFocus />
            </MuiBox>
          </MuiBox>

          <MuiBox component="div" sx={{ overflow: "auto", paddingTop: "0.25rem", paddingBottom: "0.25rem" }}  style={{
        maxHeight: '250px'
      }}>
            {filteredOptions.length === 0 ? <MuiBox component="div" sx={{ padding: "1rem", textAlign: "center", color: "text.secondary", fontSize: "0.875em" }} >
                {isSearching ? t("common.dangTimKiem") : t("common.khongTimThayKetQuaPhuHop1")}
              </MuiBox> : filteredOptions.map(opt => <MuiBox component="div" sx={getClassNameSx(`dropdown-item px-3 py-2 d-flex align-items-center gap-2 cursor-pointer ${String(opt.value) === String(value) ? 'bg-light text-primary fw-medium' : 'text-dark'}`)} key={opt.value} className={stripMappedClassNames(`dropdown-item px-3 py-2 d-flex align-items-center gap-2 cursor-pointer ${String(opt.value) === String(value) ? 'bg-light text-primary fw-medium' : 'text-dark'}`)} onClick={() => selectOption(opt.value)}>
                  <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}  title={opt.label || ''}>{opt.label || ''}</MuiBox>
                  {String(opt.value) === String(value) && <Icon sx={{ ml: "auto", color: "primary.main" }} icon="lucide:check" width="16"  />}
                </MuiBox>)}
            {!fetchOptions && allFiltered.length > limit && <MuiBox component="div" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", color: "text.secondary", fontSize: "0.875em", fontStyle: "italic", textAlign: "center", bgcolor: "#f8f9fa", borderTop: "1px solid #dee2e6", marginTop: "0.25rem" }} >{t("common.dangHienThi")}{limit}{t("common.ketQuaHayNhapThemDeLoc")}</MuiBox>}
          </MuiBox>
        </MuiBox>}
    </MuiBox>;
}
