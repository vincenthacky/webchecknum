"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants";
import { PersonIcon, LogoutIcon } from "@/components/ui/Icons";
import { AndroidGuard } from "@/components/shared/AndroidGuard";

type Tab = "connexion" | "inscription";

function ConnexionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register } = useAuth();
  const [tab, setTab] = useState<Tab>(
    searchParams.get("tab") === "inscription" ? "inscription" : "connexion"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login form
  const [loginNum, setLoginNum] = useState("");
  const [loginPin, setLoginPin] = useState("");

  // Register form
  const [regNom, setRegNom] = useState("");
  const [regNum, setRegNum] = useState("");
  const [regPin, setRegPin] = useState("");
  const [regPinConfirm, setRegPinConfirm] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(loginNum.replace(/\s/g, ""), loginPin);
      router.push(ROUTES.front.profil);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg ?? "Numéro ou code PIN incorrect.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (regPin !== regPinConfirm) {
      setError("Les codes PIN ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      await register(regNom, regNum.replace(/\s/g, ""), regPin);
      router.push(ROUTES.front.profil);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg ?? "Une erreur est survenue. Vérifiez vos informations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-16 h-10 mb-3">
            <Image src="/images/logo.png" alt="NumCheck" fill sizes="64px" style={{ objectFit: "contain" }} unoptimized />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">NumCheck</h1>
          <p className="text-sm text-gray-400 mt-1">Protégez-vous contre les arnaques</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Toggle pilule */}
          <div className="flex bg-gray-100 rounded-full p-1 mx-4 mt-5">
            {(["inscription", "connexion"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-semibold transition-all ${
                  tab === t
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t === "inscription" ? (
                  <PersonIcon size={16} color={tab === t ? "white" : "#6B7280"} />
                ) : (
                  <LogoutIcon size={16} color={tab === t ? "white" : "#6B7280"} />
                )}
                {t === "connexion" ? "Se connecter" : "S'inscrire"}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Login form */}
            {tab === "connexion" && (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Numéro de téléphone</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="07 12 34 56"
                    value={loginNum}
                    onChange={(e) => setLoginNum(e.target.value)}
                    required
                    className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Code PIN</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    placeholder="••••••"
                    maxLength={6}
                    value={loginPin}
                    onChange={(e) => setLoginPin(e.target.value)}
                    required
                    className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-[48px] py-3 rounded-xl bg-orange-500 text-white font-semibold text-base hover:bg-orange-600 disabled:opacity-50 transition-colors mt-1"
                >
                  {loading ? "Connexion…" : "Se connecter"}
                </button>
              </form>
            )}

            {/* Register form */}
            {tab === "inscription" && (
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nom complet</label>
                  <input
                    type="text"
                    placeholder="Ex : Koné Moussa"
                    value={regNom}
                    onChange={(e) => setRegNom(e.target.value)}
                    required
                    className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Numéro de téléphone</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="07 12 34 56"
                    value={regNum}
                    onChange={(e) => setRegNum(e.target.value)}
                    required
                    className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Code PIN</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    placeholder="••••••"
                    maxLength={6}
                    value={regPin}
                    onChange={(e) => setRegPin(e.target.value)}
                    required
                    className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Confirmer le PIN</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    placeholder="••••••"
                    maxLength={6}
                    value={regPinConfirm}
                    onChange={(e) => setRegPinConfirm(e.target.value)}
                    required
                    className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-[48px] py-3 rounded-xl bg-orange-500 text-white font-semibold text-base hover:bg-orange-600 disabled:opacity-50 transition-colors mt-1"
                >
                  {loading ? "Création…" : "Créer mon compte"}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          En continuant, vous acceptez les{" "}
          <Link href="#" className="text-orange-500 hover:underline">conditions d&apos;utilisation</Link>
          {" "}de NumCheck.
        </p>
      </div>
    </div>
  );
}

export default function ConnexionPage() {
  return (
    <AndroidGuard>
      <Suspense fallback={<div className="flex justify-center py-20 text-gray-400">Chargement…</div>}>
        <ConnexionContent />
      </Suspense>
    </AndroidGuard>
  );
}
