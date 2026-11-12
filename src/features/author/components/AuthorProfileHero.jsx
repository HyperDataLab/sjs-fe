import { useState } from "react";
import Icon from "../../../shared/components/Icon";
import AuthorAvatar from "./AuthorAvatar";


import MuiBox from '@mui/material/Box';


/**
 * @file AuthorProfileHero.jsx
 * @description Academic Researcher Profile Hero banner.
 * Displays high-level academic identity, contact links, bio, research focus, and summary metrics.
 */
export default function AuthorProfileHero({ author, metrics }) {
  const [copied, setCopied] = useState(false);

  if (!author) return null;

  const handleCopyOrcid = () => {
    if (!author.orcid) return;
    navigator.clipboard.writeText(author.orcid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fmt = (num) => {
    if (num == null) return "0";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toLocaleString();
  };

  return (
    <div className="ap-hero" id="overview">
      <div className="ap-hero-inner">
        {/* Left: Avatar */}
        <div className="ap-hero-left">
          <div className="ap-hero-avatar-wrap">
            <AuthorAvatar name={author.full_name} size="xl" bgColor={author.avatar_color} />
          </div>
          <div className="ap-hero-status-pill">
            <span className="ap-hero-status-dot" />
            Active Researcher
          </div>
        </div>

        {/* Center: Identity details */}
        <div className="ap-hero-center">
          <div className="ap-hero-eyebrow">
            <Icon icon="lucide:award" width="13" />
            <span>Academic Researcher Profile</span>
          </div>

          <h1 className="ap-hero-name">{author.full_name}</h1>
          <div className="ap-hero-position">{author.position}</div>

          <div className="ap-hero-institutions">
            <div className="ap-hero-inst-primary">
              <Icon icon="lucide:building-2" width="13" />
              <span>{author.institution_1}</span>
            </div>
            {author.institution_2 && (
              <div className="ap-hero-inst-secondary">
                <Icon icon="lucide:landmark" width="12" />
                <span>{author.institution_2}</span>
              </div>
            )}
            {author.location && (
              <div className="ap-hero-location">
                <Icon icon="lucide:map-pin" width="12" />
                <span>{author.location}</span>
              </div>
            )}
          </div>

          {/* Short Bio */}
          {author.bio && <p className="ap-hero-bio">{author.bio}</p>}

          {/* Research Focus Chips */}
          {author.research_focus && author.research_focus.length > 0 && (
            <div className="ap-hero-focus-block">
              <span className="ap-hero-focus-label">Research Focus:</span>
              <div className="ap-hero-focus-chips">
                {author.research_focus.map((focus, idx) => (
                  <span key={idx} className="ap-hero-focus-chip">
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata & Links Bar */}
          <div className="ap-hero-meta-bar">
            {author.orcid && (
              <button
                type="button"
                className="ap-hero-meta-pill ap-hero-orcid-btn"
                onClick={handleCopyOrcid}
                title="Click to copy ORCID ID"
              >
                <Icon icon="simple-icons:orcid" width="13" style={{ color: "#a6ce39" }} />
                <span>ORCID: <strong>{author.orcid}</strong></span>
                <Icon sx={{ marginInlineStart: "0.25rem" }} icon={copied ? "lucide:check" : "lucide:copy"} width="11"  />
              </button>
            )}

            {author.email && (
              <a href={`mailto:${author.email}`} className="ap-hero-meta-pill" title="Send email">
                <Icon icon="lucide:mail" width="12" />
                <span>{author.email}</span>
              </a>
            )}

            {author.homepage && (
              <a
                href={author.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="ap-hero-meta-pill"
                title="Personal/Lab Website"
              >
                <Icon icon="lucide:globe" width="12" />
                <span>Personal Website</span>
                <Icon icon="lucide:external-link" width="10" />
              </a>
            )}
          </div>
        </div>

        {/* Right: Academic Summary Box */}
        <div className="ap-hero-right">
          <div className="ap-hero-summary-card">
            <div className="ap-hero-summary-header">
              <Icon icon="lucide:bar-chart-2" width="14" />
              <span>Academic Impact Summary</span>
            </div>

            <div className="ap-hero-summary-metrics">
              <div className="ap-hero-summary-row">
                <span className="ap-hero-summary-label">Publications</span>
                <span className="ap-hero-summary-val">{fmt(metrics?.publications)}</span>
              </div>
              <div className="ap-hero-summary-row">
                <span className="ap-hero-summary-label">Citations</span>
                <span className="ap-hero-summary-val highlight">{fmt(metrics?.citations)}</span>
              </div>
              <div className="ap-hero-summary-row">
                <span className="ap-hero-summary-label">h-index</span>
                <span className="ap-hero-summary-val">{metrics?.hIndex}</span>
              </div>
              <div className="ap-hero-summary-row">
                <span className="ap-hero-summary-label">i10-index</span>
                <span className="ap-hero-summary-val">{fmt(metrics?.i10Index)}</span>
              </div>
              <div className="ap-hero-summary-row">
                <span className="ap-hero-summary-label">Highly Cited Papers</span>
                <span className="ap-hero-summary-val">{metrics?.highlyCitedPapers}</span>
              </div>
            </div>

            <div className="ap-hero-actions">
              <MuiBox component="button" sx={{ width: "100%" }}
                type="button"
                className="ap-btn ap-btn-primary"
                onClick={() => document.getElementById("publications")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Icon icon="lucide:book-open" width="13" />
                <span>View Publications</span>
              </MuiBox>

              {author.orcid && (
                <MuiBox component="a" sx={{ width: "100%" }}
                  href={`https://orcid.org/${author.orcid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ap-btn ap-btn-outline"
                >
                  <Icon icon="lucide:external-link" width="12" />
                  <span>External ORCID Record</span>
                </MuiBox>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
