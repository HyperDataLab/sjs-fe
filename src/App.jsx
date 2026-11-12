/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: App.jsx
 */
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import AppRoutes from './app/routes/AppRoutes';
import AppToast from './shared/components/AppToast';
import SessionExpiredModal from './shared/components/SessionExpiredModal';
import { auth } from './shared/services/firebase';
import { useAuthStore } from './app/store/authStore';

function App() {
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  useEffect(() => onAuthStateChanged(
    auth,
    setAuthUser,
    () => setAuthUser(null),
  ), [setAuthUser]);

  return (
    <>
      <AppToast />
      <BrowserRouter>
        <SessionExpiredModal />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
