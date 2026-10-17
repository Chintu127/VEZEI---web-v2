"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppProvider";
import { EXAMS } from "@/data/exams";
import {
  Target,
  Clock,
  Sparkles,
  BookOpen,
  Filter,
  ArrowRight,
  ShieldAlert,
  Sliders,
} from "lucide-react";

function PracticeConfigContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialExam = searchParams.get("exam") || "cat";

  const { user } = useApp();

  const [selectedExamSlug, setSelectedExamSlug] = useState(initialExam);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [difficulty, setDifficulty] = useState<"All" | "Easy" | "Medium" | "Hard">("All");
  const [questionCount, setQuestionCount] = useState(10);
  const [timedMode, setTimedMode] = useState(true);

  const selectedExam = EXAMS.find((e) => e.slug === selectedExamSlug) || EXAMS[0];

  const handleStartPractice = () => {
    // Navigate to active test session
    router.push(
      `/app/practice/session?exam=${selectedExam.slug}&subject=${encodeURIComponent(
        selectedSubject
      )}&difficulty=${difficulty}&count=${questionCount}&timed=${timedMode}`
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/30 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
          <Target className="w-3.5 h-3.5" />
          Adaptive Practice Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Configure Your Practice Session
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm">
          Customize your drill by exam, subject, difficulty, and timing mode. All submitted answers receive instant Socratic explanations and server-authoritative XP.
        </p>
      </div>

      {/* Configuration Card */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-8">
        
        {/* 1. Exam Target */}
        <div className="space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-neutral-400">
            Target Examination
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {EXAMS.slice(0, 8).map((exam) => (
              <button
                key={exam.id}
                type="button"
                onClick={() => setSelectedExamSlug(exam.slug)}
                className={`p-3 rounded-2xl border-2 text-center text-xs font-black transition-all ${
                  selectedExamSlug === exam.slug
                    ? "bg-[#212815] border-[#C8FF3D] text-[#C8FF3D] shadow-[0_0_12px_rgba(200,255,61,0.2)]"
                    : "bg-[#111111] border-[#2E2E36] text-neutral-400 hover:text-white"
                }`}
              >
                {exam.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Subject Selection */}
        <div className="space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-neutral-400">
            Subject Focus ({selectedExam.name})
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedSubject("All")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSubject === "All"
                  ? "bg-[#5B3DF5] text-white shadow-[2px_2px_0px_#111111]"
                  : "bg-[#111111] text-neutral-400 border border-[#2E2E36] hover:text-white"
              }`}
            >
              All Mixed Sections
            </button>
            {selectedExam.syllabus.map((s) => (
              <button
                key={s.subject}
                type="button"
                onClick={() => setSelectedSubject(s.subject)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedSubject === s.subject
                    ? "bg-[#5B3DF5] text-white shadow-[2px_2px_0px_#111111]"
                    : "bg-[#111111] text-neutral-400 border border-[#2E2E36] hover:text-white"
                }`}
              >
                {s.subject}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Difficulty Level */}
        <div className="space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-neutral-400">
            Difficulty Tier
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: "All", label: "Mixed Exam Pattern" },
              { id: "Easy", label: "Easy Concept Warmup" },
              { id: "Medium", label: "Standard Exam Level" },
              { id: "Hard", label: "Hard Advanced Tier" },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDifficulty(d.id as any)}
                className={`p-3 rounded-2xl border-2 text-center text-xs font-black transition-all ${
                  difficulty === d.id
                    ? "bg-[#281822] border-[#FF4FA3] text-[#FF4FA3]"
                    : "bg-[#111111] border-[#2E2E36] text-neutral-400 hover:text-white"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Question Count & Timed Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#2A2A2E]">
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-400">
              Question Count
            </label>
            <div className="flex items-center gap-2">
              {[5, 10, 15, 25].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setQuestionCount(cnt)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-black ${
                    questionCount === cnt
                      ? "bg-[#C8FF3D] text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111]"
                      : "bg-[#111111] border-[#2E2E36] text-neutral-400 hover:text-white"
                  }`}
                >
                  {cnt} Qs
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-400">
              Timer &amp; Pressure Mode
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTimedMode(true)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 ${
                  timedMode
                    ? "bg-[#C8FF3D] text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111]"
                    : "bg-[#111111] border-[#2E2E36] text-neutral-400"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Timed ({questionCount * 2} mins)</span>
              </button>

              <button
                type="button"
                onClick={() => setTimedMode(false)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-black ${
                  !timedMode
                    ? "bg-[#C8FF3D] text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111]"
                    : "bg-[#111111] border-[#2E2E36] text-neutral-400"
                }`}
              >
                Untimed Practice
              </button>
            </div>
          </div>
        </div>

        {/* Start Practice Drill CTA */}
        <div className="pt-4 border-t border-[#2A2A2E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-400">
            <span>Potential Rewards: </span>
            <strong className="text-[#C8FF3D]">+{questionCount * 10 + 20} XP</strong>
            <span> • Advances Daily Practice Quests</span>
          </div>

          <button
            onClick={handleStartPractice}
            className="btn-tactile-lime w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2"
          >
            <span>Launch Practice Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}

export default function PracticeConfigPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex items-center justify-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#C8FF3D]" />
        </div>
      }
    >
      <PracticeConfigContent />
    </Suspense>
  );
}
