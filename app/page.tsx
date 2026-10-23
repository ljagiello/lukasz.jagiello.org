import Image from "next/image";
import { About } from "@/content/about";
import { activeLinks, projectGroups, site } from "@/content/site";
import photo from "@/public/photo.jpg";
import { ThemeToggle } from "./theme-toggle";

const projects = projectGroups.flatMap((group) =>
  group.projects.map((project) => ({ ...project, group: group.title })),
);

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
        <div className="topbar mono">
          <span>{site.url.replace("https://", "")}</span>
          <ThemeToggle />
        </div>

        <main>
          <header className="hero">
            <div>
              <Image
                src={photo}
                alt={site.photo.alt}
                className="portrait"
                width={112}
                height={112}
                preload
              />
              <h1 className="name">
                <span>{site.givenName}</span> <span>{site.familyName}</span>
              </h1>
              <p className="tagline mono">
                {site.jobTitle} · {site.location}
              </p>
              <nav aria-label="Profiles">
                <ul className="profiles mono">
                  {activeLinks.map((link) => (
                    <li key={link.label}>
                      {/* rel="me" marks the other profiles as belonging to the same person. */}
                      <a href={link.href} rel="me">
                        {link.label}
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
                    <span>{project.group}</span>
                    <span>
                      {project.language} · {project.year}
                    </span>
                  </p>
                  <h3>{project.name}</h3>
                  <p className="card-description">{project.description}</p>
                  {project.repo ? (
                    <a href={project.repo} className="card-repo mono">
                      {project.repo.replace("https://", "")}
                    </a>
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
