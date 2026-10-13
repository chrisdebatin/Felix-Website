/**
 * Abstrakte Illustration in den Felix-Farben als Platzhalter für ein späteres echtes Foto
 * (Ring wie im Logo, Lime-Hügel).
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
  const sunX = variant === "warm" ? 290 : 120;
  return (
    <div
      aria-hidden="true"
      data-photo-placeholder={photo}
      className={`relative overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-sage to-lime-soft ${className}`}
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <circle cx={sunX} cy="95" r="62" fill="none" stroke="#00633A" strokeWidth="14" />
        <circle cx={sunX} cy="95" r="45" fill="none" stroke="#AFCA0B" strokeWidth="9" />
        <path d="M-20 300C10 205 160 180 230 210S390 190 430 160V300Z" fill="#AFCA0B" />
        <path d="M-20 300C60 245 210 238 430 262V300Z" fill="#00633A" opacity="0.9" />
      </svg>
    </div>
  );
}
