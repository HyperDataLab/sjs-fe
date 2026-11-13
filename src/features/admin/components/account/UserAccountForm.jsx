import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useState, useEffect } from 'react';
import { Form, Row, Col } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../../shared/components/Icon';
import PrimaryButton from '../../../../shared/components/Button/PrimaryButton';
import { SYSTEM_ROLES } from '../../../../shared/constants/systemConstants';


import MuiBox from '@mui/material/Box';

const getUserInitial = (name = '', email = '') => {
  const source = String(name || email || 'U').trim();
  return source.charAt(0).toUpperCase() || 'U';
};

/**
 * UserAccountForm Component
 * Unified form for linking SSO profiles and updating profile details.
 * Styled in high-fidelity to match the mockup.
 */
export default function UserAccountForm({
  initialData = {},
  isEdit = false,
  onSubmit,
  onCancel,
  submitting = false
}) {
  const { t: _t } = useTranslation();
  // Form fields states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [role, setRole] = useState(isEdit ? 'RESEARCHER' : '');
  const [status, setStatus] = useState('Active'); // Active, Inactive

  // Validation / status feedback
  const [error, setError] = useState('');

  // Load initialData if editing
  useEffect(() => {
    if (isEdit && initialData) {
      setFirstName(initialData.first_name || '');
      setLastName(initialData.last_name || '');
      setFullName(initialData.name || '');
      setEmail(initialData.email || '');
      setPhone(initialData.phone || '');
      setInstitution(initialData.institution || '');
      setRole(String(initialData.role || 'RESEARCHER').trim().toUpperCase().replace(/\s+/g, '_'));
      setStatus(String(initialData.status || 'ACTIVE').trim().toUpperCase().replace(/\s+/g, '_'));
    }
  }, [isEdit, initialData]);

  /**
   * Handle form submit with client-side validation.
   */
  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    // Common validations
    if (!email.trim() || !role) {
      setError(t("admin.vuiLongDienDayDuCacTruongThong"));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t("admin.diaChiEmailKhongHopLe"));
      return;
    }

    // Name validations
    if (isEdit) {
      if (!fullName.trim()) {
        setError(t("admin.hoVaTenLaBatBuoc"));
        return;
      }
    } else {
      if (!firstName.trim() || !lastName.trim()) {
        setError(t("admin.hoVaTenLaBatBuoc1"));
        return;
      }
    }

    // Construct request payload
    const payload = {
      email: email.trim(),
      phone: phone.trim(),
      institution: institution.trim(),
      role,
      status
    };
    if (isEdit) {
      const names = fullName.trim().split(' ');
      payload.first_name = names[0] || '';
      payload.last_name = names.slice(1).join(' ') || '';
      payload.name = fullName.trim();
    } else {
      payload.first_name = firstName.trim();
      payload.last_name = lastName.trim();
      payload.name = `${firstName.trim()} ${lastName.trim()}`;
    }

    // Bubble up to parent
    onSubmit(payload);
  };
  const displayName = isEdit ? fullName : `${firstName} ${lastName}`.trim();
  const avatarInitial = getUserInitial(displayName, email);
  return <Form sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} onSubmit={handleSubmit} >
      {error && <MuiBox component="div" sx={{ position: "relative", p: "1rem", mb: "1rem", border: 0, borderRadius: "0.5rem", bgcolor: "#f8d7da", borderColor: "#f5c2c7", color: "#842029", fontSize: "0.875em" }} className="py-2.5 px-3.5">
          {error}
        </MuiBox>}

      {/* Profile identity section */}
      {isEdit && <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1.5rem", paddingTop: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #dee2e6" }} >
          <MuiBox component="div" sx={{ borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}  style={{
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)',
        fontSize: '2rem',
        boxShadow: '0 12px 24px rgba(234, 88, 12, 0.18)'
      }} aria-label={`Avatar chữ cái đầu của ${displayName || email || t("admin.nguoiDung")}`}>
            {avatarInitial}
          </MuiBox>
          <div>
            <MuiBox component="div" sx={{ fontWeight: 700, marginBottom: "0.25rem" }} className="text-main" style={{
          fontSize: '1rem'
        }}>{fullName || t("admin.chuaCoTenNguoiDung")}</MuiBox>
            <MuiBox component="div" sx={{ fontSize: "0.875em", marginBottom: "0" }} className="text-muted-custom">{t("admin.hienThiAvatarBangChuCaiDauCuaN")}</MuiBox>
          </div>
        </MuiBox>}

      {/* Section 1: Personal Information */}
      <div>
        <MuiBox component="h6" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem", textTransform: "uppercase" }} className="mb-3.5 tracking-wider" style={{
        fontSize: '0.85rem',
        color: '#ea580c',
        letterSpacing: '0.03em'
      }}>
          <Icon icon="lucide:user" width="16" style={{
          color: '#ea580c'
        }} />{t("admin.thongTinCaNhan")}</MuiBox>

        <Row sx={{ gap: "1rem" }} >
          {isEdit ?
        // Full Name input for edit screen
        <Col xs={12} md={6}>
              <Form.Group controlId="fullName">
                <Form.Label className="account-form-label">{t("admin.hoVaTen")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox>
                </Form.Label>
                <Form.Control type="text" placeholder={t("admin.viDuNguyenVanA")} value={fullName} onChange={e => setFullName(e.target.value)} required className="account-form-input" />
              </Form.Group>
            </Col> :
        // First/Last Name inputs for add screen (mockup 50% each)
        <>
              <Col xs={12} md={6}>
                <Form.Group controlId="firstName">
                  <Form.Label className="account-form-label">{t("admin.ho")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox>
                  </Form.Label>
                  <Form.Control type="text" placeholder={t("admin.viDuNguyen")} value={firstName} onChange={e => setFirstName(e.target.value)} required className="account-form-input" />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="lastName">
                  <Form.Label className="account-form-label">{t("admin.ten")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox>
                  </Form.Label>
                  <Form.Control type="text" placeholder={t("admin.viDuVanA")} value={lastName} onChange={e => setLastName(e.target.value)} required className="account-form-input" />
                </Form.Group>
              </Col>
            </>}

          {/* Email field */}
          <Col xs={12} md={6}>
            <Form.Group controlId="emailAddress">
              <Form.Label className="account-form-label">{t("admin.diaChiEmail")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox>
              </Form.Label>
              <Form.Control type="email" placeholder={t("admin.nameuniversityeduvn")} value={email} onChange={e => setEmail(e.target.value)} required disabled={isEdit} className="account-form-input" />
            </Form.Group>
          </Col>

          {!isEdit && <Col xs={12}>
            <MuiBox component="p" sx={{ mt: "-0.5rem", mb: 0, fontSize: "0.8rem", color: "text.secondary" }}>
              Create a profile that will be linked when this person signs in through HyperDataLab SSO. Sign-in credentials stay with SSO.
            </MuiBox>
          </Col>}

          {/* Phone field */}
          <Col xs={12} md={6}>
            <Form.Group controlId="phoneNumber">
              <Form.Label className="account-form-label">{t("admin.soDienThoai")}</Form.Label>
              <Form.Control type="text" placeholder={t("admin.0901234567")} value={phone} onChange={e => setPhone(e.target.value)} className="account-form-input" />
            </Form.Group>
          </Col>

          {/* Institution field (Only visible on Edit Profile) */}
          {isEdit && <Col xs={12} md={6}>
              <Form.Group controlId="institution">
                <Form.Label className="account-form-label">{t("admin.donViTruongDaiHoc")}</Form.Label>
                <Form.Control type="text" placeholder={t("admin.oxfordUniversityPress")} value={institution} onChange={e => setInstitution(e.target.value)} className="account-form-input" />
              </Form.Group>
            </Col>}
        </Row>
      </div>

      {/* Section 2: Role & Status */}
      <MuiBox component="div" sx={{ paddingTop: "1rem", paddingBottom: "1rem", borderTop: "1px solid #dee2e6" }} >
        <MuiBox component="h6" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem", textTransform: "uppercase" }} className="mb-3.5 tracking-wider" style={{
        fontSize: '0.85rem',
        color: '#ea580c',
        letterSpacing: '0.03em'
      }}>
          <Icon icon="lucide:shield" width="16" style={{
          color: '#ea580c'
        }} />{t("admin.vaiTroTrangThai")}</MuiBox>

        <Row sx={{ gap: "1rem", alignItems: "center" }} >
          {/* Role select */}
          <Col xs={12} md={6}>
            <Form.Group controlId="platformRole">
              <Form.Label className="account-form-label">{t("admin.vaiTroTrenNenTang")}<MuiBox component="span" sx={{ color: "error.main" }} >*</MuiBox>
              </Form.Label>
              <Form.Select value={role} onChange={e => setRole(e.target.value)} className="account-form-input" style={{
              cursor: 'pointer'
            }} required>
                <option value="" disabled hidden>{t("admin.chonVaiTro")}</option>
                {SYSTEM_ROLES.map(r => <option key={r.value} value={r.value}>
                    {r.label}
                  </option>)}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Status switch toggle container - mockup high fidelity styling */}
          <Col xs={12} md={6}>
            <Form.Group controlId="accountStatus">
              <Form.Label className="account-form-label">{t("admin.trangThaiTaiKhoan")}</Form.Label>
              <Form.Select value={status.toUpperCase()} onChange={e => setStatus(e.target.value)} className="account-form-input" required>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="BANNED">Banned</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </MuiBox>

      {/* Form Action buttons */}
      <MuiBox component="div" sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #dee2e6" }} >
        <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} type="button" variant="outline" onClick={onCancel}  style={{
        fontSize: '0.88rem'
      }}>{t("admin.huy")}</PrimaryButton>

        <PrimaryButton sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }} type="submit"  style={{
        fontSize: '0.88rem'
      }} disabled={submitting}>
          {submitting ? <>
              <Icon icon="lucide:loader-2" width="16" />
              <span>{t("admin.dangXuLy")}</span>
            </> : isEdit ? <>
              <Icon icon="lucide:save" width="16" />
              <span>{t("admin.luuThayDoi")}</span>
            </> : <>
              <Icon icon="lucide:user-plus" width="16" />
              <span>{t("admin.themTaiKhoan")}</span>
            </>}
        </PrimaryButton>
      </MuiBox>
    </Form>;
}
