import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function PricingTeaser() {
  const t = await getTranslations("home.pricingTeaser");
  const common = await getTranslations("common");

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <FadeIn>
          <div className="grid items-center gap-10 rounded-[2rem] border border-line bg-surface p-5 shadow-soft sm:p-12 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("text")} />
              <Link
                href="/preise"
                className="mt-6 inline-flex min-h-12 items-center gap-2 text-lg font-extrabold text-forest underline-offset-4 hover:underline"
              >
                {t("link")}
                <ArrowRight aria-hidden="true" className="size-5" />
              </Link>
            </div>
            <div className="rounded-[1.5rem] bg-sage p-6 sm:p-9">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="whitespace-nowrap font-display text-6xl font-extrabold text-forest-deep">{common("price")}</span>
                <span className="text-lg font-semibold text-muted">{common("perMonth")}</span>
              </p>
              <CheckList items={t.raw("points") as string[]} className="mt-6 text-lg" />
              <ButtonLink href="/buchen" className="mt-8 w-full sm:w-auto">
                {common("bookShort")}
              </ButtonLink>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
