/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: shared\components\AppToast.jsx
 */
import { useEffect, useState } from "react";
import { Toast, ToastContainer } from '@/shared/components/ui/muiAdapters';
import Icon from './Icon.jsx';
import { registerToast } from "../utils/toast";


import MuiBox from '@mui/material/Box';


const TOAST_CONFIG = {
  success: {
    icon: "solar:check-circle-bold",
    bg: "#f0fdf4",
    border: "#22c55e",
    color: "#166534",
  },
  error: {
    icon: "solar:close-circle-bold",
    bg: "#fef2f2",
    border: "#ef4444",
    color: "#991b1b",
  },
  warning: {
    icon: "solar:danger-triangle-bold",
    bg: "#fffbeb",
    border: "#f59e0b",
    color: "#92400e",
  },
  info: {
    icon: "solar:info-circle-bold",
    bg: "#eff6ff",
    border: "#3b82f6",
    color: "#1e40af",
  },
};

export default function AppToast() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("info");

  useEffect(() => {
    registerToast(({ message, variant = "info" }) => {
      setMessage(message);
      setVariant(variant);
      setShow(true);
    });
  }, []);

  const config = TOAST_CONFIG[variant] || TOAST_CONFIG.info;

  return (
    <ToastContainer sx={{ padding: "1.5rem" }}
      position="top-end"

      style={{ zIndex: 9999 }}
    >
      <Toast sx={{ border: 0, boxShadow: "0 1rem 3rem rgba(0,0,0,.175)" }}
        show={show}
        autohide
        delay={3500}
        onClose={() => setShow(false)}
        animation

        style={{
          minWidth: 360,
          background: config.bg,
          borderLeft: `4px solid ${config.border}`,
          borderRadius: 16,
        }}
      >
        <Toast.Body sx={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem" }} >
          <Icon
            icon={config.icon}
            width={24}
            style={{
              color: config.border,
              flexShrink: 0,
            }}
          />

          <MuiBox component="div" sx={{ flexGrow: 1 }}

            style={{
              color: config.color,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            {message}
          </MuiBox>

          <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: 0, borderRadius: "0.25rem", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", padding: "0", bgcolor: "transparent" }}
            onClick={() => setShow(false)}

          >
            <Icon
              icon="solar:close-circle-outline"
              width={20}
              color="#94a3b8"
            />
          </MuiBox>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
