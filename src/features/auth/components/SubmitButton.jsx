import { useTranslation } from "react-i18next";
/**
* File source thuộc hệ thống FE ResearchPulse.
*
* File: features\auth\components\SubmitButton.jsx
*/
import { Button, Spinner } from '@/shared/components/ui/muiAdapters';


export default function SubmitButton({
  type = 'submit',
  disabled = false,
  isLoading = false,
  loadingText,
  label,
  onClick
}) {
  const {
    t
  } = useTranslation();
  const resolvedLabel = label || t("auth.xacNhan");
  const resolvedLoadingText = loadingText || t("admin.dangXuLy");
  return <Button sx={{ width: "100%", borderRadius: "0.5rem", border: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }} type={type} disabled={disabled || isLoading} onClick={onClick} className="py-2.5 text-sm font-semibold transition-all" style={{
    background: 'var(--primary)',
    // #FF7A33
    color: '#ffffff',
    boxShadow: '0 4px 14px rgba(255, 122, 51, 0.2)',
    transition: 'transform 0.15s ease, background 0.15s ease'
  }} onMouseEnter={e => {
    if (!disabled && !isLoading) {
      e.currentTarget.style.transform = 'translateY(-1px)';
      e.currentTarget.style.background = '#e8632a'; // Slightly darker orange
      e.currentTarget.style.boxShadow = '0 6px 18px rgba(255, 122, 51, 0.3)';
    }
  }} onMouseLeave={e => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.background = 'var(--primary)';
    e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 122, 51, 0.2)';
  }}>
      {isLoading ? <>
          <Spinner sx={{ marginInlineEnd: "0.25rem" }} as="span" animation="border" size="sm" role="status" aria-hidden="true"  />
          <span>{resolvedLoadingText}</span>
        </> : <span>{resolvedLabel}</span>}
    </Button>;
}
