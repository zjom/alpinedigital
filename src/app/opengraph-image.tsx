import { ImageResponse } from "next/og";
import { LOCKUP_PATHS, LOCKUP_VIEWBOX } from "@/components/brand/logoPaths";
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
          background: "#000000",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Light wash — mirrors TopoBackdrop: two white blooms separated by
            alpha rather than by hue. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -140,
            width: 900,
            height: 700,
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.10), rgba(0,0,0,0))",
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
              "radial-gradient(closest-side, rgba(255,255,255,0.05), rgba(0,0,0,0))",
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
              stroke="#FFFFFF"
              strokeOpacity={0.3 - i * 0.045}
              strokeWidth={1.4}
              fill="none"
            />
          ))}
        </svg>

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            width="126"
            height="76"
            viewBox={LOCKUP_VIEWBOX}
            fill="#EDEDED"
          >
            {LOCKUP_PATHS.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>
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
            <span style={{ color: "#EDEDED" }}>
              Your business is brilliant offline.
            </span>
            <span style={{ color: "#8F8F8F" }}>
              Let&rsquo;s make it unmissable online.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 28,
              fontSize: 22,
              color: "#A1A1A1",
            }}
          >
            <span>Websites</span>
            <span style={{ color: "#3A3A3A" }}>·</span>
            <span>Ecommerce</span>
            <span style={{ color: "#3A3A3A" }}>·</span>
            <span>Google Ads</span>
            <span style={{ color: "#3A3A3A" }}>·</span>
            <span>Bespoke systems</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
