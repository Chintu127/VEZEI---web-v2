"use client";

import React, { useState } from "react";
import { FileCheck2, Plus, Clock, Award, ShieldCheck, Check } from "lucide-react";

export default function AdminMockTestsPage() {
  const [mocks, setMocks] = useState([
    {
      id: "mock-1",
      title: "CAT 2026 Full-Length Proctored Mock #01",
      exam: "CAT",
      durationMinutes: 120,
      totalQuestions: 66,
      totalMarks: 198,
      status: "published",
      attempts: 840,
    },
    {
      id: "mock-2",
      title: "CAT 2026 Full-Length Proctored Mock #02",
      exam: "CAT",
      durationMinutes: 120,
      totalQuestions: 66,
      totalMarks: 198,
      status: "published",
      attempts: 520,
    },
    {
      id: "mock-3",
      title: "GATE CS 2026 Comprehensive Simulation #01",
      exam: "GATE CS",
      durationMinutes: 180,
      totalQuestions: 65,
      totalMarks: 100,
      status: "published",
      attempts: 390,
    },
    {
      id: "mock-4",
      title: "GMAT Focus Edition Proctored Drill #01",
      exam: "GMAT",
      durationMinutes: 135,
      totalQuestions: 64,
      totalMarks: 805,
      status: "draft",
      attempts: 0,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newExam, setNewExam] = useState("CAT");
  const [newDuration, setNewDuration] = useState(120);

  const handleCreateMock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newM = {
      id: `mock-${Date.now()}`,
      title: newTitle.trim(),
      exam: newExam,
      durationMinutes: newDuration,
      totalQuestions: 66,
      totalMarks: 198,
      status: "draft",
      attempts: 0,
    };

    setMocks([newM, ...mocks]);
    setShowAddModal(false);
    setNewTitle("");
  };

  const toggleMockStatus = (id: string) => {
    setMocks((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "published" ? "draft" : "published" }
          : m
      )
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#C8FF3D] bg-[#17171C] border border-[#C8FF3D]/30 px-3 py-1 rounded-full">
            Simulation Controller
          </span>
          <h1 className="text-3xl font-black text-white mt-2">Mock Test Manager</h1>
          <p className="text-xs text-neutral-400">
            Configure proctored full-length examinations, sectional countdown timers, and publishing schedules.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-tactile-lime px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Mock</span>
        </button>
      </div>

      {/* Mocks Table */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#2A2A2E] text-neutral-400 font-black uppercase tracking-wider">
              <th className="pb-3 pl-2">Mock Examination Title</th>
              <th className="pb-3">Curriculum</th>
              <th className="pb-3">Duration</th>
              <th className="pb-3">Questions</th>
              <th className="pb-3">Attempts</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F1F24]">
            {mocks.map((mock) => (
              <tr key={mock.id} className="hover:bg-[#1A1A20] transition-colors">
                <td className="py-3.5 pl-2 font-bold text-white text-sm">{mock.title}</td>
                <td className="py-3.5 text-[#C8FF3D] font-black">{mock.exam}</td>
                <td className="py-3.5 text-neutral-300">{mock.durationMinutes} mins</td>
                <td className="py-3.5 text-neutral-300">{mock.totalQuestions} Qs</td>
                <td className="py-3.5 text-neutral-400">{mock.attempts} students</td>
                <td className="py-3.5">
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      mock.status === "published"
                        ? "bg-[#1C2818] text-[#C8FF3D] border border-[#C8FF3D]/30"
                        : "bg-[#29171E] text-[#FF4FA3] border border-[#FF4FA3]/30"
                    }`}
                  >
                    {mock.status}
                  </span>
                </td>
                <td className="py-3.5 text-right pr-2">
                  <button
                    onClick={() => toggleMockStatus(mock.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-neutral-800 text-neutral-300 border border-[#2E2E36] text-[11px] font-bold"
                  >
                    {mock.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Mock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4">
            <h3 className="text-lg font-black text-white">Create Proctored Mock Test</h3>
            <form onSubmit={handleCreateMock} className="space-y-4 text-xs">
              <div>
                <label className="block font-black uppercase tracking-wider text-neutral-400 mb-1">
                  Mock Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. CAT 2026 All-India Proctored Mock #04"
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#2E2E36] text-white"
                />
              </div>

              <div>
                <label className="block font-black uppercase tracking-wider text-neutral-400 mb-1">
                  Target Exam
                </label>
                <select
                  value={newExam}
                  onChange={(e) => setNewExam(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#2E2E36] text-white"
                >
                  <option value="CAT">CAT (Management)</option>
                  <option value="GATE CS">GATE CS (Engineering)</option>
                  <option value="GMAT">GMAT Focus</option>
                  <option value="GRE">GRE General</option>
                </select>
              </div>

              <div>
                <label className="block font-black uppercase tracking-wider text-neutral-400 mb-1">
                  Total Duration (Minutes)
                </label>
                <input
                  type="number"
                  value={newDuration}
                  onChange={(e) => setNewDuration(parseInt(e.target.value, 10))}
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#2E2E36] text-white"
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
                  Save Mock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
