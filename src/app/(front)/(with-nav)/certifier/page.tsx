"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { certificationService } from "@/features/certifications/services/certification.service";
import type { Soumission } from "@/types/models.types";
import { VerifiedIcon, InboxEmptyIcon } from "@/components/ui/Icons";

function StatutBadge({ statut }: { statut: Soumission["statut_numero"] }) {
  if (statut === "verifie") {
    return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">✓ Certifié</span>;
  }
  if (statut === "rejete") {
    return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">✗ Rejeté</span>;
  }
  return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">⏳ En attente</span>;
}

export default function CertifierPage() {
  useAuth(true);
  const [num, setNum] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [soumissions, setSoumissions] = useState<Soumission[]>([]);
  const [loadingSoumissions, setLoadingSoumissions] = useState(true);

  const loadSoumissions = async () => {
    try {
      const data = await certificationService.mesSoumissions();
      setSoumissions(data);
    } catch {
      // silencieux
    } finally {
      setLoadingSoumissions(false);
    }
  };

  useEffect(() => { loadSoumissions(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await certificationService.soumettre(num.replace(/\s/g, ""));
      setSuccess("Demande de certification soumise avec succès !");
      setNum("");
      loadSoumissions();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg ?? "Une erreur est survenue. Ce numéro a peut-être déjà été soumis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Certification NumCheck</h1>
        <p className="text-gray-500 text-sm">Obtenez le badge de confiance pour votre numéro de commerçant.</p>
      </div>

      {/* Explication */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-8">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5"><VerifiedIcon size={24} color="#16a34a" /></div>
          <div>
            <p className="font-semibold text-green-800 mb-1">Le badge Certifié NumCheck</p>
            <p className="text-sm text-green-700">
              Vos clients peuvent vérifier votre numéro et voir qu&apos;il est certifié comme digne de confiance.
              La certification est accordée après vérification de notre équipe.
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Soumettre un numéro</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Numéro à certifier"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            required
            className="flex-1 text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading || !num.trim()}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {loading ? "Envoi…" : "Soumettre"}
          </button>
        </form>
        {success && <p className="mt-3 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">{success}</p>}
        {error && <p className="mt-3 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
      </div>

      {/* Mes soumissions */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Mes certifications</h2>
        {loadingSoumissions ? (
          <div className="space-y-3">
            {[1,2].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : soumissions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="mb-3"><InboxEmptyIcon size={44} color="#d1d5db" /></div>
            <p className="text-sm">Aucune certification soumise pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {soumissions.map((s) => (
              <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">{s.num}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Soumis le {new Date(s.date_de_soumission).toLocaleDateString("fr-FR")}
                  </p>
                  {s.fiabilite && <p className="text-xs text-gray-500 mt-0.5">Fiabilité : {s.fiabilite}</p>}
                </div>
                <StatutBadge statut={s.statut_numero} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
