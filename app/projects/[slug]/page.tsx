import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type ProjectPage, projectPages } from "@/content/projects";
import { site } from "@/content/site";
import { home, personRef, siteNodes, websiteRef } from "../../schema";
import { softwareSourceCode } from "../software";

// Every project page is built ahead of time; the build fails if one can't be.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return projectPages.map((project) => ({ slug: project.slug }));
}

// Cache Components rules out `dynamicParams = false`, so an unknown slug is
// turned into a 404 here instead.
async function findProject(params: PageProps<"/projects/[slug]">["params"]) {
  const { slug } = await params;
  const project = projectPages.find((page) => page.slug === slug);
  if (!project) {
    notFound();
  }
  return project;
}

// The search-result title and description, which can say more than the
// visible name and tagline (see Story in content/projects/index.ts).
const titleOf = (project: ProjectPage) =>
  project.searchTitle ?? `${project.name}: ${project.tagline}`;
const descriptionOf = (project: ProjectPage) =>
  project.searchDescription ?? project.description;

// Replaces the home page's profile-shaped tags for this page. Resolved at
// build time, so the tags are in the prerendered <head>.
export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await findProject(params);
  const title = titleOf(project);
  const description = descriptionOf(project);
  return {
    title,
    description,
    alternates: { canonical: project.path },
    // The preview image comes from opengraph-image.tsx next to this page.
    openGraph: {
      type: "article",
      url: project.path,
      siteName: site.name,
      title,
      description,
      locale: "en_US",
      publishedTime: project.published,
      modifiedTime: project.modified,
      authors: [home],
    },
    twitter: {
      card: "summary_large_image",
      creator: site.twitterHandle,
      title,
      description,
    },
  };
}

// Strips the scheme for display, e.g. "github.com/ljagiello/ctf-skills".
const bare = (href: string) => href.replace(/^https:\/\//, "").replace(/\/$/, "");

export default async function Project({ params }: PageProps<"/projects/[slug]">) {
  const project = await findProject(params);
  const Body = project.body;
  const others = projectPages.filter((page) => page.slug !== project.slug);

  const url = `${site.url}${project.path}`;
  const title = titleOf(project);
  const description = descriptionOf(project);
  // Empty for a private project (no repo), which then has no `about`.
  const software = softwareSourceCode(project);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: websiteRef,
        ...(software.length > 0 ? { about: { "@id": `${url}#software` } } : {}),
        author: personRef,
        breadcrumb: { "@id": `${url}#breadcrumb` },
        datePublished: project.published,
        dateModified: project.modified,
      },
      // The write-up itself, signed by him, so search engines and LLMs credit
      // the author and dates.
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: title,
        description,
        author: personRef,
        publisher: personRef,
        datePublished: project.published,
        dateModified: project.modified,
        image: `${url}/opengraph-image`,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        ...(software.length > 0 ? { about: { "@id": `${url}#software` } } : {}),
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: home },
          { "@type": "ListItem", position: 2, name: project.name, item: url },
        ],
      },
      ...software,
      ...siteNodes,
    ],
  };

  // The project's own website first, then its docs and source.
  const links = [
    project.url ? { label: "Website", href: project.url } : null,
    project.docs ? { label: "Docs", href: project.docs } : null,
    project.repo ? { label: "Source", href: project.repo } : null,
  ].filter((link) => link !== null);

  return (
    <div className="site">
      <div className="page">
        <main>
          <header className="project-hero">
            <p className="crumb mono">
              <Link href="/">{site.name}</Link> <span aria-hidden="true">/</span>{" "}
              <Link href="/#projects">Side projects</Link>{" "}
              <span aria-hidden="true">/</span> <span>{project.name}</span>
            </p>
            <h1>{project.name}</h1>
            <p className="project-tagline">{project.tagline}</p>
          </header>

          <div className="project-layout">
            <article className="project-story">
              <Body />
            </article>
            <aside className="project-facts mono" aria-label="About the project">
              <dl>
                <div>
                  <dt>Kind</dt>
                  <dd>{project.category}</dd>
                </div>
                <div>
                  <dt>Language</dt>
                  <dd>{project.language}</dd>
                </div>
                <div>
                  <dt>Started</dt>
                  <dd>{project.year}</dd>
                </div>
                {links.map((link) => (
                  <div key={link.label}>
                    <dt>{link.label}</dt>
                    <dd>
                      <a href={link.href}>{bare(link.href)}</a>
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          <nav className="project-more" aria-labelledby="more">
            <h2 id="more">More side projects</h2>
            <ul>
              {others.map((page) => (
                <li key={page.slug}>
                  <Link href={page.path}>{page.name}</Link>{" "}
                  <span>{page.tagline}</span>
                </li>
              ))}
            </ul>
          </nav>
        </main>

        {/* The work page is otherwise linked only from the home page. */}
        <footer className="footer mono">
          <Link href="/">{site.name}</Link> <span aria-hidden="true">·</span>{" "}
          <Link href="/work">Work with me</Link>
        </footer>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
