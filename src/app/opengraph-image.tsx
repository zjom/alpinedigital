import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Brand OG card, applied to every page that doesn't override it.
 *
 * Deliberately uses next/og's bundled default font rather than fetching a
 * webfont at build time — a Google Fonts fetch would make every production
 * build depend on a third-party network call, and the visual difference at
 * this size does not justify that fragility.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05070A",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Aurora wash */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -140,
            width: 900,
            height: 700,
            background:
              "radial-gradient(closest-side, rgba(78,225,210,0.22), rgba(5,7,10,0))",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -180,
            width: 760,
            height: 620,
            background:
              "radial-gradient(closest-side, rgba(255,138,76,0.16), rgba(5,7,10,0))",
            display: "flex",
          }}
        />

        {/* Contour lines */}
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {[380, 428, 478, 530, 584].map((y, i) => (
            <path
              key={y}
              d={`M-40 ${y} C 180 ${y - 34}, 320 ${y - 78}, 520 ${y - 52} S 860 ${y + 30}, 1000 ${y - 6} S 1180 ${y - 44}, 1240 ${y - 20}`}
              stroke="#7FA3C4"
              strokeOpacity={0.3 - i * 0.045}
              strokeWidth={1.4}
              fill="none"
            />
          ))}
        </svg>

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 4 L27 23 H5 Z"
              stroke="#7FA3C4"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M11.5 12.5 L16 9 L20.5 12.5"
              stroke="#C2A277"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
            <span style={{ color: "#EAEFF6" }}>Alpine</span>
            <span style={{ color: "#7FA3C4" }}>Digital</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2.4,
            }}
          >
            <span style={{ color: "#EAEFF6" }}>
              Your business is brilliant offline.
            </span>
            <span style={{ color: "#7FA3C4" }}>
              Let&rsquo;s make it unmissable online.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 28,
              fontSize: 22,
              color: "#94A1B2",
            }}
          >
            <span>Websites</span>
            <span style={{ color: "#2B3644" }}>·</span>
            <span>Ecommerce</span>
            <span style={{ color: "#2B3644" }}>·</span>
            <span>Google Ads</span>
            <span style={{ color: "#2B3644" }}>·</span>
            <span>Bespoke systems</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
