import Image from "next/image";
import benchKit from "@/public/img/icefinder-bench-kit.webp";
import benchSensors from "@/public/img/icefinder-bench-sensors.webp";
import brainBoard from "@/public/img/icefinder-brain-board.webp";
import render from "@/public/img/icefinder.webp";
import type { Story } from "./index";

// The pictures inside the write-up are at most the column's width, as on the
// project page.
const figureSizes = "(min-width: 960px) 700px, 100vw";

// The write-up on /projects/icefinder. See index.ts for the fields.
export const story: Story = {
  tagline: "A pendant that points you toward your friends",
  published: "2026-11-05T17:01:17-08:00",
  image: {
    file: render,
    path: "/img/icefinder.webp",
    alt: "3D render of the IceFinder light board design: a round circuit board with a ring of LEDs around its edge",
  },
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

      <h2>The hardware</h2>
      <p>
        The pendant is designed as a puck 77 mm across and 23 mm deep, with
        two circuit boards stacked inside. Under the face sits the round
        light board, 63 mm across, with 78 LEDs: 60 in the ring, one every 6
        degrees, and 18 in the middle that glow through an iceberg-shaped
        window. Four millimeters behind it, joined by a single 20-pin
        connector, is the D-shaped “brain” board with an ESP32-S3 module for
        the radios and the firmware, USB-C, the charger, and the power
        switches.
      </p>
      <figure className="project-figure">
        <Image
          src={brainBoard}
          alt="3D render of the IceFinder brain board design: a D-shaped circuit board with USB-C connector pads, a board-to-board connector, and labeled test pads"
          sizes={figureSizes}
        />
        <figcaption>
          The brain board’s top side, facing the light board. The ESP32-S3
          module sits on the other side, toward the back of the pendant.
        </figcaption>
      </figure>
      <p>
        The sensors are on the light board: a u-blox MAX-M10S satellite
        receiver that tells the pendant where it is, an ST LSM6DSV16X motion
        sensor that feels it tilt and turn, and an ST LIS2MDL compass that
        tells which way it faces. Together they give the pendant what it
        needs to light the LED that points at a friend. A tiny digital
        microphone listens through a half-millimeter hole, a copper pad
        senses a finger through the front, and a MODE button and an on/off
        slide sit on two tabs at the edge.
      </p>
      <p>
        The brain board also carries an NFC tag chip, NXP’s NTAG I²C plus,
        with a flat coil glued into the back lid. A phone held against the
        back of the pendant can read the tag even when the pendant is off,
        because the phone’s field powers it. When the pendant is on, the
        ESP32 can read and write the same memory over a bus of its own, and
        the tag wakes it when a phone comes near. The plan is for the tag to
        hold only a public reference that a phone uses to open the wearer’s
        chosen profile, never keys or private details. A tap identifies a
        pendant; it doesn’t prove who’s wearing it.
      </p>
      <p>
        Power comes from a single 1,000 mAh lithium-polymer cell. A USB-C
        charger fills it at about 0.4 A and runs the electronics from USB at
        the same time, so a flat battery doesn’t stop the pendant from
        starting. A thin temperature sensor stuck to the cell pauses charging
        below about 0 °C and above about 51 °C, which matters in the desert.
        The LEDs draw through a switch that caps them at about 0.19 A on
        average, whatever the pattern does, and three large capacitors supply
        the short, bright pulses.
        The goals are a whole night on one charge and a full recharge in
        three hours or less, and they stay goals until they’re measured on
        the real thing.
      </p>
      <p>
        Revision B of both boards is placed and routed, passes KiCad’s
        electrical and design rule checks, and has the datasheet of every
        part in the project. It hasn’t been fabricated yet, and the enclosure
        is still a CAD model.
      </p>

      <h2>The light</h2>
      <p>
        A pattern is a small script that runs on the pendant itself, so the
        light keeps going when the phone is away, out of range, or flat. It
        needs no server, internet, or stream of pixels. The firmware carries
        24 patterns today, written for the 65- and 85-LED layouts of two
        earlier prototypes, and the phone app runs the same pattern engine
        for an offline preview, so you can try a look before you pick it on
        the pendant.
      </p>
      <p>
        The idea is that your light is exactly a pattern plus its settings:
        colors, speed, and the pattern’s own sliders. Nothing about you or the
        device is mixed in behind the scenes, so you can move your light to a
        new pendant or share it with a friend. Patterns render at about 10
        frames per second by default, which is plenty for slow, organic
        motion and easy on the battery. Motion follows the clock rather than
        the frame count, so a pattern moves at the same speed at any frame
        rate. The app also offers gamma correction (none, 1.6, or 2.2) and an
        LED current limit that the firmware applies to every frame.
      </p>

      <h2>Firmware before the boards</h2>
      <p>
        I’m currently rewriting the firmware in C using ESP-IDF, ahead of the
        final PCB design. Development is happening on a board equipped with
        the same GPS receiver as the planned hardware. The firmware already
        supports owner pairing, encrypted Bluetooth sessions, persistent
        settings, LED control, and signed firmware updates over Bluetooth and
        Wi-Fi. The mesh radio and directional display are next.
      </p>
      <p>
        In November 2026 the firmware moved onto a bench kit as well: an
        Unexpected Maker FeatherS3[D] board, with the same ESP32-S3 chip as
        the brain board, wired on a breadboard to breakout boards carrying
        the same satellite receiver, motion sensor, compass, and NFC tag chips
        as the PCB. A PDM microphone, a strip of the same tiny WS2812B-2020
        LEDs, and a battery complete it.
      </p>
      <figure className="project-figure">
        <Image
          src={benchKit}
          alt="The IceFinder bench kit on a desk: a FeatherS3[D] board on a breadboard, wired to an NFC tag board, motion sensor, compass and GPS breakout boards, a battery, and a lit strip of LEDs"
          sizes={figureSizes}
        />
        <figcaption>
          The bench kit: the FeatherS3[D] on the breadboard with the
          microphone below it, the NFC tag board at the top, the motion
          sensor, compass, and GPS boards on the right, and the LED strip on
          the left.
        </figcaption>
      </figure>
      <p>
        Bringing the drivers up on the real chips paid off quickly. The
        compass’s first reading after waking from sleep came back at nearly
        double the real field, about 102 µT against a steady 54 µT, once
        after every wake. Fed into the heading, that would make the direction
        jump each time the pendant woke up, so the driver now throws that
        reading away. The motion sensor, set to 30 samples per second,
        delivered 30.277 per second over 16 minutes, against 30.273 predicted
        from the chip’s own clock trim, and not one sample was missed.
      </p>
      <figure className="project-figure">
        <Image
          src={benchSensors}
          alt="Close-up of the motion sensor and LIS2MDL compass breakout boards taped to a small box, with the u-blox MAX-M10S GPS board and its antenna cable below them"
          sizes={figureSizes}
        />
        <figcaption>
          The motion sensor and compass, with the GPS receiver below them.
        </figcaption>
      </figure>
      <p>
        Switching off the sensors’ power rail didn’t switch them off. The
        ESP32’s transmit line to the GPS receiver idles high, and that alone
        kept the motion sensor running and the compass answering. That’s the
        bench wiring, not the PCB, but it’s worth checking the board design
        for the same path before it’s ordered.
      </p>
      <p>
        The microphone delivered exactly 16,000 samples per second, counted
        against the ESP32’s own timer for ten minutes, without losing a
        buffer while the sensors, the NFC tag, and the GPS ran beside it. The
        NFC driver wrote a test link into the tag, read it back byte for
        byte, and put the tag back as it found it: a full dump matched line
        for line before and after. A phone already reads the tag on the bench
        kit: the firmware formatted it and wrote a link, and an iPhone picked
        the link up in the background and offered to open it.
      </p>

      <h2>Testing</h2>
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
        The bench kit brought a new rule: a driver is accepted only when it
        works on the real chip. Tests against simulated chips still run on
        every change, but only to catch regressions. Independent QA writes
        its mutants before it reads the tests: the tests for the motion
        sensor and compass drivers caught 39 of its 50, and QA went on to
        find the compass bug above on the chip.
      </p>
      <p>
        The code is private for now, so there’s no public repository to link.
      </p>
    </>
  ),
};
