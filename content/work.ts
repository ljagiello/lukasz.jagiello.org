// Everything on the /work page (offers, how to get in touch, the booking link).
// The prose stays here so llms.txt can carry the same words as the page.

import { site } from "./site";

export type Offer = {
  name: string;
  // Shown in the card's corner, e.g. "Fixed fee".
  kind: string;
  price: string;
  // Under the price, e.g. "two weeks".
  terms: string;
  description: string;
  includes: string[];
  // Who it is for, one line.
  fit: string;
};

// Links that need an account on another service. An empty href falls back to
// email, so the page works before they are connected:
// - booking: a Cal.com or Calendly event (30 minutes).
export const connect = {
  booking: "https://cal.com/ljagiello/intro",
};

export const work = {
  path: "/work",
  title: "Work with me",
  // The page title and the structured-data service name.
  headline: "Fractional engineering lead for teams shipping AI agents to production",
  // Search result and link preview description.
  description:
    "Lukasz Jagiello works with teams shipping AI agents to production: a fixed-fee Agent Platform Review, a fractional Head of Platform retainer, and a one-day team workshop on building and evaluating agent skills.",
  intro: [
    "I ran the platform (VP Engineering at Friday AI, a local-first agent runtime with MCP tool integrations across several LLM providers), the infrastructure under it (Kubernetes and GKE in production since 2019, HashiCorp Vault, the cost model), and I maintain ctf-skills, an open-source library of agent skills with an evaluation suite that lets coding agents solve CTF challenges.",
    "Before that I cofounded Tempest, an enterprise internal developer platform, led cloud engineering at Fleetsmith through its acquisition by Apple, and ran the global infrastructure of a top-20 website at Fandom. I work with a small number of teams at a time, remote, from the San Francisco Bay Area.",
  ],
  offers: [
    {
      name: "Agent Platform Review",
      kind: "Fixed fee",
      price: "$7,500",
      terms: "Two weeks · 50% at signature, 50% at the readout",
      description:
        "A two-week review of how your agents run in production: architecture, MCP and tool security, Kubernetes and cloud cost, reliability. You get severity-ranked findings, a 90-minute readout with the founders, and a 30/60/90-day plan.",
      includes: [
        "Architecture and runtime review, including tool and credential handling",
        "Cloud and Kubernetes cost model with the cuts ranked by effort",
        "Reliability and on-call review for a small team",
        "Written findings, a 90-minute readout, a 30/60/90 plan",
        "The whole fee is credited to a retainer signed within 30 days",
      ],
      fit: "Seed to Series B teams that just raised, or whose agents just reached production.",
    },
    {
      name: "Fractional Head of Platform",
      kind: "Retainer",
      price: "$8,000–10,000 / month",
      terms: "About 12 hours a week · monthly in advance · 30 days' notice",
      description:
        "An engineering lead for the platform and infrastructure side of an AI product, part-time: roadmap, architecture decisions, hiring bar, vendor and cost control, and a hand on the wheel when things break.",
      includes: [
        "Weekly planning with the founders and the engineers",
        "Architecture and vendor decisions, written down",
        "Hiring bar, interview loops and the first platform hires",
        "Cost and reliability reviews every month",
        "One client at a time on this retainer",
      ],
      fit: "Teams of 3–20 engineers that need a platform lead before they can hire one.",
    },
    {
      name: "Team workshop",
      kind: "On site or remote",
      price: "$12,000 / day",
      terms: "Up to 15 people · travel billed at cost",
      description:
        "Building and evaluating agent skills, taught on your own targets and tooling: how skills are structured, how an orchestrator routes work, how to write evals that catch regressions, and a live exercise at the end.",
      includes: [
        "Half a day of material, half a day hands-on with your team",
        "Your tooling and your targets, not a canned demo",
        "A follow-up call two weeks later",
      ],
      fit: "Engineering and security teams adopting coding agents.",
    },
  ] satisfies Offer[],
  howItWorks: [
    "Email me or book a call: thirty minutes, no deck, we talk about what you are shipping.",
    "I send a one-page proposal within two days: scope, price, dates.",
    "We sign a short agreement and start the following week.",
  ],
  notAFit: [
    "Full-time roles and interim roles: I am building a practice, not looking for a job.",
    "Anything related to Apple or Apple products.",
    "Equity-only advisory.",
  ],
  email: site.email,
};

// Email fallback for the booking link, so the button works before the
// calendar is connected.
const mail = (subject: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const links = {
  booking: connect.booking || mail("Call about working together"),
};
