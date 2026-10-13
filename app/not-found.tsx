import NextLink from "next/link";
import "./globals.css";

// Fallback für Pfade außerhalb der Sprach-Routen (z. B. ungültige Präfixe).
export default function GlobalNotFound() {
  return (
    <html lang="de">
      <body className="flex min-h-dvh items-center justify-center bg-surface p-6 text-center text-ink">
        <main>
          <h1 className="text-4xl">Seite nicht gefunden</h1>
          <p className="mt-3 text-muted">Page not found</p>
          <NextLink href="/" className="mt-6 inline-block font-bold text-forest underline">
            Zur Startseite · Home
          </NextLink>
        </main>
      </body>
    </html>
  );
}
