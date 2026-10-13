import { ImageResponse } from "next/og";
import { OgMark } from "@/lib/og/mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF9F5" }}>
        <OgMark size={140} />
      </div>
    ),
    size,
  );
}
