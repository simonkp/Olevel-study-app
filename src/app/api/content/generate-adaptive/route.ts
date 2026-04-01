import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { isParent } from "@/lib/roles";
import { requireSession } from "@/lib/session";

const schema = z.object({
  topicId: z.string(),
  triggerType: z.enum(["weak-remediation", "high-mastery-refresh"]),
  conceptIds: z.array(z.string()).default([]),
});

function makeVariantPrompt(basePrompt: string, index: number) {
  return `${basePrompt} (Variant ${index + 1})`;
}

export async function POST(request: Request) {
  const sessionState = await requireSession();
  if ("error" in sessionState) return sessionState.error;
  if (!isParent(sessionState.session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const candidates = await prisma.questionBank.findMany({
    where: {
      topicId: parsed.data.topicId,
      active: true,
      needsReview: false,
      ...(parsed.data.conceptIds.length
        ? {
            conceptLinks: {
              some: {
                conceptId: {
                  in: parsed.data.conceptIds,
                },
              },
            },
          }
        : {}),
    },
    take: 3,
    include: { conceptLinks: true },
  });

  const generated = await prisma.$transaction(
    candidates.map((q, idx) =>
      prisma.questionBank.create({
        data: {
          topicId: q.topicId,
          prompt: makeVariantPrompt(q.prompt, idx),
          optionsJson: q.optionsJson as Prisma.InputJsonValue,
          correctIndex: q.correctIndex,
          explanation: q.explanation,
          difficultyLevel: q.difficultyLevel,
          source: "adaptive-generation",
          generatedByAi: true,
          needsReview: true,
          conceptLinks: {
            create: q.conceptLinks.map((x) => ({ conceptId: x.conceptId })),
          },
          generationEvents: {
            create: {
              triggerType: parsed.data.triggerType,
              triggerMeta: {
                basisQuestionId: q.id,
                conceptIds: parsed.data.conceptIds,
              },
            },
          },
        },
      }),
    ),
  );

  return NextResponse.json({ generated: generated.length });
}
