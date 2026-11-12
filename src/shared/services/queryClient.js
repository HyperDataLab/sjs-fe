import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 60 * 24, // 24 hours - cần đủ lớn để cache được persist & khôi phục sau khi reload
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * Persister lưu cache của TanStack Query xuống localStorage.
 * Nhờ đó khi người dùng F5/reload trang, dữ liệu cũ được hiển thị ngay lập tức
 * (từ localStorage) trong khi React Query fetch lại ngầm ở nền nếu dữ liệu đã stale.
 */
const QUERY_CACHE_KEY = 'RESEARCHPULSE_QUERY_CACHE';
const isProjectQuery = (query) => ['project', 'projects'].includes(query.queryKey?.[0]);
const stripProjectQueries = (client) => ({
  ...client,
  clientState: {
    ...client.clientState,
    queries: (client.clientState?.queries || []).filter((query) => !isProjectQuery(query)),
  },
});

try {
  const savedCache = window.localStorage.getItem(QUERY_CACHE_KEY);
  if (savedCache) {
    const parsedCache = JSON.parse(savedCache);
    const sanitizedCache = stripProjectQueries(parsedCache);
    if (sanitizedCache.clientState.queries.length !== parsedCache.clientState?.queries?.length) {
      window.localStorage.setItem(QUERY_CACHE_KEY, JSON.stringify(sanitizedCache));
    }
  }
} catch {
  // Ignore malformed legacy cache; React Query will fetch fresh data.
}

export const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: QUERY_CACHE_KEY,
  throttleTime: 1000,
  serialize: (client) => JSON.stringify(stripProjectQueries(client)),
  deserialize: (serialized) => stripProjectQueries(JSON.parse(serialized)),
});
