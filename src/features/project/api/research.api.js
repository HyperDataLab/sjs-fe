import { auth } from '../../../shared/services/firebase';

const workerBaseUrl = (import.meta.env.VITE_WORKER_API_URL || 'http://127.0.0.1:8787').replace(/\/$/, '');

export async function runProjectAnalysisApi(parameters) {
  const user = auth.currentUser;
  if (!user) throw new Error('Sign in before starting an analysis.');

  const token = await user.getIdToken();
  const response = await fetch(`${workerBaseUrl}/api/v1/research/analyze`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parameters),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || result.error || `Analysis request failed (${response.status}).`);
  }

  return result;
}
