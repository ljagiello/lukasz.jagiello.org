import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // With the slash, the same URL Google indexed.
      url: `${site.url}/`,
      lastModified: site.updated,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
