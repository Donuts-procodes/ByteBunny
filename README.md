# 🐰 ByteBunny v0.2

> Learn coding languages the fun way — Tauri 2 + Rust + React + Firebase

---

## ✨ What's new in v0.2

| Feature | Details |
|---|---|
| 🔥 Firebase Auth | Email/password + Google Sign-In, persisted across app restarts |
| ☁️ Cloud sync | Firestore real-time — progress syncs across devices instantly |
| 🔑 Admin panel | Push new levels live without redeploying |
| 🐰 Loading screen | Animated bunny with cycling coding tips |
| 🎮 Gammy auth | Hopping bunny animation on login/signup buttons |
| 📡 Scanline fix | Only shows on menu/auth pages, never during gameplay |

---

## 🚀 Quick Start

```bash
npm install
npm run tauri dev       # dev mode with hot reload
npm run tauri build     # production build
```

**Prerequisites:** Rust ≥ 1.77, Node ≥ 18
**Linux:** `sudo apt install libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev`

---

## 🔥 Firebase Setup

Your Firebase credentials are already wired in `src/lib/firebase.js`.
You just need to enable the services:

### 1 — Enable Auth methods
Firebase Console → **byte-bunny** → **Authentication** → **Sign-in method**
- Enable **Email/Password**
- Enable **Google** (set a support email)

### 2 — Create Firestore
Firebase Console → **Firestore Database** → **Create database** → Production mode → pick region

### 3 — Deploy security rules
Firebase Console → Firestore → **Rules** tab → paste from `firestore.rules` → Publish

### 4 — Make yourself Admin
1. Sign up in the app (creates your Firebase user)
2. Firebase Console → **Authentication** → **Users** → copy your UID
3. Add it to `src/stores/appStore.js`:
```js
const ADMIN_UIDS = ['paste-your-uid-here'];
```
4. Add same UID in `firestore.rules` write rule
5. Restart app — **🔑 Admin Panel** appears in Profile

### 5 — Authorize Google OAuth domain
Firebase Console → Authentication → **Settings** → **Authorized domains** → add `localhost` + your prod domain

---

## 🔑 Admin Panel

**Profile → 🔑 Admin Panel** (admin users only)

### Push levels (JSON format)
```json
[
  {
    "id": 51,
    "recap": false,
    "title": "Level 51",
    "q": "What does `git rebase` do?",
    "opts": ["Merges branches", "Moves commits to new base", "Deletes commits", "Pushes to remote"],
    "ans": 1,
    "xp": 35
  }
]
```
Push → players see new levels immediately, no app update needed.

---

## 🌊 Persistent Auth Flow

```
App opens → Firebase checks IndexedDB session
  ├─ Session found → restore user → go to home ✅
  └─ No session    → show welcome screen

Log out → Firebase clears session → next open shows welcome ✅
```

---

## ☁️ Real-time Sync Flow

```
Complete level → pushToFirestore(/users/{uid})
                         ↓
             onSnapshot fires on all other devices
                         ↓
             mergeProgress() takes best score per level
                         ↓
             UI updates live across devices ✅
```

---

## 📁 Project Structure

```
bytebunny/
├── src/
│   ├── lib/firebase.js          ← Config, auth helpers, Firestore push/subscribe
│   ├── stores/appStore.js       ← Zustand + Firebase (source of truth)
│   ├── data/levels.js           ← Built-in levels + async Firestore override loader
│   ├── components/UI.jsx        ← Bunny, Toast, Nav, Settings, Scanline
│   └── pages/
│       ├── LoadingScreen.jsx    ← Bunny tips screen shown while Firebase init
│       ├── AuthPages.jsx        ← Login/Signup with BunnyLoader animation
│       ├── MapPage.jsx          ← Async levels from Firestore
│       ├── LevelPage.jsx        ← Async levels from Firestore
│       ├── ProfilePage.jsx      ← Admin button for admin users
│       └── AdminPage.jsx        ← Push levels + user lookup + deployment checklist
├── src-tauri/src/lib.rs         ← Rust: validate_password, scoring, xp calc
├── firestore.rules              ← Deploy to Firebase Console
└── package.json                 ← firebase ^10 included
```

---

## 🦀 Rust Commands

| Command | Returns |
|---|---|
| `validate_password(password)` | Strength score 0–4 |
| `calculate_level_score(hearts, max, attempts)` | Score % |
| `get_xp_for_level(level_id, score, base_xp)` | XP earned |
| `get_app_version()` | `"0.2.0"` |

---

## 🎨 Tech Stack

Tauri 2 (Rust) · Firebase 10 (Auth + Firestore) · React 18 · Vite · Zustand · JetBrains Mono

MIT 🐰
