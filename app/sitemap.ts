import type { MetadataRoute } from "next";
import { routing, type AppPathname } from "@/i18n/routing";
import { languageAlternates, localizedUrl } from "@/lib/metadata";

const pages: { href: AppPathname; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { href: "/", priority: 1, changeFrequency: "weekly" },
  { href: "/so-funktionierts", priority: 0.9, changeFrequency: "monthly" },
  { href: "/preise", priority: 0.9, changeFrequency: "monthly" },
  { href: "/buchen", priority: 0.9, changeFrequency: "monthly" },
  { href: "/faq", priority: 0.8, changeFrequency: "monthly" },
  { href: "/ueber-uns", priority: 0.6, changeFrequency: "monthly" },
  { href: "/kontakt", priority: 0.5, changeFrequency: "yearly" },
  { href: "/impressum", priority: 0.2, changeFrequency: "yearly" },
  { href: "/datenschutz", priority: 0.2, changeFrequency: "yearly" },
  { href: "/agb", priority: 0.2, changeFrequency: "yearly" },
  { href: "/widerruf", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ href, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, href),
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(href) },
    })),
  );
}
