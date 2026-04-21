import { useEffect, useMemo } from 'react';
import { useAppStore } from './stores/enhanced-appStore';
import { ToastContainer, Scanline } from './components/UI';
import LoadingScreen from './pages/LoadingScreen';
import WelcomePage  from './pages/WelcomePage';
import { LoginPage, SignupPage, ForgotPasswordPage } from './pages/AuthPages';
import HomePage    from './pages/HomePage';
import MapPage     from './pages/MapPage';
import CourseMenuPage from './pages/CourseMenuPage';
import CoursePage  from './pages/CoursePage';
import LevelPage   from './pages/enhanced-LevelPage.jsx';
import ProfilePage from './pages/ProfilePage';
import AdminPage   from './pages/AdminPage';
import TestPage    from './pages/TestPage';
import { TermsPage, PrivacyPage } from './pages/LegalPages';

// Badge system imports
import { BADGE_RULES, getLanguageMasterBadges, getAcademyGraduateBadges } from './data/badges';
import { LANGUAGES as LEVEL_LANGS } from './data/enhanced-levels';
import { COURSE_DATA, LANGUAGES as COURSE_LANGS } from './data/courses';

function useBadgeTracker() {
  const { xp, streak, progress, courseProgress, badges, saveBadges, addToast } = useAppStore();

  const stats = useMemo(() => ({
    xp,
    streak,
    totalLevels: Object.values(progress).reduce((acc, lang) => acc + Object.keys(lang.completedLevels || {}).length, 0),
    totalLectures: Object.values(courseProgress).reduce((acc, lang) => {
      return acc + Object.values(lang).reduce((lAcc, level) => lAcc + level.length, 0);
    }, 0),
    maxLevel: Object.values(progress).reduce((max, lang) => Math.max(max, lang.currentLevel || 1), 1),
  }), [xp, streak, progress, courseProgress]);

  useEffect(() => {
    if (xp === 0 && streak === 0) return; // Wait for initial load

    const mainBadges = BADGE_RULES.filter(rule => rule.check(stats));
    const masterBadges = getLanguageMasterBadges(progress, LEVEL_LANGS);
    const graduateBadges = getAcademyGraduateBadges(courseProgress, COURSE_DATA, COURSE_LANGS);
    
    const allEarned = [...mainBadges, ...masterBadges, ...graduateBadges];
    const newBadges = allEarned.filter(b => !badges.includes(b.id));

    if (newBadges.length > 0) {
      newBadges.forEach(badge => {
        addToast(`Badge Earned: ${badge.label} ${badge.icon}`, 'success', 5000);
      });
      saveBadges([...badges, ...newBadges.map(b => b.id)]);
    }
  }, [stats, progress, courseProgress, badges, addToast, saveBadges]);
}

export default function App() {
  const page      = useAppStore((s) => s.page);
  const user      = useAppStore((s) => s.user);
  const authReady = useAppStore((s) => s.authReady);
  const darkMode  = useAppStore((s) => s.darkMode);
  const initAuth  = useAppStore((s) => s.initAuth);
  const setPage   = useAppStore((s) => s.setPage);

  useBadgeTracker();

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Bootstrap Firebase auth — fires once, restores session if user was signed in
  useEffect(() => {
    const unsubAuth = initAuth();
    return () => { if (typeof unsubAuth === 'function') unsubAuth(); };
  }, [initAuth]);

  // Guard: redirect unauthenticated users away from protected pages
  useEffect(() => {
    if (authReady && !user && !['welcome', 'login', 'signup', 'forgot-password', 'loading'].includes(page)) {
      setPage('welcome');
    }
  }, [user, page, authReady, setPage]);

  // Show loading screen while Firebase is resolving the initial auth state
  if (!authReady || page === 'loading') return <LoadingScreen />;

  const renderPage = () => {
    switch (page) {
      case 'welcome': return <WelcomePage onLogin={() => setPage('login')} onSignup={() => setPage('signup')} />;
      case 'login':   return <LoginPage   onBack={() => setPage('welcome')} onSignup={() => setPage('signup')} />;
      case 'signup':  return <SignupPage  onBack={() => setPage('welcome')} onLogin={() => setPage('login')} />;
      case 'forgot-password': return <ForgotPasswordPage onBack={() => setPage('login')} />;
      case 'home':    return user ? <HomePage />    : null;
      case 'map':     return user ? <MapPage />     : null;
      case 'course-menu': return user ? <CourseMenuPage /> : null;
      case 'course':  return user ? <CoursePage />  : null;
      case 'level':   return user ? <LevelPage />   : null;
      case 'test':    return user ? <TestPage />    : null;
      case 'profile': return user ? <ProfilePage /> : null;
      case 'terms':   return <TermsPage />;
      case 'privacy': return <PrivacyPage />;
      case 'admin':   return user?.isAdmin ? <AdminPage /> : null;
      default:        return <WelcomePage onLogin={() => setPage('login')} onSignup={() => setPage('signup')} />;
    }
  };

  // Scanline only appears on menu/auth pages — never during gameplay or active tests
  const MENU_PAGES = ['welcome', 'login', 'signup', 'forgot-password', 'home', 'profile', 'course', 'course-menu'];

  return (
    <>
      <Scanline show={MENU_PAGES.includes(page)} />
      <ToastContainer />
      {renderPage()}
    </>
  );
}
