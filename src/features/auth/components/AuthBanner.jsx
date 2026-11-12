import { useTranslation } from "react-i18next";
import { Navbar } from '@/shared/components/ui/muiAdapters';
import { useNavigate } from "react-router-dom";
import Icon from '../../../shared/components/Icon';
import { getClassNameSx } from '../../../shared/theme/classNameSx';
import { MotionBox } from '../../../shared/components/ui/MotionBox';

import MuiBox from '@mui/material/Box';


export default function AuthBanner() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const features = [
    t("auth.mienPhiHoanToanKhongCanThe"),
    t("auth.truyCap200mBaiBaoKhoaHoc"),
    t("auth.theoDoiKeywordVaNhanThongBao"),
    t("auth.taoProjectVaQuanLyJournal")
  ];
  return <MuiBox component="div" sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "3rem", position: "relative", overflow: "hidden" }} className="auth-banner-container" style={{
    backgroundColor: 'var(--bg-section)',
    color: 'var(--text-main)',
    minHeight: '100vh',
    borderRight: '1px solid var(--border)'
  }}>
      {/* Animated ambient background glow spheres */}
      <MotionBox
        sx={{ position: "absolute", width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 122, 51, 0.15) 0%, rgba(255, 122, 51, 0) 70%)', top: -50, right: -50, filter: 'blur(40px)', pointerEvents: 'none' }}
        animate={{ scale: [1, 1.15, 0.95], x: [0, -10, 10], y: [0, 15, -10], opacity: [0.7, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
      <MotionBox
        sx={{ position: "absolute", width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(7, 26, 28, 0.08) 0%, rgba(7, 26, 28, 0) 70%)', bottom: 80, left: -40, filter: 'blur(35px)', pointerEvents: 'none' }}
        animate={{ scale: [1, 1.12, 0.96], x: [0, 8, -8], y: [0, -10, 10], opacity: [0.65, 0.9, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />

      {/* Grid Overlay with light line opacity */}
      <MuiBox component="div" sx={{ position: "absolute" }} className="inset-0" style={{
      backgroundImage: 'linear-gradient(rgba(13, 27, 28, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 27, 28, 0.03) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
      backgroundPosition: 'center',
      opacity: 0.85,
      zIndex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }} />

      {/* Logo Brand */}
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}  style={{
      zIndex: 2
    }}>
        <Navbar.Brand sx={{ display: "flex", alignItems: "center" }} onClick={() => navigate("/")} className="text-main font-weight-bold transition-all hover-lift" style={{
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        cursor: "pointer"
      }}>
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)" }} className="me-2.5" style={{
          width: "42px",
          height: "42px",
          borderRadius: "10px",
          background: "var(--btn-dark)",
          boxShadow: "0 4px 14px rgba(7, 26, 28, 0.2)"
        }}>
              <Icon sx={{ color: "#fff" }} icon="lucide:activity" className="text-base animate-pulse" />
            </MuiBox>
            <MuiBox component="span" sx={{ fontSize: "1.5rem", fontWeight: 700 }} className="font-display" style={{ letterSpacing: '-0.02em' }}>ResearchPulse</MuiBox>
          </Navbar.Brand>

        {/* Live Academic Pulse Tag */}
        <MuiBox component="div" sx={getClassNameSx("d-none d-lg-flex align-items-center gap-2 px-3 py-1.5 rounded-full border bg-white bg-opacity-75 backdrop-blur shadow-xs")} className="py-1.5 rounded-full backdrop-blur shadow-xs" style={{ fontSize: '0.78rem', borderColor: 'var(--border)' }}>
          <MuiBox component="span" sx={{ position: "relative", display: "flex" }}  style={{ width: '8px', height: '8px' }}>
            <MuiBox component="span" sx={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", bgcolor: "success.main", color: "#fff", opacity: 0.75 }} className="animate-ping" />
            <MuiBox component="span" sx={{ position: "relative", width: "100%", height: "100%", borderRadius: "50%", bgcolor: "success.main", color: "#fff" }}  />
          </MuiBox>
          <MuiBox component="span" sx={{ fontWeight: 600 }} className="text-muted-custom">200M+ Articles Tracked</MuiBox>
        </MuiBox>
      </MuiBox>

      {/* Main Banner Content */}
      <MuiBox component="div" sx={{ my: "auto", position: "relative" }}  style={{
      zIndex: 2,
      maxWidth: '480px'
    }}>
        <MuiBox component="div" sx={{ marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", borderRadius: "50rem" }}  style={{ background: 'var(--primary-light)', border: '1px solid rgba(255, 122, 51, 0.2)' }}>
          <Icon icon="lucide:sparkles" className="text-sm" style={{ color: 'var(--primary)' }} />
          <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>Academic Intelligence Platform</span>
        </MuiBox>

        <MuiBox component="h1" sx={{ fontWeight: 700, marginBottom: "1rem" }} className="font-display tracking-tight" style={{
        fontSize: '2.5rem',
        lineHeight: '1.2',
        color: 'var(--text-main)'
      }}>{t("auth.thamGiaCongDongNghienCuu")}</MuiBox>

        <MuiBox component="p" sx={{ fontSize: "1rem", marginBottom: "1.5rem" }} className="text-muted-custom" style={{
        color: 'var(--text-muted)',
        lineHeight: '1.65'
      }}>{t("auth.cungHangNghinNhaNghienCuuSuDun")}</MuiBox>

        {/* Feature List with interactive micro-animations */}
        <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", marginBottom: "1.5rem" }}  style={{
        gap: '1.1rem'
      }}>
          {features.map((feat, index) => <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.5rem", borderRadius: "0.5rem", transition: 'all 0.25s ease', '&:hover': { background: 'rgba(255, 255, 255, 0.6)', transform: 'translateX(4px)', '& .feature-icon-box': { transform: 'scale(1.12)', background: 'var(--primary)', '& svg': { color: '#fff' } } } }} key={index} className="banner-feature-item">
              <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: 'var(--primary-light)', border: '1.5px solid var(--primary)', boxShadow: '0 2px 8px rgba(255, 122, 51, 0.15)', transition: 'transform 0.25s ease, background-color 0.25s ease' }} className="feature-icon-box">
                <Icon sx={{ color: 'var(--primary)', strokeWidth: 3 }} icon="lucide:check" className="text-xs" />
              </MuiBox>
              <span className="text-sm font-semibold" style={{
            color: 'var(--text-main)',
            letterSpacing: '0.01em'
          }}>{feat}</span>
            </MuiBox>)}
        </MuiBox>
      </MuiBox>

      {/* Footer Text and Icons */}
      <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid #dee2e6" }} className="text-xs" style={{
      zIndex: 2,
      borderColor: 'rgba(0, 0, 0, 0.06)',
      color: 'var(--text-muted)'
    }}>
        <span>© {new Date().getFullYear()} ResearchPulse. All rights reserved.</span>
        <MuiBox component="div" sx={{ display: "flex", gap: "1rem" }} >
          <Icon icon="lucide:globe" width="16" className="hover-lift" style={{
          cursor: 'pointer',
          opacity: 0.8
        }} />
          <Icon icon="lucide:help-circle" width="16" className="hover-lift" style={{
          cursor: 'pointer',
          opacity: 0.8
        }} />
        </MuiBox>
      </MuiBox>

    </MuiBox>;
}
