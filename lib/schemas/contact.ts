import { isValidPhoneNumber } from "libphonenumber-js/max";
import { z } from "zod";
import type { FormErrorKey } from "./shared";

const e = (key: FormErrorKey) => ({ error: key });

export const contactSchema = z.object({
  name: z.string().trim().min(2, e("nameRequired")).max(100, e("tooLong")),
  email: z.string().trim().min(1, e("emailRequired")).max(200, e("tooLong")).pipe(z.email(e("emailInvalid"))),
  phone: z
    .string()
    .trim()
    .max(40, e("tooLong"))
    .refine((v) => v === "" || isValidPhoneNumber(v, "DE"), e("phoneInvalid")),
  message: z.string().trim().min(5, e("messageRequired")).max(5000, e("tooLong")),
  acceptPrivacy: z.literal(true, e("privacyRequired")),
});

export type ContactData = z.infer<typeof contactSchema>;
