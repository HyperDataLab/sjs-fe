import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState } from 'react';
import { Modal, Form, Row, Col } from '@/shared/components/ui/muiAdapters';
import PrimaryButton from '../../../../shared/components/Button/PrimaryButton';
import { useJournalManagement } from '../../hooks/useJournalManagement';


import MuiBox from '@mui/material/Box';


/**
 * Component AddJournalModal - Form cửa sổ bật lên để Admin khởi tạo một Tạp chí mới.
 * Đáp ứng tiêu chí Acceptance Criteria: Có đầy đủ các trường form, thực hiện kiểm tra lỗi (validation).
 */
export default function AddJournalModal({
  show,
  handleClose
}) {
  const { t: _t } = useTranslation();
  // Lấy hàm thêm mới từ Zustand Store tập trung
  const {
    addJournal
  } = useJournalManagement();

  // Khởi tạo trạng thái quản lý các ô nhập liệu của Form
  const [formData, setFormData] = useState({
    title: '',
    issn: '',
    onlineIssn: '',
    publisher: '',
    subjectCategory: '',
    subjectArea: ''
  });

  // State lưu trữ thông báo lỗi khi validate dữ liệu đầu vào
  const [errors, setErrors] = useState({});

  /** Xử lý cập nhật thay đổi chữ khi người dùng gõ vào ô input */
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

  /** Hàm thực hiện kiểm tra tính hợp lệ của dữ liệu trước khi lưu */
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = t("admin.tenTapChiKhongDuocDeTrong");
    if (!formData.issn.trim()) newErrors.issn = t("admin.maSoIssnKhongDuocDeTrong");
    if (!formData.publisher.trim()) newErrors.publisher = t("journal.nhaXuatBanKhongDuocDeTrong");
    if (!formData.subjectCategory) newErrors.subjectCategory = t("admin.vuiLongChonDanhMucChinh");
    if (!formData.subjectArea.trim()) newErrors.subjectArea = t("admin.linhVucNghienCuuCuTheKhongDuoc");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Xử lý submit lưu dữ liệu */
  const handleSubmit = e => {
    e.preventDefault();
    if (!validateForm()) return;
    addJournal(formData);
    setFormData({
      title: '',
      issn: '',
      onlineIssn: '',
      publisher: '',
      subjectCategory: '',
      subjectArea: ''
    });
    handleClose();
  };
  return <Modal show={show} onHide={handleClose} centered backdrop="static" className="text-main">
      <Modal.Header sx={{ borderBottom: 0, paddingBottom: "0" }} closeButton >
        <Modal.Title sx={{ fontWeight: 500, fontSize: "1.5rem", lineHeight: 1.2 }} className="font-display text-main">{t("journal.themTapChiMoi")}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body sx={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }} >

          {/* Tên Journal */}
          <Form.Group sx={{ marginBottom: "1rem" }} >
            <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">{t("journal.tenTapChiJournalTitle")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} isInvalid={!!errors.title} placeholder={t("journal.nhapTenChinhThucCuaTapChi")} />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          {/* Mã số định danh quốc tế ISSN */}
          <Row sx={{ gap: "1rem", marginBottom: "1rem" }} >
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">Print ISSN <MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
                <Form.Control type="text" name="issn" value={formData.issn} onChange={handleChange} isInvalid={!!errors.issn} placeholder={t("journal.viDu19374771")} />
                <Form.Control.Feedback type="invalid">{errors.issn}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">Online ISSN</Form.Label>
                <Form.Control type="text" name="onlineIssn" value={formData.onlineIssn} placeholder={t("journal.viDu1937478x")} />
              </Form.Group>
            </Col>
          </Row>

          {/* Nhà xuất bản */}
          <Form.Group sx={{ marginBottom: "1rem" }} >
            <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">{t("admin.nhaXuatBanPublisher")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
            <Form.Control type="text" name="publisher" value={formData.publisher} onChange={handleChange} isInvalid={!!errors.publisher} placeholder={t("journal.nhapTenNhaXuatBan")} />
            <Form.Control.Feedback type="invalid">{errors.publisher}</Form.Control.Feedback>
          </Form.Group>

          {/* Danh mục phân loại và Lĩnh vực nghiên cứu */}
          <Row sx={{ gap: "1rem", marginBottom: "1rem" }} >
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">{t("journal.danhMucSubjectCategory")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
                <Form.Select name="subjectCategory" value={formData.subjectCategory} onChange={handleChange} isInvalid={!!errors.subjectCategory}>
                  <option value="">{t("journal.chonDanhMuc")}</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Environmental Science">Environmental Science</option>
                  <option value="Medical Science">Medical Science</option>
                  <option value="Social Sciences">Social Sciences</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.subjectCategory}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">{t("journal.linhVucSubjectArea")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox></Form.Label>
                <Form.Control type="text" name="subjectArea" value={formData.subjectArea} onChange={handleChange} isInvalid={!!errors.subjectArea} placeholder={t("journal.viDuArtificialIntelligence")} />
                <Form.Control.Feedback type="invalid">{errors.subjectArea}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Nhà xuất bản */}
          <Form.Group sx={{ marginBottom: "0" }} >
            <Form.Label sx={{ fontWeight: 500, fontSize: "0.875em" }} className="text-main">{t("admin.nhaXuatBanPublisher")}</Form.Label>
            <Form.Control type="text" name="publisher" value={formData.publisher} placeholder={t("journal.nhapTenGiaoSuTienSi")} />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer sx={{ borderTop: 0, paddingTop: "0" }} >
          <PrimaryButton variant="outline" onClick={handleClose}>{t("journal.huyBo")}</PrimaryButton>
          <PrimaryButton type="submit">{t("journal.taoTapChi")}</PrimaryButton>
        </Modal.Footer>
      </Form>
    </Modal>;
}
