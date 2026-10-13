import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Bubble } from "@/components/ui/Bubble";
import { Container } from "@/components/ui/Container";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "bookingSuccess" });
  return buildMetadata({
    locale,
    href: "/buchen/danke",
    title: t("meta.title"),
    description: t("text"),
    noindex: true,
  });
}

export default async function BookingSuccessPage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("bookingSuccess");
  const common = await getTranslations("common");

  return (
    <section className="py-16 sm:py-24">
      <Container size="narrow">
        <div className="rounded-[2rem] border border-line bg-surface p-8 text-center shadow-lift sm:p-14">
          <CheckCircle2 aria-hidden="true" className="mx-auto size-16 text-forest" />
          <h1 className="mt-6 text-4xl sm:text-5xl">{t("title")}</h1>
          {/* TODO(chris): Zeitraum bis zum ersten Anruf ("2 Werktage") bestätigen. */}
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted sm:text-xl">{t("text")}</p>
          <div className="mx-auto mt-10 flex max-w-sm flex-col">
            <Bubble who="felix" speakerName={common("felix")} size="lg">
              {t("bubble")}
            </Bubble>
          </div>
        </div>

        <div className="mt-10 rounded-[1.75rem] bg-sage p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl">{t("nextTitle")}</h2>
          {/* TODO(chris): Rufnummer von Felix eintragen (bookingSuccess.next, faq.items.number). */}
          <ol className="mt-6 space-y-4">
            {(t.raw("next") as string[]).map((item, i) => (
              <li key={item} className="flex gap-4 text-lg">
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime font-extrabold text-forest-deep"
                >
                  {i + 1}
                </span>
                <span className="pt-1">{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href="/" variant="secondary">
            {common("backHome")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
