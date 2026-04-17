// 🏆 ByteBunny Badge System Configuration

export const BADGE_RULES = [
  // Consistency Badges
  { id: 'streak_3', label: '🔥 3-Day Streak', description: 'Log in 3 days in a row', icon: '🔥', 
    check: (stats) => stats.streak >= 3 },
  { id: 'streak_7', label: '🔥 Week Streak', description: 'Log in 7 days in a row', icon: '🔥', 
    check: (stats) => stats.streak >= 7 },
  { id: 'streak_30', label: '🔥 Month Streak', description: 'Log in 30 days in a row', icon: '👑', 
    check: (stats) => stats.streak >= 30 },

  // XP Badges
  { id: 'xp_500', label: '⚡ 500 XP', description: 'Earn 500 total XP', icon: '⚡', 
    check: (stats) => stats.xp >= 500 },
  { id: 'xp_1000', label: '⚡ 1000 XP', description: 'Earn 1000 total XP', icon: '🚀', 
    check: (stats) => stats.xp >= 1000 },
  { id: 'xp_5000', label: '⚡ 5000 XP', description: 'Earn 5000 total XP', icon: '💎', 
    check: (stats) => stats.xp >= 5000 },

  // Level Completion Badges
  { id: 'levels_10', label: '🎯 10 Levels', description: 'Complete 10 game levels', icon: '🎯', 
    check: (stats) => stats.totalLevels >= 10 },
  { id: 'levels_50', label: '🎯 50 Levels', description: 'Complete 50 game levels', icon: '🏆', 
    check: (stats) => stats.totalLevels >= 50 },
  { id: 'levels_100', label: '🎯 100 Levels', description: 'Complete 100 game levels', icon: '🥇', 
    check: (stats) => stats.totalLevels >= 100 },

  // Course Academy Badges
  { id: 'academy_first', label: '🎓 First Lecture', description: 'Complete your first course lecture', icon: '🎓', 
    check: (stats) => stats.totalLectures >= 1 },
  { id: 'academy_10', label: '🎓 10 Lectures', description: 'Complete 10 course lectures', icon: '📜', 
    check: (stats) => stats.totalLectures >= 10 },
  { id: 'academy_50', label: '🎓 50 Lectures', description: 'Complete 50 course lectures', icon: '🎓', 
    check: (stats) => stats.totalLectures >= 50 },
];

/**
 * Calculates language-specific "Master" badges
 * e.g., completing all 300 levels in Python
 */
export const getLanguageMasterBadges = (progress, languages) => {
  const masters = [];
  languages.forEach(lang => {
    const lp = progress[lang.id];
    if (lp && Object.keys(lp.completedLevels || {}).length >= 300) {
      masters.push({
        id: `master_${lang.id}`,
        label: `👑 ${lang.name} Master`,
        description: `Complete all 300 levels of ${lang.name}`,
        icon: '👑',
        color: 'badge-accent'
      });
    }
  });
  return masters;
};

/**
 * Calculates Academy Graduate badges
 * e.g., completing all 10 lectures in a language/level track
 */
export const getAcademyGraduateBadges = (courseProgress, courseData, languages) => {
  const grads = [];
  languages.forEach(lang => {
    const cp = courseProgress[lang.id];
    if (cp) {
      ['basic', 'intermediate', 'expert'].forEach(level => {
        const completedCount = cp[level]?.length || 0;
        const totalCount = courseData[lang.id]?.[level]?.length || 0;
        if (totalCount > 0 && completedCount >= totalCount) {
          grads.push({
            id: `grad_${lang.id}_${level}`,
            label: `🎖️ ${lang.label} ${level.charAt(0).toUpperCase() + level.slice(1)} Grad`,
            description: `Complete all lectures in ${lang.label} ${level}`,
            icon: '🎖️'
          });
        }
      });
    }
  });
  return grads;
};
