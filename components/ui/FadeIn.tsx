"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

/** Sanftes Einblenden beim Scrollen. Bei "Bewegung reduzieren" entfällt die Verschiebung. */
export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      className={`fade-in ${className ?? ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
