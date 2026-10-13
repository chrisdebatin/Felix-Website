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
    "/faq": { de: "/faq", en: "/faq" },
    "/ueber-uns": { de: "/ueber-uns", en: "/about" },
    "/kontakt": { de: "/kontakt", en: "/contact" },
    "/impressum": { de: "/impressum", en: "/imprint" },
    "/datenschutz": { de: "/datenschutz", en: "/privacy" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
