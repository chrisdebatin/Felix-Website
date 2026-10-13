import { Heart, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function BenefitsSection() {
  const t = await getTranslations("home.benefits");
  const groups = [
    {
      key: "forYou",
      Icon: Heart,
      title: t("forYou.title"),
      items: t.raw("forYou.items") as string[],
      className: "bg-accent-soft",
    },
    {
      key: "forFamily",
      Icon: Users,
      title: t("forFamily.title"),
      items: t.raw("forFamily.items") as string[],
      className: "bg-surface border border-line",
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
        </FadeIn>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {groups.map(({ key, Icon, title, items, className }, i) => (
            <FadeIn key={key} delay={i * 0.08} className="h-full">
              <div className={`h-full rounded-[1.75rem] p-7 shadow-soft sm:p-10 ${className}`}>
                <div className="flex items-center gap-4">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-brand text-white">
                    <Icon aria-hidden="true" className="size-7" />
                  </span>
                  <h3 className="text-3xl font-semibold">{title}</h3>
                </div>
                {/* TODO(chris): Rückmeldung an Angehörige (4. Punkt "Für Angehörige") – ist das geplant? */}
                <CheckList items={items} className="mt-8 text-lg" />
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
