/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\landing\components\Sandbox.jsx
 */
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Container } from '@/shared/components/ui/muiAdapters';
import { Form } from '@/shared/components/ui/muiAdapters';
import { InputGroup } from '@/shared/components/ui/muiAdapters';
import { Button } from '@/shared/components/ui/muiAdapters';
import { Spinner } from '@/shared/components/ui/muiAdapters';
import Icon from "../../../shared/components/Icon";
import useSandboxSearch from "../hooks/useSandboxSearch";


import MuiBox from '@mui/material/Box';


const typeConfig = {
  JOURNAL: {
    labelKey: "typeJournal",
    icon: "lucide:book-open",
    variant: "primary",
    textColor: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)",
    borderColor: "rgba(59, 130, 246, 0.2)",
    path: (id) => `/journals/${id}`,
  },
  AUTHOR: {
    labelKey: "typeAuthor",
    icon: "lucide:user",
    variant: "secondary",
    textColor: "#a855f7",
    bgColor: "rgba(168, 85, 247, 0.1)",
    borderColor: "rgba(168, 85, 247, 0.2)",
    path: (id) => `/authors/${id}`,
  },
  ARTICLE: {
    labelKey: "typeArticle",
    icon: "lucide:file-text",
    variant: "success",
    textColor: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.1)",
    borderColor: "rgba(16, 185, 129, 0.2)",
    path: (id) => `/articles/${id}/visual`,
  },
  KEYWORD: {
    labelKey: "typeKeyword",
    icon: "lucide:hash",
    variant: "warning",
    textColor: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.2)",
    path: (id) => `/keywords/${id}`,
  },
  AREA: {
    labelKey: "typeArea",
    icon: "lucide:layers",
    variant: "danger",
    textColor: "#ec4899",
    bgColor: "rgba(236, 72, 153, 0.1)",
    borderColor: "rgba(236, 72, 153, 0.2)",
  },
  CATEGORY: {
    labelKey: "typeCategory",
    icon: "lucide:tag",
    variant: "info",
    textColor: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.1)",
    borderColor: "rgba(99, 102, 241, 0.2)",
  },
};

const defaultType = {
  labelKey: "search",
  icon: "lucide:help-circle",
  variant: "dark",
  textColor: "#94a3b8",
  bgColor: "rgba(148, 163, 184, 0.1)",
  borderColor: "rgba(148, 163, 184, 0.2)",
};

// Module-level helper: resolve route path for a search item by type.
// Pure & referentially stable — safe to call from memoized handlers.
const getItemPath = (item) => typeConfig[item.type]?.path?.(item.id);

