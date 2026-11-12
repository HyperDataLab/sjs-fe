import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../../shared/components/Icon.jsx';
import { getSubjectAreasApi } from '../../../journal/api/journalApi';
import PrimaryButton from '../../../../shared/components/Button/PrimaryButton';
import { HeaderFilterCard } from '../../../../shared/components/Card';
import { FilterSearch, FilterSelect } from '../../../../shared/components/Input';
import { getClassNameSx, stripMappedClassNames } from '../../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * Component JournalFilterBar - Thanh công cụ lọc, tìm kiếm và chuyển đổi giao diện hiển thị.
 *
 * @param {string} search - Từ khóa tìm kiếm hiện tại
 * @param {function} onSearchChange - Hàm callback khi thay đổi từ khóa tìm kiếm
 * @param {string} statusFilter - Trạng thái lọc (Active/Draft/All)
 * @param {function} onStatusChange - Hàm callback khi thay đổi bộ lọc trạng thái
 * @param {string} subjectFilter - Bộ lọc chuyên ngành/lĩnh vực (Subject Category)
 * @param {function} onSubjectChange - Hàm callback khi thay đổi bộ lọc chuyên ngành
 * @param {string} viewMode - Chế độ hiển thị ('table' hoặc 'card')
 * @param {function} onViewModeChange - Hàm callback khi bấm chuyển đổi chế độ xem
 * @param {function} onOpenAddModal - Hàm mở Modal thêm Tạp chí mới
 */
export default function JournalFilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  subjectFilter = 'All',
  onSubjectChange,
  viewMode,
  onViewModeChange,
  onOpenAddModal
}) {
  const {
    t
  } = useTranslation();
  const [subjectAreas, setSubjectAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let ignore = false;
    const fetchSubjectAreas = async () => {
      setLoading(true);
      try {
        const response = await getSubjectAreasApi({
          page: 1,
          limit: 100
        });
        if (ignore) return;
        const items = response.data?.data?.items || response.data?.data || [];
        setSubjectAreas(items);
      } catch (err) {
        console.error('Failed to fetch subject areas for filter:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchSubjectAreas();
    return () => {
      ignore = true;
    };
  }, []);
  return <HeaderFilterCard sx={{ marginBottom: "1.5rem" }} >
      <Row sx={{ alignItems: "flex-end", gap: "1rem" }} >
        {/* Search Input */}
        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em", textTransform: "uppercase", marginBottom: "0.5rem" }} className="text-main" style={{
            letterSpacing: '0.05em'
          }}>
              Search Journals
            </Form.Label>
            <FilterSearch value={search} onChange={e => onSearchChange(e.target.value)} placeholder={t("admin.searchByTitleIssn")} />
          </Form.Group>
        </Col>

        {/* Status Filter */}
        <Col xs={12} sm={6} md={2.5}>
          <Form.Group>
            <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em", textTransform: "uppercase", marginBottom: "0.5rem" }} className="text-main" style={{
            letterSpacing: '0.05em'
          }}>
              Status
            </Form.Label>
            <FilterSelect value={statusFilter} onChange={e => onStatusChange(e.target.value)} options={[{
            value: 'All',
            label: 'All Statuses'
          }, {
            value: 'Active',
            label: 'Active'
          }, {
            value: 'Draft',
            label: 'Draft'
          }]} />
          </Form.Group>
        </Col>

        {/* Subject Area Filter */}
        <Col xs={12} sm={6} md={2.5}>
          <Form.Group>
            <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em", textTransform: "uppercase", marginBottom: "0.5rem" }} className="text-main" style={{
            letterSpacing: '0.05em'
          }}>
              Subject Area
            </Form.Label>
            <FilterSelect value={subjectFilter} onChange={e => onSubjectChange(e.target.value)} disabled={loading} options={[{
            value: 'All',
            label: 'All Subject Areas'
          }, ...subjectAreas.map(area => ({
            value: area.display_name || area.name,
            label: area.display_name || area.name
          }))]} />
          </Form.Group>
        </Col>

        {/* View Mode & Add Button */}
        <Col sx={{ display: "flex", "@media (min-width:768px)": { justifyContent: "flex-end" }, alignItems: "flex-end", gap: "1rem" }} xs={12} md={3} >
          {/* View Toggle */}
          <MuiBox component="div" sx={{ display: "inline-flex", verticalAlign: "middle", "& > :not(:first-of-type)": { ml: "-1px" } }}  role="group">
            <Button sx={getClassNameSx(`d-flex align-items-center p-2 rounded-start ${viewMode === 'table' ? 'bg-dark text-white' : 'bg-light text-dark border'}`)} variant="light" onClick={() => onViewModeChange('table')} className={stripMappedClassNames(`d-flex align-items-center p-2 rounded-start ${viewMode === 'table' ? 'bg-dark text-white' : 'bg-light text-dark border'}`)} style={{
            borderRight: 'none',
            height: '40px'
          }} title="Table view">
              <Icon icon="lucide:layout-list" width="16" />
            </Button>
            <Button sx={getClassNameSx(`d-flex align-items-center p-2 rounded-end ${viewMode === 'card' ? 'bg-dark text-white' : 'bg-light text-dark border'}`)} variant="light" onClick={() => onViewModeChange('card')} className={stripMappedClassNames(`d-flex align-items-center p-2 rounded-end ${viewMode === 'card' ? 'bg-dark text-white' : 'bg-light text-dark border'}`)} style={{
            borderLeft: 'none',
            height: '40px'
          }} title="Card view">
              <Icon icon="lucide:grid" width="16" />
            </Button>
          </MuiBox>

          {/* Add Journal Button */}
          <PrimaryButton sx={{ whiteSpace: "nowrap" }}  onClick={onOpenAddModal} style={{
          height: '40px'
        }}>
            <Icon sx={{ marginInlineEnd: "0.5rem" }} icon="lucide:plus" width="16"  />
            <span>Create Journal</span>
          </PrimaryButton>
        </Col>
      </Row>
    </HeaderFilterCard>;
}
