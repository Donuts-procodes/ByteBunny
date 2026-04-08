import { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { LANGUAGES, calcLangPercent } from '../data/levels';
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
      <div className="page-content">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>// PROFILE</div>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ fontSize: 18 }}>⚙️</button>
        </div>

        {/* Avatar card */}
        <div className="card" style={{ textAlign: 'center', marginBottom: 20, background: 'linear-gradient(135deg,rgba(0,255,136,0.06),rgba(88,166,255,0.06))' }}>
          <Bunny size={88} mood="happy" animate />
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 10 }}>{user?.username}</div>
          <div style={{ color: 'var(--text2)', fontSize: 12, marginTop: 4 }}>{user?.email || user?.phone}</div>
          <div style={{ color: 'var(--text3)', fontSize: 11, marginTop: 2 }}>
            Joined {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'today'}
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 14, flexWrap: 'wrap' }}>
              {badges.map((b) => (
                <span key={b.label} className={`badge ${b.color}`}>{b.label}</span>
              ))}
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid-2" style={{ marginBottom: 20 }}>
          <div className="stat-card">
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--accent)' }}>{xp}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>⚡ Total XP</div>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--orange)' }}>🔥{streak}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>Day Streak</div>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--blue)' }}>{totalLevels}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>Levels Done</div>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--purple)' }}>{langs}</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>Languages</div>
          </div>
        </div>

        {/* XP level indicator */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
            <span style={{ fontWeight: 700 }}>⚡ XP Progress</span>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{xp} / {Math.ceil(xp / 100) * 100} XP</span>
          </div>
          <ProgressBar value={(xp % 100)} />
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 6 }}>
            {100 - (xp % 100)} XP to next rank
          </div>
        </div>

        {/* Language progress */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--text2)', marginBottom: 12, letterSpacing: 2 }}>// LANGUAGE PROGRESS</div>
          {LANGUAGES.map((lang) => {
            const pct  = calcLangPercent(progress, lang.id);
            const lp   = progress[lang.id];
            const done = lp ? Object.keys(lp.completedLevels || {}).length : 0;
            return (
              <div key={lang.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 13 }}>
                  <span style={{ fontWeight: 600 }}>{lang.icon} {lang.name}</span>
                  <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: 'var(--text3)', fontSize: 11 }}>{done}/50 levels</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{pct}%</span>
                  </span>
                </div>
                <ProgressBar value={pct} />
              </div>
            );
          })}
        </div>

        {/* Streak calendar (last 7 days visual) */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>🔥 Weekly Streak</div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => {
              const active = i < (streak % 7 || 7);
              return (
                <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: active ? 'var(--accent)' : 'var(--bg3)', border: `1px solid ${active ? 'var(--accent2)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                    {active ? '🔥' : ''}
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--text3)' }}>{day}</div>
                </div>
              );
            })}
          </div>
        </div>

//
        {/* Admin panel — only visible to admins */}
        {user?.isAdmin && (
          <button
            className="btn btn-outline btn-full"
            onClick={() => setPage('admin')}
            style={{ marginBottom: 10 }}
          >
            🔑 Admin Panel
          </button>
        )}

//
////
        {/* Logout */}
        <button className="btn btn-danger btn-full" onClick={logout}>
          🚪 Log Out
        </button>
      </div>

      <BottomNav />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
