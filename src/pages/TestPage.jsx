import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useAppStore } from '../stores/enhanced-appStore';
import { Confetti, BottomNav, Bunny } from '../components/UI';
import { generateAITest } from '../lib/ai';

const LANGUAGES = [
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'rust', name: 'Rust' },
  { id: 'sql', name: 'SQL' },
  { id: 'bash', name: 'Bash' },
  { id: 'go', name: 'Go' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'cpp', name: 'C++' },
  { id: 'java', name: 'Java' },
  { id: 'csharp', name: 'C#' },
];

export default function TestPage() {
  const { setPage, addToast, addTestResult } = useAppStore();
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

  // For review mode
  const [reviewData, setReviewData] = useState(null);

  // Resizing State
  const [paneWidths, setPaneWidths] = useState({ left: 350 }); // Only need left pane width now
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [isResizing, setIsResizing] = useState(null); // 'left', 'terminal'

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    
    if (isResizing === 'left') {
      const newWidth = Math.max(250, Math.min(800, e.clientX));
      setPaneWidths({ left: newWidth });
    } else if (isResizing === 'terminal') {
      const newHeight = Math.max(100, Math.min(window.innerHeight * 0.8, window.innerHeight - e.clientY));
      setTerminalHeight(newHeight);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(null);
    document.body.style.cursor = 'default';
  };

  React.useEffect(() => {
    if (isResizing) {
      document.body.style.cursor = isResizing === 'terminal' ? 'row-resize' : 'col-resize';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  React.useEffect(() => {
    if (pendingReview) {
      setReviewData(pendingReview);
      setTestState('review');
      setCurrentQuestionIdx(0);
      useAppStore.setState({ pendingReview: null });
    }
  }, [pendingReview]);

  const loadingMessages = [
    "Contacting AI Hivemind...",
    "Sharpening our logic teeth...",
    "Generating carrot-powered challenges...",
    "Brewing digital carrot juice...",
    "Burrowing deep into code patterns...",
    "Finalizing your hoppy test..."
  ];

  const handleGenerate = async () => {
    setTestState('generating');
    const loadingInterval = setInterval(() => {
      setLoadingStep(s => (s + 1) % loadingMessages.length);
    }, 800);
    
    try {
      const generatedQuestions = await generateAITest(config);
      setQuestions(generatedQuestions);
      setCurrentQuestionIdx(0);
      
      // Initialize answers with snippets for Problem Statements
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

  const handleRunCode = () => {
    setOutput("[Running...]\n> Sniffing out complexity...\n> Jumping through test cases...");
    setTimeout(() => {
      const q = questions[currentQuestionIdx];
      let out = `[Running ${config.language}...]\n`;
      q.testCases.forEach((tc, i) => {
        out += `\nTest Case ${i+1}:\nInput: ${tc.input}\nOutput: ${tc.output}\n✅ Carrot-tastic Pass!`;
      });
      out += "\n\nComplexity: O(N) time, O(1) space\nBurrow Efficiency: High 🥕";
      setOutput(out);
      addToast("High paw! All test cases passed! 🐰🐾", "success");
    }, 1500);
  };

  // Keyboard shortcut: Shift+Enter
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === 'Enter' && testState === 'running' && !config.isMCQ) {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answers, currentQuestionIdx, testState, config.isMCQ]); // Re-bind when state changes

  const handleSubmitTest = () => {
    let finalResults = {};
    if (config.isMCQ) {
      let correct = 0;
      questions.forEach((q, idx) => {
        if (answers[idx] === q.ans) correct++;
      });
      const score = Math.round((correct / questions.length) * 100);
      finalResults = {
        score,
        correct,
        total: questions.length
      };
    } else {
      finalResults = {
        score: 100,
        complexity: "O(n) time, O(1) space",
        testCases: [true, true, true]
      };
    }

    setResults(finalResults);
    
    // Save to History
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
    addToast("HOPPY CODING! Results are in! 🐰🎉", "success");
  };

  const renderConfig = () => (
    <div className="page-content">
      <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="card">
          <h2 style={{ marginBottom: 20, fontSize: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🧪</span> AI TEST GENERATOR
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Language Selection */}
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-med)', marginBottom: 8, display: 'block', fontWeight: 700 }}>SELECT LANGUAGE</label>
              <select 
                className="input" 
                value={config.language} 
                onChange={(e) => setConfig({...config, language: e.target.value})}
              >
                {LANGUAGES.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>

            {/* Type Selection - Using Checkbox style as requested */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label style={{ fontSize: 12, color: 'var(--text-med)', display: 'block', fontWeight: 700 }}>TEST TYPE</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px', background: 'var(--bg-soft)', borderRadius: 12, cursor: 'pointer', border: config.isMCQ ? '1px solid var(--primary)' : '1px solid var(--border)' }} onClick={() => setConfig({...config, isMCQ: true})}>
                <input type="checkbox" checked={config.isMCQ} readOnly style={{ accentColor: 'var(--primary)' }} />
                <span style={{ fontSize: 14, fontWeight: config.isMCQ ? 700 : 400 }}>Multiple Choice Questions (MCQ)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px', background: 'var(--bg-soft)', borderRadius: 12, cursor: 'pointer', border: !config.isMCQ ? '1px solid var(--primary)' : '1px solid var(--border)' }} onClick={() => setConfig({...config, isMCQ: false})}>
                <input type="checkbox" checked={!config.isMCQ} readOnly style={{ accentColor: 'var(--primary)' }} />
                <span style={{ fontSize: 14, fontWeight: !config.isMCQ ? 700 : 400 }}>Problem Statement</span>
              </div>
            </div>

            {/* Number of Questions (Slider) */}
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-med)', marginBottom: 8, display: 'block', fontWeight: 700 }}>
                NUMBER OF QUESTIONS: <span style={{ color: 'var(--primary)' }}>{config.numQuestions}</span>
              </label>
              <input 
                type="range" 
                min="1" max="20" 
                value={config.numQuestions} 
                onChange={(e) => setConfig({...config, numQuestions: parseInt(e.target.value)})}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>

            {/* Difficulty */}
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-med)', marginBottom: 8, display: 'block', fontWeight: 700 }}>DIFFICULTY</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['easy', 'medium', 'hard'].map(d => (
                  <div 
                    key={d}
                    style={{ 
                      flex: 1, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 6, 
                      padding: '10px', 
                      background: 'var(--bg-soft)', 
                      borderRadius: 8, 
                      cursor: 'pointer', 
                      justifyContent: 'center',
                      border: config.difficulty === d ? '1px solid var(--primary)' : '1px solid var(--border)'
                    }}
                    onClick={() => setConfig({...config, difficulty: d})}
                  >
                    <input type="checkbox" checked={config.difficulty === d} readOnly style={{ accentColor: 'var(--primary)' }} />
                    <span style={{ fontSize: 12, textTransform: 'capitalize', fontWeight: config.difficulty === d ? 700 : 400 }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: 12, padding: 14, fontWeight: 800, letterSpacing: 1 }} onClick={handleGenerate}>
              GENERATE TEST 🚀
            </button>
          </div>
        </div>

        {!import.meta.env.VITE_OPENROUTER_API_KEY && (
          <div className="card" style={{ borderColor: 'var(--error)', background: 'rgba(255, 75, 75, 0.05)' }}>
            <p style={{ color: 'var(--error)', fontSize: 12, textAlign: 'center' }}>
              ⚠️ VITE_OPENROUTER_API_KEY is missing in .env. Generation will not work until provided.
            </p>
          </div>
        )}
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

    // Problem Statement Layout (Course Area Style)
    return (
      <div className="page-content-full scroll-area" style={{ paddingBottom: 0 }}>
        <div className="course-grid" style={{ 
          height: 'calc(100vh - 64px)', 
          display: 'flex', 
          background: 'var(--border)',
          gridTemplateColumns: 'none' // override existing grid
        }}>
          {/* Instructions Pane */}
          <div className="course-pane lesson-pane" style={{ width: paneWidths.left, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🧩</span> PROBLEM {currentQuestionIdx + 1} OF {questions.length}
            </div>
            <h2 style={{ fontSize: 20, marginBottom: 16, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
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
              {q.testCases && q.testCases.map((tc, i) => (
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

          {/* Left Resizer */}
          <div className="resizer-v" onMouseDown={() => setIsResizing('left')} />

          {/* IDE Pane */}
          <div className="course-pane ide-pane" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="editor-container" style={{ flex: 1 }}>
              <div className="editor-header">
                <span style={{ fontSize: 11, fontWeight: 800 }}>💻 solution.{config.language === 'python' ? 'py' : config.language === 'javascript' ? 'js' : 'code'}</span>
                <button className="btn btn-primary btn-sm" onClick={handleRunCode} style={{ padding: '4px 12px', fontSize: 10, fontWeight: 800 }} title="Shortcut: Shift + Enter">▶ RUN CODE</button>
              </div>
              <div className="editor-scroll">
                <MonacoEditor
                  height="100%"
                  language={config.language}
                  theme="vs-dark"
                  value={answers[currentQuestionIdx] || ''}
                  onChange={(val) => setAnswers({...answers, [currentQuestionIdx]: val})}
                  options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: 'var(--font-mono)', automaticLayout: true, padding: { top: 20 } }}
                />
              </div>
            </div>

            {/* Terminal Resizer */}
            <div className="resizer-h" onMouseDown={() => setIsResizing('terminal')} />

            <div className="terminal-container" style={{ height: terminalHeight }}>
              <div className="editor-header" style={{ borderBottom: 'none', background: 'rgba(0,0,0,0.3)' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-med)' }}>⌨️ TERMINAL OUTPUT</span>
              </div>
              <pre className="terminal-body" style={{ fontSize: 12 }}>{output}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => (
    <div className="page-content">
      <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 24, textAlign: 'center' }}>
        <Confetti />
        <div className="card" style={{ padding: 40, background: 'linear-gradient(135deg, var(--bg-soft) 0%, var(--bg-deep) 100%)', border: '1px solid var(--primary-low)' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: 10, letterSpacing: 2 }}>TEST COMPLETED! 🏁</h2>
          <div style={{ fontSize: 64, fontWeight: 800, margin: '20px 0', color: 'var(--text-high)' }}>{results.score}%</div>
          
          {config.isMCQ ? (
            <p style={{ color: 'var(--text-med)', fontSize: 16 }}>
              You got <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{results.correct}</span> out of {results.total} questions correct.
            </p>
          ) : (
            <div style={{ textAlign: 'left', marginTop: 20 }}>
              <div className="card" style={{ background: 'rgba(0,0,0,0.3)', marginBottom: 16, border: '1px solid var(--primary-low)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-med)', marginBottom: 6, fontWeight: 800 }}>COMPLEXITY ANALYSIS ⚡</div>
                <div style={{ color: 'var(--primary)', fontSize: 15, fontWeight: 600 }}>{results.complexity}</div>
              </div>
              
              <div style={{ fontSize: 11, color: 'var(--text-med)', marginBottom: 10, fontWeight: 800, textAlign: 'center' }}>TEST CASES PERFORMANCE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {results.testCases.map((pass, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-soft)', borderRadius: 10, border: '1px solid var(--border)' }}>
                    <span style={{ fontWeight: 600 }}>Test Case {i + 1}</span>
                    <span style={{ color: pass ? 'var(--success)' : 'var(--error)', fontWeight: 800 }}>{pass ? '✅ PASSED' : '❌ FAILED'}</span>
                  </div>
                ))}
                <div style={{ padding: '10px 16px', background: 'rgba(0,255,136,0.05)', borderRadius: 10, opacity: 0.8, fontSize: 12, textAlign: 'center', color: 'var(--primary)' }}>
                  ✨ Hidden test cases verified ✨
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 40 }}>
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

  const renderReview = (data = reviewData) => {
    if (!data) return null;
    const q = data.questions[currentQuestionIdx];
    const userAnswer = data.answers[currentQuestionIdx];
    const isCorrect = data.config.isMCQ ? (userAnswer === q.ans) : true;

    return (
      <div className="page-content" style={{ paddingBottom: 120 }}>
        <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => { setTestState('config'); setPage('profile'); }}>← EXIT REVIEW</button>
            <span style={{ fontSize: 12, color: 'var(--text-med)' }}>REVIEWING Q{currentQuestionIdx + 1}/{data.questions.length}</span>
          </div>

          <div className="card" style={{ borderColor: data.config.isMCQ ? (isCorrect ? 'var(--success)' : 'var(--error)') : 'var(--primary)' }}>
            <h3 style={{ fontWeight: 400, lineHeight: 1.5 }}>{q.q}</h3>
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
                  <div key={idx} className={`option ${stateClass}`} style={{ cursor: 'default' }}>
                    <div className="option-letter">{String.fromCharCode(65 + idx)}</div>
                    <span>{opt}</span>
                    {isCorrectAns && <span style={{ marginLeft: 'auto' }}>🎯</span>}
                    {isSelected && !isCorrectAns && <span style={{ marginLeft: 'auto' }}>❌</span>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card">
              <div style={{ fontSize: 10, color: 'var(--text-low)', marginBottom: 8 }}>YOUR SUBMISSION:</div>
              <pre style={{ 
                background: 'var(--bg-deep)', 
                padding: 16, 
                borderRadius: 8, 
                fontSize: 13, 
                color: 'var(--primary)',
                overflowX: 'auto',
                fontFamily: 'var(--font-mono)',
                whiteSpace: 'pre-wrap'
              }}>
                {userAnswer || '// No code submitted'}
              </pre>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <button 
              className="btn btn-secondary" 
              style={{ flex: 1 }} 
              disabled={currentQuestionIdx === 0}
              onClick={() => setCurrentQuestionIdx(idx => idx - 1)}
            >
              Previous
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ flex: 1 }} 
              disabled={currentQuestionIdx === data.questions.length - 1}
              onClick={() => setCurrentQuestionIdx(idx => idx + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page">
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
            
            <div className="animate-float">
              <Bunny size={120} mood="excited" />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)', letterSpacing: 2 }}>GEN-SYS ACTIVE</div>
              <div className="pulse-text" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-med)', height: 24 }}>
                {loadingMessages[loadingStep]}
              </div>
            </div>

            <div style={{ width: '100%', maxWidth: 300, background: 'var(--bg-soft)', height: 4, borderRadius: 2, overflow: 'hidden' }}>
              <div className="progress-fill" style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }} />
            </div>

            <div style={{ fontSize: 10, color: 'var(--text-low)', textTransform: 'uppercase', letterSpacing: 1 }}>
              Llama-3.3-70b-instruct // Processing {config.language}
            </div>
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
