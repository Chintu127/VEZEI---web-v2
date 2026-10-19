"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, BookOpen } from "lucide-react";

function PricingPageContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1C24] border border-[#C8FF3D]/40 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Access Notice</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            All Learning Features Are <br />
            <span className="text-[#C8FF3D]">100% Free During Launch</span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
            VEZEI is focused on verified educational quality and student outcomes. All practice questions, timed mock tests, performance analytics, and personal study planners are unlocked with a single free student account.
          </p>

          {/* 4 Pillars Card */}
          <div className="bg-[#17171C] border-3 border-[#2E2E36] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left space-y-6">
            <h2 className="text-xl font-black text-white flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-[#C8FF3D]" />
              <span>Included With Every Student Account</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] space-y-1.5">
                <span className="text-xs font-black text-[#C8FF3D] uppercase block">1. Practice Engine</span>
                <p className="text-xs font-semibold text-neutral-300">
                  Topic-wise questions with verified solutions and difficulty sorting across CAT and roadmap exams.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] space-y-1.5">
                <span className="text-xs font-black text-[#FF4FA3] uppercase block">2. Timed Mock Tests</span>
                <p className="text-xs font-semibold text-neutral-300">
                  Full-length proctored examination simulations with authentic sectional timers, scoring rules, and review.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] space-y-1.5">
                <span className="text-xs font-black text-[#5B3DF5] uppercase block">3. Performance Analytics</span>
                <p className="text-xs font-semibold text-neutral-300">
                  Section-wise speed vs accuracy tracking, error pattern detection, and weak area diagnostics.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] space-y-1.5">
                <span className="text-xs font-black text-white uppercase block">4. Personal Study Plans</span>
                <p className="text-xs font-semibold text-neutral-300">
                  Structured weekly milestones tailored to your target examination date and daily available study time.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A2A2E] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400 font-semibold">
                No credit card required &bull; No subscription lockouts &bull; No ads during timed tests
              </div>

              <Link
                href="/signup"
                className="btn-tactile-lime px-8 py-3.5 rounded-xl text-xs font-black flex items-center gap-2"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PricingPage() {
  return <PricingPageContent />;
}
