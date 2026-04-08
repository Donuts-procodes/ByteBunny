import { create } from 'zustand';
import {
  firebaseEmailSignup,
  firebaseEmailLogin,
  firebaseGoogleLogin,
  firebaseLogout,
  listenAuthState,
  pushToFirestore,
  fetchFromFirestore,
  subscribeFirestore,
  mergeProgress,
} from '../lib/firebase';

// ── Admin UIDs ────────────────────────────────────────────────────────────────
// Paste your Firebase UID here (Firebase Console → Authentication → Users).
// Anyone whose UID is in this list gets the Admin panel in Profile.
const ADMIN_UIDS = [
 '60SxAQ8VO9N82wkaqdzCm0vvMhD2',
];

// ── Store ─────────────────────────────────────────────────────────────────────
export const useAppStore = create((set, get) => ({

  // Auth
  user:         null,   // { uid, username, email, phone, avatar, isAdmin }
  authReady:    false,  // true once Firebase first auth check resolves
  firebaseUser: null,

  // Progress
  progress:  {},
  xp:        0,
  streak:    0,
  lastLogin: '',

  // UI
  darkMode:       true,
  page:           'loading',
  activeLang:     null,
  currentLevelId: null,
  toasts:         [],

  // Internal
  _firestoreUnsub: null,

  // ── UI helpers ───────────────────────────────────────────────────────────────

  setPage:       (page) => set({ page }),
  setActiveLang: (lang) => set({ activeLang: lang }),

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

  // Build a plain object safe to push to Firestore
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
        darkMode: remote.darkMode ?? local.darkMode,
      }));
    });
    set({ _firestoreUnsub: unsub });
  },

  // ── Bootstrap (called once in App.jsx on mount) ───────────────────────────────
  // Firebase remembers the session across app restarts via IndexedDB persistence.
  // onAuthStateChanged fires with the user immediately if they were signed in.
  initAuth: () => {
    return listenAuthState(async (fbUser) => {
      if (fbUser) {
        const isAdmin = ADMIN_UIDS.includes(fbUser.uid);
        const remote  = await fetchFromFirestore(fbUser.uid);
        const today   = new Date().toDateString();
        const { progress, xp, streak, lastLogin, darkMode } = get();

        const mergedProgress = mergeProgress(progress, remote?.progress || {});
        const remoteStreak   = remote?.streak    || 0;
        const remoteXP       = remote?.xp        || 0;
        const prevLogin      = remote?.lastLogin || lastLogin;
        const newStreak      = prevLogin !== today
          ? Math.max(remoteStreak, streak) + 1
          : Math.max(remoteStreak, streak);

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
          xp:           Math.max(remoteXP, xp),
          streak:       newStreak,
          lastLogin:    today,
          darkMode:     remote?.darkMode ?? darkMode,
        });

        // Write merged state back
        pushToFirestore(fbUser.uid, {
          username:  user.username,
          email:     user.email,
          phone:     user.phone,
          xp:        Math.max(remoteXP, xp),
          streak:    newStreak,
          lastLogin: today,
          progress:  mergedProgress,
          darkMode:  remote?.darkMode ?? darkMode,
        });

        get()._startSync(fbUser.uid);

      } else {
        // Sign-out or no session
        const { _firestoreUnsub } = get();
        if (_firestoreUnsub) { _firestoreUnsub(); }
        set({
          user: null, firebaseUser: null, authReady: true,
          page: 'welcome', _firestoreUnsub: null,
        });
      }
    });
  },

  // ── Register ─────────────────────────────────────────────────────────────────

  register: async (form) => {
    const { addToast } = get();
    if (!form.username?.trim())                     { addToast('Username required', 'error'); return false; }
    if (!form.email?.trim() && !form.phone?.trim()) { addToast('Email or phone required', 'error'); return false; }
    if (!form.password)                             { addToast('Password required', 'error'); return false; }
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
        darkMode:  get().darkMode,
      });
      addToast('🐰 Account created! Welcome!', 'success');
      return true;
    } catch (err) {
      const msg =
        err.code === 'auth/email-already-in-use' ? 'Email already in use'         :
        err.code === 'auth/weak-password'         ? 'Password too short (min 6)'   :
        err.code === 'auth/invalid-email'         ? 'Invalid email address'        :
        err.message;
      addToast(msg, 'error');
      return false;
    }
  },

  // ── Login ─────────────────────────────────────────────────────────────────────

  login: async (identifier, password) => {
    const { addToast } = get();
    try {
      await firebaseEmailLogin(identifier, password);
      return true;
    } catch (err) {
      const msg =
        err.code === 'auth/user-not-found'  ||
        err.code === 'auth/wrong-password'  ||
        err.code === 'auth/invalid-credential' ? '❌ Invalid email or password' :
        err.code === 'auth/invalid-email'      ? 'Invalid email address'        :
        err.message;
      addToast(msg, 'error');
      return false;
    }
  },

  // ── Google login ──────────────────────────────────────────────────────────────

  loginWithGoogle: async () => {
    const { addToast } = get();
    try {
      await firebaseGoogleLogin();
      return true;
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        addToast('Google login failed: ' + err.message, 'error');
      }
      return false;
    }
  },

  // ── Logout ────────────────────────────────────────────────────────────────────

  logout: async () => {
    const { _firestoreUnsub, addToast } = get();
    if (_firestoreUnsub) _firestoreUnsub();
    await firebaseLogout();
    set({
      user: null, firebaseUser: null, page: 'welcome',
      progress: {}, xp: 0, streak: 0, activeLang: null,
      currentLevelId: null, _firestoreUnsub: null,
    });
    addToast('👋 See you next time!', 'info');
  },

  // ── Level ─────────────────────────────────────────────────────────────────────

  startLevel: (langId, levelId) => {
    set({ activeLang: langId, currentLevelId: levelId, page: 'level' });
  },

  completeLevel: (langId, levelId, pct) => {
    const { progress, xp, user, addToast } = get();
    const lp      = progress[langId] || { currentLevel: 1, completedLevels: {} };
    const prevPct = lp.completedLevels[levelId] || 0;
    const newPct  = Math.max(prevPct, pct);
    const nextLv  = pct > 50 ? Math.max(lp.currentLevel, levelId + 1) : lp.currentLevel;

    const newProgress = {
      ...progress,
      [langId]: {
        currentLevel:    Math.min(nextLv, 50),
        completedLevels: { ...lp.completedLevels, [levelId]: newPct },
      },
    };
    const earned = Math.floor(20 * pct / 100);
    set({ progress: newProgress, xp: xp + earned, page: 'map' });
    addToast(`+${earned} XP! ⚡`, 'success');

    if (user?.uid) {
      pushToFirestore(user.uid, {
        ...get()._snap(),
        progress: newProgress,
        xp:       xp + earned,
      });
    }
  },

  continueLearning: (langId) => {
    const lp = get().progress[langId] || { currentLevel: 1 };
    get().startLevel(langId, lp.currentLevel);
  },

  goToMap: (langId) => set({ activeLang: langId, page: 'map' }),
}));