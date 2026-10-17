import React from "react";
import Link from "next/link";
import { BarChart3, Clock, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

export function MockTestAnalyticsSection() {
  return (
    <section className="py-24 bg-[#111111] border-t border-[#2A2A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/40 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" />
            Exam Analytics &amp; Mocks
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Stop Guessing Your Exam Readiness.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Simulate real exam software with authentic sectional timers, official marking penalties, and granular time-loss analytics.
          </p>
        </div>

        {/* Analytics Dashboard Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Feature Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2A2A2E] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#C8FF3D] border-2 border-[#111111] flex items-center justify-center text-black font-black">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white">Full-Length Proctored Mocks</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Authentic CAT, GATE, and GMAT interface layouts with section-wise timers, on-screen scientific calculators, and strict negative marking.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2A2A2E] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FF4FA3] border-2 border-[#111111] flex items-center justify-center text-white font-black">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white">Speed vs Accuracy Matrix</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Identify "Time Traps"—questions where you spent more than 3 minutes and still answered incorrectly, draining critical test time.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2A2A2E] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#5B3DF5] border-2 border-[#111111] flex items-center justify-center text-white font-black">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white">Percentile Estimation Engine</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Calibrated against historical normalization curves across multiple test years to give you realistic percentile projections.
              </p>
            </div>

            <Link
              href="/app/mock-tests"
              className="btn-tactile-lime inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black"
            >
              <span>Explore Mock Test Library</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Mock Test Result Card Preview */}
          <div className="lg:col-span-7 bg-[#17171C] border-3 border-[#2A2A2E] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2A2A2E] gap-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#C8FF3D]">
                  CAT 2026 Full-Length Mock #03
                </span>
                <h4 className="text-xl font-black text-white">Performance Diagnostic Report</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#111111] text-[#C8FF3D] border border-[#C8FF3D]/40 text-xs font-black">
                  98.7 Estimated %ile
                </span>
              </div>
            </div>

            {/* Score Summary Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-[#1F1F24] border border-[#2E2E36]">
                <span className="text-[11px] text-neutral-400 font-bold block">Raw Score</span>
                <span className="text-xl font-black text-white">88 / 198</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1F1F24] border border-[#2E2E36]">
                <span className="text-[11px] text-neutral-400 font-bold block">Accuracy</span>
                <span className="text-xl font-black text-[#C8FF3D]">84.2%</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1F1F24] border border-[#2E2E36]">
                <span className="text-[11px] text-neutral-400 font-bold block">Correct</span>
                <span className="text-xl font-black text-[#C8FF3D]">32</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1F1F24] border border-[#2E2E36]">
                <span className="text-[11px] text-neutral-400 font-bold block">Incorrect</span>
                <span className="text-xl font-black text-[#FF4FA3]">6</span>
              </div>
            </div>

            {/* Section Breakdown Bars */}
            <div className="space-y-3">
              <span className="text-xs font-black text-neutral-300 uppercase tracking-wider">
                Sectional Breakdown
              </span>

              {/* VARC */}
              <div className="p-3.5 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">Verbal Ability &amp; Reading Comprehension (VARC)</span>
                  <span className="text-[#C8FF3D]">34 Marks • 96.4 %ile</span>
                </div>
                <div className="w-full h-2.5 bg-[#111111] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C8FF3D] rounded-full" style={{ width: "88%" }} />
                </div>
              </div>

              {/* DILR */}
              <div className="p-3.5 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">Data Interpretation &amp; Logical Reasoning (DILR)</span>
                  <span className="text-[#FF4FA3]">22 Marks • 93.1 %ile</span>
                </div>
                <div className="w-full h-2.5 bg-[#111111] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF4FA3] rounded-full" style={{ width: "72%" }} />
                </div>
              </div>

              {/* Quant */}
              <div className="p-3.5 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">Quantitative Aptitude (QA)</span>
                  <span className="text-[#5B3DF5]">32 Marks • 99.1 %ile</span>
                </div>
                <div className="w-full h-2.5 bg-[#111111] rounded-full overflow-hidden">
                  <div className="h-full bg-[#5B3DF5] rounded-full" style={{ width: "94%" }} />
                </div>
              </div>
            </div>

            {/* Time Loss Warning Diagnostic */}
            <div className="p-3.5 rounded-2xl bg-[#29171E] border border-[#FF4FA3]/50 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#FF4FA3] flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <strong className="text-white block font-bold">Time Trap Identified in DILR Set 3:</strong>
                <p className="text-neutral-300 mt-0.5">
                  Spent 11 minutes on Matrix Arrangement before abandoning without points. Practice early set selection strategies.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
