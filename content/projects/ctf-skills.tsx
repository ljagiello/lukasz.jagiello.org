import type { Story } from "./index";

// The write-up on /projects/ctf-skills. See index.ts for the fields.
export const story: Story = {
  tagline: "Hacking know-how for AI coding agents",
  published: "2026-11-05T16:41:20-08:00",
  searchTitle: "ctf-skills: CTF agent skills for Claude Code and Codex",
  searchDescription:
    "Open-source agent skills that teach Claude Code, Codex and other agents to solve CTF challenges, with an evaluation suite that checks whether they help.",
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
};
