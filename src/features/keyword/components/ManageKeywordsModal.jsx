import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { Modal, Button, Table } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../shared/components/Icon';


import MuiBox from '@mui/material/Box';

const ManageKeywordsModal = ({
  show,
  onHide,
  watchedKeywords,
  onRemove,
  actionLoading
}) => {
  const { t: _t } = useTranslation();
  return <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header sx={{ borderBottom: 0, paddingBottom: "0" }} closeButton >
        <Modal.Title sx={{ fontWeight: 700 }} className="font-display">{t("keyword.quanLyKeywordWatchList")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Array.isArray(watchedKeywords) && watchedKeywords.length > 0 ? <MuiBox component="div" sx={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" }} >
            <Table sx={{ verticalAlign: "middle" }} hover >
              <thead>
                <tr>
                  <MuiBox component="th" sx={{ fontWeight: 500 }} className="text-muted-custom font-display">Keyword</MuiBox>
                  <MuiBox component="th" sx={{ fontWeight: 500, textAlign: "right" }} className="text-muted-custom font-display">{t("journal.hanhDong")}</MuiBox>
                </tr>
              </thead>
              <tbody>
                {watchedKeywords.map((kw, idx) => {
              const label = typeof kw === 'string' ? kw : kw.keyword || kw.name;
              const id = typeof kw === 'string' ? kw : kw.id || kw.keywordId;
              return <tr key={idx}>
                      <MuiBox component="td" sx={{ fontWeight: 500 }} className="text-main">{label}</MuiBox>
                      <MuiBox component="td" sx={{ textAlign: "right" }} >
                        <Button sx={{ color: "error.main", padding: "0", border: 0, textDecoration: "none" }} variant="link"  onClick={() => onRemove(id)} disabled={actionLoading}>
                          <Icon icon="lucide:trash-2" width="16" />{t("keyword.xoa")}</Button>
                      </MuiBox>
                    </tr>;
            })}
              </tbody>
            </Table>
          </MuiBox> : <MuiBox component="div" sx={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "1.5rem" }} className="text-muted-custom">{t("keyword.chuaCoKeywordNaoTrongDanhSachT")}</MuiBox>}
      </Modal.Body>
      <Modal.Footer sx={{ borderTop: 0, paddingTop: "0" }} >
        <Button sx={{ border: "1px solid #dee2e6" }} variant="light" className="text-muted-custom" onClick={onHide}>{t("article.dong")}</Button>
      </Modal.Footer>
    </Modal>;
};
export default ManageKeywordsModal;
