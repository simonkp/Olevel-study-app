import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { isParent } from "@/lib/roles";
import { requireSession } from "@/lib/session";

const bodySchema = z.object({
  redemptionId: z.string(),
  action: z.enum(["APPROVE", "REJECT"]),
});

export async function POST(request: Request) {
  const sessionState = await requireSession();
  if ("error" in sessionState) return sessionState.error;
  if (!isParent(sessionState.session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const redemption = await prisma.rewardRedemption.findUnique({
    where: { id: parsed.data.redemptionId },
    include: { reward: true, childProfile: true },
  });
  if (!redemption) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (redemption.status !== "PENDING") {
    return NextResponse.json({ error: "Already resolved" }, { status: 400 });
  }

  const approving = parsed.data.action === "APPROVE";
  const updated = await prisma.rewardRedemption.update({
    where: { id: redemption.id },
    data: {
      status: approving ? "APPROVED" : "REJECTED",
      resolvedAt: new Date(),
    },
  });

  if (approving) {
    await prisma.childProfile.update({
      where: { id: redemption.childProfileId },
      data: { xp: { decrement: redemption.reward.xpCost } },
    });
  }

  return NextResponse.json(updated);
}
