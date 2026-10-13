import type { AppPathname } from "@/i18n/routing";

export const mainNav = [
  { href: "/so-funktionierts", key: "howItWorks" },
  { href: "/preise", key: "pricing" },
  { href: "/faq", key: "faq" },
  { href: "/ueber-uns", key: "about" },
] as const satisfies readonly { href: AppPathname; key: string }[];
