import { useState, useEffect } from 'react';
import { useAppStore } from '../stores/appStore';
import { generateLevelsAsync, getLangById } from '../data/levels';
import { Bunny, Confetti, ProgressBar } from '../components/UI';

export default function LevelPage() {
  const activeLang      = useAppStore((s) => s.activeLang);
  const currentLevelId  = useAppStore((s) => s.currentLevelId);
  const completeLevel   = useAppStore((s) => s.completeLevel);
  const setPage         = useAppStore((s) => s.setPage);
  const addToast        = useAppStore((s) => s.addToast);

  const lang   = getLangById(activeLang);
  const [levels, setLevels] = useState([]);
  const [levelsReady, setLevelsReady] = useState(false);

  // Load levels (checks Firestore for admin overrides first)
  useEffect(() => {
    setLevelsReady(false);
    generateLevelsAsync(activeLang).then((lvls) => {
      setLevels(lvls);
      setLevelsReady(true);
    });
  }, [activeLang]);

  const level = levelsReady ? (levels[(currentLevelId || 1) - 1] || levels[0]) : null;

  const [selected,      setSelected]      = useState(null);
  const [submitted,     setSubmitted]      = useState(false);
  const [hearts,        setHearts]         = useState(3);
  const [score,         setScore]          = useState(100);
  const [correct,       setCorrect]        = useState(false);
  const [showCelebrate, setShowCelebrate]  = useState(false);
  const [showHint,      setShowHint]       = useState(false);
  const [shake,         setShake]          = useState(false);
  const [attempts,      setAttempts]       = useState(0);

  useEffect(() => {
    setSelected(null); setSubmitted(false); setHearts(3);
    setScore(100); setCorrect(false); setShowCelebrate(false);
    setShowHint(false); setShake(false); setAttempts(0);
  }, [currentLevelId]);

  const heartPct = Math.round((hearts / 3) * 100);

  // Show mini loading state while levels fetch from Firestore
  if (!levelsReady || !level) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, background: 'var(--bg)' }}>
        <div style={{ fontSize: 52, animation: 'bounce 1.4s ease-in-out infinite' }}>🐰</div>
        <div style={{ color: 'var(--text2)', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>LOADING LEVEL…</div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (selected === null) { addToast('Pick an answer first!', 'info'); return; }
    setSubmitted(true);

    if (selected === level.ans) {
      setCorrect(true);
      setShowCelebrate(true);
      setTimeout(() => {
        setShowCelebrate(false);
        completeLevel(activeLang, level.id, Math.max(score, 10));
      }, 2200);
    } else {
      const newHearts = hearts - 1;
      const newScore  = Math.max(score - 28, 10);
      setHearts(Math.max(newHearts, 0));
      setScore(newScore);
      setAttempts((a) => a + 1);
      setShake(true);
      setTimeout(() => setShake(false), 450);

      if (newHearts <= 0) {
        addToast('💀 Out of hearts! Level failed', 'error');
        setTimeout(() => completeLevel(activeLang, level.id, 10), 1600);
      } else {
        addToast(`❌ Wrong! ${newHearts} heart${newHearts > 1 ? 's' : ''} left`, 'error');
        setTimeout(() => {
          setSelected(null);
          setSubmitted(false);
        }, 1800);
      }
    }
  };

  const optionClass = (i) => {
    let cls = 'answer-opt';
    if (submitted) {
      if (i === level.ans)    cls += ' correct';
      else if (i === selected) cls += ' incorrect';
    } else if (i === selected) cls += ' selected';
    return cls;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', maxWidth: 480, margin: '0 auto', padding: '0 16px 24px', position: 'relative' }}>
      {showCelebrate && <Confetti />}

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 0', position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setPage('map')} style={{ padding: '6px 10px', fontSize: 18, color: 'var(--text3)' }}>✕</button>
        <div style={{ flex: 1 }}>
          <ProgressBar value={heartPct} />
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`heart ${i < hearts ? 'full' : 'empty'}`}>❤️</span>
          ))}
        </div>
      </div>

      {/* Level info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 26 }}>{lang?.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>
            {level.recap ? '📖 Recap Time!' : `${lang?.name} — ${level.title}`}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>
            {level.recap ? "Prove what you know!" : `+${level.xp} XP on completion · Score: ${score}%`}
          </div>
        </div>
        {level.recap && <span className="badge badge-purple">RECAP</span>}
        {attempts > 0 && <span className="badge badge-orange">Attempt {attempts + 1}</span>}
      </div>

      {/* Bunny + Question bubble */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, alignItems: 'flex-start' }} className={shake ? 'animate-shake' : ''}>
        <Bunny
          size={52}
          mood={submitted && !correct ? 'sad' : correct ? 'excited' : 'happy'}
          animate={false}
        />
        <div style={{ flex: 1, background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '4px 16px 16px 16px', padding: '14px 16px', fontSize: 14, lineHeight: 1.6, fontWeight: 600 }}>
          {level.q}
        </div>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {level.opts.map((opt, i) => (
          <button
            key={i}
            className={optionClass(i)}
            onClick={() => !submitted && setSelected(i)}
            disabled={submitted}
          >
            <span style={{ color: 'var(--text3)', marginRight: 10, fontSize: 12 }}>{['A', 'B', 'C', 'D'][i]})</span>
            {opt}
          </button>
        ))}
      </div>

      {/* Hint toggle */}
      {attempts > 0 && !submitted && (
        <div style={{ marginTop: 14 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowHint((h) => !h)} style={{ fontSize: 12, color: 'var(--yellow)' }}>
            💡 {showHint ? 'Hide hint' : 'Show hint'}
          </button>
          {showHint && (
            <div style={{ marginTop: 8, padding: '10px 14px', background: 'rgba(227,179,65,0.08)', border: '1px solid rgba(227,179,65,0.25)', borderRadius: 10, fontSize: 12, color: 'var(--yellow)', lineHeight: 1.5 }}>
              🐰 Bunny says: The correct answer is option{' '}
              <strong>{['A', 'B', 'C', 'D'][level.ans]}</strong>. Think about it!
            </div>
          )}
        </div>
      )}

      {/* Feedback after wrong */}
      {submitted && !correct && (
        <div style={{ marginTop: 14, padding: '12px 16px', background: 'rgba(247,129,102,0.08)', border: '1px solid var(--orange)', borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
          <Bunny size={34} mood="sad" animate={false} />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--orange)', fontSize: 13 }}>Not quite!</div>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>
              Correct: <span style={{ color: 'var(--green)', fontWeight: 700 }}>{level.opts[level.ans]}</span>
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        className="btn btn-primary btn-full"
        onClick={handleSubmit}
        disabled={selected === null || submitted}
        style={{ marginTop: 20 }}
      >
        {submitted
          ? correct ? '🎉 Correct!' : '❌ Wrong...'
          : 'Check Answer ✓'}
      </button>

      {/* Score indicator */}
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 16, fontSize: 11, color: 'var(--text3)' }}>
        <span>Level {currentLevelId} / 50</span>
        <span>Score: <span style={{ color: score >= 70 ? 'var(--accent)' : 'var(--orange)', fontWeight: 700 }}>{score}%</span></span>
        <span>XP reward: +{Math.floor(level.xp * score / 100)}</span>
      </div>

      {/* Celebration overlay */}
      {showCelebrate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 18 }}>
          <Bunny size={110} mood="excited" animate />
          <div style={{ fontSize: 34, fontWeight: 800, color: 'var(--accent)', textAlign: 'center' }}>
            {score >= 90 ? '🌟 PERFECT!' : score >= 70 ? '✅ GREAT JOB!' : '👍 DONE!'}
          </div>
          <div style={{ color: 'var(--text2)', fontSize: 14 }}>
            +{Math.floor(level.xp * score / 100)} XP earned!
          </div>
          <div className="badge badge-green" style={{ fontSize: 15, padding: '10px 24px' }}>
            Score: {score}%
          </div>
          {attempts > 0 && (
            <div style={{ fontSize: 12, color: 'var(--yellow)' }}>
              Completed in {attempts + 1} attempt{attempts > 0 ? 's' : ''} — score reduced
            </div>
          )}
        </div>
      )}
    </div>
  );
}
