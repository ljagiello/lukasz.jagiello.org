import Image from "next/image";
import { Pinout } from "@/components/pinout";
import { activeLinks, projects, site } from "@/content/site";
import photo from "@/public/photo.jpg";

export default function Home() {
  return (
    <main className="page">
      <header className="hero">
        <div className="hero-text">
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
          <p className="headline">{site.headline}</p>
          <p className="intro">{site.intro}</p>
        </div>
        <Pinout links={activeLinks} marking="LJ" />
      </header>

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
