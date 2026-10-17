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
} from "lucide-react";

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>(SAMPLE_QUESTIONS);
  const [filterExam, setFilterExam] = useState("All");
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

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !optA.trim() || !optB.trim()) return;

    const newQ: Question = {
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
        "Focus on the standard quadratic discriminant: D = b^2 - 4ac.",
        "Set up the relationship between the roots: sum = -b/a, product = c/a.",
      ],
      explanation: explanation.trim() || "Verified standard analytical step-by-step solution.",
      conceptSummary: "Quadratic root formulation under coefficient constraints.",
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

  const filtered = questions.filter(
    (q) => filterExam === "All" || q.examSlug === filterExam
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#5B3DF5] bg-[#17171C] border border-[#5B3DF5]/30 px-3 py-1 rounded-full">
            Content Bank &amp; Verification
          </span>
          <h1 className="text-3xl font-black text-white mt-2">Question Bank Repository</h1>
          <p className="text-xs text-neutral-400">
            Create verified questions, configure 3-stage Socratic hints, and audit answer keys.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-tactile-lime px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Question</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {["All", "cat", "gate-cs", "gmat", "gre", "jee-adv"].map((ex) => (
          <button
            key={ex}
            onClick={() => setFilterExam(ex)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
              filterExam === ex
                ? "bg-[#5B3DF5] text-white shadow-[2px_2px_0px_#111111]"
                : "bg-[#17171C] text-neutral-400 border border-[#2E2E36] hover:text-white"
            }`}
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#5B3DF5] rounded-3xl p-6 sm:p-8 space-y-4 transition-all"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#111111] text-[#C8FF3D] border border-[#C8FF3D]/30">
                  {q.examSlug.toUpperCase()}
                </span>
                <span className="text-xs font-bold text-white">{q.subject}</span>
                <span className="text-xs text-neutral-400">• {q.topic}</span>
              </div>

              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1C2818] text-[#C8FF3D] border border-[#C8FF3D]/40 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Key: {Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer}
              </span>
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
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-white">Create Verified Question</h3>
            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
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
                    <option value="gate-cs">GATE CS</option>
                    <option value="gmat">GMAT Focus</option>
                    <option value="gre">GRE</option>
                    <option value="jee-adv">JEE Advanced</option>
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
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
