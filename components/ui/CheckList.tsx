import { Check } from "lucide-react";

export function CheckList({
  items,
  className = "",
  tone = "light",
}: {
  items: string[];
  className?: string;
  /** "dark" für Listen auf grünem Hintergrund. */
  tone?: "light" | "dark";
}) {
  const icon =
    tone === "dark" ? "bg-lime text-forest-deep" : "bg-lime-soft text-forest";
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className={`mt-1 flex size-6 shrink-0 items-center justify-center rounded-full ${icon}`}
          >
            <Check className="size-4" strokeWidth={3.5} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
