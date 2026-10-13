import { isValidPhoneNumber } from "libphonenumber-js/max";
import { z } from "zod";
import type { FormErrorKey } from "./shared";

export const bookingForOptions = ["self", "relative"] as const;
export const timeWindowOptions = ["morning", "afternoon", "evening"] as const;
export const rhythmOptions = ["daily", "severalWeekly", "weekly"] as const;

const e = (key: FormErrorKey) => ({ error: key });

const name = z.string().trim().min(2, e("nameRequired")).max(100, e("tooLong"));
const optionalText = z.string().trim().max(200, e("tooLong"));

/** Alle Felder der Buchung. Die Schritte prüfen jeweils nur einen Teil davon. */
const fields = z.object({
  bookingFor: z.enum(bookingForOptions, e("bookingForRequired")),
  calleeName: name,
  phone: z
    .string()
    .trim()
    .min(1, e("phoneRequired"))
    .max(40, e("tooLong"))
    .refine((v) => isValidPhoneNumber(v, "DE"), e("phoneInvalid")),
  timeWindow: z.enum(timeWindowOptions, e("timeWindowRequired")),
  rhythm: z.enum(rhythmOptions, e("rhythmRequired")),
  bookerName: optionalText,
  bookerEmail: optionalText,
  calleeConsent: z.boolean(),
  acceptPrivacy: z.literal(true, e("privacyRequired")),
  acceptTerms: z.literal(true, e("termsRequired")),
});

export type BookingData = z.infer<typeof fields>;
export type BookingField = keyof BookingData;

type BookerFields = Pick<BookingData, "bookingFor" | "bookerName" | "bookerEmail">;

/** Bei Buchung für Angehörige sind Name und E-Mail der buchenden Person Pflicht. */
function checkBooker(data: BookerFields, ctx: z.RefinementCtx) {
  const email = data.bookerEmail.trim();
  if (data.bookingFor === "relative") {
    if (data.bookerName.trim().length < 2) {
      ctx.addIssue({ code: "custom", path: ["bookerName"], message: "nameRequired" });
    }
    if (!email) {
      ctx.addIssue({ code: "custom", path: ["bookerEmail"], message: "emailRequired" });
    }
  }
  if (email && !z.email().safeParse(email).success) {
    ctx.addIssue({ code: "custom", path: ["bookerEmail"], message: "emailInvalid" });
  }
}

export const stepSchemas = {
  1: fields.pick({ bookingFor: true }),
  2: fields
    .pick({
      bookingFor: true,
      calleeName: true,
      phone: true,
      timeWindow: true,
      rhythm: true,
      bookerName: true,
      bookerEmail: true,
    })
    .superRefine(checkBooker),
} as const;

export const bookingSchema = fields.superRefine((data, ctx) => {
  checkBooker(data, ctx);
  if (data.bookingFor === "relative" && !data.calleeConsent) {
    ctx.addIssue({ code: "custom", path: ["calleeConsent"], message: "calleeConsentRequired" });
  }
});

/** Felder, die zu welchem Schritt gehören – für die Fehleranzeige. */
export const stepOfField: Record<BookingField, 1 | 2 | 3> = {
  bookingFor: 1,
  calleeName: 2,
  phone: 2,
  timeWindow: 2,
  rhythm: 2,
  bookerName: 2,
  bookerEmail: 2,
  calleeConsent: 3,
  acceptPrivacy: 3,
  acceptTerms: 3,
};
