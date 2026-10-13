"use client";

import { AlertCircle } from "lucide-react";
import type { ReactNode, RefObject } from "react";
import { HONEYPOT_FIELD } from "@/lib/spam";

const inputBase =
  "block w-full min-h-14 rounded-2xl border-2 bg-surface px-5 py-3 text-lg text-ink placeholder:text-muted/70 transition-colors focus:border-forest focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-lime/40";

function describedBy(id: string, hint?: ReactNode, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="mt-2 flex items-start gap-2 font-semibold text-danger">
      <AlertCircle aria-hidden="true" className="mt-1 size-5 shrink-0" />
      {message}
    </p>
  );
}

export function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  type = "text",
  autoComplete,
  inputMode,
  required = false,
  optionalLabel,
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: ReactNode;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  required?: boolean;
  optionalLabel?: string;
  multiline?: boolean;
}) {
  const shared = {
    id,
    name: id,
    value,
    onBlur,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(id, hint, error),
    className: `${inputBase} ${error ? "border-danger" : "border-line"}`,
  } as const;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-lg font-bold text-forest-deep">
        {label}
        {optionalLabel ? <span className="ml-2 text-base font-normal text-muted">({optionalLabel})</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="-mt-1 mb-2 text-base text-muted">
          {hint}
        </p>
      ) : null}
      {multiline ? (
        <textarea {...shared} rows={6} onChange={(e) => onChange(e.target.value)} className={`${shared.className} min-h-40 resize-y`} />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <FieldError id={id} message={error} />
    </div>
  );
}

export function CheckboxField({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start gap-4">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 size-6 shrink-0 cursor-pointer accent-forest"
        />
        <label htmlFor={id} className="cursor-pointer text-base text-ink sm:text-lg">
          {children}
        </label>
      </div>
      <FieldError id={id} message={error} />
    </div>
  );
}

export function ErrorSummary({
  title,
  errors,
  summaryRef,
}: {
  title: string;
  errors: { field: string; message: string }[];
  summaryRef?: RefObject<HTMLDivElement | null>;
}) {
  if (errors.length === 0) return null;
  return (
    <div
      ref={summaryRef}
      tabIndex={-1}
      role="alert"
      className="mb-8 rounded-2xl border-2 border-danger bg-danger-soft p-5 focus:outline-none"
    >
      <p className="font-bold text-ink">{title}</p>
      <ul className="mt-2 list-disc space-y-1 pl-6">
        {errors.map(({ field, message }) => (
          <li key={field}>
            <a href={`#${field}`} className="font-semibold text-danger underline underline-offset-2">
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Für Menschen unsichtbares Feld gegen Spam-Bots. */
export function Honeypot({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>{label}</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
