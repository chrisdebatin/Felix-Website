import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";
import { loadGoogleFont } from "@/lib/og/font";
import { OgMark } from "@/lib/og/mark";

// Open-Graph-Bild (1200 × 630) pro Sprache, wird beim Build statisch erzeugt.
export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "og" });
  const title = t("title");
  const [serif, sans, sansBold] = await Promise.all([
    loadGoogleFont("Fraunces", 600, `Felix${title}`),
    loadGoogleFont("Inter", 500, t("subtitle")),
    loadGoogleFont("Inter", 700, t("badge")),
  ]);
  const fonts = [
    sans && { name: "Inter", data: sans, weight: 500 as const, style: "normal" as const },
    sansBold && { name: "Inter", data: sansBold, weight: 700 as const, style: "normal" as const },
    serif && { name: "Fraunces", data: serif, weight: 600 as const, style: "normal" as const },
  ].filter((f) => !!f);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FFF9F5",
          position: "relative",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "#FFB38A",
            opacity: 0.55,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 120,
            bottom: -140,
            width: 300,
            height: 300,
            borderRadius: 9999,
            background: "#E8512F",
            opacity: 0.18,
            display: "flex",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", padding: "72px 80px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <OgMark size={84} />
            <span style={{ fontSize: 64, fontWeight: 600, color: "#1F1A17", fontFamily: "Fraunces" }}>
              Felix
            </span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 70,
              fontSize: 86,
              lineHeight: 1.05,
              fontWeight: 600,
              color: "#1F1A17",
              maxWidth: 900,
              fontFamily: "Fraunces",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, lineHeight: 1.4, fontWeight: 500, color: "#6B625C", maxWidth: 820 }}>
            {t("subtitle")}
          </div>
          <div style={{ display: "flex", marginTop: "auto" }}>
            <div
              style={{
                display: "flex",
                background: "#C73E20",
                color: "#FFFFFF",
                fontSize: 28,
                fontWeight: 700,
                padding: "14px 28px",
                borderRadius: 9999,
              }}
            >
              {t("badge")}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
