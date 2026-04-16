import { useState, useEffect } from 'react';
import { useAppStore } from '../stores/enhanced-appStore';
import { LANGUAGES, generateLevelsAsync, getLangProgress } from '../data/enhanced-levels';
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

  const [levels, setLevels]             = useState([]);
  const [levelsReady, setLevelsReady]   = useState(false);

  useEffect(() => {
    setLevelsReady(false);
    generateLevelsAsync(activeLang).then((lvls) => {
      setLevels(lvls);
      setLevelsReady(true);
    });
  }, [activeLang]);

  const lang    = LANGUAGES.find((l) => l.id === activeLang);
  const lp      = getLangProgress(progress, activeLang);
  const current = lp.currentLevel;
  const done    = lp.completedLevels;
  const pct     = Math.round(Object.keys(done).length / 300 * 100);

  if (!levelsReady) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, background: 'var(--bg)' }}>
        <div style={{ fontSize: 52, animation: 'bounce 1.4s ease-in-out infinite' }}>🐰</div>
        <div style={{ color: 'var(--text2)', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>LOADING MAP…</div>
      </div>
    );
  }

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
        <button className="btn btn-ghost btn-sm" onClick={() => setPage('home')} style={{ padding: '8px', minWidth: 40, fontSize: 20 }}>←</button>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>{lang?.icon}</span>
            <span style={{ fontWeight: 800, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lang?.name}</span>
          </div>
          <div style={{ marginTop: 6 }}>
            <ProgressBar value={pct} />
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 12 }}>
          <div className="badge badge-accent" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>🔥</span> {streak}
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--xp-blue)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>⚡</span> {xp}
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ padding: '8px', minWidth: 40, fontSize: 18 }}>⚙️</button>
        </div>
      </div>

      {/* Map scroll area */}
      <div className="page-content-full scroll-area" style={{ background: 'var(--bg-deep)', position: 'relative' }}>
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: totalH, 
          margin: '0 auto', 
          maxWidth: 400, 
          padding: '40px 20px 120px' 
        }}>

          {/* SVG connection lines */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--xp-blue)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {positions.slice(0, -1).map((pos, i) => {
              const next   = positions[i + 1];
              const status = getLevelStatus(i + 1, current, done);
              const isDone = status === 'completed';
              
              // Calculate center points of nodes
              const x1 = (pos.left / 100) * 360 + 32;
              const y1 = pos.top + 32;
              const x2 = (next.left / 100) * 360 + 32;
              const y2 = next.top + 32;
              
              const cx = (x1 + x2) / 2;
              const cy = (y1 + y2) / 2;
              
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                  fill="none"
                  stroke={isDone ? 'url(#lineGrad)' : 'var(--border)'}
                  strokeWidth={isDone ? 4 : 2}
                  strokeDasharray={isDone ? 'none' : '8 6'}
                  strokeLinecap="round"
                  opacity={isDone ? 1 : 0.3}
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
                style={{ 
                  position: 'absolute', 
                  left: `${pos.left}%`, 
                  top: pos.top, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: 8,
                  zIndex: 10
                }}
              >
                <div
                  className={`level-node ${status} ${isRecap ? 'recap' : ''}`}
                  onClick={() => status !== 'locked' && startLevel(activeLang, lv.id)}
                  style={{ 
                    transform: status === 'active' ? 'scale(1.15)' : 'scale(1)',
                    boxShadow: status === 'active' ? '0 0 20px var(--primary-glow)' : 'none'
                  }}
                >
                  {status === 'locked'     ? '🔒' :
                   isRecap                 ? '📖' :
                   status === 'completed'  ? (lvPct >= 100 ? '⭐' : '✓') :
                   '▶'}
                </div>

                <div style={{ textAlign: 'center', minWidth: 80 }}>
                  <div style={{ 
                    fontSize: 10, 
                    color: status === 'active' ? 'var(--primary)' : 'var(--text-low)', 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    letterSpacing: 0.5,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    {isRecap ? 'Recap' : `Level ${lv.id}`}
                  </div>
                  {lvPct > 0 && (
                    <div style={{ fontSize: 10, color: lvPct >= 80 ? 'var(--primary)' : 'var(--warning)', fontWeight: 800 }}>
                      {lvPct}%
                    </div>
                  )}
                </div>
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