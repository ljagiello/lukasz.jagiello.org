import { isValidElement, type ReactNode } from "react";
import { About } from "@/content/about";
import { activeLinks, projects, site } from "@/content/site";

type ProseProps = { children?: ReactNode; href?: string };

// Turns the about prose (paragraphs of text and links) into Markdown, so
// llms.txt carries the same words as the page without a second copy.
function toMarkdown(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(toMarkdown).join("");
  }
  if (!isValidElement<ProseProps>(node)) {
    return "";
  }
  const inner = toMarkdown(node.props.children);
  if (node.type === "a") {
    return `[${inner}](${node.props.href})`;
  }
  if (node.type === "p") {
    return `${inner}\n\n`;
  }
  return inner;
}

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
    "## Contact",
    `- [Email](mailto:${site.email})`,
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
