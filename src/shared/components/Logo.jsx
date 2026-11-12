import Icon from './Icon';
import { getClassNameSx, stripMappedClassNames } from '../theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * Logo component that matches the style of the ResearchPulse header.
 *
 * @param {Object} props - Component props
 * @param {number} props.size - Size of the icon box (default: 32)
 * @param {string} props.fontSize - Font size of the text (default: '1.25rem')
 * @param {string} props.className - Custom class names
 */
export default function Logo({ size = 32, fontSize = '1.25rem', className = '', ...props }) {
  return (
    <MuiBox component="div" sx={getClassNameSx(`d-flex align-items-center text-main fw-bold ${className}`)}
      className={stripMappedClassNames(`d-flex align-items-center text-main fw-bold ${className}`)}
      style={{ fontFamily: "var(--font-display)", fontWeight: 800, cursor: "pointer", ...props.style }}
      {...props}
    >
      {/* Icon block resembling the original brand design */}
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginInlineEnd: "0.5rem" }}

        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "8px",
          background: "var(--btn-dark)",
          boxShadow: "0 0 10px rgba(7, 26, 28, 0.15)",
        }}
      >
        <Icon sx={{ color: "#fff" }} icon="lucide:activity" className="text-sm" />
      </MuiBox>
      <span style={{ fontSize }}>ResearchPulse</span>
    </MuiBox>
  );
}
