import { ArrowRight, Bot, Check, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Bubble } from "@/components/ui/Bubble";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";

export async function Hero() {
  const t = await getTranslations("home.hero");
  const common = await getTranslations("common");
  const trust = [common("trust.trial"), common("trust.cancel"), common("trust.eu")];

  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-accent/35 blur-3xl"
      />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="text-[2.75rem] font-semibold text-ink sm:text-6xl lg:text-[4.25rem]">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">{t("subtitle")}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/buchen">
              <Phone aria-hidden="true" className="size-5" />
              {common("bookCta")}
            </ButtonLink>
            <ButtonLink href="/so-funktionierts" variant="secondary">
              {common("howItWorksCta")}
              <ArrowRight aria-hidden="true" className="size-5" />
            </ButtonLink>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-base text-muted">
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check aria-hidden="true" className="size-5 text-success" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* TODO(chris): Optional später ein echtes Foto (z. B. Seniorin am Telefon) hinter der Gesprächskarte. */}
        <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
          <figcaption className="sr-only">{t("illustrationLabel")}</figcaption>
          <div
            aria-hidden="true"
            className="absolute -left-6 top-10 size-32 rounded-full bg-brand/15"
          />
          <div className="relative rounded-[2rem] border border-line bg-cream/80 p-5 shadow-lift backdrop-blur sm:p-7">
            <div className="mb-6 flex items-center gap-4 rounded-card bg-surface p-4 shadow-soft">
              <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-brand/50 motion-safe:animate-ping"
                />
                <Phone aria-hidden="true" className="relative size-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">{t("callStatus")}</p>
                <p className="text-sm text-muted">{t("callTime")}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Bubble who="felix" speakerName={common("felix")} size="lg">
                {t("felix1")}
              </Bubble>
              <Bubble who="customer" speakerName={t("customerName")} size="lg">
                {t("customer1")}
              </Bubble>
              <Bubble who="felix" speakerName={common("felix")} size="lg">
                {t("felix2")}
              </Bubble>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <Bot aria-hidden="true" className="size-5 text-brand-dark" />
              {common("aiDisclosure")}
            </p>
          </div>
        </figure>
      </Container>
    </section>
  );
}
