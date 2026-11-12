import { useState } from 'react';
import { Form, Badge } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';


/**
 * KeywordInput Component
 * Allows users to add and manage keywords as a tag-list/chip-list.
 *
 * @param {Object} props - Props
 * @param {Array} props.keywords - Array of string keywords
 * @param {function} props.onChange - Callback triggered on tags list changes
 * @param {string} props.placeholder - Placeholder text when empty
 */
export default function KeywordInput({
  keywords = [],
  onChange,
  placeholder = "Separate by commas or press Enter..."
}) {
  const [inputValue, setInputValue] = useState('');

  /**
   * Add keyword to list from input field.
   */
  const addKeyword = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    // Check for duplicates
    if (!keywords.includes(trimmed)) {
      const updated = [...keywords, trimmed];
      onChange(updated);
    }
    setInputValue('');
  };

  /**
   * Key down listener to catch Enter key.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword(inputValue);
    }
  };

  /**
   * Input change listener to check for commas.
   */
  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val.endsWith(',')) {
      // Add keyword if comma is entered
      addKeyword(val.slice(0, -1));
    } else {
      setInputValue(val);
    }
  };

  /**
   * Remove a specific keyword from list.
   */
  const removeKeyword = (idxToRemove) => {
    const updated = keywords.filter((_, idx) => idx !== idxToRemove);
    onChange(updated);
  };

  return (
    <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center", padding: "0.5rem", borderRadius: "0.5rem" }}

      style={{
        backgroundColor: '#f1f5f9',
        border: 'none',
        minHeight: '46px',
        padding: '0.45rem 1rem'
      }}
    >
      {/* Render tags */}
      {keywords.map((kw, index) => (
        <Badge sx={{ borderRadius: "50rem", display: "flex", alignItems: "center", fontWeight: 400 }}
          key={index}
          className="gap-1.5 px-2.5 py-1.5 text-xs"
          style={{
            backgroundColor: '#ffffff',
            color: 'var(--text-main)',
            border: '1px solid #cbd5e1',
          }}
        >
          <span>{kw}</span>
          <Icon sx={{ color: "text.secondary" }}
            icon="lucide:x"
            width="13"
            style={{ cursor: 'pointer' }}
            className="hover-danger"
            onClick={() => removeKeyword(index)}
          />
        </Badge>
      ))}

      {/* Text Input */}
      <MuiBox component="input" sx={{ border: 0, bgcolor: "transparent", flexGrow: 1 }}
        type="text"
        placeholder={keywords.length === 0 ? placeholder : ''}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={() => addKeyword(inputValue)}

        style={{
          outline: 'none',
          fontSize: '0.88rem',
          color: 'var(--text-main)',
          minWidth: '120px',
          padding: '4px'
        }}
      />
    </MuiBox>
  );
}
