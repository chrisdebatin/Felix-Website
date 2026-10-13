import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { AccordionItem } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { felixPhone } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

// Reihenfolge wie im Briefing.
const faqIds = [
  "forWhom",
  "human",
  "howToGet",
  "number",
  "callYourself",
  "howOften",
  "missed",
  "emergency",
  "recording",
  "careTeam",
  "advice",
  "replace",
  "sales",
  "noComputer",
  "hearing",
  "stop",
  "languages",
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

  const items = faqIds
    // TODO PLATZHALTER: Rufnummer von Felix. „Welche Nummer ruft an?“ erscheint erst, wenn felixPhone in lib/site.ts gesetzt ist.
    .filter((id) => id !== "number" || felixPhone)
    .map((id) => ({
      id,
      q: t(`items.${id}.q`),
      a: id === "number" ? t("items.number.a", { number: felixPhone?.display ?? "" }) : t(`items.${id}.a`),
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

          <div className="mt-16 rounded-[1.75rem] bg-sage p-8 text-center sm:p-10">
            <h2 className="text-3xl">{t("stillQuestions.title")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-muted">{t("stillQuestions.text")}</p>
            <div className="mt-7 flex justify-center">
              <ButtonLink href="/kontakt">{common("contactCta")}</ButtonLink>
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
