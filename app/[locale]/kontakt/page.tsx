import { Clock, Info, Mail, MapPin, Phone } from "lucide-react";
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
  const { address, email, phone, hours } = company;

  const rowClass = "flex gap-4";
  const iconClass = "mt-1 size-6 shrink-0 text-forest";
  const linkClass = "font-bold text-forest underline-offset-4 hover:underline";

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} />
      <section className="pb-20 sm:pb-28">
        <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <p className="flex gap-4 rounded-[1.75rem] border-2 border-forest/20 bg-lime-soft/60 p-6 text-lg font-semibold text-forest-deep sm:p-7">
              <Info aria-hidden="true" className="mt-1 size-6 shrink-0 text-forest" />
              {t("careHint")}
            </p>

            <div className="rounded-[1.75rem] bg-sage p-7 sm:p-9">
              {/* TODO PLATZHALTER: E-Mail, Telefon, Erreichbarkeit und Anschrift. Jede Zeile erscheint erst, wenn der Wert in lib/site.ts eingetragen ist. */}
              <ul className="space-y-6 text-lg">
                {email ? (
                  <li className={rowClass}>
                    <Mail aria-hidden="true" className={iconClass} />
                    <div>
                      <p className="text-base text-muted">{t("details.email")}</p>
                      <a href={`mailto:${email}`} className={linkClass}>
                        {email}
                      </a>
                    </div>
                  </li>
                ) : null}
                {phone ? (
                  <li className={rowClass}>
                    <Phone aria-hidden="true" className={iconClass} />
                    <div>
                      <p className="text-base text-muted">{t("details.phone")}</p>
                      <a href={`tel:${phone.dial}`} className={linkClass}>
                        {phone.display}
                      </a>
                    </div>
                  </li>
                ) : null}
                {hours ? (
                  <li className={rowClass}>
                    <Clock aria-hidden="true" className={iconClass} />
                    <div>
                      <p className="text-base text-muted">{t("details.hours")}</p>
                      <p>{hours[locale]}</p>
                    </div>
                  </li>
                ) : null}
                <li className={rowClass}>
                  <MapPin aria-hidden="true" className={iconClass} />
                  <div>
                    <p className="text-base text-muted">{t("details.address")}</p>
                    <address className="not-italic">
                      {company.name}
                      {address ? (
                        <>
                          <br />
                          {address.street}
                          <br />
                          {address.postalCode} {address.city}
                        </>
                      ) : null}
                    </address>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <NextIntlClientProvider messages={{ contact: messages.contact, formErrors: messages.formErrors }}>
            <ContactForm />
          </NextIntlClientProvider>
        </Container>
      </section>
    </>
  );
}
