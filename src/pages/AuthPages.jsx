<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useAppStore } from "../stores/appStore";
import { Bunny } from "../components/UI";
// 👇 Import Firebase Auth utilities directly
import { auth } from "../lib/firebase"; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// ── Gammy bunny loading button content ───────────────────────────────────────
function BunnyLoader({ text }) {
  const [frame, setFrame] = useState(0);
  const frames = ["🐰", "🐇", "🐰", "🐇"];
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % frames.length), 180);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          display: "inline-block",
          transition: "transform 0.1s",
          transform: frame % 2 === 0 ? "translateY(0)" : "translateY(-4px)",
        }}
      >
        {frames[frame]}
      </span>
      {text}
    </span>
  );
}
=======
import { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { Bunny } from '../components/UI';
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b

// ── Password strength ─────────────────────────────────────────────────────────
function pwStrength(pw) {
  let s = 0;
<<<<<<< HEAD
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const STRENGTH_COLORS = ["#ff4444", "#ff8800", "#ffdd00", "#00ff88"];
const STRENGTH_LABELS = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

// ── Shared field styles — fixes input overflow ────────────────────────────────
const fieldWrap = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  minWidth: 0,
  width: "100%",
};

const labelStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: "var(--text2)",
  letterSpacing: 1,
  flexShrink: 0,
};

const inputOverride = {
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
};

// ── Password input ────────────────────────────────────────────────────────────
function PasswordInput({ value, onChange, placeholder = "••••••••" }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", minWidth: 0 }}>
      <input
        className="input"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ ...inputOverride, paddingRight: 44 }}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        style={{
          position: "absolute", right: 12, top: "50%",
          transform: "translateY(-50%)", background: "none", border: "none",
          cursor: "pointer", color: "var(--text2)", fontSize: 16, padding: 0, lineHeight: 1,
        }}
      >
        {show ? "🙈" : "👁️"}
=======
  if (pw.length >= 8)              s++;
  if (/[A-Z]/.test(pw))           s++;
  if (/[0-9]/.test(pw))           s++;
  if (/[^A-Za-z0-9]/.test(pw))   s++;
  return s;
}
const STRENGTH_COLORS  = ['#ff4444', '#ff8800', '#ffdd00', '#00ff88'];
const STRENGTH_LABELS  = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

function PasswordInput({ value, onChange, placeholder = '••••••••' }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <input className="input" type={show ? 'text' : 'password'} placeholder={placeholder} value={value} onChange={onChange} style={{ paddingRight: 44 }} />
      <button type="button" onClick={() => setShow((s) => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', fontSize: 16 }}>
        {show ? '🙈' : '👁️'}
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
      </button>
    </div>
  );
}

<<<<<<< HEAD
// ── Google button ─────────────────────────────────────────────────────────────
function GoogleButton({ onClick, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
        gap: 10, padding: "11px 16px", background: "var(--bg3)", border: "1.5px solid var(--border)",
        borderRadius: 10, cursor: loading ? "not-allowed" : "pointer",
        fontFamily: "var(--font)", fontWeight: 700, fontSize: 13, color: "var(--text)",
        transition: "all 0.2s", opacity: loading ? 0.6 : 1, boxSizing: "border-box",
      }}
      onMouseEnter={(e) => { if (!loading) e.currentTarget.style.borderColor = "#4285F4"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.16C6.51 42.62 14.62 48 24 48z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.16C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.75l7.97-6.16z" />
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.16C12.43 13.72 17.74 9.5 24 9.5z" />
      </svg>
      {loading ? "Connecting…" : "Continue with Google"}
    </button>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "2px 0" }}>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      <span style={{ fontSize: 11, color: "var(--text3)", fontWeight: 700 }}>OR</span>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

// ── Helper: Shared Google Auth Logic ──────────────────────────────────────────
// We abstract this out because Firebase Google Auth handles BOTH signup and login identically.
const handleGooglePopupAuth = async (setLoadingState, addToast, appStoreLoginMethod) => {
  setLoadingState(true);
  try {
    const provider = new GoogleAuthProvider();
    // This triggers the standard in-browser popup
    const result = await signInWithPopup(auth, provider);
    
    // Optional: Pass the Firebase user object or token into your Zustand store
    // appStoreLoginMethod(result.user);
    
    addToast(`Welcome, ${result.user.displayName}!`, "success");
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      // User closed the window manually, no need to show an ugly error
      addToast("Login cancelled.", "info");
    } else {
      console.error(error);
      addToast(error.message || "Google sign-in failed", "error");
    }
  } finally {
    setLoadingState(false);
  }
};

