import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/app";

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(new URL(next, requestUrl.origin));
      }
      console.error("Supabase exchangeCodeForSession error:", error.message);
    } catch (err: any) {
      console.error("Unexpected error exchanging code for session:", err);
    }
  }

  // If code is missing or exchange failed, redirect to login with error
  return NextResponse.redirect(
    new URL(`/login?error=${encodeURIComponent("Authentication failed or link expired. Please sign in again.")}`, requestUrl.origin)
  );
}
