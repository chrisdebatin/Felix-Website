/**
 * Warme, abstrakte Illustration als Platzhalter für ein späteres echtes Foto.
 * TODO(chris): Durch echte Fotos ersetzen (next/image mit alt-Text = Prop `photo`).
 */
export function PhotoPlaceholder({
  photo,
  className = "",
  variant = "warm",
}: {
  /** Beschreibung des Fotos, das hier später hinkommt. */
  photo: string;
  className?: string;
  variant?: "warm" | "soft";
}) {
  const bg =
    variant === "warm"
      ? "bg-gradient-to-br from-accent/70 via-accent-soft to-cream"
      : "bg-gradient-to-br from-accent-soft via-cream to-accent/40";
  return (
    <div
      aria-hidden="true"
      data-photo-placeholder={photo}
      className={`relative overflow-hidden rounded-[1.75rem] ${bg} ${className}`}
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <circle cx="320" cy="60" r="90" fill="#FFB38A" opacity="0.55" />
        <circle cx="70" cy="250" r="110" fill="#E8512F" opacity="0.18" />
        <circle cx="210" cy="170" r="70" fill="#FFFFFF" opacity="0.6" />
        <path
          d="M170 168c8 30 72 30 80 0"
          fill="none"
          stroke="#E8512F"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="168" cy="160" r="9" fill="#E8512F" opacity="0.8" />
        <circle cx="252" cy="160" r="9" fill="#E8512F" opacity="0.8" />
      </svg>
    </div>
  );
}
