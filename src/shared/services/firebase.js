import { getApp, getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'sjs-be';
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || (import.meta.env.DEV ? 'demo-api-key' : '');
const appId = import.meta.env.VITE_FIREBASE_APP_ID || (import.meta.env.DEV ? '1:827720641620:web:local-dev' : '');
const useEmulators = import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR !== 'false';

if (!apiKey || !appId) {
  throw new Error('Set VITE_FIREBASE_API_KEY and VITE_FIREBASE_APP_ID for the Firebase web app.');
}

const firebaseConfig = {
  apiKey,
  appId,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com`,
  projectId,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const firebaseEmulatorsEnabled = useEmulators;

if (useEmulators && !globalThis.__SJS_FIREBASE_EMULATORS_CONNECTED__) {
  const authHost = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1';
  const authPort = Number(import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_PORT || 9099);
  const firestoreHost = import.meta.env.VITE_FIRESTORE_EMULATOR_HOST || '127.0.0.1';
  const firestorePort = Number(import.meta.env.VITE_FIRESTORE_EMULATOR_PORT || 8080);

  connectAuthEmulator(auth, `http://${authHost}:${authPort}`, { disableWarnings: true });
  connectFirestoreEmulator(db, firestoreHost, firestorePort);
  globalThis.__SJS_FIREBASE_EMULATORS_CONNECTED__ = true;
}
