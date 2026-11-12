import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { Table, Button } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import { StateCard } from '../../../shared/components/Card';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * Component JournalTableAdmin - Bảng hiển thị danh sách tạp chí phục vụ mục đích quản trị (Admin View).
 * Đáp ứng Issue #76: Hiển thị Title, ISSN, Publisher, Publisher, Last Updated, Status và các nút Action.
 * * @param {Array} journals - Danh sách tạp chí sau khi đã qua bộ lọc search/status
 * @param {number} page - Trang hiện tại (phục vụ tính toán số thứ tự tăng tiến)
 * @param {number} limit - Số lượng dòng trên một trang
 */
export default function JournalTableAdmin({
  journals,
  page = 1,
  limit = 10
}) {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();

  // Trạng thái trống nếu không tìm thấy dữ liệu phù hợp với bộ lọc
  if (!journals || journals.length === 0) {
    return <StateCard sx={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} variant="neutral" icon="lucide:search-x" title={t("admin.khongTimThayTapChiNao")} description={t("admin.hayThuThayDoiTuKhoaTimKiemHoac")} className="border-dashed" />;
  }
  return <MuiBox component="div" sx={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", borderRadius: "0.5rem", overflow: "hidden" }} className="journal-table-shell">
      <Table sx={{ verticalAlign: "middle", marginBottom: "0", textAlign: "left", bgcolor: "background.paper" }} hover className="journal-table">
        <MuiBox component="thead" sx={{ borderBottom: "1px solid #dee2e6" }}  style={{
        fontSize: '0.75rem',
        letterSpacing: '0.05em'
      }}>
          <tr>
            <MuiBox component="th" sx={{ paddingInlineStart: "1.5rem" }} className="py-3.5" style={{
            width: '60px',
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>#</MuiBox>
            <th className="py-3.5" style={{
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>Journal Title / Publisher</th>
            <th className="py-3.5" style={{
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>ISSN</th>
            <th className="py-3.5" style={{
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>{t("journal.linhVucChuyenNganh")}</th>
            <th className="py-3.5" style={{
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>Publisher</th>
            <th className="py-3.5" style={{
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>Last Updated</th>
            <th className="py-3.5" style={{
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>Status</th>
            <MuiBox component="th" sx={{ paddingInlineEnd: "1.5rem", textAlign: "right" }} className="py-3.5" style={{
            width: '140px',
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>{t("journal.hanhDong")}</MuiBox>
          </tr>
        </MuiBox>
        <tbody>
          {journals.map((journal, index) => {
          // Tính toán số thứ tự hiển thị liên tục theo phân trang hệ thống
          const displayIndex = (page - 1) * limit + index + 1;
          const id = journal.id || journal.journal_id;
          return <tr key={id} className="journal-table-row transition-hover">
                {/* Số thứ tự dòng */}
                <MuiBox component="td" sx={{ paddingInlineStart: "1.5rem", fontWeight: 500 }} className="text-muted-custom">
                  {displayIndex}
                </MuiBox>

                {/* Tên tạp chí và nhà xuất bản */}
                <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >
                  <MuiBox component="div" sx={{ fontWeight: 700 }} className="text-main line-clamp-1">
                    {journal.title || journal.display_name}
                  </MuiBox>
                  <MuiBox component="div" sx={{ fontSize: "0.875em", display: "flex", alignItems: "center", gap: "0.25rem" }} className="text-muted-custom mt-0.5">
                    <Icon icon="lucide:building" width="12" />
                    <span>{journal.publisher || t("journal.chuaCapNhatNhaXuatBan")}</span>
                  </MuiBox>
                </MuiBox>

                {/* Mã số định danh ISSN quốc tế */}
                <MuiBox component="td" sx={{ fontFamily: "monospace", fontSize: "0.875em" }} >
                  <div>P: {journal.issn || '—'}</div>
                  <div className="text-muted-custom">E: {journal.onlineIssn || '—'}</div>
                </MuiBox>

                {/* Lĩnh vực và chuyên mục phân loại nghiên cứu */}
                <td>
                  <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "#212529", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", bgcolor: "#f8f9fa", border: "1px solid #dee2e6", paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "0.25rem", paddingBottom: "0.25rem" }} className="font-display">
                    {journal.subjectCategory || t("journal.phanLoaiChung")}
                  </MuiBox>
                  <MuiBox component="div" sx={{ fontSize: "0.875em", marginTop: "0.25rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-muted-custom" style={{
                maxWidth: '180px'
              }}>
                    {journal.subjectArea || t("journal.chuyenNganhHep")}
                  </MuiBox>
                </td>

                {/* Tên giáo sư / tổng biên tập chịu trách nhiệm nội dung */}
                <MuiBox component="td" sx={{ fontWeight: 500 }} className="text-main">
                  {journal.publisher || t("admin.chuaChiDinh")}
                </MuiBox>

                {/* Ngày cập nhật dữ liệu cấu trúc gần nhất */}
                <MuiBox component="td" sx={{ fontSize: "0.875em", fontFamily: "monospace" }} className="text-muted-custom">
                  {journal.lastUpdated || '—'}
                </MuiBox>

                {/* Badge trạng thái hoạt động ứng với các token màu của Design System */}
                <td>
                  <MuiBox component="span" sx={getClassNameSx(`badge px-2 py-1.5 rounded ${journal.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`)} className={stripMappedClassNames(`badge px-2 py-1.5 rounded ${journal.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`)}>
                    {journal.status || 'Draft'}
                  </MuiBox>
                </td>

                {/* Các nút bấm thao tác phân quyền quản trị điều hướng dữ liệu */}
                <MuiBox component="td" sx={{ paddingInlineEnd: "1.5rem", textAlign: "right" }} >
                  <MuiBox component="div" sx={{ display: "flex", justifyContent: "flex-end" }} className="gap-1.5">
                    {/* Nút vào quản lý kho cấu trúc Volume và Issue (Màn hình 4) */}
                    <Button sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.5rem", borderRadius: "0.375rem" }} variant="light" size="sm" className="btn-custom-sm" onClick={() => navigate('/admin/journals/repository')} title={t("admin.quanLyRepoVolumeIssue")}>
                      <Icon sx={{ color: "#212529" }} icon="lucide:layers" width="16"  />
                    </Button>

                    {/* Nút vào form chỉnh sửa chi tiết cấu hình Journal (Màn hình 12) */}
                    <Button sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.5rem", borderRadius: "0.375rem" }} variant="outline-dark" size="sm" className="btn-custom-sm" onClick={() => navigate(`/admin/journals/${id}/edit`)} title={t("admin.chinhSuaThongTinTapChi")}>
                      <Icon icon="lucide:edit-3" width="16" />
                    </Button>
                  </MuiBox>
                </MuiBox>
              </tr>;
        })}
        </tbody>
      </Table>
    </MuiBox>;
}
