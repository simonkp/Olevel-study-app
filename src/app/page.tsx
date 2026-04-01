import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user.role === "CHILD") redirect("/child");
  if (session?.user.role === "PARENT") redirect("/parent");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-6 px-6">
      <h1 className="text-3xl font-bold">LevelUp Study Platform</h1>
      <p className="text-zinc-600 dark:text-zinc-300">
        Mastery-first learning platform with adaptive quizzes, anti-farming XP, parent approvals, and cached AI explanations.
      </p>
      <Link
        href="/login"
        className="w-fit rounded-md bg-zinc-900 px-4 py-2 text-white dark:bg-white dark:text-black"
      >
        Sign in
      </Link>
      <p className="text-sm text-zinc-500">
        Seed account defaults after running the seed script:
        <br />
        parent@levelup.local / ChangeMe123!
      </p>
    </main>
  );
}
