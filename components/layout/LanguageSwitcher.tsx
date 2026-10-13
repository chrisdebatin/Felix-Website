"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")} className={className}>
      <ul className="flex items-center rounded-full border border-line bg-surface p-1">
        {routing.locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                href={pathname}
                locale={l}
                hrefLang={l}
                lang={l}
                onClick={onNavigate}
                aria-current={active ? "true" : undefined}
                className={`flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-ink text-white"
                    : "text-muted hover:text-brand-dark"
                }`}
              >
                <span aria-hidden="true">{l.toUpperCase()}</span>
                <span className="sr-only">{t(`languageNames.${l}`)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
