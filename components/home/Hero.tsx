import { ArrowRight, Bot, Check, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Hill, Rings } from "@/components/ui/BrandShapes";
import { ButtonLink } from "@/components/ui/Button";
import { Conversation } from "@/components/ui/Bubble";
import { Container } from "@/components/ui/Container";
import { PartnerBadge } from "@/components/ui/PartnerBadge";
import { Eyebrow } from "@/components/ui/SectionHeader";

type Line = { who: "felix" | "customer"; text: string };

export async function Hero() {
  const t = await getTranslations("home.hero");
  const common = await getTranslations("common");
  const badges = [common("badges.voluntary"), common("badges.stopAnytime"), common("badges.isAi")];

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-16">
      <Container className="relative grid items-start gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div className="lg:pt-10">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="text-[2.6rem] sm:text-6xl lg:text-[3.9rem]">{t("title")}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">{t("subtitle")}</p>
          <div className="mt-9">
            <ButtonLink href="/so-funktionierts">
              {common("howItWorksCta")}
              <ArrowRight aria-hidden="true" className="size-5" />
            </ButtonLink>
            <p className="mt-4 text-lg font-bold text-forest-deep">{t("hint")}</p>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-base font-semibold text-ink">
            {badges.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="flex size-6 items-center justify-center rounded-full bg-lime-soft text-forest">
                  <Check className="size-4" strokeWidth={3.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <PartnerBadge className="mt-8 border-t border-line pt-6" />
        </div>

        <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
          <figcaption className="sr-only">{t("illustrationLabel")}</figcaption>
          <Rings className="pointer-events-none absolute -right-24 -top-20 hidden size-[34rem] sm:block" />
          <div className="relative rounded-[2rem] border border-line bg-sage p-5 shadow-lift sm:p-7">
            <div className="mb-6 flex items-center gap-4 rounded-card bg-surface p-4 shadow-soft">
              <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-lime text-forest-deep">
                <Phone aria-hidden="true" className="relative size-5" strokeWidth={2.5} />
              </span>
              <div>
                <p className="font-extrabold text-forest-deep">{t("callStatus")}</p>
                <p className="text-sm font-semibold text-muted">{t("exampleLabel")}</p>
              </div>
            </div>
            <Conversation
              lines={t.raw("lines") as Line[]}
              felixName={common("felix")}
              customerName={t("customerName")}
            />
            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-muted">
              <Bot aria-hidden="true" className="size-5 shrink-0 text-forest" />
              {t("aiNote")}
            </p>
          </div>
        </figure>
      </Container>
      <div className="mt-16 sm:mt-20">
        <Hill className="fill-sage" />
      </div>
    </section>
  );
}
