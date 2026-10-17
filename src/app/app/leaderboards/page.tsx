"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppProvider";
import { LEADERBOARD_DATA } from "@/data/gamification";
import { Trophy, Flame, Shield, Users, ArrowUp, ArrowDown } from "lucide-react";

export default function AppLeaderboardsPage() {
  const { user } = useApp();
  const [tab, setTab] = useState<"division" | "friends">("division");

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/30 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            Weekly League Arena
          </div>
          <h1 className="text-3xl font-black text-white">Diamond Division Standings</h1>
          <p className="text-xs text-neutral-400">
            Rankings reset every Sunday at midnight. Top 3 contenders advance to Master League.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("division")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === "division"
                ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                : "bg-[#17171C] text-neutral-400 border border-[#2E2E36]"
            }`}
          >
            Diamond Division
          </button>
          <button
            onClick={() => setTab("friends")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === "friends"
                ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                : "bg-[#17171C] text-neutral-400 border border-[#2E2E36]"
            }`}
          >
            Study Partners
          </button>
        </div>
      </div>

      {/* Leaderboard Standings Card */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Promotion & Demotion indicators */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E] text-xs font-bold">
          <span className="flex items-center gap-1 text-[#C8FF3D]">
            <ArrowUp className="w-4 h-4" /> Top 3 Promoted to Masters
          </span>
          <span className="flex items-center gap-1 text-[#FF4FA3]">
            <ArrowDown className="w-4 h-4" /> Bottom 3 Demoted
          </span>
        </div>

        <div className="space-y-2.5">
          {LEADERBOARD_DATA.map((entry) => (
            <div
              key={entry.id}
              className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs sm:text-sm transition-all ${
                entry.isCurrentUser
                  ? "bg-[#252818] border-[#C8FF3D] text-white shadow-[0_0_15px_rgba(200,255,61,0.2)]"
                  : "bg-[#111111] border-[#2E2E36] text-neutral-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`w-6 text-center font-black ${
                    entry.rank === 1
                      ? "text-[#C8FF3D]"
                      : entry.rank === 2
                      ? "text-neutral-200"
                      : entry.rank === 3
                      ? "text-[#FF4FA3]"
                      : "text-neutral-500"
                  }`}
                >
                  #{entry.rank}
                </span>

                <span className="text-xl">{entry.avatar}</span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">
                      {entry.name}
                    </span>
                    {entry.isCurrentUser && (
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#C8FF3D] text-black">
                        You
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-neutral-500">{entry.exam}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div className="flex items-center gap-1 text-[#FF4FA3] font-bold">
                  <Flame className="w-3.5 h-3.5 fill-[#FF4FA3]" />
                  <span>{entry.streakDays}d</span>
                </div>
                <span className="font-black text-white bg-[#17171C] px-3 py-1.5 rounded-xl border border-[#2A2A2E]">
                  {entry.weeklyXp.toLocaleString()} XP
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
