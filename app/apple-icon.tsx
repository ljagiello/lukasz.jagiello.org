import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The favicon, on an opaque square: iOS fills transparent pixels with black
// and rounds the corners itself.
const iconData = await readFile(join(process.cwd(), "app/icon.svg"), "base64");
const iconSrc = `data:image/svg+xml;base64,${iconData}`;

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#06090c",
        }}
      >
        <img src={iconSrc} alt="" width={144} height={144} />
      </div>
    ),
    size,
  );
}
