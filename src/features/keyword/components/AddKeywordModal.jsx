import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { Modal, Form } from '@/shared/components/ui/muiAdapters';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';


import MuiBox from '@mui/material/Box';

const AddKeywordModal = ({
  show,
  onHide,
  onAdd,
  actionLoading
}) => {
  const {
    t
  } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    if (!keyword.trim()) return;
    try {
      await onAdd(keyword.trim());
      setKeyword('');
      onHide();
    } catch (err) {
      // Error handled by hook or parent
    }
  };
  return <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header sx={{ borderBottom: 0, paddingBottom: "0" }} closeButton >
        <Modal.Title sx={{ fontWeight: 700 }} className="font-display">{t("keyword.themKeywordTheoDoi")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group sx={{ marginBottom: "1rem" }} >
            <Form.Label sx={{ fontSize: "0.875em" }} className="text-muted-custom">{t("keyword.nhapTuKhoaKeyword")}</Form.Label>
            <Form.Control type="text" placeholder={t("keyword.viDuLargeLanguageModel")} value={keyword} onChange={e => setKeyword(e.target.value)} disabled={actionLoading} required autoFocus />
          </Form.Group>
          <MuiBox component="div" sx={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1.5rem" }} >
            <PrimaryButton variant="outline" onClick={onHide} disabled={actionLoading}>{t("admin.huy")}</PrimaryButton>
            <PrimaryButton type="submit" disabled={actionLoading || !keyword.trim()}>
              {actionLoading ? t("keyword.dangThem") : t("keyword.themKeyword")}
            </PrimaryButton>
          </MuiBox>
        </Form>
      </Modal.Body>
    </Modal>;
};
export default AddKeywordModal;
