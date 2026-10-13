import { Ban, Bot, Server, ShieldCheck, Siren } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

const items = [
  { key: "gdpr", Icon: ShieldCheck },
  // TODO(chris): Bestätigen, dass alle Dienstleister (Telefonie, Sprach-KI, Hosting der Daten) in der EU verarbeiten.
  { key: "eu", Icon: Server },
  { key: "noSale", Icon: Ban },
  { key: "ai", Icon: Bot },
] as const;

export async function TrustSection() {
  const t = await getTranslations("home.trust");

  return (
    <section className="bg-sage py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
        </FadeIn>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, Icon }, i) => (
            <li key={key}>
              <FadeIn delay={i * 0.06} className="h-full">
                <div className="h-full rounded-[1.75rem] bg-surface p-7 shadow-soft">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-lime-soft text-forest">
                    <Icon aria-hidden="true" className="size-7" />
                  </span>
                  <h3 className="mt-5 text-xl">{t(`items.${key}.title`)}</h3>
                  <p className="mt-2 text-muted">{t(`items.${key}.text`)}</p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
        <FadeIn>
          <div className="mt-6 flex flex-col gap-4 rounded-[1.75rem] border-2 border-danger/25 bg-danger-soft p-7 sm:flex-row sm:items-center sm:gap-6">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-danger text-white">
              <Siren aria-hidden="true" className="size-7" />
            </span>
            <div>
              <h3 className="text-xl text-ink">{t("items.emergency.title")}</h3>
              <p className="mt-1 text-ink">{t("items.emergency.text")}</p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
