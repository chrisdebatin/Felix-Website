import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-darker">
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Heading = "h2",
  id,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
}) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  const size =
    Heading === "h1"
      ? "text-[2.4rem] sm:text-5xl lg:text-[3.6rem]"
      : "text-3xl sm:text-[2.6rem]";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading id={id} className={`${size} font-semibold text-ink`}>
        {title}
      </Heading>
      {intro ? (
        <p className="mt-5 text-lg text-muted sm:text-xl">{intro}</p>
      ) : null}
    </div>
  );
}
