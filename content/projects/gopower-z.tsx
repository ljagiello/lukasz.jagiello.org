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
        sits between a charger and the device being charged, shows the
        voltage, current, and power on its screen, and captures the USB Power
        Delivery messages the two exchange to agree on a voltage. gopower-z
        is a Go library and a command-line tool, <code>powerz</code>, that
        reads the meter from a Mac or a Linux machine.
      </p>
      <p>
        I designed it for AI agents as much as for people. At a terminal, it
        opens a live dashboard. When its output goes to another program, it
        prints JSON with the units in the field names. Errors come with
        stable exit codes and a hint about what to try next, and{" "}
        <code>powerz schema</code> describes every command, flag, and field,
        so an agent can learn the tool without reading the docs. The main
        command for agents is <code>powerz measure</code>: it samples for a
        set time, then reports the minimum, average, and maximum voltage,
        current, and power, the energy used, and the power contract the
        charger and device agreed on.
      </p>
      <p>
        The meter can do more than measure, and some of it you wouldn’t want
        a script to trigger by accident. Its commands include writing
        settings, a factory reset, firmware updates, and a mode that makes
        the attached charger raise the voltage on the cable. powerz sends
        only a short whitelist of read requests. Every message is checked
        against that list right before it goes to the meter, and a fuzz test
        confirms the check lets nothing else through.
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
        The protocol work starts from what others have already published:
        ChargerLAB’s own documents and sample code, the Linux kernel’s driver
        for the meter, and several open-source clients and research notes. I
        checked those sources against each other and filled the gaps myself.
        I decompiled two versions of the official Windows app to see what it
        sends to the meter. I also verified a published method for
        decrypting the meter’s firmware, then decrypted all 21 releases on
        ChargerLAB’s Google Drive and analyzed them to see how the meter
        responds. That analysis showed, for example, that the meaning of the
        last few bytes of each reading changed in firmware 2.0.1.
      </p>
      <p>
        Testing on my own meter turned up a trap: if the computer sends a new
        request while the meter still has a reply waiting, the meter stops
        responding and its watchdog reboots it. powerz now reads every reply
        to the end, including the empty packet that closes some of them,
        before it sends anything else. Its tests replay messages captured
        from my meter, and every command has been run against it. The Linux
        builds pass CI but haven’t been tried with a meter yet.
      </p>
      <p>
        The details are written up at{" "}
        <a href="https://powerz.jagiello.dev/">powerz.jagiello.dev</a>: the
        CLI reference, the USB protocol byte by byte, hardware notes, and the
        analyses of the official software and the firmware. Each claim is
        labeled with its source, so you can tell what was tested on the meter
        from what was read in code or documents.
      </p>
      <p>
        This is an independent project, not affiliated with or endorsed by
        ChargerLAB. The firmware and software analysis is static, and powerz
        has only been run against my own meter.
      </p>
    </>
  ),
};
