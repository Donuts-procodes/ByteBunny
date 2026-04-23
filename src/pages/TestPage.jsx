import React, { useState, useMemo } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useAppStore } from '../stores/enhanced-appStore';
import { Confetti, BottomNav, Bunny } from '../components/UI';
import { generateAITest, validateTestCode } from '../lib/ai';

const LANGUAGES = [
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡' },
  { id: 'rust', name: 'Rust', icon: '🦀' },
  { id: 'sql', name: 'SQL', icon: '🗄️' },
  { id: 'bash', name: 'Bash', icon: '🔧' },
  { id: 'go', name: 'Go', icon: '🐹' },
  { id: 'typescript', name: 'TypeScript', icon: '📘' },
  { id: 'cpp', name: 'C++', icon: '⚙️' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'csharp', name: 'C#', icon: '🎮' },
  { id: 'c', name: 'C', icon: '©️' },
  { id: 'dsa', name: 'DSA', icon: '🧩' },
];

export default function TestPage() {
  const { setPage, addToast, addTestResult, darkMode } = useAppStore();
  const pendingReview = useAppStore(s => s.pendingReview);

  // Test Configuration State
  const [config, setConfig] = useState({
    language: 'python',
    isMCQ: true,
    numQuestions: 5,
    difficulty: 'medium', // easy, medium, hard
  });

  const [testState, setTestState] = useState('config'); // config, generating, running, result, review
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionIdx: selectedOptionIdx }
  const [results, setResults] = useState(null);
  const [output, setOutput] = useState('// Run your code to see results here...');
  const [loadingStep, setLoadingStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(true);

  // For review mode
  const [reviewData, setReviewData] = useState(null);

  // Resizing State
  const [paneWidths, setPaneWidths] = useState({ left: 350 }); 
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [isResizingActive, setIsResizingActive] = useState(false);
  const isResizing = React.useRef(null); // 'left', 'terminal'
  const gridRef = React.useRef(null);

  React.useEffect(() => {
    if (!isResizingActive) return;

    const handleMouseMoveGlobal = (e) => {
      if (!isResizing.current || !gridRef.current) return;
      
      const gridRect = gridRef.current.getBoundingClientRect();

      if (isResizing.current === 'left') {
        const newWidth = Math.max(200, Math.min(gridRect.width - 200, e.clientX - gridRect.left));
        setPaneWidths({ left: newWidth });
      } else if (isResizing.current === 'terminal') {
        const newHeight = Math.max(40, Math.min(gridRect.height - 100, gridRect.bottom - e.clientY));
        setTerminalHeight(newHeight);
      }
    };

    const handleMouseUpGlobal = () => {
      isResizing.current = null;
      setIsResizingActive(false);
      document.body.style.cursor = 'default';
    };

    window.addEventListener('mousemove', handleMouseMoveGlobal);
    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [isResizingActive]);

  const startResizing = (direction) => (e) => {
    e.preventDefault();
    isResizing.current = direction;
    setIsResizingActive(true);
    document.body.style.cursor = direction === 'terminal' ? 'row-resize' : 'col-resize';
  };

  React.useEffect(() => {
    if (pendingReview) {
      setReviewData(pendingReview);
      setTestState('review');
      setCurrentQuestionIdx(0);
      useAppStore.setState({ pendingReview: null });
    }
  }, [pendingReview]);

  const redoQuestion = (idx) => {
    const sourceData = reviewData || { questions, answers, config };
    setQuestions(sourceData.questions);
    setAnswers(sourceData.answers);
    setConfig(sourceData.config);
    setCurrentQuestionIdx(idx);
    setTestState('running');
    setReviewData(null);
    addToast("Time for a redo! Let's get it right this time 🐰✨", "info");
  };

  const handleGenerate = async () => {
    setTestState('generating');
    const loadingInterval = setInterval(() => {
      setLoadingStep(s => (s + 1) % loadingMessages.length);
    }, 800);
    
    try {
      const generatedQuestions = await generateAITest(config);
      setQuestions(generatedQuestions);
      setCurrentQuestionIdx(0);
      
      if (!config.isMCQ) {
        const initialAnswers = {};
        generatedQuestions.forEach((q, idx) => {
          initialAnswers[idx] = q.snippet || '';
        });
        setAnswers(initialAnswers);
      } else {
        setAnswers({});
      }

      setTestState('running');
      addToast("Hoppy News! Test is ready! 🐰✨", "success");
    } catch (err) {
      console.error(err);
      addToast('Failed to burrow: ' + err.message, 'error');
      setTestState('config');
    } finally {
      clearInterval(loadingInterval);
    }
  };

  const handleRunCode = async (isSubmit = false) => {
    setOutput(`[ByteBunny AI Evaluation Engine Active...]\n> Analyzing for correctness, efficiency, and expert parameters...\n> This might take a few logic-hops... 🐰⚙️`);
    setIsSuccess(true);
    
    try {
      const q = questions[currentQuestionIdx];
      const code = answers[currentQuestionIdx] || '';
      const validation = await validateTestCode(config.language, q.q, code, q.testCases);
      
      let out = `[EVALUATION REPORT: ${config.language.toUpperCase()}]\n`;
      out += `Grade: ${validation.score}/100 🥕\n`;
      out += `Complexity: ${validation.complexity}\n`;
      out += `\n--- AI FEEDBACK ---\n${validation.feedback}\n`;
      
      if (validation.errors) {
        out += `\n--- DETECTED ERRORS ---\n${validation.errors}\n`;
      }

      if (validation.testResults && validation.testResults.length > 0) {
        out += `\n--- TEST CASE BREAKDOWN ---\n`;
        validation.testResults.forEach((tr, i) => {
          out += `Case ${i+1}: ${tr.passed ? '✅' : '❌'} ${tr.status}\n`;
          out += `   Input:    ${tr.input}\n`;
          out += `   Expected: ${tr.expected || tr.output}\n`;
          if (tr.actual) out += `   Actual:   ${tr.actual}\n`;
          out += `\n`;
        });
      }

      const passedCount = validation.testResults?.filter(r => r.passed).length || 0;
      const totalCount = validation.testResults?.length || 0;
      out += `\nSUMMARY: ${passedCount}/${totalCount} cases passed successfully.`;

      setOutput(out);
      setIsSuccess(validation.success);

      if (validation.success && validation.score >= 80) {
        addToast(`Carrot-tastic! Scored ${validation.score}! 🐰💎`, "success");
      } else if (validation.success) {
        addToast(`Good hop! Scored ${validation.score}. 🐾`, "success");
      } else {
        addToast(`Whiskers! Scored ${validation.score}. Burrow deeper! 🥕`, "info");
      }

      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIdx] = { ...q, aiResult: validation };
      setQuestions(updatedQuestions);

    } catch (err) {
      console.error(err);
      setOutput("Error: My logic ears are ringing! 🐰🔌\n" + err.message);
      setIsSuccess(false);
      addToast("Failed to validate code.", "error");
    }
  };

  const handleSubmitTest = () => {
    let finalResults = {};
    if (config.isMCQ) {
      let correct = 0;
      questions.forEach((q, idx) => {
        if (answers[idx] === q.ans) correct++;
      });
      const score = Math.round((correct / questions.length) * 100);
      finalResults = { score, correct, total: questions.length };
    } else {
      const totalScore = questions.reduce((acc, q) => acc + (q.aiResult?.score || 0), 0);
      const avgScore = Math.round(totalScore / questions.length);
      finalResults = { score: avgScore, isCodeMode: true, details: questions.map(q => q.aiResult) };
    }

    setResults(finalResults);
    const testRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      config: { ...config },
      questions: [...questions],
      answers: { ...answers },
      results: finalResults
    };
    addTestResult(testRecord);
    setTestState('result');
    
    if (finalResults.score >= 50) {
      addToast("HOPPY CODING! Results are in! 🐰🎉", "success");
    } else {
      addToast("Whiskers! Results are in. Let's try again! 🐰🥕", "info");
    }
  };

  // Keyboard shortcut: Shift+Enter
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === 'Enter' && testState === 'running' && !config.isMCQ) {
        e.preventDefault();
        handleRunCode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answers, currentQuestionIdx, testState, config.isMCQ]);

  const loadingMessages = [
    "Contacting AI Hivemind...",
    "Sharpening our logic teeth...",
    "Generating carrot-powered challenges...",
    "Brewing digital carrot juice...",
    "Burrowing deep into code patterns...",
    "Finalizing your hoppy test..."
  ];

  const renderConfig = () => (
    <div className="page-content scroll-area" style={{ paddingBottom: 120 }}>
      <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="card" style={{ padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid var(--primary-low)', background: 'linear-gradient(180deg, var(--bg-soft) 0%, var(--bg-deep) 100%)' }}>
          <h2 style={{ marginBottom: 32, fontSize: 28, textAlign: 'center', color: 'var(--primary)', letterSpacing: 2, fontWeight: 900 }}>
            <span>🧪</span> AI TEST LAB
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Language Grid */}
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-med)', marginBottom: 16, display: 'block', fontWeight: 800, letterSpacing: 1.5, textAlign: 'center' }}>CHOOSE YOUR DOMAIN</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12 }}>
                {LANGUAGES.map(l => (
                  <div 
                    key={l.id}
                    onClick={() => setConfig({...config, language: l.id})}
                    style={{
                      padding: '16px 8px',
                      borderRadius: 16,
                      background: config.language === l.id ? 'var(--primary-low)' : 'rgba(255,255,255,0.03)',
                      border: '2px solid',
                      borderColor: config.language === l.id ? 'var(--primary)' : 'var(--border)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: config.language === l.id ? 'scale(1.05) translateY(-4px)' : 'none',
                      boxShadow: config.language === l.id ? '0 8px 20px rgba(0,255,136,0.2)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{l.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: config.language === l.id ? 'var(--primary)' : 'var(--text-high)' }}>{l.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Type and Difficulty Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ fontSize: 11, color: 'var(--text-med)', fontWeight: 800, letterSpacing: 1.5 }}>ARCHITECTURE</label>
                <div 
                  style={{ 
                    flex: 1, display: 'flex', alignItems: 'center', gap: 12, padding: '16px', 
                    background: config.isMCQ ? 'var(--primary-low)' : 'var(--bg-soft)', 
                    borderRadius: 16, cursor: 'pointer', border: '2px solid',
                    borderColor: config.isMCQ ? 'var(--primary)' : 'var(--border)',
                    transition: 'all 0.2s'
                  }} 
                  onClick={() => setConfig({...config, isMCQ: true})}
                >
                  <span style={{ fontSize: 20 }}>🔘</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 13, fontWeight: 800 }}>QUIZ</span>
                    <span style={{ fontSize: 9, opacity: 0.6 }}>Logic</span>
                  </div>
                </div>
                <div 
                  style={{ 
                    flex: 1, display: 'flex', alignItems: 'center', gap: 12, padding: '16px', 
                    background: !config.isMCQ ? 'var(--primary-low)' : 'var(--bg-soft)', 
                    borderRadius: 16, cursor: 'pointer', border: '2px solid',
                    borderColor: !config.isMCQ ? 'var(--primary)' : 'var(--border)',
                    transition: 'all 0.2s'
                  }} 
                  onClick={() => setConfig({...config, isMCQ: false})}
                >
                  <span style={{ fontSize: 20 }}>👨‍💻</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 13, fontWeight: 800 }}>CODE</span>
                    <span style={{ fontSize: 9, opacity: 0.6 }}>Solve</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ fontSize: 11, color: 'var(--text-med)', fontWeight: 800, letterSpacing: 1.5 }}>INTENSITY</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  {['easy', 'medium', 'hard'].map(d => (
                    <button 
                      key={d}
                      style={{ 
                        flex: 1, padding: '10px 16px', borderRadius: 12, border: '2px solid',
                        borderColor: config.difficulty === d ? 'var(--primary)' : 'var(--border)',
                        background: config.difficulty === d ? 'var(--primary-low)' : 'var(--bg-soft)',
                        color: config.difficulty === d ? 'var(--primary)' : 'var(--text-med)',
                        fontSize: 11, fontWeight: 800, textTransform: 'uppercase', cursor: 'pointer',
                        textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                      }}
                      onClick={() => setConfig({...config, difficulty: d})}
                    >
                      <span>{d === 'easy' ? '🌱' : d === 'medium' ? '⚡' : '🔥'} {d}</span>
                      {config.difficulty === d && <span style={{ fontSize: 14 }}>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Question Volume Slider */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: 20, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <label style={{ fontSize: 11, color: 'var(--text-med)', fontWeight: 800, letterSpacing: 1.5 }}>CHALLENGE VOLUME</label>
                <div style={{ background: 'var(--primary)', color: 'var(--bg-deep)', padding: '6px 16px', borderRadius: 20, fontSize: 16, fontWeight: 900, boxShadow: '0 4px 15px var(--primary-glow)' }}>
                  {config.numQuestions} Qs
                </div>
              </div>
              <input 
                type="range" 
                min="1" max="20" 
                value={config.numQuestions} 
                onChange={(e) => setConfig({...config, numQuestions: parseInt(e.target.value)})}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 10, color: 'var(--text-low)', fontWeight: 800 }}>
                <span>MINIMALIST</span>
                <span>MARATHON</span>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ padding: '20px', fontSize: 18, fontWeight: 900, letterSpacing: 3, borderRadius: 20, boxShadow: '0 10px 30px rgba(0,255,136,0.3)' }} 
              onClick={handleGenerate}
            >
              INITIATE BURROW 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRunning = () => {
    const q = questions[currentQuestionIdx];
    if (!q) return null;

    if (config.isMCQ) {
      return (
        <div className="page-content">
          <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--text-med)', fontWeight: 800 }}>📑 QUESTION {currentQuestionIdx + 1} OF {questions.length}</span>
              <span className="badge badge-accent">{config.difficulty}</span>
            </div>

            <div className="card" style={{ padding: 24, background: 'linear-gradient(135deg, var(--bg-soft) 0%, var(--bg-deep) 100%)' }}>
              <h3 style={{ fontWeight: 400, lineHeight: 1.6, fontSize: 18 }}>{q.q}</h3>
            </div>

            <div className="options-container">
              {q.opts.map((opt, idx) => (
                <button
                  key={idx}
                  className={`option ${answers[currentQuestionIdx] === idx ? 'selected' : ''}`}
                  onClick={() => setAnswers({...answers, [currentQuestionIdx]: idx})}
                  style={{ padding: '16px 20px' }}
                >
                  <div className="option-letter">{String.fromCharCode(65 + idx)}</div>
                  <span style={{ fontSize: 15 }}>{opt}</span>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
              {currentQuestionIdx > 0 && (
                <button className="btn btn-secondary" style={{ flex: 1, padding: 14 }} onClick={() => setCurrentQuestionIdx(idx => idx - 1)}>
                  ← BACK
                </button>
              )}
              {currentQuestionIdx < questions.length - 1 ? (
                <button className="btn btn-primary" style={{ flex: 1, padding: 14, fontWeight: 800 }} onClick={() => setCurrentQuestionIdx(idx => idx + 1)}>
                  NEXT →
                </button>
              ) : (
                <button className="btn btn-primary" style={{ flex: 1, padding: 14, fontWeight: 800 }} onClick={handleSubmitTest}>
                  SUBMIT TEST ✨
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="page-content-full scroll-area" style={{ paddingBottom: 0 }}>
        <div className="course-grid" ref={gridRef} style={{ 
          height: 'calc(100vh - 64px)', 
          display: 'flex', 
          background: 'var(--border)',
          gridTemplateColumns: 'none'
        }}>
          <div className="course-pane lesson-pane" style={{ width: paneWidths.left, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🧩</span> PROBLEM {currentQuestionIdx + 1} OF {questions.length}
            </div>
            <h2 style={{ fontSize: 20, marginBottom: 16, color: 'var(--primary)', display: 'center', alignItems: 'center', gap: 8 }}>
              <span>📄</span> TASK DESCRIPTION
            </h2>
            <div style={{ lineHeight: 1.6, color: 'var(--text-high)', fontSize: 14, marginBottom: 24 }}>
              {q.q}
            </div>

            {q.constraints && q.constraints.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, color: 'var(--warning)', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>⚠️</span> CONSTRAINTS
                </div>
                <ul style={{ paddingLeft: 16, margin: 0, color: 'var(--text-med)', fontSize: 13 }}>
                  {q.constraints.map((c, i) => <li key={i} style={{ marginBottom: 4 }}>{c}</li>)}
                </ul>
              </div>
            )}

            <div style={{ fontSize: 10, color: 'var(--text-med)', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>💡</span> EXAMPLE TEST CASES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {q.testCases && q.testCases.slice(0, 3).map((tc, i) => (
                <div key={i} style={{ padding: 12, background: 'var(--bg-deep)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 9, color: 'var(--primary)', marginBottom: 6, fontWeight: 800 }}>INPUT:</div>
                  <code style={{ fontSize: 12, display: 'block', background: 'rgba(0,0,0,0.2)', padding: 6, borderRadius: 4 }}>{tc.input}</code>
                  <div style={{ fontSize: 9, color: 'var(--xp-blue)', marginTop: 10, marginBottom: 6, fontWeight: 800 }}>OUTPUT:</div>
                  <code style={{ fontSize: 12, display: 'block', background: 'rgba(0,0,0,0.2)', padding: 6, borderRadius: 4 }}>{tc.output}</code>
                </div>
              ))}
            </div>

            <div style={{ flex: 1 }} />
            
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              {currentQuestionIdx > 0 && (
                <button className="btn btn-secondary" style={{ flex: 1, padding: 12 }} onClick={() => setCurrentQuestionIdx(idx => idx - 1)}>← BACK</button>
              )}
              {currentQuestionIdx < questions.length - 1 ? (
                <button className="btn btn-primary" style={{ flex: 1, padding: 12, fontWeight: 800 }} onClick={() => setCurrentQuestionIdx(idx => idx + 1)}>NEXT →</button>
              ) : (
                <button className="btn btn-primary" style={{ flex: 1, padding: 12, fontWeight: 800 }} onClick={handleSubmitTest}>FINISH TEST ✨</button>
              )}
            </div>
          </div>

          <div className="resizer-v" onMouseDown={startResizing('left')} />

          <div className="course-pane ide-pane" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="editor-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div className="editor-header">
                <span style={{ fontSize: 11, fontWeight: 800 }}>💻 solution.{config.language === 'python' ? 'py' : config.language === 'javascript' ? 'js' : 'code'}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleRunCode(false)} style={{ padding: '4px 12px', fontSize: 10, fontWeight: 800, border: '1px solid var(--border)' }} title="Run 3 visible cases (Shortcut: Shift+Enter)">🧪 RUN CODE</button>
                  <button className="btn btn-primary btn-sm" onClick={() => handleRunCode(true)} style={{ padding: '4px 12px', fontSize: 10, fontWeight: 800 }}>🚀 SUBMIT</button>
                </div>
              </div>
              <div className="editor-scroll" style={{ flex: 1, position: 'relative' }}>
                {isResizingActive && (
                  <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'transparent' }} />
                )}
                <MonacoEditor
                  height="100%"
                  language={config.language}
                  theme={darkMode ? "vs-dark" : "light"}
                  value={answers[currentQuestionIdx] || ''}
                  onChange={(val) => setAnswers({...answers, [currentQuestionIdx]: val})}
                  options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: 'var(--font-mono)', automaticLayout: true, padding: { top: 20 } }}
                />
              </div>
            </div>

            <div className="resizer-h" onMouseDown={startResizing('terminal')} />

            <div className="terminal-container" style={{ height: terminalHeight }}>
              <div className="editor-header" style={{ borderBottom: 'none', background: 'rgba(0,0,0,0.3)', height: 28 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-med)' }}>⌨️ TERMINAL OUTPUT</span>
              </div>
              <pre className="terminal-body" style={{ fontSize: 12, color: isSuccess ? 'var(--primary)' : 'var(--error)' }}>{output}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const isPass = results.score >= 50;
    return (
      <div className="page-content scroll-area" style={{ paddingBottom: 160 }}>
        <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 24, textAlign: 'center' }}>
          {isPass && <Confetti />}
          <div className="card" style={{ padding: 40, background: 'linear-gradient(135deg, var(--bg-soft) 0%, var(--bg-deep) 100%)', border: isPass ? '1px solid var(--primary-low)' : '1px solid var(--error)' }}>
            <h2 style={{ color: isPass ? 'var(--primary)' : 'var(--error)', marginBottom: 10, letterSpacing: 2 }}>
              {isPass ? 'TEST COMPLETED! 🏁' : 'TIME TO RE-BURROW! 🥕'}
            </h2>
            <div style={{ fontSize: 64, fontWeight: 800, margin: '20px 0', color: 'var(--text-high)' }}>{results.score}%</div>
            <p style={{ color: 'var(--text-med)', fontSize: 16, marginBottom: 20 }}>
              {isPass 
                ? "Hoppy News! You've jumped through these challenges with grace! 🐾✨" 
                : "Aww, whiskers! This burrow was a bit deep this time. Let's sharpen our logic teeth and try again! 🐰💪"}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 40 }}>
              <button className="btn btn-secondary" style={{ width: '100%', padding: 16, fontWeight: 800 }} onClick={() => { setReviewData({ questions, answers, results, config }); setTestState('review'); }}>
                👁️ REVIEW RESULTS
              </button>
              <button className="btn btn-primary" style={{ width: '100%', padding: 16, fontWeight: 800, letterSpacing: 1 }} onClick={() => setTestState('config')}>
                TAKE ANOTHER TEST 🚀
              </button>
              <button className="btn btn-ghost" style={{ width: '100%', padding: 14, border: '1px solid var(--border)' }} onClick={() => setPage('home')}>
                GO TO HOME 🏠
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReview = (data = reviewData) => {
    if (!data) return null;
    const q = data.questions[currentQuestionIdx];
    const userAnswer = data.answers[currentQuestionIdx];
    const isCorrect = data.config.isMCQ ? (userAnswer === q.ans) : (q.aiResult?.success);

    return (
      <div className="page-content" style={{ paddingBottom: 120 }}>
        <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => { setTestState('config'); setPage('profile'); }}>← EXIT REVIEW</button>
            <div style={{ display: 'flex', gap: 8 }}>
              {!isCorrect && (
                <button className="btn btn-primary btn-sm" onClick={() => redoQuestion(currentQuestionIdx)}>🔄 REDO THIS</button>
              )}
              <span style={{ fontSize: 12, color: 'var(--text-med)', fontWeight: 800, display: 'flex', alignItems: 'center' }}>REVIEWING Q{currentQuestionIdx + 1}/{data.questions.length}</span>
            </div>
          </div>

          <div className="card" style={{ borderColor: isCorrect ? 'var(--success)' : 'var(--error)', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ fontWeight: 400, lineHeight: 1.6, fontSize: 17 }}>{q.q}</h3>
          </div>

          {data.config.isMCQ ? (
            <div className="options-container">
              {q.opts.map((opt, idx) => {
                const isSelected = userAnswer === idx;
                const isCorrectAns = q.ans === idx;
                let stateClass = '';
                if (isCorrectAns) stateClass = 'correct';
                else if (isSelected) stateClass = 'incorrect';
                return (
                  <div key={idx} className={`option ${stateClass}`} style={{ cursor: 'default', padding: '14px 18px' }}>
                    <div className="option-letter">{String.fromCharCode(65 + idx)}</div>
                    <span>{opt}</span>
                    {isCorrectAns && <span style={{ marginLeft: 'auto' }}>🎯</span>}
                    {isSelected && !isCorrectAns && <span style={{ marginLeft: 'auto' }}>❌</span>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ fontSize: 10, color: 'var(--text-low)', padding: '10px 16px', background: 'rgba(0,0,0,0.2)', fontWeight: 800 }}>YOUR SUBMISSION:</div>
              <pre style={{ background: 'var(--bg-deep)', padding: 20, fontSize: 13, color: 'var(--primary)', overflowX: 'auto', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', margin: 0 }}>
                {userAnswer || '// No code submitted'}
              </pre>
              {q.aiResult && (
                <div style={{ padding: 20, borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.1)' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 11, marginBottom: 10 }}>AI EVALUATION: {q.aiResult.score}/100</div>
                  <div style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-high)' }}>{q.aiResult.feedback}</div>
                </div>
              )}
              {!isCorrect && (
                <button className="btn btn-primary" style={{ width: '100%', borderRadius: 0, padding: 14 }} onClick={() => redoQuestion(currentQuestionIdx)}>REDO THIS PROBLEM 🔄</button>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-secondary" style={{ flex: 1, padding: 12 }} disabled={currentQuestionIdx === 0} onClick={() => setCurrentQuestionIdx(idx => idx - 1)}>← PREVIOUS</button>
            <button className="btn btn-secondary" style={{ flex: 1, padding: 12 }} disabled={currentQuestionIdx === data.questions.length - 1} onClick={() => setCurrentQuestionIdx(idx => idx + 1)}>NEXT →</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      {isResizingActive && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, cursor: isResizing.current === 'terminal' ? 'row-resize' : 'col-resize', background: 'transparent' }} />
      )}
      <div className="topbar">
        <div style={{ fontWeight: 800, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)' }}>
          <span>🤖</span> AI TEST LAB
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {testState === 'config' && renderConfig()}
        {testState === 'generating' && (
          <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 30, position: 'relative', overflow: 'hidden' }}>
            <div className="scanning-line" />
            <div className="animate-float"><Bunny size={120} mood="excited" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)', letterSpacing: 2 }}>GEN-SYS ACTIVE</div>
              <div className="pulse-text" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-med)', height: 24 }}>{loadingMessages[loadingStep]}</div>
            </div>
            <div style={{ width: '100%', maxWidth: 300, background: 'var(--bg-soft)', height: 4, borderRadius: 2, overflow: 'hidden' }}>
              <div className="progress-fill" style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }} />
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1 }}>Llama-3.3-70b-instruct // Processing {config.language}</div>
          </div>
        )}
        {testState === 'running' && renderRunning()}
        {testState === 'result' && renderResult()}
        {testState === 'review' && renderReview()}
      </div>
      {(testState === 'config' || testState === 'result' || testState === 'review') && <BottomNav />}
    </div>
  );
}
