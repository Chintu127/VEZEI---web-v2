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
} from "lucide-react";

export default function AnalyticsPage() {
  const { user } = useApp();

  const sectionalData = [
    { name: "Quantitative Aptitude", accuracy: 72, solved: 142, avgTime: "2m 10s", status: "Improving" },
    { name: "Verbal Ability & Reading (VARC)", accuracy: 84, solved: 185, avgTime: "1m 30s", status: "Mastered" },
    { name: "Data Interpretation & LR (DILR)", accuracy: 65, solved: 98, avgTime: "2m 45s", status: "Needs Practice" },
  ];

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

      {/* Readiness Gauge Hero Card */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 text-center space-y-2 border-b md:border-b-0 md:border-r border-[#2A2A2E] pb-6 md:pb-0 md:pr-6">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
              Estimated Exam Readiness
            </span>
            <div className="relative inline-flex items-center justify-center">
              <span className="text-5xl font-black text-[#C8FF3D]">84%</span>
            </div>
            <span className="text-xs font-black text-white block">
              Projected Percentile: 98.4 – 99.1%ile
            </span>
            <p className="text-[11px] text-neutral-500">
              Derived from 425 verified question attempts and 2 proctored mocks
            </p>
          </div>

          <div className="md:col-span-8 space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF4FA3]" />
              Diagnostic Strategic Takeaway
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Your VARC comprehension speed is in the top 3% of candidates. However, your time-allocation in DILR matrix sets averages 2m 45s per question, resulting in 4 unattempted questions in past drills.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/app/practice?subject=DILR"
                className="btn-tactile-lime px-5 py-2.5 rounded-xl text-xs font-black"
              >
                Launch DILR Speed Drill
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Sectional Performance Breakdown */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-black text-white">Sectional Accuracy &amp; Velocity</h2>

        <div className="space-y-4">
          {sectionalData.map((sec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h4 className="font-black text-sm text-white">{sec.name}</h4>
                  <span className="text-xs text-neutral-400">
                    {sec.solved} Questions Solved • Avg Time: {sec.avgTime}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-white">{sec.accuracy}% Accuracy</span>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      sec.accuracy >= 80
                        ? "bg-[#1C2818] text-[#C8FF3D]"
                        : sec.accuracy >= 70
                        ? "bg-[#201D2E] text-[#5B3DF5]"
                        : "bg-[#29171E] text-[#FF4FA3]"
                    }`}
                  >
                    {sec.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    sec.accuracy >= 80
                      ? "bg-[#C8FF3D]"
                      : sec.accuracy >= 70
                      ? "bg-[#5B3DF5]"
                      : "bg-[#FF4FA3]"
                  }`}
                  style={{ width: `${sec.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speed vs Accuracy Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] space-y-3">
          <div className="flex items-center gap-2 text-[#C8FF3D]">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-black text-white text-base">High-Speed Strengths</h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Reading Comprehension Main Idea (45s avg, 94% accuracy) and Arithmetic Percentages (1m 10s avg, 88% accuracy).
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] space-y-3">
          <div className="flex items-center gap-2 text-[#FF4FA3]">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-black text-white text-base">Identified Time Traps</h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            DILR Circular Arrangements (3m 15s avg, 42% accuracy) and Modern Math Permutations (2m 40s avg, 50% accuracy).
          </p>
        </div>
      </div>

    </div>
  );
}
