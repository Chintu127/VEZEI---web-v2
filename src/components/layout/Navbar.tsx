"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useApp } from "@/context/AppProvider";
import {
  Menu,
  X,
  Flame,
  Zap,
  Sun,
  Moon,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { LanguageSelector } from "@/components/ui/LanguageSelector";

export function Navbar() {
  const pathname = usePathname();
  const { user, streak, levelInfo, theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Explore Exams", href: "/exams" },
    { label: "Roadmaps", href: "/how-it-works" },
    { label: "Features", href: "/features" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Resources", href: "/resources" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#2A2A2E] bg-[#111111]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Logo variant="navbar" size="md" href="/" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#171717] px-4 py-2 rounded-full border border-[#2A2A2E]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#C8FF3D] text-[#111111] shadow-[2px_2px_0px_#111111]"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Selector */}
          <LanguageSelector variant="pill" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl text-neutral-400 hover:text-white bg-[#171717] border border-[#2A2A2E] transition-colors"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-[#C8FF3D]" /> : <Moon className="w-5 h-5 text-neutral-800" />}
          </button>

          {user ? (
            // User is signed in: show streak, level and direct App button
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1C1C1E] border border-[#FF4FA3]/40 text-[#FF4FA3] text-xs font-bold">
                <Flame className="w-3.5 h-3.5 fill-[#FF4FA3]" />
                <span>{streak.current}d</span>
              </div>

              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1C1C1E] border border-[#C8FF3D]/40 text-[#C8FF3D] text-xs font-bold">
                <Zap className="w-3.5 h-3.5 fill-[#C8FF3D]" />
                <span>Lvl {levelInfo.level}</span>
              </div>

              <Link
                href="/app"
                className="btn-tactile-lime px-4 py-2 rounded-xl text-sm font-black flex items-center gap-2"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            // Anonymous guest: Login and Signup CTAs
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-sm font-bold text-neutral-200 hover:text-white hover:bg-[#171717] border border-transparent hover:border-[#2A2A2E] transition-all"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="btn-tactile-lime px-5 py-2.5 rounded-xl text-sm font-black flex items-center gap-1.5"
              >
                <span>Start Journey</span>
                <Sparkles className="w-4 h-4 fill-[#111111]" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl text-neutral-400 hover:text-white bg-[#171717] border border-[#2A2A2E]"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-[#C8FF3D]" /> : <Moon className="w-5 h-5 text-neutral-800" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-neutral-300 hover:text-white bg-[#171717] border border-[#2A2A2E]"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2A2A2E] bg-[#141416] px-4 pt-4 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-neutral-200 hover:bg-[#1C1C1E] hover:text-[#C8FF3D] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-[#2A2A2E] flex flex-col gap-2.5">
            {user ? (
              <Link
                href="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-tactile-lime w-full py-3 rounded-xl text-center font-black"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl text-center font-bold text-neutral-200 bg-[#1C1C1E] border border-[#2A2A2E]"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-tactile-lime w-full py-3 rounded-xl text-center font-black"
                >
                  Start Your Journey
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
