import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  // Deutsch liegt ohne Präfix auf "/", Englisch auf "/en".
  localePrefix: "as-needed",
  // Keine automatische Umleitung anhand der Browsersprache: "/" ist immer Deutsch.
  localeDetection: false,
  // Keine Cookies: Die Sprache steckt in der URL.
  localeCookie: false,
  pathnames: {
    "/": "/",
    "/so-funktionierts": { de: "/so-funktionierts", en: "/how-it-works" },
    "/preise": { de: "/preise", en: "/pricing" },
    "/faq": { de: "/faq", en: "/faq" },
    "/ueber-uns": { de: "/ueber-uns", en: "/about" },
    "/buchen": { de: "/buchen", en: "/book" },
    "/buchen/danke": { de: "/buchen/danke", en: "/book/thank-you" },
    "/kontakt": { de: "/kontakt", en: "/contact" },
    "/impressum": { de: "/impressum", en: "/imprint" },
    "/datenschutz": { de: "/datenschutz", en: "/privacy" },
    "/agb": { de: "/agb", en: "/terms" },
    "/widerruf": { de: "/widerruf", en: "/withdrawal" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
