import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { ListGroup, Badge, Button } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../../shared/components/Icon.jsx';
import { getClassNameSx, stripMappedClassNames } from '../../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * Component VolumeList - Hiển thị danh sách các Tập (Volume) thuộc Tạp chí đang chọn.
 *
 * @param {Array} volumes - Danh sách các Volume đã được lọc theo Journal hiện tại
 * @param {string} selectedVolumeId - ID của Volume đang được chọn để xem Issue
 * @param {function} onSelectVolume - Hàm callback kích hoạt khi Admin bấm chọn một Volume
 */
export default function VolumeList({
  volumes,
  selectedVolumeId,
  onSelectVolume,
  volumeStatsById = {}
}) {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();

  // Dynamic route base path detection
  const isPreview = window.location.pathname.startsWith('/admin-preview');
  const basePath = isPreview ? '/admin-preview' : '/admin';

  // Trạng thái trống nếu Tạp chí này chưa được khởi tạo Volume nào
  if (!volumes || volumes.length === 0) {
    return <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "3rem", paddingBottom: "3rem", bgcolor: "background.paper", borderRadius: "0.5rem", border: "1px solid #dee2e6" }}  style={{
      borderColor: 'var(--border)'
    }}>
        <Icon sx={{ marginBottom: "0.5rem" }} icon="lucide:layers-3" width="32" className="text-muted-custom" />
        <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">{t("admin.chuaCoVolumeNaoDuocTao")}</MuiBox>
      </MuiBox>;
  }

  // Sort volumes descending by year or number to match Figma (newest at top)
  const sortedVolumes = [...volumes].sort((a, b) => b.publicationYear - a.publicationYear);
  return <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }} >
      <ListGroup sx={{ boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", borderRadius: "0.5rem", overflow: "hidden", border: "1px solid #dee2e6" }}  style={{
      borderColor: 'var(--border)'
    }}>
        {sortedVolumes.map((vol, index) => {
        const isSelected = vol.id === selectedVolumeId;
        const isNewest = index === 0; // The newest volume is "Current", others are "Archived"
        const volumeStats = volumeStatsById[vol.id] || {};
        const issueCount = volumeStats.issueCount ?? 0;
        const articleCount = volumeStats.articleCount;
        return <ListGroup.Item sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", paddingBottom: "1rem", borderInlineStart: 0, borderInlineEnd: 0 }} key={vol.id} action active={isSelected} onClick={() => onSelectVolume(vol.id)}  style={{
          backgroundColor: isSelected ? 'var(--text-main)' : '#ffffff',
          borderColor: 'var(--border)',
          color: isSelected ? '#ffffff' : 'var(--text-main)',
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}>
              <div>
                <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
                  <MuiBox component="span" sx={getClassNameSx(`fw-bold ${isSelected ? 'text-white' : 'text-main'}`)} className={stripMappedClassNames(`fw-bold ${isSelected ? 'text-white' : 'text-main'}`)}>
                    {vol.volumeNumber} ({vol.publicationYear})
                  </MuiBox>

                  {/* Status Badge inside volume card (Current vs Archived) */}
                  <MuiBox component="span" sx={getClassNameSx(`badge text-xs px-2 py-0.5 rounded ${isSelected ? 'bg-light text-dark' : isNewest ? 'bg-warning-subtle text-warning' : 'bg-light text-muted border'}`)} className={stripMappedClassNames(`badge text-xs px-2 py-0.5 rounded ${isSelected ? 'bg-light text-dark' : isNewest ? 'bg-warning-subtle text-warning' : 'bg-light text-muted border'}`)}>
                    {isNewest ? 'CURRENT' : 'ARCHIVED'}
                  </MuiBox>
                </MuiBox>
                <MuiBox component="small" sx={getClassNameSx(isSelected ? 'text-white-50 font-monospace' : 'text-muted-custom font-monospace')} className={stripMappedClassNames(isSelected ? 'text-white-50 font-monospace' : 'text-muted-custom font-monospace')}>
                  {issueCount} Issues • {typeof articleCount === 'number' ? `${articleCount} Articles` : t("admin.chuaCoApiArticleTheoIssueidDaX")}
                </MuiBox>
              </div>

              <Badge sx={{ borderRadius: "0.375rem", paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "0.25rem", paddingBottom: "0.25rem" }} bg={isSelected ? 'light' : 'dark'} text={isSelected ? 'dark' : 'light'}  style={{
            fontSize: '0.75rem'
          }}>
                Select
              </Badge>
            </ListGroup.Item>;
      })}
      </ListGroup>

      {/* View All Archive trigger from Figma Screen Page 4 */}
      <Button sx={{ width: "100%", paddingTop: "0.5rem", paddingBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }} variant="outline-dark" className="gap-1.5" style={{
      borderStyle: 'dashed',
      borderColor: 'var(--border)'
    }} onClick={() => navigate(`${basePath}/volumes`)}>
        <Icon icon="lucide:archive" width="16" />
        <span>View All Archive</span>
      </Button>
    </MuiBox>;
}
