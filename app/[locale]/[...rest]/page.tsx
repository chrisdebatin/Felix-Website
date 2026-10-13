import { notFound } from "next/navigation";

// Fängt alle unbekannten Pfade ab, damit app/[locale]/not-found.tsx greift.
export default function CatchAllPage() {
  notFound();
}
