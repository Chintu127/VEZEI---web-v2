import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/brand/Logo";
import { Target, Compass, Sparkles, Shield, Heart, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#C8FF3D] bg-[#1C1C1E] border border-[#C8FF3D]/30 px-3 py-1 rounded-full">
              Our Mission &amp; Philosophy
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              One App. Every Exam. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8FF3D] via-[#FFFFFF] to-[#FF4FA3]">
                Your Path to Success.
              </span>
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              VEZEI was founded by competitive test rankers and EdTech product engineers to solve a fundamental crisis: high-stakes exam preparation is fragmented, stressful, and dominated by passive memorization.
            </p>
          </div>

          {/* Core Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C8FF3D] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center text-black">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white">Our Mission</h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Provide accessible, personalized, technology-driven learning that empowers students to prepare efficiently for competitive examinations regardless of location, background, or economic privilege.
              </p>
            </div>

            <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5B3DF5] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] flex items-center justify-center text-white">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white">Our Vision</h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Become the world's most trusted AI-powered platform for competitive exam preparation, unifying structured syllabus discovery, active practice, Socratic explanations, and game-inspired daily momentum.
              </p>
            </div>
          </div>

          {/* Three Pedagogical Pillars */}
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 sm:p-12 mb-16 max-w-5xl mx-auto space-y-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white text-center">
              Our Core Pedagogical Commitments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300">
              <div className="p-6 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] space-y-3">
                <h3 className="text-base font-black text-[#C8FF3D]">1. Socratic Learning, Not Answers</h3>
                <p className="leading-relaxed">
                  We refuse to build AI that merely dumps answer keys. VEZEI's AI Tutor is trained to ask guiding questions, reveal flawed premises, and foster authentic mathematical and analytical problem-solving.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] space-y-3">
                <h3 className="text-base font-black text-[#FF4FA3]">2. Habit-First Gamification</h3>
                <p className="leading-relaxed">
                  Gamification must never feel frivolous or punishing. Our streak freezes, skill trees, and quest XP are carefully calibrated to maintain positive study psychology without adding anxiety to an already stressful journey.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] space-y-3">
                <h3 className="text-base font-black text-[#5B3DF5]">3. Academic Integrity &amp; Verification</h3>
                <p className="leading-relaxed">
                  Every syllabus topic, question type, and marking scheme is verified against official examination authorities. We never invent fake customer counts, ungrounded pass rates, or simulated question keys.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link
              href="/signup"
              className="btn-tactile-lime inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-black"
            >
              <span>Join the VEZEI Movement</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
