import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-12 pt-12 sm:pb-16 sm:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-48 size-[30rem] rounded-full bg-accent/30 blur-3xl"
      />
      <Container className="relative">
        <SectionHeader as="h1" eyebrow={eyebrow} title={title} intro={text} />
        {children}
      </Container>
    </section>
  );
}
