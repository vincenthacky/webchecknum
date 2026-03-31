"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { createAdminAxios } from "@/lib/api/adminApi";
import type { AdminSoumission, AdminNumero } from "@/types/models.types";
import { ShieldCheck, Check, Trash2, Search } from "lucide-react";

type Filter = "tous" | "en_attente" | "verifie";

function StatutBadge({ statut }: { statut: AdminSoumission["statut_numero"] }) {
  const cfg = {
    en_attente: { cls: "bg-yellow-100 text-yellow-700", label: "⏳ En attente" },
    verifie: { cls: "bg-green-100 text-green-700", label: "✓ Certifié" },
  };
  const c = cfg[statut] ?? cfg.en_attente;
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c.cls}`}>{c.label}</span>;
}

export default function CertificationsPage() {
  const { data: session } = useSession();
  const token = (session as { accessToken?: string })?.accessToken ?? "";
  const api = useMemo(() => createAdminAxios(token), [token]);

  const [soumissions, setSoumissions] = useState<AdminSoumission[]>([]);
  const [numeros, setNumeros] = useState<AdminNumero[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("tous");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [sRes, nRes] = await Promise.all([
        api.get("/soumissions"),
        api.get("/numeros"),
      ]);
      setSoumissions(sRes.data.data ?? []);
      setNumeros(nRes.data.data ?? []);
    } catch {
      setError("Impossible de charger les certifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [token]); // eslint-disable-line

  const getNumeroId = (num: string) => numeros.find((n) => n.num === num)?.id;

  const approuver = async (soumission: AdminSoumission) => {
    const numId = getNumeroId(soumission.num);
    if (!numId) { setError("Numéro introuvable."); return; }
    setActionLoading(soumission.id);
    try {
      await api.put(`/numeros/${numId}`, { statut: "verifie" });
      setSoumissions((prev) =>
        prev.map((s) => s.num === soumission.num ? { ...s, statut_numero: "verifie" } : s)
      );
    } catch {
      setError("Erreur lors de l'approbation.");
    } finally {
      setActionLoading(null);
    }
  };

  const refuser = async (soumission: AdminSoumission) => {
    const numId = getNumeroId(soumission.num);
    if (!numId) { setError("Numéro introuvable."); return; }
    if (!confirm(`Refuser et supprimer la demande de certification pour ${soumission.num} ?`)) return;
    setActionLoading(soumission.id);
    try {
      await api.delete(`/numeros/${numId}`);
      setSoumissions((prev) => prev.filter((s) => s.id !== soumission.id));
    } catch {
      setError("Erreur lors du refus.");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = soumissions.filter((s) => {
    const matchFilter = filter === "tous" || s.statut_numero === filter;
    const matchSearch =
      !search ||
      s.num.includes(search) ||
      s.utilisateur?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    tous: soumissions.length,
    en_attente: soumissions.filter((s) => s.statut_numero === "en_attente").length,
    verifie: soumissions.filter((s) => s.statut_numero === "verifie").length,
  };

  const filterLabels: { key: Filter; label: string }[] = [
    { key: "tous", label: "Tous" },
    { key: "en_attente", label: "En attente" },
    { key: "verifie", label: "Certifiés" },
  ];

  return (
    <div className="px-4 sm:px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Certifications</h1>
          <p className="text-gray-500 text-sm mt-1">Gestion des demandes de certification</p>
        </div>
        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
          {counts.en_attente} en attente
        </span>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">{error}</p>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-gray-50">
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
                <span className={`ml-1.5 text-xs ${filter === key ? "text-green-600" : "text-gray-400"}`}>
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par numéro, utilisateur…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Numéro</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden sm:table-cell">Soumis par</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Statut</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i}>
                    <td className="px-5 py-4" colSpan={5}>
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <ShieldCheck className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Aucune certification trouvée</p>
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-gray-900 text-sm">{s.num}</p>
                      <p className="text-xs text-gray-400 sm:hidden mt-0.5">{s.utilisateur}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <p className="text-sm text-gray-700">{s.utilisateur || "—"}</p>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <p className="text-xs text-gray-500">
                        {new Date(s.date_de_soumission).toLocaleDateString("fr-FR")}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatutBadge statut={s.statut_numero} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {s.statut_numero === "en_attente" && (
                          <>
                            <button
                              onClick={() => approuver(s)}
                              disabled={actionLoading === s.id}
                              title="Approuver"
                              className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors disabled:opacity-50"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => refuser(s)}
                              disabled={actionLoading === s.id}
                              title="Refuser"
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                        {actionLoading === s.id && (
                          <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
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
            {filtered.length} certification(s) affichée(s)
          </div>
        )}
      </div>
    </div>
  );
}
