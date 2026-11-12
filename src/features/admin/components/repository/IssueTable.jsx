import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { Table } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../../shared/components/Icon.jsx';
import { StateCard } from '../../../../shared/components/Card';
import { getClassNameSx, stripMappedClassNames } from '../../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';

const getIssueId = issue => issue.issue_id || issue.id;
const getIssueNumber = issue => issue.issue_number ?? issue.issueNumber ?? '—';
const getIssueYear = issue => issue.publication_year || issue.publicationYear;
const getIssueStatus = issue => issue.is_deleted ? 'Deleted' : issue.status || 'Active';

/**
 * Component IssueTable - Bảng hiển thị các Issue được query theo volume_id.
 * Article count dùng dữ liệu Article đã query theo issue_id ở parent/hook, không dùng mock.
 *
 * @param {Array} issues - Danh sách Issue của Volume đang chọn
 * @param {Object} articleCountsByIssueId - Map số Article theo issue_id
 */
export default function IssueTable({
  issues,
  articleCountsByIssueId = {}
}) {
  const { t: _t } = useTranslation();
  if (!issues || issues.length === 0) {
    return <StateCard sx={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} variant="neutral" icon="lucide:calendar-dashed" title="No issues found" description="This volume does not have any issues created yet." className="border-dashed" />;
  }
  return <MuiBox component="div" sx={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch", borderRadius: "0.5rem", border: "1px solid #dee2e6", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)" }} >
      <Table sx={{ verticalAlign: "middle", marginBottom: "0", textAlign: "left", bgcolor: "background.paper" }} hover >
        <MuiBox component="thead" sx={{ "& th, & td": { bgcolor: "#f8f9fa" } }} >
          <tr>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingInlineStart: "1.5rem" }} className="text-muted-custom" style={{
            width: '240px'
          }}>Issue Details</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} className="text-muted-custom">Publication Year</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} className="text-muted-custom">Articles</MuiBox>
            <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingInlineEnd: "1.5rem" }} className="text-muted-custom" style={{
            width: '120px'
          }}>Status</MuiBox>
          </tr>
        </MuiBox>
        <tbody>
          {issues.map(issue => {
          const issueId = getIssueId(issue);
          const issueStatus = getIssueStatus(issue);
          const isPublished = issueStatus === 'Published' || issueStatus === 'Active';
          const articleCount = articleCountsByIssueId[issueId];
          return <tr key={issueId} className="transition-hover">
                <MuiBox component="td" sx={{ paddingTop: "1rem", paddingBottom: "1rem", paddingInlineStart: "1.5rem" }} >
                  <MuiBox component="div" sx={{ fontWeight: 700, fontFamily: "monospace" }} className="text-main">
                    {getIssueNumber(issue)}
                  </MuiBox>
                  <small className="text-muted-custom font-display">
                    {issue.issueName || issue.title || `Issue ${getIssueNumber(issue)}`}
                  </small>
                </MuiBox>

                <MuiBox component="td" sx={{ fontSize: "0.875em" }} className="text-muted-custom font-display">
                  {getIssueYear(issue) || '—'}
                </MuiBox>

                <MuiBox component="td" sx={{ fontWeight: 500, fontFamily: "monospace" }} className="text-main">
                  {typeof articleCount === 'number' ? articleCount : t("admin.chuaCoApiArticleTheoIssueidDaX")}
                </MuiBox>

                <MuiBox component="td" sx={{ paddingInlineEnd: "1.5rem" }} >
                  <MuiBox component="span" sx={getClassNameSx(`badge px-2.5 py-1.5 rounded text-uppercase ${isPublished ? 'admin-status-badge admin-status-badge--accent' : issueStatus === 'Deleted' ? 'admin-status-badge admin-status-badge--muted' : 'admin-status-badge admin-status-badge--warning'}`)} className={stripMappedClassNames(`badge px-2.5 py-1.5 rounded text-uppercase ${isPublished ? 'admin-status-badge admin-status-badge--accent' : issueStatus === 'Deleted' ? 'admin-status-badge admin-status-badge--muted' : 'admin-status-badge admin-status-badge--warning'}`)}>
                    {issueStatus}
                  </MuiBox>
                </MuiBox>
              </tr>;
        })}
        </tbody>
      </Table>
    </MuiBox>;
}
