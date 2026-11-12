import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/authStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getDefaultLang } from "./languageRouting";
const ProtectedRoute = () => {
  const { t } = useTranslation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loading = useAuthStore((s) => s.isLoading);
  const sessionExpiredModalVisible = useAuthStore((s) => s.sessionExpiredModalVisible);
  const location = useLocation();
  const lang = getDefaultLang();
  // Nếu modal thông báo hết hạn phiên đang mở -> vẫn render Outlet để modal hiển thị đè lên màn hình
  if (sessionExpiredModalVisible) {
    return <Outlet />;
  }

  if (loading) return <div>{t("common.dangKiemTraQuyenTruyCap")}</div>;
  
  return isAuthenticated ? <Outlet /> : <Navigate to={{pathname: '/' + lang + '/login'}} state={{ from: location }} replace />;
};
export default ProtectedRoute;
