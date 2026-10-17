"use client";

import React from "react";
import { ScrollText, ShieldCheck, Clock } from "lucide-react";

export default function AdminAuditLogsPage() {
  const logs = [
    {
      id: "log-1",
      timestamp: "2026-10-17 17:42:15 UTC",
      admin: "admin@vezei.com",
      action: "QUESTION_KEY_VERIFIED",
      target: "Question: q-cat-qa-01 (Verified Option C)",
      ip: "157.48.21.90",
      status: "SUCCESS",
    },
    {
      id: "log-2",
      timestamp: "2026-10-17 16:15:02 UTC",
      admin: "editorial@vezei.com",
      action: "MOCK_PUBLISHED",
      target: "Mock Test: CAT Full Proctored Mock #02",
      ip: "103.21.144.12",
      status: "SUCCESS",
    },
    {
      id: "log-3",
      timestamp: "2026-10-17 14:08:44 UTC",
      admin: "system_auth",
      action: "RLS_POLICY_VERIFICATION",
      target: "Table: profiles & xp_events (All RLS Policies Active)",
      ip: "internal",
      status: "VERIFIED",
    },
    {
      id: "log-4",
      timestamp: "2026-10-17 11:30:19 UTC",
      admin: "moderator@vezei.com",
      action: "COMMUNITY_POST_RESOLVED",
      target: "Thread #th-2 marked with verified answer badge",
      ip: "182.72.45.101",
      status: "SUCCESS",
    },
    {
      id: "log-5",
      timestamp: "2026-10-17 09:12:00 UTC",
      admin: "admin@vezei.com",
      action: "EXAM_BLUEPRINT_CREATED",
      target: "Exam: CLAT-PG (National Law Universities)",
      ip: "157.48.21.90",
      status: "SUCCESS",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <span className="text-[10px] font-black uppercase tracking-wider text-[#C8FF3D] bg-[#17171C] border border-[#C8FF3D]/30 px-3 py-1 rounded-full">
          Compliance &amp; Security
        </span>
        <h1 className="text-3xl font-black text-white mt-2">Administrative Audit Logs</h1>
        <p className="text-xs text-neutral-400">
          Immutable event stream capturing administrative state alterations, question verification timestamps, and security triggers.
        </p>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#2A2A2E] text-neutral-400 font-black uppercase tracking-wider">
              <th className="pb-3 pl-2">Timestamp (UTC)</th>
              <th className="pb-3">Action Event</th>
              <th className="pb-3">Target Entity</th>
              <th className="pb-3">Authorized Actor</th>
              <th className="pb-3 text-right pr-2">Security Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F1F24]">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-[#1A1A20] transition-colors font-mono">
                <td className="py-3.5 pl-2 text-neutral-400 text-[11px]">{log.timestamp}</td>
                <td className="py-3.5 font-bold text-[#FF4FA3] text-[11px]">{log.action}</td>
                <td className="py-3.5 text-white font-sans text-xs">{log.target}</td>
                <td className="py-3.5 text-neutral-300 font-sans text-xs">{log.admin}</td>
                <td className="py-3.5 text-right pr-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#1C2818] text-[#C8FF3D] border border-[#C8FF3D]/30">
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
