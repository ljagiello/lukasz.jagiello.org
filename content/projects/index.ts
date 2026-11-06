// The write-up on each side project's page (/projects/<slug>) lives in its own
// file here, named after the slug in site.ts, so each page gets its own
// last-changed date (see updated.ts). Plain JSX so it can carry inline links.
// The first paragraph is shown in full ink, the rest muted.

import type { ReactNode } from "react";
import { type Project, projects } from "../site";
import { updated } from "../updated";
import { story as airdash } from "./airdash";
import { story as ctfSkills } from "./ctf-skills";
import { story as gitClone } from "./git-clone";
import { story as icefinder } from "./icefinder";
import { story as lastwarClient } from "./lastwar-client";
import { story as pooMath } from "./poo-math";
import { story as totemCompass } from "./totem-compass";
import { story as yamahaCli } from "./yamaha-cli";

export type Story = {
  // A few words on what it is. Goes under the name and into the page title.
  tagline: string;
  // When the page went live, for the structured data.
  published: string;
  // Search result and link preview title, when it should carry the words
  // people search for. Defaults to "<name>: <tagline>". Not shown on the
  // page; keep it under 60 characters.
  searchTitle?: string;
  // Search result and link preview description, when the card's text is too
  // long for one. Defaults to the card's description. Not shown on the page;
  // keep it under 160 characters.
  searchDescription?: string;
  // A documentation site separate from `url`, if there is one.
  docs?: string;
  body: () => ReactNode;
};

// Each project's write-up, keyed by its slug. A new project's file goes here
// too.
export const stories: Record<string, Story> = {
  icefinder,
  "lastwar-client": lastwarClient,
  "ctf-skills": ctfSkills,
  "totem-compass": totemCompass,
  "yamaha-cli": yamahaCli,
  "poo-math": pooMath,
  airdash,
  "git-clone": gitClone,
};

export type ProjectPage = Project &
  Story & {
    slug: string;
    // Site-relative, e.g. "/projects/ctf-skills".
    path: string;
    // When the page's content last changed (see updated.ts).
    modified: string;
  };

export const projectPath = (slug: string) => `/projects/${slug}`;

// The content-date workflow adds a new project's date after it lands on main;
// until then the page counts as unchanged since it went live.
const modified: Record<string, string | undefined> = updated.projects;

// Every project with a slug gets a page, in the same order as the cards. A
// slug without a story above fails the build rather than shipping an empty
// page.
export const projectPages: ProjectPage[] = projects.flatMap((project) => {
  if (!project.slug) {
    return [];
  }
  const story = stories[project.slug];
  if (!story) {
    throw new Error(
      `No write-up for "${project.slug}": add content/projects/${project.slug}.tsx and list it in content/projects/index.ts`,
    );
  }
  return [
    {
      ...project,
      ...story,
      slug: project.slug,
      path: projectPath(project.slug),
      modified: modified[project.slug] ?? story.published,
    },
  ];
});
