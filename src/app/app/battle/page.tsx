"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppProvider";
import {
  Swords,
  Flame,
  Zap,
  Trophy,
  Users,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function BattleArenaPage() {
  const { user, addXp } = useApp();
  const [matchmaking, setMatchmaking] = useState(false);
  const [matchFound, setMatchFound] = useState(false);

  const startMatchmaking = () => {
    setMatchmaking(true);
    setTimeout(() => {
      setMatchmaking(false);
      setMatchFound(true);
    }, 1800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#29171E] border border-[#FF4FA3]/40 text-[#FF4FA3] text-xs font-black uppercase tracking-wider">
            <Swords className="w-3.5 h-3.5" />
            Competitive Arena
          </div>
          <h1 className="text-3xl font-black text-white">Quiz Battle Arena</h1>
          <p className="text-xs text-neutral-400">
            Challenge study partners to 5-question speed duels. Test your intuition under high-speed pressure.
          </p>
        </div>

        <span className="text-xs font-black px-4 py-2 rounded-xl bg-[#17171C] border border-[#2E2E36] text-[#FF4FA3]">
          League: Diamond Tier
        </span>
      </div>

      {/* Main Duel Modes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 1v1 Live Duel Card */}
        <div className="bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#FF4FA3] rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FF4FA3] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center text-white">
              <Swords className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black text-white">1v1 Real-Time Speed Duel</h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Matched against an aspirant with similar proficiency. 5 questions, 30 seconds each. Highest accuracy &amp; velocity wins +150 XP!
            </p>

            <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Time Limit:</span>
                <span className="text-white font-bold">30s / question</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">XP Bounty:</span>
                <span className="text-[#C8FF3D] font-bold">+150 XP Winner / +30 XP Runner-up</span>
              </div>
            </div>
          </div>

          <div>
            {matchFound ? (
              <div className="p-4 rounded-2xl bg-[#1C2818] border border-[#C8FF3D] text-center space-y-3">
                <span className="text-xs font-bold text-[#C8FF3D] block">
                  Opponent Found: Aarav Sharma (CAT 99.2%ile)
                </span>
                <Link
                  href="/app/practice/session?mode=battle"
                  className="btn-tactile-lime w-full py-3 rounded-xl text-xs font-black block text-center"
                >
                  Enter Duel Now!
                </Link>
              </div>
            ) : (
              <button
                onClick={startMatchmaking}
                disabled={matchmaking}
                className="btn-tactile-pink w-full py-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2"
              >
                {matchmaking ? (
                  <span>Searching for Aspirants...</span>
                ) : (
                  <>
                    <span>Match with Live Aspirant</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Boss Raid Challenge Card */}
        <div className="bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#5B3DF5] rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#5B3DF5] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center text-white">
              <Trophy className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black text-white">Arithmetic Boss Challenge</h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Tackle an advanced 10-question mixed-topic challenge combining high-difficulty Quantitative Aptitude questions under official negative marking.
            </p>

            <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Boss Node:</span>
                <span className="text-[#5B3DF5] font-bold">Node #Boss Quantitative</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Completion Reward:</span>
                <span className="text-[#C8FF3D] font-bold">+250 XP + Boss Slayer Badge</span>
              </div>
            </div>
          </div>

          <Link
            href="/app/practice/session?mode=boss"
            className="btn-tactile-purple w-full py-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 text-center"
          >
            <span>Conquer Boss Node</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
