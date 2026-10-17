"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useApp } from "@/context/AppProvider";
import {
  LayoutDashboard,
  Compass,
  GitBranch,
  Target,
  FileCheck2,
  BrainCircuit,
  Calendar,
  BarChart3,
  Swords,
  Trophy,
  Award,
  BookX,
  Bookmark,
  Users,
  Settings,
  CreditCard,
  ShieldAlert,
  Flame,
  Zap,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { useI18n } from "@/context/LanguageContext";

export function AppSidebar() {
  const pathname = usePathname();
  const { user, streak, levelInfo, logout, theme, toggleTheme } = useApp();
  const { t } = useI18n();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const mainNavigation = [
    { label: t("overview"), href: "/app", icon: LayoutDashboard },
    { label: t("myExams"), href: "/app/exams", icon: Compass },
    { label: t("skillMap"), href: "/app/learn", icon: GitBranch },
    { label: t("practiceDrills"), href: "/app/practice", icon: Target },
    { label: t("mockTests"), href: "/app/mock-tests", icon: FileCheck2 },
    { label: t("aiDoubtTutor"), href: "/app/ai-tutor", icon: BrainCircuit, badge: "AI" },
    { label: t("studyPlanner"), href: "/app/planner", icon: Calendar },
    { label: t("performance"), href: "/app/analytics", icon: BarChart3 },
    { label: t("quizBattle"), href: "/app/battle", icon: Swords, badge: "Live" },
    { label: t("leaderboards"), href: "/app/leaderboards", icon: Trophy },
    { label: t("achievements"), href: "/app/achievements", icon: Award },
    { label: t("mistakeNotebook"), href: "/app/mistakes", icon: BookX },
    { label: t("bookmarks"), href: "/app/bookmarks", icon: Bookmark },
    { label: t("community"), href: "/app/community", icon: Users },
  ];

  const secondaryNavigation = [
    { label: t("settings"), href: "/app/settings", icon: Settings },
    ...(user && user.role !== "student"
      ? [{ label: t("staffConsole"), href: "/admin", icon: ShieldAlert, badge: "RBAC" }]
      : []),
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white dark:bg-[#111111] border-b border-neutral-200 dark:border-[#2A2A2E]">
        <Logo variant="navbar" size="sm" href="/app" />

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-[#1C1C1E] border border-[#FF4FA3]/40 text-[#FF4FA3] text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-[#FF4FA3]" />
            <span>{streak.current}d</span>
          </div>

          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-2 rounded-xl bg-neutral-100 dark:bg-[#1C1C1E] border border-neutral-200 dark:border-[#2E2E36] text-neutral-800 dark:text-white"
            aria-label="Toggle App Menu"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer Menu */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-md pt-16 px-4 pb-8 overflow-y-auto">
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#17171C] border border-neutral-200 dark:border-[#2E2E36] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{user?.avatar || "🎯"}</span>
                <div>
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-white">{user?.fullName || "Student"}</h3>
                  <span className="text-xs text-[#2E7D32] dark:text-[#C8FF3D] font-semibold">
                    Level {levelInfo.level} • {levelInfo.currentLevelXp} XP
                  </span>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-white dark:bg-[#111111] border border-neutral-200 dark:border-[#2E2E36] text-neutral-800 dark:text-neutral-300"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-[#C8FF3D]" /> : <Moon className="w-4 h-4 text-[#5B3DF5]" />}
              </button>
            </div>

            <nav className="space-y-1">
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#17171C] hover:text-black dark:hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#FF4FA3] text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-neutral-200 dark:border-[#2A2A2E] space-y-1">
              {secondaryNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#17171C]"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  logout();
                  setMobileDrawerOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#FF4FA3] hover:bg-[#FFF1F7] dark:hover:bg-[#29171E]"
              >
                <LogOut className="w-4 h-4" />
                <span>{t("signOut")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#141417] border-r border-neutral-200 dark:border-[#2A2A2E] text-neutral-900 dark:text-white h-screen sticky top-0 flex-shrink-0 select-none transition-colors">
        
        {/* Brand Lockup */}
        <div className="h-20 px-6 flex items-center border-b border-neutral-200 dark:border-[#2A2A2E]">
          <Logo variant="navbar" size="sm" href="/app" />
        </div>

        {/* User Status Card */}
        <div className="px-4 py-3 border-b border-neutral-200 dark:border-[#2A2A2E] bg-neutral-50 dark:bg-[#17171C]">
          <div className="flex items-center justify-between mb-2">
            <Link href="/app/profile" className="flex items-center gap-2.5 group">
              <span className="text-xl">{user?.avatar || "🎯"}</span>
              <div className="truncate">
                <span className="text-xs font-black text-neutral-900 dark:text-white group-hover:text-[#5B3DF5] dark:group-hover:text-[#C8FF3D] transition-colors block truncate max-w-[110px]">
                  {user?.fullName || "Aspirant"}
                </span>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block truncate max-w-[110px]">
                  {user?.targetExamName || "CAT 2026"}
                </span>
              </div>
            </Link>

            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-1.5 rounded-lg bg-white dark:bg-[#111111] border border-neutral-200 dark:border-[#2E2E36] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-[#C8FF3D]" /> : <Moon className="w-3.5 h-3.5 text-[#5B3DF5]" />}
            </button>
          </div>

          {/* Gamification mini-badges */}
          <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-black">
            <div className="p-1.5 rounded-xl bg-white dark:bg-[#111111] border border-[#FF4FA3]/40 text-[#FF4FA3] flex items-center justify-center gap-1 shadow-sm">
              <Flame className="w-3 h-3 fill-[#FF4FA3]" />
              <span>{streak.current}d {t("streak")}</span>
            </div>
            <div className="p-1.5 rounded-xl bg-white dark:bg-[#111111] border border-[#C8FF3D]/50 text-neutral-900 dark:text-[#C8FF3D] flex items-center justify-center gap-1 shadow-sm">
              <Zap className="w-3 h-3 fill-[#C8FF3D] text-[#C8FF3D]" />
              <span>{t("level")} {levelInfo.level}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-none">
          <span className="px-3 text-[10px] font-black uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-1">
            {t("learningLoop")}
          </span>

          {mainNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#1E1E24] hover:text-black dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded ${
                      item.badge === "AI"
                        ? "bg-[#5B3DF5] text-white"
                        : "bg-[#FF4FA3] text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Secondary Controls */}
        <div className="p-3 border-t border-neutral-200 dark:border-[#2A2A2E] bg-neutral-50 dark:bg-[#111111] space-y-1">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-neutral-200 dark:bg-[#25252A] text-black dark:text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#17171C]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 pb-1">
            <LanguageSelector variant="select" />
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#FF4FA3] hover:bg-[#FF4FA3]/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>{t("signOut")}</span>
          </button>
        </div>

      </aside>
    </>
  );
}
