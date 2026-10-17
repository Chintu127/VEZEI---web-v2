"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppProvider";
import { SAMPLE_QUESTIONS, Question } from "@/data/questions";
import { Bookmark, ArrowRight, Trash2, BookOpen, Lightbulb } from "lucide-react";

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useApp();

  const savedQuestions = SAMPLE_QUESTIONS.filter((q) => bookmarks.includes(q.id));

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/30 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
          <Bookmark className="w-3.5 h-3.5" />
          Saved Question Library
        </div>
        <h1 className="text-3xl font-black text-white">Bookmarked Questions</h1>
        <p className="text-xs text-neutral-400">
          Revisit high-yield problems, tricky logical setups, and important formulas you saved during practice.
        </p>
      </div>

      {savedQuestions.length === 0 ? (
        <div className="p-12 text-center bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl space-y-3">
          <Bookmark className="w-12 h-12 text-neutral-600 mx-auto" />
          <h3 className="text-xl font-black text-white">No Saved Questions Yet</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Click the bookmark icon during any practice session or test review to save tricky questions here.
          </p>
          <div className="pt-2">
            <Link href="/app/practice" className="btn-tactile-lime px-6 py-2.5 rounded-xl text-xs font-black inline-block">
              Start Practice Session
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {savedQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-4 transition-all"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded bg-[#111111] text-[#C8FF3D]">
                    #{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-white">{q.subject}</span>
                  <span className="text-xs text-neutral-400">• {q.topic}</span>
                </div>

                <button
                  onClick={() => toggleBookmark(q.id)}
                  className="text-neutral-500 hover:text-[#FF4FA3] p-1.5 rounded-lg border border-[#2A2A2E] bg-[#111111]"
                  title="Remove from bookmarks"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                {q.prompt}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {q.options?.map((opt) => (
                  <div
                    key={opt.id}
                    className="p-3 rounded-xl bg-[#111111] border border-[#2A2A2E] flex items-center gap-2 text-neutral-300"
                  >
                    <span className="w-5 h-5 rounded bg-neutral-800 text-neutral-200 flex items-center justify-center font-bold text-[11px]">
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#111111] border border-[#2A2A2E] text-xs space-y-1">
                <span className="font-bold text-[#C8FF3D] block">Verified Answer &amp; Solution:</span>
                <p className="text-neutral-300 whitespace-pre-line leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
