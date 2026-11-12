import Paper from '@mui/material/Paper';

export default function FilterCard({ children, className = '', sx, ...props }) {
  return (
    <Paper
      component="section"
      variant="outlined"
      className={className}
      sx={[
        {
          width: '100%',
          backgroundColor: 'background.paper',
          p: { xs: 2, md: 0 },
          borderRadius: { xs: 1, md: 0 },
          borderColor: { xs: 'divider', md: 'transparent' },
        },
        sx,
      ]}
      {...props}
    >
      {children}
    </Paper>
  );
}
