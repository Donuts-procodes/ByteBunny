import { useState, useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useAppStore } from '../stores/enhanced-appStore';
import { COURSE_DATA, LANGUAGES, DIFFICULTY_LEVELS } from '../data/courses';
import { SettingsModal, Bunny } from '../components/UI';
import { getAICodingAssistance, generateCourseTopic, validateCourseCode } from '../lib/ai';

export default function CoursePage() {
  const { setPage, addToast } = useAppStore();
  const selection = useAppStore((s) => s.courseSelection);
  
  const lang = selection.lang;
  const level = selection.level;

  const [topicIdx, setTopicIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('// Terminal output will appear here...');
  const [showSettings, setShowSettings] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Curriculum Expansion State
  const [bonusTopics, setBonusTopics] = useState([]);
  const [isGeneratingTopic, setIsGeneratingTopic] = useState(false);

  // Layout & Resizing State
  const [activeTab, setActiveTab] = useState('code'); 
  const [lessonCollapsed, setLessonCollapsed] = useState(false);
  const [aiCollapsed, setAiCollapsed] = useState(false);
  
  const [lessonWidth, setLessonWidth] = useState(280);
  const [aiWidth, setAiWidth] = useState(260);
  const [terminalHeight, setTerminalHeight] = useState(180);

  const isResizing = useRef(null); // 'lesson', 'ai', 'terminal'

  const startResizing = (direction) => (e) => {
    e.preventDefault();
    isResizing.current = direction;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
    document.body.style.cursor = direction === 'terminal' ? 'row-resize' : 'col-resize';
  };

  const stopResizing = () => {
    isResizing.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'default';
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    if (isResizing.current === 'lesson') {
      const newWidth = Math.max(200, Math.min(600, e.clientX));
      setLessonWidth(newWidth);
    } else if (isResizing.current === 'ai') {
      const newWidth = Math.max(200, Math.min(600, window.innerWidth - e.clientX));
      setAiWidth(newWidth);
    } else if (isResizing.current === 'terminal') {
      const newHeight = Math.max(80, Math.min(window.innerHeight * 0.8, window.innerHeight - e.clientY));
      setTerminalHeight(newHeight);
    }
  };

  // AI Assistant Chat State
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your AI coding buddy. Need help with this task? Just ask!" }
  ]);
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!prompt.trim() || isTyping) return;

    const userMsg = { role: 'user', content: prompt };
    const currentMessages = [...messages, userMsg];
    setMessages(currentMessages);
    setPrompt('');
    setIsTyping(true);

    try {
      const context = {
        lang,
        topic: currentTopic?.title,
        question: currentQuestion?.text,
        code
      };
      
      const aiResponse = await getAICodingAssistance(context, currentMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to my brain right now. 🐰🔌" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleGenerateBonus = async () => {
    if (isGeneratingTopic) return;
    setIsGeneratingTopic(true);
    addToast("Burrowing for new lessons... 🐰🥕", "info");
    
    try {
      const existingTitles = [...topics.map(t => t.title), ...bonusTopics.map(t => t.title)];
      const newTopic = await generateCourseTopic(lang, level, existingTitles);
      setBonusTopics(prev => [...prev, newTopic]);
      addToast("Hoppy News! New bonus topic added! ✨", "success");
    } catch (err) {
      addToast("Failed to generate topic. Try again!", "error");
    } finally {
      setIsGeneratingTopic(false);
    }
  };

  const baseTopics = COURSE_DATA[lang]?.[level] || [];
  const topics = [...baseTopics, ...bonusTopics];
  const currentTopic = topics[topicIdx];
  const currentQuestion = currentTopic?.questions[questionIdx];

  useEffect(() => {
    if (currentQuestion) {
      setCode(currentQuestion.defaultCode || '');
      setOutput(`// Started: ${currentTopic.title}\n// Question ${questionIdx + 1}: ${currentQuestion.text}`);
      setIsSuccess(false);
    }
  }, [lang, level, topicIdx, questionIdx]);

  const runCode = async () => {
    if (!currentQuestion) return;

    // Refresh output immediately
    setOutput("[Running...]\n> Checking your code with ByteBunny AI... 🐰🔍");
    setIsSuccess(false);

    try {
      const result = await validateCourseCode(
        lang, 
        currentTopic?.title, 
        currentQuestion?.text, 
        code
      );

      setIsSuccess(result.success);
      setOutput(`[Running ${lang}...]\n> ${result.success ? 'SUCCESS' : 'FAILURE'}: ${result.feedback}`);
      
      if (result.success) {
        addToast("Hoppy Coding! Task completed! 🥕✨", "success");
      } else {
        addToast("Not quite right yet! Try again. 🐰", "error");
      }
    } catch (err) {
      console.error("AI Validation failed, falling back to regex:", err);
      // Fallback to local regex pattern check
      const pattern = currentQuestion.expectedPattern;
      const isValid = pattern.test(code);

      if (isValid) {
        setOutput(`[Running ${lang}...]\n> Success! (Local check)\n\nGreat job! You can now move to the next question.`);
        setIsSuccess(true);
      } else {
        setOutput(`[Running ${lang}...]\n> Failure: Code did not match the expected pattern.\n\nTry again! Check your syntax or logic.`);
        setIsSuccess(false);
      }
    }
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
      <div className="topbar" style={{ gap: 12, padding: '8px 16px' }}>
        <button 
          className="btn btn-ghost btn-sm" 
          onClick={() => setPage('course-menu')}
          style={{ minWidth: 40, padding: 8, fontSize: 16 }}
        >
          ←
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>{activeLangIcon}</span>
          <div className="hide-mobile">
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{lang?.toUpperCase() || ''}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-med)', textTransform: 'uppercase' }}>{level}</div>
          </div>
        </div>

        <div className="course-tabs-mobile" style={{ display: 'none', flex: 1, justifyContent: 'center', gap: 4 }}>
          <button className={`tab-btn ${activeTab === 'lesson' ? 'active' : ''}`} onClick={() => setActiveTab('lesson')}>Lesson</button>
          <button className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')}>Code</button>
          <button className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>AI Buddy</button>
        </div>

        <div style={{ flex: 1 }} className="hide-mobile" />
        <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ padding: '8px', minWidth: 40 }}>⚙️</button>
      </div>

      {/* Main Resizable Layout */}
      <div className="page-content-full" style={{ paddingBottom: 0, overflow: 'hidden' }}>
        <div 
          className={`course-grid-resizable active-tab-${activeTab}`} 
          style={{ 
            display: 'flex',
            height: 'calc(100vh - 56px)',
            background: 'var(--border)'
          }}
        >
          
          {/* Left Column: Lesson Content */}
          {!lessonCollapsed && (
            <div 
              className={`course-pane lesson-pane ${activeTab === 'lesson' ? 'show-mobile' : 'hide-mobile'}`}
              style={{ width: lessonWidth, flexShrink: 0, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>📑</span> CURRICULUM
                </div>
                <button className="btn-icon-sm hide-mobile" onClick={() => setLessonCollapsed(true)}>«</button>
              </div>
              
              <div className="curriculum-list" style={{ marginBottom: 24, maxHeight: '30%', overflowY: 'auto' }}>
                {topics.map((t, idx) => (
                  <button 
                    key={t.id}
                    onClick={() => { setTopicIdx(idx); setQuestionIdx(0); if(window.innerWidth < 1024) setActiveTab('code'); }}
                    className={`curriculum-item ${topicIdx === idx ? 'active' : ''}`}
                  >
                    <span style={{ fontSize: 14, marginRight: 8 }}>{topicIdx === idx ? '📖' : '📁'}</span>
                    <span className="text-truncate">{t.title}</span>
                  </button>
                ))}
                
                <button 
                  className="curriculum-item" 
                  onClick={handleGenerateBonus}
                  disabled={isGeneratingTopic}
                  style={{ border: '1px dashed var(--primary-low)', color: 'var(--primary)', background: 'rgba(0,255,136,0.03)' }}
                >
                  <span style={{ fontSize: 14, marginRight: 8 }}>✨</span>
                  <span>{isGeneratingTopic ? "Generating..." : "Generate More Topics"}</span>
                </button>
              </div>

              {currentTopic && (
                <div className="animate-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ 
                    padding: 16, 
                    background: 'linear-gradient(135deg, var(--bg-deep) 0%, var(--bg-soft) 100%)', 
                    borderRadius: 12, 
                    border: '1px solid var(--border)',
                    marginBottom: 16
                  }}>
                    <h2 style={{ fontSize: 18, marginBottom: 8, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>📚</span> {currentTopic.title}
                    </h2>
                    <div style={{ 
                      lineHeight: 1.6, 
                      color: 'var(--text-high)', 
                      fontSize: 13, 
                      maxHeight: '150px', 
                      overflowY: 'auto',
                      paddingRight: 8
                    }} className="scroll-area">
                      {currentTopic.theory}
                    </div>
                  </div>

                  <div style={{ 
                    padding: 16, 
                    background: 'var(--bg-deep)', 
                    borderRadius: 12, 
                    border: '1px solid var(--primary-low)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--primary)', letterSpacing: 1 }}>🎯 TASK {questionIdx + 1}/5</span>
                      {isSuccess && <span style={{ fontSize: 12 }}>✅</span>}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-high)', lineHeight: 1.5 }}>
                      {currentQuestion?.text}
                    </div>
                  </div>

                  {isSuccess && (
                    <button 
                      className="btn btn-primary" 
                      onClick={() => { nextQuestion(); if(window.innerWidth < 1024) setActiveTab('code'); }}
                      style={{ width: '100%', marginTop: 16, padding: '12px', fontWeight: 800, letterSpacing: 1 }}
                    >
                      CONTINUE TO NEXT →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Left Resizer */}
          {!lessonCollapsed && <div className="resizer-v hide-mobile" onMouseDown={startResizing('lesson')} />}

          {/* Middle Column: IDE */}
          <div className={`course-pane ide-pane ${activeTab === 'code' ? 'show-mobile' : 'hide-mobile'}`} style={{ flex: 1 }}>
            <div className="editor-container" style={{ flex: 1 }}>
              <div className="editor-header">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {lessonCollapsed && <button className="btn-icon-sm" onClick={() => setLessonCollapsed(false)}>»</button>}
                  <span style={{ fontSize: 10, fontWeight: 800 }}>main.{lang === 'javascript' ? 'js' : lang === 'python' ? 'py' : lang === 'typescript' ? 'ts' : lang === 'cpp' ? 'cpp' : lang === 'csharp' ? 'cs' : lang === 'rust' ? 'rs' : lang}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button className="btn btn-primary btn-sm" onClick={runCode} style={{ padding: '4px 10px', fontSize: 10 }} title="Shortcut: Shift + Enter">▶ RUN</button>
                  {aiCollapsed && <button className="btn-icon-sm" onClick={() => setAiCollapsed(false)}>«</button>}
                </div>
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

            {/* Terminal Resizer */}
            <div className="resizer-h hide-mobile" onMouseDown={startResizing('terminal')} />

            <div className="terminal-container" style={{ height: activeTab === 'code' ? terminalHeight : '180px' }}>
              <div className="editor-header" style={{ borderBottom: 'none', background: 'rgba(0,0,0,0.3)', height: 28 }}>
                <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-med)' }}>TERMINAL OUTPUT</span>
              </div>
              <pre className="terminal-body" style={{ color: isSuccess ? 'var(--primary)' : 'var(--text-high)', fontSize: 12 }}>{output}</pre>
            </div>
          </div>

          {/* Right Resizer */}
          {!aiCollapsed && <div className="resizer-v hide-mobile" onMouseDown={startResizing('ai')} />}

          {/* Right Column: AI Assistant */}
          {!aiCollapsed && (
            <div 
              className={`course-pane ai-pane ${activeTab === 'ai' ? 'show-mobile' : 'hide-mobile'}`} 
              style={{ width: aiWidth, background: 'var(--bg-deep)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}
            >
              <div className="editor-header" style={{ borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.3)' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--primary)' }}>AI ASSISTANT 🐰</span>
                </div>
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
                    border: msg.role === 'user' ? '1px solid var(--border)' : '1px solid var(--primary-low)',
                    fontSize: 12,
                    lineHeight: 1.4,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {msg.content}
                  </div>
                ))}
                {isTyping && (
                  <div className="pulse-text" style={{ fontSize: 10, color: 'var(--text-med)', paddingLeft: 4 }}>
                    Typing...
                  </div>
                )}
              </div>

              <div style={{ padding: 10, borderTop: '1px solid var(--border)', display: 'flex', gap: 6 }}>
                <input 
                  className="input" 
                  placeholder="Ask..." 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  style={{ fontSize: 12, padding: '8px 12px' }}
                />
                <button className="btn btn-primary btn-sm" onClick={handleSendMessage} style={{ padding: '8px', minWidth: 40 }}>
                  🚀
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
