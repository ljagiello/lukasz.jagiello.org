import type { Metadata } from "next";
import Link from "next/link";

// Replaces the home page's title, robots, canonical and link-preview tags,
// which the 404 page would otherwise inherit from the layout.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true, googleBot: { index: false } },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <div className="site">
      <main className="page not-found">
        <h1>Page not found</h1>
        <p>
          There’s nothing here. <Link href="/">Go to the home page</Link>.
        </p>
      </main>
    </div>
  );
}
