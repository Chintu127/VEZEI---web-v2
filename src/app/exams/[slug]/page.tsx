import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EXAMS } from "@/data/exams";
import {
  Clock,
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

interface ExamDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ExamDetailPage({ params }: ExamDetailPageProps) {
  const { slug } = await params;
  const exam = EXAMS.find((e) => e.slug === slug);

  if (!exam) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#111111] text-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8 font-semibold">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/exams" className="hover:text-white">Exams</Link>
            <span>/</span>
            <span className="text-[#C8FF3D]">{exam.name}</span>
          </nav>

          {/* Hero Banner for this Exam */}
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 sm:p-12 mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#FF4FA3] bg-[#111111] border border-[#FF4FA3]/30 px-3 py-1 rounded-full">
                    {exam.category}
                  </span>
                  <span className="text-xs font-bold text-neutral-400 bg-[#111111] border border-[#2A2A2E] px-3 py-1 rounded-full">
                    {exam.region}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  {exam.name}
                </h1>
                <p className="text-lg font-bold text-[#C8FF3D]">{exam.fullName}</p>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {exam.overview}
                </p>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href={`/app/practice?exam=${exam.slug}`}
                    className="btn-tactile-lime px-6 py-3.5 rounded-2xl text-sm font-black flex items-center gap-2"
                  >
                    <span>Start {exam.name} Practice Drill</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/app/mock-tests`}
                    className="px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-[#1C1C20] hover:bg-[#25252A] border-2 border-[#2E2E36] flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-[#C8FF3D]" />
                    <span>View Proctored Mocks</span>
                  </Link>
                </div>
              </div>

              {/* Key Exam Metadata Box */}
              <div className="lg:col-span-4 bg-[#111111] border-2 border-[#2E2E36] rounded-2xl p-6 space-y-4 text-xs">
                <h2 className="text-sm font-black text-white uppercase tracking-wider border-b border-[#2A2A2E] pb-2">
                  Exam Parameters
                </h2>

                <div className="flex justify-between py-1 border-b border-[#1C1C22]">
                  <span className="text-neutral-400 font-medium">Test Duration:</span>
                  <span className="text-white font-bold">{exam.durationMinutes} Minutes</span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#1C1C22]">
                  <span className="text-neutral-400 font-medium">Total Questions:</span>
                  <span className="text-white font-bold">{exam.totalQuestions} Questions</span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#1C1C22]">
                  <span className="text-neutral-400 font-medium">Target Role / Colleges:</span>
                  <span className="text-[#C8FF3D] font-bold text-right max-w-[180px]">{exam.targetRole}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#1C1C22]">
                  <span className="text-neutral-400 font-medium">Marking Scheme:</span>
                  <span className="text-white font-bold text-right max-w-[180px]">{exam.markingScheme}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-neutral-400 font-medium">Eligibility:</span>
                  <span className="text-neutral-300 font-medium text-right max-w-[180px]">{exam.eligibility}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sectional Blueprint Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Left: Sections & Time Allocation */}
            <div className="lg:col-span-6 bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Clock className="w-6 h-6 text-[#C8FF3D]" />
                Sectional Structure &amp; Durations
              </h2>

              <div className="space-y-3">
                {exam.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-black text-white">{sec.name}</h4>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {sec.questions} Questions • {sec.durationMinutes} Minutes
                      </p>
                    </div>
                    {sec.weightage && (
                      <span className="text-xs font-bold px-3 py-1 rounded-xl bg-[#111111] text-[#C8FF3D] border border-[#2A2A2E]">
                        {sec.weightage}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Syllabus Coverage Topics */}
            <div className="lg:col-span-6 bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 space-y-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#FF4FA3]" />
                Verified Syllabus Topics
              </h2>

              <div className="space-y-4">
                {exam.syllabus.map((sub, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#1F1F24] border border-[#2E2E36] space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-black text-[#FF4FA3]">{sub.subject}</h4>
                      <span className="text-xs text-neutral-400">{sub.topics.length} Key Subtopics</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                      {sub.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C8FF3D] flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Highlights & AI Prep Strategy */}
          <div className="bg-[#1C1C24] border-2 border-[#5B3DF5]/50 rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-[#5B3DF5]" />
              How VEZEI Prepares You For {exam.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300">
              {exam.highlights.map((hl, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#141418] border border-[#2A2A2E] space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#5B3DF5] flex items-center justify-center text-white font-black">
                    {i + 1}
                  </div>
                  <p className="font-semibold text-white leading-relaxed">{hl}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#2A2A2E]">
              <span className="text-xs text-neutral-400">
                Ready to conquer the syllabus? All practice sessions award server-verified XP and streaks.
              </span>
              <Link
                href={`/app/practice?exam=${exam.slug}`}
                className="btn-tactile-lime px-5 py-2.5 rounded-xl text-xs font-black"
              >
                Launch {exam.name} Practice
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
