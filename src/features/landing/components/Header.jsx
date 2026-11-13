/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\landing\components\Header.jsx
 */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from '@/shared/components/ui/muiAdapters';
import { Nav } from '@/shared/components/ui/muiAdapters';
import { Navbar } from '@/shared/components/ui/muiAdapters';
import { Offcanvas } from '@/shared/components/ui/muiAdapters';
import { Dropdown } from '@/shared/components/ui/muiAdapters';
import { Button } from '@/shared/components/ui/muiAdapters';
import Icon from "../../../shared/components/Icon";
import useAuth from "../../auth/hooks/useAuth";
import { useUserStore } from "../../../app/store/userStore";
import ROUTES from "../../../app/routes/routePaths";
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';

// Single source of truth for supported languages — shared by desktop & mobile switchers.
const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const cleanPathname = pathname.replace(/^\/(vi|en|ja|ko)/, "") || "/";
  const auth = useAuth?.() ?? {
    logout: () => {},
  };
  const { logout } = auth;
  const email = useUserStore((state) => state.email);
  const language = i18n.language || "vi";
  const currentLanguage =
    LANGUAGES.find((lang) => language.startsWith(lang.code)) || LANGUAGES[0];
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigateWithLang = (path) => {
    if (path.startsWith("/")) {
      const segments = path.split("/").filter(Boolean);
      if (
        segments.length === 0 ||
        !["vi", "en", "ja", "ko"].includes(segments[0])
      ) {
        navigate(`/${language}${path}`);
        return;
      }
    }
    navigate(path);
  };
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("researchpulse_lang", lang);
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && ["vi", "en", "ja", "ko"].includes(segments[0])) {
      segments[0] = lang;
    } else {
      segments.unshift(lang);
    }
    const newPath = "/" + segments.join("/") + location.search + location.hash;
    navigate(newPath);
  };
  const handleAuthLogin = () => {
    navigateWithLang(ROUTES.LOGIN);
  };
  const handleAuthRegister = () => {
    navigateWithLang(ROUTES.REGISTER);
  };
  const navItems = [
    {
      label: t("author.tongQuan"),
      icon: "lucide:layout-dashboard",
      path: ROUTES.DASHBOARD,
    },
    {
      label: t("landing.duAn"),
      icon: "lucide:folder",
      path: ROUTES.PROJECTS,
    },
    {
      label: t("search"),
      icon: "lucide:search",
      path: ROUTES.CATALOG,
    },
    {
      label: t("articles"),
      icon: "lucide:file-text",
      path: ROUTES.ARTICLES,
    },
    {
      label: t("landing.tacGia"),
      icon: "lucide:users",
      path: ROUTES.AUTHORS,
    },
  ];
  const navLinkStyle = {
    borderBottom: "2px solid transparent",
    color: "var(--text-muted)",
    transition: "color 0.18s ease, border-color 0.18s ease",
    fontWeight: 600,
  };
  const dropdownMenuSx = {
    minWidth: 190,
    '& .MuiMenuItem-root': {
      color: 'var(--text-main)',
      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
      '&.Mui-selected': {
        bgcolor: 'rgba(0, 0, 0, 0.06)',
        color: 'var(--text-main)',
        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.06)' },
      },
    },
  };
  return (
    <>
      <Navbar sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        expand="md"
        fixed="top"
        className="transition-all duration-300 sticky-scrolled"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-card)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Container>
          {/* Logo Brand */}
          <Navbar.Brand sx={{ display: "flex", alignItems: "center" }}
            onClick={() => navigateWithLang(ROUTES.HOME)}
            className="text-main font-weight-bold"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginInlineEnd: "0.5rem" }}

              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "var(--btn-dark)",
                boxShadow: "0 0 10px rgba(7, 26, 28, 0.15)",
              }}
            >
              <Icon sx={{ color: "#fff" }} icon="lucide:activity" className="text-sm" />
            </MuiBox>
            ResearchPulse
          </Navbar.Brand>

          {/* Hamburger toggle for mobile */}
          <Navbar.Toggle sx={{ border: 0, bgcolor: "transparent", padding: "0" }}
            aria-controls="basic-navbar-nav"
            onClick={() => setShowMobileMenu(true)}
            className="text-main"
          >
            <Icon sx={{ fontSize: "1.75rem" }} icon="lucide:menu" className="text-main" />
          </Navbar.Toggle>

          {/* Desktop Navigation Link Items */}
          <Navbar.Collapse sx={{ display: "none", "@media (min-width:768px)": { display: "flex" }, justifyContent: "space-between", alignItems: "center", width: "100%" }}
            id="basic-navbar-nav"

          >
            <Nav sx={{ mx: "auto", alignItems: "center" }}

              style={{
                gap: "10px",
              }}
            >
              {navItems.map((item) => {
                const isPrivate =
                  item.path === ROUTES.DASHBOARD ||
                  item.path === ROUTES.PROJECTS;
                if (isPrivate && !email) return null;
                return (
                  <Nav.Link sx={{ paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.25rem", bgcolor: "transparent" }}
                    key={item.path}
                    onClick={() => navigateWithLang(item.path)}
                    className="text-sm"
                    style={navLinkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--primary)";
                      e.currentTarget.style.borderBottomColor =
                        "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.borderBottomColor = "transparent";
                    }}
                  >
                    {item.label}
                  </Nav.Link>
                );
              })}
            </Nav>

            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} >
              <Dropdown align="end">
                <Dropdown.Toggle sx={{ border: 0, bgcolor: "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0" }}
                  as="button"
                  type="button"
                  className="text-muted-custom"
                  style={{
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                  }}
                  aria-label="Mở cài đặt giao diện"
                >
                  <Icon icon="lucide:settings" width="18" />
                </Dropdown.Toggle>
                <Dropdown.Menu sx={{ border: 0, boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", marginTop: "0.5rem" }}

                  sx={dropdownMenuSx}
                >
                  <MuiBox component="div" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid #dee2e6", marginBottom: "0.25rem" }} className="text-xs font-bold text-main">
                    {t("landing.caiDat")}
                  </MuiBox>
                  {LANGUAGES.map((lang) => (
                    <Dropdown.Item sx={getClassNameSx(`d-flex align-items-center justify-content-between text-xs py-2 ${language.startsWith(lang.code) ? "text-primary" : "text-dark"}`)}
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={stripMappedClassNames(`d-flex align-items-center justify-content-between text-xs py-2 ${language.startsWith(lang.code) ? "text-primary" : "text-dark"}`)}
                    >
                      <span>{lang.label}</span>
                      {language.startsWith(lang.code) && (
                        <Icon sx={{ color: "primary.main", marginInlineStart: "0.5rem" }}
                          icon="lucide:check"
                          className="text-xs"
                        />
                      )}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              {/* User Authentication Display/Buttons */}
              {email ? (
                <>
                  <Dropdown align="end">
                    <Dropdown.Toggle sx={{ border: 0, bgcolor: "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0" }}
                      as="button"
                      type="button"
                      className="text-muted-custom hover:text-primary"
                      style={{
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        transition: "color 0.15s ease",
                      }}
                      aria-label="Tài khoản người dùng"
                    >
                      <Icon icon="lucide:user" width="18" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu sx={{ border: 0, boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", marginTop: "0.5rem" }}

                      sx={dropdownMenuSx}
                    >
                      <MuiBox component="div" sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid #dee2e6", marginBottom: "0.25rem" }} className="text-xs font-bold text-main">
                        <span>{t("landing.nguoiDung")}</span>
                        <MuiBox component="div" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                          className="text-muted-custom font-normal mt-0.5"
                          style={{
                            fontSize: "10px",
                            color: "var(--text-muted)",
                          }}
                        >
                          {email}
                        </MuiBox>
                      </MuiBox>
                      <Dropdown.Item sx={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
                        onClick={() => navigateWithLang(ROUTES.DASHBOARD)}
                        className="text-xs text-main"
                      >
                        <Icon
                          icon="lucide:layout-dashboard"
                          width="14"
                          className="text-muted-custom"
                        />
                        <span>{t("landing.bangDieuKhien")}</span>
                      </Dropdown.Item>
                      <Dropdown.Item sx={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
                        onClick={() => navigateWithLang(ROUTES.PROFILE)}
                        className="text-xs text-main"
                      >
                        <Icon
                          icon="lucide:users"
                          width="14"
                          className="text-muted-custom"
                        />
                        <span>{t("profile.hoSoCaNhan")}</span>
                      </Dropdown.Item>
                      <Dropdown.Item sx={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", color: "error.main" }}
                        onClick={logout}
                        className="text-xs"
                      >
                        <Icon icon="lucide:log-out" width="14" />
                        <span>{t("landing.dangXuat")}</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Button sx={{ borderRadius: "50rem", paddingLeft: "1rem", paddingRight: "1rem" }}
                    variant="outline-secondary"
                    className="text-xs"
                    onClick={handleAuthLogin}
                  >
                    {t("signIn")}
                  </Button>
                  <Button sx={{ border: 0, color: "#fff", borderRadius: "50rem", paddingLeft: "1rem", paddingRight: "1rem" }}
                    className="btn-primary-glow text-xs"
                    onClick={handleAuthRegister}
                  >
                    {t("signUp")}
                  </Button>
                </>
              )}
            </MuiBox>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Menu Drawer (Offcanvas) — width scales down on very narrow screens */}
      <Offcanvas sx={{ bgcolor: "background.paper", color: "#212529", borderInlineStart: "1px solid #dee2e6", borderColor: "#dee2e6" }}
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        placement="end"

        style={{
          width: "min(280px, 85vw)",
          maxWidth: "100vw",
          backgroundColor: "var(--bg-card)",
          color: "var(--text-main)",
        }}
      >
        <Offcanvas.Header sx={{ borderBottom: "1px solid #dee2e6", borderColor: "#dee2e6", paddingTop: "1rem", paddingBottom: "1rem" }}
          closeButton
          closeVariant="dark"

        >
          <Offcanvas.Title sx={{ display: "flex", alignItems: "center" }}
            className="text-main"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
            }}
          >
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginInlineEnd: "0.5rem" }}

              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: "var(--btn-dark)",
              }}
            >
              <Icon sx={{ color: "#fff" }} icon="lucide:activity" className="text-xs" />
            </MuiBox>
            ResearchPulse
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body sx={{ display: "flex", flexDirection: "column", paddingTop: "1rem", paddingBottom: "1rem" }} >
          {/* User profile — moved to top, responsive across drawer widths */}
          {email && (
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem", "@media (min-width:576px)": { gap: "1rem" }, padding: "0.5rem", borderRadius: "0.5rem" }}
              className="user-profile-card"
              style={{
                background: "#f8fafc",
                border: "1px solid var(--border)",
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
              role="button"
              tabIndex={0}
              onClick={() => {
                setShowMobileMenu(false);
                navigateWithLang(ROUTES.PROFILE);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShowMobileMenu(false);
                  navigateWithLang(ROUTES.PROFILE);
                }
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f1f5f9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f8fafc")
              }
            >
              <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}

                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "var(--primary)",
                  boxShadow: "0 0 6px rgba(255, 122, 51, 0.15)",
                }}
              >
                <Icon icon="lucide:user" width="16" />
              </MuiBox>
              <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}

                style={{ minWidth: 0 }}
              >
                <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-xs text-main font-bold">
                  {t("landing.nguoiDung")}
                </MuiBox>
                <MuiBox component="span" sx={{ color: "text.secondary", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}

                  style={{ fontSize: "10px", marginTop: "1px" }}
                >
                  {email}
                </MuiBox>
              </MuiBox>
            </MuiBox>
          )}

          <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "space-between", flexGrow: 1, marginTop: "1rem" }} >
            <Nav sx={{ flexDirection: "column", gap: "1rem" }} >
              {!!email && (
                <>
                  <Nav.Link sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid #dee2e6", borderColor: "#dee2e6" }}
                    onClick={() => {
                      setShowMobileMenu(false);
                      navigateWithLang(ROUTES.DASHBOARD);
                    }}
                    className="text-muted-custom hover:text-main text-sm font-semibold"
                  >
                    {t("author.tongQuan")}
                  </Nav.Link>
                  <Nav.Link sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid #dee2e6", borderColor: "#dee2e6" }}
                    onClick={() => {
                      setShowMobileMenu(false);
                      navigateWithLang(ROUTES.PROJECTS);
                    }}
                    className="text-muted-custom hover:text-main text-sm font-semibold"
                    style={{
                      color: cleanPathname.startsWith(ROUTES.PROJECTS)
                        ? "var(--primary)"
                        : "var(--text-muted)",
                      fontWeight: cleanPathname.startsWith(ROUTES.PROJECTS)
                        ? 700
                        : 600,
                    }}
                  >
                    {t("landing.duAn")}
                  </Nav.Link>
                </>
              )}
              <Nav.Link sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid #dee2e6", borderColor: "#dee2e6" }}
                onClick={() => {
                  setShowMobileMenu(false);
                  navigateWithLang(ROUTES.CATALOG);
                }}
                className="text-muted-custom hover:text-main text-sm font-semibold"
              >
                {t("search")}
              </Nav.Link>
              <Nav.Link sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid #dee2e6", borderColor: "#dee2e6" }}
                onClick={() => {
                  setShowMobileMenu(false);
                  navigateWithLang(ROUTES.ARTICLES);
                }}
                className="text-muted-custom hover:text-main text-sm font-semibold"
                style={{
                  color: cleanPathname.startsWith(ROUTES.ARTICLES)
                    ? "var(--primary)"
                    : "var(--text-muted)",
                  fontWeight: cleanPathname.startsWith(ROUTES.ARTICLES)
                    ? 700
                    : 600,
                }}
              >
                {t("articles")}
              </Nav.Link>
            </Nav>

            <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: "auto" }} >
              {/* Mobile Language Switcher: title left, dropdown right */}
              <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem", paddingBottom: "0.5rem", borderTop: "1px solid #dee2e6", borderBottom: "1px solid #dee2e6", borderColor: "#dee2e6" }} >
                <span className="text-xs font-bold text-main">
                  {t("landing.ngonNgu")}
                </span>
                <Dropdown align="end">
                  <Dropdown.Toggle sx={{ border: 0, bgcolor: "transparent", display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0" }}
                    as="button"
                    type="button"
                    className="text-xs font-bold text-main"
                    style={{ cursor: "pointer" }}
                  >
                    {currentLanguage.label}
                    <Icon icon="lucide:chevron-down" width="14" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu sx={{ border: 0, boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)", marginTop: "0.5rem" }}

                    sx={dropdownMenuSx}
                  >
                    {LANGUAGES.map((lang) => (
                      <Dropdown.Item sx={getClassNameSx(`d-flex align-items-center justify-content-between text-xs py-2 ${language.startsWith(lang.code) ? "text-primary" : "text-dark"}`)}
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={stripMappedClassNames(`d-flex align-items-center justify-content-between text-xs py-2 ${language.startsWith(lang.code) ? "text-primary" : "text-dark"}`)}
                      >
                        <span>{lang.label}</span>
                        {language.startsWith(lang.code) && (
                          <Icon sx={{ color: "primary.main", marginInlineStart: "0.5rem" }}
                            icon="lucide:check"
                            className="text-xs"
                          />
                        )}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </MuiBox>

              {/* Mobile Auth options */}
              {email ? (
                <Button sx={{ width: "100%", borderRadius: "50rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
                  variant="danger"
                  className="text-xs font-bold"
                  onClick={() => {
                    logout();
                    setShowMobileMenu(false);
                  }}
                >
                  {language.startsWith("vi")
                    ? t("landing.dangXuat")
                    : "Sign Out"}
                </Button>
              ) : (
                <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }} >
                  <Button sx={{ width: "100%", borderRadius: "50rem" }}
                    variant="outline-primary"
                    className="py-2.5 text-xs font-bold"
                    onClick={() => {
                      setShowMobileMenu(false);
                      handleAuthLogin();
                    }}
                  >
                    {t("signIn")}
                  </Button>
                  <Button sx={{ width: "100%", borderRadius: "50rem", border: 0, color: "#fff" }}
                    className="btn-primary-glow py-2.5 text-xs font-bold"
                    onClick={() => {
                      setShowMobileMenu(false);
                      handleAuthRegister();
                    }}
                  >
                    {t("signUp")}
                  </Button>
                </MuiBox>
              )}
            </MuiBox>
          </MuiBox>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
