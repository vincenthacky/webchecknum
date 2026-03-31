"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { createAdminAxios } from "@/lib/api/adminApi";
import { ROUTES } from "@/constants";
import type { AdminArnaque, AdminSoumission, AdminUtilisateur } from "@/types/models.types";
import {
  AlertTriangle,
  Clock,
  ShieldCheck,
  Users,
  ChevronRight,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="text-3xl font-extrabold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function StatutBadge({ statut }: { statut: string }) {
  const cfg: Record<string, { cls: string; label: string }> = {
    en_attente: { cls: "bg-yellow-100 text-yellow-700", label: "En attente" },
    valide: { cls: "bg-green-100 text-green-700", label: "Validé" },
    rejete: { cls: "bg-red-100 text-red-700", label: "Rejeté" },
    verifie: { cls: "bg-green-100 text-green-700", label: "Certifié" },
  };
  const c = cfg[statut] ?? cfg.en_attente;
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${c.cls}`}>
      {c.label}
    </span>
  );
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const token = (session as { accessToken?: string })?.accessToken ?? "";
  const api = useMemo(() => createAdminAxios(token), [token]);

  const [arnaques, setArnaques] = useState<AdminArnaque[]>([]);
  const [soumissions, setSoumissions] = useState<AdminSoumission[]>([]);
  const [utilisateurs, setUtilisateurs] = useState<AdminUtilisateur[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      api.get("/arnaques").catch(() => ({ data: { data: [] } })),
      api.get("/soumissions").catch(() => ({ data: { data: [] } })),
      api.get("/users").catch(() => ({ data: { data: [] } })),
    ]).then(([a, s, u]) => {
      setArnaques(a.data.data ?? []);
      setSoumissions(s.data.data ?? []);
      setUtilisateurs(u.data.data ?? []);
    }).finally(() => setLoading(false));
  }, [token, api]);

  const enAttenteArnaques = arnaques.filter((a) => a.statut === "en_attente").length;
  const enAttenteSoumissions = soumissions.filter((s) => s.statut_numero === "en_attente").length;
  const recentArnaques = [...arnaques].reverse().slice(0, 5);
  const recentSoumissions = [...soumissions].reverse().slice(0, 5);

  return (
    <div className="px-4 sm:px-6 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 text-sm mt-1">Vue d&apos;ensemble de l&apos;activité NumCheck</p>
      </div>

      {/* Stat cards */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Signalements"
            value={arnaques.length}
            icon={AlertTriangle}
            color="bg-orange-100 text-orange-600"
            sub={`${enAttenteArnaques} en attente`}
          />
          <StatCard
            label="En attente"
            value={enAttenteArnaques + enAttenteSoumissions}
            icon={Clock}
            color="bg-yellow-100 text-yellow-600"
            sub="À traiter"
          />
          <StatCard
            label="Certifications"
            value={soumissions.length}
            icon={ShieldCheck}
            color="bg-green-100 text-green-600"
            sub={`${enAttenteSoumissions} en attente`}
          />
          <StatCard
            label="Utilisateurs"
            value={utilisateurs.length}
            icon={Users}
            color="bg-blue-100 text-blue-600"
            sub="Comptes actifs"
          />
        </div>
      )}

      {/* Pending alert */}
      {!loading && (enAttenteArnaques + enAttenteSoumissions) > 0 && (
        <div className="bg-orange-50 border border-orange-100 rounded-2xl px-5 py-4 mb-8 flex items-center gap-3">
          <Clock className="h-5 w-5 text-orange-500 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-orange-800">
              {enAttenteArnaques + enAttenteSoumissions} élément(s) en attente de traitement
            </p>
            <p className="text-xs text-orange-600 mt-0.5">
              {enAttenteArnaques} signalement(s) · {enAttenteSoumissions} certification(s)
            </p>
          </div>
          <div className="flex gap-2">
            {enAttenteArnaques > 0 && (
              <Link href={ROUTES.back.signalements} className="text-xs font-semibold text-orange-600 hover:text-orange-700 whitespace-nowrap">
                Voir →
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Derniers signalements */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <h2 className="font-bold text-gray-900 text-sm">Derniers signalements</h2>
            </div>
            <Link
              href={ROUTES.back.signalements}
              className="text-xs text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1"
            >
              Tout voir <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="px-5 py-3 flex items-center gap-3">
                  <div className="h-4 bg-gray-100 rounded flex-1 animate-pulse" />
                  <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
                </div>
              ))
            ) : recentArnaques.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-gray-400">Aucun signalement</p>
            ) : (
              recentArnaques.map((a) => (
                <Link
                  key={a.id}
                  href={ROUTES.back.signalement(a.id)}
                  className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{a.num}</p>
                    <p className="text-xs text-gray-400 truncate">{a.categorie} · {a.canal}</p>
                  </div>
                  <StatutBadge statut={a.statut} />
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Dernières certifications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <h2 className="font-bold text-gray-900 text-sm">Dernières certifications</h2>
            </div>
            <Link
              href={ROUTES.back.certifications}
              className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
            >
              Tout voir <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="px-5 py-3 flex items-center gap-3">
                  <div className="h-4 bg-gray-100 rounded flex-1 animate-pulse" />
                  <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
                </div>
              ))
            ) : recentSoumissions.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-gray-400">Aucune certification</p>
            ) : (
              recentSoumissions.map((s) => (
                <div key={s.id} className="flex items-center justify-between px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{s.num}</p>
                    <p className="text-xs text-gray-400 truncate">{s.utilisateur}</p>
                  </div>
                  <StatutBadge statut={s.statut_numero} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick stats row */}
      {!loading && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-orange-400 shrink-0" />
            <div>
              <p className="text-2xl font-extrabold text-gray-900">
                {arnaques.filter((a) => a.statut === "valide").length}
              </p>
              <p className="text-xs text-gray-400">Signalements validés</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-500 shrink-0" />
            <div>
              <p className="text-2xl font-extrabold text-gray-900">
                {soumissions.filter((s) => s.statut_numero === "verifie").length}
              </p>
              <p className="text-xs text-gray-400">Certifications actives</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <XCircle className="h-8 w-8 text-red-400 shrink-0" />
            <div>
              <p className="text-2xl font-extrabold text-gray-900">
                {arnaques.filter((a) => a.statut === "rejete").length}
              </p>
              <p className="text-xs text-gray-400">Signalements rejetés</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
