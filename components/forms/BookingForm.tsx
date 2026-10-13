"use client";

import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import { ArrowLeft, ArrowRight, Check, Loader2, Pencil, User, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { submitBooking } from "@/app/actions/booking";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/site";
import {
  bookingSchema,
  rhythmOptions,
  stepOfField,
  stepSchemas,
  timeWindowOptions,
  type BookingField,
} from "@/lib/schemas/booking";
import { toFieldErrors, type FieldErrors } from "@/lib/schemas/shared";
import { CheckboxField, ChoiceCards, ErrorSummary, Honeypot, TextField } from "./fields";

type Step = 1 | 2 | 3;
const TOTAL_STEPS = 3;

type FormValues = {
  bookingFor: "" | "self" | "relative";
  calleeName: string;
  phone: string;
  timeWindow: "" | (typeof timeWindowOptions)[number];
  rhythm: "" | (typeof rhythmOptions)[number];
  bookerName: string;
  bookerEmail: string;
  calleeConsent: boolean;
  acceptPrivacy: boolean;
  acceptTerms: boolean;
};

const initialValues: FormValues = {
  bookingFor: "",
  calleeName: "",
  phone: "",
  timeWindow: "",
  rhythm: "",
  bookerName: "",
  bookerEmail: "",
  calleeConsent: false,
  acceptPrivacy: false,
  acceptTerms: false,
};

// Reihenfolge der Felder für die Fehlerübersicht.
const fieldOrder = Object.keys(stepOfField) as BookingField[];

export function BookingForm() {
  const t = useTranslations("booking");
  const tErr = useTranslations("formErrors");
  const common = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors<BookingField>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [pending, startTransition] = useTransition();

  const startedAt = useRef<number>(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Nach einem Schrittwechsel den Fokus auf die neue Überschrift setzen (Screenreader, Tastatur).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [step]);

  const isRelative = values.bookingFor === "relative";

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as BookingField]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  }

  function validate(upTo: Step): FieldErrors<BookingField> {
    const schema = upTo === 3 ? bookingSchema : stepSchemas[upTo];
    const result = schema.safeParse(values);
    if (result.success) return {};
    const all = toFieldErrors(result.error.issues) as FieldErrors<BookingField>;
    // Nur Fehler aus Schritten anzeigen, die schon erreicht wurden.
    return Object.fromEntries(
      Object.entries(all).filter(([field]) => stepOfField[field as BookingField] <= upTo),
    ) as FieldErrors<BookingField>;
  }

  function showErrors(next: FieldErrors<BookingField>) {
    setErrors(next);
    requestAnimationFrame(() => {
      summaryRef.current?.focus({ preventScroll: true });
      summaryRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }

  function goNext() {
    const found = validate(step);
    if (Object.keys(found).length > 0) return showErrors(found);
    setErrors({});
    setStep((s) => Math.min(s + 1, TOTAL_STEPS) as Step);
  }

  function goTo(target: Step) {
    setErrors({});
    setFormError(null);
    setStep(target);
  }

  function formatPhone() {
    const parsed = parsePhoneNumberFromString(values.phone, "DE");
    if (parsed?.isValid()) {
      update("phone", parsed.country === "DE" ? parsed.formatNational() : parsed.formatInternational());
    }
  }

  function submit() {
    setFormError(null);
    const found = validate(3);
    if (Object.keys(found).length > 0) return showErrors(found);

    startTransition(async () => {
      try {
        const result = await submitBooking({
          ...(values as Parameters<typeof submitBooking>[0]),
          website: honeypot,
          startedAt: startedAt.current,
          locale,
        });
        if (result.ok) {
          router.push("/buchen/danke");
          return;
        }
        if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
          const firstStep = Math.min(
            ...Object.keys(result.fieldErrors).map((f) => stepOfField[f as BookingField] ?? 3),
          ) as Step;
          setStep(firstStep);
          showErrors(result.fieldErrors);
          return;
        }
        setFormError(tErr("generic", { phone: company.phoneDisplay }));
      } catch {
        setFormError(tErr("generic", { phone: company.phoneDisplay }));
      }
    });
  }

  const err = (field: BookingField) => (errors[field] ? tErr(errors[field]) : undefined);
  const errorList = fieldOrder
    .filter((f) => errors[f])
    .map((f) => ({ field: f, message: tErr(errors[f]!) }));

  const stepKeys = ["who", "details", "confirm"] as const;
  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="relative">
      {/* Fortschritt */}
      <div className="mb-10">
        <p id="booking-progress" className="mb-3 text-lg font-semibold" aria-live="polite">
          {t("progress", { current: step, total: TOTAL_STEPS })}
          <span className="text-muted"> · {t(`stepNames.${stepKeys[step - 1]}`)}</span>
        </p>
        <div
          role="progressbar"
          aria-labelledby="booking-progress"
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={step}
          aria-valuetext={t("progress", { current: step, total: TOTAL_STEPS })}
          className="h-4 overflow-hidden rounded-full bg-line"
        >
          <div
            className="h-full rounded-full bg-brand-dark transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <ol className="mt-3 hidden grid-cols-3 text-base sm:grid" aria-hidden="true">
          {stepKeys.map((key, i) => (
            <li
              key={key}
              className={`flex items-center gap-2 ${i === 1 ? "justify-center" : ""} ${i === 2 ? "justify-end" : ""} ${
                i + 1 <= step ? "font-semibold text-ink" : "text-muted"
              }`}
            >
              {i + 1 < step ? <Check className="size-4 text-success" strokeWidth={3} /> : null}
              {t(`stepNames.${key}`)}
            </li>
          ))}
        </ol>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step < TOTAL_STEPS) goNext();
          else submit();
        }}
        className="rounded-[1.75rem] border border-line bg-surface p-6 shadow-soft sm:p-10"
      >
        <ErrorSummary title={tErr("summaryTitle")} errors={errorList} summaryRef={summaryRef} />
        <Honeypot value={honeypot} onChange={setHoneypot} label={t("honeypot")} />

        {step === 1 ? (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="mb-6 text-3xl font-semibold focus:outline-none">
              {t("step1.title")}
            </h2>
            <ChoiceCards
              name="bookingFor"
              legend={<span className="sr-only">{t("step1.title")}</span>}
              legendClassName=""
              columns={2}
              value={values.bookingFor}
              onChange={(v) => update("bookingFor", v)}
              error={err("bookingFor")}
              options={[
                {
                  value: "self",
                  label: t("step1.self.title"),
                  description: t("step1.self.text"),
                  icon: <User aria-hidden="true" className="size-5 text-brand-dark" />,
                },
                {
                  value: "relative",
                  label: t("step1.relative.title"),
                  description: t("step1.relative.text"),
                  icon: <Users aria-hidden="true" className="size-5 text-brand-dark" />,
                },
              ]}
            />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-8">
            <h2 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold focus:outline-none">
              {t("step2.title")}
            </h2>
            <TextField
              id="calleeName"
              label={isRelative ? t("step2.calleeNameRelative") : t("step2.calleeNameSelf")}
              hint={t("step2.calleeNameHint")}
              value={values.calleeName}
              onChange={(v) => update("calleeName", v)}
              error={err("calleeName")}
              autoComplete={isRelative ? "off" : "name"}
              required
            />
            <TextField
              id="phone"
              type="tel"
              inputMode="tel"
              label={t("step2.phone")}
              hint={t("step2.phoneHint")}
              value={values.phone}
              onChange={(v) => update("phone", v)}
              onBlur={formatPhone}
              error={err("phone")}
              autoComplete={isRelative ? "off" : "tel"}
              required
            />
            {/* TODO(chris): Zeitfenster und Rhythmus-Optionen mit dem Telefonie-Betrieb abstimmen. */}
            <ChoiceCards
              name="timeWindow"
              legend={t("step2.timeWindow")}
              value={values.timeWindow}
              onChange={(v) => update("timeWindow", v)}
              error={err("timeWindow")}
              options={timeWindowOptions.map((w) => ({
                value: w,
                label: common(`timeWindows.${w}.label`),
                description: common(`timeWindows.${w}.hours`),
              }))}
            />
            <ChoiceCards
              name="rhythm"
              legend={t("step2.rhythm")}
              value={values.rhythm}
              onChange={(v) => update("rhythm", v)}
              error={err("rhythm")}
              options={rhythmOptions.map((r) => ({
                value: r,
                label: common(`rhythms.${r}.label`),
                description: common(`rhythms.${r}.text`),
              }))}
            />

            <div className="rounded-2xl bg-cream p-5 sm:p-6">
              <h3 className="font-sans text-xl font-semibold">
                {isRelative ? t("step2.bookerTitleRelative") : t("step2.bookerTitleSelf")}
              </h3>
              <p className="mt-1 text-muted">
                {isRelative ? t("step2.bookerIntroRelative") : t("step2.bookerIntroSelf")}
              </p>
              <div className="mt-5 space-y-6">
                {isRelative ? (
                  <TextField
                    id="bookerName"
                    label={t("step2.bookerName")}
                    value={values.bookerName}
                    onChange={(v) => update("bookerName", v)}
                    error={err("bookerName")}
                    autoComplete="name"
                    required
                  />
                ) : null}
                <TextField
                  id="bookerEmail"
                  type="email"
                  inputMode="email"
                  label={t("step2.bookerEmail")}
                  optionalLabel={isRelative ? undefined : t("step2.optional")}
                  value={values.bookerEmail}
                  onChange={(v) => update("bookerEmail", v)}
                  error={err("bookerEmail")}
                  autoComplete="email"
                  required={isRelative}
                />
              </div>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="mb-6 text-3xl font-semibold focus:outline-none">
              {t("step3.title")}
            </h2>
            <dl className="divide-y divide-line rounded-2xl border border-line">
              {(
                [
                  ["bookingFor", common(`bookingFor.${values.bookingFor || "self"}`), 1],
                  ["calleeName", values.calleeName, 2],
                  ["phone", values.phone, 2],
                  [
                    "timeWindow",
                    values.timeWindow
                      ? `${common(`timeWindows.${values.timeWindow}.label`)} (${common(`timeWindows.${values.timeWindow}.hours`)})`
                      : "",
                    2,
                  ],
                  ["rhythm", values.rhythm ? common(`rhythms.${values.rhythm}.label`) : "", 2],
                  ...(isRelative ? [["bookerName", values.bookerName, 2] as const] : []),
                  ["bookerEmail", values.bookerEmail || t("step3.summary.notProvided"), 2],
                ] as const
              ).map(([key, value, target]) => (
                <div key={key} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
                  <dt className="text-base text-muted sm:w-48 sm:shrink-0">{t(`step3.summary.${key}`)}</dt>
                  <dd className="flex-1 break-words text-lg font-semibold">{value}</dd>
                  <dd>
                    <button
                      type="button"
                      onClick={() => goTo(target)}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 font-semibold text-brand-dark hover:bg-accent-soft hover:text-brand-darker"
                    >
                      <Pencil aria-hidden="true" className="size-4" />
                      {t("step3.edit")}
                      <span className="sr-only">: {t(`step3.summary.${key}`)}</span>
                    </button>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 rounded-2xl bg-success/10 p-5 text-ink">{t("step3.priceNote")}</p>

            <fieldset className="mt-8 space-y-5">
              <legend className="mb-4 font-sans text-xl font-semibold">{t("step3.consentTitle")}</legend>
              {isRelative ? (
                <CheckboxField
                  id="calleeConsent"
                  checked={values.calleeConsent}
                  onChange={(v) => update("calleeConsent", v)}
                  error={err("calleeConsent")}
                >
                  {t("step3.calleeConsent", { name: values.calleeName })}
                </CheckboxField>
              ) : null}
              <CheckboxField
                id="acceptPrivacy"
                checked={values.acceptPrivacy}
                onChange={(v) => update("acceptPrivacy", v)}
                error={err("acceptPrivacy")}
              >
                {t.rich("step3.privacy", {
                  link: (chunks) => (
                    <Link href="/datenschutz" target="_blank" className="font-semibold text-brand-dark underline underline-offset-2">
                      {chunks}
                    </Link>
                  ),
                })}
              </CheckboxField>
              <CheckboxField
                id="acceptTerms"
                checked={values.acceptTerms}
                onChange={(v) => update("acceptTerms", v)}
                error={err("acceptTerms")}
              >
                {t.rich("step3.terms", {
                  terms: (chunks) => (
                    <Link href="/agb" target="_blank" className="font-semibold text-brand-dark underline underline-offset-2">
                      {chunks}
                    </Link>
                  ),
                  withdrawal: (chunks) => (
                    <Link href="/widerruf" target="_blank" className="font-semibold text-brand-dark underline underline-offset-2">
                      {chunks}
                    </Link>
                  ),
                })}
              </CheckboxField>
            </fieldset>

            {formError ? (
              <p role="alert" className="mt-6 rounded-2xl border-2 border-brand-dark bg-accent-soft/60 p-5 font-medium">
                {formError}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
          {step > 1 ? (
            <Button variant="secondary" onClick={() => goTo((step - 1) as Step)} disabled={pending}>
              <ArrowLeft aria-hidden="true" className="size-5" />
              {t("buttons.back")}
            </Button>
          ) : (
            <span />
          )}
          {step < TOTAL_STEPS ? (
            <Button type="submit">
              {t("buttons.next")}
              <ArrowRight aria-hidden="true" className="size-5" />
            </Button>
          ) : (
            <Button type="submit" disabled={pending} aria-busy={pending}>
              {pending ? (
                <>
                  <Loader2 aria-hidden="true" className="size-5 animate-spin" />
                  {t("buttons.submitting")}
                </>
              ) : (
                <>
                  <Check aria-hidden="true" className="size-5" strokeWidth={3} />
                  {t("buttons.submit")}
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
