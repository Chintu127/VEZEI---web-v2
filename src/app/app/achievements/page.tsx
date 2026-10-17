"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppProvider";
import {
  Award,
  Trophy,
  Flame,
  Zap,
  Lock,
  CheckCircle2,
  ShieldAlert,
  Crosshair,
  Swords,
  Crown,
} from "lucide-react";

export default function AchievementsPage() {
  const { achievements } = useApp();
  const [filterCat, setFilterCat] = useState("All");

  const categories = ["All", "streak", "practice", "speed", "special"];

  const filtered = achievements.filter(
    (a) => filterCat === "All" || a.category === filterCat
  );

  const unlockedCount = achievements.filter((a) => a.is_unlocked).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#FF4FA3]/40 text-[#FF4FA3] text-xs font-black uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Milestone Vault
          </div>
          <h1 className="text-3xl font-black text-white">Student Achievements</h1>
          <p className="text-xs text-neutral-400">
            Earn badges and high-yield XP rewards by conquering challenging preparation milestones.
          </p>
        </div>

        <div className="px-5 py-2.5 rounded-2xl bg-[#17171C] border border-[#2E2E36] text-right">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
            Badges Unlocked
          </span>
          <span className="text-lg font-black text-[#C8FF3D]">
            {unlockedCount} / {achievements.length} Unlocked
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              filterCat === cat
                ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                : "bg-[#17171C] text-neutral-400 border border-[#2E2E36] hover:text-white"
            }`}
          >
            {cat === "All" ? "All Milestones" : `${cat} Badges`}
          </button>
        ))}
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ach) => {
          const isUnlocked = ach.is_unlocked;

          let rarityColor = "#C8FF3D";
          if (ach.rarity === "rare") rarityColor = "#5B3DF5";
          if (ach.rarity === "epic") rarityColor = "#FF4FA3";
          if (ach.rarity === "legendary") rarityColor = "#FFD700";

          return (
            <div
              key={ach.id}
              className={`rounded-3xl p-6 border-2 transition-all flex flex-col justify-between space-y-4 ${
                isUnlocked
                  ? "bg-[#17171C] border-[#2E2E36] hover:border-[#C8FF3D] shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                  : "bg-[#131316] border-[#222226] opacity-60"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border-2 border-[#111111] shadow-[2px_2px_0px_#111111] ${
                      isUnlocked ? "bg-[#1F1F24]" : "bg-neutral-900"
                    }`}
                  >
                    {isUnlocked ? "🏆" : "🔒"}
                  </div>

                  <span
                    className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${rarityColor}20`,
                      color: rarityColor,
                      border: `1px solid ${rarityColor}40`,
                    }}
                  >
                    {ach.rarity}
                  </span>
                </div>

                <div>
                  <h3 className="font-black text-lg text-white">{ach.title}</h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2A2A2E] flex items-center justify-between text-xs font-bold">
                <span className="text-[#C8FF3D]">+{ach.xp_reward} XP</span>
                {isUnlocked ? (
                  <span className="text-neutral-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8FF3D]" />
                    Unlocked
                  </span>
                ) : (
                  <span className="text-neutral-500 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
