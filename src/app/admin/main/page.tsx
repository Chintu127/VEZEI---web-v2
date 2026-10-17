"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EXAMS } from "@/data/exams";
import { SAMPLE_QUESTIONS } from "@/data/questions";
import {
  BookOpen,
  CheckCircle2,
  FileQuestion,
  FileCheck2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function MainAdminPage() {
  const [questions, setQuestions] = useState(SAMPLE_QUESTIONS);
  const [approvedCount, setApprovedCount] = useState(48);
  const [pendingReviews, setPendingReviews] = useState([
    {
      id: "rev-1",
      exam: "CAT",
      subject: "Quantitative Aptitude",
      topic: "Time, Speed & Distance",
      submittedBy: "Prof. Raghavan",
      date: "Today, 10:30 AM",
      status: "pending",
    },
    {
      id: "rev-2",
      exam: "GATE CS",
      subject: "Algorithms",
      topic: "Dynamic Programming",
      submittedBy: "Dr. K. Srinivas",
      date: "Yesterday",
      status: "pending",
    },
    {
      id: "rev-3",
      exam: "GMAT Focus",
      subject: "Data Insights",
      topic: "Multi-Source Reasoning",
      submittedBy: "Emily Watson",
      date: "Oct 15",
      status: "pending",
    },
  ]);

  const handleApprove = (id: string) => {
    setPendingReviews((prev) => prev.filter((item) => item.id !== id));
    setApprovedCount((c) => c + 1);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A2A2E]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1F16] border border-[#C8FF3D]/50 text-[#C8FF3D] text-xs font-black uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Academic Content Operations
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Main Admin Dashboard</h1>
          <p className="text-xs text-neutral-400">
            Exam catalog management, syllabus configurations, question bank verification, and mock test publishing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/questions"
            className="btn-tactile-lime px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2"
          >
            <span>Question Bank</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#17171C] border border-[#2E2E36] space-y-1">
          <div className="text-xs text-neutral-400 font-bold uppercase">Supported Exams</div>
          <div className="text-2xl font-black text-[#C8FF3D]">{EXAMS.length} Active</div>
          <div className="text-[11px] text-neutral-500">CAT, GATE, GMAT, GRE, JEE, etc.</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#17171C] border border-[#2E2E36] space-y-1">
          <div className="text-xs text-neutral-400 font-bold uppercase">Verified Questions</div>
          <div className="text-2xl font-black text-white">{approvedCount + 1200}</div>
          <div className="text-[11px] text-neutral-500">With verified Socratic explanations</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#17171C] border border-[#2E2E36] space-y-1">
          <div className="text-xs text-neutral-400 font-bold uppercase">Pending Verification</div>
          <div className="text-2xl font-black text-[#FF4FA3]">{pendingReviews.length} Tasks</div>
          <div className="text-[11px] text-neutral-500">Submitted by subject educators</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#17171C] border border-[#2E2E36] space-y-1">
          <div className="text-xs text-neutral-400 font-bold uppercase">Live Mock Tests</div>
          <div className="text-2xl font-black text-[#5B3DF5]">24 Full Mocks</div>
          <div className="text-[11px] text-neutral-500">Timed sectional drills active</div>
        </div>
      </div>

      {/* Review & Approval Queue */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white">Question Verification Queue</h2>
            <p className="text-xs text-neutral-400">
              Double-blind verified explanations before publication to students.
            </p>
          </div>
          <span className="text-xs text-neutral-400 font-bold">
            {pendingReviews.length} Pending
          </span>
        </div>

        {pendingReviews.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#111111] border border-[#2E2E36] space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#C8FF3D] mx-auto" />
            <h3 className="text-sm font-bold text-white">All Submissions Verified!</h3>
            <p className="text-xs text-neutral-400">No questions waiting in the academic review queue.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingReviews.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#111111] border border-[#2E2E36] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#1C1F16] border border-[#C8FF3D]/40 text-[#C8FF3D] text-[10px] font-black uppercase">
                      {item.exam}
                    </span>
                    <span className="text-xs font-bold text-white">{item.subject}</span>
                    <span className="text-xs text-neutral-400">• {item.topic}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Drafted by {item.submittedBy} • {item.date}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="btn-tactile-lime px-4 py-2 rounded-xl text-xs font-black"
                  >
                    Approve &amp; Publish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Navigation to Content Suites */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/exams"
          className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#C8FF3D] transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1C1F16] text-[#C8FF3D] flex items-center justify-center font-black">
            1
          </div>
          <h3 className="text-base font-black text-white group-hover:text-[#C8FF3D] transition-colors">
            Exam &amp; Syllabus Architectures
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Configure subjects, topics, marking rules (+3 / -1), and syllabus revisions.
          </p>
        </Link>

        <Link
          href="/admin/questions"
          className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#FF4FA3] transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#29171E] text-[#FF4FA3] flex items-center justify-center font-black">
            2
          </div>
          <h3 className="text-base font-black text-white group-hover:text-[#FF4FA3] transition-colors">
            Question CMS &amp; Solutions
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Browse, edit, and organize single-choice, multiple-select, and numerical questions.
          </p>
        </Link>

        <Link
          href="/admin/mock-tests"
          className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#5B3DF5] transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1E1933] text-[#5B3DF5] flex items-center justify-center font-black">
            3
          </div>
          <h3 className="text-base font-black text-white group-hover:text-[#5B3DF5] transition-colors">
            Full-Length Mock Test Builder
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Assemble multi-sectional timed exam simulations matching official exam patterns.
          </p>
        </Link>
      </div>

    </div>
  );
}
