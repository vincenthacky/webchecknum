import Link from "next/link";
import { ROUTES } from "@/constants";

export function AppFooter() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="mx-auto px-4 md:px-8 py-8" style={{ maxWidth: 1180 }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-extrabold text-lg text-orange-500 tracking-tight">NumCheck</span>
          <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <Link href={ROUTES.front.verifier} className="hover:text-orange-500 transition-colors">Vérifier</Link>
            <Link href={ROUTES.front.signaler} className="hover:text-orange-500 transition-colors">Signaler</Link>
            <Link href={ROUTES.front.certifier} className="hover:text-orange-500 transition-colors">Certifier</Link>
            <Link href={ROUTES.front.revendication} className="hover:text-orange-500 transition-colors">Revendication</Link>
            <Link href={ROUTES.front.telechargement} className="hover:text-orange-500 transition-colors">Télécharger l&apos;app</Link>
          </nav>
          <p className="text-xs text-gray-400 text-center">
            &copy; {new Date().getFullYear()} NumCheck — Côte d&apos;Ivoire
          </p>
        </div>
      </div>
    </footer>
  );
}
