import { NextResponse } from "next/server";
import { z } from "zod";
import { SAMPLE_QUESTIONS } from "@/data/questions";
import { calculatePracticeScore } from "@/lib/gamification/engine";

const completeSchema = z.object({
  responses: z.record(z.string()),
  timeSpentSeconds: z.number().default(0),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { responses, timeSpentSeconds } = completeSchema.parse(body);

    const scoringInput = SAMPLE_QUESTIONS.map((q) => ({
      id: q.id,
      correctOption: Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer,
      positiveMarks: 3,
      negativeMarks: 1,
    }));

    const result = calculatePracticeScore(scoringInput, responses);

    return NextResponse.json({
      success: true,
      sessionId: id,
      result,
      timeSpentSeconds,
      completedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Submission validation failed" },
      { status: 400 }
    );
  }
}
