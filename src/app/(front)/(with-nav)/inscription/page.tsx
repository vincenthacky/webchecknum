"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { AndroidGuard } from "@/components/shared/AndroidGuard";

function InscriptionContent() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`${ROUTES.front.connexion}?tab=inscription`);
  }, [router]);
  return null;
}

export default function InscriptionPage() {
  return <AndroidGuard><InscriptionContent /></AndroidGuard>;
}
