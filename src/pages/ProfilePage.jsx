import { useState, useMemo } from 'react';
import { useAppStore } from '../stores/enhanced-appStore';
import { LANGUAGES as LEVEL_LANGS, calcLangPercent } from '../data/enhanced-levels';
import { COURSE_DATA, LANGUAGES as COURSE_LANGS } from '../data/courses';
import { BADGE_RULES, getLanguageMasterBadges, getAcademyGraduateBadges } from '../data/badges';
import { Bunny, BottomNav, ProgressBar, SettingsModal } from '../components/UI';

export default function ProfilePage() {
  const user           = useAppStore((s) => s.user);
  const progress       = useAppStore((s) => s.progress);
  const courseProgress = useAppStore((s) => s.courseProgress);
  const testHistory    = useAppStore((s) => s.testHistory);
  const streak         = useAppStore((s) => s.streak);
  const xp             = useAppStore((s) => s.xp);
  const logout         = useAppStore((s) => s.logout);
  const setPage        = useAppStore((s) => s.setPage);
  const reviewTest     = useAppStore((s) => s.reviewTest);
  const badges         = useAppStore((s) => s.badges);
  
  const [showSettings, setShowSettings] = useState(false);

  const statsObj = useMemo(() => {
    const totalLevels = Object.values(progress).reduce(
      (a, lp) => a + Object.keys(lp.completedLevels || {}).length, 0
    );
    const totalLectures = Object.values(courseProgress).reduce((acc, lang) => {
      return acc + Object.values(lang).reduce((lAcc, level) => lAcc + level.length, 0);
    }, 0);

    return { streak, xp, totalLevels, totalLectures };
  }, [streak, xp, progress, courseProgress]);

  const earnedBadges = useMemo(() => {
    const mainBadges = BADGE_RULES.filter(rule => badges.includes(rule.id));
    const masterBadges = getLanguageMasterBadges(progress, LEVEL_LANGS).filter(b => badges.includes(b.id));
    const graduateBadges = getAcademyGraduateBadges(courseProgress, COURSE_DATA, COURSE_LANGS).filter(b => badges.includes(b.id));
    return [...mainBadges, ...masterBadges, ...graduateBadges];
  }, [progress, courseProgress, badges]);

  const displayStats = [
    { label: 'Total XP', value: xp, icon: '⚡', color: 'var(--primary)' },
    { label: 'Day Streak', value: streak, icon: '🔥', color: '#ff8800' },
    { label: 'Badges', value: earnedBadges.length, icon: '🏆', color: '#ffdd00' },
    { label: 'Tests', value: testHistory.length, icon: '📝', color: 'var(--info)' },
  ];

  return (
    <div className="page">
      <div className="topbar">
        <span style={{ fontWeight: 800, fontSize: 18, flex: 1, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>👤</span> PROFILE
        </span>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ padding: '8px', minWidth: 40 }}>⚙️</button>
      </div>

      <div className="page-content scroll-area" style={{ paddingBottom: 150 }}>
        {/* User Header Card */}
        <div className="card animate-in" style={{ 
          marginBottom: 24, textAlign: 'center', position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-deep) 100%)',
          padding: '40px 24px',
          border: '1px solid var(--primary-low)'
        }}>
          <div style={{ 
            width: 110, height: 110, borderRadius: '50%', background: 'var(--bg-soft)', 
            margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: 52, border: '4px solid var(--primary)', boxShadow: '0 0 30px var(--primary-low)',
            position: 'relative', zIndex: 2
          }}>
            {user?.avatar ? <img src={user.avatar} style={{ width: '100%', height: '100%', borderRadius: '50%' }} alt="avatar" /> : '🐰'}
          </div>
          <h2 style={{ fontSize: 26, margin: '0 0 4px', color: 'white' }}>{user?.username}</h2>
          <div style={{ fontSize: 14, color: 'var(--text-med)', fontWeight: 500 }}>{user?.email || user?.phone}</div>
          
          <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 100, opacity: 0.05, transform: 'rotate(15deg)' }}>🐰</div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {displayStats.map((s, i) => (
            <div key={i} className="card card-hover animate-in" style={{ 
              padding: '20px', textAlign: 'center', animationDelay: `${i * 0.05}s`,
              borderBottom: `4px solid ${s.color}`
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{s.value}</div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-med)', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges Section */}
        <div className="animate-in" style={{ marginBottom: 32, animationDelay: '0.25s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>🏆</span> ACHIEVEMENTS ({earnedBadges.length})
            </h3>
            <span style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 800 }}>RANK: {Math.floor(xp / 500) + 1}</span>
          </div>

          {earnedBadges.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="card card-hover" style={{ 
                  padding: '16px', textAlign: 'center', background: 'var(--bg-soft)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
                }}>
                  <div style={{ 
                    width: 50, height: 54, borderRadius: '50%', background: 'var(--bg-deep)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)', border: '1px solid var(--border)'
                  }}>
                    {badge.icon}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'white', lineHeight: 1.2 }}>{badge.label}</div>
                  <div style={{ fontSize: 8, color: 'var(--text-med)', lineHeight: 1.2 }}>{badge.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: '40px', textAlign: 'center', border: '1px dashed var(--border)', background: 'transparent' }}>
              <div style={{ fontSize: 40, opacity: 0.3, marginBottom: 12 }}>🔒</div>
              <div style={{ color: 'var(--text-med)', fontSize: 13 }}>Burrow deeper to unlock badges!</div>
            </div>
          )}
        </div>

        {/* Language Mastery */}
        <div className="animate-in" style={{ animationDelay: '0.35s', marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, paddingLeft: 4 }}>Language Mastery</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {LEVEL_LANGS.map((lang) => {
              const lp = progress[lang.id];
              const current = lp?.currentLevel || 1;
              const pct = Math.round((current / 300) * 100);
              if (pct < 1 && !lp) return null; 
              
              return (
                <div key={lang.id} className="card card-hover" style={{ padding: '16px 20px', background: 'var(--bg-soft)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{lang.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{lang.name}</span>
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 800 }}>LVL {current}/300</span>
                  </div>
                  <ProgressBar value={pct} />
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Test History */}
        <div className="animate-in" style={{ animationDelay: '0.45s', marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, paddingLeft: 4 }}>AI Test History</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {testHistory && testHistory.length > 0 ? (
              testHistory.slice(0, 10).map((test) => (
                <div key={test.id} className="card card-hover" style={{ padding: '16px 20px', background: 'var(--bg-soft)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--primary)', textTransform: 'uppercase' }}>
                        {test.config.language} {test.config.isMCQ ? 'MCQ' : 'PROBLEM'}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-low)' }}>
                        {new Date(test.date).toLocaleDateString()} // {test.config.difficulty}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: test.results.score >= 70 ? 'var(--success)' : 'var(--xp-blue)' }}>{test.results.score}%</div>
                      <button 
                        className="btn btn-secondary btn-sm" 
                        style={{ padding: '6px 12px', fontSize: 10, borderRadius: 8 }}
                        onClick={() => reviewTest(test)}
                      >
                        👁️ REVIEW
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: 32, opacity: 0.5, border: '1px dashed var(--border)', background: 'transparent' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>📝</div>
                <div style={{ fontSize: 12 }}>No tests taken yet.</div>
              </div>
            )}
          </div>
        </div>

        <div className="animate-in" style={{ animationDelay: '0.55s', marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {user?.isAdmin && (
            <button 
              className="btn btn-secondary btn-full" 
              onClick={() => setPage('admin')}
              style={{ padding: '16px', borderRadius: 16, border: '1px solid var(--primary-low)' }}
            >
              🔑 Admin Dashboard
            </button>
          )}
          <button 
            className="btn btn-danger btn-full" 
            onClick={logout} 
            style={{ padding: '16px', borderRadius: 16, fontWeight: 800 }}
          >
            🚪 Sign Out
          </button>
        </div>
      </div>

      <BottomNav />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
