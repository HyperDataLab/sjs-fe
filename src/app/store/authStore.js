import { create } from 'zustand';

function toPublicUser(user) {
  if (!user) return null;
  const displayName = user.displayName || '';
  const [firstName = '', ...lastNameParts] = displayName.split(/\s+/).filter(Boolean);
  return {
    uid: user.uid,
    id: user.uid,
    email: user.email || null,
    displayName: displayName || null,
    first_name: firstName,
    last_name: lastNameParts.join(' '),
    url_image: user.photoURL || '',
    photoURL: user.photoURL || null,
    emailVerified: Boolean(user.emailVerified),
  };
}

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  remember: false,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  sessionExpiredModalVisible: false,

  setAuthUser: (firebaseUser) => {
    const user = toPublicUser(firebaseUser);
    set({ user, isAuthenticated: Boolean(user), isLoading: false, error: null });
  },
  setUser: (user) => set({ user: toPublicUser(user), isAuthenticated: Boolean(user) }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSessionExpiredModalVisible: (sessionExpiredModalVisible) => set({ sessionExpiredModalVisible }),
  loginSuccess: (_token, user) => {
    const publicUser = toPublicUser(user);
    set({ user: publicUser, token: null, refreshToken: null, isAuthenticated: Boolean(publicUser), isLoading: false, error: null });
  },
  logout: () => set({
    user: null,
    token: null,
    refreshToken: null,
    remember: false,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    sessionExpiredModalVisible: false,
  }),
}));
