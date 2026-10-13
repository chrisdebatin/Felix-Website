import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

/** Abschließender Aufruf zum Buchen – grüne Fläche mit Lime-Hügel wie im Logo. */
export async function CtaBanner({
  title,
  text,
  bubble,
}: {
  title: string;
  text: string;
  bubble?: string;
}) {
  const t = await getTranslations("common");
  return (
    <section className="bg-surface py-16 sm:py-24">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] bg-forest px-5 pb-28 pt-12 text-white sm:px-14 sm:pb-36 sm:pt-16 [--focus-color:var(--color-lime)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-28 size-96 rounded-full border-[2.5rem] border-white/[0.07]"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 160"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full sm:h-28"
            >
              <path d="M0 160V96C220 18 980 18 1200 96V160Z" fill="#AFCA0B" />
            </svg>
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-3xl text-white sm:text-[2.5rem]">{title}</h2>
                <p className="mt-4 max-w-xl text-lg text-white sm:text-xl">{text}</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <ButtonLink href="/buchen">
                    {t("bookCta")}
                    <ArrowRight aria-hidden="true" className="hidden size-5 sm:block" />
                  </ButtonLink>
                </div>
                <p className="mt-5 text-base font-semibold text-white">
                  {t("trust.trial")} · {t("trust.cancel")} · {t("trust.eu")}
                </p>
              </div>
              {bubble ? (
                <div aria-hidden="true" className="hidden lg:block">
                  <div className="ml-auto max-w-xs rounded-bubble rounded-bl-md bg-white p-6 text-ink shadow-lift">
                    <div className="mb-2 flex items-center gap-2 text-sm font-bold text-muted">
                      <LogoMark className="size-6" />
                      {t("felix")}
                    </div>
                    <p className="font-display text-xl font-extrabold leading-snug text-forest-deep">„{bubble}“</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
