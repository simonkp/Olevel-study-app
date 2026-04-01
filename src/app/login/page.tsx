import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/app/login/login-form";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-4 px-6">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="text-zinc-600 dark:text-zinc-300">
        Use parent or child credentials to open the role-specific dashboard.
      </p>
      <LoginForm />
    </main>
  );
}
