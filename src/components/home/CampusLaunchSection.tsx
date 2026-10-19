"use client";

import React from "react";
import { ArrowRight, School, Users, FileCheck, Building2 } from "lucide-react";

export function CampusLaunchSection() {
  const stages = [
    {
      num: 1,
      icon: School,
      title: "Campus introduction",
      description: "Sessions and student clubs show students what Vezei offers.",
    },
    {
      num: 2,
      icon: Users,
      title: "Campus ambassadors",
      description: "Student ambassadors help classmates set up and get going.",
    },
    {
      num: 3,
      icon: FileCheck,
      title: "Free diagnostic tests",
      description: "Every student can try a test and see where they stand.",
    },
    {
      num: 4,
      icon: Building2,
      title: "College access",
      description: "Institutional plans for colleges and training providers.",
    },
  ];

  return (
    <section id="campus-launch" className="py-20 lg:py-28 bg-[#FF4FA3] text-[#111111] relative overflow-hidden">
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
            fill="#FFFFFF"
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Category Pill: CAMPUS LAUNCH */}
        <div className="inline-block mb-4">
          <span className="px-4 py-1.5 rounded-full bg-[#C8FF3D] text-[#111111] text-xs font-black uppercase tracking-wider border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            CAMPUS LAUNCH
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight leading-tight">
          Coming to your college
        </h2>

        {/* Subtitle from Booklet Page 6 */}
        <p className="mt-4 text-base sm:text-xl text-[#111111] font-medium max-w-2xl leading-relaxed">
          Vezei is introduced directly on campus, so every student can start preparing from day one.
        </p>

        {/* 4 Stage Progression Cards from Booklet Page 6 */}
        <div className="mt-12 space-y-5">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.num}
                className="bg-white border-3 border-[#111111] rounded-3xl p-6 sm:p-7 shadow-[5px_5px_0px_#111111] flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-transform hover:-translate-y-0.5"
              >
                {/* Number Pill */}
                <div className="w-12 h-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-[2px_2px_0px_#111111]">
                  {stage.num}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-[#111111]">
                    {stage.title}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-neutral-800 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Campus Action Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#111111] text-white font-black text-sm border-2 border-[#111111] shadow-[4px_4px_0px_#ffffff] hover:bg-neutral-900 transition-all flex items-center justify-center gap-2"
          >
            <span>Request Vezei for Your Campus</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Booklet footer indicator */}
        <div className="mt-12 pt-6 border-t-2 border-[#111111]/20 flex items-center justify-between text-xs font-black text-[#111111]">
          <span>vezei · 06</span>
          <span>One App. Every Exam.</span>
        </div>

      </div>
    </section>
  );
}
