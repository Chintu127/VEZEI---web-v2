import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Scale, CheckCircle2, AlertOctagon, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#FF4FA3] bg-[#1C1C1E] border border-[#FF4FA3]/30 px-3 py-1 rounded-full">
              Legal &amp; Policy
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="text-neutral-400 text-sm">
              Effective Date: October 2026 • VEZEI EdTech Technologies Inc.
            </p>
          </div>

          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 sm:p-12 space-y-8 text-neutral-300 text-sm leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#C8FF3D]" />
                1. Acceptance of Terms
              </h2>
              <p>
                By registering for an account or using VEZEI ("the Platform"), you agree to these Terms of Service. If you are preparing under institutional cohort agreements, additional institutional guidelines may apply.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-[#FF4FA3]" />
                2. Academic Integrity &amp; Anti-Cheating
              </h2>
              <p>
                VEZEI's gamification system and leaderboards are designed to reward genuine cognitive effort. Any automated scraping, script-based question submission, or fraudulent leaderboard manipulation will result in immediate disqualification and permanent account termination.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#5B3DF5]" />
                3. Subscriptions &amp; Refund Policy
              </h2>
              <p>
                Vezei Pro subscriptions are billed on a monthly or annual basis as selected during checkout. All new Pro subscriptions are backed by a 7-day 100% money-back guarantee. If you are not satisfied, you may cancel directly from account settings within 7 days for a complete refund.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C8FF3D]" />
                4. Intellectual Property
              </h2>
              <p>
                The VEZEI name, logo, proprietary UI design tokens, gamification engines, Socratic AI hint architectures, and verified solution rationales are the exclusive intellectual property of VEZEI EdTech Technologies Inc. Official exam syllabus guidelines and names remain the property of their respective official conducting bodies.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
