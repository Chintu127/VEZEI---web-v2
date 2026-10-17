"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRICING_TIERS } from "@/data/pricing";
import {
  CreditCard,
  Shield,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function BillingPage() {
  const [isPro, setIsPro] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/30 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
          <CreditCard className="w-3.5 h-3.5" />
          Subscription Management
        </div>
        <h1 className="text-3xl font-black text-white">Membership &amp; Plan Status</h1>
        <p className="text-xs text-neutral-400">
          Manage your student plan, payment receipts, and Pro tier upgrades.
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-10 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2A2A2E] gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4FA3]">
              Active Tier
            </span>
            <h2 className="text-2xl font-black text-white mt-0.5">
              {isPro ? "Vezei Pro Aspirant" : "Starter Learner (Free)"}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              {isPro
                ? "Active annual subscription • Next billing date: Oct 17, 2027"
                : "Free Forever tier with baseline syllabus discovery and diagnostic tests"}
            </p>
          </div>

          <button
            onClick={() => setShowUpgradeModal(true)}
            className="btn-tactile-lime px-6 py-3 rounded-xl text-xs font-black self-start sm:self-auto"
          >
            {isPro ? "Manage Pro Plan" : "Upgrade to Vezei Pro ($14/mo)"}
          </button>
        </div>

        {/* Features comparison summary */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Your Plan Entitlements:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
              <span>Full exam blueprints and verified syllabus topics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
              <span>Diagnostic practice sessions with server-verified XP</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
              <span>Study streaks and daily quest milestone rewards</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
              <span>Automated mistake notebook logging</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
              <span>24/7 Socratic AI Tutor hint ladders</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
              <span>Proctored full-length mock tests</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#2A2A2E] flex items-center gap-2 text-xs text-neutral-500">
          <Shield className="w-4 h-4 text-[#C8FF3D]" />
          <span>7-day risk-free money-back guarantee on all upgrades. Cancel with 1-click anytime.</span>
        </div>
      </div>

      {/* Upgrade Modal Simulation */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#17171C] border-2 border-[#C8FF3D] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#C8FF3D] text-black font-black mx-auto flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Unlock Vezei Pro</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Unlimited verified questions, unlimited full-length proctored mocks, and 24/7 Socratic AI guidance.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#111111] border border-[#2E2E36] text-center space-y-1">
              <span className="text-3xl font-black text-white">$14 / month</span>
              <span className="text-xs text-[#C8FF3D] font-bold block">Billed annually (Save 25%)</span>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsPro(true);
                  setShowUpgradeModal(false);
                }}
                className="btn-tactile-lime w-full py-3.5 rounded-xl text-xs font-black"
              >
                Confirm Membership Upgrade
              </button>

              <button
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-2.5 text-xs text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
