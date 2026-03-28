import Link from "next/link";
import { APP_NAME, ROUTES } from "@/constants";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={ROUTES.front.home} className="flex items-center gap-2 font-bold text-xl text-green-700">
          {APP_NAME}
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href={ROUTES.front.verifier} className="text-gray-600 hover:text-green-700 transition-colors">
            Vérifier un numéro
          </Link>
          <Link href={ROUTES.front.telechargement} className="text-gray-600 hover:text-green-700 transition-colors">
            Télécharger l&apos;app
          </Link>
        </nav>
        <Link
          href={ROUTES.front.verifier}
          className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
        >
          Vérifier maintenant
        </Link>
      </div>
    </header>
  );
}
