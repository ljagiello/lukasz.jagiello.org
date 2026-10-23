// Everything shown on the page lives here. Edit this file to change content.

export type Link = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  description: string;
  language: string;
  repo: string;
};

export const site = {
  url: "https://lukasz.jagiello.org",
  name: "Lukasz Jagiello",
  givenName: "Lukasz",
  familyName: "Jagiello",
  // Shown under the name and used as the search result description.
  headline: "Software engineer",
  intro:
    "I build developer tools, play CTFs, and take apart firmware and network protocols to see how they work.",
  description:
    "Lukasz Jagiello: software engineer. Side projects in security, reverse engineering and Go tooling, plus how to get in touch.",
  email: "lukasz@jagiello.org",
  photo: {
    src: "/photo.jpg",
    alt: "Portrait of Lukasz Jagiello",
  },
  twitterHandle: "@lcfpl",
};

// Rendered as pins on the pinout diagram, in order. Links with an empty
// href are skipped, so fill in LinkedIn and Instagram to make them appear.
export const links: Link[] = [
  { label: "GitHub", href: "https://github.com/ljagiello" },
  { label: "LinkedIn", href: "" }, // TODO: https://www.linkedin.com/in/<handle>/
  { label: "Instagram", href: "" }, // TODO: https://www.instagram.com/<handle>/
  { label: "X", href: "https://x.com/lcfpl" },
  { label: "Email", href: `mailto:${site.email}` },
];

export const projects: Project[] = [
  {
    name: "ctf-skills",
    description:
      "Agent skills for solving CTF challenges: web exploitation, binary pwn, crypto, reverse engineering, forensics and OSINT.",
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
    description:
      "Command-line control for Yamaha YXC/MusicCast AV receivers.",
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
