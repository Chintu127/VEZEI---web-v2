"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { EXAMS, Exam } from "@/data/exams";
import { Search, Filter, BookOpen, Clock, ArrowRight, ShieldCheck } from "lucide-react";

export function ExamExplorerSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Management", "Engineering", "Graduate Admissions", "Undergraduate Admissions", "Medical & Healthcare", "Language Proficiency"];

  const filteredExams = useMemo(() => {
    return EXAMS.filter((exam) => {
      const matchesSearch =
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || exam.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section className="py-24 bg-[#141417] border-y border-[#2A2A2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/30 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
            Curriculum Directory
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            One Platform. Every Examination.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Explore verified blueprints, sectional durations, official marking schemes, and adaptive question banks for competitive entrance tests.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by exam name, syllabus topic, or university gateway (e.g. CAT, GATE, GMAT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#1C1C20] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm font-medium placeholder-neutral-500 shadow-inner"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#C8FF3D] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]"
                    : "bg-[#1C1C20] text-neutral-300 hover:text-white border border-[#2E2E36] hover:bg-[#25252A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.slice(0, 6).map((exam) => (
            <div
              key={exam.id}
              className="group bg-[#1C1C20] border-2 border-[#2E2E36] hover:border-[#C8FF3D] rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Tag */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#FF4FA3]">
                      {exam.category}
                    </span>
                    <h3 className="text-2xl font-black text-white group-hover:text-[#C8FF3D] transition-colors mt-0.5">
                      {exam.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#111111] border border-[#2A2A2E] text-neutral-300">
                    <ShieldCheck className="w-3 h-3 text-[#C8FF3D]" />
                    {exam.status === "published" ? "Verified" : "Syllabus Ready"}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 line-clamp-1 font-medium">
                  {exam.fullName}
                </p>

                <p className="text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                  {exam.shortDescription}
                </p>

                {/* Key Meta Badges */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2A2A2E] text-xs text-neutral-300 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{exam.durationMinutes} Mins</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{exam.totalQuestions} Questions</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-4 border-t border-[#2A2A2E] flex items-center justify-between">
                <Link
                  href={`/exams/${exam.slug}`}
                  className="text-xs font-bold text-neutral-400 hover:text-white transition-colors"
                >
                  View Blueprint &amp; Syllabus
                </Link>
                <Link
                  href={`/exams/${exam.slug}`}
                  className="p-2.5 rounded-xl bg-[#28282E] group-hover:bg-[#C8FF3D] group-hover:text-[#111111] text-white transition-all shadow-[2px_2px_0px_#111111]"
                  aria-label={`Explore ${exam.name}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Exams CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/exams"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1C1C20] hover:bg-[#25252A] text-white font-bold text-sm border-2 border-[#2E2E36] transition-all"
          >
            <span>Explore All {EXAMS.length} Exam Catalogs</span>
            <ArrowRight className="w-4 h-4 text-[#C8FF3D]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
