"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useApp } from "@/context/AppProvider";
import { EXAMS } from "@/data/exams";
import {
  Target,
  Compass,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateUser, addXp } = useApp();

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Onboarding form state
  const [selectedExamId, setSelectedExamId] = useState(user?.targetExamId || "cat");
  const [prepLevel, setPrepLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [targetDate, setTargetDate] = useState("2026-11-29");
  const [targetScore, setTargetScore] = useState("99.5%ile");
  const [dailyMinutes, setDailyMinutes] = useState(60);
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [loading, setLoading] = useState(false);

  const selectedExam = EXAMS.find((e) => e.id === selectedExamId) || EXAMS[0];

  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateUser({
        targetExamId: selectedExam.id,
        targetExamName: selectedExam.name,
        targetExamDate: targetDate,
        targetScore,
        prepLevel,
        dailyGoalMinutes: dailyMinutes,
        onboardingCompleted: true,
      });

      addXp(100, "Completed Student Onboarding!");
      router.push("/app");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#5B3DF5]/15 via-[#C8FF3D]/10 to-[#FF4FA3]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center space-y-4 relative z-10">
        <Logo variant="navbar" size="md" href="/" />
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Configure Your Victory Roadmap
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Step {step} of {totalSteps} • Personalizing your diagnostic curriculum
        </p>

        {/* Multi-step progress bar */}
        <div className="w-full h-2.5 bg-[#17171C] rounded-full overflow-hidden p-0.5 border border-[#2A2A2E] max-w-md mx-auto">
          <div
            className="h-full bg-gradient-to-r from-[#C8FF3D] to-[#FF4FA3] rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Card container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl relative z-10">
        <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
          
          {/* STEP 1: TARGET EXAM SELECTION */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#C8FF3D]">
                  Step 1: Primary Target
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Which examination are you preparing for?
                </h2>
                <p className="text-xs text-neutral-400">
                  You can always add secondary exams or switch targets later.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {EXAMS.map((exam) => (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => setSelectedExamId(exam.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start justify-between ${
                      selectedExamId === exam.id
                        ? "bg-[#212815] border-[#C8FF3D] text-white shadow-[0_0_15px_rgba(200,255,61,0.2)]"
                        : "bg-[#1C1C22] border-[#2E2E36] text-neutral-300 hover:border-neutral-500"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#FF4FA3] block">
                        {exam.category}
                      </span>
                      <strong className="text-base font-black text-white block mt-0.5">
                        {exam.name}
                      </strong>
                      <span className="text-xs text-neutral-400 block line-clamp-1">
                        {exam.fullName}
                      </span>
                    </div>
                    {selectedExamId === exam.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#C8FF3D] flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: PREPARATION LEVEL */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#FF4FA3]">
                  Step 2: Starting Baseline
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  What is your current preparation level for {selectedExam.name}?
                </h2>
                <p className="text-xs text-neutral-400">
                  This calibrates your initial diagnostic question difficulties.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: "beginner",
                    title: "Beginner / Just Starting",
                    desc: "Starting syllabus from scratch. Need fundamental concept drills and theory reviews first.",
                    icon: "🌱",
                  },
                  {
                    id: "intermediate",
                    title: "Intermediate / Concept Familiar",
                    desc: "Covered basic formulas and topics. Need timed sectional practice and speed optimization.",
                    icon: "⚡",
                  },
                  {
                    id: "advanced",
                    title: "Advanced / Mock Re-tester",
                    desc: "Completed entire syllabus. Focus on high-difficulty questions and eliminating mistake patterns.",
                    icon: "🎯",
                  },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setPrepLevel(lvl.id as any)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                      prepLevel === lvl.id
                        ? "bg-[#261821] border-[#FF4FA3] text-white shadow-[0_0_15px_rgba(255,79,163,0.2)]"
                        : "bg-[#1C1C22] border-[#2E2E36] text-neutral-300 hover:border-neutral-500"
                    }`}
                  >
                    <span className="text-2xl">{lvl.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-white">{lvl.title}</h4>
                      <p className="text-xs text-neutral-400 mt-0.5">{lvl.desc}</p>
                    </div>
                    {prepLevel === lvl.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#FF4FA3] flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: EXAM DATE & TARGET SCORE */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#5B3DF5]">
                  Step 3: Timeline &amp; Targets
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  When is your exam, and what is your goal?
                </h2>
                <p className="text-xs text-neutral-400">
                  Your study calendar dynamically schedules daily milestones leading to this date.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                    Target Exam Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#5B3DF5] focus:outline-none text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                    Target Percentile / Score
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      value={targetScore}
                      onChange={(e) => setTargetScore(e.target.value)}
                      placeholder="e.g. 99.5%ile or 720+"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#5B3DF5] focus:outline-none text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1C1C22] border border-[#2E2E36] text-xs text-neutral-400 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#5B3DF5] flex-shrink-0" />
                <span>
                  VEZEI calculates study pacing so you complete 100% syllabus coverage at least 3 weeks before test day for full mock revisions.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: DAILY TIME COMMITMENT */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#C8FF3D]">
                  Step 4: Daily Availability
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  How many minutes can you study per day?
                </h2>
                <p className="text-xs text-neutral-400">
                  Consistency beats binge-studying. We tune your daily quest goals accordingly.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { minutes: 30, label: "30 Mins", tag: "Sprint" },
                  { minutes: 60, label: "60 Mins", tag: "Recommended" },
                  { minutes: 90, label: "90 Mins", tag: "Intense" },
                  { minutes: 120, label: "2 Hours", tag: "Full-Time" },
                ].map((opt) => (
                  <button
                    key={opt.minutes}
                    type="button"
                    onClick={() => setDailyMinutes(opt.minutes)}
                    className={`p-4 rounded-2xl border-2 text-center transition-all ${
                      dailyMinutes === opt.minutes
                        ? "bg-[#212815] border-[#C8FF3D] text-white shadow-[0_0_15px_rgba(200,255,61,0.2)]"
                        : "bg-[#1C1C22] border-[#2E2E36] text-neutral-300 hover:border-neutral-500"
                    }`}
                  >
                    <span className="text-lg font-black text-white block">{opt.label}</span>
                    <span className="text-[10px] uppercase font-bold text-[#FF4FA3] block mt-1">
                      {opt.tag}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                  Language Preference
                </label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                >
                  <option value="English">English</option>
                  <option value="Hinglish">English + Hindi Conceptual Explanations</option>
                </select>
              </div>
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          <div className="pt-6 border-t border-[#2A2A2E] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-3 rounded-xl text-xs font-bold text-neutral-400 hover:text-white bg-[#111111] border border-[#2E2E36] flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn-tactile-lime px-6 py-3 rounded-xl text-xs font-black flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                disabled={loading}
                className="btn-tactile-lime px-7 py-3.5 rounded-xl text-sm font-black flex items-center gap-2"
              >
                {loading ? (
                  <span>Building Personalized Plan...</span>
                ) : (
                  <>
                    <span>Generate My Dashboard (+100 XP)</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
