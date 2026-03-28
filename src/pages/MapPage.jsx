import { useState } from 'react';
import { useAppStore } from '../stores/appStore';
import { LANGUAGES, generateLevels, getLangProgress } from '../data/levels';
import { BottomNav, SettingsModal, ProgressBar } from '../components/UI';

// Zigzag column positions (left %)
const COLS = [18, 58, 38, 18, 58];

function getLevelStatus(id, currentLevel, completedLevels) {
  if ((completedLevels[id] || 0) >= 70) return 'completed';
  if (id === currentLevel)               return 'active';
  if (id < currentLevel)                 return 'completed';
  return 'locked';
}

export default function MapPage() {
  const activeLang = useAppStore((s) => s.activeLang);
  const progress   = useAppStore((s) => s.progress);
  const streak     = useAppStore((s) => s.streak);
  const xp         = useAppStore((s) => s.xp);
  const startLevel = useAppStore((s) => s.startLevel);
  const setPage    = useAppStore((s) => s.setPage);
  const [showSettings, setShowSettings] = useState(false);

  const lang    = LANGUAGES.find((l) => l.id === activeLang);
  const lp      = getLangProgress(progress, activeLang);
  const levels  = generateLevels(activeLang);
  const current = lp.currentLevel;
  const done    = lp.completedLevels;

  const pct = Math.round(Object.keys(done).length / 50 * 100);

  // Node positions
  const positions = levels.map((_, i) => ({
    left: COLS[i % COLS.length],
    top:  i * 84 + 16,
  }));

  const totalH = levels.length * 84 + 80;

  return (
    <div className="page">
      {/* Topbar */}
      <div className="topbar">
        <button className="btn btn-ghost btn-sm" onClick={() => setPage('home')} style={{ padding: '6px 10px', fontSize: 18 }}>←</button>
        <span style={{ fontSize: 20 }}>{lang?.icon}</span>
        <span style={{ fontWeight: 800, flex: 0, whiteSpace: 'nowrap' }}>{lang?.name}</span>
        <div style={{ flex: 1 }}>
          <ProgressBar value={pct} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3, fontSize: 10, color: 'var(--text3)' }}>
            <span>{pct}% complete</span>
            <span>Level {current} / 50</span>
          </div>
        </div>
        <div className="streak-pill" style={{ fontSize: 11, padding: '4px 8px' }}>🔥{streak}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)' }}>⚡{xp}</div>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ fontSize: 16, padding: '6px 8px' }}>⚙️</button>
      </div>

      {/* Map scroll area */}
      <div className="page-content-full scroll-area" style={{ paddingTop: 8, paddingBottom: 100 }}>
        <div style={{ position: 'relative', height: totalH, margin: '0 auto', maxWidth: 320 }}>

          {/* SVG connection lines */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: totalH, overflow: 'visible' }}>
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--blue)" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {positions.slice(0, -1).map((pos, i) => {
              const next   = positions[i + 1];
              const status = getLevelStatus(i + 1, current, done);
              const isDone = status === 'completed';
              // Convert % to px using 320px container width
              const w = 320;
              const x1 = (pos.left / 100) * w + 29;
              const y1 = pos.top + 29;
              const x2 = (next.left / 100) * w + 29;
              const y2 = next.top + 29;
              // Bezier control point
              const cx = (x1 + x2) / 2;
              const cy = (y1 + y2) / 2 - 10;
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                  fill="none"
                  stroke={isDone ? 'url(#lineGrad)' : 'var(--border)'}
                  strokeWidth={isDone ? 3 : 2}
                  strokeDasharray={isDone ? 'none' : '6 5'}
                  strokeLinecap="round"
                  opacity={isDone ? 1 : 0.5}
                />
              );
            })}
          </svg>

          {/* Level nodes */}
          {levels.map((lv, i) => {
            const pos    = positions[i];
            const status = getLevelStatus(lv.id, current, done);
            const lvPct  = done[lv.id] || 0;
            const isRecap = lv.recap;

            return (
              <div
                key={lv.id}
                style={{ position: 'absolute', left: `${pos.left}%`, top: pos.top, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}
              >
                {/* Node */}
                <div
                  className={`level-node ${status} ${isRecap ? 'recap' : ''} ${status === 'active' ? 'animate-glow' : ''}`}
                  onClick={() => status !== 'locked' && startLevel(activeLang, lv.id)}
                  title={lv.title}
                  style={{ width: 58, height: 58 }}
                >
                  {status === 'locked'     ? '🔒' :
                   isRecap                 ? '📖' :
                   status === 'completed'  ? (lvPct >= 100 ? '⭐' : '✓') :
                   '▶'}
                </div>

                {/* Label */}
                <div style={{ fontSize: 9, color: status === 'active' ? 'var(--blue)' : 'var(--text3)', fontWeight: 700, whiteSpace: 'nowrap', textAlign: 'center' }}>
                  {isRecap ? `📖 RECAP ${Math.floor(lv.id / 5)}` : `LV ${lv.id}`}
                </div>

                {/* Score */}
                {lvPct > 0 && (
                  <div style={{ fontSize: 9, color: lvPct >= 80 ? 'var(--accent)' : 'var(--yellow)', fontWeight: 700 }}>{lvPct}%</div>
                )}

                {/* Active badge */}
                {status === 'active' && (
                  <div className="badge badge-blue" style={{ fontSize: 9, padding: '2px 6px' }}>START</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
