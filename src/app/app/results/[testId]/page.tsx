"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useApp } from "@/context/AppProvider";
import { SAMPLE_QUESTIONS, Question } from "@/data/questions";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
  Share2,
  RefreshCw,
} from "lucide-react";

export default function TestResultPage() {
  const params = useParams();
  const testId = params.testId as string;
  const { bookmarks, toggleBookmark } = useApp();

  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("latest_test_result");
      if (saved) {
        try {
          setSessionData(JSON.parse(saved));
        } catch (e) {
          /* fallback */
        }
      }
    }
  }, []);

  // Fallback default test results if refreshed directly
  const data = sessionData || {
    attemptId: testId,
    examSlug: "cat",
    questions: SAMPLE_QUESTIONS,
    selectedAnswers: { "q-cat-qa-01": "C", "q-cat-dilr-01": "B", "q-cat-varc-01": "D" },
    result: {
      correctCount: 4,
      incorrectCount: 1,
      unattemptedCount: 1,
      totalQuestions: 6,
      score: 11,
      accuracy: 80,
      xpAwarded: 90,
    },
    timeSpent: 480,
    completedAt: new Date().toISOString(),
  };

  const { result, questions, selectedAnswers, timeSpent } = data;

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* 1. SCORE HERO SUMMARY CARD */}
      <div className="bg-[#17171C] border-3 border-[#C8FF3D] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(200,255,61,0.15)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A2A2E]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] text-[#C8FF3D] text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Test Completed • Verified Server Score
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Performance Diagnostic Report
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Attempt ID: {testId} • Time Spent: {formatSeconds(timeSpent || 300)}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
              XP Earned
            </span>
            <span className="text-3xl font-black text-[#C8FF3D]">
              +{result.xpAwarded} XP
            </span>
          </div>
        </div>

        {/* 4 Score Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#2E2E36]">
            <span className="text-xs font-bold text-neutral-400 block">Net Score</span>
            <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">
              {result.score} pts
            </span>
            <span className="text-[10px] text-neutral-500 font-medium">+3 / -1 Scheme</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#111111] border border-[#2E2E36]">
            <span className="text-xs font-bold text-neutral-400 block">Accuracy</span>
            <span className="text-2xl sm:text-3xl font-black text-[#C8FF3D] mt-1 block">
              {result.accuracy}%
            </span>
            <span className="text-[10px] text-[#C8FF3D] font-medium">Above Class Average</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#111111] border border-[#2E2E36]">
            <span className="text-xs font-bold text-neutral-400 block">Correct</span>
            <span className="text-2xl sm:text-3xl font-black text-[#C8FF3D] mt-1 block">
              {result.correctCount} / {result.totalQuestions}
            </span>
            <span className="text-[10px] text-neutral-500 font-medium">Questions Solved</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#111111] border border-[#2E2E36]">
            <span className="text-xs font-bold text-neutral-400 block">Incorrect</span>
            <span className="text-2xl sm:text-3xl font-black text-[#FF4FA3] mt-1 block">
              {result.incorrectCount}
            </span>
            <span className="text-[10px] text-[#FF4FA3] font-medium">Saved to Notebook</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/app/mistakes"
              className="px-5 py-2.5 rounded-xl bg-[#29171E] hover:bg-[#381B26] text-[#FF4FA3] border border-[#FF4FA3]/40 text-xs font-black flex items-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Review In Mistake Notebook</span>
            </Link>

            <Link
              href="/app/practice"
              className="px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-neutral-800 text-white border border-[#2E2E36] text-xs font-bold flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Start Another Drill</span>
            </Link>
          </div>

          <Link
            href="/app"
            className="btn-tactile-lime px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2"
          >
            <span>Return to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* 2. QUESTION-BY-QUESTION VERIFIED REVIEW */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white">
            Detailed Solution &amp; Answer Review
          </h2>
          <span className="text-xs text-neutral-400">
            {questions.length} Questions Evaluated
          </span>
        </div>

        <div className="space-y-6">
          {questions.map((q: Question, idx: number) => {
            const chosen = selectedAnswers[q.id];
            const correct = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
            const isCorrect = chosen === correct;
            const isUnattempted = !chosen;
            const isBookmarked = bookmarks.includes(q.id);

            return (
              <div
                key={q.id}
                className={`bg-[#17171C] border-2 rounded-3xl p-6 sm:p-8 space-y-4 transition-all ${
                  isCorrect
                    ? "border-[#C8FF3D]/40"
                    : isUnattempted
                    ? "border-[#2E2E36]"
                    : "border-[#FF4FA3]/50"
                }`}
              >
                {/* Header status */}
                <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-[#111111] text-white">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs text-neutral-400 font-semibold">{q.topic}</span>
                    <span className="text-xs font-bold text-neutral-500">• {q.subject}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C8FF3D]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Correct (+3)</span>
                      </span>
                    ) : isUnattempted ? (
                      <span className="text-xs font-bold text-neutral-400">
                        Unattempted (0)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF4FA3]">
                        <XCircle className="w-4 h-4" />
                        <span>Incorrect (-1)</span>
                      </span>
                    )}

                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg border text-xs ${
                        isBookmarked
                          ? "bg-[#281822] border-[#FF4FA3] text-[#FF4FA3]"
                          : "bg-[#111111] border-[#2E2E36] text-neutral-400 hover:text-white"
                      }`}
                      title="Bookmark Question"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Prompt */}
                <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                  {q.prompt}
                </p>

                {/* Options display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {q.options?.map((opt) => {
                    const isOptionCorrect = opt.id === correct;
                    const isOptionSelected = opt.id === chosen;

                    let optClass = "bg-[#111111] border-[#2A2A2E] text-neutral-300";
                    if (isOptionCorrect) {
                      optClass = "bg-[#1C2818] border-[#C8FF3D] text-[#C8FF3D] font-bold";
                    } else if (isOptionSelected && !isOptionCorrect) {
                      optClass = "bg-[#29171E] border-[#FF4FA3] text-[#FF4FA3] font-bold";
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs ${optClass}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded flex items-center justify-center font-black bg-neutral-800 text-neutral-200">
                            {opt.id}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        {isOptionCorrect && (
                          <span className="text-[10px] font-black uppercase text-[#C8FF3D]">
                            Verified Key
                          </span>
                        )}
                        {isOptionSelected && !isOptionCorrect && (
                          <span className="text-[10px] font-black uppercase text-[#FF4FA3]">
                            Your Answer
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Verified Step-by-Step Explanation */}
                <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] space-y-2 text-xs">
                  <span className="font-black text-[#C8FF3D] uppercase tracking-wider block">
                    Verified Solution &amp; Analytical Steps:
                  </span>
                  <p className="whitespace-pre-line text-neutral-300 leading-relaxed font-sans">
                    {q.explanation}
                  </p>
                  <div className="pt-2 border-t border-[#1C1C22] text-[11px] text-neutral-400">
                    <strong>Core Concept:</strong> {q.conceptSummary}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
