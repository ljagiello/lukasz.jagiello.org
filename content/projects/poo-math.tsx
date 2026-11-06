import type { Story } from "./index";

// The write-up on /projects/poo-math. See index.ts for the fields.
export const story: Story = {
  tagline: "A Burning Man RV pump-out planner",
  published: "2026-11-05T16:41:20-08:00",
  searchTitle: "Poo Math: Burning Man RV pump-out and water planner",
  searchDescription:
    "Plan Burning Man RV pump-outs and water refills. Poo Math simulates a thousand possible weeks to predict when your tanks fill, then drafts your RV survey reply.",
  body: () => (
    <>
      <p>
        Poo Math plans the least glamorous part of Burning Man. If you’re
        camping in an RV, you can’t dump wastewater on the playa, so every
        gallon of water you use ends up in your gray or black tank until a
        pump-out truck comes along. Run out of capacity halfway through the
        week, and you have a very real problem.
      </p>
      <p>
        You enter details about your RV, who’s staying in it, when everyone
        arrives and leaves, and how you use water. Poo Math models showers,
        sinks, and toilet usage day by day, then calculates how many pump-outs
        and fresh-water refills you’ll need and approximately when they’ll be
        necessary. Since no two weeks on the playa go exactly as planned, it
        also simulates 1,000 randomized versions of your week to show how
        much those dates might shift.
      </p>
      <p>
        It also estimates the risk of your tanks overflowing if rain turns the
        playa into mud and pump-out trucks can no longer reach your camp.
      </p>
      <p>
        Once the calculations are done, Poo Math generates a response you can
        paste directly into your camp’s RV survey. It’s free at{" "}
        <a href="https://poomath.com/">poomath.com</a>, with presets for
        common rental RVs and trailers, plus a few practical guides covering
        things like actual RV tank capacities and how much water one person
        typically uses on the playa.
      </p>
    </>
  ),
};
