import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Compass,
  Target,
  BrainCircuit,
  BarChart3,
  Trophy,
  Flame,
  ArrowRight,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      badge: "Diagnosis",
      title: "Set Your Exam & Establish Your Baseline",
      desc: "Select your competitive exam, your target exam date, and target score. Take a calibrated 15-minute diagnostic drill that identifies your current conceptual strengths and weaknesses across all syllabus sections.",
      color: "#C8FF3D",
    },
    {
      num: "02",
      badge: "Adaptive Plan",
      title: "Receive Your Dynamic Study Calendar",
      desc: "Our engine maps your available daily study time against official exam blueprints. It schedules high-weightage topics first while interleaving weak-topic revisions with spaced repetition intervals.",
      color: "#5B3DF5",
    },
    {
      num: "03",
      badge: "Gamified Practice",
      title: "Solve Daily Quests & Build Your Streak",
      desc: "Practice with verified exam-style questions across single-choice, multiple-choice, and numerical formats. Earn XP, maintain your study streak, and unlock skill tree nodes on a server-authoritative ledger.",
      color: "#FF4FA3",
    },
    {
      num: "04",
      badge: "AI Guidance",
      title: "Crack Difficult Doubts With Socratic AI",
      desc: "When you get stuck on an intricate math or logical problem, ask the VEZEI AI Tutor. Instead of spoiling the final answer, it guides you step-by-step through a 3-stage hint ladder to help you deduce the correct solution yourself.",
      color: "#C8FF3D",
    },
    {
      num: "05",
      badge: "Exam Simulation",
      title: "Simulate Official Proctored Mock Tests",
      desc: "Practice under real exam pressure with exact countdown timers, on-screen calculators, and strict negative marking penalties. Receive instant percentile estimates and sectional speed diagnostics.",
      color: "#5B3DF5",
    },
    {
      num: "06",
      badge: "Mastery",
      title: "Eliminate Weaknesses in the Mistake Notebook",
      desc: "Every wrong answer is automatically cataloged with error tags (calculation trap, conceptual flaw, time pressure). Use the targeted 'Re-Test' drill to turn recurring mistakes into guaranteed marks.",
      color: "#FF4FA3",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#C8FF3D] bg-[#1C1C1E] border border-[#C8FF3D]/30 px-3 py-1 rounded-full">
              Student Journey
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              How VEZEI Takes You from Start to Victory.
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg">
              A clear, evidence-based pedagogy designed to maximize retention, maintain study discipline, and eliminate test-day anxiety.
            </p>
          </div>

          {/* Timeline Process Cards */}
          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#C8FF3D] rounded-3xl p-8 transition-all duration-200 flex flex-col sm:flex-row items-start gap-6"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-2xl border-2 border-[#111111] shadow-[3px_3px_0px_#111111]"
                  style={{ backgroundColor: step.color, color: "#111111" }}
                >
                  {step.num}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#111111] text-neutral-300 border border-[#2A2A2E]">
                      {step.badge}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{step.title}</h2>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-16 text-center">
            <Link
              href="/signup"
              className="btn-tactile-lime inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-black"
            >
              <span>Begin Step 1: Create Free Account</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
