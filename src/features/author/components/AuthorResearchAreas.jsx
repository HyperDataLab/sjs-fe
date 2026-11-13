import Icon from "../../../shared/components/Icon";

/**
 * @file AuthorResearchAreas.jsx
 * @description Research Area Distribution donut chart & ranked list.
 * Styled with academic color tones: dark, gray, orange, light gray.
 */
export default function AuthorResearchAreas({ areas = [] }) {
  if (!areas || areas.length === 0) return null;

  // Palette: primary orange, dark navy, slate gray, charcoal, muted amber, steel
  const PALETTE = [
    "var(--primary)", // Orange accent
    "#0F172A", // Dark navy
    "#475569", // Slate
    "#64748B", // Gray
    "#94A3B8", // Light slate
    "#D97706", // Amber
    "#334155", // Deep slate
    "#CBD5E1", // Light gray
  ];

  const sorted = [...areas].sort((a, b) => b.percentage - a.percentage);
  const maxShown = 6;
  const visible = sorted.slice(0, maxShown);
  const others = sorted.slice(maxShown);
  const otherPct = others.reduce((sum, item) => sum + (item.percentage || 0), 0);
  const otherCount = others.reduce((sum, item) => sum + (item.count || 0), 0);

  // Donut SVG parameters
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  let accumulated = 0;

  return (
    <div className="ap-section" id="research">
      <div className="ap-section-header">
        <div className="ap-section-header-left">
          <Icon icon="lucide:pie-chart" width="16" className="ap-section-icon" />
          <h2 className="ap-section-title">Research Area Distribution</h2>
        </div>
        <span className="ap-section-badge">{areas.length} fields</span>
      </div>

      <div className="ap-areas-wrapper">
        {/* Left: Donut Chart */}
        <div className="ap-areas-chart-col">
          <div className="ap-areas-svg-container">
            <svg width="140" height="140" viewBox="0 0 120 120" className="ap-areas-svg">
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke="var(--bg-section)"
                strokeWidth="14"
              />
              {visible.map((item, idx) => {
                const strokeColor = PALETTE[idx % PALETTE.length];
                const pct = item.percentage || 0;
                const dashArray = `${(pct / 100) * circumference} ${circumference}`;
                const dashOffset = -((accumulated / 100) * circumference);
                accumulated += pct;

                return (
                  <circle
                    key={idx}
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke={strokeColor}
                    strokeWidth="14"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    className="ap-areas-donut-segment"
                  />
                );
              })}
              {otherPct > 0 && (
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="transparent"
                  stroke="#E2E8F0"
                  strokeWidth="14"
                  strokeDasharray={`${(otherPct / 100) * circumference} ${circumference}`}
                  strokeDashoffset={-((accumulated / 100) * circumference)}
                />
              )}
            </svg>
            <div className="ap-areas-donut-core">
              <span className="ap-areas-donut-core-number">{areas.length}</span>
              <span className="ap-areas-donut-core-label">Disciplines</span>
            </div>
          </div>
        </div>

        {/* Right: Ranked List with Bars */}
        <div className="ap-areas-list-col">
          {visible.map((item, idx) => {
            const color = PALETTE[idx % PALETTE.length];
            return (
              <div key={idx} className="ap-area-ranked-row">
                <div className="ap-area-ranked-head">
                  <div className="ap-area-ranked-title">
                    <span className="ap-area-ranked-dot" style={{ backgroundColor: color }} />
                    <span className="ap-area-ranked-name">{item.name}</span>
                  </div>
                  <div className="ap-area-ranked-metrics">
                    <span className="ap-area-ranked-count">{item.count} papers</span>
                    <span className="ap-area-ranked-divider">·</span>
                    <span className="ap-area-ranked-pct">{item.percentage}%</span>
                  </div>
                </div>
                <div className="ap-area-progress-track">
                  <div
                    className="ap-area-progress-bar"
                    style={{
                      width: `${Math.min(100, item.percentage)}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}

          {others.length > 0 && (
            <div className="ap-area-ranked-row others">
              <div className="ap-area-ranked-head">
                <div className="ap-area-ranked-title">
                  <span className="ap-area-ranked-dot" style={{ backgroundColor: "#CBD5E1" }} />
                  <span className="ap-area-ranked-name">Other disciplines ({others.length})</span>
                </div>
                <div className="ap-area-ranked-metrics">
                  <span className="ap-area-ranked-count">{otherCount} papers</span>
                  <span className="ap-area-ranked-divider">·</span>
                  <span className="ap-area-ranked-pct">{otherPct.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
