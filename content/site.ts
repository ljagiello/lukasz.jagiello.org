// Everything shown on the page lives here. Edit this file to change content.

export type Link = {
  label: string;
  href: string;
};

export type Role = {
  years: string;
  title: string;
  company: string;
  url?: string;
  summary: string;
};

export type Project = {
  name: string;
  description: string;
  language: string;
  repo: string;
};

export const site = {
  url: "https://lukasz.jagiello.org",
  name: "Łukasz Jagiełło",
  // ASCII spelling, so searches without Polish characters still match.
  alternateName: "Lukasz Jagiello",
  givenName: "Łukasz",
  familyName: "Jagiełło",
  jobTitle: "VP of Engineering",
  company: { name: "Friday AI", url: "https://hellofriday.ai" },
  location: "San Francisco Bay Area",
  intro:
    "I lead engineering at Friday AI, a local-first platform for running AI agent workflows. Before that I co-founded Tempest, helped ship Apple Business Essentials after Apple acquired Fleetsmith, and ran global infrastructure at Fandom. Outside work I play CTFs and build security tooling.",
  // Search result and link preview description.
  description:
    "Łukasz Jagiełło is VP of Engineering at Friday AI. Previously co-founder of Tempest, engineering manager at Apple via the Fleetsmith acquisition, and director of technical operations at Fandom.",
  email: "lukasz@jagiello.org",
  photo: {
    src: "/photo.jpg",
    alt: "Portrait of Łukasz Jagiełło",
  },
  twitterHandle: "@lcfpl",
  alumniOf: "Gdańsk University of Technology",
};

// Shown as buttons under the intro, in order. Links with an empty href are
// skipped, so fill in Instagram to make it appear.
export const links: Link[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lukaszjagiello/" },
  { label: "GitHub", href: "https://github.com/ljagiello" },
  { label: "X", href: "https://x.com/lcfpl" },
  { label: "Instagram", href: "" }, // TODO: https://www.instagram.com/<handle>/
  { label: "Email", href: `mailto:${site.email}` },
];

export const experience: Role[] = [
  {
    years: "2026 – now",
    title: "VP of Engineering",
    company: "Friday AI",
    url: "https://hellofriday.ai",
    summary:
      "Leading engineering for a local-first platform that turns natural-language requests into repeatable, production-grade AI agent workflows.",
  },
  {
    years: "2023 – 2026",
    title: "Co-founder & VP of Engineering",
    company: "Tempest",
    summary:
      "Built an internal developer platform with self-serve workflows and security guardrails, from day zero to public launch and a $3.2M seed round.",
  },
  {
    years: "2020 – 2023",
    title: "Engineering Manager",
    company: "Apple",
    summary:
      "Led the team behind the cloud platform for Apple Business Essentials, Apple's first B2B SaaS product.",
  },
  {
    years: "2019 – 2020",
    title: "Director of Engineering, Cloud Operations",
    company: "Fleetsmith",
    summary:
      "Built the cloud platform for Fleetsmith's Apple device management product on Google Cloud, through its acquisition by Apple.",
  },
  {
    years: "2013 – 2019",
    title: "Director of Technical Operations",
    company: "Fandom",
    summary:
      "Ran infrastructure for one of the 20 largest websites in the world: four datacenters on two continents and a global CDN.",
  },
  {
    years: "2003 – 2012",
    title: "Systems and network administration",
    company: "Gdańsk, Poland",
    summary:
      "Started out running the Gdańsk University of Technology campus network, then high-availability systems for web companies.",
  },
];

export const projects: Project[] = [
  {
    name: "ctf-skills",
    description:
      "Agent skills for solving CTF challenges: web exploitation, binary pwn, crypto, reverse engineering, forensics and OSINT. A coding agent using them solved 50 of 54 challenges at BSidesSF CTF.",
    language: "Python",
    repo: "https://github.com/ljagiello/ctf-skills",
  },
  {
    name: "airdash",
    description: "AirGradient air quality measurements in the macOS menu bar.",
    language: "Go",
    repo: "https://github.com/ljagiello/airdash",
  },
  {
    name: "yamaha-cli",
    description: "Command-line control for Yamaha YXC/MusicCast AV receivers.",
    language: "Go",
    repo: "https://github.com/ljagiello/yamaha-cli",
  },
  {
    name: "totem-compass",
    description:
      "Reverse-engineering notes for the Totem Compass ESP32 firmware: memory map, frozen modules, and its BLE, ESP-NOW and Wi-Fi OTA protocols.",
    language: "Go",
    repo: "https://github.com/ljagiello/totem-compass",
  },
  {
    name: "lastwar-client",
    description:
      "From-scratch Go client for Last War: Survival Game, covering its RSA/AES crypto and SFS2X wire protocol. Interoperability research.",
    language: "Go",
    repo: "https://github.com/ljagiello/lastwar-client",
  },
  {
    name: "git-clone",
    description:
      "Clones repositories into a predictable ~/code/<host>/<org>/<repo> layout and prints the path.",
    language: "Go",
    repo: "https://github.com/ljagiello/git-clone",
  },
];

export const activeLinks = links.filter((link) => link.href !== "");
