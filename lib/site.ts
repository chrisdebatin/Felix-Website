function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Bewusst nicht VERCEL_PROJECT_PRODUCTION_URL: Vercel nimmt dort die kürzeste Domain
  // (felix-ruft-an.de), die aber auf www weiterleitet. Schlecht für Canonical-URLs.
  return process.env.NODE_ENV === "production"
    ? "https://www.felix-ruft-an.de"
    : "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl().replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path === "/" ? "" : path}` || siteUrl;
}

export type Phone = { display: string; dial: string };
export type Address = { street: string; postalCode: string; city: string };

type Company = {
  name: string;
  shortName: string;
  address: Address | null;
  email: string | null;
  phone: Phone | null;
  hours: { de: string; en: string } | null;
  managingDirector: string | null;
  vatId: string | null;
  responsibleForContent: string | null;
  dataProtectionOfficer: string | null;
};

/**
 * Angaben zur Anbieterin. Regel aus dem Briefing: Fehlt ein Wert (null), wird das betroffene
 * Element auf der Website nicht angezeigt. Sobald ein Wert geliefert ist, hier eintragen.
 */
export const company: Company = {
  name: "IGS Social Tech UG (haftungsbeschränkt) i. G.",
  shortName: "IGS Social Tech UG i. G.",
  // TODO PLATZHALTER: Anschrift bestätigen (bisher Kruppstraße 108, 40227 Düsseldorf).
  address: null,
  // TODO PLATZHALTER: Kontakt-E-Mail (öffentlich angezeigt in Footer, Kontakt, Impressum, Datenschutz).
  email: null,
  // TODO PLATZHALTER: Telefon, z. B. { display: "0211 …", dial: "+49211…" }.
  phone: null,
  // TODO PLATZHALTER: Erreichbarkeit, z. B. { de: "Montag bis Freitag, …", en: "Monday to Friday, …" }.
  hours: null,
  // TODO PLATZHALTER: Geschäftsführung (Impressum).
  managingDirector: null,
  // TODO PLATZHALTER: USt-ID (Impressum).
  vatId: null,
  // TODO PLATZHALTER: Verantwortlich nach § 18 Abs. 2 MStV, Name und Anschrift (Impressum).
  responsibleForContent: null,
  // TODO PLATZHALTER: Datenschutzbeauftragte/r, Name und Kontakt (Datenschutz).
  dataProtectionOfficer: null,
};

/**
 * Rufnummer, von der Felix anruft und unter der man Felix erreicht.
 * TODO PLATZHALTER: Rufnummer von Felix. Solange null, wird die Frage „Welche Nummer ruft an?“ nicht angezeigt.
 */
export const felixPhone: Phone | null = null;

/** Rechtstexte, über denen noch der Hinweis „Entwurf“ steht. */
// TODO(chris): "privacy" entfernen, sobald die Datenschutzerklärung rechtlich geprüft ist.
export const legalDraftDocs: readonly string[] = ["privacy"];

// TODO(chris): Datum aktualisieren, wenn die Rechtstexte geändert werden.
export const legalLastUpdated = new Date("2026-10-13");
