import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Spinner } from '@/shared/components/ui/muiAdapters';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import Icon from '../../../shared/components/Icon.jsx';



const InviteMemberModal = ({ show, onHide, onInvite, actionLoading }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('MEMBER');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    await onInvite(email, role);
    setEmail('');
    setRole('MEMBER');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header sx={{ border: 0, paddingBottom: "0" }} closeButton >
        <Modal.Title sx={{ fontWeight: 700 }} className="text-main">
          <Icon sx={{ marginInlineEnd: "0.5rem", color: "primary.main" }} icon="lucide:user-plus" width="24"  />
          {t("project.moiThanhVienMoi", "Mời thành viên mới")}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group sx={{ marginBottom: "1rem" }}  controlId="inviteEmail">
            <Form.Label sx={{ fontSize: "0.875em", fontWeight: 500 }} className="text-muted-custom">{t("project.diaChiEmail", "Địa chỉ Email")}</Form.Label>
            <Form.Control sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
              type="email"
              placeholder={t("project.nhapEmailNguoiMuonMoi", "Nhập email người dùng...")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required

            />
          </Form.Group>
          <Form.Group sx={{ marginBottom: "1rem" }}  controlId="inviteRole">
            <Form.Label sx={{ fontSize: "0.875em", fontWeight: 500 }} className="text-muted-custom">{t("project.vaiTro", "Quyền hạn")}</Form.Label>
            <Form.Select sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
              value={role}
              onChange={(e) => setRole(e.target.value)}

            >
              <option value="VIEWER">Viewer ({t("project.nguoiXem", "Người xem")})</option>
              <option value="MEMBER">Member ({t("project.thanhVien", "Thành viên")})</option>
              <option value="ADMIN">Admin ({t("project.quanTriVien", "Quản trị viên")})</option>
              <option value="OWNER">Owner ({t("project.chuSoHuu", "Chủ sở hữu")})</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer sx={{ border: 0, paddingTop: "0" }} >
          <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }} variant="outline"  onClick={onHide} disabled={actionLoading}>
            {t("admin.huy", "Hủy")}
          </PrimaryButton>
          <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }} type="submit"  disabled={!email || actionLoading}>
            {actionLoading ? <Spinner size="sm" /> : t("project.guiLoiMoi", "Gửi lời mời")}
          </PrimaryButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default InviteMemberModal;
