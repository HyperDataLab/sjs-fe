import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getDefaultLang } from "./languageRouting";
const PublicRoute = () => {
  const {
    t
  } = useTranslation();
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const loading = useAuthStore(s => s.isLoading);
  if (loading) return <div>{t("common.dangTai")}</div>;

  // 🔥 Nếu đã đăng nhập thành công -> Đá ngược về dashboard, không cho xem trang login nữa
  const lang = getDefaultLang();
  return isAuthenticated ? <Navigate to={`/${lang}/dashboard`} replace /> : <Outlet />;
};
export default PublicRoute;
