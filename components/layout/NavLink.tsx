"use client";

import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";

export function NavLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: AppPathname;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`${className} ${active ? "text-brand-dark" : ""}`}
    >
      {children}
    </Link>
  );
}
