"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LEADERBOARD_DATA, LeaderboardUser } from "@/data/gamification";
import { Trophy, Flame, Shield, ArrowRight, Sparkles, Swords } from "lucide-react";

export default function LeaderboardPage() {
  const [selectedLeague, setSelectedLeague] = useState<"Diamond" | "Platinum" | "Gold">("Diamond");

  const leagues = [
    { name: "Diamond", color: "#C8FF3D", icon: "💎", description: "Top 1% of global aspirants" },
    { name: "Platinum", color: "#FF4FA3", icon: "⚡", description: "Top 5% of active contenders" },
    { name: "Gold", color: "#5B3DF5", icon: "🏆", description: "High-momentum aspirants" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#FF4FA3] bg-[#1C1C1E] border border-[#FF4FA3]/30 px-3 py-1 rounded-full">
              Weekly League Arena
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              Global Aspirant Leaderboards
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg">
              Compete with students preparing for the same entrance examinations. Weekly XP is verified on an immutable ledger with zero tolerance for manipulation.
            </p>

            {/* League Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-[#1C1C22] border border-[#2E2E36] mt-4">
              {leagues.map((lg) => (
                <button
                  key={lg.name}
                  onClick={() => setSelectedLeague(lg.name as any)}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    selectedLeague === lg.name
                      ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span>{lg.icon}</span>
                  <span>{lg.name} League</span>
                </button>
              ))}
            </div>
          </div>

          {/* Leaderboard Table Container */}
          <div className="max-w-4xl mx-auto bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2A2A2E] gap-2">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#C8FF3D]" />
                  <span>{selectedLeague} Division Standings</span>
                </h2>
                <p className="text-xs text-neutral-400">Weekly sprint ends in 2 days, 14 hours</p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-[#C8FF3D] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#C8FF3D]" /> Top 3 Promoted
                </span>
                <span className="flex items-center gap-1 text-[#FF4FA3] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#FF4FA3]" /> Bottom 3 Demoted
                </span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-3">
              {LEADERBOARD_DATA.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between text-xs sm:text-sm transition-all ${
                    entry.isCurrentUser
                      ? "bg-[#252818] border-[#C8FF3D] text-white shadow-[0_0_20px_rgba(200,255,61,0.25)]"
                      : "bg-[#1C1C22] border-[#2E2E36] text-neutral-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-7 text-center font-black text-base ${
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

                    <span className="text-2xl">{entry.avatar}</span>

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
                      <span className="text-xs text-neutral-400">{entry.exam}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div className="flex items-center gap-1 text-[#FF4FA3] font-bold">
                      <Flame className="w-4 h-4 fill-[#FF4FA3]" />
                      <span>{entry.streakDays}d streak</span>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-[#111111] border border-[#2A2A2E] text-white font-black">
                      {entry.weeklyXp.toLocaleString()} XP
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Anti-cheat & Security Guarantee */}
            <div className="pt-4 border-t border-[#2A2A2E] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#C8FF3D]" />
                Server-Authoritative XP Ledger (Idempotent Rewards)
              </span>
              <Link href="/signup" className="text-[#C8FF3D] font-bold hover:underline">
                Join the League &amp; Start Ranking →
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
