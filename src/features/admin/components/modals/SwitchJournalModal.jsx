import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import { Modal, Form, ListGroup } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../../shared/components/Icon.jsx';
import PrimaryButton from '../../../../shared/components/Button/PrimaryButton';
import { useJournalManagement } from '../../../journal/hooks/useJournalManagement';
import { getClassNameSx, stripMappedClassNames } from '../../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * Component SwitchJournalModal - Cửa sổ bật lên phục vụ Admin đổi nhanh Tạp chí đang làm việc.
 * Thiết kế khớp 100% với Figma Hình 4.
 */
export default function SwitchJournalModal({
  show,
  handleClose
}) {
  const {
    t
  } = useTranslation();
  const {
    journals,
    currentJournal,
    setCurrentJournal
  } = useJournalManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [tempSelectedId, setTempSelectedId] = useState(null);

  // Sync tempSelectedId when currentJournal changes or modal opens
  useEffect(() => {
    if (currentJournal) {
      setTempSelectedId(currentJournal.id);
    }
  }, [currentJournal, show]);

  // Thực hiện bộ lọc tìm kiếm tạp chí nhanh ngay trên Modal
  const matchedJournals = (journals || []).filter(j => (j.title || j.display_name || '').toLowerCase().includes(searchTerm.toLowerCase()) || (j.issn || '').includes(searchTerm));
  const handleConfirmSelect = () => {
    if (tempSelectedId) {
      setCurrentJournal(tempSelectedId);
      setSearchTerm('');
      handleClose();
    }
  };
  return <Modal show={show} onHide={handleClose} centered className="text-main">
      <Modal.Header sx={{ borderBottom: 0, paddingBottom: "0" }} closeButton >
        <div>
          <Modal.Title sx={{ fontWeight: 500, fontSize: "1.5rem", lineHeight: 1.2, marginBottom: "0.25rem" }} className="font-display text-main">Switch Journal</Modal.Title>
          <small className="text-muted-custom">
            Select which repository context you wish to manage.
          </small>
        </div>
      </Modal.Header>

      <Modal.Body sx={{ paddingTop: "1rem", paddingBottom: "1rem", textAlign: "left" }} >
        {/* Ô nhập từ khóa lọc nhanh */}
        <Form.Group sx={{ marginBottom: "1rem" }} >
          <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", width: "100%" }} >
            <MuiBox component="span" sx={{ display: "flex", alignItems: "center", px: "0.75rem", py: "0.375rem", color: "#212529", textAlign: "center", whiteSpace: "nowrap", bgcolor: "#f8f9fa", border: "1px solid #dee2e6", borderRadius: "0.375rem", borderInlineEnd: 0 }} >
              <Icon sx={{ color: "text.secondary" }} icon="lucide:search"  width="16" />
            </MuiBox>
            <Form.Control sx={{ borderInlineStart: 0 }} type="text" placeholder={t("admin.filterJournalsByNameOrIssn")} value={searchTerm} onChange={e => setSearchTerm(e.target.value)}  style={{
            backgroundColor: '#ffffff',
            borderColor: 'var(--border)'
          }} />
          </MuiBox>
        </Form.Group>

        {/* Danh sách kết quả hiển thị */}
        <ListGroup sx={{ overflowY: "auto", gap: "0.5rem" }}  style={{
        maxHeight: '320px',
        paddingRight: '4px'
      }}>
          {matchedJournals.map(j => {
          const isCurrent = j.id === currentJournal?.id;
          const isTempSelected = j.id === tempSelectedId;
          return <ListGroup.Item sx={{ borderRadius: "0.5rem" }} key={j.id} onClick={() => setTempSelectedId(j.id)} className="admin-switch-journal-item" style={{
            border: isTempSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
            margin: isTempSelected ? '-1px' : '0',
            backgroundColor: '#ffffff',
            transition: 'all 0.15s ease',
            cursor: 'pointer'
          }}>
                <div className="admin-switch-journal-item__main">
                  <div className="admin-switch-journal-item__icon">
                    <Icon icon="lucide:book" width="18" />
                  </div>
                  <div className="admin-switch-journal-item__content">
                    <div className="admin-switch-journal-item__title-row">
                      <MuiBox component="span" sx={{ fontWeight: 700 }} className="text-main">{j.title}</MuiBox>
                      {isCurrent && <MuiBox component="span" sx={{ display: "inline-block", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "50rem", textTransform: "uppercase", paddingLeft: "0.5rem", paddingRight: "0.5rem" }} className="admin-status-badge admin-status-badge--warning text-xs font-semibold py-0.5">
                          Current
                        </MuiBox>}
                    </div>
                    <MuiBox component="small" sx={{ fontSize: "0.875em", display: "block" }} className="text-muted-custom mt-0.5">
                      {j.subjectCategory || 'General Science'} • ISSN: {j.issn}
                    </MuiBox>
                  </div>
                </div>

                <div className="admin-switch-journal-item__side">
                  <MuiBox component="span" sx={getClassNameSx(`badge px-2 py-1.5 rounded-pill text-uppercase text-xs ${j.status === 'Active' ? 'admin-status-badge admin-status-badge--accent' : 'admin-status-badge admin-status-badge--muted'}`)} className={stripMappedClassNames(`badge px-2 py-1.5 rounded-pill text-uppercase text-xs ${j.status === 'Active' ? 'admin-status-badge admin-status-badge--accent' : 'admin-status-badge admin-status-badge--muted'}`)}>
                    {j.status || 'Draft'}
                  </MuiBox>
                </div>
              </ListGroup.Item>;
        })}
          {matchedJournals.length === 0 && <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "1.5rem" }} className="text-muted-custom">
              No journals match your filter criteria.
            </MuiBox>}
        </ListGroup>
      </Modal.Body>

      <Modal.Footer sx={{ borderTop: 0, paddingTop: "0", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem" }} >
        <PrimaryButton variant="outline" onClick={handleClose}>
          Cancel
        </PrimaryButton>
        <PrimaryButton onClick={handleConfirmSelect} disabled={!tempSelectedId}>
          Select Journal
        </PrimaryButton>
      </Modal.Footer>
    </Modal>;
}
