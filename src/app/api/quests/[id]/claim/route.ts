import { NextResponse } from "next/server";
import { INITIAL_QUESTS } from "@/data/gamification";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const quest = INITIAL_QUESTS.find((q) => q.id === id);

  if (!quest) {
    return NextResponse.json(
      { success: false, error: "Quest definition not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    questId: id,
    xpAwarded: quest.xp_reward,
    idempotencyKey: `claim-${id}-${new Date().toISOString().split("T")[0]}`,
    claimedAt: new Date().toISOString(),
  });
}
