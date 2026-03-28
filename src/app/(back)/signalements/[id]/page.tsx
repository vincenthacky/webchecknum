import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SignalementDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Signalement #{id}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Détail du signalement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400">Chargement des données…</p>
          <div className="flex gap-3">
            <Button variant="default" disabled>
              Valider
            </Button>
            <Button variant="destructive" disabled>
              Rejeter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
