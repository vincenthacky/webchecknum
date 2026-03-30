"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { profilService } from "@/features/profil/services/profil.service";
import { ROUTES } from "@/constants";
import { FlagIcon, VerifiedIcon, LogoutIcon } from "@/components/ui/Icons";
import { AuthLoading } from "@/components/shared/AuthGuard";

export default function ProfilPage() {
  const { user, isAuthenticated, hydrated, logout } = useAuth(true);
  const [ancien, setAncien] = useState("");
  const [nouveau, setNouveau] = useState("");
  const [confirmer, setConfirmer] = useState("");
  const [mdpLoading, setMdpLoading] = useState(false);
  const [mdpSuccess, setMdpSuccess] = useState("");
  const [mdpError, setMdpError] = useState("");

  if (!hydrated) return <AuthLoading />;
  if (!isAuthenticated || !user) return null;

  const handleChangerMdp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMdpError("");
    setMdpSuccess("");
    if (nouveau !== confirmer) { setMdpError("Les codes PIN ne correspondent pas."); return; }
    if (nouveau.length < 4) { setMdpError("Le PIN doit contenir au moins 4 chiffres."); return; }
    setMdpLoading(true);
    try {
      await profilService.changerMotDePasse({
        ...(user?.has_password ? { ancien } : {}),
        nouveau,
      });
      setMdpSuccess("Code PIN modifié avec succès !");
      setAncien(""); setNouveau(""); setConfirmer("");
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setMdpError(msg ?? "Erreur lors de la modification. Vérifiez votre ancien PIN.");
    } finally {
      setMdpLoading(false);
    }
  };


  const initiales = user.nom?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) ?? "?";

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 md:py-16">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">Mon profil</h1>

      {/* Card profil */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-extrabold flex-shrink-0">
            {initiales}
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{user.nom}</p>
            <p className="text-gray-500 text-sm mt-0.5">{user.num}</p>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
              {user.role}
            </span>
          </div>
        </div>

        {/* Liens rapides */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href={ROUTES.front.mesSignalements}
            className="flex flex-col items-center py-4 rounded-xl bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-colors text-center"
          >
            <FlagIcon size={24} color="#c2410c" />
            <span className="text-xs font-semibold text-orange-700">Mes signalements</span>
          </Link>
          <Link
            href={ROUTES.front.mesCertifications}
            className="flex flex-col items-center py-4 rounded-xl bg-green-50 border border-green-100 hover:bg-green-100 transition-colors text-center"
          >
            <VerifiedIcon size={24} color="#15803d" />
            <span className="text-xs font-semibold text-green-700">Mes certifications</span>
          </Link>
        </div>
      </div>

      {/* Changer PIN */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Changer le code PIN</h2>
        <form onSubmit={handleChangerMdp} className="flex flex-col gap-4">
          {user.has_password && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Ancien PIN</label>
              <input
                type="password"
                inputMode="numeric"
                placeholder="••••••"
                maxLength={6}
                value={ancien}
                onChange={(e) => setAncien(e.target.value)}
                required
                className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nouveau PIN</label>
            <input
              type="password"
              inputMode="numeric"
              placeholder="••••••"
              maxLength={6}
              value={nouveau}
              onChange={(e) => setNouveau(e.target.value)}
              required
              className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Confirmer le nouveau PIN</label>
            <input
              type="password"
              inputMode="numeric"
              placeholder="••••••"
              maxLength={6}
              value={confirmer}
              onChange={(e) => setConfirmer(e.target.value)}
              required
              className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>
          {mdpError && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{mdpError}</p>}
          {mdpSuccess && <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">{mdpSuccess}</p>}
          <button
            type="submit"
            disabled={mdpLoading}
            className="w-full min-h-[48px] py-3 rounded-xl bg-gray-800 text-white font-semibold text-sm hover:bg-gray-900 disabled:opacity-50 transition-colors"
          >
            {mdpLoading ? "Modification…" : "Modifier le PIN"}
          </button>
        </form>
      </div>

      {/* Déconnexion */}
      <button
        onClick={logout}
        className="w-full min-h-[48px] py-3 rounded-xl border-2 border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
      >
        <LogoutIcon size={18} /> Se déconnecter
      </button>
    </div>
  );
}
