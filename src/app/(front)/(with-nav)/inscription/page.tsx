"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

export default function InscriptionPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`${ROUTES.front.connexion}?tab=inscription`);
  }, [router]);
  return null;
}
