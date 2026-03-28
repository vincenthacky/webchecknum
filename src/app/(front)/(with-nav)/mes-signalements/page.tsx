"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { signalementService } from "@/features/signalements/services/signalement.service";
import type { MonSignalement } from "@/types/models.types";
import { ROUTES } from "@/constants";
import { InboxEmptyIcon } from "@/components/ui/Icons";

function StatutBadge({ statut }: { statut: MonSignalement["statut"] }) {
  const config = {
    valide: { cls: "bg-green-100 text-green-700", label: "✓ Validé" },
    rejete: { cls: "bg-red-100 text-red-700", label: "✗ Rejeté" },
    en_attente: { cls: "bg-yellow-100 text-yellow-700", label: "⏳ En attente" },
  };
  const c = config[statut] ?? config.en_attente;
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c.cls}`}>{c.label}</span>
  );
}

export default function MesSignalementsPage() {
  useAuth(true);
  const [signalements, setSignalements] = useState<MonSignalement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    signalementService.mesSignalements()
      .then(setSignalements)
      .catch(() => setError("Impossible de charger vos signalements."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Mes signalements</h1>
          <p className="text-gray-500 text-sm mt-1">Historique de vos signalements</p>
        </div>
        <Link
          href={ROUTES.front.signaler}
          className="px-4 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap"
        >
          + Nouveau
        </Link>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      )}

      {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

      {!loading && !error && signalements.length === 0 && (
        <div className="text-center py-16">
          <div className="mb-4"><InboxEmptyIcon size={52} color="#d1d5db" /></div>
          <p className="text-gray-500 text-sm">Vous n&apos;avez encore fait aucun signalement.</p>
          <Link
            href={ROUTES.front.signaler}
            className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            Signaler maintenant
          </Link>
        </div>
      )}

      {!loading && signalements.length > 0 && (
        <div className="space-y-3">
          {signalements.map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-base">{s.num}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {s.categorie && (
                      <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">{s.categorie}</span>
                    )}
                    {s.canal && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s.canal}</span>
                    )}
                  </div>
                  {s.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{s.description}</p>
                  )}
                </div>
                <StatutBadge statut={s.statut} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
