# 🐰 ByteBunny

> Learn coding languages the fun way — built with **Tauri 2 + Rust + React**

![ByteBunny](public/bunny.svg)

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
- **Persistent storage** via Tauri Plugin Store (native JSON on disk)
- **Monospace throughout** — JetBrains Mono font

---

## 🛠️ Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Rust | ≥ 1.77  | https://rustup.rs |
| Node | ≥ 18    | https://nodejs.org |
| npm  | ≥ 9     | bundled with Node |
| Tauri CLI | 2.x | `npm install -g @tauri-apps/cli` |

### Linux extra deps
```bash
sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
```

### macOS extra deps
```bash
xcode-select --install
```

### Windows
Install [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) with the "C++ build tools" workload.

---

## 🚀 Quick Start

```bash
# 1. Clone / unzip the project
cd bytebunny

# 2. Install JS dependencies
npm install

# 3. Run in development mode (hot reload)
npm run tauri dev

# 4. Build production app
npm run tauri build
```

The built installers will be in `src-tauri/target/release/bundle/`.

---

## 📁 Project Structure

```
bytebunny/
├── src/                        # React frontend
│   ├── main.jsx                # Entry point
│   ├── App.jsx                 # Page router
│   ├── styles/
│   │   └── globals.css         # All CSS (dark/light themes, animations)
│   ├── stores/
│   │   └── appStore.js         # Zustand state + Tauri Store persistence
│   ├── data/
│   │   └── levels.js           # 50 questions per language + level generator
│   ├── components/
│   │   └── UI.jsx              # Shared components (Bunny, Toast, Nav, etc.)
│   └── pages/
│       ├── WelcomePage.jsx     # Landing screen
│       ├── AuthPages.jsx       # Login + Signup
│       ├── HomePage.jsx        # Language selection + continue button
│       ├── MapPage.jsx         # Zigzag level map
│       ├── LevelPage.jsx       # Quiz / answer screen
│       └── ProfilePage.jsx     # Stats, badges, streak calendar
├── src-tauri/                  # Rust backend
│   ├── src/
│   │   ├── main.rs             # Entry point
│   │   └── lib.rs              # Tauri commands (validate_password, scoring, etc.)
│   ├── Cargo.toml              # Rust dependencies
│   ├── tauri.conf.json         # App config (window size, bundle, etc.)
│   ├── build.rs                # Build script
│   └── capabilities/
│       └── default.json        # Permission scopes
├── public/
│   └── bunny.svg               # App icon
├── index.html                  # HTML shell
├── vite.config.js              # Vite bundler config
└── package.json                # Node dependencies
```

---

## 🦀 Rust Commands Available

| Command | Description |
|---------|-------------|
| `validate_password(password)` | Returns strength score 0-4 |
| `calculate_level_score(hearts, max, attempts)` | Returns % score |
| `get_xp_for_level(level_id, score, base_xp)` | Returns XP earned |
| `get_app_version()` | Returns app version string |

Call from React via:
```js
import { invoke } from '@tauri-apps/api/core';
const strength = await invoke('validate_password', { password: 'MyPass1!' });
```

---

## 🎨 Tech Stack

| Layer | Tech |
|-------|------|
| Desktop shell | Tauri 2 (Rust) |
| Memory safety | Rust ownership + borrow checker |
| Persistence | `tauri-plugin-store` (native JSON) |
| Frontend | React 18 + Vite |
| State management | Zustand (with persist middleware) |
| Animations | CSS keyframes + transitions |
| Font | JetBrains Mono |
| Icons | Emoji (no external deps) |

---

## 🗺️ Level System

- **Levels 1–50** per language
- **Every 5th level** = 📖 Recap (True/False questions)
- **Hearts**: 3 lives per attempt; losing all = score capped at 10%
- **Retry**: Wrong answer → 2s correction → let user retry (score -= 28% per miss)
- **Score improvement**: Retrying a failed level and completing it raises your saved score
- **XP**: Earned = `floor(levelBaseXP × score% / 100)`

---

## ⚙️ Customization

### Window size
Edit `src-tauri/tauri.conf.json`:
```json
"width": 420,
"height": 820
```

### Add a new language
1. Add entry to `LANGUAGES` array in `src/data/levels.js`
2. Add 10 questions to `QUESTIONS[langId]`
3. Add 10 recap questions to `RECAPS[langId]`

### Colors
All colors are CSS variables in `src/styles/globals.css` under `:root` (dark) and `[data-theme="light"]`.

---

## 📄 License

MIT — free to use, modify, and ship 🐰
