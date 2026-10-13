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
  const common = await getTranslations({ locale, namespace: "common" });
  const title = t("title");
  const [heavy, regular] = await Promise.all([
    loadGoogleFont("Nunito Sans", 800, `Felix${title}`),
    loadGoogleFont("Nunito Sans", 600, `${t("subtitle")}${common("partner")}`),
  ]);
  const fonts = [
    heavy && { name: "Nunito Sans", data: heavy, weight: 800 as const, style: "normal" as const },
    regular && { name: "Nunito Sans", data: regular, weight: 600 as const, style: "normal" as const },
  ].filter((f) => !!f);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FFFFFF",
          position: "relative",
          fontFamily: "Nunito Sans",
        }}
      >
        {/* Doppelter Ring wie im Logo, angeschnitten oben rechts */}
        <div
          style={{
            position: "absolute",
            right: -170,
            top: -170,
            width: 600,
            height: 600,
            borderRadius: 9999,
            border: "64px solid #00633A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 400, height: 400, borderRadius: 9999, border: "36px solid #AFCA0B", display: "flex" }} />
        </div>
        {/* Lime-Hügel unten */}
        <svg width="1200" height="120" viewBox="0 0 1200 120" style={{ position: "absolute", left: 0, bottom: 0 }}>
          <path d="M0 120V70C240 4 960 4 1200 70V120Z" fill="#F3F7E3" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 80px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <OgMark size={88} />
            <span style={{ fontSize: 64, fontWeight: 800, color: "#003820" }}>Felix</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 56,
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 800,
              color: "#003820",
              maxWidth: 820,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 32, lineHeight: 1.4, fontWeight: 600, color: "#55605A", maxWidth: 780 }}>
            {t("subtitle")}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "auto" }}>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: "#00633A" }}>{common("partner")}</div>
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
