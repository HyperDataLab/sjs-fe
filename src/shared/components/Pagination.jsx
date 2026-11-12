import PaginationControls from './PaginationControls';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/**
 * Reusable Pagination Component for data lists.
 * Uses the admin pagination visual standard while keeping summary text consistent.
 *
 * @param {number} totalItems - Total count of items
 * @param {number} currentPage - Active page number (1-indexed)
 * @param {number} limit - Items per page
 * @param {function} onPageChange - Callback when page changes
 * @param {string} entityName - Singular/plural name for display (default: 'items')
 */
export default function Pagination({
  totalItems,
  currentPage,
  limit,
  onPageChange,
  entityName = 'items'
}) {
  const { t, i18n } = useTranslation();
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(totalItems, currentPage * limit);

  if (totalItems === 0) {
    return null;
  }

  const isEn = i18n.language === 'en';
  const formatNum = (num) => num.toLocaleString(isEn ? 'en-US' : 'vi-VN');

  const getEntityLabel = (name, count) => {
    if (!name) return '';
    const nameLower = name.trim().toLowerCase();
    const map = {
      'bài báo': isEn ? (count === 1 ? 'article' : 'articles') : 'bài báo',
      'scientific paper': isEn ? (count === 1 ? 'scientific paper' : 'scientific papers') : 'bài báo khoa học',
      'scientific papers': isEn ? 'scientific papers' : 'bài báo khoa học',
      'tạp chí': isEn ? (count === 1 ? 'journal' : 'journals') : 'tạp chí',
      'quốc gia': isEn ? (count === 1 ? 'country' : 'countries') : 'quốc gia',
      'tác giả': isEn ? (count === 1 ? 'author' : 'authors') : 'tác giả',
      'articles': isEn ? (count === 1 ? 'article' : 'articles') : 'bài báo',
      'journals': isEn ? (count === 1 ? 'journal' : 'journals') : 'tạp chí',
      'users': isEn ? (count === 1 ? 'user' : 'users') : 'người dùng',
      'volumes': isEn ? (count === 1 ? 'volume' : 'volumes') : 'tập (volumes)',
      'keywords': isEn ? (count === 1 ? 'keyword' : 'keywords') : 'từ khóa',
      'items': isEn ? (count === 1 ? 'item' : 'items') : 'mục'
    };
    return map[nameLower] || name;
  };

  const displayEntity = getEntityLabel(entityName, totalItems);

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      spacing={2}
      sx={{ pt: 2 }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
        {t('pagination.showing', 'Showing')}{' '}
        <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>{formatNum(startItem)}</Box>{' '}
        {t('pagination.to', 'to')}{' '}
        <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>{formatNum(endItem)}</Box>{' '}
        {t('pagination.of', 'of')}{' '}
        <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>{formatNum(totalItems)}</Box>{' '}
        {displayEntity}
      </Typography>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', width: { xs: '100%', sm: 'auto' } }}>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </Box>

      <Box aria-hidden="true" sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }} />
    </Stack>
  );
}
