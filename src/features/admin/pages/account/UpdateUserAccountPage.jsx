import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useEffect, useState } from 'react';
import { Alert, Card } from '@/shared/components/ui/muiAdapters';
import { useNavigate, useParams, Link } from 'react-router-dom';
import UserAccountForm from '../../components/account/UserAccountForm';
import { getAdminUserById, updateAdminUser } from '../../api/adminUsers.api';
import Icon from '../../../../shared/components/Icon';
import ROUTES from '../../../../app/routes/routePaths';


import MuiBox from '@mui/material/Box';

const getApiErrorMessage = (error, fallback) => {
  if (error.response?.status === 403) {
    return t("admin.backendTuChoiQuyenAdminTokenHi");
  }
  return error.response?.data?.message || fallback;
};
const toApiEnum = (value = '') => String(value).trim().toUpperCase().replace(/\s+/g, '_');
const toTitleCaseEnum = (value = '') => {
  return String(value).toLowerCase().split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
};
const buildUpdateUserPayload = payload => ({
  ...payload,
  role: toApiEnum(payload.role),
  status: toApiEnum(payload.status)
});
const normalizeUser = (user = {}) => ({
  id: user.id || user.user_id || user.uuid,
  first_name: user.first_name || user.firstName || '',
  last_name: user.last_name || user.lastName || '',
  name: user.name || [user.first_name || user.firstName || '', user.last_name || user.lastName || ''].filter(Boolean).join(' ').trim(),
  email: user.email || '',
  phone: user.phone || '',
  institution: user.institution || '',
  role: toTitleCaseEnum(user.role || 'RESEARCHER'),
  status: toTitleCaseEnum(user.status || 'ACTIVE'),
  avatar: user.avatar || user.avatar_url || ''
});

/**
 * UpdateUserAccountPage Component
 * Trang cập nhật thông tin tài khoản người dùng có sẵn trên hệ thống (Page 13).
 */
export default function UpdateUserAccountPage() {
  const { t: _t } = useTranslation();
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const [userItem, setUserItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        setLoading(true);
        setLoadingError('');
        const response = await getAdminUserById(id);
        if (!isMounted) return;
        setUserItem(normalizeUser(response.data?.data || {}));
      } catch (error) {
        if (!isMounted) return;
        setUserItem(null);
        setLoadingError(getApiErrorMessage(error, t("admin.khongTheTaiThongTinNguoiDung")));
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [id]);

  /**
   * Cập nhật thông tin người dùng qua API thật.
   */
  const handleFormSubmit = async payload => {
    try {
      setSubmitting(true);
      setSubmitError('');
      await updateAdminUser(id, buildUpdateUserPayload(payload));
      alert(t("admin.capNhatThongTinNguoiDungThanhC"));
      navigate(ROUTES.ADMIN_USERS);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, t("admin.khongTheCapNhatThongTinNguoiDu")));
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) {
    return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingTop: "1.5rem", paddingBottom: "1.5rem", textAlign: "center" }} className="text-muted-custom">{t("admin.dangTaiThongTinNguoiDung")}</MuiBox>;
  }
  if (!userItem) {
    return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingTop: "1.5rem", paddingBottom: "1.5rem", textAlign: "center" }} >
        <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: 0, borderRadius: "0.75rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029", padding: "1.5rem", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", mx: "auto" }}  style={{
        maxWidth: '600px'
      }}>
          <Icon sx={{ color: "error.main", marginBottom: "0.5rem" }} icon="lucide:alert-triangle" width="32"  />
          <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} >{t("admin.khongTimThayNguoiDung")}</MuiBox>
          <MuiBox component="p" sx={{ marginBottom: "1rem", fontSize: "0.875em" }} >{loadingError || t("admin.taiKhoanNayCoTheDaBiXoaHoacKho")}</MuiBox>
          <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: "1px solid", borderRadius: "50rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", borderColor: "error.main", bgcolor: "transparent", color: "error.main", paddingLeft: "1.5rem", paddingRight: "1.5rem" }} onClick={() => navigate(ROUTES.ADMIN_USERS)} >{t("admin.quayLaiDanhSach")}</MuiBox>
        </MuiBox>
      </MuiBox>;
  }
  return <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} >
      <MuiBox component="nav" sx={{ marginBottom: "1rem" }} aria-label="breadcrumb" >
        <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "0", listStyle: "none", fontSize: "0.875em" }} className="text-muted-custom">
          <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><MuiBox component={Link} sx={{ textDecoration: "none" }} to={ROUTES.ADMIN_USERS} className="text-muted-custom hover-primary">Account</MuiBox></MuiBox>
          <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} ><MuiBox component={Link} sx={{ textDecoration: "none" }} to={ROUTES.ADMIN_USERS} className="text-muted-custom hover-primary">User Directory</MuiBox></MuiBox>
          <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-of-type)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} className="active" aria-current="page">Update User</MuiBox>
        </MuiBox>
      </MuiBox>

      <MuiBox component="div" sx={{ marginBottom: "1.5rem" }} >
        <MuiBox component="h1" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="font-display text-main" style={{
        fontSize: '1.8rem'
      }}>{t("admin.capNhatThongTinNguoiDung")}</MuiBox>
        <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom" style={{
        maxWidth: '750px'
      }}>
          Modify profile settings, adjust organizational roles, and update security credentials for this platform contributor.
        </MuiBox>
      </MuiBox>

      <MuiBox component="div" sx={{ mx: "auto" }}  style={{
      maxWidth: '800px'
    }}>
        <Card sx={{ padding: "1.5rem", "@media (min-width:768px)": { padding: "3rem" }, borderRadius: "0.75rem", border: "1px solid #dee2e6", bgcolor: "background.paper", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", marginBottom: "3rem" }} >
          {submitError && <Alert sx={{ border: 0, borderRadius: "0.5rem", fontSize: "0.875em" }} variant="danger" >
              {submitError}
            </Alert>}

          <UserAccountForm isEdit={true} initialData={userItem} onSubmit={handleFormSubmit} onCancel={() => navigate(ROUTES.ADMIN_USERS)} submitting={submitting} />
        </Card>
      </MuiBox>
    </MuiBox>;
}
