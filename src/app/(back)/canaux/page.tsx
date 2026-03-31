"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { createAdminAxios } from "@/lib/api/adminApi";
import type { AdminCanal } from "@/types/models.types";
import { Radio, Plus, Check, X, Trash2, Edit2 } from "lucide-react";

export default function CanauxPage() {
  const { data: session } = useSession();
  const token = (session as { accessToken?: string })?.accessToken ?? "";
  const api = useMemo(() => createAdminAxios(token), [token]);

  const [canaux, setCanaux] = useState<AdminCanal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Création
  const [newLibelle, setNewLibelle] = useState("");
  const [creating, setCreating] = useState(false);

  // Édition
  const [editId, setEditId] = useState<number | null>(null);
  const [editLibelle, setEditLibelle] = useState("");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const load = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await api.get("/canaux");
      setCanaux(res.data.data ?? []);
    } catch {
      setError("Impossible de charger les canaux.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [token]); // eslint-disable-line

  const notify = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLibelle.trim()) return;
    setCreating(true);
    setError("");
    try {
      const res = await api.post("/canaux", { libelle: newLibelle.trim() });
      setCanaux((prev) => [...prev, res.data.data]);
      setNewLibelle("");
      notify("Canal créé avec succès.");
    } catch {
      setError("Erreur lors de la création.");
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (canal: AdminCanal) => {
    setEditId(canal.id);
    setEditLibelle(canal.libelle);
  };

  const saveEdit = async () => {
    if (!editId || !editLibelle.trim()) return;
    setActionLoading(editId);
    try {
      await api.put(`/canaux/${editId}`, { libelle: editLibelle.trim() });
      setCanaux((prev) => prev.map((c) => c.id === editId ? { ...c, libelle: editLibelle.trim() } : c));
      setEditId(null);
      notify("Canal mis à jour.");
    } catch {
      setError("Erreur lors de la mise à jour.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: number, libelle: string) => {
    if (!confirm(`Désactiver le canal "${libelle}" ?`)) return;
    setActionLoading(id);
    try {
      await api.delete(`/canaux/${id}`);
      setCanaux((prev) => prev.filter((c) => c.id !== id));
      notify("Canal désactivé.");
    } catch {
      setError("Erreur lors de la suppression.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="px-4 sm:px-6 py-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Canaux d&apos;arnaques</h1>
        <p className="text-gray-500 text-sm mt-1">Gérez les canaux disponibles dans les formulaires de signalement</p>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl border border-red-100">{error}</p>
      )}
      {success && (
        <p className="mb-4 text-sm text-green-700 bg-green-50 px-4 py-2.5 rounded-xl border border-green-100">{success}</p>
      )}

      {/* Formulaire de création */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-orange-500" />
          Ajouter un canal
        </h2>
        <form onSubmit={handleCreate} className="flex gap-3">
          <input
            type="text"
            placeholder="Ex : WhatsApp, Telegram…"
            value={newLibelle}
            onChange={(e) => setNewLibelle(e.target.value)}
            required
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={creating || !newLibelle.trim()}
            className="px-4 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 disabled:opacity-50 transition-colors whitespace-nowrap"
          >
            {creating ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
            ) : "Ajouter"}
          </button>
        </form>
      </div>

      {/* Liste */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
          <Radio className="h-4 w-4 text-orange-500" />
          <h2 className="font-bold text-gray-900 text-sm">
            {loading ? "Chargement…" : `${canaux.length} canal/canaux`}
          </h2>
        </div>

        <div className="divide-y divide-gray-50">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="px-5 py-4 flex items-center gap-3">
                <div className="h-4 bg-gray-100 rounded flex-1 animate-pulse" />
              </div>
            ))
          ) : canaux.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <Radio className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Aucun canal.</p>
            </div>
          ) : (
            canaux.map((canal) => (
              <div key={canal.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                {editId === canal.id ? (
                  <input
                    type="text"
                    value={editLibelle}
                    onChange={(e) => setEditLibelle(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEditId(null); }}
                    autoFocus
                    className="flex-1 mr-3 px-3 py-1.5 rounded-lg border border-orange-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                ) : (
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
                    <span className="font-medium text-gray-900 text-sm truncate">{canal.libelle}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 ml-3">
                  {editId === canal.id ? (
                    <>
                      <button
                        onClick={saveEdit}
                        disabled={actionLoading === canal.id}
                        className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
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
                        onClick={() => startEdit(canal)}
                        title="Modifier"
                        className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(canal.id, canal.libelle)}
                        disabled={actionLoading === canal.id}
                        title="Désactiver"
                        className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        {actionLoading === canal.id ? (
                          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin inline-block" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
