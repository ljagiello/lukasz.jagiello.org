import Image from "next/image";
import { activeLinks, experience, projects, site } from "@/content/site";
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

      <p className="intro">{site.intro}</p>

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

      <section className="section" aria-labelledby="experience">
        <h2 id="experience">Experience</h2>
        <ol className="timeline">
          {experience.map((role) => (
            <li key={`${role.company}-${role.years}`} className="role">
              <p className="role-years">{role.years}</p>
              <div>
                <h3 className="role-title">
                  {role.title},{" "}
                  {role.url ? (
                    <a href={role.url}>{role.company}</a>
                  ) : (
                    role.company
                  )}
                </h3>
                <p className="role-summary">{role.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="projects">
        <h2 id="projects">Side projects</h2>
        <ul className="projects">
          {projects.map((project) => (
            <li key={project.name} className="project">
              <h3 className="project-name">
                <a href={project.repo}>{project.name}</a>
              </h3>
              <p className="project-description">{project.description}</p>
              <p className="project-meta">
                <span>{project.language}</span>
                <a href={project.repo} className="project-repo">
                  {project.repo.replace("https://", "")}
                </a>
              </p>
            </li>
          ))}
        </ul>
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
