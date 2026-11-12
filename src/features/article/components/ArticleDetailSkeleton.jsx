/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\components\ArticleDetailSkeleton.jsx
 */
import { Row, Col, Card } from '@/shared/components/ui/muiAdapters';
import LoadingSkeleton from '../../../shared/components/LoadingSkeleton';


import MuiBox from '@mui/material/Box';


export default function ArticleDetailSkeleton() {
  return (
    <Row sx={{ gap: "1.5rem" }} >
      {/* Left Main Column */}
      <Col xs={12} lg={8}>
        {/* Header Card Skeleton */}
        <Card sx={{ border: 0, padding: "1.5rem", marginBottom: "1.5rem" }}
          className="journal-dark-card"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px'
          }}
        >
          <MuiBox component="div" sx={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }} >
            <LoadingSkeleton width="60px" height="20px" borderRadius="6px" />
            <LoadingSkeleton width="100px" height="20px" borderRadius="6px" />
          </MuiBox>
          <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="90%" height="36px"  />
          <LoadingSkeleton sx={{ marginBottom: "1.5rem" }} width="70%" height="36px"  />
          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} >
            <LoadingSkeleton width="36px" height="36px" borderRadius="50%" />
            <LoadingSkeleton width="200px" height="18px" />
          </MuiBox>
        </Card>

        {/* Abstract Card Skeleton */}
        <Card sx={{ border: 0, padding: "1.5rem", marginBottom: "1.5rem" }}
          className="journal-dark-card"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px'
          }}
        >
          <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="180px" height="24px"  />
          <LoadingSkeleton width="100%" height="100px" borderRadius="8px" />
        </Card>

        {/* Keywords Card Skeleton */}
        <Card sx={{ border: 0, padding: "1.5rem", marginBottom: "1.5rem" }}
          className="journal-dark-card"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px'
          }}
        >
          <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="220px" height="24px"  />
          <MuiBox component="div" sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }} >
            <LoadingSkeleton width="80px" height="28px" borderRadius="8px" />
            <LoadingSkeleton width="120px" height="28px" borderRadius="8px" />
            <LoadingSkeleton width="100px" height="28px" borderRadius="8px" />
            <LoadingSkeleton width="90px" height="28px" borderRadius="8px" />
          </MuiBox>
        </Card>

        {/* Authors Card Skeleton */}
        <Card sx={{ border: 0, padding: "1.5rem", marginBottom: "1.5rem" }}
          className="journal-dark-card"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px'
          }}
        >
          <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="200px" height="24px"  />
          <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
            {[1, 2, 3].map(i => (
              <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} key={i} >
                <LoadingSkeleton width="32px" height="32px" borderRadius="50%" />
                <MuiBox component="div" sx={{ flexGrow: 1 }} >
                  <LoadingSkeleton sx={{ marginBottom: "0.25rem" }} width="150px" height="16px"  />
                  <LoadingSkeleton width="220px" height="12px" />
                </MuiBox>
              </MuiBox>
            ))}
          </MuiBox>
        </Card>
      </Col>

      {/* Right Sidebar Column */}
      <Col xs={12} lg={4}>
        {/* Actions Card Skeleton */}
        <Card sx={{ border: 0, padding: "1.5rem", marginBottom: "1.5rem" }}
          className="journal-dark-card"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px'
          }}
        >
          <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="150px" height="24px"  />
          <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
            <LoadingSkeleton width="100%" height="40px" borderRadius="8px" />
            <LoadingSkeleton width="100%" height="40px" borderRadius="8px" />
            <LoadingSkeleton width="100%" height="40px" borderRadius="8px" />
          </MuiBox>
        </Card>

        {/* Statistics Card Skeleton */}
        <Card sx={{ border: 0, padding: "1.5rem" }}
          className="journal-dark-card"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px'
          }}
        >
          <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="180px" height="24px"  />
          <LoadingSkeleton sx={{ marginBottom: "1rem" }} width="100%" height="70px" borderRadius="8px"  />
          <Row sx={{ gap: "0.5rem", marginBottom: "1rem" }} >
            {[1, 2, 3, 4].map(i => (
              <Col xs={6} key={i}>
                <LoadingSkeleton width="100%" height="50px" borderRadius="8px" />
              </Col>
            ))}
          </Row>
          <MuiBox component="div" sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }} >
            <LoadingSkeleton width="100%" height="16px" />
            <LoadingSkeleton width="100%" height="16px" />
          </MuiBox>
        </Card>
      </Col>
    </Row>
  );
}
