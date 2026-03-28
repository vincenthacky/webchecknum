"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { certificationService } from "@/features/certifications/services/certification.service";
import type { Soumission } from "@/types/models.types";
import { ROUTES } from "@/constants";
import { BadgeIcon } from "@/components/ui/Icons";

function StatutBadge({ statut }: { statut: Soumission["statut_numero"] }) {
  const config = {
    verifie: { cls: "bg-green-100 text-green-700", label: "✓ Certifié" },
    rejete: { cls: "bg-red-100 text-red-700", label: "✗ Rejeté" },
    en_attente: { cls: "bg-yellow-100 text-yellow-700", label: "⏳ En attente" },
  };
  const c = config[statut] ?? config.en_attente;
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c.cls}`}>{c.label}</span>;
}

export default function MesCertificationsPage() {
  useAuth(true);
  const [soumissions, setSoumissions] = useState<Soumission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    certificationService.mesSoumissions()
      .then(setSoumissions)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Mes certifications</h1>
          <p className="text-gray-500 text-sm mt-1">Statut de vos demandes de certification</p>
        </div>
        <Link
          href={ROUTES.front.certifier}
          className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors whitespace-nowrap"
        >
          + Nouveau
        </Link>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      )}

      {!loading && soumissions.length === 0 && (
        <div className="text-center py-16">
          <div className="mb-4"><BadgeIcon size={52} color="#d1d5db" /></div>
          <p className="text-gray-500 text-sm">Aucune demande de certification pour l&apos;instant.</p>
          <Link
            href={ROUTES.front.certifier}
            className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            Demander une certification
          </Link>
        </div>
      )}

      {!loading && soumissions.length > 0 && (
        <div className="space-y-3">
          {soumissions.map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-gray-900">{s.num}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Soumis le {new Date(s.date_de_soumission).toLocaleDateString("fr-FR")}
                  </p>
                  {s.fiabilite && (
                    <p className="text-xs text-gray-500 mt-0.5">Fiabilité : {s.fiabilite}</p>
                  )}
                </div>
                <StatutBadge statut={s.statut_numero} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
