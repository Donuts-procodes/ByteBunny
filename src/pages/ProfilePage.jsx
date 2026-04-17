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
  const streak         = useAppStore((s) => s.streak);
  const xp             = useAppStore((s) => s.xp);
  const logout         = useAppStore((s) => s.logout);
  const setPage        = useAppStore((s) => s.setPage);
  
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
    // 1. Rule-based badges
    const mainBadges = BADGE_RULES.filter(rule => rule.check(stats));
    
    // 2. Language Master badges (300 levels)
    const masterBadges = getLanguageMasterBadges(progress, LEVEL_LANGS);
    
    // 3. Academy Graduate badges
    const graduateBadges = getAcademyGraduateBadges(courseProgress, COURSE_DATA, COURSE_LANGS);

    return [...mainBadges, ...masterBadges, ...graduateBadges];
  }, [stats, progress, courseProgress]);

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
          <p style={{ color: 'var(--text-med)', fontSize: 14, fontWeight: 600, marginBottom: 20 }}>{user?.email || user?.phone}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 1 }}>Earned Badges ({earnedBadges.length})</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
              {earnedBadges.length > 0 ? (
                earnedBadges.map((b) => (
                  <div key={b.id} className="badge badge-accent" style={{ fontSize: 10, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, title: b.description }}>
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
              <div style={{ fontSize: 24, marginBottom: 4 }}>🎓</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--xp-blue)' }}>{stats.totalLectures}</div>
              <div className="stat-label">Lectures Done</div>
            </div>
            <div className="card" style={{ padding: 16, textAlign: 'center', background: 'var(--bg-soft)' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🎯</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary-light)' }}>{stats.totalLevels}</div>
              <div className="stat-label">Levels Done</div>
            </div>
          </div>
        </div>

        {/* Course Academy Progress */}
        <div className="animate-in" style={{ animationDelay: '0.2s', marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, paddingLeft: 4 }}>Course Academy</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {COURSE_LANGS.map((lang) => {
              const cp = courseProgress[lang.id];
              if (!cp) return null;

              const totalLecturesInLang = 
                (COURSE_DATA[lang.id]?.basic?.length || 0) + 
                (COURSE_DATA[lang.id]?.intermediate?.length || 0) + 
                (COURSE_DATA[lang.id]?.expert?.length || 0);
              
              const completedInLang = 
                (cp.basic?.length || 0) + 
                (cp.intermediate?.length || 0) + 
                (cp.expert?.length || 0);

              const pct = Math.round((completedInLang / totalLecturesInLang) * 100);
              if (pct === 0) return null;

              return (
                <div key={lang.id} className="card" style={{ padding: '16px 20px', background: 'var(--bg-soft)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                    <span style={{ fontSize: 24 }}>{lang.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{lang.label} Academy</span>
                        <span style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 800 }}>{pct}%</span>
                      </div>
                    </div>
                  </div>
                  <ProgressBar value={pct} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-low)', fontWeight: 700 }}>{completedInLang}/{totalLecturesInLang} Lectures</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Language Map Progress */}
        <div className="animate-in" style={{ animationDelay: '0.3s' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, paddingLeft: 4 }}>Learning Map</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {LEVEL_LANGS.map((lang) => {
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
        <div className="animate-in" style={{ animationDelay: '0.4s', marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
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

