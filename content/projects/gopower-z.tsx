import Image from "next/image";
import label from "@/public/img/gopower-z-label.webp";
import photo from "@/public/img/gopower-z.webp";
import type { Story } from "./index";

// The write-up on /projects/gopower-z. See index.ts for the fields.
export const story: Story = {
  tagline: "Measure USB-C power from the command line",
  published: "2026-11-16T22:46:10-08:00",
  searchTitle: "gopower-z: CLI for the POWER-Z KM003C USB-C power meter",
  searchDescription:
    "A read-only Go CLI for the ChargerLAB POWER-Z KM003C: voltage, current and USB Power Delivery messages as JSON for scripts and AI agents.",
  image: {
    file: photo,
    path: "/img/gopower-z.webp",
    alt: "A POWER-Z KM003C measuring the power to a breadboard prototype, its screen showing 5.066 V, 0.183 A and 0.930 W, next to a strip of lit blue LEDs",
  },
  body: () => (
    <>
      <p>
        The POWER-Z KM003C from ChargerLAB is a small USB-C power meter. It
        sits between a charger and the device being charged, displays
        voltage, current, and power on its screen, and captures the USB Power
        Delivery messages exchanged between the two devices to negotiate a
        voltage. gopower-z is a Go library and command-line tool,{" "}
        <code>powerz</code>, that lets you read data from the meter on macOS
        or Linux.
      </p>
      <p>
        I designed it for AI agents as much as for people. When run in a
        terminal, it opens a live dashboard. When its output is piped to
        another program, it produces JSON with units included in the field
        names. Errors come with stable exit codes and hints about what to try
        next. And <code>powerz schema</code> describes every command, flag,
        and field, allowing an agent to discover how to use the tool without
        having to read the documentation.
      </p>
      <p>
        The main command for agents is <code>powerz measure</code>. It
        samples for a specified duration and reports the minimum, average,
        and maximum voltage, current, and power, along with the energy
        consumed and the power contract negotiated between the charger and
        the device.
      </p>
      <p>
        The meter can do more than just measure, and some of its capabilities
        aren’t things you’d want a script to trigger accidentally. Its
        commands include writing settings, performing a factory reset,
        updating firmware, and activating a mode that makes the attached
        charger raise the voltage on the cable. powerz sends only a short
        whitelist of read-only requests. Every message is checked against
        that list immediately before being sent to the meter, and a fuzz test
        verifies that nothing else can get through.
      </p>
      <figure className="project-figure">
        <Image
          src={label}
          alt="The back of a POWER-Z KM003C, labeled MODEL: KM003C, DC 0-50V 0-6A, with its USB-C plug at the top and a port marked HID on the side"
          sizes="(min-width: 960px) 700px, 100vw"
        />
        <figcaption>
          The back of the meter. The computer connects to the USB-C port on
          the side marked HID.
        </figcaption>
      </figure>
      <p>
        The protocol research builds on what others have already published:
        ChargerLAB’s own documentation and sample code, the Linux kernel
        driver for the meter, and several open-source clients and research
        notes. I cross-checked these sources and filled in the gaps myself.
      </p>
      <p>
        I also decompiled two versions of the official Windows application to
        see exactly what they send to the meter. I verified a previously
        published method for decrypting the meter’s firmware, then decrypted
        all 21 releases available on ChargerLAB’s Google Drive and analyzed
        them to better understand how the meter responds. This analysis
        revealed, for example, that the meaning of the last few bytes in each
        reading changed with firmware version 2.0.1.
      </p>
      <p>
        Testing on my own meter uncovered a tricky issue: if the computer
        sends a new request while the meter still has a reply waiting, the
        meter stops responding and its watchdog eventually reboots it. powerz
        now reads every reply to completion, including the empty packet that
        terminates some responses, before sending another request.
      </p>
      <p>
        The test suite replays messages captured from my meter, and I’ve run
        every command against the actual hardware. The Linux builds pass CI,
        but I haven’t had a chance to test them with a meter yet.
      </p>
      <p>
        I’ve documented the details at{" "}
        <a href="https://powerz.jagiello.dev/">powerz.jagiello.dev</a>,
        including the CLI reference, a byte-by-byte breakdown of the USB
        protocol, hardware notes, and analyses of the official software and
        firmware. Every claim is labeled with its source, so you can
        distinguish what I’ve verified on the actual hardware from what I’ve
        learned from source code and documentation.
      </p>
      <p>
        The firmware and software analysis was performed statically, and
        powerz has only been tested against my own meter.
      </p>
    </>
  ),
};
