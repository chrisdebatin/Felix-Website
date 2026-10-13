import { Check, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { AccordionItem } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { JsonLd } from "@/components/ui/JsonLd";
import { productJsonLd } from "@/lib/jsonld";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata, localizedUrl } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "pricing.meta" });
  return buildMetadata({ locale, href: "/preise", title: t("title"), description: t("description") });
}

export default async function PricingPage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("pricing");
  const common = await getTranslations("common");
  const notes = t.raw("notes.items") as { q: string; a: string }[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} text={t("hero.text")} />

      <section className="pb-20 sm:pb-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          <FadeIn>
            <article
              aria-labelledby="price-card-title"
              className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-8 shadow-lift sm:p-12"
            >
              <div aria-hidden="true" className="absolute -right-20 -top-20 size-56 rounded-full bg-accent/40" />
              <div className="relative">
                <p className="inline-flex rounded-full bg-success/12 px-4 py-1.5 text-base font-semibold text-[#1F6E4A]">
                  {t("card.badge")}
                </p>
                <h2 id="price-card-title" className="mt-6 text-4xl font-semibold">
                  {t("card.name")}
                </h2>
                <p className="mt-1 text-lg text-muted">{t("card.tagline")}</p>
                <p className="mt-8 flex items-baseline gap-3">
                  <span className="font-serif text-7xl font-semibold leading-none">{common("price")}</span>
                  <span className="text-xl text-muted">{common("perMonth")}</span>
                </p>
                <p className="mt-3 flex items-center gap-2 font-semibold">
                  <Check aria-hidden="true" className="size-5 text-success" strokeWidth={3} />
                  {t("card.cancel")}
                </p>
                <p className="mt-6 text-muted">{t("card.afterTrial")}</p>
                <ButtonLink href="/buchen" className="mt-8 w-full">
                  <Phone aria-hidden="true" className="size-5" />
                  {common("bookCta")}
                </ButtonLink>
                <p className="mt-4 text-center text-sm text-muted">{t("card.vat")}</p>
              </div>
            </article>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-3xl font-semibold">{t("card.includedTitle")}</h2>
            <CheckList items={t.raw("card.included") as string[]} className="mt-6 text-lg" />

            {/* TODO(chris): Zahlungsablauf nach dem Gratismonat festlegen (aktuell: "wir melden uns"). Später Stripe, siehe app/actions/checkout.ts. */}
            <h2 className="mt-14 text-3xl font-semibold">{t("notes.title")}</h2>
            <div className="mt-6 space-y-4">
              {notes.map((n) => (
                <AccordionItem key={n.q} question={n.q} answer={n.a} />
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <JsonLd
        data={productJsonLd({
          name: "Felix",
          description: t("meta.description"),
          url: localizedUrl(locale, "/preise"),
        })}
      />
    </>
  );
}
