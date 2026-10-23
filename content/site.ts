// Everything shown on the page lives here (the about prose is in about.tsx).

export type Link = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  description: string;
  language: string;
  year: string;
  // Omit for private projects; the name is then shown without a link.
  repo?: string;
};

export type ProjectGroup = {
  title: string;
  projects: Project[];
};

export const site = {
  url: "https://lukasz.jagiello.org",
  // The page uses the ASCII spelling of the name.
  name: "Lukasz Jagiello",
  // Polish spelling, so searches with Polish characters still match.
  alternateName: "Łukasz Jagiełło",
  givenName: "Lukasz",
  familyName: "Jagiello",
  jobTitle: "Engineering leader",
  location: "San Francisco Bay Area",
  // Search result and link preview description; also the structured-data bio.
  description:
    "Lukasz Jagiello is an engineering leader in the San Francisco Bay Area. He plays CTFs, takes apart firmware and protocols, and builds art for Burning Man.",
  email: "lukasz@jagiello.org",
  photo: {
    src: "/photo.jpg",
    alt: "Portrait of Lukasz Jagiello",
  },
  twitterHandle: "@lcfpl",
  alumniOf: "Gdańsk University of Technology",
};

// Profile links under the name, in order; also the structured-data sameAs
// list. Email has its own Contact section. Links with an empty href are
// skipped.
export const links: Link[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lukaszjagiello/" },
  { label: "GitHub", href: "https://github.com/ljagiello" },
  { label: "CTFtime", href: "https://ctftime.org/team/57347" },
  { label: "Discogs", href: "https://www.discogs.com/user/lcf" },
  { label: "X", href: "https://x.com/lcfpl" },
  { label: "Instagram", href: "https://www.instagram.com/lukaszjagiello/" },
];

export const projectGroups: ProjectGroup[] = [
  {
    title: "Hacking and tooling",
    projects: [
      {
        name: "ctf-skills",
        description:
          "Hacking know-how for AI coding agents. It teaches Claude Code, Codex and other agents how to work through CTF challenges, from web bugs and binary exploits to crypto and forensics.",
        language: "Python",
        year: "2026",
        repo: "https://github.com/ljagiello/ctf-skills",
      },
      {
        name: "lastwar-client",
        description:
          "A from-scratch client for the mobile game Last War, built by reverse-engineering how the app talks to its servers. It logs in and runs a real game session without the official app; the full protocol write-up is at lastwar.tech.",
        language: "Go",
        year: "2026",
        repo: "https://github.com/ljagiello/lastwar-client",
      },
      {
        name: "git-clone",
        description:
          "Never wonder where you cloned something again. Whatever URL you give it, the repo lands in the same place under ~/code, and it prints the path so you can cd straight in.",
        language: "Go",
        year: "2024",
        repo: "https://github.com/ljagiello/git-clone",
      },
    ],
  },
  {
    title: "Hardware",
    projects: [
      {
        name: "IceFinder",
        description:
          "A wearable LED pendant for Burning Man 2027. You pick a light pattern as your personal signature and tune it from a phone app, so friends can spot you across the playa.",
        language: "C++",
        year: "2026",
      },
      {
        name: "yamaha-cli",
        description:
          "Control a Yamaha receiver from the terminal. It finds the receiver on your network by itself and handles volume, inputs, radio and multi-room audio, so it's easy to script.",
        language: "Go",
        year: "2026",
        repo: "https://github.com/ljagiello/yamaha-cli",
      },
      {
        name: "airdash",
        description:
          "Puts your AirGradient air-quality readings in the macOS menu bar, so CO2, PM2.5, temperature and humidity are always a glance away.",
        language: "Go",
        year: "2023",
        repo: "https://github.com/ljagiello/airdash",
      },
    ],
  },
];

export const activeLinks = links.filter((link) => link.href !== "");
