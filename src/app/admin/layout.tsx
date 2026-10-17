"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useApp } from "@/context/AppProvider";
import { ROLE_DEFINITIONS, canAccessRoute } from "@/lib/auth/rbac";
import { UserRole } from "@/context/AppProvider";
import {
  ShieldAlert,
  LayoutDashboard,
  Compass,
  FileQuestion,
  FileCheck2,
  Users,
  ScrollText,
  ArrowLeft,
  Lock,
  Palette,
  Database,
  Activity,
  Sliders,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, updateUser } = useApp();

  const currentRole: UserRole = (user?.role as UserRole) || "super_admin";

  const roleDashboards = [
    { label: "Super Admin", href: "/admin/super", icon: Lock, roleReq: "super_admin" },
    { label: "Main Admin", href: "/admin/main", icon: LayoutDashboard, roleReq: "main_admin" },
    { label: "Dev 1: Frontend", href: "/admin/developer-1", icon: Palette, roleReq: "developer_1" },
    { label: "Dev 2: Backend", href: "/admin/developer-2", icon: Database, roleReq: "developer_2" },
    { label: "Dev 3: QA & Tests", href: "/admin/developer-3", icon: Activity, roleReq: "developer_3" },
  ];

  const adminNav = [
    { label: "Exams & Syllabus", href: "/admin/exams", icon: Compass },
    { label: "Question Bank", href: "/admin/questions", icon: FileQuestion },
    { label: "Mock Test Manager", href: "/admin/mock-tests", icon: FileCheck2 },
    { label: "User Roles & RBAC", href: "/admin/users", icon: Users },
    { label: "Security Audit Logs", href: "/admin/audit-logs", icon: ScrollText },
  ];

  return (
    <div className="min-h-screen bg-[#0E0E11] text-white flex flex-col lg:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-72 bg-[#141418] border-b lg:border-b-0 lg:border-r border-[#2A2A2E] flex flex-col justify-between p-4 flex-shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2E]">
            <Logo variant="navbar" size="sm" href="/admin" />
          </div>

          {/* Active Role Selector for Testing & Privilege Preview */}
          <div className="p-3 rounded-2xl bg-[#1B1B22] border border-[#2A2A2E] space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-neutral-400">
              <span className="flex items-center gap-1.5 text-white font-black">
                <ShieldAlert className="w-3.5 h-3.5 text-[#FF4FA3]" />
                RBAC Role:
              </span>
              <span className="text-[10px] text-[#C8FF3D] font-mono">Verified Session</span>
            </div>
            <select
              value={currentRole}
              onChange={(e) => updateUser({ role: e.target.value as UserRole })}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#111111] border border-[#2E2E36] text-white text-xs font-bold focus:border-[#C8FF3D] focus:outline-none"
            >
              <option value="super_admin">Super Admin (Root)</option>
              <option value="main_admin">Main Admin (Academic)</option>
              <option value="developer_1">Tech Developer 1 (UI/UX)</option>
              <option value="developer_2">Tech Developer 2 (Backend)</option>
              <option value="developer_3">Tech Developer 3 (QA)</option>
            </select>
          </div>

          {/* Role-Specific Dashboards */}
          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase tracking-wider text-neutral-500 px-3 pb-1">
              Role Workspaces
            </div>
            {roleDashboards.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                      : "text-neutral-400 hover:text-white hover:bg-[#1C1C22]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Core Admin Management */}
          <div className="space-y-1 pt-2 border-t border-[#24242B]">
            <div className="text-[10px] font-black uppercase tracking-wider text-neutral-500 px-3 pb-1">
              Platform Content
            </div>
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                      : "text-neutral-400 hover:text-white hover:bg-[#1C1C22]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-[#2A2A2E]">
          <Link
            href="/app"
            className="flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white p-2 rounded-xl hover:bg-[#1C1C22]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Student App</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 sm:p-10 min-w-0 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
