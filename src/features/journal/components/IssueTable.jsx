import { useTranslation } from "react-i18next";
import { Table, Badge } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon.jsx';
import { StateCard } from '../../../shared/components/Card';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * Component IssueTable - Bảng hiển thị toàn bộ các Số phát sóng (Issues) nằm trong một Tập (Volume).
 * @param {Array} issues - Danh sách các Issue đã lọc theo Volume đang chọn
 */
export default function IssueTable({
  issues
}) {
  const {
    t
  } = useTranslation();
  // Trạng thái hiển thị nếu Admin chưa chọn Volume hoặc Volume được chọn chưa có Issue nào
  if (!issues || issues.length === 0) {
    return <StateCard sx={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} variant="neutral" icon="lucide:calendar-dashed" title={t("journal.khoLuuTruSoTrong")} description={t("journal.tapVolumeNayChuaThietLapCacSoP")} className="border-dashed" />;
  }
  return <MuiBox component="div" sx={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch", borderRadius: "0.5rem", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", border: "1px solid #dee2e6", overflow: "hidden" }} >
      <Table sx={{ verticalAlign: "middle", marginBottom: "0", textAlign: "left" }} hover className="bg-card">
        <MuiBox component="thead" sx={{ borderBottom: "1px solid #dee2e6" }}  style={{
        fontSize: '0.75rem',
        letterSpacing: '0.05em'
      }}>
          <tr>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingInlineStart: "1.5rem" }}  style={{
            width: '80px',
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>{t("journal.soHieu")}</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}  style={{
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>{t("journal.tenChuDeTenIssue")}</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}  style={{
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>{t("journal.namPhatHanh")}</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}  style={{
            backgroundColor: '#f8fafc',
            color: '#64748b'
          }}>{t("journal.trangThaiPhatHanh")}</MuiBox>
          </tr>
        </MuiBox>
        <tbody>
          {issues.map(issue => <tr key={issue.id} className="transition-hover">
              {/* Mã số hoặc thứ tự của Issue (Ví dụ: No. 1, No. 2) */}
              <MuiBox component="td" sx={{ paddingInlineStart: "1.5rem", fontFamily: "monospace", fontWeight: 700 }} className="text-main">
                {issue.issueNumber}
              </MuiBox>

              {/* Tên tiêu đề nội dung hoặc chủ đề đặc biệt của số phát hành đó */}
              <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", fontWeight: 500 }} className="text-main">
                {issue.issueName}
              </MuiBox>

              {/* Năm ấn định phát hành số */}
              <MuiBox component="td" sx={{ fontSize: "0.875em", fontFamily: "monospace" }} className="text-muted-custom">
                {issue.publicationYear}
              </MuiBox>

              {/* Badge màu thể hiện trạng thái (Đã xuất bản hoặc Đang lên lịch) theo Design System */}
              <td>
                <MuiBox component="span" sx={getClassNameSx(`badge px-2.5 py-1.5 rounded ${issue.status === 'Published' ? 'bg-success-subtle text-success' : 'bg-info-subtle text-info'}`)} className={stripMappedClassNames(`badge px-2.5 py-1.5 rounded ${issue.status === 'Published' ? 'bg-success-subtle text-success' : 'bg-info-subtle text-info'}`)}>
                  {issue.status === 'Published' ? 'Published' : 'Scheduled'}
                </MuiBox>
              </td>
            </tr>)}
        </tbody>
      </Table>
    </MuiBox>;
}