export default function Sandbox() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    searchValue,
    setSearchValue,
    isLoading,
    searchResult,
    error,
    handleTagClick,
    handleSearchSubmit,
  } = useSandboxSearch();

  // Stable handler — same reference across renders unless `navigate` changes.
  const handleItemClick = useCallback(
    (item) => {
      const targetPath = getItemPath(item);
      if (targetPath) navigate(targetPath);
    },
    [navigate]
  );

  const tags = [
    "LLM",
    "RAG",
    "Transformer",
    "Computer Vision",
    "Reinforcement Learning",
  ];

  return (
    <MuiBox component="section" sx={{ paddingTop: "3rem", paddingBottom: "3rem", position: "relative" }} id="search-sandbox" className="bg-dark-bg">
      <Container style={{ maxWidth: "960px" }}>
        {/* Glowing border card container */}
        <MuiBox component="div" sx={{ padding: "0.25rem", borderRadius: "1rem" }}
          className="reveal-scale"
          style={{
            background:
              "linear-gradient(135deg, var(--primary-light) 0%, rgba(255, 255, 255, 0.5) 50%, var(--primary-light) 100%)",
            boxShadow: "0 15px 45px rgba(0, 113, 188, 0.05)",
          }}
        >
          {/* Card Body */}
          <MuiBox component="div" sx={{ borderRadius: "1rem", paddingTop: "3rem", paddingBottom: "3rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", "@media (min-width:576px)": { padding: "3rem" }, textAlign: "center", position: "relative", overflow: "hidden" }}

            style={{ backgroundColor: "var(--bg-card)", zIndex: 1 }}
          >
            {/* Header label */}
            <MuiBox component="div" sx={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", textTransform: "uppercase" }}
              className="text-xs font-bold tracking-wider"
              style={{ fontSize: "0.75rem", color: "var(--primary)" }}
            >
              <Icon
                icon="lucide:sparkle"
                className="animate-spin-slow"
                style={{ color: "var(--primary)" }}
              />
              <span>{t("sandboxTitle")}</span>
            </MuiBox>

            {/* Form */}
            <Form sx={{ mx: "auto", marginBottom: "1.5rem" }}
              onSubmit={handleSearchSubmit}

              style={{ maxWidth: "720px" }}
            >
              <InputGroup sx={{ borderRadius: "50rem", overflow: "hidden", padding: "0.25rem", alignItems: "center" }}
                size="lg"

                style={{ backgroundColor: "var(--bg-chip)" }}
              >
                <MuiBox component="span" sx={{ bgcolor: "transparent", border: 0, paddingLeft: "1rem", paddingRight: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}

                  style={{ color: "var(--text-muted)" }}
                >
                  <Icon sx={{ fontSize: "1.25rem" }} icon="lucide:search"  />
                </MuiBox>

                <Form.Control sx={{ bgcolor: "transparent", border: 0, boxShadow: "none", fontSize: "1rem" }}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={t("sandboxPlaceholder")}
                  className="py-2.5"
                  style={{
                    color: "var(--text-main)",
                    backgroundColor: "transparent",
                  }}
                />

                <Button sx={{ borderRadius: "50rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", border: 0, display: "flex", alignItems: "center", gap: "0.5rem", marginInlineEnd: "0.25rem" }}
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary-glow text-xs font-bold"
                  style={{ fontSize: "0.8rem" }}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span>...</span>
                    </>
                  ) : (
                    <>
                      <span>{t("searchBtn")}</span>
                      <Icon sx={{ fontSize: "1rem" }} icon="lucide:arrow-right"  />
                    </>
                  )}
                </Button>
              </InputGroup>
            </Form>

            {/* Tag suggestions */}
            <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:576px)": { flexDirection: "row" }, alignItems: "center", justifyContent: "center", gap: "1rem", mx: "auto" }}

              style={{ maxWidth: "800px" }}
            >
              <MuiBox component="span" sx={{ textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.25rem" }}
                className="text-muted-custom font-bold tracking-wider"
                style={{ fontSize: "0.7rem" }}
              >
                <Icon icon="lucide:sliders" style={{ fontSize: "0.65rem" }} />
                <span>{t("tryNowLabel")}</span>
              </MuiBox>
              <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }} >
                {tags.map((tag) => (
                  <MuiBox component="button" sx={{ paddingLeft: "1rem", paddingRight: "1rem", borderRadius: "0.25rem", display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.5rem", py: "0.25rem", border: "1px solid transparent", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none" }}
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className="py-1.5 sandbox-tag text-xs font-semibold"
                    style={{
                      fontSize: "0.75rem",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {tag}
                  </MuiBox>
                ))}
              </MuiBox>
            </MuiBox>

            {/* Interactive Mock Results */}
            {isLoading && (
              <MuiBox component="div" sx={{ marginTop: "1.5rem", mx: "auto", padding: "1.5rem", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                className="text-muted-custom"
                style={{
                  maxWidth: "600px",
                  backgroundColor: "var(--bg-chip)",
                  fontSize: "0.85rem",
                }}
              >
                <Icon sx={{ fontSize: "1.25rem" }}
                  icon="lucide:database"
                  className="animate-bounce"
                  style={{ color: "var(--primary)" }}
                />
                <span>Analyzing publications databases...</span>
              </MuiBox>
            )}

            {error && (
              <MuiBox component="div" sx={{ marginTop: "1.5rem", mx: "auto", padding: "1.5rem", borderRadius: "0.75rem", textAlign: "left" }}

                style={{
                  maxWidth: "600px",
                  backgroundColor: "rgba(220, 53, 69, 0.05)",
                }}
              >
                <MuiBox component="div" sx={{ display: "flex", alignItems: "flex-start", gap: "1rem", color: "error.main" }} >
                  <Icon sx={{ fontSize: "1.5rem", marginTop: "0.25rem" }} icon="lucide:alert-circle"  />
                  <div>
                    <MuiBox component="h5" sx={{ margin: "0" }} className="font-bold text-main text-sm">
                      API Error
                    </MuiBox>
                    <MuiBox component="p" sx={{ marginTop: "0.25rem", marginBottom: "0" }}
                      className="text-muted-custom"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {error}
                    </MuiBox>
                  </div>
                </MuiBox>
              </MuiBox>
            )}

            {searchResult && (
              <MuiBox component="div" sx={{ marginTop: "1.5rem", mx: "auto", padding: "1.5rem", borderRadius: "0.75rem", textAlign: "left" }}

                style={{
                  maxWidth: "600px",
                  backgroundColor: "var(--bg-card)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
                }}
              >
                <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", paddingBottom: "0.5rem" }}

                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }} >
                    <MuiBox component="div" sx={{ borderRadius: "50%" }}
                      className="animate-pulse"
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: searchResult.isRealData
                          ? "#198754"
                          : "#ffc107",
                      }}
                    />
                    <MuiBox component="span" sx={{ textTransform: "uppercase" }}
                      className="font-bold tracking-wider"
                      style={{
                        fontSize: "0.65rem",
                        color: searchResult.isRealData ? "#198754" : "#ffc107",
                      }}
                    >
                      {searchResult.isRealData
                        ? t("realData")
                        : "Offline Demo Data"}
                    </MuiBox>
                  </MuiBox>
                  <span
                    className="text-muted-custom"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {searchResult.isRealData
                      ? t("sourceLiveApi")
                      : "Simulated Sandbox"}
                  </span>
                </MuiBox>

                <MuiBox component="h4" sx={{ marginBottom: "1rem" }}
                  className="font-display font-bold text-main"
                  style={{ fontSize: "1.05rem" }}
                >
                  {t("resultsFor")} "
                  <span style={{ color: "var(--primary)" }}>
                    {searchResult.keyword}
                  </span>
                  "
                </MuiBox>

                {searchResult.items && searchResult.items.length > 0 ? (
                  <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", overflowY: "auto" }}
                    className="pr-1 custom-scrollbar"
                    style={{ maxHeight: "380px" }}
                  >
                    {searchResult.items.map((item, index) => {
                      const cfg = typeConfig[item.type] || defaultType;
                      const isClickable = Boolean(getItemPath(item));
                      return (
                        <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", borderRadius: "0.5rem" }}
                          key={item.id || index}
                          className="transition-all"
                          style={{
                            backgroundColor: "var(--bg-chip)",
                            transition: "all 0.2s ease",
                            cursor: isClickable ? "pointer" : "default",
                          }}
                          onClick={() => handleItemClick(item)}
                          onMouseEnter={(e) => {
                            if (item.type === "JOURNAL") {
                              e.currentTarget.style.backgroundColor =
                                "var(--primary-light)";
                            } else {
                              e.currentTarget.style.backgroundColor =
                                "rgba(0, 113, 188, 0.05)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "var(--bg-chip)";
                          }}
                        >
                          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}

                            style={{ flex: "1 1 auto", minWidth: 0 }}
                          >
                            <MuiBox component="div" sx={{ padding: "0.5rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}

                              style={{
                                color: cfg.textColor,
                                backgroundColor: cfg.bgColor,
                              }}
                            >
                              <Icon sx={{ fontSize: "1.25rem" }} icon={cfg.icon}  />
                            </MuiBox>
                            <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}  style={{ minWidth: 0 }}>
                              <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                                className="font-medium text-main text-sm"
                                style={{
                                  fontSize: "0.875rem",
                                  maxWidth: "380px",
                                }}
                              >
                                {item.title || item.name}
                              </MuiBox>
                              {(item.authors?.length > 0 || item.journal?.name) && (
                                <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                                  className="text-muted-custom"
                                  style={{ fontSize: "0.725rem", maxWidth: "380px" }}
                                >
                                  {item.authors?.length > 0 && (
                                    <span>
                                      {item.authors.map(a => a.name || a.display_name).slice(0, 3).join(', ')}
                                      {item.authors.length > 3 ? ' et al.' : ''}
                                    </span>
                                  )}
                                  {item.authors?.length > 0 && item.journal?.name && <span> • </span>}
                                  {item.journal?.name && <MuiBox component="span" sx={{ fontStyle: "italic" }} >{item.journal.name}</MuiBox>}
                                </MuiBox>
                              )}
                            </MuiBox>
                          </MuiBox>
                          <MuiBox component="span" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", borderRadius: "0.375rem" }}
                            style={{
                              backgroundColor: cfg.bgColor,
                              color: "#000000",
                              border: "none",
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              padding: "0.35em 0.65em",
                              flexShrink: 0,
                              maxWidth: "140px",
                            }}

                            title={item.subject_area?.name || item.type}
                          >
                            {item.subject_area?.name || t(cfg.labelKey)}
                          </MuiBox>
                        </MuiBox>
                      );
                    })}
                  </MuiBox>
                ) : (
                  <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "3rem", paddingBottom: "3rem", textAlign: "center" }} className="text-muted-custom">
                    <Icon sx={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}
                      icon="lucide:search-x"
                      className="text-muted-custom"
                    />
                    <MuiBox component="p" sx={{ margin: "0" }} className="text-sm" style={{ fontSize: "0.85rem" }}>
                      {t("noResults")}
                    </MuiBox>
                  </MuiBox>
                )}
              </MuiBox>
            )}
          </MuiBox>
        </MuiBox>
      </Container>
    </MuiBox>
  );
}
