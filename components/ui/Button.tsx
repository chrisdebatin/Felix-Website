import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "onDark";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 text-center";

const variants: Record<Variant, string> = {
  // Weiß auf #C73E20 erfüllt WCAG AA (5:1); #E8512F wäre für normalen Text zu hell.
  primary:
    "bg-brand-dark text-white shadow-lift hover:bg-brand-darker active:bg-brand-darker",
  secondary:
    "border-2 border-ink/15 bg-surface text-ink hover:border-brand-dark hover:text-brand-dark",
  onDark: "bg-white text-brand-darker hover:bg-cream",
};

const sizes: Record<Size, string> = {
  md: "min-h-14 px-7 py-3 text-lg",
  sm: "min-h-12 px-5 py-2 text-base",
};

export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className = "",
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type LinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: LinkProps) {
  return (
    <Link {...props} className={buttonClasses(variant, size, className)}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={buttonClasses(variant, size, className)}
    />
  );
}
