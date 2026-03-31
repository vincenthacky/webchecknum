"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_NAME, ROUTES } from "@/constants";
import { AndroidIcon, DownloadIcon } from "@/components/ui/Icons";
import { useIsAndroid } from "@/hooks/useIsAndroid";

interface AndroidGuardProps {
  children: React.ReactNode;
}

export function AndroidGuard({ children }: AndroidGuardProps) {
  const isAndroid = useIsAndroid();

  // null = still detecting (SSR / first render)
  if (isAndroid === null) return null;

  if (!isAndroid) return <>{children}</>;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center shadow-sm">
            <Image
              src="/images/logo.png"
              alt={APP_NAME}
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        </div>

        {/* Android badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full">
            <AndroidIcon size={16} color="#16a34a" />
            Application Android détectée
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
          Téléchargez l&apos;appli
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Pour effectuer cette action depuis votre appareil Android, vous devez
          utiliser l&apos;application <span className="font-semibold text-gray-700">{APP_NAME}</span>.
          Les fonctionnalités sont optimisées et sécurisées dans l&apos;app.
        </p>

        {/* Download button */}
        <a
          href="/downloads/numcheck-android.apk"
          download="NumCheck.apk"
          className="w-full min-h-[52px] py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base transition-colors flex items-center justify-center gap-2"
        >
          <DownloadIcon size={20} color="white" />
          Télécharger l&apos;APK Android
        </a>

        <p className="text-xs text-gray-400 mt-3 mb-6">Installation directe · Android 7.0+</p>

        <Link
          href={ROUTES.front.telechargement}
          className="text-sm text-orange-500 font-semibold hover:underline"
        >
          En savoir plus sur l&apos;application →
        </Link>
      </div>
    </div>
  );
}
