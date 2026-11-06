import { site } from "@/content/site";

export const home = `${site.url}/`;
export const personRef = { "@id": `${home}#person` };
export const websiteRef = { "@id": `${home}#website` };

// Short copies of the home page's WebSite and Person, for the other pages'
// structured data. Search engines read each page on its own, so without them
// an author or provider would be a bare @id with no name. Same @ids as the
// full nodes on the home page, so they merge into one; the full sameAs list
// stays there only.
export const siteNodes = [
  {
    "@type": "WebSite",
    ...websiteRef,
    url: home,
    name: site.name,
  },
  {
    "@type": "Person",
    ...personRef,
    name: site.name,
    url: home,
    image: new URL(site.photo.src, site.url).toString(),
    jobTitle: site.jobTitle,
  },
];