// ── Login Page ────────────────────────────────────────────────────────────────
export function LoginPage({ onBack, onSignup }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const login = useAppStore((s) => s.login);
  const addToast = useAppStore((s) => s.addToast);

  const handleEmailLogin = async () => {
    if (!identifier.trim() || !password) {
      addToast("Fill all fields", "error");
      return;
    }
    setLoading(true);
    const ok = await login(identifier, password);
    if (!ok) setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px", boxSizing: "border-box", overflowY: "auto" }}>
      <div style={{ width: "100%", maxWidth: 380, boxSizing: "border-box" }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom: 20 }}>← Back</button>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Bunny size={68} mood="happy" animate={false} />
          <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 10 }}>Welcome Back!</h1>
          <p style={{ color: "var(--text2)", marginTop: 4, fontSize: 13 }}>Continue your coding journey 🐰</p>
        </div>

        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", boxSizing: "border-box", overflow: "hidden" }}>
          
          {/* 👇 Using the shared popup logic */}
          <GoogleButton 
            onClick={() => handleGooglePopupAuth(setGoogleLoading, addToast, login)} 
            loading={googleLoading} 
          />
          
          <Divider />

          <div style={fieldWrap}>
            <label style={labelStyle}>EMAIL, PHONE OR USERNAME</label>
            <input className="input" placeholder="you@example.com or +91…" value={identifier} onChange={(e) => setIdentifier(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleEmailLogin()} style={inputOverride} />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>PASSWORD</label>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="btn btn-primary btn-full" onClick={handleEmailLogin} disabled={loading} style={{ marginTop: 2 }}>
            {loading ? <BunnyLoader text="Logging in…" /> : "🔐 Login"}
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: 18, color: "var(--text2)", fontSize: 13 }}>
          No account? <button onClick={onSignup} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontFamily: "var(--font)", fontWeight: 700 }}>Sign up →</button>
=======
// ── Login Page ────────────────────────────────────────────────────────────────
export function LoginPage({ onBack, onSignup }) {
  const [identifier, setIdentifier] = useState('');
  const [password,   setPassword]   = useState('');
  const [loading,    setLoading]    = useState(false);
  const login    = useAppStore((s) => s.login);
  const addToast = useAppStore((s) => s.addToast);

  const handleLogin = () => {
    if (!identifier.trim() || !password) { addToast('Fill all fields', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      const ok = login(identifier, password);
      if (!ok) setLoading(false);
    }, 700);
  };

  return (
    <div className="page" style={{ alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom: 20 }}>← Back</button>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Bunny size={72} mood="happy" animate={false} />
          <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 12 }}>Welcome Back!</h1>
          <p style={{ color: 'var(--text2)', marginTop: 4, fontSize: 13 }}>Continue your coding journey 🐰</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', marginBottom: 6, display: 'block', letterSpacing: 1 }}>EMAIL, PHONE OR USERNAME</label>
            <input className="input" placeholder="you@example.com or +91..." value={identifier} onChange={(e) => setIdentifier(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', marginBottom: 6, display: 'block', letterSpacing: 1 }}>PASSWORD</label>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary btn-full" onClick={handleLogin} disabled={loading} style={{ marginTop: 4 }}>
            {loading ? '🔄 Logging in...' : '🔐 Login'}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text2)', fontSize: 13 }}>
          No account?{' '}
          <button onClick={onSignup} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'var(--font)', fontWeight: 700 }}>
            Sign up →
          </button>
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
        </p>
      </div>
    </div>
  );
}

