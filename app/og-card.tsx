import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

// Shared by the link-preview images (opengraph-image.tsx next to each page).
export const ogSize = { width: 1200, height: 630 };

// The portrait, read once at build time.
const photo = await readFile(join(process.cwd(), "public", site.photo.src));
export const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

// Long titles step down so they fit in two lines.
const titleSize = (title: string) =>
  title.length > 40 ? 68 : title.length > 18 ? 92 : 112;

// The preview for an inner page: whose page it is at the top, the page's own
// title and line in the middle, the site at the bottom. Same colours as the
// home page's card, so a shared link still reads as this site.
export function PageCard({
  eyebrow,
  title,
  subtitle,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  footer: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#f3f6f8",
        color: "#13233a",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 34,
          color: "#55677d",
        }}
      >
        {/* ImageResponse draws plain <img>; next/image doesn't apply here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={80}
          height={80}
          style={{ borderRadius: 40, objectFit: "cover", marginRight: 28 }}
        />
        <span>{eyebrow}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: titleSize(title),
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </span>
        {subtitle ? (
          <span style={{ fontSize: 44, lineHeight: 1.3, marginTop: 28 }}>
            {subtitle}
          </span>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: 32,
          color: "#55677d",
          borderTop: "4px solid #13233a",
          paddingTop: 24,
        }}
      >
        <span>{footer}</span>
        <span>{site.url.replace("https://", "")}</span>
      </div>
    </div>
  );
}
