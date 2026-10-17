"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { useApp } from "@/context/AppProvider";
import { Sparkles, Trophy, X } from "lucide-react";

export function CelebrationModal() {
  const { celebration, dismissCelebration } = useApp();

  useEffect(() => {
    if (celebration?.show) {
      // Fire confetti burst with exact brand colors: Lime #C8FF3D, Hot Pink #FF4FA3, Electric Purple #5B3DF5
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C8FF3D", "#FF4FA3", "#5B3DF5", "#FFFFFF"],
      });

      const timer = setTimeout(() => {
        dismissCelebration();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [celebration, dismissCelebration]);

  if (!celebration?.show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div className="pointer-events-auto bg-[#171717] border-2 border-[#C8FF3D] rounded-2xl p-6 max-w-sm w-full shadow-[0_10px_35px_rgba(200,255,61,0.25)] text-center animate-in fade-in zoom-in duration-200 relative">
        <button
          onClick={dismissCelebration}
          className="absolute top-3 right-3 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-[#C8FF3D] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] mx-auto flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-[#111111]" />
        </div>

        <h3 className="text-xl font-black text-white mb-1 flex items-center justify-center gap-1.5">
          <span>{celebration.title}</span>
          <Sparkles className="w-5 h-5 text-[#FF4FA3]" />
        </h3>

        <p className="text-sm text-neutral-300 mb-4">{celebration.subtitle}</p>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#C8FF3D]/40 text-[#C8FF3D] font-bold text-sm">
          <span>+{celebration.xp} XP Added to Ledger</span>
        </div>
      </div>
    </div>
  );
}
