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

// Badge system imports
import { BADGE_RULES, getLanguageMasterBadges, getAcademyGraduateBadges } from './data/badges';
import { LANGUAGES as LEVEL_LANGS } from './data/enhanced-levels';
import { COURSE_DATA, LANGUAGES as COURSE_LANGS } from './data/courses';

function useBadgeTracker() {
  const { xp, streak, progress, courseProgress, testHistory, badges, saveBadges, addToast } = useAppStore();

  const stats = useMemo(() => ({
    xp,
    streak,
    totalLevels: Object.values(progress).reduce((acc, lang) => acc + Object.keys(lang.completedLevels || {}).length, 0),
    totalLectures: Object.values(courseProgress).reduce((acc, lang) => {
      return acc + Object.values(lang).reduce((lAcc, level) => lAcc + level.length, 0);
    }, 0),
  }), [xp, streak, progress, courseProgress]);

  useEffect(() => {
    if (!xp && streak === 0) return; // Wait for initial load

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
  }, [stats, progress, courseProgress, badges]);
}

export default function App() {
  const page      = useAppStore((s) => s.page);
  const user      = useAppStore((s) => s.user);
  const authReady = useAppStore((s) => s.authReady);
  const darkMode  = useAppStore((s) => s.darkMode);
  const initAuth  = useAppStore((s) => s.initAuth);
  const setPage   = useAppStore((s) => s.setPage);

  useBadgeTracker();