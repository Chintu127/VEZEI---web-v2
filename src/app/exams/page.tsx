"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EXAMS } from "@/data/exams";
import { Search, Filter, Clock, BookOpen, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ExamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Management",
    "Engineering",
    "Graduate Admissions",
    "Undergraduate Admissions",
    "Medical & Healthcare",
    "Law",
    "Language Proficiency",
  ];

  const filteredExams = useMemo(() => {
    return EXAMS.filter((exam) => {
      const matchesSearch =
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || exam.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="max-w-3xl mb-12 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#C8FF3D] bg-[#1C1C1E] border border-[#C8FF3D]/30 px-3 py-1 rounded-full">
              Comprehensive Directory
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Explore Competitive Examinations
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg">
              Official syllabus mappings, test patterns, scoring criteria, and verified practice question banks for national and international entrance exams.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 mb-12 space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search examination name, acronym, or target role (e.g. CAT, GATE, GMAT, IIT)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm font-medium placeholder-neutral-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[#C8FF3D] text-[#111111] border-2 border-[#111111] shadow-[2px_2px_0px_#111111]"
                      : "bg-[#111111] text-neutral-300 hover:text-white border border-[#2A2A2E]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6 text-xs text-neutral-400 font-bold">
            <span>Showing {filteredExams.length} examinations</span>
            <span>All syllabi verified against official conducting authorities</span>
          </div>

          {/* Grid of Exams */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#C8FF3D] rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4FA3]">
                        {exam.category}
                      </span>
                      <h2 className="text-2xl font-black text-white mt-0.5">{exam.name}</h2>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#111111] border border-[#2A2A2E] text-[#C8FF3D] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {exam.status === "published" ? "Verified" : "Syllabus Ready"}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 font-medium">{exam.fullName}</p>
                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">{exam.shortDescription}</p>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#2A2A2E] text-xs text-neutral-300 font-semibold">
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

                <div className="pt-6 mt-4 border-t border-[#2A2A2E] flex items-center justify-between">
                  <Link
                    href={`/exams/${exam.slug}`}
                    className="text-xs font-bold text-[#C8FF3D] hover:underline"
                  >
                    View Syllabus &amp; Blueprint
                  </Link>
                  <Link
                    href={`/exams/${exam.slug}`}
                    className="p-2 rounded-xl bg-[#25252A] hover:bg-[#C8FF3D] hover:text-[#111111] text-white transition-all shadow-[2px_2px_0px_#111111]"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
