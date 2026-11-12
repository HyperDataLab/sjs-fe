import { useTranslation } from "react-i18next";
// Component hiển thị giao diện trống (Empty State)
// Dùng để thông báo cho người dùng khi danh sách hoặc kết quả tìm kiếm không có dữ liệu

import Icon from './Icon';
import PrimaryButton from './Button/PrimaryButton';
import { combineSx, getClassNameSx, stripMappedClassNames } from '../theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * Thành phần hiển thị giao diện thông báo trực quan khi không tìm thấy dữ liệu.
 *
 * @param {Object} props - Thuộc tính truyền vào component.
 * @param {string} [props.title='Không có dữ liệu'] - Tiêu đề thông báo.
 * @param {string} [props.description='Không tìm thấy kết quả phù hợp.'] - Mô tả chi tiết thông báo trống.
 * @param {string} [props.icon='lucide:folder-open'] - Icon hiển thị.
 * @param {string} [props.actionLabel=''] - Nhãn của nút hành động đi kèm (nếu có).
 * @param {Function} [props.onAction=null] - Hàm xử lý sự kiện khi click nút hành động.
 * @param {string} [props.className=''] - Lớp CSS tùy chọn bổ sung.
 * @returns {JSX.Element} Giao diện trạng thái trống.
 */
export default function EmptyState({
  title,
  // Tiêu đề thông báo
  description,
  // Mô tả chi tiết thông báo trống
  icon = 'lucide:folder-open',
  // Icon hiển thị
  actionLabel = '',
  // Nhãn của nút hành động đi kèm (nếu có)
  onAction = null,
  // Hàm xử lý sự kiện khi click nút hành động
  className = '',
  sx,
}) {
  const {
    t
  } = useTranslation();
  const resolvedTitle = title || t("topic.khongCoDuLieu");
  const resolvedDescription = description || t("common.khongTimThayKetQuaPhuHop");
  return <MuiBox component="div" sx={combineSx(getClassNameSx(`d-flex flex-column align-items-center justify-content-center text-center py-5 px-4 rounded-3 border ${className}`), sx)} className={stripMappedClassNames(`d-flex flex-column align-items-center justify-content-center text-center py-5 px-4 rounded-3 border ${className}`)} style={{
    backgroundColor: 'var(--bg-card)',
    borderColor: 'var(--border)',
    minHeight: '260px'
  }}>
      {/* Vùng hiển thị Icon tròn */}
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }} className="text-muted-custom" style={{
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      backgroundColor: 'var(--bg-section)'
    }}>
        <Icon sx={{ opacity: 0.75 }} icon={icon} width="32"  />
      </MuiBox>

      {/* Tiêu đề trạng thái trống */}
      <MuiBox component="h3" sx={{ fontWeight: 700, marginBottom: "0.5rem" }} className="text-main" style={{
      fontSize: '1.1rem',
      fontFamily: 'var(--font-display)'
    }}>
        {resolvedTitle}
      </MuiBox>

      {/* Mô tả chi tiết trạng thái trống */}
      <MuiBox component="p" sx={{ marginBottom: "1.5rem", mx: "auto" }} className="text-muted-custom" style={{
      fontSize: '0.85rem',
      maxWidth: '380px',
      lineHeight: '1.5'
    }}>
        {resolvedDescription}
      </MuiBox>

      {/* Nút hành động đi kèm (ví dụ: Tạo mới, Thử lại, Reset bộ lọc) */}
      {actionLabel && onAction && <PrimaryButton onClick={onAction}>
          {actionLabel}
        </PrimaryButton>}
    </MuiBox>;
}
