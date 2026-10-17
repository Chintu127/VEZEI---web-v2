"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppProvider";
import {
  BrainCircuit,
  Sparkles,
  Send,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Zap,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  hints?: string[];
  timestamp: string;
}

function AiTutorContent() {
  const searchParams = useSearchParams();
  const initialDoubt = searchParams.get("doubt") || "";

  const { addXp } = useApp();

  const [input, setInput] = useState(initialDoubt);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: "Hello Aspirant! I am your 24/7 VEZEI Socratic AI Tutor. Ask me any competitive exam problem, mathematical equation, or critical reasoning dilemma. I will guide your thinking step-by-step without spoiling the final answer.",
      timestamp: "Just now",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const presetDoubts = [
    "How do I solve successive percentage discount problems without confusing Cost Price and Marked Price?",
    "Can you explain Master Theorem Case 3 for GATE CS algorithms?",
    "How does the Assumption Negation Technique work in CAT Critical Reasoning?",
    "Explain King's Property in definite integrals for JEE Advanced.",
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      let reply = "";
      if (text.toLowerCase().includes("discount") || text.toLowerCase().includes("percentage")) {
        reply =
          "Let's break this down Socratically:\n\n1. Foundational premise: Marked Price (MP) is calculated by applying a markup on Cost Price (CP): MP = CP × (1 + Markup).\n\n2. The key trap: A 25% discount is calculated on MP, not CP! Discount Amount = 0.25 × MP.\n\n3. Therefore, Selling Price (SP) = MP × (1 - 0.25) = 0.75 × MP.\n\nWould you like me to walk through a sample numeric scenario with CP = 100?";
      } else if (text.toLowerCase().includes("master theorem") || text.toLowerCase().includes("gate")) {
        reply =
          "For recurrence T(n) = aT(n/b) + f(n):\n\nStep 1: Compute the benchmark threshold n^(log_b a).\nStep 2: Compare f(n) with n^(log_b a).\n\nCase 3 applies when f(n) is polynomially larger than n^(log_b a), i.e., f(n) = Ω(n^(log_b a + ε)) for some ε > 0, AND the regularity condition holds: a*f(n/b) ≤ c*f(n) for c < 1.\n\nThen T(n) = Θ(f(n)).";
      } else {
        reply =
          `Great question on: "${text.slice(0, 40)}...".\n\nLet's apply the first principle of competitive exam problem-solving:\n1. What are the known constraints and givens?\n2. What is the fundamental formula or premise governing this relationship?\n3. Notice the common trap: check if options contain reciprocal or sign-change pitfalls.\n\nTry setting up the initial equation, or tell me where you feel stuck!`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: reply,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, aiMsg]);
      addXp(15, "Consulted Socratic AI Doubt Tutor");
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200 flex flex-col h-[calc(100vh-140px)]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#5B3DF5] border-2 border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center text-white">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              <span>24/7 Socratic AI Tutor</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C8FF3D] text-[#111111]">
                Online
              </span>
            </h1>
            <p className="text-xs text-neutral-400">Grounded in verified entrance exam curricula</p>
          </div>
        </div>

        <span className="text-xs text-neutral-400 font-semibold hidden sm:inline">
          No Answer Spoilers • Socratic Guidance
        </span>
      </div>

      {/* Preset Doubts Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-shrink-0 scrollbar-none">
        {presetDoubts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="px-3 py-1.5 rounded-xl bg-[#17171C] hover:bg-[#202028] text-neutral-300 hover:text-white border border-[#2E2E36] text-[11px] font-medium whitespace-nowrap transition-all"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Message Chat Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-none">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && (
              <div className="w-8 h-8 rounded-xl bg-[#5B3DF5] flex items-center justify-center text-white text-xs font-black flex-shrink-0 mt-1">
                AI
              </div>
            )}

            <div
              className={`p-4 rounded-2xl max-w-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[#C8FF3D] text-[#111111] font-semibold rounded-tr-none shadow-[2px_2px_0px_#111111]"
                  : "bg-[#17171C] border-2 border-[#2E2E36] text-neutral-200 rounded-tl-none whitespace-pre-line"
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-xl bg-[#111111] border border-[#2A2A2E] flex items-center justify-center text-sm flex-shrink-0 mt-1">
                🎯
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 pl-11">
            <Sparkles className="w-3.5 h-3.5 text-[#5B3DF5] animate-spin" />
            <span>Analyzing problem structure &amp; preparing Socratic guide...</span>
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <div className="pt-2 flex-shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question, math problem, or concept doubt..."
            className="flex-1 px-4 py-3.5 rounded-2xl bg-[#17171C] border-2 border-[#2E2E36] focus:border-[#5B3DF5] focus:outline-none text-white text-xs sm:text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="btn-tactile-purple p-3.5 rounded-2xl disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}

export default function AiTutorPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex items-center justify-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#5B3DF5]" />
        </div>
      }
    >
      <AiTutorContent />
    </Suspense>
  );
}
