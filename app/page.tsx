import Image from "next/image";
import { About } from "@/content/about";
import { activeLinks, projects, site } from "@/content/site";
import photo from "@/public/photo.jpg";
import { ProfileIcon } from "./profile-icon";

export default function Home() {
  return (
    <div className="site">
      <div className="backdrop" aria-hidden="true">
        <div className="backdrop-dots" />
        <div className="backdrop-halo" />
        <div className="backdrop-wave backdrop-wave-1" />
        <div className="backdrop-wave backdrop-wave-2" />
      </div>

      <div className="page">
        <main>
          <header className="hero">
            <div>
              <Image
                src={photo}
                alt={site.photo.alt}
                className="portrait"
                width={176}
                height={176}
                preload
              />
              {/* The tagline is part of the heading so it says who and what,
                  like the page title, not just the name. */}
              <h1>
                <span className="name">
                  <span>{site.givenName}</span> <span>{site.familyName}</span>
                </span>{" "}
                <span className="tagline mono">
                  {site.jobTitle} · {site.location}
                </span>
              </h1>
              <nav aria-label="Profiles">
                <ul className="profiles">
                  {activeLinks.map((link) => (
                    <li key={link.label}>
                      {/* rel="me" marks the other profiles as belonging to the same person. */}
                      <a
                        href={link.href}
                        rel="me"
                        aria-label={link.label}
                        title={link.label}
                      >
                        <ProfileIcon name={link.icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="about">
              <About />
            </div>
          </header>

          <section className="projects" aria-labelledby="projects">
            <h2 id="projects">Side projects</h2>
            <ul className="cards">
              {projects.map((project) => (
                <li key={project.name} className="card">
                  <p className="card-meta mono">
                    <span>{project.category}</span>
                    <span>
                      {project.language} · {project.year}
                    </span>
                  </p>
                  <h3>{project.name}</h3>
                  <p className="card-description">{project.description}</p>
                  {project.url || project.repo ? (
                    <p className="card-links mono">
                      {project.url ? (
                        <a href={project.url}>
                          {project.url.replace("https://", "")}
                        </a>
                      ) : null}
                      {project.repo ? (
                        <a href={project.repo}>
                          {project.repo.replace("https://", "")}
                        </a>
                      ) : null}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <section className="contact" aria-labelledby="contact">
            <div>
              <h2 id="contact">Contact</h2>
              <p>Email is the quickest way to reach me.</p>
            </div>
            <a href={`mailto:${site.email}`} className="contact-button">
              Contact me <span aria-hidden="true">→</span>
            </a>
          </section>
        </main>

        <footer className="footer mono">{site.name}</footer>
      </div>
    </div>
  );
}
