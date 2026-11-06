import photo from "@/public/img/totem-compass.webp";
import type { Story } from "./index";

// The write-up on /projects/totem-compass. See index.ts for the fields.
export const story: Story = {
  tagline: "Inside a festival gadget",
  published: "2026-11-05T16:41:20-08:00",
  searchTitle: "Totem Compass teardown: reverse-engineering the firmware",
  searchDescription:
    "A teardown of the Totem Compass: how its firmware works, how the devices talk to the phone and to each other, and an ESP32 that joins their mesh.",
  docs: "https://totem-cb8b3887.mintlify.app",
  image: {
    file: photo,
    path: "/img/totem-compass.webp",
    alt: "The LED side of a Totem Compass circuit board, powered on, with a ring of LEDs around the edge and a cluster lit in the middle",
  },
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
};
