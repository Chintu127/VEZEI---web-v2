"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, BookOpen } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/30 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          Access &amp; Platform Status
        </div>
        <h1 className="text-3xl font-black text-white">Full Platform Access Active</h1>
        <p className="text-xs text-neutral-400">
          In this launch release, all examination practice, mock tests, and analytics are completely open.
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-10 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2A2A2E] gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#C8FF3D]">
              Platform Tier
            </span>
            <h2 className="text-2xl font-black text-white mt-0.5">
              Full Learning Workspace (Active)
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              No subscription or credit card required. All student features are unrestricted.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-[#1C2818] border border-[#C8FF3D]/40 text-[#C8FF3D] text-xs font-black flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Unlocked</span>
          </div>
        </div>

        {/* Feature status list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] space-y-1">
            <span className="font-black text-white block">Adaptive Practice Drills</span>
            <span className="text-neutral-400">Unrestricted access to all verified question modules</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] space-y-1">
            <span className="font-black text-white block">Full-Length Proctored Mocks</span>
            <span className="text-neutral-400">Timed simulations with authentic exam scoring rules</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] space-y-1">
            <span className="font-black text-white block">Performance Diagnostics</span>
            <span className="text-neutral-400">Real-time speed vs accuracy analytics on your attempts</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] space-y-1">
            <span className="font-black text-white block">Personal Study Planner</span>
            <span className="text-neutral-400">Weekly milestones calibrated for your target exam date</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#2A2A2E] flex justify-between items-center text-xs">
          <span className="text-neutral-500 font-semibold">
            Monetization features remain outside the active MVP release.
          </span>
          <Link
            href="/app/practice"
            className="btn-tactile-lime px-5 py-2.5 rounded-xl text-xs font-black inline-flex items-center gap-1.5"
          >
            <span>Continue Practice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
