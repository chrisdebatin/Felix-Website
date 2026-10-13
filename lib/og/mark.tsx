import { LOGO_BUBBLE_PATH, LOGO_SMILE_PATH } from "@/components/Logo";

/** Bildmarke für ImageResponse (Satori kann keine Komponenten mit Klassen). */
export function OgMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path d={LOGO_BUBBLE_PATH} fill="#E8512F" />
      <path d={LOGO_SMILE_PATH} fill="none" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" />
      <rect x="10.6" y="14.4" width="7.4" height="5.6" rx="2.6" fill="#FFFFFF" transform="rotate(-18 14.3 17.2)" />
      <rect x="30" y="14.4" width="7.4" height="5.6" rx="2.6" fill="#FFFFFF" transform="rotate(18 33.7 17.2)" />
    </svg>
  );
}
