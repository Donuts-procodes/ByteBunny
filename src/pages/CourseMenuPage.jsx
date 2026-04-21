import { useAppStore } from '../stores/enhanced-appStore';
import { COURSE_DATA, LANGUAGES, DIFFICULTY_LEVELS } from '../data/courses';
import { BottomNav, SettingsModal, ProgressBar } from '../components/UI';
import { useState, useMemo } from 'react';

export default function CourseMenuPage() {
  const setPage = useAppStore((s) => s.setPage);
  const setCourseSelection = useAppStore((s) => s.setCourseSelection);
  const courseProgress = useAppStore((s) => s.courseProgress);
  const [showSettings, setShowSettings] = useState(false);
  const [search, setSearch] = useState("");

  const getProgress = (langId, level) => {
    const cp = courseProgress[langId]?.[level] || [];
    const total = COURSE_DATA[langId]?.[level]?.length || 0;
    if (total === 0) return 0;
    return Math.round((cp.length / total) * 100);
  };

  const handleSelect = (langId, level) => {
    setCourseSelection({ lang: langId, level });
    setPage('course');
  };

  const filteredLanguages = useMemo(() => {
    return LANGUAGES
      .filter(l => l.label.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [search]);

  return (
    <div className="page">
      <div className="topbar">
        <div style={{ fontWeight: 800, fontSize: 18, flex: 1, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>📚</span> ACADEMY
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ padding: '8px', minWidth: 40 }}>⚙️</button>
      </div>

      <div className="page-content scroll-area" style={{ paddingBottom: 120, paddingTop: 10 }}>
        <div className="card" style={{ 
          marginBottom: 24, 
          background: 'linear-gradient(135deg, var(--bg-soft) 0%, var(--bg-deep) 100%)',
          border: '1px solid var(--primary-low)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.1 }}>
            <span style={{ fontSize: 100 }}>🎓</span>
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 18, color: 'var(--primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✨</span> INTERACTIVE LEARNING
            </h2>
            <p style={{ color: 'var(--text-high)', fontSize: 13, lineHeight: 1.5, margin: 0 }}>
              Master modern programming through hands-on practice. Each course features AI-generated 
              challenges, real-time feedback, and bite-sized lectures designed for maximum retention.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
            <input 
              className="input" 
              placeholder="Search courses..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 40, background: 'var(--bg-soft)', border: '1px solid var(--border)', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {filteredLanguages.map((l) => (
            <div key={l.id} className="card" style={{ 
              padding: 0, 
              background: 'var(--bg-soft)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
              border: '1px solid var(--border)'
            }}>
              <div style={{ 
                padding: '16px 20px', 
                background: 'rgba(255,255,255,0.03)', 
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 10, 
                  background: 'var(--bg-deep)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: 24
                }}>
                  {l.icon}
                </div>
                <div>
                  <h2 style={{ fontSize: 18, margin: 0 }}>{l.label}</h2>
                  <div style={{ fontSize: 10, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1 }}>
                    {COURSE_DATA[l.id]?.basic?.length || 0} Core Modules
                  </div>
                </div>
              </div>
              
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {DIFFICULTY_LEVELS.map((level) => {
                  const pct = getProgress(l.id, level);
                  return (
                    <div key={level} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button
                          onClick={() => handleSelect(l.id, level)}
                          className={`btn ${pct > 0 ? 'btn-primary' : 'btn-ghost'}`}
                          style={{ 
                            fontSize: 10, 
                            textTransform: 'uppercase', 
                            padding: '6px 12px',
                            minWidth: 90,
                            letterSpacing: 1,
                            ...(pct === 0 ? { border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' } : {})
                          }}
                        >
                          {level}
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 10, fontWeight: 800, color: pct === 100 ? 'var(--primary)' : 'var(--text-low)' }}>
                            {pct}%
                          </span>
                          {pct === 100 && <span style={{ fontSize: 12 }}>✅</span>}
                        </div>
                      </div>
                      <ProgressBar value={pct} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Coming Soon Card */}
          <div className="card" style={{ 
            padding: '40px 20px', 
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 12,
            opacity: 0.8
          }}>
            <div style={{ fontSize: 32 }}>🐰</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-med)', letterSpacing: 1 }}>MORE COMING SOON</div>
              <p style={{ fontSize: 11, color: 'var(--text-low)', margin: '4px 0 0' }}>
                ByteBunny is always digging up new languages and modules.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
