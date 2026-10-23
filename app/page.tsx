import Image from "next/image";
import { About } from "@/content/about";
import { activeLinks, projectGroups, site } from "@/content/site";
import photo from "@/public/photo.jpg";

export default function Home() {
  return (
    <main className="page">
      <header className="hero">
        <Image
          src={photo}
          alt={site.photo.alt}
          className="portrait"
          width={160}
          height={160}
          preload
        />
        <div className="hero-text">
          <h1 className="name">
            <span>{site.givenName}</span> <span>{site.familyName}</span>
          </h1>
          <p className="headline">{site.jobTitle}</p>
          <p className="location">{site.location}</p>
        </div>
      </header>

      <div className="about">
        <About />
      </div>

      <nav aria-label="Profiles and contact">
        <ul className="links">
          {activeLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="link-button"
                // rel="me" marks the other profiles as belonging to the same person.
                rel={link.href.startsWith("https://") ? "me" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="section" aria-labelledby="projects">
        <h2 id="projects">Side projects</h2>
        {projectGroups.map((group) => (
          <div key={group.title} className="project-group">
            <h3 className="project-group-title">{group.title}</h3>
            <ul className="projects">
              {group.projects.map((project) => (
                <li key={project.name} className="project">
                  <h4 className="project-name">
                    {project.repo ? (
                      <a href={project.repo}>{project.name}</a>
                    ) : (
                      project.name
                    )}
                  </h4>
                  <p className="project-description">{project.description}</p>
                  <p className="project-meta">
                    <span>{project.year}</span>
                    <span>{project.language}</span>
                    {project.repo ? (
                      <a href={project.repo} className="project-repo">
                        {project.repo.replace("https://", "")}
                      </a>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="section" aria-labelledby="contact">
        <h2 id="contact">Contact</h2>
        <p className="contact">
          Email is the quickest way to reach me:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </section>

      <footer className="footer">
        <p>{site.name}</p>
      </footer>
    </main>
  );
}
