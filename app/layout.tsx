import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { site } from "@/content/site";
import { connect } from "@/content/work";
import "./globals.css";

// `subsets` only picks which files are preloaded. The page text is all
// latin; the latin-ext files still load if a character ever needs them.
const sans = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
// The booking service's host (cal.com), for the lead event below. Empty while
// the booking link falls back to email.
const bookingHost = connect.booking ? new URL(connect.booking).hostname : "";
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

// Search results and link previews show the same title.
const title = `${site.name}: ${site.jobTitle}, ${site.location}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  keywords: [site.name, site.alternateName],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    firstName: site.givenName,
    lastName: site.familyName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: site.twitterHandle,
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    // Lets Google show the portrait large in results.
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: googleVerification,
    // Verifies the site for the Pinterest profile (Settings, Link to
    // Pinterest, Websites). Keep it after the claim goes through.
    other: { "p:domain_verify": "693356cf978328840bcb248d2219e847" },
  },
};

export const viewport: Viewport = {
  themeColor: "#06090c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        {/* Analytics loads once the page is idle, so it doesn't compete with
            the page itself. Visits shorter than that aren't counted. */}
        {gaId ? (
          <>
            {/* Clicks on an email link or the booking link count as a
                generate_lead event (method "email" or "booking"), which GA4
                can mark as a key event. */}
            <Script id="ga-init" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
document.addEventListener('click', function (e) {
  var a = e.target instanceof Element ? e.target.closest('a[href]') : null;
  if (!a) return;
  var method = a.protocol === 'mailto:' ? 'email'
    : ${bookingHost ? `a.hostname === '${bookingHost}'` : "false"} ? 'booking' : '';
  if (method) gtag('event', 'generate_lead', { method: method });
});`}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
