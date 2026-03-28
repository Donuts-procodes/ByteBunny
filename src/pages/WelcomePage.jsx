import { Bunny, Scanline } from '../components/UI';

export default function WelcomePage({ onLogin, onSignup }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <Scanline />

      {/* Grid background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)', backgroundSize: '40px 40px', opacity: 0.25 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,136,0.18), transparent 70%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 80%, rgba(88,166,255,0.1), transparent 60%)' }} />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 380, width: '100%' }} className="animate-fadeIn">
        <Bunny size={110} mood="excited" animate />

        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: '-2px', lineHeight: 1 }}>
            Byte<span style={{ color: 'var(--accent)' }}>Bunny</span>
          </div>
          <div style={{ color: 'var(--text2)', marginTop: 8, fontSize: 13, letterSpacing: 1 }}>
            // LEARN CODING THE FUN WAY
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
          <span className="badge badge-green">🐰 Bunny-powered</span>
          <span className="badge badge-blue">50 Levels</span>
          <span className="badge badge-purple">6 Languages</span>
          <span className="badge badge-orange">Rust + Tauri</span>
        </div>

        {/* Language preview */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
          {['🐍 Python', '⚡ JS', '⚙️ Rust', '🗄️ SQL', '💻 Bash', '🦫 Go'].map((l) => (
            <div key={l} style={{ padding: '6px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, fontWeight: 700, color: 'var(--text2)' }}>{l}</div>
          ))}
        </div>

        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="btn btn-primary btn-lg btn-full" onClick={onSignup}>
            🚀 Start Coding for Free
          </button>
          <button className="btn btn-secondary btn-lg btn-full" onClick={onLogin}>
            🔐 I Already Have an Account
          </button>
        </div>

        <div style={{ marginTop: 28, display: 'flex', gap: 16, justifyContent: 'center', color: 'var(--text3)', fontSize: 11, flexWrap: 'wrap' }}>
          <span>✅ Free forever</span>
          <span>⚡ Interactive quizzes</span>
          <span>🔥 Daily streaks</span>
          <span>🦀 Built with Rust</span>
        </div>
      </div>
    </div>
  );
}
