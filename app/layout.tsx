import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { activeLinks, site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name}: ${site.jobTitle}`,
  description: site.description,
  keywords: [site.name, site.alternateName],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.name,
    description: site.description,
    firstName: site.givenName,
    lastName: site.familyName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: site.twitterHandle,
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
  verification: googleVerification ? { google: googleVerification } : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1824" },
  ],
};

// Lets Google show the page as a profile with links to the other accounts.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: site.name,
    alternateName: site.alternateName,
    givenName: site.givenName,
    familyName: site.familyName,
    jobTitle: site.jobTitle,
    alumniOf: { "@type": "CollegeOrUniversity", name: site.alumniOf },
    homeLocation: { "@type": "Place", name: site.location },
    description: site.intro,
    url: site.url,
    image: new URL(site.photo.src, site.url).toString(),
    email: `mailto:${site.email}`,
    sameAs: activeLinks
      .map((link) => link.href)
      .filter((href) => href.startsWith("https://")),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
