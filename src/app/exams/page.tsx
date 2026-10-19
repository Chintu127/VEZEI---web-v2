"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EXAMS, LaunchWave } from "@/data/exams";
import { Search, Clock, BookOpen, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ExamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWave, setSelectedWave] = useState<LaunchWave | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Management",
    "Engineering",
    "Graduate Admissions",
    "Undergraduate Admissions",
    "Language Proficiency",
    "Research & Postgraduate",
  ];

  const filteredExams = useMemo(() => {
    return EXAMS.filter((exam) => {
      const matchesSearch =
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesWave = selectedWave === "all" || exam.launchWave === selectedWave;
      const matchesCategory =
        selectedCategory === "All" || exam.category === selectedCategory;
      return matchesSearch && matchesWave && matchesCategory;
    });
  }, [searchQuery, selectedWave, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="max-w-3xl mb-12 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#C8FF3D] bg-[#1C1C1E] border border-[#C8FF3D]/30 px-3 py-1 rounded-full">
              Examination Directory
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              One App. Every Exam Directory.
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg">
              Official syllabus mappings, test patterns, scoring criteria, and launch wave roadmaps. Initial release focused on CAT and Indian B-School prep.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 mb-10 space-y-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search examination name, acronym, or target role (e.g. CAT, GMAT, GRE, GATE)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm font-medium placeholder-neutral-500"
              />
            </div>

            {/* Wave Filter Pills */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                Filter by Launch Wave:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedWave("all")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    selectedWave === "all"
                      ? "bg-white text-[#111111]"
                      : "bg-[#111111] text-neutral-400 border border-[#2E2E36] hover:text-white"
                  }`}
                >
                  All Waves ({EXAMS.length})
                </button>
                <button
                  onClick={() => setSelectedWave("wave_1")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    selectedWave === "wave_1"
                      ? "bg-[#C8FF3D] text-[#111111]"
                      : "bg-[#111111] text-neutral-400 border border-[#2E2E36] hover:text-white"
                  }`}
                >
                  Wave 1 (Launch)
                </button>
                <button
                  onClick={() => setSelectedWave("wave_2")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    selectedWave === "wave_2"
                      ? "bg-[#FF4FA3] text-white"
                      : "bg-[#111111] text-neutral-400 border border-[#2E2E36] hover:text-white"
                  }`}
                >
                  Wave 2 (Next)
                </button>
                <button
                  onClick={() => setSelectedWave("wave_3")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    selectedWave === "wave_3"
                      ? "bg-[#5B3DF5] text-white"
                      : "bg-[#111111] text-neutral-400 border border-[#2E2E36] hover:text-white"
                  }`}
                >
                  Wave 3 (Then)
                </button>
                <button
                  onClick={() => setSelectedWave("wave_4")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    selectedWave === "wave_4"
                      ? "bg-neutral-200 text-[#111111]"
                      : "bg-[#111111] text-neutral-400 border border-[#2E2E36] hover:text-white"
                  }`}
                >
                  Wave 4 (Later)
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[#25252E] text-[#C8FF3D] border border-[#C8FF3D]/50"
                      : "bg-[#111111] text-neutral-400 hover:text-white border border-[#2A2A2E]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count & Quality Notice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 text-xs text-neutral-400 font-bold gap-2">
            <span>Showing {filteredExams.length} examinations</span>
            <span className="text-[#C8FF3D]">A new exam goes live only when its questions, expert review and content rights are ready.</span>
          </div>

          {/* Grid of Exams */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => {
              const isAvailable = exam.readinessStatus === "available";

              return (
                <div
                  key={exam.id}
                  className="bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#C8FF3D] rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4FA3]">
                            {exam.category}
                          </span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#111111] text-[#C8FF3D] border border-[#C8FF3D]/30">
                            {exam.waveLabel.split("—")[0].trim()}
                          </span>
                        </div>
                        <h2 className="text-2xl font-black text-white mt-1">{exam.name}</h2>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                          isAvailable
                            ? "bg-[#1C2818] border border-[#C8FF3D]/50 text-[#C8FF3D]"
                            : "bg-[#1C1C22] border border-[#2A2A2E] text-neutral-400"
                        }`}
                      >
                        {isAvailable ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {isAvailable ? "Available" : "In Preparation"}
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
                    {isAvailable ? (
                      <Link
                        href={`/app/practice?exam=${exam.slug}`}
                        className="btn-tactile-lime px-4 py-2 rounded-xl text-xs font-black inline-flex items-center gap-1.5"
                      >
                        <span>Start Practice</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <span className="text-xs font-semibold text-neutral-400">
                        {exam.contentAvailability}
                      </span>
                    )}

                    <Link
                      href={`/exams/${exam.slug}`}
                      className="p-2 rounded-xl bg-[#25252A] hover:bg-[#C8FF3D] hover:text-[#111111] text-white transition-all shadow-[2px_2px_0px_#111111]"
                      title="View Syllabus & Pattern"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
