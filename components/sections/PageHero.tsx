import type { ReactNode } from "react";
import { Rings } from "@/components/ui/BrandShapes";
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
      <Rings className="pointer-events-none absolute -right-36 -top-44 hidden size-[30rem] lg:block" />
      <Container className="relative">
        <SectionHeader as="h1" eyebrow={eyebrow} title={title} intro={text} />
        {children}
      </Container>
    </section>
  );
}
