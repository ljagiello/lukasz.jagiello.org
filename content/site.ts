// Everything shown on the page lives here (the about prose is in about.tsx).

import { updated } from "./updated";

export type IconName =
  | "linkedin"
  | "github"
  | "ctftime"
  | "discogs"
  | "bandcamp"
  | "soundcloud"
  | "x"
  | "bluesky"
  | "instagram";

export type Link = {
  label: string;
  href: string;
  icon: IconName;
};

export type Project = {
  name: string;
  // Shown in the card's corner, e.g. "Hardware".
  category: string;
  description: string;
  language: string;
  year: string;
  // The project's own website, if it has one.
  url?: string;
  // Omit for private projects.
  repo?: string;
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
  // Structured data only: tells him apart from other people with the same
  // name, some of whom use the same handles elsewhere.
  disambiguatingDescription:
    "Engineering leader in the San Francisco Bay Area, CTF player and author of ctf-skills. ljagiello on GitHub, Keybase, Reddit, HackerOne and Hack The Box; lukaszjagiello on LinkedIn and Instagram; lcfpl on X.",
  // Which handle he uses where, for llms.txt.
  handles: [
    "ljagiello on GitHub, Keybase, Reddit, HackerOne, Hack The Box, Hacker News, Docker Hub and Bandcamp",
    "lukaszjagiello on LinkedIn and Instagram",
    "lcfpl on X",
    "jagiello.org on Bluesky",
    "lcf on Discogs, LCF on CTFtime",
  ],
  email: "lukasz@jagiello.org",
  photo: {
    src: "/photo.jpg",
    alt: "Portrait of Lukasz Jagiello",
  },
  twitterHandle: "@lcfpl",
  alumniOf: "Gdańsk University of Technology",
  // Structured-data dates, also the sitemap's lastmod. Google wants a full
  // date and time with a UTC offset, not just a date. `updated` is set
  // automatically (see updated.ts).
  created: "2026-10-23T11:05:59-07:00",
  updated,
  // Structured-data topics, all mentioned on the page.
  knowsAbout: [
    "AI agents",
    "Developer platforms",
    "Infrastructure",
    "Capture the flag (CTF)",
    "Reverse engineering",
    "Firmware",
    "Wire protocols",
  ],
  memberOf: [{ name: "Titanic’s End", url: "https://www.titanicsend.com/" }],
  // Profiles that go in the structured-data sameAs list and llms.txt but
  // don't get an icon on the page.
  extraProfiles: [
    { label: "Keybase", href: "https://keybase.io/ljagiello" },
    { label: "Gravatar", href: "https://gravatar.com/lcfik" },
    { label: "Reddit", href: "https://www.reddit.com/user/ljagiello" },
    { label: "HackerOne", href: "https://hackerone.com/ljagiello" },
    {
      label: "Hack The Box",
      href: "https://profile.hackthebox.com/profile/01a17907-47d7-71a0-bd82-f5231b09a7e6",
    },
    // The icon links the team, which is just him; this is his player page.
    { label: "CTFtime (player)", href: "https://ctftime.org/user/77743" },
    { label: "YouTube", href: "https://www.youtube.com/@lukasz.jagiello" },
    {
      label: "Hacker News",
      href: "https://news.ycombinator.com/user?id=ljagiello",
    },
    { label: "Docker Hub", href: "https://hub.docker.com/u/ljagiello" },
  ],
};

// Profile icons under the name, in order; also the structured-data sameAs
// list. Email has its own Contact section. Links with an empty href are
// skipped. Adding a tenth icon needs the narrow-phone CSS in globals.css
// rechecked, or the row wraps.
export const links: Link[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lukaszjagiello",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/ljagiello", icon: "github" },
  { label: "CTFtime", href: "https://ctftime.org/team/57347", icon: "ctftime" },
  { label: "Discogs", href: "https://www.discogs.com/user/lcf", icon: "discogs" },
  { label: "Bandcamp", href: "https://bandcamp.com/ljagiello", icon: "bandcamp" },
  {
    label: "SoundCloud",
    href: "https://soundcloud.com/jagiello-lukasz",
    icon: "soundcloud",
  },
  { label: "X", href: "https://x.com/lcfpl", icon: "x" },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/jagiello.org",
    icon: "bluesky",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lukaszjagiello/",
    icon: "instagram",
  },
];

// Side project cards. IceFinder, the current focus, goes first; the rest are
// most recently active first. Reorder as activity changes.
export const projects: Project[] = [
  {
    name: "IceFinder",
    category: "Hardware",
    description:
      "A wearable LED pendant for Burning Man 2027. Its lights point toward your friends, so you can find each other anywhere on the playa.",
    language: "C++",
    year: "2026",
  },
  {
    name: "lastwar-client",
    category: "Hacking and tooling",
    description:
      "A from-scratch client for the mobile game Last War, built by reverse-engineering how the app talks to its servers. It logs in and runs a real game session without the official app, and its site has the full protocol write-up.",
    language: "Go",
    year: "2026",
    url: "https://lastwar.tech",
    repo: "https://github.com/ljagiello/lastwar-client",
  },
  {
    name: "ctf-skills",
    category: "Hacking and tooling",
    description:
      "Hacking know-how for AI coding agents. It teaches Claude Code, Codex and other agents how to work through CTF challenges, from web bugs and binary exploits to crypto and forensics.",
    language: "Python",
    year: "2026",
    repo: "https://github.com/ljagiello/ctf-skills",
  },
  {
    name: "Totem Compass",
    category: "Hardware",
    description:
      "A teardown of the Totem Compass, the festival gadget that helps friends find each other. It explains how the firmware works and how the devices talk to the phone and to each other, with a working client and an ESP32 that joins the mesh.",
    language: "Go",
    year: "2026",
    repo: "https://github.com/ljagiello/totem-compass",
  },
  {
    name: "yamaha-cli",
    category: "Hardware",
    description:
      "Control a Yamaha receiver from the terminal. It finds the receiver on your network by itself and handles volume, inputs, radio and multi-room audio, so it's easy to script.",
    language: "Go",
    year: "2026",
    repo: "https://github.com/ljagiello/yamaha-cli",
  },
  {
    name: "Poo Math",
    category: "Hacking and tooling",
    description:
      "Plans the least glamorous part of Burning Man: when your RV needs pumping out and refilling. It simulates a thousand possible weeks to predict when the tanks fill up, then drafts your reply to the camp's RV survey.",
    language: "Svelte",
    year: "2026",
    url: "https://poomath.com",
    repo: "https://github.com/ljagiello/poomath.com",
  },
  {
    name: "airdash",
    category: "Hardware",
    description:
      "Puts your AirGradient air-quality readings in the macOS menu bar, so CO2, PM2.5, temperature and humidity are always a glance away.",
    language: "Go",
    year: "2023",
    repo: "https://github.com/ljagiello/airdash",
  },
  {
    name: "git-clone",
    category: "Hacking and tooling",
    description:
      "Never wonder where you cloned something again. Whatever URL you give it, the repo lands in the same place under ~/code, and it prints the path so you can cd straight in.",
    language: "Go",
    year: "2024",
    repo: "https://github.com/ljagiello/git-clone",
  },
];

export const activeLinks = links.filter((link) => link.href !== "");
