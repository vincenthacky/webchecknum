import { Noto_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { AppNavbar } from "@/components/layout/front/AppNavbar";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// ── Data ────────────────────────────────────────────────────────────────────

// Nav links commentés — à activer quand les pages seront prêtes
// const NAV_LINKS = ["Télécharger Nitro", "Découvrir", "Sécurité", "Support", "Blog", "Carrières"];

const FOOTER_COLS = [
  {
    heading: "Produit",
    links: ["Application mobile", "Vérifier un numéro", "Signaler un arnaqueur", "Certifications"],
  },
  {
    heading: "Entreprise",
    links: ["À propos", "Contact", "Partenaires", "Presse"],
  },
  {
    heading: "Ressources",
    links: ["Guide d'utilisation", "Blog", "FAQ", "Centre de signalement"],
  },
  {
    heading: "Légal",
    links: ["Conditions d'utilisation", "Confidentialité", "Cookies", "Mentions légales"],
  },
];

// ── Icons ─────────────────────────────────────────────────────────────────────
function Sparkle({ size = 16, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 0 C8 4.4 4.4 8 0 8 C4.4 8 8 11.6 8 16 C8 11.6 11.6 8 16 8 C11.6 8 8 4.4 8 0Z"
        fill={color}
      />
    </svg>
  );
}

function SearchIcon({ color = "#111827" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6" stroke={color} strokeWidth="1.875" />
      <path d="M13.5 13.5 17.5 17.5" stroke={color} strokeWidth="1.875" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon({ color = "#111827" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2.5v11.25M4.375 8.125 10 13.75l5.625-5.625" stroke={color} strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 16.25h15" stroke={color} strokeWidth="1.875" strokeLinecap="round" />
    </svg>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className={notoSans.className} style={{ color: "#111827" }}>

      <AppNavbar heroMode />

      {/* ════════════════════════════════════════════════════
          S1 — HERO
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#F97316", height: "626px" }}>

        {/* background hills */}
        <div className="absolute inset-0 pointer-events-none">
          <Image src="/images/landing/hero-bg.png" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} priority unoptimized />
        </div>

        {/* left illustration */}
        <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: 480, height: 370 }}>
          <Image src="/images/landing/hero-right.png" alt="" fill sizes="480px" style={{ objectFit: "contain", objectPosition: "bottom left" }} unoptimized />
        </div>

        {/* right illustration */}
        <div className="absolute bottom-0 right-0 pointer-events-none" style={{ width: 430, height: 360 }}>
          <Image src="/images/landing/hero-left.png" alt="" fill sizes="430px" style={{ objectFit: "contain", objectPosition: "bottom right" }} unoptimized />
        </div>

        {/* hero content — paddingTop = navbar height + spacing */}
        <div className="relative z-10 flex flex-col items-center" style={{ paddingTop: 110 }}>
          <div style={{ maxWidth: 820, width: "100%", textAlign: "center", padding: "0 16px" }}>
            <h1 style={{ fontFamily: "inherit", fontSize: 56, fontWeight: 800, color: "#fff", lineHeight: 1.1, textTransform: "uppercase", margin: "0 0 24px 0" }}>
              Votre bouclier contre les arnaques téléphoniques.
            </h1>
            <p style={{ fontFamily: "inherit", fontSize: 20, fontWeight: 400, color: "#fff", lineHeight: 1.625, margin: "0 0 32px 0" }}>
              Vérifiez en 3 secondes si un numéro est signalé comme arnaqueur, signalez les escrocs, et certifiez votre commerce comme digne de confiance — en Côte d&apos;Ivoire.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <Link href={ROUTES.front.verifier} style={{ backgroundColor: "#fff", color: "#111827", fontFamily: "inherit", fontSize: 18, fontWeight: 600, height: 56, padding: "0 28px", borderRadius: 999, textDecoration: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" }}>
                <SearchIcon color="#F97316" />
                Vérifier un numéro
              </Link>
              <Link href={ROUTES.front.telechargement} style={{ backgroundColor: "#111827", color: "#fff", fontFamily: "inherit", fontSize: 18, fontWeight: 500, height: 56, padding: "0 28px", borderRadius: 999, textDecoration: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" }}>
                <DownloadIcon color="#fff" />
                Télécharger l&apos;app
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S2 — Vérifier un numéro
          ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "80px 0" }}>
        <div className="mx-auto flex items-center gap-8 px-16" style={{ maxWidth: 1180 }}>
          {/* left mockup */}
          <div style={{ flex: "0 0 auto" }}>
            <Image src="/images/landing/s2-mockup.png" alt="Interface de vérification NumCheck" width={460} height={296} style={{ objectFit: "contain" }} unoptimized />
          </div>
          {/* right text */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#F97316", margin: "0 0 12px 0" }}>
              Vérifier
            </p>
            <h2 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, margin: "0 0 20px 0", color: "#111827" }}>
              Vous doutez d&apos;un numéro ? D&apos;un vendeur ? D&apos;une personne sur le net ?
            </h2>
            <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: "#374151", margin: 0 }}>
              Ne répondez plus à l&apos;aveugle. Entrez le numéro et NumCheck vous dit instantanément s&apos;il a été signalé comme arnaqueur par la communauté. Simple, rapide, fiable — et gratuit.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S3 — Signaler un arnaqueur
          ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F5F5F5", padding: "80px 0" }}>
        <div className="mx-auto flex items-center gap-8 px-16" style={{ maxWidth: 1180 }}>
          {/* left text */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#F97316", margin: "0 0 12px 0" }}>
              Signaler
            </p>
            <h2 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, margin: "0 0 20px 0", color: "#111827" }}>
              Signalez les arnaqueurs. Protégez toute la communauté.
            </h2>
            <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: "#374151", margin: 0 }}>
              Victime d&apos;une tentative d&apos;arnaque ? Un seul signalement de votre part peut protéger des dizaines d&apos;autres personnes. Ensemble, nous construisons la base de données anti-arnaques la plus fiable de Côte d&apos;Ivoire.
            </p>
          </div>
          {/* right mockup */}
          <div style={{ flex: "0 0 auto" }}>
            <Image src="/images/landing/s3-mockup.png" alt="Interface de signalement NumCheck" width={460} height={317} style={{ objectFit: "contain" }} unoptimized />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S4 — Se faire certifier
          ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "80px 0" }}>
        <div className="mx-auto flex items-center gap-8 px-16" style={{ maxWidth: 1180 }}>
          {/* left mockup */}
          <div style={{ flex: "0 0 auto" }}>
            <Image src="/images/landing/s4-mockup.png" alt="Badge de certification NumCheck" width={460} height={345} style={{ objectFit: "contain" }} unoptimized />
          </div>
          {/* right text */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#22C55E", margin: "0 0 12px 0" }}>
              Se certifier
            </p>
            <h2 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, margin: "0 0 20px 0", color: "#111827" }}>
              Commerçant honnête ? Prouvez-le à vos clients.
            </h2>
            <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: "#374151", margin: 0 }}>
              Le badge NumCheck Certifié est votre garantie de confiance. Vos clients vérifient avant d&apos;acheter — faites en sorte qu&apos;ils trouvent un profil certifié, pas un numéro suspect. Développez votre activité en toute sérénité.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S5 — Technologie pensée pour l'Afrique
          ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F5F5F5", padding: "80px 0 0 0" }}>
        <div className="mx-auto text-center px-8" style={{ maxWidth: 900, paddingBottom: 60 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 20px 0", color: "#111827" }}>
            Une technologie pensée pour l&apos;Afrique
          </h2>
          <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: "#374151", margin: 0, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
            NumCheck fonctionne partout en Côte d&apos;Ivoire, même avec une connexion limitée. Notre base de données est mise à jour en temps réel grâce aux signalements de notre communauté. Plus les utilisateurs signalent, plus la protection est forte.
          </p>
        </div>
        {/* video mockup */}
        <div className="mx-auto" style={{ maxWidth: 1180, paddingBottom: 0 }}>
          <Image src="/images/landing/s5-video.png" alt="NumCheck en action" width={1190} height={490} style={{ width: "100%", height: "auto", display: "block" }} unoptimized />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S6 — CTA final
          ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F5F5F5", padding: "80px 0" }}>
        <div className="mx-auto text-center px-8" style={{ maxWidth: 900, position: "relative" }}>
          {/* sparkles */}
          <span style={{ position: "absolute", top: -8, left: "20%" }}><Sparkle size={18} color="#F97316" /></span>
          <span style={{ position: "absolute", top: 4, right: "22%" }}><Sparkle size={14} color="#22C55E" /></span>
          <span style={{ position: "absolute", top: -4, right: "35%" }}><Sparkle size={10} color="#F97316" /></span>

          <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 32px 0", color: "#111827" }}>
            Prêt à naviguer en sécurité ?
          </h2>
          <Link href={ROUTES.front.verifier} style={{ backgroundColor: "#F97316", color: "#fff", fontFamily: "inherit", fontSize: 18, fontWeight: 600, height: 56, padding: "0 32px", borderRadius: 999, textDecoration: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <SearchIcon color="#fff" />
            Vérifier un numéro maintenant
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════ */}
      <footer style={{ backgroundColor: "#111827" }}>
        {/* top section */}
        <div className="mx-auto px-16 py-16 flex gap-16" style={{ maxWidth: 1180 }}>
          {/* brand column */}
          <div style={{ flex: "0 0 220px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ position: "relative", width: 44, height: 30 }}>
                <Image src="/images/logo.png" alt="NumCheck" fill sizes="44px" style={{ objectFit: "contain" }} unoptimized />
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#F97316", letterSpacing: "-0.01em" }}>
                NumCheck
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#9CA3AF", margin: "0 0 20px 0", lineHeight: 1.5 }}>
              Protégez-vous contre les arnaques téléphoniques en Côte d&apos;Ivoire.
            </p>
            {/* language selector */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#9CA3AF", fontSize: 14, marginBottom: 20, cursor: "pointer" }}>
              <span>🇨🇮</span>
              <span>Français, Côte d&apos;Ivoire</span>
              <span style={{ fontSize: 10 }}>▼</span>
            </div>
            {/* social icons */}
            <div style={{ display: "flex", gap: 16 }}>
              {/* WhatsApp */}
              <a href="#" style={{ color: "#9CA3AF" }} aria-label="WhatsApp">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" style={{ color: "#9CA3AF" }} aria-label="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" style={{ color: "#9CA3AF" }} aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* Twitter/X */}
              <a href="#" style={{ color: "#9CA3AF" }} aria-label="Twitter">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* link columns */}
          <div className="flex-1 grid gap-8" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <p style={{ color: "#F97316", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 16px 0" }}>
                  {col.heading}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="footer-link" style={{ color: "#E5E7EB", fontSize: 14, fontWeight: 400, textDecoration: "none" }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div style={{ borderTop: "1px solid #374151", maxWidth: 1180, margin: "0 auto" }} />

        {/* bottom bar */}
        <div className="mx-auto px-16 py-6 flex items-center justify-between" style={{ maxWidth: 1180 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ position: "relative", width: 36, height: 24 }}>
              <Image src="/images/logo.png" alt="NumCheck" fill sizes="36px" style={{ objectFit: "contain" }} unoptimized />
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#F97316", letterSpacing: "-0.01em" }}>
              NumCheck
            </span>
          </div>
          <Link href={ROUTES.front.verifier} style={{ backgroundColor: "#F97316", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 600, padding: "10px 24px", borderRadius: 999, textDecoration: "none" }}>
            Vérifier un numéro
          </Link>
        </div>
      </footer>

    </div>
  );
}
