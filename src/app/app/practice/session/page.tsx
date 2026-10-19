"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppProvider";
import { SAMPLE_QUESTIONS, Question } from "@/data/questions";
import { calculatePracticeScore } from "@/lib/gamification/engine";
import {
  Clock,
  Bookmark,
  Flag,
  Lightbulb,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Send,
  X,
} from "lucide-react";

function PracticeSessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const examSlug = searchParams.get("exam") || "cat";
  const sessionMode = searchParams.get("mode") || "drill";

  const { addXp, recordStudyActivity, bookmarks, toggleBookmark, addMistake, recordPracticeSession } = useApp();

  // Load questions (filtered by exam or fallback to full sample question bank)
  const questions: Question[] = SAMPLE_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes countdown
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showAiHint, setShowAiHint] = useState(false);
  const [hintTier, setHintTier] = useState(1);

  const currentQ = questions[currentIndex] || questions[0];
  const isBookmarked = bookmarks.includes(currentQ.id);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleToggleReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleClearResponse = () => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
  };

  const handleSubmit = () => {
    // Format question answers for scoring engine
    const scoringInput = questions.map((q) => ({
      id: q.id,
      correctOption: Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer,
      positiveMarks: 3,
      negativeMarks: 1,
    }));

    const result = calculatePracticeScore(scoringInput, selectedAnswers);

    // Record XP and streak progress
    addXp(result.xpAwarded, "Completed Practice Session Drill");
    recordStudyActivity(15);

    // Catalog incorrect questions into Mistake Notebook
    questions.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      const correct = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
      if (chosen && chosen !== correct) {
        addMistake({
          questionId: q.id,
          examSlug: q.examSlug,
          subject: q.subject,
          topic: q.topic,
          prompt: q.prompt,
          wrongOption: chosen,
          correctAnswer: correct,
          explanation: q.explanation,
          errorType: "conceptual",
        });
      }
    });

    // Store results in sessionStorage for results page
    const sessionResult = {
      attemptId: `att-${Date.now()}`,
      examSlug,
      questions,
      selectedAnswers,
      result,
      timeSpent: 20 * 60 - timeLeft,
      completedAt: new Date().toISOString(),
    };

    // Record in global app state for real analytics
    recordPracticeSession({
      attemptId: sessionResult.attemptId,
      examSlug,
      mode: sessionMode === "mock" ? "mock" : "drill",
      totalQuestions: questions.length,
      correctCount: result.correctCount,
      incorrectCount: result.incorrectCount,
      score: result.score,
      accuracy: result.accuracy,
      timeSpentSeconds: 20 * 60 - timeLeft,
      completedAt: sessionResult.completedAt,
      topicsAttempted: questions.map((q) => {
        const chosen = selectedAnswers[q.id];
        const correct = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
        return {
          topic: q.topic,
          subject: q.subject,
          isCorrect: chosen === correct,
        };
      }),
    });

    if (typeof window !== "undefined") {
      sessionStorage.setItem("latest_test_result", JSON.stringify(sessionResult));
    }

    router.push(`/app/results/${sessionResult.attemptId}`);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;
  const unattemptedCount = questions.length - answeredCount;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* 1. SESSION TOP BAR */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-2xl p-4 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4FA3]">
            Target Drill: {examSlug.toUpperCase()}
          </span>
          <h1 className="text-base font-black text-white">{currentQ.subject}</h1>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] border border-[#C8FF3D]/40 text-[#C8FF3D] font-mono text-sm font-black">
          <Clock className="w-4 h-4" />
          <span>{formatTimer(timeLeft)}</span>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => setShowSubmitModal(true)}
          className="btn-tactile-lime px-5 py-2 rounded-xl text-xs font-black flex items-center gap-2"
        >
          <span>Submit Test</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. QUESTION & PALETTE SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Main Question Area */}
        <div className="lg:col-span-8 bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6">
          
          {/* Question Meta Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2E]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-[#111111] text-white border border-[#2E2E36]">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-xs text-neutral-400 font-semibold">{currentQ.topic}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(currentQ.id)}
                className={`p-2 rounded-xl border transition-all ${
                  isBookmarked
                    ? "bg-[#281822] border-[#FF4FA3] text-[#FF4FA3]"
                    : "bg-[#111111] border-[#2E2E36] text-neutral-400 hover:text-white"
                }`}
                title="Bookmark for revision"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              <button
                onClick={handleToggleReview}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                  markedForReview[currentQ.id]
                    ? "bg-[#251E30] border-[#5B3DF5] text-[#5B3DF5]"
                    : "bg-[#111111] border-[#2E2E36] text-neutral-400 hover:text-white"
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{markedForReview[currentQ.id] ? "Marked" : "Review"}</span>
              </button>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-4">
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.prompt}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options?.map((opt) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-[#212815] border-[#C8FF3D] text-white shadow-[0_0_15px_rgba(200,255,61,0.2)]"
                      : "bg-[#111111] border-[#2E2E36] text-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs border ${
                        isSelected
                          ? "bg-[#C8FF3D] text-[#111111] border-[#111111]"
                          : "bg-neutral-800 text-neutral-300 border-[#2E2E36]"
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="text-sm font-medium">{opt.text}</span>
                  </div>

                  {isSelected && <CheckCircle2 className="w-5 h-5 text-[#C8FF3D]" />}
                </button>
              );
            })}
          </div>

          {/* Socratic AI Hint Trigger */}
          <div className="pt-2">
            <button
              onClick={() => setShowAiHint(!showAiHint)}
              className="px-4 py-2 rounded-xl bg-[#1C1C24] hover:bg-[#252530] text-[#5B3DF5] border border-[#5B3DF5]/40 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Lightbulb className="w-4 h-4 text-[#5B3DF5]" />
              <span>{showAiHint ? "Hide Socratic AI Hint" : "Request Socratic AI Hint (No Spoiler)"}</span>
            </button>

            {/* In-Test AI Hint Box */}
            {showAiHint && (
              <div className="mt-3 p-4 rounded-2xl bg-[#181824] border-2 border-[#5B3DF5]/40 text-xs space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#5B3DF5] font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Hint Tier {hintTier}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setHintTier(tier)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          hintTier === tier
                            ? "bg-[#5B3DF5] text-white"
                            : "bg-neutral-800 text-neutral-400"
                        }`}
                      >
                        Tier {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-neutral-300 leading-relaxed">
                  {currentQ.hints[hintTier - 1] || currentQ.hints[0]}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Action Controls */}
          <div className="pt-6 border-t border-[#2A2A2E] flex items-center justify-between">
            <button
              onClick={handleClearResponse}
              disabled={!selectedAnswers[currentQ.id]}
              className="text-xs text-neutral-500 hover:text-white font-bold disabled:opacity-40"
            >
              Clear Choice
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl bg-[#111111] border border-[#2E2E36] text-xs font-bold text-neutral-300 hover:text-white disabled:opacity-40 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                disabled={currentIndex === questions.length - 1}
                className="btn-tactile-lime px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Right: Question Navigation Palette */}
        <div className="lg:col-span-4 bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 space-y-6">
          <h3 className="font-black text-white text-sm uppercase tracking-wider">
            Question Palette
          </h3>

          {/* Status Legend */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-400 font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#C8FF3D] border border-black" />
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#5B3DF5] border border-black" />
              <span>Review ({reviewCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-neutral-800 border border-neutral-700" />
              <span>Unattempted ({unattemptedCount})</span>
            </div>
          </div>

          {/* Palette Grid */}
          <div className="grid grid-cols-5 gap-2 pt-2 border-t border-[#2A2A2E]">
            {questions.map((q, idx) => {
              const isAnswered = !!selectedAnswers[q.id];
              const isReview = !!markedForReview[q.id];
              const isCurrent = currentIndex === idx;

              let btnClass = "bg-neutral-800 text-neutral-400 border-neutral-700";
              if (isReview) {
                btnClass = "bg-[#5B3DF5] text-white border-[#5B3DF5]";
              } else if (isAnswered) {
                btnClass = "bg-[#C8FF3D] text-[#111111] border-[#C8FF3D] font-black";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-10 rounded-xl border-2 text-xs font-bold transition-all ${btnClass} ${
                    isCurrent ? "ring-2 ring-white scale-105" : ""
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#2A2A2E]">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="btn-tactile-lime w-full py-3.5 rounded-xl text-xs font-black"
            >
              Finish &amp; Score Test
            </button>
          </div>
        </div>

      </div>

      {/* 3. SUBMIT CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E]">
              <h3 className="text-lg font-black text-white">Confirm Test Submission</h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-[#111111] border border-[#2A2A2E]">
                <span className="text-neutral-400 font-bold block">Answered</span>
                <span className="text-lg font-black text-[#C8FF3D]">{answeredCount}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#111111] border border-[#2A2A2E]">
                <span className="text-neutral-400 font-bold block">Unanswered</span>
                <span className="text-lg font-black text-neutral-400">{unattemptedCount}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#111111] border border-[#2A2A2E]">
                <span className="text-neutral-400 font-bold block">Marked Review</span>
                <span className="text-lg font-black text-[#5B3DF5]">{reviewCount}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Once submitted, your answers will be evaluated server-side. XP points will be awarded, and errors will be added to your Mistake Notebook.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 rounded-xl bg-[#111111] hover:bg-neutral-800 text-neutral-300 text-xs font-bold border border-[#2E2E36]"
              >
                Continue Test
              </button>
              <button
                onClick={handleSubmit}
                className="btn-tactile-lime flex-1 py-3 rounded-xl text-xs font-black"
              >
                Confirm &amp; See Results
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function PracticeSessionPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex items-center justify-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#C8FF3D]" />
        </div>
      }
    >
      <PracticeSessionContent />
    </Suspense>
  );
}
