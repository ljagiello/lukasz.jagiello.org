# lukasz.jagiello.org

Personal page. Next.js (App Router), hosted on Vercel, DNS in Route53.

## Editing content

Everything on the page comes from [`content/site.ts`](content/site.ts) (name,
title, profile links, side projects, contact email) and
[`content/about.tsx`](content/about.tsx) (the about paragraphs).
Replace `public/photo.jpg` to change the photo (square, at least 400×400).

Links with an empty `href` are hidden.

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
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (`G-…`). Analytics loads only when set. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console HTML-tag token. |

Both are inlined at build time, so redeploy after changing them.

## Search engines

The page ships a canonical URL, Open Graph/Twitter tags, a generated social
image (`app/opengraph-image.tsx`), a generated Apple touch icon
(`app/apple-icon.tsx`), JSON-LD `ProfilePage`/`Person` data, `/robots.txt`,
`/sitemap.xml` and `/llms.txt` (a Markdown summary for LLMs, built from
`content/site.ts`).

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
