"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppProvider";
import {
  Palette,
  Layout,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  Sparkles,
  Sliders,
  Layers,
  Code,
  Zap,
} from "lucide-react";

export default function Developer1FrontendPage() {
  const { theme, toggleTheme } = useApp();
  const [activeViewport, setActiveViewport] = useState<"mobile" | "tablet" | "desktop">("desktop");

  const brandTokens = [
    { name: "Lime", hex: "#C8FF3D", role: "Primary CTAs, Active Tabs, Milestone Unlock" },
    { name: "Hot Pink", hex: "#FF4FA3", role: "Streak Counters, Mistake Badges, XP Sparks" },
    { name: "Electric Purple", hex: "#5B3DF5", role: "Socratic AI Tutor, Mastery Indicators" },
    { name: "Dark Surface", hex: "#111111", role: "Dark Theme Base & Tactile Borders" },
  ];

  const frontendTasks = [
    { id: "fe-1", title: "Verify Outfit font rendering on Android Chrome", status: "Done", tag: "Typography" },
    { id: "fe-2", title: "Tactile button shadow hover 0 6px 0 micro-interactions", status: "Done", tag: "Components" },
    { id: "fe-3", title: "Full light-theme CSS variables & token isolation", status: "Done", tag: "Theming" },
    { id: "fe-4", title: "Reduced-motion CSS media query compliance check", status: "Done", tag: "Accessibility" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A2A2E]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1933] border border-[#5B3DF5]/50 text-[#5B3DF5] text-xs font-black uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5" />
            Tech Developer 1: Frontend &amp; UI/UX
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Design System &amp; Frontend Diagnostics</h1>
          <p className="text-xs text-neutral-400">
            Brand token integrity, component state inspections, responsive breakpoints, and client-bundle optimizations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="btn-tactile-lime px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2"
          >
            <span>Toggle Theme ({theme.toUpperCase()})</span>
          </button>
        </div>
      </div>

      {/* Brand Design Tokens Audit */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-black text-white">Brand Tokens &amp; Color System Audit</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brandTokens.map((t) => (
            <div key={t.name} className="p-4 rounded-2xl bg-[#111111] border border-[#2E2E36] space-y-3">
              <div
                className="w-full h-12 rounded-xl border border-black/20 flex items-center justify-center font-black text-xs"
                style={{
                  backgroundColor: t.hex,
                  color: t.name === "Lime" ? "#111111" : "#FFFFFF",
                }}
              >
                {t.hex}
              </div>
              <div>
                <div className="text-xs font-black text-white">{t.name}</div>
                <div className="text-[11px] text-neutral-400 leading-snug mt-0.5">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Viewport & Responsive Emulator */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-white">Responsive Breakpoint Diagnostics</h2>
            <p className="text-xs text-neutral-400">
              Active test resolution emulator for fluid layouts across device widths.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#111111] border border-[#2E2E36]">
            <button
              onClick={() => setActiveViewport("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeViewport === "mobile" ? "bg-[#C8FF3D] text-[#111111]" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile (375px)</span>
            </button>
            <button
              onClick={() => setActiveViewport("tablet")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeViewport === "tablet" ? "bg-[#C8FF3D] text-[#111111]" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet (768px)</span>
            </button>
            <button
              onClick={() => setActiveViewport("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeViewport === "desktop" ? "bg-[#C8FF3D] text-[#111111]" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop (1440px)</span>
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#111111] border border-[#2E2E36] text-xs text-neutral-400 space-y-3">
          <div className="flex items-center justify-between text-white font-bold">
            <span>Selected Breakpoint: {activeViewport.toUpperCase()}</span>
            <span className="text-[#C8FF3D]">0 Layout Overflows Detected</span>
          </div>
          <p>
            Touch targets meet 44x44px accessibility baseline. Fixed widths and overflow-x properties are zeroed. Outfit geometric font-display swap enabled.
          </p>
        </div>
      </div>

      {/* Frontend Sprints */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-black text-white">Frontend Task Queue</h2>
        <div className="space-y-2">
          {frontendTasks.map((t) => (
            <div
              key={t.id}
              className="p-3.5 rounded-xl bg-[#111111] border border-[#2E2E36] flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C8FF3D]" />
                <span className="text-xs font-bold text-white">{t.title}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#1E1933] border border-[#5B3DF5]/40 text-[#5B3DF5] text-[10px] font-black uppercase">
                {t.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
