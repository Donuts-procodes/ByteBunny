import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  firebaseEmailSignup,
  firebaseEmailLogin,
  firebaseGoogleLogin,
  firebaseLogout,
  listenAuthState,
  pushToFirestore,
  fetchFromFirestore,
  subscribeFirestore,
} from '../lib/firebase';
import { db } from '../lib/firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';

// ── Admin UIDs ────────────────────────────────────────────────────────────────
const ADMIN_UIDS = [
 '60SxAQ8VO9N82wkaqdzCm0vvMhD2',
];

// ── Store ─────────────────────────────────────────────────────────────────────
export const useAppStore = create(
  persist(
    (set, get) => ({
      // Auth
      user:         null,
      authReady:    false,
      firebaseUser: null,

      // Progress
      progress:  {},
      courseProgress: {}, // { python: { basic: [lectureId1, lectureId2], ... } }
      testHistory: [], // [ { id, date, config, questions, answers, results } ]
      badges: [], // [badgeId1, badgeId2, ...]
      xp:        0,
      streak:    0,
      lastLogin: '',

      // UI
      darkMode:       true,
      page:           'loading',
      activeLang:     null,
      courseSelection: { lang: 'python', level: 'basic' },
      currentLevelId: null,
      toasts:         [],

      // Internal
      _firestoreUnsub: null,

      // ── UI helpers ───────────────────────────────────────────────────────────────
      setPage:       (page) => set({ page }),
      setActiveLang: (lang) => set({ activeLang: lang }),
      setCourseSelection: (sel) => set({ courseSelection: sel }),

      // ── Test History ─────────────────────────────────────────────────────────────
      addTestResult: (result) => {
        const { testHistory, user, xp } = get();
        const updatedHistory = [result, ...testHistory];
        const xpEarned = Math.floor(result.results.score / 2); // 50 XP for 100% score

        set({ 
          testHistory: updatedHistory,
          xp: xp + xpEarned
        });

        if (user?.uid) {
          pushToFirestore(user.uid, get()._snap());
        }
        get().addToast(`Test Saved! +${xpEarned} XP 🏆`, 'success');
      },

      // ── Course Progress ──────────────────────────────────────────────────────────
      completeCourseLecture: (lang, level, lectureId, earnedXP = 10) => {
        const { courseProgress, user, xp, addToast } = get();
        const currentLangProgress = courseProgress[lang] || {};
        const currentLevelProgress = currentLangProgress[level] || [];

        if (currentLevelProgress.includes(lectureId)) return; // Already done

        const updatedLevelProgress = [...currentLevelProgress, lectureId];
        const updatedLangProgress = { ...currentLangProgress, [level]: updatedLevelProgress };
        const updatedCourseProgress = { ...courseProgress, [lang]: updatedLangProgress };

        set({ 
          courseProgress: updatedCourseProgress,
          xp: xp + earnedXP
        });

        if (user?.uid) {
          pushToFirestore(user.uid, get()._snap());
        }
        addToast(`Lecture Completed! +${earnedXP} XP`, 'success');
      },

      toggleDark: () => {
        const newDark = !get().darkMode;
        set({ darkMode: newDark });
        const { user } = get();
        if (user?.uid) pushToFirestore(user.uid, get()._snap());
      },

      addToast: (msg, type = 'info', dur = 2800) => {
        const id = Date.now() + Math.random();
        set((s) => ({ toasts: [...s.toasts, { id, msg, type }] }));
        setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), dur); 
      },

      saveBadges: (badgeIds) => {
        const { user } = get();
        set({ badges: badgeIds });
        if (user?.uid) {
          pushToFirestore(user.uid, get()._snap());
        }
      },

      _snap: () => {
        const s = get();
        return {
          username:  s.user?.username || '',
          email:     s.user?.email    || '',
          phone:     s.user?.phone    || '',
          xp:        s.xp,
          streak:    s.streak,
          lastLogin: s.lastLogin,
          progress:  s.progress,
          courseProgress: s.courseProgress,
          testHistory: s.testHistory,
          badges:    s.badges,
          darkMode:  s.darkMode,
        };
      },

      // ── Firestore real-time sync ─────────────────────────────────────────────────
      _startSync: (uid) => {
        const { _firestoreUnsub } = get();
        if (_firestoreUnsub) _firestoreUnsub();
        const unsub = subscribeFirestore(uid, (remote) => {
          set((local) => ({
            xp:       Math.max(local.xp, remote.xp || 0),
            streak:   Math.max(local.streak, remote.streak || 0),
            progress: mergeProgress(local.progress, remote.progress || {}),
            courseProgress: remote.courseProgress || local.courseProgress || {},
            testHistory: remote.testHistory || local.testHistory || [],
            darkMode: remote.darkMode ?? local.darkMode,
          }));
        });
        set({ _firestoreUnsub: unsub });
      },

      initAuth: () => {
        return listenAuthState(async (fbUser) => {
          if (fbUser) {
            const isAdmin = ADMIN_UIDS.includes(fbUser.uid);
            const remote  = await fetchFromFirestore(fbUser.uid);
            const today   = new Date().toDateString();
            const { progress, courseProgress, testHistory, xp, streak, lastLogin, darkMode } = get();

            const mergedProgress = mergeProgress(progress, remote?.progress || {});
            const mergedCourseProgress = { ...courseProgress, ...(remote?.courseProgress || {}) };
            const mergedTestHistory = remote?.testHistory || testHistory || [];
            const remoteStreak   = remote?.streak    || 0;
            const remoteXP       = remote?.xp        || 0;
            const prevLoginStr   = remote?.lastLogin || lastLogin;
            
            let newStreak = remoteStreak || streak;

            if (prevLoginStr && prevLoginStr !== today) {
              const prevDate = new Date(prevLoginStr);
              const currDate = new Date(today);
              const diffTime = Math.abs(currDate - prevDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              if (diffDays === 1) {
                // Consecutive day
                newStreak += 1;
              } else if (diffDays > 1) {
                // Streak broken
                newStreak = 1;
              }
            } else if (!prevLoginStr) {
              // First time login
              newStreak = 1;
            }
            // If prevLoginStr === today, streak stays the same (already counted for today)

            const user = {
              uid:      fbUser.uid,
              username: fbUser.displayName || remote?.username || fbUser.email?.split('@')[0] || 'Coder',
              email:    fbUser.email       || remote?.email    || '',
              phone:    fbUser.phoneNumber || remote?.phone    || '',
              avatar:   fbUser.photoURL    || null,
              isAdmin,
            };

            set({
              user,
              firebaseUser: fbUser,
              authReady:    true,
              page:         'home',
              progress:     mergedProgress,
              courseProgress: mergedCourseProgress,
              testHistory:  mergedTestHistory,
              xp:           Math.max(remoteXP, xp),
              streak:       newStreak,
              lastLogin:    today,
              darkMode:     remote?.darkMode ?? darkMode,
            });

            pushToFirestore(fbUser.uid, {
              username:  user.username,
              email:     user.email,
              phone:     user.phone,
              xp:        Math.max(remoteXP, xp),
              streak:    newStreak,
              lastLogin: today,
              progress:  mergedProgress,
              courseProgress: mergedCourseProgress,
              testHistory:  mergedTestHistory,
              darkMode:  remote?.darkMode ?? darkMode,
            });

            get()._startSync(fbUser.uid);
          } else {
            const { _firestoreUnsub } = get();
            if (_firestoreUnsub) _firestoreUnsub();
            set({
              user: null, firebaseUser: null, authReady: true,
              page: 'welcome', _firestoreUnsub: null,
            });
          }
        });
      },

      register: async (form) => {
        const { addToast } = get();
        try {
          const fbUser = await firebaseEmailSignup(form.email, form.password, form.username); 
          await pushToFirestore(fbUser.uid, {
            username:  form.username,
            email:     form.email,
            phone:     form.phone || '',
            xp:        0,
            streak:    0,
            lastLogin: new Date().toDateString(),
            progress:  {},
            testHistory: [],
            darkMode:  get().darkMode,
          });
          addToast('🐰 Account created! Welcome!', 'success');
          return true;
        } catch (err) {
          addToast(err.message, 'error');
          return false;
        }
      },

      login: async (identifier, password) => {
        try {
          await firebaseEmailLogin(identifier, password);
          return true;
        } catch (err) {
          get().addToast(err.message, 'error');
          return false;
        }
      },

      loginWithGoogle: async () => {
        try {
          await firebaseGoogleLogin();
          return true;
        } catch (err) {
          get().addToast(err.message, 'error');
          return false;
        }
      },

      logout: async () => {
        const { _firestoreUnsub, addToast } = get();
        if (_firestoreUnsub) _firestoreUnsub();
        await firebaseLogout();
        set({
          user: null, firebaseUser: null, page: 'welcome',
          progress: {}, courseProgress: {}, testHistory: [], xp: 0, streak: 0, activeLang: null,
          currentLevelId: null, _firestoreUnsub: null,
        });
        addToast('👋 See you next time!', 'info');
      },

      startLevel: (langId, levelId) => {
        set({ activeLang: langId, currentLevelId: levelId, page: 'level' });
      },

      // Updated for 300 levels and new progress structure
      completeLevel: (langId, levelId, score, earnedXP, timeTaken) => {
        const { progress, xp, user, addToast } = get();
        const lp = progress[langId] || { currentLevel: 1 };
        const levelData = lp[levelId] || {};
        
        const isCompleted = score >= 50;
        const newScore = Math.max(levelData.score || 0, score);
        const newXP = Math.max(levelData.xp || 0, earnedXP);
        const newAttempts = (levelData.attempts || 0) + 1;
        const newBestTime = levelData.bestTime ? Math.min(levelData.bestTime, timeTaken) : timeTaken;

        const updatedLevel = {
          score: newScore,
          xp: newXP,
          completed: levelData.completed || isCompleted,
          attempts: newAttempts,
          bestTime: newBestTime,
          lastAttemptAt: new Date().toISOString(),
          completedAt: (levelData.completed || !isCompleted) ? levelData.completedAt : new Date().toISOString(),
        };

        const nextLevel = (isCompleted && levelId === lp.currentLevel) 
          ? Math.min(levelId + 1, 300) 
          : lp.currentLevel;

        const newLangProgress = {
          ...lp,
          [levelId]: updatedLevel,
          currentLevel: nextLevel,
          lastPlayedAt: new Date().toISOString(),
        };

        // Recalculate totals
        newLangProgress.totalXP = calculateTotalXP(langId, newLangProgress);
        newLangProgress.levelsCompleted = calculateCompletedLevels(langId, newLangProgress);

        const newProgress = { ...progress, [langId]: newLangProgress };
        const totalXPGain = isCompleted && !levelData.completed ? earnedXP : (newXP - (levelData.xp || 0));

        const today = new Date().toDateString();
        let updatedStreak = get().streak;
        let updatedLastLogin = get().lastLogin;

        if (isCompleted && updatedLastLogin !== today) {
          updatedStreak += 1;
          updatedLastLogin = today;
        }

        set({ 
          progress: newProgress, 
          xp: xp + Math.max(0, totalXPGain),
          streak: updatedStreak,
          lastLogin: updatedLastLogin
        });

        if (user?.uid) {
          updateToFirestore(user.uid, langId, newLangProgress);
          pushToFirestore(user.uid, get()._snap());
        }
      },

      updateProgress: (langId, langData) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [langId]: langData,
          },
        }));
      },

      getUserStats: (langId) => {
        const langProgress = get().progress[langId] || {};
        return {
          currentLevel: langProgress.currentLevel || 1,
          totalXP: langProgress.totalXP || 0,
          levelsCompleted: langProgress.levelsCompleted || 0,
          totalAttempts: calculateTotalAttempts(langId, langProgress),
          progressPercent: Math.round(((langProgress.currentLevel || 1) / 300) * 100),
          averageScore: calculateAverageScore(langProgress),
          totalPlayTime: calculatePlayTime(langProgress),
        };
      },

      continueLearning: (langId) => {
        const lp = get().progress[langId] || { currentLevel: 1 };
        get().startLevel(langId, lp.currentLevel);
      },

      goToMap: (langId) => set({ activeLang: langId, page: 'map' }),

      reviewTest: (testData) => {
        set({ page: 'test' });
        // We'll need a way to pass this data to TestPage. 
        // Let's use a temporary state in the store.
        set({ pendingReview: testData });
      },
    }),
    {
      name: 'bytebunny-store',
      version: 3,
      migrate: (persistedState, version) => {
        if (version < 3) {
          return { ...persistedState, testHistory: [] };
        }
        return persistedState;
      },
    }
  )
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function calculateTotalXP(langId, progress) {
  let total = 0;
  for (let i = 1; i <= 300; i++) {
    if (progress[i]?.xp) total += progress[i].xp;
  }
  return total;
}

