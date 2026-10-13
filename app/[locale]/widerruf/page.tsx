import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/sections/LegalPage";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "legal.withdrawal" });
  return buildMetadata({ locale, href: "/widerruf", title: t("meta.title"), description: t("meta.description") });
}

export default async function WithdrawalPage({ params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const t = await getTranslations("legal.withdrawal");

  return (
    <LegalPage doc="withdrawal">
      <p className="font-semibold">{t("end")}</p>
      <div className="mt-12 rounded-card border-2 border-dashed border-forest/25 bg-sage p-6 sm:p-8">
        <h2 className="!mt-0">{t("form.title")}</h2>
        <p className="text-muted">{t("form.intro")}</p>
        <ul className="!list-none !pl-0">
          {(t.raw("form.lines") as string[]).map((line) => (
            <li key={line} className="mb-4">
              {line}
            </li>
          ))}
        </ul>
        <p className="text-base text-muted">{t("form.footnote")}</p>
      </div>
    </LegalPage>
  );
}
