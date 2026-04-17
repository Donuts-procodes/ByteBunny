import { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useAppStore } from '../stores/enhanced-appStore';
import { COURSE_DATA, LANGUAGES, DIFFICULTY_LEVELS } from '../data/courses';
import { SettingsModal, Bunny } from '../components/UI';

export default function CoursePage() {
  const setPage = useAppStore((s) => s.setPage);
  const selection = useAppStore((s) => s.courseSelection);
  
  const lang = selection.lang;
  const level = selection.level;

  const [topicIdx, setTopicIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('// Terminal output will appear here...');
  const [showSettings, setShowSettings] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const topics = COURSE_DATA[lang]?.[level] || [];
  const currentTopic = topics[topicIdx];
  const currentQuestion = currentTopic?.questions[questionIdx];

  useEffect(() => {
    if (currentQuestion) {
      setCode(currentQuestion.defaultCode || '');
      setOutput(`// Started: ${currentTopic.title}\n// Question ${questionIdx + 1}: ${currentQuestion.text}`);
      setIsSuccess(false);
    }
  }, [lang, level, topicIdx, questionIdx]);

  const runCode = () => {
    if (!currentQuestion) return;

    // Refresh output immediately
    setOutput("[Running...]");
    setIsSuccess(false);

    // Small delay to simulate execution
    setTimeout(() => {
      const pattern = currentQuestion.expectedPattern;
      const isValid = pattern.test(code);

      if (isValid) {
        setOutput(`[Running ${lang}...]\n> Success! Pattern matched.\n\nGreat job! You can now move to the next question.`);
        setIsSuccess(true);
      } else {
        setOutput(`[Running ${lang}...]\n> Failure: Code did not match the expected pattern.\n\nTry again! Check your syntax or logic.`);
        setIsSuccess(false);
      }
    }, 600);
  };

  // Keyboard shortcut: Shift+Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, currentQuestion]); // Re-bind when code or question changes

  const nextQuestion = () => {
    if (currentTopic?.questions && questionIdx < currentTopic.questions.length - 1) {
      setQuestionIdx(prev => prev + 1);
    } else if (topicIdx < topics.length - 1) {
      // Completed all questions in current topic
      const completeCourseLecture = useAppStore.getState().completeCourseLecture;
      completeCourseLecture(lang, level, currentTopic.id);
      
      setTopicIdx(prev => prev + 1);
      setQuestionIdx(0);
    } else {
      // Completed last topic in the course
      const completeCourseLecture = useAppStore.getState().completeCourseLecture;
      completeCourseLecture(lang, level, currentTopic.id);
      
      setOutput("// Course level completed! 🎉");
    }
  };

  const activeLangIcon = LANGUAGES.find(l => l.id === lang)?.icon || '📚';

  return (
    <div className="page">
      {/* Topbar */}
      <div className="topbar" style={{ gap: 12 }}>
        <button 
          className="btn btn-ghost btn-sm" 
          onClick={() => setPage('course-menu')}
          style={{ minWidth: 40, padding: 8, fontSize: 16 }}
        >
          ←
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>{activeLangIcon}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{lang?.toUpperCase() || ''}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-med)', textTransform: 'uppercase' }}>{level}</div>
          </div>
        </div>

        <div style={{ flex: 1 }} />
        <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ padding: '8px', minWidth: 40 }}>⚙️</button>
      </div>

      {/* Main Grid Layout */}
      <div className="page-content-full scroll-area" style={{ paddingBottom: 0 }}>
        <div className="course-grid" style={{ height: 'calc(100vh - 64px)' }}>
          
          {/* Left Column: Lesson Content */}
          <div className="course-pane lesson-pane">
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 800, marginBottom: 4 }}>// CURRICULUM</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {topics.map((t, idx) => (
                  <button 
                    key={t.id}
                    onClick={() => { setTopicIdx(idx); setQuestionIdx(0); }}
                    className={`nav-item ${topicIdx === idx ? 'active' : ''}`}
                    style={{ 
                      flexDirection: 'row', justifyContent: 'flex-start', padding: '8px 12px', 
                      background: topicIdx === idx ? 'rgba(0,255,136,0.1)' : 'transparent',
                      width: '100%', borderRadius: 8, textAlign: 'left'
                    }}
                  >
                    <span style={{ fontSize: 14, marginRight: 8 }}>{topicIdx === idx ? '📖' : '📁'}</span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {currentTopic && (
              <div className="animate-in">
                <h2 style={{ fontSize: 20, marginBottom: 12, color: 'var(--primary)' }}>{currentTopic.title}</h2>
                <div style={{ lineHeight: 1.6, color: 'var(--text-high)', fontSize: 14, marginBottom: 20 }}>
                  {currentTopic.theory}
                </div>

                <div style={{ padding: 16, background: 'var(--bg-deep)', borderRadius: 12, border: '1px solid var(--primary-low)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--primary)' }}>TASK {questionIdx + 1}/5</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {[...Array(5)].map((_, i) => (
                        <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i < questionIdx ? 'var(--primary)' : i === questionIdx ? 'var(--primary-low)' : 'var(--bg-soft)' }} />
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-high)' }}>
                    {currentQuestion?.text}
                  </div>
                </div>

                {isSuccess && (
                  <button 
                    className="btn btn-primary" 
                    onClick={nextQuestion}
                    style={{ width: '100%', marginTop: 20, padding: '12px' }}
                  >
                    CONTINUE →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Middle Column: IDE (Editor + Terminal) */}
          <div className="course-pane ide-pane">
            <div className="editor-container">
              <div className="editor-header">
                <span style={{ fontSize: 11, fontWeight: 800 }}>main.{lang === 'javascript' ? 'js' : lang === 'python' ? 'py' : lang === 'typescript' ? 'ts' : lang === 'cpp' ? 'cpp' : lang === 'csharp' ? 'cs' : lang === 'rust' ? 'rs' : lang}</span>
                <button className="btn btn-primary btn-sm" onClick={runCode} style={{ padding: '4px 12px', fontSize: 10 }}>▶ RUN CODE</button>
              </div>
              <div className="editor-scroll">
                <MonacoEditor
                  height="100%"
                  language={lang === 'python' ? 'python' : lang === 'javascript' ? 'javascript' : lang === 'typescript' ? 'typescript' : lang === 'cpp' ? 'cpp' : lang === 'csharp' ? 'csharp' : lang === 'rust' ? 'rust' : lang === 'sql' ? 'sql' : 'plaintext'}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: 'var(--font-mono)',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 20 }
                  }}
                />
              </div>
            </div>

            <div className="terminal-container">
              <div className="editor-header" style={{ borderBottom: 'none', background: 'rgba(0,0,0,0.3)' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-med)' }}>TERMINAL OUTPUT</span>
              </div>
              <pre className="terminal-body" style={{ color: isSuccess ? 'var(--primary)' : 'var(--text-high)' }}>{output}</pre>
            </div>
          </div>

          {/* Right Column: AI Assistant Space */}
          <div className="course-pane ai-pane">
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.5 }}>
              <Bunny size={60} mood={isSuccess ? "happy" : "cool"} animate />
              <div style={{ marginTop: 16, fontWeight: 800, fontSize: 12, color: 'var(--primary)' }}>AI ASSISTANT</div>
              <div style={{ fontSize: 10, maxWidth: 160, marginTop: 8 }}>
                {isSuccess ? "Excellent work! You've mastered this task." : "I'm here to help if you get stuck with the patterns."}
              </div>
            </div>
          </div>

        </div>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
