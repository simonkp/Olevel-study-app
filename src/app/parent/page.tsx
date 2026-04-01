import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ParentDashboard } from "@/app/parent/parent-dashboard";
import { SignOutButton } from "@/components/signout-button";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ParentPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  if (session.user.role !== "PARENT") redirect("/child");

  const parent = await prisma.parentProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      children: {
        include: {
          user: true,
          masteryStates: true,
          attempts: { take: 50, orderBy: { createdAt: "desc" } },
          rewardRequests: {
            where: { status: "PENDING" },
            include: { reward: true },
            orderBy: { requestedAt: "desc" },
          },
        },
      },
    },
  });
  if (!parent) redirect("/login");

  const children = parent.children.map((child) => {
    const total = child.attempts.length;
    const correct = child.attempts.filter((x) => x.correct).length;
    return {
      childId: child.id,
      name: child.user.name || child.user.email || "Child",
      xp: child.xp,
      streakDays: child.streakDays,
      accuracyPct: total ? Math.round((correct / total) * 100) : 0,
      farmingRiskPct: total
        ? Math.round(((total - new Set(child.attempts.map((x) => x.questionId)).size) / total) * 100)
        : 0,
      weakMasteryCount: child.masteryStates.filter((x) => x.masteryScore < 55).length,
      pendingRewards: child.rewardRequests,
    };
  });

  const pendingQuestions = await prisma.questionBank.findMany({
    where: { needsReview: true, active: true },
    include: { topic: true },
    orderBy: { createdAt: "desc" },
    take: 40,
  });

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Parent Dashboard</h1>
          <p className="text-sm text-zinc-500">{session.user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/child" className="text-sm underline">
            Child view
          </Link>
          <SignOutButton />
        </div>
      </div>
      <ParentDashboard childRows={children} pendingQuestions={pendingQuestions} />
    </main>
  );
}
