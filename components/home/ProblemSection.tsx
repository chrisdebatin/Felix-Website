import { MessageCircleQuestion, PhoneIncoming } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Eyebrow } from "@/components/ui/SectionHeader";

export async function ProblemSection() {
  const t = await getTranslations("home.problem");

  return (
    <section className="bg-sage pb-20 pt-6 sm:pb-28">
      <Container>
        <FadeIn>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
        </FadeIn>
        <div className="mt-2 grid gap-6 lg:grid-cols-2">
          <FadeIn className="h-full">
            <div className="h-full rounded-[1.75rem] bg-surface p-7 shadow-soft sm:p-10">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-lime-soft text-forest">
                <MessageCircleQuestion aria-hidden="true" className="size-7" />
              </span>
              <h2 className="mt-6 text-3xl sm:text-[2.3rem]">{t("title")}</h2>
              <p className="mt-5 text-lg text-muted">{t("text")}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="h-full">
            <div className="h-full rounded-[1.75rem] bg-forest p-7 text-white shadow-lift sm:p-10">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-lime text-forest-deep">
                <PhoneIncoming aria-hidden="true" className="size-7" strokeWidth={2.5} />
              </span>
              <h2 className="mt-6 text-3xl text-white sm:text-[2.3rem]">{t("solutionTitle")}</h2>
              <p className="mt-5 text-lg text-white">{t("solutionText")}</p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
