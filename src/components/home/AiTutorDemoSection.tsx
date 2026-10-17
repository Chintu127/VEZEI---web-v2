"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, BrainCircuit, Lightbulb, ChevronRight, CheckCircle2, MessageSquare } from "lucide-react";

export function AiTutorDemoSection() {
  const [hintStage, setHintStage] = useState<number>(0);

  const hints = [
    {
      title: "Stage 1: Foundational Concept",
      content:
        "Define your base variable cleanly: Assume the Cost Price (CP) of 100 units of inventory is $100 (so CP per unit = $1.00). What is the initial Marked Price (MP) per unit with a 40% markup?",
    },
    {
      title: "Stage 2: Segmented Sales Analysis",
      content:
        "Segment 1: 60 units are sold at the full marked price ($1.40). Revenue = 60 × $1.40 = $84.00.\nSegment 2: 40 units are sold at a 25% discount off the marked price ($1.40 × 0.75 = $1.05). Revenue = 40 × $1.05 = $42.00.",
    },
    {
      title: "Stage 3: Net Profit Synthesis",
      content:
        "Total Revenue = $84.00 + $42.00 = $126.00.\nTotal Cost = $100.00.\nNet Profit = ((126 - 100) / 100) × 100% = 26.0% net profit.\nNotice how the 25% discount on the marked price still yields a 5% profit per unit on that tranche!",
    },
  ];

  return (
    <section className="py-24 bg-[#141418] border-t border-[#2A2A2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1C1E] border border-[#5B3DF5]/50 text-[#5B3DF5] text-xs font-black uppercase tracking-wider">
            <BrainCircuit className="w-3.5 h-3.5" />
            Socratic Intelligence
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            An AI Tutor That Teaches You to Think.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Unlike generic chatbots that spoil answers, VEZEI's pedagogical AI provides multi-stage hints, highlights flawed assumptions, and builds lasting conceptual retention.
          </p>
        </div>

        {/* Interactive AI Tutor Demonstration Box */}
        <div className="max-w-4xl mx-auto bg-[#1C1C22] border-2 border-[#5B3DF5]/40 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          
          {/* Header of AI Box */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A2A2E]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#5B3DF5] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center text-white">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-base text-white flex items-center gap-1.5">
                  <span>VEZEI AI Doubt Solver</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C8FF3D] text-[#111111]">
                    Grounded Model
                  </span>
                </h3>
                <p className="text-xs text-neutral-400">Context: CAT Quantitative Aptitude — Profit &amp; Loss</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">Hint Ladder:</span>
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((stage) => (
                  <span
                    key={stage}
                    className={`w-3 h-3 rounded-full ${
                      hintStage >= stage ? "bg-[#5B3DF5]" : "bg-neutral-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="py-6 border-b border-[#2A2A2E] space-y-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Target Problem</span>
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              "A merchant marks goods up by 40% above cost price. He sells 60% of the stock at this marked price, and the remaining 40% at a discount of 25% on the marked price. What is the merchant's net profit percentage?"
            </p>
          </div>

          {/* AI Response Stream */}
          <div className="py-6 space-y-4">
            {hintStage === 0 && (
              <div className="p-5 rounded-2xl bg-[#141418] border border-[#2A2A2E] text-neutral-300 text-sm space-y-2">
                <div className="flex items-center gap-2 text-[#5B3DF5] font-bold text-xs">
                  <Lightbulb className="w-4 h-4" />
                  <span>Ready to unpack this question?</span>
                </div>
                <p className="text-xs sm:text-sm">
                  Click <strong>"Request Stage 1 Hint"</strong> below to receive a guided nudge without giving away the final calculation.
                </p>
              </div>
            )}

            {hintStage >= 1 && (
              <div className="p-5 rounded-2xl bg-[#141418] border-l-4 border-l-[#5B3DF5] border border-[#2A2A2E] text-neutral-200 text-sm space-y-1.5 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-[#5B3DF5] font-black text-xs uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>{hints[0].title}</span>
                </div>
                <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed text-neutral-300">
                  {hints[0].content}
                </p>
              </div>
            )}

            {hintStage >= 2 && (
              <div className="p-5 rounded-2xl bg-[#141418] border-l-4 border-l-[#FF4FA3] border border-[#2A2A2E] text-neutral-200 text-sm space-y-1.5 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-[#FF4FA3] font-black text-xs uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>{hints[1].title}</span>
                </div>
                <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed text-neutral-300">
                  {hints[1].content}
                </p>
              </div>
            )}

            {hintStage >= 3 && (
              <div className="p-5 rounded-2xl bg-[#172013] border-l-4 border-l-[#C8FF3D] border border-[#C8FF3D]/40 text-neutral-200 text-sm space-y-1.5 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-[#C8FF3D] font-black text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{hints[2].title}</span>
                </div>
                <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed text-neutral-200 font-medium">
                  {hints[2].content}
                </p>
              </div>
            )}
          </div>

          {/* Interactive Hint Stepper Controls */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              {hintStage < 3 ? (
                <button
                  onClick={() => setHintStage((prev) => Math.min(3, prev + 1))}
                  className="btn-tactile-purple px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Stage {hintStage + 1} Hint</span>
                </button>
              ) : (
                <button
                  onClick={() => setHintStage(0)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-400 hover:text-white bg-[#141418] border border-[#2A2A2E]"
                >
                  Reset Demo
                </button>
              )}
            </div>

            <Link
              href="/app/ai-tutor"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#C8FF3D] hover:underline"
            >
              <span>Try Full 24/7 AI Tutor in Student App</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
