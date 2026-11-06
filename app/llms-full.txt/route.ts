import { About } from "@/content/about";
import { projectPages } from "@/content/projects";
import { site } from "@/content/site";
import { work, WorkIntro } from "@/content/work";
import { toMarkdown } from "../markdown";

// The whole site as one Markdown file for LLMs: llms.txt links here for the
// full text. Built from the same content as the pages, and prerendered at
// build time.
export function GET() {
  const projectSections = projectPages.map((project) => {
    const facts = [
      `Page: ${site.url}${project.path}`,
      `${project.category} · ${project.language} · started ${project.year}`,
      project.url ? `Website: ${project.url}` : "",
      project.docs ? `Docs: ${project.docs}` : "",
      project.repo ? `Source: ${project.repo}` : "",
    ].filter(Boolean);
    return [
      `## ${project.name}: ${project.tagline}`,
      facts.map((fact) => `- ${fact}`).join("\n"),
      toMarkdown(project.body()).trim(),
    ].join("\n\n");
  });

  const offerSections = work.offers.map((offer) =>
    [
      `### ${offer.name}`,
      `${offer.price} (${offer.terms})`,
      offer.description,
      offer.includes.map((item) => `- ${item}`).join("\n"),
      `For: ${offer.fit}`,
    ].join("\n\n"),
  );

  const body = [
    `# ${site.name}`,
    `> ${site.description}`,
    `${site.jobTitle}, ${site.location}. Home page: ${site.url}. A shorter summary is at ${site.url}/llms.txt.`,
    "## About",
    toMarkdown(About()).trim(),
    ...projectSections,
    `## ${work.title}: ${work.headline}`,
    `Page: ${site.url}${work.path}`,
    toMarkdown(WorkIntro()).trim(),
    ...offerSections,
    "### How it works",
    work.howItWorks.map((step, index) => `${index + 1}. ${step}`).join("\n"),
    "### What I don’t take on",
    work.notAFit.map((item) => `- ${item}`).join("\n"),
    "## Contact",
    `- [Email](mailto:${site.email})`,
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
