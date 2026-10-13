import { getTranslations } from "next-intl/server";
import Image from "next/image";
import pflegeunionLogo from "@/public/brand/pflegeunion-logo.png";

/**
 * „In Zusammenarbeit mit der Pflegeunion“ mit deren Logo.
 * TODO(chris): Nutzung des Pflegeunion-Logos von der Pflegeunion (IGS Management GmbH) freigeben lassen.
 */
export async function PartnerBadge({
  className = "",
  tone = "light",
  size = "md",
}: {
  className?: string;
  tone?: "light" | "dark";
  size?: "md" | "lg";
}) {
  const t = await getTranslations("common");
  const logoSize = size === "lg" ? "size-16" : "size-10";
  // Anzeigegröße in px (bei 18 px Grundschrift), damit nur passende Bildgrößen geladen werden.
  const px = size === "lg" ? 72 : 48;
  const text = tone === "dark" ? "text-white" : "text-forest-deep";
  return (
    <p className={`flex items-center gap-3 font-bold ${text} ${className}`}>
      {/* Das Logo ist dekorativ – der Name steht direkt daneben im Text. */}
      <Image
        src={pflegeunionLogo}
        alt=""
        width={px}
        height={px}
        className={`${logoSize} shrink-0 rounded-full ${tone === "dark" ? "bg-white p-0.5" : ""}`}
      />
      <span>{t("partner")}</span>
    </p>
  );
}
