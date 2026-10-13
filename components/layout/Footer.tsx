import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/components/Logo";
import { Hill } from "@/components/ui/BrandShapes";
import { Container } from "@/components/ui/Container";
import { PartnerBadge } from "@/components/ui/PartnerBadge";
import { company } from "@/lib/site";
import { mainNav } from "./navItems";

const linkClass =
  "inline-flex min-h-11 items-center text-white/85 underline-offset-4 hover:text-white hover:underline";
const headingClass = "font-sans text-sm font-extrabold uppercase tracking-[0.12em] text-lime";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const common = await getTranslations("common");
  const year = new Date().getFullYear();

  return (
    // --focus-color: Auf dem dunklen Grün ist ein Lime-Fokusrahmen besser sichtbar.
    <footer className="mt-auto [--focus-color:var(--color-lime)]">
      <Hill className="fill-forest-deep" />
      <div className="bg-forest-deep pb-28 pt-10 text-white md:pb-12">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg" aria-label={nav("homeLink")}>
                <LogoMark className="size-11" />
                <span className="font-display text-3xl font-extrabold text-white">Felix</span>
              </Link>
              <p className="mt-4 max-w-xs text-white/85">{t("tagline")}</p>
              <p className="mt-4 max-w-xs text-sm text-white/85">{common("emergencyNote")}</p>
              <PartnerBadge tone="dark" className="mt-6 text-base" />
            </div>

            <nav aria-label={t("navTitle")} className="md:col-span-3">
              <h2 className={headingClass}>{t("navTitle")}</h2>
              <ul className="mt-3">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {nav(item.key)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/kontakt" className={linkClass}>
                    {nav("contact")}
                  </Link>
                </li>
                <li>
                  <Link href="/buchen" className={linkClass}>
                    {nav("book")}
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label={t("legalTitle")} className="md:col-span-2">
              <h2 className={headingClass}>{t("legalTitle")}</h2>
              <ul className="mt-3">
                <li><Link href="/impressum" className={linkClass}>{t("imprint")}</Link></li>
                <li><Link href="/datenschutz" className={linkClass}>{t("privacy")}</Link></li>
                <li><Link href="/agb" className={linkClass}>{t("terms")}</Link></li>
                <li><Link href="/widerruf" className={linkClass}>{t("withdrawal")}</Link></li>
              </ul>
            </nav>

            <div className="md:col-span-3">
              <h2 className={headingClass}>{t("contactTitle")}</h2>
              <address className="mt-4 not-italic text-white/85">
                {company.shortName}
                <br />
                {company.street}
                <br />
                {company.postalCode} {company.city}
              </address>
              <ul className="mt-2">
                <li>
                  <a href={`mailto:${company.email}`} className={linkClass}>
                    {company.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={linkClass}>
                    {company.phoneDisplay}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-8 text-sm text-white/85 md:flex-row md:justify-between">
            {/* TODO(chris): Formulierung zur Zusammenarbeit mit der Pflegeunion bestätigen (footer.disclaimer). */}
            <p className="max-w-2xl">{t("disclaimer")}</p>
            <p className="shrink-0">{t("copyright", { year })}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
