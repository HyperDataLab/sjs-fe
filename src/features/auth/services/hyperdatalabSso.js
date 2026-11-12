import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../../../shared/services/firebase';

const ATTEMPT_STORAGE_KEY = 'hyperdatalab-sso-attempt';
const ATTEMPT_TTL_MS = 10 * 60 * 1000;
const SSO_SCOPES = ['email', 'profile'];

let callbackPromise;

function config() {
  const ssoBaseUrl = import.meta.env.VITE_HYPERDATALAB_SSO_BASE_URL?.trim();
  const clientId = import.meta.env.VITE_HYPERDATALAB_SSO_CLIENT_ID?.trim();
  const callbackUrl = import.meta.env.VITE_HYPERDATALAB_SSO_CALLBACK_URL?.trim();
  const workerUrl = import.meta.env.VITE_WORKER_API_URL?.trim();

  if (!ssoBaseUrl || !clientId || !callbackUrl || !workerUrl) {
    throw new Error('SSO_CONFIGURATION_MISSING');
  }

  let baseUrl;
  let callback;
  let worker;
  try {
    baseUrl = new URL(ssoBaseUrl);
    callback = new URL(callbackUrl);
    worker = new URL(workerUrl);
  } catch {
    throw new Error('SSO_CONFIGURATION_INVALID');
  }

  const isLoopback = (url) => ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  for (const url of [baseUrl, callback, worker]) {
    if (url.protocol !== 'https:' && !(url.protocol === 'http:' && isLoopback(url))) {
      throw new Error('SSO_CONFIGURATION_MUST_USE_HTTPS');
    }
  }

  return { baseUrl, callback, clientId, worker };
}

function base64Url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function randomToken() {
  return base64Url(crypto.getRandomValues(new Uint8Array(32)));
}

async function createChallenge(verifier) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  return base64Url(new Uint8Array(digest));
}

function safeReturnTo(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return '/';
  try {
    const destination = new URL(value, window.location.origin);
    if (destination.origin !== window.location.origin) return '/';
    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return '/';
  }
}

export async function startHyperdatalabSso(returnTo = '/') {
  const settings = config();
  const state = randomToken();
  const verifier = randomToken();
  const challenge = await createChallenge(verifier);

  sessionStorage.setItem(ATTEMPT_STORAGE_KEY, JSON.stringify({
    state,
    verifier,
    returnTo: safeReturnTo(returnTo),
    createdAt: Date.now(),
  }));

  const authorizationUrl = new URL('/oauth/authorize', settings.baseUrl);
  authorizationUrl.search = new URLSearchParams({
    response_type: 'code',
    client_id: settings.clientId,
    redirect_uri: settings.callback.href,
    scope: SSO_SCOPES.join(' '),
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  }).toString();

  window.location.assign(authorizationUrl.toString());
}

async function requestSsoToken(code, verifier, settings) {
  const response = await fetch(new URL('/oauth/token', settings.baseUrl), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: settings.clientId,
      code,
      redirect_uri: settings.callback.href,
      code_verifier: verifier,
    }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok || typeof body.access_token !== 'string' || !body.access_token) {
    throw new Error('SSO_TOKEN_EXCHANGE_FAILED');
  }
  return body.access_token;
}

async function revokeSsoToken(accessToken, settings) {
  try {
    await fetch(new URL('/oauth/revoke', settings.baseUrl), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: accessToken }),
    });
  } catch {
    // Revocation is best effort; the short-lived token is never persisted by the FE.
  }
}

async function exchangeForFirebaseToken(accessToken, settings) {
  const endpoint = new URL('/api/v1/auth/sso/custom-token', settings.worker);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || typeof body.customToken !== 'string' || !body.customToken) {
    if (response.status === 401 || response.status === 403) throw new Error('SSO_PROFILE_NOT_ELIGIBLE');
    throw new Error('SSO_FIREBASE_BRIDGE_FAILED');
  }
  return body.customToken;
}

async function completeCallback(callbackHref) {
  const settings = config();
  const callbackUrl = new URL(callbackHref);
  const state = callbackUrl.searchParams.get('state');
  const code = callbackUrl.searchParams.get('code');
  const providerError = callbackUrl.searchParams.get('error');
  const attemptValue = sessionStorage.getItem(ATTEMPT_STORAGE_KEY);
  sessionStorage.removeItem(ATTEMPT_STORAGE_KEY);

  if (!attemptValue) throw new Error('SSO_ATTEMPT_MISSING');

  let attempt;
  try {
    attempt = JSON.parse(attemptValue);
  } catch {
    throw new Error('SSO_ATTEMPT_INVALID');
  }

  const createdAt = Number(attempt.createdAt);
  if (!Number.isFinite(createdAt) || createdAt > Date.now() || Date.now() - createdAt > ATTEMPT_TTL_MS) {
    throw new Error('SSO_ATTEMPT_EXPIRED');
  }
  if (typeof state !== 'string' || state !== attempt.state) throw new Error('SSO_STATE_INVALID');
  if (providerError) throw new Error('SSO_PROVIDER_REJECTED');
  if (typeof code !== 'string' || !code || code.length > 4096
    || typeof attempt.verifier !== 'string' || attempt.verifier.length < 43 || attempt.verifier.length > 128) {
    throw new Error('SSO_CODE_MISSING');
  }

  const accessToken = await requestSsoToken(code, attempt.verifier, settings);
  try {
    const customToken = await exchangeForFirebaseToken(accessToken, settings);
    await signInWithCustomToken(auth, customToken);
  } finally {
    await revokeSsoToken(accessToken, settings);
  }

  return { returnTo: safeReturnTo(attempt.returnTo) };
}

export function completeHyperdatalabSsoCallback(callbackHref) {
  if (!callbackPromise) {
    callbackPromise = completeCallback(callbackHref).catch((error) => {
      callbackPromise = undefined;
      throw error;
    });
  }
  return callbackPromise;
}
