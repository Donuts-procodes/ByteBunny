import { useState, useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useAppStore } from '../stores/enhanced-appStore';
import { COURSE_DATA, LANGUAGES, DIFFICULTY_LEVELS } from '../data/courses';
import { SettingsModal, Bunny } from '../components/UI';
import { getAICodingAssistance, generateCourseTopic, validateCourseCode } from '../lib/ai';

export default function CoursePage() {
  const { setPage, addToast, darkMode } = useAppStore();
  const selection = useAppStore((s) => s.courseSelection);
  const setCourseSelection = useAppStore((s) => s.setCourseSelection);
  
  const lang = selection.lang;
  const level = selection.level;
  const topicIdx = selection.topicIdx || 0;
  const questionIdx = selection.questionIdx || 0;

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('// Terminal output will appear here...');
  const [showSettings, setShowSettings] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  // Layout & Resizing State
  const [activeTab, setActiveTab] = useState('code'); 
  const [lessonCollapsed, setLessonCollapsed] = useState(false);
  const [aiCollapsed, setAiCollapsed] = useState(false);
  
  const [lessonWidth, setLessonWidth] = useState(280);
  const [aiWidth, setAiWidth] = useState(260);
  const [terminalHeight, setTerminalHeight] = useState(180);

  const [isResizingActive, setIsResizingActive] = useState(false);
  const isResizing = useRef(null); // 'lesson', 'ai', 'terminal'
  const gridRef = useRef(null);

  // Curriculum State
  const [bonusTopics, setBonusTopics] = useState([]);
  const [isGeneratingTopic, setIsGeneratingTopic] = useState(false);

  // AI Assistant Chat State
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your AI coding buddy. Need help with this task? Just ask!" }
  ]);
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Persistence: Store code in appStore for each specific question
  const savedCodes = useAppStore((s) => s.courseCodeStorage || {});
  const setSavedCode = (l, lvl, tid, qid, val) => {
    const key = `${l}-${lvl}-${tid}-${qid}`;
    useAppStore.setState((s) => ({
      courseCodeStorage: { ...s.courseCodeStorage, [key]: val }
    }));
  };

  const getSavedCode = (l, lvl, tid, qid) => {
    const key = `${l}-${lvl}-${tid}-${qid}`;
    return savedCodes[key];
  };

  const baseTopics = COURSE_DATA[lang]?.[level] || [];
  const topics = [...baseTopics, ...bonusTopics];
  const currentTopic = topics[topicIdx];
  const currentQuestion = currentTopic?.questions[questionIdx];

  useEffect(() => {
    if (currentQuestion && currentTopic) {
      const saved = getSavedCode(lang, level, currentTopic.id, questionIdx);
      if (saved !== undefined) {
        setCode(saved);
      } else {
        setCode(currentQuestion.defaultCode || '');
      }
      setOutput(`// Started: ${currentTopic.title}\n// Question ${questionIdx + 1}: ${currentQuestion.text}`);
      setIsSuccess(true);
    }
  }, [lang, level, topicIdx, questionIdx, currentTopic?.id]);

  const handleCodeChange = (val) => {
    const newCode = val || '';
    setCode(newCode);
    if (currentTopic) {
      setSavedCode(lang, level, currentTopic.id, questionIdx, newCode);
    }
  };

  useEffect(() => {
    if (!isResizingActive) return;

    const handleMouseMoveGlobal = (e) => {
      if (!isResizing.current || !gridRef.current) return;
      const gridRect = gridRef.current.getBoundingClientRect();

      if (isResizing.current === 'lesson') {
        const newWidth = Math.max(150, Math.min(gridRect.width - 400, e.clientX - gridRect.left));
        setLessonWidth(newWidth);
      } else if (isResizing.current === 'ai') {
        const newWidth = Math.max(150, Math.min(gridRect.width - 400, gridRect.right - e.clientX));
        setAiWidth(newWidth);
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

  const handleSendMessage = async () => {
    if (!prompt.trim() || isTyping) return;
    const userMsg = { role: 'user', content: prompt };
    const currentMessages = [...messages, userMsg];
    setMessages(currentMessages);
    setPrompt('');
    setIsTyping(true);
    try {
      const context = { lang, topic: currentTopic?.title, question: currentQuestion?.text, code };
      const aiResponse = await getAICodingAssistance(context, currentMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, logic ears are ringing! 🐰🔌" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleGenerateBonus = async () => {
    if (isGeneratingTopic) return;
    setIsGeneratingTopic(true);
    addToast("Burrowing for new lessons... 🐰🥕", "info");
    try {
      const existingTitles = topics.map(t => t.title);
      const newTopic = await generateCourseTopic(lang, level, existingTitles);
      setBonusTopics(prev => [...prev, newTopic]);
      addToast("Hoppy News! New bonus topic added! ✨", "success");
    } catch (err) {
      addToast("Failed to generate topic.", "error");
    } finally {
      setIsGeneratingTopic(false);
    }
  };

  const runCode = async () => {
    if (!currentQuestion) return;
    setOutput("[Running...]\n> Checking your code with ByteBunny AI... 🐰🔍");
    setIsSuccess(false);
    try {
      const result = await validateCourseCode(lang, currentTopic?.title, currentQuestion?.text, code);
      setIsSuccess(result.success);
      setOutput(`[Running ${lang}...]\n> ${result.success ? 'SUCCESS' : 'FAILURE'}: ${result.feedback}`);
      if (result.success) addToast("Hoppy Coding! Task completed! 🥕✨", "success");
      else addToast("Not quite right yet! Try again. 🐰", "error");
    } catch (err) {
      const isValid = currentQuestion.expectedPattern.test(code);
      setIsSuccess(isValid);
      setOutput(`[Running ${lang}...]\n> ${isValid ? 'Success (Local check)' : 'Failure'}`);
    }
  };

  const nextQuestion = () => {
    if (currentTopic?.questions && questionIdx < currentTopic.questions.length - 1) {
      setCourseSelection({ questionIdx: questionIdx + 1 });
    } else if (topicIdx < topics.length - 1) {
      useAppStore.getState().completeCourseLecture(lang, level, currentTopic.id);
      setCourseSelection({ topicIdx: topicIdx + 1, questionIdx: 0 });
    } else {
      useAppStore.getState().completeCourseLecture(lang, level, currentTopic.id);
      setOutput("// Course level completed! 🎉");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === 'Enter') { e.preventDefault(); runCode(); }
      if (e.ctrlKey && e.key === 'Enter' && isSuccess) { e.preventDefault(); nextQuestion(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, isSuccess]);

  const activeLangIcon = LANGUAGES.find(l => l.id === lang)?.icon || '📚';

  return (
    <div className="page">
      {isResizingActive && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, cursor: isResizing.current === 'terminal' ? 'row-resize' : 'col-resize', background: 'transparent' }} />
      )}

      <div className="topbar" style={{ gap: 12, padding: '8px 16px' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setPage('course-menu')} style={{ minWidth: 40, padding: 8, fontSize: 16 }}>←</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>{activeLangIcon}</span>
          <div className="hide-mobile">
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{lang?.toUpperCase() || ''}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-med)', textTransform: 'uppercase' }}>{level}</div>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ padding: '8px', minWidth: 40 }}>⚙️</button>
      </div>

      <div className="page-content-full" style={{ paddingBottom: 0, overflow: 'hidden' }}>
        <div className="course-grid" ref={gridRef} style={{ display: 'flex', height: 'calc(100vh - 64px)', background: 'var(--border)', gridTemplateColumns: 'none' }}>
          
          {!lessonCollapsed && (
            <div className={`course-pane lesson-pane ${activeTab === 'lesson' ? 'show-mobile' : 'hide-mobile'}`} style={{ width: lessonWidth, flexShrink: 0, overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}><span>📑</span> CURRICULUM</div>
                <button className="btn-icon-sm hide-mobile" onClick={() => setLessonCollapsed(true)}>«</button>
              </div>
              <div className="curriculum-list" style={{ marginBottom: 20, maxHeight: '160px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 8, padding: 4 }}>
                {topics.map((t, idx) => (
                  <button key={t.id} onClick={() => setCourseSelection({ topicIdx: idx, questionIdx: 0 })} className={`curriculum-item ${topicIdx === idx ? 'active' : ''}`}>
                    <span style={{ fontSize: 14, marginRight: 8 }}>{topicIdx === idx ? '📖' : '📁'}</span>
                    <span className="text-truncate">{t.title}</span>
                  </button>
                ))}
                <button className="curriculum-item" onClick={handleGenerateBonus} disabled={isGeneratingTopic} style={{ border: '1px dashed var(--primary-low)', color: 'var(--primary)', background: 'rgba(0,255,136,0.03)' }}>
                  <span>✨ {isGeneratingTopic ? "Generating..." : "Generate More"}</span>
                </button>
              </div>
              {currentTopic && (
                <div className="animate-in">
                  <div style={{ padding: 16, background: 'linear-gradient(135deg, var(--bg-deep) 0%, var(--bg-soft) 100%)', borderRadius: 12, border: '1px solid var(--border)', marginBottom: 16 }}>
                    <h2 style={{ fontSize: 18, marginBottom: 8, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 8 }}><span>📚</span> {currentTopic.title}</h2>
                    <div style={{ lineHeight: 1.6, color: 'var(--text-high)', fontSize: 13, maxHeight: '140px', overflowY: 'auto' }} className="scroll-area">{currentTopic.theory}</div>
                  </div>
                  <div style={{ padding: 16, background: 'var(--bg-deep)', borderRadius: 12, border: '1px solid var(--primary-low)', marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--primary)' }}>🎯 TASK {questionIdx + 1}/5</span>
                      {isSuccess && <span>✅</span>}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-high)' }}>{currentQuestion?.text}</div>
                  </div>
                  {isSuccess && (
                    <button className="btn btn-primary" onClick={nextQuestion} style={{ width: '100%', padding: '12px', fontWeight: 800 }}>CONTINUE →</button>
                  )}
                </div>
              )}
            </div>
          )}

          {!lessonCollapsed && <div className="resizer-v hide-mobile" onMouseDown={startResizing('lesson')} />}

          <div className="course-pane ide-pane" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="editor-container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="editor-header">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {lessonCollapsed && <button className="btn-icon-sm" onClick={() => setLessonCollapsed(false)}>»</button>}
                  <span style={{ fontSize: 10, fontWeight: 800 }}>main.{lang}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary btn-sm" onClick={runCode}>▶ RUN</button>
                  {aiCollapsed && <button className="btn-icon-sm" onClick={() => setAiCollapsed(false)}>«</button>}
                </div>
              </div>
              <div className="editor-scroll" style={{ flex: 1, position: 'relative' }}>
                {isResizingActive && <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'transparent' }} />}
                <MonacoEditor
                  height="100%"
                  language={lang}
                  theme={darkMode ? "vs-dark" : "light"}
                  value={code}
                  onChange={handleCodeChange}
                  options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: 'var(--font-mono)', automaticLayout: true, padding: { top: 20 } }}
                />
              </div>
            </div>
            <div className="resizer-h hide-mobile" onMouseDown={startResizing('terminal')} />
            <div className="terminal-container" style={{ height: terminalHeight }}>
              <div className="editor-header" style={{ borderBottom: 'none', background: 'rgba(0,0,0,0.3)', height: 28 }}>
                <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-med)' }}>⌨️ TERMINAL</span>
              </div>
              <pre className="terminal-body" style={{ color: isSuccess ? 'var(--primary)' : 'var(--error)', fontSize: 12 }}>{output}</pre>
            </div>
          </div>

          {!aiCollapsed && <div className="resizer-v hide-mobile" onMouseDown={startResizing('ai')} />}

          {!aiCollapsed && (
            <div className="course-pane ai-pane" style={{ width: aiWidth, background: 'var(--bg-deep)', display: 'flex', flexDirection: 'column' }}>
              <div className="editor-header">
                <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--primary)' }}>AI BUDDY 🐰</span>
                <button className="btn-icon-sm hide-mobile" onClick={() => setAiCollapsed(true)}>»</button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }} className="scroll-area">
                {messages.map((msg, i) => (
                  <div key={i} style={{ 
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '90%',
                    background: msg.role === 'user' ? 'var(--bg-soft)' : 'rgba(0,255,136,0.05)',
                    padding: '8px 12px',
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    fontSize: 12
                  }}>{msg.content}</div>
                ))}
                {isTyping && <div className="pulse-text" style={{ fontSize: 10, color: 'var(--text-med)' }}>Typing...</div>}
              </div>
              <div style={{ padding: 10, borderTop: '1px solid var(--border)', display: 'flex', gap: 6 }}>
                <input className="input" placeholder="Ask..." value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} style={{ fontSize: 12 }} />
                <button className="btn btn-primary btn-sm" onClick={handleSendMessage}>🚀</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
