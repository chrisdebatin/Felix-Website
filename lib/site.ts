function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Bewusst nicht VERCEL_PROJECT_PRODUCTION_URL: Vercel nimmt dort die kürzeste Domain
  // (felix-ruft-an.de), die aber auf www weiterleitet – schlecht für Canonical-URLs.
  return process.env.NODE_ENV === "production"
    ? "https://www.felix-ruft-an.de"
    : "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl().replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path === "/" ? "" : path}` || siteUrl;
}

export const company = {
  name: "IGS Social Tech UG (haftungsbeschränkt) i. G.",
  shortName: "IGS Social Tech UG i. G.",
  street: "Kruppstraße 108",
  postalCode: "40227",
  city: "Düsseldorf",
  country: "DE",
  // TODO(chris): Echte E-Mail-Adresse und Telefonnummer eintragen (Platzhalter in den Rechtstexten in messages/*.json ebenfalls ersetzen).
  email: "hallo@example.com",
  phone: "+49 211 000000",
  phoneDisplay: "0211 000 000",
} as const;

export const pricing = {
  // TODO(chris): Preis, Testzeitraum und Währung bestätigen (Texte in messages/*.json mit anpassen).
  monthlyPrice: 10,
  currency: "EUR",
  trialDays: 30,
} as const;

/** Rechtstexte, über denen noch der Hinweis „Entwurf“ steht (das Impressum nicht mehr). */
// TODO(chris): Einträge entfernen, sobald Datenschutz, AGB und Widerruf juristisch geprüft sind.
export const legalDraftDocs: readonly string[] = ["privacy", "terms", "withdrawal"];

// TODO(chris): Datum aktualisieren, wenn die Rechtstexte geändert werden.
export const legalLastUpdated = new Date("2026-10-12");
