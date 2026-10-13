import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Projektordner als Root festlegen (sonst irritiert eine package-lock.json im Home-Verzeichnis).
  outputFileTracingRoot: path.join(__dirname),
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Entfernte Seiten (Buchung, Preise, AGB, Widerruf) leiten auf die Startseite um.
  async redirects() {
    const removed = [
      ["/buchen", "/"],
      ["/buchen/danke", "/"],
      ["/preise", "/"],
      ["/agb", "/"],
      ["/widerruf", "/"],
      ["/en/book", "/en"],
      ["/en/book/thank-you", "/en"],
      ["/en/pricing", "/en"],
      ["/en/terms", "/en"],
      ["/en/withdrawal", "/en"],
    ];
    return removed.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default withNextIntl(nextConfig);
