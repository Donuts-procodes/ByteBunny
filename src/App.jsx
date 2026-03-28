import { useEffect } from 'react';
import { useAppStore } from './stores/appStore';
import { ToastContainer, Scanline } from './components/UI';
import WelcomePage from './pages/WelcomePage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import HomePage    from './pages/HomePage';
import MapPage     from './pages/MapPage';
import LevelPage   from './pages/LevelPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const page     = useAppStore((s) => s.page);
  const user     = useAppStore((s) => s.user);
  const darkMode = useAppStore((s) => s.darkMode);
  const setPage  = useAppStore((s) => s.setPage);

  // Apply dark/light theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user && !['welcome', 'login', 'signup'].includes(page)) {
      setPage('welcome');
    }
  }, [user, page]);

  const renderPage = () => {
    switch (page) {
      case 'welcome': return <WelcomePage onLogin={() => setPage('login')} onSignup={() => setPage('signup')} />;
      case 'login':   return <LoginPage   onBack={() => setPage('welcome')} onSignup={() => setPage('signup')} />;
      case 'signup':  return <SignupPage  onBack={() => setPage('welcome')} onLogin={() => setPage('login')} />;
      case 'home':    return user ? <HomePage />    : null;
      case 'map':     return user ? <MapPage />     : null;
      case 'level':   return user ? <LevelPage />   : null;
      case 'profile': return user ? <ProfilePage /> : null;
      default:        return <WelcomePage onLogin={() => setPage('login')} onSignup={() => setPage('signup')} />;
    }
  };

  return (
    <>
      <Scanline />
      <ToastContainer />
      {renderPage()}
    </>
  );
}
