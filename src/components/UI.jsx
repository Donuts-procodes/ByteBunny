<<<<<<< HEAD
import { useAppStore } from '../stores/appStore';

// ── Bunny Mascot ──────────────────────────────────────────────────────────────
export function Bunny({ size = 80, mood = 'happy', animate = true, style = {} }) {
  const emoji = mood === 'excited' ? '🐇' : mood === 'sad' ? '🐰' : '🐰';
  const cls   = animate ? (mood === 'excited' ? 'animate-bounce' : 'animate-float') : '';
  return (
    <div className={cls} style={{ fontSize: size, lineHeight: 1, display: 'inline-block', ...style }}>
=======
import { useAppStore } from "../stores/appStore";

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
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
      {emoji}
    </div>
  );
}

// ── Toast Container ───────────────────────────────────────────────────────────
export function ToastContainer() {
  const toasts = useAppStore((s) => s.toasts);
  return (
<<<<<<< HEAD
    <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none' }}>
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>{t.msg}</div>
=======
    <div
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.msg}
        </div>
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
      ))}
    </div>
  );
}

<<<<<<< HEAD
// ── Scanline — only shown on menu/auth pages, never during gameplay ───────────
export function Scanline({ show = true }) {
  if (!show) return null;
=======
// ── Scanline ──────────────────────────────────────────────────────────────────
export function Scanline() {
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
  return <div className="scanline" />;
}

// ── Confetti ──────────────────────────────────────────────────────────────────
export function Confetti() {
<<<<<<< HEAD
  const colors = ['#00ff88', '#58a6ff', '#bc8cff', '#ff7eb6', '#e3b341', '#f78166'];
=======
  const colors = [
    "#00ff88",
    "#58a6ff",
    "#bc8cff",
    "#ff7eb6",
    "#e3b341",
    "#f78166",
  ];
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: `${Math.random() * 0.6}s`,
    size: `${Math.random() * 10 + 6}px`,
<<<<<<< HEAD
    shape: Math.random() > 0.5 ? '50%' : '2px',
=======
    shape: Math.random() > 0.5 ? "50%" : "2px",
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
  }));
  return (
    <>
      {particles.map((p) => (
<<<<<<< HEAD
        <div key={p.id} className="confetti-p" style={{ left: p.left, top: '-20px', background: p.color, width: p.size, height: p.size, animationDelay: p.delay, borderRadius: p.shape }} />
=======
        <div
          key={p.id}
          className="confetti-p"
          style={{
            left: p.left,
            top: "-20px",
            background: p.color,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            borderRadius: p.shape,
          }}
        />
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
      ))}
    </>
  );
}

// ── Bottom Nav ────────────────────────────────────────────────────────────────
export function BottomNav() {
  const page = useAppStore((s) => s.page);
  const setPage = useAppStore((s) => s.setPage);
  const items = [
<<<<<<< HEAD
    { id: 'home',    icon: '🏠', label: 'Home'    },
    { id: 'map',     icon: '🗺️', label: 'Map'     },
    { id: 'profile', icon: '🐰', label: 'Profile' },
=======
    { id: "home", icon: "🏠", label: "Home" },
    { id: "map", icon: "🗺️", label: "Map" },
    { id: "profile", icon: "🐰", label: "Profile" },
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
  ];
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
<<<<<<< HEAD
        <div key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => setPage(item.id)}>
=======
        <div
          key={item.id}
          className={`nav-item ${page === item.id ? "active" : ""}`}
          onClick={() => setPage(item.id)}
        >
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
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
<<<<<<< HEAD
      <div className="progress-fill" style={{ width: `${Math.min(value, 100)}%` }} />
=======
      <div
        className="progress-fill"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
    </div>
  );
}

// ── Toggle Switch ─────────────────────────────────────────────────────────────
export function Toggle({ on, onToggle }) {
  return (
<<<<<<< HEAD
    <div className={`toggle ${on ? 'on' : ''}`} onClick={onToggle}>
=======
    <div className={`toggle ${on ? "on" : ""}`} onClick={onToggle}>
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
      <div className="toggle-dot" />
    </div>
  );
}

// ── Settings Modal ────────────────────────────────────────────────────────────
export function SettingsModal({ onClose }) {
<<<<<<< HEAD
  const darkMode   = useAppStore((s) => s.darkMode);
  const toggleDark = useAppStore((s) => s.toggleDark);
  const logout     = useAppStore((s) => s.logout);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontWeight: 800, fontSize: 18 }}>// SETTINGS</span>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Dark mode */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--bg3)', borderRadius: 12 }}>
            <div>
              <div style={{ fontWeight: 700 }}>Dark Mode</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>Terminal vibes 🖥️</div>
=======
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
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
            </div>
            <Toggle on={darkMode} onToggle={toggleDark} />
          </div>

          {/* Font info */}
<<<<<<< HEAD
          <div style={{ padding: '14px 16px', background: 'var(--bg3)', borderRadius: 12 }}>
            <div style={{ fontWeight: 700 }}>Font</div>
            <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 4 }}>JetBrains Mono — monospace forever</div>
          </div>

          {/* Mascot */}
          <div style={{ padding: '14px 16px', background: 'var(--bg3)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Bunny size={36} animate={false} />
            <div>
              <div style={{ fontWeight: 700 }}>Mascot</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>ByteBunny — always watching 👀</div>
            </div>
          </div>

          <button className="btn btn-danger btn-full" onClick={() => { onClose(); logout(); }} style={{ marginTop: 4 }}>
=======
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
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
            🚪 Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
