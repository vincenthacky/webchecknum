"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createAdminAxios } from "@/lib/api/adminApi";
import { ROUTES } from "@/constants";
import type { AdminSoumission, AdminNumero } from "@/types/models.types";
import { ArrowLeft, Check, Trash2, ShieldCheck } from "lucide-react";

export default function CertificationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: session } = useSession();
  const token = (session as { accessToken?: string })?.accessToken ?? "";
  const api = useMemo(() => createAdminAxios(token), [token]);

  const [soumission, setSoumission] = useState<AdminSoumission | null>(null);
  const [numeros, setNumeros] = useState<AdminNumero[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<"approve" | "refuse" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    Promise.all([api.get("/soumissions"), api.get("/numeros")]).then(([sRes, nRes]) => {
      const list: AdminSoumission[] = sRes.data.data ?? [];
      const found = list.find((s) => String(s.id) === String(id));
      setSoumission(found ?? null);
      setNumeros(nRes.data.data ?? []);
    }).catch(() => {
      setError("Impossible de charger les données.");
    }).finally(() => setLoading(false));
  }, [token, id]); // eslint-disable-line

  const getNumeroId = (num: string) => numeros.find((n) => n.num === num)?.id;

  const approuver = async () => {
    if (!soumission) return;
    const numId = getNumeroId(soumission.num);
    if (!numId) { setError("Numéro introuvable."); return; }
    setActionLoading("approve");
    try {
      await api.put(`/numeros/${numId}`, { statut: "verifie" });
      setSoumission((prev) => prev ? { ...prev, statut_numero: "verifie" } : null);
    } catch {
      setError("Erreur lors de l'approbation.");
    } finally {
      setActionLoading(null);
    }
  };

  const refuser = async () => {
    if (!soumission) return;
    const numId = getNumeroId(soumission.num);
    if (!numId) { setError("Numéro introuvable."); return; }
    if (!confirm(`Refuser la certification pour ${soumission.num} ?`)) return;
    setActionLoading("refuse");
    try {
      await api.delete(`/numeros/${numId}`);
      router.push(ROUTES.back.certifications);
    } catch {
      setError("Erreur lors du refus.");
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 py-8 max-w-3xl mx-auto">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
        <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!soumission) {
    return (
      <div className="px-4 sm:px-6 py-8 max-w-3xl mx-auto text-center">
        <ShieldCheck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Certification introuvable.</p>
        <Link href={ROUTES.back.certifications} className="mt-4 inline-block text-green-600 font-semibold text-sm">
          ← Retour aux certifications
        </Link>
      </div>
    );
  }

  const statut = soumission.statut_numero;

  return (
    <div className="px-4 sm:px-6 py-8 max-w-3xl mx-auto">
      <Link
        href={ROUTES.back.certifications}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux certifications
      </Link>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Certification #{id}</h1>
          <p className="text-gray-500 text-sm mt-1">Demande de certification NumCheck</p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
          statut === "verifie" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
        }`}>
          {statut === "verifie" ? "✓ Certifié" : "⏳ En attente"}
        </span>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">{error}</p>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Numéro</p>
            <p className="text-xl font-extrabold text-gray-900">{soumission.num}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Demandé par</p>
            <p className="font-semibold text-gray-900">{soumission.utilisateur || "—"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Date de soumission</p>
            <p className="text-sm text-gray-700">
              {new Date(soumission.date_de_soumission).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Fiabilité actuelle</p>
            <span className="inline-block bg-green-50 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
              {soumission.fiabilite}
            </span>
          </div>
        </div>
      </div>

      {statut === "en_attente" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 mb-4">Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={approuver}
              disabled={actionLoading !== null}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {actionLoading === "approve" ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : <Check className="h-4 w-4" />}
              Approuver la certification
            </button>
            <button
              onClick={refuser}
              disabled={actionLoading !== null}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              {actionLoading === "refuse" ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : <Trash2 className="h-4 w-4" />}
              Refuser
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Refuser supprime la demande. L&apos;utilisateur peut soumettre à nouveau.
          </p>
        </div>
      )}

      {statut === "verifie" && (
        <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
            <p className="text-sm font-semibold text-green-800">Ce numéro est certifié NumCheck.</p>
          </div>
        </div>
      )}
    </div>
  );
}
