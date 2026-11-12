import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState } from 'react';
import { Alert, Card, Row, Col } from '@/shared/components/ui/muiAdapters';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../../../shared/components/Icon';
import UserAccountForm from '../../components/account/UserAccountForm';
import { createAdminUser } from '../../api/adminUsers.api';
import ROUTES from '../../../../app/routes/routePaths';


import MuiBox from '@mui/material/Box';

const getApiErrorMessage = error => {
  if (error.response?.status === 403) {
    return t("admin.backendTuChoiQuyenAdminTokenHi");
  }
  return error.response?.data?.message || t("admin.khongTheTaoTaiKhoanMoi");
};
const toApiEnum = (value = '') => String(value).trim().toUpperCase().replace(/\s+/g, '_');
const buildCreateUserPayload = payload => ({
  ...payload,
  role: toApiEnum(payload.role),
  status: toApiEnum(payload.status)
});

/**
 * AddNewAccountPage Component
 * Trang thêm tài khoản người dùng mới trên hệ thống ResearchPulse (Page 17).
 */
export default function AddNewAccountPage() {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  /**
   * Gọi API tạo tài khoản thay vì lưu mock trong Zustand.
   */
  const handleFormSubmit = async payload => {
    try {
      setSubmitting(true);
      setSubmitError('');
      await createAdminUser(buildCreateUserPayload(payload));
      alert(t("admin.themTaiKhoanMoiThanhCong"));
      navigate(ROUTES.ADMIN_USERS);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };
  return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} >
      {/* Page Breadcrumbs - Sử dụng hằng số ROUTES */}
      <MuiBox component="nav" sx={{ marginBottom: "0.5rem" }} >
        <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }} className="text-xs text-muted-custom select-none" style={{
        fontSize: '0.78rem'
      }}>
          <MuiBox component={Link} sx={{ textDecoration: "none" }} to={ROUTES.ADMIN_USERS} className="text-muted-custom hover-primary">Account</MuiBox>
          <MuiBox component="span" sx={{ opacity: 0.5 }} className="text-muted-custom">&gt;</MuiBox>
          <MuiBox component={Link} sx={{ textDecoration: "none" }} to={ROUTES.ADMIN_USERS} className="text-muted-custom hover-primary">User Directory</MuiBox>
          <MuiBox component="span" sx={{ opacity: 0.5 }} className="text-muted-custom">&gt;</MuiBox>
          <span className="text-main">New Account</span>
        </MuiBox>
      </MuiBox>

      {/* Main title banner matching Page 17 */}
      <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
        <MuiBox component="h1" sx={{ fontWeight: 700 }} className="font-display text-main mb-1.5" style={{
        fontSize: '1.8rem',
        letterSpacing: '-0.02em'
      }}>{t("admin.themTaiKhoanMoi")}</MuiBox>
        <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom" style={{
        maxWidth: '750px',
        fontSize: '0.85rem',
        lineHeight: '1.5'
      }}>{t("admin.vuiLongDienDayDuCacThongTinBen")}</MuiBox>
      </MuiBox>

      <MuiBox component="div" sx={{ mx: "auto" }}  style={{
      maxWidth: '820px'
    }}>
        {/* Core Account Form card */}
        <Card sx={{ padding: "1.5rem", "@media (min-width:768px)": { padding: "3rem" }, borderRadius: "0.75rem", border: "1px solid #dee2e6", bgcolor: "background.paper", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", marginBottom: "1.5rem" }} >
          {submitError && <Alert sx={{ border: 0, borderRadius: "0.5rem", fontSize: "0.875em" }} variant="danger" >
              {submitError}
            </Alert>}

          <UserAccountForm isEdit={false} onSubmit={handleFormSubmit} onCancel={() => navigate(ROUTES.ADMIN_USERS)} submitting={submitting} />
        </Card>

        {/* Informational Feature Highlights (Page 17 bottom cards) */}
        <Row sx={{ gap: "1rem", marginBottom: "3rem" }} >
          <Col xs={12} md={4}>
            <Card sx={{ padding: "1.5rem", border: "1px solid #dee2e6", height: "100%", borderRadius: "0.5rem" }}  style={{
            backgroundColor: '#fef2f2',
            borderColor: '#fee2e2',
            boxShadow: 'none'
          }}>
              <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }} >
                <MuiBox component="div" sx={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}  style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#fee2e2',
                color: '#ef4444'
              }}>
                  <Icon icon="lucide:mail" width="16" />
                </MuiBox>
                <div>
                  <MuiBox component="h6" sx={{ fontWeight: 700 }} className="mb-1.5" style={{
                  fontSize: '0.85rem',
                  color: '#7f1d1d'
                }}>{t("admin.thongBaoTuDong")}</MuiBox>
                  <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0", lineHeight: 1.25 }}  style={{
                  fontSize: '0.78rem',
                  color: '#991b1b',
                  opacity: 0.95
                }}>{t("admin.heThongSeTuDongGuiEmailKichHoa")}</MuiBox>
                </div>
              </MuiBox>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card sx={{ padding: "1.5rem", border: "1px solid #dee2e6", height: "100%", borderRadius: "0.5rem" }}  style={{
            backgroundColor: '#fff7ed',
            borderColor: '#fed7aa',
            boxShadow: 'none'
          }}>
              <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }} >
                <MuiBox component="div" sx={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}  style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#ffedd5',
                color: '#ea580c'
              }}>
                  <Icon icon="lucide:shield-check" width="16" />
                </MuiBox>
                <div>
                  <MuiBox component="h6" sx={{ fontWeight: 700 }} className="mb-1.5" style={{
                  fontSize: '0.85rem',
                  color: '#9a3412'
                }}>{t("admin.phanQuyenThongMinh")}</MuiBox>
                  <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0", lineHeight: 1.25 }}  style={{
                  fontSize: '0.78rem',
                  color: '#9a3412',
                  opacity: 0.95
                }}>{t("admin.vaiTroXacDinhCacQuyenTruyCapVa")}</MuiBox>
                </div>
              </MuiBox>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card sx={{ padding: "1.5rem", border: "1px solid #dee2e6", height: "100%", borderRadius: "0.5rem" }}  style={{
            backgroundColor: '#f8fafc',
            borderColor: '#e2e8f0',
            boxShadow: 'none'
          }}>
              <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }} >
                <MuiBox component="div" sx={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}  style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#e2e8f0',
                color: '#64748b'
              }}>
                  <Icon icon="lucide:clock" width="16" />
                </MuiBox>
                <div>
                  <MuiBox component="h6" sx={{ fontWeight: 700 }} className="mb-1.5" style={{
                  fontSize: '0.85rem',
                  color: '#1e293b'
                }}>{t("admin.lichSuThaoTac")}</MuiBox>
                  <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0", lineHeight: 1.25 }}  style={{
                  fontSize: '0.78rem',
                  color: '#475569',
                  opacity: 0.95
                }}>{t("admin.moiHanhDongTaoTaiKhoanDeuDuocG")}</MuiBox>
                </div>
              </MuiBox>
            </Card>
          </Col>
        </Row>
      </MuiBox>
    </MuiBox>;
}
