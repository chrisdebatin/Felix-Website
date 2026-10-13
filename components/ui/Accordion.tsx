import { ChevronDown } from "lucide-react";

/** Barrierearmes Aufklapp-Element auf Basis von <details>/<summary> – funktioniert ohne JavaScript. */
export function AccordionItem({
  question,
  answer,
  id,
}: {
  question: string;
  answer: string;
  id?: string;
}) {
  return (
    <details
      id={id}
      className="group rounded-card border border-line bg-surface shadow-soft"
    >
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-card px-6 py-4 text-lg font-semibold text-ink hover:text-brand-dark">
        <span>{question}</span>
        <ChevronDown
          aria-hidden="true"
          className="size-6 shrink-0 text-brand-dark transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="px-6 pb-6 text-muted">
        <p>{answer}</p>
      </div>
    </details>
  );
}
