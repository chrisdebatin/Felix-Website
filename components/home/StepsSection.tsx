import { ArrowRight, CircleCheck, HeartHandshake, PhoneIncoming } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

const icons = [HeartHandshake, CircleCheck, PhoneIncoming];

export async function StepsSection() {
  const t = await getTranslations("home.steps");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section className="bg-sage py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeader title={t("title")} />
        </FadeIn>
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={item.title}>
                <FadeIn delay={i * 0.08} className="h-full">
                  <div className="relative h-full rounded-[1.75rem] bg-surface p-7 shadow-soft sm:p-8">
                    <div className="flex items-center justify-between">
                      <span
                        aria-hidden="true"
                        className="flex size-14 items-center justify-center rounded-full bg-lime font-display text-2xl font-extrabold text-forest-deep"
                      >
                        {i + 1}
                      </span>
                      <span className="flex size-14 items-center justify-center rounded-2xl bg-sage text-forest">
                        <Icon aria-hidden="true" className="size-7" />
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl">{item.title}</h3>
                    <p className="mt-3 text-muted">{item.text}</p>
                  </div>
                </FadeIn>
              </li>
            );
          })}
        </ol>
        <div className="mt-10">
          <Link
            href="/so-funktionierts"
            className="inline-flex min-h-12 items-center gap-2 text-lg font-extrabold text-forest underline-offset-4 hover:underline"
          >
            {t("cta")}
            <ArrowRight aria-hidden="true" className="size-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
