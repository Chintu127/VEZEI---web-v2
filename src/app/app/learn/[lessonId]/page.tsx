"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppProvider";
import { SKILL_TREE_NODES } from "@/data/gamification";
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Zap,
} from "lucide-react";

export default function LessonPlayerPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.lessonId as string;
  const { addXp, recordStudyActivity } = useApp();

  const node =
    SKILL_TREE_NODES.find((n) => n.id === lessonId) || SKILL_TREE_NODES[1];

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [completedLesson, setCompletedLesson] = useState(false);

  const microQuestion = {
    prompt:
      "If a shopkeeper marks his goods 50% above cost price and offers a 20% discount on the marked price, what is his net profit percentage?",
    options: [
      { id: "A", text: "20.0%" },
      { id: "B", text: "25.0%" },
      { id: "C", text: "30.0%" },
      { id: "D", text: "35.0%" },
    ],
    correct: "A",
    explanation:
      "Let CP = 100. Marked Price MP = 150. Discount of 20% on 150 = 30. Selling Price SP = 150 - 30 = 120. Net profit = (120 - 100) / 100 × 100% = 20.0%.",
  };

  const handleCheckQuiz = () => {
    if (!selectedOption) return;
    setSubmittedQuiz(true);
    if (selectedOption === microQuestion.correct) {
      addXp(30, "Solved Lesson Micro-Quiz!");
    }
  };

  const handleFinishLesson = () => {
    setCompletedLesson(true);
    addXp(node.xpReward, `Completed Lesson: ${node.title}`);
    recordStudyActivity(node.estimatedMinutes);
    setTimeout(() => {
      router.push("/app/learn");
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2E]">
        <Link
          href="/app/learn"
          className="text-xs font-bold text-neutral-400 hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Skill Map</span>
        </Link>

        <span className="text-xs font-bold text-[#C8FF3D] flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 fill-[#C8FF3D]" />
          <span>+{node.xpReward} XP Upon Completion</span>
        </span>
      </div>

      {/* Lesson Header */}
      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#1C1C22] text-[#5B3DF5] border border-[#5B3DF5]/30">
          {node.subject} • Interactive Theory
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">{node.title}</h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Estimated Study Time: {node.estimatedMinutes} Mins • Conceptual Mastery Module
        </p>
      </div>

      {/* Conceptual Theory Cards */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-10 space-y-8">
        
        {/* Core Formula Box */}
        <div className="p-6 rounded-2xl bg-[#1C1C24] border-2 border-[#5B3DF5]/50 space-y-3">
          <div className="flex items-center gap-2 text-[#5B3DF5] font-black text-xs uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Foundational Multiplier Model</span>
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed font-mono bg-[#111111] p-4 rounded-xl border border-[#2A2A2E]">
            Selling Price (SP) = Cost Price (CP) × (1 + Markup %) × (1 - Discount %)
          </p>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Never subtract discount percentage directly from markup percentage! The discount is computed on the inflated Marked Price, while markup is computed on the base Cost Price.
          </p>
        </div>

        {/* Practical Case Study */}
        <div className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h3 className="text-lg font-black text-white">Segmented Inventory Principle</h3>
          <p>
            Competitive exam questions often split merchandise into batches (e.g. "60% of inventory sold at full price, 40% sold at discount").
          </p>
          <p>
            In these cases, calculate the <strong>weighted average revenue per unit</strong>:
          </p>
          <div className="p-4 rounded-xl bg-[#111111] border border-[#2A2A2E] font-mono text-xs text-[#C8FF3D]">
            Total Revenue = (Fraction_1 × Price_1) + (Fraction_2 × Price_2)
          </div>
        </div>

        {/* Embedded Interactive Micro-Quiz */}
        <div className="pt-6 border-t border-[#2A2A2E] space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#FF4FA3]">
              Check Your Understanding
            </span>
          </div>

          <h3 className="text-base font-bold text-white leading-relaxed">
            {microQuestion.prompt}
          </h3>

          <div className="space-y-2.5">
            {microQuestion.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              let style = "bg-[#111111] border-[#2E2E36] text-neutral-300";
              if (submittedQuiz) {
                if (opt.id === microQuestion.correct) {
                  style = "bg-[#1C2818] border-[#C8FF3D] text-[#C8FF3D] font-bold";
                } else if (isSelected && opt.id !== microQuestion.correct) {
                  style = "bg-[#29171E] border-[#FF4FA3] text-[#FF4FA3]";
                }
              } else if (isSelected) {
                style = "bg-[#201D2E] border-[#5B3DF5] text-white";
              }

              return (
                <button
                  key={opt.id}
                  disabled={submittedQuiz}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`w-full p-3.5 rounded-xl border-2 text-left text-xs font-medium transition-all flex items-center justify-between ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-neutral-800 text-neutral-200 flex items-center justify-center font-bold">
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {submittedQuiz && opt.id === microQuestion.correct && (
                    <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
                  )}
                </button>
              );
            })}
          </div>

          {!submittedQuiz ? (
            <button
              onClick={handleCheckQuiz}
              disabled={!selectedOption}
              className="btn-tactile-purple px-6 py-2.5 rounded-xl text-xs font-black disabled:opacity-40"
            >
              Verify Answer
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-[#111111] border border-[#2A2A2E] text-xs space-y-1">
              <span className="font-bold text-[#C8FF3D]">Explanation:</span>
              <p className="text-neutral-300">{microQuestion.explanation}</p>
            </div>
          )}
        </div>

        {/* Complete Lesson Button */}
        <div className="pt-6 border-t border-[#2A2A2E] flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            Node progress will be verified and persisted to your student profile.
          </span>

          <button
            onClick={handleFinishLesson}
            disabled={completedLesson}
            className="btn-tactile-lime px-7 py-3 rounded-xl text-xs font-black flex items-center gap-2"
          >
            {completedLesson ? (
              <span>Node Completed! (+{node.xpReward} XP)</span>
            ) : (
              <>
                <span>Complete Lesson &amp; Claim XP</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
