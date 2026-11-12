import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState } from 'react';
import { Modal, Form, Row, Col } from '@/shared/components/ui/muiAdapters';
import { useJournalManagement } from '../../../journal/hooks/useJournalManagement';
import PrimaryButton from '../../../../shared/components/Button/PrimaryButton';


import MuiBox from '@mui/material/Box';


/**
 * Component CreateIssueModal - Cửa sổ Modal bật lên để Admin thêm Số phát hành (Issue) mới vào Volume đang chọn.
 * Khớp hoàn toàn với thiết kế Figma Hình 7.
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
    issueNumber: '1',
    publicationYear: '2024'
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
    if (!formData.issueName.trim()) {
      newErrors.issueName = t("admin.tenIssueKhongDuocDeTrong");
    }
    if (!formData.issueNumber.toString().trim()) {
      newErrors.issueNumber = t("admin.soIssueKhongDuocDeTrong");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Xử lý nhấn nút Tạo Issue */
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await createIssue({
        issueName: formData.issueName,
        issueNumber: formData.issueNumber,
        publicationYear: parseInt(formData.publicationYear, 10),
        status: 'Scheduled'
      });

      // Clean form và đóng pop-up
      setFormData({
        issueName: '',
        issueNumber: '1',
        publicationYear: '2024'
      });
      handleClose();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      const errorDetail = err.response?.data?.detail ? `\nChi tiết: ${err.response.data.detail}` : '';
      alert(t("Lỗi tạo Issue: ") + errorMsg + errorDetail);
    }
  };
  return <Modal show={show} onHide={handleClose} centered backdrop="static" className="text-main">
      <Modal.Header sx={{ borderBottom: 0, paddingBottom: "0" }} closeButton >
        <Modal.Title sx={{ fontWeight: 500, fontSize: "1.25rem", lineHeight: 1.2 }} className="font-display text-main">{t("admin.taoIssueMoi")}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body sx={{ paddingTop: "1rem", paddingBottom: "1rem", textAlign: "left" }} >
          <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "1rem" }} className="text-muted-custom">{t("admin.dienThongTinChiTietDeBatDauMot")}</MuiBox>

          {/* Tên Issue */}
          <Form.Group sx={{ marginBottom: "1rem" }} >
            <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">{t("admin.tenIssue")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
            <Form.Control type="text" name="issueName" value={formData.issueName} onChange={handleChange} isInvalid={!!errors.issueName} placeholder={t("admin.viDuSpecialEditionOnAi")} />
            <Form.Control.Feedback type="invalid">{errors.issueName}</Form.Control.Feedback>
          </Form.Group>

          <Row sx={{ gap: "1rem", marginBottom: "0" }} >
            {/* Số Issue */}
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">{t("admin.soIssue")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
                <Form.Control type="number" name="issueNumber" value={formData.issueNumber} onChange={handleChange} isInvalid={!!errors.issueNumber} placeholder={t("admin.viDu1")} />
                <Form.Control.Feedback type="invalid">{errors.issueNumber}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Năm xuất bản */}
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">{t("admin.namXuatBan")}</Form.Label>
                <Form.Control type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange} placeholder={t("admin.2024")} />
              </Form.Group>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer sx={{ borderTop: 0, paddingTop: "0" }} >
          <PrimaryButton sx={{ paddingLeft: "1rem", paddingRight: "1rem" }} variant="outline" onClick={handleClose} >{t("admin.huy")}</PrimaryButton>
          <PrimaryButton sx={{ paddingLeft: "1rem", paddingRight: "1rem" }} type="submit" >{t("admin.taoIssue")}</PrimaryButton>
        </Modal.Footer>
      </Form>
    </Modal>;
}
