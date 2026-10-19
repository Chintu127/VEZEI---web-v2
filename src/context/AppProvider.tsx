"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { calculateLevel, LevelInfo, evaluateStreak } from "@/lib/gamification/engine";
import { INITIAL_QUESTS, INITIAL_ACHIEVEMENTS } from "@/data/gamification";
import { StudyQuest, Achievement } from "@/types/database";
import { createClient } from "@/lib/supabase/client";

export type UserRole =
  | "super_admin"
  | "main_admin"
  | "developer_1"
  | "developer_2"
  | "developer_3"
  | "student"
  | "admin"; // backwards compatibility alias

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatar: string;
  role: UserRole;
  targetExamId: string;
  targetExamName: string;
  targetExamDate: string;
  targetScore: string;
  prepLevel: "beginner" | "intermediate" | "advanced";
  dailyGoalMinutes: number;
  onboardingCompleted: boolean;
}

export interface MistakeItem {
  id: string;
  questionId: string;
  examSlug: string;
  subject: string;
  topic: string;
  prompt: string;
  wrongOption: string;
  correctAnswer: string;
  explanation: string;
  errorType: "conceptual" | "calculation" | "time_pressure" | "misread";
  addedAt: string;
  mastered: boolean;
}

export interface PracticeRecord {
  attemptId: string;
  examSlug: string;
  mode?: "drill" | "mock";
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  score: number;
  accuracy: number;
  timeSpentSeconds: number;
  completedAt: string;
  topicsAttempted?: { topic: string; subject: string; isCorrect: boolean }[];
}

export interface ComputedAnalytics {
  totalSolved: number;
  totalCorrect: number;
  overallAccuracy: number;
  timeSpentMinutes: number;
  sessionsCompleted: number;
  mockTestsCompleted: number;
  weakTopics: { topic: string; subject: string; accuracy: number; count: number }[];
  strongTopics: { topic: string; subject: string; accuracy: number; count: number }[];
  recentAttempts: PracticeRecord[];
  hasActivity: boolean;
  roadmapStep: number; // 1 to 7
}

export interface AppContextType {
  // User Profile
  user: UserProfile | null;
  setUser: (u: UserProfile | null) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  logout: () => void;
  
  // Gamification & Telemetry
  xp: number;
  levelInfo: LevelInfo;
  streak: { current: number; longest: number; freezeCount: number };
  quests: (StudyQuest & { currentCount: number; isCompleted: boolean; claimedReward: boolean })[];
  achievements: Achievement[];
  addXp: (amount: number, reason: string) => void;
  claimQuestReward: (questId: string) => void;
  recordStudyActivity: (minutes?: number) => void;
  
  // Real Practice History & Analytics
  practiceHistory: PracticeRecord[];
  recordPracticeSession: (record: PracticeRecord) => void;
  computedAnalytics: ComputedAnalytics;
  
  // Learning & Mistakes
  mistakes: MistakeItem[];
  addMistake: (mistake: Omit<MistakeItem, "id" | "addedAt" | "mastered">) => void;
  resolveMistake: (id: string) => void;
  bookmarks: string[]; // Question IDs
  toggleBookmark: (questionId: string) => void;

  // Theme
  theme: "dark" | "light";
  toggleTheme: () => void;

  // Global Toasts / Celebrations
  celebration: { show: boolean; title: string; subtitle: string; xp: number } | null;
  triggerCelebration: (title: string, subtitle: string, xp: number) => void;
  dismissCelebration: () => void;
}

