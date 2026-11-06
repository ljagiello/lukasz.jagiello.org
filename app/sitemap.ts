import type { MetadataRoute } from "next";
import { projectPages } from "@/content/projects";
import { site } from "@/content/site";
import { work } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // With the slash, the same URL Google indexed.
      url: `${site.url}/`,
      lastModified: site.updated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}${work.path}`,
      lastModified: site.updated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectPages.map((project) => ({
      url: `${site.url}${project.path}`,
      lastModified: site.updated,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
