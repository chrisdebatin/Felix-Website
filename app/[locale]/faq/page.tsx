import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { AccordionItem } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

// TODO(chris): Alle Antworten fachlich prüfen – besonders "number", "missed", "recording",
// "emergency", "cancel", "languages" und "hearing" beschreiben angenommene Abläufe.
const faqIds = [
  "human",
  "number",
  "missed",
  "relative",
  "recording",
  "emergency",
  "landline",
  "costs",
  "careService",
  "cancel",
  "changeTime",
  "pause",
  "languages",
  "hearing",
  "replace",
  "data",
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "faq.meta" });
  return buildMetadata({ locale, href: "/faq", title: t("title"), description: t("description") });
}

export default async function FaqPage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const common = await getTranslations("common");

  const items = faqIds.map((id) => ({
    id,
    q: t(`items.${id}.q`),
    a: t(`items.${id}.a`),
  }));

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} text={t("hero.text")} />
      <section className="pb-20 sm:pb-28">
        <Container size="narrow">
          <div className="space-y-4">
            {items.map((item) => (
              <AccordionItem key={item.id} id={item.id} question={item.q} answer={item.a} />
            ))}
          </div>

          <div className="mt-16 rounded-[1.75rem] bg-surface p-8 text-center shadow-soft sm:p-10">
            <h2 className="text-3xl font-semibold">{t("stillQuestions.title")}</h2>
            <p className="mt-3 text-lg text-muted">{t("stillQuestions.text")}</p>
            <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href="/kontakt" variant="secondary">
                {common("contactCta")}
              </ButtonLink>
              <ButtonLink href="/buchen">{common("bookCta")}</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: locale,
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
    </>
  );
}
