import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  const t = useTranslations("notFound");
  const common = useTranslations("common");
  return (
    <section className="py-20 sm:py-28">
      <Container size="narrow" className="text-center">
        <title>{t("meta.title")}</title>
        <p className="font-display text-7xl font-extrabold text-forest">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted">{t("text")}</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/">{common("backHome")}</ButtonLink>
          <ButtonLink href="/kontakt" variant="secondary">
            {common("contactCta")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
