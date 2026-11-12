
/**
 * LoadingSkeleton Component
 * Renders an animated placeholder shimmer block.
 */
export default function LoadingSkeleton({
  width = '100%',
  height = '1rem',
  borderRadius = '4px',
  className = '',
  sx,
  style,
  ...props
}) {
  return (
    <Box
      component="div"
      className={`skeleton-shimmer ${className}`}
      sx={sx}
      style={{
        width,
        height,
        borderRadius,
        display: 'inline-block',
        ...style,
      }}
      {...props}
    />
  );
}
import Box from '@mui/material/Box';
