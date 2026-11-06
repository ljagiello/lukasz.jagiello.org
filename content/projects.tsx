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
  icefinder: {
    tagline: "A pendant that points you toward your friends",
    body: () => (
      <>
        <p>
          IceFinder is a wearable LED pendant I’m building for Burning Man
          2027. Its ring of lights points toward your friends, so you can find
          each other anywhere on the playa.
        </p>
        <p>
          Each pendant knows where it is and which way you’re facing, from its
          own GPS receiver, compass and motion sensor. Friends’ pendants share
          their positions directly with each other over a radio mesh, with no
          phones, cell signal or internet involved. Your pendant works out where
          each friend is relative to you and lights up the part of the ring that
          faces them, with the top of the ring meaning straight ahead.
        </p>
        <p>
          Because the pendant shares where you are, security matters as much as
          the lights. Friends are added by exchanging keys between their owners’
          phones, and every position is encrypted so only the friends it’s meant
          for can read it. Only the owner can change a pendant’s settings, and a
          pendant installs only firmware updates that are signed.
        </p>
        <p>
          Right now I’m rewriting the firmware in C on ESP-IDF, ahead of the
          final circuit board. It runs on a development board with the same GPS
          receiver, and it already handles owner pairing, the encrypted
          Bluetooth session, saved settings, the lights and signed updates over
          Bluetooth or Wi-Fi. The mesh radio and the direction display come
          next.
        </p>
        <p>
          A device people wear for a week in the desert has to be reliable, so
          the firmware is tested hard. Every parser that reads outside data has
          a fuzz target. Mutation tests check that the test suite actually
          catches bugs. Independent QA agents write their own tests from the
          design documents rather than from the code.
        </p>
        <p>The code is private for now, so there’s no repository to link.</p>
      </>
    ),
  },
  "lastwar-client": {
    tagline: "A from-scratch client for Last War",
    body: () => (
      <>
        <p>
          Last War is a mobile strategy game, and this project started with a
          simple question: how exactly does the app talk to its servers? I took
          the Android app apart to find out, then used what I learned to write a
          new client in Go from scratch. It shares no code with the game, yet it
          logs in and holds a real session with the live servers.
        </p>
        <p>
          That took more digging than you might expect. Almost none of the
          game’s logic is compiled into the app you download. The gameplay and
          nearly every network command are Lua scripts that the game updates
          over the air, and the code is hidden behind three custom file formats.
          One of them uses a deliberately altered bytecode header, changed just
          enough that standard decompilers refuse to open it. Once all three
          were cracked, I had readable source for every command the game can
          send. Later, a team of AI agents went through the whole app, with a
          script checking that no file was left unaccounted for.
        </p>
        <p>
          Everything I found is written up on{" "}
          <a href="https://lastwar.tech">lastwar.tech</a>: the encryption, the
          wire format, the full catalog of commands, and a running log that
          separates what has been confirmed against the live servers from what
          is still only static analysis. The client itself has grown to handle
          routine chores, like collecting resources from buildings, and it can
          run unattended on a schedule.
        </p>
        <p>
          To be clear about what this is: interoperability research, not a
          cheat tool. Running any third-party client is likely against the
          game’s terms of service, and accounts can get banned, so don’t use it
          on one you can’t afford to lose.
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
          CTFs are hacking competitions. Players race to break into
          deliberately vulnerable programs and recover a hidden “flag”, and the
          challenges cover everything from web apps and compiled binaries to
          cryptography and forensics. ctf-skills teaches AI coding agents like
          Claude Code and Codex to work through them the way an experienced
          player would: what to check first, which tools to reach for, and which
          tricks usually pay off.
        </p>
        <p>
          It’s a set of skills, one for each kind of challenge, written in the
          open Agent Skills format so any agent that supports it can use them. A
          coordinating skill reads a new challenge, works out what kind it is
          and hands it to the right specialist. Others look up writeups of
          similar challenges when the agent gets stuck, and write up the
          solution once the flag is found.
        </p>
        <p>
          The part I care about most is proving that the skills actually help.
          The repo has an evaluation suite that checks three things: whether the
          agent picks the right skill for a challenge, whether it sticks to the
          rules written into a skill even when the prompt pushes it to cut
          corners, and whether it solves small offline challenges more often
          with the skills than without them.
        </p>
        <p>
          It’s open source under the MIT license, and I maintain it in my spare
          time. If it saves your team hours during a competition or a security
          assessment, you can{" "}
          <a href="https://github.com/sponsors/ljagiello">
            sponsor it on GitHub
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
          The Totem Compass is a handheld gadget for festivals, with a ring of
          lights, a glowing touch-sensitive crystal, GPS and a compass. Friends
          link their Totems into a small mesh network so they can find each
          other in the crowd, send each other taps and messages, and head to a
          shared meeting point.
        </p>
        <p>
          I wanted to know how it works, so I took apart the firmware Totem
          publishes for its updates. Inside is an ESP32 running MicroPython, so
          all of the device’s own logic is Python, frozen into the firmware as
          compiled bytecode. It uses three radios on the same 2.4 GHz band:
          Bluetooth for the phone app, ESP-NOW for the mesh between Totems, and
          Wi-Fi for updates. The write-up covers all three, along with how the
          firmware is laid out and how navigation works. It’s also upfront about
          the gaps: every finding is marked as confirmed or inferred, and the
          parts still unread are listed.
        </p>
        <p>
          Two tools came out of it. totemctl talks to a Totem over Bluetooth the
          same way the official app does, so you can check its status, rename
          it or change its settings from a laptop. totememu turns a plain ESP32
          board into a stand-in Totem: it pairs with a real one through the
          normal touch gesture and then swaps status updates with it over the
          mesh.
        </p>
        <p>
          This is independent work, not affiliated with or endorsed by Totem
          Labs. The firmware analysis is purely static, both tools have only
          ever been run against my own Totem, and they deliberately leave out
          anything that could affect other people’s devices nearby.
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
