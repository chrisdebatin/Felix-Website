import { getTranslations } from "next-intl/server";
import { Conversation } from "@/components/ui/Bubble";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

type ConversationData = {
  label: string;
  customer: string;
  lines: { who: "felix" | "customer"; text: string }[];
};

export async function VoiceSection() {
  const t = await getTranslations("home.voice");
  const common = await getTranslations("common");
  const conversations = t.raw("conversations") as ConversationData[];

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        </FadeIn>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {conversations.map((c, i) => (
            <FadeIn key={c.label} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-[1.75rem] bg-sage p-6 sm:p-7">
                <h3 className="mb-6 self-start rounded-full bg-surface px-4 py-1.5 text-base text-forest-deep shadow-soft">
                  {c.label}
                </h3>
                <Conversation
                  label={c.label}
                  lines={c.lines}
                  felixName={common("felix")}
                  customerName={c.customer}
                />
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
