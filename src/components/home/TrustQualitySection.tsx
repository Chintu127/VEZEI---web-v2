"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Lock, BrainCircuit } from "lucide-react";

export function TrustQualitySection() {
  const promises = [
    {
      title: "Reviewed content",
      description: "Subject-expert review and quality checks before anything is published.",
      color: "border-[#C8FF3D]",
      barColor: "bg-[#C8FF3D]",
      icon: CheckCircle2,
    },
    {
      title: "Rights respected",
      description: "No copied official questions. Only original or properly licensed material.",
      color: "border-[#FF4FA3]",
      barColor: "bg-[#FF4FA3]",
      icon: ShieldCheck,
    },
    {
      title: "Privacy first",
      description: "We collect only the data we need to help you prepare.",
      color: "border-[#5B3DF5]",
      barColor: "bg-[#5B3DF5]",
      icon: Lock,
    },
    {
      title: "Responsible AI",
      description: "Answers grounded in vetted content, with uncertainty flagged and an easy way to report errors.",
      color: "border-white",
      barColor: "bg-white",
      icon: BrainCircuit,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#111111] text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Category Pill: OUR PROMISE */}
        <div className="inline-block mb-4">
          <span className="px-4 py-1.5 rounded-full bg-[#C8FF3D] text-[#111111] text-xs font-black uppercase tracking-wider border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            OUR PROMISE
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Built on trust
        </h2>

        {/* 4 Trust Cards from Booklet Page 8 */}
        <div className="mt-12 space-y-4">
          {promises.map((p, idx) => (
            <div
              key={idx}
              className="bg-[#17171C] border-2 border-[#2E2E36] rounded-2xl sm:rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-start gap-4 sm:gap-5 transition-transform hover:-translate-y-0.5"
            >
              {/* Colored accent indicator bar */}
              <div className={`w-1.5 sm:w-2 h-12 rounded-full ${p.barColor} flex-shrink-0 mt-0.5`} />

              <div className="space-y-1 flex-1">
                <h3 className="text-xl font-black text-white">
                  {p.title}
                </h3>
                <p className="text-sm sm:text-base font-normal text-neutral-300 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* WHAT'S NEXT Section from Booklet Page 8 */}
        <div className="mt-16 pt-8 border-t border-[#2A2A2E]">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF4FA3] block mb-4">
            WHAT'S NEXT
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Box 1 */}
            <div className="bg-[#C8FF3D] text-[#111111] border-3 border-[#111111] rounded-2xl p-5 shadow-[4px_4px_0px_#000000]">
              <span className="text-xs font-black uppercase block tracking-wider opacity-80">Phase 1</span>
              <h4 className="text-lg font-black mt-1">Campus launch</h4>
              <p className="text-xs font-bold mt-1 text-neutral-800">Practice and mocks</p>
            </div>

            {/* Box 2 */}
            <div className="bg-[#FF4FA3] text-white border-3 border-[#111111] rounded-2xl p-5 shadow-[4px_4px_0px_#000000]">
              <span className="text-xs font-black uppercase block tracking-wider opacity-90">Phase 2</span>
              <h4 className="text-lg font-black mt-1">Growth release</h4>
              <p className="text-xs font-bold mt-1 text-white/90">Recommendations and AI doubts</p>
            </div>

            {/* Box 3 */}
            <div className="bg-[#5B3DF5] text-white border-3 border-[#111111] rounded-2xl p-5 shadow-[4px_4px_0px_#000000]">
              <span className="text-xs font-black uppercase block tracking-wider opacity-90">Phase 3</span>
              <h4 className="text-lg font-black mt-1">More exams</h4>
              <p className="text-xs font-bold mt-1 text-white/90">Added in waves</p>
            </div>
          </div>
        </div>

        {/* Booklet footer indicator */}
        <div className="mt-12 pt-6 border-t border-[#2A2A2E] flex items-center justify-between text-xs font-black text-neutral-400">
          <span className="text-base text-white font-black">Vezei. One App. Every Exam.</span>
          <span>vezei · 08</span>
        </div>

      </div>
    </section>
  );
}
