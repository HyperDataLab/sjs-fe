import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { Modal, Button, Form, ListGroup } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../../shared/components/Icon.jsx';
import { useJournalManagement } from '../../hooks/useJournalManagement';


import MuiBox from '@mui/material/Box';


/**
 * Component SwitchJournalModal - Cửa sổ bật lên phục vụ Admin đổi nhanh Tạp chí đang làm việc.
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

  // Thực hiện bộ lọc tìm kiếm tạp chí nhanh ngay trên Modal
  const matchedJournals = journals.filter(j => (j.title || j.display_name || '').toLowerCase().includes(searchTerm.toLowerCase()) || (j.issn || '').includes(searchTerm));
  return <Modal show={show} onHide={handleClose} centered className="text-main">
      <Modal.Header sx={{ borderBottom: 0, paddingBottom: "0" }} closeButton >
        <Modal.Title sx={{ fontWeight: 500, fontSize: "1.25rem", lineHeight: 1.2 }} className="font-display text-main">{t("journal.chuyenDoiTapChiQuanLy")}</Modal.Title>
      </Modal.Header>
      <Modal.Body sx={{ paddingTop: "1rem", paddingBottom: "1rem" }} >
        {/* Ô nhập từ khóa lọc nhanh */}
        <Form.Group sx={{ marginBottom: "1rem" }} >
          <Form.Control type="text" placeholder={t("journal.timTheoTenTapChiHoacMaIssn")} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{
          backgroundColor: 'var(--bg-chip)',
          borderColor: 'var(--border)'
        }} />
        </Form.Group>

        {/* Danh sách kết quả hiển thị */}
        <ListGroup sx={{ overflowY: "auto" }}  style={{
        maxHeight: '280px'
      }}>
          {matchedJournals.map(j => {
          const isCurrent = j.id === currentJournal?.id;
          return <ListGroup.Item sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }} key={j.id} action disabled={isCurrent} // Khóa bấm nếu chính là tạp chí đang mở sẵn rồi
          onClick={() => {
            setCurrentJournal(j.id);
            setSearchTerm('');
            handleClose();
          }} className="py-2.5">
                <MuiBox component="div" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", paddingInlineEnd: "0.5rem" }} >
                  <MuiBox component="div" sx={{ fontWeight: 600, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-main">{j.title}</MuiBox>
                  <MuiBox component="small" sx={{ fontFamily: "monospace" }} className="text-muted-custom">ISSN: {j.issn}</MuiBox>
                </MuiBox>
                {isCurrent && <MuiBox component="span" sx={{ display: "flex", px: "0.65em", py: "0.35em", fontSize: "0.75em", fontWeight: 700, lineHeight: 1, color: "#fff", textAlign: "center", whiteSpace: "nowrap", verticalAlign: "baseline", borderRadius: "0.375rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", alignItems: "center", flexShrink: 0 }} className="bg-dark-solid text-xs px-1.5 gap-0.5">
                    <Icon icon="lucide:check" width="10" /> Active
                  </MuiBox>}
              </ListGroup.Item>;
        })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer sx={{ borderTop: 0, paddingTop: "0" }} >
        <Button variant="light" size="sm" onClick={handleClose} className="btn-custom-sm text-main">{t("journal.dongLai")}</Button>
      </Modal.Footer>
    </Modal>;
}
