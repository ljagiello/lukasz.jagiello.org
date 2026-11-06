# lukasz.jagiello.org

Personal page. Next.js (App Router), hosted on Vercel, DNS in Route53.

## Editing content

Everything on the page comes from [`content/site.ts`](content/site.ts) (name,
title, profile links, side projects, contact email) and
[`content/about.tsx`](content/about.tsx) (the about paragraphs).
Replace `public/photo.jpg` to change the photo (square, at least 400×400).

Each public side project has its own page at `/projects/<slug>`. The `slug`
on its card in `content/site.ts` turns the page on, and the write-up, tagline
and optional docs link live in `content/projects/<slug>.tsx`, listed in
[`content/projects/index.ts`](content/projects/index.ts). A slug without a
write-up fails the build. A private project (no `repo`) can have a page too; it just
shows no source link. A card without a slug gets no page. Each write-up also
has a `published` date, and optionally a `searchTitle` and
`searchDescription`: the title and description for search results and link
previews, when they should carry the words people search for. They aren't
shown on the page; without them, the title is "name: tagline" and the
description is the card's text.

The `/work` page (intro, offers, how to get in touch) comes from
[`content/work.tsx`](content/work.tsx). Its `connect` object holds the booking
link; while empty it falls back to email, so the page works before the
calendar is connected. `searchTitle` and `description` there are for search
results only. Each offer's `amount` repeats its price as numbers for the
structured data; keep it in step with `price`.

Links with an empty `href` are hidden. Profiles in `extraProfiles` get no
icon; they only go in the structured data and `/llms.txt`. Other people share
the name, so `disambiguatingDescription` (structured data) and `handles`
(llms.txt) say which accounts are his; keep them in step with the links.

The structured-data `dateModified` and the sitemap's `lastmod` come from
`content/updated.ts`, one date per page: the home page (`site.ts`,
`about.tsx`, the photo), `/work` (`site.ts`, `work.tsx`) and each project page
(`site.ts` and its own file in `content/projects/`). Don't edit it: after a
change to `content/` or the photo lands on `main`, the content-date workflow
(`.github/workflows/content-date.yml`) writes each page's last commit time
there and pushes it, which deploys again. A new project's file is picked up by
itself; any other new content file needs adding to its page's list in that
workflow. It pushes straight to `main`, so keep `main`
open to the Actions bot if you add branch protection.

## Development

```sh
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

Node 24 (see `engines` in `package.json`).

TypeScript 7 runs side by side with the TypeScript 6 API, as
[recommended by the TypeScript team](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0):
`@typescript/native` is TypeScript 7 and provides `tsc`, which `npm run
typecheck` and `next build` use. `typescript` is an alias for
`@typescript/typescript6`, because typescript-eslint still needs the
JavaScript API that TypeScript 7 doesn't ship yet. Once typescript-eslint
supports TypeScript 7, drop the alias and depend on `typescript@^7` directly.

## Environment variables

Set these in Vercel under Project > Settings > Environment Variables
(Production). See [`.env.example`](.env.example).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (`G-…`). Analytics loads only when set, once the page is idle. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console HTML-tag token. |

Both are inlined at build time, so redeploy after changing them.

## Search engines

Every page ships a canonical URL, Open Graph/Twitter tags and its own
generated social image (`opengraph-image.tsx` next to each page, drawn with
`app/og-card.tsx`). The site has a generated Apple touch icon
(`app/apple-icon.tsx`), `favicon.ico` alongside `icon.svg`, a `googlebot` tag
allowing large image previews, `/robots.txt`, `/sitemap.xml`, `/llms.txt` (a
Markdown summary for LLMs, built from `content/site.ts`, with the about prose
rendered from `content/about.tsx`) and `/llms-full.txt` (the same plus every
project write-up and the work page in full).

JSON-LD: the home page has `WebSite`/`ProfilePage`/`Person` data plus a
`SoftwareSourceCode` entry per public project. Each project page repeats its
`SoftwareSourceCode` and adds a `WebPage`, an `Article` (the write-up, with
author and dates) and a breadcrumb. `/work` has a `WebPage`, a breadcrumb and
a `Service` with its `Offer` per offer. The other pages carry short copies of
the home page's `WebSite` and `Person` (`app/schema.ts`), so each one names
its author on its own. The 404 page (`app/not-found.tsx`) has its own
`noindex` tags.

After each production deploy, the IndexNow workflow
(`.github/workflows/indexnow.yml`) asks Bing and the other IndexNow engines to
recrawl every URL in the live sitemap. The key lives in `public/<key>.txt`, whose name and
content are the key; it's public by design. To change it, replace that file.
Google doesn't use IndexNow and goes by the sitemap's `lastmod` instead.

To get indexed:

1. In [Search Console](https://search.google.com/search-console), add a
   **URL prefix** property for `https://lukasz.jagiello.org/`.
2. Verify it with the **Google Analytics** method (works once GA is live with
   the same Google account), or the **HTML tag** method by setting
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploying.
   (A TXT record can't be used on `lukasz.jagiello.org` itself because the
   name is a CNAME.)
3. Submit `https://lukasz.jagiello.org/sitemap.xml` and request indexing of
   the home page.

## DNS

`infra/` is an OpenTofu config that points `lukasz.jagiello.org` at Vercel.
It reads the existing `jagiello.org` hosted zone and only manages the
`lukasz` CNAME (plus an optional `_vercel` TXT record), so the apex mail
records are left alone.

```sh
cd infra
tofu init
tofu plan
tofu apply
```

The CNAME target defaults to the value Vercel shows for this project under
Settings > Domains; update `vercel_cname_target` if Vercel ever changes it.

State is local (`infra/terraform.tfstate`, git-ignored). If it is lost, run
`tofu import aws_route53_record.site <ZONE_ID>_lukasz.jagiello.org_CNAME`.

## Dependency updates

Dependabot (`.github/dependabot.yml`) opens weekly grouped PRs for npm,
GitHub Actions and OpenTofu providers, skipping releases younger than three
days. CI (`.github/workflows/ci.yml`) lints, type-checks and builds every PR,
and Vercel deploys a preview for it.
