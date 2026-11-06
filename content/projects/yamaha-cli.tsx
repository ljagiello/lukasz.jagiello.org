import type { Story } from "./index";

// The write-up on /projects/yamaha-cli. See index.ts for the fields.
export const story: Story = {
  tagline: "Control a Yamaha receiver from the terminal",
  published: "2026-11-05T16:41:20-08:00",
  searchDescription:
    "Control a Yamaha MusicCast receiver from the command line. It finds the receiver on your network and handles volume, inputs, radio and multi-room audio.",
  docs: "https://ljagiello.github.io/yamaha-cli/",
  body: () => (
    <>
      <p>
        Yamaha’s network-connected receivers expose an HTTP API, the same one
        used by the MusicCast mobile app. yamaha-cli turns that API into
        simple terminal commands for controlling power, volume, inputs, sound
        modes, radio, and streaming. I built and tested it with an RX-V583,
        and it should work with any MusicCast-compatible receiver.
      </p>
      <p>
        I wanted something that was easy to script and didn’t require knowing
        the receiver’s IP address. On first run, the tool scans the local
        network, discovers the receiver, and saves it under a name you choose.
        If the receiver’s IP address changes later, yamaha-cli automatically
        finds it again and updates its configuration. Output is formatted as a
        readable table in the terminal and switches to JSON when piped into
        another program.
      </p>
      <p>
        Beyond basic control, it can synchronize playback across receivers in
        different rooms, stream state changes in real time, and communicate
        with older Yamaha receivers using their legacy text-based protocol. It
        also includes an agent skill that lets AI assistants control the
        receiver using natural language. For example, you can ask an
        assistant to turn on the receiver and switch to HDMI 2, and it knows
        which commands to execute.
      </p>
      <p>
        One important security consideration: Yamaha’s protocol has neither
        authentication nor encryption. Anyone with access to your local
        network can control the receiver. This is a limitation of Yamaha’s
        protocol, not something a client can fix. Don’t expose your receiver
        directly to the internet.
      </p>
    </>
  ),
};
