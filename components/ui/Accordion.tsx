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
      className="group rounded-card border border-line bg-surface shadow-soft open:border-forest/30"
    >
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-card px-6 py-4 text-lg font-bold text-forest-deep hover:text-forest">
        <span>{question}</span>
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime-soft text-forest transition-transform duration-200 group-open:rotate-180"
        >
          <ChevronDown className="size-5" strokeWidth={2.5} />
        </span>
      </summary>
      <div className="px-6 pb-6 text-muted">
        <p>{answer}</p>
      </div>
    </details>
  );
}
