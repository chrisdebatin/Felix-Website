"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { submitContact } from "@/app/actions/contact";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactData } from "@/lib/schemas/contact";
import { toFieldErrors, type FieldErrors } from "@/lib/schemas/shared";
import { company } from "@/lib/site";
import { CheckboxField, ErrorSummary, Honeypot, TextField } from "./fields";

type Values = Omit<ContactData, "acceptPrivacy"> & { acceptPrivacy: boolean };
type Field = keyof ContactData;
const fieldOrder: Field[] = ["name", "email", "phone", "message", "acceptPrivacy"];

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tErr = useTranslations("formErrors");
  const locale = useLocale();

  const [values, setValues] = useState<Values>({ name: "", email: "", phone: "", message: "", acceptPrivacy: false });
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function showErrors(next: FieldErrors<Field>) {
    setErrors(next);
    requestAnimationFrame(() => {
      summaryRef.current?.focus({ preventScroll: true });
      summaryRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }

  function submit() {
    setFormError(null);
    const result = contactSchema.safeParse(values);
    if (!result.success) return showErrors(toFieldErrors(result.error.issues) as FieldErrors<Field>);

    startTransition(async () => {
      try {
        const res = await submitContact({ ...result.data, website: honeypot, startedAt: startedAt.current, locale });
        if (res.ok) return setSent(true);
        if (res.fieldErrors && Object.keys(res.fieldErrors).length > 0) return showErrors(res.fieldErrors);
        setFormError(tErr("generic", { phone: company.phoneDisplay }));
      } catch {
        setFormError(tErr("generic", { phone: company.phoneDisplay }));
      }
    });
  }

  if (sent) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-[1.75rem] bg-surface p-8 text-center shadow-soft focus:outline-none sm:p-10">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-14 text-forest" />
        <h2 className="mt-4 text-3xl">{t("successTitle")}</h2>
        <p className="mt-3 text-lg text-muted">{t("successText")}</p>
      </div>
    );
  }

  const err = (f: Field) => (errors[f] ? tErr(errors[f]) : undefined);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="relative space-y-7 rounded-[1.75rem] border border-line bg-surface p-6 shadow-soft sm:p-10"
    >
      <h2 className="text-3xl">{t("title")}</h2>
      <ErrorSummary
        title={tErr("summaryTitle")}
        summaryRef={summaryRef}
        errors={fieldOrder.filter((f) => errors[f]).map((f) => ({ field: f, message: tErr(errors[f]!) }))}
      />
      <Honeypot value={honeypot} onChange={setHoneypot} label="website" />
      <TextField id="name" label={t("name")} value={values.name} onChange={(v) => update("name", v)} error={err("name")} autoComplete="name" required />
      <TextField id="email" type="email" inputMode="email" label={t("email")} value={values.email} onChange={(v) => update("email", v)} error={err("email")} autoComplete="email" required />
      <TextField id="phone" type="tel" inputMode="tel" label={t("phone")} optionalLabel={t("optional")} value={values.phone} onChange={(v) => update("phone", v)} error={err("phone")} autoComplete="tel" />
      <TextField id="message" multiline label={t("message")} value={values.message} onChange={(v) => update("message", v)} error={err("message")} required />
      <CheckboxField id="acceptPrivacy" checked={values.acceptPrivacy} onChange={(v) => update("acceptPrivacy", v)} error={err("acceptPrivacy")}>
        {t.rich("privacy", {
          link: (chunks) => (
            <Link href="/datenschutz" target="_blank" className="font-bold text-forest underline underline-offset-2">
              {chunks}
            </Link>
          ),
        })}
      </CheckboxField>
      {formError ? (
        <p role="alert" className="rounded-2xl border-2 border-danger bg-danger-soft p-5 font-semibold text-ink">
          {formError}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} aria-busy={pending} className="w-full sm:w-auto">
        {pending ? <Loader2 aria-hidden="true" className="size-5 animate-spin" /> : <Send aria-hidden="true" className="size-5" />}
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
