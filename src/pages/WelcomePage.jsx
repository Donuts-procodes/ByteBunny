import { Bunny, Scanline } from '../components/UI';
import { useAppStore } from '../stores/enhanced-appStore';

function CookieConsent() {
  const hasAccepted = useAppStore((s) => s.hasAcceptedCookies);
  const acceptCookies = useAppStore((s) => s.acceptCookies);

  if (hasAccepted) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 40px)',
      maxWidth: 400,
      background: 'rgba(13, 17, 23, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: '16px 20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 24 }}>🍪</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>Cookie Notice</div>
          <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.4, marginTop: 2 }}>
            We use cookies to save your coding progress and preferences. No tracking, just carrots! 🥕
          </div>
        </div>
      </div>
      <button 
        className="btn btn-primary btn-sm" 
        style={{ width: '100%' }}
        onClick={acceptCookies}
      >
        Accept & Continue
      </button>
    </div>
  );
}

export default function WelcomePage({ onLogin, onSignup }) {
  return (
    <div className="page" style={{ overflowY: 'auto' }}>
      <Scanline />
      <CookieConsent />

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
