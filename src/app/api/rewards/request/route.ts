import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { isChild } from "@/lib/roles";
import { requireSession } from "@/lib/session";

const bodySchema = z.object({
  rewardId: z.string(),
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

  const reward = await prisma.rewardCatalog.findUnique({
    where: { id: parsed.data.rewardId },
  });
  if (!reward || !reward.active) return NextResponse.json({ error: "Reward unavailable" }, { status: 404 });
  if (child.xp < reward.xpCost) return NextResponse.json({ error: "Not enough XP" }, { status: 400 });

  const redemption = await prisma.rewardRedemption.create({
    data: {
      childProfileId: child.id,
      rewardId: reward.id,
      status: "PENDING",
    },
  });

  return NextResponse.json(redemption);
}
