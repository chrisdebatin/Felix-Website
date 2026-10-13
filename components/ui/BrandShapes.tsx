/**
 * Formen aus dem Pflegeunion-Logo, als dekorative Elemente für die Website.
 * Alle Formen sind rein dekorativ (aria-hidden).
 */

/** Sanfter „Hügel“ als Übergang zwischen zwei Abschnitten. `className` setzt die Füllfarbe (z. B. fill-sage). */
export function Hill({ className = "fill-sage" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 96"
      preserveAspectRatio="none"
      className={`block h-10 w-full sm:h-16 lg:h-20 ${className}`}
    >
      <path d="M0 96C260 14 1180 14 1440 96Z" />
    </svg>
  );
}

/** Doppelter Ring (Waldgrün außen, Lime innen) wie im Logo. */
export function Rings({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 400" className={className}>
      <circle cx="200" cy="200" r="180" fill="none" stroke="#00633A" strokeWidth="40" />
      <circle cx="200" cy="200" r="147" fill="none" stroke="#AFCA0B" strokeWidth="24" />
    </svg>
  );
}
