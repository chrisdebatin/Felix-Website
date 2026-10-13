import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { company } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "legal.privacy" });
  return buildMetadata({ locale, href: "/datenschutz", title: t("meta.title"), description: t("meta.description") });
}

export default async function PrivacyPage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("legal.privacy");
  const { address, phone, email, dataProtectionOfficer } = company;

  // TODO PLATZHALTER: Anschrift, E-Mail und Telefon des Verantwortlichen sowie Datenschutzbeauftragte/r.
  // Werte in lib/site.ts eintragen, dann erscheinen sie in Abschnitt 1.
  return (
    <LegalPage
      doc="privacy"
      lead={
        <>
          <h2>{t("controller.heading")}</h2>
          <p>{t("controller.text")}</p>
          <p>
            {company.name}
            {address ? (
              <>
                <br />
                {address.street}, {address.postalCode} {address.city}
              </>
            ) : null}
            {email ? (
              <>
                <br />
                {t("controller.email")}: <a href={`mailto:${email}`}>{email}</a>
              </>
            ) : null}
            {phone ? (
              <>
                <br />
                {t("controller.phone")}: <a href={`tel:${phone.dial}`}>{phone.display}</a>
              </>
            ) : null}
          </p>
          {dataProtectionOfficer ? (
            <p className="whitespace-pre-line">
              {t("controller.dpo")}: {dataProtectionOfficer}
            </p>
          ) : null}
        </>
      }
    />
  );
}
