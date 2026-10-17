"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppProvider";
import { EXAMS } from "@/data/exams";
import {
  Compass,
  CheckCircle2,
  Plus,
  ArrowRight,
  Clock,
  BookOpen,
  Calendar,
} from "lucide-react";

export default function TargetExamsPage() {
  const { user, updateUser } = useApp();

  const [activeExamId, setActiveExamId] = useState(user?.targetExamId || "cat");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSwitchExam = (exam: any) => {
    setActiveExamId(exam.id);
    updateUser({
      targetExamId: exam.id,
      targetExamName: exam.name,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/30 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Curriculum Ecosystem
          </div>
          <h1 className="text-3xl font-black text-white">Target Examination Management</h1>
          <p className="text-xs text-neutral-400">
            Manage and switch between your target entrance examinations. Your study planner and practice sessions dynamically adapt.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-tactile-lime px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Target Exam</span>
        </button>
      </div>

      {/* Active Exam Card */}
      <div className="bg-[#17171C] border-3 border-[#C8FF3D] rounded-3xl p-6 sm:p-8 space-y-4 shadow-[0_15px_40px_rgba(200,255,61,0.15)]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#C8FF3D] text-[#111111]">
            Active Primary Exam
          </span>
          <span className="text-xs text-[#C8FF3D] font-bold">Currently Driving Dashboard</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-white">{user?.targetExamName || "CAT 2026"}</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Target Score: <strong>{user?.targetScore || "99.5%ile"}</strong> • Scheduled Date:{" "}
              <strong>{user?.targetExamDate || "Nov 29, 2026"}</strong>
            </p>
          </div>

          <Link
            href="/app/practice"
            className="btn-tactile-lime px-6 py-3 rounded-xl text-xs font-black inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <span>Launch Exam Practice</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Available Exam Library to Switch */}
      <div className="space-y-4">
        <h3 className="text-base font-black text-white uppercase tracking-wider">
          All Supported Exam Blueprints
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXAMS.map((exam) => {
            const isCurrent = activeExamId === exam.id;
            return (
              <div
                key={exam.id}
                className={`p-6 rounded-3xl border-2 flex flex-col justify-between space-y-4 transition-all ${
                  isCurrent
                    ? "bg-[#1E2519] border-[#C8FF3D]"
                    : "bg-[#17171C] border-[#2E2E36] hover:border-neutral-500"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4FA3]">
                      {exam.category}
                    </span>
                    <span className="text-xs text-neutral-400">{exam.region}</span>
                  </div>

                  <h4 className="text-xl font-black text-white">{exam.name}</h4>
                  <p className="text-xs text-neutral-400 line-clamp-1">{exam.fullName}</p>

                  <div className="flex items-center gap-4 text-xs text-neutral-400 pt-2 border-t border-[#2A2A2E]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {exam.durationMinutes}m
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {exam.totalQuestions} Qs
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  {isCurrent ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C8FF3D]">
                      <CheckCircle2 className="w-4 h-4" /> Active on Dashboard
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSwitchExam(exam)}
                      className="px-4 py-2 rounded-xl bg-[#111111] hover:bg-[#202026] text-white border border-[#2E2E36] text-xs font-bold"
                    >
                      Set as Primary Exam
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4">
            <h3 className="text-lg font-black text-white">Add Secondary Target Exam</h3>
            <p className="text-xs text-neutral-400">
              Select an exam from our verified catalog to add it to your preparation tracking.
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {EXAMS.map((e) => (
                <button
                  key={e.id}
                  onClick={() => {
                    handleSwitchExam(e);
                    setShowAddModal(false);
                  }}
                  className="w-full p-3 rounded-xl bg-[#111111] hover:bg-[#1E1E24] border border-[#2E2E36] text-left text-xs font-bold text-white flex items-center justify-between"
                >
                  <span>{e.name} — {e.category}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8FF3D]" />
                </button>
              ))}
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-[#111111] text-xs font-bold text-neutral-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
