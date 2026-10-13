/**
 * Felix-Bildmarke: eine Sprechblase, in der ein Telefonhörer zu einem Lächeln wird.
 * Dieselbe Geometrie steckt in app/icon.svg, app/apple-icon.tsx und im OG-Bild.
 */
export const LOGO_BUBBLE_PATH =
  "M24 3c11.05 0 20 8.5 20 19s-8.95 19-20 19c-2.6 0-5.09-.47-7.37-1.33L7.5 44.5l2.2-8.7C6.2 32.4 4 27.47 4 22 4 11.5 12.95 3 24 3Z";
export const LOGO_SMILE_PATH = "M14.2 19.6c2.4 9.6 17.2 9.6 19.6 0";

export function LogoMark({
  className = "size-10",
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={LOGO_BUBBLE_PATH} fill="#E8512F" />
      <path
        d={LOGO_SMILE_PATH}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <rect x="10.6" y="14.4" width="7.4" height="5.6" rx="2.6" fill="#FFFFFF" transform="rotate(-18 14.3 17.2)" />
      <rect x="30" y="14.4" width="7.4" height="5.6" rx="2.6" fill="#FFFFFF" transform="rotate(18 33.7 17.2)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-10 shrink-0" />
      <span className="font-serif text-[1.85rem] font-semibold leading-none tracking-tight text-ink">
        Felix
      </span>
    </span>
  );
}
