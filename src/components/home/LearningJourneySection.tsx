import React from "react";
import Link from "next/link";
import { Compass, Target, BrainCircuit, BarChart3, Trophy, ArrowRight } from "lucide-react";

export function LearningJourneySection() {
  const steps = [
    {
      num: "01",
      icon: Target,
      title: "Select & Diagnose",
      desc: "Pick your competitive examination and complete a 15-minute diagnostic test to establish your verified baseline proficiency.",
      color: "#C8FF3D",
    },
    {
      num: "02",
      icon: Compass,
      title: "Adaptive Blueprint",
      desc: "Our algorithm creates an exam calendar balancing daily availability with high-yield syllabus weightages.",
      color: "#5B3DF5",
    },
    {
      num: "03",
      icon: BrainCircuit,
      title: "Daily Socratic Practice",
      desc: "Solve adaptive question batches with multi-tier AI hints that build conceptual mastery instead of rote memorization.",
      color: "#FF4FA3",
    },
    {
      num: "04",
      icon: BarChart3,
      title: "Proctored Mocks",
      desc: "Take full-length simulated tests replicating exact interface, timers, calculators, and official negative marking rules.",
      color: "#C8FF3D",
    },
    {
      num: "05",
      icon: Trophy,
      title: "Mistake Elimination",
      desc: "Categorize errors into conceptual slips or calculation traps, re-test weak areas, and claim your top percentile victory.",
      color: "#FF4FA3",
    },
  ];

  return (
    <section className="py-24 bg-[#141418] border-t border-[#2A2A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C1C1E] border border-[#5B3DF5]/40 text-[#5B3DF5] text-xs font-black uppercase tracking-wider">
            Pedagogical Roadmap
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            The 5-Stage Path from Aspirant to Ranker.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            A battle-tested methodology designed for high-stakes entrance exams with zero wasted study hours.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#1C1C22] border-2 border-[#2E2E36] hover:border-[#C8FF3D] rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-neutral-600">{step.num}</span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-[#111111]"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon className="w-5 h-5 text-[#111111]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white">{step.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{step.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#2A2A2E]">
                  <span className="text-[11px] font-bold text-neutral-500">Stage {step.num} of 5</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/signup"
            className="btn-tactile-lime inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-black"
          >
            <span>Begin Your Diagnostic Today</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
