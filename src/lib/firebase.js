import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

// ── Config ────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            'AIzaSyBvMikLtzxa3SEA5B0eIZ8KjQs9YCMCSv0',
  authDomain:        'byte-bunny.firebaseapp.com',
  projectId:         'byte-bunny',
  storageBucket:     'byte-bunny.firebasestorage.app',
  messagingSenderId: '119764366128',
  appId:             '1:119764366128:web:3fb3cc5f65dbe2ae9e0ef5',
  measurementId:     'G-TEHW7LQ30D',
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);

// Keep user signed in across app restarts (persisted to disk via IndexedDB)
setPersistence(auth, browserLocalPersistence).catch(() => {});

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Build the Firestore user document path */
export const userDoc = (uid) => doc(db, 'users', uid);

/**
 * Merge two progress objects — take the highest score per level and the
 * highest currentLevel so progress never goes backwards across devices.
 */
export function mergeProgress(local = {}, remote = {}) {
  const merged = {};
  const langs  = new Set([...Object.keys(local), ...Object.keys(remote)]);
  for (const lang of langs) {
    const l = local[lang]  || { currentLevel: 1, completedLevels: {} };
    const r = remote[lang] || { currentLevel: 1, completedLevels: {} };
    const levels = {};
    const allIds = new Set([
      ...Object.keys(l.completedLevels || {}),
      ...Object.keys(r.completedLevels || {}),
    ]);
    for (const id of allIds) {
      levels[id] = Math.max(l.completedLevels?.[id] || 0, r.completedLevels?.[id] || 0);
    }
    merged[lang] = {
      currentLevel:    Math.max(l.currentLevel || 1, r.currentLevel || 1),
      completedLevels: levels,
    };
  }
  return merged;
}

/**
 * Push local state snapshot to Firestore (called after every meaningful action).
 * Uses merge:true so we never accidentally wipe fields written by another device.
 */
export async function pushToFirestore(uid, snapshot) {
  try {
    await setDoc(userDoc(uid), {
      username:  snapshot.username,
      email:     snapshot.email,
      phone:     snapshot.phone  || '',
      xp:        snapshot.xp,
      streak:    snapshot.streak,
      lastLogin: snapshot.lastLogin,
      progress:  snapshot.progress,
      darkMode:  snapshot.darkMode,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (e) {
    console.warn('[ByteBunny] Firestore push failed:', e.message);
  }
}

/**
 * Fetch the stored user document once (used on first login to restore cloud data).
 */
export async function fetchFromFirestore(uid) {
  try {
    const snap = await getDoc(userDoc(uid));
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.warn('[ByteBunny] Firestore fetch failed:', e.message);
    return null;
  }
}

/**
 * Subscribe to real-time Firestore updates.
 * Calls `onUpdate(data)` whenever another device writes.
 * Returns the unsubscribe function.
 */
export function subscribeFirestore(uid, onUpdate) {
  return onSnapshot(userDoc(uid), (snap) => {
    if (snap.exists()) onUpdate(snap.data());
  }, (err) => {
    console.warn('[ByteBunny] Firestore listener error:', err.message);
  });
}

// ── Auth operations ───────────────────────────────────────────────────────────

export async function firebaseEmailSignup(email, password, username) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: username });
  return cred.user;
}

export async function firebaseEmailLogin(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function firebaseGoogleLogin() {
  const provider = new GoogleAuthProvider();
  const cred     = await signInWithPopup(auth, provider);
  return cred.user;
}

export async function firebaseLogout() {
  await signOut(auth);
}

/**
 * onAuthStateChanged wrapper — resolves once with the initial auth state,
 * and calls `onChange` on every subsequent change.
 */
export function listenAuthState(onChange) {
  return onAuthStateChanged(auth, onChange);
}
