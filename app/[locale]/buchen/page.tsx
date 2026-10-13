import { Phone } from "lucide-react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { BookingForm } from "@/components/forms/BookingForm";
import { CheckList } from "@/components/ui/CheckList";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { company } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "booking.meta" });
  return buildMetadata({ locale, href: "/buchen", title: t("title"), description: t("description") });
}

export default async function BookingPage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("booking");
  const messages = await getMessages();

  return (
    <section className="pb-20 pt-12 sm:pb-28 sm:pt-16">
      <Container className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div>
          <SectionHeader as="h1" title={t("title")} intro={t("intro")} />
          <div className="mt-10">
            <NextIntlClientProvider
              messages={{ booking: messages.booking, formErrors: messages.formErrors, common: messages.common }}
            >
              <BookingForm />
            </NextIntlClientProvider>
          </div>
        </div>
        <aside className="lg:pt-48">
          <div className="rounded-[1.75rem] bg-sage p-7 lg:sticky lg:top-28">
            <h2 className="text-xl">{t("aside.title")}</h2>
            <CheckList items={t.raw("aside.items") as string[]} className="mt-5" />
            <p className="mt-6 border-t border-forest/15 pt-5 text-muted">{t("aside.help")}</p>
            <a
              href={`tel:${company.phone.replace(/\s/g, "")}`}
              className="mt-1 inline-flex min-h-12 items-center gap-2 text-xl font-extrabold text-forest underline-offset-4 hover:underline"
            >
              <Phone aria-hidden="true" className="size-5" />
              {company.phoneDisplay}
            </a>
          </div>
        </aside>
      </Container>
    </section>
  );
}
