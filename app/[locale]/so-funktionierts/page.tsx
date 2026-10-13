import { CalendarClock, Clock, PauseCircle, Send } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Bubble } from "@/components/ui/Bubble";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

const rhythms = ["daily", "severalWeekly", "weekly"] as const;
const timeWindows = ["morning", "afternoon", "evening"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "howItWorks.meta" });
  return buildMetadata({ locale, href: "/so-funktionierts", title: t("title"), description: t("description") });
}

export default async function HowItWorksPage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("howItWorks");
  const common = await getTranslations("common");
  const steps = t.raw("flow.steps") as { title: string; text: string }[];
  const topics = t.raw("topics.items") as string[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} text={t("hero.text")} />

      {/* Ablauf */}
      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-3xl sm:text-[2.4rem]">{t("flow.title")}</h2>
            {/* TODO(chris): Zeitraum bis zum ersten Anruf ("innerhalb von zwei Werktagen") bestätigen. */}
            <ol className="relative mt-10 space-y-10 before:absolute before:bottom-6 before:left-6 before:top-6 before:w-0.5 before:bg-line">
              {steps.map((step, i) => (
                <li key={step.title} className="relative flex gap-6">
                  <span
                    aria-hidden="true"
                    className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-lime font-display text-xl font-extrabold text-forest-deep"
                  >
                    {i + 1}
                  </span>
                  {/* Ohne Einblenden: Die ersten Schritte stehen direkt im sichtbaren Bereich (LCP). */}
                  <div>
                    <h3 className="text-2xl">{step.title}</h3>
                    <p className="mt-2 text-lg text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <PhotoPlaceholder photo={t("photoAlt")} className="aspect-[4/5] w-full" />
          </div>
        </Container>
      </section>

      {/* Worüber Felix spricht */}
      <section className="bg-sage py-20 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeader title={t("topics.title")} intro={t("topics.intro")} />
            <p className="mt-6 rounded-card bg-surface p-5 text-ink shadow-soft">{t("topics.note")}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            {/* TODO(chris): Beispielfragen mit dem tatsächlichen Gesprächsleitfaden von Felix abgleichen. */}
            <ul className="flex flex-col gap-4">
              {topics.map((topic) => (
                <li key={topic} className="flex">
                  <Bubble who="felix" speakerName={common("felix")}>
                    {topic}
                  </Bubble>
                </li>
              ))}
            </ul>
          </FadeIn>
        </Container>
      </section>

      {/* Dauer & Rhythmus */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <FadeIn className="h-full">
              {/* TODO(chris): Anrufdauer (ca. 5–10 Minuten) bestätigen. */}
              <div className="h-full rounded-[1.75rem] bg-forest p-8 text-white">
                <Clock aria-hidden="true" className="size-9" />
                <h2 className="mt-5 text-xl text-white">{t("duration.title")}</h2>
                <p className="mt-2 font-display text-4xl font-extrabold text-lime">{t("duration.value")}</p>
                <p className="mt-4 text-white">{t("duration.text")}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.08} className="h-full lg:col-span-2">
              <div className="h-full rounded-[1.75rem] border border-line bg-surface p-8 shadow-soft">
                <CalendarClock aria-hidden="true" className="size-9 text-forest" />
                <h2 className="mt-5 text-3xl">{t("rhythm.title")}</h2>
                <p className="mt-3 text-lg text-muted">{t("rhythm.intro")}</p>
                <ul className="mt-7 grid gap-4 sm:grid-cols-3">
                  {rhythms.map((r) => (
                    <li key={r} className="rounded-card bg-sage p-5">
                      <p className="font-extrabold text-forest-deep">{common(`rhythms.${r}.label`)}</p>
                      <p className="mt-1 text-base text-muted">{common(`rhythms.${r}.text`)}</p>
                    </li>
                  ))}
                </ul>
                {/* TODO(chris): Zeitfenster (Uhrzeiten) bestätigen – stehen in messages/*.json unter common.timeWindows. */}
                <h3 className="mt-8 text-lg">{t("rhythm.timeTitle")}</h3>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {timeWindows.map((w) => (
                    <li key={w} className="rounded-full bg-lime-soft px-4 py-2 text-base">
                      <span className="font-extrabold text-forest-deep">{common(`timeWindows.${w}.label`)}</span>{" "}
                      <span className="text-muted">· {common(`timeWindows.${w}.hours`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Feedback & Pausieren */}
      <section className="bg-sage py-20 sm:py-28">
        <Container className="grid gap-6 lg:grid-cols-2">
          <FadeIn className="h-full">
            {/* TODO(chris): Ablauf der Feedback-Weitergabe an den Pflegedienst bestätigen (Zusammenfassung, Freigabe, Kanal). */}
            <div className="h-full rounded-[1.75rem] bg-surface p-8 shadow-soft sm:p-10">
              <Send aria-hidden="true" className="size-9 text-forest" />
              <h2 className="mt-5 text-3xl">{t("feedback.title")}</h2>
              <CheckList items={t.raw("feedback.items") as string[]} className="mt-6 text-lg" />
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="h-full">
            {/* TODO(chris): Kündigungswege und Pausieren bestätigen; vor Start Kündigungsbutton nach § 312k BGB umsetzen. */}
            <div className="h-full rounded-[1.75rem] bg-surface p-8 shadow-soft sm:p-10">
              <PauseCircle aria-hidden="true" className="size-9 text-forest" />
              <h2 className="mt-5 text-3xl">{t("pause.title")}</h2>
              <p className="mt-4 text-lg text-muted">{t("pause.text")}</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <CtaBanner title={t("cta.title")} text={t("cta.text")} />
    </>
  );
}
