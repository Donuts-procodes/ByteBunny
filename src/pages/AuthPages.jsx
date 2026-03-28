import { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { Bunny } from '../components/UI';

// ── Password strength ─────────────────────────────────────────────────────────
function pwStrength(pw) {
  let s = 0;
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
      </button>
    </div>
  );
}

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
        </p>
      </div>
    </div>
  );
}

// ── Signup Page ───────────────────────────────────────────────────────────────
export function SignupPage({ onBack, onLogin }) {
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const register = useAppStore((s) => s.register);
  const addToast = useAppStore((s) => s.addToast);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const strength = pwStrength(form.password);

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
        </p>
      </div>
    </div>
  );
}
