// Generated from feature style sheets and emitted through MUI GlobalStyles.
// Emotion requires JavaScript-style property names in object-based styles.
const normalizeStyleKey = (key) => {
  const isSelector =
    key.startsWith('--') ||
    key.includes('&') ||
    key.includes(':') ||
    key.includes('.') ||
    key.includes('#') ||
    key.includes('@') ||
    key.includes('[') ||
    /\s|[>+~,]/.test(key);

  if (isSelector || !key.includes('-')) return key;

  return key
    .replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase())
    .replace(/^Ms(?=[A-Z])/, 'ms');
};

const normalizeStyleObject = (value) => {
  if (Array.isArray(value)) return value.map(normalizeStyleObject);
  if (!value || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      normalizeStyleKey(key),
      normalizeStyleObject(child),
    ]),
  );
};

const legacyGlobalStyles = [
{
  ".admin-layout": {
    "--admin-card-radius": "1rem",
    "display": "flex",
    "min-height": "100vh",
    "background-color": "#ffffff",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)"
  }
},
{
  ".admin-main": {
    "flex": "1",
    "display": "flex",
    "flex-direction": "column",
    "min-width": "0"
  }
},
{
  ".admin-content": {
    "flex": "1",
    "padding": "24px",
    "background": "#ffffff"
  }
},
{
  ".admin-sidebar": {
    "width": "240px",
    "flex-shrink": "0",
    "background-color": "var(--bg-main)",
    "border-right": "1px solid var(--border)",
    "display": "flex",
    "flex-direction": "column",
    "justify-content": "space-between",
    "position": "sticky",
    "top": "0",
    "height": "100vh"
  }
},
{
  ".admin-sidebar__brand": {
    "display": "flex",
    "align-items": "center",
    "gap": "10px",
    "padding": "20px 20px 16px",
    "font-family": "var(--font-display)",
    "font-weight": "700",
    "font-size": "1.15rem",
    "color": "var(--text-main)"
  }
},
{
  ".admin-sidebar__brand-icon": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "32px",
    "height": "32px",
    "border-radius": "8px",
    "background-color": "var(--btn-dark)",
    "color": "#ffffff",
    "font-size": "1rem",
    "flex-shrink": "0"
  }
},
{
  ".admin-sidebar__menu": {
    "flex": "1",
    "padding": "8px 12px",
    "display": "flex",
    "flex-direction": "column",
    "gap": "4px"
  }
},
{
  ".admin-sidebar__item": {
    "display": "flex",
    "align-items": "center",
    "gap": "12px",
    "padding": "10px 12px",
    "border-radius": "8px",
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.9rem",
    "color": "var(--text-muted)",
    "text-decoration": "none",
    "transition": "background-color 0.15s ease, color 0.15s ease"
  }
},
{
  ".admin-sidebar__item:hover": {
    "background-color": "var(--bg-section)",
    "color": "var(--text-main)"
  }
},
{
  ".admin-sidebar__item--active,\r\n.admin-sidebar__item--active:hover,\r\n.admin-sidebar .MuiLink-root.admin-sidebar__item--active,\r\n.admin-sidebar .MuiLink-root.admin-sidebar__item--active:hover,\r\n.admin-sidebar .MuiLink-root.admin-sidebar__item--active:focus": {
    "background-color": "var(--primary-light) !important",
    "color": "var(--primary) !important"
  }
},
{
  ".admin-sidebar__item:hover,\r\n.admin-sidebar .MuiLink-root.admin-sidebar__item:hover,\r\n.admin-sidebar .MuiLink-root.admin-sidebar__item:focus": {
    "color": "var(--text-main) !important"
  }
},
{
  ".admin-sidebar__item--active .admin-sidebar__item-icon,\r\n.admin-sidebar .MuiLink-root.admin-sidebar__item--active .admin-sidebar__item-icon": {
    "color": "var(--primary) !important"
  }
},
{
  ".admin-sidebar__item-icon": {
    "font-size": "1.1rem",
    "flex-shrink": "0"
  }
},
{
  ".admin-sidebar__footer": {
    "padding": "12px",
    "border-top": "1px solid var(--border)",
    "display": "flex",
    "flex-direction": "column",
    "gap": "4px"
  }
},
{
  ".admin-header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "16px",
    "padding": "14px 24px",
    "background-color": "var(--bg-main)",
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".admin-header__search": {
    "display": "flex",
    "align-items": "center",
    "gap": "8px",
    "flex": "1",
    "max-width": "420px",
    "padding": "8px 14px",
    "background-color": "var(--bg-chip)",
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-header__search input": {
    "flex": "1",
    "border": "none",
    "outline": "none",
    "background": "transparent",
    "font-family": "var(--font-display)",
    "font-size": "0.9rem",
    "color": "var(--text-main)"
  }
},
{
  ".admin-header__search input::placeholder": {
    "color": "var(--text-muted)"
  }
},
{
  ".admin-header__actions": {
    "display": "flex",
    "align-items": "center",
    "gap": "16px",
    "flex-shrink": "0"
  }
},
{
  ".admin-header__icon-btn": {
    "position": "relative",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "38px",
    "height": "38px",
    "border-radius": "50%",
    "background-color": "var(--bg-chip)",
    "color": "var(--text-muted)",
    "border": "none",
    "cursor": "pointer",
    "transition": "background-color 0.15s ease, color 0.15s ease"
  }
},
{
  ".admin-header__icon-btn:hover": {
    "background-color": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".admin-header__icon-badge": {
    "position": "absolute",
    "top": "2px",
    "right": "2px",
    "width": "9px",
    "height": "9px",
    "border-radius": "50%",
    "background-color": "#e63946",
    "border": "1.5px solid var(--bg-main)"
  }
},
{
  ".admin-header__profile": {
    "display": "flex",
    "align-items": "center",
    "gap": "10px"
  }
},
{
  ".admin-header__avatar": {
    "width": "38px",
    "height": "38px",
    "border-radius": "50%",
    "object-fit": "cover",
    "border": "1px solid var(--border)"
  }
},
{
  ".admin-header__profile-info": {
    "display": "flex",
    "flex-direction": "column",
    "line-height": "1.2"
  }
},
{
  ".admin-header__profile-name": {
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "0.85rem",
    "color": "var(--text-main)"
  }
},
{
  ".admin-header__profile-role": {
    "font-family": "var(--font-display)",
    "font-weight": "400",
    "font-size": "0.75rem",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-footer": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "flex-wrap": "wrap",
    "gap": "12px",
    "padding": "16px 24px",
    "background-color": "var(--bg-main)",
    "border-top": "1px solid var(--border)",
    "font-size": "0.8rem",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-footer__links": {
    "display": "flex",
    "gap": "20px"
  }
},
{
  ".admin-footer__links a": {
    "color": "var(--text-muted)",
    "text-decoration": "none",
    "transition": "color 0.15s ease"
  }
},
{
  ".admin-footer__links a:hover": {
    "color": "var(--primary)"
  }
},
{
  "@media (max-width: 992px)": [
    {
      ".admin-sidebar": {
        "width": "72px"
      }
    },
    {
      ".admin-sidebar__brand span,\r\n  .admin-sidebar__item span,\r\n  .admin-sidebar__footer span": {
        "display": "none"
      }
    },
    {
      ".admin-sidebar__item": {
        "justify-content": "center"
      }
    },
    {
      ".admin-header__search": {
        "max-width": "220px"
      }
    }
  ]
},
{
  ".admin-stat-grid": {
    "display": "grid",
    "grid-template-columns": "repeat(4, 1fr)",
    "gap": "16px",
    "margin-bottom": "20px"
  }
},
{
  "@media (max-width: 1200px)": {
    ".admin-stat-grid": {
      "grid-template-columns": "repeat(2, 1fr)"
    }
  }
},
{
  "@media (max-width: 576px)": {
    ".admin-stat-grid": {
      "grid-template-columns": "1fr"
    }
  }
},
{
  ".admin-stat-card": {
    "background-color": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "padding": "16px 18px",
    "display": "flex",
    "flex-direction": "column",
    "gap": "10px"
  }
},
{
  ".admin-stat-card__header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between"
  }
},
{
  ".admin-stat-card__label": {
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.85rem",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-stat-card__icon": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "32px",
    "height": "32px",
    "border-radius": "8px",
    "background-color": "var(--primary-light)",
    "color": "var(--primary)",
    "font-size": "1rem",
    "flex-shrink": "0"
  }
},
{
  ".admin-stat-card__value": {
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "1.75rem",
    "color": "var(--text-main)",
    "line-height": "1.2"
  }
},
{
  ".admin-stat-card__note": {
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.78rem"
  }
},
{
  ".admin-card": {
    "background-color": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "var(--admin-card-radius)",
    "padding": "18px 20px",
    "align-items": "start"
  }
},
{
  ".admin-card__title": {
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "1.05rem",
    "color": "var(--text-main)",
    "margin": "0"
  }
},
{
  ".admin-card__subtitle": {
    "font-family": "var(--font-display)",
    "font-weight": "400",
    "font-size": "0.8rem",
    "color": "var(--text-muted)",
    "margin": "2px 0 0"
  }
},
{
  ".admin-trends-card__header": {
    "display": "flex",
    "align-items": "flex-start",
    "justify-content": "space-between",
    "gap": "12px",
    "margin-bottom": "12px"
  }
},
{
  ".admin-year-select": {
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.8rem",
    "color": "var(--text-main)",
    "background-color": "var(--bg-chip)",
    "border": "1px solid var(--border)",
    "border-radius": "8px",
    "padding": "6px 10px",
    "cursor": "pointer",
    "outline": "none"
  }
},
{
  ".admin-year-select:hover": {
    "border-color": "var(--primary)"
  }
},
{
  ".admin-trends-card__chart": {
    "width": "100%"
  }
},
{
  ".admin-trends-svg": {
    "width": "100%",
    "height": "auto",
    "display": "block"
  }
},
{
  ".admin-trends-card__legend": {
    "display": "flex",
    "gap": "20px",
    "margin-top": "10px"
  }
},
{
  ".admin-trends-legend-item": {
    "display": "flex",
    "align-items": "center",
    "gap": "6px",
    "font-family": "var(--font-display)",
    "font-size": "0.78rem",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-trends-legend-dot": {
    "width": "10px",
    "height": "10px",
    "border-radius": "3px",
    "display": "inline-block"
  }
},
{
  ".admin-trends-legend-dot--submissions": {
    "background-color": "var(--bg-section)",
    "border": "1px solid var(--border)"
  }
},
{
  ".admin-trends-legend-dot--published": {
    "background-color": "var(--primary)"
  }
},
{
  ".admin-dashboard-row": {
    "display": "grid",
    "grid-template-columns": "2fr 1fr",
    "gap": "16px",
    "margin-top": "16px",
    "align-items": "stretch"
  }
},
{
  "@media (max-width: 992px)": {
    ".admin-dashboard-row": {
      "grid-template-columns": "1fr"
    }
  }
},
{
  ".admin-activity-card": {
    "display": "flex",
    "flex-direction": "column"
  }
},
{
  ".admin-activity-list": {
    "list-style": "none",
    "margin": "0",
    "padding": "0",
    "display": "flex",
    "flex-direction": "column",
    "gap": "14px"
  }
},
{
  ".admin-activity-item": {
    "display": "flex",
    "align-items": "flex-start",
    "gap": "10px"
  }
},
{
  ".admin-activity-item__dot": {
    "width": "9px",
    "height": "9px",
    "border-radius": "50%",
    "margin-top": "6px",
    "flex-shrink": "0"
  }
},
{
  ".admin-activity-item__content": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "2px"
  }
},
{
  ".admin-activity-item__title": {
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "0.85rem",
    "color": "var(--text-main)",
    "margin": "0"
  }
},
{
  ".admin-activity-item__description": {
    "font-family": "var(--font-display)",
    "font-weight": "400",
    "font-size": "0.8rem",
    "color": "var(--text-muted)",
    "margin": "0"
  }
},
{
  ".admin-activity-item__time": {
    "font-family": "var(--font-display)",
    "font-weight": "400",
    "font-size": "0.72rem",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-activity-card__view-all": {
    "margin-top": "auto",
    "padding-top": "14px",
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.82rem",
    "color": "var(--primary)",
    "text-decoration": "none",
    "align-self": "flex-start"
  }
},
{
  ".admin-activity-card__view-all:hover": {
    "text-decoration": "underline"
  }
},
{
  ".status-badge": {
    "display": "inline-flex",
    "align-items": "center",
    "padding": "3px 10px",
    "border-radius": "999px",
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.72rem",
    "text-transform": "uppercase",
    "letter-spacing": "0.03em"
  }
},
{
  ".status-badge--published": {
    "background-color": "rgba(47, 198, 70, 0.12)",
    "color": "var(--q1-color)",
    "border": "1px solid rgba(47, 198, 70, 0.3)"
  }
},
{
  ".status-badge--in-prep": {
    "background-color": "var(--primary-light)",
    "color": "var(--primary)",
    "border": "1px solid var(--border)"
  }
},
{
  ".status-badge--archived": {
    "background-color": "var(--bg-section)",
    "color": "var(--text-muted)",
    "border": "1px solid var(--border)"
  }
},
{
  ".status-badge--revision": {
    "background-color": "rgba(230, 57, 70, 0.1)",
    "color": "#e63946",
    "border": "1px solid rgba(230, 57, 70, 0.25)"
  }
},
{
  ".admin-progress-track": {
    "width": "100%",
    "min-width": "80px",
    "height": "6px",
    "background-color": "var(--bg-section)",
    "border-radius": "999px",
    "overflow": "hidden"
  }
},
{
  ".admin-progress-fill": {
    "height": "100%",
    "background-color": "var(--primary)",
    "border-radius": "999px",
    "transition": "width 0.3s ease"
  }
},
{
  ".admin-volume-card": {
    "margin-top": "16px"
  }
},
{
  ".admin-volume-card__header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "margin-bottom": "14px"
  }
},
{
  ".admin-export-btn": {
    "display": "flex",
    "align-items": "center",
    "gap": "6px",
    "padding": "7px 14px",
    "border-radius": "8px",
    "border": "1px solid var(--border)",
    "background-color": "var(--bg-chip)",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.82rem",
    "cursor": "pointer",
    "transition": "all 0.15s ease"
  }
},
{
  ".admin-export-btn:hover": {
    "background-color": "var(--primary-light)",
    "color": "var(--primary)",
    "border-color": "var(--primary-light)"
  }
},
{
  ".admin-table-wrapper": {
    "width": "100%",
    "overflow-x": "auto"
  }
},
{
  ".admin-table": {
    "width": "100%",
    "border-collapse": "collapse",
    "font-family": "var(--font-display)",
    "font-size": "0.85rem"
  }
},
{
  ".admin-table th": {
    "text-align": "left",
    "padding": "10px 12px",
    "font-weight": "500",
    "font-size": "0.75rem",
    "text-transform": "uppercase",
    "letter-spacing": "0.03em",
    "color": "var(--text-muted)",
    "border-bottom": "1px solid var(--border)",
    "white-space": "nowrap"
  }
},
{
  ".admin-table td": {
    "padding": "12px",
    "color": "var(--text-main)",
    "border-bottom": "1px solid var(--border)",
    "white-space": "nowrap"
  }
},
{
  ".admin-table tbody tr:last-of-type td": {
    "border-bottom": "none"
  }
},
{
  ".admin-table tbody tr:hover": {
    "background-color": "var(--bg-section)"
  }
},
{
  ".admin-table__cell-strong": {
    "font-weight": "600"
  }
},
{
  ".admin-table__actions-col": {
    "text-align": "center"
  }
},
{
  ".admin-table__icon-btn": {
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "32px",
    "height": "32px",
    "border-radius": "8px",
    "border": "none",
    "background-color": "transparent",
    "color": "var(--text-muted)",
    "cursor": "pointer",
    "transition": "all 0.15s ease"
  }
},
{
  ".admin-table__icon-btn:hover": {
    "background-color": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".admin-breadcrumb": {
    "font-family": "var(--font-display)",
    "font-size": "0.8rem",
    "color": "var(--text-muted)",
    "margin-bottom": "6px"
  }
},
{
  ".admin-breadcrumb__current": {
    "color": "var(--primary)",
    "font-weight": "500"
  }
},
{
  ".admin-page-description": {
    "font-family": "var(--font-display)",
    "font-size": "0.85rem",
    "color": "var(--text-muted)",
    "margin": "4px 0 20px"
  }
},
{
  ".admin-update-article-row": {
    "display": "grid",
    "grid-template-columns": "2fr 1fr",
    "gap": "16px",
    "align-items": "start"
  }
},
{
  "@media (max-width: 992px)": {
    ".admin-update-article-row": {
      "grid-template-columns": "1fr"
    }
  }
},
{
  ".admin-update-article-main": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "16px"
  }
},
{
  ".admin-form-section": {}
},
{
  ".admin-form-group": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "6px",
    "margin-bottom": "14px"
  }
},
{
  ".admin-form-group:last-of-type": {
    "margin-bottom": "0"
  }
},
{
  ".admin-form-row": {
    "display": "grid",
    "grid-template-columns": "1fr 1fr",
    "gap": "14px"
  }
},
{
  "@media (max-width: 576px)": {
    ".admin-form-row": {
      "grid-template-columns": "1fr"
    }
  }
},
{
  ".admin-form-label": {
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.78rem",
    "text-transform": "uppercase",
    "letter-spacing": "0.03em",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-form-input": {
    "width": "100%",
    "padding": "9px 12px",
    "border": "1px solid var(--border)",
    "border-radius": "8px",
    "background-color": "var(--bg-main)",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "0.88rem",
    "outline": "none",
    "transition": "border-color 0.15s ease, box-shadow 0.15s ease"
  }
},
{
  ".admin-form-input:focus": {
    "border-color": "var(--primary)",
    "box-shadow": "0 0 0 3px var(--primary-light)"
  }
},
{
  ".admin-form-select": {
    "cursor": "pointer"
  }
},
{
  ".admin-form-textarea": {
    "resize": "vertical",
    "min-height": "110px",
    "line-height": "1.5"
  }
},
{
  ".admin-keyword-input": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "8px"
  }
},
{
  ".admin-keyword-input__tags": {
    "display": "flex",
    "flex-wrap": "wrap",
    "gap": "6px"
  }
},
{
  ".admin-keyword-tag": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "6px",
    "padding": "4px 8px 4px 10px",
    "border-radius": "6px",
    "background-color": "var(--primary-light)",
    "color": "var(--primary)",
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.78rem",
    "text-transform": "uppercase",
    "letter-spacing": "0.02em"
  }
},
{
  ".admin-keyword-tag__remove": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "16px",
    "height": "16px",
    "border": "none",
    "background": "transparent",
    "color": "var(--primary)",
    "cursor": "pointer",
    "padding": "0",
    "border-radius": "50%",
    "transition": "background-color 0.15s ease"
  }
},
{
  ".admin-keyword-tag__remove:hover": {
    "background-color": "rgba(255, 122, 51, 0.18)"
  }
},
{
  ".admin-file-list": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "10px"
  }
},
{
  ".admin-file-item": {
    "display": "flex",
    "align-items": "center",
    "gap": "12px",
    "padding": "12px 14px",
    "border": "1px solid var(--border)",
    "border-radius": "10px",
    "background-color": "var(--bg-section)"
  }
},
{
  ".admin-file-item__icon": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "38px",
    "height": "38px",
    "border-radius": "8px",
    "background-color": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "color": "var(--text-muted)",
    "font-size": "1.1rem",
    "flex-shrink": "0"
  }
},
{
  ".admin-file-item__info": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "2px",
    "flex": "1",
    "min-width": "0"
  }
},
{
  ".admin-file-item__name": {
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "0.85rem",
    "color": "var(--text-main)"
  }
},
{
  ".admin-file-item__meta": {
    "font-family": "var(--font-display)",
    "font-weight": "400",
    "font-size": "0.76rem",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-file-item__actions": {
    "display": "flex",
    "align-items": "center",
    "gap": "8px",
    "flex-shrink": "0"
  }
},
{
  ".admin-file-item__replace-btn": {
    "padding": "6px 14px",
    "border-radius": "8px",
    "border": "1px solid var(--primary)",
    "background-color": "var(--bg-card)",
    "color": "var(--primary)",
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.78rem",
    "cursor": "pointer",
    "transition": "all 0.15s ease"
  }
},
{
  ".admin-file-item__replace-btn:hover": {
    "background-color": "var(--primary)",
    "color": "#ffffff"
  }
},
{
  ".admin-btn": {
    "width": "100%",
    "padding": "10px 16px",
    "border-radius": "8px",
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "0.85rem",
    "cursor": "pointer",
    "transition": "all 0.15s ease",
    "text-align": "center"
  }
},
{
  ".admin-btn--primary": {
    "background-color": "var(--primary)",
    "border": "1px solid var(--primary)",
    "color": "#ffffff"
  }
},
{
  ".admin-btn--primary:hover": {
    "background-color": "#e8632a",
    "border-color": "#e8632a"
  }
},
{
  ".admin-btn--outline": {
    "background-color": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "color": "var(--text-main)"
  }
},
{
  ".admin-btn--outline:hover": {
    "background-color": "var(--bg-section)"
  }
},
{
  ".admin-btn--danger": {
    "background-color": "var(--bg-card)",
    "border": "1px solid #e63946",
    "color": "#e63946"
  }
},
{
  ".admin-btn--danger:hover": {
    "background-color": "#e63946",
    "color": "#ffffff"
  }
},
{
  ".admin-btn--danger-solid": {
    "background-color": "#e63946",
    "border": "1px solid #e63946",
    "color": "#ffffff"
  }
},
{
  ".admin-btn--danger-solid:hover": {
    "background-color": "#c62836",
    "border-color": "#c62836"
  }
},
{
  ".admin-review-panel": {
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "overflow": "hidden",
    "background-color": "var(--bg-card)"
  }
},
{
  ".admin-review-panel__current-status": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "4px",
    "padding": "16px 18px",
    "background-color": "var(--btn-dark)",
    "color": "#ffffff"
  }
},
{
  ".admin-review-panel__current-status-label": {
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.7rem",
    "text-transform": "uppercase",
    "letter-spacing": "0.06em",
    "color": "rgba(255, 255, 255, 0.7)"
  }
},
{
  ".admin-review-panel__current-status-value": {
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "1.2rem"
  }
},
{
  ".admin-review-panel__body": {
    "padding": "16px 18px",
    "display": "flex",
    "flex-direction": "column",
    "gap": "14px"
  }
},
{
  ".admin-review-panel__stats": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "8px",
    "padding-top": "6px",
    "border-top": "1px solid var(--border)"
  }
},
{
  ".admin-review-panel__stats-title": {
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.72rem",
    "text-transform": "uppercase",
    "letter-spacing": "0.05em",
    "color": "var(--text-muted)",
    "margin-bottom": "2px"
  }
},
{
  ".admin-review-panel__stat-row": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "font-family": "var(--font-display)",
    "font-size": "0.85rem"
  }
},
{
  ".admin-review-panel__stat-label": {
    "color": "var(--text-muted)"
  }
},
{
  ".admin-review-panel__stat-value": {
    "font-weight": "600",
    "color": "var(--text-main)"
  }
},
{
  ".admin-review-panel__last-updated": {
    "margin": "0",
    "text-align": "center",
    "font-family": "var(--font-display)",
    "font-size": "0.72rem",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-review-panel__divider": {
    "margin": "4px 0",
    "border": "none",
    "border-top": "1px solid var(--border)"
  }
},
{
  ".admin-delete-modal": {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
    "text-align": "center",
    "padding": "28px 24px",
    "font-family": "var(--font-display)"
  }
},
{
  ".admin-delete-modal__icon": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "56px",
    "height": "56px",
    "border-radius": "50%",
    "background-color": "rgba(230, 57, 70, 0.1)",
    "color": "#e63946",
    "font-size": "1.6rem",
    "margin-bottom": "14px"
  }
},
{
  ".admin-delete-modal__title": {
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "1.15rem",
    "color": "var(--text-main)",
    "margin": "0 0 8px"
  }
},
{
  ".admin-delete-modal__description": {
    "font-size": "0.85rem",
    "color": "var(--text-muted)",
    "line-height": "1.5",
    "margin": "0 0 20px"
  }
},
{
  ".admin-delete-modal__description strong": {
    "color": "var(--text-main)"
  }
},
{
  ".admin-delete-modal__actions": {
    "display": "grid",
    "grid-template-columns": "1fr 1fr",
    "gap": "10px",
    "width": "100%"
  }
},
{
  ".admin-page-header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "12px",
    "margin-bottom": "16px",
    "flex-wrap": "wrap"
  }
},
{
  ".admin-btn--auto": {
    "width": "auto",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "6px",
    "padding": "10px 18px"
  }
},
{
  ".admin-filter-bar": {
    "margin-bottom": "16px"
  }
},
{
  ".admin-filter-bar__label": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.72rem",
    "text-transform": "uppercase",
    "letter-spacing": "0.05em",
    "color": "var(--text-muted)",
    "margin-bottom": "12px"
  }
},
{
  ".admin-filter-bar__clear": {
    "border": "none",
    "background": "transparent",
    "color": "var(--primary)",
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.75rem",
    "text-transform": "none",
    "letter-spacing": "normal",
    "cursor": "pointer"
  }
},
{
  ".admin-filter-bar__clear:hover": {
    "text-decoration": "underline"
  }
},
{
  ".admin-filter-bar__row": {
    "display": "grid",
    "grid-template-columns": "1fr 1fr 1fr auto",
    "gap": "14px",
    "align-items": "end"
  }
},
{
  "@media (max-width: 992px)": {
    ".admin-filter-bar__row": {
      "grid-template-columns": "1fr 1fr"
    }
  }
},
{
  "@media (max-width: 576px)": {
    ".admin-filter-bar__row": {
      "grid-template-columns": "1fr"
    }
  }
},
{
  ".admin-filter-bar__row .admin-form-group": {
    "margin-bottom": "0"
  }
},
{
  ".admin-filter-bar__apply-group .admin-btn": {
    "white-space": "nowrap"
  }
},
{
  ".admin-article-table-card": {
    "margin-bottom": "16px"
  }
},
{
  ".admin-article-cell": {
    "white-space": "normal !important",
    "min-width": "220px"
  }
},
{
  ".admin-article-cell__title": {
    "display": "block",
    "margin-bottom": "2px",
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "0.85rem",
    "color": "var(--primary)"
  }
},
{
  ".admin-article-cell__meta": {
    "display": "block",
    "font-family": "var(--font-display)",
    "font-weight": "400",
    "font-size": "0.72rem",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-author-cell": {
    "display": "flex",
    "align-items": "center",
    "gap": "8px"
  }
},
{
  ".admin-author-cell__avatar": {
    "width": "28px",
    "height": "28px",
    "border-radius": "50%",
    "object-fit": "cover",
    "border": "1px solid var(--border)",
    "flex-shrink": "0"
  }
},
{
  ".admin-table__empty": {
    "text-align": "center",
    "color": "var(--text-muted)",
    "padding": "24px 12px",
    "white-space": "normal"
  }
},
{
  ".admin-article-table-card__summary": {
    "margin": "12px 0 0",
    "text-align": "right",
    "font-family": "var(--font-display)",
    "font-size": "0.78rem",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-pagination": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "gap": "6px",
    "margin-top": "16px"
  }
},
{
  ".admin-pagination__btn": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "min-width": "32px",
    "height": "32px",
    "padding": "0 8px",
    "border-radius": "8px",
    "border": "1px solid var(--border)",
    "background-color": "var(--bg-card)",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.8rem",
    "cursor": "pointer",
    "transition": "all 0.15s ease"
  }
},
{
  ".admin-pagination__btn:hover:not(:disabled)": {
    "border-color": "var(--primary)",
    "color": "var(--primary)"
  }
},
{
  ".admin-pagination__btn:disabled": {
    "opacity": "0.4",
    "cursor": "not-allowed"
  }
},
{
  ".admin-pagination__btn--active": {
    "background-color": "var(--primary)",
    "border-color": "var(--primary)",
    "color": "#ffffff"
  }
},
{
  ".admin-pagination__btn--active:hover": {
    "color": "#ffffff"
  }
},
{
  ".admin-pagination__ellipsis": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "min-width": "32px",
    "height": "32px",
    "color": "var(--text-muted)",
    "font-size": "0.8rem"
  }
},
{
  ".admin-pagination-bar,\r\n.admin-journal-pagination-bar": {
    "display": "grid",
    "grid-template-columns": "minmax(0, 1fr) auto minmax(0, 1fr)",
    "align-items": "center",
    "gap": "16px",
    "padding": "16px 0 0"
  }
},
{
  ".admin-pagination-bar > .admin-pagination-bar__center,\r\n.admin-journal-pagination-bar > .admin-pagination": {
    "justify-self": "center"
  }
},
{
  ".admin-pagination-bar > .admin-pagination-bar__center .admin-pagination,\r\n.admin-journal-pagination-bar .admin-pagination": {
    "margin-top": "0"
  }
},
{
  "@media (max-width: 576px)": {
    ".admin-pagination-bar,\r\n  .admin-journal-pagination-bar": {
      "display": "flex",
      "flex-direction": "column",
      "align-items": "flex-start"
    }
  }
},
{
  ".admin-repository-bottom-row": {
    "display": "grid",
    "grid-template-columns": "2fr 1fr",
    "gap": "16px",
    "margin-top": "16px",
    "align-items": "start"
  }
},
{
  "@media (max-width: 992px)": {
    ".admin-repository-bottom-row": {
      "grid-template-columns": "1fr"
    }
  }
},
{
  ".admin-insights-card__header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "12px",
    "margin-bottom": "8px"
  }
},
{
  ".admin-insights-card__period-badge": {
    "display": "inline-flex",
    "align-items": "center",
    "padding": "3px 10px",
    "border-radius": "999px",
    "background-color": "var(--primary-light)",
    "color": "var(--primary)",
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.7rem",
    "text-transform": "uppercase",
    "letter-spacing": "0.03em",
    "white-space": "nowrap"
  }
},
{
  ".admin-insights-card__summary": {
    "font-family": "var(--font-display)",
    "font-size": "0.85rem",
    "line-height": "1.6",
    "color": "var(--text-muted)",
    "margin": "0 0 16px"
  }
},
{
  ".admin-insights-card__stats": {
    "display": "grid",
    "grid-template-columns": "repeat(3, 1fr)",
    "gap": "16px",
    "padding-top": "14px",
    "border-top": "1px solid var(--border)"
  }
},
{
  "@media (max-width: 576px)": {
    ".admin-insights-card__stats": {
      "grid-template-columns": "1fr"
    }
  }
},
{
  ".admin-insights-stat": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "4px"
  }
},
{
  ".admin-insights-stat__label": {
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.72rem",
    "text-transform": "uppercase",
    "letter-spacing": "0.04em",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-insights-stat__value": {
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "1.4rem",
    "color": "var(--text-main)"
  }
},
{
  ".admin-insights-stat__trend": {
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.74rem"
  }
},
{
  ".admin-insights-stat__trend--positive": {
    "color": "var(--q1-color)"
  }
},
{
  ".admin-insights-stat__trend--neutral": {
    "color": "var(--text-muted)"
  }
},
{
  ".admin-promo-card": {
    "background-color": "var(--primary)",
    "border-radius": "12px",
    "padding": "20px",
    "display": "flex",
    "flex-direction": "column",
    "gap": "10px",
    "color": "#ffffff",
    "height": "100%"
  }
},
{
  ".admin-promo-card__tag": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "6px",
    "align-self": "flex-start",
    "padding": "3px 10px",
    "border-radius": "999px",
    "background-color": "rgba(255, 255, 255, 0.18)",
    "font-family": "var(--font-display)",
    "font-weight": "500",
    "font-size": "0.7rem",
    "text-transform": "uppercase",
    "letter-spacing": "0.05em"
  }
},
{
  ".admin-promo-card__title": {
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "1.1rem",
    "margin": "4px 0 0",
    "color": "#ffffff"
  }
},
{
  ".admin-promo-card__description": {
    "font-family": "var(--font-display)",
    "font-size": "0.8rem",
    "line-height": "1.5",
    "color": "rgba(255, 255, 255, 0.9)",
    "margin": "0",
    "flex": "1"
  }
},
{
  ".admin-promo-card__btn": {
    "padding": "10px 16px",
    "border-radius": "8px",
    "border": "none",
    "background-color": "#ffffff",
    "color": "var(--primary)",
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "0.85rem",
    "cursor": "pointer",
    "transition": "opacity 0.15s ease"
  }
},
{
  ".admin-promo-card__btn:hover": {
    "opacity": "0.9"
  }
},
{
  ".admin-layout": {
    "min-height": "100vh",
    "background-color": "#ffffff"
  }
},
{
  ".admin-main": {
    "min-width": "0",
    "background-color": "#ffffff"
  }
},
{
  ".admin-content": {
    "min-height": "calc(100vh - 140px)",
    "padding": "28px",
    "background-color": "#ffffff",
    "background-image": "none"
  }
},
{
  ".admin-sidebar": {
    "width": "260px",
    "padding": "18px 14px",
    "background-color": "var(--bg-card)",
    "border-right": "1px solid var(--border)",
    "z-index": "100"
  }
},
{
  ".admin-sidebar__brand-wrap": {
    "padding": "10px 8px 18px",
    "margin-bottom": "12px",
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".admin-sidebar__menu,\r\n.admin-sidebar__footer": {
    "gap": "6px"
  }
},
{
  ".admin-sidebar__item": {
    "min-height": "42px",
    "border": "1px solid transparent",
    "border-radius": "10px",
    "text-decoration": "none"
  }
},
{
  ".admin-sidebar__item:hover": {
    "background-color": "var(--bg-chip)",
    "color": "var(--text-main)",
    "border-color": "var(--border)",
    "transform": "translateX(2px)"
  }
},
{
  ".admin-sidebar__item--active,\r\n.admin-sidebar__item--active:hover": {
    "background-color": "var(--primary-light)",
    "color": "var(--primary)",
    "border-color": "var(--border)"
  }
},
{
  ".admin-sidebar__item--danger:hover": {
    "background-color": "var(--primary-light)",
    "color": "var(--primary)",
    "border-color": "var(--border)"
  }
},
{
  ".admin-header": {
    "min-height": "70px",
    "position": "sticky",
    "top": "0",
    "z-index": "99",
    "padding": "14px 28px",
    "background-color": "var(--bg-card)"
  }
},
{
  ".admin-header__search": {
    "width": "min(420px, 45vw)",
    "min-height": "42px",
    "background-color": "var(--bg-chip)",
    "border-color": "var(--border)"
  }
},
{
  ".admin-header__search:focus-within": {
    "border-color": "var(--primary)",
    "box-shadow": "0 0 0 3px var(--primary-light)"
  }
},
{
  ".admin-header__icon-btn": {
    "border": "1px solid var(--border)"
  }
},
{
  ".admin-header__icon-badge": {
    "background-color": "var(--primary)"
  }
},
{
  ".admin-header__profile": {
    "padding-left": "16px",
    "border-left": "1px solid var(--border)"
  }
},
{
  ".admin-header__profile-info": {
    "align-items": "flex-end"
  }
},
{
  ".admin-header__avatar": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "background-color": "var(--primary-light)",
    "color": "var(--primary)",
    "font-family": "var(--font-display)",
    "font-weight": "700"
  }
},
{
  ".admin-breadcrumb": {
    "margin-bottom": "8px"
  }
},
{
  ".admin-page-header": {
    "padding": "20px 22px",
    "margin-bottom": "18px",
    "background-color": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "14px"
  }
},
{
  ".admin-page-header h1,\r\n.admin-page-header h2,\r\n.admin-content > h1,\r\n.admin-content > h2": {
    "font-family": "var(--font-display) !important",
    "color": "var(--text-main)",
    "letter-spacing": "-0.02em"
  }
},
{
  ".admin-page-description": {
    "max-width": "760px",
    "line-height": "1.65"
  }
},
{
  ".admin-card,\r\n.admin-review-panel": {
    "border-radius": "var(--admin-card-radius)",
    "border-color": "var(--border)",
    "background-color": "var(--bg-card)",
    "box-shadow": "none"
  }
},
{
  ".admin-card:hover,\r\n.admin-review-panel:hover": {
    "border-color": "var(--primary-light)"
  }
},
{
  ".admin-form-input": {
    "min-height": "42px",
    "background-color": "var(--bg-card)"
  }
},
{
  ".admin-form-input:hover": {
    "border-color": "var(--primary-light)"
  }
},
{
  ".admin-btn": {
    "min-height": "42px",
    "border-radius": "10px"
  }
},
{
  ".admin-btn:active,\r\n.admin-table__icon-btn:active,\r\n.admin-pagination__btn:active": {
    "transform": "translateY(1px)"
  }
},
{
  ".admin-btn--primary": {
    "background-color": "var(--btn-dark)",
    "border-color": "var(--btn-dark)",
    "color": "var(--bg-main)"
  }
},
{
  ".admin-btn--primary:hover": {
    "background-color": "var(--text-main)",
    "border-color": "var(--text-main)",
    "color": "var(--bg-main)"
  }
},
{
  ".admin-btn--outline:hover,\r\n.admin-export-btn:hover": {
    "background-color": "var(--primary-light)",
    "color": "var(--primary)",
    "border-color": "var(--primary-light)"
  }
},
{
  ".admin-table th": {
    "background-color": "var(--bg-chip)",
    "color": "var(--text-muted)",
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".admin-table td": {
    "background-color": "var(--bg-card)"
  }
},
{
  ".admin-table tbody tr:hover td": {
    "background-color": "var(--primary-light)"
  }
},
{
  ".admin-article-cell__title": {
    "color": "var(--text-main)"
  }
},
{
  ".admin-table tbody tr:hover .admin-article-cell__title,\r\n.admin-filter-bar__clear,\r\n.admin-breadcrumb__current": {
    "color": "var(--primary)"
  }
},
{
  ".admin-review-panel": {
    "position": "sticky",
    "top": "94px"
  }
},
{
  ".admin-review-panel__current-status": {
    "background-color": "var(--bg-card)",
    "color": "var(--text-main)",
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".admin-review-panel__current-status-label": {
    "color": "var(--text-muted)"
  }
},
{
  ".admin-review-panel__current-status-value": {
    "color": "var(--primary)"
  }
},
{
  ".admin-file-item": {
    "background-color": "var(--bg-chip)"
  }
},
{
  ".admin-promo-card": {
    "background-color": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "color": "var(--text-main)"
  }
},
{
  ".admin-promo-card__tag": {
    "background-color": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".admin-promo-card__title": {
    "color": "var(--text-main)"
  }
},
{
  ".admin-promo-card__description": {
    "color": "var(--text-muted)"
  }
},
{
  ".admin-promo-card__btn": {
    "border": "1px solid var(--primary)",
    "background-color": "var(--bg-card)",
    "color": "var(--primary)"
  }
},
{
  ".admin-promo-card__btn:hover": {
    "background-color": "var(--primary-light)",
    "opacity": "1"
  }
},
{
  "@media (max-width: 992px)": [
    {
      ".admin-content": {
        "padding": "20px"
      }
    },
    {
      ".admin-header__search": {
        "width": "min(320px, 42vw)"
      }
    },
    {
      ".admin-sidebar": {
        "padding": "14px 8px"
      }
    }
  ]
},
{
  "@media (max-width: 576px)": [
    {
      ".admin-content": {
        "padding": "16px",
        "background-image": "none"
      }
    },
    {
      ".admin-header": {
        "align-items": "stretch",
        "flex-direction": "column"
      }
    },
    {
      ".admin-header__search": {
        "width": "100%"
      }
    },
    {
      ".admin-header__actions": {
        "justify-content": "space-between"
      }
    },
    {
      ".admin-page-header": {
        "padding": "16px"
      }
    }
  ]
},
{
  ".admin-status-badge": {
    "border": "1px solid var(--border)",
    "font-family": "var(--font-display)",
    "font-weight": "700",
    "letter-spacing": "0.03em"
  }
},
{
  ".admin-status-badge--accent": {
    "background-color": "var(--primary-light)",
    "border-color": "color-mix(in srgb, var(--primary) 34%, var(--border))",
    "color": "var(--primary)"
  }
},
{
  ".admin-status-badge--warning": {
    "background-color": "#fff7ed",
    "border-color": "#fed7aa",
    "color": "var(--primary)"
  }
},
{
  ".admin-status-badge--muted": {
    "background-color": "var(--bg-chip)",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-status-dot": {
    "display": "inline-block",
    "width": "8px",
    "height": "8px",
    "border-radius": "999px"
  }
},
{
  ".admin-status-dot--accent,\r\n.admin-status-dot--warning": {
    "background-color": "var(--primary)"
  }
},
{
  ".admin-status-dot--muted": {
    "background-color": "var(--text-muted)"
  }
},
{
  ".admin-icon-tile": {
    "align-items": "center",
    "justify-content": "center",
    "width": "48px",
    "height": "48px",
    "border-radius": "10px",
    "background-color": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".admin-accent-text,\r\n.admin-spinner": {
    "color": "var(--primary) !important"
  }
},
{
  ".admin-btn-outline-accent": {
    "background-color": "var(--bg-card) !important",
    "border": "1px solid var(--primary) !important",
    "color": "var(--primary) !important"
  }
},
{
  ".admin-btn-outline-accent:hover": {
    "background-color": "var(--primary) !important",
    "color": "#ffffff !important"
  }
},
{
  ".admin-toggle-switch .form-check-input:checked": {
    "background-color": "var(--primary)",
    "border-color": "var(--primary)"
  }
},
{
  ".admin-toggle-switch .form-check-input:focus": {
    "border-color": "color-mix(in srgb, var(--primary) 50%, white)",
    "box-shadow": "0 0 0 0.25rem color-mix(in srgb, var(--primary) 25%, transparent)"
  }
},
{
  ".admin-btn-consistent": {
    "min-height": "42px",
    "border-radius": "999px !important",
    "padding": "0.65rem 1rem !important",
    "font-weight": "700",
    "font-family": "var(--font-display)",
    "white-space": "nowrap"
  }
},
{
  ".admin-link-button": {
    "background": "transparent",
    "border": "0",
    "color": "inherit",
    "text-decoration": "none"
  }
},
{
  ".admin-link-button:hover": {
    "color": "var(--primary)"
  }
},
{
  ".admin-clickable-row,\r\n.admin-clickable-card": {
    "cursor": "pointer"
  }
},
{
  ".admin-clickable-row:focus-visible,\r\n.admin-clickable-card:focus-visible": {
    "outline": "2px solid var(--primary)",
    "outline-offset": "2px"
  }
},
{
  ".admin-journal-pagination-bar": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "1rem",
    "flex-wrap": "wrap",
    "padding": "1rem 1.25rem",
    "border-top": "1px solid var(--border)"
  }
},
{
  ".admin-pagination-limit": {
    "width": "110px",
    "min-height": "40px"
  }
},
{
  ".admin-switch-journal-item": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "1rem",
    "padding": "1rem"
  }
},
{
  ".admin-switch-journal-item__main": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.875rem",
    "min-width": "0",
    "flex": "1"
  }
},
{
  ".admin-switch-journal-item__icon": {
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "42px",
    "height": "42px",
    "border-radius": "12px",
    "background": "var(--bg-chip)",
    "color": "var(--text-muted)",
    "flex-shrink": "0"
  }
},
{
  ".admin-switch-journal-item__content": {
    "min-width": "0",
    "flex": "1"
  }
},
{
  ".admin-switch-journal-item__title-row": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.5rem",
    "flex-wrap": "wrap"
  }
},
{
  ".admin-switch-journal-item__side": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "flex-end",
    "flex-shrink": "0"
  }
},
{
  ".admin-activity-list--modal": {
    "max-height": "50vh",
    "overflow-y": "auto",
    "padding-right": "0.5rem"
  }
},
{
  ".admin-content": {
    "padding": "28px",
    "background": "#ffffff"
  }
},
{
  ".admin-sidebar": {
    "background-color": "var(--bg-main)",
    "box-shadow": "inset -1px 0 0 var(--border)"
  }
},
{
  ".admin-sidebar__brand": {
    "padding": "24px 20px 18px",
    "letter-spacing": "-0.025em"
  }
},
{
  ".admin-sidebar__brand-icon": {
    "background-color": "var(--bg-chip)",
    "border": "1px solid var(--border)",
    "color": "var(--primary)"
  }
},
{
  ".admin-sidebar__item": {
    "border": "1px solid transparent"
  }
},
{
  ".admin-sidebar__item:hover,\r\n.admin-sidebar .MuiLink-root.admin-sidebar__item:hover,\r\n.admin-sidebar .MuiLink-root.admin-sidebar__item:focus": {
    "background-color": "var(--bg-chip)",
    "border-color": "var(--border)",
    "color": "var(--text-main) !important"
  }
},
{
  ".admin-sidebar__item--active,\r\n.admin-sidebar__item--active:hover,\r\n.admin-sidebar .MuiLink-root.admin-sidebar__item--active,\r\n.admin-sidebar .MuiLink-root.admin-sidebar__item--active:hover,\r\n.admin-sidebar .MuiLink-root.admin-sidebar__item--active:focus": {
    "background-color": "var(--primary-light) !important",
    "border-color": "var(--primary-light)",
    "color": "var(--primary) !important"
  }
},
{
  ".admin-header": {
    "min-height": "72px",
    "background-color": "var(--bg-main)"
  }
},
{
  ".admin-header__search,\r\n.admin-header__icon-btn": {
    "border": "1px solid var(--border)",
    "background-color": "var(--bg-chip)"
  }
},
{
  ".admin-header__search:focus-within": {
    "border-color": "var(--primary)",
    "box-shadow": "0 0 0 3px var(--primary-light)"
  }
},
{
  ".admin-page-header": {
    "align-items": "flex-end",
    "margin-bottom": "20px",
    "padding-bottom": "18px",
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".admin-page-header__copy": {
    "min-width": "min(100%, 520px)"
  }
},
{
  ".admin-page-kicker": {
    "margin": "0 0 6px",
    "font-family": "var(--font-display)",
    "font-size": "0.74rem",
    "font-weight": "600",
    "letter-spacing": "0.08em",
    "text-transform": "uppercase",
    "color": "var(--primary)"
  }
},
{
  ".admin-page-title": {
    "margin": "0",
    "font-family": "var(--font-display)",
    "font-size": "clamp(1.75rem, 2.4vw, 2.35rem)",
    "font-weight": "700",
    "letter-spacing": "-0.035em",
    "color": "var(--text-main)"
  }
},
{
  ".admin-page-lede": {
    "max-width": "760px",
    "margin": "8px 0 0",
    "font-family": "var(--font-display)",
    "font-size": "0.92rem",
    "line-height": "1.65",
    "color": "var(--text-muted)"
  }
},
{
  ".admin-card,\r\n.admin-stat-card": {
    "border-color": "var(--border)",
    "border-radius": "var(--admin-card-radius)",
    "background-color": "var(--bg-card)",
    "box-shadow": "0 1px 0 rgba(15, 23, 42, 0.03)"
  }
},
{
  ".admin-content .MuiPaper-root": {
    "border-radius": "var(--admin-card-radius) !important"
  }
},
{
  ".admin-stat-card": {
    "min-height": "150px",
    "transition": "border-color 0.16s ease, transform 0.16s ease"
  }
},
{
  ".admin-stat-card:hover": {
    "border-color": "var(--primary-light)",
    "transform": "translateY(-1px)"
  }
},
{
  ".admin-stat-card__label,\r\n.admin-card__subtitle,\r\n.admin-muted-text": {
    "color": "var(--text-muted)"
  }
},
{
  ".admin-stat-card__note--positive,\r\n.admin-stat-card__note--success,\r\n.admin-stat-card__note--warning": {
    "color": "var(--primary)"
  }
},
{
  ".admin-stat-card__note--negative,\r\n.admin-stat-card__note--neutral": {
    "color": "var(--text-muted)"
  }
},
{
  ".admin-state-card": {
    "grid-column": "1 / -1",
    "display": "flex",
    "align-items": "center",
    "gap": "12px",
    "min-height": "96px",
    "padding": "18px 20px",
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "background-color": "var(--bg-card)",
    "color": "var(--text-muted)",
    "font-family": "var(--font-display)"
  }
},
{
  ".admin-state-card--error,\r\n.admin-error-text": {
    "color": "var(--primary)",
    "background-color": "var(--primary-light)",
    "border-color": "var(--primary-light)"
  }
},
{
  ".admin-state-dot": {
    "width": "9px",
    "height": "9px",
    "border-radius": "999px",
    "background-color": "var(--primary)",
    "flex-shrink": "0"
  }
},
{
  ".admin-activity-item__dot": {
    "background-color": "var(--text-muted)"
  }
},
{
  ".admin-activity-item__dot--published,\r\n.admin-activity-item__dot--revision,\r\n.admin-activity-item__dot--overdue": {
    "background-color": "var(--primary)"
  }
},
{
  ".admin-activity-item__dot--reviewer": {
    "background-color": "var(--text-muted)"
  }
},
{
  ".admin-form-disabled": {
    "opacity": "0.64",
    "pointer-events": "none"
  }
},
{
  ".admin-breadcrumb": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "6px",
    "margin-bottom": "10px",
    "padding": "6px 10px",
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "background-color": "var(--bg-chip)"
  }
},
{
  ".admin-page-description": {
    "max-width": "760px",
    "line-height": "1.6"
  }
},
{
  ".admin-table th": {
    "background-color": "var(--bg-chip)"
  }
},
{
  ".admin-table tbody tr:hover": {
    "background-color": "var(--primary-light)"
  }
},
{
  ".admin-export-btn,\r\n.admin-pagination__btn,\r\n.admin-table__icon-btn,\r\n.admin-file-item__replace-btn,\r\n.admin-btn": {
    "transition": "border-color 0.16s ease, background-color 0.16s ease, color 0.16s ease, transform 0.16s ease"
  }
},
{
  ".admin-export-btn:hover,\r\n.admin-pagination__btn:hover:not(:disabled),\r\n.admin-table__icon-btn:hover,\r\n.admin-file-item__replace-btn:hover": {
    "transform": "translateY(-1px)"
  }
},
{
  ".admin-btn--primary": {
    "background-color": "var(--primary)",
    "border-color": "var(--primary)",
    "color": "var(--bg-card)"
  }
},
{
  ".admin-btn--primary:hover": {
    "background-color": "var(--bg-card)",
    "border-color": "var(--primary)",
    "color": "var(--primary)"
  }
},
{
  "@media (max-width: 768px)": [
    {
      ".admin-content": {
        "padding": "20px"
      }
    },
    {
      ".admin-page-header": {
        "align-items": "flex-start"
      }
    }
  ]
},
{
  "@media (max-width: 767.98px)": [
    {
      ".admin-switch-journal-item": {
        "align-items": "flex-start"
      }
    },
    {
      ".admin-switch-journal-item__main": {
        "align-items": "flex-start"
      }
    },
    {
      ".admin-switch-journal-item__side": {
        "align-self": "center"
      }
    }
  ]
},
{
  ".admin-activity-modal": {
    "padding-left": "0 !important"
  }
},
{
  ".admin-activity-modal .MuiDialog-paper": {
    "margin-left": "auto !important",
    "margin-right": "auto !important",
    "max-width": "min(560px, calc(100vw - 32px))"
  }
},
{
  ".admin-activity-modal .MuiDialog-paper": {
    "border": "1px solid var(--border)",
    "border-radius": "18px",
    "box-shadow": "0 24px 70px rgba(15, 23, 42, 0.18)"
  }
},
{
  ".admin-activity-modal": {
    "display": "flex !important",
    "align-items": "center",
    "justify-content": "center"
  }
},
{
  ".btn-dark-solid": {
    "background-color": "var(--btn-dark) !important",
    "border-color": "var(--btn-dark) !important",
    "color": "#ffffff !important",
    "transition": "background-color 0.2s ease, border-color 0.2s ease"
  }
},
{
  ".btn-dark-solid:hover": {
    "background-color": "var(--text-main) !important",
    "border-color": "var(--text-main) !important"
  }
},
{
  ".btn-ripple": {
    "position": "relative",
    "overflow": "hidden"
  }
},
{
  ".ripple-effect": {
    "position": "absolute",
    "border-radius": "50%",
    "background-color": "var(--primary)",
    "transform": "scale(0)",
    "animation": "ripple-animation 600ms linear",
    "pointer-events": "none"
  }
},
{
  "@keyframes ripple-animation": {
    "to": {
      "transform": "scale(4)",
      "opacity": "0"
    }
  }
},
{
  ".article-list-page": {
    "min-height": "100vh",
    "padding-top": "90px",
    "padding-bottom": "60px",
    "background": "var(--bg-main)",
    "color": "var(--text-main)"
  }
},
{
  ".article-list-shell": {
    "position": "relative",
    "z-index": "1"
  }
},
{
  ".article-list-breadcrumb .MuiBreadcrumbs-ol": {
    "margin-bottom": "0",
    "font-family": "var(--font-display)",
    "font-size": "0.85rem"
  }
},
{
  ".article-list-breadcrumb a": {
    "color": "var(--text-muted) !important",
    "text-decoration": "none"
  }
},
{
  ".article-list-breadcrumb a:hover": {
    "color": "var(--primary) !important"
  }
},
{
  ".article-list-breadcrumb .MuiBreadcrumbs-li > .MuiTypography-root[aria-current='page']": {
    "color": "var(--text-main) !important"
  }
},
{
  ".article-list-hero": {
    "display": "grid",
    "grid-template-columns": "minmax(0, 1fr) auto",
    "gap": "1.5rem",
    "align-items": "end",
    "margin-bottom": "1.5rem",
    "padding-bottom": "1.25rem",
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".article-list-eyebrow": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.45rem",
    "margin-bottom": "0.65rem",
    "color": "var(--primary)",
    "font-family": "var(--font-display)",
    "font-size": "0.72rem",
    "font-weight": "700",
    "letter-spacing": "0.12em",
    "text-transform": "uppercase"
  }
},
{
  ".article-list-title": {
    "margin": "0",
    "max-width": "780px",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(2rem, 4vw, 3.4rem)",
    "font-weight": "650",
    "line-height": "1.05",
    "letter-spacing": "-0.035em"
  }
},
{
  ".article-list-description": {
    "max-width": "680px",
    "margin": "0.85rem 0 0",
    "color": "var(--text-muted)",
    "font-size": "0.95rem",
    "line-height": "1.65"
  }
},
{
  ".article-list-scope": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.5rem",
    "margin-top": "0.9rem",
    "margin-right": "0.5rem",
    "padding": "0.55rem 0.85rem",
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "background": "var(--primary-light)",
    "color": "var(--text-main)",
    "font-size": "0.82rem",
    "font-weight": "600"
  }
},
{
  ".article-list-summary": {
    "min-width": "210px",
    "padding": "1rem",
    "border": "1px solid var(--border)",
    "border-radius": "14px",
    "background": "var(--bg-card)",
    "text-align": "right"
  }
},
{
  ".article-list-summary__label": {
    "color": "var(--text-muted)",
    "font-size": "0.72rem",
    "font-weight": "700",
    "letter-spacing": "0.08em",
    "text-transform": "uppercase"
  }
},
{
  ".article-list-summary__value": {
    "margin-top": "0.2rem",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "2rem",
    "font-weight": "700",
    "line-height": "1"
  }
},
{
  ".article-filter-panel,\r\n.article-empty-state": {
    "border": "1px solid var(--border)",
    "border-radius": "14px",
    "background": "var(--bg-card)"
  }
},
{
  ".article-filter-panel": {
    "margin-bottom": "1.25rem",
    "padding": "1rem"
  }
},
{
  ".article-form-control": {
    "border": "1px solid var(--border) !important",
    "border-radius": "10px !important",
    "background-color": "var(--bg-card) !important",
    "color": "var(--text-main) !important",
    "box-shadow": "none !important",
    "font-size": "0.82rem !important"
  }
},
{
  ".article-form-control:focus": {
    "border-color": "var(--primary) !important",
    "box-shadow": "0 0 0 3px var(--primary-light) !important"
  }
},
{
  ".article-search-group": {
    "overflow": "hidden",
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "background": "var(--bg-card)",
    "transition": "border-color 0.2s ease, box-shadow 0.2s ease"
  }
},
{
  ".article-search-group:focus-within": {
    "border-color": "var(--primary)",
    "box-shadow": "0 0 0 3px var(--primary-light)"
  }
},
{
  ".article-stats-card": {
    "height": "100%",
    "border": "1px solid var(--border) !important",
    "border-radius": "14px !important",
    "background": "var(--bg-card) !important",
    "box-shadow": "none !important",
    "transition": "border-color 0.2s ease, transform 0.2s ease"
  }
},
{
  ".article-stats-card:hover": {
    "transform": "translateY(-2px)",
    "border-color": "var(--primary) !important"
  }
},
{
  ".article-stats-icon": {
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "42px",
    "height": "42px",
    "border-radius": "12px",
    "background": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".article-table-card": {
    "overflow": "hidden",
    "border-radius": "16px",
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)"
  }
},
{
  ".article-table": {
    "color": "var(--text-main) !important"
  }
},
{
  ".article-table thead th": {
    "background": "var(--bg-chip) !important",
    "border-bottom": "1px solid var(--border) !important",
    "color": "var(--text-muted) !important",
    "font-size": "0.72rem",
    "font-weight": "600 !important",
    "letter-spacing": "0.08em",
    "text-transform": "uppercase",
    "white-space": "nowrap"
  }
},
{
  ".article-table tbody td": {
    "border-color": "var(--border) !important",
    "font-size": "0.92rem",
    "vertical-align": "middle"
  }
},
{
  ".article-table-row": {
    "cursor": "pointer",
    "transition": "background-color 0.18s ease"
  }
},
{
  ".article-table-row:hover": {
    "background": "var(--primary-light)"
  }
},
{
  ".article-topic-badge,\r\n.article-oa-badge,\r\n.article-muted-badge": {
    "display": "inline-flex",
    "align-items": "center",
    "max-width": "100%",
    "padding": "0.24rem 0.55rem",
    "border": "1px solid var(--border)",
    "border-radius": "10px",
    "background": "var(--bg-chip)",
    "color": "var(--text-muted)",
    "font-size": "0.68rem",
    "font-weight": "700"
  }
},
{
  ".article-topic-badge.is-active": {
    "background": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".article-topic-badge--ml": {
    "background": "var(--primary-light) !important",
    "color": "var(--primary) !important"
  }
},
{
  ".article-topic-badge--cs": {
    "background": "rgba(6, 182, 212, 0.1) !important",
    "color": "#0891b2 !important"
  }
},
{
  ".article-topic-badge--medicine": {
    "background": "rgba(16, 185, 129, 0.1) !important",
    "color": "#059669 !important"
  }
},
{
  ".article-topic-badge--physics": {
    "background": "rgba(245, 158, 11, 0.1) !important",
    "color": "#d97706 !important"
  }
},
{
  ".article-topic-badge--other": {
    "background": "rgba(139, 92, 246, 0.1) !important",
    "color": "#7c3aed !important"
  }
},
{
  ".article-oa-badge": {
    "color": "var(--q1-color)"
  }
},
{
  ".article-action-link": {
    "color": "var(--text-main)",
    "font-size": "0.75rem",
    "transition": "color 0.15s ease"
  }
},
{
  ".article-table-row:hover .article-action-link,\r\n.article-action-link:hover": {
    "color": "var(--primary)"
  }
},
{
  ".article-mobile-card": {
    "border": "1px solid var(--border) !important",
    "border-radius": "14px !important",
    "background": "var(--bg-card) !important",
    "box-shadow": "none !important"
  }
},
{
  ".article-empty-state": {
    "min-height": "320px",
    "padding": "3rem 1.5rem",
    "text-align": "center"
  }
},
{
  ".article-empty-icon,\r\n.article-modal-icon": {
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "64px",
    "height": "64px",
    "border": "1px solid var(--border)",
    "border-radius": "50%",
    "background": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".article-pagination": {
  }
},
{
  "@media (max-width: 767.98px)": [
    {
      ".article-list-hero": {
        "grid-template-columns": "1fr"
      }
    },
    {
      ".article-list-summary": {
        "text-align": "left"
      }
    }
  ]
},
{
  ".article-detail-page": {
    "min-height": "100vh",
    "padding-top": "82px",
    "padding-bottom": "60px",
    "background-color": "var(--bg-main)",
    "color": "var(--text-main)"
  }
},
{
  ".article-detail-container": {
    "max-width": "1320px",
    "margin": "0 auto",
    "background-color": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "box-shadow": "0 18px 55px rgba(15, 23, 42, 0.06)"
  }
},
{
  ".article-detail-shell": {
    "display": "grid",
    "grid-template-columns": "280px minmax(0, 1fr)",
    "min-height": "calc(100vh - 150px)"
  }
},
{
  "@media (max-width: 1199.98px)": {
    ".article-detail-shell": {
      "grid-template-columns": "1fr"
    }
  }
},
{
  ".article-detail-sidebar": {
    "padding": "1.5rem",
    "border-right": "1px solid var(--border)"
  }
},
{
  ".article-detail-journal-title": {
    "font-family": "var(--font-display)",
    "font-size": "1.15rem",
    "font-weight": "700",
    "line-height": "1.35",
    "color": "var(--text-main)",
    "transition": "color 0.2s ease"
  }
},
{
  ".article-detail-journal-title.is-clickable:hover": {
    "color": "var(--primary)"
  }
},
{
  ".article-detail-meta-list": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.4rem",
    "font-size": "0.9rem",
    "margin-bottom": "1.5rem"
  }
},
{
  ".article-detail-meta-link": {
    "padding": "0",
    "vertical-align": "baseline",
    "text-decoration": "none",
    "font-weight": "700",
    "color": "var(--primary) !important"
  }
},
{
  ".article-detail-meta-link:hover": {
    "text-decoration": "underline"
  }
},
{
  ".article-detail-divider": {
    "height": "1px",
    "background-color": "var(--border)",
    "margin-bottom": "1.5rem"
  }
},
{
  ".article-detail-main": {
    "padding": "1rem"
  }
},
{
  "@media (min-width: 768px)": {
    ".article-detail-main": {
      "padding": "3rem"
    }
  }
},
{
  ".article-detail-breadcrumb": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.5rem",
    "font-size": "0.78rem",
    "color": "var(--text-muted)",
    "margin-bottom": "1rem"
  }
},
{
  ".article-detail-breadcrumb-link": {
    "text-decoration": "none",
    "color": "var(--text-muted)",
    "cursor": "pointer",
    "transition": "color 0.2s"
  }
},
{
  ".article-detail-breadcrumb-link:hover": {
    "color": "var(--text-main)"
  }
},
{
  ".article-detail-title": {
    "font-family": "var(--font-display)",
    "font-weight": "700",
    "font-size": "clamp(2rem, 4vw, 3.45rem)",
    "line-height": "1.08",
    "letter-spacing": "-0.045em",
    "max-width": "980px",
    "margin-bottom": "1.5rem"
  }
},
{
  ".article-detail-authors": {
    "display": "flex",
    "align-items": "center",
    "flex-wrap": "wrap",
    "gap": "0.5rem",
    "font-size": "0.92rem",
    "margin-bottom": "1.5rem"
  }
},
{
  ".article-detail-author-link": {
    "padding": "0",
    "text-decoration": "none",
    "font-weight": "500",
    "color": "var(--text-main) !important"
  }
},
{
  ".article-detail-author-link:hover": {
    "color": "var(--primary) !important"
  }
},
{
  ".article-detail-author-toggle": {
    "padding": "0",
    "text-decoration": "none",
    "font-weight": "600",
    "color": "var(--primary) !important"
  }
},
{
  ".article-detail-action-bar": {
    "border-top": "1px solid var(--border)",
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".article-detail-actions": {
    "display": "flex",
    "align-items": "center",
    "flex-wrap": "wrap",
    "gap": "1.5rem",
    "padding": "1rem 0",
    "font-size": "0.88rem",
    "color": "var(--text-muted)"
  }
},
{
  ".article-detail-action-btn": {
    "padding": "0",
    "text-decoration": "none",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.35rem",
    "font-size": "0.88rem",
    "color": "var(--text-muted) !important",
    "transition": "color 0.2s ease"
  }
},
{
  ".article-detail-action-btn:hover": {
    "color": "var(--primary) !important"
  }
},
{
  ".article-detail-action-btn.is-active": {
    "color": "var(--primary) !important"
  }
},
{
  ".article-detail-external-bar": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "flex-wrap": "wrap",
    "gap": "1rem",
    "padding": "1.5rem 0"
  }
},
{
  ".article-detail-doi-link": {
    "text-decoration": "none",
    "font-weight": "600",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.35rem",
    "color": "var(--text-muted)"
  }
},
{
  ".article-detail-doi-link:hover": {
    "color": "var(--primary)"
  }
},
{
  ".article-detail-access-badge": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.5rem",
    "color": "var(--text-muted)",
    "font-style": "italic"
  }
},
{
  ".article-detail-access-dot": {
    "width": "10px",
    "height": "10px",
    "border-radius": "50%",
    "background-color": "var(--text-muted)"
  }
},
{
  ".article-detail-access-dot.is-open": {
    "background-color": "var(--q1-color)"
  }
},
{
  ".article-detail-tabs": {
    "display": "flex",
    "align-items": "flex-end",
    "gap": "1.5rem",
    "flex-wrap": "nowrap",
    "overflow-x": "auto",
    "border-bottom": "1px solid var(--border)",
    "margin-bottom": "1.5rem",
    "scrollbar-width": "none",
    "-ms-overflow-style": "none"
  }
},
{
  ".article-detail-tabs::-webkit-scrollbar": {
    "display": "none"
  }
},
{
  ".article-detail-tab-btn": {
    "white-space": "nowrap",
    "padding": "0",
    "padding-bottom": "0.75rem",
    "text-decoration": "none",
    "font-weight": "700",
    "color": "var(--text-muted) !important",
    "border-bottom": "2px solid transparent !important",
    "border-radius": "0 !important",
    "transition": "color 0.2s, border-color 0.2s"
  }
},
{
  ".article-detail-tab-btn:hover": {
    "color": "var(--text-main) !important"
  }
},
{
  ".article-detail-tab-btn.is-active": {
    "color": "var(--text-main) !important",
    "border-bottom-color": "var(--primary) !important"
  }
},
{
  ".article-preview-grid": {
    "display": "grid",
    "grid-template-columns": "minmax(0, 740px) 220px",
    "gap": "1.5rem",
    "align-items": "start"
  }
},
{
  "@media (max-width: 991.98px)": {
    ".article-preview-grid": {
      "grid-template-columns": "1fr"
    }
  }
},
{
  ".article-section": {
    "margin-bottom": "3rem"
  }
},
{
  ".article-section-title": {
    "font-family": "var(--font-display)",
    "font-weight": "700",
    "font-size": "1.5rem",
    "margin-bottom": "1rem"
  }
},
{
  ".article-section-text": {
    "color": "var(--text-muted)",
    "font-size": "1rem",
    "line-height": "1.75",
    "margin-bottom": "1rem"
  }
},
{
  ".article-topic-chip": {
    "padding": "0.5rem 1rem",
    "font-weight": "500",
    "border": "1px solid var(--border) !important",
    "color": "var(--text-main) !important",
    "background-color": "var(--bg-chip) !important",
    "border-radius": "999px !important",
    "transition": "background-color 0.2s, border-color 0.2s"
  }
},
{
  ".article-topic-chip:hover": {
    "background-color": "var(--primary-light) !important",
    "border-color": "var(--primary) !important",
    "color": "var(--primary) !important"
  }
},
{
  ".article-reference-card": {
    "padding": "1.5rem",
    "border-radius": "18px",
    "border": "1px solid var(--border)",
    "background-color": "var(--bg-card)",
    "transition": "transform 0.18s ease, box-shadow 0.18s ease",
    "color": "inherit",
    "text-decoration": "none",
    "display": "block"
  }
},
{
  ".article-reference-card:hover": {
    "transform": "translateY(-2px)",
    "box-shadow": "0 10px 20px rgba(0,0,0,0.03)",
    "border-color": "var(--primary)"
  }
},
{
  ".article-reference-card-empty": {
    "padding": "1.5rem",
    "border-radius": "18px",
    "border": "1px dashed var(--border)",
    "background-color": "var(--bg-card)",
    "color": "var(--text-muted)"
  }
},
{
  ".article-reference-label": {
    "font-size": "0.75rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "color": "var(--text-muted)",
    "margin-bottom": "0.5rem"
  }
},
{
  ".article-reference-title": {
    "font-weight": "600",
    "color": "var(--text-main)",
    "margin-bottom": "0.5rem",
    "word-break": "break-word"
  }
},
{
  ".article-reference-url": {
    "font-size": "0.92rem",
    "color": "var(--text-muted)",
    "word-break": "break-all"
  }
},
{
  ".article-reference-action": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.5rem",
    "font-size": "0.88rem",
    "color": "var(--text-muted)",
    "transition": "color 0.2s"
  }
},
{
  ".article-reference-card:hover .article-reference-action": {
    "color": "var(--primary)"
  }
},
{
  ".article-toc-aside": {
    "padding": "1rem",
    "background-color": "var(--bg-main)",
    "border-left": "3px solid var(--border)"
  }
},
{
  ".article-toc-title": {
    "font-size": "0.75rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "color": "var(--text-muted)",
    "margin-bottom": "1rem"
  }
},
{
  ".article-toc-link": {
    "padding": "0",
    "text-align": "left",
    "text-decoration": "none",
    "color": "var(--text-muted) !important",
    "font-size": "0.88rem",
    "transition": "color 0.2s"
  }
},
{
  ".article-toc-link:hover,\r\n.article-toc-link.is-active": {
    "color": "var(--text-main) !important",
    "font-weight": "700"
  }
},
{
  ".article-modal-stat-box": {
    "padding": "1rem",
    "margin-bottom": "1rem",
    "border-radius": "12px",
    "background-color": "var(--bg-main)",
    "border": "1px solid var(--border)",
    "color": "var(--text-main)"
  }
},
{
  ".article-keyword-tabs": {
    "display": "flex",
    "align-items": "flex-end",
    "gap": "1.5rem",
    "flex-wrap": "wrap",
    "border-bottom": "1px solid var(--border)",
    "margin-bottom": "1.5rem"
  }
},
{
  ".article-keyword-tab-btn": {
    "background": "transparent !important",
    "border": "none !important",
    "border-bottom": "2px solid transparent !important",
    "border-radius": "0 !important",
    "padding": "0 !important",
    "padding-bottom": "0.75rem !important",
    "font-weight": "700",
    "color": "var(--text-muted) !important",
    "transition": "color 0.2s, border-color 0.2s",
    "font-size": "0.95rem",
    "text-decoration": "none !important"
  }
},
{
  ".article-keyword-tab-btn:hover": {
    "color": "var(--text-main) !important",
    "border-bottom-color": "var(--primary) !important"
  }
},
{
  ".keyword-card": {
    "border": "1px solid var(--border)",
    "border-radius": "14px",
    "background": "var(--bg-card)",
    "height": "100%",
    "padding": "1.5rem",
    "transition": "border-color 0.2s ease, transform 0.2s ease"
  }
},
{
  ".keyword-card:hover": {
    "border-color": "var(--primary)",
    "transform": "translateY(-2px)"
  }
},
{
  ".keyword-card-label": {
    "margin-bottom": "0.55rem",
    "color": "var(--text-muted)",
    "font-size": "0.72rem",
    "font-weight": "700",
    "letter-spacing": "0.1em",
    "text-transform": "uppercase"
  }
},
{
  ".keyword-card-title": {
    "margin": "0",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.16rem",
    "font-weight": "700",
    "line-height": "1.35"
  }
},
{
  ".keyword-card-icon": {
    "color": "var(--text-muted)"
  }
},
{
  ".keyword-card-action": {
    "border": "1px solid var(--btn-dark) !important",
    "background": "var(--btn-dark) !important",
    "color": "var(--bg-card) !important",
    "font-weight": "650 !important",
    "border-radius": "10px !important",
    "padding": "0.62rem 1rem !important",
    "font-size": "0.9rem !important",
    "transition": "transform 0.2s ease, opacity 0.2s ease"
  }
},
{
  ".keyword-card-action:hover": {
    "opacity": "0.92",
    "transform": "translateY(-1px)"
  }
},
{
  ".article-detail-page": {
    "min-height": "100vh",
    "padding-top": "80px",
    "padding-bottom": "0",
    "background-color": "var(--bg-main)",
    "color": "var(--text-main)",
    "overflow": "hidden"
  }
},
{
  ".article-connected-shell": {
    "display": "grid",
    "grid-template-columns": "320px 1fr 380px",
    "height": "calc(100vh - 80px)",
    "overflow": "hidden",
    "background-color": "var(--bg-main)",
    "border-top": "1px solid var(--border)"
  }
},
{
  "@media (max-width: 1199.98px)": {
    ".article-connected-shell": {
      "grid-template-columns": "300px 1fr 340px"
    }
  }
},
{
  "@media (max-width: 991.98px)": {
    ".article-connected-shell": {
      "grid-template-columns": "1fr",
      "height": "auto",
      "overflow-y": "auto"
    }
  }
},
{
  ".article-connected-left": {
    "border-right": "1px solid var(--border)",
    "height": "100%",
    "min-height": "0",
    "overflow-y": "auto",
    "background-color": "var(--bg-card)",
    "display": "flex",
    "flex-direction": "column"
  }
},
{
  "@media (max-width: 991.98px)": {
    ".article-connected-left": {
      "height": "350px",
      "border-right": "none",
      "border-bottom": "1px solid var(--border)"
    }
  }
},
{
  ".section-header-tag": {
    "font-family": "var(--font-display)",
    "font-size": "0.72rem",
    "letter-spacing": "0.08em",
    "background-color": "var(--bg-chip)",
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".related-papers-list": {
    "display": "flex",
    "flex-direction": "column",
    "flex-grow": "1"
  }
},
{
  ".related-paper-card": {
    "border-bottom": "1px solid var(--border)",
    "background-color": "var(--bg-card)",
    "cursor": "pointer",
    "transition": "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "position": "relative",
    "border-left": "3px solid transparent"
  }
},
{
  ".related-paper-card:hover": {
    "background-color": "var(--bg-chip)"
  }
},
{
  ".related-paper-card.is-origin": {
    "background-color": "var(--primary-light) !important",
    "border-left-color": "var(--primary)",
    "cursor": "default"
  }
},
{
  ".origin-badge": {
    "font-size": "0.68rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "color": "#ffffff",
    "background-color": "var(--primary)",
    "padding": "0.18rem 0.45rem",
    "border-radius": "4px"
  }
},
{
  ".paper-year": {
    "font-size": "0.75rem",
    "color": "var(--text-muted)",
    "font-weight": "600"
  }
},
{
  ".paper-title": {
    "font-size": "0.88rem",
    "font-weight": "600",
    "line-height": "1.4",
    "margin-top": "0.35rem",
    "margin-bottom": "0",
    "color": "var(--text-main)",
    "display": "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    "overflow": "hidden"
  }
},
{
  ".related-paper-card:not(.is-origin) .paper-title:hover": {
    "color": "var(--primary)"
  }
},
{
  ".related-paper-card.is-origin .paper-title": {
    "cursor": "pointer"
  }
},
{
  ".related-paper-card.is-origin .paper-title:hover": {
    "color": "#e8632a",
    "text-decoration": "underline"
  }
},
{
  ".paper-authors": {
    "font-size": "0.78rem",
    "color": "var(--text-muted)",
    "white-space": "nowrap",
    "overflow": "hidden",
    "text-overflow": "ellipsis"
  }
},
{
  ".article-connected-middle": {
    "display": "flex",
    "flex-direction": "column",
    "height": "100%",
    "min-height": "0",
    "background-color": "var(--bg-main)",
    "background-image": "linear-gradient(rgba(236, 236, 236, 0.4) 1px, transparent 1px),\r\n    linear-gradient(90deg, rgba(236, 236, 236, 0.4) 1px, transparent 1px)",
    "background-size": "30px 30px",
    "position": "relative"
  }
},
{
  "@media (max-width: 991.98px)": {
    ".article-connected-middle": {
      "height": "400px",
      "border-bottom": "1px solid var(--border)"
    }
  }
},
{
  ".middle-panel-header": {
    "background-color": "rgba(255, 255, 255, 0.85)",
    "backdrop-filter": "blur(8px)",
    "z-index": "10"
  }
},
{
  ".graph-container-inner": {
    "flex-grow": "1",
    "position": "relative",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "overflow": "hidden",
    "height": "100%"
  }
},
{
  ".network-svg": {
    "max-width": "100%",
    "max-height": "100%"
  }
},
{
  ".connection-line": {
    "stroke-dasharray": "2 2",
    "animation": "line-flow 20s linear infinite",
    "opacity": "0.7"
  }
},
{
  "@keyframes line-flow": {
    "to": {
      "stroke-dashoffset": "-40"
    }
  }
},
{
  ".graph-node-group": {
    "user-select": "none"
  }
},
{
  ".node-circle": {
    "transition": "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    "filter": "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.04))"
  }
},
{
  ".graph-node-group:not(.is-center)": {
    "cursor": "pointer"
  }
},
{
  ".graph-node-group:not(.is-center):hover .node-circle": {
    "fill": "var(--primary-light)",
    "stroke": "var(--primary)",
    "r": "18",
    "filter": "drop-shadow(0 4px 8px rgba(255, 122, 51, 0.15))"
  }
},
{
  ".center-pulse": {
    "animation": "radar-ripple 3s cubic-bezier(0.1, 0.8, 0.3, 1) infinite",
    "transform-origin": "250px 250px"
  }
},
{
  "@keyframes radar-ripple": [
    {
      "0%": {
        "r": "20",
        "opacity": "0.8"
      }
    },
    {
      "100%": {
        "r": "65",
        "opacity": "0"
      }
    }
  ]
},
{
  ".graph-node-group.is-center": {
    "cursor": "pointer"
  }
},
{
  ".graph-node-group.is-center:hover .node-circle": {
    "fill": "#e8632a",
    "r": "23",
    "filter": "drop-shadow(0 6px 12px rgba(255, 122, 51, 0.25))"
  }
},
{
  ".node-label": {
    "font-size": "0.68rem",
    "font-weight": "600",
    "fill": "var(--text-muted)",
    "pointer-events": "none",
    "transition": "fill 0.2s ease"
  }
},
{
  ".graph-node-group:hover .node-label": {
    "fill": "var(--text-main)",
    "font-weight": "700"
  }
},
{
  ".graph-overlay-info": {
    "position": "absolute",
    "bottom": "12px",
    "right": "12px",
    "background": "rgba(255, 255, 255, 0.9)",
    "backdrop-filter": "blur(6px)",
    "border": "1px solid var(--border)",
    "padding": "0.35rem 0.6rem",
    "border-radius": "6px",
    "pointer-events": "none",
    "box-shadow": "0 2px 6px rgba(0,0,0,0.02)"
  }
},
{
  ".article-connected-right": {
    "border-left": "1px solid var(--border)",
    "height": "100%",
    "min-height": "0",
    "overflow-y": "auto",
    "background-color": "var(--bg-card)"
  }
},
{
  "@media (max-width: 991.98px)": {
    ".article-connected-right": {
      "height": "auto",
      "border-left": "none"
    }
  }
},
{
  ".article-connected-left::-webkit-scrollbar,\r\n.article-connected-right::-webkit-scrollbar": {
    "width": "5px"
  }
},
{
  ".article-connected-left::-webkit-scrollbar-track,\r\n.article-connected-right::-webkit-scrollbar-track": {
    "background": "transparent"
  }
},
{
  ".article-connected-left::-webkit-scrollbar-thumb,\r\n.article-connected-right::-webkit-scrollbar-thumb": {
    "background": "rgba(0,0,0,0.1)",
    "border-radius": "4px"
  }
},
{
  ".article-connected-left::-webkit-scrollbar-thumb:hover,\r\n.article-connected-right::-webkit-scrollbar-thumb:hover": {
    "background": "rgba(0,0,0,0.2)"
  }
},
{
  ".article-detail-title": {
    "font-family": "var(--font-display) !important",
    "font-size": "1.45rem",
    "font-weight": "700",
    "line-height": "1.25",
    "color": "var(--text-main)",
    "letter-spacing": "-0.02em",
    "margin-top": "0.5rem",
    "margin-bottom": "0.85rem"
  }
},
{
  ".article-detail-title.is-clickable": {
    "cursor": "pointer",
    "transition": "color 0.18s ease"
  }
},
{
  ".article-detail-title.is-clickable:hover": {
    "color": "var(--primary)",
    "text-decoration": "underline"
  }
},
{
  ".article-detail-author-span": {
    "font-family": "var(--font-display)",
    "font-size": "0.88rem",
    "font-weight": "500",
    "color": "var(--text-muted)",
    "transition": "color 0.15s ease"
  }
},
{
  ".article-detail-author-span.is-link": {
    "cursor": "pointer"
  }
},
{
  ".article-detail-author-span.is-link:hover": {
    "color": "var(--primary)",
    "text-decoration": "underline"
  }
},
{
  ".article-detail-author-toggle": {
    "font-family": "var(--font-display) !important",
    "font-size": "0.82rem !important",
    "text-decoration": "none !important",
    "color": "var(--primary) !important",
    "font-weight": "600 !important"
  }
},
{
  ".article-detail-author-toggle:hover": {
    "color": "#e8632a !important"
  }
},
{
  ".article-detail-meta-list": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.45rem",
    "background-color": "var(--bg-chip)",
    "border": "1px solid var(--border)",
    "padding": "0.85rem 1rem",
    "border-radius": "8px"
  }
},
{
  ".meta-item": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.5rem",
    "font-size": "0.84rem",
    "color": "var(--text-main)"
  }
},
{
  ".meta-item svg": {
    "color": "var(--text-muted)",
    "flex-shrink": "0"
  }
},
{
  ".article-detail-actions-connected": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.6rem",
    "flex-wrap": "wrap"
  }
},
{
  ".citations-chip": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.35rem",
    "background-color": "var(--primary-light)",
    "border": "1px solid var(--border)",
    "color": "var(--primary)",
    "font-size": "0.8rem",
    "font-weight": "600",
    "padding": "0.4rem 0.75rem",
    "border-radius": "6px",
    "cursor": "pointer",
    "transition": "all 0.15s ease"
  }
},
{
  ".citations-chip:hover": {
    "background-color": "var(--primary)",
    "color": "#ffffff",
    "border-color": "var(--primary)"
  }
},
{
  ".action-btn-connected": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.35rem",
    "background-color": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "color": "var(--text-muted)",
    "font-size": "0.8rem",
    "font-weight": "500",
    "padding": "0.4rem 0.75rem",
    "border-radius": "6px",
    "transition": "all 0.15s ease",
    "font-family": "var(--font-display)"
  }
},
{
  ".action-btn-connected:hover": {
    "border-color": "var(--primary)",
    "color": "var(--primary)"
  }
},
{
  ".action-btn-connected.is-active": {
    "background-color": "var(--primary-light)",
    "border-color": "var(--primary)",
    "color": "var(--primary)",
    "font-weight": "600"
  }
},
{
  ".article-detail-open-in": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.5rem"
  }
},
{
  ".open-in-label": {
    "font-size": "0.78rem",
    "font-weight": "600",
    "text-transform": "uppercase",
    "letter-spacing": "0.05em"
  }
},
{
  ".open-in-links-container": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.5rem",
    "flex-wrap": "wrap"
  }
},
{
  ".open-in-btn": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.35rem",
    "background-color": "var(--bg-chip)",
    "border": "1px solid var(--border)",
    "color": "var(--text-main)",
    "font-size": "0.78rem",
    "font-weight": "500",
    "padding": "0.35rem 0.65rem",
    "border-radius": "6px",
    "text-decoration": "none",
    "transition": "all 0.15s ease"
  }
},
{
  ".open-in-btn:hover": {
    "background-color": "var(--primary-light)",
    "border-color": "var(--primary)",
    "color": "var(--primary)"
  }
},
{
  ".detail-pane-divider": {
    "height": "1px",
    "background-color": "var(--border)"
  }
},
{
  ".section-title-connected": {
    "font-family": "var(--font-display) !important",
    "font-size": "1.12rem",
    "font-weight": "700",
    "color": "var(--text-main)"
  }
},
{
  ".abstract-text-connected": {
    "font-size": "0.88rem",
    "line-height": "1.65",
    "color": "var(--text-muted)"
  }
},
{
  ".reference-link-item": {
    "display": "block",
    "background-color": "var(--bg-chip)",
    "border": "1px solid var(--border)",
    "text-decoration": "none",
    "transition": "all 0.15s ease"
  }
},
{
  ".reference-link-item:hover": {
    "background-color": "var(--primary-light)",
    "border-color": "var(--primary)"
  }
},
{
  ".reference-item-index": {
    "font-weight": "600"
  }
},
{
  ".reference-item-label": {
    "font-weight": "500"
  }
},
{
  ".iframe-container": {
    "position": "relative",
    "flex-grow": "1",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "background-color": "var(--bg-main)",
    "overflow": "hidden"
  }
},
{
  ".article-graph-iframe": {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "width": "100%",
    "height": "100%",
    "border": "none",
    "transition": "opacity 0.3s ease-in-out",
    "opacity": "1"
  }
},
{
  ".article-graph-iframe.is-hidden": {
    "opacity": "0",
    "pointer-events": "none"
  }
},
{
  ".iframe-state-overlay": {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "width": "100%",
    "height": "100%",
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content": "center",
    "gap": "0.75rem",
    "font-size": "0.9rem",
    "font-weight": "500",
    "color": "var(--text-muted)",
    "background-color": "var(--bg-main)",
    "z-index": "5",
    "padding": "1rem",
    "text-align": "center"
  }
},
{
  ".iframe-state-overlay.is-error": {
    "gap": "1rem",
    "color": "var(--danger)",
    "background-color": "var(--bg-card)"
  }
},
{
  ".iframe-state-overlay.is-error .text-xs": {
    "color": "var(--text-muted)"
  }
},
{
  ".article-filter-card": {
    "overflow": "visible !important"
  }
},
{
  ".article-filter-layout": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "1rem",
    "width": "100%"
  }
},
{
  ".article-filter-toolbar": {
    "display": "inline-flex",
    "flex": "0 0 auto",
    "flex-wrap": "wrap",
    "align-items": "center",
    "gap": "0.25rem",
    "min-width": "0",
    "padding": "3px 6px",
    "border": "1px solid var(--border) !important",
    "border-radius": "999px !important",
    "background": "var(--bg-card) !important",
    "box-shadow": "0 1px 3px rgba(0, 0, 0, 0.03)"
  }
},
{
  ".article-filter-dropdown .dropdown-toggle::after,\r\n.article-more-filter-button::after": {
    "display": "none !important"
  }
},
{
  ".article-filter-button": {
    "min-height": "38px",
    "max-width": "240px",
    "border": "none !important",
    "border-radius": "999px !important",
    "background": "transparent !important",
    "color": "var(--text-main) !important",
    "display": "inline-flex !important",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "0.45rem",
    "font-family": "var(--font-display) !important",
    "font-size": "0.88rem !important",
    "font-weight": "500 !important",
    "padding": "0.42rem 0.85rem !important",
    "box-shadow": "none !important",
    "transition": "all 0.15s ease-in-out"
  }
},
{
  ".article-filter-button-label": {
    "overflow": "hidden",
    "text-overflow": "ellipsis",
    "white-space": "nowrap"
  }
},
{
  ".article-filter-button:hover,\r\n.article-filter-button:focus,\r\n.article-filter-button.show": {
    "background": "rgba(0, 0, 0, 0.04) !important",
    "color": "var(--text-main) !important"
  }
},
{
  ".article-filter-button.is-active": {
    "background": "rgba(14, 165, 233, 0.08) !important",
    "color": "#0284c7 !important",
    "font-weight": "600 !important"
  }
},
{
  ".article-filter-button.is-active:hover,\r\n.article-filter-button.is-active:focus": {
    "background": "rgba(14, 165, 233, 0.14) !important",
    "color": "#0284c7 !important"
  }
},
{
  ".article-filter-button:disabled": {
    "color": "var(--text-muted) !important",
    "opacity": "0.62",
    "cursor": "not-allowed"
  }
},
{
  ".article-more-filter-button": {
    "max-width": "none"
  }
},
{
  ".article-filter-menu": {
    "width": "min(320px, calc(100vw - 2rem))",
    "max-height": "420px",
    "overflow": "hidden",
    "border": "1px solid var(--border) !important",
    "border-radius": "10px !important",
    "background": "var(--bg-card) !important",
    "box-shadow": "0 18px 44px rgba(7, 26, 28, 0.12) !important",
    "padding": "0.55rem !important",
    "z-index": "1040"
  }
},
{
  ".article-more-filter-menu": {
    "width": "min(300px, calc(100vw - 2rem))"
  }
},
{
  ".article-filter-menu-header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "0.75rem",
    "color": "var(--text-main)",
    "font-size": "0.84rem",
    "font-weight": "600",
    "padding": "0.2rem 0.15rem 0.55rem"
  }
},
{
  ".article-filter-reset-btn": {
    "border": "0",
    "background": "transparent",
    "color": "var(--text-muted)",
    "font": "inherit",
    "font-size": "0.78rem",
    "font-weight": "600",
    "padding": "0"
  }
},
{
  ".article-filter-reset-btn:hover,\r\n.article-filter-reset-btn:focus": {
    "color": "var(--primary)",
    "text-decoration": "underline",
    "text-underline-offset": "4px"
  }
},
{
  ".article-menu-search": {
    "min-height": "38px",
    "border": "1px solid var(--border)",
    "border-radius": "7px",
    "display": "flex",
    "align-items": "center",
    "gap": "0.45rem",
    "color": "var(--text-muted)",
    "padding": "0 0.65rem",
    "margin-bottom": "0.5rem"
  }
},
{
  ".article-menu-search input": {
    "width": "100%",
    "border": "0",
    "outline": "0",
    "background": "transparent",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "0.86rem"
  }
},
{
  ".article-menu-search input::placeholder": {
    "color": "var(--text-muted)"
  }
},
{
  ".article-filter-options": {
    "max-height": "260px",
    "overflow-y": "auto",
    "padding-right": "0.15rem"
  }
},
{
  ".article-filter-option": {
    "width": "100%",
    "min-height": "38px",
    "border": "0",
    "border-radius": "7px",
    "background": "transparent",
    "color": "var(--text-main)",
    "display": "flex",
    "align-items": "center",
    "gap": "0.55rem",
    "padding": "0.45rem 0.5rem",
    "text-align": "left",
    "font-family": "var(--font-display)",
    "font-size": "0.88rem",
    "font-weight": "500"
  }
},
{
  ".article-filter-option:hover,\r\n.article-filter-option:focus-visible": {
    "background": "#f5f6f7",
    "outline": "0"
  }
},
{
  ".article-filter-option.is-selected": {
    "font-weight": "600"
  }
},
{
  ".article-option-check": {
    "width": "18px",
    "height": "18px",
    "border": "1px solid var(--border)",
    "border-radius": "5px",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "color": "var(--primary)",
    "flex": "0 0 auto"
  }
},
{
  ".article-filter-option.is-selected .article-option-check": {
    "border-color": "var(--primary)"
  }
},
{
  ".article-filter-empty": {
    "color": "var(--text-muted)",
    "font-size": "0.86rem",
    "padding": "0.8rem 0.5rem"
  }
},
{
  ".article-table-search-form": {
    "flex": "0 0 min(280px, 100%)",
    "margin-left": "auto"
  }
},
{
  ".article-table-search": {
    "box-shadow": "0 8px 18px rgba(7, 26, 28, 0.03)"
  }
},
{
  ".article-selected-filters": {
    "display": "flex",
    "flex-wrap": "wrap",
    "align-items": "center",
    "gap": "0.5rem",
    "margin-top": "0.75rem"
  }
},
{
  ".article-selected-filter-chip": {
    "min-height": "30px",
    "border": "none",
    "background": "var(--bg-card)",
    "color": "var(--text-main)",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.45rem",
    "padding": "0.25rem 0.55rem",
    "font-family": "var(--font-display)",
    "font-size": "0.9rem",
    "font-weight": "500"
  }
},
{
  ".article-selected-filter-chip:hover,\r\n.article-selected-filter-chip:focus": {
    "outline": "0"
  }
},
{
  ".article-clear-btn": {
    "color": "var(--primary) !important",
    "font-weight": "600 !important",
    "white-space": "nowrap",
    "text-decoration": "none !important"
  }
},
{
  ".article-clear-inline": {
    "border": "0",
    "background": "transparent",
    "padding": "0.25rem 0.15rem"
  }
},
{
  ".article-clear-btn:hover,\r\n.article-clear-btn:focus": {
    "color": "var(--primary) !important",
    "text-decoration": "underline !important",
    "text-underline-offset": "4px",
    "box-shadow": "none !important"
  }
},
{
  ".article-toggle-row": {
    "width": "100%",
    "min-height": "44px",
    "border": "0",
    "border-radius": "8px",
    "background": "transparent",
    "color": "var(--text-muted)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "0.75rem",
    "padding": "0.55rem 0.5rem",
    "font-family": "var(--font-display)",
    "font-size": "0.88rem",
    "font-weight": "500",
    "text-align": "left"
  }
},
{
  ".article-toggle-row:hover,\r\n.article-toggle-row:focus-visible": {
    "background": "#f5f6f7",
    "color": "var(--text-main)"
  }
},
{
  "@media (max-width: 991px)": [
    {
      ".article-filter-layout": {
        "flex-direction": "column",
        "align-items": "stretch",
        "gap": "0.75rem"
      }
    },
    {
      ".article-filter-toolbar": {
        "width": "100%",
        "overflow-x": "auto",
        "flex-wrap": "nowrap",
        "justify-content": "flex-start",
        "padding": "4px 6px",
        "-webkit-overflow-scrolling": "touch"
      }
    },
    {
      ".article-filter-button": {
        "flex": "0 0 auto",
        "white-space": "nowrap"
      }
    },
    {
      ".article-table-search-form": {
        "flex": "1 1 100%",
        "width": "100%",
        "margin-left": "0"
      }
    }
  ]
},
{
  ".ap-page": {
    "min-height": "100vh",
    "padding-top": "84px",
    "padding-bottom": "96px",
    "background-color": "var(--bg-main, #ffffff)",
    "color": "var(--text-main, #0d1b1c)",
    "font-family": "var(--font-display, \"Roboto\", sans-serif)"
  }
},
{
  ".ap-main-container": {
    "max-width": "1240px",
    "margin": "0 auto",
    "padding": "0 1.25rem"
  }
},
{
  ".ap-breadcrumb": {
    "margin-bottom": "1.25rem"
  }
},
{
  ".ap-breadcrumb > .MuiBox-root": {
    "margin": "0",
    "font-size": "0.8rem",
    "background": "transparent",
    "padding": "0"
  }
},
{
  ".ap-breadcrumb__link": {
    "color": "var(--text-muted, #6b6b6b)",
    "cursor": "pointer",
    "text-decoration": "none",
    "transition": "color 0.15s ease"
  }
},
{
  ".ap-breadcrumb__link:hover": {
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-breadcrumb__current": {
    "color": "var(--primary, #ff7a33)",
    "font-weight": "600"
  }
},
{
  ".ap-section": {
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "12px",
    "background-color": "var(--bg-card, #ffffff)",
    "padding": "1.25rem 1.4rem",
    "margin-bottom": "1.25rem",
    "box-shadow": "0 1px 3px rgba(0, 0, 0, 0.02)"
  }
},
{
  ".ap-section-header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "margin-bottom": "1.1rem",
    "padding-bottom": "0.75rem",
    "border-bottom": "1px solid var(--border, #e6e6e6)"
  }
},
{
  ".ap-section-header-left": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.5rem"
  }
},
{
  ".ap-section-icon": {
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-section-title": {
    "font-size": "1rem",
    "font-weight": "700",
    "color": "var(--text-main, #0d1b1c)",
    "margin": "0",
    "letter-spacing": "-0.01em"
  }
},
{
  ".ap-section-badge": {
    "font-size": "0.7rem",
    "font-weight": "600",
    "color": "var(--text-muted, #6b6b6b)",
    "background-color": "var(--bg-chip, #f2f2f2)",
    "padding": "0.2rem 0.6rem",
    "border-radius": "999px",
    "border": "1px solid var(--border, #e6e6e6)"
  }
},
{
  ".ap-grid-two-col": {
    "display": "grid",
    "grid-template-columns": "repeat(2, 1fr)",
    "gap": "1.25rem",
    "margin-bottom": "0"
  }
},
{
  ".ap-grid-col": {
    "display": "flex",
    "flex-direction": "column"
  }
},
{
  ".ap-hero": {
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "14px",
    "background-color": "var(--bg-card, #ffffff)",
    "margin-bottom": "1.25rem",
    "box-shadow": "0 2px 8px rgba(0, 0, 0, 0.03)"
  }
},
{
  ".ap-hero-inner": {
    "display": "grid",
    "grid-template-columns": "auto 1fr 280px",
    "gap": "1.75rem",
    "padding": "1.75rem",
    "align-items": "flex-start"
  }
},
{
  ".ap-hero-left": {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
    "gap": "0.75rem"
  }
},
{
  ".ap-hero-avatar-wrap": {
    "position": "relative"
  }
},
{
  ".ap-hero-status-pill": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.35rem",
    "padding": "0.2rem 0.55rem",
    "border-radius": "999px",
    "background-color": "#ecfdf5",
    "border": "1px solid #a7f3d0",
    "color": "#065f46",
    "font-size": "0.68rem",
    "font-weight": "600"
  }
},
{
  ".ap-hero-status-dot": {
    "width": "6px",
    "height": "6px",
    "border-radius": "50%",
    "background-color": "#10b981"
  }
},
{
  ".ap-hero-center": {
    "min-width": "0"
  }
},
{
  ".ap-hero-eyebrow": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.35rem",
    "font-size": "0.68rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "letter-spacing": "0.08em",
    "color": "var(--primary, #ff7a33)",
    "margin-bottom": "0.35rem"
  }
},
{
  ".ap-hero-name": {
    "font-size": "clamp(1.6rem, 2.5vw, 2.2rem)",
    "font-weight": "800",
    "line-height": "1.2",
    "letter-spacing": "-0.025em",
    "color": "var(--text-main, #0d1b1c)",
    "margin": "0 0 0.3rem"
  }
},
{
  ".ap-hero-position": {
    "font-size": "0.92rem",
    "font-weight": "600",
    "color": "var(--primary, #ff7a33)",
    "margin-bottom": "0.5rem"
  }
},
{
  ".ap-hero-institutions": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.25rem",
    "margin-bottom": "0.85rem"
  }
},
{
  ".ap-hero-inst-primary,\r\n.ap-hero-inst-secondary,\r\n.ap-hero-location": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.4rem",
    "font-size": "0.8rem"
  }
},
{
  ".ap-hero-inst-primary": {
    "font-weight": "600",
    "color": "var(--text-main, #0d1b1c)"
  }
},
{
  ".ap-hero-inst-secondary,\r\n.ap-hero-location": {
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-hero-bio": {
    "font-size": "0.82rem",
    "line-height": "1.6",
    "color": "var(--text-muted, #6b6b6b)",
    "margin": "0 0 1rem",
    "text-align": "justify"
  }
},
{
  ".ap-hero-focus-block": {
    "display": "flex",
    "flex-wrap": "wrap",
    "align-items": "center",
    "gap": "0.45rem",
    "margin-bottom": "1rem"
  }
},
{
  ".ap-hero-focus-label": {
    "font-size": "0.72rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "letter-spacing": "0.05em",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-hero-focus-chips": {
    "display": "flex",
    "flex-wrap": "wrap",
    "gap": "0.35rem"
  }
},
{
  ".ap-hero-focus-chip": {
    "font-size": "0.72rem",
    "font-weight": "500",
    "padding": "0.18rem 0.55rem",
    "border-radius": "999px",
    "background-color": "var(--bg-chip, #f2f2f2)",
    "border": "1px solid var(--border, #e6e6e6)",
    "color": "var(--text-main, #0d1b1c)"
  }
},
{
  ".ap-hero-meta-bar": {
    "display": "flex",
    "flex-wrap": "wrap",
    "gap": "0.45rem"
  }
},
{
  ".ap-hero-meta-pill": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.35rem",
    "font-size": "0.72rem",
    "color": "var(--text-main, #0d1b1c)",
    "background-color": "var(--bg-chip, #f2f2f2)",
    "border": "1px solid var(--border, #e6e6e6)",
    "padding": "0.3rem 0.65rem",
    "border-radius": "6px",
    "text-decoration": "none",
    "cursor": "pointer",
    "transition": "all 0.15s ease"
  }
},
{
  ".ap-hero-meta-pill:hover": {
    "border-color": "var(--primary, #ff7a33)",
    "color": "var(--primary, #ff7a33)",
    "text-decoration": "none"
  }
},
{
  ".ap-hero-orcid-btn": {
    "background": "#ffffff"
  }
},
{
  ".ap-hero-right": {
    "display": "flex",
    "flex-direction": "column"
  }
},
{
  ".ap-hero-summary-card": {
    "background-color": "#fafafa",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "10px",
    "padding": "1.1rem"
  }
},
{
  ".ap-hero-summary-header": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.4rem",
    "font-size": "0.72rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "letter-spacing": "0.06em",
    "color": "var(--text-muted, #6b6b6b)",
    "margin-bottom": "0.85rem",
    "padding-bottom": "0.5rem",
    "border-bottom": "1px solid var(--border, #e6e6e6)"
  }
},
{
  ".ap-hero-summary-metrics": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.5rem",
    "margin-bottom": "1.1rem"
  }
},
{
  ".ap-hero-summary-row": {
    "display": "flex",
    "justify-content": "space-between",
    "align-items": "center",
    "font-size": "0.8rem"
  }
},
{
  ".ap-hero-summary-label": {
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-hero-summary-val": {
    "font-weight": "700",
    "color": "var(--text-main, #0d1b1c)",
    "font-family": "var(--font-display, \"Roboto\", sans-serif)"
  }
},
{
  ".ap-hero-summary-val.highlight": {
    "color": "var(--primary, #ff7a33)",
    "font-size": "0.95rem"
  }
},
{
  ".ap-hero-actions": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.45rem"
  }
},
{
  ".ap-btn": {
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "gap": "0.4rem",
    "padding": "0.5rem 0.9rem",
    "border-radius": "7px",
    "font-size": "0.75rem",
    "font-weight": "600",
    "cursor": "pointer",
    "text-decoration": "none",
    "transition": "all 0.15s ease",
    "border": "1px solid transparent"
  }
},
{
  ".ap-btn-primary": {
    "background-color": "var(--btn-dark, #071a1c)",
    "color": "#ffffff"
  }
},
{
  ".ap-btn-primary:hover": {
    "background-color": "#1a2e30",
    "color": "#ffffff",
    "text-decoration": "none"
  }
},
{
  ".ap-btn-outline": {
    "background-color": "#ffffff",
    "border-color": "var(--border, #e6e6e6)",
    "color": "var(--text-main, #0d1b1c)"
  }
},
{
  ".ap-btn-outline:hover": {
    "border-color": "var(--primary, #ff7a33)",
    "color": "var(--primary, #ff7a33)",
    "text-decoration": "none"
  }
},
{
  ".ap-quicknav": {
    "position": "sticky",
    "top": "72px",
    "z-index": "100",
    "background-color": "rgba(255, 255, 255, 0.96)",
    "backdrop-filter": "blur(8px)",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "10px",
    "padding": "0.35rem 0.5rem",
    "margin-bottom": "1.25rem",
    "box-shadow": "0 4px 12px rgba(0, 0, 0, 0.03)"
  }
},
{
  ".ap-quicknav-container": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.3rem",
    "overflow-x": "auto",
    "scrollbar-width": "none"
  }
},
{
  ".ap-quicknav-container::-webkit-scrollbar": {
    "display": "none"
  }
},
{
  ".ap-quicknav-item": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.35rem",
    "padding": "0.4rem 0.75rem",
    "border-radius": "7px",
    "border": "none",
    "background": "transparent",
    "color": "var(--text-muted, #6b6b6b)",
    "font-size": "0.75rem",
    "font-weight": "600",
    "white-space": "nowrap",
    "cursor": "pointer",
    "transition": "all 0.15s ease"
  }
},
{
  ".ap-quicknav-item:hover": {
    "color": "var(--primary, #ff7a33)",
    "background-color": "var(--primary-light, #fff0e8)"
  }
},
{
  ".ap-quicknav-item.active": {
    "color": "#ffffff",
    "background-color": "var(--btn-dark, #071a1c)"
  }
},
{
  ".ap-metrics-strip": {
    "display": "grid",
    "grid-template-columns": "repeat(6, 1fr)",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "12px",
    "background-color": "var(--bg-card, #ffffff)",
    "overflow": "hidden",
    "margin-bottom": "1.25rem",
    "box-shadow": "0 1px 3px rgba(0, 0, 0, 0.02)"
  }
},
{
  ".ap-metric-tile": {
    "padding": "0.9rem 0.75rem",
    "text-align": "center",
    "border-right": "1px solid var(--border, #e6e6e6)",
    "display": "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
    "transition": "background-color 0.15s ease"
  }
},
{
  ".ap-metric-tile:last-of-type": {
    "border-right": "none"
  }
},
{
  ".ap-metric-tile:hover": {
    "background-color": "var(--bg-chip, #f2f2f2)"
  }
},
{
  ".ap-metric-tile-header": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.3rem",
    "margin-bottom": "0.25rem"
  }
},
{
  ".ap-metric-icon": {
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-metric-tile.highlight .ap-metric-icon": {
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-metric-tile-label": {
    "font-size": "0.65rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "letter-spacing": "0.06em",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-metric-tile-val": {
    "font-size": "1.45rem",
    "font-weight": "800",
    "line-height": "1.1",
    "color": "var(--text-main, #0d1b1c)",
    "font-family": "var(--font-display, \"Roboto\", sans-serif)",
    "margin-bottom": "0.15rem"
  }
},
{
  ".ap-metric-tile.highlight .ap-metric-tile-val": {
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-metric-tile-sub": {
    "font-size": "0.65rem",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-affiliations-list": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.75rem"
  }
},
{
  ".ap-affiliation-item": {
    "display": "flex",
    "gap": "0.85rem",
    "padding": "0.85rem 1rem",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "9px",
    "background-color": "#ffffff"
  }
},
{
  ".ap-affiliation-badge-logo": {
    "flex-shrink": "0",
    "width": "44px",
    "height": "44px",
    "border-radius": "8px",
    "border": "1px solid",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "font-weight": "800",
    "font-size": "0.75rem"
  }
},
{
  ".ap-affiliation-content": {
    "flex": "1",
    "min-width": "0"
  }
},
{
  ".ap-affiliation-main-row": {
    "display": "flex",
    "justify-content": "space-between",
    "align-items": "baseline",
    "gap": "0.5rem",
    "margin-bottom": "0.15rem"
  }
},
{
  ".ap-affiliation-name": {
    "font-size": "0.86rem",
    "font-weight": "700",
    "color": "var(--text-main, #0d1b1c)",
    "margin": "0"
  }
},
{
  ".ap-affiliation-since": {
    "font-size": "0.68rem",
    "font-weight": "600",
    "color": "var(--text-muted, #6b6b6b)",
    "background-color": "var(--bg-chip, #f2f2f2)",
    "padding": "0.15rem 0.45rem",
    "border-radius": "4px",
    "white-space": "nowrap"
  }
},
{
  ".ap-affiliation-dept": {
    "font-size": "0.75rem",
    "color": "var(--text-muted, #6b6b6b)",
    "margin-bottom": "0.35rem"
  }
},
{
  ".ap-affiliation-meta-footer": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.4rem",
    "font-size": "0.72rem"
  }
},
{
  ".ap-affiliation-role": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.25rem",
    "font-weight": "600",
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-affiliation-dot": {
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-affiliation-loc": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.25rem",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-centers-grid": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.75rem"
  }
},
{
  ".ap-center-card": {
    "padding": "0.85rem 1rem",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "9px",
    "background-color": "#ffffff"
  }
},
{
  ".ap-center-card-header": {
    "display": "flex",
    "align-items": "flex-start",
    "gap": "0.65rem",
    "margin-bottom": "0.35rem"
  }
},
{
  ".ap-center-icon-box": {
    "flex-shrink": "0",
    "width": "32px",
    "height": "32px",
    "border-radius": "6px",
    "background-color": "var(--primary-light, #fff0e8)",
    "color": "var(--primary, #ff7a33)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center"
  }
},
{
  ".ap-center-headings": {
    "flex": "1",
    "min-width": "0"
  }
},
{
  ".ap-center-name": {
    "font-size": "0.84rem",
    "font-weight": "700",
    "color": "var(--text-main, #0d1b1c)",
    "margin": "0 0 0.1rem"
  }
},
{
  ".ap-center-org": {
    "font-size": "0.72rem",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-center-focus": {
    "font-size": "0.75rem",
    "line-height": "1.45",
    "color": "var(--text-muted, #6b6b6b)",
    "margin-bottom": "0.4rem",
    "padding-left": "2.65rem"
  }
},
{
  ".ap-center-focus-label": {
    "font-weight": "600",
    "color": "var(--text-main, #0d1b1c)"
  }
},
{
  ".ap-center-footer": {
    "padding-left": "2.65rem"
  }
},
{
  ".ap-center-role-tag": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.25rem",
    "font-size": "0.68rem",
    "font-weight": "600",
    "color": "var(--btn-dark, #071a1c)",
    "background-color": "var(--bg-chip, #f2f2f2)",
    "padding": "0.15rem 0.5rem",
    "border-radius": "4px"
  }
},
{
  ".ap-interests-container": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.85rem"
  }
},
{
  ".ap-interests-group-title": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.4rem",
    "font-size": "0.72rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "letter-spacing": "0.05em",
    "color": "var(--text-muted, #6b6b6b)",
    "margin-bottom": "0.45rem"
  }
},
{
  ".ap-interests-dot": {
    "width": "6px",
    "height": "6px",
    "border-radius": "50%"
  }
},
{
  ".ap-interests-dot.primary": {
    "background-color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-interests-dot.secondary": {
    "background-color": "#64748b"
  }
},
{
  ".ap-interests-chips": {
    "display": "flex",
    "flex-wrap": "wrap",
    "gap": "0.4rem"
  }
},
{
  ".ap-interest-chip": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.3rem",
    "padding": "0.25rem 0.65rem",
    "border-radius": "6px",
    "font-size": "0.74rem",
    "font-weight": "500",
    "transition": "all 0.15s ease",
    "user-select": "none"
  }
},
{
  ".ap-interest-chip.primary": {
    "background-color": "var(--primary-light, #fff0e8)",
    "border": "1px solid rgba(255, 122, 51, 0.3)",
    "color": "#c2410c",
    "font-weight": "600"
  }
},
{
  ".ap-interest-chip.secondary": {
    "background-color": "var(--bg-chip, #f2f2f2)",
    "border": "1px solid var(--border, #e6e6e6)",
    "color": "var(--text-main, #0d1b1c)"
  }
},
{
  ".ap-interest-chip:hover": {
    "border-color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-areas-wrapper": {
    "display": "grid",
    "grid-template-columns": "140px 1fr",
    "gap": "1.5rem",
    "align-items": "center"
  }
},
{
  ".ap-areas-chart-col": {
    "display": "flex",
    "justify-content": "center"
  }
},
{
  ".ap-areas-svg-container": {
    "position": "relative",
    "width": "130px",
    "height": "130px"
  }
},
{
  ".ap-areas-svg": {
    "transform": "rotate(-90deg)"
  }
},
{
  ".ap-areas-donut-segment": {
    "transition": "stroke-width 0.2s ease"
  }
},
{
  ".ap-areas-donut-segment:hover": {
    "stroke-width": "16"
  }
},
{
  ".ap-areas-donut-core": {
    "position": "absolute",
    "inset": "18px",
    "border-radius": "50%",
    "background-color": "#ffffff",
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content": "center",
    "box-shadow": "0 1px 4px rgba(0, 0, 0, 0.04)"
  }
},
{
  ".ap-areas-donut-core-number": {
    "font-size": "1.15rem",
    "font-weight": "800",
    "color": "var(--text-main, #0d1b1c)",
    "line-height": "1"
  }
},
{
  ".ap-areas-donut-core-label": {
    "font-size": "0.6rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "letter-spacing": "0.05em",
    "color": "var(--text-muted, #6b6b6b)",
    "margin-top": "0.1rem"
  }
},
{
  ".ap-areas-list-col": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.5rem"
  }
},
{
  ".ap-area-ranked-row": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.2rem"
  }
},
{
  ".ap-area-ranked-head": {
    "display": "flex",
    "justify-content": "space-between",
    "align-items": "center",
    "font-size": "0.75rem"
  }
},
{
  ".ap-area-ranked-title": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.4rem",
    "min-width": "0"
  }
},
{
  ".ap-area-ranked-dot": {
    "width": "7px",
    "height": "7px",
    "border-radius": "50%",
    "flex-shrink": "0"
  }
},
{
  ".ap-area-ranked-name": {
    "font-weight": "600",
    "color": "var(--text-main, #0d1b1c)",
    "overflow": "hidden",
    "text-overflow": "ellipsis",
    "white-space": "nowrap"
  }
},
{
  ".ap-area-ranked-metrics": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.35rem",
    "font-size": "0.72rem",
    "color": "var(--text-muted, #6b6b6b)",
    "flex-shrink": "0"
  }
},
{
  ".ap-area-ranked-pct": {
    "font-weight": "700",
    "color": "var(--text-main, #0d1b1c)"
  }
},
{
  ".ap-area-progress-track": {
    "height": "4px",
    "border-radius": "999px",
    "background-color": "var(--bg-section, #ececec)",
    "overflow": "hidden"
  }
},
{
  ".ap-area-progress-bar": {
    "height": "100%",
    "border-radius": "999px",
    "transition": "width 0.6s ease"
  }
},
{
  ".ap-impact-toggle-group": {
    "display": "flex",
    "gap": "0.35rem"
  }
},
{
  ".ap-impact-toggle-btn": {
    "padding": "0.25rem 0.65rem",
    "border-radius": "6px",
    "border": "1px solid var(--border, #e6e6e6)",
    "background-color": "#ffffff",
    "color": "var(--text-muted, #6b6b6b)",
    "font-size": "0.72rem",
    "font-weight": "600",
    "cursor": "pointer",
    "transition": "all 0.15s ease"
  }
},
{
  ".ap-impact-toggle-btn.active": {
    "background-color": "var(--btn-dark, #071a1c)",
    "border-color": "var(--btn-dark, #071a1c)",
    "color": "#ffffff"
  }
},
{
  ".ap-impact-body": {
    "display": "grid",
    "grid-template-columns": "280px 1fr",
    "gap": "1.5rem",
    "align-items": "center"
  }
},
{
  ".ap-impact-stats-grid": {
    "display": "grid",
    "grid-template-columns": "repeat(2, 1fr)",
    "gap": "0.65rem"
  }
},
{
  ".ap-impact-stat-card": {
    "padding": "0.75rem 0.6rem",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "8px",
    "background-color": "#ffffff",
    "text-align": "center"
  }
},
{
  ".ap-impact-stat-card.highlight": {
    "border-color": "rgba(255, 122, 51, 0.4)",
    "background-color": "var(--primary-light, #fff0e8)"
  }
},
{
  ".ap-impact-stat-label": {
    "font-size": "0.65rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "letter-spacing": "0.05em",
    "color": "var(--text-muted, #6b6b6b)",
    "margin-bottom": "0.2rem"
  }
},
{
  ".ap-impact-stat-number": {
    "font-size": "1.25rem",
    "font-weight": "800",
    "color": "var(--text-main, #0d1b1c)",
    "font-family": "var(--font-display, \"Roboto\", sans-serif)",
    "line-height": "1.1",
    "margin-bottom": "0.15rem"
  }
},
{
  ".ap-impact-stat-card.highlight .ap-impact-stat-number": {
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-impact-stat-sub": {
    "font-size": "0.62rem",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-impact-chart-box": {
    "background-color": "#fafafa",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "8px",
    "padding": "0.9rem 1rem"
  }
},
{
  ".ap-impact-chart-header": {
    "display": "flex",
    "justify-content": "space-between",
    "align-items": "center",
    "margin-bottom": "0.6rem"
  }
},
{
  ".ap-impact-chart-caption": {
    "font-size": "0.72rem",
    "font-weight": "700",
    "color": "var(--text-main, #0d1b1c)"
  }
},
{
  ".ap-impact-chart-note": {
    "font-size": "0.65rem",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-impact-svg-wrap": {
    "width": "100%"
  }
},
{
  ".ap-impact-bar": {
    "cursor": "pointer",
    "transition": "opacity 0.15s ease"
  }
},
{
  ".ap-impact-bar:hover": {
    "opacity": "0.8"
  }
},
{
  ".ap-pubs-toolbar": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.75rem",
    "margin-bottom": "1.1rem",
    "padding-bottom": "0.9rem",
    "border-bottom": "1px solid var(--border, #e6e6e6)"
  }
},
{
  ".ap-pubs-search-wrap": {
    "position": "relative",
    "display": "flex",
    "align-items": "center"
  }
},
{
  ".ap-pubs-search-icon": {
    "position": "absolute",
    "left": "0.75rem",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-pubs-search-input": {
    "width": "100%",
    "padding": "0.5rem 2rem 0.5rem 2.2rem",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "7px",
    "background-color": "var(--bg-chip, #f2f2f2)",
    "font-size": "0.78rem",
    "color": "var(--text-main, #0d1b1c)",
    "outline": "none",
    "transition": "all 0.15s ease"
  }
},
{
  ".ap-pubs-search-input:focus": {
    "border-color": "var(--primary, #ff7a33)",
    "background-color": "#ffffff",
    "box-shadow": "0 0 0 2px rgba(255, 122, 51, 0.12)"
  }
},
{
  ".ap-pubs-search-clear": {
    "position": "absolute",
    "right": "0.75rem",
    "background": "transparent",
    "border": "none",
    "color": "var(--text-muted, #6b6b6b)",
    "cursor": "pointer",
    "padding": "0"
  }
},
{
  ".ap-pubs-filters": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "flex-wrap": "wrap",
    "gap": "0.65rem"
  }
},
{
  ".ap-pubs-select": {
    "padding": "0.35rem 0.7rem",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "6px",
    "background-color": "#ffffff",
    "font-size": "0.75rem",
    "color": "var(--text-main, #0d1b1c)",
    "outline": "none",
    "cursor": "pointer"
  }
},
{
  ".ap-pubs-sort-group": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.35rem"
  }
},
{
  ".ap-pubs-sort-label": {
    "font-size": "0.72rem",
    "font-weight": "600",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-pubs-sort-pill": {
    "padding": "0.25rem 0.6rem",
    "border-radius": "999px",
    "border": "1px solid var(--border, #e6e6e6)",
    "background": "transparent",
    "font-size": "0.72rem",
    "font-weight": "600",
    "color": "var(--text-muted, #6b6b6b)",
    "cursor": "pointer",
    "transition": "all 0.15s ease"
  }
},
{
  ".ap-pubs-sort-pill:hover": {
    "border-color": "var(--primary, #ff7a33)",
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-pubs-sort-pill.active": {
    "background-color": "var(--btn-dark, #071a1c)",
    "border-color": "var(--btn-dark, #071a1c)",
    "color": "#ffffff"
  }
},
{
  ".ap-pubs-list": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.85rem"
  }
},
{
  ".ap-pubs-empty": {
    "text-align": "center",
    "padding": "2.5rem 1rem"
  }
},
{
  ".ap-pub-card": {
    "padding": "0.95rem 1.1rem",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "8px",
    "background-color": "#ffffff",
    "transition": "border-color 0.15s ease"
  }
},
{
  ".ap-pub-card:hover": {
    "border-color": "#cbd5e1"
  }
},
{
  ".ap-pub-top-meta": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.35rem",
    "font-size": "0.75rem",
    "color": "var(--text-muted, #6b6b6b)",
    "margin-bottom": "0.3rem"
  }
},
{
  ".ap-pub-journal": {
    "font-weight": "600",
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-pub-year": {
    "font-weight": "600"
  }
},
{
  ".ap-pub-title": {
    "font-size": "0.94rem",
    "font-weight": "700",
    "line-height": "1.4",
    "color": "var(--text-main, #0d1b1c)",
    "margin": "0 0 0.35rem",
    "cursor": "pointer",
    "transition": "color 0.15s ease"
  }
},
{
  ".ap-pub-title:hover": {
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-pub-authors": {
    "display": "flex",
    "align-items": "center",
    "font-size": "0.74rem",
    "color": "var(--text-muted, #6b6b6b)",
    "margin-bottom": "0.65rem"
  }
},
{
  ".ap-pub-footer": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "flex-wrap": "wrap",
    "gap": "0.5rem",
    "padding-top": "0.55rem",
    "border-top": "1px dashed var(--border, #e6e6e6)"
  }
},
{
  ".ap-pub-tags-badges": {
    "display": "flex",
    "align-items": "center",
    "flex-wrap": "wrap",
    "gap": "0.45rem"
  }
},
{
  ".ap-pub-citations-badge": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.25rem",
    "font-size": "0.72rem",
    "color": "var(--text-muted, #6b6b6b)",
    "background-color": "var(--bg-chip, #f2f2f2)",
    "padding": "0.18rem 0.5rem",
    "border-radius": "4px"
  }
},
{
  ".ap-pub-citations-badge strong": {
    "color": "var(--text-main, #0d1b1c)"
  }
},
{
  ".ap-pub-doi-btn": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.25rem",
    "border": "1px solid var(--border, #e6e6e6)",
    "background-color": "#ffffff",
    "border-radius": "4px",
    "padding": "0.18rem 0.5rem",
    "font-size": "0.68rem",
    "color": "var(--text-muted, #6b6b6b)",
    "cursor": "pointer",
    "transition": "all 0.15s ease"
  }
},
{
  ".ap-pub-doi-btn:hover": {
    "border-color": "var(--primary, #ff7a33)",
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-pub-topic-tag": {
    "font-size": "0.65rem",
    "font-weight": "600",
    "background-color": "#eff6ff",
    "border": "1px solid #bfdbfe",
    "color": "#1d4ed8",
    "padding": "0.15rem 0.45rem",
    "border-radius": "4px"
  }
},
{
  ".ap-pub-view-link": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.2rem",
    "font-size": "0.74rem",
    "font-weight": "700",
    "color": "var(--primary, #ff7a33)",
    "cursor": "pointer"
  }
},
{
  ".ap-pub-view-link:hover": {
    "text-decoration": "underline"
  }
},
{
  ".ap-pubs-pagination": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "gap": "0.5rem",
    "margin-top": "1.1rem",
    "padding-top": "0.75rem",
    "border-top": "1px solid var(--border, #e6e6e6)"
  }
},
{
  ".ap-pubs-page-nav": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.3rem",
    "padding": "0.35rem 0.65rem",
    "border-radius": "6px",
    "border": "1px solid var(--border, #e6e6e6)",
    "background-color": "#ffffff",
    "font-size": "0.74rem",
    "font-weight": "600",
    "color": "var(--text-main, #0d1b1c)",
    "cursor": "pointer"
  }
},
{
  ".ap-pubs-page-nav:disabled": {
    "opacity": "0.4",
    "cursor": "not-allowed"
  }
},
{
  ".ap-pubs-page-numbers": {
    "display": "flex",
    "gap": "0.25rem"
  }
},
{
  ".ap-pubs-page-number": {
    "width": "28px",
    "height": "28px",
    "border-radius": "6px",
    "border": "1px solid var(--border, #e6e6e6)",
    "background-color": "#ffffff",
    "font-size": "0.74rem",
    "font-weight": "600",
    "color": "var(--text-main, #0d1b1c)",
    "cursor": "pointer"
  }
},
{
  ".ap-pubs-page-number.active": {
    "background-color": "var(--btn-dark, #071a1c)",
    "border-color": "var(--btn-dark, #071a1c)",
    "color": "#ffffff"
  }
},
{
  ".ap-cited-items": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.65rem"
  }
},
{
  ".ap-cited-card": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.85rem",
    "padding": "0.75rem 0.9rem",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "8px",
    "background-color": "#ffffff"
  }
},
{
  ".ap-cited-rank-box": {
    "flex-shrink": "0",
    "width": "32px",
    "height": "32px",
    "border-radius": "6px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "font-weight": "800",
    "font-size": "0.78rem",
    "background-color": "var(--bg-chip, #f2f2f2)",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-cited-rank-box.rank-1": {
    "background-color": "#fef3c7",
    "color": "#b45309"
  }
},
{
  ".ap-cited-rank-box.rank-2": {
    "background-color": "#f1f5f9",
    "color": "#475569"
  }
},
{
  ".ap-cited-rank-box.rank-3": {
    "background-color": "#ffedd5",
    "color": "#c2410c"
  }
},
{
  ".ap-cited-content": {
    "flex": "1",
    "min-width": "0"
  }
},
{
  ".ap-cited-title": {
    "font-size": "0.82rem",
    "font-weight": "700",
    "line-height": "1.35",
    "color": "var(--text-main, #0d1b1c)",
    "margin": "0 0 0.2rem",
    "overflow": "hidden",
    "display": "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": "2"
  }
},
{
  ".ap-cited-meta": {
    "font-size": "0.7rem",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-cited-journal": {
    "font-weight": "600",
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-cited-metric-side": {
    "flex-shrink": "0",
    "text-align": "right",
    "min-width": "60px"
  }
},
{
  ".ap-cited-citations-num": {
    "font-size": "1.05rem",
    "font-weight": "800",
    "color": "var(--primary, #ff7a33)",
    "line-height": "1"
  }
},
{
  ".ap-cited-citations-label": {
    "font-size": "0.62rem",
    "text-transform": "uppercase",
    "letter-spacing": "0.05em",
    "color": "var(--text-muted, #6b6b6b)",
    "font-weight": "600"
  }
},
{
  ".ap-journals-table": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.65rem"
  }
},
{
  ".ap-journal-card": {
    "padding": "0.75rem 0.9rem",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "8px",
    "background-color": "#ffffff"
  }
},
{
  ".ap-journal-top": {
    "display": "flex",
    "justify-content": "space-between",
    "align-items": "center",
    "margin-bottom": "0.4rem"
  }
},
{
  ".ap-journal-name-block": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.45rem",
    "min-width": "0"
  }
},
{
  ".ap-journal-rank-bullet": {
    "font-size": "0.7rem",
    "font-weight": "700",
    "color": "var(--text-muted, #6b6b6b)",
    "width": "16px"
  }
},
{
  ".ap-journal-name": {
    "font-size": "0.82rem",
    "font-weight": "700",
    "color": "var(--text-main, #0d1b1c)",
    "overflow": "hidden",
    "text-overflow": "ellipsis",
    "white-space": "nowrap"
  }
},
{
  ".ap-journal-q-badge": {
    "font-size": "0.62rem",
    "font-weight": "800",
    "background-color": "#fef3c7",
    "color": "#b45309",
    "border": "1px solid #fde68a",
    "padding": "0.1rem 0.35rem",
    "border-radius": "4px"
  }
},
{
  ".ap-journal-stat-block": {
    "font-size": "0.74rem",
    "color": "var(--text-muted, #6b6b6b)",
    "flex-shrink": "0"
  }
},
{
  ".ap-journal-stat-block strong": {
    "color": "var(--primary, #ff7a33)",
    "font-weight": "800"
  }
},
{
  ".ap-journal-bar-track": {
    "height": "4px",
    "border-radius": "999px",
    "background-color": "var(--bg-section, #ececec)",
    "overflow": "hidden",
    "margin-bottom": "0.4rem"
  }
},
{
  ".ap-journal-bar-fill": {
    "height": "100%",
    "border-radius": "999px",
    "background-color": "var(--primary, #ff7a33)",
    "transition": "width 0.6s ease"
  }
},
{
  ".ap-journal-sub-row": {
    "display": "flex",
    "justify-content": "space-between",
    "align-items": "center",
    "font-size": "0.68rem",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-journal-scores": {
    "display": "flex",
    "gap": "0.35rem"
  }
},
{
  ".ap-journal-score-pill": {
    "background-color": "var(--bg-chip, #f2f2f2)",
    "padding": "0.1rem 0.4rem",
    "border-radius": "3px",
    "font-weight": "600"
  }
},
{
  ".ap-collab-grid": {
    "display": "grid",
    "grid-template-columns": "repeat(2, 1fr)",
    "gap": "0.75rem"
  }
},
{
  ".ap-collab-card": {
    "display": "flex",
    "gap": "0.75rem",
    "padding": "0.75rem",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "8px",
    "background-color": "#ffffff"
  }
},
{
  ".ap-collab-avatar": {
    "flex-shrink": "0"
  }
},
{
  ".ap-collab-info": {
    "flex": "1",
    "min-width": "0"
  }
},
{
  ".ap-collab-name": {
    "font-size": "0.84rem",
    "font-weight": "700",
    "color": "var(--text-main, #0d1b1c)",
    "margin": "0 0 0.1rem"
  }
},
{
  ".ap-collab-inst": {
    "font-size": "0.72rem",
    "color": "var(--text-muted, #6b6b6b)",
    "margin-bottom": "0.2rem",
    "line-height": "1.3"
  }
},
{
  ".ap-collab-role": {
    "font-size": "0.68rem",
    "font-weight": "600",
    "color": "var(--primary, #ff7a33)",
    "margin-bottom": "0.3rem"
  }
},
{
  ".ap-collab-area-tag": {
    "margin-bottom": "0.35rem"
  }
},
{
  ".ap-collab-area-tag span": {
    "font-size": "0.64rem",
    "background-color": "var(--bg-chip, #f2f2f2)",
    "color": "var(--text-muted, #6b6b6b)",
    "padding": "0.12rem 0.45rem",
    "border-radius": "4px"
  }
},
{
  ".ap-collab-shared-row": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.3rem",
    "font-size": "0.7rem",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-collab-num": {
    "font-weight": "800",
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-network-wrapper": {
    "background-color": "#fafafa",
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "8px",
    "padding": "0.75rem",
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center"
  }
},
{
  ".ap-network-svg": {
    "width": "100%",
    "max-height": "250px"
  }
},
{
  ".ap-network-legend": {
    "display": "flex",
    "gap": "1.25rem",
    "margin-top": "0.5rem"
  }
},
{
  ".ap-network-legend-item": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.35rem",
    "font-size": "0.7rem",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-network-dot": {
    "width": "8px",
    "height": "8px",
    "border-radius": "50%"
  }
},
{
  ".ap-awards-timeline": {
    "display": "flex",
    "flex-direction": "column"
  }
},
{
  ".ap-award-item": {
    "display": "flex",
    "gap": "0.75rem",
    "padding-bottom": "0.85rem"
  }
},
{
  ".ap-award-item:last-of-type": {
    "padding-bottom": "0"
  }
},
{
  ".ap-award-year-col": {
    "width": "45px",
    "flex-shrink": "0",
    "text-align": "right"
  }
},
{
  ".ap-award-year-badge": {
    "font-size": "0.74rem",
    "font-weight": "800",
    "color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-award-timeline-col": {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
    "width": "16px",
    "flex-shrink": "0"
  }
},
{
  ".ap-award-timeline-dot": {
    "width": "8px",
    "height": "8px",
    "border-radius": "50%",
    "background-color": "var(--primary, #ff7a33)",
    "margin-top": "0.2rem"
  }
},
{
  ".ap-award-timeline-line": {
    "flex": "1",
    "width": "1px",
    "background-color": "var(--border, #e6e6e6)",
    "margin-top": "0.25rem"
  }
},
{
  ".ap-award-item:last-of-type .ap-award-timeline-line": {
    "display": "none"
  }
},
{
  ".ap-award-content-col": {
    "flex": "1",
    "padding-bottom": "0.25rem"
  }
},
{
  ".ap-award-title": {
    "font-size": "0.84rem",
    "font-weight": "700",
    "color": "var(--text-main, #0d1b1c)",
    "margin": "0 0 0.15rem"
  }
},
{
  ".ap-award-org": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.3rem",
    "font-size": "0.72rem",
    "font-weight": "600",
    "color": "var(--text-muted, #6b6b6b)",
    "margin-bottom": "0.25rem"
  }
},
{
  ".ap-award-desc": {
    "font-size": "0.73rem",
    "line-height": "1.45",
    "color": "var(--text-muted, #6b6b6b)",
    "margin": "0"
  }
},
{
  ".ap-edu-timeline": {
    "display": "flex",
    "flex-direction": "column"
  }
},
{
  ".ap-edu-row": {
    "display": "flex",
    "gap": "0.75rem",
    "min-height": "52px"
  }
},
{
  ".ap-edu-year-col": {
    "width": "52px",
    "flex-shrink": "0",
    "text-align": "right",
    "display": "flex",
    "flex-direction": "column",
    "align-items": "flex-end"
  }
},
{
  ".ap-edu-year": {
    "font-size": "0.74rem",
    "font-weight": "800",
    "color": "var(--text-main, #0d1b1c)",
    "line-height": "1"
  }
},
{
  ".ap-edu-type-tag": {
    "font-size": "0.58rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "letter-spacing": "0.04em",
    "padding": "0.1rem 0.35rem",
    "border-radius": "3px",
    "margin-top": "0.2rem"
  }
},
{
  ".ap-edu-type-tag.education": {
    "background-color": "#eff6ff",
    "color": "#1d4ed8"
  }
},
{
  ".ap-edu-type-tag.career": {
    "background-color": "#fef3c7",
    "color": "#b45309"
  }
},
{
  ".ap-edu-connector-col": {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
    "width": "16px",
    "flex-shrink": "0"
  }
},
{
  ".ap-edu-dot": {
    "width": "8px",
    "height": "8px",
    "border-radius": "50%",
    "margin-top": "0.15rem"
  }
},
{
  ".ap-edu-dot.education": {
    "background-color": "#1d4ed8"
  }
},
{
  ".ap-edu-dot.career": {
    "background-color": "var(--primary, #ff7a33)"
  }
},
{
  ".ap-edu-line": {
    "flex": "1",
    "width": "1px",
    "background-color": "var(--border, #e6e6e6)",
    "margin-top": "0.25rem"
  }
},
{
  ".ap-edu-row:last-of-type .ap-edu-line": {
    "display": "none"
  }
},
{
  ".ap-edu-info-col": {
    "flex": "1",
    "padding-bottom": "0.65rem"
  }
},
{
  ".ap-edu-degree": {
    "font-size": "0.84rem",
    "font-weight": "700",
    "color": "var(--text-main, #0d1b1c)",
    "margin": "0 0 0.15rem"
  }
},
{
  ".ap-edu-inst": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.3rem",
    "font-size": "0.72rem",
    "color": "var(--text-muted, #6b6b6b)",
    "margin-bottom": "0.1rem"
  }
},
{
  ".ap-edu-loc": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.3rem",
    "font-size": "0.68rem",
    "color": "var(--text-muted, #6b6b6b)"
  }
},
{
  ".ap-related-grid": {
    "display": "grid",
    "grid-template-columns": "repeat(3, 1fr)",
    "gap": "0.85rem"
  }
},
{
  ".ap-related-card": {
    "border": "1px solid var(--border, #e6e6e6)",
    "border-radius": "9px",
    "background-color": "#ffffff",
    "padding": "1rem 0.9rem 0.75rem",
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
    "text-align": "center",
    "transition": "all 0.15s ease"
  }
},
{
  ".ap-related-card:hover": {
    "border-color": "var(--primary, #ff7a33)",
    "box-shadow": "0 4px 12px rgba(255, 122, 51, 0.06)"
  }
},
{
  ".ap-related-avatar-box": {
    "margin-bottom": "0.6rem"
  }
},
{
  ".ap-related-body": {
    "flex": "1",
    "width": "100%"
  }
},
{
  ".ap-related-name": {
    "font-size": "0.86rem",
    "font-weight": "700",
    "color": "var(--text-main, #0d1b1c)",
    "margin": "0 0 0.15rem"
  }
},
{
  ".ap-related-inst": {
    "font-size": "0.72rem",
    "color": "var(--text-muted, #6b6b6b)",
    "margin-bottom": "0.1rem"
  }
},
{
  ".ap-related-role": {
    "font-size": "0.68rem",
    "font-weight": "600",
    "color": "var(--primary, #ff7a33)",
    "margin-bottom": "0.5rem"
  }
},
{
  ".ap-related-topics": {
    "display": "flex",
    "flex-wrap": "wrap",
    "justify-content": "center",
    "gap": "0.3rem",
    "margin-bottom": "0.75rem"
  }
},
{
  ".ap-related-topic-pill": {
    "font-size": "0.64rem",
    "background-color": "var(--bg-chip, #f2f2f2)",
    "color": "var(--text-muted, #6b6b6b)",
    "padding": "0.12rem 0.45rem",
    "border-radius": "999px"
  }
},
{
  ".ap-related-action-footer": {
    "width": "100%",
    "padding-top": "0.5rem",
    "border-top": "1px solid var(--border, #e6e6e6)"
  }
},
{
  ".ap-related-link": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.3rem",
    "font-size": "0.72rem",
    "font-weight": "700",
    "color": "var(--primary, #ff7a33)",
    "cursor": "pointer",
    "transition": "opacity 0.15s ease"
  }
},
{
  ".ap-related-link:hover": {
    "opacity": "0.8"
  }
},
{
  "@media (max-width: 1100px)": [
    {
      ".ap-metrics-strip": {
        "grid-template-columns": "repeat(3, 1fr)"
      }
    },
    {
      ".ap-metric-tile:nth-of-type(3)": {
        "border-right": "none"
      }
    },
    {
      ".ap-metric-tile:nth-of-type(1),\r\n  .ap-metric-tile:nth-of-type(2),\r\n  .ap-metric-tile:nth-of-type(3)": {
        "border-bottom": "1px solid var(--border, #e6e6e6)"
      }
    },
    {
      ".ap-hero-inner": {
        "grid-template-columns": "auto 1fr"
      }
    },
    {
      ".ap-hero-right": {
        "grid-column": "1 / -1",
        "width": "100%"
      }
    },
    {
      ".ap-related-grid": {
        "grid-template-columns": "repeat(2, 1fr)"
      }
    }
  ]
},
{
  "@media (max-width: 860px)": [
    {
      ".ap-grid-two-col": {
        "grid-template-columns": "1fr"
      }
    },
    {
      ".ap-impact-body": {
        "grid-template-columns": "1fr"
      }
    },
    {
      ".ap-areas-wrapper": {
        "grid-template-columns": "1fr",
        "justify-items": "center"
      }
    },
    {
      ".ap-areas-list-col": {
        "width": "100%"
      }
    },
    {
      ".ap-collab-grid": {
        "grid-template-columns": "1fr"
      }
    }
  ]
},
{
  "@media (max-width: 680px)": [
    {
      ".ap-hero-inner": {
        "grid-template-columns": "1fr",
        "text-align": "center"
      }
    },
    {
      ".ap-hero-left": {
        "align-items": "center"
      }
    },
    {
      ".ap-hero-institutions": {
        "align-items": "center"
      }
    },
    {
      ".ap-hero-focus-block": {
        "justify-content": "center"
      }
    },
    {
      ".ap-hero-meta-bar": {
        "justify-content": "center"
      }
    },
    {
      ".ap-metrics-strip": {
        "grid-template-columns": "repeat(2, 1fr)"
      }
    },
    {
      ".ap-metric-tile:nth-of-type(even)": {
        "border-right": "none"
      }
    },
    {
      ".ap-metric-tile:nth-of-type(1),\r\n  .ap-metric-tile:nth-of-type(2),\r\n  .ap-metric-tile:nth-of-type(3),\r\n  .ap-metric-tile:nth-of-type(4)": {
        "border-bottom": "1px solid var(--border, #e6e6e6)"
      }
    },
    {
      ".ap-pubs-filters": {
        "flex-direction": "column",
        "align-items": "stretch"
      }
    },
    {
      ".ap-pubs-sort-group": {
        "justify-content": "space-between"
      }
    },
    {
      ".ap-related-grid": {
        "grid-template-columns": "1fr"
      }
    }
  ]
},
{
  ".author-leaderboard-page": {
    "min-height": "100vh",
    "padding-top": "96px",
    "padding-bottom": "72px",
    "background": "var(--bg-main)",
    "color": "var(--text-main)"
  }
},
{
  ".author-leaderboard-breadcrumb > .MuiBox-root": {
    "margin-bottom": "0",
    "font-size": ".86rem"
  }
},
{
  ".author-leaderboard-breadcrumb__link": {
    "color": "var(--text-muted)",
    "cursor": "pointer",
    "transition": "color .2s ease"
  }
},
{
  ".author-leaderboard-breadcrumb__link:hover": {
    "color": "var(--primary)"
  }
},
{
  ".author-leaderboard-hero": {
    "position": "relative",
    "overflow": "hidden",
    "margin-bottom": "1.35rem",
    "padding": "clamp(1.5rem, 3vw, 2.75rem)",
    "border": "1px solid var(--border)",
    "border-radius": "18px",
    "background": "var(--bg-card)"
  }
},
{
  ".author-leaderboard-hero::after": {
    "content": "''",
    "position": "absolute",
    "inset": "-45% -9% auto auto",
    "width": "44%",
    "height": "125%",
    "border-radius": "999px",
    "background": "radial-gradient(circle, var(--primary-light), transparent 66%)",
    "opacity": ".75",
    "pointer-events": "none"
  }
},
{
  ".author-leaderboard-hero__content": {
    "position": "relative",
    "z-index": "1"
  }
},
{
  ".author-leaderboard-eyebrow": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": ".5rem",
    "margin-bottom": "1rem",
    "padding": ".52rem .82rem",
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "background": "var(--bg-main)",
    "color": "var(--text-muted)",
    "font-size": ".74rem",
    "font-weight": "700",
    "letter-spacing": ".1em",
    "text-transform": "uppercase"
  }
},
{
  ".author-leaderboard-eyebrow svg": {
    "color": "var(--primary)"
  }
},
{
  ".author-leaderboard-title": {
    "margin": "0 0 .75rem",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(2.1rem, 4vw, 3.15rem)",
    "font-weight": "700",
    "line-height": "1.08",
    "letter-spacing": "-.035em"
  }
},
{
  ".author-leaderboard-description": {
    "max-width": "780px",
    "margin": "0",
    "color": "var(--text-muted)",
    "line-height": "1.72"
  }
},
{
  ".author-leaderboard-back": {
    "color": "var(--text-main) !important",
    "font-size": ".9rem !important",
    "font-weight": "700 !important",
    "text-decoration": "none !important",
    "transition": "color .2s ease, transform .2s ease"
  }
},
{
  ".author-leaderboard-back:hover": {
    "color": "var(--primary) !important",
    "transform": "translateX(-2px)"
  }
},
{
  ".author-leaderboard-table-shell": {
    "border": "1px solid var(--border) !important",
    "border-radius": "14px !important",
    "background": "var(--bg-card) !important"
  }
},
{
  ".author-leaderboard-filter-control": {
    "display": "flex",
    "align-items": "center",
    "gap": ".5rem"
  }
},
{
  ".author-leaderboard-label": {
    "color": "var(--text-muted)",
    "font-size": ".8rem",
    "font-weight": "700",
    "white-space": "nowrap"
  }
},
{
  ".author-leaderboard-table-shell": {
    "overflow": "hidden"
  }
},
{
  ".author-leaderboard-table thead": {
    "background": "var(--bg-section)"
  }
},
{
  ".author-leaderboard-table th": {
    "color": "var(--text-muted)",
    "font-size": ".72rem",
    "font-weight": "700",
    "letter-spacing": ".06em",
    "text-transform": "uppercase"
  }
},
{
  ".author-leaderboard-rank-col": {
    "width": "70px"
  }
},
{
  ".author-leaderboard-row": {
    "cursor": "pointer",
    "transition": "background-color .15s ease"
  }
},
{
  ".author-leaderboard-row:hover": {
    "background": "var(--bg-section)"
  }
},
{
  ".author-leaderboard-author": {
    "display": "flex",
    "align-items": "center",
    "gap": "14px"
  }
},
{
  ".author-leaderboard-name": {
    "color": "var(--text-main)",
    "font-size": ".86rem",
    "font-weight": "700"
  }
},
{
  ".author-leaderboard-orcid": {
    "color": "var(--text-muted)",
    "font-size": ".72rem"
  }
},
{
  ".author-leaderboard-field-chip": {
    "display": "inline-flex",
    "padding": ".3rem .58rem",
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "background": "var(--bg-chip)",
    "color": "var(--text-muted)",
    "font-size": ".68rem",
    "font-weight": "700"
  }
},
{
  ".author-leaderboard-cell": {
    "color": "var(--text-main)",
    "font-size": ".83rem",
    "font-variant-numeric": "tabular-nums"
  }
},
{
  ".author-leaderboard-citations": {
    "color": "var(--q1-color)",
    "font-weight": "750"
  }
},
{
  ".author-list-page": {
    "min-height": "100vh",
    "padding-top": "96px",
    "padding-bottom": "72px",
    "background": "var(--bg-main)",
    "color": "var(--text-main)"
  }
},
{
  ".author-list-breadcrumb > .MuiBox-root": {
    "margin-bottom": "0",
    "font-size": ".86rem"
  }
},
{
  ".author-list-breadcrumb__link": {
    "color": "var(--text-muted)",
    "cursor": "pointer",
    "transition": "color .2s ease"
  }
},
{
  ".author-list-breadcrumb__link:hover": {
    "color": "var(--primary)"
  }
},
{
  ".author-list-hero": {
    "position": "relative",
    "overflow": "hidden",
    "margin-bottom": "1.35rem",
    "padding": "clamp(1.5rem, 3vw, 2.75rem)",
    "border": "1px solid var(--border)",
    "border-radius": "18px",
    "background": "var(--bg-card)"
  }
},
{
  ".author-list-hero::after": {
    "content": "''",
    "position": "absolute",
    "inset": "auto -8% -44% auto",
    "width": "46%",
    "height": "130%",
    "border-radius": "999px",
    "background": "radial-gradient(circle, var(--primary-light), transparent 64%)",
    "opacity": ".78",
    "pointer-events": "none"
  }
},
{
  ".author-list-hero__content": {
    "position": "relative",
    "z-index": "1"
  }
},
{
  ".author-list-eyebrow": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": ".5rem",
    "margin-bottom": "1rem",
    "padding": ".52rem .82rem",
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "background": "var(--bg-main)",
    "color": "var(--text-muted)",
    "font-size": ".74rem",
    "font-weight": "700",
    "letter-spacing": ".1em",
    "text-transform": "uppercase"
  }
},
{
  ".author-list-eyebrow svg": {
    "color": "var(--primary)"
  }
},
{
  ".author-list-title": {
    "margin": "0 0 .75rem",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(2.1rem, 4vw, 3.25rem)",
    "font-weight": "700",
    "line-height": "1.08",
    "letter-spacing": "-.035em"
  }
},
{
  ".author-list-description": {
    "max-width": "780px",
    "margin": "0",
    "color": "var(--text-muted)",
    "line-height": "1.72"
  }
},
{
  ".author-tabs": {
    "gap": ".25rem"
  }
},
{
  ".author-tabs .MuiLink-root": {
    "border": "1px solid transparent !important",
    "border-radius": "12px !important",
    "color": "var(--text-muted) !important",
    "font-weight": "600",
    "cursor": "pointer",
    "transition": "all .2s ease"
  }
},
{
  ".author-tabs .MuiLink-root:hover": {
    "background": "var(--primary-light)",
    "color": "var(--primary) !important"
  }
},
{
  ".author-tabs .MuiLink-root.Mui-selected": {
    "background": "var(--bg-card) !important",
    "border-color": "var(--border) !important",
    "color": "var(--primary) !important",
    "font-weight": "750"
  }
},
{
  ".author-stat-card,\r\n.author-card,\r\n.author-table-shell,\r\n.author-mobile-skeleton,\r\n.author-grid-skeleton": {
    "border": "1px solid var(--border) !important",
    "border-radius": "14px !important",
    "background": "var(--bg-card) !important"
  }
},
{
  ".author-stat-card": {
    "height": "100%",
    "padding": "1rem",
    "border-top": "3px solid var(--primary) !important",
    "transition": "transform .2s ease, border-color .2s ease"
  }
},
{
  ".author-stat-card:hover": {
    "transform": "translateY(-2px)",
    "border-color": "var(--primary) !important"
  }
},
{
  ".author-stat-header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "margin-bottom": ".55rem"
  }
},
{
  ".author-stat-label": {
    "color": "var(--text-muted)",
    "font-size": ".74rem",
    "font-weight": "700",
    "letter-spacing": ".08em",
    "text-transform": "uppercase"
  }
},
{
  ".author-stat-icon": {
    "color": "var(--primary)"
  }
},
{
  ".author-stat-value": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.55rem",
    "font-weight": "750",
    "letter-spacing": "-.025em"
  }
},
{
  ".author-stat-desc": {
    "margin-top": ".15rem",
    "color": "var(--text-muted)",
    "font-size": ".72rem"
  }
},
{
  ".author-filter-row": {
    "display": "flex"
  }
},
{
  ".author-subject-filter-col": {
    "margin-left": "32%"
  }
},
{
  "@media (max-width: 991.98px)": {
    ".author-subject-filter-col": {
      "margin-left": "0"
    }
  }
},
{
  ".author-subject-menu": {
    "position": "absolute",
    "top": "calc(100% + .35rem)",
    "z-index": "1050",
    "width": "100%",
    "max-height": "240px",
    "overflow-y": "auto",
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "background": "var(--bg-card)"
  }
},
{
  ".author-subject-option": {
    "width": "100%",
    "border": "0",
    "background": "transparent",
    "color": "var(--text-main)",
    "text-align": "left",
    "font-size": ".84rem",
    "transition": "background .2s ease, color .2s ease"
  }
},
{
  ".author-subject-option:hover": {
    "background": "var(--bg-chip)",
    "color": "var(--text-main)"
  }
},
{
  ".author-subject-option--muted": {
    "color": "var(--text-muted)"
  }
},
{
  ".author-card": {
    "height": "100%",
    "padding": "1.25rem",
    "cursor": "pointer",
    "transition": "transform .2s ease, border-color .2s ease, box-shadow .2s ease"
  }
},
{
  ".author-card:hover": {
    "transform": "translateY(-3px)",
    "border-color": "var(--primary) !important",
    "box-shadow": "0 14px 34px rgba(150, 88, 45, .08)"
  }
},
{
  ".author-card-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.05rem",
    "font-weight": "750"
  }
},
{
  ".author-card-institution": {
    "color": "var(--text-main)",
    "font-size": ".85rem",
    "font-weight": "550"
  }
},
{
  ".author-card-subinstitution": {
    "color": "var(--text-muted)",
    "font-size": ".78rem"
  }
},
{
  ".author-card-metrics": {
    "display": "flex",
    "gap": "1.5rem",
    "margin-top": "auto",
    "margin-bottom": "1rem"
  }
},
{
  ".author-metric-label": {
    "color": "var(--text-muted)",
    "font-size": ".68rem",
    "font-weight": "700",
    "letter-spacing": ".06em",
    "text-transform": "uppercase"
  }
},
{
  ".author-metric-value": {
    "margin-top": ".1rem",
    "color": "var(--text-main)",
    "font-size": "1.05rem",
    "font-weight": "750",
    "font-variant-numeric": "tabular-nums"
  }
},
{
  ".author-card-divider": {
    "margin": "1rem 0",
    "border-top": "1px solid var(--border)",
    "opacity": ".7"
  }
},
{
  ".author-tag": {
    "display": "inline-flex",
    "padding": ".3rem .58rem",
    "border": "1px solid transparent",
    "border-radius": "999px",
    "background": "var(--bg-chip)",
    "color": "var(--text-muted)",
    "font-size": ".72rem",
    "font-weight": "600",
    "transition": "all .15s ease"
  }
},
{
  ".author-tag:hover": {
    "border-color": "var(--primary)",
    "background": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".author-tag-empty": {
    "color": "var(--text-muted)",
    "font-size": ".75rem",
    "font-style": "italic"
  }
},
{
  ".author-table-shell": {
    "overflow": "hidden"
  }
},
{
  ".author-table thead": {
    "background": "var(--bg-section)"
  }
},
{
  ".author-table th": {
    "color": "var(--text-muted)",
    "font-size": ".72rem",
    "font-weight": "700",
    "letter-spacing": ".06em",
    "text-transform": "uppercase"
  }
},
{
  ".author-table-index-col": {
    "width": "60px"
  }
},
{
  ".author-table-action-col": {
    "width": "100px"
  }
},
{
  ".author-table-row": {
    "cursor": "pointer",
    "transition": "background-color .15s ease"
  }
},
{
  ".author-table-row:hover": {
    "background": "var(--bg-section)"
  }
},
{
  ".author-table-index": {
    "color": "var(--text-muted)",
    "font-size": ".85rem",
    "font-weight": "650"
  }
},
{
  ".author-table-name": {
    "color": "var(--text-main)",
    "font-size": ".86rem",
    "font-weight": "700"
  }
},
{
  ".author-table-orcid": {
    "color": "var(--text-muted)",
    "font-size": ".7rem"
  }
},
{
  ".author-table-cell": {
    "color": "var(--text-main)",
    "font-size": ".83rem"
  }
},
{
  ".author-table-org": {
    "max-width": "220px"
  }
},
{
  ".author-table-hindex": {
    "font-weight": "700"
  }
},
{
  ".author-table-link": {
    "color": "var(--primary)",
    "font-size": ".82rem",
    "font-weight": "700",
    "white-space": "nowrap"
  }
},
{
  ".author-grid-skeleton": {
    "min-height": "200px",
    "padding": "1.25rem"
  }
},
{
  ".author-mobile-skeleton": {
    "padding": "1rem"
  }
},
{
  ".author-pagination": {
  }
},
{
  ".author-card-animated": {
    "transition": "transform 0.2s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out"
  }
},
{
  ".author-card-animated:hover": {
    "transform": "translateY(-4px)",
    "box-shadow": "0 10px 25px rgba(0, 0, 0, 0.05)",
    "border-color": "var(--primary) !important"
  }
},
{
  ".catalog-search-page": {
    "background": "var(--bg-main)",
    "padding-top": "100px",
    "padding-bottom": "80px"
  }
},
{
  ".catalog-shell": {
    "max-width": "1180px"
  }
},
{
  ".catalog-breadcrumb": {
    "margin-bottom": "1.4rem",
    "font-size": "0.9rem"
  }
},
{
  ".catalog-breadcrumb .MuiLink-root,\r\n.catalog-breadcrumb .MuiTypography-root": {
    "color": "var(--text-muted) !important",
    "font-family": "var(--font-display) !important",
    "text-decoration": "none"
  }
},
{
  ".catalog-breadcrumb .MuiLink-root:hover": {
    "color": "var(--primary) !important"
  }
},
{
  ".catalog-hero": {
    "margin-bottom": "1.5rem"
  }
},
{
  ".catalog-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(2rem, 3vw, 3rem)",
    "font-weight": "600",
    "letter-spacing": "-0.035em",
    "line-height": "1.05",
    "margin-bottom": "0.65rem",
    "text-wrap": "balance"
  }
},
{
  ".catalog-subtitle": {
    "color": "var(--text-muted)",
    "max-width": "62ch",
    "margin": "0",
    "line-height": "1.65"
  }
},
{
  ".catalog-surface": {
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "16px"
  }
},
{
  ".catalog-filter-card": {
    "overflow": "visible !important"
  }
},
{
  ".catalog-filter-layout": {
    "display": "flex",
    "align-items": "flex-start",
    "justify-content": "space-between",
    "gap": "1rem",
    "width": "100%"
  }
},
{
  ".catalog-filter-toolbar": {
    "display": "flex",
    "flex": "1 1 auto",
    "flex-wrap": "wrap",
    "align-items": "center",
    "gap": "0.55rem",
    "min-width": "0",
    "justify-content": "center",
    "border": "1px solid var(--border) !important",
    "border-radius": "999px !important"
  }
},
{
  ".catalog-filter-dropdown .dropdown-toggle::after,\r\n.catalog-more-filter-button::after": {
    "display": "none !important"
  }
},
{
  ".catalog-filter-button": {
    "min-height": "42px",
    "max-width": "230px",
    "border": "none !important",
    "background": "var(--bg-card) !important",
    "color": "var(--text-main) !important",
    "display": "inline-flex !important",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "0.55rem",
    "font-family": "var(--font-display) !important",
    "font-size": "0.9rem !important",
    "font-weight": "600 !important",
    "padding": "0.52rem 0.8rem !important",
    "box-shadow": "none !important"
  }
},
{
  ".catalog-filter-button-label": {
    "overflow": "hidden",
    "text-overflow": "ellipsis",
    "white-space": "nowrap"
  }
},
{
  ".catalog-filter-button:hover,\r\n.catalog-filter-button:focus,\r\n.catalog-filter-button.show,\r\n.catalog-filter-button.is-active": {}
},
{
  ".catalog-filter-button:disabled": {
    "color": "var(--text-muted) !important",
    "opacity": "0.62"
  }
},
{
  ".catalog-more-filter-button": {
    "max-width": "none"
  }
},
{
  ".catalog-filter-menu": {
    "width": "min(320px, calc(100vw - 2rem))",
    "max-height": "420px",
    "overflow": "hidden",
    "border": "1px solid var(--border) !important",
    "border-radius": "10px !important",
    "background": "var(--bg-card) !important",
    "box-shadow": "0 18px 44px rgba(7, 26, 28, 0.12) !important",
    "padding": "0.55rem !important",
    "z-index": "1040"
  }
},
{
  ".catalog-more-filter-menu": {
    "width": "min(300px, calc(100vw - 2rem))"
  }
},
{
  ".catalog-filter-menu-header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "0.75rem",
    "color": "var(--text-main)",
    "font-size": "0.84rem",
    "font-weight": "600",
    "padding": "0.2rem 0.15rem 0.55rem"
  }
},
{
  ".catalog-filter-reset-btn": {
    "border": "0",
    "background": "transparent",
    "color": "var(--text-muted)",
    "font": "inherit",
    "font-size": "0.78rem",
    "font-weight": "600",
    "padding": "0"
  }
},
{
  ".catalog-filter-reset-btn:hover,\r\n.catalog-filter-reset-btn:focus": {
    "color": "var(--primary)",
    "text-decoration": "underline",
    "text-underline-offset": "4px"
  }
},
{
  ".catalog-menu-search": {
    "min-height": "38px",
    "border": "1px solid var(--border)",
    "border-radius": "7px",
    "display": "flex",
    "align-items": "center",
    "gap": "0.45rem",
    "color": "var(--text-muted)",
    "padding": "0 0.65rem",
    "margin-bottom": "0.5rem"
  }
},
{
  ".catalog-menu-search input": {
    "width": "100%",
    "border": "0",
    "outline": "0",
    "background": "transparent",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "0.86rem"
  }
},
{
  ".catalog-menu-search input::placeholder": {
    "color": "var(--text-muted)"
  }
},
{
  ".catalog-filter-options": {
    "max-height": "260px",
    "overflow-y": "auto",
    "padding-right": "0.15rem"
  }
},
{
  ".catalog-filter-option": {
    "width": "100%",
    "min-height": "38px",
    "border": "0",
    "border-radius": "7px",
    "background": "transparent",
    "color": "var(--text-main)",
    "display": "flex",
    "align-items": "center",
    "gap": "0.55rem",
    "padding": "0.45rem 0.5rem",
    "text-align": "left",
    "font-family": "var(--font-display)",
    "font-size": "0.88rem",
    "font-weight": "500"
  }
},
{
  ".catalog-filter-option:hover,\r\n.catalog-filter-option:focus-visible": {
    "background": "#f5f6f7",
    "outline": "0"
  }
},
{
  ".catalog-filter-option.is-selected": {
    "font-weight": "600"
  }
},
{
  ".catalog-option-check": {
    "width": "18px",
    "height": "18px",
    "border": "1px solid var(--border)",
    "border-radius": "5px",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "color": "var(--primary)",
    "flex": "0 0 auto"
  }
},
{
  ".catalog-filter-option.is-selected .catalog-option-check": {
    "border-color": "var(--primary)"
  }
},
{
  ".catalog-filter-empty": {
    "color": "var(--text-muted)",
    "font-size": "0.86rem",
    "padding": "0.8rem 0.5rem"
  }
},
{
  ".catalog-table-search-form": {
    "flex": "0 0 min(280px, 100%)",
    "margin-left": "auto"
  }
},
{
  ".catalog-table-search": {
    "box-shadow": "0 8px 18px rgba(7, 26, 28, 0.03)"
  }
},
{
  ".catalog-selected-filters": {
    "display": "flex",
    "flex-wrap": "wrap",
    "align-items": "center",
    "gap": "0.5rem",
    "margin-top": "0.75rem"
  }
},
{
  ".catalog-selected-filter-chip": {
    "min-height": "30px",
    "border": "none",
    "background": "var(--bg-card)",
    "color": "var(--text-main)",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.45rem",
    "padding": "0.25rem 0.55rem",
    "font-family": "var(--font-display)",
    "font-size": "0.9rem",
    "font-weight": "500"
  }
},
{
  ".catalog-selected-filter-chip:hover,\r\n.catalog-selected-filter-chip:focus": {
    "outline": "0"
  }
},
{
  ".catalog-clear-btn": {
    "color": "var(--primary) !important",
    "font-weight": "600 !important",
    "white-space": "nowrap",
    "text-decoration": "none !important"
  }
},
{
  ".catalog-clear-inline": {
    "border": "0",
    "background": "transparent",
    "padding": "0.25rem 0.15rem"
  }
},
{
  ".catalog-clear-btn:hover,\r\n.catalog-clear-btn:focus": {
    "color": "var(--primary) !important",
    "text-decoration": "underline !important",
    "text-underline-offset": "4px",
    "box-shadow": "none !important"
  }
},
{
  ".catalog-toggle-row": {
    "width": "100%",
    "min-height": "44px",
    "border": "0",
    "border-radius": "8px",
    "background": "transparent",
    "color": "var(--text-muted)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "0.75rem",
    "padding": "0.55rem 0.5rem",
    "font-family": "var(--font-display)",
    "font-size": "0.88rem",
    "font-weight": "500",
    "text-align": "left"
  }
},
{
  ".catalog-toggle-row:hover,\r\n.catalog-toggle-row:focus-visible": {
    "background": "#f5f6f7",
    "color": "var(--text-main)",
    "outline": "0"
  }
},
{
  ".catalog-toggle-row.is-active": {
    "color": "var(--text-main)",
    "font-weight": "600"
  }
},
{
  ".catalog-toggle-row .form-switch .form-check-input,\r\n.catalog-toggle-chip .form-switch .form-check-input": {
    "background-color": "var(--bg-chip) !important",
    "border-color": "var(--border) !important",
    "background-image": "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2394a3b8'/%3e%3c/svg%3e\") !important",
    "cursor": "pointer",
    "box-shadow": "none !important"
  }
},
{
  ".catalog-toggle-row .form-switch .form-check-input:checked,\r\n.catalog-toggle-chip .form-switch .form-check-input:checked": {
    "background-color": "var(--primary) !important",
    "border-color": "var(--primary) !important",
    "background-image": "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23ffffff'/%3e%3c/svg%3e\") !important"
  }
},
{
  ".catalog-toggle-row .form-switch .form-check-input:not(:checked):focus,\r\n.catalog-toggle-row .form-switch .form-check-input:not(:checked):active,\r\n.catalog-toggle-chip .form-switch .form-check-input:not(:checked):focus,\r\n.catalog-toggle-chip .form-switch .form-check-input:not(:checked):active": {
    "background-color": "var(--bg-chip) !important",
    "border-color": "var(--border) !important",
    "background-image": "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2394a3b8'/%3e%3c/svg%3e\") !important",
    "box-shadow": "none !important"
  }
},
{
  ".catalog-toggle-row .form-switch .form-check-input:checked:focus,\r\n.catalog-toggle-row .form-switch .form-check-input:checked:active,\r\n.catalog-toggle-chip .form-switch .form-check-input:checked:focus,\r\n.catalog-toggle-chip .form-switch .form-check-input:checked:active": {
    "background-color": "var(--primary) !important",
    "border-color": "var(--primary) !important",
    "box-shadow": "none !important"
  }
},
{
  ".catalog-toolbar": {
    "margin-bottom": "1rem"
  }
},
{
  ".catalog-count strong,\r\n.catalog-count .catalog-number": {
    "color": "var(--text-main)",
    "font-variant-numeric": "tabular-nums",
    "font-weight": "600"
  }
},
{
  ".catalog-sort-toggle": {
    "display": "inline-flex !important",
    "border": "none !important",
    "background": "transparent !important",
    "align-items": "center",
    "gap": "0.45rem",
    "font-size": "0.9rem !important"
  }
},
{
  ".catalog-dropdown-menu": {
    "border": "1px solid var(--border) !important",
    "border-radius": "12px !important",
    "box-shadow": "0 14px 34px rgba(7, 26, 28, 0.08)",
    "padding": "0.4rem !important"
  }
},
{
  ".catalog-dropdown-menu .MuiMenuItem-root": {
    "border-radius": "8px",
    "color": "var(--text-main)",
    "font-size": "0.9rem",
    "padding": "0.55rem 0.7rem"
  }
},
{
  ".catalog-dropdown-menu .MuiMenuItem-root:hover": {
    "background-color": "#f5f6f7"
  }
},
{
  ".catalog-table-card": {
    "overflow": "hidden",
    "border-radius": "16px"
  }
},
{
  ".catalog-table": {
    "color": "var(--text-main) !important"
  }
},
{
  ".catalog-table thead th": {
    "background": "var(--bg-chip) !important",
    "border-bottom": "1px solid var(--border) !important",
    "color": "var(--text-muted) !important",
    "font-size": "0.72rem",
    "font-weight": "600 !important",
    "letter-spacing": "0.08em",
    "text-transform": "uppercase",
    "white-space": "nowrap"
  }
},
{
  ".catalog-table tbody td": {
    "border-color": "var(--border) !important",
    "font-size": "0.92rem",
    "vertical-align": "middle"
  }
},
{
  ".catalog-table tbody tr": {
    "cursor": "pointer",
    "transition": "background-color 0.18s ease"
  }
},
{
  ".catalog-journal-name": {
    "color": "var(--text-main)",
    "font-weight": "600",
    "line-height": "1.35"
  }
},
{
  ".catalog-mono": {
    "font-variant-numeric": "tabular-nums"
  }
},
{
  ".catalog-badge": {
    "border": "none",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "font-size": "0.73rem",
    "font-weight": "600",
    "min-height": "25px",
    "padding": "0.18rem 0.55rem",
    "white-space": "nowrap"
  }
},
{
  ".catalog-access-badge": {
    "min-width": "86px"
  }
},
{
  ".catalog-follow-btn": {
    "background": "transparent",
    "border": "none",
    "color": "var(--text-main)",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.38rem",
    "font-size": "0.8rem",
    "font-weight": "600",
    "padding": "0.34rem 0.8rem",
    "white-space": "nowrap"
  }
},
{
  ".catalog-follow-btn:hover": {
    "transform": "none"
  }
},
{
  ".catalog-follow-btn.is-followed": {
    "color": "var(--text-muted)"
  }
},
{
  ".catalog-state-card": {
    "padding": "3rem 1.5rem",
    "text-align": "center",
    "margin-block": "1.5rem"
  }
},
{
  ".catalog-state-icon": {
    "color": "var(--primary)",
    "margin-bottom": "0.9rem"
  }
},
{
  ".catalog-state-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.35rem",
    "font-weight": "600",
    "margin-bottom": "0.45rem"
  }
},
{
  ".catalog-pagination .MuiPaginationItem-root": {
    "border-color": "var(--border) !important",
    "color": "var(--text-muted) !important",
    "font-weight": "600",
    "min-width": "36px",
    "text-align": "center"
  }
},
{
  ".catalog-pagination .MuiPaginationItem-root:hover": {
    "background": "var(--primary-light) !important",
    "color": "var(--primary) !important"
  }
},
{
  ".catalog-pagination .MuiPaginationItem-root.Mui-selected": {
    "background": "var(--primary) !important",
    "border-color": "var(--primary) !important",
    "color": "#fff !important"
  }
},
{
  ".catalog-pagination .MuiPaginationItem-root.Mui-disabled": {
    "background": "var(--bg-chip) !important",
    "color": "var(--text-muted) !important"
  }
},
{
  "@media (max-width: 768px)": [
    {
      ".catalog-search-page": {
        "padding-top": "86px"
      }
    },
    {
      ".catalog-filter-layout": {
        "flex-direction": "column",
        "gap": "0.75rem"
      }
    },
    {
      ".catalog-filter-toolbar,\r\n  .catalog-table-search-form,\r\n  .catalog-table-search": {
        "width": "100%"
      }
    },
    {
      ".catalog-filter-dropdown,\r\n  .catalog-filter-button": {
        "width": "100%",
        "max-width": "none"
      }
    },
    {
      ".catalog-filter-menu": {
        "width": "calc(100vw - 2rem)"
      }
    },
    {
      ".catalog-selected-filter-chip": {
        "max-width": "100%"
      }
    },
    {
      ".catalog-selected-filter-chip span": {
        "overflow": "hidden",
        "text-overflow": "ellipsis",
        "white-space": "nowrap"
      }
    }
  ]
},
{
  ".dashboard-card": {
    "height": "100%",
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "18px",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "overflow": "hidden"
  }
},
{
  ".dashboard-card__header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "1rem",
    "padding": "1rem 1.25rem 0.75rem"
  }
},
{
  ".dashboard-card__title": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.5rem",
    "color": "var(--text-main)",
    "font-size": "1rem",
    "font-weight": "600",
    "line-height": "1.25"
  }
},
{
  ".dashboard-card__title-icon": {
    "color": "var(--primary)",
    "flex-shrink": "0"
  }
},
{
  ".dashboard-card__action": {
    "flex-shrink": "0"
  }
},
{
  ".dashboard-card__body": {
    "padding": "0 1.25rem 1.25rem"
  }
},
{
  ".dashboard-link-action": {
    "border": "0",
    "background": "transparent",
    "color": "var(--text-muted)",
    "padding": "0",
    "font-family": "var(--font-display)",
    "font-size": "0.78rem",
    "font-weight": "600",
    "cursor": "pointer",
    "text-decoration": "none"
  }
},
{
  ".dashboard-link-action:hover": {
    "color": "var(--primary)",
    "text-decoration": "underline",
    "text-underline-offset": "4px"
  }
},
{
  ".dashboard-empty-state,\r\n.dashboard-error-state": {
    "display": "flex",
    "min-height": "160px",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content": "center",
    "gap": "0.5rem",
    "padding": "2rem 1rem",
    "text-align": "center"
  }
},
{
  ".dashboard-empty-state__icon": {
    "color": "var(--text-muted)"
  }
},
{
  ".dashboard-error-state__icon": {
    "color": "var(--primary)"
  }
},
{
  ".dashboard-state-title": {
    "color": "var(--text-main)",
    "font-size": "0.9rem",
    "font-weight": "600",
    "margin": "0"
  }
},
{
  ".dashboard-state-description": {
    "color": "var(--text-muted)",
    "font-size": "0.78rem",
    "margin": "0"
  }
},
{
  ".dashboard-stat-card": {
    "width": "100%",
    "min-height": "100%",
    "padding": "1rem",
    "border": "1px solid var(--border)",
    "border-radius": "16px",
    "background": "var(--bg-card)",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)"
  }
},
{
  ".dashboard-stat-card__header": {
    "display": "flex",
    "align-items": "flex-start",
    "justify-content": "space-between",
    "gap": "0.75rem"
  }
},
{
  ".dashboard-stat-card__label": {
    "color": "var(--text-muted)",
    "font-size": "0.78rem",
    "font-weight": "500",
    "line-height": "1.25"
  }
},
{
  ".dashboard-stat-card__icon": {
    "width": "2.25rem",
    "height": "2.25rem",
    "border-radius": "12px",
    "color": "var(--text-main)",
    "background": "var(--bg-section)",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "flex-shrink": "0"
  }
},
{
  ".dashboard-stat-card__value": {
    "color": "var(--text-main)",
    "font-size": "1.75rem",
    "font-weight": "700",
    "line-height": "1.1",
    "margin-top": "0.75rem"
  }
},
{
  ".dashboard-stat-card__footer": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "0.75rem",
    "margin-top": "0.75rem"
  }
},
{
  ".dashboard-stat-card__description,\r\n.dashboard-stat-card__trend": {
    "color": "var(--text-muted)",
    "font-size": "0.75rem"
  }
},
{
  ".dashboard-stat-card__skeleton-icon": {
    "width": "2.25rem",
    "height": "2.25rem",
    "border-radius": "12px"
  }
},
{
  ".dashboard-stat-card__skeleton-value": {
    "width": "54%",
    "height": "1.65rem",
    "border-radius": "8px",
    "margin-top": "0.85rem"
  }
},
{
  ".dashboard-stat-card__skeleton-label,\r\n.dashboard-stat-card__skeleton-trend": {
    "width": "70%",
    "height": "0.85rem",
    "border-radius": "8px",
    "margin-top": "0.75rem"
  }
},
{
  ".dashboard-project-list": {
    "display": "flex",
    "flex-direction": "column"
  }
},
{
  ".dashboard-project-item": {
    "border": "0",
    "border-bottom": "1px solid var(--border)",
    "background": "transparent",
    "color": "var(--text-main)",
    "cursor": "pointer",
    "display": "flex",
    "align-items": "center",
    "gap": "0.9rem",
    "padding": "0.9rem 0",
    "text-align": "left",
    "width": "100%",
    "font-family": "var(--font-display)",
    "transition": "background-color 0.15s ease"
  }
},
{
  ".dashboard-project-item:hover": {
    "background": "var(--bg-section)"
  }
},
{
  ".dashboard-project-avatar,\r\n.dashboard-author-avatar": {
    "background": "var(--btn-dark)",
    "color": "var(--bg-main)",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "flex-shrink": "0",
    "font-weight": "700"
  }
},
{
  ".dashboard-project-avatar": {
    "width": "40px",
    "height": "40px",
    "border-radius": "10px",
    "font-size": "0.75rem"
  }
},
{
  ".dashboard-project-info": {
    "min-width": "0",
    "flex": "1"
  }
},
{
  ".dashboard-project-name": {
    "color": "var(--text-main)",
    "font-size": "0.86rem",
    "font-weight": "600"
  }
},
{
  ".dashboard-project-meta": {
    "color": "var(--text-muted)",
    "font-size": "0.74rem"
  }
},
{
  ".dashboard-status-badge,\r\n.dashboard-field-badge": {
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "background": "var(--bg-chip)",
    "color": "var(--text-muted)",
    "display": "inline-flex",
    "align-items": "center",
    "white-space": "nowrap",
    "font-family": "var(--font-display)",
    "font-size": "0.7rem",
    "font-weight": "600",
    "padding": "0.22rem 0.55rem"
  }
},
{
  ".dashboard-status-badge.is-new": {
    "border-color": "transparent",
    "background": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".dashboard-keyword-list": {
    "display": "flex",
    "flex-wrap": "wrap",
    "gap": "0.5rem"
  }
},
{
  ".dashboard-keyword-pill": {
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "background": "var(--bg-chip)",
    "color": "var(--text-main)",
    "cursor": "pointer",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.25rem",
    "padding": "0.25rem 0.75rem",
    "font-family": "var(--font-display)",
    "font-size": "0.8rem",
    "font-weight": "500",
    "transition": "color 0.15s ease, border-color 0.15s ease"
  }
},
{
  ".dashboard-keyword-pill:hover": {
    "border-color": "var(--primary)",
    "color": "var(--primary)"
  }
},
{
  ".dashboard-keyword-count": {
    "opacity": "0.6",
    "font-size": "0.7rem"
  }
},
{
  ".dashboard-authors-table": {
    "overflow": "hidden"
  }
},
{
  ".dashboard-authors-header,\r\n.dashboard-author-row": {
    "display": "grid",
    "grid-template-columns": "40px 200px 1fr 80px 90px",
    "gap": "12px",
    "align-items": "center"
  }
},
{
  ".dashboard-authors-header": {
    "border-bottom": "1px solid var(--border)",
    "background": "var(--bg-section)",
    "padding": "0.6rem 1.25rem"
  }
},
{
  ".dashboard-authors-header span": {
    "color": "var(--text-muted)",
    "font-size": "0.72rem",
    "font-weight": "600",
    "letter-spacing": "0.05em",
    "text-transform": "uppercase"
  }
},
{
  ".dashboard-author-row": {
    "border-bottom": "1px solid var(--border)",
    "color": "var(--text-main)",
    "cursor": "pointer",
    "padding": "0.85rem 1.25rem",
    "transition": "background-color 0.15s ease"
  }
},
{
  ".dashboard-author-row:last-of-type": {
    "border-bottom": "0"
  }
},
{
  ".dashboard-author-row:hover": {
    "background": "var(--bg-section)"
  }
},
{
  ".dashboard-rank-badge": {
    "width": "28px",
    "height": "28px",
    "border-radius": "999px",
    "background": "var(--bg-section)",
    "color": "var(--text-muted)",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "font-size": "0.75rem",
    "font-weight": "700"
  }
},
{
  ".dashboard-rank-badge.is-first": {
    "background": "var(--text-main)",
    "color": "var(--bg-main)"
  }
},
{
  ".dashboard-rank-badge.is-second": {
    "background": "var(--border)",
    "color": "var(--text-main)"
  }
},
{
  ".dashboard-rank-badge.is-third": {
    "background": "var(--bg-section)",
    "color": "var(--text-main)"
  }
},
{
  ".dashboard-author-avatar": {
    "width": "32px",
    "height": "32px",
    "border-radius": "999px",
    "font-size": "0.7rem"
  }
},
{
  ".dashboard-author-name": {
    "color": "var(--text-main)",
    "font-size": "0.85rem",
    "font-weight": "600"
  }
},
{
  ".dashboard-author-meta,\r\n.dashboard-author-number": {
    "color": "var(--text-muted)",
    "font-size": "0.78rem"
  }
},
{
  ".dashboard-author-citations": {
    "color": "var(--text-main)",
    "font-size": "0.85rem",
    "font-weight": "600"
  }
},
{
  ".dashboard-chart-description": {
    "color": "var(--text-muted)",
    "font-size": "0.75rem",
    "margin": "0 0 1rem"
  }
},
{
  ".dashboard-chart-box": {
    "min-height": "160px"
  }
},
{
  "@media (max-width: 767.98px)": [
    {
      ".dashboard-authors-header": {
        "display": "none"
      }
    },
    {
      ".dashboard-author-row": {
        "display": "flex",
        "gap": "0.75rem"
      }
    },
    {
      ".dashboard-field-badge": {
        "display": "none"
      }
    }
  ]
},
{
  ".quick-access-card": {
    "height": "auto",
    "min-height": "172px",
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "18px",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "overflow": "hidden"
  }
},
{
  ".quick-access-header": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.5rem",
    "padding": "1rem 1.25rem 0.75rem",
    "color": "var(--text-main)",
    "font-size": "1rem",
    "font-weight": "600"
  }
},
{
  ".quick-access-header-icon": {
    "color": "var(--primary)",
    "flex-shrink": "0"
  }
},
{
  ".quick-access-body": {
    "padding": "0 1.25rem 1.25rem"
  }
},
{
  ".premium-qa-grid": {
    "display": "grid",
    "grid-template-columns": "repeat(2, 1fr)",
    "gap": "1rem"
  }
},
{
  ".premium-qa-tile": {
    "width": "100%",
    "display": "flex",
    "align-items": "center",
    "gap": "0.85rem",
    "padding": "0.9rem",
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "cursor": "pointer",
    "text-align": "left",
    "font-family": "var(--font-display)",
    "transition": "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease"
  }
},
{
  ".premium-qa-tile:hover,\r\n.premium-qa-tile:focus": {
    "border-color": "var(--primary)",
    "transform": "translateY(-2px)",
    "box-shadow": "0 10px 20px rgba(15, 23, 42, 0.04)"
  }
},
{
  ".premium-qa-icon-wrapper": {
    "width": "40px",
    "height": "40px",
    "border-radius": "10px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "flex-shrink": "0",
    "transition": "transform 0.2s ease"
  }
},
{
  ".premium-qa-tile:hover .premium-qa-icon-wrapper": {
    "transform": "scale(1.08)"
  }
},
{
  ".premium-qa-content": {
    "display": "flex",
    "flex-direction": "column",
    "min-width": "0"
  }
},
{
  ".premium-qa-title": {
    "color": "var(--text-main)",
    "font-size": "0.88rem",
    "font-weight": "600",
    "line-height": "1.25",
    "margin-bottom": "0.15rem"
  }
},
{
  ".premium-qa-desc": {
    "color": "var(--text-muted)",
    "font-size": "0.74rem",
    "line-height": "1.25",
    "white-space": "nowrap",
    "overflow": "hidden",
    "text-overflow": "ellipsis"
  }
},
{
  ".publication-trend-card": {
    "background-color": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "display": "flex",
    "flex-direction": "column",
    "overflow": "hidden",
    "font-family": "var(--font-display)"
  }
},
{
  ".ptc-header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "padding": "1rem 1.25rem",
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".ptc-title": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.5rem",
    "font-weight": "600",
    "color": "var(--text-main)",
    "font-size": "1rem"
  }
},
{
  ".ptc-actions": {
    "display": "flex",
    "align-items": "center"
  }
},
{
  ".ptc-body": {
    "padding": "1.25rem",
    "display": "flex",
    "flex-direction": "column",
    "flex": "1"
  }
},
{
  ".chart-range-select": {
    "background": "var(--bg-section)",
    "border": "1px solid var(--border)",
    "border-radius": "6px",
    "color": "var(--text-main)",
    "font-size": "0.75rem",
    "font-weight": "500",
    "padding": "0.25rem 0.5rem",
    "outline": "none",
    "cursor": "pointer",
    "font-family": "var(--font-display)",
    "transition": "border-color 0.15s ease"
  }
},
{
  ".chart-range-select:hover,\r\n.chart-range-select:focus": {
    "border-color": "var(--primary)"
  }
},
{
  ".chart-svg-tooltip": {
    "position": "absolute",
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "6px",
    "padding": "6px 10px",
    "font-family": "var(--font-display)",
    "box-shadow": "0 4px 12px rgba(15, 23, 42, 0.08)",
    "pointer-events": "none",
    "z-index": "10",
    "transition": "opacity 0.15s ease, transform 0.15s ease",
    "white-space": "nowrap"
  }
},
{
  "@media (max-width: 575.98px)": {
    ".premium-qa-grid": {
      "grid-template-columns": "1fr",
      "gap": "0.75rem"
    }
  }
},
{
  ".journal-detail-page": {
    "background-color": "var(--bg-main)"
  }
},
{
  ".journal-detail-page .journal-detail-shell": {
    "max-width": "1180px"
  }
},
{
  ".journal-detail-shell": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "1.5rem"
  }
},
{
  ".journal-breadcrumb .MuiBreadcrumbs-ol": {
    "margin-bottom": "0"
  }
},
{
  ".journal-breadcrumb .MuiBreadcrumbs-li > .MuiLink-root,\r\n.journal-breadcrumb .MuiBreadcrumbs-li > .MuiTypography-root": {
    "color": "var(--text-muted) !important",
    "font-family": "var(--font-display) !important",
    "font-size": "0.85rem",
    "font-weight": "500",
    "text-decoration": "none"
  }
},
{
  ".journal-breadcrumb .MuiBreadcrumbs-li > .MuiLink-root:hover": {
    "color": "var(--primary) !important"
  }
},
{
  ".journal-breadcrumb .MuiBreadcrumbs-li > .MuiTypography-root[aria-current='page']": {
    "color": "var(--text-main) !important"
  }
},
{
  ".journal-surface": {
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "box-shadow": "none"
  }
},
{
  ".journal-hero-card": {
    "position": "relative",
    "overflow": "hidden",
    "padding": "2rem",
    "border-top": "3px solid var(--primary)"
  }
},
{
  ".journal-hero-card::after": {
    "content": "\"\"",
    "position": "absolute",
    "inset": "auto -8rem -9rem auto",
    "width": "22rem",
    "height": "22rem",
    "background": "var(--primary-light)",
    "border-radius": "999px",
    "opacity": "0.72",
    "pointer-events": "none"
  }
},
{
  ".journal-hero-content": {
    "position": "relative",
    "z-index": "1"
  }
},
{
  ".journal-meta-line": {
    "display": "flex",
    "flex-wrap": "wrap",
    "gap": "0.45rem 0.8rem",
    "margin-bottom": "1rem",
    "color": "var(--text-muted)",
    "font-family": "var(--font-display)",
    "font-size": "0.84rem",
    "font-weight": "600"
  }
},
{
  ".journal-meta-line span:not(:last-of-type)::after": {
    "content": "\"•\"",
    "margin-left": "0.8rem",
    "color": "var(--border)"
  }
},
{
  ".journal-badge": {
    "display": "inline-flex",
    "align-items": "center",
    "width": "fit-content",
    "border-radius": "6px",
    "border": "1px solid var(--border)",
    "background": "var(--bg-chip)",
    "color": "var(--text-muted)",
    "font-family": "var(--font-display)",
    "font-size": "0.78rem",
    "font-weight": "600",
    "line-height": "1",
    "padding": "0.48rem 0.7rem"
  }
},
{
  ".journal-badge--q1": {
    "background": "rgba(47, 198, 70, 0.12)",
    "border-color": "rgba(47, 198, 70, 0.3)",
    "color": "var(--q1-color)"
  }
},
{
  ".journal-badge--accent": {
    "background": "var(--primary-light)",
    "border-color": "var(--border)",
    "color": "var(--primary)"
  }
},
{
  ".journal-badge--neutral": {
    "background": "var(--bg-chip)",
    "color": "var(--text-main)"
  }
},
{
  ".journal-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(2rem, 3.4vw, 3.1rem)",
    "font-weight": "600",
    "letter-spacing": "-0.03em",
    "line-height": "1.05",
    "margin-bottom": "1rem",
    "text-wrap": "balance"
  }
},
{
  ".journal-description": {
    "color": "var(--text-muted)",
    "font-family": "var(--font-display)",
    "font-size": "1rem",
    "line-height": "1.75",
    "max-width": "72ch",
    "margin-bottom": "1.25rem",
    "text-wrap": "pretty"
  }
},
{
  ".journal-category-list": {
    "display": "flex",
    "flex-wrap": "wrap",
    "gap": "0.5rem"
  }
},
{
  ".journal-category-chip": {
    "border": "0",
    "background": "transparent",
    "color": "var(--text-main)",
    "cursor": "pointer",
    "font-family": "var(--font-display)",
    "font-size": "0.95rem",
    "font-weight": "500",
    "padding": "0",
    "text-decoration": "none",
    "transition": "color 0.18s ease"
  }
},
{
  ".journal-category-chip:hover,\r\n.journal-category-chip:focus-visible": {
    "color": "var(--primary)",
    "outline": "none",
    "text-decoration": "underline",
    "text-underline-offset": "4px"
  }
},
{
  ".journal-metric-panel": {
    "display": "inline-flex",
    "flex-direction": "column",
    "align-items": "flex-end",
    "padding": "1.1rem 1.25rem",
    "min-width": "11rem"
  }
},
{
  ".journal-metric-value": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(2.4rem, 5vw, 4rem)",
    "font-variant-numeric": "tabular-nums",
    "font-weight": "700",
    "line-height": "1"
  }
},
{
  ".journal-metric-label": {
    "color": "var(--text-muted)",
    "font-family": "var(--font-display)",
    "font-size": "0.78rem",
    "font-weight": "600",
    "letter-spacing": "0.06em",
    "margin-top": "0.4rem",
    "text-transform": "uppercase"
  }
},
{
  ".journal-action-row": {
    "display": "flex",
    "flex-wrap": "wrap",
    "justify-content": "flex-end",
    "gap": "0.6rem",
    "margin-top": "1rem"
  }
},
{
  ".journal-outline-btn,\r\n.journal-text-btn,\r\n.journal-page-btn": {
    "align-items": "center",
    "border-radius": "6px !important",
    "display": "inline-flex",
    "font-family": "var(--font-display) !important",
    "font-size": "0.88rem !important",
    "font-weight": "600 !important",
    "gap": "0.45rem",
    "justify-content": "center",
    "transition": "background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease"
  }
},
{
  ".journal-outline-btn": {
    "background": "var(--bg-card) !important",
    "border": "1px solid var(--primary) !important",
    "border-radius": "12px !important",
    "color": "var(--primary) !important"
  }
},
{
  ".journal-outline-btn:hover,\r\n.journal-outline-btn:focus-visible": {
    "background": "var(--primary-light) !important",
    "border-color": "var(--primary) !important",
    "color": "var(--primary) !important"
  }
},
{
  ".journal-outline-btn.is-active": {
    "background": "var(--primary-light) !important",
    "color": "var(--primary) !important"
  }
},
{
  ".journal-text-btn": {
    "background": "transparent !important",
    "border": "0 !important",
    "box-shadow": "none !important",
    "color": "var(--text-main) !important",
    "padding-left": "0 !important",
    "padding-right": "0 !important",
    "text-decoration": "none !important"
  }
},
{
  ".journal-text-btn:hover,\r\n.journal-text-btn:focus-visible": {
    "color": "var(--primary) !important",
    "text-decoration": "underline !important",
    "text-underline-offset": "4px"
  }
},
{
  ".journal-meta-grid": {
    "padding": "1.25rem"
  }
},
{
  ".journal-meta-label": {
    "color": "var(--text-muted)",
    "font-family": "var(--font-display)",
    "font-size": "0.72rem",
    "font-weight": "600",
    "letter-spacing": "0.08em",
    "margin-bottom": "0.45rem",
    "text-transform": "uppercase"
  }
},
{
  ".journal-meta-value": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "0.98rem",
    "font-weight": "600",
    "line-height": "1.45"
  }
},
{
  ".journal-tabs-wrap": {
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "padding": "0 0.85rem"
  }
},
{
  ".journal-tabs-wrap .tab-nav-custom": {
    "overflow-x": "auto !important",
    "overflow-y": "hidden !important",
    "scrollbar-width": "none",
    "-ms-overflow-style": "none"
  }
},
{
  ".journal-tabs-wrap .tab-nav-custom::-webkit-scrollbar": {
    "display": "none"
  }
},
{
  ".journal-tabs-wrap .MuiLink-root": {
    "border": "0 !important",
    "border-bottom": "2px solid transparent !important",
    "color": "var(--text-muted) !important",
    "font-family": "var(--font-display) !important",
    "font-size": "0.92rem",
    "font-weight": "600 !important",
    "padding": "0.9rem 0.6rem !important"
  }
},
{
  ".journal-tabs-wrap .MuiLink-root:hover": {
    "color": "var(--primary) !important"
  }
},
{
  ".journal-tabs-wrap .MuiLink-root.Mui-selected": {
    "background": "transparent !important",
    "border-bottom-color": "var(--primary) !important",
    "color": "var(--primary) !important"
  }
},
{
  ".journal-tab-panel": {
    "padding": "1.5rem"
  }
},
{
  ".journal-section-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.28rem",
    "font-weight": "600",
    "line-height": "1.25",
    "margin-bottom": "1.25rem"
  }
},
{
  ".journal-empty-state": {
    "align-items": "center",
    "color": "var(--text-muted)",
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.6rem",
    "justify-content": "center",
    "min-height": "13rem",
    "padding": "2rem",
    "text-align": "center"
  }
},
{
  ".journal-ranking-table th": {
    "color": "var(--text-muted) !important",
    "font-size": "0.72rem",
    "font-weight": "600 !important",
    "letter-spacing": "0.08em",
    "padding": "0.9rem 0.75rem !important",
    "text-transform": "uppercase"
  }
},
{
  ".journal-ranking-table td": {
    "border-color": "var(--border) !important",
    "color": "var(--text-main) !important",
    "font-size": "0.92rem",
    "padding": "0.95rem 0.75rem !important",
    "vertical-align": "middle"
  }
},
{
  ".journal-ranking-table tbody tr:hover td": {
    "background": "transparent !important"
  }
},
{
  ".journal-number": {
    "font-family": "var(--font-display)",
    "font-variant-numeric": "tabular-nums",
    "font-weight": "700"
  }
},
{
  ".journal-muted-dash": {
    "color": "var(--text-muted)"
  }
},
{
  ".journal-volume-list": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.75rem"
  }
},
{
  ".journal-volume-card": {
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "overflow": "hidden",
    "transition": "border-color 0.18s ease, background-color 0.18s ease"
  }
},
{
  ".journal-volume-card.is-expanded": {
    "border-color": "var(--primary)"
  }
},
{
  ".journal-volume-header": {
    "align-items": "center",
    "cursor": "pointer",
    "display": "flex",
    "justify-content": "space-between",
    "gap": "1rem",
    "padding": "1rem 1.1rem",
    "user-select": "none"
  }
},
{
  ".journal-volume-header:hover": {
    "background": "#f5f6f7"
  }
},
{
  ".journal-volume-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "0.98rem",
    "font-weight": "700"
  }
},
{
  ".journal-volume-meta": {
    "color": "var(--text-muted)",
    "font-size": "0.88rem",
    "margin-left": "0.35rem"
  }
},
{
  ".journal-issue-panel": {
    "background": "var(--bg-main)",
    "border-top": "1px solid var(--border)",
    "padding": "0.85rem 1.1rem 1rem"
  }
},
{
  ".journal-issue-row": {
    "align-items": "center",
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-left": "3px solid var(--primary)",
    "border-radius": "8px",
    "display": "flex",
    "gap": "1rem",
    "justify-content": "space-between",
    "padding": "0.72rem 0.9rem"
  }
},
{
  ".journal-issue-title,\r\n.journal-article-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-weight": "700"
  }
},
{
  ".journal-article-card": {
    "background": "var(--bg-card) !important",
    "border": "1px solid var(--border) !important",
    "border-radius": "12px !important",
    "box-shadow": "none !important",
    "padding": "1.4rem"
  }
},
{
  ".journal-article-title": {
    "cursor": "pointer",
    "font-size": "1.08rem",
    "line-height": "1.45",
    "margin-bottom": "0.6rem",
    "text-decoration": "none",
    "transition": "color 0.18s ease"
  }
},
{
  ".journal-article-title:hover": {
    "color": "var(--primary)",
    "text-decoration": "underline",
    "text-underline-offset": "4px"
  }
},
{
  ".journal-article-abstract": {
    "color": "var(--text-muted)",
    "display": "-webkit-box",
    "font-size": "0.95rem",
    "line-height": "1.7",
    "margin-bottom": "1.1rem",
    "overflow": "hidden",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": "3"
  }
},
{
  ".journal-page-btn": {
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "color": "var(--text-muted)",
    "min-width": "2rem",
    "height": "2rem"
  }
},
{
  ".journal-page-btn:hover:not(:disabled)": {
    "border-color": "var(--primary)",
    "color": "var(--primary)"
  }
},
{
  ".journal-page-btn.is-active": {
    "background": "var(--primary-light)",
    "border-color": "var(--primary)",
    "color": "var(--primary)",
    "cursor": "default"
  }
},
{
  ".journal-page-btn:disabled": {
    "cursor": "not-allowed",
    "opacity": "0.45"
  }
},
{
  "@media (max-width: 767.98px)": [
    {
      ".journal-hero-card": {
        "padding": "1.4rem"
      }
    },
    {
      ".journal-metric-panel": {
        "align-items": "flex-start",
        "width": "100%"
      }
    },
    {
      ".journal-action-row": {
        "justify-content": "flex-start"
      }
    },
    {
      ".journal-issue-row": {
        "align-items": "flex-start",
        "flex-direction": "column"
      }
    }
  ]
},
{
  ".journal-list-page": {
    "min-height": "100vh",
    "padding-top": "96px",
    "padding-bottom": "72px",
    "background": "var(--bg-main)",
    "color": "var(--text-main)"
  }
},
{
  ".journal-list-breadcrumb > .MuiBox-root": {
    "margin-bottom": "0",
    "font-size": "0.86rem"
  }
},
{
  ".journal-list-breadcrumb__link": {
    "color": "var(--text-muted)",
    "cursor": "pointer",
    "transition": "color .2s ease"
  }
},
{
  ".journal-list-breadcrumb__link:hover": {
    "color": "var(--primary)"
  }
},
{
  ".journal-list-hero": {
    "position": "relative",
    "overflow": "hidden",
    "margin-bottom": "1.5rem",
    "padding": "clamp(1.5rem, 3vw, 2.75rem)",
    "border": "1px solid var(--border)",
    "border-radius": "18px",
    "background": "var(--bg-card)"
  }
},
{
  ".journal-list-hero::after": {
    "content": "''",
    "position": "absolute",
    "inset": "0 0 auto auto",
    "width": "42%",
    "height": "100%",
    "background": "radial-gradient(circle at top right, var(--primary-light), transparent 62%)",
    "pointer-events": "none",
    "opacity": ".65"
  }
},
{
  ".journal-list-hero__content": {
    "position": "relative",
    "z-index": "1"
  }
},
{
  ".journal-list-eyebrow": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": ".5rem",
    "margin-bottom": "1rem",
    "padding": ".52rem .82rem",
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "background": "var(--bg-main)",
    "color": "var(--text-muted)",
    "font-size": ".74rem",
    "font-weight": "700",
    "letter-spacing": ".1em",
    "text-transform": "uppercase"
  }
},
{
  ".journal-list-eyebrow svg": {
    "color": "var(--primary)"
  }
},
{
  ".journal-list-title": {
    "margin": "0 0 .75rem",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(2.1rem, 4vw, 3.25rem)",
    "font-weight": "700",
    "line-height": "1.08",
    "letter-spacing": "-.035em"
  }
},
{
  ".journal-list-description": {
    "max-width": "680px",
    "margin": "0",
    "color": "var(--text-muted)",
    "line-height": "1.72"
  }
},
{
  ".journal-stats-card,\r\n.journal-stats-skeleton,\r\n.journal-search-panel,\r\n.journal-table-shell,\r\n.journal-empty-state,\r\n.journal-loading-panel": {
    "border": "1px solid var(--border) !important",
    "border-radius": "14px !important",
    "background": "var(--bg-card) !important"
  }
},
{
  ".journal-stats-card": {
    "height": "100%",
    "transition": "transform .2s ease, border-color .2s ease"
  }
},
{
  ".journal-stats-card:hover": {
    "transform": "translateY(-2px)",
    "border-color": "var(--primary) !important"
  }
},
{
  ".journal-stats-label": {
    "color": "var(--text-muted)",
    "font-size": ".74rem",
    "font-weight": "700",
    "letter-spacing": ".08em",
    "text-transform": "uppercase"
  }
},
{
  ".journal-stats-value": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.8rem",
    "font-weight": "700",
    "letter-spacing": "-.02em"
  }
},
{
  ".journal-stats-icon": {
    "width": "48px",
    "height": "48px",
    "border-radius": "12px",
    "background": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".journal-stats-skeleton": {
    "padding": "1.25rem"
  }
},
{
  ".journal-stats-skeleton-label": {
    "width": "40%",
    "height": "14px"
  }
},
{
  ".journal-stats-skeleton-value": {
    "width": "60%",
    "height": "32px"
  }
},
{
  ".journal-search-panel": {
    "margin-bottom": "1.5rem",
    "padding": "1rem"
  }
},
{
  ".journal-search-group": {
    "overflow": "hidden",
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "background": "var(--bg-card)",
    "transition": "border-color .2s ease, box-shadow .2s ease"
  }
},
{
  ".journal-search-group:focus-within": {
    "border-color": "var(--primary)",
    "box-shadow": "0 0 0 3px var(--primary-light)"
  }
},
{
  ".journal-search-addon,\r\n.journal-search-input,\r\n.journal-search-clear": {
    "border": "0 !important",
    "background": "transparent !important",
    "color": "var(--text-muted) !important",
    "box-shadow": "none !important"
  }
},
{
  ".journal-search-input": {
    "color": "var(--text-main) !important",
    "font-size": ".92rem !important"
  }
},
{
  ".journal-search-submit": {
    "border": "1px solid var(--btn-dark) !important",
    "background": "var(--btn-dark) !important",
    "color": "var(--bg-card) !important",
    "font-size": ".9rem !important",
    "font-weight": "650 !important"
  }
},
{
  ".journal-filter-select": {
    "border": "1px solid var(--border) !important",
    "border-radius": "12px !important",
    "background-color": "var(--bg-card) !important",
    "color": "var(--text-main) !important",
    "font-size": ".92rem !important",
    "box-shadow": "none !important"
  }
},
{
  ".journal-filter-select:focus": {
    "border-color": "var(--primary) !important",
    "box-shadow": "0 0 0 3px var(--primary-light) !important"
  }
},
{
  ".journal-reset-btn": {
    "min-width": "80px",
    "color": "var(--text-muted) !important",
    "font-size": ".86rem !important",
    "font-weight": "650 !important",
    "text-decoration": "none !important"
  }
},
{
  ".journal-reset-btn:hover": {
    "color": "var(--primary) !important"
  }
},
{
  ".journal-alert": {
    "border": "1px solid var(--border) !important",
    "border-radius": "12px",
    "background": "var(--bg-card) !important",
    "color": "var(--text-main) !important"
  }
},
{
  ".journal-alert svg": {
    "color": "var(--primary)"
  }
},
{
  ".journal-loading-panel": {
    "padding": "1.25rem"
  }
},
{
  ".journal-skeleton-line": {
    "width": "100%",
    "height": "40px",
    "border-radius": "8px"
  }
},
{
  ".journal-skeleton-row": {
    "width": "100%",
    "height": "60px",
    "border-radius": "8px"
  }
},
{
  ".journal-table-shell": {
    "overflow": "hidden"
  }
},
{
  ".journal-table": {
    "min-width": "800px"
  }
},
{
  ".journal-table-index-col": {
    "width": "60px"
  }
},
{
  ".journal-table-action-col": {
    "width": "120px"
  }
},
{
  ".journal-table thead": {
    "background": "var(--bg-section)",
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".journal-table th": {
    "color": "var(--text-muted)",
    "font-size": ".72rem",
    "font-weight": "700",
    "letter-spacing": ".07em",
    "text-transform": "uppercase"
  }
},
{
  ".journal-table-row": {
    "cursor": "pointer",
    "transition": "background-color .2s ease"
  }
},
{
  ".journal-table-row:hover": {
    "background": "var(--bg-section)"
  }
},
{
  ".journal-index": {
    "color": "var(--text-muted)",
    "font-size": ".85rem",
    "font-weight": "650"
  }
},
{
  ".journal-name": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": ".96rem",
    "font-weight": "700"
  }
},
{
  ".journal-issn, .journal-cell-muted, .journal-metric-label": {
    "color": "var(--text-muted)"
  }
},
{
  ".journal-issn": {
    "margin-top": ".15rem",
    "font-size": ".75rem"
  }
},
{
  ".journal-cell-muted": {
    "font-size": ".85rem",
    "font-weight": "500"
  }
},
{
  ".journal-metric-value": {
    "color": "var(--text-main)",
    "font-size": ".9rem",
    "font-weight": "700"
  }
},
{
  ".journal-metric-label": {
    "font-size": ".7rem"
  }
},
{
  ".journal-quartile-badge, .journal-oa-badge": {
    "border-radius": "6px !important",
    "font-size": ".74rem !important",
    "font-weight": "700 !important"
  }
},
{
  ".journal-quartile-badge": {
    "border": "1px solid var(--border) !important",
    "background": "var(--bg-chip) !important",
    "color": "var(--text-muted) !important"
  }
},
{
  ".journal-quartile-badge--q1": {
    "border-color": "var(--q1-color) !important",
    "background": "var(--q1-color) !important",
    "color": "var(--bg-card) !important"
  }
},
{
  ".journal-quartile-badge--q2": {
    "border-color": "var(--primary) !important",
    "background": "var(--primary-light) !important",
    "color": "var(--primary) !important"
  }
},
{
  ".journal-quartile-badge--q3": {
    "border-color": "var(--primary) !important",
    "background": "var(--primary) !important",
    "color": "var(--bg-card) !important"
  }
},
{
  ".journal-quartile-badge--q4": {
    "background": "var(--bg-section) !important",
    "color": "var(--text-main) !important"
  }
},
{
  ".journal-oa-badge": {
    "display": "inline-flex !important",
    "align-items": "center",
    "gap": ".3rem",
    "border": "1px solid var(--border) !important",
    "background": "var(--primary-light) !important",
    "color": "var(--primary) !important"
  }
},
{
  ".journal-detail-link": {
    "color": "var(--primary) !important",
    "font-size": ".82rem !important",
    "font-weight": "700 !important",
    "text-decoration": "none !important"
  }
},
{
  ".journal-empty-state": {
    "padding": "3rem 1.5rem",
    "text-align": "center"
  }
},
{
  ".journal-empty-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-weight": "700"
  }
},
{
  ".journal-pagination": {
  }
},
{
  ".keyword-articles-page": {
    "min-height": "100vh",
    "padding-top": "88px",
    "padding-bottom": "60px",
    "background": "var(--bg-main)",
    "color": "var(--text-main)"
  }
},
{
  ".keyword-articles-breadcrumb > .MuiBox-root": {
    "margin-bottom": "0",
    "font-size": "0.86rem"
  }
},
{
  ".keyword-articles-back-link": {
    "color": "var(--text-muted) !important",
    "text-decoration": "none !important",
    "cursor": "pointer",
    "transition": "color 0.2s ease"
  }
},
{
  ".keyword-articles-back-link:hover": {
    "color": "var(--primary) !important"
  }
},
{
  ".keyword-articles-hero": {
    "position": "relative",
    "overflow": "hidden",
    "margin-bottom": "2rem",
    "padding": "clamp(1.5rem, 3vw, 3rem)",
    "border": "1px solid var(--border)",
    "border-radius": "18px",
    "background": "var(--bg-card)"
  }
},
{
  ".keyword-articles-hero::after": {
    "content": "''",
    "position": "absolute",
    "inset": "0 0 auto auto",
    "width": "44%",
    "height": "100%",
    "pointer-events": "none",
    "background": "radial-gradient(circle at top right, var(--primary-light), transparent 62%)",
    "opacity": "0.65"
  }
},
{
  ".keyword-articles-hero__content": {
    "position": "relative",
    "z-index": "1"
  }
},
{
  ".keyword-articles-eyebrow": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.5rem",
    "margin-bottom": "1.25rem",
    "padding": "0.55rem 0.85rem",
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "background": "var(--bg-main)"
  }
},
{
  ".keyword-articles-eyebrow svg": {
    "color": "var(--primary)"
  }
},
{
  ".keyword-articles-eyebrow span": {
    "color": "var(--text-muted)",
    "font-size": "0.74rem",
    "font-weight": "700",
    "letter-spacing": "0.1em",
    "text-transform": "uppercase"
  }
},
{
  ".keyword-articles-title,\r\n.keyword-articles-empty-title,\r\n.keyword-article-item__title,\r\n.keyword-articles-section-title,\r\n.keyword-article-state-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-weight": "700"
  }
},
{
  ".keyword-articles-title": {
    "margin": "0 0 0.85rem",
    "font-size": "clamp(2rem, 4vw, 3.2rem)",
    "line-height": "1.12",
    "letter-spacing": "-0.03em"
  }
},
{
  ".keyword-articles-summary": {
    "margin": "0",
    "color": "var(--text-muted)",
    "font-size": "1rem",
    "line-height": "1.72"
  }
},
{
  ".keyword-articles-summary strong": {
    "color": "var(--text-main)"
  }
},
{
  ".keyword-articles-empty-title": {
    "margin": "0 0 0.2rem",
    "font-size": "1.8rem"
  }
},
{
  ".keyword-articles-heading": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "1rem",
    "margin-bottom": "1.25rem"
  }
},
{
  ".keyword-articles-section-title": {
    "margin": "0",
    "font-size": "1.3rem"
  }
},
{
  ".keyword-articles-return": {
    "color": "var(--text-muted) !important",
    "text-decoration": "none !important",
    "font-size": "0.9rem !important"
  }
},
{
  ".keyword-articles-return:hover": {
    "color": "var(--primary) !important"
  }
},
{
  ".keyword-article-list": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.9rem"
  }
},
{
  ".keyword-article-card,\r\n.keyword-article-skeleton,\r\n.keyword-article-state": {
    "border": "1px solid var(--border)",
    "border-radius": "14px",
    "background": "var(--bg-card)"
  }
},
{
  ".keyword-article-card": {
    "padding": "1.25rem",
    "transition": "border-color 0.2s ease, transform 0.2s ease"
  }
},
{
  ".keyword-article-card:hover": {
    "border-color": "var(--primary)",
    "transform": "translateY(-2px)"
  }
},
{
  ".keyword-article-meta": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.75rem",
    "flex-wrap": "wrap",
    "margin-bottom": "0.85rem"
  }
},
{
  ".keyword-article-year,\r\n.keyword-article-journal,\r\n.keyword-article-citations": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.35rem",
    "color": "var(--text-muted)",
    "font-size": "0.85rem"
  }
},
{
  ".keyword-article-year": {
    "padding": "0.28rem 0.55rem",
    "border": "1px solid var(--btn-dark)",
    "border-radius": "999px",
    "background": "var(--btn-dark)",
    "color": "var(--bg-card)",
    "font-weight": "700"
  }
},
{
  ".keyword-article-item__title": {
    "margin": "0 0 0.55rem",
    "font-size": "1.15rem",
    "line-height": "1.38"
  }
},
{
  ".keyword-article-doi": {
    "margin": "0 0 0.8rem",
    "color": "var(--text-muted)",
    "font-size": "0.88rem"
  }
},
{
  ".keyword-article-abstract": {
    "margin": "0 0 1rem",
    "color": "var(--text-muted)",
    "font-size": "0.95rem",
    "display": "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    "overflow": "hidden"
  }
},
{
  ".keyword-article-action,\r\n.keyword-article-retry": {
    "border": "1px solid var(--btn-dark) !important",
    "background": "var(--btn-dark) !important",
    "color": "var(--bg-card) !important",
    "font-weight": "650 !important",
    "transition": "transform 0.2s ease, opacity 0.2s ease"
  }
},
{
  ".keyword-article-action:hover,\r\n.keyword-article-retry:hover": {
    "opacity": "0.92",
    "transform": "translateY(-1px)"
  }
},
{
  ".keyword-article-action": {
    "border-radius": "10px !important"
  }
},
{
  ".keyword-article-skeleton": {
    "padding": "1.25rem"
  }
},
{
  ".keyword-article-state": {
    "padding": "3rem 1.5rem",
    "text-align": "center"
  }
},
{
  ".keyword-article-state-icon": {
    "color": "var(--primary)"
  }
},
{
  ".keyword-article-state-title": {
    "margin": "0 0 0.5rem",
    "font-size": "1.25rem"
  }
},
{
  ".keyword-article-pagination": {
  }
},
{
  "@media (max-width: 767.98px)": {
    ".keyword-articles-heading": {
      "flex-direction": "column",
      "align-items": "flex-start"
    }
  }
},
{
  ".keyword-list-page": {
    "min-height": "100vh",
    "padding-top": "88px",
    "padding-bottom": "60px",
    "background": "var(--bg-main)",
    "color": "var(--text-main)"
  }
},
{
  ".keyword-list-breadcrumb > .MuiBox-root": {
    "margin-bottom": "0",
    "font-size": "0.86rem"
  }
},
{
  ".keyword-list-hero": {
    "position": "relative",
    "overflow": "hidden",
    "margin-bottom": "1.5rem",
    "padding": "clamp(1.5rem, 3vw, 3rem)",
    "border": "1px solid var(--border)",
    "border-radius": "18px",
    "background": "var(--bg-card)"
  }
},
{
  ".keyword-list-hero::after": {
    "content": "''",
    "position": "absolute",
    "inset": "0 0 auto auto",
    "width": "44%",
    "height": "100%",
    "pointer-events": "none",
    "background": "radial-gradient(circle at top right, var(--primary-light), transparent 62%)",
    "opacity": "0.65"
  }
},
{
  ".keyword-list-hero__content": {
    "position": "relative",
    "z-index": "1"
  }
},
{
  ".keyword-list-eyebrow,\r\n.keyword-list-total-pill,\r\n.keyword-active-filter__term": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.5rem",
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "background": "var(--bg-main)"
  }
},
{
  ".keyword-list-eyebrow": {
    "margin-bottom": "1.25rem",
    "padding": "0.55rem 0.85rem"
  }
},
{
  ".keyword-list-eyebrow svg,\r\n.keyword-list-total-pill svg": {
    "color": "var(--primary)"
  }
},
{
  ".keyword-list-eyebrow span": {
    "color": "var(--text-muted)",
    "font-size": "0.74rem",
    "font-weight": "700",
    "letter-spacing": "0.1em",
    "text-transform": "uppercase"
  }
},
{
  ".keyword-list-title": {
    "margin": "0 0 0.9rem",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(2.1rem, 4vw, 3.4rem)",
    "font-weight": "700",
    "line-height": "1.08",
    "letter-spacing": "-0.035em"
  }
},
{
  ".keyword-list-description": {
    "max-width": "680px",
    "margin": "0 0 1rem",
    "color": "var(--text-muted)",
    "font-size": "1.02rem",
    "line-height": "1.72"
  }
},
{
  ".keyword-list-total-pill": {
    "padding": "0.55rem 0.85rem",
    "color": "var(--text-muted)",
    "font-size": "0.9rem"
  }
},
{
  ".keyword-list-total-pill strong": {
    "color": "var(--text-main)"
  }
},
{
  ".keyword-toolbar": {
    "display": "flex",
    "align-items": "flex-start",
    "gap": "1rem",
    "flex-wrap": "wrap",
    "margin-bottom": "1.25rem",
    "padding": "1rem",
    "border": "1px solid var(--border)",
    "border-radius": "14px",
    "background": "var(--bg-card)"
  }
},
{
  ".keyword-toolbar__search": {
    "flex": "1 1 20rem"
  }
},
{
  ".keyword-search-group": {
    "overflow": "hidden",
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "background": "var(--bg-card)",
    "transition": "border-color 0.2s ease, box-shadow 0.2s ease"
  }
},
{
  ".keyword-search-group:focus-within": {
    "border-color": "var(--primary)",
    "box-shadow": "0 0 0 3px var(--primary-light)"
  }
},
{
  ".keyword-search-addon,\r\n.keyword-search-input,\r\n.keyword-search-clear": {
    "border": "0 !important",
    "background": "var(--bg-card) !important",
    "color": "var(--text-muted) !important",
    "box-shadow": "none !important"
  }
},
{
  ".keyword-search-input": {
    "color": "var(--text-main) !important",
    "font-size": "0.95rem !important"
  }
},
{
  ".keyword-search-submit,\r\n.keyword-card-action,\r\n.keyword-retry-btn": {
    "border": "1px solid var(--btn-dark) !important",
    "background": "var(--btn-dark) !important",
    "color": "var(--bg-card) !important",
    "font-weight": "650 !important",
    "transition": "transform 0.2s ease, opacity 0.2s ease"
  }
},
{
  ".keyword-search-submit:hover,\r\n.keyword-card-action:hover,\r\n.keyword-retry-btn:hover": {
    "opacity": "0.92",
    "transform": "translateY(-1px)"
  }
},
{
  ".keyword-sort-toggle": {
    "border": "1px solid var(--border) !important",
    "background": "var(--bg-card) !important",
    "color": "var(--text-main) !important",
    "font-weight": "650 !important"
  }
},
{
  ".keyword-sort-menu": {
    "border": "1px solid var(--border) !important",
    "background": "var(--bg-card) !important"
  }
},
{
  ".keyword-sort-menu .MuiMenuItem-root.Mui-selected,\r\n.keyword-sort-menu .MuiMenuItem-root:active": {
    "background": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".keyword-active-filter": {
    "display": "flex",
    "align-items": "center",
    "gap": "0.5rem",
    "margin-bottom": "1rem",
    "color": "var(--text-muted)",
    "font-size": "0.9rem"
  }
},
{
  ".keyword-active-filter__term": {
    "padding": "0.28rem 0.75rem",
    "color": "var(--text-main)",
    "font-weight": "650"
  }
},
{
  ".keyword-active-filter__clear": {
    "color": "var(--text-muted) !important",
    "font-size": "0.85rem !important",
    "text-decoration": "none !important"
  }
},
{
  ".keyword-active-filter__clear:hover": {
    "color": "var(--primary) !important"
  }
},
{
  ".keyword-card,\r\n.keyword-state-card,\r\n.keyword-skeleton-card": {
    "border": "1px solid var(--border)",
    "border-radius": "14px",
    "background": "var(--bg-card)"
  }
},
{
  ".keyword-card": {
    "height": "100%",
    "padding": "1.25rem",
    "transition": "border-color 0.2s ease, transform 0.2s ease"
  }
},
{
  ".keyword-card:hover": {
    "border-color": "var(--primary)",
    "transform": "translateY(-2px)"
  }
},
{
  ".keyword-card-label": {
    "margin-bottom": "0.55rem",
    "color": "var(--text-muted)",
    "font-size": "0.72rem",
    "font-weight": "700",
    "letter-spacing": "0.1em",
    "text-transform": "uppercase"
  }
},
{
  ".keyword-card-title": {
    "margin": "0",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.16rem",
    "font-weight": "700",
    "line-height": "1.35"
  }
},
{
  ".keyword-card-icon": {
    "color": "var(--text-muted)"
  }
},
{
  ".keyword-count-badge,\r\n.keyword-topic-badge": {
    "border": "1px solid var(--border) !important",
    "border-radius": "999px !important",
    "padding": "0.34rem 0.55rem !important",
    "font-weight": "700 !important"
  }
},
{
  ".keyword-count-badge": {
    "background": "var(--btn-dark) !important",
    "color": "var(--bg-card) !important"
  }
},
{
  ".keyword-topic-badge": {
    "background": "var(--bg-chip) !important",
    "color": "var(--text-main) !important"
  }
},
{
  ".keyword-card-action": {
    "border-radius": "10px !important",
    "padding": "0.62rem 1rem !important",
    "font-size": "0.9rem !important"
  }
},
{
  ".keyword-state-card": {
    "padding": "3rem 1.5rem",
    "text-align": "center"
  }
},
{
  ".keyword-state-icon": {
    "color": "var(--primary)"
  }
},
{
  ".keyword-state-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.25rem",
    "font-weight": "700"
  }
},
{
  ".keyword-skeleton-card": {
    "padding": "1.25rem"
  }
},
{
  ".keyword-pagination": {
  }
},
{
  "@media (max-width: 767.98px)": [
    {
      ".keyword-toolbar": {
        "display": "block"
      }
    },
    {
      ".keyword-sort-toggle": {
        "width": "100%",
        "margin-top": "0.75rem"
      }
    }
  ]
},
{
  ".mobile-drawer.offcanvas": {
    "--mnav-ease": "cubic-bezier(0.22, 1, 0.36, 1)",
    "--mnav-fast": "0.18s",
    "--mnav-base": "0.24s",
    "--mnav-red": "#d94848",
    "--mnav-red-soft": "rgba(217, 72, 72, 0.08)",
    "width": "min(88vw, 380px)",
    "height": "100dvh",
    "box-sizing": "border-box",
    "background": "var(--bg-card)",
    "color": "var(--text-main)",
    "border-left": "1px solid var(--border)",
    "box-shadow": "-18px 0 44px rgba(7, 26, 28, 0.12)",
    "overflow-x": "hidden"
  }
},
{
  ".mobile-drawer .mnav-header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "12px",
    "padding": "14px 16px",
    "border-bottom": "1px solid var(--border)",
    "background": "var(--bg-card)"
  }
},
{
  ".mnav-brand": {
    "display": "flex",
    "align-items": "center",
    "gap": "10px",
    "margin": "0",
    "font-family": "var(--font-display)",
    "font-weight": "800",
    "font-size": "16px",
    "color": "var(--text-main)"
  }
},
{
  ".mnav-brand-mark": {
    "flex": "none",
    "width": "28px",
    "height": "28px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "border-radius": "8px",
    "background": "var(--btn-dark)",
    "color": "#fff",
    "box-shadow": "0 2px 8px rgba(7, 26, 28, 0.18)"
  }
},
{
  ".mnav-close": {
    "flex": "none",
    "width": "34px",
    "height": "34px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "border": "1px solid var(--border)",
    "border-radius": "10px",
    "background": "transparent",
    "color": "var(--text-muted)",
    "cursor": "pointer",
    "transition": "background var(--mnav-fast) var(--mnav-ease),\r\n    color var(--mnav-fast) var(--mnav-ease),\r\n    transform var(--mnav-fast) var(--mnav-ease)"
  }
},
{
  ".mnav-close:hover": {
    "background": "rgba(0, 0, 0, 0.05)",
    "color": "var(--text-main)"
  }
},
{
  ".mnav-close:active": {
    "transform": "scale(0.92)"
  }
},
{
  ".mobile-drawer .mnav-body": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "14px",
    "padding": "16px",
    "overflow-y": "auto",
    "overflow-x": "hidden"
  }
},
{
  ".mnav-user-card": {
    "display": "flex",
    "align-items": "center",
    "gap": "10px",
    "padding": "12px",
    "border": "1px solid var(--border)",
    "border-radius": "14px",
    "background": "rgba(7, 26, 28, 0.025)"
  }
},
{
  ".mnav-avatar": {
    "flex": "none",
    "width": "38px",
    "height": "38px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "border-radius": "50%",
    "background": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".mnav-user-meta": {
    "flex": "1",
    "min-width": "0",
    "display": "flex",
    "flex-direction": "column",
    "gap": "1px"
  }
},
{
  ".mnav-user-name": {
    "font-size": "13px",
    "font-weight": "700",
    "color": "var(--text-main)"
  }
},
{
  ".mnav-user-email": {
    "font-size": "12px",
    "color": "var(--text-muted)",
    "white-space": "nowrap",
    "overflow": "hidden",
    "text-overflow": "ellipsis"
  }
},
{
  ".mnav-user-card .mnav-coin-badge": {
    "flex": "none",
    "max-width": "96px",
    "padding": "4px 10px"
  }
},
{
  ".mnav-signout": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "gap": "8px",
    "width": "100%",
    "padding": "10px 12px",
    "border": "1px solid rgba(217, 72, 72, 0.35)",
    "border-radius": "12px",
    "background": "var(--mnav-red-soft)",
    "color": "var(--mnav-red)",
    "font-size": "13px",
    "font-weight": "700",
    "cursor": "pointer",
    "transition": "background var(--mnav-fast) var(--mnav-ease),\r\n    transform var(--mnav-fast) var(--mnav-ease)"
  }
},
{
  ".mnav-signout:hover": {
    "background": "rgba(217, 72, 72, 0.14)"
  }
},
{
  ".mnav-signout:active": {
    "transform": "scale(0.98)"
  }
},
{
  ".mnav-nav": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "6px"
  }
},
{
  ".mnav-item": {
    "display": "flex",
    "align-items": "center",
    "gap": "12px",
    "width": "100%",
    "min-height": "50px",
    "padding": "0 14px",
    "border": "0",
    "border-radius": "12px",
    "background": "transparent",
    "color": "var(--text-main)",
    "font-size": "14px",
    "font-weight": "600",
    "text-align": "left",
    "cursor": "pointer",
    "transition": "background var(--mnav-fast) var(--mnav-ease),\r\n    color var(--mnav-fast) var(--mnav-ease),\r\n    transform var(--mnav-fast) var(--mnav-ease)"
  }
},
{
  ".mnav-item:hover": {
    "background": "rgba(7, 26, 28, 0.05)"
  }
},
{
  ".mnav-item:active": {
    "transform": "scale(0.985)",
    "background": "rgba(7, 26, 28, 0.08)"
  }
},
{
  ".mnav-item-icon": {
    "flex": "none",
    "color": "var(--text-muted)",
    "transition": "color var(--mnav-fast) var(--mnav-ease)"
  }
},
{
  ".mnav-item > span": {
    "flex": "1",
    "min-width": "0",
    "white-space": "nowrap",
    "overflow": "hidden",
    "text-overflow": "ellipsis"
  }
},
{
  ".mnav-item-caret": {
    "flex": "none",
    "color": "var(--text-muted)",
    "opacity": "0.7",
    "transition": "transform var(--mnav-fast) var(--mnav-ease)"
  }
},
{
  ".mnav-item:hover .mnav-item-caret": {
    "transform": "translateX(2px)"
  }
},
{
  ".mnav-item.is-active": {
    "background": "var(--primary-light)",
    "color": "var(--primary)"
  }
},
{
  ".mnav-item.is-active .mnav-item-icon,\r\n.mnav-item.is-active .mnav-item-caret": {
    "color": "var(--primary)"
  }
},
{
  ".mnav-dash-btn": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "gap": "8px",
    "width": "100%",
    "padding": "12px 14px",
    "border": "0",
    "border-radius": "14px",
    "background": "var(--btn-dark)",
    "color": "#fff",
    "font-size": "13px",
    "font-weight": "700",
    "cursor": "pointer",
    "box-shadow": "0 6px 16px rgba(7, 26, 28, 0.18)",
    "transition": "opacity var(--mnav-fast) var(--mnav-ease),\r\n    box-shadow var(--mnav-fast) var(--mnav-ease),\r\n    transform var(--mnav-fast) var(--mnav-ease)"
  }
},
{
  ".mnav-dash-btn:hover": {
    "opacity": "0.92",
    "box-shadow": "0 8px 20px rgba(7, 26, 28, 0.24)"
  }
},
{
  ".mnav-dash-btn:active": {
    "transform": "scale(0.98)"
  }
},
{
  ".mnav-auth": {
    "display": "flex",
    "gap": "8px"
  }
},
{
  ".mnav-auth-btn": {
    "flex": "1",
    "padding": "11px 12px",
    "border-radius": "12px",
    "font-size": "13px",
    "font-weight": "700",
    "cursor": "pointer",
    "transition": "background var(--mnav-fast) var(--mnav-ease),\r\n    opacity var(--mnav-fast) var(--mnav-ease),\r\n    transform var(--mnav-fast) var(--mnav-ease)"
  }
},
{
  ".mnav-auth-btn:active": {
    "transform": "scale(0.97)"
  }
},
{
  ".mnav-auth-btn.is-outline": {
    "border": "1px solid var(--border)",
    "background": "transparent",
    "color": "var(--text-main)"
  }
},
{
  ".mnav-auth-btn.is-outline:hover": {
    "background": "rgba(0, 0, 0, 0.04)"
  }
},
{
  ".mnav-auth-btn.is-solid": {
    "border": "0",
    "background": "var(--primary)",
    "color": "#fff"
  }
},
{
  ".mnav-auth-btn.is-solid:hover": {
    "opacity": "0.92"
  }
},
{
  ".mnav-lang": {
    "border": "1px solid var(--border)",
    "border-radius": "14px",
    "background": "rgba(7, 26, 28, 0.02)",
    "overflow": "hidden"
  }
},
{
  ".mnav-lang-row": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "10px",
    "width": "100%",
    "padding": "12px 14px",
    "border": "0",
    "background": "transparent",
    "font-size": "13px",
    "font-weight": "600",
    "color": "var(--text-main)",
    "cursor": "pointer",
    "transition": "background var(--mnav-fast) var(--mnav-ease)"
  }
},
{
  ".mnav-lang-row:hover": {
    "background": "rgba(0, 0, 0, 0.03)"
  }
},
{
  ".mnav-lang-label": {
    "display": "flex",
    "align-items": "center",
    "gap": "8px",
    "color": "var(--text-main)"
  }
},
{
  ".mnav-lang-label svg": {
    "color": "var(--primary)"
  }
},
{
  ".mnav-lang-value": {
    "display": "flex",
    "align-items": "center",
    "gap": "6px",
    "color": "var(--text-muted)",
    "font-weight": "600"
  }
},
{
  ".mnav-lang-caret": {
    "transition": "transform var(--mnav-base) var(--mnav-ease)"
  }
},
{
  ".mnav-lang-caret.is-open": {
    "transform": "rotate(180deg)"
  }
},
{
  ".mnav-lang-collapse": {
    "display": "grid",
    "grid-template-rows": "0fr",
    "overflow": "hidden",
    "visibility": "hidden",
    "transition": "grid-template-rows var(--mnav-base) var(--mnav-ease),\r\n    visibility 0s linear var(--mnav-base)"
  }
},
{
  ".mnav-lang-collapse.is-open": {
    "grid-template-rows": "1fr",
    "visibility": "visible",
    "transition": "grid-template-rows var(--mnav-base) var(--mnav-ease)"
  }
},
{
  ".mnav-lang-clip": {
    "min-height": "0",
    "overflow": "hidden"
  }
},
{
  ".mnav-lang-list": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "2px",
    "padding": "4px",
    "border-top": "1px solid var(--border)"
  }
},
{
  ".mnav-lang-option": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "10px",
    "width": "100%",
    "padding": "10px 12px",
    "border": "0",
    "border-radius": "10px",
    "background": "transparent",
    "font-size": "13px",
    "color": "var(--text-main)",
    "text-align": "left",
    "cursor": "pointer",
    "transition": "background var(--mnav-fast) var(--mnav-ease)"
  }
},
{
  ".mnav-lang-option:hover": {
    "background": "rgba(0, 0, 0, 0.04)"
  }
},
{
  ".mnav-lang-option.is-active": {
    "background": "var(--primary-light)",
    "color": "var(--primary)",
    "font-weight": "700"
  }
},
{
  ".mnav-lang-option.is-active svg": {
    "color": "var(--primary)"
  }
},
{
  ".mnav-footer": {
    "margin-top": "auto",
    "padding-top": "4px",
    "text-align": "center",
    "font-size": "11px",
    "color": "var(--text-muted)"
  }
},
{
  ".mnav-stagger": {
    "animation": "mnav-rise 0.3s var(--mnav-ease) both"
  }
},
{
  "@keyframes mnav-rise": [
    {
      "from": {
        "opacity": "0",
        "transform": "translateY(8px)"
      }
    },
    {
      "to": {
        "opacity": "1",
        "transform": "translateY(0)"
      }
    }
  ]
},
{
  "@media (prefers-reduced-motion: reduce)": [
    {
      ".mnav-stagger": {
        "animation": "none"
      }
    },
    {
      ".mnav-lang-collapse": {
        "transition": "none"
      }
    }
  ]
},
{
  ".landing-page": {
    "background": "var(--bg-main)",
    "color": "var(--text-main)"
  }
},
{
  ".landing-section": {
    "position": "relative",
    "overflow": "hidden"
  }
},
{
  ".landing-container": {
    "max-width": "1180px"
  }
},
{
  ".landing-hero": {
    "min-height": "100dvh",
    "display": "flex",
    "flex-direction": "column",
    "justify-content": "space-between",
    "padding-block": "6rem 2rem",
    "background": "var(--bg-main)"
  }
},
{
  ".landing-hero::before": {
    "content": "\"\"",
    "position": "absolute",
    "inset": "0",
    "background-image": "linear-gradient(var(--bg-section) 1px, transparent 1px),\r\n    linear-gradient(90deg, var(--bg-section) 1px, transparent 1px)",
    "background-size": "44px 44px",
    "opacity": "0.48",
    "mask-image": "radial-gradient(circle at 50% 36%, #000 0%, transparent 72%)",
    "pointer-events": "none"
  }
},
{
  ".landing-hero__inner": {
    "position": "relative",
    "z-index": "2",
    "display": "grid",
    "grid-template-columns": "minmax(0, 1.04fr) minmax(320px, 0.72fr)",
    "align-items": "center",
    "gap": "clamp(2rem, 5vw, 5.5rem)",
    "flex": "1"
  }
},
{
  ".landing-hero__copy": {
    "text-align": "left"
  }
},
{
  ".landing-eyebrow": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.55rem",
    "width": "fit-content",
    "margin-bottom": "1.35rem",
    "padding": "0.45rem 0.75rem",
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "background": "var(--bg-card)",
    "color": "var(--primary)",
    "font-size": "0.75rem",
    "font-weight": "600",
    "letter-spacing": "0.05em"
  }
},
{
  ".landing-title": {
    "max-width": "860px",
    "margin": "0 0 1.15rem",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(2.7rem, 6.2vw, 5.8rem)",
    "font-weight": "600",
    "line-height": "0.98",
    "letter-spacing": "-0.055em",
    "text-wrap": "balance"
  }
},
{
  ".landing-title__accent": {
    "color": "var(--primary)",
    "font-family": "var(--font-display)"
  }
},
{
  ".landing-lede": {
    "max-width": "610px",
    "margin": "0 0 2rem",
    "color": "var(--text-muted)",
    "font-size": "clamp(1rem, 1.25vw, 1.12rem)",
    "line-height": "1.72"
  }
},
{
  ".landing-actions": {
    "display": "flex",
    "flex-wrap": "wrap",
    "align-items": "center",
    "gap": "0.9rem"
  }
},
{
  ".landing-btn": {
    "min-height": "48px",
    "border-radius": "999px !important",
    "display": "inline-flex !important",
    "align-items": "center",
    "justify-content": "center",
    "gap": "0.55rem",
    "padding-inline": "1.35rem !important",
    "font-size": "0.9rem !important",
    "font-weight": "600 !important",
    "white-space": "nowrap",
    "transition": "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, color 0.18s ease, background-color 0.18s ease"
  }
},
{
  ".landing-btn:active": {
    "transform": "translateY(1px) scale(0.99)"
  }
},
{
  ".landing-btn--primary": {
    "background": "var(--primary) !important",
    "border": "1px solid var(--primary) !important",
    "color": "#fff !important",
    "box-shadow": "0 10px 24px rgba(255, 122, 51, 0.18)"
  }
},
{
  ".landing-btn--primary:hover": {
    "transform": "translateY(-1px)",
    "box-shadow": "0 14px 30px rgba(255, 122, 51, 0.22)"
  }
},
{
  ".landing-btn--secondary": {
    "background": "var(--bg-card) !important",
    "border": "1px solid var(--border) !important",
    "color": "var(--text-main) !important"
  }
},
{
  ".landing-btn--secondary:hover": {
    "background": "var(--primary-light) !important",
    "border-color": "var(--primary) !important",
    "color": "var(--primary) !important"
  }
},
{
  ".landing-visual": {
    "position": "relative",
    "min-height": "430px"
  }
},
{
  ".landing-rank-card": {
    "position": "relative",
    "z-index": "1",
    "border": "1px solid var(--border)",
    "border-radius": "18px",
    "background": "var(--bg-card)",
    "box-shadow": "0 22px 60px rgba(7, 26, 28, 0.07)",
    "overflow": "hidden"
  }
},
{
  ".landing-rank-card__header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "1rem",
    "padding": "1rem 1.1rem",
    "border-bottom": "1px solid var(--border)",
    "background": "var(--bg-chip)"
  }
},
{
  ".landing-rank-card__title": {
    "color": "var(--text-main)",
    "font-weight": "700",
    "font-size": "0.88rem"
  }
},
{
  ".landing-rank-card__meta": {
    "color": "var(--text-muted)",
    "font-size": "0.75rem"
  }
},
{
  ".landing-rank-row": {
    "display": "grid",
    "grid-template-columns": "42px 1fr auto",
    "align-items": "center",
    "gap": "0.9rem",
    "padding": "0.95rem 1.1rem",
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".landing-rank-row:last-of-type": {
    "border-bottom": "0"
  }
},
{
  ".landing-rank-index": {
    "color": "var(--primary)",
    "font-weight": "700",
    "font-variant-numeric": "tabular-nums"
  }
},
{
  ".landing-rank-name": {
    "color": "var(--text-main)",
    "font-weight": "600",
    "font-size": "0.92rem"
  }
},
{
  ".landing-rank-sub": {
    "color": "var(--text-muted)",
    "font-size": "0.76rem",
    "margin-top": "0.15rem"
  }
},
{
  ".landing-rank-badge": {
    "border": "1px solid rgba(47, 198, 70, 0.3)",
    "border-radius": "7px",
    "background": "rgba(47, 198, 70, 0.12)",
    "color": "var(--q1-color)",
    "font-size": "0.73rem",
    "font-weight": "700",
    "padding": "0.18rem 0.5rem"
  }
},
{
  ".landing-annotation": {
    "position": "absolute",
    "right": "-0.5rem",
    "bottom": "1.6rem",
    "max-width": "210px",
    "padding": "0.9rem",
    "border": "1px solid var(--border)",
    "border-radius": "14px",
    "background": "var(--primary-light)",
    "color": "var(--text-main)",
    "box-shadow": "0 16px 34px rgba(7, 26, 28, 0.08)"
  }
},
{
  ".landing-annotation strong": {
    "display": "block",
    "margin-bottom": "0.25rem",
    "font-family": "var(--font-display)",
    "font-size": "1.2rem",
    "font-weight": "600"
  }
},
{
  ".landing-annotation span": {
    "color": "var(--text-muted)",
    "font-size": "0.78rem",
    "line-height": "1.45"
  }
},
{
  ".landing-stats": {
    "position": "relative",
    "z-index": "2",
    "border-top": "1px solid var(--border)",
    "background": "rgba(255, 255, 255, 0.72)",
    "backdrop-filter": "blur(10px)"
  }
},
{
  ".landing-stat": {
    "padding-block": "1rem",
    "text-align": "left"
  }
},
{
  ".landing-stat__value": {
    "display": "block",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(1.55rem, 2.4vw, 2.35rem)",
    "font-weight": "600",
    "line-height": "1",
    "letter-spacing": "-0.025em"
  }
},
{
  ".landing-stat__value.is-accent": {
    "color": "var(--primary)"
  }
},
{
  ".landing-stat__label": {
    "display": "block",
    "margin-top": "0.45rem",
    "color": "var(--text-muted)",
    "font-size": "0.72rem",
    "font-weight": "600",
    "letter-spacing": "0.08em",
    "text-transform": "uppercase"
  }
},
{
  ".landing-section-pad": {
    "padding-block": "clamp(4rem, 8vw, 7rem)"
  }
},
{
  ".landing-section--muted": {
    "background": "var(--bg-section)",
    "border-block": "1px solid var(--border)"
  }
},
{
  ".landing-section-header": {
    "max-width": "680px",
    "margin-bottom": "2.5rem"
  }
},
{
  ".landing-section-header.is-centered": {
    "margin-inline": "auto",
    "text-align": "center"
  }
},
{
  ".landing-section-title": {
    "margin": "0 0 0.85rem",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(2rem, 3.6vw, 3.3rem)",
    "font-weight": "600",
    "line-height": "1.06",
    "letter-spacing": "-0.04em",
    "text-wrap": "balance"
  }
},
{
  ".landing-section-text": {
    "color": "var(--text-muted)",
    "font-size": "1rem",
    "line-height": "1.65",
    "margin": "0"
  }
},
{
  ".landing-feature-grid": {
    "display": "grid",
    "grid-template-columns": "repeat(6, 1fr)",
    "gap": "1rem"
  }
},
{
  ".landing-feature-card": {
    "min-height": "210px",
    "grid-column": "span 2",
    "display": "flex",
    "flex-direction": "column",
    "align-items": "flex-start",
    "padding": "1.35rem",
    "border": "1px solid var(--border)",
    "border-radius": "16px",
    "background": "var(--bg-card)",
    "transition": "transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease"
  }
},
{
  ".landing-feature-card:nth-of-type(1),\r\n.landing-feature-card:nth-of-type(4)": {
    "grid-column": "span 3"
  }
},
{
  ".landing-feature-card:hover": {
    "transform": "translateY(-3px)",
    "border-color": "var(--primary)",
    "background": "var(--primary-light)"
  }
},
{
  ".landing-feature-icon": {
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "44px",
    "height": "44px",
    "margin-bottom": "1.1rem",
    "border": "1px solid var(--border)",
    "border-radius": "12px",
    "background": "var(--bg-chip)",
    "color": "var(--primary)"
  }
},
{
  ".landing-feature-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.18rem",
    "font-weight": "600",
    "margin-bottom": "0.55rem"
  }
},
{
  ".landing-feature-text": {
    "color": "var(--text-muted)",
    "font-size": "0.9rem",
    "line-height": "1.62",
    "margin": "0"
  }
},
{
  ".landing-steps": {
    "position": "relative",
    "display": "grid",
    "grid-template-columns": "repeat(4, 1fr)",
    "gap": "1rem"
  }
},
{
  ".landing-steps::before": {
    "content": "\"\"",
    "position": "absolute",
    "top": "28px",
    "left": "12%",
    "right": "12%",
    "border-top": "1px dashed var(--text-muted)",
    "opacity": "0.35"
  }
},
{
  ".landing-step": {
    "position": "relative",
    "z-index": "1",
    "padding": "0 1rem",
    "text-align": "center"
  }
},
{
  ".landing-step__number": {
    "width": "56px",
    "height": "56px",
    "margin": "0 auto 1.25rem",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "border-radius": "999px",
    "background": "var(--btn-dark)",
    "color": "#fff",
    "font-family": "var(--font-display)",
    "font-size": "1.2rem",
    "font-weight": "600"
  }
},
{
  ".landing-step__title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.1rem",
    "font-weight": "600",
    "margin-bottom": "0.55rem"
  }
},
{
  ".landing-step__text": {
    "max-width": "250px",
    "margin": "0 auto",
    "color": "var(--text-muted)",
    "font-size": "0.88rem",
    "line-height": "1.62"
  }
},
{
  ".landing-cta": {
    "padding-block": "clamp(4rem, 8vw, 7rem)",
    "border-top": "1px solid var(--border)",
    "background": "var(--bg-main)",
    "text-align": "center"
  }
},
{
  ".landing-cta__inner": {
    "max-width": "780px",
    "margin-inline": "auto",
    "padding": "clamp(2rem, 5vw, 4rem)",
    "border": "1px solid var(--border)",
    "border-radius": "22px",
    "background": "var(--bg-card)",
    "box-shadow": "0 22px 60px rgba(7, 26, 28, 0.06)"
  }
},
{
  ".landing-cta__title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(2rem, 4vw, 3.55rem)",
    "font-weight": "600",
    "line-height": "1.05",
    "letter-spacing": "-0.04em",
    "margin-bottom": "1rem",
    "text-wrap": "balance"
  }
},
{
  ".landing-cta__text": {
    "max-width": "590px",
    "margin": "0 auto 2rem",
    "color": "var(--text-muted)",
    "line-height": "1.68"
  }
},
{
  ".landing-footer": {
    "padding-block": "2.5rem",
    "border-top": "1px solid var(--border)",
    "background": "var(--bg-section)"
  }
},
{
  ".landing-footer__brand-mark": {
    "width": "28px",
    "height": "28px",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "border-radius": "7px",
    "background": "var(--btn-dark)",
    "color": "#fff"
  }
},
{
  ".landing-footer__brand-name": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1rem",
    "font-weight": "700"
  }
},
{
  ".landing-footer__credit,\r\n.landing-footer__copy": {
    "color": "var(--text-muted)",
    "font-size": "0.75rem",
    "line-height": "1.45"
  }
},
{
  ".landing-footer__link": {
    "color": "var(--text-muted) !important",
    "font-size": "0.78rem !important",
    "font-weight": "500 !important",
    "transition": "color 0.18s ease"
  }
},
{
  ".landing-footer__link:hover": {
    "color": "var(--primary) !important"
  }
},
{
  "@media (max-width: 992px)": [
    {
      ".landing-hero__inner": {
        "grid-template-columns": "1fr"
      }
    },
    {
      ".landing-visual": {
        "min-height": "360px"
      }
    },
    {
      ".landing-feature-card,\r\n  .landing-feature-card:nth-of-type(1),\r\n  .landing-feature-card:nth-of-type(4)": {
        "grid-column": "span 3"
      }
    },
    {
      ".landing-steps": {
        "grid-template-columns": "repeat(2, 1fr)",
        "gap": "2rem 1rem"
      }
    },
    {
      ".landing-steps::before": {
        "display": "none"
      }
    }
  ]
},
{
  "@media (max-width: 576px)": [
    {
      ".landing-hero": {
        "padding-top": "5.25rem"
      }
    },
    {
      ".landing-title": {
        "font-size": "clamp(2.35rem, 13vw, 3.4rem)"
      }
    },
    {
      ".landing-actions,\r\n  .landing-btn": {
        "width": "100%"
      }
    },
    {
      ".landing-visual": {
        "min-height": "auto"
      }
    },
    {
      ".landing-annotation": {
        "position": "static",
        "margin-top": "1rem",
        "max-width": "none"
      }
    },
    {
      ".landing-stat": {
        "text-align": "center"
      }
    },
    {
      ".landing-feature-grid,\r\n  .landing-steps": {
        "grid-template-columns": "1fr"
      }
    },
    {
      ".landing-feature-card,\r\n  .landing-feature-card:nth-of-type(1),\r\n  .landing-feature-card:nth-of-type(4)": {
        "grid-column": "span 1"
      }
    }
  ]
},
{
  ".reveal-on-scroll": {
    "opacity": "0",
    "transform": "translateY(35px)",
    "will-change": "opacity, transform",
    "transition": "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
  }
},
{
  ".reveal-on-scroll.is-visible": {
    "opacity": "1",
    "transform": "translateY(0)"
  }
},
{
  ".reveal-left": {
    "opacity": "0",
    "transform": "translateX(-40px)",
    "will-change": "opacity, transform",
    "transition": "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
  }
},
{
  ".reveal-left.is-visible": {
    "opacity": "1",
    "transform": "translateX(0)"
  }
},
{
  ".reveal-right": {
    "opacity": "0",
    "transform": "translateX(40px)",
    "will-change": "opacity, transform",
    "transition": "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
  }
},
{
  ".reveal-right.is-visible": {
    "opacity": "1",
    "transform": "translateX(0)"
  }
},
{
  ".reveal-scale": {
    "opacity": "0",
    "transform": "scale(0.92)",
    "will-change": "opacity, transform",
    "transition": "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
  }
},
{
  ".reveal-scale.is-visible": {
    "opacity": "1",
    "transform": "scale(1)"
  }
},
{
  ".delay-100": {
    "transition-delay": "100ms"
  }
},
{
  ".delay-200": {
    "transition-delay": "200ms"
  }
},
{
  ".delay-300": {
    "transition-delay": "300ms"
  }
},
{
  ".delay-400": {
    "transition-delay": "400ms"
  }
},
{
  ".delay-500": {
    "transition-delay": "500ms"
  }
},
{
  ".delay-600": {
    "transition-delay": "600ms"
  }
},
{
  "@keyframes floatSlow": [
    {
      "0%, 100%": {
        "transform": "translateY(0px)"
      }
    },
    {
      "50%": {
        "transform": "translateY(-8px)"
      }
    }
  ]
},
{
  "@keyframes pulseGlow": [
    {
      "0%, 100%": {
        "opacity": "0.6",
        "transform": "scale(1)"
      }
    },
    {
      "50%": {
        "opacity": "0.95",
        "transform": "scale(1.05)"
      }
    }
  ]
},
{
  ".animate-float": {
    "animation": "floatSlow 4s ease-in-out infinite"
  }
},
{
  ".animate-pulse-glow": {
    "animation": "pulseGlow 3s ease-in-out infinite"
  }
},
{
  "#search-sandbox": {
    "--sandbox-ease": "cubic-bezier(0.22, 1, 0.36, 1)",
    "--sandbox-fast": "0.2s",
    "--sandbox-med": "0.24s"
  }
},
{
  "@keyframes sandbox-fade-up": [
    {
      "from": {
        "opacity": "0",
        "transform": "translateY(8px)"
      }
    },
    {
      "to": {
        "opacity": "1",
        "transform": "translateY(0)"
      }
    }
  ]
},
{
  "@keyframes sandbox-ping": [
    {
      "0%": {
        "transform": "scale(1)",
        "opacity": "0.5"
      }
    },
    {
      "70%,\r\n  100%": {
        "transform": "scale(2.6)",
        "opacity": "0"
      }
    }
  ]
},
{
  "@keyframes sandbox-bob": [
    {
      "0%,\r\n  100%": {
        "transform": "translateY(0)"
      }
    },
    {
      "50%": {
        "transform": "translateY(-3px)"
      }
    }
  ]
},
{
  ".sandbox-search-form": {
    "max-width": "720px"
  }
},
{
  ".sandbox-searchbar": {
    "border-radius": "20px",
    "padding": "5px",
    "transition": "transform var(--sandbox-med) var(--sandbox-ease),\r\n    box-shadow var(--sandbox-med) var(--sandbox-ease)"
  }
},
{
  ".sandbox-searchbar:hover": {
    "transform": "translateY(-1px)"
  }
},
{
  ".sandbox-searchbar:focus-within": {
    "transform": "translateY(-1px)",
    "box-shadow": "0 0 0 4px rgba(255, 122, 51, 0.1),\r\n    0 12px 32px rgba(7, 26, 28, 0.07)"
  }
},
{
  ".sandbox-searchbar-inner": {
    "background": "var(--bg-chip)",
    "border-radius": "18px",
    "overflow": "hidden",
    "padding": "6px",
    "align-items": "center",
    "box-shadow": "0 2px 10px rgba(7, 26, 28, 0.04)",
    "transition": "background-color var(--sandbox-med) ease,\r\n    box-shadow var(--sandbox-med) ease"
  }
},
{
  ".sandbox-searchbar:hover .sandbox-searchbar-inner": {
    "box-shadow": "0 6px 18px rgba(7, 26, 28, 0.07)"
  }
},
{
  ".sandbox-searchbar:focus-within .sandbox-searchbar-inner": {
    "background": "var(--bg-card)",
    "box-shadow": "0 8px 26px rgba(7, 26, 28, 0.09)"
  }
},
{
  ".sandbox-search-icon": {
    "color": "var(--text-muted)",
    "display": "flex",
    "align-items": "center",
    "padding": "0 0.35rem 0 0.95rem",
    "transition": "color var(--sandbox-fast) ease,\r\n    transform var(--sandbox-fast) var(--sandbox-ease)"
  }
},
{
  ".sandbox-searchbar:focus-within .sandbox-search-icon": {
    "color": "var(--primary)",
    "transform": "scale(1.08)"
  }
},
{
  ".sandbox-search-input .MuiOutlinedInput-root": {
    "border": "0",
    "box-shadow": "none !important",
    "background": "transparent !important",
    "color": "var(--text-main)",
    "caret-color": "var(--primary)",
    "font-size": "0.95rem",
    "padding": "0.55rem 0.6rem",
    "transition": "color var(--sandbox-fast) ease"
  }
},
{
  ".sandbox-search-input .MuiInputBase-input::placeholder": {
    "color": "var(--text-muted)",
    "opacity": "0.85"
  }
},
{
  ".sandbox-search-btn": {
    "border": "0",
    "border-radius": "13px !important",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.45rem",
    "font-size": "0.8rem",
    "font-weight": "700",
    "padding": "0.55rem 1.15rem",
    "white-space": "nowrap",
    "transition": "transform var(--sandbox-fast) var(--sandbox-ease),\r\n    box-shadow var(--sandbox-fast) var(--sandbox-ease),\r\n    background-color var(--sandbox-fast) ease"
  }
},
{
  ".sandbox-search-btn svg": {
    "transition": "transform var(--sandbox-fast) var(--sandbox-ease)"
  }
},
{
  ".sandbox-search-btn:hover:not(:disabled)": {
    "transform": "translateY(-1px)"
  }
},
{
  ".sandbox-search-btn:hover:not(:disabled) svg": {
    "transform": "translateX(2px)"
  }
},
{
  ".sandbox-search-btn:active:not(:disabled)": {
    "transform": "translateY(0) scale(0.96)",
    "transition-duration": "0.08s"
  }
},
{
  ".sandbox-chip": {
    "border": "1px solid var(--border)",
    "background": "var(--bg-chip)",
    "color": "var(--text-muted)",
    "border-radius": "999px",
    "font-size": "0.75rem",
    "font-weight": "600",
    "padding": "0.42rem 0.95rem",
    "cursor": "pointer",
    "transition": "transform var(--sandbox-fast) var(--sandbox-ease),\r\n    background-color var(--sandbox-fast) ease,\r\n    border-color var(--sandbox-fast) ease,\r\n    color var(--sandbox-fast) ease,\r\n    box-shadow var(--sandbox-fast) var(--sandbox-ease)"
  }
},
{
  ".sandbox-chip:hover,\r\n.sandbox-chip:focus-visible": {
    "transform": "translateY(-2px) scale(1.02)",
    "border-color": "rgba(255, 122, 51, 0.38)",
    "background": "var(--primary-light)",
    "color": "var(--primary)",
    "box-shadow": "0 6px 16px rgba(255, 122, 51, 0.13)",
    "outline": "0"
  }
},
{
  ".sandbox-chip:active": {
    "transform": "translateY(0) scale(0.96)",
    "box-shadow": "0 2px 6px rgba(255, 122, 51, 0.1)",
    "transition-duration": "0.08s"
  }
},
{
  ".sandbox-loading": {
    "background": "var(--bg-chip)",
    "border": "1px solid var(--border)",
    "border-radius": "18px",
    "font-size": "0.85rem",
    "animation": "sandbox-fade-up 0.3s var(--sandbox-ease)"
  }
},
{
  ".sandbox-loading-icon": {
    "color": "var(--primary)",
    "animation": "sandbox-bob 1.1s ease-in-out infinite"
  }
},
{
  ".sandbox-error": {
    "background": "rgba(220, 53, 69, 0.05)",
    "border": "1px solid rgba(220, 53, 69, 0.18)",
    "border-radius": "18px",
    "animation": "sandbox-fade-up 0.3s var(--sandbox-ease)"
  }
},
{
  ".sandbox-results": {
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "22px",
    "box-shadow": "0 14px 40px rgba(7, 26, 28, 0.07)",
    "padding": "1.5rem",
    "text-align": "left",
    "animation": "sandbox-fade-up 0.36s var(--sandbox-ease)"
  }
},
{
  ".sandbox-results-meta": {
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".sandbox-live-dot": {
    "position": "relative"
  }
},
{
  ".sandbox-live-dot::after": {
    "content": "\"\"",
    "position": "absolute",
    "inset": "0",
    "border-radius": "50%",
    "background": "inherit",
    "animation": "sandbox-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite"
  }
},
{
  ".sandbox-results-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.08rem",
    "font-weight": "600",
    "letter-spacing": "-0.01em",
    "margin-bottom": "1rem"
  }
},
{
  ".sandbox-results-keyword": {
    "color": "var(--primary)",
    "font-weight": "700",
    "background": "var(--primary-light)",
    "border-radius": "8px",
    "padding": "0.08em 0.38em",
    "margin": "0 0.06em"
  }
},
{
  ".sandbox-result-list": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.55rem",
    "max-height": "380px",
    "overflow-y": "auto",
    "padding-right": "6px",
    "scrollbar-width": "thin",
    "scrollbar-color": "rgba(7, 26, 28, 0.12) transparent"
  }
},
{
  ".sandbox-result-list::-webkit-scrollbar": {
    "width": "4px"
  }
},
{
  ".sandbox-result-list::-webkit-scrollbar-track": {
    "background": "transparent"
  }
},
{
  ".sandbox-result-list::-webkit-scrollbar-thumb": {
    "background": "rgba(7, 26, 28, 0.08)",
    "border-radius": "999px"
  }
},
{
  ".sandbox-result-list:hover::-webkit-scrollbar-thumb": {
    "background": "rgba(7, 26, 28, 0.16)"
  }
},
{
  ".sandbox-result-list::-webkit-scrollbar-thumb:hover": {
    "background": "rgba(7, 26, 28, 0.26)"
  }
},
{
  ".sandbox-result-card": {
    "background": "var(--bg-chip)",
    "border": "1px solid var(--border)",
    "border-radius": "14px",
    "padding": "0.8rem 0.9rem",
    "animation": "sandbox-fade-up 0.34s var(--sandbox-ease) backwards",
    "transition": "transform 0.22s var(--sandbox-ease),\r\n    box-shadow 0.22s var(--sandbox-ease),\r\n    background-color 0.22s ease,\r\n    border-color 0.22s ease"
  }
},
{
  ".sandbox-result-card:hover": {
    "transform": "translateY(-2px)",
    "background": "var(--bg-card)",
    "border-color": "rgba(255, 122, 51, 0.28)",
    "box-shadow": "0 10px 26px rgba(7, 26, 28, 0.08)"
  }
},
{
  ".sandbox-result-card.is-clickable": {
    "cursor": "pointer"
  }
},
{
  ".sandbox-result-card.is-clickable:hover .sandbox-result-title": {
    "color": "var(--primary)"
  }
},
{
  ".sandbox-result-card.is-journal:hover": {
    "background": "var(--primary-light)",
    "border-color": "var(--primary)"
  }
},
{
  ".sandbox-result-icon": {
    "width": "40px",
    "height": "40px",
    "flex": "0 0 auto",
    "border-radius": "11px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "transition": "transform 0.22s var(--sandbox-ease)"
  }
},
{
  ".sandbox-result-card:hover .sandbox-result-icon": {
    "transform": "scale(1.06)"
  }
},
{
  ".sandbox-result-title": {
    "color": "var(--text-main)",
    "font-size": "0.875rem",
    "font-weight": "500",
    "max-width": "340px",
    "transition": "color 0.2s ease"
  }
},
{
  ".sandbox-result-badge": {
    "border-radius": "8px",
    "font-size": "0.62rem",
    "font-weight": "700",
    "line-height": "1",
    "letter-spacing": "0.06em",
    "padding": "0.4em 0.72em",
    "text-transform": "uppercase",
    "flex-shrink": "0",
    "transition": "transform var(--sandbox-fast) var(--sandbox-ease),\r\n    opacity var(--sandbox-fast) ease"
  }
},
{
  ".sandbox-result-card:hover .sandbox-result-badge": {
    "transform": "scale(1.05)"
  }
},
{
  ".sandbox-result-badge.is-outline": {
    "border": "1px solid"
  }
},
{
  "@media (max-width: 576px)": [
    {
      ".sandbox-results": {
        "border-radius": "16px",
        "padding": "1rem"
      }
    },
    {
      ".sandbox-result-title": {
        "max-width": "100%"
      }
    },
    {
      ".sandbox-search-btn": {
        "padding": "0.55rem 0.9rem"
      }
    }
  ]
},
{
  "@media (prefers-reduced-motion: reduce)": [
    {
      ".sandbox-results,\r\n  .sandbox-result-card,\r\n  .sandbox-loading,\r\n  .sandbox-error": {
        "animation": "none"
      }
    },
    {
      ".sandbox-live-dot::after,\r\n  .sandbox-loading-icon": {
        "animation": "none"
      }
    }
  ]
},
{
  ".profile-page": {
    "min-height": "100vh",
    "background": "#f8f9fb",
    "padding": "120px 40px 40px"
  }
},
{
  ".profile-container": {
    "max-width": "1200px",
    "margin": "0 auto"
  }
},
{
  ".page-header": {
    "margin-bottom": "20px"
  }
},
{
  ".page-header h1": {
    "margin-bottom": "8px"
  }
},
{
  ".page-header p": {
    "color": "#666"
  }
},
{
  ".profile-content": {
    "display": "flex",
    "gap": "24px"
  }
},
{
  ".profile-sidebar": {
    "width": "300px",
    "background": "white",
    "border-radius": "20px",
    "padding": "32px",
    "box-shadow": "0 2px 10px rgba(0, 0, 0, 0.06)"
  }
},
{
  ".avatar": {
    "width": "100px",
    "height": "100px",
    "border-radius": "50%",
    "background": "#ff7a30",
    "color": "white",
    "font-size": "42px",
    "font-weight": "bold",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "margin": "auto",
    "overflow": "hidden"
  }
},
{
  ".avatar-image": {
    "width": "100%",
    "height": "100%",
    "object-fit": "cover"
  }
},
{
  ".avatar-initials": {
    "font-size": "42px"
  }
},
{
  ".profile-sidebar h2": {
    "text-align": "center",
    "margin-top": "20px",
    "word-wrap": "break-word",
    "overflow-wrap": "break-word",
    "word-break": "break-word"
  }
},
{
  ".role-badge": {
    "width": "fit-content",
    "margin": "10px auto",
    "padding": "6px 12px",
    "border-radius": "999px",
    "background": "#fff0e8",
    "color": "#ff7a30",
    "font-size": "14px"
  }
},
{
  ".status-badge": {
    "width": "fit-content",
    "margin": "10px auto",
    "padding": "6px 12px",
    "border-radius": "999px",
    "font-size": "14px"
  }
},
{
  ".status-badge.active": {
    "background": "#e8f8ea",
    "color": "#28a745"
  }
},
{
  ".status-badge.inactive": {
    "background": "#ffe6e6",
    "color": "#dc3545"
  }
},
{
  ".profile-sidebar hr": {
    "margin": "24px 0"
  }
},
{
  ".activity-title": {
    "font-size": "12px",
    "color": "#888",
    "margin-bottom": "12px"
  }
},
{
  ".stat-row": {
    "display": "flex",
    "justify-content": "space-between",
    "margin-bottom": "12px"
  }
},
{
  ".profile-card": {
    "flex": "1",
    "background": "white",
    "border-radius": "20px",
    "padding": "40px",
    "box-shadow": "0 2px 10px rgba(0, 0, 0, 0.06)"
  }
},
{
  ".profile-card h2": {
    "margin-bottom": "30px"
  }
},
{
  ".form-grid": {
    "display": "grid",
    "grid-template-columns": "1fr 1fr",
    "gap": "20px"
  }
},
{
  ".form-group": {
    "display": "flex",
    "flex-direction": "column",
    "margin-bottom": "24px"
  }
},
{
  ".full-width": {
    "width": "100%"
  }
},
{
  ".form-group label": {
    "margin-bottom": "8px",
    "font-weight": "600"
  }
},
{
  ".form-group input,\r\n.form-group select": {
    "height": "48px",
    "border": "1px solid #ddd",
    "border-radius": "10px",
    "padding": "0 14px"
  }
},
{
  ".readonly-input": {
    "background": "#f5f5f5"
  }
},
{
  ".button-area": {
    "display": "flex",
    "justify-content": "flex-end",
    "margin-top": "10px"
  }
},
{
  ".save-btn": {
    "background": "#ff7a30",
    "color": "white",
    "border": "none",
    "padding": "12px 28px",
    "border-radius": "10px",
    "cursor": "pointer"
  }
},
{
  ".save-btn:hover": {
    "opacity": "0.9"
  }
},
{
  ".danger-zone": {
    "margin-top": "40px",
    "padding-top": "24px",
    "border-top": "1px solid #eee"
  }
},
{
  ".danger-zone h3": {
    "color": "#dc3545"
  }
},
{
  ".delete-btn": {
    "background": "#dc3545",
    "color": "white",
    "border": "none",
    "padding": "12px 20px",
    "border-radius": "10px",
    "cursor": "pointer"
  }
},
{
  ".modal-overlay": {
    "position": "fixed",
    "inset": "0",
    "background": "rgba(0, 0, 0, 0.45)",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "z-index": "999"
  }
},
{
  ".modal-actions": {
    "margin-top": "20px",
    "display": "flex",
    "justify-content": "flex-end",
    "gap": "12px"
  }
},
{
  ".cancel-btn": {
    "padding": "10px 18px"
  }
},
{
  ".delete-confirm-btn": {
    "background": "#dc3545",
    "color": "white",
    "border": "none",
    "padding": "10px 18px",
    "border-radius": "8px"
  }
},
{
  ".loading-state": {
    "min-height": "60vh",
    "display": "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center"
  }
},
{
  ".spinner": {
    "width": "40px",
    "height": "40px",
    "border": "4px solid #eee",
    "border-top": "4px solid #ff7a30",
    "border-radius": "50%",
    "animation": "profile-spin 1s linear infinite"
  }
},
{
  "@keyframes profile-spin": {
    "to": {
      "transform": "rotate(360deg)"
    }
  }
},
{
  ".error-state": {
    "min-height": "60vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center"
  }
},
{
  ".error-box": {
    "background": "white",
    "padding": "30px",
    "border-radius": "16px",
    "text-align": "center"
  }
},
{
  ".retry-btn": {
    "margin-top": "12px"
  }
},
{
  "@media (max-width: 768px)": [
    {
      ".profile-page": {
        "padding": "100px 20px 20px"
      }
    },
    {
      ".profile-content": {
        "flex-direction": "column"
      }
    },
    {
      ".profile-sidebar": {
        "width": "100%"
      }
    },
    {
      ".form-grid": {
        "grid-template-columns": "1fr"
      }
    },
    {
      ".profile-card": {
        "padding": "24px"
      }
    }
  ]
},
{
  ".upgrade-modal": {
    "width": "min(96vw, 1100px) !important",
    "max-width": "1100px !important",
    "min-width": "900px !important",
    "max-height": "90vh",
    "margin-left": "auto !important",
    "margin-right": "auto !important",
    "transform": "none !important"
  }
},
{
  ".upgrade-modal-wrapper .MuiDialog-paper,\r\n.upgrade-modal .MuiDialog-paper": {
    "width": "100%",
    "max-width": "none",
    "min-width": "0",
    "max-height": "90vh",
    "overflow": "hidden",
    "border-radius": "24px",
    "border": "1px solid rgba(148, 163, 184, 0.22)",
    "background": "radial-gradient(circle at top left, rgba(255, 122, 51, 0.08), transparent 34%),\r\n    radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent 36%),\r\n    var(--bg-card)",
    "box-shadow": "0 28px 80px rgba(15, 23, 42, 0.24)"
  }
},
{
  ".upgrade-modal-wrapper .MuiDialogTitle-root,\r\n.upgrade-modal .MuiDialogTitle-root": {
    "position": "absolute",
    "top": "0",
    "right": "0",
    "z-index": "5",
    "width": "auto",
    "min-width": "0",
    "padding": "18px 22px 0 0",
    "border": "0",
    "background": "transparent"
  }
},
{
  ".upgrade-modal-wrapper .MuiDialogTitle-root .MuiIconButton-root,\r\n.upgrade-modal .MuiDialogTitle-root .MuiIconButton-root": {
    "margin": "0",
    "flex-shrink": "0"
  }
},
{
  ".upgrade-modal-wrapper .MuiDialogContent-root,\r\n.upgrade-modal .MuiDialogContent-root": {
    "width": "100%",
    "min-width": "0",
    "padding": "40px",
    "overflow": "hidden"
  }
},
{
  ".upgrade-modal-content": {
    "display": "grid",
    "grid-template-columns": "320px minmax(0, 1fr)",
    "gap": "32px",
    "width": "100%",
    "max-height": "calc(90vh - 80px)",
    "overflow-y": "auto",
    "overflow-x": "hidden",
    "padding-right": "6px",
    "padding-bottom": "24px"
  }
},
{
  ".upgrade-modal-content::-webkit-scrollbar": {
    "width": "6px"
  }
},
{
  ".upgrade-modal-content::-webkit-scrollbar-track": {
    "background": "transparent"
  }
},
{
  ".upgrade-modal-content::-webkit-scrollbar-thumb": {
    "background": "rgba(148, 163, 184, 0.4)",
    "border-radius": "10px"
  }
},
{
  ".upgrade-modal-content::-webkit-scrollbar-thumb:hover": {
    "background": "rgba(148, 163, 184, 0.6)"
  }
},
{
  ".upgrade-modal-left": {
    "min-width": "320px",
    "width": "320px",
    "flex-shrink": "0",
    "display": "flex",
    "flex-direction": "column",
    "gap": "24px"
  }
},
{
  ".upgrade-modal-right": {
    "min-width": "0"
  }
},
{
  ".upgrade-modal-title": {
    "font-family": "var(--font-display)",
    "font-weight": "700",
    "font-size": "2rem",
    "color": "var(--text-main)",
    "white-space": "normal",
    "word-break": "normal",
    "overflow-wrap": "normal",
    "line-height": "1.15"
  }
},
{
  ".upgrade-modal-subtitle": {
    "color": "var(--text-muted)",
    "font-size": "1rem",
    "line-height": "1.65"
  }
},
{
  ".upgrade-modal-intro": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.75rem",
    "padding": "1.25rem 1.1rem",
    "border-radius": "16px",
    "background": "linear-gradient(135deg, rgba(255, 122, 51, 0.08), rgba(99, 102, 241, 0.08))",
    "border": "1px solid rgba(148, 163, 184, 0.18)"
  }
},
{
  ".upgrade-modal-intro__badge": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.45rem",
    "width": "fit-content",
    "padding": "0.42rem 0.8rem",
    "border-radius": "999px",
    "background": "rgba(15, 23, 42, 0.06)",
    "color": "var(--text-main)",
    "font-size": "0.78rem",
    "font-weight": "700"
  }
},
{
  ".upgrade-modal-intro__text": {
    "color": "var(--text-muted)",
    "font-size": "1rem",
    "line-height": "1.7"
  }
},
{
  ".pricing-grid": {
    "display": "grid",
    "grid-template-columns": "repeat(auto-fit, minmax(280px, 1fr))",
    "gap": "24px",
    "width": "100%",
    "min-width": "0",
    "align-items": "stretch"
  }
},
{
  ".upgrade-plan-card": {
    "border-radius": "20px",
    "padding": "24px",
    "min-height": "360px",
    "min-width": "0",
    "display": "flex",
    "flex-direction": "column",
    "justify-content": "space-between",
    "transition": "transform 0.2s ease, box-shadow 0.2s ease",
    "position": "relative",
    "overflow": "hidden"
  }
},
{
  ".upgrade-plan-card:hover": {
    "transform": "translateY(-2px)"
  }
},
{
  ".upgrade-plan-card--free": {
    "background": "var(--bg-main)",
    "border": "1px solid var(--border)"
  }
},
{
  ".upgrade-plan-card--vip": {
    "background": "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)",
    "border": "1px solid rgba(129, 140, 248, 0.3)",
    "color": "#fff",
    "box-shadow": "0 4px 24px rgba(99, 102, 241, 0.18)"
  }
},
{
  ".upgrade-plan-card--vip:hover": {
    "box-shadow": "0 8px 32px rgba(99, 102, 241, 0.28)"
  }
},
{
  ".upgrade-plan-badge": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "6px",
    "padding": "4px 12px",
    "border-radius": "20px",
    "font-size": "0.75rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "letter-spacing": "0.5px",
    "width": "fit-content"
  }
},
{
  ".upgrade-plan-badge--free": {
    "background": "var(--border)",
    "color": "var(--text-muted)"
  }
},
{
  ".upgrade-plan-badge--vip": {
    "background": "linear-gradient(135deg, #f59e0b, #eab308)",
    "color": "#1e1b4b"
  }
},
{
  ".upgrade-plan-name": {
    "font-family": "var(--font-display)",
    "font-weight": "700",
    "font-size": "1.5rem",
    "margin": "0.75rem 0 0.25rem"
  }
},
{
  ".upgrade-plan-card--free .upgrade-plan-name": {
    "color": "var(--text-main)"
  }
},
{
  ".upgrade-plan-price": {
    "font-size": "1rem",
    "margin-bottom": "1rem"
  }
},
{
  ".upgrade-plan-card--free .upgrade-plan-price": {
    "color": "var(--text-muted)"
  }
},
{
  ".upgrade-plan-card--vip .upgrade-plan-price": {
    "color": "rgba(255, 255, 255, 0.7)"
  }
},
{
  ".upgrade-plan-price strong": {
    "font-size": "1.75rem",
    "font-weight": "800",
    "font-family": "var(--font-display)"
  }
},
{
  ".upgrade-plan-card--vip .upgrade-plan-price strong": {
    "background": "linear-gradient(135deg, #fbbf24, #f59e0b)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    "background-clip": "text"
  }
},
{
  ".upgrade-plan-description": {
    "color": "var(--text-muted)",
    "font-size": "1rem",
    "line-height": "1.65",
    "min-height": "52px"
  }
},
{
  ".upgrade-plan-description--vip": {
    "color": "rgba(255, 255, 255, 0.78)"
  }
},
{
  ".upgrade-plan-divider": {
    "border": "none",
    "height": "1px",
    "margin": "0.25rem 0 1rem"
  }
},
{
  ".upgrade-plan-card--free .upgrade-plan-divider": {
    "background": "var(--border)"
  }
},
{
  ".upgrade-plan-card--vip .upgrade-plan-divider": {
    "background": "rgba(129, 140, 248, 0.25)"
  }
},
{
  ".upgrade-plan-features": {
    "list-style": "none",
    "padding": "0",
    "margin": "0 0 1.25rem",
    "flex": "1",
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.6rem"
  }
},
{
  ".upgrade-plan-feature": {
    "display": "flex",
    "align-items": "flex-start",
    "gap": "10px",
    "font-size": "1rem",
    "line-height": "1.5"
  }
},
{
  ".upgrade-plan-card--free .upgrade-plan-feature": {
    "color": "var(--text-muted)"
  }
},
{
  ".upgrade-plan-card--vip .upgrade-plan-feature": {
    "color": "rgba(255, 255, 255, 0.9)"
  }
},
{
  ".upgrade-plan-feature-icon": {
    "flex-shrink": "0",
    "margin-top": "3px"
  }
},
{
  ".upgrade-plan-feature-icon--check": {
    "color": "#22c55e"
  }
},
{
  ".upgrade-plan-feature-icon--cross": {
    "color": "#94a3b8"
  }
},
{
  ".upgrade-plan-feature-icon--star": {
    "color": "#fbbf24"
  }
},
{
  ".upgrade-plan-cta": {
    "width": "100%",
    "border-radius": "12px",
    "padding": "11px 16px",
    "font-weight": "600",
    "font-family": "var(--font-display)",
    "font-size": "1rem",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "gap": "6px",
    "border": "none",
    "cursor": "pointer",
    "transition": "transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease",
    "margin-top": "auto"
  }
},
{
  ".upgrade-plan-cta:hover": {
    "transform": "translateY(-1px)"
  }
},
{
  ".upgrade-plan-cta:active": {
    "transform": "translateY(0)"
  }
},
{
  ".upgrade-plan-cta--free": {
    "background": "var(--bg-main)",
    "border": "1px solid var(--border)",
    "color": "var(--text-muted)",
    "cursor": "default",
    "opacity": "0.7"
  }
},
{
  ".upgrade-plan-cta--free:hover": {
    "transform": "none"
  }
},
{
  ".upgrade-plan-cta--vip": {
    "background": "linear-gradient(135deg, #ff702f, #f97316)",
    "color": "#fff",
    "box-shadow": "0 4px 14px rgba(255, 112, 47, 0.35)"
  }
},
{
  ".upgrade-plan-cta--vip:hover": {
    "box-shadow": "0 6px 20px rgba(255, 112, 47, 0.45)"
  }
},
{
  ".upgrade-plan-recommended": {
    "position": "absolute",
    "top": "12px",
    "right": "-30px",
    "background": "linear-gradient(135deg, #f59e0b, #eab308)",
    "color": "#1e1b4b",
    "font-size": "0.65rem",
    "font-weight": "700",
    "text-transform": "uppercase",
    "letter-spacing": "0.5px",
    "padding": "4px 36px",
    "transform": "rotate(45deg)"
  }
},
{
  ".upgrade-plan-card--vip::before": {
    "content": "''",
    "position": "absolute",
    "top": "0",
    "left": "-100%",
    "width": "100%",
    "height": "100%",
    "pointer-events": "none",
    "background": "linear-gradient(\r\n    90deg,\r\n    transparent,\r\n    rgba(129, 140, 248, 0.06),\r\n    transparent\r\n  )",
    "animation": "vipShimmer 3s ease-in-out infinite"
  }
},
{
  "@keyframes vipShimmer": [
    {
      "0%": {
        "left": "-100%"
      }
    },
    {
      "50%": {
        "left": "100%"
      }
    },
    {
      "100%": {
        "left": "100%"
      }
    }
  ]
},
{
  "@media (max-width: 992px)": [
    {
      ".upgrade-modal": {
        "width": "94vw !important",
        "max-width": "94vw !important",
        "min-width": "0 !important"
      }
    },
    {
      ".upgrade-modal-wrapper .MuiDialogContent-root,\r\n  .upgrade-modal .MuiDialogContent-root": {
        "padding": "32px"
      }
    },
    {
      ".upgrade-modal-content": {
        "grid-template-columns": "1fr",
        "gap": "28px"
      }
    },
    {
      ".upgrade-modal-left": {
        "width": "auto",
        "min-width": "0"
      }
    }
  ]
},
{
  "@media (max-width: 768px)": [
    {
      ".upgrade-modal": {
        "width": "94vw !important",
        "min-width": "0 !important"
      }
    },
    {
      ".upgrade-modal-content": {
        "grid-template-columns": "1fr",
        "max-height": "calc(90vh - 64px)"
      }
    },
    {
      ".upgrade-modal-left": {
        "width": "auto",
        "min-width": "0"
      }
    },
    {
      ".pricing-grid": {
        "grid-template-columns": "1fr"
      }
    }
  ]
},
{
  "@media (max-width: 576px)": [
    {
      ".upgrade-modal-wrapper .MuiDialogContent-root,\r\n  .upgrade-modal .MuiDialogContent-root": {
        "padding": "28px 20px 20px"
      }
    },
    {
      ".upgrade-modal-title": {
        "font-size": "1.5rem"
      }
    },
    {
      ".upgrade-plan-card": {
        "min-height": "unset"
      }
    }
  ]
},
{
  ".topic-detail-page": {
    "min-height": "100vh",
    "display": "flex",
    "flex-direction": "column",
    "padding-top": "96px",
    "padding-bottom": "72px",
    "background": "var(--bg-main)",
    "color": "var(--text-main)"
  }
},
{
  ".topic-detail-breadcrumb > .MuiBox-root": {
    "margin-bottom": "0",
    "font-size": ".88rem"
  }
},
{
  ".topic-detail-breadcrumb__link": {
    "color": "var(--text-muted)",
    "cursor": "pointer",
    "text-decoration": "none",
    "transition": "color .2s ease"
  }
},
{
  ".topic-detail-breadcrumb__link:hover": {
    "color": "var(--text-main)"
  }
},
{
  ".topic-detail-hero": {
    "position": "relative",
    "overflow": "hidden",
    "margin-bottom": "2.25rem",
    "border": "1px solid var(--border) !important",
    "border-radius": "24px !important",
    "background": "var(--bg-card) !important",
    "box-shadow": "0 8px 32px rgba(0, 0, 0, .08)"
  }
},
{
  ".topic-detail-hero::before": {
    "content": "''",
    "position": "absolute",
    "inset": "0 auto 0 0",
    "width": "52%",
    "background": "linear-gradient(90deg, rgba(var(--primary-rgb, 59, 130, 246), .06), transparent)",
    "pointer-events": "none"
  }
},
{
  ".topic-detail-hero__body": {
    "position": "relative",
    "z-index": "1",
    "padding": "clamp(1.5rem, 4vw, 3rem)"
  }
},
{
  ".topic-detail-eyebrow": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": ".5rem",
    "margin-bottom": "1.35rem",
    "padding": ".55rem .9rem",
    "border": "1px solid var(--border)",
    "border-radius": "999px",
    "background": "var(--bg-main)",
    "color": "var(--text-muted)",
    "box-shadow": "0 8px 20px rgba(0, 0, 0, .04)",
    "font-size": ".78rem",
    "font-weight": "800",
    "letter-spacing": ".06em",
    "text-transform": "uppercase"
  }
},
{
  ".topic-detail-eyebrow svg": {
    "color": "var(--primary)"
  }
},
{
  ".topic-detail-title": {
    "margin": "0 0 1.25rem",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "clamp(2.2rem, 4vw, 3.5rem)",
    "font-weight": "800",
    "line-height": "1.15",
    "letter-spacing": "-.02em"
  }
},
{
  ".topic-detail-description": {
    "max-width": "760px",
    "margin": "0",
    "color": "var(--text-muted)",
    "font-size": "1.05rem",
    "line-height": "1.8"
  }
},
{
  ".topic-detail-summary": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "1rem",
    "padding": "1.5rem",
    "border": "1px solid var(--border)",
    "border-radius": "18px",
    "background": "var(--bg-main)"
  }
},
{
  ".topic-detail-summary__label": {
    "color": "var(--text-muted)",
    "font-size": ".88rem",
    "font-weight": "700"
  }
},
{
  ".topic-detail-summary__badge": {
    "border": "1px solid var(--border) !important",
    "background": "var(--bg-card) !important",
    "color": "var(--text-main) !important",
    "font-weight": "800 !important"
  }
},
{
  ".topic-detail-summary__value": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.4rem",
    "font-weight": "800"
  }
},
{
  ".topic-detail-summary__divider": {
    "margin": ".1rem 0",
    "border-color": "var(--border)",
    "opacity": ".7"
  }
},
{
  ".topic-detail-action": {
    "min-height": "48px",
    "border": "0 !important",
    "border-radius": "12px !important",
    "color": "#fff !important",
    "font-weight": "800 !important"
  }
},
{
  ".topic-detail-section-heading": {
    "margin-bottom": "1rem"
  }
},
{
  ".topic-detail-section-title": {
    "margin": "0 0 .25rem",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "1.35rem",
    "font-weight": "800"
  }
},
{
  ".topic-detail-section-subtitle": {
    "margin": "0",
    "color": "var(--text-muted)",
    "font-size": ".92rem"
  }
},
{
  ".topic-detail-count-badge": {
    "border": "1px solid var(--border) !important",
    "border-radius": "999px !important",
    "background": "var(--bg-card) !important",
    "color": "var(--text-main) !important",
    "padding": ".5rem .9rem !important"
  }
},
{
  ".topic-detail-alert": {
    "border": "0 !important",
    "border-radius": "16px !important",
    "box-shadow": "0 8px 24px rgba(0, 0, 0, .06)"
  }
},
{
  ".topic-detail-spinner": {
    "color": "var(--primary)"
  }
},
{
  ".topic-detail-empty,\r\n.topic-detail-article-card": {
    "border": "1px solid var(--border) !important",
    "border-radius": "16px !important",
    "background": "var(--bg-card) !important"
  }
},
{
  ".topic-detail-empty": {
    "box-shadow": "0 8px 24px rgba(0, 0, 0, .04)"
  }
},
{
  ".topic-detail-article-card": {
    "box-shadow": "0 8px 24px rgba(0, 0, 0, .04)",
    "transition": "transform .18s ease, box-shadow .18s ease, border-color .18s ease"
  }
},
{
  ".topic-detail-article-card:hover": {
    "transform": "translateY(-2px)",
    "border-color": "var(--primary) !important",
    "box-shadow": "0 14px 34px rgba(0, 0, 0, .08)"
  }
},
{
  ".topic-detail-article-title": {
    "padding": "0 !important",
    "border": "0 !important",
    "color": "var(--text-main) !important",
    "font-size": "1.05rem !important",
    "font-weight": "750 !important",
    "line-height": "1.6 !important",
    "text-align": "left !important",
    "text-decoration": "none !important"
  }
},
{
  ".topic-detail-article-title:hover": {
    "color": "var(--primary) !important"
  }
},
{
  ".topic-detail-article-meta": {
    "display": "flex",
    "flex-wrap": "wrap",
    "gap": "1rem",
    "color": "var(--text-muted)",
    "font-size": ".9rem"
  }
},
{
  ".topic-detail-article-meta a": {
    "color": "var(--text-muted)",
    "text-decoration": "none",
    "transition": "color .2s ease"
  }
},
{
  ".topic-detail-article-meta a:hover": {
    "color": "var(--primary)"
  }
},
{
  ".topic-detail-pagination": {
  }
},
{
  ":root": {
    "--header-height": "72px"
  }
},
{
  ".wallet-layout-page": {
    "min-height": "100vh",
    "padding-top": "var(--header-height)",
    "background": "#f7f8fb",
    "color": "var(--text-main)"
  }
},
{
  ".wallet-body": {
    "display": "grid",
    "grid-template-columns": "238px minmax(0, 1fr)",
    "min-height": "calc(100vh - var(--header-height))"
  }
},
{
  ".wallet-sidebar": {
    "position": "sticky",
    "top": "var(--header-height)",
    "align-self": "start",
    "height": "calc(100vh - var(--header-height))",
    "overflow-y": "auto",
    "background": "#fff",
    "border-right": "1px solid rgba(15, 23, 42, 0.08)",
    "border-top": "1px solid rgba(15, 23, 42, 0.06)",
    "padding": "16px 14px 18px",
    "display": "flex",
    "flex-direction": "column",
    "gap": "16px",
    "margin-top": "-1px"
  }
},
{
  ".wallet-sidebar__brand": {
    "display": "flex",
    "align-items": "center",
    "gap": "11px",
    "padding": "6px 8px 14px",
    "border-bottom": "1px solid rgba(15, 23, 42, 0.06)"
  }
},
{
  ".wallet-sidebar__brand-icon": {
    "width": "38px",
    "height": "38px",
    "border-radius": "13px",
    "background": "linear-gradient(135deg, #ff7a33, #ff5608)",
    "color": "#fff",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center"
  }
},
{
  ".wallet-sidebar__brand-title": {
    "font-size": "14px",
    "font-weight": "900",
    "color": "var(--text-main)"
  }
},
{
  ".wallet-sidebar__brand-sub": {
    "color": "var(--text-muted)",
    "font-size": "11px",
    "margin-top": "1px"
  }
},
{
  ".wallet-sidebar__nav": {
    "display": "grid",
    "gap": "7px",
    "width": "100%"
  }
},
{
  ".wallet-sidebar__item": {
    "width": "100%",
    "border": "0",
    "background": "transparent",
    "color": "#64748b",
    "border-radius": "12px",
    "min-height": "42px",
    "padding": "0 12px",
    "display": "flex",
    "align-items": "center",
    "gap": "10px",
    "font-size": "13px",
    "font-weight": "750",
    "text-align": "left",
    "text-decoration": "none",
    "transition": "background 0.16s ease, color 0.16s ease, transform 0.16s ease"
  }
},
{
  ".wallet-sidebar__item:hover": {
    "background": "rgba(255, 122, 51, 0.07)",
    "color": "#ff6a1a"
  }
},
{
  ".wallet-sidebar__item.active": {
    "background": "rgba(255, 122, 51, 0.12)",
    "color": "#ff6a1a"
  }
},
{
  ".wallet-sidebar__promo": {
    "margin-top": "auto",
    "padding": "14px",
    "border-radius": "16px",
    "background": "linear-gradient(180deg, rgba(255, 122, 51, 0.08), rgba(255, 122, 51, 0.035))",
    "border": "1px solid rgba(255, 122, 51, 0.12)"
  }
},
{
  ".wallet-sidebar__promo-label": {
    "font-size": "10px",
    "text-transform": "uppercase",
    "letter-spacing": "0.06em",
    "font-weight": "900",
    "color": "#ff6a1a",
    "margin-bottom": "5px"
  }
},
{
  ".wallet-sidebar__promo-text": {
    "color": "var(--text-muted)",
    "font-size": "12px",
    "line-height": "1.45",
    "margin-bottom": "12px"
  }
},
{
  ".wallet-sidebar__promo button": {
    "width": "100%",
    "border": "0",
    "border-radius": "12px",
    "background": "linear-gradient(135deg, #ff7a33, #ff5608)",
    "color": "#fff",
    "font-weight": "850",
    "min-height": "38px"
  }
},
{
  ".wallet-sidebar__settings": {
    "border": "0",
    "background": "transparent",
    "color": "#64748b",
    "display": "flex",
    "align-items": "center",
    "gap": "9px",
    "font-size": "13px",
    "font-weight": "750",
    "padding": "10px 12px"
  }
},
{
  ".wallet-content": {
    "min-width": "0",
    "padding": "28px 32px 60px"
  }
},
{
  "@media (max-width: 900px)": [
    {
      ":root": {
        "--header-height": "64px"
      }
    },
    {
      ".wallet-layout-page": {
        "padding-top": "var(--header-height)"
      }
    },
    {
      ".wallet-body": {
        "grid-template-columns": "1fr",
        "min-height": "auto"
      }
    },
    {
      ".wallet-sidebar": {
        "position": "static",
        "top": "auto",
        "height": "auto",
        "overflow": "visible",
        "border-right": "0",
        "border-bottom": "1px solid rgba(15, 23, 42, 0.08)"
      }
    },
    {
      ".wallet-sidebar__nav": {
        "grid-template-columns": "repeat(2, minmax(0, 1fr))"
      }
    },
    {
      ".wallet-sidebar__promo,\r\n  .wallet-sidebar__settings": {
        "display": "none"
      }
    },
    {
      ".wallet-content": {
        "padding": "22px 16px 50px"
      }
    }
  ]
},
{
  ".my-wallet-page": {
    "max-width": "1100px",
    "margin": "0 auto"
  }
},
{
  ".my-wallet-breadcrumb": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "8px",
    "margin-bottom": "22px",
    "color": "var(--text-muted)",
    "font-size": "13px",
    "font-weight": "600"
  }
},
{
  ".my-wallet-hero": {
    "margin-bottom": "28px"
  }
},
{
  ".my-wallet-title": {
    "font-family": "var(--font-display)",
    "font-size": "2rem",
    "font-weight": "850",
    "letter-spacing": "-0.04em",
    "margin": "0 0 8px"
  }
},
{
  ".my-wallet-subtitle": {
    "color": "var(--text-muted)",
    "margin": "0",
    "max-width": "600px",
    "line-height": "1.6",
    "font-size": "0.95rem"
  }
},
{
  ".my-wallet-grid": {
    "display": "grid",
    "grid-template-columns": "minmax(0, 1.25fr) minmax(300px, 0.75fr)",
    "gap": "22px",
    "align-items": "start"
  }
},
{
  ".my-wallet-left-stack,\r\n.my-wallet-right-stack": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "20px"
  }
},
{
  ".my-wallet-card": {
    "background": "#fff",
    "border": "1px solid rgba(15, 23, 42, 0.08)",
    "border-radius": "20px",
    "padding": "24px"
  }
},
{
  ".my-wallet-card-header": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "16px",
    "margin-bottom": "18px"
  }
},
{
  ".my-wallet-card-title": {
    "display": "flex",
    "align-items": "center",
    "gap": "10px",
    "font-size": "14px",
    "font-weight": "800",
    "color": "var(--text-main)"
  }
},
{
  ".my-wallet-card-link": {
    "border": "0",
    "background": "transparent",
    "color": "#ff6a1a",
    "font-weight": "750",
    "font-size": "13px",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "4px"
  }
},
{
  ".my-wallet-balance-card": {
    "background": "#fff",
    "border": "1px solid rgba(15, 23, 42, 0.08)",
    "border-radius": "20px",
    "padding": "24px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "20px"
  }
},
{
  ".my-wallet-balance-label": {
    "font-size": "10px",
    "font-weight": "900",
    "letter-spacing": "0.06em",
    "color": "var(--text-muted)",
    "margin-bottom": "5px"
  }
},
{
  ".my-wallet-balance-value": {
    "font-family": "var(--font-display)",
    "font-size": "2.1rem",
    "font-weight": "900",
    "letter-spacing": "-0.04em",
    "color": "var(--text-main)",
    "line-height": "1"
  }
},
{
  ".my-wallet-balance-value span": {
    "font-size": "13px",
    "font-weight": "750",
    "color": "#ff6a1a",
    "margin-left": "6px"
  }
},
{
  ".my-wallet-balance-btn": {
    "border": "0",
    "border-radius": "14px",
    "background": "linear-gradient(135deg, #ff7a33, #ff5608)",
    "color": "#fff",
    "font-weight": "850",
    "padding": "0 20px",
    "min-height": "44px",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "8px",
    "font-size": "13.5px",
    "box-shadow": "0 6px 14px rgba(255, 122, 51, 0.18)"
  }
},
{
  ".my-wallet-table-wrap": {
    "margin": "0 -24px -24px",
    "overflow-x": "auto",
    "scrollbar-width": "thin",
    "scrollbar-color": "rgba(148, 163, 184, 0.45) transparent"
  }
},
{
  ".my-wallet-table-wrap::-webkit-scrollbar": {
    "height": "6px"
  }
},
{
  ".my-wallet-table-wrap::-webkit-scrollbar-track": {
    "background": "transparent"
  }
},
{
  ".my-wallet-table-wrap::-webkit-scrollbar-thumb": {
    "background": "rgba(148, 163, 184, 0.45)",
    "border-radius": "999px"
  }
},
{
  ".my-wallet-table-wrap::-webkit-scrollbar-thumb:hover": {
    "background": "rgba(100, 116, 139, 0.6)"
  }
},
{
  ".my-wallet-table": {
    "width": "100%",
    "border-collapse": "collapse",
    "text-align": "left"
  }
},
{
  ".my-wallet-table th,\r\n.my-wallet-table td": {
    "padding": "14px 24px",
    "font-size": "13px",
    "border-bottom": "1px solid rgba(15, 23, 42, 0.06)"
  }
},
{
  ".my-wallet-table th": {
    "font-weight": "800",
    "color": "var(--text-muted)",
    "background": "rgba(15, 23, 42, 0.015)",
    "font-size": "11px",
    "text-transform": "uppercase",
    "letter-spacing": "0.04em",
    "white-space": "nowrap"
  }
},
{
  ".my-wallet-table tr:last-of-type td": {
    "border-bottom": "0"
  }
},
{
  ".my-wallet-table-desc": {
    "display": "flex",
    "align-items": "center",
    "gap": "12px"
  }
},
{
  ".my-wallet-table-type-icon": {
    "width": "28px",
    "height": "28px",
    "border-radius": "9px",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center"
  }
},
{
  ".my-wallet-table-type-icon.deposit": {
    "background": "rgba(34, 197, 94, 0.12)",
    "color": "#16a34a"
  }
},
{
  ".my-wallet-table-type-icon.spend": {
    "background": "rgba(255, 122, 51, 0.1)",
    "color": "#ff6a1a"
  }
},
{
  ".my-wallet-table-type-icon.refund": {
    "background": "rgba(99, 102, 241, 0.1)",
    "color": "#6366f1"
  }
},
{
  ".my-wallet-table-type-label": {
    "font-weight": "800",
    "color": "var(--text-main)",
    "white-space": "nowrap"
  }
},
{
  ".my-wallet-table-detail": {
    "font-size": "11px",
    "color": "var(--text-muted)",
    "margin-top": "1px",
    "max-width": "220px",
    "white-space": "nowrap",
    "overflow": "hidden",
    "text-overflow": "ellipsis"
  }
},
{
  ".my-wallet-table-amount": {
    "font-family": "var(--font-display)",
    "font-weight": "850",
    "font-size": "14px",
    "white-space": "nowrap"
  }
},
{
  ".my-wallet-table-amount.spend": {
    "color": "#ef4444"
  }
},
{
  ".my-wallet-table-amount.deposit": {
    "color": "#22c55e"
  }
},
{
  ".my-wallet-table-badge": {
    "display": "inline-flex",
    "padding": "4px 10px",
    "border-radius": "99px",
    "font-size": "11px",
    "font-weight": "800",
    "white-space": "nowrap"
  }
},
{
  ".my-wallet-table-badge.success": {
    "background": "rgba(34, 197, 94, 0.1)",
    "color": "#16a34a"
  }
},
{
  ".my-wallet-table-loading,\r\n.my-wallet-table-empty": {
    "padding": "40px 0",
    "text-align": "center",
    "color": "var(--text-muted)",
    "font-size": "13.5px"
  }
},
{
  ".my-wallet-stats-grid": {
    "display": "grid",
    "grid-template-columns": "repeat(2, minmax(0, 1fr))",
    "gap": "14px"
  }
},
{
  ".my-wallet-stat-card": {
    "background": "#fff",
    "border": "1px solid rgba(15, 23, 42, 0.08)",
    "border-radius": "20px",
    "padding": "16px 20px"
  }
},
{
  ".my-wallet-stat-label": {
    "font-size": "11px",
    "font-weight": "800",
    "color": "var(--text-muted)",
    "margin-bottom": "5px"
  }
},
{
  ".my-wallet-stat-value": {
    "font-family": "var(--font-display)",
    "font-size": "1.15rem",
    "font-weight": "850",
    "color": "var(--text-main)"
  }
},
{
  ".my-wallet-account-list": {
    "display": "grid",
    "gap": "10px"
  }
},
{
  ".my-wallet-account-item": {
    "display": "flex",
    "align-items": "center",
    "gap": "12px",
    "padding": "12px 14px",
    "border-radius": "14px",
    "border": "1px solid rgba(15, 23, 42, 0.06)"
  }
},
{
  ".my-wallet-account-item.active": {
    "border-color": "rgba(255, 122, 51, 0.22)",
    "background": "rgba(255, 122, 51, 0.02)"
  }
},
{
  ".my-wallet-account-name": {
    "font-size": "13px",
    "font-weight": "800"
  }
},
{
  ".my-wallet-account-status": {
    "font-size": "11px",
    "color": "var(--text-muted)"
  }
},
{
  ".bg-secure": {
    "background": "linear-gradient(180deg, rgba(34, 197, 94, 0.08), rgba(255, 255, 255, 0))",
    "border-color": "rgba(34, 197, 94, 0.12)"
  }
},
{
  "@media (max-width: 768px)": [
    {
      ".my-wallet-grid": {
        "grid-template-columns": "1fr"
      }
    },
    {
      ".my-wallet-balance-card": {
        "flex-direction": "column",
        "align-items": "flex-start",
        "gap": "16px"
      }
    },
    {
      ".my-wallet-balance-btn": {
        "width": "100%",
        "justify-content": "center"
      }
    }
  ]
},
{
  ".topup-page": {
    "min-height": "100vh",
    "background-color": "var(--bg-main)",
    "color": "var(--text-main)",
    "padding-top": "80px"
  }
},
{
  ".topup-page.topup-in-layout": {
    "min-height": "auto",
    "background": "transparent",
    "padding-top": "0"
  }
},
{
  ".topup-inner": {
    "max-width": "900px",
    "margin": "0 auto",
    "padding": "40px 16px 80px"
  }
},
{
  ".topup-in-layout .topup-inner": {
    "max-width": "980px",
    "padding": "0 0 24px"
  }
},
{
  ".topup-hero": {
    "text-align": "center",
    "margin-bottom": "48px"
  }
},
{
  ".topup-hero__badge": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "6px",
    "padding": "5px 14px",
    "border-radius": "50rem",
    "background": "rgba(255, 122, 51, 0.1)",
    "color": "#ff7a33",
    "font-size": "12px",
    "font-weight": "700",
    "letter-spacing": "0.5px",
    "margin-bottom": "16px"
  }
},
{
  ".topup-hero__title": {
    "font-family": "var(--font-display)",
    "font-size": "2rem",
    "font-weight": "800",
    "color": "var(--text-main)",
    "line-height": "1.2",
    "margin-bottom": "12px"
  }
},
{
  ".topup-hero__sub": {
    "color": "var(--text-muted)",
    "font-size": "0.95rem",
    "max-width": "480px",
    "margin": "0 auto",
    "line-height": "1.6"
  }
},
{
  ".topup-wallet-bar": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "16px",
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "16px",
    "padding": "18px 24px",
    "margin-bottom": "40px"
  }
},
{
  ".topup-wallet-bar__left": {
    "display": "flex",
    "align-items": "center",
    "gap": "14px"
  }
},
{
  ".topup-wallet-bar__icon": {
    "width": "44px",
    "height": "44px",
    "border-radius": "12px",
    "background": "rgba(255, 122, 51, 0.12)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "flex-shrink": "0"
  }
},
{
  ".topup-wallet-bar__label": {
    "font-size": "12px",
    "color": "var(--text-muted)",
    "margin-bottom": "2px"
  }
},
{
  ".topup-wallet-bar__balance": {
    "font-family": "var(--font-display)",
    "font-size": "1.5rem",
    "font-weight": "800",
    "color": "var(--text-main)",
    "line-height": "1"
  }
},
{
  ".topup-wallet-bar__unit": {
    "font-size": "13px",
    "font-weight": "600",
    "color": "#ff7a33",
    "margin-left": "6px"
  }
},
{
  ".topup-section-title": {
    "font-family": "var(--font-display)",
    "font-size": "1rem",
    "font-weight": "700",
    "color": "var(--text-main)",
    "margin-bottom": "16px",
    "padding-left": "2px"
  }
},
{
  ".topup-packages-grid": {
    "display": "grid",
    "grid-template-columns": "repeat(3, 1fr)",
    "gap": "16px",
    "margin-bottom": "32px"
  }
},
{
  "@media (max-width: 768px)": {
    ".topup-packages-grid": {
      "grid-template-columns": "repeat(2, 1fr)"
    }
  }
},
{
  "@media (max-width: 480px)": {
    ".topup-packages-grid": {
      "grid-template-columns": "1fr"
    }
  }
},
{
  ".topup-pkg-card": {
    "position": "relative",
    "min-height": "230px",
    "background": "radial-gradient(circle at top right, rgba(255, 122, 51, 0.055), transparent 34%),\r\n    var(--bg-card)",
    "border": "1.5px solid var(--border)",
    "border-radius": "22px",
    "padding": "22px",
    "cursor": "pointer",
    "transition": "border-color 0.22s ease, box-shadow 0.22s ease, transform 0.18s ease, background 0.22s ease",
    "display": "flex",
    "flex-direction": "column",
    "gap": "16px",
    "outline": "none",
    "overflow": "hidden",
    "text-align": "left"
  }
},
{
  ".topup-pkg-card::before": {
    "content": "\"\"",
    "position": "absolute",
    "inset": "0",
    "pointer-events": "none",
    "border-radius": "inherit",
    "background": "linear-gradient(135deg, rgba(255, 255, 255, 0.52), transparent 45%)",
    "opacity": "0.72"
  }
},
{
  ".topup-pkg-card > *": {
    "position": "relative",
    "z-index": "1"
  }
},
{
  ".topup-pkg-card:hover": {
    "border-color": "rgba(255, 122, 51, 0.42)",
    "box-shadow": "0 10px 22px rgba(15, 23, 42, 0.06), 0 4px 12px rgba(255, 122, 51, 0.08)",
    "transform": "translateY(-2px)"
  }
},
{
  ".topup-pkg-card.selected": {
    "border-color": "#ff7a33",
    "box-shadow": "0 10px 24px rgba(255, 122, 51, 0.12)",
    "background": "radial-gradient(circle at top right, rgba(255, 122, 51, 0.075), transparent 36%),\r\n    linear-gradient(180deg, rgba(255, 122, 51, 0.025), var(--bg-card) 72%)"
  }
},
{
  ".topup-pkg-card.selected .topup-pkg-card__check": {
    "opacity": "1",
    "transform": "scale(1)"
  }
},
{
  ".topup-pkg-card.selected .topup-pkg-card__icon": {
    "transform": "scale(1.03) rotate(-2deg)",
    "box-shadow": "0 6px 14px rgba(255, 122, 51, 0.16)"
  }
},
{
  ".topup-pkg-card__check": {
    "position": "absolute",
    "top": "14px",
    "right": "14px",
    "width": "24px",
    "height": "24px",
    "border-radius": "50%",
    "background": "linear-gradient(135deg, #ff7a33, #ff5500)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "opacity": "0",
    "transform": "scale(0.65)",
    "transition": "opacity 0.2s ease, transform 0.2s ease",
    "box-shadow": "0 4px 10px rgba(255, 122, 51, 0.18)"
  }
},
{
  ".topup-pkg-card__badge": {
    "position": "absolute",
    "top": "0",
    "left": "22px",
    "padding": "4px 12px",
    "border-radius": "0 0 10px 10px",
    "background": "linear-gradient(135deg, #ff7a33, #ff5500)",
    "color": "#fff",
    "font-size": "10px",
    "font-weight": "800",
    "letter-spacing": "0.35px",
    "box-shadow": "0 4px 10px rgba(255, 122, 51, 0.12)"
  }
},
{
  ".topup-pkg-card__top-row": {
    "display": "flex",
    "align-items": "center",
    "gap": "13px",
    "padding-top": "4px"
  }
},
{
  ".topup-pkg-card__icon-wrap": {
    "width": "54px",
    "height": "54px",
    "border-radius": "18px",
    "background": "rgba(255, 122, 51, 0.1)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "flex-shrink": "0"
  }
},
{
  ".topup-pkg-card__icon": {
    "width": "42px",
    "height": "42px",
    "border-radius": "15px",
    "background": "linear-gradient(135deg, #fff8f3, #ffe9da)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "color": "#ff7a33",
    "box-shadow": "0 4px 10px rgba(255, 122, 51, 0.1)",
    "transition": "transform 0.2s ease, box-shadow 0.2s ease"
  }
},
{
  ".topup-pkg-card__meta": {
    "min-width": "0"
  }
},
{
  ".topup-pkg-card__label": {
    "font-size": "10px",
    "color": "#ff7a33",
    "font-weight": "800",
    "text-transform": "uppercase",
    "letter-spacing": "0.45px",
    "margin-bottom": "3px"
  }
},
{
  ".topup-pkg-card__name": {
    "font-size": "12px",
    "color": "var(--text-muted)",
    "font-weight": "600",
    "line-height": "1.35",
    "white-space": "nowrap",
    "overflow": "hidden",
    "text-overflow": "ellipsis"
  }
},
{
  ".topup-pkg-card__main": {
    "text-align": "center",
    "padding": "6px 0 2px"
  }
},
{
  ".topup-pkg-card__total-coin": {
    "font-family": "var(--font-display)",
    "font-size": "2rem",
    "font-weight": "900",
    "color": "var(--text-main)",
    "line-height": "0.95",
    "letter-spacing": "-0.04em"
  }
},
{
  ".topup-pkg-card__coin-unit": {
    "font-size": "12px",
    "color": "var(--text-muted)",
    "font-weight": "700",
    "margin-top": "6px"
  }
},
{
  ".topup-pkg-card__bonus": {
    "width": "fit-content",
    "margin": "0 auto",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "5px",
    "padding": "4px 10px",
    "border-radius": "50rem",
    "background": "rgba(34, 197, 94, 0.12)",
    "color": "#16a34a",
    "font-size": "11px",
    "font-weight": "800"
  }
},
{
  ".topup-pkg-card__bonus--muted": {
    "background": "rgba(100, 116, 139, 0.09)",
    "color": "var(--text-muted)"
  }
},
{
  ".topup-pkg-card__footer": {
    "margin-top": "auto",
    "padding-top": "14px",
    "border-top": "1px dashed rgba(15, 23, 42, 0.12)",
    "display": "flex",
    "align-items": "flex-end",
    "justify-content": "space-between",
    "gap": "12px"
  }
},
{
  ".topup-pkg-card__price": {
    "font-family": "var(--font-display)",
    "font-size": "1.05rem",
    "font-weight": "900",
    "color": "var(--text-main)"
  }
},
{
  ".topup-pkg-card__footer-note": {
    "font-size": "11px",
    "color": "var(--text-muted)",
    "font-weight": "600",
    "text-align": "right",
    "white-space": "nowrap"
  }
},
{
  ".topup-method-row": {
    "display": "flex",
    "gap": "12px",
    "margin-bottom": "32px",
    "flex-wrap": "wrap"
  }
},
{
  ".topup-method-btn": {
    "display": "flex",
    "align-items": "center",
    "gap": "8px",
    "padding": "10px 18px",
    "border-radius": "50rem",
    "border": "2px solid var(--border)",
    "background": "var(--bg-card)",
    "cursor": "pointer",
    "font-size": "13px",
    "font-weight": "600",
    "color": "var(--text-muted)",
    "transition": "all 0.2s ease"
  }
},
{
  ".topup-method-btn:hover": {
    "border-color": "rgba(255, 122, 51, 0.4)",
    "color": "var(--text-main)"
  }
},
{
  ".topup-method-btn.active": {
    "border-color": "#ff7a33",
    "color": "var(--text-main)",
    "background": "rgba(255, 122, 51, 0.05)"
  }
},
{
  ".topup-cta-row": {
    "display": "flex",
    "align-items": "center",
    "gap": "16px",
    "margin-bottom": "40px"
  }
},
{
  ".topup-cta-btn": {
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "gap": "8px",
    "padding": "14px 32px",
    "border-radius": "50rem",
    "background": "linear-gradient(135deg, #ff7a33, #ff5500)",
    "color": "#fff",
    "border": "none",
    "font-family": "var(--font-display)",
    "font-size": "15px",
    "font-weight": "700",
    "cursor": "pointer",
    "transition": "box-shadow 0.2s ease, transform 0.15s ease, opacity 0.2s ease",
    "box-shadow": "0 4px 16px rgba(255, 122, 51, 0.35)",
    "min-width": "200px"
  }
},
{
  ".topup-cta-btn:hover:not(:disabled)": {
    "box-shadow": "0 6px 24px rgba(255, 122, 51, 0.5)",
    "transform": "translateY(-1px)"
  }
},
{
  ".topup-cta-btn:disabled": {
    "opacity": "0.55",
    "cursor": "not-allowed",
    "transform": "none",
    "box-shadow": "none"
  }
},
{
  ".topup-cta-note": {
    "font-size": "12px",
    "color": "var(--text-muted)",
    "line-height": "1.5"
  }
},
{
  ".topup-benefits": {
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "20px",
    "padding": "28px 28px 24px",
    "margin-top": "16px"
  }
},
{
  ".topup-benefits__title": {
    "font-family": "var(--font-display)",
    "font-size": "1rem",
    "font-weight": "700",
    "color": "var(--text-main)",
    "margin-bottom": "20px"
  }
},
{
  ".topup-benefits__grid": {
    "display": "grid",
    "grid-template-columns": "repeat(2, 1fr)",
    "gap": "16px"
  }
},
{
  "@media (max-width: 560px)": {
    ".topup-benefits__grid": {
      "grid-template-columns": "1fr"
    }
  }
},
{
  ".topup-benefit-item": {
    "display": "flex",
    "align-items": "flex-start",
    "gap": "12px"
  }
},
{
  ".topup-benefit-item__icon": {
    "width": "36px",
    "height": "36px",
    "border-radius": "10px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "flex-shrink": "0",
    "margin-top": "2px"
  }
},
{
  ".topup-benefit-item__title": {
    "font-size": "13px",
    "font-weight": "700",
    "color": "var(--text-main)",
    "margin-bottom": "2px"
  }
},
{
  ".topup-benefit-item__desc": {
    "font-size": "12px",
    "color": "var(--text-muted)",
    "line-height": "1.5"
  }
},
{
  ".topup-loading-area": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "gap": "12px",
    "padding": "48px 0",
    "color": "var(--text-muted)",
    "font-size": "14px"
  }
},
{
  ".topup-empty": {
    "text-align": "center",
    "padding": "48px 0",
    "color": "var(--text-muted)"
  }
},
{
  ".tx-history-page": {
    "max-width": "1100px",
    "margin": "0 auto"
  }
},
{
  ".tx-history-breadcrumb": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "8px",
    "margin-bottom": "22px",
    "color": "var(--text-muted)",
    "font-size": "13px",
    "font-weight": "600"
  }
},
{
  ".tx-history-hero": {
    "margin-bottom": "28px"
  }
},
{
  ".tx-history-title": {
    "font-family": "var(--font-display)",
    "font-size": "2rem",
    "font-weight": "850",
    "letter-spacing": "-0.04em",
    "margin": "0 0 8px"
  }
},
{
  ".tx-history-subtitle": {
    "color": "var(--text-muted)",
    "margin": "0",
    "max-width": "600px",
    "line-height": "1.6",
    "font-size": "0.95rem"
  }
},
{
  ".tx-history-filters": {
    "display": "flex",
    "gap": "8px",
    "margin-bottom": "20px",
    "flex-wrap": "wrap"
  }
},
{
  ".tx-filter-tab": {
    "border": "1.5px solid var(--border)",
    "background": "#fff",
    "border-radius": "99px",
    "padding": "8px 20px",
    "font-size": "13px",
    "font-weight": "750",
    "color": "var(--text-muted)",
    "transition": "all 0.16s ease"
  }
},
{
  ".tx-filter-tab:hover": {
    "border-color": "rgba(255, 122, 51, 0.42)",
    "color": "#ff6a1a"
  }
},
{
  ".tx-filter-tab.active": {
    "border-color": "#ff7a33",
    "background": "rgba(255, 122, 51, 0.08)",
    "color": "#ff6a1a"
  }
},
{
  ".tx-history-card": {
    "background": "#fff",
    "border": "1px solid rgba(15, 23, 42, 0.08)",
    "border-radius": "20px",
    "padding": "24px",
    "box-shadow": "0 10px 28px rgba(15, 23, 42, 0.04)"
  }
},
{
  ".tx-history-table-wrap": {
    "margin": "-24px",
    "overflow-x": "auto",
    "scrollbar-width": "thin",
    "scrollbar-color": "rgba(148, 163, 184, 0.45) transparent"
  }
},
{
  ".tx-history-table-wrap::-webkit-scrollbar": {
    "height": "6px"
  }
},
{
  ".tx-history-table-wrap::-webkit-scrollbar-track": {
    "background": "transparent"
  }
},
{
  ".tx-history-table-wrap::-webkit-scrollbar-thumb": {
    "background": "rgba(148, 163, 184, 0.45)",
    "border-radius": "999px"
  }
},
{
  ".tx-history-table-wrap::-webkit-scrollbar-thumb:hover": {
    "background": "rgba(100, 116, 139, 0.6)"
  }
},
{
  ".tx-history-table": {
    "width": "100%",
    "border-collapse": "collapse",
    "text-align": "left"
  }
},
{
  ".tx-history-table th,\r\n.tx-history-table td": {
    "padding": "14px 24px",
    "font-size": "13px",
    "border-bottom": "1px solid rgba(15, 23, 42, 0.06)"
  }
},
{
  ".tx-history-table th": {
    "font-weight": "800",
    "color": "var(--text-muted)",
    "background": "rgba(15, 23, 42, 0.015)",
    "font-size": "11px",
    "text-transform": "uppercase",
    "letter-spacing": "0.04em",
    "white-space": "nowrap"
  }
},
{
  ".tx-history-table-desc": {
    "display": "flex",
    "align-items": "center",
    "gap": "12px"
  }
},
{
  ".tx-history-table-type-icon": {
    "width": "28px",
    "height": "28px",
    "border-radius": "9px",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "flex-shrink": "0"
  }
},
{
  ".tx-history-table-type-icon.deposit": {
    "background": "rgba(34, 197, 94, 0.12)",
    "color": "#16a34a"
  }
},
{
  ".tx-history-table-type-icon.spend": {
    "background": "rgba(255, 122, 51, 0.1)",
    "color": "#ff6a1a"
  }
},
{
  ".tx-history-table-type-icon.refund": {
    "background": "rgba(99, 102, 241, 0.1)",
    "color": "#6366f1"
  }
},
{
  ".tx-history-table-type-label": {
    "font-weight": "800",
    "color": "var(--text-main)",
    "white-space": "nowrap"
  }
},
{
  ".tx-history-table-detail": {
    "font-size": "11px",
    "color": "var(--text-muted)",
    "margin-top": "1px",
    "max-width": "240px",
    "overflow": "hidden",
    "text-overflow": "ellipsis",
    "white-space": "nowrap"
  }
},
{
  ".tx-history-id-col": {
    "font-family": "monospace",
    "color": "var(--text-muted)",
    "font-size": "12px",
    "white-space": "nowrap"
  }
},
{
  ".tx-history-table-amount": {
    "font-family": "var(--font-display)",
    "font-weight": "850",
    "font-size": "14px",
    "white-space": "nowrap"
  }
},
{
  ".tx-history-table-amount.spend": {
    "color": "#ef4444"
  }
},
{
  ".tx-history-table-amount.deposit": {
    "color": "#22c55e"
  }
},
{
  ".tx-history-table-badge": {
    "display": "inline-flex",
    "padding": "4px 10px",
    "border-radius": "99px",
    "font-size": "11px",
    "font-weight": "800",
    "white-space": "nowrap"
  }
},
{
  ".tx-history-table-badge.success": {
    "background": "rgba(34, 197, 94, 0.1)",
    "color": "#16a34a"
  }
},
{
  ".tx-history-table-loading,\r\n.tx-history-table-empty": {
    "padding": "60px 0",
    "text-align": "center",
    "color": "var(--text-muted)",
    "font-size": "13.5px"
  }
},
{
  ".tx-history-pagination": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "gap": "16px",
    "margin-top": "24px",
    "padding-top": "20px",
    "border-top": "1px solid rgba(15, 23, 42, 0.06)"
  }
},
{
  ".tx-pagination-btn": {
    "border": "1px solid var(--border)",
    "background": "#fff",
    "border-radius": "12px",
    "padding": "6px 14px",
    "font-size": "12.5px",
    "font-weight": "750",
    "color": "var(--text-main)",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "6px"
  }
},
{
  ".tx-pagination-btn:disabled": {
    "opacity": "0.55",
    "cursor": "not-allowed"
  }
},
{
  ".tx-pagination-text": {
    "font-size": "12.5px",
    "color": "var(--text-muted)",
    "font-weight": "600"
  }
},
{
  ".wallet-checkout-page": {
    "min-height": "100vh",
    "padding-top": "80px",
    "background": "var(--bg-main)",
    "color": "var(--text-main)"
  }
},
{
  ".wallet-checkout-inner": {
    "max-width": "1080px",
    "margin": "0 auto",
    "padding": "36px 16px 72px"
  }
},
{
  ".wallet-checkout-breadcrumb": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "8px",
    "margin-bottom": "22px",
    "color": "var(--text-muted)",
    "font-size": "13px",
    "font-weight": "600"
  }
},
{
  ".wallet-checkout-breadcrumb button": {
    "border": "0",
    "background": "transparent",
    "color": "#ff7a33",
    "font-weight": "700",
    "padding": "0"
  }
},
{
  ".wallet-checkout-hero": {
    "display": "flex",
    "align-items": "flex-end",
    "justify-content": "space-between",
    "gap": "20px",
    "margin-bottom": "28px"
  }
},
{
  ".wallet-checkout-title": {
    "font-family": "var(--font-display)",
    "font-size": "2rem",
    "font-weight": "850",
    "letter-spacing": "-0.04em",
    "margin": "0 0 8px"
  }
},
{
  ".wallet-checkout-subtitle": {
    "color": "var(--text-muted)",
    "margin": "0",
    "max-width": "540px",
    "line-height": "1.6",
    "font-size": "0.95rem"
  }
},
{
  ".wallet-checkout-secure": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "8px",
    "padding": "9px 14px",
    "border-radius": "999px",
    "background": "rgba(34, 197, 94, 0.1)",
    "color": "#16a34a",
    "font-size": "12px",
    "font-weight": "800",
    "white-space": "nowrap"
  }
},
{
  ".wallet-checkout-grid": {
    "display": "grid",
    "grid-template-columns": "minmax(0, 1.15fr) minmax(320px, 0.85fr)",
    "gap": "22px",
    "align-items": "start"
  }
},
{
  ".wallet-checkout-stack": {
    "display": "flex",
    "flex-direction": "column",
    "gap": "18px"
  }
},
{
  ".wallet-checkout-card": {
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "24px",
    "padding": "24px",
    "box-shadow": "0 10px 28px rgba(15, 23, 42, 0.055)"
  }
},
{
  ".wallet-checkout-card-title": {
    "display": "flex",
    "align-items": "center",
    "gap": "10px",
    "font-size": "0.98rem",
    "font-weight": "850",
    "margin-bottom": "18px"
  }
},
{
  ".wallet-checkout-card-title__icon": {
    "width": "34px",
    "height": "34px",
    "border-radius": "12px",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "background": "rgba(255, 122, 51, 0.11)",
    "color": "#ff7a33"
  }
},
{
  ".checkout-package-card": {
    "display": "flex",
    "align-items": "center",
    "gap": "18px",
    "padding": "18px",
    "border-radius": "20px",
    "border": "1px solid rgba(255, 122, 51, 0.22)",
    "background": "linear-gradient(135deg, rgba(255, 122, 51, 0.055), rgba(255, 255, 255, 0.02))"
  }
},
{
  ".checkout-package-icon": {
    "width": "64px",
    "height": "64px",
    "border-radius": "22px",
    "background": "linear-gradient(135deg, #fff8f3, #ffe8d8)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "flex-shrink": "0",
    "color": "#ff7a33"
  }
},
{
  ".checkout-package-main": {
    "min-width": "0",
    "flex": "1"
  }
},
{
  ".checkout-package-name": {
    "font-weight": "850",
    "font-size": "1.05rem",
    "margin-bottom": "6px"
  }
},
{
  ".checkout-package-meta": {
    "color": "var(--text-muted)",
    "font-size": "13px"
  }
},
{
  ".checkout-package-coin": {
    "font-family": "var(--font-display)",
    "font-weight": "900",
    "font-size": "1.7rem",
    "letter-spacing": "-0.04em",
    "text-align": "right",
    "white-space": "nowrap"
  }
},
{
  ".checkout-package-coin span": {
    "display": "block",
    "color": "#ff7a33",
    "font-size": "12px",
    "font-weight": "800",
    "letter-spacing": "0",
    "margin-top": "3px"
  }
},
{
  ".checkout-method-list": {
    "display": "grid",
    "gap": "12px"
  }
},
{
  ".checkout-method-item": {
    "width": "100%",
    "border": "1.5px solid var(--border)",
    "background": "var(--bg-card)",
    "border-radius": "18px",
    "padding": "15px 16px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "14px",
    "color": "var(--text-main)"
  }
},
{
  ".checkout-method-item.active": {
    "border-color": "#ff7a33",
    "background": "rgba(255, 122, 51, 0.035)"
  }
},
{
  ".checkout-method-left": {
    "display": "flex",
    "align-items": "center",
    "gap": "12px"
  }
},
{
  ".checkout-method-icon": {
    "width": "38px",
    "height": "38px",
    "border-radius": "13px",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "background": "rgba(255, 122, 51, 0.09)"
  }
},
{
  ".checkout-method-name": {
    "font-weight": "800",
    "font-size": "14px"
  }
},
{
  ".checkout-method-desc": {
    "color": "var(--text-muted)",
    "font-size": "12px",
    "margin-top": "2px"
  }
},
{
  ".checkout-summary-card": {
    "position": "sticky",
    "top": "96px"
  }
},
{
  ".checkout-summary-row,\r\n.checkout-summary-total": {
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "gap": "16px"
  }
},
{
  ".checkout-summary-row": {
    "color": "var(--text-muted)",
    "font-size": "14px",
    "padding": "10px 0"
  }
},
{
  ".checkout-summary-row strong": {
    "color": "var(--text-main)",
    "font-weight": "800"
  }
},
{
  ".checkout-summary-divider": {
    "height": "1px",
    "background": "var(--border)",
    "margin": "10px 0"
  }
},
{
  ".checkout-summary-total": {
    "align-items": "flex-end",
    "padding": "12px 0 18px"
  }
},
{
  ".checkout-summary-total__label": {
    "font-size": "13px",
    "color": "var(--text-muted)"
  }
},
{
  ".checkout-summary-total__value": {
    "font-family": "var(--font-display)",
    "font-size": "1.55rem",
    "font-weight": "900",
    "color": "var(--text-main)",
    "letter-spacing": "-0.04em"
  }
},
{
  ".checkout-pay-btn,\r\n.checkout-back-btn": {
    "width": "100%",
    "border-radius": "999px",
    "min-height": "46px",
    "font-weight": "850",
    "display": "inline-flex",
    "align-items": "center",
    "justify-content": "center",
    "gap": "9px"
  }
},
{
  ".checkout-pay-btn": {
    "border": "0",
    "background": "linear-gradient(135deg, #ff7a33, #ff5608)",
    "color": "#fff",
    "box-shadow": "0 8px 18px rgba(255, 122, 51, 0.2)"
  }
},
{
  ".checkout-pay-btn:disabled": {
    "opacity": "0.6",
    "cursor": "not-allowed",
    "box-shadow": "none"
  }
},
{
  ".checkout-back-btn": {
    "margin-top": "10px",
    "background": "transparent",
    "border": "1px solid var(--border)",
    "color": "var(--text-main)"
  }
},
{
  ".checkout-note": {
    "margin-top": "14px",
    "display": "flex",
    "gap": "8px",
    "color": "var(--text-muted)",
    "font-size": "12px",
    "line-height": "1.5"
  }
},
{
  ".checkout-state": {
    "min-height": "320px",
    "display": "grid",
    "place-items": "center",
    "text-align": "center",
    "color": "var(--text-muted)"
  }
},
{
  ".checkout-error-box": {
    "margin-top": "14px",
    "padding": "12px 14px",
    "border-radius": "14px",
    "background": "rgba(239, 68, 68, 0.08)",
    "color": "#dc2626",
    "border": "1px solid rgba(239, 68, 68, 0.16)",
    "font-size": "13px"
  }
},
{
  "@media (max-width: 900px)": [
    {
      ".wallet-checkout-grid": {
        "grid-template-columns": "1fr"
      }
    },
    {
      ".checkout-summary-card": {
        "position": "static"
      }
    }
  ]
},
{
  "@media (max-width: 640px)": [
    {
      ".wallet-checkout-hero,\r\n  .checkout-package-card": {
        "align-items": "flex-start",
        "flex-direction": "column"
      }
    },
    {
      ".checkout-package-coin": {
        "text-align": "left"
      }
    },
    {
      ".wallet-checkout-card": {
        "padding": "20px",
        "border-radius": "20px"
      }
    }
  ]
},
{
  ".geography-page-wrapper": {
    "background-color": "var(--bg-main)",
    "min-height": "100vh",
    "padding-top": "80px",
    "padding-bottom": "80px",
    "position": "relative"
  }
},
{
  ".geography-breadcrumb": {
    "font-family": "var(--font-display)",
    "font-size": "0.82rem",
    "color": "var(--text-muted)",
    "margin-bottom": "0.75rem"
  }
},
{
  ".geography-breadcrumb-active": {
    "color": "var(--primary) !important",
    "font-weight": "500"
  }
},
{
  ".geography-title": {
    "font-family": "var(--font-display) !important",
    "font-weight": "600 !important",
    "color": "var(--text-main)",
    "letter-spacing": "-0.02em",
    "margin-bottom": "0.5rem"
  }
},
{
  ".geography-subtitle": {
    "font-family": "var(--font-display)",
    "color": "var(--text-muted)",
    "font-size": "0.88rem",
    "font-weight": "400",
    "line-height": "1.5"
  }
},
{
  ".geography-select": {
    "background-color": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-size": "0.85rem",
    "font-weight": "500",
    "border-radius": "8px",
    "padding": "0.45rem 2rem 0.45rem 0.75rem",
    "cursor": "pointer",
    "transition": "border-color 0.18s ease, box-shadow 0.18s ease",
    "box-shadow": "0 1px 2px rgba(0, 0, 0, 0.02)"
  }
},
{
  ".geography-select:focus": {
    "border-color": "var(--primary) !important",
    "box-shadow": "0 0 0 3px var(--primary-light) !important",
    "outline": "none"
  }
},
{
  ".geography-search-wrapper": {
    "position": "relative",
    "width": "100%"
  }
},
{
  ".geography-search-icon": {
    "position": "absolute",
    "left": "12px",
    "top": "50%",
    "transform": "translateY(-50%)",
    "color": "var(--text-muted)",
    "pointer-events": "none"
  }
},
{
  ".geography-search-input": {
    "font-family": "var(--font-display)",
    "font-size": "0.85rem",
    "background-color": "var(--bg-chip) !important",
    "border": "1px solid var(--border) !important",
    "color": "var(--text-main) !important",
    "border-radius": "6px",
    "padding-left": "34px !important",
    "transition": "all 0.2s ease",
    "height": "38px"
  }
},
{
  ".geography-search-input::placeholder": {
    "color": "var(--text-muted)"
  }
},
{
  ".geography-search-input:focus": {
    "background-color": "var(--bg-card) !important",
    "border-color": "var(--primary) !important",
    "box-shadow": "0 0 0 3px var(--primary-light) !important",
    "outline": "none"
  }
},
{
  ".geography-ranking-row": {
    "cursor": "pointer",
    "transition": "all 0.15s ease",
    "border-left": "3px solid transparent"
  }
},
{
  ".geography-ranking-row:hover": {
    "background-color": "var(--bg-chip) !important"
  }
},
{
  ".geography-ranking-row.is-active": {
    "background-color": "var(--primary-light) !important",
    "border-left-color": "var(--primary) !important"
  }
},
{
  ".geography-table": {
    "font-family": "var(--font-display) !important",
    "font-size": "0.85rem"
  }
},
{
  ".geography-table th": {
    "color": "var(--text-muted) !important",
    "font-size": "0.72rem",
    "font-weight": "600 !important",
    "letter-spacing": "0.08em",
    "text-transform": "uppercase",
    "padding": "0.75rem 0.5rem !important",
    "border-bottom": "2px solid var(--border) !important"
  }
},
{
  ".geography-table td": {
    "padding": "0.85rem 0.5rem !important",
    "border-bottom": "1px solid var(--border) !important"
  }
},
{
  ".geography-chart-bar-horizontal": {
    "border": "none !important",
    "cursor": "pointer",
    "background": "#18181b",
    "box-shadow": "0 4px 12px rgba(0, 0, 0, 0.12)",
    "transition": "width 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease"
  }
},
{
  ".bar-row-container": {
    "transition": "transform 0.2s ease"
  }
},
{
  ".bar-row-container:hover": {
    "transform": "translateX(4px)"
  }
},
{
  ".bar-row-container:hover .geography-chart-bar-horizontal,\r\n.geography-chart-bar-horizontal.is-active,\r\n.bar-row-container.is-selected .geography-chart-bar-horizontal": {
    "background": "linear-gradient(90deg, #FF9E66 0%, var(--primary) 100%) !important",
    "box-shadow": "0 6px 20px rgba(255, 122, 51, 0.4) !important"
  }
},
{
  ".flag-wrapper": {
    "transition": "transform 0.2s ease"
  }
},
{
  ".bar-row-container:hover .flag-wrapper": {
    "transform": "scale(1.15)"
  }
},
{
  ".bar-value-inside": {
    "color": "#ffffff !important",
    "font-weight": "700"
  }
},
{
  ".geography-chart-tooltip": {
    "background-color": "#071a1c !important",
    "border": "1px solid rgba(255, 255, 255, 0.1)",
    "color": "#ffffff !important",
    "padding": "6px 10px",
    "border-radius": "6px",
    "font-size": "0.72rem",
    "font-weight": "500",
    "box-shadow": "0 4px 12px rgba(0, 0, 0, 0.12)",
    "pointer-events": "none",
    "z-index": "100",
    "opacity": "0",
    "visibility": "hidden",
    "transform": "translateY(0)",
    "transition": "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease"
  }
},
{
  ".bar-container:hover .geography-chart-tooltip": {
    "opacity": "1",
    "visibility": "visible",
    "transform": "translateY(-4px)"
  }
},
{
  ".geography-chart-value-label": {
    "transition": "opacity 0.2s ease"
  }
},
{
  ".bar-container:hover .geography-chart-value-label": {
    "opacity": "0 !important"
  }
},
{
  ".geography-topic-badge": {
    "display": "inline-flex",
    "align-items": "center",
    "background-color": "var(--bg-chip)",
    "color": "var(--text-muted)",
    "border": "1px solid var(--border)",
    "border-radius": "6px",
    "font-family": "var(--font-display)",
    "font-size": "0.7rem",
    "font-weight": "500",
    "padding": "0.22rem 0.55rem",
    "transition": "all 0.18s ease"
  }
},
{
  ".geography-topic-badge:hover": {
    "background-color": "var(--primary-light)",
    "border-color": "var(--primary)",
    "color": "var(--primary)"
  }
},
{
  ".geography-oa-badge": {
    "display": "inline-flex",
    "align-items": "center",
    "background-color": "rgba(47, 198, 70, 0.08)",
    "color": "var(--q1-color)",
    "border": "1px solid rgba(47, 198, 70, 0.18)",
    "border-radius": "6px",
    "font-family": "var(--font-display)",
    "font-size": "0.7rem",
    "font-weight": "600",
    "padding": "0.22rem 0.55rem"
  }
},
{
  ".geography-article-row": {
    "cursor": "pointer",
    "transition": "background-color 0.15s ease"
  }
},
{
  ".geography-article-row:hover": {
    "background-color": "var(--bg-chip) !important"
  }
},
{
  ".geography-article-title": {
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-weight": "600",
    "font-size": "0.88rem",
    "line-height": "1.45",
    "transition": "color 0.15s ease"
  }
},
{
  ".geography-article-row:hover .geography-article-title": {
    "color": "var(--primary)"
  }
},
{
  ".geography-link-accent": {
    "color": "var(--primary)",
    "font-weight": "600",
    "font-size": "0.78rem",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "2px",
    "transition": "color 0.15s ease, transform 0.15s ease"
  }
},
{
  ".geography-article-row:hover .geography-link-accent": {
    "color": "#e8632a"
  }
},
{
  ".custom-pagination .MuiPaginationItem-root": {
    "font-family": "var(--font-display) !important",
    "font-weight": "500 !important",
    "border-radius": "6px !important",
    "margin": "0 2px !important"
  }
},
{
  ":root": {
    "--font-display": "\"Roboto\", sans-serif",
    "--bg-main": "#ffffff",
    "--bg-section": "#ececec",
    "--bg-chip": "#f2f2f2",
    "--bg-card": "#ffffff",
    "--border": "#e6e6e6",
    "--text-main": "#0d1b1c",
    "--text-muted": "#6b6b6b",
    "--primary": "#ff7a33",
    "--primary-light": "#fff0e8",
    "--btn-dark": "#071a1c",
    "--q1-color": "#ff7a33",
    "--dark-bg": "var(--bg-main)",
    "--dark-card": "var(--bg-card)",
    "--dark-border": "var(--border)",
    "--brand-accent": "var(--primary)",
    "--glow-accent": "rgba(255, 122, 51, 0.08)"
  }
},
{
  "html,\r\nbody": {
    "background-color": "var(--bg-main)",
    "color": "var(--text-main)",
    "font-family": "var(--font-display)",
    "font-weight": "400",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    "text-rendering": "optimizeLegibility",
    "overflow-x": "hidden",
    "max-width": "100vw",
    "transition": "background-color 0.3s ease,\r\n    color 0.3s ease"
  }
},
{
  ".grid-bg": {
    "background-color": "var(--bg-main)",
    "background-image": "linear-gradient(rgba(236, 236, 236, 0.6) 1px, transparent 1px),\r\n    linear-gradient(90deg, rgba(236, 236, 236, 0.6) 1px, transparent 1px)",
    "background-size": "40px 40px",
    "background-position": "center top"
  }
},
{
  ".radial-fade": {
    "background": "radial-gradient(\r\n    circle at 50% 30%,\r\n    transparent 10%,\r\n    var(--bg-main) 85%\r\n  )"
  }
},
{
  "::-webkit-scrollbar": {
    "width": "8px"
  }
},
{
  "::-webkit-scrollbar-track": {
    "background": "var(--bg-main)"
  }
},
{
  "::-webkit-scrollbar-thumb": {
    "background": "#cbd5e1",
    "border-radius": "4px"
  }
},
{
  "::-webkit-scrollbar-thumb:hover": {
    "background": "#94a3b8"
  }
},
{
  "html, body": {
    "scrollbar-width": "none",
    "-ms-overflow-style": "none"
  }
},
{
  "html::-webkit-scrollbar,\r\nbody::-webkit-scrollbar": {
    "width": "0",
    "height": "0"
  }
},
{
  ".btn-view-trends": {
    "font-size": "0.875rem",
    "letter-spacing": "0.03em",
    "background": "var(--bg-chip) !important",
    "border": "1px solid var(--border) !important",
    "color": "var(--text-main) !important",
    "transition": "all 0.25s ease"
  }
},
{
  ".btn-view-trends-icon": {
    "color": "var(--primary)",
    "transition": "all 0.25s ease"
  }
},
{
  ".btn-view-trends:hover": {
    "background": "#e5e5e5 !important",
    "border-color": "#d4d4d4 !important",
    "color": "var(--text-main) !important",
    "transform": "translateY(-2px)",
    "box-shadow": "0 4px 12px rgba(0, 0, 0, 0.05)"
  }
},
{
  ".btn-view-trends:hover .btn-view-trends-icon": {
    "color": "var(--primary) !important",
    "transform": "scale(1.08)"
  }
},
{
  "::selection": {
    "background": "var(--primary-light)",
    "color": "var(--text-main)"
  }
},
{
  ".text-main": {
    "color": "var(--text-main) !important"
  }
},
{
  ".text-muted-custom": {
    "color": "var(--text-muted) !important"
  }
},
{
  "header.sticky-scrolled": {
    "background-color": "rgba(255, 255, 255, 0.92)",
    "backdrop-filter": "blur(12px)",
    "border-bottom": "1px solid var(--border)",
    "box-shadow": "0 4px 20px rgba(0, 0, 0, 0.05)"
  }
},
{
  ".glass-card": {
    "background": "rgba(255, 255, 255, 0.85)",
    "backdrop-filter": "blur(8px)",
    "border": "1px solid var(--border)",
    "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  }
},
{
  ".glass-card:hover": {
    "border-color": "var(--primary)",
    "box-shadow": "0 10px 30px -10px rgba(255, 122, 51, 0.12)",
    "transform": "translateY(-2px)"
  }
},
{
  ".glow-text-accent": {
    "text-shadow": "0 0 10px rgba(255, 122, 51, 0.2)"
  }
},
{
  ".btn-primary-glow": {
    "background": "var(--primary)",
    "border": "none",
    "color": "#ffffff !important",
    "font-weight": "600",
    "box-shadow": "0 4px 14px rgba(255, 122, 51, 0.25)",
    "transition": "all 0.3s ease"
  }
},
{
  ".btn-primary-glow:hover": {
    "background": "#e8632a",
    "box-shadow": "0 6px 20px rgba(255, 122, 51, 0.4)",
    "transform": "translateY(-1px)",
    "color": "#ffffff !important"
  }
},
{
  ".btn-dark-solid": {
    "background": "var(--btn-dark)",
    "border": "none",
    "color": "#ffffff !important",
    "font-weight": "600",
    "box-shadow": "0 4px 14px rgba(7, 26, 28, 0.2)",
    "transition": "all 0.3s ease"
  }
},
{
  ".btn-dark-solid:hover": {
    "background": "#0f2e31",
    "transform": "translateY(-1px)",
    "color": "#ffffff !important"
  }
},
{
  ".glow-gradient-text": {
    "background": "var(--primary)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    "display": "inline-block"
  }
},
{
  ".bg-dark-bg": {
    "background-color": "var(--bg-main)"
  }
},
{
  ".font-display": {
    "font-family": "var(--font-display)"
  }
},
{
  ".animate-spin-slow": {
    "animation": "spin 8s linear infinite"
  }
},
{
  "@keyframes spin": [
    {
      "from": {
        "transform": "rotate(0deg)"
      }
    },
    {
      "to": {
        "transform": "rotate(360deg)"
      }
    }
  ]
},
{
  ".custom-scrollbar::-webkit-scrollbar": {
    "width": "6px"
  }
},
{
  ".custom-scrollbar::-webkit-scrollbar-track": {
    "background": "transparent"
  }
},
{
  ".custom-scrollbar::-webkit-scrollbar-thumb": {
    "background": "rgba(0, 0, 0, 0.1)",
    "border-radius": "3px"
  }
},
{
  ".custom-scrollbar::-webkit-scrollbar-thumb:hover": {
    "background": "rgba(0, 0, 0, 0.2)"
  }
},
{
  ".tab-nav-custom": {
    "border-bottom": "1px solid var(--border)"
  }
},
{
  ".dropdown-toggle::after": {
    "display": "none !important"
  }
},
{
  ".tab-nav-custom .MuiLink-root": {
    "color": "var(--text-muted)",
    "border": "none",
    "border-bottom": "2px solid transparent",
    "padding": "0.75rem 1.25rem",
    "font-weight": "500",
    "transition": "all 0.2s ease",
    "background": "transparent"
  }
},
{
  ".tab-nav-custom .MuiLink-root:hover": {
    "color": "var(--text-main)"
  }
},
{
  ".tab-nav-custom .MuiLink-root.Mui-selected": {
    "color": "var(--primary)",
    "border-bottom": "2px solid var(--primary)",
    "background": "transparent"
  }
},
{
  ".journal-dark-card": {
    "background": "var(--bg-card)",
    "border": "1px solid var(--border)",
    "border-radius": "12px"
  }
},
{
  ".navbar-brand,\r\n.logo-title,\r\n.system-logo,\r\n.brand-font": {
    "font-family": "var(--font-display) !important",
    "font-weight": "700 !important"
  }
},
{
  "h1,\r\nh2,\r\nh3,\r\n.page-title,\r\n.font-display": {
    "font-family": "var(--font-display) !important",
    "font-weight": "600 !important"
  }
},
{
  "body,\r\np,\r\nspan,\r\nli,\r\ndiv,\r\ninput,\r\ntextarea,\r\nselect": {
    "font-family": "var(--font-display)",
    "font-weight": "400"
  }
},
{
  ".MuiLink-root,\r\n.sidebar-link,\r\n.menu-item,\r\n.nav-item": {
    "font-family": "var(--font-display) !important",
    "font-weight": "500 !important"
  }
},
{
  ".btn,\r\nbutton,\r\n.btn-custom": {
    "font-family": "var(--font-display) !important",
    "font-weight": "500 !important"
  }
},
{
  ".btn-fw-600,\r\n.btn-primary-glow": {
    "font-weight": "600 !important"
  }
},
{
  ".table td,\r\n.table th,\r\ntable,\r\ntd,\r\nth": {
    "font-family": "var(--font-display) !important",
    "font-weight": "400 !important"
  }
},
{
  ".table th,\r\nth,\r\n.table-header": {
    "font-weight": "500 !important"
  }
},
{
  ".badge,\r\n.tag,\r\n.badge-custom": {
    "font-family": "var(--font-display) !important",
    "font-weight": "500 !important"
  }
},
{
  "@keyframes skeleton-wave": [
    {
      "0%": {
        "background-position": "-200% 0"
      }
    },
    {
      "100%": {
        "background-position": "200% 0"
      }
    }
  ]
},
{
  ".skeleton-shimmer": {
    "background": "linear-gradient(\r\n    90deg,\r\n    #e8e8e8 25%,\r\n    #ffffff 50%,\r\n    #e8e8e8 75%\r\n  )",
    "background-size": "200% 100%",
    "animation": "skeleton-wave 1.5s ease-in-out infinite",
    "border-radius": "6px"
  }
},
{
  ".btn-primary-glow": {
    "background": "var(--primary) !important",
    "color": "#fff !important",
    "border": "none !important",
    "box-shadow": "0 2px 12px rgba(255, 122, 51, 0.18)",
    "transition": "transform 0.15s ease,\r\n    box-shadow 0.15s ease,\r\n    background-color 0.15s ease"
  }
},
{
  ".btn-primary-glow:hover": {
    "transform": "translateY(-1px)",
    "box-shadow": "0 4px 18px rgba(255, 122, 51, 0.22)",
    "background": "#e8632a !important"
  }
},
{
  ".btn-primary-glow:active": {
    "transform": "translateY(0)"
  }
},
{
  ".text-main": {
    "color": "var(--text-main) !important"
  }
},
{
  ".text-muted-custom": {
    "color": "var(--text-muted) !important"
  }
},
{
  ".bg-card": {
    "background-color": "var(--bg-card) !important"
  }
},
{
  ".sandbox-tag": {
    "font-size": "0.75rem",
    "background": "var(--bg-chip) !important",
    "border": "none !important",
    "color": "var(--text-muted) !important",
    "transition": "all 0.2s ease !important"
  }
},
{
  ".sandbox-tag:hover": {
    "background": "var(--primary-light) !important",
    "color": "var(--primary) !important"
  }
},
{
  ".sandbox-result-item": {
    "background-color": "var(--bg-chip) !important",
    "border": "1px solid var(--border) !important",
    "transition": "all 0.2s ease-in-out !important"
  }
},
{
  ".sandbox-result-item:hover": {
    "border-color": "var(--primary-light) !important",
    "background-color": "var(--bg-card) !important"
  }
},
{
  ".sandbox-result-item.is-journal": {
    "cursor": "pointer !important"
  }
},
{
  ".sandbox-result-item.is-journal:hover": {
    "border-color": "var(--primary) !important",
    "background-color": "var(--primary-light) !important"
  }
},
{
  ".auth-required-register-btn:hover": {
    "background-color": "var(--btn-dark) !important",
    "border-color": "var(--btn-dark) !important",
    "color": "#ffffff !important",
    "transform": "translateY(-1px)",
    "box-shadow": "0 4px 12px rgba(7, 26, 28, 0.16)"
  }
},
{
  ".auth-required-register-btn:active": {
    "transform": "translateY(0)"
  }
},
{
  ".account-form-input": {
    "background-color": "#f1f5f9 !important",
    "border": "none !important",
    "border-radius": "8px !important",
    "font-size": "0.88rem !important",
    "padding": "0.65rem 1rem !important",
    "color": "var(--text-main) !important",
    "transition": "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important"
  }
},
{
  "input.account-form-input,\r\nselect.account-form-input": {
    "height": "46px !important"
  }
},
{
  ".account-form-input::placeholder": {
    "color": "#94a3b8 !important",
    "opacity": "1 !important"
  }
},
{
  ".account-form-input:focus": {
    "background-color": "#f1f5f9 !important",
    "outline": "0 !important",
    "box-shadow": "0 0 0 2px rgba(255, 122, 51, 0.25) !important"
  }
},
{
  ".account-form-label": {
    "font-size": "0.825rem !important",
    "font-weight": "600 !important",
    "color": "#334155 !important",
    "margin-bottom": "6px !important"
  }
},
{
  ".orange-switch-toggle .form-check-input": {
    "cursor": "pointer",
    "scale": "1.15"
  }
},
{
  ".orange-switch-toggle .form-check-input:checked": {
    "background-color": "#ea580c !important",
    "border-color": "#ea580c !important"
  }
},
{
  ".premium-dropzone": {
    "border": "1.5px dashed #fdba74 !important",
    "background-color": "#fafafa !important",
    "transition": "all 0.2s ease-in-out !important",
    "min-height": "280px",
    "cursor": "pointer"
  }
},
{
  ".premium-dropzone.drag-active": {
    "border": "2px dashed #ea580c !important",
    "background-color": "#fff0e8 !important"
  }
},
{
  ".premium-dropzone-icon-wrapper": {
    "width": "56px",
    "height": "56px",
    "background-color": "#fff0e8 !important",
    "color": "#ea580c !important"
  }
},
{
  ".premium-dropzone-btn": {
    "border": "1px solid #ea580c !important",
    "color": "#ea580c !important",
    "background-color": "#ffffff !important",
    "font-size": "0.85rem !important",
    "font-weight": "700 !important",
    "transition": "all 0.2s ease-in-out !important"
  }
},
{
  ".premium-dropzone-btn:hover": {
    "background-color": "#ea580c !important",
    "color": "#ffffff !important"
  }
},
{
  ".project-card-recent-hover": {
    "transition": "all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important"
  }
},
{
  ".project-card-recent-hover:hover": {
    "border-color": "var(--primary) !important",
    "background-color": "rgba(255, 112, 47, 0.02) !important",
    "transform": "translateY(-2px)",
    "box-shadow": "0 10px 22px rgba(255, 112, 47, 0.06) !important"
  }
},
{
  ".project-card-recent-hover:hover .recent-arrow-icon": {
    "color": "var(--primary) !important",
    "transform": "translateX(4px)"
  }
},
{
  ".recent-arrow-icon": {
    "transition": "all 0.22s ease"
  }
},
{
  ".dropdown-item-custom-hover": {
    "transition": "all 0.2s ease !important"
  }
},
{
  ".dropdown-item-custom-hover:hover,\r\n.dropdown-item-custom-hover:focus": {
    "background-color": "var(--primary) !important",
    "color": "#ffffff !important"
  }
},
{
  ".dropdown-item-custom-hover:hover svg,\r\n.dropdown-item-custom-hover:focus svg,\r\n.dropdown-item-custom-hover:hover .text-danger,\r\n.dropdown-item-custom-hover:focus .text-danger": {
    "color": "#ffffff !important"
  }
},
{
  ":root": {
    "--text-secondary": "#475569",
    "--text-subtle": "#94a3b8",
    "--divider": "#eef0f3",
    "--negative": "#b42318",
    "--radius-sm": "8px",
    "--radius-md": "10px"
  }
},
{
  ".hairline": {
    "border-color": "var(--divider) !important"
  }
},
{
  ".glass-card--flat:hover": {
    "transform": "none",
    "box-shadow": "none",
    "border-color": "var(--border)"
  }
},
{
  ".po-header": {
    "background": "#fff",
    "border": "1px solid var(--border)",
    "border-radius": "var(--radius-md)",
    "padding": "0.875rem 1.25rem"
  }
},
{
  "@media (min-width: 768px)": {
    ".po-header": {
      "padding": "1.125rem 1.5rem"
    }
  }
},
{
  ".po-metrics": {
    "display": "grid",
    "grid-template-columns": "repeat(4, minmax(0, 1fr))",
    "margin-top": "0.875rem",
    "padding-top": "0.875rem",
    "border-top": "1px solid var(--divider)",
    "gap": "0"
  }
},
{
  "@media (max-width: 767.98px)": {
    ".po-metrics": {
      "grid-template-columns": "repeat(2, minmax(0, 1fr))"
    }
  }
},
{
  ".po-metric": {
    "padding": "0 1rem",
    "border-left": "1px solid var(--divider)"
  }
},
{
  ".po-metric:first-of-type": {
    "border-left": "0",
    "padding-left": "0"
  }
},
{
  "@media (max-width: 767.98px)": [
    {
      ".po-metric": {
        "padding": "0.625rem 0.75rem",
        "border-left": "0",
        "border-top": "1px solid var(--divider)"
      }
    },
    {
      ".po-metric:nth-of-type(-n+2)": {
        "border-top": "0"
      }
    },
    {
      ".po-metric:nth-of-type(odd)": {
        "padding-left": "0"
      }
    },
    {
      ".po-metric:nth-of-type(even)": {
        "border-left": "1px solid var(--divider)"
      }
    }
  ]
},
{
  ".po-metric__label": {
    "font-size": "0.7rem",
    "color": "var(--text-subtle)",
    "text-transform": "uppercase",
    "letter-spacing": "0.06em",
    "font-weight": "600",
    "margin-bottom": "0.25rem"
  }
},
{
  ".po-metric__value": {
    "font-size": "1.5rem",
    "font-weight": "700",
    "color": "var(--text-main)",
    "letter-spacing": "-0.01em",
    "line-height": "1.1",
    "display": "flex",
    "align-items": "center",
    "gap": "0.4rem",
    "font-variant-numeric": "tabular-nums",
    "font-feature-settings": "\"tnum\" 1"
  }
},
{
  ".po-metric__value.is-negative": {
    "color": "var(--negative)"
  }
},
{
  ".po-metric__value.is-positive": {
    "color": "#15803d"
  }
},
{
  ".po-tabs": {
    "display": "flex",
    "gap": "1.75rem",
    "border-bottom": "1px solid var(--divider)",
    "margin-top": "1.125rem",
    "padding-left": "0.25rem"
  }
},
{
  ".po-tab": {
    "background": "transparent",
    "border": "0",
    "padding": "0.75rem 0",
    "font-size": "0.875rem",
    "font-weight": "500",
    "color": "var(--text-muted)",
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.5rem",
    "border-bottom": "2px solid transparent",
    "margin-bottom": "-1px",
    "cursor": "pointer",
    "transition": "color 0.15s ease, border-color 0.15s ease"
  }
},
{
  ".po-tab:hover": {
    "color": "var(--text-main)"
  }
},
{
  ".po-tab.is-active": {
    "color": "var(--text-main)",
    "border-bottom-color": "var(--primary)",
    "font-weight": "600"
  }
},
{
  ".po-tab__count": {
    "color": "var(--text-subtle)",
    "font-weight": "500"
  }
},
{
  ".po-tab.is-active .po-tab__count": {
    "color": "var(--text-muted)"
  }
},
{
  ".po-status": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.4rem",
    "font-size": "0.75rem",
    "font-weight": "500",
    "color": "var(--text-muted)",
    "line-height": "1.2",
    "white-space": "nowrap",
    "flex-shrink": "0",
    "letter-spacing": "0.005em"
  }
},
{
  ".po-status__dot": {
    "width": "6px",
    "height": "6px",
    "border-radius": "50%",
    "background": "#94a3b8",
    "flex-shrink": "0"
  }
},
{
  ".po-status.is-active": {
    "color": "#15803d"
  }
},
{
  ".po-status.is-active .po-status__dot": {
    "background": "#16a34a"
  }
},
{
  ".po-metric__value--hero": {
    "font-size": "clamp(1.875rem, 1.5rem + 1.5vw, 2.25rem) !important",
    "font-weight": "800 !important",
    "letter-spacing": "-0.03em !important",
    "color": "var(--text-main) !important",
    "line-height": "1.05 !important"
  }
},
{
  ".po-metric__value--strong": {
    "font-size": "clamp(1.5rem, 1.375rem + 0.5vw, 1.75rem) !important",
    "font-weight": "700 !important",
    "letter-spacing": "-0.02em !important",
    "color": "var(--text-main) !important",
    "line-height": "1.1 !important"
  }
},
{
  ".po-metric__value--strong.is-negative": {
    "color": "var(--negative) !important"
  }
},
{
  ".po-metric__value--strong.is-positive": {
    "color": "#15803d !important"
  }
},
{
  ".po-metric__value--muted": {
    "font-size": "1.0625rem !important",
    "font-weight": "600 !important",
    "letter-spacing": "-0.005em !important",
    "color": "var(--text-subtle) !important",
    "line-height": "1.2 !important"
  }
},
{
  ".po-breadcrumb": {
    "font-size": "0.75rem",
    "color": "var(--text-subtle)",
    "letter-spacing": "0.01em"
  }
},
{
  ".po-breadcrumb > .MuiBox-root": {
    "margin-bottom": "0"
  }
},
{
  ".po-breadcrumb > .MuiBox-root > .MuiBox-root": {
    "color": "var(--text-subtle)",
    "text-decoration": "none",
    "font-weight": "400"
  }
},
{
  ".po-breadcrumb > .MuiBox-root > .MuiBox-root a:hover": {
    "color": "var(--text-muted)"
  }
},
{
  ".po-breadcrumb .active": {
    "color": "var(--text-muted)",
    "font-weight": "500"
  }
},
{
  ".po-meta": {
    "display": "inline-flex",
    "align-items": "center",
    "gap": "0.5rem",
    "font-size": "0.75rem",
    "color": "var(--text-subtle)",
    "letter-spacing": "0.005em",
    "font-weight": "500",
    "margin-bottom": "0.375rem"
  }
},
{
  ".po-meta__sep": {
    "opacity": "0.7"
  }
},
{
  ".rp-chatbot": {
    "position": "fixed",
    "bottom": "24px",
    "right": "24px",
    "z-index": "9999",
    "font-family": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    "display": "flex",
    "flex-direction": "column",
    "align-items": "flex-end",
    "gap": "16px"
  }
},
{
  ".rp-chatbot__launcher": {
    "position": "relative",
    "display": "flex",
    "align-items": "center",
    "gap": "8px",
    "padding": "12px 20px",
    "border-radius": "9999px",
    "background": "linear-gradient(135deg, #4f46e5, #06b6d4)",
    "color": "#ffffff",
    "border": "none",
    "font-weight": "600",
    "font-size": "15px",
    "cursor": "pointer",
    "box-shadow": "0 4px 20px rgba(79, 70, 229, 0.35)",
    "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "overflow": "hidden",
    "outline": "none"
  }
},
{
  ".rp-chatbot__launcher:hover": {
    "transform": "translateY(-2px) scale(1.02)",
    "box-shadow": "0 6px 24px rgba(79, 70, 229, 0.45)"
  }
},
{
  ".rp-chatbot__launcher:active": {
    "transform": "translateY(1px)"
  }
},
{
  ".rp-chatbot__launcher-icon": {
    "font-size": "16px",
    "animation": "rp-spin-subtle 4s linear infinite"
  }
},
{
  ".rp-chatbot__pulse": {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "width": "100%",
    "height": "100%",
    "border-radius": "9999px",
    "border": "2px solid rgba(79, 70, 229, 0.5)",
    "pointer-events": "none",
    "opacity": "0",
    "animation": "rp-pulse-wave 2s cubic-bezier(0.24, 0, 0.38, 1) infinite"
  }
},
{
  ".rp-chatbot__panel": {
    "width": "380px",
    "height": "560px",
    "max-width": "calc(100vw - 48px)",
    "max-height": "calc(100vh - 120px)",
    "background": "rgba(255, 255, 255, 0.85)",
    "backdrop-filter": "blur(20px)",
    "-webkit-backdrop-filter": "blur(20px)",
    "border": "1px solid rgba(255, 255, 255, 0.4)",
    "border-radius": "20px",
    "box-shadow": "0 12px 40px rgba(0, 0, 0, 0.15)",
    "display": "flex",
    "flex-direction": "column",
    "overflow": "hidden",
    "animation": "rp-slide-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    "transition": "border-color 0.3s"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__panel": {
      "background": "rgba(20, 20, 30, 0.85)",
      "border": "1px solid rgba(255, 255, 255, 0.08)",
      "box-shadow": "0 12px 40px rgba(0, 0, 0, 0.4)"
    }
  }
},
{
  ".rp-chatbot__header": {
    "padding": "16px 20px",
    "background": "linear-gradient(135deg, rgba(79, 70, 229, 0.07), rgba(6, 182, 212, 0.07))",
    "border-bottom": "1px solid rgba(0, 0, 0, 0.06)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__header": {
      "border-bottom": "1px solid rgba(255, 255, 255, 0.05)"
    }
  }
},
{
  ".rp-chatbot__identity": {
    "display": "flex",
    "align-items": "center",
    "gap": "12px"
  }
},
{
  ".rp-chatbot__avatar": {
    "width": "36px",
    "height": "36px",
    "border-radius": "12px",
    "background": "linear-gradient(135deg, #4f46e5, #06b6d4)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "color": "#fff",
    "font-weight": "700",
    "font-size": "14px",
    "box-shadow": "0 2px 8px rgba(79, 70, 229, 0.3)"
  }
},
{
  ".rp-chatbot__eyebrow": {
    "margin": "0",
    "font-size": "11px",
    "text-transform": "uppercase",
    "letter-spacing": "1px",
    "color": "#6366f1",
    "font-weight": "700"
  }
},
{
  ".rp-chatbot h2": {
    "margin": "0",
    "font-size": "15px",
    "font-weight": "600",
    "color": "#1f2937"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot h2": {
      "color": "#f3f4f6"
    }
  }
},
{
  ".rp-chatbot__icon-btn": {
    "background": "none",
    "border": "none",
    "color": "#9ca3af",
    "font-size": "24px",
    "cursor": "pointer",
    "padding": "4px",
    "line-height": "1",
    "border-radius": "6px",
    "transition": "all 0.2s"
  }
},
{
  ".rp-chatbot__icon-btn:hover": {
    "background": "rgba(0, 0, 0, 0.05)",
    "color": "#4b5563"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__icon-btn:hover": {
      "background": "rgba(255, 255, 255, 0.05)",
      "color": "#e5e7eb"
    }
  }
},
{
  ".rp-chatbot__project-bar": {
    "padding": "8px 20px",
    "background": "rgba(0, 0, 0, 0.02)",
    "border-bottom": "1px solid rgba(0, 0, 0, 0.04)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "font-size": "12px"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__project-bar": {
      "background": "rgba(255, 255, 255, 0.01)",
      "border-bottom": "1px solid rgba(255, 255, 255, 0.03)"
    }
  }
},
{
  ".rp-chatbot__project-bar label": {
    "color": "#6b7280",
    "font-weight": "500"
  }
},
{
  ".rp-chatbot__project-bar input": {
    "width": "70px",
    "border": "1px solid rgba(0, 0, 0, 0.1)",
    "border-radius": "4px",
    "padding": "2px 6px",
    "text-align": "right",
    "background": "#ffffff",
    "color": "#1f2937",
    "outline": "none",
    "font-weight": "600",
    "transition": "border-color 0.2s"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__project-bar input": {
      "background": "rgba(20, 20, 30, 0.8)",
      "border-color": "rgba(255, 255, 255, 0.1)",
      "color": "#f3f4f6"
    }
  }
},
{
  ".rp-chatbot__project-bar input:focus": {
    "border-color": "#4f46e5"
  }
},
{
  ".rp-chatbot__messages": {
    "flex": "1",
    "padding": "20px",
    "overflow-y": "auto",
    "display": "flex",
    "flex-direction": "column",
    "gap": "16px",
    "scrollbar-width": "thin",
    "scrollbar-color": "rgba(0, 0, 0, 0.1) transparent"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__messages": {
      "scrollbar-color": "rgba(255, 255, 255, 0.1) transparent"
    }
  }
},
{
  ".rp-chatbot__messages::-webkit-scrollbar": {
    "width": "5px"
  }
},
{
  ".rp-chatbot__messages::-webkit-scrollbar-thumb": {
    "background": "rgba(0, 0, 0, 0.15)",
    "border-radius": "99px"
  }
},
{
  ".rp-chatbot__message": {
    "display": "flex",
    "flex-direction": "column",
    "max-width": "85%",
    "animation": "rp-bubble-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards"
  }
},
{
  ".rp-chatbot__message--user": {
    "align-self": "flex-end",
    "align-items": "flex-end"
  }
},
{
  ".rp-chatbot__message--assistant": {
    "align-self": "flex-start",
    "align-items": "flex-start",
    "max-width": "90%"
  }
},
{
  ".rp-chatbot__bubble": {
    "padding": "12px 16px",
    "border-radius": "16px",
    "font-size": "14px",
    "line-height": "1.5",
    "box-shadow": "0 2px 8px rgba(0, 0, 0, 0.04)"
  }
},
{
  ".rp-chatbot__message--user .rp-chatbot__bubble": {
    "background": "#4f46e5",
    "color": "#ffffff",
    "border-bottom-right-radius": "4px"
  }
},
{
  ".rp-chatbot__message--assistant .rp-chatbot__bubble": {
    "background": "#ffffff",
    "color": "#1f2937",
    "border": "1px solid rgba(0, 0, 0, 0.06)",
    "border-bottom-left-radius": "4px"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__message--assistant .rp-chatbot__bubble": {
      "background": "rgba(255, 255, 255, 0.04)",
      "color": "#e5e7eb",
      "border-color": "rgba(255, 255, 255, 0.05)"
    }
  }
},
{
  ".rp-chatbot__message.is-error .rp-chatbot__bubble": {
    "background": "#fef2f2",
    "color": "#991b1b",
    "border-color": "#fca5a5"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__message.is-error .rp-chatbot__bubble": {
      "background": "rgba(254, 242, 242, 0.05)",
      "color": "#fca5a5",
      "border-color": "rgba(239, 68, 68, 0.2)"
    }
  }
},
{
  ".rp-chatbot__table-card": {
    "margin-top": "8px",
    "width": "100%",
    "border-radius": "12px",
    "background": "#ffffff",
    "border": "1px solid rgba(0, 0, 0, 0.08)",
    "box-shadow": "0 4px 16px rgba(0, 0, 0, 0.05)",
    "overflow": "hidden",
    "animation": "rp-table-in 0.4s ease forwards"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__table-card": {
      "background": "rgba(255, 255, 255, 0.03)",
      "border-color": "rgba(255, 255, 255, 0.06)"
    }
  }
},
{
  ".rp-chatbot__table-head": {
    "padding": "8px 12px",
    "background": "rgba(0, 0, 0, 0.02)",
    "border-bottom": "1px solid rgba(0, 0, 0, 0.05)",
    "display": "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "font-size": "11px",
    "font-weight": "600",
    "color": "#6b7280"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__table-head": {
      "background": "rgba(255, 255, 255, 0.02)",
      "border-bottom": "1px solid rgba(255, 255, 255, 0.04)",
      "color": "#9ca3af"
    }
  }
},
{
  ".rp-chatbot__table-wrap": {
    "overflow-x": "auto",
    "max-width": "100%",
    "scrollbar-width": "thin"
  }
},
{
  ".rp-chatbot__table-wrap table": {
    "width": "100%",
    "border-collapse": "collapse",
    "font-size": "12px",
    "line-height": "1.4",
    "text-align": "left"
  }
},
{
  ".rp-chatbot__table-wrap th": {
    "padding": "8px 12px",
    "background": "rgba(0, 0, 0, 0.01)",
    "color": "#374151",
    "font-weight": "600",
    "white-space": "nowrap",
    "border-bottom": "1.5px solid rgba(0, 0, 0, 0.08)"
  }
},
{
  ".rp-chatbot__table-wrap td": {
    "padding": "8px 12px",
    "color": "#4b5563",
    "border-bottom": "1px solid rgba(0, 0, 0, 0.04)",
    "white-space": "nowrap",
    "max-width": "200px",
    "overflow": "hidden",
    "text-overflow": "ellipsis"
  }
},
{
  "@media (prefers-color-scheme: dark)": [
    {
      ".rp-chatbot__table-wrap th": {
        "background": "rgba(255, 255, 255, 0.01)",
        "color": "#e5e7eb",
        "border-bottom-color": "rgba(255, 255, 255, 0.08)"
      }
    },
    {
      ".rp-chatbot__table-wrap td": {
        "color": "#d1d5db",
        "border-bottom-color": "rgba(255, 255, 255, 0.04)"
      }
    }
  ]
},
{
  ".rp-chatbot__table-wrap tr:last-of-type td": {
    "border-bottom": "none"
  }
},
{
  ".rp-chatbot__table-wrap td.is-number": {
    "text-align": "right",
    "font-variant-numeric": "tabular-nums"
  }
},
{
  ".rp-chatbot__suggestions": {
    "padding": "0 20px 12px 20px",
    "display": "flex",
    "flex-direction": "column",
    "gap": "6px"
  }
},
{
  ".rp-chatbot__suggestions button": {
    "background": "rgba(79, 70, 229, 0.06)",
    "border": "1px solid rgba(79, 70, 229, 0.12)",
    "color": "#4f46e5",
    "padding": "8px 12px",
    "border-radius": "10px",
    "font-size": "12px",
    "text-align": "left",
    "cursor": "pointer",
    "transition": "all 0.2s ease",
    "outline": "none"
  }
},
{
  ".rp-chatbot__suggestions button:hover": {
    "background": "#4f46e5",
    "color": "#ffffff",
    "transform": "translateX(2px)"
  }
},
{
  "@media (prefers-color-scheme: dark)": [
    {
      ".rp-chatbot__suggestions button": {
        "background": "rgba(99, 102, 241, 0.08)",
        "border-color": "rgba(99, 102, 241, 0.15)",
        "color": "#a5b4fc"
      }
    },
    {
      ".rp-chatbot__suggestions button:hover": {
        "background": "#6366f1",
        "color": "#ffffff"
      }
    }
  ]
},
{
  ".rp-chatbot__typing": {
    "display": "flex",
    "align-items": "center",
    "gap": "4px",
    "padding": "12px 18px",
    "background": "#ffffff",
    "border": "1px solid rgba(0, 0, 0, 0.05)",
    "border-radius": "16px",
    "border-bottom-left-radius": "4px",
    "align-self": "flex-start",
    "width": "fit-content"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__typing": {
      "background": "rgba(255, 255, 255, 0.04)",
      "border-color": "rgba(255, 255, 255, 0.05)"
    }
  }
},
{
  ".rp-chatbot__typing span": {
    "width": "6px",
    "height": "6px",
    "background": "#9ca3af",
    "border-radius": "50%",
    "animation": "rp-bounce 1.4s infinite ease-in-out both"
  }
},
{
  ".rp-chatbot__typing span:nth-of-type(1)": {
    "animation-delay": "-0.32s"
  }
},
{
  ".rp-chatbot__typing span:nth-of-type(2)": {
    "animation-delay": "-0.16s"
  }
},
{
  ".rp-chatbot__composer": {
    "padding": "12px 20px",
    "background": "rgba(255, 255, 255, 0.9)",
    "border-top": "1px solid rgba(0, 0, 0, 0.06)",
    "display": "flex",
    "align-items": "flex-end",
    "gap": "10px"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__composer": {
      "background": "rgba(20, 20, 30, 0.9)",
      "border-top": "1px solid rgba(255, 255, 255, 0.05)"
    }
  }
},
{
  ".rp-chatbot__composer textarea": {
    "flex": "1",
    "border": "1px solid rgba(0, 0, 0, 0.1)",
    "border-radius": "12px",
    "padding": "8px 12px",
    "font-size": "13px",
    "line-height": "1.4",
    "resize": "none",
    "outline": "none",
    "background": "#ffffff",
    "color": "#1f2937",
    "transition": "border-color 0.2s"
  }
},
{
  "@media (prefers-color-scheme: dark)": {
    ".rp-chatbot__composer textarea": {
      "background": "rgba(0, 0, 0, 0.2)",
      "border-color": "rgba(255, 255, 255, 0.1)",
      "color": "#e5e7eb"
    }
  }
},
{
  ".rp-chatbot__composer textarea:focus": {
    "border-color": "#4f46e5"
  }
},
{
  ".rp-chatbot__composer button": {
    "padding": "8px 16px",
    "background": "#4f46e5",
    "color": "#ffffff",
    "border": "none",
    "border-radius": "10px",
    "font-weight": "600",
    "font-size": "13px",
    "cursor": "pointer",
    "transition": "background-color 0.2s, opacity 0.2s",
    "height": "38px"
  }
},
{
  ".rp-chatbot__composer button:hover:not(:disabled)": {
    "background": "#4338ca"
  }
},
{
  ".rp-chatbot__composer button:disabled": {
    "opacity": "0.5",
    "cursor": "not-allowed"
  }
},
{
  "@keyframes rp-spin-subtle": [
    {
      "0%": {
        "transform": "rotate(0deg)"
      }
    },
    {
      "100%": {
        "transform": "rotate(360deg)"
      }
    }
  ]
},
{
  "@keyframes rp-pulse-wave": [
    {
      "0%": {
        "transform": "scale(0.95)",
        "opacity": "0.8"
      }
    },
    {
      "100%": {
        "transform": "scale(1.4)",
        "opacity": "0"
      }
    }
  ]
},
{
  "@keyframes rp-slide-in": [
    {
      "0%": {
        "opacity": "0",
        "transform": "translateY(30px) scale(0.95)"
      }
    },
    {
      "100%": {
        "opacity": "1",
        "transform": "translateY(0) scale(1)"
      }
    }
  ]
},
{
  "@keyframes rp-bubble-in": [
    {
      "0%": {
        "opacity": "0",
        "transform": "translateY(10px) scale(0.98)"
      }
    },
    {
      "100%": {
        "opacity": "1",
        "transform": "translateY(0) scale(1)"
      }
    }
  ]
},
{
  "@keyframes rp-table-in": [
    {
      "0%": {
        "opacity": "0",
        "transform": "translateY(15px)"
      }
    },
    {
      "100%": {
        "opacity": "1",
        "transform": "translateY(0)"
      }
    }
  ]
},
{
  "@keyframes rp-bounce": [
    {
      "0%, 80%, 100%": {
        "transform": "scale(0)"
      }
    },
    {
      "40%": {
        "transform": "scale(1)"
      }
    }
  ]
},
{
  "@keyframes fade-in": [
    {
      "from": { "opacity": 0 }
    },
    {
      "to": { "opacity": 1 }
    }
  ]
},
{
  ".animate-fade-in": {
    "animation": "fade-in 0.2s ease-out forwards"
  }
}
];

export default legacyGlobalStyles.map(normalizeStyleObject);
