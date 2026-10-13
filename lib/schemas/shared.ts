import type deMessages from "@/messages/de.json";

/** Fehlercodes = Schlüssel unter "formErrors" in messages/*.json. */
export type FormErrorKey = Exclude<keyof (typeof deMessages)["formErrors"], "summaryTitle" | "generic">;

export type FieldErrors<K extends string = string> = Partial<Record<K, FormErrorKey>>;

/** Wandelt Zod-Issues in { feld: fehlercode } um (erster Fehler pro Feld). */
export function toFieldErrors(
  issues: { path: PropertyKey[]; message: string }[],
): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const field = String(issue.path[0] ?? "form");
    if (!errors[field]) errors[field] = issue.message as FormErrorKey;
  }
  return errors;
}
