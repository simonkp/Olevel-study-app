import { NextResponse } from "next/server";
import { z } from "zod";

import { resolveExplanation } from "@/lib/explanations";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

const bodySchema = z.object({
  questionId: z.string(),
  wrongOptionIndex: z.number().int().min(0),
});

export async function POST(request: Request) {
  const sessionState = await requireSession();
  if ("error" in sessionState) return sessionState.error;

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const question = await prisma.questionBank.findUnique({
    where: { id: parsed.data.questionId },
  });
  if (!question) return NextResponse.json({ error: "Question not found" }, { status: 404 });

  const result = await resolveExplanation({
    question,
    wrongOptionIndex: parsed.data.wrongOptionIndex,
  });

  return NextResponse.json(result);
}
