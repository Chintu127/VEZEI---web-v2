import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="py-24 bg-[#141418] relative overflow-hidden border-t border-[#2A2A2E]">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#C8FF3D]/15 via-[#FF4FA3]/15 to-[#5B3DF5]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="bg-[#1C1C24] border-3 border-[#C8FF3D] rounded-3xl p-8 sm:p-14 shadow-[0_20px_50px_rgba(200,255,61,0.15)] space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#C8FF3D]/40 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-[#C8FF3D]" />
            Your Next Level Awaits
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Start Your Journey. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8FF3D] to-[#FF4FA3]">
              Own Your Examination.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Create your free student account in 30 seconds. Choose your target exam, complete your baseline diagnostic, and earn your first study streak today.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="btn-tactile-lime w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black flex items-center justify-center gap-2"
            >
              <span>Start your journey free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/exams"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold text-white bg-[#111111] hover:bg-neutral-900 border-2 border-[#2E2E36] transition-all"
            >
              Browse All Supported Exams
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C8FF3D]" />
              No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#FF4FA3]" />
              100% Free Baseline Syllabi
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
