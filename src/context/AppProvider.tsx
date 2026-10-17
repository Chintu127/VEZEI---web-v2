"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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

export interface AppContextType {
  // User Profile
  user: UserProfile | null;
  setUser: (u: UserProfile | null) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  logout: () => void;
  
  // Gamification
  xp: number;
  levelInfo: LevelInfo;
  streak: { current: number; longest: number; freezeCount: number };
  quests: (StudyQuest & { currentCount: number; isCompleted: boolean; claimedReward: boolean })[];
  achievements: Achievement[];
  addXp: (amount: number, reason: string) => void;
  claimQuestReward: (questId: string) => void;
  recordStudyActivity: (minutes?: number) => void;
  
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

const defaultUser: UserProfile = {
  id: "usr-rev-01",
  email: "revanth@vezei.com",
  fullName: "Revanth",
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

const defaultMistakes: MistakeItem[] = [
  {
    id: "m-1",
    questionId: "q-cat-qa-01",
    examSlug: "cat",
    subject: "Quantitative Aptitude",
    topic: "Profit & Loss",
    prompt: "A merchant marks his goods up by 40% above CP. 60% sold at MP, 40% at 25% discount on MP...",
    wrongOption: "B (23.2%)",
    correctAnswer: "C (26.0%)",
    explanation: "Overlooked that remaining 40% has discount applied on the marked price 1.40, not base price 1.00.",
    errorType: "calculation",
    addedAt: "2026-10-16",
    mastered: false,
  },
  {
    id: "m-2",
    questionId: "q-cat-dilr-01",
    examSlug: "cat",
    subject: "DILR",
    topic: "Logical Arrangements",
    prompt: "Six researchers seated in a row facing North. Exactly two people between B and E...",
    wrongOption: "D (Cannot be determined)",
    correctAnswer: "A (D)",
    explanation: "Failed to realize that combining the fixed [C, B] and [E, D] blocks with 2-seat gap fixes all 6 positions.",
    errorType: "conceptual",
    addedAt: "2026-10-15",
    mastered: false,
  },
];

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

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vezei_user");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* use default */ }
      }
    }
    return defaultUser;
  });

  // XP & Gamification state
  const [xp, setXp] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vezei_xp");
      if (saved) return parseInt(saved, 10);
    }
    return 2450;
  });

  const [streak, setStreak] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vezei_streak");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* use default */ }
      }
    }
    return { current: 5, longest: 14, freezeCount: 1 };
  });

  const [quests, setQuests] = useState(() => {
    return INITIAL_QUESTS.map((q, idx) => ({
      ...q,
      currentCount: idx === 0 ? 7 : idx === 1 ? 1 : 15,
      isCompleted: idx === 1,
      claimedReward: false,
    }));
  });

  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [mistakes, setMistakes] = useState<MistakeItem[]>(defaultMistakes);
  const [bookmarks, setBookmarks] = useState<string[]>(["q-cat-qa-01"]);
  const [celebration, setCelebration] = useState<{ show: boolean; title: string; subtitle: string; xp: number } | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vezei_user", JSON.stringify(user));
      localStorage.setItem("vezei_xp", xp.toString());
      localStorage.setItem("vezei_streak", JSON.stringify(streak));
    }
  }, [user, xp, streak]);

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
        if (q.id === "deep-focus") {
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

  const addMistake = (item: Omit<MistakeItem, "id" | "addedAt" | "mastered">) => {
    const newMistake: MistakeItem = {
      ...item,
      id: `m-${Date.now()}`,
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
