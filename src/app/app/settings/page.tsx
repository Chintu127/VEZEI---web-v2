"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppProvider";
import {
  Settings,
  Sun,
  Moon,
  Bell,
  Clock,
  Shield,
  Trash2,
  Download,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { LanguageSelector } from "@/components/ui/LanguageSelector";

export default function SettingsPage() {
  const { user, updateUser, theme, toggleTheme } = useApp();

  const [dailyMinutes, setDailyMinutes] = useState(user?.dailyGoalMinutes || 60);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSavePreferences = () => {
    updateUser({
      dailyGoalMinutes: dailyMinutes,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/30 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
          <Settings className="w-3.5 h-3.5" />
          Preferences
        </div>
        <h1 className="text-3xl font-black text-white">Account &amp; Study Settings</h1>
        <p className="text-xs text-neutral-400">
          Customize your interface theme, study pace, reminder notifications, and data privacy.
        </p>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-[#1C2818] border border-[#C8FF3D] text-[#C8FF3D] text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Preferences successfully saved to student profile!</span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-10 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* 1. Interface Theme */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2A2A2E] gap-4">
          <div>
            <h3 className="font-black text-base text-white">Interface Appearance</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              VEZEI is designed dark-first to protect student eyes during late-night study drills.
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="btn-tactile-lime px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 self-start sm:self-auto"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4" />
                <span>Switch to Light Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span>Switch to Dark Theme</span>
              </>
            )}
          </button>
        </div>

        {/* 2. Language & Regional Localization */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2A2A2E] gap-4">
          <div>
            <h3 className="font-black text-base text-white">Language &amp; Regional Localization</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Select your preferred language. Supports Indian regional languages and international options with RTL support.
            </p>
          </div>
          <div className="self-start sm:self-auto">
            <LanguageSelector variant="select" />
          </div>
        </div>

        {/* 3. Daily Study Availability */}
        <div className="space-y-3 pb-6 border-b border-[#2A2A2E]">
          <h3 className="font-black text-base text-white">Daily Study Commitment</h3>
          <p className="text-xs text-neutral-400">
            Tuning this updates your daily quest target minutes and study planner pacing.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[30, 60, 90, 120].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setDailyMinutes(mins)}
                className={`py-3 rounded-xl border text-xs font-black transition-all ${
                  dailyMinutes === mins
                    ? "bg-[#C8FF3D] text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111]"
                    : "bg-[#111111] border-[#2E2E36] text-neutral-400 hover:text-white"
                }`}
              >
                {mins} Minutes
              </button>
            ))}
          </div>
        </div>

        {/* 3. Notification Reminders */}
        <div className="space-y-4 pb-6 border-b border-[#2A2A2E]">
          <h3 className="font-black text-base text-white">Notifications &amp; Reminders</h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#111111] border border-[#2E2E36] cursor-pointer">
              <div>
                <strong className="text-white block font-bold">Daily Streak Defense Alerts</strong>
                <span className="text-neutral-400">Notify me at 8:00 PM if my daily practice is pending</span>
              </div>
              <input
                type="checkbox"
                checked={streakReminders}
                onChange={(e) => setStreakReminders(e.target.checked)}
                className="rounded bg-neutral-800 border-neutral-700 text-[#C8FF3D] focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#111111] border border-[#2E2E36] cursor-pointer">
              <div>
                <strong className="text-white block font-bold">Weekly Performance Digest</strong>
                <span className="text-neutral-400">Receive weekly percentile projections and weak topic summaries</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded bg-neutral-800 border-neutral-700 text-[#C8FF3D] focus:ring-0"
              />
            </label>
          </div>
        </div>

        {/* 4. Privacy & Data Exports */}
        <div className="space-y-3 pb-6 border-b border-[#2A2A2E]">
          <h3 className="font-black text-base text-white">Data Rights &amp; Privacy</h3>
          <p className="text-xs text-neutral-400">
            Export your question responses, test scores, and mistake notebook as a portable JSON or CSV backup.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={() => alert("Downloading student data archive...")}
              className="px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-neutral-800 text-neutral-300 text-xs font-bold border border-[#2E2E36] flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-[#C8FF3D]" />
              <span>Export Test Attempts (.JSON)</span>
            </button>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={handleSavePreferences}
            className="btn-tactile-lime px-7 py-3 rounded-xl text-xs font-black"
          >
            Save Preferences
          </button>
        </div>

      </div>

    </div>
  );
}
