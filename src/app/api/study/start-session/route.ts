import { NextResponse } from "next/server";
import { z } from "zod";

import { isChild } from "@/lib/roles";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  topicId: z.string().optional(),
  mode: z.enum(["PRACTICE", "SCORED"]).default("SCORED"),
});

export async function POST(request: Request) {
  const sessionState = await requireSession();
  if ("error" in sessionState) return sessionState.error;
  if (!isChild(sessionState.session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const child = await prisma.childProfile.findUnique({
    where: { userId: sessionState.session.user.id },
  });
  if (!child) return NextResponse.json({ error: "Child profile missing" }, { status: 404 });

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const studySession = await prisma.studySession.create({
    data: {
      childProfileId: child.id,
      topicId: parsed.data.topicId,
      mode: parsed.data.mode,
    },
  });

  return NextResponse.json({ sessionId: studySession.id });
}
