import { activeLinks, projects, site } from "@/content/site";

// A Markdown summary of the page for LLMs (https://llmstxt.org). Built from
// the same content as the page, and prerendered at build time.
export function GET() {
  const projectLines = projects.map((project) => {
    const href = project.url ?? project.repo;
    const name = href ? `[${project.name}](${href})` : project.name;
    const source =
      project.url && project.repo ? ` [Source code](${project.repo})` : "";
    return `- ${name}: ${project.description} (${project.language}, ${project.year})${source}`;
  });

  const body = [
    `# ${site.name}`,
    `> ${site.description}`,
    `${site.jobTitle}, ${site.location}. Also spelled ${site.alternateName}. Home page: ${site.url}`,
    "## Profiles",
    [...activeLinks, ...site.extraProfiles]
      .map((link) => `- [${link.label}](${link.href})`)
      .join("\n"),
    "## Side projects",
    projectLines.join("\n"),
    "## Contact",
    `- [Email](mailto:${site.email})`,
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
