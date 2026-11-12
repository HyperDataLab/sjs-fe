import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import ROUTES from '../../../app/routes/routePaths';
import projectService from '../services/projectService';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import Header from '../../landing/components/Header';
import { getClassNameSx } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


const AcceptInvitePage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setErrorMessage(t("project.loiXacNhan", "Token xác nhận không hợp lệ hoặc đã hết hạn."));
      return;
    }

    const confirmInvite = async () => {
      try {
        await projectService.acceptProjectInvite(token);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        setErrorMessage(error.response?.data?.message || t("project.daXayRaLoiKhiXacNhan", "Có lỗi xảy ra khi xác nhận lời mời."));
      }
    };

    confirmInvite();
  }, [searchParams]);

  return (
    <MuiBox component="div" sx={{ width: "100%", px: "0.75rem", mx: "auto", paddingBottom: "1.5rem", minHeight: "100vh", position: "relative", overflow: "hidden" }} className="grid-bg" style={{ paddingTop: '80px' }}>
      <Header />
      <MuiBox component="div" sx={{ width: "100%", mx: "auto", px: "0.75rem", "@media (min-width:576px)": { maxWidth: 540 }, "@media (min-width:768px)": { maxWidth: 720 }, "@media (min-width:992px)": { maxWidth: 960 }, "@media (min-width:1200px)": { maxWidth: 1140 }, "@media (min-width:1400px)": { maxWidth: 1320 }, position: "relative", zIndex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}  style={{ minHeight: '60vh' }}>
        <MuiBox component="div" sx={{ borderRadius: "0.75rem", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", border: "1px solid #dee2e6", padding: "3rem", textAlign: "center" }} className="glass-card" style={{ maxWidth: '500px', width: '100%' }}>
          {status === 'loading' && (
            <>
              <MuiBox component="div" sx={{ display: "inline-block", width: "2rem", height: "2rem", verticalAlign: "-0.125em", border: "0.25em solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "spin .75s linear infinite", color: "primary.main", marginBottom: "1.5rem" }}  role="status" style={{ width: '3rem', height: '3rem' }}></MuiBox>
              <MuiBox component="h4" sx={{ fontWeight: 700, marginBottom: "0.5rem" }} className="text-main">{t("project.dangXuLy", "Đang xử lý lời mời...")}</MuiBox>
              <p className="text-muted-custom">{t("project.vuiLongChoTrongGiayLat", "Vui lòng chờ trong giây lát.")}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <MuiBox component="div" sx={getClassNameSx("rounded-circle bg-success bg-opacity-10 d-inline-flex p-3 mb-4")}>
                <Icon sx={{ color: "success.main" }} icon="lucide:check-circle" width="48"  />
              </MuiBox>
              <MuiBox component="h4" sx={{ fontWeight: 700, marginBottom: "0.5rem" }} className="text-main">{t("project.xacNhanThanhCong", "Xác nhận thành công!")}</MuiBox>
              <MuiBox component="p" sx={{ marginBottom: "1.5rem" }} className="text-muted-custom">{t("project.banDaDuocThemVaoDuAnThanhCong", "Bạn đã được thêm vào dự án thành công. Bây giờ bạn có thể truy cập dự án.")}</MuiBox>
              <PrimaryButton sx={{ width: "100%" }}  onClick={() => navigate(ROUTES.PROJECTS)}>
                {t("project.chuyenDenDanhSachDuAn", "Chuyển đến danh sách dự án")}
              </PrimaryButton>
            </>
          )}

          {status === 'error' && (
            <>
              <MuiBox component="div" sx={getClassNameSx("rounded-circle bg-danger bg-opacity-10 d-inline-flex p-3 mb-4")}>
                <Icon sx={{ color: "error.main" }} icon="lucide:x-circle" width="48"  />
              </MuiBox>
              <MuiBox component="h4" sx={{ fontWeight: 700, marginBottom: "0.5rem" }} className="text-main">{t("project.xacNhanThatBai", "Xác nhận thất bại")}</MuiBox>
              <MuiBox component="p" sx={{ color: "error.main", marginBottom: "1.5rem" }} >{errorMessage}</MuiBox>
              <PrimaryButton sx={{ width: "100%" }} variant="outline"  onClick={() => navigate(ROUTES.HOME)}>
                {t("project.troVeTrangChu", "Trở về trang chủ")}
              </PrimaryButton>
            </>
          )}
        </MuiBox>
      </MuiBox>
    </MuiBox>
  );
};

export default AcceptInvitePage;
