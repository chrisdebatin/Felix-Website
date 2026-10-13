import { Heart, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function BenefitsSection() {
  const t = await getTranslations("home.benefits");

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
        </FadeIn>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <FadeIn className="h-full">
            <div className="h-full rounded-[1.75rem] bg-forest p-7 text-white shadow-lift sm:p-10 [--focus-color:var(--color-lime)]">
              <div className="flex items-center gap-4">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-lime text-forest-deep">
                  <Heart aria-hidden="true" className="size-7" strokeWidth={2.5} />
                </span>
                <h3 className="text-3xl text-white">{t("forYou.title")}</h3>
              </div>
              <CheckList items={t.raw("forYou.items") as string[]} tone="dark" className="mt-8 text-lg" />
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="h-full">
            <div className="h-full rounded-[1.75rem] bg-sage p-7 sm:p-10">
              <div className="flex items-center gap-4">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-forest text-white">
                  <Users aria-hidden="true" className="size-7" strokeWidth={2.5} />
                </span>
                <h3 className="text-3xl">{t("forFamily.title")}</h3>
              </div>
              <CheckList items={t.raw("forFamily.items") as string[]} className="mt-8 text-lg" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
