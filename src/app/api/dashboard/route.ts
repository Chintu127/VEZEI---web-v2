import { NextResponse } from "next/server";
import { INITIAL_QUESTS, INITIAL_ACHIEVEMENTS } from "@/data/gamification";
import { calculateLevel } from "@/lib/gamification/engine";

export async function GET() {
  const xp = 2450;
  const levelInfo = calculateLevel(xp);

  return NextResponse.json({
    success: true,
    user: {
      id: "usr-rev-01",
      name: "Revanth",
      targetExam: "CAT 2026",
      targetScore: "99.5%ile",
    },
    gamification: {
      xp,
      levelInfo,
      streak: { current: 5, longest: 14, freezeCount: 1 },
      quests: INITIAL_QUESTS,
      achievements: INITIAL_ACHIEVEMENTS,
    },
    analytics: {
      readinessScore: 84,
      totalSolved: 425,
      accuracy: 78.4,
    },
  });
}
