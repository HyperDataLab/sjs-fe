import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\components\ArticleDetailError.jsx
 */
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import { StateCard } from '../../../shared/components/Card';


export default function ArticleDetailError({
  errorMsg,
  onRetry
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  return <StateCard sx={{ padding: "3rem" }} variant="error" icon="lucide:wifi-off" title={t("article.loiTaiDuLieu")} description={errorMsg || t("article.khongTheKetNoiDenMayChuVuiLong")}  actions={<>
          {onRetry && <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} className="font-semibold text-xs" onClick={onRetry}>{t("article.thuTaiLai")}</PrimaryButton>}
          <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} variant="outline" className="font-semibold text-xs" onClick={() => navigate('/articles')}>{t("article.veDanhSachBaiBao")}</PrimaryButton>
        </>} />;
}
