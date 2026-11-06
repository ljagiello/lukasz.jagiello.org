import type { Story } from "./index";

// The write-up on /projects/git-clone. See index.ts for the fields.
export const story: Story = {
  tagline: "Every repo in a predictable place",
  published: "2026-11-05T16:41:20-08:00",
  body: () => (
    <>
      <p>
        git-clone solves a small but recurring annoyance: forgetting where you
        cloned a repository. Give it a repository URL, and it clones the repo
        into a predictable location:{" "}
        <code>~/code/&lt;host&gt;/&lt;org&gt;/&lt;repo&gt;</code>. It creates
        the necessary directories along the way, so everything from GitHub
        ends up under <code>~/code/github.com</code>, regardless of which
        directory you’re currently in.
      </p>
      <p>
        It understands the usual ways of specifying a repository, whether
        through HTTPS, SSH, or a shorthand like{" "}
        <code>github.com/org/repo</code>. Once the clone is complete, it
        prints the resulting path, making it easy to clone a repo and{" "}
        <code>cd</code> into it in a single command. If cloning fails, it
        cleans up any partially created directories instead of leaving a mess
        behind. You can also change the base directory using an environment
        variable.
      </p>
    </>
  ),
};
