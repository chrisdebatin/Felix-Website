import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "forest" | "onDark";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-extrabold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 text-center";

const variants: Record<Variant, string> = {
  // Wie bei der Pflegeunion: Lime-Button mit dunkelgrüner Schrift (Kontrast 7,1:1).
  primary: "bg-lime text-forest-deep shadow-cta hover:bg-lime-dark active:bg-lime-dark",
  secondary:
    "border-2 border-forest/25 bg-surface text-forest-deep hover:border-forest hover:bg-sage",
  forest: "bg-forest text-white hover:bg-forest-dark active:bg-forest-dark",
  onDark: "border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-forest-deep",
};

const sizes: Record<Size, string> = {
  md: "min-h-14 px-5 py-3 text-base sm:px-7 sm:text-lg",
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
