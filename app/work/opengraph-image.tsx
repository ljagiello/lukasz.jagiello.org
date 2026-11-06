import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { work } from "@/content/work";
import { ogSize, PageCard } from "../og-card";

// The /work link preview, instead of none: the page's metadata sets its own
// openGraph, which drops the home page's portrait card.
export const alt = `${work.title}: ${work.headline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function WorkImage() {
  return new ImageResponse(
    (
      <PageCard
        eyebrow={`${site.name} · ${work.title}`}
        title={work.headline}
        footer={site.location}
      />
    ),
    ogSize,
  );
}
