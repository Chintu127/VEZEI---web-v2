"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EXAMS, Exam, LaunchWave } from "@/data/exams";
import { Search, Sparkles, CheckCircle2, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export function ExamRoadmapSection() {
  const [selectedWave, setSelectedWave] = useState<LaunchWave | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState<Exam | null>(EXAMS[0]);

  const waves = [
    {
      id: "wave_1" as LaunchWave,
      label: "LAUNCH",
      title: "Wave 1 — Launch",
      bg: "bg-[#C8FF3D] text-[#111111]",
      examsList: "CAT · XAT · SNAP · NMAT · MAT",
      desc: "Initial focus on Indian B-school entrance exams. CAT practice & proctored mocks are live.",
    },
    {
      id: "wave_2" as LaunchWave,
      label: "NEXT",
      title: "Wave 2 — Next",
      bg: "bg-[#FF4FA3] text-white",
      examsList: "GMAT · GRE · Executive Assessment",
      desc: "Global business & graduate admissions. Content blueprinting and psychometric ladders in development.",
    },
    {
      id: "wave_3" as LaunchWave,
      label: "THEN",
      title: "Wave 3 — Then",
      bg: "bg-[#5B3DF5] text-white",
      examsList: "SAT · IELTS · TOEFL · PTE",
      desc: "Undergraduate entrance & global language certifications. Question banks scheduled for expert review.",
    },
    {
      id: "wave_4" as LaunchWave,
      label: "LATER",
      title: "Wave 4 — Later",
      bg: "bg-white text-[#111111]",
      examsList: "GATE · JAM · CSIR-NET · NEET-PG · CLAT-PG · UGC NET",
      desc: "Specialized postgraduate, research & technical disciplines. Expansion unlocks as demand and rights are proven.",
    },
  ];

  const filteredExams = EXAMS.filter((exam) => {
    const matchesWave = selectedWave === "all" || exam.launchWave === selectedWave;
    const matchesSearch =
      searchQuery === "" ||
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWave && matchesSearch;
  });

  return (
    <section id="exams" className="py-20 lg:py-28 bg-[#111111] text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Category Pill: EXAMS */}
        <div className="inline-block mb-4">
          <span className="px-4 py-1.5 rounded-full bg-[#C8FF3D] text-[#111111] text-xs font-black uppercase tracking-wider border-2 border-[#111111] shadow-[2px_2px_0px_#111111]">
            EXAMS
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Starting focused, growing <br />
          step by step
        </h2>

        {/* 4 Illustrated Waves from Booklet Page 5 */}
        <div className="mt-12 space-y-5">
          {waves.map((wave) => (
            <div
              key={wave.id}
              onClick={() => setSelectedWave(wave.id)}
              className={`border-3 border-[#111111] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000000] cursor-pointer transition-all ${
                wave.bg
              } ${selectedWave === wave.id ? "ring-4 ring-white/60 -translate-y-1" : "hover:-translate-y-0.5"}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-black tracking-widest uppercase opacity-80">
                  {wave.label}
                </span>
                <span className="text-xs font-bold opacity-75 sm:text-right">
                  {wave.desc}
                </span>
              </div>
              <div className="mt-2 text-xl sm:text-3xl font-black tracking-tight">
                {wave.examsList}
              </div>
            </div>
          ))}
        </div>

        {/* Sparkle Verification Guarantee from Booklet Page 5 */}
        <div className="mt-8 p-4 rounded-2xl bg-[#1C1C22] border-2 border-[#2E2E36] flex items-center gap-3 text-xs sm:text-sm text-neutral-300">
          <Sparkles className="w-5 h-5 text-[#FF4FA3] flex-shrink-0" />
          <p className="font-semibold">
            A new exam goes live only when its questions, expert review and content rights are ready.
          </p>
        </div>

        {/* Interactive Wave Explorer */}
        <div className="mt-14 bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white">
                Explore Exam Catalog &amp; Readiness
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Inspect syllabus coverage, timing schemes, and release readiness.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search CAT, GMAT, GATE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111111] border border-[#2E2E36] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C8FF3D]"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedWave("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                selectedWave === "all"
                  ? "bg-[#C8FF3D] text-[#111111]"
                  : "bg-[#111111] text-neutral-400 hover:text-white"
              }`}
            >
              All 15 Exams
            </button>
            <button
              onClick={() => setSelectedWave("wave_1")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                selectedWave === "wave_1"
                  ? "bg-[#C8FF3D] text-[#111111]"
                  : "bg-[#111111] text-neutral-400 hover:text-white"
              }`}
            >
              Wave 1 (Launch)
            </button>
            <button
              onClick={() => setSelectedWave("wave_2")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                selectedWave === "wave_2"
                  ? "bg-[#FF4FA3] text-white"
                  : "bg-[#111111] text-neutral-400 hover:text-white"
              }`}
            >
              Wave 2 (Next)
            </button>
            <button
              onClick={() => setSelectedWave("wave_3")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                selectedWave === "wave_3"
                  ? "bg-[#5B3DF5] text-white"
                  : "bg-[#111111] text-neutral-400 hover:text-white"
              }`}
            >
              Wave 3 (Then)
            </button>
            <button
              onClick={() => setSelectedWave("wave_4")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                selectedWave === "wave_4"
                  ? "bg-white text-[#111111]"
                  : "bg-[#111111] text-neutral-400 hover:text-white"
              }`}
            >
              Wave 4 (Later)
            </button>
          </div>

          {/* Exam Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {filteredExams.map((ex) => {
              const isSelected = selectedExam?.id === ex.id;
              const isAvailable = ex.readinessStatus === "available";

              return (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExam(ex)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all relative ${
                    isSelected
                      ? "bg-[#1F1F28] border-[#C8FF3D] shadow-[0_0_15px_rgba(200,255,61,0.25)]"
                      : "bg-[#111111] border-[#2A2A2E] hover:border-neutral-500"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase text-neutral-400">
                      {ex.waveLabel.split("—")[0].trim()}
                    </span>
                    {isAvailable ? (
                      <span className="w-2 h-2 rounded-full bg-[#C8FF3D]" title="Available" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-neutral-600" title="Planned" />
                    )}
                  </div>
                  <h4 className="text-sm font-black text-white truncate">{ex.name}</h4>
                  <p className="text-[11px] text-neutral-400 truncate mt-0.5">{ex.category}</p>
                </button>
              );
            })}
          </div>

          {/* Selected Exam Detailed Inspector Card */}
          {selectedExam && (
            <div className="p-6 rounded-2xl bg-[#111111] border border-[#2E2E36] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2E2E36]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#1C1C24] text-[#C8FF3D] border border-[#C8FF3D]/40">
                      {selectedExam.waveLabel}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      selectedExam.readinessStatus === "available"
                        ? "bg-[#1C2818] text-[#C8FF3D] border border-[#C8FF3D]/50"
                        : "bg-[#29171E] text-[#FF4FA3] border border-[#FF4FA3]/50"
                    }`}>
                      {selectedExam.readinessStatus === "available" ? "Live in App" : "In Preparation / Planned"}
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-white mt-1">
                    {selectedExam.name} — {selectedExam.fullName}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{selectedExam.overview}</p>
                </div>

                {selectedExam.readinessStatus === "available" ? (
                  <Link
                    href={`/app/practice?exam=${selectedExam.slug}`}
                    className="btn-tactile-lime px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 flex-shrink-0"
                  >
                    <span>Practice {selectedExam.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <span className="px-4 py-2 rounded-xl bg-neutral-900 border border-[#2E2E36] text-xs font-bold text-neutral-400 flex items-center gap-2 flex-shrink-0">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <span>Releasing in Wave Roadmap</span>
                  </span>
                )}
              </div>

              {/* Sections & Marking Scheme */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#17171C] border border-[#2A2A2E]">
                  <span className="text-[10px] font-black text-neutral-500 uppercase block">Duration</span>
                  <span className="font-black text-white">{selectedExam.durationMinutes} Minutes</span>
                </div>
                <div className="p-3 rounded-xl bg-[#17171C] border border-[#2A2A2E]">
                  <span className="text-[10px] font-black text-neutral-500 uppercase block">Total Questions</span>
                  <span className="font-black text-white">{selectedExam.totalQuestions} Questions</span>
                </div>
                <div className="p-3 rounded-xl bg-[#17171C] border border-[#2A2A2E]">
                  <span className="text-[10px] font-black text-neutral-500 uppercase block">Marking Scheme</span>
                  <span className="font-black text-white truncate block">{selectedExam.markingScheme}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Booklet footer indicator */}
        <div className="mt-12 pt-6 border-t border-[#2A2A2E] flex items-center justify-between text-xs font-black text-neutral-500">
          <span>vezei · 05</span>
          <span>One App. Every Exam.</span>
        </div>

      </div>
    </section>
  );
}
