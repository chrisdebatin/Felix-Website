import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

/** Abschließender Aufruf zum Buchen – wird auf mehreren Seiten verwendet. */
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
    <section className="py-16 sm:py-24">
      <Container>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-dark px-6 py-14 text-white sm:px-14 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand opacity-70"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 right-24 size-72 rounded-full bg-brand-darker opacity-60"
            />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-3xl font-semibold text-white sm:text-[2.6rem]">
                  {title}
                </h2>
                <p className="mt-4 max-w-xl text-lg text-white sm:text-xl">{text}</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <ButtonLink href="/buchen" variant="onDark">
                    {t("bookCta")}
                    <ArrowRight aria-hidden="true" className="size-5" />
                  </ButtonLink>
                </div>
                <p className="mt-5 text-base text-white">
                  {t("trust.trial")} · {t("trust.cancel")} · {t("trust.eu")}
                </p>
              </div>
              {bubble ? (
                <div aria-hidden="true" className="hidden lg:block">
                  <div className="ml-auto max-w-xs rounded-bubble rounded-bl-md bg-white p-6 text-ink shadow-lift">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted">
                      <LogoMark className="size-6" />
                      {t("felix")}
                    </div>
                    <p className="font-serif text-xl leading-snug">„{bubble}“</p>
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
