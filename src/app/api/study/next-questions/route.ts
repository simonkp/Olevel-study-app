import { NextResponse } from "next/server";
import { z } from "zod";

import { pickAdaptiveQuestions } from "@/lib/adaptive";
import { prisma } from "@/lib/prisma";
import { isChild } from "@/lib/roles";
import { requireSession } from "@/lib/session";

const querySchema = z.object({
  topicId: z.string(),
  targetDifficulty: z.coerce.number().int().min(1).max(3).default(1),
});

export async function GET(request: Request) {
  const sessionState = await requireSession();
  if ("error" in sessionState) return sessionState.error;
  if (!isChild(sessionState.session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(request.url);
  const parsed = querySchema.safeParse(Object.fromEntries(url.searchParams.entries()));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const child = await prisma.childProfile.findUnique({
    where: { userId: sessionState.session.user.id },
    include: {
      masteryStates: {
        where: { masteryScore: { lt: 55 }, conceptId: { not: null } },
      },
    },
  });
  if (!child) return NextResponse.json({ error: "Child profile missing" }, { status: 404 });

  const questions = await prisma.questionBank.findMany({
    where: {
      topicId: parsed.data.topicId,
      active: true,
      needsReview: false,
    },
  });

  const weakConceptIds = new Set(
    child.masteryStates.map((x) => x.conceptId).filter(Boolean) as string[],
  );
  const weakQuestionLinks = await prisma.questionBankConcept.findMany({
    where: {
      conceptId: { in: [...weakConceptIds] },
      question: { topicId: parsed.data.topicId, active: true, needsReview: false },
    },
  });
  const weakQuestionIds = new Set(weakQuestionLinks.map((x) => x.questionId));

  const selected = pickAdaptiveQuestions({
    questions,
    weakConceptQuestionIds: weakQuestionIds,
    targetDifficulty: parsed.data.targetDifficulty,
  });

  return NextResponse.json({
    questions: selected.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      options: q.optionsJson,
      difficultyLevel: q.difficultyLevel,
    })),
  });
}
