// 🐰 ByteBunny Enhanced Level Page v2.0
// Features:
// - Answers never revealed on wrong answer
// - Smart level replay (same difficulty, different question)
// - 300 levels with increasing difficulty
// - Improved heart system and progress tracking

import React, { useState, useEffect } from 'react';
import { useAppStore } from '../stores/enhanced-appStore';
import {
  getLevelByIdAndLanguage,
  getRandomLevelByDifficultyAndLanguage,
  LANGUAGES,
} from '../data/enhanced-levels';
import { Confetti } from '../components/UI';

export function LevelPage() {
  // Global state
  const {
    user,
    progress,
    activeLang,
    streak,
    currentLevelId: storeLevelId,
    completeLevel,
    addToast,
    setPage,
  } = useAppStore();

  // Local state for current play session
  const [currentLevel, setCurrentLevel] = useState(null);
  const [hearts, setHearts] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gamingStatus, setGamingStatus] = useState('Solving...'); // For Duolingo-style status

  const currentLangId = activeLang;
  const currentLevelId = storeLevelId || 1;
  const userProgress = progress[currentLangId] || {};
  const lang = LANGUAGES[currentLangId];

  // ========================================================================
  // INITIALIZATION - Load level on mount or when level changes
  // ========================================================================
  
  useEffect(() => {
    const loadLevel = async () => {
      setLoading(true);
      setShowConfetti(false);
      setGamingStatus('Get ready! 🚀');
      
      // Get the level to display
      let level = getLevelByIdAndLanguage(currentLevelId, currentLangId);

      // Fallback if level doesn't exist
      if (!level) {
        level = getLevelByIdAndLanguage(1, currentLangId);
      }

      if (level) {
        setCurrentLevel(level);
        setHearts(3);
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setAttempts(0);
        setStartTime(Date.now());
      }

      setLoading(false);
    };

    loadLevel();
  }, [currentLevelId, currentLangId]);

  // ========================================================================
  // ANSWER SUBMISSION - Handle answer logic
  // ========================================================================

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || isSubmitted) {
      addToast('⚠️ Select an answer first!', 'warning');
      return;
    }

    setIsSubmitted(true);
    const correct = selectedAnswer === currentLevel.ans;
    setIsCorrect(correct);
    setAttempts(attempts + 1);

    if (correct) {
      // ✅ CORRECT ANSWER
      setShowConfetti(true);
      setShowFeedback(true);
      setGamingStatus('Amazing! 🎯');
      handleCorrectAnswer();
    } else {
      // ❌ WRONG ANSWER
      setShowFeedback(true);
      setGamingStatus('Not quite! 🤔');
      handleWrongAnswer();
    }
  };

  // ========================================================================
  // CORRECT ANSWER LOGIC
  // ========================================================================

  const handleCorrectAnswer = () => {
    const timeTaken = (Date.now() - startTime) / 1000;
    
    // Calculate score: 100% if first try, decreases with attempts
    const scoreDecrease = Math.max(0, (attempts) * 20); 
    const finalScore = Math.max(10, 100 - scoreDecrease);

    const xpEarned = Math.floor((currentLevel.xp * finalScore) / 100);

    // Update user progress using store action
    completeLevel(currentLangId, currentLevelId, finalScore, xpEarned, timeTaken);

    addToast(
      `🎯 Perfect! +${xpEarned} XP! ⚡`,
      'success'
    );

    // Move to next level after 2s
    setTimeout(() => {
      setPage('map');
    }, 2000);
  };

  // ========================================================================
  // WRONG ANSWER LOGIC - Never reveal the correct answer!
  // ========================================================================

  const handleWrongAnswer = () => {
    const newHearts = hearts - 1;
    setHearts(newHearts);

    if (newHearts <= 0) {
      // Out of hearts - level failed
      setGamingStatus('Heart empty! 💔');
      handleLevelFailed();
    } else {
      // Still have hearts - allow retry
      addToast(
        `❌ Oops! ${newHearts} ${newHearts === 1 ? 'heart' : 'hearts'} left!`,
        'error'
      );

      // Reset for retry after 1.5 seconds
      setTimeout(() => {
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setGamingStatus('Keep trying! 💪');
      }, 1500);
    }
  };

  // ========================================================================
  // LEVEL FAILED - Change question but stay on same level/difficulty
  // ========================================================================

  const handleLevelFailed = () => {
    addToast('💔 Out of hearts! New question incoming...', 'error');

    // Get current level's difficulty
    const currentDifficulty = currentLevel.difficulty;

    setTimeout(() => {
      // Stay on current level but fetch a different question from the same difficulty pool
      const newLevel = getRandomLevelByDifficultyAndLanguage(
        currentDifficulty,
        currentLangId
      );

      if (newLevel) {
        // KEEP THE LEVEL ID from the store to satisfy "stay on current level"
        // But use the data (question/opts/ans) from the random level
        setCurrentLevel({
          ...newLevel,
          id: currentLevel.id // Keep the visual level ID
        });
        setHearts(3);
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setAttempts(0);
        setStartTime(Date.now());
        setGamingStatus('Fresh start! 🐰');

        addToast('🔄 Same level, new challenge!', 'info');
      } else {
        setPage('map');
      }
    }, 2000);
  };

  // ========================================================================
  // SKIP LEVEL - Go back to map
  // ========================================================================

  const handleSkipLevel = () => {
    setPage('map');
  };

  // ========================================================================
  // UI RENDERING
  // ========================================================================

  if (loading || !currentLevel) {
    return (
      <div className="level-page loading">
        <div className="loading-spinner">🐰</div>
        <p>Prepping your challenge...</p>
      </div>
    );
  }

  return (
    <div className="page" style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--bg-deep)', display: 'flex', flexDirection: 'column' }}>
      {showConfetti && <Confetti />}
      
      {/* Header - Fixed at top */}
      <div className="topbar" style={{ padding: '12px 18px', flexShrink: 0 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setPage('map')} style={{ padding: '6px', minWidth: 36, fontSize: 22 }}>✕</button>
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div className="progress-bar" style={{ width: '100%', maxWidth: '270px', height: 10 }}>
            <div className="progress-fill" style={{ width: `${(currentLevelId / 300) * 100}%`, background: 'var(--primary)' }} />
          </div>
        </div>

        <div className="hearts-display" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--error)' }}>{hearts}</span>
          <span style={{ fontSize: 20 }}>❤️</span>
        </div>
      </div>

      {/* Main Content Area - Scrollable if needed */}
      <div className="scroll-area animate-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          padding: '24px 20px 40px', 
          gap: '24px', 
          maxWidth: '480px', 
          margin: '0 auto', 
          width: '100%',
          minHeight: 'min-content'
        }}>
          
          {/* Status Message */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 1.5 }}>{gamingStatus}</div>
          </div>

          {/* Question */}
          <div className="card" style={{ border: '1.5px solid var(--border)', textAlign: 'center', padding: '24px 20px', position: 'relative', flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-card)', padding: '0 10px', fontSize: 9, fontWeight: 500, color: 'var(--text-low)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              {currentLevel.topic}
            </div>
            <h2 className="question" style={{ fontSize: 'min(1.2rem, 5.5vw)', lineHeight: 1.4, marginBottom: 0, fontWeight: 400 }}>{currentLevel.q}</h2>
          </div>

          {/* Answer Options */}
          <div className="options-container" style={{ gap: '12px', flexShrink: 0 }}>
            {currentLevel.opts.map((opt, idx) => {
              const isUserChoice = selectedAnswer === idx;
              const isCorrectAns = idx === currentLevel.ans;
              
              let stateClass = '';
              if (isSubmitted) {
                if (isCorrectAns && isCorrect) stateClass = 'correct';
                else if (isUserChoice && !isCorrect) stateClass = 'incorrect';
              } else if (isUserChoice) {
                stateClass = 'selected';
              }

              return (
                <button
                  key={idx}
                  className={`option ${stateClass}`}
                  onClick={() => !isSubmitted && setSelectedAnswer(idx)}
                  disabled={isSubmitted}
                  style={{ 
                    padding: '12px 20px', 
                    minHeight: '50px', 
                    borderRadius: '12px', 
                    borderBottomWidth: isUserChoice ? '1.5px' : '3.5px', 
                    boxShadow: isUserChoice ? 'none' : '0 3.5px 0 var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <span className="option-text" style={{ textAlign: 'center', width: '100%', fontWeight: 500, fontSize: 14 }}>{opt}</span>
                  {isSubmitted && isCorrectAns && isCorrect && (
                    <span className="indicator" style={{ fontSize: 20, marginLeft: 8 }}>✅</span>
                  )}
                  {isSubmitted && isUserChoice && !isCorrect && (
                    <span className="indicator" style={{ fontSize: 20, marginLeft: 8 }}>❌</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px', flexShrink: 0 }}>
            {!isSubmitted ? (
              <button
                className="btn btn-primary"
                style={{ width: '100%', height: '48px', borderRadius: '12px', fontSize: 14, borderBottom: '3.5px solid var(--primary-dark)' }}
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Check Answer
              </button>
            ) : (
              <div className="animate-in" style={{ textAlign: 'center', width: '100%' }}>
                {isCorrect ? (
                  <div className="badge badge-accent" style={{ fontSize: 14, padding: '10px 24px', borderRadius: '12px', width: '100%', borderBottom: '3.5px solid var(--primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px' }}>
                    🎯 YOU GOT IT!
                  </div>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => { setSelectedAnswer(null); setIsSubmitted(false); }}
                    style={{ width: '100%', height: '48px', borderRadius: '12px', fontSize: 14, borderBottom: '3.5px solid var(--primary-dark)' }}
                  >
                    Give it another go! 💪
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Subtle Progress Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: '12px', opacity: 0.6, flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-low)' }}>⚡ XP +{currentLevel.xp}</div>
            <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-low)' }}>🔥 {streak} DAY STREAK</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelPage;
