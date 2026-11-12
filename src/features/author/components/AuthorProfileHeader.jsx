import { useState } from "react";
import { useTranslation } from "react-i18next";
/**
 * @file AuthorProfileHeader.jsx
 * @description Identity card — left column of the Academic Researcher Profile page.
 */
import AuthorAvatar from "./AuthorAvatar";
import Icon from "../../../shared/components/Icon";
import LoadingSkeleton from "../../../shared/components/LoadingSkeleton";


import MuiBox from '@mui/material/Box';


export default function AuthorProfileHeader({ author, loading = false }) {
  const { t } = useTranslation();
  const [orcidCopied, setOrcidCopied] = useState(false);

  if (loading) {
    return (
      <div className="adp-identity-card adp-identity-skeleton">
        <MuiBox component="div" sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }} >
          <MuiBox component="div" sx={{ borderRadius: "50%" }} className="skeleton-shimmer" style={{ width: 88, height: 88 }} />
        </MuiBox>
        <LoadingSkeleton sx={{ mx: "auto", marginBottom: "0.5rem" }} width="65%" height="18px"  />
        <LoadingSkeleton sx={{ mx: "auto", marginBottom: "0.25rem" }} width="50%" height="12px"  />
        <LoadingSkeleton sx={{ mx: "auto", marginBottom: "1rem" }} width="40%" height="11px"  />
        <LoadingSkeleton sx={{ marginBottom: "0.5rem" }} width="100%" height="36px"  />
        <LoadingSkeleton sx={{ marginBottom: "0.5rem" }} width="100%" height="36px"  />
        <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="100%" height="60px"  />
        <LoadingSkeleton sx={{ marginBottom: "0.25rem" }} width="100%" height="36px"  />
        <LoadingSkeleton width="100%" height="36px" />
      </div>
    );
  }

  if (!author) return null;

  const name = author.full_name ?? author.display_name ?? author.name ?? t("typeAuthor");
  const position = author.position ?? author.academic_title ?? "";
  const institution = author.institution_1 ?? author.last_known_institution ?? author.institution ?? "";
  const dept = author.institution_2 ?? author.department ?? "";
  const email = author.email ?? "";
  const orcid = author.orcid ?? "";
  const bio = author.bio ?? author.description ?? "";
  const homepage = author.homepage ?? author.homepage_url ?? "";
  const avatarColor = author.avatar_color ?? "#FF7A33";

  const handleCopyOrcid = () => {
    if (!orcid) return;
    navigator.clipboard.writeText(orcid);
    setOrcidCopied(true);
    setTimeout(() => setOrcidCopied(false), 2000);
  };

  return (
    <div className="adp-identity-card">
      {/* Avatar */}
      <div className="adp-identity-avatar-wrap">
        <AuthorAvatar name={name} size="xl" bgColor={avatarColor} />
      </div>

      {/* Name */}
      <h1 className="adp-identity-name">{name}</h1>

      {/* Position */}
      {position && <div className="adp-identity-position">{position}</div>}

      {/* Institution */}
      {institution && <div className="adp-identity-institution">{institution}</div>}

      {/* Department */}
      {dept && <div className="adp-identity-dept">{dept}</div>}

      <div className="adp-identity-divider" />

      {/* ORCID */}
      {orcid ? (
        <div className="adp-identity-orcid" onClick={handleCopyOrcid} title="Click to copy ORCID">
          <span className="adp-identity-orcid-label">ORCID</span>
          <span className="adp-identity-orcid-value">{orcid}</span>
          <span className="adp-identity-orcid-copy">
            <Icon icon={orcidCopied ? "lucide:check" : "lucide:copy"} width="12" style={{ color: orcidCopied ? "var(--primary)" : undefined }} />
          </span>
        </div>
      ) : (
        <div className="adp-identity-orcid" style={{ cursor: "default", opacity: 0.6 }}>
          <span className="adp-identity-orcid-label">ORCID</span>
          <span className="adp-identity-orcid-value">{t("author.chuaCapNhat")}</span>
        </div>
      )}

      {/* Email */}
      {email && (
        <div className="adp-identity-email">
          <Icon icon="lucide:mail" width="12" style={{ flexShrink: 0 }} />
          <span>{email}</span>
        </div>
      )}

      {/* Bio */}
      {bio && <p className="adp-identity-bio">{bio}</p>}

      {/* Actions */}
      <div className="adp-identity-actions">
        <button
          className="adp-identity-btn adp-identity-btn--primary"
          onClick={() => document.getElementById("adp-publications")?.scrollIntoView({ behavior: "smooth" })}
        >
          <Icon icon="lucide:file-text" width="13" />
          {t("author.xemCongTrinhCongBo")}
        </button>

        {homepage && (
          <a href={homepage} target="_blank" rel="noopener noreferrer" className="adp-identity-btn">
            <Icon icon="lucide:globe" width="13" />
            {t("author.trangCaNhanHomepage")}
          </a>
        )}

        {orcid && (
          <a
            href={`https://orcid.org/${orcid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="adp-identity-btn"
          >
            <Icon icon="simple-icons:orcid" width="13" />
            ORCID Profile
          </a>
        )}
      </div>
    </div>
  );
}
