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
  
  const [showSettings, setShowSettings] = useState(false);

  const stats = useMemo(() => {
    const totalLevels = Object.values(progress).reduce(
      (a, lp) => a + Object.keys(lp.completedLevels || {}).length, 0
    );
    const totalLectures = Object.values(courseProgress).reduce((acc, lang) => {
      return acc + Object.values(lang).reduce((lAcc, level) => lAcc + level.length, 0);
    }, 0);

    return { streak, xp, totalLevels, totalLectures };
  }, [streak, xp, progress, courseProgress]);

  const earnedBadges = useMemo(() => {
    const mainBadges = BADGE_RULES.filter(rule => rule.check(stats));
    const masterBadges = getLanguageMasterBadges(progress, LEVEL_LANGS);
    const graduateBadges = getAcademyGraduateBadges(courseProgress, COURSE_DATA, COURSE_LANGS);
    return [...mainBadges, ...masterBadges, ...graduateBadges];
  }, [stats, progress, courseProgress]);

  return (
    <div className="page">
      <div className="topbar">
        <span style={{ fontWeight: 800, fontSize: 18, flex: 1, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>👤</span> PROFILE
        </span>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ padding: '8px', minWidth: 40 }}>⚙️</button>
      </div>

      <div className="page-content scroll-area">
        <div className="card animate-in" style={{ marginBottom: 24, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--bg-soft)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, border: '4px solid var(--primary)', boxShadow: '0 0 20px var(--primary-glow)' }}>
            {user?.avatar ? <img src={user.avatar} style={{ width: '100%', height: '100%', borderRadius: '50%' }} alt="avatar" /> : '🐰'}
          </div>
          <h2 style={{ fontSize: 24, marginBottom: 4 }}>{user?.username}</h2>
          <p style={{ color: 'var(--text-med)', fontSize: 14, fontWeight: 600, marginBottom: 20 }}>{user?.email || user?.phone}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 1 }}>Earned Badges ({earnedBadges.length})</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
              {earnedBadges.length > 0 ? (
                earnedBadges.map((b) => (
                  <div key={b.id} className="badge badge-accent" style={{ fontSize: 10, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{b.icon}</span>
                    {b.label}
                  </div>
                ))
              ) : (
                <div style={{ fontSize: 12, color: 'var(--text-low)', fontStyle: 'italic' }}>Complete tasks to earn your first badge!</div>
              )}
            </div>
          </div>
        </div>

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
          </div>
        </div>

        <div className="animate-in" style={{ animationDelay: '0.2s', marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, paddingLeft: 4 }}>AI Test History</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 400, overflowY: 'auto', paddingRight: 4 }} className="scroll-area">
            {testHistory && testHistory.length > 0 ? (
              testHistory.map((test) => (
                <div key={test.id} className="card" style={{ padding: '16px 20px', background: 'var(--bg-soft)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--primary)', textTransform: 'uppercase' }}>
                        {test.config.language} {test.config.isMCQ ? 'MCQ' : 'PROBLEM'}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-low)' }}>
                        {new Date(test.date).toLocaleDateString()} // {test.config.difficulty}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: test.results.score >= 70 ? 'var(--success)' : 'var(--xp-blue)' }}>{test.results.score}%</div>
                      <div style={{ fontSize: 9, color: 'var(--text-low)', fontWeight: 800 }}>SCORE</div>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm" style={{ width: '100%', padding: '8px', fontSize: 11 }} onClick={() => reviewTest(test)}>👁️ Review Answers</button>
                </div>
              ))
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: 32, opacity: 0.5 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>📝</div>
                <div style={{ fontSize: 12 }}>No tests taken yet.</div>
              </div>
            )}
          </div>
        </div>

        <div className="animate-in" style={{ animationDelay: '0.3s', marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, paddingLeft: 4 }}>Language Mastery</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {LEVEL_LANGS.map((lang) => {
              const lp = progress[lang.id];
              const current = lp?.currentLevel || 1;
              const pct = Math.round((current / 300) * 100);
              if (pct < 1 && !lp) return null; // Only hide if absolutely no progress and not even level 1 started
              
              return (
                <div key={lang.id} className="card" style={{ padding: '16px 20px', background: 'var(--bg-soft)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{lang.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{lang.name}</span>
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 800 }}>LVL {current}/300</span>
                  </div>
                  <ProgressBar value={pct} color={lang.color} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="animate-in" style={{ animationDelay: '0.4s', marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, paddingLeft: 4 }}>Academy Progress</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {COURSE_LANGS.map((lang) => {
              const cp = courseProgress[lang.id] || {};
              const total = (COURSE_DATA[lang.id]?.basic?.length || 0) + (COURSE_DATA[lang.id]?.intermediate?.length || 0) + (COURSE_DATA[lang.id]?.expert?.length || 0);
              if (total === 0) return null;
              
              const done = (cp.basic?.length || 0) + (cp.intermediate?.length || 0) + (cp.expert?.length || 0);
              const pct = Math.round((done / total) * 100);
              
              if (pct === 0 && Object.keys(cp).length === 0) return null;

              return (
                <div key={lang.id} className="card" style={{ padding: '16px 20px', background: 'var(--bg-soft)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{lang.label} Course</span>
                    <span style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 800 }}>{pct}%</span>
                  </div>
                  <ProgressBar value={pct} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="animate-in" style={{ animationDelay: '0.5s', marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {user?.isAdmin && <button className="btn btn-secondary btn-full" onClick={() => setPage('admin')}>🔑 Admin Dashboard</button>}
          <button className="btn btn-secondary btn-full" onClick={logout} style={{ color: 'var(--error)', borderColor: 'rgba(255,75,75,0.2)' }}>🚪 Sign Out</button>
        </div>
      </div>

      <BottomNav />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
