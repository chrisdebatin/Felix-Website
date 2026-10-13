/** Name des versteckten Honeypot-Felds. Menschen sehen es nicht, Bots füllen es oft aus. */
export const HONEYPOT_FIELD = "website";

/** Formulare, die schneller als das abgeschickt werden, stammen sehr wahrscheinlich von Bots. */
const MIN_FILL_MS = 3000;

export function looksLikeSpam(honeypot: unknown, startedAt: unknown): boolean {
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;
  if (typeof startedAt !== "number") return true;
  return Date.now() - startedAt < MIN_FILL_MS;
}
