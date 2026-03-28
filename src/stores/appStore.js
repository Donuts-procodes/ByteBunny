import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Tauri store adapter — falls back to localStorage when running in browser
const tauriStorage = {
  getItem: async (name) => {
    try {
      const { Store } = await import('@tauri-apps/plugin-store');
      const store = await Store.load('bytebunny.json');
      const val = await store.get(name);
      return val ? JSON.stringify(val) : null;
    } catch {
      return localStorage.getItem(name);
    }
  },
  setItem: async (name, value) => {
    try {
      const { Store } = await import('@tauri-apps/plugin-store');
      const store = await Store.load('bytebunny.json');
      await store.set(name, JSON.parse(value));
      await store.save();
    } catch {
      localStorage.setItem(name, value);
    }
  },
  removeItem: async (name) => {
    try {
      const { Store } = await import('@tauri-apps/plugin-store');
      const store = await Store.load('bytebunny.json');
      await store.delete(name);
      await store.save();
    } catch {
      localStorage.removeItem(name);
    }
  },
};

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      registeredUsers: [],

      // Progress: { langId: { currentLevel, completedLevels: { id: pct } } }
      progress: {},

      // Stats
      xp: 0,
      streak: 0,
      lastLogin: '',
      darkMode: true,

      // UI
      page: 'welcome',
      activeLang: null,
      currentLevelId: null,
      toasts: [],

      // ── Actions ──────────────────────────────────────────────

      setPage: (page) => set({ page }),
      setActiveLang: (lang) => set({ activeLang: lang }),
      setCurrentLevelId: (id) => set({ currentLevelId: id }),
      toggleDark: () => set((s) => ({ darkMode: !s.darkMode })),

      addToast: (msg, type = 'info', dur = 2800) => {
        const id = Date.now() + Math.random();
        set((s) => ({ toasts: [...s.toasts, { id, msg, type }] }));
        setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), dur);
      },

      register: (form) => {
        const { registeredUsers, addToast } = get();
        if (!form.username?.trim()) { addToast('Username required', 'error'); return false; }
        if (!form.email?.trim() && !form.phone?.trim()) { addToast('Email or phone required', 'error'); return false; }
        if (!form.password) { addToast('Password required', 'error'); return false; }
        if (registeredUsers.find((u) => u.email === form.email || u.username === form.username)) {
          addToast('Email or username already taken', 'error'); return false;
        }
        const user = { ...form, id: Date.now(), joinDate: new Date().toISOString() };
        set((s) => ({ registeredUsers: [...s.registeredUsers, user] }));
        get()._loginUser(user);
        return true;
      },

      login: (identifier, password) => {
        const { registeredUsers, addToast } = get();
        const found = registeredUsers.find(
          (u) => (u.email === identifier || u.phone === identifier || u.username === identifier) && u.password === password,
        );
        if (!found) { addToast('❌ Invalid credentials', 'error'); return false; }
        get()._loginUser(found);
        return true;
      },

      _loginUser: (user) => {
        const today = new Date().toDateString();
        const { lastLogin, streak } = get();
        let newStreak = streak;
        if (lastLogin !== today) { newStreak = streak + 1; }
        set({ user, page: 'home', lastLogin: today, streak: newStreak });
        get().addToast('🐰 Welcome to ByteBunny!', 'success');
      },

      logout: () => {
        set({ user: null, page: 'welcome', progress: {}, xp: 0, streak: 0, activeLang: null });
        get().addToast('👋 See you next time!', 'info');
      },

      startLevel: (langId, levelId) => {
        set({ activeLang: langId, currentLevelId: levelId, page: 'level' });
      },

      completeLevel: (langId, levelId, pct) => {
        const { progress, xp, addToast } = get();
        const lp = progress[langId] || { currentLevel: 1, completedLevels: {} };
        const prevPct = lp.completedLevels[levelId] || 0;
        const newPct = Math.max(prevPct, pct);
        const nextLevel = pct > 50 ? Math.max(lp.currentLevel, levelId + 1) : lp.currentLevel;
        const newProgress = {
          ...progress,
          [langId]: {
            currentLevel: Math.min(nextLevel, 50),
            completedLevels: { ...lp.completedLevels, [levelId]: newPct },
          },
        };
        const earned = Math.floor(20 * pct / 100);
        set({ progress: newProgress, xp: xp + earned, page: 'map' });
        addToast(`+${earned} XP earned! ⚡`, 'success');
      },

      continueLearning: (langId) => {
        const { progress } = get();
        const lp = progress[langId] || { currentLevel: 1 };
        get().startLevel(langId, lp.currentLevel);
      },

      goToMap: (langId) => set({ activeLang: langId, page: 'map' }),
    }),
    {
      name: 'bytebunny-state',
      storage: createJSONStorage(() => tauriStorage),
      partialize: (s) => ({
        user: s.user,
        registeredUsers: s.registeredUsers,
        progress: s.progress,
        xp: s.xp,
        streak: s.streak,
        lastLogin: s.lastLogin,
        darkMode: s.darkMode,
      }),
    },
  ),
);
