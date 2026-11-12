import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';
import MuiBox from '@mui/material/Box';

const KeywordChip = ({ keyword, count, icon, onClick, isTrending = false }) => {
  return (
    <MuiBox component="div" sx={getClassNameSx(`d-inline-flex align-items-center gap-2 px-3 py-1 me-2 mb-2 rounded-pill ${isTrending ? 'text-main' : 'btn-dark-solid'}`)}
      className={stripMappedClassNames(`d-inline-flex align-items-center gap-2 px-3 py-1 me-2 mb-2 rounded-pill ${isTrending ? 'text-main' : 'btn-dark-solid'}`)}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: isTrending ? 'var(--bg-chip)' : '',
        border: isTrending ? '1px solid var(--border)' : 'none'
      }}
      onClick={onClick}
    >
      <MuiBox component="span" sx={{ fontWeight: 500 }} >{keyword}</MuiBox>
      {count && <MuiBox component="span" sx={{ fontSize: "0.875em" }} className="text-muted-custom">+{count}</MuiBox>}
      {icon && <MuiBox component="span" sx={{ marginInlineStart: "0.25rem" }} >{icon}</MuiBox>}
    </MuiBox>
  );
};

export default KeywordChip;
