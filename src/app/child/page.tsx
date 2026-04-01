import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ChildDashboard } from "@/app/child/child-dashboard";
import { SignOutButton } from "@/components/signout-button";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ChildPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  if (session.user.role !== "CHILD") redirect("/parent");

  const child = await prisma.childProfile.findUnique({
    where: { userId: session.user.id },
  });
  if (!child) redirect("/login");

  const topics = await prisma.topic.findMany({
    orderBy: [{ subject: { title: "asc" } }, { orderIndex: "asc" }],
    select: { id: true, title: true },
  });
  const rewards = await prisma.rewardCatalog.findMany({
    where: { active: true },
    orderBy: { xpCost: "asc" },
    select: { id: true, label: true, xpCost: true },
  });

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Child Dashboard</h1>
          <p className="text-sm text-zinc-500">{session.user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/parent" className="text-sm underline">
            Parent view
          </Link>
          <SignOutButton />
        </div>
      </div>
      <ChildDashboard topics={topics} rewards={rewards} xp={child.xp} />
    </main>
  );
}
