import { useAppStore } from '../stores/enhanced-appStore';
import { COURSE_DATA, LANGUAGES, DIFFICULTY_LEVELS } from '../data/courses';
import { BottomNav, SettingsModal, ProgressBar } from '../components/UI';
import { useState } from 'react';

export default function CourseMenuPage() {
  const setPage = useAppStore((s) => s.setPage);
  const setCourseSelection = useAppStore((s) => s.setCourseSelection);
  const courseProgress = useAppStore((s) => s.courseProgress);
  const [showSettings, setShowSettings] = useState(false);

  const handleSelect = (lang, level) => {
    setCourseSelection({ lang, level });
    setPage('course');
  };

  const getProgress = (lang, level) => {
    const total = COURSE_DATA[lang]?.[level]?.length || 0;
    if (total === 0) return 0;
    const completed = courseProgress[lang]?.[level]?.length || 0;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="page">
      <div className="topbar">
        <h1 style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary)' }}>📚 CODING ACADEMY</h1>
        <div style={{ flex: 1 }} />
        <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ padding: '8px', minWidth: 40 }}>⚙️</button>
      </div>

      <div className="page-content scroll-area" style={{ paddingBottom: 120 }}>
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: 'var(--text-med)', fontSize: 14, lineHeight: 1.6 }}>
            Select a language and difficulty level to start your interactive learning journey. 
            Each course consists of multiple lectures with 5 practice tasks each.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {LANGUAGES.map((l) => (
            <div key={l.id} className="card" style={{ padding: 20, background: 'var(--bg-soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20, gap: 12 }}>
                <span style={{ fontSize: 24 }}>{l.icon}</span>
                <h2 style={{ fontSize: 20, margin: 0 }}>{l.label}</h2>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                {DIFFICULTY_LEVELS.map((level) => {
                  const pct = getProgress(l.id, level);
                  return (
                    <div key={level} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button
                          onClick={() => handleSelect(l.id, level)}
                          className="btn btn-ghost"
                          style={{ 
                            fontSize: 11, 
                            textTransform: 'uppercase', 
                            padding: '6px 12px',
                            border: '1px solid var(--border)',
                            background: 'rgba(255,255,255,0.03)',
                            minWidth: 100
                          }}
                        >
                          {level}
                        </button>
                        <span style={{ fontSize: 10, fontWeight: 800, color: pct === 100 ? 'var(--primary)' : 'var(--text-low)' }}>
                          {pct}%
                        </span>
                      </div>
                      <ProgressBar value={pct} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
