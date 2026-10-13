import { LOGO_COLORS, LOGO_HANDSET_ENDS, LOGO_HILL_PATH, LOGO_SMILE_PATH } from "@/components/Logo";

/** Bildmarke für ImageResponse (Satori kennt keine Tailwind-Klassen). */
export function OgMark({ size }: { size: number }) {
  const { forest, lime, white } = LOGO_COLORS;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
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
