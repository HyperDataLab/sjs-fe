import Pagination from '@mui/material/Pagination';

export default function PaginationControls({ currentPage, totalPages, onPageChange, ...props }) {
  if (totalPages <= 1) return null;

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(_event, page) => onPageChange(page)}
      boundaryCount={1}
      siblingCount={1}
      size="small"
      shape="rounded"
      color="primary"
      aria-label="Pagination"
      sx={{
        '& .MuiPaginationItem-root': { minWidth: 32, height: 32, fontSize: '0.8rem', fontWeight: 500 },
        '& .MuiPaginationItem-root.Mui-selected': { color: 'primary.contrastText' },
      }}
      {...props}
    />
  );
}
