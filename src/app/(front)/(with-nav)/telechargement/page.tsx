import { SmartphoneIcon, AndroidIcon, AppleIcon, BellIcon, DownloadIcon } from "@/components/ui/Icons";

export default function TelechargementPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-16">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <SmartphoneIcon size={52} color="#F97316" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
          Télécharger l&apos;application
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Disponible sur Android. Protégez-vous en toute situation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {/* Android — disponible */}
        <div className="rounded-2xl border bg-green-50 border-green-100 p-6 text-center">
          <div className="flex justify-center mb-3">
            <AndroidIcon size={40} color="#22C55E" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Android</h2>
          <p className="text-sm text-gray-500 mb-5">Compatible Android 7.0 et supérieur.</p>
          <a
            href="/downloads/numcheck-android.apk"
            download="NumCheck.apk"
            className="w-full min-h-[48px] py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <DownloadIcon size={18} color="white" />
            Télécharger l&apos;APK
          </a>
          <p className="text-xs text-gray-400 mt-2">Installation directe (APK)</p>
        </div>

        {/* iOS — bientôt disponible */}
        <div className="rounded-2xl border bg-blue-50 border-blue-100 p-6 text-center">
          <div className="flex justify-center mb-3">
            <AppleIcon size={40} color="#3B82F6" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">iOS</h2>
          <p className="text-sm text-gray-500 mb-5">Compatible iPhone iOS 14 et supérieur.</p>
          <button
            disabled
            className="w-full min-h-[48px] py-3 rounded-xl text-white font-semibold text-sm bg-blue-600 opacity-40 cursor-not-allowed"
          >
            Bientôt disponible
          </button>
          <p className="text-xs text-gray-400 mt-2">App Store — en cours</p>
        </div>
      </div>

      {/* Notif */}
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-center">
        <div className="flex justify-center mb-3">
          <BellIcon size={28} color="#F97316" />
        </div>
        <p className="font-semibold text-gray-900 mb-2">Être notifié dès la sortie iOS</p>
        <p className="text-sm text-gray-500 mb-4">Laissez votre mail et nous vous prévenons à la sortie.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="Votre mail"
            className="flex-1 text-base px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          <button className="min-h-[48px] px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors whitespace-nowrap">
            M&apos;alerter
          </button>
        </div>
      </div>
    </div>
  );
}
