import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Sparkles, Shield, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#0E0E10] border-t border-[#2A2A2E] pt-16 pb-12 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="navbar" size="md" />
            <p className="text-sm text-neutral-300 max-w-sm leading-relaxed mt-4">
              <strong className="text-white">One App. Every Exam. Your Path to Success.</strong>
              <br />
              VEZEI combines high-stakes competitive examination curricula, AI-powered diagnostic explanations, adaptive practice, and motivating game-inspired learning loops.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/30 text-[#C8FF3D] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen EdTech</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#5B3DF5]/40 text-[#5B3DF5] text-xs font-bold">
                <Shield className="w-3.5 h-3.5" />
                <span>Verified Questions</span>
              </div>
            </div>
          </div>

          {/* Exam Curricula */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Exam Catalog
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/exams/cat" className="hover:text-[#C8FF3D] transition-colors flex items-center justify-between">
                  <span>CAT 2026</span>
                  <span className="text-[10px] font-black uppercase text-[#C8FF3D] bg-[#1C2818] px-1.5 py-0.5 rounded">Live</span>
                </Link>
              </li>
              <li>
                <Link href="/exams#xat" className="hover:text-[#C8FF3D] transition-colors">
                  XAT (Wave 1)
                </Link>
              </li>
              <li>
                <Link href="/exams#snap" className="hover:text-[#C8FF3D] transition-colors">
                  SNAP & NMAT
                </Link>
              </li>
              <li>
                <Link href="/exams#gmat" className="hover:text-[#C8FF3D] transition-colors">
                  GMAT Focus (Wave 2)
                </Link>
              </li>
              <li>
                <Link href="/exams#gre" className="hover:text-[#C8FF3D] transition-colors">
                  GRE General (Wave 2)
                </Link>
              </li>
              <li>
                <Link href="/exams#sat" className="hover:text-[#C8FF3D] transition-colors">
                  Digital SAT (Wave 3)
                </Link>
              </li>
              <li>
                <Link href="/exams#gate" className="hover:text-[#C8FF3D] transition-colors">
                  GATE CS (Wave 4)
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Platform */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/features" className="hover:text-[#C8FF3D] transition-colors">
                  AI Doubt Solving
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#C8FF3D] transition-colors">
                  How VEZEI Works
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#C8FF3D] transition-colors">
                  Visual Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-[#C8FF3D] transition-colors">
                  League Leaderboards
                </Link>
              </li>
              <li>
                <Link href="/app/practice" className="hover:text-[#C8FF3D] transition-colors">
                  Adaptive Practice
                </Link>
              </li>
              <li>
                <Link href="/app/mock-tests" className="hover:text-[#C8FF3D] transition-colors">
                  Proctored Mock Tests
                </Link>
              </li>
              <li>
                <Link href="/app/mistakes" className="hover:text-[#C8FF3D] transition-colors">
                  Mistake Notebook
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Trust */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Resources & Trust
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#C8FF3D] transition-colors">
                  About VEZEI
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#C8FF3D] transition-colors">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#C8FF3D] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C8FF3D] transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#C8FF3D] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C8FF3D] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1F1F24] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} VEZEI EdTech Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-1 text-neutral-500">
            <span>Engineered with passion for high-achieving students</span>
            <Heart className="w-3.5 h-3.5 text-[#FF4FA3] fill-[#FF4FA3]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
