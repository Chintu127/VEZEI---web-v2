"use client";

import React from "react";
import { CheckCircle2, Clock } from "lucide-react";

export function TheVezeiWaySection() {
  const capabilities = [
    {
      title: "One account",
      description: "Every exam workspace and your whole progress record in one login.",
      isCore: true,
    },
    {
      title: "Smart question bank",
      description: "Tagged by exam, topic and difficulty, so practice is focused.",
      isCore: true,
    },
    {
      title: "Realistic mocks",
      description: "Timed tests with autosave, scoring and a detailed review.",
      isCore: true,
    },
    {
      title: "Section-wise analysis",
      description: "Understand accuracy and time spent in every section.",
      isCore: true,
    },
    {
      title: "Guided recommendations",
      description: "Next steps based on your errors, pace and exam date.",
      isCore: true,
    },
    {
      title: "Premium extras",
      description: "Video solutions, licensed previous-year papers, AI doubt support and expert sessions.",
      isCore: false,
      note: "Planned future capability",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#C8FF3D] text-[#111111] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Pill: THE VEZEI WAY */}
        <div className="inline-block mb-4">
          <span className="px-4 py-1.5 rounded-full bg-[#111111] text-white text-xs font-black uppercase tracking-wider border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            THE VEZEI WAY
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight leading-tight">
          One place for everything <br className="hidden sm:inline" />
          you need
        </h2>

        {/* Stacked Cards from Booklet Page 4 */}
        <div className="mt-12 space-y-4 sm:space-y-5">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white border-3 border-[#111111] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[5px_5px_0px_#111111] flex items-start gap-4 sm:gap-5 transition-transform hover:-translate-y-0.5 ${
                !item.isCore ? "opacity-90 border-dashed" : ""
              }`}
            >
              {/* Check Icon */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C8FF3D] border-2 border-[#111111] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[1px_1px_0px_#111111]">
                {item.isCore ? (
                  <CheckCircle2 className="w-5 h-5 text-[#111111] stroke-[2.5]" />
                ) : (
                  <Clock className="w-5 h-5 text-[#111111] stroke-[2.5]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-[#111111]">
                    {item.title}
                  </h3>
                  {item.note && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#111111] text-[#C8FF3D]">
                      {item.note}
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base font-medium text-neutral-800 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Booklet footer indicator */}
        <div className="mt-12 pt-6 border-t-2 border-[#111111]/20 flex items-center justify-between text-xs font-black text-[#111111]">
          <span>vezei · 04</span>
          <span>One App. Every Exam.</span>
        </div>

      </div>
    </section>
  );
}
