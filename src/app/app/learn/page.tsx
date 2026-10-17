"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppProvider";
import { SKILL_TREE_NODES, SkillNode } from "@/data/gamification";
import {
  GitBranch,
  CheckCircle2,
  Lock,
  Swords,
  Play,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export default function LearnMapPage() {
  const { user } = useApp();
  const [selectedSubject, setSelectedSubject] = useState("Quantitative Aptitude");

  const subjects = [
    "Quantitative Aptitude",
    "Data Interpretation & LR",
    "Verbal Ability & Reading Comprehension",
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#5B3DF5]/40 text-[#5B3DF5] text-xs font-black uppercase tracking-wider">
            <GitBranch className="w-3.5 h-3.5" />
            Interactive Skill Tree
          </div>
          <h1 className="text-3xl font-black text-white">Curriculum Learning Map</h1>
          <p className="text-xs text-neutral-400">
            Progress through structured prerequisite milestones. Complete lessons to unlock subsequent nodes and the section Boss Node.
          </p>
        </div>

        <span className="text-xs font-black px-4 py-2 rounded-xl bg-[#17171C] border border-[#2E2E36] text-[#C8FF3D]">
          Target: {user?.targetExamName || "CAT 2026"}
        </span>
      </div>

      {/* Subject Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              selectedSubject === sub
                ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                : "bg-[#17171C] text-neutral-400 border border-[#2E2E36] hover:text-white"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Visual Connected Learning Path */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2E]">
            <h2 className="text-lg font-black text-white">{selectedSubject} Track</h2>
            <span className="text-xs font-bold text-neutral-400">
              1 / {SKILL_TREE_NODES.length} Nodes Mastered
            </span>
          </div>

          <div className="relative space-y-4">
            {SKILL_TREE_NODES.map((node, idx) => {
              const isCompleted = node.status === "completed";
              const isAvailable = node.status === "available";
              const isBoss = node.status === "boss";
              const isLocked = node.status === "locked";

              return (
                <div
                  key={node.id}
                  className={`p-5 rounded-2xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    isCompleted
                      ? "bg-[#1C2417] border-[#C8FF3D]/50 text-white"
                      : isAvailable
                      ? "bg-[#201D2E] border-[#5B3DF5] text-white shadow-[0_0_20px_rgba(91,61,245,0.25)]"
                      : isBoss
                      ? "bg-[#29171E] border-[#FF4FA3] text-white"
                      : "bg-[#141417] border-[#2A2A2E] text-neutral-500 opacity-60"
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base border-2 border-[#111111] flex-shrink-0 ${
                        isCompleted
                          ? "bg-[#C8FF3D] text-[#111111]"
                          : isAvailable
                          ? "bg-[#5B3DF5] text-white"
                          : isBoss
                          ? "bg-[#FF4FA3] text-white"
                          : "bg-neutral-800 text-neutral-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : isBoss ? (
                        <Swords className="w-6 h-6" />
                      ) : isLocked ? (
                        <Lock className="w-5 h-5" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-base text-white">{node.title}</h3>
                        {isBoss && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF4FA3] text-white">
                            Boss Challenge
                          </span>
                        )}
                        {isAvailable && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#5B3DF5] text-white">
                            Up Next
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
                        {node.description}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-neutral-400 pt-1">
                        <span>{node.estimatedMinutes} Mins</span>
                        <span>•</span>
                        <span>{node.questionCount} Questions</span>
                        <span>•</span>
                        <span className="text-[#C8FF3D] font-bold">+{node.xpReward} XP</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <Link
                        href={`/app/learn/${node.id}`}
                        className="px-4 py-2 rounded-xl bg-[#111111] text-[#C8FF3D] border border-[#C8FF3D]/40 text-xs font-bold inline-block"
                      >
                        Review Theory
                      </Link>
                    ) : isAvailable ? (
                      <Link
                        href={`/app/learn/${node.id}`}
                        className="btn-tactile-purple px-5 py-2.5 rounded-xl text-xs font-black inline-flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Start Lesson</span>
                      </Link>
                    ) : isBoss ? (
                      <button
                        disabled
                        className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-500 text-xs font-bold"
                      >
                        Unlock via Prior Nodes
                      </button>
                    ) : (
                      <span className="text-xs text-neutral-600 font-bold">Locked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
}
