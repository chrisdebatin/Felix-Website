import { HandHeart, Puzzle, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import pflegeunionLogo from "@/public/brand/pflegeunion-logo.png";

type Props = { params: Promise<{ locale: string }> };

const stance = [
  { key: "honest", Icon: Sparkles },
  { key: "complement", Icon: Puzzle },
  { key: "voluntary", Icon: HandHeart },
  { key: "limits", Icon: ShieldCheck },
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return buildMetadata({ locale, href: "/ueber-uns", title: t("title"), description: t("description") });
}

export default async function AboutPage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const common = await getTranslations("common");

  return (
    <>
      {/* TODO PLATZHALTER: Ort in der Einleitung ergänzen, sobald die Anschrift bestätigt ist. */}
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} text={t("hero.text")} />

      <section className="pb-20 sm:pb-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <h2 className="text-3xl sm:text-[2.4rem]">{t("motivation.title")}</h2>
            <div className="mt-6 space-y-5 text-lg text-muted">
              {(t.raw("motivation.paragraphs") as string[]).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <PhotoPlaceholder photo={t("photoAlt")} className="aspect-[4/3] w-full" />
          </FadeIn>
        </Container>
      </section>

      <section className="bg-sage py-20 sm:py-28">
        <Container>
          <FadeIn>
            <h2 className="max-w-2xl text-3xl sm:text-[2.4rem]">{t("stance.title")}</h2>
          </FadeIn>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {stance.map(({ key, Icon }, i) => (
              <li key={key}>
                <FadeIn delay={i * 0.06} className="h-full">
                  <div className="flex h-full gap-5 rounded-[1.75rem] bg-surface p-7 shadow-soft">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-forest text-white">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-xl">{t(`stance.items.${key}.title`)}</h3>
                      <p className="mt-2 text-muted">{t(`stance.items.${key}.text`)}</p>
                    </div>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <FadeIn>
            <div className="flex flex-col gap-6 rounded-[1.75rem] border border-line bg-surface p-8 shadow-soft sm:flex-row sm:items-center sm:p-10">
              {/* Dekorativ: Der Name steht in der Überschrift. */}
              <Image src={pflegeunionLogo} alt="" width={96} height={96} className="size-20 shrink-0" />
              <div>
                <h2 className="text-2xl sm:text-3xl">{t("partner.title")}</h2>
                <p className="mt-3 text-lg text-muted">{t("partner.text")}</p>
              </div>
            </div>
          </FadeIn>
          <div className="mt-12 flex justify-center">
            <ButtonLink href="/kontakt">{common("contactCta")}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
