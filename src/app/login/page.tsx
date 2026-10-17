"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useApp } from "@/context/AppProvider";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/app";

  const { setUser } = useApp();

  const [email, setEmail] = useState("revanth@vezei.com");
  const [password, setPassword] = useState("DemoPass123!");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (signInError) {
        // If local demo credentials are used or offline development fallback
        if (
          (email.trim() === "revanth@vezei.com" && password === "DemoPass123!") ||
          signInError.message.includes("fetch failed") ||
          signInError.message.includes("placeholder")
        ) {
          console.warn("Using local authenticated session fallback for development/demo.");
          const user = {
            id: "usr-rev-01",
            email: email.trim(),
            fullName: "Revanth",
            avatar: "🎯",
            role: "student" as const,
            targetExamId: "cat",
            targetExamName: "CAT (IIM Entrance)",
            targetExamDate: "2026-11-29",
            targetScore: "99.5%ile",
            prepLevel: "intermediate" as const,
            dailyGoalMinutes: 60,
            onboardingCompleted: true,
          };
          setUser(user);
          router.push(redirectTo);
          return;
        }

        setError(signInError.message || "Invalid email or password. Please verify your credentials.");
        return;
      }

      if (data?.session && data.user) {
        const user = {
          id: data.user.id,
          email: data.user.email || email.trim(),
          fullName: data.user.user_metadata?.full_name || email.split("@")[0],
          avatar: "🎯",
          role: "student" as const,
          targetExamId: "cat",
          targetExamName: "CAT (IIM Entrance)",
          targetExamDate: "2026-11-29",
          targetScore: "99.5%ile",
          prepLevel: "intermediate" as const,
          dailyGoalMinutes: 60,
          onboardingCompleted: true,
        };
        setUser(user);
        router.push(redirectTo);
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const callbackUrl = typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback?next=${redirectTo}`
        : redirectTo;

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
        },
      });

      if (oauthError) {
        if (oauthError.message.includes("fetch failed") || oauthError.message.includes("placeholder")) {
          // Local demo session
          const user = {
            id: "usr-google-01",
            email: "student@gmail.com",
            fullName: "Google Aspirant",
            avatar: "🚀",
            role: "student" as const,
            targetExamId: "cat",
            targetExamName: "CAT (IIM Entrance)",
            targetExamDate: "2026-11-29",
            targetScore: "99.5%ile",
            prepLevel: "intermediate" as const,
            dailyGoalMinutes: 60,
            onboardingCompleted: true,
          };
          setUser(user);
          router.push(redirectTo);
          return;
        }
        setError(oauthError.message);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to initialize Google Authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-[#5B3DF5]/15 via-[#C8FF3D]/10 to-[#FF4FA3]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4 relative z-10">
        <Logo variant="navbar" size="md" href="/" />
        <h1 className="text-3xl font-black text-white tracking-tight">
          Welcome Back Aspirant
        </h1>
        <p className="text-xs text-neutral-400">
          New to VEZEI?{" "}
          <Link href="/signup" className="text-[#C8FF3D] font-bold hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
          
          {/* Quick Demo Credentials Notice */}
          <div className="p-3.5 rounded-xl bg-[#1C1F16] border border-[#C8FF3D]/40 text-xs text-neutral-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#C8FF3D] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold">Pre-filled Demo Login:</strong>
              <span>Use the preloaded credentials below to explore the student dashboard.</span>
            </div>
          </div>

          {/* Google OAuth Option */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-3.5 px-4 rounded-xl bg-[#111111] hover:bg-neutral-900 border-2 border-[#2E2E36] text-white text-xs font-bold flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#2A2A2E] w-full" />
            <span className="bg-[#17171C] px-3 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
              Or with email
            </span>
            <div className="border-t border-[#2A2A2E] w-full" />
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-[#29171E] border border-[#FF4FA3]/50 text-[#FF4FA3] text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-neutral-400">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#FF4FA3] hover:underline font-bold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-[#111111] border-[#2E2E36] text-[#C8FF3D] focus:ring-0"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-tactile-lime w-full py-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#C8FF3D]" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
