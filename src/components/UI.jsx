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
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.type === 'success' ? '🎯' : t.type === 'error' ? '❌' : 'ℹ️'} {t.msg}
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
    { id: "map", icon: "🗺️", label: "Map" },
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
  const logout = useAppStore((s) => s.logout);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
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
