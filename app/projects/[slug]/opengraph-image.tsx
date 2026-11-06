import { ImageResponse } from "next/og";
import { projectPages } from "@/content/projects";
import { site } from "@/content/site";
import { ogSize, PageCard } from "../../og-card";

// The project's own link preview, instead of none: the page's metadata sets
// its own openGraph, which drops the home page's portrait card.

// The same for every project: a per-project alt needs generateImageMetadata,
// whose extra URL segment stops the images being drawn at build time.
export const alt = `A side project by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

// Drawn at build time like the pages, since the portrait is read from disk.
export function generateStaticParams() {
  return projectPages.map((project) => ({ slug: project.slug }));
}

export default async function ProjectImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectPages.find((page) => page.slug === slug);
  if (!project) {
    return new Response(null, { status: 404 });
  }
  return new ImageResponse(
    (
      <PageCard
        eyebrow={`${site.name} · Side project`}
        title={project.name}
        subtitle={project.tagline}
        footer={`${project.category} · ${project.language} · ${project.year}`}
      />
    ),
    ogSize,
  );
}
