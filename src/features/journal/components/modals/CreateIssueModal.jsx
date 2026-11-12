import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState } from 'react';
import { Modal, Form, Row, Col } from '@/shared/components/ui/muiAdapters';
import PrimaryButton from '../../../../shared/components/Button/PrimaryButton';
import { useJournalManagement } from '../../hooks/useJournalManagement';


import MuiBox from '@mui/material/Box';


/**
 * Component CreateIssueModal - Cửa sổ Modal bật lên để Admin thêm Số phát hành (Issue) mới vào Volume đang chọn.
 * Đáp ứng Issue #76: Gồm Issue name, Issue number, Publication year.
 */
export default function CreateIssueModal({
  show,
  handleClose
}) {
  const { t: _t } = useTranslation();
  const {
    createIssue
  } = useJournalManagement();

  // Khởi tạo state cho Form dữ liệu Số phát hành
  const [formData, setFormData] = useState({
    issueName: '',
    issueNumber: '',
    publicationYear: new Date().getFullYear()
  });

  // Quản lý thông báo lỗi validate dữ liệu bắt buộc điền
  const [errors, setErrors] = useState({});

  /** Theo dõi thay đổi chữ trong form */
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /** Hàm thực hiện bắt lỗi dữ liệu bỏ trống */
  const validateForm = () => {
    const newErrors = {};
    if (!formData.issueName.trim()) newErrors.issueName = t("journal.tenSoPhatHanhKhongDuocDeTrong");
    if (!formData.issueNumber.trim()) newErrors.issueNumber = t("journal.soHieuDinhDanhKhongDuocTrongVi");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Xử lý nhấn nút Tạo Issue */
  const handleSubmit = e => {
    e.preventDefault();
    if (!validateForm()) return;
    createIssue({
      issueName: formData.issueName,
      issueNumber: formData.issueNumber,
      publicationYear: parseInt(formData.publicationYear)
    });

    // Clean form và đóng pop-up
    setFormData({
      issueName: '',
      issueNumber: '',
      publicationYear: new Date().getFullYear()
    });
    handleClose();
  };
  return <Modal show={show} onHide={handleClose} centered backdrop="static" className="text-main">
      <Modal.Header sx={{ borderBottom: 0, paddingBottom: "0" }} closeButton >
        <Modal.Title sx={{ fontWeight: 500, fontSize: "1.25rem", lineHeight: 1.2 }} className="font-display text-main">{t("journal.taoSoPhatHanhMoiCreateNewIssue")}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body sx={{ paddingTop: "1rem", paddingBottom: "1rem", textAlign: "left" }} >

          {/* Tên tiêu đề số / Tên Issue */}
          <Form.Group sx={{ marginBottom: "1rem" }} >
            <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">{t("journal.tenIssueIssueName")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
            <Form.Control type="text" name="issueName" value={formData.issueName} onChange={handleChange} isInvalid={!!errors.issueName} placeholder={t("journal.viDuSpecialIssueOnAppliedDeepL")} />
            <Form.Control.Feedback type="invalid">{errors.issueName}</Form.Control.Feedback>
          </Form.Group>

          <Row sx={{ gap: "1rem", marginBottom: "0" }} >
            {/* Số hiệu định vị số (Issue Number) */}
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">{t("journal.soDinhDanhIssueNumber")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
                <Form.Control type="text" name="issueNumber" value={formData.issueNumber} onChange={handleChange} isInvalid={!!errors.issueNumber} placeholder={t("journal.viDuNo1No2Vol3No1")} />
                <Form.Control.Feedback type="invalid">{errors.issueNumber}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Năm phát hành */}
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">{t("journal.namPhatHanhPublicationYear")}</Form.Label>
                <Form.Control type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer sx={{ borderTop: 0, paddingTop: "0" }} >
          <PrimaryButton variant="outline" onClick={handleClose}>{t("journal.huyBo")}</PrimaryButton>
          <PrimaryButton type="submit">{t("admin.taoIssue")}</PrimaryButton>
        </Modal.Footer>
      </Form>
    </Modal>;
}
