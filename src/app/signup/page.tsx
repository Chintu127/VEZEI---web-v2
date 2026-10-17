"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useApp } from "@/context/AppProvider";
import { createClient } from "@/lib/supabase/client";
import { Sparkles, Eye, EyeOff, Lock, Mail, User, ArrowRight, CheckCircle2, AlertCircle, Check } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { setUser, addXp } = useApp();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationPending, setVerificationPending] = useState(false);

  // Password strength validation
  const hasMinLen = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordStrong = hasMinLen && hasLetter && hasNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (!isPasswordStrong) {
      setError("Password must be at least 8 characters and include both letters and numbers.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }
    if (!agreeTerms) {
      setError("You must accept the Terms of Service and Privacy Policy to register.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const callbackUrl = typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback?next=/onboarding`
        : "/onboarding";

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
          emailRedirectTo: callbackUrl,
        },
      });

      if (signUpError) {
        // If Supabase has placeholder credentials or local dev mode, notify cleanly
        if (signUpError.message.includes("fetch failed") || signUpError.message.includes("placeholder")) {
          console.warn("Supabase local mode fallback:", signUpError.message);
          const newUser = {
            id: `usr-${Date.now()}`,
            email: email.trim(),
            fullName: fullName.trim(),
            avatar: "🎯",
            role: "student" as const,
            targetExamId: "cat",
            targetExamName: "CAT (IIM Entrance)",
            targetExamDate: "2026-11-29",
            targetScore: "99.0%ile",
            prepLevel: "intermediate" as const,
            dailyGoalMinutes: 60,
            onboardingCompleted: false,
          };
          setUser(newUser);
          addXp(50, "Created VEZEI Account!");
          router.push("/onboarding");
          return;
        }
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Check if email confirmation is required
      if (data.user && !data.session) {
        setVerificationPending(true);
        setLoading(false);
        return;
      }

      // If session is returned immediately
      if (data.session) {
        const newUser = {
          id: data.user?.id || `usr-${Date.now()}`,
          email: email.trim(),
          fullName: fullName.trim(),
          avatar: "🎯",
          role: "student" as const,
          targetExamId: "cat",
          targetExamName: "CAT (IIM Entrance)",
          targetExamDate: "2026-11-29",
          targetScore: "99.0%ile",
          prepLevel: "intermediate" as const,
          dailyGoalMinutes: 60,
          onboardingCompleted: false,
        };
        setUser(newUser);
        addXp(50, "Created VEZEI Account!");
        router.push("/onboarding");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during account creation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const callbackUrl = typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback?next=/onboarding`
        : "/onboarding";

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
        },
      });

      if (oauthError) {
        if (oauthError.message.includes("fetch failed") || oauthError.message.includes("placeholder")) {
          // Local demo fallback
          const newUser = {
            id: `usr-google-${Date.now()}`,
            email: "student@gmail.com",
            fullName: "Google Aspirant",
            avatar: "🚀",
            role: "student" as const,
            targetExamId: "cat",
            targetExamName: "CAT (IIM Entrance)",
            targetExamDate: "2026-11-29",
            targetScore: "99.0%ile",
            prepLevel: "intermediate" as const,
            dailyGoalMinutes: 60,
            onboardingCompleted: false,
          };
          setUser(newUser);
          router.push("/onboarding");
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
          Create Your Student Account
        </h1>
        <p className="text-xs text-neutral-400">
          Already have an account?{" "}
          <Link href="/login" className="text-[#C8FF3D] font-bold hover:underline">
            Log in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#17171C] border-2 border-[#2E2E36] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
          
          {verificationPending ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-[#1C1F16] border-2 border-[#C8FF3D] flex items-center justify-center mx-auto text-[#C8FF3D]">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-black text-white">Check Your Email</h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                We have sent an authentication link to <strong className="text-white">{email}</strong>. Please click the link in your email to verify your account and activate your study profile.
              </p>
              <div className="pt-4 border-t border-[#2E2E36] space-y-3">
                <Link
                  href="/login"
                  className="btn-tactile-lime block w-full py-3.5 rounded-xl text-xs font-black"
                >
                  Return to Login
                </Link>
                <button
                  type="button"
                  onClick={() => setVerificationPending(false)}
                  className="text-xs text-neutral-400 hover:text-white underline font-bold"
                >
                  Need to change your email?
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Google OAuth Option */}
          <button
            onClick={handleGoogleSignup}
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
            <span>Continue with Google</span>
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
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Revanth"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                />
              </div>
            </div>

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
                  placeholder="aspirant@vezei.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
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

              {/* Password requirement checklist */}
              <div className="grid grid-cols-3 gap-1 pt-2 text-[10px]">
                <span className={`flex items-center gap-1 ${hasMinLen ? "text-[#C8FF3D]" : "text-neutral-500"}`}>
                  <Check className="w-3 h-3" /> 8+ chars
                </span>
                <span className={`flex items-center gap-1 ${hasLetter ? "text-[#C8FF3D]" : "text-neutral-500"}`}>
                  <Check className="w-3 h-3" /> Letters
                </span>
                <span className={`flex items-center gap-1 ${hasNumber ? "text-[#C8FF3D]" : "text-neutral-500"}`}>
                  <Check className="w-3 h-3" /> Numbers
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111111] border-2 border-[#2E2E36] focus:border-[#C8FF3D] focus:outline-none text-white text-sm"
                />
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-400">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded bg-[#111111] border-[#2E2E36] text-[#C8FF3D] focus:ring-0"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="text-white underline hover:text-[#C8FF3D]">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-white underline hover:text-[#C8FF3D]">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-tactile-lime w-full py-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Complete Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          </>
          )}

        </div>
      </div>
    </div>
  );
}
