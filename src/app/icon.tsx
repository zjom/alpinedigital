import { ImageResponse } from "next/og";
import { MARK_PATH, MARK_VIEWBOX } from "@/components/brand/logoPaths";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** The peak mark, rendered as the favicon. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: 7,
        }}
      >
        <svg width="19" height="20" viewBox={MARK_VIEWBOX} fill="#EDEDED">
          <path d={MARK_PATH} />
        </svg>
      </div>
    ),
    size,
  );
}
