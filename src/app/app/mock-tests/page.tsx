"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppProvider";
import {
  FileCheck2,
  Clock,
  Award,
  AlertTriangle,
  Play,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function MockTestsPage() {
  const { user } = useApp();

  const mocks = [
    {
      id: "mock-cat-01",
      title: "CAT 2026 Full-Length Proctored Mock #01",
      exam: "CAT (IIM Entrance)",
      durationMinutes: 120,
      totalQuestions: 66,
      totalMarks: 198,
      status: "completed",
      score: "88 / 198",
      percentile: "98.7%ile",
      dateAttempted: "Yesterday",
    },
    {
      id: "mock-cat-02",
      title: "CAT 2026 Full-Length Proctored Mock #02",
      exam: "CAT (IIM Entrance)",
      durationMinutes: 120,
      totalQuestions: 66,
      totalMarks: 198,
      status: "available",
      score: null,
      percentile: null,
    },
    {
      id: "mock-cat-03",
      title: "CAT 2026 High-Difficulty All-India Mock #03",
      exam: "CAT (IIM Entrance)",
      durationMinutes: 120,
      totalQuestions: 66,
      totalMarks: 198,
      status: "available",
      score: null,
      percentile: null,
    },
    {
      id: "mock-gate-01",
      title: "GATE CS 2026 Comprehensive Simulation",
      exam: "GATE Computer Science",
      durationMinutes: 180,
      totalQuestions: 65,
      totalMarks: 100,
      status: "available",
      score: null,
      percentile: null,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/30 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
            <FileCheck2 className="w-3.5 h-3.5" />
            Official Proctored Simulation
          </div>
          <h1 className="text-3xl font-black text-white">Full-Length Mock Test Library</h1>
          <p className="text-xs text-neutral-400">
            Replicate real exam pressure with authentic sectional timers, official calculators, and strict negative marking.
          </p>
        </div>

        <span className="text-xs font-black px-4 py-2 rounded-xl bg-[#17171C] border border-[#2E2E36] text-[#C8FF3D]">
          Target: {user?.targetExamName || "CAT 2026"}
        </span>
      </div>

      {/* Strict Testing Environment Notice */}
      <div className="p-5 rounded-2xl bg-[#181824] border-2 border-[#5B3DF5]/40 text-xs text-neutral-300 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#5B3DF5] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-white block font-bold">Proctored Simulation Rules:</strong>
          <p className="leading-relaxed">
            Full-length mocks lock your screen to emulate testing conditions. Sectional countdown timers cannot be paused, and unfinished sections are automatically submitted at zero seconds.
          </p>
        </div>
      </div>

      {/* Mocks Grid */}
      <div className="space-y-4">
        {mocks.map((mock) => {
          const isDone = mock.status === "completed";

          return (
            <div
              key={mock.id}
              className={`bg-[#17171C] border-2 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all ${
                isDone ? "border-[#C8FF3D]/40" : "border-[#2E2E36] hover:border-[#5B3DF5]"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#111111] text-[#FF4FA3]">
                    {mock.exam}
                  </span>
                  {isDone && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1C2818] text-[#C8FF3D] border border-[#C8FF3D]/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Attempted ({mock.dateAttempted})
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-white">{mock.title}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 font-semibold pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    {mock.durationMinutes} Minutes
                  </span>
                  <span>•</span>
                  <span>{mock.totalQuestions} Questions</span>
                  <span>•</span>
                  <span>Total Marks: {mock.totalMarks}</span>
                </div>
              </div>

              {/* Action Buttons / Results */}
              <div className="flex-shrink-0 text-right">
                {isDone ? (
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-lg font-black text-[#C8FF3D] block">
                        {mock.percentile}
                      </span>
                      <span className="text-xs text-neutral-400 font-bold">
                        Score: {mock.score}
                      </span>
                    </div>

                    <Link
                      href={`/app/results/${mock.id}`}
                      className="px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-neutral-800 text-white border border-[#2E2E36] text-xs font-black inline-block"
                    >
                      View Report
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={`/app/practice/session?exam=cat&mode=mock`}
                    className="btn-tactile-lime px-6 py-3 rounded-xl text-xs font-black flex items-center gap-2 inline-flex"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>Start Proctored Mock</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
