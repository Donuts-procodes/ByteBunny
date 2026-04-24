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
  signInWithCredential,
  sendPasswordResetEmail,
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
// Using import.meta.env for Vite-based environment variables
const firebaseConfig = {
  apiKey:             import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:         import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:          import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:      import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:              import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:      import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);

// Keep user signed in across app restarts
setPersistence(auth, browserLocalPersistence).catch(() => {});

// ── Helpers ───────────────────────────────────────────────────────────────────

export const userDoc = (uid) => doc(db, 'users', uid);

export function mergeProgress(local = {}, remote = {}) {
  const merged = { ...remote };
  
  // Iterate through all languages in local and remote
  const langs = new Set([...Object.keys(local), ...Object.keys(remote)]);
  
  for (const langId of langs) {
    const l = local[langId] || {};
    const r = remote[langId] || {};
    
    const mergedLang = {
      ...r,
      ...l,
      currentLevel: Math.max(l.currentLevel || 1, r.currentLevel || 1),
      totalXP: Math.max(l.totalXP || 0, r.totalXP || 0),
      levelsCompleted: Math.max(l.levelsCompleted || 0, r.levelsCompleted || 0),
    };

    // Merge individual levels (keys 1-300)
    for (let i = 1; i <= 300; i++) {
      const lvlL = l[i];
      const lvlR = r[i];
      
      if (lvlL && lvlR) {
        mergedLang[i] = {
          ...lvlR,
          ...lvlL,
          score: Math.max(lvlL.score || 0, lvlR.score || 0),
          xp: Math.max(lvlL.xp || 0, lvlR.xp || 0),
          attempts: Math.max(lvlL.attempts || 0, lvlR.attempts || 0),
          bestTime: lvlL.bestTime && lvlR.bestTime 
            ? Math.min(lvlL.bestTime, lvlR.bestTime) 
            : (lvlL.bestTime || lvlR.bestTime),
          completed: lvlL.completed || lvlR.completed
        };
      } else if (lvlL) {
        mergedLang[i] = lvlL;
      } else if (lvlR) {
        mergedLang[i] = lvlR;
      }
    }
    merged[langId] = mergedLang;
  }
  return merged;
}

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
      courseProgress: snapshot.courseProgress || {},
      testHistory: snapshot.testHistory || [],
      darkMode:  snapshot.darkMode,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (e) {
    console.warn('[ByteBunny] Firestore push failed:', e.message);
  }
}

export async function fetchFromFirestore(uid) {
  try {
    const snap = await getDoc(userDoc(uid));
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.warn('[ByteBunny] Firestore fetch failed:', e.message);
    return null;
  }
}

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

export async function firebaseResetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

export function listenAuthState(onChange) {
  return onAuthStateChanged(auth, onChange);
}