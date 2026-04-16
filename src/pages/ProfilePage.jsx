import { useState } from 'react';
import { useAppStore } from '../stores/enhanced-appStore';
import { LANGUAGES, calcLangPercent } from '../data/enhanced-levels';
import { Bunny, BottomNav, ProgressBar, SettingsModal } from '../components/UI';

export default function ProfilePage() {
  const user     = useAppStore((s) => s.user);
  const progress = useAppStore((s) => s.progress);
  const streak   = useAppStore((s) => s.streak);
  const xp       = useAppStore((s) => s.xp);
  const logout   = useAppStore((s) => s.logout);
//
  const setPage  = useAppStore((s) => s.setPage);
//
////
  const [showSettings, setShowSettings] = useState(false);

  const totalLevels = Object.values(progress).reduce(
    (a, lp) => a + Object.keys(lp.completedLevels || {}).length, 0
  );
  const langs = Object.keys(progress).length;

  const badges = [
    { label: 'Coder',        color: 'badge-green',  cond: true },
    { label: '🔥 Week Streak', color: 'badge-orange', cond: streak >= 7 },
    { label: '⚡ XP Hunter',  color: 'badge-purple', cond: xp >= 100 },
    { label: '🌟 Perfectionist', color: 'badge-yellow', cond: Object.values(progress).some(lp => Object.values(lp.completedLevels || {}).some(p => p >= 100)) },
    { label: '🗺️ Explorer',  color: 'badge-blue',   cond: langs >= 3 },
    { label: '🏆 Master',    color: 'badge-accent',  cond: totalLevels >= 25 },
  ].filter((b) => b.cond);

  return (
    <div className="page">
      {/* Topbar */}
      <div className="topbar">
        <span style={{ fontWeight: 800, fontSize: 18, flex: 1, letterSpacing: 1 }}>// PROFILE</span>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ padding: '8px', minWidth: 40 }}>⚙️</button>
      </div>

      <div className="page-content scroll-area">
        {/* User Header Card */}
        <div className="card animate-in" style={{ marginBottom: 24, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 120, opacity: 0.03, transform: 'rotate(15deg)', pointerEvents: 'none' }}>🐰</div>
          <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--bg-soft)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, border: '4px solid var(--primary)', boxShadow: '0 0 20px var(--primary-glow)' }}>
            {user?.avatar ? <img src={user.avatar} style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : '🐰'}
          </div>
          <h2 style={{ fontSize: 24, marginBottom: 4 }}>{user?.username}</h2>
          <p style={{ color: 'var(--text-med)', fontSize: 14, fontWeight: 600 }}>{user?.email || user?.phone}</p>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            {badges.map((b) => (
              <span key={b.label} className="badge badge-accent" style={{ fontSize: 10 }}>{b.label}</span>
            ))}
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="animate-in" style={{ animationDelay: '0.1s', marginBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="card" style={{ padding: 16, textAlign: 'center', background: 'var(--bg-soft)' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>⚡</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>{xp}</div>
              <div className="stat-label">Total XP</div>
            </div>
            <div className="card" style={{ padding: 16, textAlign: 'center', background: 'var(--bg-soft)' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🔥</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--warning)' }}>{streak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
            <div className="card" style={{ padding: 16, textAlign: 'center', background: 'var(--bg-soft)' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🎯</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--xp-blue)' }}>{totalLevels}</div>
              <div className="stat-label">Levels Done</div>
            </div>
            <div className="card" style={{ padding: 16, textAlign: 'center', background: 'var(--bg-soft)' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🗺️</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary-light)' }}>{langs}</div>
              <div className="stat-label">Paths Started</div>
            </div>
          </div>
        </div>

        {/* Language Progress */}
        <div className="animate-in" style={{ animationDelay: '0.2s' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, paddingLeft: 4 }}>Learning Progress</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {LANGUAGES.map((lang) => {
              const lp   = progress[lang.id];
              if (!lp) return null;
              
              const done = Object.keys(lp.completedLevels || {}).length;
              const pct  = calcLangPercent(progress, lang.id);

              return (
                <div key={lang.id} className="card" style={{ padding: '16px 20px', background: 'var(--bg-soft)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                    <span style={{ fontSize: 24 }}>{lang.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{lang.name}</span>
                        <span style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 800 }}>{pct}%</span>
                      </div>
                    </div>
                  </div>
                  <ProgressBar value={pct} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-low)', fontWeight: 700 }}>{done}/300 Levels</span>
                    <span style={{ fontSize: 11, color: 'var(--text-low)', fontWeight: 700 }}>Lv. {lp.currentLevel || 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Account Actions */}
        <div className="animate-in" style={{ animationDelay: '0.3s', marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {user?.isAdmin && (
            <button className="btn btn-secondary btn-full" onClick={() => setPage('admin')}>
              🔑 Admin Dashboard
            </button>
          )}
          <button className="btn btn-secondary btn-full" onClick={logout} style={{ color: 'var(--error)', borderColor: 'rgba(255,75,75,0.2)' }}>
            🚪 Sign Out of ByteBunny
          </button>
        </div>
      </div>

      <BottomNav />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
