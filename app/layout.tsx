import type { ReactNode } from "react";
import "./globals.css";

// Das eigentliche <html>-Gerüst liegt in app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
