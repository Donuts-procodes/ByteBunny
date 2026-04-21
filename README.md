# 🐰 ByteBunny v3.0.0

> Learn coding languages the fun way — built with **Tauri 2 + Rust + React + Firebase**
> Now featuring **Advanced AI Integration** for a personalized learning experience!

---

## 🚀 What's New in v3.0.0

- **✨ AI Teaching Modules**: Courses are no longer just problem statements. They are now full teaching modules with AI-generated theory, educational content, and bunny-themed encouragement.
- **🔍 AI-Driven Validation**: Your code is now reviewed by the ByteBunny AI in real-time. Get detailed feedback on your logic directly in the terminal!
- **🧪 Advanced AI Test Lab**: Generate custom tests for any language.
  - **Resizable IDE**: Fully adjustable panes for Problem Description, Code Editor, and Terminal.
  - **Flexible Layout**: Custom resizer handles to tailor your workspace.
- **💡 AI Daily Tip Generator**: Get fresh coding tips and fun facts daily on your dashboard, powered by Llama 3.3.
- **🔐 Enhanced Auth System**: 
  - **Forgot Password**: New flow to reset access via email magic links.
  - **Android Optimization**: Improved stability for mobile auth and explicit guidance for Google Sign-In issues.
- **📊 Detailed Progress Tracking**: Restored "Language Mastery" and "Academy Progress" visualizations on the profile page.

---

## ✨ Core Features

- **6 Coding Languages**: Python, JavaScript, Rust, SQL, Bash, Go
- **50 Levels per language** with progressive difficulty
- **3-heart system** — wrong answers cost hearts; retry improves your score
- **Daily streak tracking** with visual weekly calendar
- **XP system** — earn points based on accuracy
- **Dark & Light mode** toggle in Settings
- **🔥 Firebase Auth**: Email/password + Google Sign-In, persisted across app restarts
- **☁️ Cloud sync**: Firestore real-time — progress syncs across devices instantly
- **Monospace throughout**: JetBrains Mono font

---

## 🛠️ Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Rust | ≥ 1.77  | https://rustup.rs |
| Node | ≥ 18    | https://nodejs.org |
| npm  | ≥ 9     | bundled with Node |
| Tauri CLI | 2.x | `npm install -g @tauri-apps/cli` |

**Android Development:** Requires Android Studio + NDK for mobile builds.

---

## 🚀 Quick Start

```bash
# 1. Clone the project
# 2. Install JS dependencies
npm install

# 3. Create .env file
# Add: VITE_OPENROUTER_API_KEY=your_key_here

# 4. Run in development mode (hot reload)
npm run tauri dev

# 5. Build production app (Desktop)
npm run tauri build
```

---

## 📱 Android Authentication Note
If you encounter "Access Denied" using Google Auth on Android, please refer to:
[**README-ANDROID-AUTH.md**](./README-ANDROID-AUTH.md) for detailed SHA-1 registration steps.

---

## 🎨 Tech Stack

- **Desktop Shell**: Tauri 2 (Rust)
- **Frontend**: React 18 + Vite
- **AI Engine**: Llama 3.3 (via OpenRouter)
- **Backend**: Firebase (Auth + Firestore)
- **State**: Zustand (with persistence)
- **Styling**: Vanilla CSS (Variables for themes)

---

## 📄 License

MIT — free to use, modify, and ship 🐰
