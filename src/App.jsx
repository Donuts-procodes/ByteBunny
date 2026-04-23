import { useEffect, useMemo, useRef } from 'react';
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
  const { 
    xp, streak, progress, courseProgress, badges, saveBadges, addToast,
    rabbitHoleClicks, bunnyHops, konamiUnlocked, foxPangram, isLagomorph, carat24Entered
  } = useAppStore();

  const stats = useMemo(() => ({
    xp,
    streak,
    totalLevels: Object.values(progress).reduce((acc, langData) => {
      // langData has keys like '1', '2', '3'... each with { completed: boolean }
      let count = 0;
      for (let i = 1; i <= 300; i++) {
        if (langData[i]?.completed) count++;
      }
      return acc + count;
    }, 0),
    totalLectures: Object.values(courseProgress).reduce((acc, lang) => {
      return acc + Object.values(lang).reduce((lAcc, level) => lAcc + level.length, 0);
    }, 0),
    maxLevel: Object.values(progress).reduce((max, lang) => Math.max(max, lang.currentLevel || 1), 1),
    rabbitHoleClicks,
    bunnyHops,
    konamiUnlocked,
    foxPangram,
    isLagomorph,
    carat24Entered,
    progress
  }), [xp, streak, progress, courseProgress, rabbitHoleClicks, bunnyHops, konamiUnlocked, foxPangram, isLagomorph, carat24Entered]);

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

// ── Global Easter Egg Manager ────────────────────────────────────────────────
function GlobalEasterEggManager() {
  const { 
    page, triggerRabbitHole, triggerBunnyHop, unlockKonami, 
    triggerFoxPanic, triggerLagomorph, triggerCarat24,
    isCarrotTheme, isPanicMode, isBouncing 
  } = useAppStore();

  const konami = useRef([]);
  const pangram = useRef("");
  const idleTimer = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Konami Code (Up Up Down Down Left Right Left Right B A)
      const k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
      konami.current.push(e.keyCode);
      konami.current = konami.current.slice(-10);
      if (konami.current.join(',') === k.join(',')) unlockKonami();

      // 2. Bunny Hop (Spacebar visual bounce)
      if (e.code === 'Space') {
        triggerBunnyHop();
      }

      // 3. The Quick Brown Fox (Pangram)
      pangram.current += e.key.toLowerCase();
      pangram.current = pangram.current.slice(-50);
      if (pangram.current.includes("the quick brown fox jumps over the lazy dog")) triggerFoxPanic();
    };

    const handleInput = (e) => {
      if (e.target.value === "24") triggerCarat24();
    };

    const resetIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(triggerLagomorph, 300000); // 5 minutes
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('input', handleInput, true); 
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('mousedown', resetIdle);
    window.addEventListener('touchstart', resetIdle);
    
    resetIdle();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('input', handleInput, true);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('mousedown', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
    };
  }, []);

  useEffect(() => {
    if (page === 'terms' || page === 'privacy') triggerRabbitHole();
  }, [page]);

  useEffect(() => {
    document.body.classList.toggle('carrot-theme', isCarrotTheme);
    document.body.classList.toggle('panic-mode', isPanicMode);
    document.body.classList.toggle('bouncing', isBouncing);
  }, [isCarrotTheme, isPanicMode, isBouncing]);

  return null;
}

export default function App() {
  const page      = useAppStore((s) => s.page);
  const user      = useAppStore((s) => s.user);
  const authReady = useAppStore((s) => s.authReady);
  const darkMode  = useAppStore((s) => s.darkMode);
  const initAuth  = useAppStore((s) => s.initAuth);
  const setPage   = useAppStore((s) => s.setPage);

  useBadgeTracker();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const unsubAuth = initAuth();
    return () => { if (typeof unsubAuth === 'function') unsubAuth(); };
  }, [initAuth]);

  useEffect(() => {
    if (authReady && !user && !['welcome', 'login', 'signup', 'forgot-password', 'loading'].includes(page)) {
      setPage('welcome');
    }
  }, [user, page, authReady, setPage]);

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

  const MENU_PAGES = ['welcome', 'login', 'signup', 'forgot-password', 'home', 'profile', 'course', 'course-menu'];

  return (
    <>
      <GlobalEasterEggManager />
      <Scanline show={MENU_PAGES.includes(page)} />
      <ToastContainer />
      {renderPage()}
    </>
  );
}
