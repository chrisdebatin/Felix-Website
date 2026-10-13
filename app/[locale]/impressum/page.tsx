import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { company } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "legal.imprint" });
  return buildMetadata({ locale, href: "/impressum", title: t("meta.title"), description: t("meta.description") });
}

export default async function ImprintPage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("legal.imprint");
  const { address, phone, email, managingDirector, vatId, responsibleForContent } = company;

  // TODO PLATZHALTER: Anschrift bestätigen, Geschäftsführung, Telefon, E-Mail, USt-ID,
  // Verantwortlich nach § 18 Abs. 2 MStV. Werte in lib/site.ts eintragen, dann erscheinen die Abschnitte.
  return (
    <LegalPage
      doc="imprint"
      lead={
        <>
          <h2>{t("labels.provider")}</h2>
          <p>
            {company.name}
            {address ? (
              <>
                <br />
                {address.street}
                <br />
                {address.postalCode} {address.city}
              </>
            ) : null}
          </p>
          {managingDirector ? (
            <>
              <h2>{t("labels.representedBy")}</h2>
              <p>{managingDirector}</p>
            </>
          ) : null}
          {phone || email ? (
            <>
              <h2>{t("labels.contact")}</h2>
              <p>
                {phone ? (
                  <>
                    {t("labels.phone")}: <a href={`tel:${phone.dial}`}>{phone.display}</a>
                    <br />
                  </>
                ) : null}
                {email ? (
                  <>
                    {t("labels.email")}: <a href={`mailto:${email}`}>{email}</a>
                  </>
                ) : null}
              </p>
            </>
          ) : null}
          {vatId ? (
            <>
              <h2>{t("labels.vatId")}</h2>
              <p>
                {t("labels.vatIdText")} {vatId}
              </p>
            </>
          ) : null}
          {responsibleForContent ? (
            <>
              <h2>{t("labels.responsible")}</h2>
              <p className="whitespace-pre-line">{responsibleForContent}</p>
            </>
          ) : null}
        </>
      }
    />
  );
}
