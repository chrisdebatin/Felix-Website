"use client";

import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { ButtonLink } from "@/components/ui/Button";

/** Immer sichtbarer Buchungs-Button am unteren Bildschirmrand (nur mobil). */
export function StickyCta() {
  const t = useTranslations("common");
  const pathname = usePathname();
  if (pathname.startsWith("/buchen")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
      <ButtonLink href="/buchen" className="w-full">
        <Phone aria-hidden="true" className="size-5" />
        {t("bookCta")}
      </ButtonLink>
    </div>
  );
}
