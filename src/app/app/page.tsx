"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppProvider";
import {
  Target,
  Clock,
  BarChart3,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Lock,
  Play,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  Flame,
  Zap,
  Settings,
  User,
  Sun,
  Moon,
} from "lucide-react";

export default function StudentDashboardPage() {
  const { user, streak, levelInfo, theme, toggleTheme, computedAnalytics, mistakes } = useApp();

  const unresolvedMistakes = mistakes.filter((m) => !m.mastered);

  // 7-Step Visual Study Roadmap definition
  const roadmapSteps = [
    {
      step: 1,
      title: "Choose target exam",
      description: `Target set to ${user?.targetExamName || "CAT 2026"}`,
      status: "completed" as const,
    },
    {
      step: 2,
      title: "Understand the syllabus",
      description: "Review sectional blueprints, question weightages, and marking scheme",
      status: computedAnalytics.hasActivity ? ("completed" as const) : ("in_progress" as const),
    },
    {
      step: 3,
      title: "Begin topic-wise practice",
      description: "Master foundational concepts with verified explanations",
      status: computedAnalytics.totalSolved >= 15
        ? ("completed" as const)
        : computedAnalytics.totalSolved > 0
        ? ("in_progress" as const)
        : ("available" as const),
    },
    {
      step: 4,
      title: "Review mistakes",
      description: "Flag conceptual missteps and resolve mistake notebook entries",
      status: mistakes.some((m) => m.mastered)
        ? ("completed" as const)
        : unresolvedMistakes.length > 0
        ? ("in_progress" as const)
        : computedAnalytics.totalSolved > 0
        ? ("available" as const)
        : ("locked" as const),
    },
    {
      step: 5,
      title: "Take timed mock tests",
      description: "Test under full proctored conditions with sectional time-locks",
      status: computedAnalytics.mockTestsCompleted >= 1
        ? ("completed" as const)
        : computedAnalytics.totalSolved >= 10
        ? ("available" as const)
        : ("locked" as const),
    },
    {
      step: 6,
      title: "Analyze weak areas",
      description: "Inspect velocity vs accuracy gaps in high-penalty sections",
      status: computedAnalytics.totalSolved >= 30
        ? ("completed" as const)
        : computedAnalytics.mockTestsCompleted >= 1
        ? ("in_progress" as const)
        : ("locked" as const),
    },
    {
      step: 7,
      title: "Revise and reassess readiness",
      description: "Final targeted drill iterations to reach target score percentile",
      status: computedAnalytics.totalSolved >= 50 && computedAnalytics.overallAccuracy >= 80
        ? ("completed" as const)
        : computedAnalytics.totalSolved >= 30
        ? ("in_progress" as const)
        : ("locked" as const),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. DASHBOARD HEADER */}
      <div className="bg-white dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Greeting & Target Information */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xl">{user?.avatar || "🎯"}</span>
              <span className="text-xs font-black uppercase tracking-wider text-[#111111] dark:text-[#C8FF3D] bg-[#F4FDE5] dark:bg-[#1C2818] border border-[#C8FF3D]/50 px-3 py-1 rounded-full">
                {user?.targetExamName || "CAT 2026"}
              </span>
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                Target Score: <strong className="text-neutral-900 dark:text-white">{user?.targetScore || "99.5%ile"}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              Welcome back, {user?.fullName || "Aspirant"}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Exam Date: <strong className="text-neutral-900 dark:text-white">{user?.targetExamDate || "Nov 29, 2026"}</strong> &bull; Daily Study Goal: <strong className="text-neutral-900 dark:text-white">{user?.dailyGoalMinutes || 60} mins</strong>
            </p>
          </div>

          {/* Quick Status Badges & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Streak Badge */}
            <div className="px-3.5 py-2 rounded-2xl bg-neutral-50 dark:bg-[#111111] border border-[#FF4FA3]/40 text-[#FF4FA3] flex items-center gap-1.5 font-black text-xs">
              <Flame className="w-4 h-4 fill-[#FF4FA3]" />
              <span>{streak.current}d Streak</span>
            </div>

            {/* Level Badge */}
            <div className="px-3.5 py-2 rounded-2xl bg-neutral-50 dark:bg-[#111111] border border-[#C8FF3D]/40 text-neutral-900 dark:text-[#C8FF3D] flex items-center gap-1.5 font-black text-xs">
              <Zap className="w-4 h-4 fill-[#C8FF3D]" />
              <span>Level {levelInfo.level} ({levelInfo.currentLevelXp} XP)</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-[#111111] border border-neutral-300 dark:border-[#2E2E36] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-[#C8FF3D]" /> : <Moon className="w-4 h-4 text-[#5B3DF5]" />}
            </button>

            {/* Profile & Settings Controls */}
            <Link
              href="/app/profile"
              className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-[#111111] border border-neutral-300 dark:border-[#2E2E36] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
              title="Profile"
            >
              <User className="w-4 h-4" />
            </Link>
            <Link
              href="/app/settings"
              className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-[#111111] border border-neutral-300 dark:border-[#2E2E36] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* 2. PRIMARY LEARNING ACTIONS (THE FOUR CORE FEATURES FROM BOOKLET PAGE 2) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-neutral-900 dark:text-white">
            Primary Learning Actions
          </h2>
          <span className="text-xs text-neutral-500 font-semibold">
            One Unified Workspace
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Continue Practice */}
          <Link
            href="/app/practice"
            className="group bg-white dark:bg-[#17171C] border-2 border-neutral-200 dark:border-[#2E2E36] hover:border-[#C8FF3D] rounded-3xl p-6 shadow-sm transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C8FF3D] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center text-[#111111]">
                <Target className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-neutral-900 dark:text-white group-hover:text-[#C8FF3D] transition-colors">
                Continue Practice
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                Topic-wise questions with verified solutions, sorted by difficulty levels.
              </p>
            </div>
            <div className="pt-5 flex items-center gap-1.5 text-xs font-black text-[#111111] dark:text-[#C8FF3D]">
              <span>Launch Practice Drill</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: Start a Mock Test */}
          <Link
            href="/app/mock-tests"
            className="group bg-white dark:bg-[#17171C] border-2 border-neutral-200 dark:border-[#2E2E36] hover:border-[#FF4FA3] rounded-3xl p-6 shadow-sm transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF4FA3] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center text-white">
                <Clock className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-neutral-900 dark:text-white group-hover:text-[#FF4FA3] transition-colors">
                Start a Mock Test
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                Timed examination-style tests with autosave, marking rules, and full review.
              </p>
            </div>
            <div className="pt-5 flex items-center gap-1.5 text-xs font-black text-[#FF4FA3]">
              <span>Take Proctored Mock</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 3: Review Performance */}
          <Link
            href="/app/analytics"
            className="group bg-white dark:bg-[#17171C] border-2 border-neutral-200 dark:border-[#2E2E36] hover:border-[#5B3DF5] rounded-3xl p-6 shadow-sm transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#5B3DF5] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center text-white">
                <BarChart3 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-neutral-900 dark:text-white group-hover:text-[#5B3DF5] transition-colors">
                Review Performance
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                Speed, section accuracy, time per question, and error diagnostics.
              </p>
            </div>
            <div className="pt-5 flex items-center gap-1.5 text-xs font-black text-[#5B3DF5]">
              <span>Inspect Analytics</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 4: Open Study Plan */}
          <Link
            href="/app/planner"
            className="group bg-white dark:bg-[#17171C] border-2 border-neutral-200 dark:border-[#2E2E36] hover:border-[#C8FF3D] rounded-3xl p-6 shadow-sm transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center text-neutral-900 dark:text-white">
                <Calendar className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-neutral-900 dark:text-white group-hover:text-[#C8FF3D] transition-colors">
                Open Study Plan
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                Weekly goals organized around your target examination date and weak areas.
              </p>
            </div>
            <div className="pt-5 flex items-center gap-1.5 text-xs font-black text-[#111111] dark:text-[#C8FF3D]">
              <span>Manage Weekly Schedule</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

        </div>
      </div>

      {/* 3. PROGRESS AREA (ACTUAL ATTEMPT DATA OR HONEST ONBOARDING STATE) */}
      <div className="bg-white dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-200 dark:border-[#2A2A2E]">
          <div>
            <h2 className="text-xl font-black text-neutral-900 dark:text-white">
              Learning Progress &amp; Telemetry
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Calibrated strictly from your recorded practice sessions and mock attempts.
            </p>
          </div>

          {computedAnalytics.hasActivity && (
            <span className="text-xs font-black text-[#2E7D32] dark:text-[#C8FF3D] bg-[#F4FDE5] dark:bg-[#1C2818] border border-[#C8FF3D]/40 px-3 py-1 rounded-full self-start sm:self-auto">
              {computedAnalytics.sessionsCompleted} Session{computedAnalytics.sessionsCompleted > 1 ? "s" : ""} Recorded
            </span>
          )}
        </div>

        {!computedAnalytics.hasActivity ? (
          /* ONBOARDING STATE: Student has not attempted questions yet */
          <div className="p-8 rounded-2xl bg-neutral-50 dark:bg-[#111111] border-2 border-dashed border-neutral-300 dark:border-[#2E2E36] text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#C8FF3D] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] mx-auto flex items-center justify-center text-[#111111]">
              <Play className="w-6 h-6 fill-[#111111]" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-lg font-black text-neutral-900 dark:text-white">
                Start Your First Diagnostic Practice Session
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                No activity has been logged yet for your account. Complete a 10-question practice drill to establish your baseline accuracy, calibrate your study plan, and detect concept gaps.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/app/practice?exam=cat&count=10"
                className="btn-tactile-lime px-6 py-3 rounded-xl text-xs font-black inline-flex items-center gap-2"
              >
                <span>Launch Diagnostic Practice (10 Questions)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* REAL ATTEMPT DATA GRID */
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#111111] border border-neutral-200 dark:border-[#2A2A2E] space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                  Questions Attempted
                </span>
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white block">
                  {computedAnalytics.totalSolved}
                </span>
                <span className="text-[11px] text-neutral-500 font-semibold block">
                  {computedAnalytics.totalCorrect} Correct answers
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#111111] border border-neutral-200 dark:border-[#2A2A2E] space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                  Overall Accuracy
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#2E7D32] dark:text-[#C8FF3D] block">
                  {computedAnalytics.overallAccuracy}%
                </span>
                <span className="text-[11px] text-neutral-500 font-semibold block">
                  Target threshold: 85%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#111111] border border-neutral-200 dark:border-[#2A2A2E] space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                  Time Spent Studying
                </span>
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white block">
                  {computedAnalytics.timeSpentMinutes}m
                </span>
                <span className="text-[11px] text-neutral-500 font-semibold block">
                  Recorded in drills & mocks
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#111111] border border-neutral-200 dark:border-[#2A2A2E] space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">
                  Proctored Mocks
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#5B3DF5] block">
                  {computedAnalytics.mockTestsCompleted}
                </span>
                <span className="text-[11px] text-neutral-500 font-semibold block">
                  Simulations completed
                </span>
              </div>
            </div>

            {/* Weak Topics Alert / Guided Recommendation */}
            {computedAnalytics.weakTopics.length > 0 ? (
              <div className="p-4 rounded-2xl bg-[#FFF1F7] dark:bg-[#29171E] border border-[#FF4FA3]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#FF4FA3] flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-black text-[#FF4FA3] uppercase tracking-wider block">
                      Concept Gap Identified
                    </span>
                    <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-semibold">
                      Your accuracy in <strong>{computedAnalytics.weakTopics[0].topic}</strong> is{" "}
                      {computedAnalytics.weakTopics[0].accuracy}%. Repeated mistakes suggest revising this topic before taking your next mock test.
                    </p>
                  </div>
                </div>

                <Link
                  href={`/app/practice?topic=${encodeURIComponent(computedAnalytics.weakTopics[0].topic)}`}
                  className="btn-tactile-pink px-4 py-2 rounded-xl text-xs font-black flex-shrink-0"
                >
                  Revise Weak Topic
                </Link>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#F4FDE5] dark:bg-[#1C2818] border border-[#C8FF3D]/40 flex items-center justify-between gap-4 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
                  <span>No persistent concept gaps detected in your recent drills. Keep solving to calibrate recommendations!</span>
                </div>
                <Link href="/app/practice" className="font-black text-[#2E7D32] dark:text-[#C8FF3D] hover:underline">
                  Practice More →
                </Link>
              </div>
            )}
          </div>
        )}

      </div>

      {/* 4. PERSONALIZED VISUAL STUDY ROADMAP (7 STEPS REQUIRED BY PROMPT) */}
      <div className="bg-white dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-[#111111] border border-[#5B3DF5]/30 text-[#5B3DF5] dark:text-[#C8FF3D] text-xs font-black uppercase tracking-wider mb-2">
            Personalized Learning Path
          </div>
          <h2 className="text-xl font-black text-neutral-900 dark:text-white">
            7-Step Examination Study Roadmap
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Updated automatically based on your authenticated practice attempts and review milestones.
          </p>
        </div>

        {/* Roadmap Progression Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {roadmapSteps.map((s) => {
            const isCompleted = s.status === "completed";
            const isInProgress = s.status === "in_progress";
            const isAvailable = s.status === "available";
            const isLocked = s.status === "locked";

            return (
              <div
                key={s.step}
                className={`p-4 rounded-2xl border-2 flex flex-col justify-between transition-all ${
                  isCompleted
                    ? "bg-[#F4FDE5] dark:bg-[#1C2818] border-[#C8FF3D]"
                    : isInProgress
                    ? "bg-[#FFF1F7] dark:bg-[#29171E] border-[#FF4FA3] shadow-[0_0_12px_rgba(255,79,163,0.2)]"
                    : isAvailable
                    ? "bg-white dark:bg-[#111111] border-[#5B3DF5]/50"
                    : "bg-neutral-50 dark:bg-[#111111] border-neutral-200 dark:border-[#2A2A2E] opacity-50"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                        isCompleted
                          ? "bg-[#C8FF3D] text-[#111111]"
                          : isInProgress
                          ? "bg-[#FF4FA3] text-white"
                          : isAvailable
                          ? "bg-[#5B3DF5] text-white"
                          : "bg-neutral-300 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      {isCompleted ? "✓" : s.step}
                    </span>

                    <span className="text-[9px] font-black uppercase tracking-wider">
                      {isCompleted ? (
                        <span className="text-[#2E7D32] dark:text-[#C8FF3D]">Done</span>
                      ) : isInProgress ? (
                        <span className="text-[#FF4FA3]">Current</span>
                      ) : isAvailable ? (
                        <span className="text-[#5B3DF5]">Ready</span>
                      ) : (
                        <span className="text-neutral-400">Locked</span>
                      )}
                    </span>
                  </div>

                  <h4 className="text-xs font-black text-neutral-900 dark:text-white leading-tight">
                    {s.title}
                  </h4>
                  <p className="text-[10px] text-neutral-600 dark:text-neutral-400 leading-snug line-clamp-3">
                    {s.description}
                  </p>
                </div>

                <div className="pt-3">
                  {isCompleted ? (
                    <span className="text-[10px] font-bold text-[#2E7D32] dark:text-[#C8FF3D] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  ) : isInProgress ? (
                    <span className="text-[10px] font-bold text-[#FF4FA3] flex items-center gap-1">
                      <Play className="w-3 h-3 fill-[#FF4FA3]" /> In Progress
                    </span>
                  ) : isAvailable ? (
                    <span className="text-[10px] font-bold text-[#5B3DF5]">Available</span>
                  ) : (
                    <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. MISTAKE NOTEBOOK ACCORDION SUMMARY */}
      {unresolvedMistakes.length > 0 && (
        <div className="bg-white dark:bg-[#17171C] border border-[#FF4FA3]/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[#FF4FA3]">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-black text-base text-neutral-900 dark:text-white">
                Mistake Notebook ({unresolvedMistakes.length} Unresolved)
              </h3>
            </div>

            <Link
              href="/app/mistakes"
              className="text-xs font-black text-[#FF4FA3] hover:underline flex items-center gap-1"
            >
              <span>Open Notebook</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
            Review your flagged calculation and conceptual mistakes to ensure error patterns are eliminated before mock exams.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {unresolvedMistakes.slice(0, 2).map((m) => (
              <div key={m.id} className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#111111] border border-neutral-200 dark:border-[#2A2A2E] space-y-1 text-xs">
                <span className="text-[10px] font-black uppercase text-[#FF4FA3] block">{m.topic}</span>
                <p className="font-semibold text-neutral-900 dark:text-white truncate">{m.prompt}</p>
                <span className="text-[10px] text-neutral-500 block">Flagged: {m.addedAt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
