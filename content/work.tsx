// Everything on the /work page (intro, offers, how to get in touch, the booking
// link). The prose stays here so llms.txt can carry the same words as the page.

import Link from "next/link";
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
  // The same price as numbers in USD, for the structured data: the lowest,
  // the highest for a range, and what it's per for a rate.
  amount: { min: number; max?: number; per?: "month" | "day" };
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
  // The page's heading.
  headline: "Fractional engineering leadership for teams taking AI agents to production",
  // Search result and link preview title. Under 60 characters so Google
  // doesn't cut it, with the name and the role people search for up front.
  searchTitle: "Lukasz Jagiello: Fractional Head of Platform for AI agents",
  // Search result and link preview description, under 160 characters.
  description:
    "Lukasz Jagiello helps teams take AI agents to production: a fixed-fee Agent Platform Review, a fractional Head of Platform retainer, and team workshops.",
  offers: [
    {
      name: "Agent Platform Review",
      kind: "Fixed fee",
      price: "$7,500",
      terms: "Two weeks · 50% at signature, 50% at the readout",
      description:
        "A two-week assessment of your production agent stack, covering architecture, MCP and tool security, Kubernetes and cloud costs, and reliability. You get severity-ranked findings, a 90-minute readout with the founders, and a 30/60/90-day plan.",
      includes: [
        "Architecture and runtime review, including tool and credential handling",
        "Cloud and Kubernetes cost model with cost-saving opportunities ranked by effort and impact",
        "Reliability and on-call practices for small engineering teams",
        "Written findings, a 90-minute readout, a 30/60/90 plan",
        "The whole fee is credited to a retainer signed within 30 days",
      ],
      fit: "Seed to Series B teams that just raised, or whose agents just reached production.",
      amount: { min: 7500 },
    },
    {
      name: "Fractional Head of Platform",
      kind: "Retainer",
      price: "$8,000–10,000 / month",
      terms: "About 12 hours a week · monthly in advance · 30 days’ notice",
      description:
        "Part-time engineering leadership for the platform and infrastructure behind your AI product. I help set the roadmap, make architecture decisions, establish the hiring bar, manage vendors and costs, and stay hands-on when things break.",
      includes: [
        "Weekly planning with the founders and the engineers",
        "Architecture and vendor decisions, written down",
        "Hiring bar, interview loops and the first platform hires",
        "Cost and reliability reviews every month",
        "One client at a time on this retainer",
      ],
      fit: "Teams of 3–20 engineers that need a platform lead before they can hire one.",
      amount: { min: 8000, max: 10000, per: "month" },
    },
    {
      name: "Team workshop",
      kind: "On site or remote",
      price: "$12,000 / day",
      terms: "Up to 15 people · travel billed at cost",
      description:
        "A hands-on workshop on building and evaluating agent skills using your own targets and tooling. We’ll cover skill structure, orchestrator routing, and writing evals that catch regressions, then put everything into practice with a live exercise.",
      includes: [
        "Half a day of material, half a day hands-on with your team",
        "Your tooling and your targets, not a canned demo",
        "A follow-up call two weeks later",
      ],
      fit: "Engineering and security teams adopting coding agents.",
      amount: { min: 12000, per: "day" },
    },
  ] satisfies Offer[],
  howItWorks: [
    "Email me or book a 30-minute call. No deck, just a conversation about what you’re building and where you need help.",
    "Within two days, I’ll send a one-page proposal outlining the scope, price, and timeline.",
    "We sign a short agreement and get started the following week.",
  ],
  notAFit: [
    "Full-time or interim positions. I’m focused on building an independent practice and working with teams on a project basis.",
    "Questions about my time at Apple or the work I did there.",
    "Equity-only advisory.",
  ],
  email: site.email,
};

// The intro under the headline. Plain JSX so it can carry inline links.
export function WorkIntro() {
  return (
    <>
      <p>
        I co-founded Tempest Labs, where we built Friday AI, a platform for
        running AI agents with a local-first runtime and MCP tool integrations
        across multiple LLM providers. I led engineering, building everything
        from the runtime itself to production infrastructure (Kubernetes and GKE
        since 2019), HashiCorp Vault, and the underlying cost model. I also
        maintain{" "}
        <Link href="/projects/ctf-skills">ctf-skills</Link>, an
        open-source library of agent skills with an evaluation suite that lets
        coding agents solve CTF challenges.
      </p>
      <p>
        Before Tempest, I led cloud engineering at Fleetsmith through its
        acquisition by Apple and ran global infrastructure for one of the top 20
        websites at Fandom.
      </p>
      <p>
        I work remotely with a small number of teams at a time, based in the San
        Francisco Bay Area.
      </p>
    </>
  );
}

// Email fallback for the booking link, so the button works before the
// calendar is connected.
const mail = (subject: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const links = {
  booking: connect.booking || mail("Call about working together"),
};
