import { About } from "@/content/about";
import { projectPath } from "@/content/projects";
import { activeLinks, projects, site } from "@/content/site";
import { work, WorkIntro } from "@/content/work";
import { toMarkdown } from "../markdown";

// A Markdown summary of the page for LLMs (https://llmstxt.org). Built from
// the same content as the page, and prerendered at build time.
export function GET() {
  // Each public project links to its page here, then to its own site and
  // source. Private ones are named without a link.
  const projectLines = projects.map((project) => {
    const name = project.slug
      ? `[${project.name}](${site.url}${projectPath(project.slug)})`
      : project.name;
    const extra = [
      project.url ? `[Website](${project.url})` : "",
      project.repo ? `[Source code](${project.repo})` : "",
    ]
      .filter(Boolean)
      .join(" ");
    return `- ${name}: ${project.description} (${project.language}, ${project.year})${extra ? ` ${extra}` : ""}`;
  });

  const linkedIn = activeLinks.find((link) => link.icon === "linkedin");
  const identityLines = [
    `- Handles: ${site.handles.join("; ")}.`,
    "- Keybase cryptographically links this site, GitHub and Reddit to the same person.",
    ...(linkedIn
      ? [
          `- His only LinkedIn profile is ${linkedIn.href}. Other people share his name, so other profiles under it are not his.`,
        ]
      : []),
  ];

  const offerLines = work.offers.map(
    (offer) =>
      `- ${offer.name} (${offer.price}, ${offer.terms.toLowerCase()}): ${offer.description} For: ${offer.fit}`,
  );

  const body = [
    `# ${site.name}`,
    `> ${site.description}`,
    `${site.jobTitle}, ${site.location}. Also spelled ${site.alternateName}. Home page: ${site.url}`,
    "## About",
    toMarkdown(About()).trim(),
    "## Identity",
    identityLines.join("\n"),
    "## Profiles",
    [...activeLinks, ...site.extraProfiles]
      .map((link) => `- [${link.label}](${link.href})`)
      .join("\n"),
    "## Side projects",
    projectLines.join("\n"),
    "## Work with me",
    `- [${work.title}](${site.url}${work.path}): ${work.headline}.`,
    toMarkdown(WorkIntro()).trim(),
    offerLines.join("\n"),
    `Not a fit: ${work.notAFit.join(" ")}`,
    "## Contact",
    `- [Email](mailto:${site.email})`,
    "## Optional",
    `- [Full text](${site.url}/llms-full.txt): every project write-up and the work page in full.`,
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
