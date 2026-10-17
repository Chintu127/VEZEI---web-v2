"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Flame, Trophy, Swords, Zap, Award, Target, CheckCircle2, Lock } from "lucide-react";
import { SKILL_TREE_NODES } from "@/data/gamification";

export function GamificationSection() {
  const [activeTab, setActiveTab] = useState<"skilltree" | "streaks" | "achievements">("skilltree");

  return (
    <section className="py-24 bg-[#111111] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF4FA3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5B3DF5]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1C1E] border border-[#FF4FA3]/40 text-[#FF4FA3] text-xs font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-[#FF4FA3]" />
            Gamification Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Study Loops That Keep You Addicted to Progress.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Exam prep doesn't have to feel like isolation. Unlock skill trees, defend streaks, conquer Boss challenges, and rank in weekly leagues.
          </p>

          {/* Interactive Feature Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#1C1C20] border border-[#2E2E36] mt-4">
            <button
              onClick={() => setActiveTab("skilltree")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "skilltree"
                  ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Interactive Skill Tree
            </button>
            <button
              onClick={() => setActiveTab("streaks")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "streaks"
                  ? "bg-[#FF4FA3] text-white shadow-[2px_2px_0px_#111111]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Streak &amp; Habit Engine
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "achievements"
                  ? "bg-[#5B3DF5] text-white shadow-[2px_2px_0px_#111111]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Achievements &amp; Leagues
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === "skilltree" && (
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2E]">
                <div>
                  <h3 className="text-lg font-black text-white">Quantitative Aptitude: Arithmetic Path</h3>
                  <p className="text-xs text-neutral-400">Master prerequisites to unlock the final Boss Node</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#111111] text-[#C8FF3D] border border-[#C8FF3D]/30 text-xs font-bold">
                  2/6 Completed
                </span>
              </div>

              {/* Connected Node Visualizer */}
              <div className="space-y-4">
                {SKILL_TREE_NODES.map((node, index) => (
                  <div
                    key={node.id}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      node.status === "completed"
                        ? "bg-[#1C2417] border-[#C8FF3D]/50 text-white"
                        : node.status === "available"
                        ? "bg-[#201D2E] border-[#5B3DF5] text-white shadow-[0_0_20px_rgba(91,61,245,0.25)]"
                        : node.status === "boss"
                        ? "bg-[#29171E] border-[#FF4FA3] text-white"
                        : "bg-[#161619] border-[#2A2A2E] text-neutral-500 opacity-75"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border-2 border-[#111111] ${
                          node.status === "completed"
                            ? "bg-[#C8FF3D] text-[#111111]"
                            : node.status === "available"
                            ? "bg-[#5B3DF5] text-white"
                            : node.status === "boss"
                            ? "bg-[#FF4FA3] text-white"
                            : "bg-neutral-800 text-neutral-500"
                        }`}
                      >
                        {node.status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : node.status === "boss" ? (
                          <Swords className="w-5 h-5" />
                        ) : node.status === "locked" ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-sm sm:text-base text-white">{node.title}</h4>
                          {node.status === "boss" && (
                            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#FF4FA3] text-white">
                              Boss Challenge
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5 max-w-lg">{node.description}</p>
                      </div>
                    </div>

                    <div className="text-right flex items-center gap-3">
                      <span className="hidden sm:inline-block text-xs font-bold text-[#C8FF3D]">
                        +{node.xpReward} XP
                      </span>
                      {node.status === "available" ? (
                        <Link
                          href="/app/learn"
                          className="btn-tactile-lime px-4 py-1.5 rounded-xl text-xs font-black"
                        >
                          Start
                        </Link>
                      ) : node.status === "completed" ? (
                        <span className="text-xs font-bold text-[#C8FF3D]">Mastered</span>
                      ) : (
                        <span className="text-xs text-neutral-500 font-bold">Locked</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "streaks" && (
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#FF4FA3] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] mx-auto flex items-center justify-center text-white">
                  <Flame className="w-8 h-8 fill-white" />
                </div>
                <h4 className="text-xl font-black text-white">Habit Psychology</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Daily streaks build the continuous cognitive retention required for competitive tests like CAT and GATE.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#C8FF3D] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] mx-auto flex items-center justify-center text-black">
                  <Zap className="w-8 h-8 fill-black" />
                </div>
                <h4 className="text-xl font-black text-white">Streak Freezes</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Life happens. VEZEI grants built-in streak shields so an unexpected exam or illness doesn’t punish your genuine hard work.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#5B3DF5] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] mx-auto flex items-center justify-center text-white">
                  <Trophy className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-white">Server-Verified XP</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every XP point comes from verified question submissions and lesson completions on an immutable ledger.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#1F1F24] border border-[#C8FF3D]/40 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#C8FF3D] border-2 border-[#111111] flex items-center justify-center text-black font-black">
                  🎯
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">Sharpshooter Ace</h4>
                  <p className="text-xs text-neutral-400">100% accuracy in 10-question drill</p>
                  <span className="text-[10px] text-[#C8FF3D] font-bold">+200 XP Unlocked</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1F1F24] border border-[#FF4FA3]/40 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#FF4FA3] border-2 border-[#111111] flex items-center justify-center text-white font-black">
                  🔥
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">Iron Discipline</h4>
                  <p className="text-xs text-neutral-400">30-day continuous study streak</p>
                  <span className="text-[10px] text-[#FF4FA3] font-bold">+1000 XP Legendary</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1F1F24] border border-[#5B3DF5]/40 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#5B3DF5] border-2 border-[#111111] flex items-center justify-center text-white font-black">
                  ⚔️
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">Boss Slayer</h4>
                  <p className="text-xs text-neutral-400">Conquer your first curriculum Boss Node</p>
                  <span className="text-[10px] text-[#5B3DF5] font-bold">+500 XP Epic</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
