// The write-up on each side project's page (/projects/<slug>), keyed by the
// slug in site.ts. Plain JSX so it can carry inline links. The first
// paragraph is shown in full ink, the rest muted.

import type { ReactNode } from "react";
import { type Project, projects } from "./site";

export type Story = {
  // A few words on what it is. Goes under the name and into the page title.
  tagline: string;
  // A documentation site separate from `url`, if there is one.
  docs?: string;
  body: () => ReactNode;
};

export const stories: Record<string, Story> = {
  "lastwar-client": {
    tagline: "A from-scratch client for Last War",
    body: () => (
      <>
        <p>
          Last War is a mobile strategy game, and this project started with a
          simple question: how does the app actually communicate with its
          servers? I reverse-engineered the Android app to find out, then used
          what I learned to build a new client in Go from scratch. It shares no
          code with the original game, yet it can log in and maintain a real
          session with the live servers.
        </p>
        <p>
          That required more digging than you might expect. Almost none of the
          game’s logic is compiled into the app itself. The gameplay and nearly
          all network commands are implemented in Lua scripts, which the game
          downloads and updates over the air. The scripts are hidden behind
          three custom file formats. One of them uses a deliberately modified
          bytecode header, altered just enough to prevent standard decompilers
          from opening it. After reverse-engineering all three formats, I was
          able to recover readable source code for every command the game can
          send.
        </p>
        <p>
          I then put a team of AI agents to work analyzing the entire app, with
          an automated script verifying that every file had been accounted for.
        </p>
        <p>
          I’ve documented the findings at{" "}
          <a href="https://lastwar.tech">lastwar.tech</a>, including the
          encryption, wire format, complete command catalog, and an ongoing
          research log that distinguishes between behavior confirmed against
          live servers and findings based solely on static analysis.
        </p>
        <p>
          The client has also evolved beyond reverse engineering. It can now
          handle routine in-game tasks, such as collecting resources from
          buildings, and can run unattended on a schedule.
        </p>
        <p>
          To be clear about what this is: interoperability research, not a
          cheat tool. Using a third-party client is likely to violate the game’s
          terms of service and could get your account banned. Don’t use it with
          an account you can’t afford to lose.
        </p>
      </>
    ),
  },
  "ctf-skills": {
    tagline: "Hacking know-how for AI coding agents",
    docs: "https://ljagiello.github.io/ctf-skills/",
    body: () => (
      <>
        <p>
          CTFs (Capture The Flag competitions) are hacking competitions where
          players race to exploit deliberately vulnerable systems and recover
          hidden flags. Challenges cover everything from web applications and
          compiled binaries to cryptography and digital forensics.
        </p>
        <p>
          ctf-skills teaches AI coding agents like Claude Code and Codex to
          approach these challenges the way an experienced CTF player would:
          what to look at first, which tools to use, and which techniques are
          likely to pay off.
        </p>
        <p>
          The project is a collection of skills, each focused on a different
          type of challenge, built using the open Agent Skills format. This
          means any compatible agent can use them. A coordinating skill analyzes
          each new challenge, identifies its type, and delegates it to the
          appropriate specialist. Other skills help the agent find and learn
          from existing writeups when it gets stuck, then document its own
          solution once it finds the flag.
        </p>
        <p>
          The part I care about most is measuring whether these skills actually
          make a difference. The repository includes an evaluation suite that
          tests three things: whether the agent selects the right skill for a
          challenge, whether it follows the rules defined by a skill even when
          prompted to cut corners, and whether having the skills improves its
          success rate on small, offline challenges compared to working without
          them.
        </p>
        <p>
          The project is open source under the MIT license, and I maintain it
          in my spare time. If it saves your team hours during a competition or
          security assessment, consider{" "}
          <a href="https://github.com/sponsors/ljagiello">
            sponsoring it on GitHub
          </a>
          .
        </p>
      </>
    ),
  },
  "totem-compass": {
    tagline: "Inside a festival gadget",
    docs: "https://totem-cb8b3887.mintlify.app",
    body: () => (
      <>
        <p>
          The Totem Compass is a handheld gadget designed for festivals. It
          combines a ring of lights, a glowing touch-sensitive crystal, GPS, and
          a compass. Friends can link their Totems into a small mesh network to
          find each other in the crowd, exchange taps and messages, and navigate
          to a shared meeting point.
        </p>
        <p>
          Curious about how it works, I reverse-engineered the firmware Totem
          publishes for its updates. Under the hood, the device runs
          MicroPython on an ESP32, with its logic compiled into bytecode and
          embedded in the firmware. It uses three radios on the same 2.4 GHz
          band: Bluetooth to communicate with the phone app, ESP-NOW for
          communication between Totems, and Wi-Fi for firmware updates. The
          accompanying research covers all three, along with the firmware
          structure and navigation protocols.
        </p>
        <p>
          I’m also explicit about what I haven’t figured out. Every finding is
          marked as either confirmed or inferred, and anything I haven’t been
          able to analyze is documented as well.
        </p>
        <p>
          The research resulted in two tools. <code>totemctl</code> communicates
          with a Totem over Bluetooth using the same protocol as the official
          app, allowing you to check its status, rename it, and change its
          settings from a laptop. <code>totememu</code> turns a standard ESP32
          development board into a virtual Totem. It pairs with a real device
          using the normal touch gesture and exchanges status updates with it
          over the mesh network.
        </p>
        <p>
          This is independent research and is not affiliated with or endorsed
          by Totem Labs. The firmware analysis is entirely static, and both
          tools have only been tested against my own Totem. They’re deliberately
          designed to avoid interacting with or affecting other people’s devices
          nearby.
        </p>
      </>
    ),
  },
  "yamaha-cli": {
    tagline: "Control a Yamaha receiver from the terminal",
    docs: "https://ljagiello.github.io/yamaha-cli/",
    body: () => (
      <>
        <p>
          Yamaha’s networked receivers have an HTTP API, the same one the
          MusicCast phone app uses. yamaha-cli turns it into simple terminal
          commands for power, volume, inputs, sound modes, radio and streaming.
          I built and tested it against an RX-V583, and it should work with any
          MusicCast receiver.
        </p>
        <p>
          I wanted something that’s easy to script. The first time you run it,
          it searches your network, finds the receiver and saves it under a name
          you pick. If the router later gives the receiver a new IP address, the
          tool notices, finds it again and carries on. In a terminal it prints a
          readable table, and when you pipe it into another program it switches
          to JSON.
        </p>
        <p>
          Beyond the basics, it can link receivers in different rooms so they
          play the same music, stream changes live as they happen, and talk to
          older receivers through Yamaha’s legacy text protocol. It also comes
          with an agent skill, so you can ask an AI assistant to turn the
          receiver on and switch to HDMI 2, and it knows which commands to run.
        </p>
        <p>
          One thing worth knowing: Yamaha’s protocol has no password and no
          encryption, so anyone on your home network can control the receiver.
          That’s how Yamaha designed it, not something a client can fix, and
          it’s a good reason never to expose a receiver to the internet.
        </p>
      </>
    ),
  },
  "poo-math": {
    tagline: "A Burning Man RV pump-out planner",
    body: () => (
      <>
        <p>
          Poo Math plans the least glamorous part of Burning Man. If you camp in
          an RV, you can’t drain anything onto the playa, so every gallon of
          water you use ends up in your gray or black tank until a truck comes
          to pump it out. Run out of room halfway through the week and you have
          a very real problem.
        </p>
        <p>
          You tell it about your rig, who’s staying in it and when each person
          arrives and leaves, and how you use water. It models showers, the sink
          and the toilet day by day, then works out how many pump-outs and
          fresh-water refills you’ll need and roughly when each one is due. Since
          no week on the playa goes exactly to plan, it also runs a thousand
          randomized versions of the week to show how much those dates can move.
          And it estimates the chance that your tank overflows if rain turns the
          playa to mud and the trucks can’t drive.
        </p>
        <p>
          When it’s done, it drafts a reply you can paste straight into your
          camp’s RV survey. It’s free at{" "}
          <a href="https://poomath.com/">poomath.com</a>, with presets for
          common rental RVs and trailers and a few short guides, like how big RV
          tanks really are and how much water one person goes through on the
          playa.
        </p>
      </>
    ),
  },
  airdash: {
    tagline: "Air quality in the macOS menu bar",
    body: () => (
      <>
        <p>
          AirGradient makes air quality monitors that measure CO2, fine
          particles (PM2.5), temperature and humidity. airdash shows those
          readings in the macOS menu bar, so you can check the air in the room
          without opening a dashboard.
        </p>
        <p>
          It’s a small native Mac app written in Go, using bindings to Apple’s
          AppKit. It fetches the latest readings from AirGradient’s API once a
          minute and can install itself as a background service that starts
          when you log in. It runs on Apple Silicon Macs.
        </p>
        <p>
          It goes back to 2023, which makes it the oldest of my side projects
          here, and it still gets updates.
        </p>
      </>
    ),
  },
  "git-clone": {
    tagline: "Every repo in a predictable place",
    body: () => (
      <>
        <p>
          git-clone fixes a small but constant annoyance: forgetting where you
          cloned something. Give it a repository URL and it puts the repo in a
          predictable place, <code>~/code/&lt;host&gt;/&lt;org&gt;/&lt;repo&gt;</code>,
          creating the folders along the way. Everything from GitHub ends up
          under <code>~/code/github.com</code>, no matter which folder you were
          in when you cloned it.
        </p>
        <p>
          It understands all the usual ways of writing a repo address, whether
          that’s HTTPS, SSH or just <code>github.com/org/repo</code>. When it’s
          done it prints the path, so you can clone a repo and cd into it in one
          go. If a clone fails halfway, it cleans up instead of leaving empty
          folders behind, and the base folder can be moved with an environment
          variable.
        </p>
      </>
    ),
  },
};

export type ProjectPage = Project &
  Story & {
    slug: string;
    // Site-relative, e.g. "/projects/ctf-skills".
    path: string;
  };

export const projectPath = (slug: string) => `/projects/${slug}`;

// Every project with a slug gets a page, in the same order as the cards. A
// slug without a story above fails the build rather than shipping an empty
// page.
export const projectPages: ProjectPage[] = projects.flatMap((project) => {
  if (!project.slug) {
    return [];
  }
  const story = stories[project.slug];
  if (!story) {
    throw new Error(`No write-up for "${project.slug}" in content/projects.tsx`);
  }
  return [
    { ...project, ...story, slug: project.slug, path: projectPath(project.slug) },
  ];
});
