import { useAuthStore } from '../../app/store/authStore';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Firebase Auth owns token persistence; this remains for legacy callers.
export const removeToken = () => {};

export const isAuthenticated = async () => {
  const user = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      unsubscribe();
      resolve(currentUser);
    });
  });
  useAuthStore.getState().setAuthUser(user);
  return Boolean(user);
};
