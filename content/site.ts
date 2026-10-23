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
  name: "Łukasz Jagiełło",
  // ASCII spelling, so searches without Polish characters still match.
  alternateName: "Lukasz Jagiello",
  givenName: "Łukasz",
  familyName: "Jagiełło",
  jobTitle: "Engineering leader",
  location: "San Francisco Bay Area",
  // Search result and link preview description; also the structured-data bio.
  description:
    "Łukasz Jagiełło is an engineering leader in the San Francisco Bay Area. He plays CTFs, takes apart firmware and protocols, and builds art for Burning Man.",
  email: "lukasz@jagiello.org",
  photo: {
    src: "/photo.jpg",
    alt: "Portrait of Łukasz Jagiełło",
  },
  twitterHandle: "@lcfpl",
  alumniOf: "Gdańsk University of Technology",
};

// Shown as buttons under the about text, in order. Links with an empty href
// are skipped.
export const links: Link[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lukaszjagiello/" },
  { label: "GitHub", href: "https://github.com/ljagiello" },
  { label: "CTFtime", href: "https://ctftime.org/team/57347" },
  { label: "Discogs", href: "https://www.discogs.com/user/lcf" },
  { label: "X", href: "https://x.com/lcfpl" },
  { label: "Instagram", href: "https://www.instagram.com/lukaszjagiello/" },
  { label: "Email", href: `mailto:${site.email}` },
];

export const projectGroups: ProjectGroup[] = [
  {
    title: "Hacking and tooling",
    projects: [
      {
        name: "ctf-skills",
        description:
          "Agent skills for solving CTF challenges: web exploitation, binary pwn, crypto, reverse engineering, forensics and OSINT. 3,500+ stars on GitHub.",
        language: "Python",
        year: "2026",
        repo: "https://github.com/ljagiello/ctf-skills",
      },
      {
        name: "lastwar-client",
        description:
          "From-scratch Go client for Last War: Survival Game, covering its RSA/AES crypto and SFS2X wire protocol. Interoperability research.",
        language: "Go",
        year: "2026",
        repo: "https://github.com/ljagiello/lastwar-client",
      },
      {
        name: "git-clone",
        description:
          "Clones repositories into a predictable ~/code/<host>/<org>/<repo> layout and prints the path.",
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
          "Wearable LED pendant for Burning Man: ESP32-S3 firmware running shareable light patterns, with an iOS and Android companion app over Bluetooth.",
        language: "C++",
        year: "2026",
      },
      {
        name: "yamaha-cli",
        description:
          "Command-line control for Yamaha YXC/MusicCast AV receivers.",
        language: "Go",
        year: "2026",
        repo: "https://github.com/ljagiello/yamaha-cli",
      },
      {
        name: "airdash",
        description:
          "AirGradient air quality measurements in the macOS menu bar.",
        language: "Go",
        year: "2023",
        repo: "https://github.com/ljagiello/airdash",
      },
    ],
  },
];

export const activeLinks = links.filter((link) => link.href !== "");
