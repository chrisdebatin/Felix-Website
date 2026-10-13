"use server";

import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notifyAddress, sendMail } from "@/lib/email/send";
import { renderEmail, renderText } from "@/lib/email/templates";
import { bookingSchema, type BookingData, type BookingField } from "@/lib/schemas/booking";
import { toFieldErrors, type FieldErrors } from "@/lib/schemas/shared";
import { HONEYPOT_FIELD, looksLikeSpam } from "@/lib/spam";

export type BookingInput = BookingData & {
  [HONEYPOT_FIELD]: string;
  startedAt: number;
  locale: string;
};

export type BookingResult =
  | { ok: true }
  | { ok: false; fieldErrors?: FieldErrors<BookingField>; error?: "generic" };

const de = {
  bookingFor: { self: "für sich selbst", relative: "für einen Angehörigen" },
  timeWindow: { morning: "vormittags", afternoon: "nachmittags", evening: "abends" },
  rhythm: { daily: "täglich", severalWeekly: "mehrmals pro Woche", weekly: "wöchentlich" },
} as const;

export async function submitBooking(input: BookingInput): Promise<BookingResult> {
  // Spam: so tun, als hätte alles geklappt, aber nichts verschicken.
  if (looksLikeSpam(input?.[HONEYPOT_FIELD], input?.startedAt)) return { ok: true };

  const locale = hasLocale(routing.locales, input.locale) ? input.locale : routing.defaultLocale;
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error.issues) as FieldErrors<BookingField> };
  }
  const data = parsed.data;

  // Normalisieren (E.164) und – falls das Schema umgangen wurde – erneut prüfen.
  const phone = parsePhoneNumberFromString(data.phone, "DE");
  if (!phone?.isValid()) {
    return { ok: false, fieldErrors: { phone: "phoneInvalid" } };
  }
  const phoneDisplay = phone.formatInternational();

  const to = notifyAddress();
  if (!to && process.env.NODE_ENV === "production") {
    console.error("[booking] BOOKING_NOTIFY_EMAIL ist nicht gesetzt.");
    return { ok: false, error: "generic" };
  }

  // 1) Interne Benachrichtigung an das Felix-Team (immer Deutsch).
  const internalTable: [string, string][] = [
    ["Buchung", de.bookingFor[data.bookingFor]],
    ["Anzurufende Person", data.calleeName],
    ["Telefon", `${phoneDisplay} (${phone.number})`],
    ["Zeitfenster", de.timeWindow[data.timeWindow]],
    ["Rhythmus", de.rhythm[data.rhythm]],
    ["Buchende Person", data.bookerName || "–"],
    ["E-Mail", data.bookerEmail || "–"],
    ["Einverständnis angerufene Person", data.bookingFor === "relative" ? "bestätigt" : "bucht selbst"],
    ["Datenschutz & AGB", "akzeptiert"],
    ["Sprache der Website", locale],
    ["Eingegangen", new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })],
  ];
  const internalParagraphs = ["Neue Buchung über die Website:"];
  const internalOk = await sendMail({
    to: to ?? "dev@localhost",
    subject: `Neue Buchung: ${data.calleeName} (${de.rhythm[data.rhythm]}, ${de.timeWindow[data.timeWindow]})`,
    html: renderEmail({ paragraphs: internalParagraphs, table: internalTable }),
    text: renderText({ paragraphs: internalParagraphs, table: internalTable }),
    replyTo: data.bookerEmail || undefined,
  });
  if (!internalOk) return { ok: false, error: "generic" };

  // 2) Bestätigung an die buchende Person – nur wenn eine E-Mail-Adresse angegeben wurde.
  if (data.bookerEmail) {
    const t = await getTranslations({ locale, namespace: "emails.booking" });
    const labels = await getTranslations({ locale, namespace: "booking.step3.summary" });
    const common = await getTranslations({ locale, namespace: "common" });
    const greetingName = data.bookingFor === "relative" ? data.bookerName : data.calleeName;

    const paragraphs = [
      t("greeting", { name: greetingName }),
      data.bookingFor === "relative"
        ? t("introRelative", { callee: data.calleeName })
        : t("introSelf"),
    ];
    const table: [string, string][] = [
      [labels("calleeName"), data.calleeName],
      [labels("phone"), phoneDisplay],
      [
        labels("timeWindow"),
        `${common(`timeWindows.${data.timeWindow}.label`)} (${common(`timeWindows.${data.timeWindow}.hours`)})`,
      ],
      [labels("rhythm"), common(`rhythms.${data.rhythm}.label`)],
    ];
    const after = [t("trialNote"), t("questions"), t("signoff")];
    const confirmationOk = await sendMail({
      to: data.bookerEmail,
      subject: t("subject"),
      html: renderEmail({
        preheader: t("preheader"),
        paragraphs,
        tableTitle: t("summaryTitle"),
        table,
        footer: after.join("\n\n"),
      }),
      text: renderText({ paragraphs, table, footer: after.join("\n\n") }),
      replyTo: to,
    });
    // Die Buchung ist intern angekommen – eine fehlgeschlagene Bestätigung blockiert sie nicht.
    if (!confirmationOk) console.warn("[booking] Bestätigungs-E-Mail konnte nicht gesendet werden.");
  }

  // TODO(chris): Später hier Stripe Checkout starten (siehe app/actions/checkout.ts) und/oder
  // die Buchung im Telefonie-System anlegen, statt nur E-Mails zu versenden.
  return { ok: true };
}
