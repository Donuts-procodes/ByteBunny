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
  const merged = {};
  const langs  = new Set([...Object.keys(local), ...Object.keys(remote)]);
  for (const lang of langs) {
    if (lang === 'testHistory') continue; // Skip non-lang fields if they leak here
    
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
      ...r,
      ...l,
      currentLevel:    Math.max(l.currentLevel || 1, r.currentLevel || 1),
      completedLevels: levels,
    };
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
  if (window.__TAURI_INTERNALS__) {
    const { isMobile } = await import('@tauri-apps/api/core');
    const { open } = await import('@tauri-apps/plugin-shell');
    
    if (await isMobile()) {
      // Direct Google OAuth URL that redirects to the Firebase Auth handler
      // which should then redirect to our deep link bytebunny://auth
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID || ''}&redirect_uri=https://${firebaseConfig.authDomain}/__/auth/handler&response_type=id_token&scope=openid%20email%20profile&nonce=bytebunny`;
      
      try {
        await open(authUrl);
        return null;
      } catch (e) {
        console.error('Failed to open system browser:', e);
        throw e;
      }
    }
  }
  
  const provider = new GoogleAuthProvider();
  const cred     = await signInWithPopup(auth, provider);
  return cred.user;
}

export async function loginWithToken(idToken) {
  const credential = GoogleAuthProvider.credential(idToken);
  const cred = await signInWithCredential(auth, credential);
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