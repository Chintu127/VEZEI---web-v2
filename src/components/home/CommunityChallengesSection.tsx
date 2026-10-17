import React from "react";
import Link from "next/link";
import { Swords, Users, Trophy, Flame, ArrowRight, ShieldCheck } from "lucide-react";
import { LEADERBOARD_DATA } from "@/data/gamification";

export function CommunityChallengesSection() {
  return (
    <section className="py-24 bg-[#111111] border-t border-[#2A2A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1C1E] border border-[#FF4FA3]/40 text-[#FF4FA3] text-xs font-black uppercase tracking-wider">
            <Swords className="w-3.5 h-3.5" />
            Social Competition
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Learn Together. Battle Friends. Rank Higher.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Compete in weekly leagues, challenge study partners to 5-minute speed duels, and share verified solutions with serious aspirants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Community Challenges Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#FF4FA3] border-2 border-[#111111] flex items-center justify-center text-white">
                  <Swords className="w-5 h-5" />
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#111111] text-[#FF4FA3] border border-[#FF4FA3]/30">
                  Live Challenge
                </span>
              </div>
              <h3 className="text-xl font-black text-white">1v1 Speed Quiz Battles</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Send a 5-question speed drill link to a classmate or match with an aspirant preparing for the same exam. Both answer under strict 30-second timers!
              </p>
              <Link
                href="/app/battle"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF4FA3] hover:underline pt-1"
              >
                <span>Launch Quiz Challenge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#5B3DF5] border-2 border-[#111111] flex items-center justify-center text-white">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#111111] text-[#5B3DF5] border border-[#5B3DF5]/30">
                  Moderated
                </span>
              </div>
              <h3 className="text-xl font-black text-white">Curated Doubt Communities</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Connect with aspirants solving the exact same previous-year question sets. Upvote verified step-by-step solutions and earn community mentor badges.
              </p>
              <Link
                href="/app/community"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5B3DF5] hover:underline pt-1"
              >
                <span>Browse Exam Channels</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Live Weekly Leaderboard Preview */}
          <div className="lg:col-span-6 bg-[#17171C] border-3 border-[#2E2E36] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E]">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#C8FF3D]" />
                <h4 className="text-lg font-black text-white">Diamond League Leaderboard</h4>
              </div>
              <span className="text-xs font-bold text-neutral-400">Resets in 2d 14h</span>
            </div>

            <div className="space-y-2.5">
              {LEADERBOARD_DATA.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                    user.isCurrentUser
                      ? "bg-[#252818] border-[#C8FF3D] text-white shadow-[0_0_15px_rgba(200,255,61,0.2)]"
                      : "bg-[#1E1E24] border-[#2E2E36] text-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 text-center font-black ${
                        user.rank === 1
                          ? "text-[#C8FF3D]"
                          : user.rank === 2
                          ? "text-neutral-200"
                          : user.rank === 3
                          ? "text-[#FF4FA3]"
                          : "text-neutral-500"
                      }`}
                    >
                      #{user.rank}
                    </span>

                    <span className="text-lg">{user.avatar}</span>

                    <div>
                      <span className="font-bold text-white block">
                        {user.name} {user.isCurrentUser && "(You)"}
                      </span>
                      <span className="text-[11px] text-neutral-400">{user.exam}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div className="flex items-center gap-1 text-[#FF4FA3] font-bold">
                      <Flame className="w-3.5 h-3.5 fill-[#FF4FA3]" />
                      <span>{user.streakDays}d</span>
                    </div>
                    <span className="font-black text-white bg-[#111111] px-2.5 py-1 rounded-xl border border-[#2A2A2E]">
                      {user.weeklyXp.toLocaleString()} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/leaderboard"
                className="text-xs font-bold text-[#C8FF3D] hover:underline"
              >
                View Full Public Weekly Leaderboard →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
