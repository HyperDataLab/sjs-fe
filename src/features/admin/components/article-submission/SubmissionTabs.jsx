import { Nav } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../../shared/components/Icon';
import ButtonBase from '@mui/material/ButtonBase';

/**
 * SubmissionTabs Component
 * Toggles between Manual Entry and PDF Upload submission modes.
 *
 * @param {Object} props - Props
 * @param {string} props.activeTab - Active tab identifier: 'manual' or 'pdf'
 * @param {function} props.onTabChange - Callback on tab click
 */
export default function SubmissionTabs({ activeTab, onTabChange }) {
  return (
    <Nav role="tablist" sx={{ display: "flex", flexWrap: "wrap", paddingLeft: 0, marginBottom: "1.5rem", listStyle: "none", borderBottom: 0, gap: "1.5rem" }} className="tab-nav-custom" style={{ paddingLeft: '1rem' }}>
      {/* Manual Entry Tab */}
      <Nav.Item>
        <ButtonBase
          role="tab"
          aria-selected={activeTab === 'manual'}
          className={activeTab === 'manual' ? 'Mui-selected' : undefined}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 0,
            pb: 1.5,
            borderBottom: '2px solid',
            borderColor: activeTab === 'manual' ? 'primary.main' : 'transparent',
            borderRadius: 0,
            bgcolor: 'transparent',
            color: activeTab === 'manual' ? 'primary.main' : 'text.secondary',
            fontWeight: 500,
            transition: 'color 0.2s, border-color 0.2s',
            '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
          }}
          onClick={() => onTabChange('manual')}
        >
          <Icon icon="lucide:edit-3" width="18" />
          <span>Manual Entry</span>
        </ButtonBase>
      </Nav.Item>

      {/* PDF Upload Tab */}
      <Nav.Item>
        <ButtonBase
          role="tab"
          aria-selected={activeTab === 'pdf'}
          className={activeTab === 'pdf' ? 'Mui-selected' : undefined}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 0,
            pb: 1.5,
            borderBottom: '2px solid',
            borderColor: activeTab === 'pdf' ? 'primary.main' : 'transparent',
            borderRadius: 0,
            bgcolor: 'transparent',
            color: activeTab === 'pdf' ? 'primary.main' : 'text.secondary',
            fontWeight: 500,
            transition: 'color 0.2s, border-color 0.2s',
            '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
          }}
          onClick={() => onTabChange('pdf')}
        >
          <Icon icon="lucide:file-text" width="18" />
          <span>PDF Upload</span>
        </ButtonBase>
      </Nav.Item>
    </Nav>
  );
}
