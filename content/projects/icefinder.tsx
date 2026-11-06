import type { Story } from "./index";

// The write-up on /projects/icefinder. See index.ts for the fields.
export const story: Story = {
  tagline: "A pendant that points you toward your friends",
  published: "2026-11-05T17:01:17-08:00",
  body: () => (
    <>
      <p>
        IceFinder is a wearable LED pendant I’m building for Burning Man
        2027. Its ring of lights points toward your friends, helping you find
        each other anywhere on the playa.
      </p>
      <p>
        Each pendant knows its own position and orientation using an onboard
        GPS receiver, compass, and motion sensor. Friends’ pendants share
        their positions directly over a radio mesh, without relying on phones,
        cellular coverage, or the internet. Your pendant calculates the
        direction of each friend relative to your own position and
        illuminates the corresponding part of the ring. The top of the ring
        represents straight ahead.
      </p>
      <p>
        Since the pendant shares your location, security is just as important
        as the lights themselves. Friends establish trust by exchanging keys
        through their phones, and every location update is encrypted so that
        only its intended recipients can read it. Only the owner can change a
        pendant’s settings, and firmware updates are accepted only when
        signed.
      </p>
      <p>
        I’m currently rewriting the firmware in C using ESP-IDF, ahead of the
        final PCB design. Development is happening on a board equipped with
        the same GPS receiver as the planned hardware. The firmware already
        supports owner pairing, encrypted Bluetooth sessions, persistent
        settings, LED control, and signed firmware updates over Bluetooth and
        Wi-Fi. The mesh radio and directional display are next.
      </p>
      <p>
        A device people wear for a week in the desert needs to be
        exceptionally reliable. That’s why I’m putting considerable effort
        into testing the firmware. Every parser that handles external input
        has a dedicated fuzzing target. Mutation testing checks whether the
        test suite actually catches bugs, while independent QA agents derive
        their own tests from the design documents rather than the
        implementation.
      </p>
      <p>
        The code is private for now, so there’s no public repository to link.
      </p>
    </>
  ),
};
