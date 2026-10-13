import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { StepsSection } from "@/components/home/StepsSection";
import { TrustSection } from "@/components/home/TrustSection";
import { VoiceSection } from "@/components/home/VoiceSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale,
    href: "/",
    title: t("homeTitle"),
    description: t("description"),
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("home.finalCta");

  return (
    <>
      <Hero />
      <ProblemSection />
      <VoiceSection />
      <StepsSection />
      <BenefitsSection />
      <TrustSection />
      <FaqTeaser />
      <CtaBanner title={t("title")} text={t("text")} note={t("note")} />
    </>
  );
}
