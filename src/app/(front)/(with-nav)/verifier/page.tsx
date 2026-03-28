"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { numeroService } from "@/features/numeros/services/numero.service";
import type { NumeroResult } from "@/types/models.types";
import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import {
  SearchIcon, FlagIcon, ShieldIcon, CheckCircleIcon,
  WarningIcon, ClockIcon, HelpCircleIcon, ReportIcon,
} from "@/components/ui/Icons";

function EtatBadge({ etat }: { etat: NumeroResult["etat"] }) {
  const config = {
    inconnu: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200", label: "Aucun signalement", Icon: HelpCircleIcon },
    arnaqueur_verifie: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "ARNAQUEUR CONFIRMÉ", Icon: ReportIcon },
    arnaqueur_en_attente: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", label: "Signalements en cours", Icon: WarningIcon },
    certifie_verifie: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", label: "CERTIFIÉ NumCheck", Icon: CheckCircleIcon },
    certifie_en_attente: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", label: "Certification en cours", Icon: ClockIcon },
  };
  const c = config[etat];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${c.bg} ${c.text} ${c.border}`}>
      <c.Icon size={14} /> {c.label}
    </span>
  );
}

function ResultCard({ result, searchedNum }: { result: NumeroResult; searchedNum: string }) {
  const cardColor = {
    inconnu: "border-gray-200",
    arnaqueur_verifie: "border-red-300",
    arnaqueur_en_attente: "border-orange-300",
    certifie_verifie: "border-green-300",
    certifie_en_attente: "border-blue-300",
  }[result.etat];

  return (
    <div className={`bg-white rounded-2xl border-2 ${cardColor} shadow-sm overflow-hidden`}>
      <div className="p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Numéro analysé</p>
            <p className="text-xl font-bold text-gray-900">{result.num}</p>
          </div>
          <EtatBadge etat={result.etat} />
        </div>
        <p className="text-sm text-gray-600 mb-4">{result.message}</p>
        {result.totalSignalements > 0 && (
          <p className="text-sm font-semibold text-gray-700 mb-3">
            {result.totalSignalements} signalement{result.totalSignalements > 1 ? "s" : ""} enregistré{result.totalSignalements > 1 ? "s" : ""}
          </p>
        )}

        {/* Liste des signalements */}
        {result.arnaques.length > 0 && (
          <div className="mt-4 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Détails des signalements</p>
            {result.arnaques.map((a) => (
              <div key={a.id} className="bg-red-50 rounded-xl p-3 border border-red-100">
                <div className="flex flex-wrap gap-2 mb-2">
                  {a.categorie && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">{a.categorie}</span>
                  )}
                  {a.canal && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">{a.canal}</span>
                  )}
                </div>
                <p className="text-sm text-gray-700">{a.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA Signaler */}
        {(result.etat === "inconnu" || result.etat === "arnaqueur_en_attente") && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              href={`${ROUTES.front.signaler}?num=${encodeURIComponent(searchedNum)}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
            >
              <FlagIcon size={16} color="#fff" /> Signaler ce numéro
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function VerifierContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useAuth(true);
  const [numero, setNumero] = useState(searchParams.get("num") ?? "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NumeroResult | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (num: string) => {
    const cleaned = num.replace(/\s/g, "");
    if (!cleaned) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await numeroService.rechercher(cleaned);
      setResult(data);
      router.replace(`${ROUTES.front.verifier}?num=${encodeURIComponent(cleaned)}`, { scroll: false });
    } catch {
      setError("Une erreur est survenue. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-search if num in URL
  useEffect(() => {
    const num = searchParams.get("num");
    if (num) handleSearch(num);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 md:py-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2">
          Vérifier un numéro
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Entrez un numéro ivoirien pour savoir s&apos;il est signalé comme arnaqueur.
        </p>
      </div>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Ex : 07 12 34 56 ou +225 07 12 34 56"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(numero)}
          className="flex-1 text-base px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white shadow-sm"
        />
        <button
          onClick={() => handleSearch(numero)}
          disabled={loading || !numero.trim()}
          className="min-h-[52px] px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold text-base hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm whitespace-nowrap"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Analyse…
            </span>
          ) : "Vérifier"}
        </button>
      </div>

      {/* Skeleton */}
      {loading && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
          <div className="h-7 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>
      )}

      {/* Result */}
      {result && !loading && <ResultCard result={result} searchedNum={numero} />}

      {/* Tips */}
      {!result && !loading && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { Icon: SearchIcon, iconColor: "#F97316", title: "Recherche rapide", desc: "Résultat en quelques secondes" },
            { Icon: ShieldIcon, iconColor: "#22C55E", title: "Données fiables", desc: "Vérifiées par la communauté" },
            { Icon: CheckCircleIcon, iconColor: "#3B82F6", title: "Gratuit", desc: "Toujours sans frais" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="mb-2"><item.Icon size={28} color={item.iconColor} /></div>
              <p className="text-sm font-semibold text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function VerifierPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20 text-gray-400">Chargement…</div>}>
      <VerifierContent />
    </Suspense>
  );
}
