import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  BrainCircuit,
  Sparkles,
  Flame,
  BarChart3,
  BookOpen,
  Calendar,
  Swords,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: BrainCircuit,
      color: "#5B3DF5",
      badge: "Socratic AI",
      title: "Pedagogical AI Tutor & Hint Ladder",
      description:
        "Unlike generic LLMs that dump answer keys, VEZEI guides you with 3-stage hint ladders: from conceptual prompts to structural breakdowns and finally step-by-step mathematical resolutions.",
      points: [
        "Prevents answer spoiling during practice",
        "Pinpoints faulty assumptions in reading comprehension & logic",
        "Contextual follow-up practice drill recommendations",
      ],
    },
    {
      icon: Flame,
      color: "#FF4FA3",
      badge: "Gamification",
      title: "Server-Authoritative Gamification Engine",
      description:
        "Level up as you study. Every XP point, quest milestone, and study streak is calculated and validated server-side on an append-only ledger.",
      points: [
        "Level progression based on genuine problem-solving",
        "Streak freeze shields so life emergencies don't erase momentum",
        "Curriculum Boss nodes combining multi-concept exam questions",
      ],
    },
    {
      icon: BarChart3,
      color: "#C8FF3D",
      badge: "Proctored Mocks",
      title: "Authentic Examination Simulator",
      description:
        "Replicates official exam software for CAT, GATE, GMAT, and JEE with sectional countdown timers, question palettes, and official negative marking rules.",
      points: [
        "Time-trap diagnosis: flags questions that drained minutes without points",
        "Calibrated percentile estimation against historical normalization",
        "Question status tagging (Answered, Marked for Review, Unvisited)",
      ],
    },
    {
      icon: BookOpen,
      color: "#5B3DF5",
      badge: "Revision",
      title: "Automated Mistake Notebook",
      description:
        "Every incorrect answer is automatically captured with error-type tags (Conceptual Slip, Calculation Trap, Time Pressure, Misread).",
      points: [
        "Targeted 'Re-Test Mistakes' drill mode",
        "Tracks error resolution until mastery is verified",
        "Direct one-click bookmarking from test review pages",
      ],
    },
    {
      icon: Calendar,
      color: "#C8FF3D",
      badge: "Planning",
      title: "Dynamic Adaptive Study Planner",
      description:
        "Generates a day-by-day study roadmap based on your target exam date, current proficiency level, and available study minutes per day.",
      points: [
        "Balances high-weightage topics with your diagnostic weak spots",
        "Spaced repetition reminders for previously covered concepts",
        "Drag-and-drop daily checklist with XP rewards upon completion",
      ],
    },
    {
      icon: Swords,
      color: "#FF4FA3",
      badge: "Social",
      title: "1v1 Quiz Battles & League Rankings",
      description:
        "Study doesn't have to be solitary. Challenge study partners to 5-minute timed duels and climb weekly leagues from Bronze to Diamond.",
      points: [
        "Weekly promotion and demotion tiers",
        "Anti-cheat score validation and duplicate submission prevention",
        "Curated, moderated exam discussion channels",
      ],
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
              Platform Architecture
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              Engineered for Genuine Cognitive Retention.
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg">
              VEZEI replaces passive video watching and disconnected PDFs with active recall, AI diagnostic guidance, and game-inspired momentum.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:border-[#C8FF3D] transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-[#111111]"
                        style={{ backgroundColor: feat.color }}
                      >
                        <Icon className="w-6 h-6 text-[#111111]" />
                      </div>
                      <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#111111] text-neutral-300 border border-[#2A2A2E]">
                        {feat.badge}
                      </span>
                    </div>

                    <h2 className="text-xl font-black text-white">{feat.title}</h2>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {feat.description}
                    </p>

                    <div className="pt-2 border-t border-[#2A2A2E] space-y-2">
                      {feat.points.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-[#C8FF3D] flex-shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#2A2A2E]">
                    <Link
                      href="/signup"
                      className="text-xs font-bold text-[#C8FF3D] hover:underline flex items-center gap-1.5"
                    >
                      <span>Experience this feature in app</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-10 max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Ready to Upgrade Your Exam Preparation?
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl mx-auto">
              Get access to the entire platform with a free diagnostic account. No credit card required.
            </p>
            <div className="pt-2">
              <Link
                href="/signup"
                className="btn-tactile-lime inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-black"
              >
                <span>Start your journey now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
