import { Bot, HandHeart, MessageSquareOff, MicOff, Siren } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Reihenfolge wie im Briefing. "emergency" wird als Warnhinweis hervorgehoben.
const items = [
  { key: "ai", Icon: Bot },
  { key: "emergency", Icon: Siren },
  { key: "advice", Icon: MessageSquareOff },
  { key: "recording", Icon: MicOff },
  { key: "voluntary", Icon: HandHeart },
] as const;

export async function TrustSection() {
  const t = await getTranslations("home.trust");

  return (
    <section className="bg-sage py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
        </FadeIn>
        {/* 6er-Raster: 3 Karten oben, die letzten 2 mittig darunter. */}
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {items.map(({ key, Icon }, i) => {
            const isEmergency = key === "emergency";
            return (
              <li key={key} className={`lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""}`}>
                <FadeIn delay={i * 0.06} className="h-full">
                  <div
                    className={`h-full rounded-[1.75rem] p-7 shadow-soft ${
                      isEmergency ? "border-2 border-danger/25 bg-danger-soft" : "bg-surface"
                    }`}
                  >
                    <span
                      className={`flex size-14 items-center justify-center rounded-2xl ${
                        isEmergency ? "bg-danger text-white" : "bg-lime-soft text-forest"
                      }`}
                    >
                      <Icon aria-hidden="true" className="size-7" />
                    </span>
                    <h3 className={`mt-5 text-xl ${isEmergency ? "text-ink" : ""}`}>{t(`items.${key}.title`)}</h3>
                    <p className={`mt-2 ${isEmergency ? "text-ink" : "text-muted"}`}>{t(`items.${key}.text`)}</p>
                  </div>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
