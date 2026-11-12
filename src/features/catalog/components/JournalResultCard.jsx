import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\catalog\components\JournalResultCard.jsx
 */
import { Card, Button, Badge } from '@/shared/components/ui/muiAdapters';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../../shared/components/Icon.jsx';
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';

export default function JournalResultCard({
  journal,
  isFollowed = false,
  onFollow,
  onTagClick
}) {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const id = journal.id || journal.journal_id;
  const {
    display_name,
    publisher,
    country,
    issn,
    is_open_access,
    quartile,
    subject_category_name,
    subject_area_name,
    metric_value,
    metric_name,
    metric_year
  } = journal;
  return <Card sx={{ marginBottom: "1rem", textAlign: "left", position: "relative" }} onClick={() => navigate(`/journals/${id}`)} className="journal-dark-card transition-all duration-300 card-hover-lift" style={{
    borderRadius: '16px',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer'
  }}>
      <Card.Body sx={{ padding: "1.5rem" }} >
        <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", "@media (min-width:768px)": { flexDirection: "row", alignItems: "center" }, alignItems: "flex-start", justifyContent: "space-between", gap: "1.5rem" }} >

          {/* Main info block (Left) */}
          <MuiBox component="div" sx={{ flexGrow: 1 }} >
            <MuiBox component={Link} sx={{ textDecoration: "none", display: "block", marginBottom: "0.5rem" }} to={`/journals/${id}`} onClick={e => e.stopPropagation()} className="text-main hover:text-primary">
              <MuiBox component="h5" sx={{ fontWeight: 700, marginBottom: "0.25rem", fontSize: "1.25rem" }} className="font-display" style={{
              letterSpacing: '-0.02em',
              lineHeight: '1.3'
            }}>
                {display_name}
              </MuiBox>
            </MuiBox>

            {/* Publisher & Meta info line */}
            <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }} className="text-muted-custom text-xs" style={{
            fontSize: '0.8rem'
          }}>
              <span>{publisher}</span>
              <span className="text-muted-custom">•</span>
              <span>{country}</span>
              <span className="text-muted-custom">•</span>
              <MuiBox component="span" sx={{ fontFamily: "monospace" }} >ISSN: {issn}</MuiBox>
            </MuiBox>

            {/* Badges line */}
            <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }} >

              {quartile && <Badge sx={{ fontWeight: 700 }} className="font-display px-2.5 py-1.5" style={{
              borderRadius: '6px',
              fontSize: '0.75rem',
              backgroundColor: quartile === 'Q1' ? 'var(--primary-light)' : 'var(--bg-main)',
              color: quartile === 'Q1' ? 'var(--primary)' : 'var(--text-muted)',
              border: '1px solid var(--border)'
            }}>
                  {quartile}
                </Badge>}

              {/* Open Access / Subscription Badge */}
              {is_open_access ? <Badge sx={{ display: "flex", alignItems: "center", gap: "0.25rem", border: "1px solid #dee2e6", borderColor: "rgba(25,135,84,.2)" }} bg="success" className="px-2.5 py-1.5" style={{
              borderRadius: '6px',
              fontSize: '0.75rem',
              backgroundColor: 'rgba(40, 167, 69, 0.08)',
              color: '#28a745'
            }}>
                  <Icon icon="lucide:unlock" width="12" />
                  <span>Open Access</span>
                </Badge> : <Badge sx={{ display: "flex", alignItems: "center", gap: "0.25rem", border: "1px solid #dee2e6", borderColor: "rgba(255,193,7,.2)" }} bg="warning" className="px-2.5 py-1.5" style={{
              borderRadius: '6px',
              fontSize: '0.75rem',
              backgroundColor: 'rgba(255, 193, 7, 0.08)',
              color: '#b28000'
            }}>
                  <Icon icon="lucide:lock" width="12" />
                  <span>Subscription</span>
                </Badge>}

              {/* Subject Category tag */}
              {subject_category_name && <Badge sx={{ border: "1px solid #dee2e6", borderColor: "#dee2e6" }} onClick={e => {
              e.stopPropagation();
              if (onTagClick) onTagClick(subject_category_name);
            }} className="px-2.5 py-1.5 text-muted-custom hover:text-primary" style={{
              borderRadius: '6px',
              fontSize: '0.72rem',
              backgroundColor: 'var(--bg-main)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}>
                  {subject_category_name}
                </Badge>}

              {/* Subject Area tag */}
              {subject_area_name && subject_area_name !== subject_category_name && <Badge sx={{ border: "1px solid #dee2e6", borderColor: "#dee2e6" }} onClick={e => {
              e.stopPropagation();
              if (onTagClick) onTagClick(subject_area_name);
            }} className="px-2.5 py-1.5 text-muted-custom hover:text-primary" style={{
              borderRadius: '6px',
              fontSize: '0.72rem',
              backgroundColor: 'var(--bg-main)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}>
                  {subject_area_name}
                </Badge>}
            </MuiBox>

          </MuiBox>

          {/* Metric & Action button block (Right) */}
          <MuiBox component="div" sx={{ display: "flex", flexDirection: "row", "@media (min-width:768px)": { flexDirection: "column", alignItems: "flex-end", justifyContent: "center", width: "auto", borderTop: 0, paddingTop: "0" }, alignItems: "center", justifyContent: "space-between", gap: "1rem", width: "100%", borderTop: "1px solid #dee2e6", borderColor: "#dee2e6", paddingTop: "1rem" }}  style={{
          minWidth: '130px'
        }}>

            {/* Metric Score */}
            <MuiBox component="div" sx={{ textAlign: "left", "@media (min-width:768px)": { textAlign: "right" } }} >
              {metric_value ? <>
                  <MuiBox component="div" sx={{ fontFamily: "monospace", color: "primary.main", fontWeight: 700, lineHeight: 1, fontSize: "1.75rem" }} >
                    {metric_value}
                  </MuiBox>
                  <MuiBox component="div" sx={{ textTransform: "uppercase", marginTop: "0.25rem" }} className="text-muted-custom tracking-wide" style={{
                fontSize: '0.68rem',
                letterSpacing: '0.05em'
              }}>
                    {metric_name || 'SJR'}{metric_year ? ` · ${metric_year}` : ''}
                  </MuiBox>
                </> : <span className="text-muted-custom text-xs italic" style={{
              fontSize: '0.75rem'
            }}>{t("catalog.chuaCoDuLieu")}</span>}
            </MuiBox>

            <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", gap: "0.5rem" }} >
              <Button sx={getClassNameSx(`d-flex align-items-center justify-content-center gap-1.5 px-3 py-1.5 fw-semibold ${isFollowed ? 'bg-success-10' : 'btn-outline-glow'}`)} size="sm" variant={isFollowed ? 'outline-success' : 'outline-primary'} onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onFollow(id);
            }} className={stripMappedClassNames(`d-flex align-items-center justify-content-center gap-1.5 px-3 py-1.5 fw-semibold ${isFollowed ? 'bg-success-10' : 'btn-outline-glow'}`)} style={{
              borderRadius: '8px',
              fontSize: '0.8rem',
              transition: 'all 0.2s ease'
            }}>
                {isFollowed ? <>
                    <Icon icon="lucide:check" width="14" />
                    <span>{t("catalog.daTheoDoi")}</span>
                  </> : <>
                    <Icon icon="lucide:plus" width="14" />
                    <span>{t("catalog.theoDoi")}</span>
                  </>}
              </Button>
            </MuiBox>

          </MuiBox>

        </MuiBox>
      </Card.Body>
    </Card>;
}