// ── Signup Page ───────────────────────────────────────────────────────────────
export function SignupPage({ onBack, onLogin }) {
<<<<<<< HEAD
  const [form, setForm] = useState({ username: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

=======
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
  const register = useAppStore((s) => s.register);
  const addToast = useAppStore((s) => s.addToast);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const strength = pwStrength(form.password);

<<<<<<< HEAD
  const handleEmailSignup = async () => {
    if (strength < 2) {
      addToast("Password too weak — add uppercase, numbers & symbols", "error");
      return;
    }
    setLoading(true);
    const ok = await register(form);
    if (!ok) setLoading(false);
  };

  const checks = [
    ["8+ characters", form.password.length >= 8],
    ["Uppercase (A-Z)", /[A-Z]/.test(form.password)],
    ["Number (0-9)", /[0-9]/.test(form.password)],
    ["Symbol (!@#…)", /[^A-Za-z0-9]/.test(form.password)],
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 20px 40px", boxSizing: "border-box", overflowY: "auto" }}>
      <div style={{ width: "100%", maxWidth: 380, boxSizing: "border-box" }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom: 20 }}>← Back</button>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Bunny size={68} mood="excited" animate={false} />
          <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 10 }}>Join ByteBunny!</h1>
          <p style={{ color: "var(--text2)", marginTop: 4, fontSize: 13 }}>Start your coding adventure 🚀</p>
        </div>

        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", boxSizing: "border-box", overflow: "hidden" }}>
          
          {/* 👇 Using the shared popup logic */}
          <GoogleButton 
            onClick={() => handleGooglePopupAuth(setGoogleLoading, addToast, register)} 
            loading={googleLoading} 
          />

          <Divider />

          <div style={fieldWrap}>
            <label style={labelStyle}>USERNAME *</label>
            <input className="input" placeholder="cool_coder_42" value={form.username} onChange={set("username")} style={inputOverride} />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>EMAIL</label>
            <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} style={inputOverride} />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>PHONE NUMBER</label>
            <input className="input" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} style={inputOverride} />
          </div>

          <p style={{ fontSize: 11, color: "var(--text3)", marginTop: -6 }}>* Email or phone required</p>

          <div style={fieldWrap}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={labelStyle}>PASSWORD *</label>
              {form.password && <span style={{ fontSize: 11, fontWeight: 700, color: STRENGTH_COLORS[strength - 1] || "#ff4444" }}>{STRENGTH_LABELS[strength]}</span>}
            </div>
            <PasswordInput value={form.password} onChange={set("password")} placeholder="Min 8 chars, A-Z, 0-9, symbol" />
            {form.password && (
              <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                {[0, 1, 2, 3].map((i) => <div key={i} className="pw-bar" style={{ background: i < strength ? STRENGTH_COLORS[strength - 1] : "var(--border)" }} />)}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 8, fontSize: 11 }}>
              {checks.map(([label, met]) => <span key={label} style={{ color: met ? "var(--green)" : "var(--text3)" }}>{met ? "✅" : "⬜"} {label}</span>)}
            </div>
          </div>

          <button className="btn btn-primary btn-full" onClick={handleEmailSignup} disabled={loading} style={{ marginTop: 2 }}>
            {loading ? <BunnyLoader text="Creating account…" /> : "🚀 Create Account"}
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: 18, color: "var(--text2)", fontSize: 13 }}>
          Have an account? <button onClick={onLogin} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontFamily: "var(--font)", fontWeight: 700 }}>Login →</button>
=======
  const handleSignup = () => {
    if (strength < 2) { addToast('Password too weak — add uppercase, numbers & symbols', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      const ok = register(form);
      if (!ok) setLoading(false);
    }, 700);
  };

  const checks = [
    ['8+ characters',   form.password.length >= 8],
    ['Uppercase (A-Z)', /[A-Z]/.test(form.password)],
    ['Number (0-9)',    /[0-9]/.test(form.password)],
    ['Symbol (!@#…)',   /[^A-Za-z0-9]/.test(form.password)],
  ];

  return (
    <div className="page scroll-area" style={{ alignItems: 'center', justifyContent: 'flex-start', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 380, paddingTop: 8 }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom: 20 }}>← Back</button>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Bunny size={72} mood="excited" animate={false} />
          <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 12 }}>Join ByteBunny!</h1>
          <p style={{ color: 'var(--text2)', marginTop: 4, fontSize: 13 }}>Start your coding adventure 🚀</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Username */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', marginBottom: 6, display: 'block', letterSpacing: 1 }}>USERNAME *</label>
            <input className="input" placeholder="cool_coder_42" value={form.username} onChange={set('username')} />
          </div>

          {/* Email */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', marginBottom: 6, display: 'block', letterSpacing: 1 }}>EMAIL</label>
            <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
          </div>

          {/* Phone */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', marginBottom: 6, display: 'block', letterSpacing: 1 }}>PHONE NUMBER</label>
            <input className="input" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
          </div>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: -8 }}>* Email or phone required</div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', letterSpacing: 1 }}>PASSWORD *</label>
              {form.password && (
                <span style={{ fontSize: 11, fontWeight: 700, color: STRENGTH_COLORS[strength - 1] || '#ff4444' }}>
                  {STRENGTH_LABELS[strength]}
                </span>
              )}
            </div>
            <PasswordInput value={form.password} onChange={set('password')} placeholder="Min 8 chars, A-Z, 0-9, symbol" />

            {/* Strength bars */}
            {form.password && (
              <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="pw-bar" style={{ background: i < strength ? STRENGTH_COLORS[strength - 1] : 'var(--border)' }} />
                ))}
              </div>
            )}

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 10, fontSize: 11 }}>
              {checks.map(([label, met]) => (
                <span key={label} style={{ color: met ? 'var(--green)' : 'var(--text3)' }}>
                  {met ? '✅' : '⬜'} {label}
                </span>
              ))}
            </div>
          </div>

          <button className="btn btn-primary btn-full" onClick={handleSignup} disabled={loading} style={{ marginTop: 4 }}>
            {loading ? '🔄 Creating account...' : '🚀 Create Account'}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--text2)', fontSize: 13 }}>
          Have an account?{' '}
          <button onClick={onLogin} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'var(--font)', fontWeight: 700 }}>
            Login →
          </button>
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
        </p>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 0189a73c6eae47f41fc20cb0e28fb92172c6c37b
