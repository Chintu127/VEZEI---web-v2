import { NextResponse } from "next/server";
import { INITIAL_QUESTS, INITIAL_ACHIEVEMENTS } from "@/data/gamification";
import { calculateLevel } from "@/lib/gamification/engine";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Unauthenticated or guest state: return clean baseline metrics
      const xp = 0;
      const levelInfo = calculateLevel(xp);
      return NextResponse.json({
        success: true,
        authenticated: false,
        user: null,
        gamification: {
          xp,
          levelInfo,
          streak: { current: 0, longest: 0, freezeCount: 1 },
          quests: INITIAL_QUESTS,
          achievements: INITIAL_ACHIEVEMENTS,
        },
        analytics: {
          readinessScore: 0,
          totalSolved: 0,
          accuracy: 0,
          hasActivity: false,
        },
      });
    }

    // Authenticated user: fetch real practice sessions from Supabase
    const { data: sessions, error } = await supabase
      .from("practice_sessions")
      .select("total_questions, correct_count, score, accuracy, time_spent_seconds")
      .eq("user_id", user.id);

    let totalSolved = 0;
    let totalCorrect = 0;

    if (sessions && sessions.length > 0) {
      sessions.forEach((s) => {
        totalSolved += s.total_questions || 0;
        totalCorrect += s.correct_count || 0;
      });
    }

    const accuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;
    const readinessScore = Math.min(100, Math.round(accuracy * 0.9 + Math.min(10, totalSolved / 5)));

    // Fetch user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .single();

    const xp = Math.min(10000, totalSolved * 15 + totalCorrect * 10);
    const levelInfo = calculateLevel(xp);

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        id: user.id,
        name: profile?.full_name || user.email?.split("@")[0] || "Aspirant",
        email: user.email,
        role: profile?.role || "student",
        targetExam: "CAT 2026",
        targetScore: "99.5%ile",
      },
      gamification: {
        xp,
        levelInfo,
        streak: { current: totalSolved > 0 ? 1 : 0, longest: totalSolved > 0 ? 1 : 0, freezeCount: 1 },
        quests: INITIAL_QUESTS,
        achievements: INITIAL_ACHIEVEMENTS,
      },
      analytics: {
        readinessScore,
        totalSolved,
        accuracy,
        hasActivity: totalSolved > 0,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || "Failed to retrieve student dashboard telemetry",
    }, { status: 500 });
  }
}
