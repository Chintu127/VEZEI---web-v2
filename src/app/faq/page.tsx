"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronDown, ChevronUp, Search, HelpCircle, ArrowRight } from "lucide-react";

export default function FaqPage() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqList = [
    {
      q: "What makes VEZEI different from standard question-bank websites?",
      a: "Standard platforms either display plain PDF answer keys or generic AI chatbots that ruin questions by giving away the final answer. VEZEI uses a pedagogical 3-stage hint ladder (Concept -> Structure -> Solution) combined with an append-only gamification engine, proctored mock simulation, and automated mistake classification.",
    },
    {
      q: "Are the questions and solutions officially verified?",
      a: "Yes. All question patterns, difficulty scalings, and marking schemes (such as CAT +3/-1 or GATE partial marking) are modeled after verified previous-year official examination patterns. We clearly distinguish verified curricula from community discussions.",
    },
    {
      q: "How does the AI Doubt Solver work without spoiling questions?",
      a: "Our AI Tutor utilizes Socratic pedagogy. When you ask for help, it analyzes where you might be stuck and offers a Stage 1 concept reminder. If you still need help, it offers a Stage 2 equation breakdown, reserving the full solution only if you explicitly confirm you want to review the complete steps.",
    },
    {
      q: "Will I lose my study streak if I miss a day due to an exam or illness?",
      a: "No! VEZEI provides streak freeze shields. We believe in building sustainable daily study habits, not punishing students for real-life disruptions.",
    },
    {
      q: "Can I prepare for multiple exams simultaneously (e.g. CAT and XAT, or GATE and GRE)?",
      a: "Absolutely. In your student dashboard (/app/exams), you can add multiple target examinations. Your study planner and practice sessions can toggle between them effortlessly.",
    },
    {
      q: "Can I use VEZEI on mobile devices?",
      a: "Yes. VEZEI is built with fully responsive, mobile-first design tokens. You can practice drills, review your mistake notebook, and chat with the AI Tutor on any smartphone or tablet browser.",
    },
  ];

  const filtered = faqList.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#C8FF3D] bg-[#1C1C1E] border border-[#C8FF3D]/30 px-3 py-1 rounded-full">
              Knowledge Base
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg">
              Everything you need to know about the VEZEI platform, our AI Tutor, and examination scoring.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search questions (e.g. AI tutor, streaks, pricing, CAT)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#17171C] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
            />
          </div>

          {/* Accordion FAQ Items */}
          <div className="space-y-4">
            {filtered.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#17171C] border-2 border-[#2E2E36] rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-[#C8FF3D] transition-colors"
                  >
                    <span className="text-sm sm:text-base">{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#C8FF3D] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-neutral-300 text-xs sm:text-sm leading-relaxed border-t border-[#2A2A2E]/50">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions? */}
          <div className="mt-14 p-8 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] text-center space-y-3">
            <h2 className="text-xl font-black text-white">Still have questions?</h2>
            <p className="text-xs text-neutral-400">
              Our academic advisors and technical support team are here to help.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="btn-tactile-lime inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black"
              >
                <span>Contact Our Team</span>
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
