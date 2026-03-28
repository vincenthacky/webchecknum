"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { signalementService } from "@/features/signalements/services/signalement.service";
import type { Categorie, Canal } from "@/types/models.types";
import { ROUTES } from "@/constants";

function SignalerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth(true); // protégée

  const [num, setNum] = useState(searchParams.get("num") ?? "");
  const [description, setDescription] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState<number | null>(null);
  const [selectedCanal, setSelectedCanal] = useState<number | null>(null);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [canaux, setCanaux] = useState<Canal[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    const load = async () => {
      try {
        const [cats, cans] = await Promise.all([
          signalementService.getCategories(),
          signalementService.getCanaux(),
        ]);
        setCategories(cats);
        setCanaux(cans);
      } catch {
        setError("Impossible de charger les options.");
      } finally {
        setLoadingConfig(false);
      }
    };
    load();
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!selectedCategorie) { setError("Veuillez choisir une catégorie."); return; }
    if (!selectedCanal) { setError("Veuillez choisir un canal."); return; }
    if (description.trim().length < 20) { setError("La description doit contenir au moins 20 caractères."); return; }

    setLoading(true);
    try {
      await signalementService.publier({
        num: num.replace(/\s/g, ""),
        description: description.trim(),
        id_canal: selectedCanal,
        id_categorie: selectedCategorie,
      });
      setSuccess(true);
      setTimeout(() => router.push(ROUTES.front.mesSignalements), 1800);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg ?? "Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Signalement envoyé !</h2>
        <p className="text-gray-500 text-sm">Merci. Votre signalement aide la communauté.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Signaler un arnaqueur</h1>
        <p className="text-gray-500 text-sm">Votre signalement protège toute la communauté NumCheck.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Numéro */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Numéro à signaler *</label>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Ex : 07 12 34 56"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              required
              className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>

          {/* Catégories */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Catégorie *</label>
            {loadingConfig ? (
              <div className="flex flex-wrap gap-2">
                {[1,2,3,4].map(i => <div key={i} className="h-9 w-28 bg-gray-100 rounded-full animate-pulse" />)}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategorie(cat.id === selectedCategorie ? null : cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      selectedCategorie === cat.id
                        ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600"
                    }`}
                  >
                    {cat.libelle}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Canaux */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Canal de l&apos;arnaque *</label>
            {loadingConfig ? (
              <div className="flex flex-wrap gap-2">
                {[1,2,3].map(i => <div key={i} className="h-9 w-24 bg-gray-100 rounded-full animate-pulse" />)}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {canaux.map((canal) => (
                  <button
                    key={canal.id}
                    type="button"
                    onClick={() => setSelectedCanal(canal.id === selectedCanal ? null : canal.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      selectedCanal === canal.id
                        ? "bg-gray-800 text-white border-gray-800 shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-800"
                    }`}
                  >
                    {canal.libelle}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
              <span className="text-xs font-normal text-gray-400 ml-2">({description.length}/20 min)</span>
            </label>
            <textarea
              placeholder="Décrivez l'arnaque : comment ça s'est passé, ce qui vous a alerté…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading || loadingConfig}
            className="w-full min-h-[52px] py-3 rounded-xl bg-orange-500 text-white font-semibold text-base hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Envoi en cours…" : "🚨 Envoyer le signalement"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function SignalerPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20 text-gray-400">Chargement…</div>}>
      <SignalerContent />
    </Suspense>
  );
}