function calculateCompletedLevels(langId, progress) {
  let count = 0;
  for (let i = 1; i <= 300; i++) {
    if (progress[i]?.completed) count++;
  }
  return count;
}

function calculateTotalAttempts(langId, progress) {
  let total = 0;
  for (let i = 1; i <= 300; i++) {
    if (progress[i]?.attempts) total += progress[i].attempts;
  }
  return total;
}

function calculateAverageScore(langProgress) {
  let totalScore = 0, count = 0;
  for (let i = 1; i <= 300; i++) {
    if (langProgress[i]?.score) {
      totalScore += langProgress[i].score;
      count++;
    }
  }
  return count > 0 ? Math.round(totalScore / count) : 0;
}

function calculatePlayTime(langProgress) {
  let totalSeconds = 0;
  for (let i = 1; i <= 300; i++) {
    if (langProgress[i]?.bestTime) totalSeconds += langProgress[i].bestTime;
  }
  return Math.round(totalSeconds / 60);
}

async function updateToFirestore(uid, langId, langData) {
  try {
    await updateDoc(doc(db, 'users', uid), {
      [`progress.${langId}`]: langData,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to sync to Firestore:', error);
  }
}

function mergeProgress(local, remote) {
  const merged = { ...remote };
  for (let i = 1; i <= 300; i++) {
    const l = local[i], r = remote[i];
    if (l && r) {
      merged[i] = {
        ...r,
        score: Math.max(l.score || 0, r.score || 0),
        xp: Math.max(l.xp || 0, r.xp || 0),
        attempts: Math.max(l.attempts || 0, r.attempts || 0),
        bestTime: Math.min(l.bestTime || Infinity, r.bestTime || Infinity),
      };
    } else if (l) {
      merged[i] = l;
    }
  }
  return merged;
}

export function subscribeToProgress(userId, langId) {
  return onSnapshot(doc(db, 'users', userId), (doc) => {
    const data = doc.data();
    if (data?.progress?.[langId]) {
      const appStore = useAppStore.getState();
      const merged = mergeProgress(appStore.progress[langId] || {}, data.progress[langId]);
      appStore.updateProgress(langId, merged);
    }
  });
}

export default useAppStore;
