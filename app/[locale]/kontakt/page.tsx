import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { company } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return buildMetadata({ locale, href: "/kontakt", title: t("title"), description: t("description") });
}

export default async function ContactPage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const messages = await getMessages();

  const rowClass = "flex gap-4";
  const iconClass = "mt-1 size-6 shrink-0 text-forest";

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} text={t("hero.text")} />
      <section className="pb-20 sm:pb-28">
        <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          {/* TODO(chris): E-Mail, Telefonnummer und Erreichbarkeit eintragen (lib/site.ts, contact.details.hours). */}
          <div className="rounded-[1.75rem] bg-sage p-7 sm:p-9">
            <h2 className="text-2xl">{t("details.title")}</h2>
            <ul className="mt-6 space-y-6 text-lg">
              <li className={rowClass}>
                <Mail aria-hidden="true" className={iconClass} />
                <div>
                  <p className="text-base text-muted">{t("details.email")}</p>
                  <a href={`mailto:${company.email}`} className="font-bold text-forest underline-offset-4 hover:underline">
                    {company.email}
                  </a>
                </div>
              </li>
              <li className={rowClass}>
                <Phone aria-hidden="true" className={iconClass} />
                <div>
                  <p className="text-base text-muted">{t("details.phone")}</p>
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="font-bold text-forest underline-offset-4 hover:underline">
                    {company.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className={rowClass}>
                <Clock aria-hidden="true" className={iconClass} />
                <p>{t("details.hours")}</p>
              </li>
              <li className={rowClass}>
                <MapPin aria-hidden="true" className={iconClass} />
                <div>
                  <p className="text-base text-muted">{t("details.address")}</p>
                  <address className="not-italic">
                    {company.name}
                    <br />
                    {company.street}
                    <br />
                    {company.postalCode} {company.city}
                  </address>
                </div>
              </li>
            </ul>
          </div>
          <NextIntlClientProvider messages={{ contact: messages.contact, formErrors: messages.formErrors }}>
            <ContactForm />
          </NextIntlClientProvider>
        </Container>
      </section>
    </>
  );
}
