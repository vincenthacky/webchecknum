"use client";

import { useSession } from "next-auth/react";

export function Header({ title }: { title?: string }) {
  const { data: session } = useSession();

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-6 shrink-0">
      <h1 className="font-semibold text-gray-700">{title ?? "Dashboard"}</h1>
      {session?.user && (
        <span className="text-sm text-gray-500">{session.user.name}</span>
      )}
    </header>
  );
}
