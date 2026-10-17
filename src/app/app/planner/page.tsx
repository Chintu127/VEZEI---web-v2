"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppProvider";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";

interface StudyTask {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  dueDate: string;
  isCompleted: boolean;
  priority: "high" | "medium" | "low";
}

export default function PlannerPage() {
  const { user, addXp } = useApp();

  const [tasks, setTasks] = useState<StudyTask[]>([
    {
      id: "t-1",
      title: "Quantitative Aptitude: Profit & Loss Marked Price Drill (15 Qs)",
      subject: "Quantitative Aptitude",
      durationMinutes: 30,
      dueDate: "Today",
      isCompleted: true,
      priority: "high",
    },
    {
      id: "t-2",
      title: "Review 3 questions in Mistake Notebook",
      subject: "Revision",
      durationMinutes: 15,
      dueDate: "Today",
      isCompleted: false,
      priority: "high",
    },
    {
      id: "t-3",
      title: "DILR: 2 Practice Sets on Linear Arrangements",
      subject: "DILR",
      durationMinutes: 40,
      dueDate: "Tomorrow",
      isCompleted: false,
      priority: "medium",
    },
    {
      id: "t-4",
      title: "VARC: 3 Reading Comprehension Passages with Socratic Hint Review",
      subject: "VARC",
      durationMinutes: 35,
      dueDate: "Friday",
      isCompleted: false,
      priority: "medium",
    },
    {
      id: "t-5",
      title: "Full-Length Proctored Mock Test #02",
      subject: "Full Mock",
      durationMinutes: 120,
      dueDate: "Sunday",
      isCompleted: false,
      priority: "high",
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.isCompleted;
          if (nextState) {
            addXp(25, `Completed Task: ${t.title}`);
          }
          return { ...t, isCompleted: nextState };
        }
        return t;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: StudyTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      subject: "Custom Study",
      durationMinutes: 30,
      dueDate: "Today",
      isCompleted: false,
      priority: "medium",
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle("");
    setShowAddModal(false);
  };

  const completedCount = tasks.filter((t) => t.isCompleted).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/30 text-[#C8FF3D] text-xs font-black uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            Adaptive Schedule
          </div>
          <h1 className="text-3xl font-black text-white">Dynamic Study Planner</h1>
          <p className="text-xs text-neutral-400">
            A balanced roadmap tailored to your daily availability and target exam deadline.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-tactile-lime px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Task</span>
        </button>
      </div>

      {/* Progress & Countdown Banner */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4FA3]">
            Weekly Sprint Target
          </span>
          <h2 className="text-xl font-black text-white mt-0.5">
            {completedCount} of {tasks.length} Study Goals Completed
          </h2>
          <div className="w-full sm:w-80 h-2 bg-neutral-800 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-[#C8FF3D] to-[#5B3DF5] rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs font-bold text-neutral-400 block">Target Examination</span>
          <span className="text-lg font-black text-[#C8FF3D] block">
            {user?.targetExamName || "CAT 2026"}
          </span>
          <span className="text-xs text-neutral-500">Scheduled for {user?.targetExamDate || "Nov 29, 2026"}</span>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <h3 className="text-base font-black text-white uppercase tracking-wider">
          Weekly Study Checklist
        </h3>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                task.isCompleted
                  ? "bg-[#182115] border-[#C8FF3D]/40 text-neutral-300"
                  : "bg-[#17171C] border-[#2E2E36] hover:border-[#5B3DF5] text-white"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                    task.isCompleted
                      ? "bg-[#C8FF3D] border-[#C8FF3D] text-[#111111]"
                      : "bg-[#111111] border-neutral-600"
                  }`}
                >
                  {task.isCompleted && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                </div>

                <div>
                  <h4
                    className={`font-bold text-sm ${
                      task.isCompleted ? "line-through text-neutral-400" : "text-white"
                    }`}
                  >
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 pt-0.5">
                    <span>{task.subject}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.durationMinutes} Mins
                    </span>
                    <span>•</span>
                    <span className="text-[#C8FF3D] font-bold">Due {task.dueDate}</span>
                  </div>
                </div>
              </div>

              <span
                className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                  task.priority === "high"
                    ? "bg-[#FF4FA3]/15 text-[#FF4FA3] border border-[#FF4FA3]/30"
                    : "bg-neutral-800 text-neutral-400"
                }`}
              >
                {task.priority} priority
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4">
            <h3 className="text-lg font-black text-white">Add Study Milestone</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                  Milestone Title
                </label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Solve 20 geometry circle tangent problems"
                  className="w-full px-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#111111] text-xs font-bold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-tactile-lime px-5 py-2.5 rounded-xl text-xs font-black"
                >
                  Add to Planner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
