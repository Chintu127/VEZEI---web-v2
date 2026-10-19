"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ArrowRight, Compass, Sparkles, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 sm:pt-14 sm:pb-28 bg-[#111111] text-white">
      {/* Background glow mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-[#5B3DF5]/20 via-[#C8FF3D]/15 to-[#FF4FA3]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Squircle Badge (Booklet Page 1 Exact Brand Presentation) */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-3xl bg-[#C8FF3D] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] transition-transform hover:-translate-y-0.5">
            {/* The V Mark */}
            <svg
              viewBox="0 0 100 100"
              className="w-9 h-9 overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="drop-shadow(3px 4px 0px #111111)">
                {/* Pink left branch */}
                <rect
                  x="18"
                  y="22"
                  width="24"
                  height="62"
                  rx="12"
                  transform="rotate(-21 30 53)"
                  fill="#FF4FA3"
                  stroke="#111111"
                  strokeWidth="3.5"
                />
                {/* Purple right branch */}
                <rect
                  x="48"
                  y="20"
                  width="24"
                  height="64"
                  rx="12"
                  transform="rotate(22 60 52)"
                  fill="#5B3DF5"
                  stroke="#111111"
                  strokeWidth="3.5"
                />
              </g>
            </svg>
            <span className="text-[#111111] font-black text-2xl tracking-tight font-sans flex items-center">
              <span>veze</span>
              <span className="relative inline-flex flex-col items-center">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#FF4FA3] text-sm font-black">
                  ✦
                </span>
                <span>i</span>
              </span>
            </span>
          </div>
        </div>

        {/* Main Grid: Left Typography & Actions, Right Big 3D V Mark & Practice Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Product Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Page 1 Headline Hierarchy */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]">
                One App.
                <br />
                <span className="text-[#C8FF3D]">Every Exam.</span>
              </h1>
              <p className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#FF4FA3] tracking-tight pt-1">
                Your Path to Success.
              </p>
            </div>

            {/* Supporting Copy from Booklet Page 1 */}
            <p className="text-base sm:text-xl text-neutral-300 max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
              An AI-powered exam preparation platform that brings practice, mock tests, analytics and study plans into one place.
            </p>

            {/* Announcement Pill: Coming to your campus */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8FF3D] text-[#111111] font-black text-xs border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
                <span className="w-2 h-2 rounded-full bg-[#111111] animate-ping" />
                <span>Coming to your campus</span>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/signup"
                className="btn-tactile-lime w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black flex items-center justify-center gap-2"
              >
                <span>Start Preparing</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="#exams"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-bold text-white bg-[#1C1C1E] hover:bg-[#252528] border-2 border-[#2A2A2E] shadow-[0_4px_0_#111111] transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5 text-[#C8FF3D]" />
                <span>Explore Exams</span>
              </a>
            </div>

            {/* Core Verification Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-neutral-400 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
                <span>Reviewed Educational Content</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF4FA3]" />
                <span>Timed Realistic Mocks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5B3DF5]" />
                <span>One Unified Account</span>
              </div>
            </div>

          </div>

          {/* Right Column: Giant Iconic V Mark Artwork from Booklet Page 1 */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Outer decorative card */}
              <div className="absolute inset-0 bg-[#17171C] border-3 border-[#2A2A2E] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between p-8 overflow-hidden">
                
                {/* Decorative Sparkles */}
                <div className="w-full flex justify-between items-center text-xs font-black">
                  <span className="text-[#C8FF3D] flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    <span>CAT 2026 LIVE</span>
                  </span>
                  <span className="text-[#FF4FA3] text-lg font-black animate-pulse">✦</span>
                </div>

                {/* Giant 3D V Vector Artwork */}
                <div className="my-auto py-4">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-48 h-48 sm:w-56 sm:h-56 overflow-visible transition-transform duration-500 hover:scale-105"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="drop-shadow(6px 8px 0px #111111)">
                      {/* Pink left branch */}
                      <rect
                        x="18"
                        y="20"
                        width="24"
                        height="64"
                        rx="12"
                        transform="rotate(-21 30 52)"
                        fill="#FF4FA3"
                        stroke="#111111"
                        strokeWidth="3.5"
                      />
                      {/* Purple right branch */}
                      <rect
                        x="48"
                        y="18"
                        width="24"
                        height="66"
                        rx="12"
                        transform="rotate(22 60 51)"
                        fill="#5B3DF5"
                        stroke="#111111"
                        strokeWidth="3.5"
                      />
                    </g>
                  </svg>
                </div>

                {/* Live Preview Bar */}
                <div className="w-full p-3 rounded-2xl bg-[#111111] border border-[#2E2E36] flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-bold">Smart Question Bank</span>
                  <span className="text-[#C8FF3D] font-black">100% Verified</span>
                </div>

              </div>

              {/* Float Pill 1 */}
              <div className="absolute -top-4 -right-4 px-3.5 py-1.5 rounded-2xl bg-[#FF4FA3] text-white font-black text-xs border-2 border-[#111111] shadow-[3px_3px_0px_#111111] rotate-6 animate-float">
                Realistic Mocks ⏱️
              </div>

              {/* Float Pill 2 */}
              <div className="absolute -bottom-4 -left-4 px-3.5 py-1.5 rounded-2xl bg-[#C8FF3D] text-[#111111] font-black text-xs border-2 border-[#111111] shadow-[3px_3px_0px_#111111] -rotate-3">
                Section-wise Analysis 📊
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
