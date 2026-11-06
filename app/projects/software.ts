import { projectPath } from "@/content/projects";
import { type Project, site } from "@/content/site";

// Structured data for a public side project, credited to him. The home page
// and the project's own page carry the same node under the same @id, so
// search engines treat them as one thing. Private projects (no repo) get none.
export function softwareSourceCode(project: Project) {
  if (!project.repo) {
    return [];
  }
  const page = project.slug ? `${site.url}${projectPath(project.slug)}` : null;
  return [
    {
      "@type": "SoftwareSourceCode",
      ...(page ? { "@id": `${page}#software` } : {}),
      name: project.name,
      description: project.description,
      codeRepository: project.repo,
      url: project.url ?? page ?? project.repo,
      programmingLanguage: project.language,
      author: { "@id": `${site.url}/#person` },
    },
  ];
}
