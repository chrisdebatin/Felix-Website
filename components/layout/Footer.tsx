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
  const { address, email, phone } = company;

  return (
    // --focus-color: Auf dem dunklen Grün ist ein Lime-Fokusrahmen besser sichtbar.
    <footer className="[--focus-color:var(--color-lime)]">
      <Hill className="fill-forest-deep" />
      <div className="bg-forest-deep pb-12 pt-10 text-white">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg" aria-label={nav("homeLink")}>
                <LogoMark className="size-11" />
                <span className="font-display text-3xl font-extrabold text-white">Felix</span>
              </Link>
              <p className="mt-4 max-w-sm text-white/85">{t("tagline")}</p>
              <p className="mt-4 max-w-sm text-sm text-white/85">{common("emergencyNote")}</p>
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
              </ul>
            </nav>

            <nav aria-label={t("legalTitle")} className="md:col-span-2">
              <h2 className={headingClass}>{t("legalTitle")}</h2>
              <ul className="mt-3">
                <li><Link href="/impressum" className={linkClass}>{t("imprint")}</Link></li>
                <li><Link href="/datenschutz" className={linkClass}>{t("privacy")}</Link></li>
              </ul>
            </nav>

            <div className="md:col-span-2">
              <h2 className={headingClass}>{t("contactTitle")}</h2>
              <p className="mt-4 text-white/85">{company.shortName}</p>
              {/* TODO PLATZHALTER: Anschrift, E-Mail und Telefon erscheinen hier, sobald sie in lib/site.ts eingetragen sind. */}
              {address ? (
                <address className="not-italic text-white/85">
                  {address.street}
                  <br />
                  {address.postalCode} {address.city}
                </address>
              ) : null}
              <ul className="mt-2">
                {email ? (
                  <li>
                    <a href={`mailto:${email}`} className={linkClass}>
                      {email}
                    </a>
                  </li>
                ) : null}
                {phone ? (
                  <li>
                    <a href={`tel:${phone.dial}`} className={linkClass}>
                      {phone.display}
                    </a>
                  </li>
                ) : null}
                <li>
                  <Link href="/kontakt" className={linkClass}>
                    {t("contactLink")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-8 text-sm text-white/85 md:flex-row md:justify-between">
            <p className="max-w-2xl">{t("disclaimer")}</p>
            <p className="shrink-0">{t("copyright", { year })}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
