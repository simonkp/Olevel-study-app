import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { isParent } from "@/lib/roles";
import { requireSession } from "@/lib/session";

const payloadSchema = z.object({
  topicId: z.string(),
  sourceRef: z.string().optional(),
  questions: z
    .array(
      z.object({
        prompt: z.string().min(8),
        options: z.array(z.string()).length(4),
        correctIndex: z.number().int().min(0).max(3),
        explanation: z.string().min(4),
        difficultyLevel: z.number().int().min(1).max(3),
        conceptIds: z.array(z.string()).default([]),
      }),
    )
    .min(1),
});

export async function POST(request: Request) {
  const sessionState = await requireSession();
  if ("error" in sessionState) return sessionState.error;
  if (!isParent(sessionState.session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = payloadSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const topic = await prisma.topic.findUnique({ where: { id: parsed.data.topicId } });
  if (!topic) return NextResponse.json({ error: "Topic not found" }, { status: 404 });

  const created = await prisma.$transaction(
    parsed.data.questions.map((q) =>
      prisma.questionBank.create({
        data: {
          topicId: parsed.data.topicId,
          prompt: q.prompt,
          optionsJson: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation,
          difficultyLevel: q.difficultyLevel,
          source: "guidebook-import",
          sourceRef: parsed.data.sourceRef,
          needsReview: true,
          conceptLinks: {
            create: q.conceptIds.map((id) => ({ conceptId: id })),
          },
        },
      }),
    ),
  );

  return NextResponse.json({ imported: created.length });
}
