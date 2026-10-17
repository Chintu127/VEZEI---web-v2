import { NextResponse } from "next/server";
import { z } from "zod";

const createSessionSchema = z.object({
  examSlug: z.string().min(1),
  subject: z.string().optional(),
  difficulty: z.string().optional(),
  count: z.number().min(1).max(100).default(10),
  timed: z.boolean().default(true),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createSessionSchema.parse(body);

    const sessionId = `sess-${Date.now()}`;

    return NextResponse.json({
      success: true,
      sessionId,
      examSlug: validated.examSlug,
      questionCount: validated.count,
      durationSeconds: validated.timed ? validated.count * 120 : null,
      startedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid session configuration" },
      { status: 400 }
    );
  }
}
