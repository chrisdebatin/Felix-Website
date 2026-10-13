import { Ban, CalendarClock, Phone, PhoneOff, PhoneOutgoing, Send, Siren } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

const facts = [
  { key: "call", Icon: Phone },
  { key: "frequency", Icon: CalendarClock },
  { key: "callYourself", Icon: PhoneOutgoing },
  { key: "after", Icon: Send },
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "howItWorks.meta" });
  return buildMetadata({ locale, href: "/so-funktionierts", title: t("title"), description: t("description") });
}

export default async function HowItWorksPage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("howItWorks");
  const steps = t.raw("start.steps") as string[];
  const notItems = t.raw("not.items") as { title: string; text: string }[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} text={t("hero.text")} />

      {/* Der Start */}
      <section className="pb-20 sm:pb-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-3xl sm:text-[2.4rem]">{t("start.title")}</h2>
            <ol className="relative mt-10 space-y-10 before:absolute before:bottom-6 before:left-6 before:top-6 before:w-0.5 before:bg-line">
              {steps.map((step, i) => (
                <li key={step} className="relative flex gap-6">
                  <span
                    aria-hidden="true"
                    className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-lime font-display text-xl font-extrabold text-forest-deep"
                  >
                    {i + 1}
                  </span>
                  {/* Ohne Einblenden: Die Schritte stehen direkt im sichtbaren Bereich (LCP). */}
                  <p className="pt-2 text-lg text-ink">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <PhotoPlaceholder photo={t("photoAlt")} className="hidden aspect-[4/5] w-full lg:block" />
        </Container>
      </section>

      {/* Ein Anruf, Wie oft, Selbst anrufen, Nach dem Anruf */}
      <section className="bg-sage py-20 sm:py-28">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {facts.map(({ key, Icon }, i) => (
              <li key={key}>
                <FadeIn delay={(i % 2) * 0.08} className="h-full">
                  <div className="h-full rounded-[1.75rem] bg-surface p-7 shadow-soft sm:p-9">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-lime-soft text-forest">
                      <Icon aria-hidden="true" className="size-7" />
                    </span>
                    <h2 className="mt-5 text-2xl sm:text-3xl">{t(`${key}.title`)}</h2>
                    <p className="mt-3 text-lg text-muted">{t(`${key}.text`)}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Was Felix nicht tut */}
      <section className="py-20 sm:py-28">
        <Container>
          <FadeIn>
            <h2 className="text-3xl sm:text-[2.4rem]">{t("not.title")}</h2>
          </FadeIn>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notItems.map((item, i) => {
              const isEmergency = i === 0;
              const Icon = isEmergency ? Siren : Ban;
              return (
                <li key={item.title}>
                  <FadeIn delay={(i % 3) * 0.06} className="h-full">
                    <div
                      className={`h-full rounded-[1.75rem] p-7 ${
                        isEmergency ? "border-2 border-danger/25 bg-danger-soft" : "bg-sage"
                      }`}
                    >
                      <span
                        className={`flex size-12 items-center justify-center rounded-2xl ${
                          isEmergency ? "bg-danger text-white" : "bg-surface text-forest"
                        }`}
                      >
                        <Icon aria-hidden="true" className="size-6" />
                      </span>
                      <h3 className={`mt-5 text-xl ${isEmergency ? "text-ink" : ""}`}>{item.title}</h3>
                      <p className={`mt-2 ${isEmergency ? "text-ink" : "text-muted"}`}>{item.text}</p>
                    </div>
                  </FadeIn>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Felix beenden */}
      <section className="bg-sage py-20 sm:py-24">
        <Container size="narrow">
          <FadeIn>
            <div className="rounded-[1.75rem] bg-surface p-8 shadow-soft sm:p-10">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-lime-soft text-forest">
                <PhoneOff aria-hidden="true" className="size-7" />
              </span>
              <h2 className="mt-5 text-3xl">{t("stop.title")}</h2>
              <p className="mt-4 text-lg text-muted">{t("stop.text")}</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <CtaBanner title={t("cta.title")} />
    </>
  );
}
