import type { Story } from "./index";

// The write-up on /projects/lastwar-client. See index.ts for the fields.
export const story: Story = {
  tagline: "A from-scratch client for Last War",
  published: "2026-11-05T16:41:20-08:00",
  searchTitle: "lastwar-client: Reverse-engineering the Last War protocol",
  searchDescription:
    "A from-scratch Go client for Last War: Survival Game, built by reverse-engineering how the app talks to its servers. The protocol write-up is at lastwar.tech.",
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
};
