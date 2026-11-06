import screenshot from "@/public/img/airdash.png";
import type { Story } from "./index";

// The write-up on /projects/airdash. See index.ts for the fields.
export const story: Story = {
  tagline: "Air quality in your macOS menu bar",
  published: "2026-11-05T16:41:20-08:00",
  searchTitle: "airdash: AirGradient readings in your macOS menu bar",
  image: {
    file: screenshot,
    path: "/img/airdash.png",
    alt: "airdash in the macOS menu bar, showing temperature, PM2.5, humidity and CO2 readings from an AirGradient monitor",
  },
  body: () => (
    <>
      <p>
        AirGradient makes air quality monitors that measure CO2, fine
        particles (PM2.5), temperature, and humidity. airdash brings those
        readings straight to your macOS menu bar, so you can check the air
        quality in your room at a glance without opening a dashboard.
      </p>
      <p>
        It’s a small, native macOS app written in Go, with bindings to
        Apple’s AppKit. It fetches the latest readings from the AirGradient
        API every minute and can run as a background service, starting
        automatically when you log in. It runs on Apple Silicon Macs.
      </p>
      <p>
        This is the oldest of my side projects featured here. I started it in
        2023, and it still gets updates.
      </p>
    </>
  ),
};
