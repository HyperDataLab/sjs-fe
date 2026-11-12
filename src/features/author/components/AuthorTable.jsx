import { useTranslation } from "react-i18next";
/**
 * @file AuthorTable.jsx
 * @description Vỏ chứa dữ liệu dạng bảng hiển thị danh sách tác giả theo cấu trúc dòng cột.
 */

import { Table, Row, Col } from '@/shared/components/ui/muiAdapters';
import AuthorTableRow from './AuthorTableRow';
import AuthorCard from './AuthorCard';
import LoadingSkeleton from '../../../shared/components/LoadingSkeleton';
import EmptyState from '../../../shared/components/EmptyState';
import ErrorState from '../../../shared/components/ErrorState';


import MuiBox from '@mui/material/Box';

export default function AuthorTable({
  authors = [],
  loading = false,
  error = null,
  onRetry = null,
  startIndex = 1
}) {
  const {
    t
  } = useTranslation();
  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }
  if (!loading && authors.length === 0) {
    return <EmptyState title={t("author.khongTimThayTacGiaPhuHop")} description={t("author.hayThuThayDoiTuKhoaTimKiemHoac")} icon="lucide:search-slash" />;
  }
  return <div>
      <MuiBox component="div" sx={{ display: "none", "@media (min-width:768px)": { display: "block" } }} className="author-table-shell">
        <Table sx={{ margin: "0", verticalAlign: "middle" }} hover responsive className="author-table">
          <thead>
            <tr>
              <MuiBox component="th" sx={{ textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem" }} className="author-table-index-col">#</MuiBox>
              <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >{t("typeAuthor")}</MuiBox>
              <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >{t("author.toChuc")}</MuiBox>
              <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >{t("publications")}</MuiBox>
              <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >Citations</MuiBox>
              <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >H-index</MuiBox>
              <MuiBox component="th" sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} className="author-table-action-col">{t("article.chiTiet1")}</MuiBox>
            </tr>
          </thead>
          <tbody>
            {loading ? Array.from({
            length: 5
          }).map((_, idx) => <tr key={idx}>
                  <MuiBox component="td" sx={{ textAlign: "center" }} ><LoadingSkeleton width="20px" height="15px" /></MuiBox>
                  <td>
                    <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
                      <LoadingSkeleton width="32px" height="32px" borderRadius="50%" />
                      <MuiBox component="div" sx={{ flexGrow: 1 }} >
                        <LoadingSkeleton sx={{ marginBottom: "0.25rem" }} width="120px" height="14px"  />
                        <LoadingSkeleton width="80px" height="10px" />
                      </MuiBox>
                    </MuiBox>
                  </td>
                  <td><LoadingSkeleton width="150px" height="14px" /></td>
                  <td><LoadingSkeleton width="40px" height="14px" /></td>
                  <td><LoadingSkeleton width="50px" height="14px" /></td>
                  <td><LoadingSkeleton width="30px" height="14px" /></td>
                  <td><LoadingSkeleton width="60px" height="14px" /></td>
                </tr>) : authors.filter(Boolean).map((author, idx) => <AuthorTableRow key={author.author_id ?? author.id ?? idx} author={author} index={startIndex + idx} />)}
          </tbody>
        </Table>
      </MuiBox>

      <MuiBox component="div" sx={{ display: "block", "@media (min-width:768px)": { display: "none" } }} >
        {loading ? <Row sx={{ gap: "1rem" }} >
            {Array.from({
          length: 3
        }).map((_, idx) => <Col xs={12} key={idx}>
                <div className="author-mobile-skeleton">
                  <MuiBox component="div" sx={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }} >
                    <LoadingSkeleton width="48px" height="48px" borderRadius="50%" />
                    <MuiBox component="div" sx={{ flexGrow: 1 }} >
                      <LoadingSkeleton sx={{ marginBottom: "0.5rem" }} width="60%" height="16px"  />
                      <LoadingSkeleton width="40%" height="12px" />
                    </MuiBox>
                  </MuiBox>
                  <LoadingSkeleton width="100%" height="40px" />
                </div>
              </Col>)}
          </Row> : <Row sx={{ gap: "1rem" }} >
            {authors.filter(Boolean).map((author, idx) => <Col xs={12} key={author.author_id ?? author.id ?? idx}>
                <AuthorCard author={author} />
              </Col>)}
          </Row>}
      </MuiBox>
    </div>;
}
