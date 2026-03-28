import { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { LANGUAGES, calcLangPercent } from '../data/levels';
import { Bunny, BottomNav, ProgressBar, SettingsModal } from '../components/UI';

export default function HomePage() {
  const user          = useAppStore((s) => s.user);
  const progress      = useAppStore((s) => s.progress);
  const streak        = useAppStore((s) => s.streak);
  const xp            = useAppStore((s) => s.xp);
  const goToMap       = useAppStore((s) => s.goToMap);
  const continueLearning = useAppStore((s) => s.continueLearning);
  const [showSettings, setShowSettings] = useState(false);

  const lastLang = Object.keys(progress)[0];
  const lastLangData = lastLang ? LANGUAGES.find((l) => l.id === lastLang) : null;

  return (
    <div className="page">
      <div className="page-content">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>
              Hey, <span style={{ color: 'var(--accent)' }}>{user?.username}</span>! 🐰
            </div>
            <div style={{ color: 'var(--text2)', fontSize: 12, marginTop: 2 }}>
              {streak > 0 ? `${streak}-day streak! Keep going 🔥` : 'Ready to code today?'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="streak-pill">🔥 {streak}</div>
            <div style={{ background: 'rgba(88,166,255,0.12)', border: '1px solid rgba(88,166,255,0.3)', borderRadius: 999, padding: '5px 12px', color: 'var(--blue)', fontWeight: 800, fontSize: 13 }}>
              ⚡ {xp} XP
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ fontSize: 18, padding: '6px 10px' }}>⚙️</button>
          </div>
        </div>

        {/* Continue banner */}
        {lastLangData && (
          <div className="card animate-slideUp" style={{ background: 'linear-gradient(135deg,rgba(0,255,136,0.08),rgba(88,166,255,0.08))', border: '1px solid var(--accent)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontSize: 40 }}>{lastLangData.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14 }}>Continue {lastLangData.name}</div>
              <div style={{ color: 'var(--text2)', fontSize: 12, marginTop: 2 }}>
                Level {progress[lastLang]?.currentLevel || 1} of 50 — {calcLangPercent(progress, lastLang)}% done
              </div>
              <ProgressBar value={calcLangPercent(progress, lastLang)} style={{ marginTop: 8 }} />
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => continueLearning(lastLang)}>
              ▶ Go
            </button>
          </div>
        )}

        {/* Language grid */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--text2)', marginBottom: 12, letterSpacing: 2 }}>// CHOOSE LANGUAGE</div>
          <div className="grid-2">
            {LANGUAGES.map((lang) => {
              const pct = calcLangPercent(progress, lang.id);
              const lp  = progress[lang.id];
              return (
                <div key={lang.id} className={`lang-card ${lastLang === lang.id ? 'active' : ''}`} onClick={() => goToMap(lang.id)}>
                  <div style={{ fontSize: 38, marginBottom: 8 }}>{lang.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{lang.name}</div>
                  <div style={{ color: 'var(--text2)', fontSize: 11, marginTop: 2, marginBottom: 10 }}>{lang.desc}</div>
                  <ProgressBar value={pct} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11 }}>
                    <span style={{ color: 'var(--text3)' }}>{pct}% done</span>
                    {lp && <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Lv {lp.currentLevel || 1}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid-3" style={{ marginTop: 20 }}>
          <div className="stat-card">
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--accent)' }}>{Object.keys(progress).length}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>Languages</div>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--yellow)' }}>🔥{streak}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>Day Streak</div>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--blue)' }}>⚡{xp}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>Total XP</div>
          </div>
        </div>

        {/* Motivational footer */}
        <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
          <Bunny size={36} mood="happy" animate={false} />
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>// ByteBunny tip:</span>{' '}
            {streak === 0 ? "Start your first lesson today — even 5 minutes counts! 🐰" :
             streak < 3   ? `${streak} day streak! Momentum is building 🔥` :
             streak < 7   ? `${streak} days strong! You're forming a habit 💪` :
             `${streak} days! You're a coding machine! 🚀`}
          </div>
        </div>
      </div>

      <BottomNav />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
