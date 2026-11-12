const workerBaseUrl = (import.meta.env.VITE_WORKER_API_URL || 'http://127.0.0.1:8787').replace(/\/$/, '');

async function getCatalogJson(path, params = {}, signal) {
  const url = new URL(`${workerBaseUrl}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal,
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload || typeof payload !== 'object') {
    const error = new Error(payload?.message || payload?.error || `Catalog request failed (${response.status}).`);
    error.response = { status: response.status, data: payload };
    throw error;
  }
  return payload;
}

export function searchCatalogJournalsApi(params, { signal } = {}) {
  return getCatalogJson('/api/v1/catalog/journals', params, signal);
}

export function getCatalogFieldsApi({ signal } = {}) {
  return getCatalogJson('/api/v1/catalog/fields', {}, signal);
}

export function getCatalogSubfieldsApi({ fieldId, signal } = {}) {
  return getCatalogJson('/api/v1/catalog/subfields', { field_id: fieldId }, signal);
}

export function getCatalogCountriesApi({ signal } = {}) {
  return getCatalogJson('/api/v1/catalog/countries', {}, signal);
}