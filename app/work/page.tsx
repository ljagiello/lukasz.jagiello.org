import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { links, work } from "@/content/work";

const home = `${site.url}/`;
const url = `${site.url}${work.path}`;
const title = `${work.title}: ${work.headline}`;

// Replaces the home page's profile-shaped tags for this page.
export const metadata: Metadata = {
  title,
  description: work.description,
  alternates: { canonical: work.path },
  openGraph: {
    type: "website",
    url: work.path,
    siteName: site.name,
    title,
    description: work.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: site.twitterHandle,
    title,
    description: work.description,
  },
};

// Tells search engines these are services offered by the person on the home
// page, with their prices.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description: work.description,
      isPartOf: { "@id": `${home}#website` },
      about: { "@id": `${home}#person` },
      dateModified: site.updated,
    },
    ...work.offers.map((offer) => ({
      "@type": "Service",
      name: offer.name,
      description: offer.description,
      provider: { "@id": `${home}#person` },
      areaServed: "US",
      offers: {
        "@type": "Offer",
        price: offer.price.replace(/[^0-9–-]/g, "").split(/[–-]/)[0],
        priceCurrency: "USD",
        description: `${offer.price}, ${offer.terms}`,
        url,
      },
    })),
    {
      "@type": "Event",
      name: work.workshop.name,
      description: work.workshop.description,
      startDate: "2027-02-10",
      endDate: "2027-02-11",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      organizer: { "@id": `${home}#person` },
      offers: {
        "@type": "Offer",
        price: "900",
        priceCurrency: "USD",
        url,
      },
    },
  ],
};

export default function Work() {
  return (
    <div className="site">
      <div className="page work">
        <main>
          <header className="work-hero">
            <p className="crumb mono">
              <Link href="/">{site.name}</Link> <span aria-hidden="true">/</span>{" "}
              <span>{work.title}</span>
            </p>
            <h1>{work.headline}</h1>
            <div className="work-intro">
              {work.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <p className="work-actions">
              <a href={links.booking} className="contact-button">
                Book a 30-minute call <span aria-hidden="true">→</span>
              </a>
              <a href={`mailto:${work.email}`} className="work-link mono">
                {work.email}
              </a>
            </p>
          </header>

          <section className="projects" aria-labelledby="offers">
            <h2 id="offers">How we can work together</h2>
            <ul className="cards">
              {work.offers.map((offer) => (
                <li key={offer.name} className="card">
                  <p className="card-meta mono">
                    <span>{offer.kind}</span>
                  </p>
                  <h3>{offer.name}</h3>
                  <p className="price">
                    {offer.price}
                    <span className="terms mono">{offer.terms}</span>
                  </p>
                  <p className="card-description">{offer.description}</p>
                  <ul className="includes">
                    {offer.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="fit mono">For: {offer.fit}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="workshop" aria-labelledby="workshop">
            <div className="workshop-head">
              <p className="card-meta mono">
                <span>Public workshop · founding cohort</span>
              </p>
              <h2 id="workshop">{work.workshop.name}</h2>
              <p className="when mono">{work.workshop.when}</p>
            </div>
            <div className="workshop-body">
              <p>{work.workshop.description}</p>
              <ul className="includes">
                {work.workshop.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="price">
                {work.workshop.price}
                <span className="terms mono">
                  {work.workshop.earlyBird} · {work.workshop.seats}
                </span>
              </p>
              <p className="work-actions">
                <a href={links.presale} className="contact-button">
                  Reserve a founding seat <span aria-hidden="true">→</span>
                </a>
                <a href={links.waitlist} className="work-link mono">
                  Join the waitlist
                </a>
              </p>
              <p className="lightning">
                <strong>{work.workshop.lightning.name}</strong>,{" "}
                {work.workshop.lightning.when}. {work.workshop.lightning.description}{" "}
                <a href={links.waitlist}>Get the invite</a>.
              </p>
            </div>
          </section>

          <section className="how" aria-labelledby="how">
            <h2 id="how">How it works</h2>
            <ol className="steps">
              {work.howItWorks.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <h2 id="not">What I don’t take on</h2>
            <ul className="not-a-fit">
              {work.notAFit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="contact" aria-labelledby="contact">
            <div>
              <h2 id="contact">Let’s talk</h2>
              <p>Email is the quickest way to reach me; a call is the quickest way to scope.</p>
            </div>
            <a href={links.booking} className="contact-button">
              Book a call <span aria-hidden="true">→</span>
            </a>
          </section>
        </main>

        <footer className="footer mono">
          <Link href="/">{site.name}</Link>
        </footer>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
