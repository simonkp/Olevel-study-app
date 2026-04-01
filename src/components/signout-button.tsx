"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-md border border-zinc-300 px-3 py-1 text-sm dark:border-zinc-700"
    >
      Sign out
    </button>
  );
}
