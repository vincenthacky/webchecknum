export default function TelechargementPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-16">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">📱</div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
          Télécharger l&apos;application
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Disponible bientôt sur Android et iOS. Protégez-vous en toute situation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {[
          {
            platform: "Android",
            icon: "🤖",
            desc: "Compatible Android 7.0 et supérieur.",
            store: "Google Play",
            color: "bg-green-50 border-green-100",
            btnColor: "bg-green-600 hover:bg-green-700",
          },
          {
            platform: "iOS",
            icon: "🍎",
            desc: "Compatible iPhone iOS 14 et supérieur.",
            store: "App Store",
            color: "bg-blue-50 border-blue-100",
            btnColor: "bg-blue-600 hover:bg-blue-700",
          },
        ].map((item) => (
          <div key={item.platform} className={`rounded-2xl border ${item.color} p-6 text-center`}>
            <div className="text-4xl mb-3">{item.icon}</div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">{item.platform}</h2>
            <p className="text-sm text-gray-500 mb-5">{item.desc}</p>
            <button
              disabled
              className={`w-full min-h-[48px] py-3 rounded-xl text-white font-semibold text-sm ${item.btnColor} opacity-50 cursor-not-allowed`}
            >
              Bientôt sur {item.store}
            </button>
          </div>
        ))}
      </div>

      {/* Notif */}
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-center">
        <p className="font-semibold text-gray-900 mb-2">Être notifié dès la sortie</p>
        <p className="text-sm text-gray-500 mb-4">Laissez votre numéro et nous vous prévenons à la sortie.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
          <input
            type="tel"
            placeholder="Votre numéro"
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
