// Everything on the /work page (offers, the workshop, the links to connect).
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
// - presale: a Stripe Payment Link for the founding-cohort seat.
// - waitlist: a form (Tally, Google Forms) for the workshop waitlist.
export const connect = {
  booking: "",
  presale: "",
  waitlist: "",
};

export const work = {
  path: "/work",
  title: "Work with me",
  // The page title and the structured-data service name.
  headline: "Fractional engineering lead for teams shipping AI agents to production",
  // Search result and link preview description.
  description:
    "Lukasz Jagiello works with teams shipping AI agents to production: a fixed-fee Agent Platform Review, a fractional Head of Platform retainer, and a hands-on workshop on building and evaluating agent skills.",
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
  workshop: {
    name: "Building and evaluating agent skills: the ctf-skills playbook",
    when: "10–11 February 2027, two live sessions of 3.5 hours, online",
    price: "$900",
    earlyBird: "$750 until 31 December 2026",
    seats: "15 seats in the founding cohort",
    description:
      "A hands-on course on the thing behind ctf-skills: how to package know-how into skills that coding agents can use, how to structure an orchestrator, and how to build evaluations with promptfoo so you can tell when a change helps. CTF challenges are the testbed because they give an unambiguous score; the methods carry to any domain. For engineers adopting coding agents and people building skills; this is not a security course.",
    includes: [
      "Both sessions live, with the recording afterwards",
      "The skills, orchestrator and eval suite walked through end to end",
      "One live CTF solved together, with the agent doing the work",
      "A founding-cohort price in exchange for a short testimonial",
    ],
    lightning: {
      name: "Free lightning lesson",
      when: "14 January 2027, 60 minutes, online",
      description:
        "One skill, one eval, one challenge, start to finish. A preview of the workshop and a way to see if it is for you.",
    },
  },
  howItWorks: [
    "Email me or book a call: thirty minutes, no deck, we talk about what you are shipping.",
    "I send a one-page proposal within two days: scope, price, dates.",
    "We sign a short agreement and start the following week.",
  ],
  notAFit: [
    "Full-time roles and interim roles: I am building a practice, not looking for a job.",
    "Anything related to Apple or Apple products.",
    "Security research or penetration testing: ctf-skills is agent tooling, and I play CTFs for fun. For offensive-security work I will point you to people who do it for a living.",
    "Equity-only advisory.",
  ],
  email: site.email,
};

// Email fallbacks for the links in `connect`, so every button works before
// the services are connected.
const mail = (subject: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const links = {
  booking: connect.booking || mail("Call about working together"),
  presale: connect.presale || mail("Founding-cohort seat: agent skills workshop"),
  waitlist: connect.waitlist || mail("Workshop waitlist: agent skills"),
};
