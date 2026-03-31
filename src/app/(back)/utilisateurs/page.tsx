"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { createAdminAxios } from "@/lib/api/adminApi";
import type { AdminUtilisateur } from "@/types/models.types";
import { Users, Search, UserCheck, UserX, Shield, User } from "lucide-react";

function RoleBadge({ role }: { role: AdminUtilisateur["role"] }) {
  return role === "admin" ? (
    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
      <Shield className="h-3 w-3" /> Admin
    </span>
  ) : (
    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
      <User className="h-3 w-3" /> Utilisateur
    </span>
  );
}

function StatutBadge({ statut }: { statut: number }) {
  return statut === 1 ? (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Actif</span>
  ) : (
    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">Inactif</span>
  );
}

export default function UtilisateursPage() {
  const { data: session } = useSession();
  const token = (session as { accessToken?: string })?.accessToken ?? "";
  const api = useMemo(() => createAdminAxios(token), [token]);

  const [utilisateurs, setUtilisateurs] = useState<AdminUtilisateur[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUtilisateurs(res.data.data ?? []);
    } catch {
      setError("Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [token]); // eslint-disable-line

  const toggleStatut = async (u: AdminUtilisateur) => {
    setActionLoading(u.id);
    const newStatut = u.statut === 1 ? 0 : 1;
    try {
      await api.put(`/users/${u.id}`, { statut: newStatut });
      setUtilisateurs((prev) =>
        prev.map((x) => x.id === u.id ? { ...x, statut: newStatut } : x)
      );
    } catch {
      setError("Erreur lors de la mise à jour.");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = utilisateurs.filter((u) =>
    !search ||
    u.nom.toLowerCase().includes(search.toLowerCase()) ||
    u.num.includes(search)
  );

  const admins = utilisateurs.filter((u) => u.role === "admin").length;
  const actifs = utilisateurs.filter((u) => u.statut === 1).length;

  return (
    <div className="px-4 sm:px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-500 text-sm mt-1">
            {utilisateurs.length} compte(s) · {admins} admin(s) · {actifs} actif(s)
          </p>
        </div>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">{error}</p>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou numéro…"
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
                <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Utilisateur</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden sm:table-cell">Numéro</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Rôle</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Statut</th>
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
                    <Users className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Aucun utilisateur trouvé</p>
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-orange-600">
                            {u.nom.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{u.nom}</p>
                          <p className="text-xs text-gray-400 sm:hidden">{u.num}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <p className="text-sm text-gray-700 font-mono">{u.num}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <RoleBadge role={u.role} />
                    </td>
                    <td className="px-4 py-3.5">
                      <StatutBadge statut={u.statut} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end">
                        {u.role !== "admin" && (
                          <button
                            onClick={() => toggleStatut(u)}
                            disabled={actionLoading === u.id}
                            title={u.statut === 1 ? "Désactiver" : "Activer"}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
                              u.statut === 1
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-green-50 text-green-600 hover:bg-green-100"
                            }`}
                          >
                            {actionLoading === u.id ? (
                              <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : u.statut === 1 ? (
                              <><UserX className="h-3.5 w-3.5" /> Désactiver</>
                            ) : (
                              <><UserCheck className="h-3.5 w-3.5" /> Activer</>
                            )}
                          </button>
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
            {filtered.length} utilisateur(s) affiché(s)
          </div>
        )}
      </div>
    </div>
  );
}
