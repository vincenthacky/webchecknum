"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VerifierPage() {
  const [numero, setNumero] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifier = async () => {
    if (!numero.trim()) return;
    setLoading(true);
    // TODO: appel API via features/numeros
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
        Vérifier un numéro
      </h1>
      <p className="text-center text-gray-500 mb-10">
        Entrez un numéro de téléphone ivoirien pour voir s&apos;il est signalé.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              type="tel"
              placeholder="Ex : 07 12 34 56 78"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerifier()}
            />
            <Button onClick={handleVerifier} disabled={loading || !numero.trim()}>
              {loading ? "Analyse…" : "Vérifier"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder result */}
      <div className="mt-6 text-center">
        <Badge variant="outline" className="text-gray-400">
          Résultat affiché ici
        </Badge>
      </div>
    </div>
  );
}
