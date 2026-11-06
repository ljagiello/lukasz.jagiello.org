import { isValidElement, type ReactNode } from "react";
import { site } from "@/content/site";

type ProseProps = { children?: ReactNode; href?: string };

// Turns prose (paragraphs of text, links and inline code) into Markdown, so
// llms.txt and llms-full.txt carry the same words as the pages without a
// second copy. Site-relative links become absolute, since the files are read
// on their own.
export function toMarkdown(node: ReactNode): string {
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
  // An <a> or a next/link <Link>.
  const { href } = node.props;
  if (href !== undefined) {
    return `[${inner}](${href.startsWith("/") ? `${site.url}${href}` : href})`;
  }
  if (node.type === "code") {
    return `\`${inner}\``;
  }
  if (node.type === "p") {
    return `${inner}\n\n`;
  }
  return inner;
}
