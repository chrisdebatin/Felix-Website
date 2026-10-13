import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppPathname, type Locale } from "@/i18n/routing";
import { absoluteUrl } from "./site";

export function localizedUrl(locale: Locale, href: AppPathname): string {
  return absoluteUrl(getPathname({ locale, href }));
}

export function languageAlternates(href: AppPathname) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedUrl(l, href);
  languages["x-default"] = localizedUrl(routing.defaultLocale, href);
  return languages;
}

export function buildMetadata({
  locale,
  href,
  title,
  description,
  absoluteTitle = false,
  noindex = false,
}: {
  locale: Locale;
  href: AppPathname;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
}): Metadata {
  const url = localizedUrl(locale, href);
  const ogImage = {
    url: `/api/og/${locale}`,
    width: 1200,
    height: 630,
    alt: title,
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(href),
    },
    openGraph: {
      type: "website",
      siteName: "Felix",
      locale: locale === "de" ? "de_DE" : "en_GB",
      alternateLocale: locale === "de" ? ["en_GB"] : ["de_DE"],
      url,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
