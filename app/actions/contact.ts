"use server";

import { notifyAddress, sendMail } from "@/lib/email/send";
import { renderEmail, renderText } from "@/lib/email/templates";
import { contactSchema, type ContactData } from "@/lib/schemas/contact";
import { toFieldErrors, type FieldErrors } from "@/lib/schemas/shared";
import { HONEYPOT_FIELD, looksLikeSpam } from "@/lib/spam";

export type ContactInput = ContactData & {
  [HONEYPOT_FIELD]: string;
  startedAt: number;
  locale: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; fieldErrors?: FieldErrors<keyof ContactData>; error?: "generic" };

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  if (looksLikeSpam(input?.[HONEYPOT_FIELD], input?.startedAt)) return { ok: true };

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error.issues) as FieldErrors<keyof ContactData> };
  }
  const data = parsed.data;

  const to = process.env.CONTACT_NOTIFY_EMAIL || notifyAddress();

  const table: [string, string][] = [
    ["Name", data.name],
    ["E-Mail", data.email],
    ["Telefon", data.phone || "–"],
    ["Sprache", input.locale === "en" ? "en" : "de"],
    ["Nachricht", data.message],
  ];
  const paragraphs = ["Neue Nachricht über das Kontaktformular:"];
  const ok = await sendMail({
    to,
    subject: `Kontaktanfrage von ${data.name}`,
    html: renderEmail({ paragraphs, table }),
    text: renderText({ paragraphs, table }),
    replyTo: data.email,
  });
  return ok ? { ok: true } : { ok: false, error: "generic" };
}
