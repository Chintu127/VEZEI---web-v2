"use client";

import React, { useState } from "react";
import { EXAMS, Exam } from "@/data/exams";
import { Compass, Plus, Edit2, ShieldCheck, Clock, BookOpen, Check } from "lucide-react";

export default function AdminExamsPage() {
  const [exams, setExams] = useState<Exam[]>(EXAMS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExamName, setNewExamName] = useState("");
  const [newExamCategory, setNewExamCategory] = useState("Management");
  const [newExamDuration, setNewExamDuration] = useState(120);

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamName.trim()) return;

    const newEx: Exam = {
      id: newExamName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      slug: newExamName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name: newExamName.trim(),
      fullName: `${newExamName.trim()} Entrance Examination`,
      category: newExamCategory as any,
      region: "India / Global",
      status: "draft",
      shortDescription: `Official entrance test curriculum for ${newExamName}.`,
      overview: `Detailed syllabus coverage and adaptive practice tests for ${newExamName}.`,
      annualAspirants: "50,000+ Aspirants",
      durationMinutes: newExamDuration,
      totalQuestions: 60,
      markingScheme: "+3 for correct, -1 for incorrect",
      eligibility: "Bachelor's degree or equivalent",
      targetRole: "University Admissions",
      keyDateLabel: "Exam Date",
      keyDateValue: "Annual",
      sections: [{ name: "Core Section 1", questions: 30, durationMinutes: 60, weightage: "50%" }],
      syllabus: [{ subject: "Subject 1", topicCount: 5, topics: ["Topic 1", "Topic 2"] }],
      highlights: ["Adaptive practice bank", "Verified solutions"],
    };

    setExams([newEx, ...exams]);
    setShowAddModal(false);
    setNewExamName("");
  };

  const toggleStatus = (id: string) => {
    setExams((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "published" ? "draft" : "published" }
          : e
      )
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#C8FF3D] bg-[#17171C] border border-[#C8FF3D]/30 px-3 py-1 rounded-full">
            Curriculum Administration
          </span>
          <h1 className="text-3xl font-black text-white mt-2">Exam &amp; Syllabus Manager</h1>
          <p className="text-xs text-neutral-400">
            Configure examination metadata, sectional timers, marking penalties, and publish statuses.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-tactile-lime px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Examination</span>
        </button>
      </div>

      {/* Exam Table Container */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#2A2A2E] text-neutral-400 font-black uppercase tracking-wider">
                <th className="pb-3 pl-2">Exam</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Duration</th>
                <th className="pb-3">Questions</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F24]">
              {exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-[#1A1A20] transition-colors">
                  <td className="py-3.5 pl-2 font-bold text-white">
                    <span className="block text-sm">{exam.name}</span>
                    <span className="text-[10px] text-neutral-400">{exam.fullName}</span>
                  </td>
                  <td className="py-3.5 text-neutral-300 font-semibold">{exam.category}</td>
                  <td className="py-3.5 text-neutral-300">{exam.durationMinutes} mins</td>
                  <td className="py-3.5 text-neutral-300">{exam.totalQuestions} Qs</td>
                  <td className="py-3.5">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        exam.status === "published"
                          ? "bg-[#1C2818] text-[#C8FF3D] border border-[#C8FF3D]/30"
                          : "bg-[#29171E] text-[#FF4FA3] border border-[#FF4FA3]/30"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <button
                      onClick={() => toggleStatus(exam.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-neutral-800 text-neutral-300 border border-[#2E2E36] text-[11px] font-bold"
                    >
                      {exam.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4">
            <h3 className="text-lg font-black text-white">Register Examination Blueprint</h3>
            <form onSubmit={handleAddExam} className="space-y-4 text-xs">
              <div>
                <label className="block font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                  Exam Acronym / Name
                </label>
                <input
                  type="text"
                  required
                  value={newExamName}
                  onChange={(e) => setNewExamName(e.target.value)}
                  placeholder="e.g. UPSC CSE or CLAT"
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                  Category
                </label>
                <select
                  value={newExamCategory}
                  onChange={(e) => setNewExamCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#2E2E36] text-white text-sm"
                >
                  <option value="Management">Management</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Graduate Admissions">Graduate Admissions</option>
                  <option value="Undergraduate Admissions">Undergraduate Admissions</option>
                  <option value="Medical & Healthcare">Medical &amp; Healthcare</option>
                  <option value="Law">Law</option>
                </select>
              </div>

              <div>
                <label className="block font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  value={newExamDuration}
                  onChange={(e) => setNewExamDuration(parseInt(e.target.value, 10))}
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#2E2E36] text-white text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#111111] font-bold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile-lime px-5 py-2.5 rounded-xl font-black"
                >
                  Save to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
