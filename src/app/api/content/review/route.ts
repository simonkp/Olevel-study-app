import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { isParent } from "@/lib/roles";
import { requireSession } from "@/lib/session";

const reviewSchema = z.object({
  questionId: z.string(),
  action: z.enum(["approve", "reject"]),
});

export async function GET() {
  const sessionState = await requireSession();
  if ("error" in sessionState) return sessionState.error;
  if (!isParent(sessionState.session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const pending = await prisma.questionBank.findMany({
    where: { needsReview: true, active: true },
    take: 100,
    orderBy: { createdAt: "desc" },
    include: { topic: true },
  });
  return NextResponse.json({ pending });
}

export async function POST(request: Request) {
  const sessionState = await requireSession();
  if ("error" in sessionState) return sessionState.error;
  if (!isParent(sessionState.session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = reviewSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const updated = await prisma.questionBank.update({
    where: { id: parsed.data.questionId },
    data:
      parsed.data.action === "approve"
        ? { needsReview: false }
        : { active: false, needsReview: false },
  });

  return NextResponse.json(updated);
}
