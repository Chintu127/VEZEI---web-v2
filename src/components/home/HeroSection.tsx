"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppProvider";
import {
  Sparkles,
  ArrowRight,
  Flame,
  Zap,
  CheckCircle2,
  BrainCircuit,
  Compass,
  Trophy,
  ChevronRight,
  Target,
} from "lucide-react";

export function HeroSection() {
  const { streak, levelInfo, addXp } = useApp();
  const [demoQuestDone, setDemoQuestDone] = useState(false);
  const [demoQuestClaimed, setDemoQuestClaimed] = useState(false);

  const handleTestSolve = () => {
    if (!demoQuestDone) {
      setDemoQuestDone(true);
      addXp(20, "Solved Daily Math Drill!");
    } else if (!demoQuestClaimed) {
      setDemoQuestClaimed(true);
      addXp(50, "Claimed Quest Reward: Daily Precision Sprint!");
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-[#111111]">
      {/* Subtle radial glow mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#5B3DF5]/15 via-[#C8FF3D]/10 to-[#FF4FA3]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Vision, Headline, Tagline, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1E] border border-[#2E2E34] shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8FF3D] animate-ping" />
              <span className="text-xs font-bold text-neutral-300 tracking-wide uppercase">
                One App. Every Exam. Your Path to Success.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
              Your exams. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8FF3D] via-[#FFFFFF] to-[#FF4FA3]">
                Your rules.
              </span>{" "}
              <br />
              Your victory.
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Turn preparation into progress. Learn smarter with AI, level up your skills, and get exam-ready one challenge at a time across CAT, GATE, GMAT, GRE, JEE, and more.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/signup"
                className="btn-tactile-lime w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black flex items-center justify-center gap-2"
              >
                <span>Start your journey</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/how-it-works"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-bold text-white bg-[#1C1C1E] hover:bg-[#252528] border-2 border-[#2A2A2E] shadow-[0_4px_0_#111111] transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5 text-[#C8FF3D]" />
                <span>Explore how VEZEI works</span>
              </Link>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-neutral-400 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
                <span>Server-Verified Scoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF4FA3]" />
                <span>Socratic AI Tutor Hints</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5B3DF5]" />
                <span>No Paywalls for Base Sylabbus</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Interactive Product Preview (Daily Quest, XP Progress, Recommendation) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-[#17171A] border-3 border-[#2A2A2E] rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-5">
              
              {/* Product Preview Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#C8FF3D] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center font-black text-black">
                    V
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-white">Target: CAT 2026</h2>
                    <p className="text-xs text-neutral-400">99.5%ile Mission Track</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#111111] border border-[#FF4FA3]/40 text-[#FF4FA3] text-xs font-black">
                    <Flame className="w-3.5 h-3.5 fill-[#FF4FA3]" />
                    <span>{streak.current}d streak</span>
                  </div>
                </div>
              </div>

              {/* Level & XP Progress Card */}
              <div className="p-4 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#C8FF3D] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-[#C8FF3D]" />
                    Level {levelInfo.level} — {levelInfo.title}
                  </span>
                  <span className="text-neutral-300">{levelInfo.currentLevelXp} XP</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-3 bg-[#111111] rounded-full overflow-hidden p-0.5 border border-[#2A2A2E]">
                  <div
                    className="h-full bg-gradient-to-r from-[#C8FF3D] to-[#FF4FA3] rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(12, levelInfo.progressPercent)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400">
                  <span>{levelInfo.progressPercent}% to Next Level</span>
                  <span>Target: {levelInfo.nextLevelXp} XP</span>
                </div>
              </div>

              {/* Today's Daily Quest (Interactive demo!) */}
              <div className="p-4 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#FF4FA3]/15 text-[#FF4FA3]">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-white">Today's Daily Quest</h3>
                      <p className="text-[11px] text-neutral-400">Solve Quantitative Sprint</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#111111] text-[#C8FF3D] text-xs font-black border border-[#C8FF3D]/30">
                    +50 XP
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span>Progress: {demoQuestDone ? "10/10 questions" : "9/10 questions"}</span>
                  <span className="text-[#C8FF3D] font-bold">{demoQuestDone ? "100%" : "90%"}</span>
                </div>

                {/* Interactive button on product preview */}
                <button
                  onClick={handleTestSolve}
                  className={`w-full py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                    demoQuestClaimed
                      ? "bg-neutral-800 text-neutral-500 cursor-default"
                      : demoQuestDone
                      ? "btn-tactile-lime"
                      : "bg-[#5B3DF5] hover:bg-[#4E32DC] text-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111]"
                  }`}
                >
                  {demoQuestClaimed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
                      <span>Quest Completed & XP Claimed</span>
                    </>
                  ) : demoQuestDone ? (
                    <>
                      <Trophy className="w-4 h-4 text-black" />
                      <span>Claim +50 XP Reward!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Simulate Solving 10th Question (+20 XP)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Personalized AI Recommendation Preview */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1C1C24] to-[#17171C] border border-[#5B3DF5]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-[#5B3DF5]" />
                    <span className="text-xs font-black text-white">AI Diagnostic Focus</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF4FA3] bg-[#FF4FA3]/15 px-2 py-0.5 rounded-full">
                    Weak Topic
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-snug">
                  Accuracy in <strong>Profit & Loss (Marked Price)</strong> is 58%. Recommended: 10 targeted adaptive drill questions.
                </p>
                <Link
                  href="/app/practice"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#C8FF3D] hover:underline pt-1"
                >
                  <span>Launch Practice Drill</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

            {/* Decorative background badges */}
            <div className="hidden sm:block absolute -top-5 -right-5 p-3 rounded-2xl bg-[#FF4FA3] text-black font-black text-xs border-2 border-[#111111] shadow-[3px_3px_0px_#111111] rotate-6 animate-float">
              🔥 5-Day Streak Active!
            </div>
            <div className="hidden sm:block absolute -bottom-5 -left-5 p-3 rounded-2xl bg-[#C8FF3D] text-[#111111] font-black text-xs border-2 border-[#111111] shadow-[3px_3px_0px_#111111] -rotate-3">
              ⚡ +100 XP Level Up Soon
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
