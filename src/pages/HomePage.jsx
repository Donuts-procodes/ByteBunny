import { useState, useEffect } from 'react';
import { useAppStore } from '../stores/enhanced-appStore';
import { LANGUAGES, calcLangPercent } from '../data/enhanced-levels';
import { Bunny, BottomNav, ProgressBar, SettingsModal } from '../components/UI';
import { generateAITip } from '../lib/ai';

export default function HomePage() {
  const user          = useAppStore((s) => s.user);
  const progress      = useAppStore((s) => s.progress);
  const streak        = useAppStore((s) => s.streak);
  const xp            = useAppStore((s) => s.xp);
  const goToMap       = useAppStore((s) => s.goToMap);
  const continueLearning = useAppStore((s) => s.continueLearning);
  const [showSettings, setShowSettings] = useState(false);
  const [tip, setTip] = useState(null);
  const [tipLoading, setTipLoading] = useState(false);

  useEffect(() => {
    handleGetTip();
  }, []);

  const handleGetTip = async () => {
    setTipLoading(true);
    try {
      const newTip = await generateAITip();
      setTip(newTip);
    } catch (err) {
      console.error("Failed to generate tip:", err);
    } finally {
      setTipLoading(false);
    }
  };

  const lastLang = Object.keys(progress)[0];
  const lastLangData = lastLang ? LANGUAGES.find((l) => l.id === lastLang) : null;

  return (
    <div className="page">
      {/* Header */}
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '1px solid var(--border)' }}>
            {user?.avatar ? <img src={user.avatar} style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : '🐰'}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-high)' }}>{user?.username || 'Coder'}</div>
            <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Lv. {Math.floor(xp / 100) + 1} Enthusiast</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <div className="badge badge-accent" style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0, 255, 136, 0.1)', color: 'var(--primary)', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
            <span>🔥</span> {streak}
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--xp-blue)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>⚡</span> {xp}
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ padding: '8px', minWidth: 40 }}>⚙️</button>
        </div>
      </div>

      <div className="page-content scroll-area">
        {/* Streak Card */}
        <div className="card animate-in" style={{ marginBottom: 20, position: 'relative', overflow: 'hidden', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 120, opacity: 0.03, transform: 'rotate(15deg)', pointerEvents: 'none' }}>🐰</div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Bunny size={64} mood={streak > 0 ? 'excited' : 'happy'} animate={streak > 0} />
            <div>
              <h3 style={{ marginBottom: 4, fontSize: 18 }}>{streak > 0 ? `${streak} Day Streak!` : 'Ready to Code?'}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-med)', lineHeight: 1.5 }}>
                {streak === 0 ? "Solve one level today to start your coding streak!" :
                 streak < 5  ? "Keep it up! You're building a great habit." :
                 "You're a coding machine! Don't stop now."}
              </p>
            </div>
          </div>
        </div>

        {/* AI Tip Section */}
        <div className="animate-in" style={{ animationDelay: '0.05s', marginBottom: 32 }}>
          <div className="card" style={{ background: 'var(--primary-low)', border: '1px dashed var(--primary)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: (tip || tipLoading) ? 12 : 0 }}>
              <span style={{ fontSize: 18 }}>💡</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 1 }}>ByteBunny AI Tip</span>
            </div>
            {tipLoading ? (
              <div className="pulse-text" style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700 }}>BURROWING FOR TIPS... 🐰🔍</div>
            ) : tip && (
              <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-high)', fontStyle: 'italic', animation: 'fadeIn 0.3s ease-out' }}>
                {tip.replace(/^["']|["']$/g, '')}
              </div>
            )}
          </div>
        </div>

        {/* Resume Path */}
        {lastLangData && (
          <div className="animate-in" style={{ animationDelay: '0.1s', marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingLeft: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1.5 }}>Resume Path</span>
            </div>
            <div className="card card-hover" onClick={() => goToMap(lastLang)} style={{ background: 'var(--bg-soft)', borderLeft: `4px solid ${lastLangData.color || 'var(--primary)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 32 }}>{lastLangData.icon}</span>
                  <div>
                    <h3 style={{ fontSize: 18 }}>{lastLangData.name}</h3>
                    <div style={{ fontSize: 12, color: 'var(--text-med)', marginTop: 4 }}>
                      Level {progress[lastLang]?.currentLevel || 1} of 300
                    </div>
                  </div>
                </div>
                <div className="btn btn-primary btn-sm" style={{ padding: '10px 20px' }}>Resume</div>
              </div>
              <div style={{ marginTop: 16 }}>
                <ProgressBar value={calcLangPercent(progress, lastLang)} />
              </div>
            </div>
          </div>
        )}

        {/* All Paths */}
        <div className="animate-in" style={{ animationDelay: '0.2s' }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1.5, display: 'block', marginBottom: 16, paddingLeft: 4 }}>Explore Languages</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {LANGUAGES.map((lang) => {
              const pct = calcLangPercent(progress, lang.id);
              const isLast = lang.id === lastLang;
              if (isLast) return null;

              return (
                <div key={lang.id} className="card card-hover" onClick={() => goToMap(lang.id)} style={{ padding: '16px 20px', background: 'var(--bg-soft)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontSize: 24 }}>{lang.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-high)' }}>{lang.name}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-low)', fontWeight: 800 }}>{pct}%</span>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <ProgressBar value={pct} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
