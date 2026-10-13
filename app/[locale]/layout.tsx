import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Nunito_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { routing } from "@/i18n/routing";
import { organizationJsonLd } from "@/lib/jsonld";
import { resolveLocale } from "@/lib/locale";
import { siteUrl } from "@/lib/site";

// Hausschrift der Pflegeunion-CI: Nunito Sans (variabel, Überschriften in 800).
const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("homeTitle"), template: "%s · Felix" },
    description: t("description"),
    applicationName: "Felix",
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  const t = await getTranslations("common");
  const messages = await getMessages();
  // Nur die Texte an den Browser schicken, die Client-Komponenten global brauchen.
  const clientMessages = { nav: messages.nav, common: messages.common };

  return (
    <html lang={locale} className={nunito.variable}>
      <body className="flex min-h-dvh flex-col">
        {/* Ohne JavaScript bleiben eingeblendete Abschnitte sonst unsichtbar. */}
        <noscript>
          <style>{".fade-in{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-forest-deep focus:px-5 focus:py-3 focus:text-white"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider messages={clientMessages}>
          <MotionProvider>
            <Header />
            <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </NextIntlClientProvider>
        <JsonLd data={organizationJsonLd()} />
        {/* Cookielose Reichweitenmessung; nur aktiv, wenn in Vercel eingeschaltet und per Env-Variable freigegeben. */}
        {process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "1" ? <Analytics /> : null}
      </body>
    </html>
  );
}
