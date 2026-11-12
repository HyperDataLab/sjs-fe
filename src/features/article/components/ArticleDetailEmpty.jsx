import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\components\ArticleDetailEmpty.jsx
 */
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../shared/components/Button/PrimaryButton';
import { StateCard } from '../../../shared/components/Card';


export default function ArticleDetailEmpty({
  articleId
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  return <StateCard sx={{ padding: "3rem" }} variant="warning" icon="lucide:alert-circle" title={t("article.khongTimThayBaiBao")} description={<>{t("article.baiBaoVoiMaSoId")}<strong>{articleId}</strong>{t("article.khongTonTaiHoacDaBiXoaKhoiHeTh")}</>}  actions={<>
          <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} variant="outline" className="font-semibold text-xs" onClick={() => navigate('/dashboard')}>{t("article.veDashboard")}</PrimaryButton>
          <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} className="font-semibold text-xs" onClick={() => navigate('/articles')}>{t("article.xemDanhSachBaiBao")}</PrimaryButton>
        </>} />;
}
