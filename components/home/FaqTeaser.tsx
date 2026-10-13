import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AccordionItem } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

const teaserIds = ["human", "emergency", "recording", "stop"] as const;

export async function FaqTeaser() {
  const t = await getTranslations("home.faqTeaser");
  const faq = await getTranslations("faq.items");

  return (
    <section className="bg-sage py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <FadeIn>
          <SectionHeader title={t("title")} />
          <Link
            href="/faq"
            className="mt-6 inline-flex min-h-12 items-center gap-2 text-lg font-extrabold text-forest underline-offset-4 hover:underline"
          >
            {t("more")}
            <ArrowRight aria-hidden="true" className="size-5" />
          </Link>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="space-y-4">
            {teaserIds.map((id) => (
              <AccordionItem key={id} question={faq(`${id}.q`)} answer={faq(`${id}.a`)} />
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
