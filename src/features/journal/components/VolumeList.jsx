import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { ListGroup, Badge } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * Component VolumeList - Hiển thị danh sách các Tập (Volume) thuộc Tạp chí đang chọn.
 * @param {Array} volumes - Danh sách các Volume đã được lọc theo Journal hiện tại
 * @param {string} selectedVolumeId - ID của Volume đang được chọn để xem Issue
 * @param {function} onSelectVolume - Hàm callback kích hoạt khi Admin bấm chọn một Volume
 */
export default function VolumeList({
  volumes,
  selectedVolumeId,
  onSelectVolume
}) {
  const { t: _t } = useTranslation();
  // Trạng thái trống nếu Tạp chí này chưa được khởi tạo Volume nào
  if (!volumes || volumes.length === 0) {
    return <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "1.5rem", bgcolor: "#f8f9fa", borderRadius: "0.5rem", border: "1px solid #dee2e6" }}  style={{
      backgroundColor: 'var(--bg-chip)'
    }}>
        <Icon sx={{ marginBottom: "0.5rem" }} icon="lucide:layers-3" width="32" className="text-muted-custom" />
        <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">{t("admin.chuaCoVolumeNaoDuocTao")}</MuiBox>
      </MuiBox>;
  }
  return <ListGroup sx={{ boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", borderRadius: "0.5rem", overflow: "hidden" }} >
      {volumes.map(vol => {
      const isSelected = vol.id === selectedVolumeId;
      return <ListGroup.Item sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", paddingBottom: "1rem", borderInlineStart: 0, borderInlineEnd: 0 }} key={vol.id} action active={isSelected} onClick={() => onSelectVolume(vol.id)}  style={{
        backgroundColor: isSelected ? 'var(--text-main)' : '#ffffff',
        borderColor: 'var(--border)',
        color: isSelected ? '#ffffff' : 'var(--text-main)',
        transition: 'all 0.2s ease'
      }}>
            <div>
              <MuiBox component="div" sx={getClassNameSx(`fw-bold ${isSelected ? 'text-white' : 'text-main'}`)} className={stripMappedClassNames(`fw-bold ${isSelected ? 'text-white' : 'text-main'}`)}>
                {vol.volumeNumber}
              </MuiBox>
              <MuiBox component="small" sx={getClassNameSx(isSelected ? 'text-white-50 font-monospace' : 'text-muted-custom font-monospace')} className={stripMappedClassNames(isSelected ? 'text-white-50 font-monospace' : 'text-muted-custom font-monospace')}>{t("article.namXuatBan")}{vol.publicationYear}
              </MuiBox>
            </div>

            {/* Hiển thị số lượng bài báo (Articles) hoặc Số phát sóng (Issues) đi kèm của tập đó */}
            <Badge sx={{ borderRadius: "50rem" }} bg={isSelected ? 'light' : 'dark'} text={isSelected ? 'dark' : 'light'} className="px-2.5 py-1.5">
              {vol.totalIssues || 0} Issues
            </Badge>
          </ListGroup.Item>;
    })}
    </ListGroup>;
}
