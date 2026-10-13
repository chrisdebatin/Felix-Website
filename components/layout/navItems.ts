import type { AppPathname } from "@/i18n/routing";

export const mainNav = [
  { href: "/so-funktionierts", key: "howItWorks" },
  { href: "/faq", key: "faq" },
  { href: "/ueber-uns", key: "about" },
  { href: "/kontakt", key: "contact" },
] as const satisfies readonly { href: AppPathname; key: string }[];
