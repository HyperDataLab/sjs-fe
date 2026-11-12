import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from 'react';
import Icon from '../Icon.jsx';
import { getClassNameSx, stripMappedClassNames } from '../../theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * Custom multi-select component built with MUI and sx styles.
 */
export default function MultiSelectDropdown({
  options = [],
  value = [],
  onChange,
  placeholder,
  disabled = false,
  loading = false,
  searchable = true
}) {
  const {
    t
  } = useTranslation();
  const resolvedPlaceholder = placeholder || t("common.chon");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
  const filteredOptions = options.filter(opt => (opt.label || '').toLowerCase().includes(searchTerm.toLowerCase()));
  const toggleSelection = optionValue => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };
  const removeValue = (e, optionValue) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  // Get selected objects for chips
  const selectedOptions = options.filter(opt => value.includes(opt.value));
  return <MuiBox component="div" sx={{ position: "relative" }}  ref={wrapperRef}>
      <MuiBox component="div" sx={getClassNameSx(`form-control d-flex flex-wrap align-items-center gap-1 ${disabled ? 'bg-light text-muted' : 'bg-white'}`)} className={stripMappedClassNames(`form-control d-flex flex-wrap align-items-center gap-1 ${disabled ? 'bg-light text-muted' : 'bg-white'}`)} style={{
      minHeight: '48px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      borderColor: 'var(--border)'
    }} onClick={() => !disabled && setIsOpen(!isOpen)}>
        {selectedOptions.length === 0 && <MuiBox component="span" sx={{ color: "text.secondary" }} >{resolvedPlaceholder}</MuiBox>}

        {selectedOptions.map(opt => <MuiBox component="span" sx={{ display: "flex", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 400, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem", alignItems: "center", gap: "0.25rem", paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "0.25rem", paddingBottom: "0.25rem" }} key={opt.value}  style={{
        backgroundColor: 'var(--bg-section)',
        color: 'var(--text-main)',
        border: '1px solid var(--border)'
      }}>
            <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}  style={{
          maxWidth: '150px'
        }}>{opt.label || ''}</MuiBox>
            {!disabled && <Icon icon="lucide:x" width="14" className="cursor-pointer hover-danger" onClick={e => removeValue(e, opt.value)} />}
          </MuiBox>)}

        <MuiBox component="div" sx={{ ml: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }} >
          {loading && <MuiBox component="span" sx={{ display: "inline-block", width: "1rem", height: "1rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", borderWidth: "0.2em", color: "primary.main" }}  role="status"></MuiBox>}
          <Icon sx={{ color: "text.secondary" }} icon="lucide:chevron-down" width="18"  />
        </MuiBox>
      </MuiBox>

      {isOpen && <MuiBox component="div" sx={{ position: "absolute", width: "100%", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.5rem", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", marginTop: "0.25rem", zIndex: 3 }}  style={{
      maxHeight: '300px',
      display: 'flex',
      flexDirection: 'column'
    }}>
          {searchable && <MuiBox component="div" sx={{ padding: "0.5rem", borderBottom: "1px solid #dee2e6" }} >
              <MuiBox component="input" sx={{ display: "block", width: "100%", px: "0.5rem", py: "0.25rem", fontSize: "0.875rem", lineHeight: 1.5, color: "text.primary", bgcolor: "background.paper", border: "1px solid #dee2e6", borderRadius: "0.25rem" }} type="text"  placeholder={t("common.timKiem")} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onClick={e => e.stopPropagation()} />
            </MuiBox>}

          <MuiBox component="div" sx={{ overflow: "auto", paddingTop: "0.25rem", paddingBottom: "0.25rem" }}  style={{
        maxHeight: '250px'
      }}>
            {filteredOptions.length === 0 ? <MuiBox component="div" sx={{ padding: "1rem", textAlign: "center", color: "text.secondary", fontSize: "0.875em" }} >{t("common.khongTimThayKetQua")}</MuiBox> : filteredOptions.map(opt => <MuiBox component="div" sx={{ display: "flex", width: "100%", px: "1rem", py: "0.25rem", clear: "both", color: "text.primary", textAlign: "inherit", textDecoration: "none", whiteSpace: "nowrap", bgcolor: "transparent", border: 0, "&:hover": { bgcolor: "action.hover" }, paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", alignItems: "center", gap: "0.5rem" }} key={opt.value} className="cursor-pointer" onClick={() => toggleSelection(opt.value)}>
                  <MuiBox component="input" sx={{ width: "1em", height: "1em", marginTop: "0", verticalAlign: "top", accentColor: "primary.main" }} type="checkbox" className="cursor-pointer" checked={value.includes(opt.value)} readOnly />
                  <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}  title={opt.label || ''}>{opt.label || ''}</MuiBox>
                </MuiBox>)}
          </MuiBox>
        </MuiBox>}
    </MuiBox>;
}
