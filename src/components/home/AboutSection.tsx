"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#C8FF3D] text-[#111111] relative overflow-hidden">
      {/* Decorative V Mark in corner */}
      <div className="absolute -bottom-16 -right-16 opacity-15 pointer-events-none hidden sm:block">
        <svg viewBox="0 0 100 100" className="w-96 h-96" fill="none">
          <rect
            x="18"
            y="20"
            width="24"
            height="64"
            rx="12"
            transform="rotate(-21 30 52)"
            fill="#FF4FA3"
          />
          <rect
            x="48"
            y="18"
            width="24"
            height="66"
            rx="12"
            transform="rotate(22 60 51)"
            fill="#5B3DF5"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Category Pill: ABOUT */}
        <div className="inline-block mb-4">
          <span className="px-4 py-1.5 rounded-full bg-[#FF4FA3] text-white text-xs font-black uppercase tracking-wider border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            ABOUT
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight leading-tight">
          What is Vezei?
        </h2>

        {/* Concise Description from Booklet Page 2 */}
        <p className="mt-4 text-base sm:text-xl text-[#111111] font-medium max-w-3xl leading-relaxed">
          Vezei is one app for competitive exam preparation. Practice questions, timed mock tests, clear explanations, performance analytics and personal study plans, all in one place, all on one account.
        </p>

        {/* 4 Core Pillars Grid (Exact Booklet Page 2 Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          
          {/* Card 1: Practice (White Card) */}
          <div className="bg-white border-3 border-[#111111] rounded-3xl p-7 shadow-[4px_4px_0px_#111111] flex flex-col justify-between transition-transform hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-white font-black text-base flex items-center justify-center">
                1
              </div>
              <h3 className="text-2xl font-black text-[#111111]">
                Practice
              </h3>
              <p className="text-sm font-medium text-neutral-800 leading-relaxed">
                Topic-wise questions with explanations, sorted by difficulty.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/app/practice"
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#111111] hover:underline"
              >
                <span>Explore Practice Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Mock tests (Hot Pink Card) */}
          <div className="bg-[#FF4FA3] text-white border-3 border-[#111111] rounded-3xl p-7 shadow-[4px_4px_0px_#111111] flex flex-col justify-between transition-transform hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-white font-black text-base flex items-center justify-center">
                2
              </div>
              <h3 className="text-2xl font-black text-white">
                Mock tests
              </h3>
              <p className="text-sm font-medium text-white/95 leading-relaxed">
                Timed, exam-style tests with full review after you finish.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/app/mock-tests"
                className="inline-flex items-center gap-1.5 text-xs font-black text-white hover:underline"
              >
                <span>View Mock Test Simulations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Analytics (Electric Purple Card) */}
          <div className="bg-[#5B3DF5] text-white border-3 border-[#111111] rounded-3xl p-7 shadow-[4px_4px_0px_#111111] flex flex-col justify-between transition-transform hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-white font-black text-base flex items-center justify-center">
                3
              </div>
              <h3 className="text-2xl font-black text-white">
                Analytics
              </h3>
              <p className="text-sm font-medium text-white/95 leading-relaxed">
                See your accuracy, speed and weak topics at a glance.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/app/analytics"
                className="inline-flex items-center gap-1.5 text-xs font-black text-white hover:underline"
              >
                <span>Check Diagnostic Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Study plans (White Card) */}
          <div className="bg-white border-3 border-[#111111] rounded-3xl p-7 shadow-[4px_4px_0px_#111111] flex flex-col justify-between transition-transform hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-white font-black text-base flex items-center justify-center">
                4
              </div>
              <h3 className="text-2xl font-black text-[#111111]">
                Study plans
              </h3>
              <p className="text-sm font-medium text-neutral-800 leading-relaxed">
                Weekly goals built around your target exam date.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/app/planner"
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#111111] hover:underline"
              >
                <span>Plan Your Exam Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Small booklet footer indicator */}
        <div className="mt-12 flex items-center justify-between pt-6 border-t-2 border-[#111111]/20 text-xs font-black text-[#111111]">
          <span>vezei · 02</span>
          <span>One App. Every Exam.</span>
        </div>

      </div>
    </section>
  );
}
