import axios from 'axios';
import { auth } from './firebase';

const workerBaseUrl = (
  import.meta.env.VITE_WORKER_API_URL || 'http://127.0.0.1:8787'
).replace(/\/$/, '');
const apiBaseUrl = `${workerBaseUrl}/api/v1`;

function createApiClient({ authenticated = true } = {}) {
  const client = axios.create({
    baseURL: apiBaseUrl,
    headers: { 'Content-Type': 'application/json' },
  });

  if (authenticated) {
    client.interceptors.request.use(async (config) => {
      const token = await auth.currentUser?.getIdToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  return client;
}

const api = createApiClient();
export const publicApi = createApiClient({ authenticated: false });

export default api;
