import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Next renders the page fresh, skipping the CDN cache, for crawlers on its
  // "HTML-limited bots" list (Bingbot, social link previews) so they get
  // metadata without streaming. Ours is static and already in the cached
  // page's <head>, so this matches no real user agent and they get the cached
  // page too. Drop it if metadata ever comes from generateMetadata.
  htmlLimitedBots: /NoHtmlLimitedBots/,
  experimental: {
    // Puts the (small, Tailwind) stylesheet in a <style> tag instead of a
    // render-blocking <link>. Most visitors land once, so there's no cached
    // stylesheet to lose.
    inlineCss: true,
  },
  turbopack: {
    // Next.js always bundles polyfills for Array.prototype.at, Object.hasOwn
    // and friends, which every browser it supports already has natively
    // (Lighthouse flags them as legacy JavaScript). Swap in an empty module.
    // The key matches the relative path next/dist/client/app-globals.js uses
    // to require it; the package path doesn't match.
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./no-polyfills.js",
    },
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
