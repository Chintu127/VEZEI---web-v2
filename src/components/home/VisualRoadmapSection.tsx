"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
  FileCheck2,
  Award,
  Zap,
} from "lucide-react";

interface RoadmapNode {
  id: number;
  stage: string;
  title: string;
  description: string;
  duration: string;
  prerequisites: string;
  status: "completed" | "in-progress" | "available" | "locked";
  iconName: "start" | "prereq" | "core" | "practice" | "mock" | "revision" | "victory";
  skills: string[];
}

export function VisualRoadmapSection() {
  const [selectedExam, setSelectedExam] = useState<"cat" | "gate" | "gmat">("cat");
  const [activeNode, setActiveNode] = useState<number>(2);

  const roadmapStages: RoadmapNode[] = [
    {
      id: 1,
      stage: "Stage 01",
      title: "Diagnostic Baseline",
      description: "Adaptive initial diagnostic test to map strengths, calculation speed, and foundational gaps.",
      duration: "45 mins",
      prerequisites: "None",
      status: "completed",
      iconName: "start",
      skills: ["Percentile Assessment", "Speed Benchmark", "Weak Area Heatmap"],
    },
    {
      id: 2,
      stage: "Stage 02",
      title: "Foundations & Prerequisite Topics",
      description: "Master arithmetic fundamentals, basic algebraic identities, and critical reasoning premise breakdown.",
      duration: "2 Weeks",
      prerequisites: "Diagnostic Baseline completed",
      status: "in-progress",
      iconName: "prereq",
      skills: ["Vedic Mental Math", "Syllogism Logic", "Sentence Correction Rules"],
    },
    {
      id: 3,
      stage: "Stage 03",
      title: "Core Subject Mastery",
      description: "Deep concept modules in Quantitative Aptitude, Data Interpretation, and Advanced Reading Comprehension.",
      duration: "4 Weeks",
      prerequisites: "Foundations Mastery (>= 75% accuracy)",
      status: "available",
      iconName: "core",
      skills: ["Permutations & Combinations", "Arrangement Matrix", "Tone & Inference"],
    },
    {
      id: 4,
      stage: "Stage 04",
      title: "Targeted Sectional Practice",
      description: "Timed question drills with server-authoritative scoring (+3 / -1) and tiered Socratic AI hints.",
      duration: "3 Weeks",
      prerequisites: "Core Subject Lessons completed",
      status: "available",
      iconName: "practice",
      skills: ["Timed Decision Making", "Option Elimination", "Error Categorization"],
    },
    {
      id: 5,
      stage: "Stage 05",
      title: "Full-Length Proctored Mocks",
      description: "Strict 120-minute simulations replicating official user interfaces, sectional timers, and calculator constraints.",
      duration: "10 Mocks",
      prerequisites: "Sectional drills accuracy >= 70%",
      status: "locked",
      iconName: "mock",
      skills: ["Stamina & Endurance", "Strategy Calibration", "All-India Ranking"],
    },
    {
      id: 6,
      stage: "Stage 06",
      title: "Mistake Notebook Revision",
      description: "Targeted flashcard drills generated strictly from past incorrect answers and calculation slips.",
      duration: "Daily 30m",
      prerequisites: "At least 1 Full Mock attempted",
      status: "locked",
      iconName: "revision",
      skills: ["Traps Identification", "Formula Recall", "Confidence Consolidation"],
    },
    {
      id: 7,
      stage: "Stage 07",
      title: "Exam Day Victory",
      description: "Final sprint revision notes, mental readiness protocols, and exam strategy execution.",
      duration: "Final 7 Days",
      prerequisites: "All milestones achieved",
      status: "locked",
      iconName: "victory",
      skills: ["Target Percentile", "Call Letters", "Selection Victory"],
    },
  ];

  const currentNode = roadmapStages.find((n) => n.id === activeNode) || roadmapStages[1];

  return (
    <section id="roadmaps" className="py-24 bg-[#0E0E11] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#5B3DF5]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1F16] border border-[#C8FF3D]/40 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Visual Learning Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Your Structured Path from Day 1 to Exam Victory
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm">
            Every competitive exam broken into 7 sequential milestone nodes. Track prerequisites, estimated durations, and adaptive unlock criteria.
          </p>

          {/* Exam Switcher */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-[#17171C] border border-[#2E2E36] mt-2">
            <button
              onClick={() => setSelectedExam("cat")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedExam === "cat" ? "bg-[#C8FF3D] text-[#111111]" : "text-neutral-400 hover:text-white"
              }`}
            >
              CAT (IIMs)
            </button>
            <button
              onClick={() => setSelectedExam("gate")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedExam === "gate" ? "bg-[#C8FF3D] text-[#111111]" : "text-neutral-400 hover:text-white"
              }`}
            >
              GATE CS
            </button>
            <button
              onClick={() => setSelectedExam("gmat")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedExam === "gmat" ? "bg-[#C8FF3D] text-[#111111]" : "text-neutral-400 hover:text-white"
              }`}
            >
              GMAT Focus
            </button>
          </div>
        </div>

        {/* Visual Roadmap Interactive Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Node Selector Column */}
          <div className="lg:col-span-7 space-y-3">
            {roadmapStages.map((node) => {
              const isSelected = activeNode === node.id;
              const isCompleted = node.status === "completed";
              const isInProgress = node.status === "in-progress";
              const isLocked = node.status === "locked";

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-[#1C1F16] border-[#C8FF3D] shadow-[4px_4px_0px_#111111]"
                      : "bg-[#17171C] border-[#2E2E36] hover:border-neutral-600"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 border ${
                        isCompleted
                          ? "bg-[#C8FF3D] text-[#111111] border-[#C8FF3D]"
                          : isInProgress
                          ? "bg-[#5B3DF5] text-white border-[#5B3DF5]"
                          : isLocked
                          ? "bg-[#111111] text-neutral-500 border-[#2E2E36]"
                          : "bg-[#29171E] text-[#FF4FA3] border-[#FF4FA3]"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isLocked ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        node.id
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">
                          {node.stage}
                        </span>
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isCompleted
                              ? "bg-[#C8FF3D]/20 text-[#C8FF3D]"
                              : isInProgress
                              ? "bg-[#5B3DF5]/20 text-[#5B3DF5]"
                              : isLocked
                              ? "bg-neutral-800 text-neutral-400"
                              : "bg-[#FF4FA3]/20 text-[#FF4FA3]"
                          }`}
                        >
                          {node.status.replace("-", " ")}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-0.5">{node.title}</h3>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-mono text-neutral-400">{node.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Node Detail Card */}
          <div className="lg:col-span-5 sticky top-28 bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#C8FF3D] uppercase tracking-wider">
                  {currentNode.stage} Milestone Details
                </span>
                <span className="text-xs font-mono text-neutral-400">Duration: {currentNode.duration}</span>
              </div>
              <h3 className="text-2xl font-black text-white">{currentNode.title}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {currentNode.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#111111] border border-[#2E2E36] space-y-1.5 text-xs">
              <div className="text-[11px] font-black uppercase tracking-wider text-neutral-500">
                Unlock Requirement
              </div>
              <div className="text-white font-bold">{currentNode.prerequisites}</div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-black text-neutral-400 uppercase tracking-wider">
                Key Skills Developed
              </div>
              <div className="flex flex-wrap gap-2">
                {currentNode.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl bg-[#111111] border border-[#2E2E36] text-xs font-bold text-neutral-200"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#2E2E36]">
              <Link
                href="/signup"
                className="btn-tactile-lime w-full py-4 rounded-xl text-xs font-black flex items-center justify-center gap-2"
              >
                <span>Enroll in This Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
