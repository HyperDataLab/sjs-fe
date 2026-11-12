import { useState } from "react";
import Icon from "../../../shared/components/Icon";
import { getClassNameSx, stripMappedClassNames } from '../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * @file AuthorResearchImpact.jsx
 * @description Historical academic impact analytics (Citations and Publications trends 2018-2026).
 */
export default function AuthorResearchImpact({ metrics, trend = [] }) {
  const [metricMode, setMetricMode] = useState("citations"); // "citations" | "publications"

  if (!trend || trend.length === 0) return null;

  const maxVal = Math.max(...trend.map((d) => (metricMode === "citations" ? d.citations : d.publications)));
  const totalCitations = metrics?.citations || 0;
  const totalPubs = metrics?.publications || 1;
  const avgCitationsPerPaper = Math.round(totalCitations / totalPubs);

  const fmt = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toLocaleString();
  };

  const chartHeight = 110;
  const barWidth = 26;
  const gap = 12;
  const svgWidth = trend.length * (barWidth + gap);

  return (
    <div className="ap-section">
      <div className="ap-section-header">
        <div className="ap-section-header-left">
          <Icon icon="lucide:line-chart" width="16" className="ap-section-icon" />
          <h2 className="ap-section-title">Research Impact & Trajectory</h2>
        </div>
        <div className="ap-impact-toggle-group">
          <MuiBox component="button" sx={getClassNameSx(`ap-impact-toggle-btn ${metricMode === "citations" ? "active" : ""}`)}
            type="button"
            className={stripMappedClassNames(`ap-impact-toggle-btn ${metricMode === "citations" ? "active" : ""}`)}
            onClick={() => setMetricMode("citations")}
          >
            Citations Over Time
          </MuiBox>
          <MuiBox component="button" sx={getClassNameSx(`ap-impact-toggle-btn ${metricMode === "publications" ? "active" : ""}`)}
            type="button"
            className={stripMappedClassNames(`ap-impact-toggle-btn ${metricMode === "publications" ? "active" : ""}`)}
            onClick={() => setMetricMode("publications")}
          >
            Publications Output
          </MuiBox>
        </div>
      </div>

      <div className="ap-impact-body">
        {/* Left: Key Analytics Cards */}
        <div className="ap-impact-stats-grid">
          <div className="ap-impact-stat-card highlight">
            <div className="ap-impact-stat-label">Total Citations</div>
            <div className="ap-impact-stat-number">{fmt(metrics?.citations)}</div>
            <div className="ap-impact-stat-sub">Across all scientific databases</div>
          </div>

          <div className="ap-impact-stat-card">
            <div className="ap-impact-stat-label">Avg. Citations / Paper</div>
            <div className="ap-impact-stat-number">{avgCitationsPerPaper}</div>
            <div className="ap-impact-stat-sub">Citation density ratio</div>
          </div>

          <div className="ap-impact-stat-card">
            <div className="ap-impact-stat-label">H-index</div>
            <div className="ap-impact-stat-number">{metrics?.hIndex}</div>
            <div className="ap-impact-stat-sub">Hirsch index metric</div>
          </div>

          <div className="ap-impact-stat-card">
            <div className="ap-impact-stat-label">Highly Cited Papers</div>
            <div className="ap-impact-stat-number">{metrics?.highlyCitedPapers}</div>
            <div className="ap-impact-stat-sub">Top 1% global threshold</div>
          </div>
        </div>

        {/* Right: Trend Chart */}
        <div className="ap-impact-chart-box">
          <div className="ap-impact-chart-header">
            <span className="ap-impact-chart-caption">
              Annual {metricMode === "citations" ? "Citations" : "Publications Output"} (2018 – 2026)
            </span>
            <span className="ap-impact-chart-note">2026 data partial</span>
          </div>

          <div className="ap-impact-svg-wrap">
            <svg
              width="100%"
              height="150"
              viewBox={`0 0 ${svgWidth} ${chartHeight + 35}`}
              preserveAspectRatio="xMidYMid meet"
              className="ap-impact-svg"
            >
              {/* Horizontal grid lines */}
              <line x1="0" y1="1" x2={svgWidth} y2="1" stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="0" y1={chartHeight / 2} x2={svgWidth} y2={chartHeight / 2} stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="0" y1={chartHeight} x2={svgWidth} y2={chartHeight} stroke="var(--border)" />

              {trend.map((d, i) => {
                const val = metricMode === "citations" ? d.citations : d.publications;
                const h = Math.max(6, (val / maxVal) * chartHeight);
                const x = i * (barWidth + gap);
                const y = chartHeight - h;
                const isCurrentYear = d.year === 2026;

                return (
                  <g key={d.year} className="ap-impact-bar-group">
                    {/* Hover title tooltip */}
                    <title>{`${d.year}: ${val.toLocaleString()} ${metricMode}`}</title>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={h}
                      rx="3"
                      fill={isCurrentYear ? "#94A3B8" : metricMode === "citations" ? "var(--primary)" : "#0F172A"}
                      className="ap-impact-bar"
                    />
                    {/* Value above bar */}
                    <text
                      x={x + barWidth / 2}
                      y={y - 5}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="600"
                      fill="var(--text-main)"
                    >
                      {fmt(val)}
                    </text>
                    {/* Year below bar */}
                    <text
                      x={x + barWidth / 2}
                      y={chartHeight + 18}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="500"
                      fill="var(--text-muted)"
                    >
                      {d.year}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
