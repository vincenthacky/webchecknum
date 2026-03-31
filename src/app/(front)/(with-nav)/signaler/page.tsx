"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { signalementService } from "@/features/signalements/services/signalement.service";
import type { Categorie, Canal } from "@/types/models.types";
import { ROUTES } from "@/constants";
import { CheckCircleIcon, FlagIcon } from "@/components/ui/Icons";
import { AuthLoading } from "@/components/shared/AuthGuard";
import { AndroidGuard } from "@/components/shared/AndroidGuard";

/* ── Select stylé avec chevron custom ───────────────────────────────────────── */
function StyledSelect({
  value,
  onChange,
  placeholder,
  options,
  disabled,
  accentColor = "orange",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { id: number; libelle: string }[];
  disabled?: boolean;
  accentColor?: "orange" | "gray";
}) {
  const ring =
    accentColor === "orange"
      ? "focus:ring-orange-400"
      : "focus:ring-gray-400";
  const selected = value !== "";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        size={1}
        className={`w-full appearance-none text-base px-4 py-3 pr-10 rounded-xl border bg-white
          focus:outline-none focus:ring-2 focus:border-transparent transition-shadow
          disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
          ${ring}
          ${selected ? "text-gray-900 border-gray-300" : "text-gray-400 border-gray-200"}
        `}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.id} value={String(opt.id)}>
            {opt.libelle}
          </option>
        ))}
      </select>
      {/* Chevron */}
      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

/* ── Skeleton select ─────────────────────────────────────────────────────────── */
function SelectSkeleton() {
  return <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />;
}

/* ── Page principale ─────────────────────────────────────────────────────────── */
function SignalerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, hydrated } = useAuth(true);

  const [num, setNum] = useState(searchParams.get("num") ?? "");
  const [description, setDescription] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState<string>("");
  const [selectedCanal, setSelectedCanal] = useState<string>("");
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [canaux, setCanaux] = useState<Canal[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !hydrated) return;
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
        id_canal: Number(selectedCanal),
        id_categorie: Number(selectedCategorie),
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
        <div className="mb-4"><CheckCircleIcon size={52} color="#22C55E" /></div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Signalement envoyé !</h2>
        <p className="text-gray-500 text-sm">Merci. Votre signalement aide la communauté.</p>
      </div>
    );
  }

  if (!hydrated) return <AuthLoading />;

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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Numéro à signaler *
            </label>
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

          {/* Catégorie — select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Catégorie de l&apos;arnaque *
            </label>
            {loadingConfig ? (
              <SelectSkeleton />
            ) : (
              <StyledSelect
                value={selectedCategorie}
                onChange={setSelectedCategorie}
                placeholder="— Choisir une catégorie —"
                options={categories}
                accentColor="orange"
              />
            )}
          </div>

          {/* Canal — select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Canal de l&apos;arnaque *
            </label>
            {loadingConfig ? (
              <SelectSkeleton />
            ) : (
              <StyledSelect
                value={selectedCanal}
                onChange={setSelectedCanal}
                placeholder="— Choisir un canal —"
                options={canaux}
                accentColor="gray"
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
              <span className="text-xs font-normal text-gray-400 ml-2">
                ({description.length}/20 min)
              </span>
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

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || loadingConfig}
            className="w-full min-h-[52px] py-3 rounded-xl bg-orange-500 text-white font-semibold text-base hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Envoi en cours…" : (
              <span className="flex items-center justify-center gap-2">
                <FlagIcon size={16} color="#fff" /> Envoyer le signalement
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function SignalerPage() {
  return (
    <AndroidGuard>
      <Suspense fallback={<div className="flex justify-center py-20 text-gray-400">Chargement…</div>}>
        <SignalerContent />
      </Suspense>
    </AndroidGuard>
  );
}
