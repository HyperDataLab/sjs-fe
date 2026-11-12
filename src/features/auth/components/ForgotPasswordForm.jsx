import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState } from 'react';
import { Form } from '@/shared/components/ui/muiAdapters';
import { Link } from 'react-router-dom';
import InputField from '../../../shared/components/InputField';
import Icon from '../../../shared/components/Icon';
import ROUTES from '../../../app/routes/routePaths';
import SubmitButton from './SubmitButton';
import FormErrorMessage from './FormErrorMessage';


import MuiBox from '@mui/material/Box';

export default function ForgotPasswordForm({
  onSubmit,
  isLoading,
  apiError
}) {
  const { t: _t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const validateEmail = val => {
    if (!val.trim()) {
      return t("auth.emailKhongDuocDeTrong");
    } else if (!/\S+@\S+\.\S+/.test(val)) {
      return t("auth.emailKhongDungDinhDang");
    }
    return '';
  };
  const handleChange = e => {
    setEmail(e.target.value);
    setError('');
  };
  const handleBlur = () => {
    setError(validateEmail(email));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSubmit(email.trim());
  };
  return <Form onSubmit={handleSubmit} noValidate>
      {/* Server API Error Banner */}
      <FormErrorMessage message={apiError} />

      {/* Email Input */}
      <InputField label={t("auth.diaChiEmail")} name="email" type="email" value={email} onChange={handleChange} onBlur={handleBlur} placeholder={t("auth.nameemailcom")} error={error} icon="lucide:mail" required disabled={isLoading} />

      {/* Submit Button */}
      <MuiBox component="div" sx={{ marginTop: "1.5rem" }} >
        <SubmitButton isLoading={isLoading} loadingText={t("auth.dangGuiYeuCau")} label={t("auth.guiLienKetDatLaiMatKhau")} />
      </MuiBox>

      {/* Link back to Login */}
      <MuiBox component="div" sx={{ textAlign: "center", marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.25rem", flexWrap: "wrap" }} className="text-sm font-medium">
        <MuiBox component={Link} sx={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }} to={ROUTES.LOGIN} className="gap-1.5 transition-all" style={{
        color: 'var(--primary)',
        fontWeight: 600
      }}>
          <Icon icon="lucide:arrow-left" width="16" />
          <span>{t("auth.quayLaiDangNhap")}</span>
        </MuiBox>
      </MuiBox>
    </Form>;
}
