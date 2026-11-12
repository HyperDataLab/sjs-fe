import { useCallback } from 'react';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as updateFirebaseProfile,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, firebaseEmulatorsEnabled } from '../../../shared/services/firebase';
import { useAuthStore } from '../../../app/store/authStore';
import { useUserStore } from '../../../app/store/userStore';
import { useWalletStore } from '../../../app/store/walletStore';

function displayNameFrom(data = {}) {
  return data.displayName || [data.first_name, data.last_name].filter(Boolean).join(' ').trim() || undefined;
}

export default function useAuth() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const token = null;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  const clearAuthState = useAuthStore((state) => state.logout);
  const setEmail = useUserStore((state) => state.setEmail);
  const clearEmail = useUserStore((state) => state.clearEmail);
  const clearWallet = useWalletStore((state) => state.clearWallet);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      setAuthUser(credential.user);
      setEmail(credential.user.email);
      return credential.user;
    } catch (authError) {
      setError(authError.message);
      throw authError;
    } finally {
      setLoading(false);
    }
  }, [setAuthUser, setEmail, setError, setLoading]);

  const loginWithGoogle = useCallback(async (redirectTo = '/') => {
    setLoading(true);
    setError(null);
    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      setAuthUser(credential.user);
      setEmail(credential.user.email);
      navigate(redirectTo, { replace: true });
      return credential.user;
    } catch (authError) {
      setError(authError.message);
      throw authError;
    } finally {
      setLoading(false);
    }
  }, [navigate, setAuthUser, setEmail, setError, setLoading]);

  const loginAsDevUser = useCallback(async () => {
    if (!import.meta.env.DEV || !firebaseEmulatorsEnabled) {
      throw new Error('Development mock login is available only with the Firebase Auth Emulator.');
    }

    const email = import.meta.env.VITE_DEV_AUTH_EMAIL || 'dev@example.test';
    const password = import.meta.env.VITE_DEV_AUTH_PASSWORD || 'dev-password';
    setLoading(true);
    setError(null);
    try {
      let credential;
      try {
        credential = await signInWithEmailAndPassword(auth, email, password);
      } catch (authError) {
        if (authError.code !== 'auth/user-not-found') throw authError;
        credential = await createUserWithEmailAndPassword(auth, email, password);
      }
      setAuthUser(credential.user);
      setEmail(credential.user.email);
      return credential.user;
    } catch (authError) {
      setError(authError.message);
      throw authError;
    } finally {
      setLoading(false);
    }
  }, [setAuthUser, setEmail, setError, setLoading]);

  const register = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const displayName = displayNameFrom(data);
      if (displayName) await updateFirebaseProfile(credential.user, { displayName });
      try {
        await sendEmailVerification(credential.user, { url: window.location.origin + '/login' });
      } finally {
        await signOut(auth);
        setAuthUser(null);
      }
      return credential.user;
    } catch (authError) {
      setError(authError.message);
      throw authError;
    } finally {
      setLoading(false);
    }
  }, [setAuthUser, setError, setLoading]);

  const logout = useCallback(async () => {
    await signOut(auth);
    clearAuthState();
    clearEmail();
    clearWallet();
    navigate('/login', { replace: true });
  }, [clearAuthState, clearEmail, clearWallet, navigate]);

  const fetchProfile = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No authenticated Firebase user.');
    setAuthUser(currentUser);
    setEmail(currentUser.email);
    return currentUser;
  }, [setAuthUser, setEmail]);

  const updateProfile = useCallback(async (profileData) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No authenticated Firebase user.');
    const displayName = displayNameFrom(profileData);
    await updateFirebaseProfile(currentUser, {
      ...(displayName ? { displayName } : {}),
      ...(profileData.photoURL ? { photoURL: profileData.photoURL } : {}),
    });
    setAuthUser(currentUser);
    return currentUser;
  }, [setAuthUser]);

  const deleteAccount = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No authenticated Firebase user.');
    await deleteUser(currentUser);
    clearAuthState();
    clearEmail();
    clearWallet();
    navigate('/register', { replace: true });
  }, [clearAuthState, clearEmail, clearWallet, navigate]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    loginWithGoogle,
    loginAsDevUser,
    register,
    logout,
    fetchProfile,
    updateProfile,
    deleteAccount,
  };
}
