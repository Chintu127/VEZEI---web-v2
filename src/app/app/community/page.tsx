"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppProvider";
import {
  Users,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  Plus,
  Send,
  Sparkles,
} from "lucide-react";

interface DiscussionThread {
  id: string;
  author: string;
  avatar: string;
  channel: string;
  title: string;
  body: string;
  upvotes: number;
  repliesCount: number;
  hasVerifiedAnswer: boolean;
  timeAgo: string;
}

export default function CommunityPage() {
  const { user, addXp } = useApp();

  const [threads, setThreads] = useState<DiscussionThread[]>([
    {
      id: "th-1",
      author: "Priya Nair",
      avatar: "👩‍💼",
      channel: "#cat-quant",
      title: "Tricky shortcut for 3 successive percentage discounts with fractions?",
      body: "When discounts are 16.66% (1/6), 14.28% (1/7), and 12.5% (1/8), multiplying multipliers (5/6 × 6/7 × 7/8 = 5/8) simplifies everything to a clean 37.5% net discount in 10 seconds!",
      upvotes: 42,
      repliesCount: 8,
      hasVerifiedAnswer: true,
      timeAgo: "2 hours ago",
    },
    {
      id: "th-2",
      author: "Rohan Verma",
      avatar: "🚀",
      channel: "#gate-algorithms",
      title: "Master Theorem edge case when f(n) has log n factors?",
      body: "Remember that standard Case 3 requires polynomial dominance n^ε. If f(n) = n^(log_b a) * log n, it's NOT Case 3—it's the extended Case 2 with complexity Θ(n^(log_b a) * log^2 n)!",
      upvotes: 68,
      repliesCount: 14,
      hasVerifiedAnswer: true,
      timeAgo: "5 hours ago",
    },
    {
      id: "th-3",
      author: "Aditi Rao",
      avatar: "⚡",
      channel: "#dilr-strategies",
      title: "How to eliminate impossible options in 4x4 matrix tournament caselets?",
      body: "Look for the win-loss parity constraint first. Total wins across all teams must equal total matches played. That immediately resolves the diagonal zeros.",
      upvotes: 29,
      repliesCount: 5,
      hasVerifiedAnswer: false,
      timeAgo: "1 day ago",
    },
  ]);

  const [activeChannel, setActiveChannel] = useState("All");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);

  const channels = ["All", "#cat-quant", "#gate-algorithms", "#dilr-strategies", "#varc-reading"];

  const handleUpvote = (id: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;

    const newThread: DiscussionThread = {
      id: `th-${Date.now()}`,
      author: user?.fullName || "Aspirant",
      avatar: user?.avatar || "🎯",
      channel: activeChannel === "All" ? "#cat-quant" : activeChannel,
      title: newTitle.trim(),
      body: newBody.trim(),
      upvotes: 1,
      repliesCount: 0,
      hasVerifiedAnswer: false,
      timeAgo: "Just now",
    };

    setThreads([newThread, ...threads]);
    setNewTitle("");
    setNewBody("");
    setShowPostModal(false);
    addXp(20, "Shared Community Discussion Post");
  };

  const filtered = threads.filter(
    (t) => activeChannel === "All" || t.channel === activeChannel
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#5B3DF5]/40 text-[#5B3DF5] text-xs font-black uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            Moderated Study Cohort
          </div>
          <h1 className="text-3xl font-black text-white">Community &amp; Discussions</h1>
          <p className="text-xs text-neutral-400">
            Share exam shortcuts, discuss difficult previous-year caselets, and peer-review tricky problems.
          </p>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="btn-tactile-lime px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Start Discussion (+20 XP)</span>
        </button>
      </div>

      {/* Channel Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {channels.map((ch) => (
          <button
            key={ch}
            onClick={() => setActiveChannel(ch)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeChannel === ch
                ? "bg-[#5B3DF5] text-white shadow-[2px_2px_0px_#111111]"
                : "bg-[#17171C] text-neutral-400 border border-[#2E2E36] hover:text-white"
            }`}
          >
            {ch === "All" ? "All Channels" : ch}
          </button>
        ))}
      </div>

      {/* Threads Feed */}
      <div className="space-y-4">
        {filtered.map((thread) => (
          <div
            key={thread.id}
            className="bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#5B3DF5] rounded-3xl p-6 sm:p-8 space-y-4 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E]">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{thread.avatar}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{thread.author}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#111111] text-[#C8FF3D] border border-[#C8FF3D]/30">
                      {thread.channel}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500">{thread.timeAgo}</span>
                </div>
              </div>

              {thread.hasVerifiedAnswer && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1C2818] text-[#C8FF3D] border border-[#C8FF3D]/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Solution
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-black text-white">{thread.title}</h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {thread.body}
              </p>
            </div>

            <div className="pt-3 border-t border-[#2A2A2E] flex items-center justify-between text-xs text-neutral-400 font-bold">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleUpvote(thread.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-neutral-800 border border-[#2E2E36] text-white transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-[#C8FF3D]" />
                  <span>{thread.upvotes}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{thread.repliesCount} replies</span>
                </div>
              </div>

              <button className="text-[#C8FF3D] hover:underline font-bold">
                Join Discussion →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
            <h3 className="text-lg font-black text-white">Post to Study Cohort</h3>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                  Discussion Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Query regarding CAT DILR Caselet Set 3"
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                  Details / Mathematical Setup
                </label>
                <textarea
                  required
                  rows={4}
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Explain your thought process or where your calculation differed..."
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#111111] text-xs font-bold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile-lime px-6 py-2.5 rounded-xl text-xs font-black"
                >
                  Publish (+20 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
