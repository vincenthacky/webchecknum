import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TelechargementPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
        Télécharger l&apos;application
      </h1>
      <p className="text-center text-gray-500 mb-10">
        Disponible sur Android et iOS. Protégez-vous en toute situation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Android</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-sm mb-4">
              Disponible sur Google Play Store.
            </p>
            <Button className="w-full" disabled>
              Télécharger sur Google Play
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>iOS</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-sm mb-4">
              Disponible sur l&apos;App Store.
            </p>
            <Button className="w-full" disabled>
              Télécharger sur l&apos;App Store
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
