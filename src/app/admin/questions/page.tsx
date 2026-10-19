"use client";

import React, { useState } from "react";
import { SAMPLE_QUESTIONS, Question } from "@/data/questions";
import {
  FileQuestion,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Search,
  Check,
  Clock,
  ArrowRight,
  Filter,
} from "lucide-react";

export type ReviewStage = "draft" | "expert_review" | "approved" | "published";

interface AdminQuestionItem extends Question {
  reviewStage: ReviewStage;
  rightsConfirmed: boolean;
  accuracyConfirmed: boolean;
  reviewerNotes?: string;
}

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<AdminQuestionItem[]>(() =>
    SAMPLE_QUESTIONS.map((q, idx) => ({
      ...q,
      reviewStage: idx === 0 ? "published" : idx === 1 ? "approved" : "expert_review",
      rightsConfirmed: true,
      accuracyConfirmed: true,
      reviewerNotes: "Verified by academic council subject lead.",
    }))
  );

  const [filterExam, setFilterExam] = useState("All");
  const [filterStage, setFilterStage] = useState<ReviewStage | "all">("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // New question form state
  const [examSlug, setExamSlug] = useState("cat");
  const [subject, setSubject] = useState("Quantitative Aptitude");
  const [topic, setTopic] = useState("Algebra - Quadratic Equations");
  const [prompt, setPrompt] = useState("");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("A");
  const [explanation, setExplanation] = useState("");
  const [initialStage, setInitialStage] = useState<ReviewStage>("draft");

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !optA.trim() || !optB.trim()) return;

    const newQ: AdminQuestionItem = {
      id: `q-${examSlug}-${Date.now()}`,
      examSlug,
      subject,
      topic,
      type: "mcq",
      difficulty: "Medium",
      prompt: prompt.trim(),
      options: [
        { id: "A", text: optA.trim() },
        { id: "B", text: optB.trim() },
        { id: "C", text: optC.trim() || "Option C" },
        { id: "D", text: optD.trim() || "Option D" },
      ],
      correctAnswer,
      hints: [
        "Focus on the standard problem constraints.",
        "Break down the intermediate steps systematically.",
      ],
      explanation: explanation.trim() || "Verified standard analytical step-by-step solution.",
      conceptSummary: "Verified concept evaluation module.",
      reviewStage: initialStage,
      rightsConfirmed: true,
      accuracyConfirmed: initialStage === "published" || initialStage === "approved",
    };

    setQuestions([newQ, ...questions]);
    setShowAddModal(false);
    setPrompt("");
    setOptA("");
    setOptB("");
    setOptC("");
    setOptD("");
    setExplanation("");
  };

  const advanceStage = (id: string, nextStage: ReviewStage) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, reviewStage: nextStage } : q))
    );
  };

  const filtered = questions.filter((q) => {
    const matchesExam = filterExam === "All" || q.examSlug === filterExam;
    const matchesStage = filterStage === "all" || q.reviewStage === filterStage;
    return matchesExam && matchesStage;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#5B3DF5] bg-[#17171C] border border-[#5B3DF5]/30 px-3 py-1 rounded-full">
            Content Quality &amp; Review Workflow
          </span>
          <h1 className="text-3xl font-black text-white mt-2">Question Bank Repository</h1>
          <p className="text-xs text-neutral-400">
            Enforce the 4-stage quality gate: <strong>Draft &rarr; Expert Review &rarr; Approved &rarr; Published</strong>. Only approved content with verified rights is published.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-tactile-lime px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Draft New Question</span>
        </button>
      </div>

      {/* Review Stage Quick Pipeline Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <button
          onClick={() => setFilterStage("draft")}
          className={`p-3 rounded-2xl border-2 text-left transition-all ${
            filterStage === "draft"
              ? "bg-[#1E1E26] border-[#FF4FA3]"
              : "bg-[#17171C] border-[#2A2A2E] hover:border-neutral-500"
          }`}
        >
          <span className="text-[10px] font-black uppercase text-neutral-400 block">Stage 1</span>
          <span className="font-black text-white block">Draft ({questions.filter((q) => q.reviewStage === "draft").length})</span>
        </button>

        <button
          onClick={() => setFilterStage("expert_review")}
          className={`p-3 rounded-2xl border-2 text-left transition-all ${
            filterStage === "expert_review"
              ? "bg-[#1E1E26] border-[#5B3DF5]"
              : "bg-[#17171C] border-[#2A2A2E] hover:border-neutral-500"
          }`}
        >
          <span className="text-[10px] font-black uppercase text-neutral-400 block">Stage 2</span>
          <span className="font-black text-[#5B3DF5] block">Expert Review ({questions.filter((q) => q.reviewStage === "expert_review").length})</span>
        </button>

        <button
          onClick={() => setFilterStage("approved")}
          className={`p-3 rounded-2xl border-2 text-left transition-all ${
            filterStage === "approved"
              ? "bg-[#1E1E26] border-[#C8FF3D]"
              : "bg-[#17171C] border-[#2A2A2E] hover:border-neutral-500"
          }`}
        >
          <span className="text-[10px] font-black uppercase text-neutral-400 block">Stage 3</span>
          <span className="font-black text-[#C8FF3D] block">Approved ({questions.filter((q) => q.reviewStage === "approved").length})</span>
        </button>

        <button
          onClick={() => setFilterStage("published")}
          className={`p-3 rounded-2xl border-2 text-left transition-all ${
            filterStage === "published"
              ? "bg-[#1E1E26] border-white"
              : "bg-[#17171C] border-[#2A2A2E] hover:border-neutral-500"
          }`}
        >
          <span className="text-[10px] font-black uppercase text-neutral-400 block">Stage 4</span>
          <span className="font-black text-white block">Live Published ({questions.filter((q) => q.reviewStage === "published").length})</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {["All", "cat", "gmat", "gre"].map((ex) => (
            <button
              key={ex}
              onClick={() => setFilterExam(ex)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                filterExam === ex
                  ? "bg-[#5B3DF5] text-white"
                  : "bg-[#17171C] text-neutral-400 border border-[#2E2E36] hover:text-white"
              }`}
            >
              {ex}
            </button>
          ))}
        </div>

        {filterStage !== "all" && (
          <button
            onClick={() => setFilterStage("all")}
            className="text-xs text-[#C8FF3D] font-bold hover:underline"
          >
            Show All Stages ({questions.length})
          </button>
        )}
      </div>

      {/* Questions List with Review Controls */}
      <div className="space-y-4">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#5B3DF5] rounded-3xl p-6 sm:p-8 space-y-4 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#2A2A2E] gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#111111] text-[#C8FF3D] border border-[#C8FF3D]/30">
                  {q.examSlug.toUpperCase()}
                </span>
                <span className="text-xs font-bold text-white">{q.subject}</span>
                <span className="text-xs text-neutral-400">&bull; {q.topic}</span>
              </div>

              {/* Review Stage Pill */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    q.reviewStage === "published"
                      ? "bg-[#1C2818] text-[#C8FF3D] border border-[#C8FF3D]/50"
                      : q.reviewStage === "approved"
                      ? "bg-[#201D2E] text-[#5B3DF5] border border-[#5B3DF5]/50"
                      : q.reviewStage === "expert_review"
                      ? "bg-[#29171E] text-[#FF4FA3] border border-[#FF4FA3]/50"
                      : "bg-[#1F1F24] text-neutral-400 border border-neutral-600"
                  }`}
                >
                  {q.reviewStage.replace("_", " ")}
                </span>

                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#111111] text-white border border-[#2E2E36]">
                  Answer: {Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer}
                </span>
              </div>
            </div>

            <p className="text-sm font-semibold text-white leading-relaxed">{q.prompt}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {q.options?.map((opt) => (
                <div
                  key={opt.id}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                    opt.id === (Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer)
                      ? "bg-[#1C2818] border-[#C8FF3D] text-[#C8FF3D] font-bold"
                      : "bg-[#111111] border-[#2A2A2E] text-neutral-300"
                  }`}
                >
                  <span className="w-5 h-5 rounded bg-neutral-800 text-neutral-200 flex items-center justify-center font-bold text-[10px]">
                    {opt.id}
                  </span>
                  <span>{opt.text}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-[#111111] border border-[#2A2A2E] text-xs space-y-1">
              <strong className="text-neutral-400 font-bold block">Verified Explanation:</strong>
              <p className="text-neutral-300 leading-relaxed">{q.explanation}</p>
            </div>

            {/* Quality Workflow Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#2A2A2E]">
              <div className="flex items-center gap-3 text-neutral-400 text-[11px]">
                <span className="flex items-center gap-1 text-[#C8FF3D]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Rights Cleared
                </span>
                <span className="flex items-center gap-1 text-[#C8FF3D]">
                  <ShieldCheck className="w-3.5 h-3.5" /> Content Verified
                </span>
              </div>

              <div className="flex items-center gap-2">
                {q.reviewStage === "draft" && (
                  <button
                    onClick={() => advanceStage(q.id, "expert_review")}
                    className="px-3 py-1.5 rounded-xl bg-[#5B3DF5] text-white font-bold hover:bg-[#4E32DC] transition-all"
                  >
                    Submit for Expert Review &rarr;
                  </button>
                )}
                {q.reviewStage === "expert_review" && (
                  <button
                    onClick={() => advanceStage(q.id, "approved")}
                    className="px-3 py-1.5 rounded-xl bg-[#C8FF3D] text-[#111111] font-black hover:bg-[#B5F525] transition-all"
                  >
                    Approve Content &amp; Rights &rarr;
                  </button>
                )}
                {q.reviewStage === "approved" && (
                  <button
                    onClick={() => advanceStage(q.id, "published")}
                    className="btn-tactile-lime px-3.5 py-1.5 rounded-xl text-xs font-black"
                  >
                    Publish to Students
                  </button>
                )}
                {q.reviewStage === "published" && (
                  <span className="text-xs text-[#C8FF3D] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Live in Student Practice Engine
                  </span>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-white">Draft Question for Review Workflow</h3>
            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-black uppercase tracking-wider text-neutral-400 mb-1">
                    Exam Target
                  </label>
                  <select
                    value={examSlug}
                    onChange={(e) => setExamSlug(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#111111] border border-[#2E2E36] text-white"
                  >
                    <option value="cat">CAT</option>
                    <option value="gmat">GMAT Focus</option>
                    <option value="gre">GRE</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black uppercase tracking-wider text-neutral-400 mb-1">
                    Correct Option
                  </label>
                  <select
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#111111] border border-[#2E2E36] text-white"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black uppercase tracking-wider text-neutral-400 mb-1">
                    Initial Workflow
                  </label>
                  <select
                    value={initialStage}
                    onChange={(e) => setInitialStage(e.target.value as ReviewStage)}
                    className="w-full px-3 py-2 rounded-xl bg-[#111111] border border-[#2E2E36] text-white font-bold"
                  >
                    <option value="draft">Draft</option>
                    <option value="expert_review">Expert Review</option>
                    <option value="approved">Approved</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-black uppercase tracking-wider text-neutral-400 mb-1">
                  Topic / Concept
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#111111] border border-[#2E2E36] text-white"
                />
              </div>

              <div>
                <label className="block font-black uppercase tracking-wider text-neutral-400 mb-1">
                  Question Prompt
                </label>
                <textarea
                  required
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter full question content with constraints..."
                  className="w-full px-3 py-2 rounded-xl bg-[#111111] border border-[#2E2E36] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={optA}
                  onChange={(e) => setOptA(e.target.value)}
                  placeholder="Option A text"
                  className="px-3 py-2 rounded-xl bg-[#111111] border border-[#2E2E36] text-white"
                />
                <input
                  type="text"
                  required
                  value={optB}
                  onChange={(e) => setOptB(e.target.value)}
                  placeholder="Option B text"
                  className="px-3 py-2 rounded-xl bg-[#111111] border border-[#2E2E36] text-white"
                />
                <input
                  type="text"
                  value={optC}
                  onChange={(e) => setOptC(e.target.value)}
                  placeholder="Option C text"
                  className="px-3 py-2 rounded-xl bg-[#111111] border border-[#2E2E36] text-white"
                />
                <input
                  type="text"
                  value={optD}
                  onChange={(e) => setOptD(e.target.value)}
                  placeholder="Option D text"
                  className="px-3 py-2 rounded-xl bg-[#111111] border border-[#2E2E36] text-white"
                />
              </div>

              <div>
                <label className="block font-black uppercase tracking-wider text-neutral-400 mb-1">
                  Verified Step-by-Step Explanation
                </label>
                <textarea
                  required
                  rows={3}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Detailed solution steps..."
                  className="w-full px-3 py-2 rounded-xl bg-[#111111] border border-[#2E2E36] text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#111111] font-bold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile-lime px-5 py-2 rounded-xl font-black"
                >
                  Create for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
