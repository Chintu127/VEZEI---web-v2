"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/AppProvider";
import { useI18n } from "@/context/LanguageContext";
import {
  Flame,
  Zap,
  Target,
  Trophy,
  BrainCircuit,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  Award,
  ChevronRight,
  Swords,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function StudentDashboardPage() {
  const {
    user,
    streak,
    levelInfo,
    quests,
    claimQuestReward,
    mistakes,
    achievements,
  } = useApp();
  const { t } = useI18n();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. VISUAL HERO BANNER WITH 3D ARTWORK & STATS */}
      <div className="relative overflow-hidden bg-white dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-colors">
        
        {/* Visual Background Accent Glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#C8FF3D]/10 dark:bg-[#C8FF3D]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#5B3DF5]/10 dark:bg-[#5B3DF5]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Hero Content: Greeting, Target & Gamification Bar */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Target Exam Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-2xl">{user?.avatar || "🎯"}</span>
              <span className="text-xs font-black uppercase tracking-wider text-[#2E7D32] dark:text-[#C8FF3D] bg-[#F4FDE5] dark:bg-[#111111] border border-[#C8FF3D]/40 px-3 py-1 rounded-full shadow-sm">
                {user?.targetExamName || "CAT 2026"}
              </span>
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
                {t("targetExam")}: {user?.targetScore || "99.5%ile"}
              </span>
            </div>

            {/* Dynamic Localized Greeting */}
            <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              {t("readyToConquer")}, {user?.fullName || "Aspirant"}?
            </h1>

            {/* Compact Exam Target Info */}
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              {t("targetExam")} Date:{" "}
              <strong className="text-neutral-900 dark:text-white">{user?.targetExamDate || "Nov 29, 2026"}</strong>{" "}
              • {t("dailyGoal")}: <strong className="text-neutral-900 dark:text-white">{user?.dailyGoalMinutes || 60} mins</strong>
            </p>

            {/* Quick Stat Badges & Launch Button */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              
              {/* Streak Badge */}
              <div className="px-4 py-2.5 rounded-2xl bg-neutral-50 dark:bg-[#111111] border border-[#FF4FA3]/40 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5 text-[#FF4FA3] font-black text-sm">
                  <Flame className="w-4 h-4 fill-[#FF4FA3]" />
                  <span>{streak.current}d</span>
                </div>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider block">
                  {t("activeStreak")}
                </span>
              </div>

              {/* Level & XP Gauge */}
              <div className="px-4 py-2 rounded-2xl bg-neutral-50 dark:bg-[#111111] border border-[#C8FF3D]/40 text-left min-w-[190px] shadow-sm">
                <div className="flex items-center justify-between gap-2 text-xs font-black mb-1">
                  <span className="text-[#2E7D32] dark:text-[#C8FF3D] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-[#C8FF3D] text-[#C8FF3D]" />
                    {t("level")} {levelInfo.level}
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-300 font-bold">
                    {levelInfo.currentLevelXp} XP
                  </span>
                </div>
                
                <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C8FF3D] to-[#FF4FA3] rounded-full transition-all duration-300"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">
                  <span className="truncate max-w-[90px] font-medium">{levelInfo.title}</span>
                  <span>{levelInfo.nextLevelXp} XP Next</span>
                </div>
              </div>

              {/* High-Impact Tactical CTA Button */}
              <Link
                href="/app/practice"
                className="btn-tactile-lime px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-md transition-transform hover:scale-105"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>{t("launchQuickDrill")}</span>
              </Link>
            </div>

          </div>

          {/* Right Hero Illustration: 3D Student Podium Artwork */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#C8FF3D]/40 shadow-xl group">
              <Image
                src="/images/hero-banner.jpg"
                alt="VEZEI 3D Learning Arena"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-black text-white bg-[#111111]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#C8FF3D]/50 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#C8FF3D]" />
                  <span>AI Adaptive Curriculum</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. VISUAL FEATURE SPOTLIGHT CARDS (LOW TEXT, HIGH IMPACT 3D IMAGES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: 1v1 Quiz Battle Arena */}
        <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] p-5 shadow-sm dark:shadow-md transition-all hover:border-[#FF4FA3]/60 flex flex-col sm:flex-row gap-5 items-center">
          <div className="relative w-full sm:w-44 h-36 flex-shrink-0 rounded-2xl overflow-hidden border border-[#FF4FA3]/40 shadow-md">
            <Image
              src="/images/battle-arena.jpg"
              alt="1v1 Battle Arena"
              fill
              sizes="(max-width: 640px) 100vw, 176px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-[#FF4FA3] text-white shadow">
              Live Arena
            </span>
          </div>

          <div className="space-y-2 flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Swords className="w-4 h-4 text-[#FF4FA3]" />
              <h3 className="text-base font-black text-neutral-900 dark:text-white">
                {t("battleArena")}
              </h3>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {t("battleSub")}
            </p>
            <div className="pt-1">
              <Link
                href="/app/battle"
                className="btn-tactile-pink inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black shadow-sm"
              >
                <span>{t("enterArena")} (+100 XP)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2: 24/7 AI Doubt Solver */}
        <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] p-5 shadow-sm dark:shadow-md transition-all hover:border-[#5B3DF5]/60 flex flex-col sm:flex-row gap-5 items-center">
          <div className="relative w-full sm:w-44 h-36 flex-shrink-0 rounded-2xl overflow-hidden border border-[#5B3DF5]/40 shadow-md">
            <Image
              src="/images/ai-tutor.jpg"
              alt="24/7 AI Doubt Tutor"
              fill
              sizes="(max-width: 640px) 100vw, 176px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-[#5B3DF5] text-white shadow">
              24/7 AI
            </span>
          </div>

          <div className="space-y-2 flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <BrainCircuit className="w-4 h-4 text-[#5B3DF5]" />
              <h3 className="text-base font-black text-neutral-900 dark:text-white">
                {t("aiTutorHeader")}
              </h3>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {t("aiTutorSub")}
            </p>
            <div className="pt-1">
              <Link
                href="/app/ai-tutor"
                className="btn-tactile-purple inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black shadow-sm"
              >
                <span>{t("askAiTutor")}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* 3. MAIN 2-COLUMN GRID (QUESTS & MASTERY) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Today's Quests & Curriculum Node */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Today's Daily Quests */}
          <div className="bg-white dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FF4FA3] flex items-center justify-center text-white shadow-sm">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-neutral-900 dark:text-white">
                    {t("todaysQuests")}
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {t("resetsAt")}
                  </p>
                </div>
              </div>

              <span className="text-xs text-[#2E7D32] dark:text-[#C8FF3D] font-bold bg-[#F4FDE5] dark:bg-[#1C1F16] border border-[#C8FF3D]/40 px-3 py-1 rounded-full">
                {quests.filter((q) => q.isCompleted).length}/{quests.length} Done
              </span>
            </div>

            <div className="space-y-3">
              {quests.map((q, idx) => {
                const questTitle =
                  idx === 0
                    ? t("dailyPracticeSprint")
                    : idx === 1
                    ? t("sharpshooter")
                    : t("deepStudySprint");

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      q.isCompleted
                        ? "bg-[#F4FDE5] dark:bg-[#1E2519] border-[#C8FF3D]/60"
                        : "bg-neutral-50 dark:bg-[#111111] border-neutral-200 dark:border-[#2A2A2E]"
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-neutral-900 dark:text-white">
                          {questTitle}
                        </h4>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white dark:bg-[#17171C] text-[#2E7D32] dark:text-[#C8FF3D] border border-[#C8FF3D]/40 shadow-sm">
                          +{q.xp_reward} XP
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {q.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full max-w-md h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            q.isCompleted ? "bg-[#C8FF3D]" : "bg-[#5B3DF5]"
                          }`}
                          style={{
                            width: `${Math.min(100, (q.currentCount / q.target_count) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                        {q.currentCount} / {q.target_count} progress
                      </span>
                    </div>

                    {/* Quest Action Button */}
                    <div className="flex-shrink-0">
                      {q.claimedReward ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-500">
                          <CheckCircle2 className="w-4 h-4 text-[#2E7D32] dark:text-[#C8FF3D]" />
                          <span>{t("claimed")}</span>
                        </span>
                      ) : q.isCompleted ? (
                        <button
                          onClick={() => claimQuestReward(q.id)}
                          className="btn-tactile-lime px-4 py-2 rounded-xl text-xs font-black animate-pulse shadow"
                        >
                          {t("claimXp")}
                        </button>
                      ) : (
                        <Link
                          href="/app/practice"
                          className="px-4 py-2 rounded-xl bg-white dark:bg-[#1C1C22] hover:bg-neutral-100 dark:hover:bg-[#25252A] text-neutral-900 dark:text-white text-xs font-bold border border-neutral-300 dark:border-[#2A2A2E] inline-block shadow-sm transition-all"
                        >
                          {t("practiceNow")}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Continue Learning: Next Skill Tree Node */}
          <div className="bg-white dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#5B3DF5]">
                {t("curriculumProgression")}
              </span>
              <Link href="/app/learn" className="text-xs font-bold text-[#5B3DF5] dark:text-[#C8FF3D] hover:underline">
                {t("skillMap")} →
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-gradient-to-r dark:from-[#1C1C24] dark:to-[#17171C] border-2 border-[#5B3DF5]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Quantitative Aptitude • Node #2
                </span>
                <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white">
                  Profit, Loss &amp; Discount: Marked Price Ratio
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-md">
                  Successive markups, false weights, and segmented discounts before unlocking Node #3.
                </p>
              </div>

              <Link
                href="/app/learn"
                className="btn-tactile-purple px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 flex-shrink-0 shadow"
              >
                <span>{t("resumeLesson")} (+75 XP)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* AI Recommended Practice Focus */}
          <div className="bg-white dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-[#5B3DF5]" />
                <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white">
                  AI Diagnostic Focus
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FF4FA3]/15 text-[#FF4FA3] border border-[#FF4FA3]/30">
                {t("weakTopic")}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#111111] border border-neutral-200 dark:border-[#2A2A2E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-lg">
                Targeted 8-question drill on multi-condition logical arrangements with Socratic AI hints enabled.
              </p>
              <Link
                href="/app/practice?topic=logical-arrangements"
                className="btn-tactile-lime px-5 py-2.5 rounded-xl text-xs font-black flex-shrink-0 shadow"
              >
                {t("startAdaptiveDrill")}
              </Link>
            </div>
          </div>

        </div>

        {/* Right Column: Mistake Notebook Alert, Syllabus Mastery, Recent Badges */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Mistake Notebook Quick Card */}
          <div className="bg-white dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] rounded-3xl p-6 space-y-4 shadow-sm transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#FF4FA3]">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-black text-neutral-900 dark:text-white text-base">
                  {t("mistakeNotebook")}
                </h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FF4FA3]/15 text-[#FF4FA3]">
                {mistakes.filter((m) => !m.mastered).length} {t("unresolved")}
              </span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Flagged questions waiting for conceptual re-testing and mastery resolution.
            </p>

            <Link
              href="/app/mistakes"
              className="w-full py-3 rounded-xl bg-[#FFF1F7] dark:bg-[#29171E] hover:bg-[#FFE3EE] dark:hover:bg-[#381B26] text-[#FF4FA3] border border-[#FF4FA3]/50 text-xs font-black flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>{t("reviewMistakes")}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Topic Mastery Summary */}
          <div className="bg-white dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] rounded-3xl p-6 space-y-4 shadow-sm transition-colors">
            <h3 className="font-black text-neutral-900 dark:text-white text-base">
              {t("syllabusMastery")}
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-neutral-700 dark:text-neutral-300">Quantitative Aptitude</span>
                  <span className="text-[#2E7D32] dark:text-[#C8FF3D] font-black">72%</span>
                </div>
                <div className="w-full h-2 bg-neutral-200 dark:bg-[#111111] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C8FF3D] rounded-full" style={{ width: "72%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-neutral-700 dark:text-neutral-300">VARC (Verbal Ability)</span>
                  <span className="text-[#5B3DF5] font-black">84%</span>
                </div>
                <div className="w-full h-2 bg-neutral-200 dark:bg-[#111111] rounded-full overflow-hidden">
                  <div className="h-full bg-[#5B3DF5] rounded-full" style={{ width: "84%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-neutral-700 dark:text-neutral-300">DILR (Logical Reasoning)</span>
                  <span className="text-[#FF4FA3] font-black">65%</span>
                </div>
                <div className="w-full h-2 bg-neutral-200 dark:bg-[#111111] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF4FA3] rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
            </div>

            <Link
              href="/app/analytics"
              className="text-xs font-bold text-[#5B3DF5] dark:text-[#C8FF3D] hover:underline block pt-1"
            >
              {t("detailedAnalytics")}
            </Link>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] rounded-3xl p-6 space-y-4 shadow-sm transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-neutral-900 dark:text-white text-base">
                {t("recentBadges")}
              </h3>
              <Link href="/app/achievements" className="text-xs font-bold text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white">
                {t("all")}
              </Link>
            </div>

            <div className="space-y-2.5">
              {achievements.slice(0, 3).map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3 rounded-2xl border flex items-center gap-3 text-xs transition-colors ${
                    ach.is_unlocked
                      ? "bg-neutral-50 dark:bg-[#1F1F24] border-neutral-200 dark:border-[#C8FF3D]/40 text-neutral-900 dark:text-white"
                      : "bg-neutral-50/50 dark:bg-[#111111] border-neutral-200 dark:border-[#2A2A2E] text-neutral-400 opacity-60"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#111111] border border-neutral-200 dark:border-[#2A2A2E] flex items-center justify-center text-lg shadow-sm">
                    {ach.is_unlocked ? "🏆" : "🔒"}
                  </div>
                  <div>
                    <h4 className="font-black text-neutral-900 dark:text-white">{ach.title}</h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
