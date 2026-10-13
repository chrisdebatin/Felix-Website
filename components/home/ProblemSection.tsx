import { HeartHandshake, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Eyebrow } from "@/components/ui/SectionHeader";

const week = [
  { day: "mon", type: "visit" },
  { day: "tue", type: "call" },
  { day: "wed", type: "visit" },
  { day: "thu", type: "call" },
  { day: "fri", type: "visit" },
  { day: "sat", type: "call" },
  { day: "sun", type: "call" },
] as const;

export async function ProblemSection() {
  const t = await getTranslations("home.problem");

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <FadeIn>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-3xl font-semibold sm:text-[2.6rem]">{t("title")}</h2>
          <p className="mt-5 text-lg text-muted">{t("text")}</p>
          <h3 className="mt-10 text-2xl font-semibold text-brand-dark sm:text-3xl">
            {t("solutionTitle")}
          </h3>
          <p className="mt-4 text-lg text-muted">{t("solutionText")}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-[1.75rem] bg-cream p-6 shadow-soft sm:p-8">
            <h3 className="font-sans text-lg font-semibold">{t("weekTitle")}</h3>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" aria-hidden="true">
              <span className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-muted/50" /> {t("legendVisit")}
              </span>
              <span className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-brand" /> {t("legendCall")}
              </span>
            </div>
            <ul className="mt-6 grid grid-cols-7 gap-1.5 sm:gap-3">
              {week.map(({ day, type }) => (
                <li key={day} className="flex flex-col items-center gap-3">
                  <span className="sr-only">
                    {t(`daysLong.${day}`)}: {type === "visit" ? t("legendVisit") : t("legendCall")}
                  </span>
                  <span aria-hidden="true" className="text-sm font-semibold text-muted">
                    {t(`days.${day}`)}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex aspect-square w-full max-w-14 items-center justify-center rounded-2xl ${
                      type === "call"
                        ? "bg-brand text-white shadow-lift"
                        : "bg-muted/15 text-muted"
                    }`}
                  >
                    {type === "call" ? (
                      <Phone className="size-5" />
                    ) : (
                      <HeartHandshake className="size-5" />
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">{t("weekCaption")}</p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