const defaultStudentProfile: UserProfile = {
  id: "usr-guest-01",
  email: "aspirant@vezei.com",
  fullName: "Aspirant",
  avatar: "🎯",
  role: "student",
  targetExamId: "cat",
  targetExamName: "CAT (IIM Entrance)",
  targetExamDate: "2026-11-29",
  targetScore: "99.5%ile",
  prepLevel: "intermediate",
  dailyGoalMinutes: 60,
  onboardingCompleted: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Theme state with localStorage recovery
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vezei_theme");
      if (saved === "light" || saved === "dark") return saved;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
      }
    }
    return "dark";
  });

  // User profile state
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vezei_user");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          /* fallback */
        }
      }
    }
    return defaultStudentProfile;
  });

  // XP & Gamification state
  const [xp, setXp] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vezei_xp");
      if (saved) return parseInt(saved, 10);
    }
    return 150;
  });

  const [streak, setStreak] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vezei_streak");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          /* fallback */
        }
      }
    }
    return { current: 1, longest: 1, freezeCount: 1 };
  });

  const [quests, setQuests] = useState(() => {
    return INITIAL_QUESTS.map((q) => ({
      ...q,
      currentCount: 0,
      isCompleted: false,
      claimedReward: false,
    }));
  });

  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  // Real Practice Session History (Loaded from local storage or initialized)
  const [practiceHistory, setPracticeHistory] = useState<PracticeRecord[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vezei_practice_history");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          /* ignore */
        }
      }
    }
    return [];
  });

  // Mistake Notebook
  const [mistakes, setMistakes] = useState<MistakeItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vezei_mistakes");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          /* ignore */
        }
      }
    }
    return [];
  });

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vezei_bookmarks");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          /* ignore */
        }
      }
    }
    return [];
  });

  const [celebration, setCelebration] = useState<{ show: boolean; title: string; subtitle: string; xp: number } | null>(null);

  // Sync Supabase Auth state on mount
  useEffect(() => {
    async function checkSupabaseSession() {
      try {
        const supabase = createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          setUser((prev) => ({
            id: authUser.id,
            email: authUser.email || "aspirant@vezei.com",
            fullName: authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "Aspirant",
            avatar: "🎯",
            role: (authUser.user_metadata?.role as UserRole) || prev?.role || "student",
            targetExamId: authUser.user_metadata?.target_exam_id || prev?.targetExamId || "cat",
            targetExamName: authUser.user_metadata?.target_exam_name || prev?.targetExamName || "CAT (IIM Entrance)",
            targetExamDate: authUser.user_metadata?.target_exam_date || prev?.targetExamDate || "2026-11-29",
            targetScore: authUser.user_metadata?.target_score || prev?.targetScore || "99.5%ile",
            prepLevel: (authUser.user_metadata?.prep_level as any) || prev?.prepLevel || "intermediate",
            dailyGoalMinutes: authUser.user_metadata?.daily_goal_minutes || prev?.dailyGoalMinutes || 60,
            onboardingCompleted: true,
          }));
        }
      } catch (err) {
        console.warn("Supabase auth check offline/fallback mode:", err);
      }
    }
    checkSupabaseSession();
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vezei_user", JSON.stringify(user));
      localStorage.setItem("vezei_xp", xp.toString());
      localStorage.setItem("vezei_streak", JSON.stringify(streak));
      localStorage.setItem("vezei_practice_history", JSON.stringify(practiceHistory));
      localStorage.setItem("vezei_mistakes", JSON.stringify(mistakes));
      localStorage.setItem("vezei_bookmarks", JSON.stringify(bookmarks));
    }
  }, [user, xp, streak, practiceHistory, mistakes, bookmarks]);

  // Apply dark/light theme class to documentElement and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("vezei_theme", theme);
    }
  }, [theme]);

  const levelInfo = calculateLevel(xp);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const logout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Supabase signOut error:", e);
    }
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("vezei_user");
      window.location.href = "/login";
    }
  };

  const addXp = (amount: number, reason: string) => {
    if (amount <= 0) return;
    setXp((prev) => {
      const next = prev + amount;
      triggerCelebration(`+${amount} XP Earned!`, reason, amount);
      return next;
    });
  };

  const claimQuestReward = (questId: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId && q.isCompleted && !q.claimedReward) {
          addXp(q.xp_reward, `Completed Quest: ${q.title}`);
          return { ...q, claimedReward: true };
        }
        return q;
      })
    );
  };

  const recordStudyActivity = (minutes = 15) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === "deep-focus" || q.id === "daily-sprint") {
          const newCount = Math.min(q.target_count, q.currentCount + minutes);
          return {
            ...q,
            currentCount: newCount,
            isCompleted: newCount >= q.target_count,
          };
        }
        return q;
      })
    );
  };

  // Record a completed practice or mock session
  const recordPracticeSession = useCallback((record: PracticeRecord) => {
    setPracticeHistory((prev) => [record, ...prev]);
    // update quests
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === "daily-sprint") {
          const newCount = Math.min(q.target_count, q.currentCount + record.totalQuestions);
          return { ...q, currentCount: newCount, isCompleted: newCount >= q.target_count };
        }
        if (q.id === "accuracy-master" && record.accuracy >= 80) {
          return { ...q, currentCount: 1, isCompleted: true };
        }
        return q;
      })
    );
  }, []);

  const addMistake = (item: Omit<MistakeItem, "id" | "addedAt" | "mastered">) => {
    const newMistake: MistakeItem = {
      ...item,
      id: `m-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      addedAt: new Date().toISOString().split("T")[0],
      mastered: false,
    };
    setMistakes((prev) => [newMistake, ...prev]);
  };

  const resolveMistake = (id: string) => {
    setMistakes((prev) =>
      prev.map((m) => (m.id === id ? { ...m, mastered: true } : m))
    );
    addXp(30, "Resolved notebook mistake!");
  };

  const toggleBookmark = (questionId: string) => {
    setBookmarks((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const triggerCelebration = (title: string, subtitle: string, xp: number) => {
    setCelebration({ show: true, title, subtitle, xp });
  };

  const dismissCelebration = () => {
    setCelebration(null);
  };

  // Compute live analytics based on actual student activity
  const computedAnalytics: ComputedAnalytics = React.useMemo(() => {
    if (practiceHistory.length === 0) {
      return {
        totalSolved: 0,
        totalCorrect: 0,
        overallAccuracy: 0,
        timeSpentMinutes: 0,
        sessionsCompleted: 0,
        mockTestsCompleted: 0,
        weakTopics: [],
        strongTopics: [],
        recentAttempts: [],
        hasActivity: false,
        roadmapStep: 2, // Step 1: Selected Exam done, Step 2: Understand Syllabus
      };
    }

    let totalSolved = 0;
    let totalCorrect = 0;
    let totalTimeSpentSeconds = 0;
    let mockTestsCompleted = 0;

    const topicStats: Record<string, { topic: string; subject: string; correct: number; total: number }> = {};

    practiceHistory.forEach((session) => {
      totalSolved += session.totalQuestions;
      totalCorrect += session.correctCount;
      totalTimeSpentSeconds += session.timeSpentSeconds || 0;
      if (session.mode === "mock") mockTestsCompleted++;

      if (session.topicsAttempted) {
        session.topicsAttempted.forEach((t) => {
          if (!topicStats[t.topic]) {
            topicStats[t.topic] = { topic: t.topic, subject: t.subject, correct: 0, total: 0 };
          }
          topicStats[t.topic].total++;
          if (t.isCorrect) topicStats[t.topic].correct++;
        });
      }
    });

    const overallAccuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;
    const timeSpentMinutes = Math.round(totalTimeSpentSeconds / 60);

    const topicList = Object.values(topicStats).map((item) => ({
      topic: item.topic,
      subject: item.subject,
      accuracy: Math.round((item.correct / item.total) * 100),
      count: item.total,
    }));

    const weakTopics = topicList.filter((t) => t.accuracy < 65 && t.count >= 2);
    const strongTopics = topicList.filter((t) => t.accuracy >= 80);

    // Dynamic Roadmap step calculation (1 to 7)
    let roadmapStep = 3; // at least 1 session completed -> Step 3 (topic practice)
    if (mistakes.some((m) => m.mastered)) roadmapStep = 4; // reviewed mistakes
    if (mockTestsCompleted > 0) roadmapStep = 5; // took timed mock
    if (totalSolved >= 30) roadmapStep = 6; // analyzed weak areas
    if (totalSolved >= 60 && overallAccuracy >= 80) roadmapStep = 7; // revised & ready

    return {
      totalSolved,
      totalCorrect,
      overallAccuracy,
      timeSpentMinutes,
      sessionsCompleted: practiceHistory.length,
      mockTestsCompleted,
      weakTopics,
      strongTopics,
      recentAttempts: practiceHistory.slice(0, 5),
      hasActivity: true,
      roadmapStep,
    };
  }, [practiceHistory, mistakes]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        logout,
        xp,
        levelInfo,
        streak,
        quests,
        achievements,
        addXp,
        claimQuestReward,
        recordStudyActivity,
        practiceHistory,
        recordPracticeSession,
        computedAnalytics,
        mistakes,
        addMistake,
        resolveMistake,
        bookmarks,
        toggleBookmark,
        theme,
        toggleTheme,
        celebration,
        triggerCelebration,
        dismissCelebration,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
