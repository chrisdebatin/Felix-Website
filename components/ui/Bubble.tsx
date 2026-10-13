import { LogoMark } from "@/components/Logo";

type Speaker = "felix" | "customer";

/** Eine Sprechblase aus einem Gespräch mit Felix. */
export function Bubble({
  who,
  speakerName,
  children,
  size = "md",
}: {
  who: Speaker;
  speakerName: string;
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  const isFelix = who === "felix";
  const text = size === "lg" ? "text-lg sm:text-xl" : "text-base sm:text-lg";
  return (
    <div className={`flex max-w-[92%] flex-col ${isFelix ? "items-start self-start" : "items-end self-end"}`}>
      <span className="mb-1.5 flex items-center gap-1.5 px-1 text-sm font-semibold text-muted">
        {isFelix ? <LogoMark className="size-5" /> : null}
        {speakerName}
      </span>
      <p
        className={`rounded-bubble px-5 py-3.5 leading-snug ${text} ${
          isFelix
            ? "rounded-tl-md border border-line bg-surface text-ink shadow-soft"
            : "rounded-tr-md bg-accent-soft text-ink"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

export function Conversation({
  label,
  lines,
  felixName,
  customerName,
}: {
  label?: string;
  lines: { who: Speaker; text: string }[];
  felixName: string;
  customerName: string;
}) {
  return (
    <ol aria-label={label} className="flex flex-col gap-4">
      {lines.map((line, i) => (
        <li key={i} className="contents">
          <Bubble
            who={line.who}
            speakerName={line.who === "felix" ? felixName : customerName}
          >
            {line.text}
          </Bubble>
        </li>
      ))}
    </ol>
  );
}
