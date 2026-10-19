"use client";

import React from "react";

export function TheChallengeSection() {
  const challenges = [
    {
      num: "01",
      badgeBg: "bg-[#C8FF3D] text-[#111111]",
      title: "Scattered resources",
      description:
        "Questions, notes and mock tests live across many apps, websites and files.",
    },
    {
      num: "02",
      badgeBg: "bg-[#FF4FA3] text-white",
      title: "Scores without answers",
      description:
        "A mock score rarely explains why marks were lost: concepts, speed or careless errors.",
    },
    {
      num: "03",
      badgeBg: "bg-[#5B3DF5] text-white",
      title: "Many exams, many logins",
      description:
        "Students preparing for more than one exam juggle separate accounts and plans.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F4F4F6] text-[#111111] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Pill: THE CHALLENGE */}
        <div className="inline-block mb-4">
          <span className="px-4 py-1.5 rounded-full bg-[#FF4FA3] text-white text-xs font-black uppercase tracking-wider border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            THE CHALLENGE
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight leading-tight">
          Exam prep today is <br />
          scattered
        </h2>

        {/* 3 Challenge Cards from Booklet Page 3 */}
        <div className="mt-12 space-y-6">
          {challenges.map((ch) => (
            <div
              key={ch.num}
              className="bg-white border-3 border-[#111111] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#111111] flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-transform hover:-translate-y-1"
            >
              {/* Number Badge */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-[#111111] ${ch.badgeBg} flex items-center justify-center font-black text-xl sm:text-2xl shadow-[2px_2px_0px_#111111] flex-shrink-0`}
              >
                {ch.num}
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 flex-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#111111]">
                  {ch.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-neutral-700 leading-relaxed max-w-2xl">
                  {ch.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline from Booklet Page 3 */}
        <div className="mt-12 pt-8 border-t-2 border-[#111111]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-[#5B3DF5]">
              Vezei brings it all together.
            </span>
          </div>
          <span className="text-xs font-black text-neutral-500">vezei · 03</span>
        </div>

      </div>
    </section>
  );
}
