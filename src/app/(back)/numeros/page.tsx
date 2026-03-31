"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { createAdminAxios } from "@/lib/api/adminApi";
import type { AdminNumero } from "@/types/models.types";
import { Smartphone, Search, Trash2, Edit2, Check, X } from "lucide-react";

type FiabiliteFilter = "tous" | "arnaqueur" | "certifie";
type StatutFilter = "tous" | "en_attente" | "verifie";

function FiabiliteBadge({ f }: { f: AdminNumero["fiabilite"] }) {
  return f === "arnaqueur" ? (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">⚠ Arnaqueur</span>
  ) : (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">✓ Certifié</span>
  );
}

function StatutBadge({ s }: { s: AdminNumero["statut"] }) {
  return s === "verifie" ? (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Vérifié</span>
  ) : (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">En attente</span>
  );
}

export default function NumerosPage() {
  const { data: session } = useSession();
  const token = (session as { accessToken?: string })?.accessToken ?? "";
  const api = useMemo(() => createAdminAxios(token), [token]);

  const [numeros, setNumeros] = useState<AdminNumero[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [fiabiliteFilter, setFiabiliteFilter] = useState<FiabiliteFilter>("tous");
  const [statutFilter, setStatutFilter] = useState<StatutFilter>("tous");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ fiabilite: AdminNumero["fiabilite"]; statut: AdminNumero["statut"] }>({
    fiabilite: "arnaqueur",
    statut: "en_attente",
  });
  const [error, setError] = useState("");

  const load = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get("/numeros");
      setNumeros(res.data.data ?? []);
    } catch {
      setError("Impossible de charger les numéros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [token]); // eslint-disable-line

  const startEdit = (n: AdminNumero) => {
    setEditId(n.id);
    setEditValues({ fiabilite: n.fiabilite, statut: n.statut });
  };

  const saveEdit = async () => {
    if (!editId) return;
    setActionLoading(editId);
    try {
      await api.put(`/numeros/${editId}`, editValues);
      setNumeros((prev) => prev.map((n) => n.id === editId ? { ...n, ...editValues } : n));
      setEditId(null);
    } catch {
      setError("Erreur lors de la mise à jour.");
    } finally {
      setActionLoading(null);
    }
  };

  const deleteNumero = async (id: number, num: string) => {
    if (!confirm(`Supprimer définitivement le numéro ${num} ?`)) return;
    setActionLoading(id);
    try {
      await api.delete(`/numeros/${id}`);
      setNumeros((prev) => prev.filter((n) => n.id !== id));
    } catch {
      setError("Erreur lors de la suppression.");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = numeros.filter((n) => {
    const matchSearch = !search || n.num.includes(search);
    const matchFiabilite = fiabiliteFilter === "tous" || n.fiabilite === fiabiliteFilter;
    const matchStatut = statutFilter === "tous" || n.statut === statutFilter;
    return matchSearch && matchFiabilite && matchStatut;
  });

  return (
    <div className="px-4 sm:px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Numéros</h1>
          <p className="text-gray-500 text-sm mt-1">
            {numeros.length} numéro(s) · {numeros.filter((n) => n.fiabilite === "arnaqueur").length} arnaqueur(s) · {numeros.filter((n) => n.fiabilite === "certifie").length} certifié(s)
          </p>
        </div>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">{error}</p>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 px-5 py-4 border-b border-gray-50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un numéro…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>
          <select
            value={fiabiliteFilter}
            onChange={(e) => setFiabiliteFilter(e.target.value as FiabiliteFilter)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
          >
            <option value="tous">Toute fiabilité</option>
            <option value="arnaqueur">Arnaqueur</option>
            <option value="certifie">Certifié</option>
          </select>
          <select
            value={statutFilter}
            onChange={(e) => setStatutFilter(e.target.value as StatutFilter)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
          >
            <option value="tous">Tout statut</option>
            <option value="en_attente">En attente</option>
            <option value="verifie">Vérifié</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Numéro</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Fiabilité</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden sm:table-cell">Statut</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Signalements</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1, 2, 3, 4].map((i) => (
                  <tr key={i}>
                    <td className="px-5 py-4" colSpan={5}>
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <Smartphone className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Aucun numéro trouvé</p>
                  </td>
                </tr>
              ) : (
                filtered.map((n) => (
                  <tr key={n.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-gray-900 text-sm font-mono">{n.num}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      {editId === n.id ? (
                        <select
                          value={editValues.fiabilite}
                          onChange={(e) => setEditValues((v) => ({ ...v, fiabilite: e.target.value as AdminNumero["fiabilite"] }))}
                          className="px-2 py-1 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          <option value="arnaqueur">Arnaqueur</option>
                          <option value="certifie">Certifié</option>
                        </select>
                      ) : (
                        <FiabiliteBadge f={n.fiabilite} />
                      )}
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      {editId === n.id ? (
                        <select
                          value={editValues.statut}
                          onChange={(e) => setEditValues((v) => ({ ...v, statut: e.target.value as AdminNumero["statut"] }))}
                          className="px-2 py-1 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          <option value="en_attente">En attente</option>
                          <option value="verifie">Vérifié</option>
                        </select>
                      ) : (
                        <StatutBadge s={n.statut} />
                      )}
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-sm text-gray-700 font-semibold">{n.total_signalements}</span>
                      <span className="text-xs text-gray-400 ml-1">signalement(s)</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {editId === n.id ? (
                          <>
                            <button
                              onClick={saveEdit}
                              disabled={actionLoading === n.id}
                              className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors disabled:opacity-50"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setEditId(null)}
                              className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(n)}
                              title="Modifier"
                              className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => deleteNumero(n.id, n.num)}
                              disabled={actionLoading === n.id}
                              title="Supprimer"
                              className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
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
            {filtered.length} numéro(s) affiché(s)
          </div>
        )}
      </div>
    </div>
  );
}
