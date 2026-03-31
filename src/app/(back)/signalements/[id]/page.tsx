"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createAdminAxios } from "@/lib/api/adminApi";
import { ROUTES } from "@/constants";
import type { AdminArnaque } from "@/types/models.types";
import { ArrowLeft, Check, X, Trash2, AlertTriangle } from "lucide-react";

function StatutBadge({ statut }: { statut: AdminArnaque["statut"] }) {
  const cfg = {
    en_attente: { cls: "bg-yellow-100 text-yellow-700", label: "⏳ En attente" },
    valide: { cls: "bg-green-100 text-green-700", label: "✓ Validé" },
    rejete: { cls: "bg-red-100 text-red-700", label: "✗ Rejeté" },
  };
  const c = cfg[statut] ?? cfg.en_attente;
  return <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${c.cls}`}>{c.label}</span>;
}

export default function SignalementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: session } = useSession();
  const token = (session as { accessToken?: string })?.accessToken ?? "";
  const api = useMemo(() => createAdminAxios(token), [token]);

  const [arnaque, setArnaque] = useState<AdminArnaque | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<"valide" | "rejete" | "en_attente" | "delete" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    api.get("/arnaques").then((res) => {
      const list: AdminArnaque[] = res.data.data ?? [];
      const found = list.find((a) => String(a.id) === String(id));
      setArnaque(found ?? null);
    }).catch(() => {
      setError("Impossible de charger le signalement.");
    }).finally(() => setLoading(false));
  }, [token, id]); // eslint-disable-line

  const updateStatut = async (statut: "valide" | "rejete" | "en_attente") => {
    setActionLoading(statut);
    setError("");
    try {
      await api.put(`/arnaques/${id}/statut`, { statut });
      setArnaque((prev) => prev ? { ...prev, statut } : null);
    } catch {
      setError("Erreur lors de la mise à jour.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer définitivement ce signalement ?")) return;
    setActionLoading("delete");
    try {
      await api.delete(`/arnaques/${id}`);
      router.push(ROUTES.back.signalements);
    } catch {
      setError("Erreur lors de la suppression.");
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

  if (!arnaque) {
    return (
      <div className="px-4 sm:px-6 py-8 max-w-3xl mx-auto text-center">
        <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Signalement introuvable.</p>
        <Link href={ROUTES.back.signalements} className="mt-4 inline-block text-orange-500 font-semibold text-sm">
          ← Retour aux signalements
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-8 max-w-3xl mx-auto">
      {/* Back */}
      <Link
        href={ROUTES.back.signalements}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux signalements
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Signalement #{id}</h1>
          <p className="text-gray-500 text-sm mt-1">Détail du signalement</p>
        </div>
        <StatutBadge statut={arnaque.statut} />
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">{error}</p>
      )}

      {/* Info card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Numéro signalé</p>
            <p className="text-xl font-extrabold text-gray-900">{arnaque.num}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Plaignant</p>
            <p className="font-semibold text-gray-900">{arnaque.plaignant || "—"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Catégorie</p>
            <span className="inline-block bg-orange-50 text-orange-700 text-sm font-semibold px-3 py-1 rounded-full">
              {arnaque.categorie || "—"}
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Canal</p>
            <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
              {arnaque.canal || "—"}
            </span>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-gray-50">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Description</p>
          <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl px-4 py-3">
            {arnaque.description || "Aucune description fournie."}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-bold text-gray-900 mb-4">Actions</h2>
        <div className="flex flex-wrap gap-3">
          {arnaque.statut === "en_attente" && (
            <>
              <button
                onClick={() => updateStatut("valide")}
                disabled={actionLoading !== null}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {actionLoading === "valide" ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : <Check className="h-4 w-4" />}
                Valider
              </button>
              <button
                onClick={() => updateStatut("rejete")}
                disabled={actionLoading !== null}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {actionLoading === "rejete" ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : <X className="h-4 w-4" />}
                Rejeter
              </button>
            </>
          )}
          {arnaque.statut !== "en_attente" && (
            <button
              onClick={() => updateStatut("en_attente")}
              disabled={actionLoading !== null}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-500 text-white font-semibold text-sm hover:bg-yellow-600 disabled:opacity-50 transition-colors"
            >
              Remettre en attente
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={actionLoading !== null}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-red-50 hover:text-red-600 disabled:opacity-50 transition-colors ml-auto"
          >
            {actionLoading === "delete" ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : <Trash2 className="h-4 w-4" />}
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
