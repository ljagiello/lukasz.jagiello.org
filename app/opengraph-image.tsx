import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: ${site.jobTitle} at ${site.company.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#f3f6f8",
          color: "#13233a",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 120,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          <span>{site.givenName}</span>
          <span>{site.familyName}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 36,
            color: "#55677d",
            borderTop: "4px solid #13233a",
            paddingTop: 28,
          }}
        >
          <span>
            {site.jobTitle} at {site.company.name}
          </span>
          <span>{site.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
