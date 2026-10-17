import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileText, Download, Calendar, BookOpen, ArrowRight, Sparkles } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    {
      category: "Formula Sheets & Quick Notes",
      items: [
        { title: "CAT 2026 Quantitative Aptitude Master Formula Sheet", type: "PDF Guide", size: "2.4 MB", reads: "12,400+ views" },
        { title: "GATE CS Algorithms & Recurrences Complexity Table", type: "Reference Sheet", size: "1.1 MB", reads: "8,900+ views" },
        { title: "GMAT Data Insights Multi-Source Reasoning Checklist", type: "Strategy Sheet", size: "950 KB", reads: "6,200+ views" },
        { title: "Digital SAT Math Algebra & Trigonometry Cheat Sheet", type: "Cheat Sheet", size: "1.8 MB", reads: "9,100+ views" },
      ],
    },
    {
      category: "Official Blueprints & Syllabus Mappings",
      items: [
        { title: "IIM CAT Sectional Weightage & Past 5-Year Trends", type: "Syllabus Analysis", size: "3.2 MB", reads: "15,800+ views" },
        { title: "IIT GATE CS Official Syllabus & Subtopic Breakdown", type: "Official Mapping", size: "1.9 MB", reads: "11,200+ views" },
        { title: "GRE General Test Analytical Writing Rubric & Guidelines", type: "Scoring Guide", size: "1.4 MB", reads: "5,400+ views" },
      ],
    },
    {
      category: "Test Strategy & Time-Loss Guides",
      items: [
        { title: "The 3-Round Strategy for Speed Exams (CAT/GATE/GMAT)", type: "Strategy Article", size: "Read Online", reads: "18,600+ views" },
        { title: "How to Build a 30-Day Mistake Notebook That Guarantees Retention", type: "Methodology", size: "Read Online", reads: "14,300+ views" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-12 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#C8FF3D] bg-[#1C1C1E] border border-[#C8FF3D]/30 px-3 py-1 rounded-full">
              Free Learning Library
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              Curated Examination Resources
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg">
              High-yield formula cheat sheets, official sectional blueprints, and time management guides compiled by top percentile rankers.
            </p>
          </div>

          {/* Resources Groups */}
          <div className="space-y-12 max-w-5xl">
            {resources.map((group, gIdx) => (
              <div key={gIdx} className="space-y-4">
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#C8FF3D]" />
                  <span>{group.category}</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.items.map((res, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-5 rounded-2xl bg-[#17171C] border-2 border-[#2E2E36] hover:border-[#C8FF3D] transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-1 pr-4">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#111111] text-[#FF4FA3]">
                          {res.type}
                        </span>
                        <h3 className="font-bold text-sm text-white group-hover:text-[#C8FF3D] transition-colors">
                          {res.title}
                        </h3>
                        <p className="text-[11px] text-neutral-400">
                          {res.size} • {res.reads}
                        </p>
                      </div>

                      <Link
                        href="/app/practice"
                        className="p-3 rounded-xl bg-[#25252A] group-hover:bg-[#C8FF3D] group-hover:text-black text-white transition-all shadow-[2px_2px_0px_#111111] flex-shrink-0"
                        title="Practice with this resource"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
