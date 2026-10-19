"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppProvider";
import {
  BarChart3,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Target,
  Sparkles,
  ArrowRight,
  Play,
  Lightbulb,
} from "lucide-react";

export default function AnalyticsPage() {
  const { user, computedAnalytics } = useApp();

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/30 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" />
            Learning Intelligence
          </div>
          <h1 className="text-3xl font-black text-white">Performance Diagnostics</h1>
          <p className="text-xs text-neutral-400">
            Speed, accuracy, and topic retention analytics calibrated against historical examination norms.
          </p>
        </div>

        <span className="text-xs font-black px-4 py-2 rounded-xl bg-[#17171C] border border-[#2E2E36] text-[#C8FF3D]">
          Calibrated for: {user?.targetExamName || "CAT 2026"}
        </span>
      </div>

      {!computedAnalytics.hasActivity ? (
        /* Genuine Empty State when student has no attempts yet */
        <div className="p-10 rounded-3xl bg-[#17171C] border-2 border-dashed border-[#2E2E36] text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#C8FF3D] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] mx-auto flex items-center justify-center text-[#111111]">
            <BarChart3 className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h2 className="text-xl font-black text-white">
              No Practice Activity Recorded Yet
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Performance diagnostics and time-trap analysis require at least one completed practice drill or mock test. Your accuracy, pace, and weak topic alerts will appear here as soon as you submit answers.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/app/practice?exam=cat&count=10"
              className="btn-tactile-lime px-6 py-3 rounded-xl text-xs font-black inline-flex items-center gap-2"
            >
              <span>Take Your First 10-Question Diagnostic Drill</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Real Performance Telemetry */
        <>
          {/* Readiness Gauge Hero Card */}
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-4 text-center space-y-2 border-b md:border-b-0 md:border-r border-[#2A2A2E] pb-6 md:pb-0 md:pr-6">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                  Overall Accuracy
                </span>
                <div className="relative inline-flex items-center justify-center">
                  <span className="text-5xl font-black text-[#C8FF3D]">
                    {computedAnalytics.overallAccuracy}%
                  </span>
                </div>
                <span className="text-xs font-black text-white block">
                  {computedAnalytics.totalCorrect} Correct / {computedAnalytics.totalSolved} Questions
                </span>
                <p className="text-[11px] text-neutral-500">
                  Across {computedAnalytics.sessionsCompleted} recorded session{computedAnalytics.sessionsCompleted > 1 ? "s" : ""}
                </p>
              </div>

              <div className="md:col-span-8 space-y-4">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF4FA3]" />
                  <span>Explainable Guidance &amp; Next Steps</span>
                </h3>

                {computedAnalytics.weakTopics.length > 0 ? (
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Based on your attempts, your accuracy in <strong>{computedAnalytics.weakTopics[0].topic}</strong> ({computedAnalytics.weakTopics[0].accuracy}%) is below your target percentile threshold. We recommend completing 10 focused questions on this concept before attempting full-length timed tests.
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Strong foundational consistency observed across your questions! To build stamina for actual examination conditions, schedule your next full-length proctored mock simulation.
                  </p>
                )}

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/app/practice"
                    className="btn-tactile-lime px-5 py-2.5 rounded-xl text-xs font-black"
                  >
                    Launch Targeted Practice Drill
                  </Link>

                  <Link
                    href="/app/mock-tests"
                    className="px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-neutral-900 border border-[#2E2E36] text-xs font-bold text-white transition-all"
                  >
                    Open Mock Test Library
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* Real Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#17171C] border border-[#2E2E36] space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block">
                Total Solved
              </span>
              <span className="text-2xl font-black text-white">
                {computedAnalytics.totalSolved} Questions
              </span>
              <span className="text-xs text-neutral-400 block">
                {computedAnalytics.totalCorrect} verified correct
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#17171C] border border-[#2E2E36] space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block">
                Study Time
              </span>
              <span className="text-2xl font-black text-[#C8FF3D]">
                {computedAnalytics.timeSpentMinutes} Minutes
              </span>
              <span className="text-xs text-neutral-400 block">
                Recorded in session timers
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#17171C] border border-[#2E2E36] space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block">
                Proctored Mocks
              </span>
              <span className="text-2xl font-black text-[#5B3DF5]">
                {computedAnalytics.mockTestsCompleted} Completed
              </span>
              <span className="text-xs text-neutral-400 block">
                Full-length simulations
              </span>
            </div>
          </div>

          {/* Recent Attempt History */}
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-black text-white">Recent Session Records</h3>
            <div className="space-y-2">
              {computedAnalytics.recentAttempts.map((att, idx) => (
                <div
                  key={att.attemptId || idx}
                  className="p-4 rounded-xl bg-[#111111] border border-[#2A2A2E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-black text-white uppercase tracking-wider">
                      {att.examSlug.toUpperCase()} {att.mode === "mock" ? "Proctored Mock" : "Practice Drill"}
                    </span>
                    <span className="text-neutral-400 block">
                      {att.totalQuestions} questions &bull; Completed {new Date(att.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-black text-[#C8FF3D]">
                      {att.accuracy}% Accuracy ({att.score > 0 ? `+${att.score}` : att.score} pts)
                    </span>
                    <span className="text-neutral-400 font-mono">
                      {Math.round(att.timeSpentSeconds / 60)}m {att.timeSpentSeconds % 60}s
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
}
