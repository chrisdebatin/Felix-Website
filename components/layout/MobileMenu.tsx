"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavLink } from "./NavLink";
import { mainNav } from "./navItems";

export function MobileMenu() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  // Beim Seitenwechsel schließen.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex size-12 items-center justify-center rounded-full border border-line bg-sage text-forest-deep"
      >
        {open ? (
          <X aria-hidden="true" className="size-6" />
        ) : (
          <Menu aria-hidden="true" className="size-6" />
        )}
        <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-surface px-5 pb-10 pt-4"
      >
        <nav aria-label={t("mobileLabel")}>
          <ul className="divide-y divide-line border-y border-line">
            <li>
              <NavLink
                href="/"
                onClick={close}
                className="flex min-h-16 items-center font-display text-2xl font-extrabold text-forest-deep"
              >
                {t("home")}
              </NavLink>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  onClick={close}
                  className="flex min-h-16 items-center font-display text-2xl font-extrabold text-forest-deep"
                >
                  {t(item.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex items-center justify-between gap-4">
          <span className="text-muted">{t("language")}</span>
          <LanguageSwitcher onNavigate={close} />
        </div>
      </div>
    </div>
  );
}
