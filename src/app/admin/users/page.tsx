"use client";

import React, { useState } from "react";
import { Users, Shield, ShieldAlert, CheckCircle2, UserX } from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin" | "moderator";
  exam: string;
  xp: number;
  status: "active" | "suspended";
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: "u-1",
      name: "Revanth",
      email: "revanth@vezei.com",
      role: "admin",
      exam: "CAT 2026",
      xp: 2450,
      status: "active",
    },
    {
      id: "u-2",
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      role: "student",
      exam: "CAT 2026",
      xp: 3450,
      status: "active",
    },
    {
      id: "u-3",
      name: "Dr. Siddiqui",
      email: "siddiqui@curriculum.org",
      role: "moderator",
      exam: "GATE CS",
      xp: 1850,
      status: "active",
    },
    {
      id: "u-4",
      name: "Priya Nair",
      email: "priya@iimprep.in",
      role: "student",
      exam: "GMAT Focus",
      xp: 3120,
      status: "active",
    },
  ]);

  const toggleRole = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextRole = u.role === "student" ? "moderator" : u.role === "moderator" ? "admin" : "student";
          return { ...u, role: nextRole };
        }
        return u;
      })
    );
  };

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "suspended" : "active" }
          : u
      )
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4FA3] bg-[#17171C] border border-[#FF4FA3]/30 px-3 py-1 rounded-full">
          Identity &amp; Moderation
        </span>
        <h1 className="text-3xl font-black text-white mt-2">User Roles &amp; Permissions</h1>
        <p className="text-xs text-neutral-400">
          Manage user authorization, moderator privileges, and academic integrity enforcements.
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#2A2A2E] text-neutral-400 font-black uppercase tracking-wider">
              <th className="pb-3 pl-2">User</th>
              <th className="pb-3">Primary Target</th>
              <th className="pb-3">XP Balance</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F1F24]">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-[#1A1A20] transition-colors">
                <td className="py-3.5 pl-2">
                  <strong className="text-white block text-sm">{u.name}</strong>
                  <span className="text-neutral-500 text-[11px]">{u.email}</span>
                </td>
                <td className="py-3.5 text-neutral-300 font-semibold">{u.exam}</td>
                <td className="py-3.5 text-[#C8FF3D] font-black">{u.xp.toLocaleString()} XP</td>
                <td className="py-3.5">
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      u.role === "admin"
                        ? "bg-[#29171E] text-[#FF4FA3] border border-[#FF4FA3]/30"
                        : u.role === "moderator"
                        ? "bg-[#201D2E] text-[#5B3DF5] border border-[#5B3DF5]/30"
                        : "bg-[#111111] text-neutral-400 border border-[#2E2E36]"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5">
                  <span
                    className={`text-[10px] font-bold ${
                      u.status === "active" ? "text-[#C8FF3D]" : "text-[#FF4FA3]"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="py-3.5 text-right pr-2 space-x-2">
                  <button
                    onClick={() => toggleRole(u.id)}
                    className="px-2.5 py-1 rounded-lg bg-[#111111] hover:bg-neutral-800 text-neutral-300 border border-[#2E2E36] text-[11px] font-bold"
                  >
                    Cycle Role
                  </button>
                  <button
                    onClick={() => toggleStatus(u.id)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold ${
                      u.status === "active"
                        ? "bg-[#29171E] text-[#FF4FA3] border-[#FF4FA3]/40"
                        : "bg-[#1C2818] text-[#C8FF3D] border-[#C8FF3D]/40"
                    }`}
                  >
                    {u.status === "active" ? "Suspend" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
