import { Bunny, Scanline } from '../components/UI';

export default function WelcomePage({ onLogin, onSignup }) {
  return (
    <div className="page" style={{ overflowY: 'auto' }}>
      <Scanline />

      {/* Grid background */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)', backgroundSize: '40px 40px', opacity: 0.25 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,136,0.18), transparent 70%)' }} />
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at 80% 80%, rgba(88,166,255,0.1), transparent 60%)' }} />

      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: 380, width: '100%' }} className="animate-in">
          <Bunny size={110} mood="excited" animate />

          <div style={{ marginTop: 20 }}>
            <div className="welcome-title" style={{ fontSize: 46, fontWeight: 800, letterSpacing: '-2px', lineHeight: 1 }}>
              Byte<span style={{ color: 'var(--accent)' }}>Bunny</span>
            </div>
            <div style={{ color: 'var(--text2)', marginTop: 12, fontSize: 13, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', fontWeight: 700 }}>
              <span>✨</span> LEARN CODING THE FUN WAY <span>✨</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
            <span className="badge badge-green">🐰 Bunny-powered</span>
            <span className="badge badge-blue">300 Levels</span>
            <span className="badge badge-purple">11 Languages</span>
          </div>

          {/* Language preview */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap', maxWidth: 420 }}>
            {[
              { n: 'Python', i: '🐍' },
              { n: 'JS', i: '⚡' },
              { n: 'Rust', i: '🦀' },
              { n: 'SQL', i: '🗄️' },
              { n: 'Bash', i: '🔧' },
              { n: 'Go', i: '🐹' },
              { n: 'TS', i: '📘' },
              { n: 'C++', i: '⚙️' },
              { n: 'Java', i: '☕' },
              { n: 'C#', i: '🎮' }
            ].map((l, idx) => (
              <div key={idx} style={{ 
                padding: '4px 10px', 
                background: 'var(--bg-soft)', 
                border: '1px solid var(--border)', 
                borderRadius: 8, 
                fontSize: 11, 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--text-med)'
              }}>
                <span style={{ fontSize: 14 }}>{l.i}</span> {l.n}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button className="btn btn-primary btn-full" onClick={onSignup}>
              🚀 Start Coding for Free
            </button>
            <button className="btn btn-secondary btn-full" onClick={onLogin}>
              🔐 I Already Have an Account
            </button>
          </div>

          <div style={{ marginTop: 28, display: 'flex', gap: 16, justifyContent: 'center', color: 'var(--text3)', fontSize: 11, flexWrap: 'wrap' }}>
            <span>✅ Free</span>
            <span>⚡ Interactive</span>
            <span>🔥 Daily</span>
          </div>
        </div>
      </div>
    </div>
  );
}
