import Link from "next/link";
import { APP_NAME, ROUTES } from "@/constants";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-semibold text-green-700">{APP_NAME}</p>
          <nav className="flex gap-6 text-sm text-gray-500">
            <Link href={ROUTES.front.verifier} className="hover:text-green-700 transition-colors">
              Vérifier
            </Link>
            <Link href={ROUTES.front.telechargement} className="hover:text-green-700 transition-colors">
              Téléchargement
            </Link>
          </nav>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {APP_NAME}. Côte d&apos;Ivoire.
          </p>
        </div>
      </div>
    </footer>
  );
}
