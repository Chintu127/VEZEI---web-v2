"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppProvider";
import { UserRole } from "@/context/AppProvider";
import { ROLE_DEFINITIONS } from "@/lib/auth/rbac";
import {
  ShieldCheck,
  Users,
  Activity,
  Lock,
  Key,
  Database,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Server,
} from "lucide-react";

interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastActive: string;
}

export default function SuperAdminPage() {
  const { user } = useApp();

  const [usersList, setUsersList] = useState<AdminUserRecord[]>([
    { id: "u-1", name: "Revanth (Root)", email: "revanth@vezei.com", role: "super_admin", lastActive: "Just now" },
    { id: "u-2", name: "Ananya Sharma", email: "ananya.admin@vezei.com", role: "main_admin", lastActive: "12m ago" },
    { id: "u-3", name: "Karthik Raja", email: "karthik.dev1@vezei.com", role: "developer_1", lastActive: "1h ago" },
    { id: "u-4", name: "Siddharth Verma", email: "siddharth.dev2@vezei.com", role: "developer_2", lastActive: "35m ago" },
    { id: "u-5", name: "Priya Nair", email: "priya.qa@vezei.com", role: "developer_3", lastActive: "4h ago" },
  ]);

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [aiRateLimit, setAiRateLimit] = useState("50 doubts / hour");
  const [allowSignups, setAllowSignups] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    // Prevent accidental removal of last Super Admin
    const superAdminCount = usersList.filter((u) => u.role === "super_admin").length;
    const targetUser = usersList.find((u) => u.id === userId);

    if (targetUser?.role === "super_admin" && newRole !== "super_admin" && superAdminCount <= 1) {
      alert("Security Constraint: You cannot demote the last Super Admin on the platform.");
      return;
    }

    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );

    setStatusMessage(`Updated permissions for ${targetUser?.name} to [${ROLE_DEFINITIONS[newRole].title}].`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A2A2E]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#29171E] border border-[#FF4FA3]/50 text-[#FF4FA3] text-xs font-black uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            Root System Authority
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Super Admin Console</h1>
          <p className="text-xs text-neutral-400">
            Global governance, RBAC role delegations, security audit logs, and infrastructure controls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1C1F16] border border-[#C8FF3D]/40 text-[#C8FF3D] text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            System Healthy (99.98% Uptime)
          </span>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-[#1C1F16] border border-[#C8FF3D] text-[#C8FF3D] text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Global Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#17171C] border border-[#2E2E36] space-y-1">
          <div className="text-xs text-neutral-400 font-bold uppercase">PostgreSQL DB Latency</div>
          <div className="text-2xl font-black text-[#C8FF3D]">18 ms</div>
          <div className="text-[11px] text-neutral-500">Supabase Connection Pool Active</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#17171C] border border-[#2E2E36] space-y-1">
          <div className="text-xs text-neutral-400 font-bold uppercase">Active Sessions</div>
          <div className="text-2xl font-black text-white">1,428</div>
          <div className="text-[11px] text-neutral-500">Across 6 supported roles</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#17171C] border border-[#2E2E36] space-y-1">
          <div className="text-xs text-neutral-400 font-bold uppercase">RLS Policy Violations</div>
          <div className="text-2xl font-black text-[#C8FF3D]">0 Blocked</div>
          <div className="text-[11px] text-neutral-500">100% Student data isolated</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#17171C] border border-[#2E2E36] space-y-1">
          <div className="text-xs text-neutral-400 font-bold uppercase">AI Socratic Queries</div>
          <div className="text-2xl font-black text-[#5B3DF5]">18,920</div>
          <div className="text-[11px] text-neutral-500">Today • Avg Latency 420ms</div>
        </div>
      </div>

      {/* Role Delegation & Assignment Matrix */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white">Role-Based Access Control (RBAC) Assignments</h2>
            <p className="text-xs text-neutral-400">
              Only Super Admin can assign or revoke administrative and developer privileges.
            </p>
          </div>
          <div className="text-xs text-[#FF4FA3] font-bold">5 Staff Accounts Registered</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#2E2E36] text-neutral-400 uppercase font-black tracking-wider">
                <th className="pb-3">Name &amp; Email</th>
                <th className="pb-3">Current Assignment</th>
                <th className="pb-3">Change Role</th>
                <th className="pb-3">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24242B]">
              {usersList.map((u) => {
                const currentDef = ROLE_DEFINITIONS[u.role];
                return (
                  <tr key={u.id} className="hover:bg-[#1E1E24] transition-colors">
                    <td className="py-4 font-bold text-white">
                      <div>{u.name}</div>
                      <div className="text-[11px] text-neutral-400 font-normal">{u.email}</div>
                    </td>
                    <td className="py-4">
                      <span
                        className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider inline-block"
                        style={{
                          backgroundColor: `${currentDef.badgeColor}20`,
                          color: currentDef.badgeColor,
                          border: `1px solid ${currentDef.badgeColor}50`,
                        }}
                      >
                        {currentDef.title}
                      </span>
                    </td>
                    <td className="py-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                        className="px-3 py-1.5 rounded-xl bg-[#111111] border border-[#2E2E36] text-white text-xs font-bold focus:border-[#C8FF3D] focus:outline-none"
                      >
                        <option value="super_admin">Super Admin</option>
                        <option value="main_admin">Main Admin</option>
                        <option value="developer_1">Tech Developer 1 (Frontend)</option>
                        <option value="developer_2">Tech Developer 2 (Backend)</option>
                        <option value="developer_3">Tech Developer 3 (QA)</option>
                        <option value="student">Student</option>
                      </select>
                    </td>
                    <td className="py-4 text-neutral-400">{u.lastActive}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Configuration Controls */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-black text-white">Global Application Controls</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#111111] border border-[#2E2E36] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-white">Student Signups</span>
              <button
                onClick={() => setAllowSignups(!allowSignups)}
                className={`px-3 py-1 rounded-full text-xs font-black ${
                  allowSignups ? "bg-[#C8FF3D] text-[#111111]" : "bg-neutral-800 text-neutral-400"
                }`}
              >
                {allowSignups ? "Open" : "Closed"}
              </button>
            </div>
            <p className="text-[11px] text-neutral-400">Controls registration access on /signup.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#111111] border border-[#2E2E36] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-white">Platform Maintenance</span>
              <button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`px-3 py-1 rounded-full text-xs font-black ${
                  maintenanceMode ? "bg-[#FF4FA3] text-white" : "bg-neutral-800 text-neutral-400"
                }`}
              >
                {maintenanceMode ? "Active" : "Disabled"}
              </button>
            </div>
            <p className="text-[11px] text-neutral-400">Locks non-admin users during database migrations.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#111111] border border-[#2E2E36] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-white">AI Tutor Rate Limit</span>
              <span className="text-xs font-black text-[#5B3DF5]">{aiRateLimit}</span>
            </div>
            <p className="text-[11px] text-neutral-400">Cost control guardrail against API abuse.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
