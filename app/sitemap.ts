import type { MetadataRoute } from "next";
import { projectPages } from "@/content/projects";
import { site } from "@/content/site";
import { work } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // With the slash, the same URL Google indexed.
      url: `${site.url}/`,
      lastModified: site.updated.home,
      changeFrequency: "weekly",
      priority: 1,
      images: [new URL(site.photo.src, site.url).toString()],
    },
    {
      url: `${site.url}${work.path}`,
      lastModified: site.updated.work,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectPages.map((project) => ({
      url: `${site.url}${project.path}`,
      lastModified: project.modified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(project.image
        ? { images: [new URL(project.image.path, site.url).toString()] }
        : {}),
    })),
  ];
}
