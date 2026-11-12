/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: shared/components/SessionExpiredModal.jsx
 * Modal thông báo đẹp mắt khi phiên đăng nhập hết hạn (do không tick Remember-me hoặc token hết hiệu lực).
 */
import React, { useEffect } from 'react';
import { Modal } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../../app/store/authStore';
import { useUserStore } from '../../app/store/userStore';
import { useWalletStore } from '../../app/store/walletStore';
import { logoutSession } from '../../features/auth/services/authService';
import PrimaryButton from './Button/PrimaryButton';


import MuiBox from '@mui/material/Box';


export default function SessionExpiredModal() {
  const navigate = useNavigate();
  const show = useAuthStore((state) => state.sessionExpiredModalVisible);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const remember = useAuthStore((state) => state.remember);
  const setSessionExpiredModalVisible = useAuthStore((state) => state.setSessionExpiredModalVisible);
  const logout = useAuthStore((state) => state.logout);
  const clearEmail = useUserStore((state) => state.clearEmail);
  const clearWallet = useWalletStore((state) => state.clearWallet);

  // Giám sát thời hạn thực tế của Token theo thời gian thực (kể cả khi user đứng yên không thao tác)
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    let timeoutId = null;
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp) {
        const expiresInMs = decoded.exp * 1000 - Date.now();
        if (expiresInMs <= 0) {
          // Token đã hết hạn ngay lúc này
          if (!remember) {
            setSessionExpiredModalVisible(true);
          }
        } else {
          // Đặt timer kích hoạt modal đúng lúc token hết hạn
          timeoutId = setTimeout(() => {
            const currentRemember = useAuthStore.getState().remember;
            if (!currentRemember) {
              setSessionExpiredModalVisible(true);
            }
          }, expiresInMs);
        }
      }
    } catch {
      // Bỏ qua lỗi decode nếu token không phải jwt hợp lệ
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [token, isAuthenticated, remember, setSessionExpiredModalVisible]);

  const handleConfirm = async () => {
    // Đóng modal trước
    setSessionExpiredModalVisible(false);

    // Xóa session ở BE (nếu cookie còn) và dọn sạch state ở client
    try {
      await logoutSession();
    } catch {
      // Bỏ qua lỗi mạng nếu có khi gọi logout
    }

    logout();
    clearEmail?.();
    clearWallet?.();

    // Điều hướng người dùng về trang đăng nhập
    navigate('/login', { replace: true });
  };

  return (
    <Modal
      show={show}
      onHide={() => {}} // Chặn tắt modal khi bấm ESC hoặc ra ngoài
      centered
      backdrop="static"
      keyboard={false}
      contentClassName="border-0 shadow-lg text-center"
      style={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
      }}
    >
      <MuiBox component="div" sx={{ padding: "1.5rem", "@media (min-width:768px)": { padding: "3rem" }, borderRadius: "0.75rem" }}

        style={{
          backgroundColor: 'var(--bg-card, #ffffff)',
          color: 'var(--text-main, #0f172a)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
        }}
      >
        {/* Glowing Icon Wrapper */}
        <MuiBox component="div" sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }} >
          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}

            style={{
              width: '72px',
              height: '72px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              boxShadow: '0 0 25px rgba(245, 158, 11, 0.25)',
              border: '2px solid rgba(245, 158, 11, 0.2)',
            }}
          >
            <Icon
              icon="lucide:clock-alert"
              width="36"
              height="36"
              style={{ color: '#d97706' }}
            />
          </MuiBox>
        </MuiBox>

        {/* Title */}
        <MuiBox component="h4" sx={{ fontWeight: 700, marginBottom: "0.5rem" }}
          className="font-display"
          style={{
            fontSize: '1.35rem',
            letterSpacing: '-0.02em',
            color: 'var(--text-main, #0f172a)',
          }}
        >
          Phiên đăng nhập đã hết hạn
        </MuiBox>

        {/* Message */}
        <MuiBox component="p" sx={{ marginBottom: "1.5rem", color: "text.secondary" }}

          style={{
            fontSize: '0.925rem',
            lineHeight: '1.6',
            maxWidth: '360px',
            margin: '0 auto',
            color: 'var(--text-muted, #64748b)',
          }}
        >
          Phiên làm việc của bạn đã kết thúc vì bạn không chọn ghi nhớ đăng nhập (hoặc phiên làm việc đã quá hạn bảo mật). Vui lòng đăng nhập lại để tiếp tục làm việc.
        </MuiBox>

        {/* Action Button */}
        <MuiBox component="div" sx={{ display: "flex", justifyContent: "center" }} >
          <PrimaryButton sx={{ width: "100%", paddingTop: "0.5rem", paddingBottom: "0.5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", fontWeight: 600, boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            onClick={handleConfirm}
            icon="lucide:log-in"

            style={{
              fontSize: '1rem',
              borderRadius: '10px',
              maxWidth: '280px',
            }}
          >
            Đăng nhập lại (OK)
          </PrimaryButton>
        </MuiBox>
      </MuiBox>
    </Modal>
  );
}
