import React, { useMemo } from "react";
import { useAppStore } from "../stores/enhanced-appStore";

// ── Bunny Mascot ──────────────────────────────────────────────────────────────
export function Bunny({
  size = 80,
  mood = "happy",
  animate = true,
  style = {},
}) {
  const emoji = mood === "excited" ? "🐇" : mood === "sad" ? "🐰" : "🐰";
  const cls = animate
    ? mood === "excited"
      ? "animate-bounce"
      : "animate-float"
    : "";
  return (
    <div
      className={cls}
      style={{
        fontSize: size,
        lineHeight: 1,
        display: "inline-block",
        ...style,
      }}
    >
      {emoji}
    </div>
  );
}

// ── Toast Container ───────────────────────────────────────────────────────────
export function ToastContainer() {
  const toasts = useAppStore((s) => s.toasts);
  const removeToast = useAppStore((s) => s.removeToast);
  
  const getEmoji = (type, msg) => {
    // If message already starts with an emoji, don't prepend one
    if (/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u.test(msg)) return '';
    return type === 'success' ? '🎯 ' : type === 'error' ? '❌ ' : 'ℹ️ ';
  };

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ flex: 1 }}>
            {getEmoji(t.type, t.msg)}{t.msg}
          </div>
          <button 
            onClick={() => removeToast(t.id)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'inherit', 
              cursor: 'pointer', 
              fontSize: 14, 
              opacity: 0.7,
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '4px'
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Scanline ──────────────────────────────────────────────────────────────────
export function Scanline() {
  return <div className="scanline" />;
}

// ── Confetti ──────────────────────────────────────────────────────────────────
export function Confetti() {
  const colors = useMemo(() => [
    "#00ff88",
    "#58a6ff",
    "#bc8cff",
    "#ff7eb6",
    "#e3b341",
    "#f78166",
  ], []);

  const particles = useMemo(() => Array.from({ length: 45 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: `${Math.random() * 1.5}s`,
    duration: `${Math.random() * 1.5 + 2.5}s`,
    size: `${Math.random() * 10 + 6}px`,
    shape: Math.random() > 0.5 ? "50%" : "2px",
  })), [colors]);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-p"
          style={{
            left: p.left,
            background: p.color,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            borderRadius: p.shape,
          }}
        />
      ))}
    </>
  );
}

// ── Bottom Nav ────────────────────────────────────────────────────────────────
export function BottomNav() {
  const page = useAppStore((s) => s.page);
  const setPage = useAppStore((s) => s.setPage);
  const items = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "course-menu", icon: "📚", label: "Course" },
    { id: "test", icon: "📝", label: "Test" },
    { id: "profile", icon: "🐰", label: "Profile" },
  ];
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${page === item.id ? "active" : ""}`}
          onClick={() => setPage(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
export function ProgressBar({ value = 0, style = {} }) {
  return (
    <div className="progress-bar" style={style}>
      <div
        className="progress-fill"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}

// ── Toggle Switch ─────────────────────────────────────────────────────────────
export function Toggle({ on, onToggle }) {
  return (
    <div className={`toggle ${on ? "on" : ""}`} onClick={onToggle}>
      <div className="toggle-dot" />
    </div>
  );
}

// ── Settings Modal ────────────────────────────────────────────────────────────
export function SettingsModal({ onClose }) {
  const darkMode = useAppStore((s) => s.darkMode);
  const toggleDark = useAppStore((s) => s.toggleDark);
  const konamiUnlocked = useAppStore((s) => s.konamiUnlocked);
  const isCarrotTheme = useAppStore((s) => s.isCarrotTheme);
  const userAIKey = useAppStore((s) => s.userAIKey);
  const setUserAIKey = useAppStore((s) => s.setUserAIKey);

  const triggerKonamiToggle = () => {
    useAppStore.setState(s => ({ isCarrotTheme: !s.isCarrotTheme }));
  };

  const logout = useAppStore((s) => s.logout);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal scroll-area" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span style={{ fontWeight: 800, fontSize: 18 }}>// SETTINGS</span>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* AI Key Section */}
          <div
            style={{
              padding: "14px 16px",
              background: "var(--bg3)",
              borderRadius: 12,
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🔑 OpenRouter API Key</div>
            <input 
              type="password"
              placeholder="sk-or-v1-..."
              value={userAIKey || ''}
              onChange={(e) => setUserAIKey(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-deep)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '8px 12px',
                color: 'var(--accent)',
                fontFamily: 'var(--font)',
                fontSize: 11,
                outline: 'none'
              }}
            />
            <div style={{ fontSize: 9, color: "var(--text-low)", marginTop: 6, lineHeight: 1.4 }}>
              Required for AI features. Your key is kept in memory only and never shared.
            </div>
          </div>

          {/* Golden Carrot Toggle (Easter Egg) */}
          {konamiUnlocked && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 16px",
                background: "linear-gradient(135deg, rgba(255, 119, 0, 0.15) 0%, rgba(255, 165, 0, 0.05) 100%)",
                borderRadius: 12,
                border: "1px solid var(--carrot-primary)",
              }}
            >
              <div>
                <div style={{ fontWeight: 800, color: "var(--carrot-primary)", display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>🥕</span> Golden Carrot
                </div>
                <div style={{ fontSize: 10, color: "var(--text2)", marginTop: 2 }}>
                  24-Carat Orange Theme
                </div>
              </div>
              <Toggle on={isCarrotTheme} onToggle={triggerKonamiToggle} />
            </div>
          )}

          {/* Dark mode */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 16px",
              background: "var(--bg3)",
              borderRadius: 12,
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>Dark Mode</div>
              <div
                style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}
              >
                Terminal vibes 🖥️
              </div>
            </div>
            <Toggle on={darkMode} onToggle={toggleDark} />
          </div>

          {/* Font info */}
          <div
            style={{
              padding: "14px 16px",
              background: "var(--bg3)",
              borderRadius: 12,
            }}
          >
            <div style={{ fontWeight: 700 }}>Font</div>
            <div style={{ fontSize: 12, color: "var(--accent)", marginTop: 4 }}>
              JetBrains Mono — monospace forever
            </div>
          </div>

          {/* Mascot */}
          <div
            style={{
              padding: "14px 16px",
              background: "var(--bg3)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Bunny size={36} animate={false} />
            <div>
              <div style={{ fontWeight: 700 }}>Mascot</div>
              <div
                style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}
              >
                ByteBunny — always watching 👀
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 4px' }}>
            <button onClick={() => { onClose(); useAppStore.getState().setPage('terms'); }} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', fontSize: 11, color: 'var(--text-low)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>📜</span> Terms & Conditions
            </button>
            <button onClick={() => { onClose(); useAppStore.getState().setPage('privacy'); }} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', fontSize: 11, color: 'var(--text-low)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🛡️</span> Privacy Policy
            </button>
          </div>

          <button
            className="btn btn-danger btn-full"
            onClick={() => {
              onClose();
              logout();
            }}
            style={{ marginTop: 4 }}
          >
            🚪 Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
