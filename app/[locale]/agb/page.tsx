import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  return buildMetadata({ locale, href: "/agb", title: t("meta.title"), description: t("meta.description") });
}

export default async function TermsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  return <LegalPage doc="terms" />;
}
