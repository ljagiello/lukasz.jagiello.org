"use client";

// Flips the theme for this visit by setting data-theme on <html>. Both labels
// are rendered and CSS shows the right one, so the server and client markup
// match whatever the system theme is.
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    root.dataset.theme = current === "dark" ? "light" : "dark";
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle}>
      <span className="theme-to-dark">Dark mode</span>
      <span className="theme-to-light">Light mode</span>
    </button>
  );
}
