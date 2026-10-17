import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#C8FF3D] bg-[#1C1C1E] border border-[#C8FF3D]/30 px-3 py-1 rounded-full">
              Legal &amp; Privacy
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-neutral-400 text-sm">
              Last Updated: October 2026 • VEZEI EdTech Technologies Inc.
            </p>
          </div>

          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 sm:p-12 space-y-8 text-neutral-300 text-sm leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#C8FF3D]" />
                1. Our Commitment to Student Privacy
              </h2>
              <p>
                At VEZEI, we hold a simple principle: your study data belongs to you. We do not sell your personal information, test scores, or AI doubt conversations to third-party advertisers or recruitment agencies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#FF4FA3]" />
                2. Information We Collect
              </h2>
              <p>We collect only information essential to providing a personalized, gamified EdTech experience:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-400">
                <li>Account profile credentials (name, email address, avatar).</li>
                <li>Exam preparation preferences (target examination, target date, daily study goal).</li>
                <li>Learning analytics (practice question responses, test scores, mistake notebook records).</li>
                <li>Gamification events (XP ledger records, streak history, unlocked achievements).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#5B3DF5]" />
                3. AI Tutor Data Safeguards
              </h2>
              <p>
                When you interact with the VEZEI Socratic AI Tutor, questions are processed via secure server-side API boundaries. Your queries are never used to train public foundation models without explicit consent.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C8FF3D]" />
                4. Data Ownership &amp; Right to Deletion
              </h2>
              <p>
                You retain full ownership of your data. You may request a complete export of your test attempts and mistake notebook or permanently delete your account at any time through your Account Settings.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
