import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import { Hero } from "@/components/home/Hero";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { ProblemSection } from "@/components/home/ProblemSection";
import { StepsSection } from "@/components/home/StepsSection";
import { TrustSection } from "@/components/home/TrustSection";
import { VoiceSection } from "@/components/home/VoiceSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { productJsonLd } from "@/lib/jsonld";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata, localizedUrl } from "@/lib/metadata";

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
  const meta = await getTranslations("meta");

  return (
    <>
      <Hero />
      <ProblemSection />
      <VoiceSection />
      <StepsSection />
      <BenefitsSection />
      <TrustSection />
      <PricingTeaser />
      <FaqTeaser />
      <CtaBanner title={t("title")} text={t("text")} bubble={t("bubble")} />
      <JsonLd
        data={productJsonLd({
          name: "Felix",
          description: meta("description"),
          url: localizedUrl(locale, "/"),
        })}
      />
    </>
  );
}
