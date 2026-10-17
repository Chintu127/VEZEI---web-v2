"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  FileQuestion,
  FileCheck2,
  Activity,
  ShieldCheck,
  Plus,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

export default function AdminOverviewPage() {
  const stats = [
    { label: "Total Registered Students", value: "14,280", change: "+12% this week", color: "#C8FF3D" },
    { label: "Verified Question Bank", value: "42,560", change: "98.4% verified keys", color: "#5B3DF5" },
    { label: "Active Practice Drills Today", value: "1,842", change: "Peak at 8:30 PM", color: "#FF4FA3" },
    { label: "Proctored Mocks Submitted", value: "890", change: "100% server scored", color: "#C8FF3D" },
  ];

  const auditEvents = [
    { action: "QUESTION_VERIFIED", target: "CAT QA Profit & Loss (q-cat-qa-01)", admin: "Dr. Sharma", time: "12m ago" },
    { action: "SYLLABUS_UPDATE", target: "GATE CS Algorithm Topics", admin: "Prof. Verma", time: "45m ago" },
    { action: "ROLE_PROMOTION", target: "revanth@vezei.com to student_pro", admin: "System (Webhook)", time: "1h ago" },
    { action: "MOCK_TEST_PUBLISHED", target: "CAT Full Proctored Mock #03", admin: "Editorial Admin", time: "3h ago" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#C8FF3D] bg-[#17171C] border border-[#C8FF3D]/30 px-3 py-1 rounded-full">
            Role: Administrator
          </span>
          <h1 className="text-3xl font-black text-white mt-2">Platform Administration</h1>
          <p className="text-xs text-neutral-400">
            Real-time platform metrics, content verification status, and security audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/questions"
            className="btn-tactile-lime px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </Link>
          <Link
            href="/admin/mock-tests"
            className="px-4 py-2.5 rounded-xl bg-[#17171C] hover:bg-[#202026] text-white border border-[#2E2E36] text-xs font-bold"
          >
            Create Mock
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-[#17171C] border-2 border-[#2E2E36] space-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          >
            <span className="text-xs font-bold text-neutral-400 block">{s.label}</span>
            <span className="text-3xl font-black text-white block">{s.value}</span>
            <span className="text-[11px] font-bold" style={{ color: s.color }}>
              {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* Main 2-column breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Content Quality & Verification Health */}
        <div className="lg:col-span-7 bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E]">
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C8FF3D]" />
              Curriculum &amp; Question Health
            </h2>
            <span className="text-xs text-[#C8FF3D] font-bold">42,560 Items Total</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1.5">
                <span className="text-neutral-300">Published &amp; Answer-Key Verified</span>
                <span className="text-[#C8FF3D]">94.2%</span>
              </div>
              <div className="w-full h-2.5 bg-[#111111] rounded-full overflow-hidden">
                <div className="h-full bg-[#C8FF3D] rounded-full" style={{ width: "94.2%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1.5">
                <span className="text-neutral-300">Draft / Peer-Review In Progress</span>
                <span className="text-[#5B3DF5]">4.6%</span>
              </div>
              <div className="w-full h-2.5 bg-[#111111] rounded-full overflow-hidden">
                <div className="h-full bg-[#5B3DF5] rounded-full" style={{ width: "4.6%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1.5">
                <span className="text-neutral-300">Flagged For Content Editorial Review</span>
                <span className="text-[#FF4FA3]">1.2%</span>
              </div>
              <div className="w-full h-2.5 bg-[#111111] rounded-full overflow-hidden">
                <div className="h-full bg-[#FF4FA3] rounded-full" style={{ width: "1.2%" }} />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#2A2A2E]">
            <span className="text-xs text-neutral-400">Manage questions and assign review status</span>
            <Link href="/admin/questions" className="text-xs font-bold text-[#C8FF3D] hover:underline">
              Open Question Manager →
            </Link>
          </div>
        </div>

        {/* Right: Security & Admin Audit Logs */}
        <div className="lg:col-span-5 bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2E]">
            <h2 className="text-base font-black text-white">Recent Audit Logs</h2>
            <Link href="/admin/audit-logs" className="text-xs text-neutral-400 hover:text-white">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {auditEvents.map((ev, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#111111] border border-[#2E2E36] text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black uppercase text-[#FF4FA3]">
                    {ev.action}
                  </span>
                  <span className="text-[10px] text-neutral-500">{ev.time}</span>
                </div>
                <p className="text-white font-bold truncate">{ev.target}</p>
                <span className="text-[10px] text-neutral-400">By {ev.admin}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
