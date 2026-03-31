"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { createAdminAxios } from "@/lib/api/adminApi";
import { ROUTES } from "@/constants";
import type { AdminArnaque } from "@/types/models.types";
import { AlertTriangle, Check, X, Trash2, Eye, Search } from "lucide-react";

type Filter = "tous" | "en_attente" | "valide" | "rejete";

function StatutBadge({ statut }: { statut: AdminArnaque["statut"] }) {
  const cfg = {
    en_attente: { cls: "bg-yellow-100 text-yellow-700", label: "⏳ En attente" },
    valide: { cls: "bg-green-100 text-green-700", label: "✓ Validé" },
    rejete: { cls: "bg-red-100 text-red-700", label: "✗ Rejeté" },
  };
  const c = cfg[statut] ?? cfg.en_attente;
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c.cls}`}>{c.label}</span>;
}

export default function SignalementsPage() {
  const { data: session } = useSession();
  const token = (session as { accessToken?: string })?.accessToken ?? "";
  const api = useMemo(() => createAdminAxios(token), [token]);

  const [arnaques, setArnaques] = useState<AdminArnaque[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("tous");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get("/arnaques");
      setArnaques(res.data.data ?? []);
    } catch {
      setError("Impossible de charger les signalements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [token]); // eslint-disable-line

  const updateStatut = async (id: number, statut: "valide" | "rejete") => {
    setActionLoading(id);
    try {
      await api.put(`/arnaques/${id}/statut`, { statut });
      setArnaques((prev) => prev.map((a) => a.id === id ? { ...a, statut } : a));
    } catch {
      setError("Erreur lors de la mise à jour.");
    } finally {
      setActionLoading(null);
    }
  };

  const deleteArnaque = async (id: number) => {
    if (!confirm("Supprimer définitivement ce signalement ?")) return;
    setActionLoading(id);
    try {
      await api.delete(`/arnaques/${id}`);
      setArnaques((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setError("Erreur lors de la suppression.");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = arnaques.filter((a) => {
    const matchFilter = filter === "tous" || a.statut === filter;
    const matchSearch =
      !search ||
      a.num.includes(search) ||
      a.categorie?.toLowerCase().includes(search.toLowerCase()) ||
      a.plaignant?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    tous: arnaques.length,
    en_attente: arnaques.filter((a) => a.statut === "en_attente").length,
    valide: arnaques.filter((a) => a.statut === "valide").length,
    rejete: arnaques.filter((a) => a.statut === "rejete").length,
  };

  const filterLabels: { key: Filter; label: string }[] = [
    { key: "tous", label: "Tous" },
    { key: "en_attente", label: "En attente" },
    { key: "valide", label: "Validés" },
    { key: "rejete", label: "Rejetés" },
  ];

  return (
    <div className="px-4 sm:px-6 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Signalements</h1>
          <p className="text-gray-500 text-sm mt-1">Gestion des signalements d&apos;arnaques</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full">
            {counts.en_attente} en attente
          </span>
        </div>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">{error}</p>
      )}

      {/* Filters + Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-gray-50">
          {/* Filter tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 gap-0.5">
            {filterLabels.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
                <span className={`ml-1.5 text-xs ${filter === key ? "text-orange-500" : "text-gray-400"}`}>
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par numéro, plaignant…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Numéro</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden sm:table-cell">Plaignant</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Catégorie</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden lg:table-cell">Canal</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Statut</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td className="px-5 py-4" colSpan={6}>
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <AlertTriangle className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Aucun signalement trouvé</p>
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-gray-900 text-sm">{a.num}</p>
                      <p className="text-xs text-gray-400 sm:hidden mt-0.5">{a.plaignant}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <p className="text-sm text-gray-700">{a.plaignant || "—"}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                        {a.categorie || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {a.canal || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatutBadge statut={a.statut} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={ROUTES.back.signalement(a.id)}
                          title="Voir le détail"
                          className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        {a.statut === "en_attente" && (
                          <>
                            <button
                              onClick={() => updateStatut(a.id, "valide")}
                              disabled={actionLoading === a.id}
                              title="Valider"
                              className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors disabled:opacity-50"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => updateStatut(a.id, "rejete")}
                              disabled={actionLoading === a.id}
                              title="Rejeter"
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteArnaque(a.id)}
                          disabled={actionLoading === a.id}
                          title="Supprimer"
                          className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-50 text-xs text-gray-400">
            {filtered.length} signalement(s) affiché(s)
          </div>
        )}
      </div>
    </div>
  );
}
