import { useState } from 'react';
import { useAppStore } from '../stores/enhanced-appStore';
import { db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { LANGUAGES, invalidateAdminLevelCache } from '../data/enhanced-levels';
import { BottomNav } from '../components/UI';

// ── Constants extracted outside component to prevent re-creation on render ──
const LEVEL_TEMPLATE = JSON.stringify([
  {
    id: 51,
    recap: false,
    title: 'Level 51',
    q: 'Your question here?',
    opts: ['Option A', 'Option B', 'Option C', 'Option D'],
    ans: 0,
    xp: 30,
  },
], null, 2);

export default function AdminPage() {
  const user     = useAppStore((s) => s.user);
  const setPage  = useAppStore((s) => s.setPage);
  const addToast = useAppStore((s) => s.addToast);

  const [tab,        setTab]        = useState('levels');   // 'levels' | 'users' | 'push'
  const [selLang,    setSelLang]    = useState('python');
  const [levelJson,  setLevelJson]  = useState('');
  const [pushing,    setPushing]    = useState(false);
  const [fetching,   setFetching]   = useState(false);
  const [userStats,  setUserStats]  = useState(null);
  const [fetchUid,   setFetchUid]   = useState('');

  if (!user?.isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 48 }}>🚫</div>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Admin access only</div>
        <button className="btn btn-secondary" onClick={() => setPage('home')}>← Go Home</button>
      </div>
    );
  }

  // ── Push custom levels to Firestore ──────────────────────────────────────────
  const handlePushLevels = async () => {
    if (!levelJson.trim()) {
      addToast('Cannot push empty data', 'error');
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(levelJson);
    } catch (e) {
      addToast('Invalid JSON format: ' + e.message, 'error');
      return;
    }

    if (!Array.isArray(parsed)) { 
      addToast('JSON root must be an array', 'error'); 
      return; 
    }

    setPushing(true);
    try {
      await setDoc(doc(db, 'admin', 'levels'), { [selLang]: parsed }, { merge: true });
      invalidateAdminLevelCache(); // Force next map/level load to re-fetch
      addToast(`✅ ${parsed.length} levels pushed for ${selLang}`, 'success');
      setLevelJson(''); // Clear input on success
    } catch (e) {
      addToast('Database error: ' + (e?.message || 'Failed to push levels'), 'error');
    } finally {
      setPushing(false);
    }
  };

  // ── Fetch current Firestore levels ────────────────────────────────────────────
  const handleFetchLevels = async () => {
    setFetching(true);
    try {
      const snap = await getDoc(doc(db, 'admin', 'levels'));
      const data = snap.data();
      
      if (snap.exists() && data && data[selLang]) {
        setLevelJson(JSON.stringify(data[selLang], null, 2));
        addToast(`Levels loaded for ${selLang}`, 'success');
      } else {
        addToast(`No custom levels found for ${selLang}`, 'info');
        setLevelJson('');
      }
    } catch (e) {
      addToast('Fetch error: ' + (e?.message || 'Could not connect to database'), 'error');
    } finally {
      setFetching(false);
    }
  };

  // ── Lookup a user by UID ──────────────────────────────────────────────────────
  const handleFetchUser = async () => {
    const cleanUid = fetchUid.trim();
    if (!cleanUid) {
      addToast('Please enter a UID', 'error');
      return;
    }

    setFetching(true);
    try {
      const snap = await getDoc(doc(db, 'users', cleanUid));
      if (snap.exists()) { 
        setUserStats(snap.data()); 
      } else { 
        addToast('User not found', 'error'); 
        setUserStats(null); 
      }
    } catch (e) {
      addToast('Database error: ' + (e?.message || 'Failed to fetch user'), 'error');
      setUserStats(null);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setPage('home')}>←</button>
        <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>🔑</span> ADMIN PANEL
        </div>
        <span className="badge badge-orange" style={{ marginLeft: 'auto' }}>{user.username}</span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        {[
          ['levels', '📝 Levels'], 
          ['users', '👤 Users'], 
          ['push', '🚀 Push Update']
        ].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, padding: '12px 8px', background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font)', fontWeight: 700, fontSize: 12,
            color: tab === id ? 'var(--accent)' : 'var(--text3)',
            borderBottom: tab === id ? '2px solid var(--accent)' : '2px solid transparent',
            transition: 'all 0.2s',
          }}>
            {label}
          </button>
        ))}
      </div>

      <div className="page-content">

        {/* ── LEVELS TAB ── */}
        {tab === 'levels' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card" style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.2)' }}>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13 }}>📋 How it works</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>
                Push a JSON array of level objects to Firestore. The app will load these <strong style={{color:'var(--accent)'}}>instead of</strong> the built-in levels for the chosen language. Fields: <code style={{color:'var(--cyan)'}}>id, recap, title, q, opts[], ans, xp</code>
              </div>
            </div>

            {/* Language selector */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', letterSpacing: 1, display: 'block', marginBottom: 8 }}>LANGUAGE</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {LANGUAGES.map((l) => (
                  <button key={l.id} onClick={() => setSelLang(l.id)} style={{
                    padding: '6px 14px', borderRadius: 8, border: '1.5px solid',
                    borderColor: selLang === l.id ? 'var(--accent)' : 'var(--border)',
                    background: selLang === l.id ? 'rgba(0,255,136,0.1)' : 'var(--bg3)',
                    color: selLang === l.id ? 'var(--accent)' : 'var(--text2)',
                    cursor: 'pointer', fontFamily: 'var(--font)', fontWeight: 700, fontSize: 12,
                  }}>
                    {l.icon} {l.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary btn-sm" onClick={handleFetchLevels} disabled={fetching} style={{ flex: 1 }}>
                {fetching ? '⏳ Loading…' : '📥 Load from Firestore'}
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => setLevelJson(LEVEL_TEMPLATE)} style={{ flex: 1 }}>
                📋 Use Template
              </button>
            </div>

            {/* JSON editor */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
                LEVEL JSON ARRAY
              </label>
              <textarea
                value={levelJson}
                onChange={(e) => setLevelJson(e.target.value)}
                placeholder={LEVEL_TEMPLATE}
                rows={12}
                style={{
                  width: '100%', boxSizing: 'border-box', padding: '12px 14px',
                  background: '#0a0e16', border: '1.5px solid var(--border)',
                  borderRadius: 10, color: 'var(--cyan)', fontFamily: 'var(--font)',
                  fontSize: 11, lineHeight: 1.6, resize: 'vertical', outline: 'none',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e)  => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <button className="btn btn-primary" onClick={handlePushLevels} disabled={pushing || !levelJson.trim()}>
              {pushing ? '⏳ Pushing…' : `🚀 Push Levels for ${selLang}`}
            </button>
          </div>
        )}

        {/* ── USERS TAB ── */}
        {tab === 'users' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card" style={{ background: 'rgba(88,166,255,0.04)', border: '1px solid rgba(88,166,255,0.2)' }}>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 13 }}>🔍 Look up a user</div>
              <div style={{ fontSize: 12, color: 'var(--text2)' }}>Enter a Firebase UID to view their progress snapshot.</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                className="input"
                placeholder="Firebase UID…"
                value={fetchUid}
                onChange={(e) => setFetchUid(e.target.value)}
                style={{ flex: 1, minWidth: 0, boxSizing: 'border-box' }}
              />
              <button className="btn btn-primary btn-sm" onClick={handleFetchUser} disabled={fetching || !fetchUid.trim()} style={{ flexShrink: 0 }}>
                {fetching ? '…' : 'Fetch'}
              </button>
            </div>
            {userStats && (
              <div className="card">
                <div style={{ fontWeight: 800, marginBottom: 12 }}>{userStats.username} <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: 12 }}>{userStats.email}</span></div>
                <div className="grid-2" style={{ marginBottom: 12 }}>
                  <div className="stat-card"><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent)' }}>{userStats.xp || 0}</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>XP</div></div>
                  <div className="stat-card"><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--orange)' }}>🔥{userStats.streak || 0}</div><div style={{ fontSize: 11, color: 'var(--text3)' }}>Streak</div></div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>Last login: {userStats.lastLogin || 'unknown'}</div>
                <div style={{ marginTop: 10 }}>
                  {Object.entries(userStats.progress || {}).map(([lang, lp]) => {
                    // New structure: numeric keys are levels
                    const completedCount = Object.keys(lp).filter(key => 
                      !isNaN(key) && lp[key]?.completed
                    ).length;
                    
                    return (
                      <div key={lang} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span>{LANGUAGES.find(l=>l.id===Number(lang) || l.id===lang)?.icon} {lang}</span>
                        <span style={{ color: 'var(--accent)' }}>Lv {lp.currentLevel} · {completedCount} done</span>
                      </div>
                    );
                  })}
                </div>
                <pre style={{ marginTop: 12, fontSize: 10, color: 'var(--text3)', background: 'var(--bg3)', borderRadius: 8, padding: 10, overflow: 'auto', maxHeight: 200 }}>
                  {JSON.stringify(userStats, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* ── PUSH UPDATE TAB ── */}
        {tab === 'push' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card" style={{ background: 'rgba(188,140,255,0.04)', border: '1px solid rgba(188,140,255,0.2)' }}>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>🚀 Deployment Checklist</div>
              {[
                ['Add your Firebase UID to ADMIN_UIDS in appStore.js', '⚙️'],
                ['Set up Firestore security rules (see CLOUD_GUIDE.md)', '🔒'],
                ['Enable Google Auth in Firebase Console → Authentication', '🔵'],
                ['Add your domain to Firebase Auth authorized domains', '🌐'],
                ['Set VITE_* env vars for production build', '🔑'],
                ['Run: npm run build', '📦'],
                ['Run: firebase deploy', '🚀'],
              ].map(([step, icon]) => (
                <div key={step} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10, fontSize: 12 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                  <span style={{ color: 'var(--text2)', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>

            <div className="card">
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13 }}>📊 Firestore Data Model</div>
              <pre style={{ fontSize: 10, color: 'var(--cyan)', lineHeight: 1.7 }}>{`/users/{uid}
  username: string
  email:    string
  xp:       number
  streak:   number
  lastLogin:string
  darkMode: boolean
  progress: {
    python: {
      currentLevel: number
      "1": { score: 100, xp: 25, completed: true }
      "2": { score: 85, xp: 20, completed: true }
    }
  }

/admin/levels
  python: [ { id, q, opts, ans, xp, topic } ]
  javascript: [ ... ]`}</pre>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}