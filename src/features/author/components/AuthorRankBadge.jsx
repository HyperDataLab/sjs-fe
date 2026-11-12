/**
 * @file AuthorRankBadge.jsx
 * @description Component hiển thị huy hiệu xếp hạng (rank badge) của tác giả trên bảng xếp hạng.
 *
 * Chức năng chính:
 * - Hiển thị thứ hạng nổi bật cho Top 1, 2, 3 bằng vương miện hoặc màu sắc tương ứng (Vàng, Bạc, Đồng).
 * - Hiển thị vòng tròn số thứ tự thông thường cho các thứ hạng sau Top 3.
 */

import Icon from '../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';


/**
 * Component hiển thị huy hiệu thứ hạng tác giả.
 *
 * @param {Object} props - Thuộc tính truyền vào component.
 * @param {number|string} props.rank - Thứ hạng hiển thị.
 * @returns {JSX.Element} Giao diện huy hiệu xếp hạng tác giả.
 */
export default function AuthorRankBadge({ rank }) {
  const rankNum = parseInt(rank, 10);

  // Cấu hình phong cách hiển thị cho Top 3 vị trí dẫn đầu
  const configs = {
    1: { bg: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)', color: '#FFFFFF', icon: 'lucide:crown' }, // Vị trí 1: Vương miện vàng
    2: { bg: 'linear-gradient(135deg, #9CA3AF 0%, #4B5563 100%)', color: '#FFFFFF', icon: null },             // Vị trí 2: Huy hiệu Bạc
    3: { bg: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)', color: '#FFFFFF', icon: null }              // Vị trí 3: Huy hiệu Đồng
  };

  // Sử dụng cấu hình tương ứng cho Top 3, mặc định dùng vòng tròn xám cho các thứ hạng thường
  const currentConfig = configs[rankNum] || {
    bg: 'var(--bg-section)',
    color: 'var(--text-muted)',
    icon: null
  };

  return (
    <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", flexShrink: 0 }}

      style={{
        width: '30px',
        height: '30px',
        background: currentConfig.bg,
        color: currentConfig.color,
        fontSize: '0.8rem',
        fontWeight: 700,
        boxShadow: rankNum <= 3 ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
        fontFamily: 'var(--font-display)'
      }}
    >
      {/* Hiển thị Icon vương miện cho vị trí số 1, các vị trí khác hiển thị số */}
      {currentConfig.icon ? (
        <Icon sx={{ color: "#fff" }} icon={currentConfig.icon} width="14"  />
      ) : (
        rank
      )}
    </MuiBox>
  );
}
