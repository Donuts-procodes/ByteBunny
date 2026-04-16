import { useEffect } from 'react';
import { useAppStore } from './stores/enhanced-appStore';
import { ToastContainer, Scanline } from './components/UI';
import LoadingScreen from './pages/LoadingScreen';
import WelcomePage  from './pages/WelcomePage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import HomePage    from './pages/HomePage';
import MapPage     from './pages/MapPage';
import LevelPage   from './pages/enhanced-LevelPage.jsx';
import ProfilePage from './pages/ProfilePage';
import AdminPage   from './pages/AdminPage';

export default function App() {
  const page      = useAppStore((s) => s.page);
  const user      = useAppStore((s) => s.user);
  const authReady = useAppStore((s) => s.authReady);
  const darkMode  = useAppStore((s) => s.darkMode);
  const initAuth  = useAppStore((s) => s.initAuth);
  const setPage   = useAppStore((s) => s.setPage);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Bootstrap Firebase auth — fires once, restores session if user was signed in
  useEffect(() => {
    const unsubAuth = initAuth();
    return () => { if (typeof unsubAuth === 'function') unsubAuth(); };
  }, []);

  // Guard: redirect unauthenticated users away from protected pages
  useEffect(() => {
    if (authReady && !user && !['welcome', 'login', 'signup', 'loading'].includes(page)) {
      setPage('welcome');
    }
  }, [user, page, authReady]);

  // Show loading screen while Firebase is resolving the initial auth state
  if (!authReady || page === 'loading') return <LoadingScreen />;

  const renderPage = () => {
    switch (page) {
      case 'welcome': return <WelcomePage onLogin={() => setPage('login')} onSignup={() => setPage('signup')} />;
      case 'login':   return <LoginPage   onBack={() => setPage('welcome')} onSignup={() => setPage('signup')} />;
      case 'signup':  return <SignupPage  onBack={() => setPage('welcome')} onLogin={() => setPage('login')} />;
      case 'home':    return user ? <HomePage />    : null;
      case 'map':     return user ? <MapPage />     : null;
      case 'level':   return user ? <LevelPage />   : null;
      case 'profile': return user ? <ProfilePage /> : null;
      case 'admin':   return user?.isAdmin ? <AdminPage /> : null;
      default:        return <WelcomePage onLogin={() => setPage('login')} onSignup={() => setPage('signup')} />;
    }
  };

  // Scanline only appears on menu/auth pages — never during gameplay
  const MENU_PAGES = ['welcome', 'login', 'signup', 'home', 'profile'];

  return (
    <>
      <Scanline show={MENU_PAGES.includes(page)} />
      <ToastContainer />
      {renderPage()}
    </>
  );
}