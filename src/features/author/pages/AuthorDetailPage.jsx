import { useNavigate } from "react-router-dom";
import Header from "../../landing/components/Header";
import Icon from "../../../shared/components/Icon";

// Sub-components
import AuthorProfileHero from "../components/AuthorProfileHero";
import AuthorQuickNav from "../components/AuthorQuickNav";
import AuthorMetricsCards from "../components/AuthorMetricsCards";
import AuthorAffiliations from "../components/AuthorAffiliations";
import AuthorResearchCenters from "../components/AuthorResearchCenters";
import AuthorResearchInterests from "../components/AuthorResearchInterests";
import AuthorResearchAreas from "../components/AuthorResearchAreas";
import AuthorResearchImpact from "../components/AuthorResearchImpact";
import AuthorPublications from "../components/AuthorPublications";
import AuthorMostCited from "../components/AuthorMostCited";
import AuthorJournals from "../components/AuthorJournals";
import AuthorCollaborators from "../components/AuthorCollaborators";
import AuthorResearchNetwork from "../components/AuthorResearchNetwork";
import AuthorAwards from "../components/AuthorAwards";
import AuthorEducation from "../components/AuthorEducation";
import AuthorRelatedResearchers from "../components/AuthorRelatedResearchers";

// Dedicated Frontend Prototype Mock Data
import {
  MOCK_AUTHOR,
  MOCK_METRICS,
  MOCK_AFFILIATIONS,
  MOCK_RESEARCH_CENTERS,
  MOCK_RESEARCH_INTERESTS,
  MOCK_RESEARCH_AREAS,
  MOCK_IMPACT_TREND,
  MOCK_PUBLICATIONS,
  MOCK_MOST_CITED,
  MOCK_JOURNALS,
  MOCK_COLLABORATORS,
  MOCK_NETWORK,
  MOCK_AWARDS,
  MOCK_EDUCATION,
  MOCK_RELATED_RESEARCHERS,
} from "../data/authorProfile.mock";


import MuiBox from '@mui/material/Box';

/**
 * @file AuthorDetailPage.jsx
 * @description Academic Researcher Profile (ResearchPulse).
 * Full-width, high-density scientific profile layout.
 */
export default function AuthorDetailPage() {
  const navigate = useNavigate();

  // Prototype renders rich mock dataset directly to eliminate empty states
  const author = MOCK_AUTHOR;
  const metrics = MOCK_METRICS;
  const affiliations = MOCK_AFFILIATIONS;
  const researchCenters = MOCK_RESEARCH_CENTERS;
  const interests = MOCK_RESEARCH_INTERESTS;
  const researchAreas = MOCK_RESEARCH_AREAS;
  const impactTrend = MOCK_IMPACT_TREND;
  const publications = MOCK_PUBLICATIONS;
  const mostCited = MOCK_MOST_CITED;
  const journals = MOCK_JOURNALS;
  const collaborators = MOCK_COLLABORATORS;
  const network = MOCK_NETWORK;
  const awards = MOCK_AWARDS;
  const education = MOCK_EDUCATION;
  const relatedResearchers = MOCK_RELATED_RESEARCHERS;

  return (
    <div className="ap-page">
      <Header />

      <main className="ap-main-container">
        {/* 1. BREADCRUMB */}
        <nav className="ap-breadcrumb" aria-label="breadcrumb">
          <MuiBox component="ol" sx={{ display: "flex", flexWrap: "wrap", padding: 0, marginBottom: "1rem", listStyle: "none" }} >
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} >
              <span className="ap-breadcrumb__link" onClick={() => navigate("/")}>
                ResearchPulse
              </span>
            </MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} >
              <span className="ap-breadcrumb__link" onClick={() => navigate("/authors")}>
                Tác giả
              </span>
            </MuiBox>
            <MuiBox component="li" sx={{ display: "flex", alignItems: "center", "&:not(:last-child)::after": { content: "\"/\"", px: "0.5rem", color: "text.secondary" } }} className="active" aria-current="page">
              <span className="ap-breadcrumb__current">{author.full_name}</span>
            </MuiBox>
          </MuiBox>
        </nav>

        {/* 2. RESEARCHER HERO */}
        <AuthorProfileHero author={author} metrics={metrics} />

        {/* 3. QUICK NAVIGATION (Sticky) */}
        <AuthorQuickNav />

        {/* 4. KEY RESEARCH METRICS STRIP */}
        <AuthorMetricsCards metrics={metrics} />

        {/* 5. TWO-COLUMN GRID: Affiliations & Centers | Interests & Areas */}
        <div className="ap-grid-two-col">
          {/* Left Column */}
          <div className="ap-grid-col">
            <AuthorAffiliations affiliations={affiliations} />
            <AuthorResearchCenters centers={researchCenters} />
          </div>

          {/* Right Column */}
          <div className="ap-grid-col">
            <AuthorResearchInterests interests={interests} />
            <AuthorResearchAreas areas={researchAreas} />
          </div>
        </div>

        {/* 6. RESEARCH IMPACT & TRAJECTORY */}
        <AuthorResearchImpact metrics={metrics} trend={impactTrend} />

        {/* 7. SCIENTIFIC PUBLICATIONS */}
        <AuthorPublications publications={publications} />

        {/* 8. TWO-COLUMN: Most Cited | Top Journals */}
        <div className="ap-grid-two-col">
          <div className="ap-grid-col">
            <AuthorMostCited mostCited={mostCited} />
          </div>
          <div className="ap-grid-col">
            <AuthorJournals journals={journals} />
          </div>
        </div>

        {/* 9. TWO-COLUMN: Frequent Collaborators | Research Network */}
        <div className="ap-grid-two-col">
          <div className="ap-grid-col">
            <AuthorCollaborators collaborators={collaborators} />
          </div>
          <div className="ap-grid-col">
            <AuthorResearchNetwork network={network} />
          </div>
        </div>

        {/* 10. TWO-COLUMN: Awards & Honors | Education & Career */}
        <div className="ap-grid-two-col">
          <div className="ap-grid-col">
            <AuthorAwards awards={awards} />
          </div>
          <div className="ap-grid-col">
            <AuthorEducation education={education} />
          </div>
        </div>

        {/* 11. RELATED RESEARCHERS */}
        <AuthorRelatedResearchers researchers={relatedResearchers} />
      </main>
    </div>
  );
}
