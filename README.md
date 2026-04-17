# 🐰 ByteBunny

> Learn coding languages the fun way — built with **Tauri 2 + Rust + React + Firebase**

---

## ✨ Features

- **6 Coding Languages**: Python, JavaScript, Rust, SQL, Bash, Go
- **50 Levels per language** with progressive difficulty
- **Recap every 5 levels** to reinforce learning
- **3-heart system** — wrong answers cost hearts; retry improves your score
- **Daily streak tracking** with visual weekly calendar
- **XP system** — earn points based on accuracy
- **Email / phone / username auth** with password strength enforcement
- **Dark & Light mode** toggle in Settings
- **Zigzag level map** with SVG bezier path connections
- **ByteBunny mascot** 🐰 reacts to your answers
- **🔥 Firebase Auth**: Email/password + Google Sign-In, persisted across app restarts
- **☁️ Cloud sync**: Firestore real-time — progress syncs across devices instantly
- **🔑 Admin panel**: Push new levels live without redeploying
- **Persistent storage**: `tauri-plugin-store` for native JSON on disk
- **Monospace throughout**: JetBrains Mono font

---

## 🛠️ Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Rust | ≥ 1.77  | https://rustup.rs |
| Node | ≥ 18    | https://nodejs.org |
| npm  | ≥ 9     | bundled with Node |
| Tauri CLI | 2.x | `npm install -g @tauri-apps/cli` |

**Linux Users:** `sudo apt install libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev`

---

## 🚀 Quick Start

```bash
# 1. Clone the project
# 2. Install JS dependencies
npm install

# 3. Run in development mode (hot reload)
npm run tauri dev

# 4. Build production app (Desktop)
npm run tauri build

# 5. Build for Web
npm run build
```

The built desktop installers will be in `src-tauri/target/release/bundle/`.
The web assets will be in `dist/`.

---

## 🔥 Firebase Setup

Your Firebase credentials are configured in `src/lib/firebase.js`.

### 1 — Enable Auth methods
Firebase Console → **Authentication** → **Sign-in method**
- Enable **Email/Password**
- Enable **Google** (set a support email)

### 2 — Create Firestore
Firebase Console → **Firestore Database** → **Create database** → Production mode

### 3 — Deploy security rules
Copy rules from `firestore.rules` to the Firebase Console.

### 4 — Make yourself Admin
1. Sign up in the app.
2. Copy your UID from Firebase Console → **Authentication**.
3. Add it to the `ADMIN_UIDS` array in `src/stores/enhanced-appStore.jsx`.
4. Update `firestore.rules` if necessary.

---

## 📁 Project Structure

```
bytebunny/
├── src/                        # React frontend
│   ├── components/UI.jsx        # Shared components (Bunny, Nav, etc.)
│   ├── data/                   # Course and level data
│   ├── lib/firebase.js          # Firebase configuration & helpers
│   ├── pages/                   # Application pages (Home, Map, Level, etc.)
│   ├── stores/                  # Zustand state management
│   └── styles/                  # Global CSS and themes
├── src-tauri/                  # Rust backend (Desktop)
│   ├── src/
│   │   ├── main.rs             # Entry point
│   │   └── lib.rs              # Tauri commands & setup
│   ├── Cargo.toml              # Rust dependencies
│   └── tauri.conf.json         # App configuration
├── public/                     # Static assets
├── firestore.rules              # Firebase security rules
├── Dockerfile                  # Containerization for web version
└── vite.config.js              # Vite bundler config
```

---

## 🦀 Rust Commands (Desktop Only)

| Command | Description |
|---------|-------------|
| `validate_password(password)` | Returns strength score 0-4 |
| `calculate_level_score(hearts, max, attempts)` | Returns % score |
| `get_xp_for_level(level_id, score, base_xp)` | Returns XP earned |
| `get_app_version()` | Returns app version string |

---

## 🎨 Tech Stack

- **Desktop Shell**: Tauri 2 (Rust)
- **Frontend**: React 18 + Vite
- **Backend**: Firebase (Auth + Firestore)
- **State**: Zustand (with persistence)
- **Styling**: Vanilla CSS (Variables for themes)

---

## 📄 License

MIT — free to use, modify, and ship 🐰
