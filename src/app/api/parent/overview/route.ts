import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { isParent } from "@/lib/roles";
import { requireSession } from "@/lib/session";

export async function GET() {
  const sessionState = await requireSession();
  if ("error" in sessionState) return sessionState.error;
  if (!isParent(sessionState.session.user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parent = await prisma.parentProfile.findUnique({
    where: { userId: sessionState.session.user.id },
    include: {
      children: {
        include: {
          user: true,
          masteryStates: true,
          attempts: {
            take: 50,
            orderBy: { createdAt: "desc" },
          },
          rewardRequests: {
            where: { status: "PENDING" },
            include: { reward: true },
            orderBy: { requestedAt: "desc" },
          },
        },
      },
    },
  });
  if (!parent) return NextResponse.json({ error: "Parent profile missing" }, { status: 404 });

  const children = parent.children.map((child) => {
    const totalAttempts = child.attempts.length;
    const correctCount = child.attempts.filter((x) => x.correct).length;
    const farmingRisk =
      totalAttempts > 0
        ? Math.round(((totalAttempts - new Set(child.attempts.map((x) => x.questionId)).size) / totalAttempts) * 100)
        : 0;
    return {
      childId: child.id,
      name: child.user.name || child.user.email,
      xp: child.xp,
      streakDays: child.streakDays,
      accuracyPct: totalAttempts ? Math.round((correctCount / totalAttempts) * 100) : 0,
      farmingRiskPct: Math.max(0, farmingRisk),
      weakMasteryCount: child.masteryStates.filter((x) => x.masteryScore < 55).length,
      pendingRewards: child.rewardRequests,
    };
  });

  return NextResponse.json({ children });
}
