import { Noto_Sans } from "next/font/google";
import Image from "next/image";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// ── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Download Nitro", "Discover", "Safety", "Support", "Blog", "Careers"];

const FOOTER_COLS = [
  {
    heading: "Product",
    links: ["Download", "Nitro", "Status"],
  },
  {
    heading: "Company",
    links: ["About", "Jobs", "Branding", "Newsroom"],
  },
  {
    heading: "Resources",
    links: ["College", "Support", "Safety", "Blog", "Feedback", "Build", "StreamKit", "Creators", "Community"],
  },
  {
    heading: "Policies",
    links: ["Terms", "Privacy", "Cookie Settings", "Guidelines", "Acknowledgements", "Licenses", "Moderation"],
  },
];

// ── Sparkle SVG ──────────────────────────────────────────────────────────────
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

// ── Download icon ────────────────────────────────────────────────────────────
function DownloadIcon({ color = "#23272a" }: { color?: string }) {
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
    <div className={notoSans.className} style={{ color: "#23272a" }}>

      {/* ════════════════════════════════════════════════════
          S1 — HERO
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#404eed", height: "626px" }}>

        {/* background hills */}
        <div className="absolute inset-0 pointer-events-none">
          <Image src="/images/landing/hero-bg.png" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} priority unoptimized />
        </div>

        {/* left illustration — shoe */}
        <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: 480, height: 370 }}>
          <Image src="/images/landing/hero-right.png" alt="" fill sizes="480px" style={{ objectFit: "contain", objectPosition: "bottom left" }} unoptimized />
        </div>

        {/* right illustration — gaming */}
        <div className="absolute bottom-0 right-0 pointer-events-none" style={{ width: 430, height: 360 }}>
          <Image src="/images/landing/hero-left.png" alt="" fill sizes="430px" style={{ objectFit: "contain", objectPosition: "bottom right" }} unoptimized />
        </div>

        {/* navbar */}
        <nav className="relative z-20 mx-auto flex items-center justify-between px-8" style={{ maxWidth: 1180, height: 80 }}>
          <div className="relative" style={{ width: 124, height: 34 }}>
            <Image src="/images/landing/discord-logo.png" alt="Discord" fill sizes="124px" style={{ objectFit: "contain", objectPosition: "left" }} unoptimized />
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l} href="#" style={{ color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>{l}</a>
            ))}
          </div>
          <a href="#" style={{ backgroundColor: "#fff", color: "#23272a", fontSize: 13, fontWeight: 500, padding: "7px 20px", borderRadius: 999, textDecoration: "none", whiteSpace: "nowrap" }}>
            Login
          </a>
        </nav>

        {/* hero content */}
        <div className="relative z-10 flex flex-col items-center" style={{ paddingTop: 48 }}>
          <div style={{ maxWidth: 780, width: "100%", textAlign: "center", padding: "0 16px" }}>
            <h1 style={{ fontFamily: "inherit", fontSize: 56, fontWeight: 800, color: "#fff", lineHeight: 1.15, textTransform: "uppercase", margin: "0 0 24px 0" }}>
              Imagine a place...
            </h1>
            <p style={{ fontFamily: "inherit", fontSize: 20, fontWeight: 400, color: "#fff", lineHeight: 1.625, margin: "0 0 32px 0" }}>
              ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <button style={{ backgroundColor: "#fff", color: "#23272a", fontFamily: "inherit", fontSize: 18, fontWeight: 500, height: 56, padding: "0 28px", borderRadius: 999, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" }}>
                <DownloadIcon color="#23272a" />
                Download for Windows
              </button>
              <button style={{ backgroundColor: "#23272a", color: "#fff", fontFamily: "inherit", fontSize: 18, fontWeight: 500, height: 56, padding: "0 28px", borderRadius: 999, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
                Open Discord in your browser
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S2 — Create an invite-only place where you belong
          ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "80px 0" }}>
        <div className="mx-auto flex items-center gap-16 px-16" style={{ maxWidth: 1180 }}>
          {/* left mockup */}
          <div style={{ flex: "0 0 auto" }}>
            <Image src="/images/landing/s2-mockup.png" alt="Discord chat interface" width={560} height={360} style={{ objectFit: "contain" }} unoptimized />
          </div>
          {/* right text */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, margin: "0 0 20px 0", color: "#23272a" }}>
              Create an invite-only place where you belong
            </h2>
            <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: "#4f5660", margin: 0 }}>
              Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S3 — Where hanging out is easy
          ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#f2f3f5", padding: "80px 0" }}>
        <div className="mx-auto flex items-center gap-16 px-16" style={{ maxWidth: 1180 }}>
          {/* left text */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, margin: "0 0 20px 0", color: "#23272a" }}>
              Where hanging out is easy
            </h2>
            <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: "#4f5660", margin: 0 }}>
              Grab a seat in a voice channel when you&apos;re free. Friends in your server can see you&apos;re around and instantly pop in to talk without having to call.
            </p>
          </div>
          {/* right mockup */}
          <div style={{ flex: "0 0 auto" }}>
            <Image src="/images/landing/s3-mockup.png" alt="Discord voice channel" width={580} height={400} style={{ objectFit: "contain" }} unoptimized />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S4 — From few to a fandom
          ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "80px 0" }}>
        <div className="mx-auto flex items-center gap-16 px-16" style={{ maxWidth: 1180 }}>
          {/* left mockup */}
          <div style={{ flex: "0 0 auto" }}>
            <Image src="/images/landing/s4-mockup.png" alt="Discord roles and members" width={560} height={420} style={{ objectFit: "contain" }} unoptimized />
          </div>
          {/* right text */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, margin: "0 0 20px 0", color: "#23272a" }}>
              From few to a fandom
            </h2>
            <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: "#4f5660", margin: 0 }}>
              Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S5 — Reliable tech for staying close
          ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#f2f3f5", padding: "80px 0 0 0" }}>
        <div className="mx-auto text-center px-8" style={{ maxWidth: 900, paddingBottom: 60 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 20px 0", color: "#23272a" }}>
            Reliable tech for staying close
          </h2>
          <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: "#4f5660", margin: 0, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
            Low-latency voice and video feels like you&apos;re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.
          </p>
        </div>
        {/* video mockup */}
        <div className="mx-auto" style={{ maxWidth: 1180, paddingBottom: 0 }}>
          <Image src="/images/landing/s5-video.png" alt="Discord video call" width={1190} height={490} style={{ width: "100%", height: "auto", display: "block" }} unoptimized />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          S6 — Ready to start your journey?
          ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#f2f3f5", padding: "80px 0" }}>
        <div className="mx-auto text-center px-8" style={{ maxWidth: 900, position: "relative" }}>
          {/* sparkles */}
          <span style={{ position: "absolute", top: -8, left: "20%" }}><Sparkle size={18} color="#f47fff" /></span>
          <span style={{ position: "absolute", top: 4, right: "22%" }}><Sparkle size={14} color="#43b581" /></span>
          <span style={{ position: "absolute", top: -4, right: "35%" }}><Sparkle size={10} color="#7289da" /></span>

          <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 32px 0", color: "#23272a" }}>
            Ready to start your journey?
          </h2>
          <button style={{ backgroundColor: "#5865f2", color: "#fff", fontFamily: "inherit", fontSize: 18, fontWeight: 500, height: 56, padding: "0 32px", borderRadius: 999, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <DownloadIcon color="#fff" />
            Download for Windows
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════ */}
      <footer style={{ backgroundColor: "#23272a" }}>
        {/* top section */}
        <div className="mx-auto px-16 py-16 flex gap-16" style={{ maxWidth: 1180 }}>
          {/* brand column */}
          <div style={{ flex: "0 0 220px" }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: "#5865f2", textTransform: "uppercase", lineHeight: 1.2, margin: "0 0 20px 0" }}>
              Imagine a place
            </p>
            {/* language selector */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#b9bbbe", fontSize: 14, marginBottom: 20, cursor: "pointer" }}>
              <span>🇺🇸</span>
              <span>English, USA</span>
              <span style={{ fontSize: 10 }}>▼</span>
            </div>
            {/* social icons */}
            <div style={{ display: "flex", gap: 16 }}>
              {/* Twitter */}
              <a href="#" style={{ color: "#b9bbbe" }} aria-label="Twitter">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" style={{ color: "#b9bbbe" }} aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" style={{ color: "#b9bbbe" }} aria-label="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" style={{ color: "#b9bbbe" }} aria-label="YouTube">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* link columns */}
          <div className="flex-1 grid gap-8" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <p style={{ color: "#5865f2", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 16px 0" }}>
                  {col.heading}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="footer-link" style={{ color: "#dcddde", fontSize: 14, fontWeight: 400, textDecoration: "none" }}>
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
        <div style={{ borderTop: "1px solid #36393f", maxWidth: 1180, margin: "0 auto" }} />

        {/* bottom bar */}
        <div className="mx-auto px-16 py-6 flex items-center justify-between" style={{ maxWidth: 1180 }}>
          <div className="relative" style={{ width: 120, height: 30 }}>
            <Image src="/images/landing/discord-logo.png" alt="Discord" fill sizes="120px" style={{ objectFit: "contain", objectPosition: "left" }} unoptimized />
          </div>
          <a href="#" style={{ backgroundColor: "#5865f2", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 500, padding: "10px 24px", borderRadius: 999, textDecoration: "none" }}>
            Sign up
          </a>
        </div>
      </footer>

    </div>
  );
}
