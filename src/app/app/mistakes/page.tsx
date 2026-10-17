"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppProvider";
import {
  BookX,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Filter,
  Sparkles,
} from "lucide-react";

export default function MistakeNotebookPage() {
  const { mistakes, resolveMistake } = useApp();
  const [filterType, setFilterType] = useState<string>("All");

  const unresolved = mistakes.filter((m) => !m.mastered);
  const mastered = mistakes.filter((m) => m.mastered);

  const filteredMistakes = unresolved.filter((m) => {
    if (filterType === "All") return true;
    return m.errorType === filterType;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#29171E] border border-[#FF4FA3]/40 text-[#FF4FA3] text-xs font-black uppercase tracking-wider">
            <BookX className="w-3.5 h-3.5" />
            Active Revision Journal
          </div>
          <h1 className="text-3xl font-black text-white">Mistake Notebook</h1>
          <p className="text-xs text-neutral-400">
            Every incorrect answer is logged here. Eliminate these errors to turn weak topics into guaranteed marks.
          </p>
        </div>

        {unresolved.length > 0 && (
          <Link
            href="/app/practice?mode=mistakes"
            className="btn-tactile-lime px-6 py-3 rounded-xl text-xs font-black flex items-center gap-2 flex-shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retest These Mistakes</span>
          </Link>
        )}
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#17171C] border-2 border-[#2E2E36] text-center">
          <span className="text-xs font-bold text-neutral-400 block">Unresolved Errors</span>
          <span className="text-3xl font-black text-[#FF4FA3] mt-1 block">
            {unresolved.length}
          </span>
          <span className="text-[10px] text-neutral-500">Require Concept Retest</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#17171C] border-2 border-[#2E2E36] text-center">
          <span className="text-xs font-bold text-neutral-400 block">Mastered &amp; Cleared</span>
          <span className="text-3xl font-black text-[#C8FF3D] mt-1 block">
            {mastered.length}
          </span>
          <span className="text-[10px] text-neutral-500">+30 XP Each Upon Mastery</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#17171C] border-2 border-[#2E2E36] text-center">
          <span className="text-xs font-bold text-neutral-400 block">Resolution Rate</span>
          <span className="text-3xl font-black text-white mt-1 block">
            {mistakes.length > 0
              ? `${Math.round((mastered.length / mistakes.length) * 100)}%`
              : "100%"}
          </span>
          <span className="text-[10px] text-neutral-500">Error Elimination Progress</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {["All", "conceptual", "calculation", "time_pressure", "misread"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              filterType === type
                ? "bg-[#FF4FA3] text-white shadow-[2px_2px_0px_#111111]"
                : "bg-[#17171C] text-neutral-400 border border-[#2E2E36] hover:text-white"
            }`}
          >
            {type === "All" ? "All Error Types" : `${type.replace("_", " ")} Slips`}
          </button>
        ))}
      </div>

      {/* Mistakes List */}
      <div className="space-y-4">
        {filteredMistakes.length === 0 ? (
          <div className="p-12 text-center bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#C8FF3D] mx-auto" />
            <h3 className="text-xl font-black text-white">Clean Error Slate!</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              You have no active mistakes matching this filter. Keep practicing drills to discover new learning edges.
            </p>
            <div className="pt-2">
              <Link href="/app/practice" className="btn-tactile-lime px-6 py-2.5 rounded-xl text-xs font-black inline-block">
                Start a New Practice Drill
              </Link>
            </div>
          </div>
        ) : (
          filteredMistakes.map((m) => (
            <div
              key={m.id}
              className="bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#FF4FA3]/50 rounded-3xl p-6 sm:p-8 space-y-4 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#2A2A2E]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#111111] text-[#FF4FA3] border border-[#FF4FA3]/30">
                    {m.errorType}
                  </span>
                  <span className="text-xs font-bold text-white">{m.subject}</span>
                  <span className="text-xs text-neutral-500">• {m.topic}</span>
                </div>

                <span className="text-xs text-neutral-500">Logged on {m.addedAt}</span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                {m.prompt}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#29171E] border border-[#FF4FA3]/40 text-[#FF4FA3]">
                  <strong className="block font-bold">Your Submitted Answer:</strong>
                  <span>{m.wrongOption}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#1C2818] border border-[#C8FF3D]/40 text-[#C8FF3D]">
                  <strong className="block font-bold">Verified Correct Answer:</strong>
                  <span>{m.correctAnswer}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] text-xs space-y-1">
                <strong className="text-neutral-400 block font-bold">Explanation &amp; Strategy:</strong>
                <p className="text-neutral-300 whitespace-pre-line leading-relaxed">{m.explanation}</p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={`/app/ai-tutor?doubt=${encodeURIComponent(m.prompt)}`}
                  className="text-xs font-bold text-[#5B3DF5] hover:underline"
                >
                  Ask AI Tutor to Clarify Concept →
                </Link>

                <button
                  onClick={() => resolveMistake(m.id)}
                  className="btn-tactile-lime px-5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Mastered (+30 XP)</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
