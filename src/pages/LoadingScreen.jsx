import { useState, useEffect } from 'react';

const TIPS = [
  { icon: '🐍', tip: 'Python tip: Use list comprehensions — `[x*2 for x in range(10)]` is faster than a loop.' },
  { icon: '⚡', tip: 'JS tip: `===` checks type AND value. Always prefer it over `==`.' },
  { icon: '⚙️', tip: 'Rust tip: The borrow checker prevents entire classes of bugs at compile time — trust it.' },
  { icon: '🗄️', tip: 'SQL tip: `EXPLAIN` before any slow query. Indexes are your best friend.' },
  { icon: '💻', tip: 'Bash tip: `set -euo pipefail` at the top of every script makes errors loud.' },
  { icon: '🦫', tip: 'Go tip: Goroutines are cheap — launch thousands. Channels keep them safe.' },
  { icon: '🐰', tip: 'ByteBunny tip: Consistency beats intensity. 10 min every day > 2 hours on Sundays.' },
  { icon: '🔥', tip: 'Streak tip: Even one question per day keeps your streak alive!' },
  { icon: '⭐', tip: 'XP tip: Retry levels with low scores — a better score improves your total.' },
  { icon: '📖', tip: 'Recap levels test everything from the last 5 levels. Read the questions carefully!' },
  { icon: '🧠', tip: 'Memory tip: Teaching concepts out loud after learning them boosts retention by 50%.' },
  { icon: '🚀', tip: 'Career tip: SQL is the single most valuable language for data work. Never skip it.' },
];

// Bunny frames for running animation
const BUNNY_FRAMES = ['🐰', '🐇', '🐰', '🐇'];

export default function LoadingScreen() {
  const [tipIndex,   setTipIndex]   = useState(() => Math.floor(Math.random() * TIPS.length));
  const [frameIndex, setFrameIndex] = useState(0);
  const [dots,       setDots]       = useState('');
  const [fadeIn,     setFadeIn]     = useState(true);

  // Cycle tips every 3 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setTipIndex((i) => (i + 1) % TIPS.length);
        setFadeIn(true);
      }, 300);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  // Bunny hop animation frames
  useEffect(() => {
    const t = setInterval(() => {
      setFrameIndex((i) => (i + 1) % BUNNY_FRAMES.length);
    }, 220);
    return () => clearInterval(t);
  }, []);

  // Loading dots
  useEffect(() => {
    const t = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'));
    }, 400);
    return () => clearInterval(t);
  }, []);

  const tip = TIPS[tipIndex];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: 32,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid BG */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.2,
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, rgba(0,255,136,0.12), transparent 65%)',
      }}/>

      {/* Animated bunny running across screen */}
      <RunningBunny />

      {/* Main content */}
      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 340 }}>
        {/* Logo */}
        <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-2px', marginBottom: 6 }}>
          Byte<span style={{ color: 'var(--accent)' }}>Bunny</span>
        </div>

        {/* Hopping bunny */}
        <div style={{
          fontSize: 72,
          lineHeight: 1,
          margin: '20px 0',
          display: 'inline-block',
          transition: 'transform 0.1s',
          transform: frameIndex % 2 === 0 ? 'translateY(0px)' : 'translateY(-10px)',
        }}>
          {BUNNY_FRAMES[frameIndex]}
        </div>

        {/* Loading bar */}
        <LoadingBar />

        {/* Loading text */}
        <div style={{
          color: 'var(--text2)',
          fontSize: 13,
          fontWeight: 700,
          marginTop: 12,
          letterSpacing: 1,
        }}>
          LOADING{dots}
        </div>

        {/* Tip card */}
        <div style={{
          marginTop: 32,
          padding: '16px 20px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          minHeight: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: 2 }}>
            // DID YOU KNOW?
          </div>
          <div style={{ fontSize: 22 }}>{tip.icon}</div>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, textAlign: 'center' }}>
            {tip.tip}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Animated loading bar ──────────────────────────────────────────────────────
function LoadingBar() {
  const [width, setWidth] = useState(15);

  useEffect(() => {
    // Simulate loading progress
    const steps = [30, 55, 70, 85, 92, 97];
    let i = 0;
    const t = setInterval(() => {
      if (i < steps.length) { setWidth(steps[i]); i++; }
      else clearInterval(t);
    }, 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: 6,
      background: 'var(--bg3)',
      borderRadius: 999,
      overflow: 'hidden',
      marginTop: 16,
    }}>
      <div style={{
        height: '100%',
        width: `${width}%`,
        background: 'linear-gradient(90deg, var(--accent), var(--blue))',
        borderRadius: 999,
        transition: 'width 0.5s ease',
        boxShadow: '0 0 8px var(--accent)',
      }}/>
    </div>
  );
}

// ── Bunny running across bottom of screen ────────────────────────────────────
function RunningBunny() {
  const [x, setX] = useState(-60);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    let pos   = -60;
    let dir   = 1;
    const w   = window.innerWidth || 400;

    const t = setInterval(() => {
      pos += dir * 3;
      if (pos > w + 60) { dir = -1; setFlip(true); }
      if (pos < -60)    { dir =  1; setFlip(false); }
      setX(pos);
    }, 16);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      bottom: 40,
      left: x,
      fontSize: 28,
      transform: flip ? 'scaleX(-1)' : 'scaleX(1)',
      transition: 'transform 0.1s',
      pointerEvents: 'none',
      filter: 'drop-shadow(0 0 6px var(--accent))',
    }}>
      🐇
    </div>
  );
}
