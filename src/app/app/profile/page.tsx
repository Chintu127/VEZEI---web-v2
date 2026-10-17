"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppProvider";
import {
  User,
  Flame,
  Zap,
  Trophy,
  Target,
  Clock,
  Settings,
  Sparkles,
  Edit2,
  Check,
} from "lucide-react";

export default function ProfilePage() {
  const { user, updateUser, streak, levelInfo, xp, achievements } = useApp();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.fullName || "Revanth");
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || "🎯");

  const avatarOptions = ["🎯", "🚀", "👨‍🎓", "👩‍💼", "⚡", "🧠", "🔥", "✨", "👑"];

  const handleSave = () => {
    updateUser({
      fullName: name,
      avatar: selectedAvatar,
    });
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header Profile Card */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-[#111111] border-2 border-[#C8FF3D] flex items-center justify-center text-4xl shadow-[3px_3px_0px_#111111]">
              {selectedAvatar}
            </div>

            <div className="space-y-1">
              {editing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[#111111] border border-[#C8FF3D] text-white font-bold text-lg"
                  />
                  <button
                    onClick={handleSave}
                    className="p-2 rounded-xl bg-[#C8FF3D] text-black font-black"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    {user?.fullName || "Aspirant"}
                  </h1>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-neutral-500 hover:text-white p-1"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              <p className="text-xs text-neutral-400">{user?.email || "revanth@vezei.com"}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#111111] text-[#C8FF3D] border border-[#C8FF3D]/30">
                  {user?.targetExamName || "CAT 2026"}
                </span>
                <span className="text-xs text-neutral-400 font-bold">
                  {levelInfo.title}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/app/settings"
            className="px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-neutral-800 text-neutral-300 text-xs font-bold border border-[#2E2E36] flex items-center gap-2 self-start sm:self-auto"
          >
            <Settings className="w-4 h-4" />
            <span>Account Settings</span>
          </Link>
        </div>

        {/* Avatar picker if editing */}
        {editing && (
          <div className="pt-6 border-t border-[#2A2A2E] space-y-2">
            <span className="text-xs font-bold text-neutral-400">Choose Profile Avatar:</span>
            <div className="flex items-center gap-3">
              {avatarOptions.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setSelectedAvatar(av)}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border-2 ${
                    selectedAvatar === av
                      ? "bg-[#212815] border-[#C8FF3D]"
                      : "bg-[#111111] border-[#2E2E36]"
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Career Learning Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#17171C] border-2 border-[#2E2E36] text-center">
          <span className="text-xs font-bold text-neutral-400 block">Total Lifetime XP</span>
          <span className="text-2xl sm:text-3xl font-black text-[#C8FF3D] mt-1 block">
            {xp.toLocaleString()}
          </span>
          <span className="text-[10px] text-neutral-500">Immutable Ledger</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#17171C] border-2 border-[#2E2E36] text-center">
          <span className="text-xs font-bold text-neutral-400 block">Current Streak</span>
          <span className="text-2xl sm:text-3xl font-black text-[#FF4FA3] mt-1 block">
            {streak.current} Days
          </span>
          <span className="text-[10px] text-neutral-500">Record: {streak.longest}d</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#17171C] border-2 border-[#2E2E36] text-center">
          <span className="text-xs font-bold text-neutral-400 block">Current Level</span>
          <span className="text-2xl sm:text-3xl font-black text-[#5B3DF5] mt-1 block">
            Level {levelInfo.level}
          </span>
          <span className="text-[10px] text-neutral-500">{levelInfo.title}</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#17171C] border-2 border-[#2E2E36] text-center">
          <span className="text-xs font-bold text-neutral-400 block">Badges Earned</span>
          <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">
            {achievements.filter((a) => a.is_unlocked).length} / {achievements.length}
          </span>
          <span className="text-[10px] text-neutral-500">Milestones Conquered</span>
        </div>
      </div>

    </div>
  );
}
