/**
 * Felix-Bildmarke in der Bildsprache der Pflegeunion: grüner Außenring, Lime-Ring, Lime-„Hügel“.
 * Im Inneren der Telefonhörer, der zu einem Lächeln wird (statt Menschen und Kreuz wie bei der Pflegeunion).
 * Dieselbe Geometrie steckt in app/icon.svg, lib/og/mark.tsx (Apple-Icon, OG-Bild).
 */
export const LOGO_COLORS = {
  forest: "#00633A",
  lime: "#AFCA0B",
  white: "#FFFFFF",
} as const;

/** Lime-Hügel im unteren Teil des Innenkreises; überlappt den Lime-Ring, damit keine Naht entsteht. */
export const LOGO_HILL_PATH = "M8.2 33.9Q24 27.2 39.8 33.9A19 19 0 0 1 8.2 33.9Z";
/** Lächeln = Griff des Telefonhörers. */
export const LOGO_SMILE_PATH = "M14.4 18.6C16.9 27.4 31.1 27.4 33.6 18.6";
/** Hör- und Sprechmuschel an den Enden des Lächelns. */
export const LOGO_HANDSET_ENDS = [
  { x: 10.6, y: 14.2, transform: "rotate(-24 14.4 17)" },
  { x: 29.8, y: 14.2, transform: "rotate(24 33.6 17)" },
] as const;

export function LogoMark({
  className = "size-10",
  title,
}: {
  className?: string;
  title?: string;
}) {
  const { forest, lime, white } = LOGO_COLORS;
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle cx="24" cy="24" r="24" fill={forest} />
      <circle cx="24" cy="24" r="20.1" fill={lime} />
      <circle cx="24" cy="24" r="17.8" fill={white} />
      <path d={LOGO_HILL_PATH} fill={lime} />
      <path d={LOGO_SMILE_PATH} fill="none" stroke={forest} strokeWidth="4.2" strokeLinecap="round" />
      {LOGO_HANDSET_ENDS.map((end) => (
        <rect key={end.x} x={end.x} y={end.y} width="7.6" height="5.6" rx="2.5" fill={forest} transform={end.transform} />
      ))}
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-11 shrink-0" />
      <span className="font-display text-[1.9rem] font-extrabold leading-none tracking-tight text-forest-deep">
        Felix
      </span>
    </span>
  );
}
