// Server-authoritative gamification rules & scoring logic

export interface LevelInfo {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
  title: string;
}

export const LEVEL_TITLES = [
  "Novice Aspirant",
  "Curious Scholar",
  "Focused Challenger",
  "Concept Apprentice",
  "Tactical Solver",
  "Problem Crusher",
  "Velocity Ace",
  "Accuracy Master",
  "Section Conqueror",
  "Grandmaster Aspirant",
  "Exam Champion",
  "Legendary Ranker",
];

export function calculateLevel(xp: number): LevelInfo {
  const safeXp = Math.max(0, Math.floor(xp));
  // level = floor(sqrt(xp / 100)) + 1
  const level = Math.floor(Math.sqrt(safeXp / 100)) + 1;
  const currentLevelStartXp = Math.pow(level - 1, 2) * 100;
  const nextLevelXp = Math.pow(level, 2) * 100;
  const xpInLevel = safeXp - currentLevelStartXp;
  const xpNeeded = nextLevelXp - currentLevelStartXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((xpInLevel / xpNeeded) * 100)));

  const titleIndex = Math.min(level - 1, LEVEL_TITLES.length - 1);
  const title = LEVEL_TITLES[titleIndex];

  return {
    level,
    currentLevelXp: safeXp,
    nextLevelXp,
    progressPercent,
    title,
  };
}

export function evaluateStreak(
  lastStudyDateStr: string | null | undefined,
  currentStreak: number,
  longestStreak: number
): { currentStreak: number; longestStreak: number; updated: boolean } {
  const today = new Date().toISOString().split("T")[0];
  if (!lastStudyDateStr) {
    return {
      currentStreak: 1,
      longestStreak: Math.max(longestStreak, 1),
      updated: true,
    };
  }

  const lastDate = new Date(lastStudyDateStr);
  const currentDate = new Date(today);
  const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Already studied today
    return { currentStreak, longestStreak, updated: false };
  } else if (diffDays === 1) {
    // Consecutive day!
    const newStreak = currentStreak + 1;
    return {
      currentStreak: newStreak,
      longestStreak: Math.max(longestStreak, newStreak),
      updated: true,
    };
  } else {
    // Streak broken
    return {
      currentStreak: 1,
      longestStreak,
      updated: true,
    };
  }
}

export function calculatePracticeScore(
  questions: Array<{ id: string; correctOption: string; positiveMarks?: number; negativeMarks?: number }>,
  responses: Record<string, string> // questionId -> selectedOption
) {
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;
  let totalScore = 0;

  questions.forEach((q) => {
    const selected = responses[q.id];
    const pos = q.positiveMarks ?? 3;
    const neg = q.negativeMarks ?? 1;

    if (!selected) {
      unattemptedCount++;
    } else if (selected === q.correctOption) {
      correctCount++;
      totalScore += pos;
    } else {
      incorrectCount++;
      totalScore -= neg;
    }
  });

  const attemptedCount = correctCount + incorrectCount;
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  // XP calculation
  // +10 XP per correct answer, +20 XP session completion bonus, +30 XP if accuracy >= 80%
  let xpAwarded = correctCount * 10 + 20;
  if (accuracy >= 80 && attemptedCount >= 5) {
    xpAwarded += 30;
  }

  return {
    correctCount,
    incorrectCount,
    unattemptedCount,
    totalQuestions: questions.length,
    score: totalScore,
    accuracy,
    xpAwarded,
  };
}
