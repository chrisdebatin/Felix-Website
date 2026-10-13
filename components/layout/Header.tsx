import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { mainNav } from "./navItems";

export async function Header() {
  const t = await getTranslations("nav");
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur-md supports-[backdrop-filter]:bg-cream/80">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" aria-label={t("homeLink")} className="rounded-lg">
          <Logo />
        </Link>

        <nav aria-label={t("mainLabel")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  className="flex min-h-12 items-center rounded-full px-4 font-medium text-ink transition-colors hover:text-brand-dark"
                >
                  {t(item.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:block" />
          <div className="hidden md:block">
            <ButtonLink href="/buchen" size="sm">
              {t("book")}
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
