import { NextResponse } from "next/server";
import { z } from "zod";

import { shouldGenerateAdaptiveQuestions } from "@/lib/adaptive";
import { prisma } from "@/lib/prisma";
import { isChild } from "@/lib/roles";
import { computeAttemptXp, computeNoveltyScore } from "@/lib/scoring";
import { requireSession } from "@/lib/session";

const bodySchema = z.object({
  questionId: z.string(),
  selectedIndex: z.number().int(),
  latencyMs: z.number().int().min(0),
  mode: z.enum(["PRACTICE", "SCORED"]).default("SCORED"),
  sessionId: z.string().optional(),
  activityType: z.enum(["quiz", "flashcards", "games"]).default("quiz"),
  isRepeatedSet: z.boolean().default(false),
});

export async function POST(request: Request) {
  const sessionState = await requireSession();
  if ("error" in sessionState) return sessionState.error;
  if (!isChild(sessionState.session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const child = await prisma.childProfile.findUnique({
    where: { userId: sessionState.session.user.id },
  });
  if (!child) return NextResponse.json({ error: "Child profile missing" }, { status: 404 });

  const question = await prisma.questionBank.findUnique({
    where: { id: parsed.data.questionId },
    include: { conceptLinks: true },
  });
  if (!question) return NextResponse.json({ error: "Question not found" }, { status: 404 });

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const priorAttempts = await prisma.attempt.count({
    where: {
      childProfileId: child.id,
      questionId: question.id,
      createdAt: { gte: todayStart },
    },
  });
  const attemptsTodayByType = await prisma.attempt.count({
    where: {
      childProfileId: child.id,
      createdAt: { gte: todayStart },
    },
  });

  const noveltyScore = computeNoveltyScore(priorAttempts);
  const correct = parsed.data.selectedIndex === question.correctIndex;
  const xp = computeAttemptXp({
    correct,
    difficultyLevel: question.difficultyLevel,
    noveltyScore,
    latencyMs: parsed.data.latencyMs,
    mode: parsed.data.mode,
    isRepeatedSet: parsed.data.isRepeatedSet,
    activityType: parsed.data.activityType,
    attemptsTodayByType,
  });

  const attempt = await prisma.attempt.create({
    data: {
      childProfileId: child.id,
      questionId: question.id,
      sessionId: parsed.data.sessionId,
      mode: parsed.data.mode,
      selectedIndex: parsed.data.selectedIndex,
      correct,
      latencyMs: parsed.data.latencyMs,
      noveltyScore,
      xpAwarded: xp.xp,
    },
  });

  if (parsed.data.sessionId) {
    await prisma.studySession.update({
      where: { id: parsed.data.sessionId },
      data: { interactionCount: { increment: 1 } },
    });
  }

  if (xp.xp > 0) {
    await prisma.childProfile.update({
      where: { id: child.id },
      data: { xp: { increment: xp.xp } },
    });
  }

  for (const link of question.conceptLinks) {
    const delta = correct ? 4 : -7;
    await prisma.masteryState.upsert({
      where: {
        childProfileId_topicId_conceptId: {
          childProfileId: child.id,
          topicId: question.topicId,
          conceptId: link.conceptId,
        },
      },
      update: {
        masteryScore: { increment: delta },
        confidenceScore: { increment: correct ? 2 : -2 },
        lastReviewedAt: new Date(),
      },
      create: {
        childProfileId: child.id,
        topicId: question.topicId,
        conceptId: link.conceptId,
        masteryScore: Math.max(0, 45 + delta),
        confidenceScore: Math.max(0, 45 + (correct ? 2 : -2)),
        delayedRecallScore: 0,
        mixedReviewScore: 0,
        lastReviewedAt: new Date(),
      },
    });
  }

  const recentByConcept = await prisma.attempt.count({
    where: {
      childProfileId: child.id,
      question: {
        conceptLinks: {
          some: {
            conceptId: {
              in: question.conceptLinks.map((x) => x.conceptId),
            },
          },
        },
      },
      correct: false,
      createdAt: { gte: todayStart },
    },
  });
  const highMasteryRun = await prisma.attempt.count({
    where: {
      childProfileId: child.id,
      question: { topicId: question.topicId },
      correct: true,
      createdAt: { gte: todayStart },
    },
  });
  const generationFlags = shouldGenerateAdaptiveQuestions({
    repeatedMissesOnConcept: recentByConcept,
    highMasteryRun,
  });

  return NextResponse.json({
    attemptId: attempt.id,
    correct,
    xpAwarded: xp.xp,
    capped: xp.capped,
    generationFlags,
  });
}
