# lukasz.jagiello.org

Personal page. Next.js (App Router), hosted on Vercel, DNS in Route53.

## Editing content

- [`content/site.ts`](content/site.ts): name, title, profile links, side
  projects, contact email. Links with an empty `href` are hidden.
- [`content/about.tsx`](content/about.tsx): the about paragraphs.
- `public/photo.jpg`: the photo (square, at least 400×400).
- [`content/work.tsx`](content/work.tsx): the `/work` page. Keep each offer's
  `amount` in step with its `price`.
- `content/projects/<slug>.tsx`: the write-up on `/projects/<slug>`. The
  `slug` on a card in `site.ts` turns the page on; list the file in
  [`content/projects/index.ts`](content/projects/index.ts). A picture goes in
  `public/img/<slug>.<ext>`; strip a photo's metadata first
  (`magick in.jpg -strip -resize 1600x1600 -quality 82 out.webp`).

Don't edit `content/updated.ts`: the content-date workflow writes each page's
last-changed date there after a content change lands on `main`. It pushes
straight to `main`, so keep `main` open to the Actions bot.

## Development

```sh
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

Node 24. `tsc` is TypeScript 7 (`@typescript/native`); `typescript` is an
alias for TypeScript 6 only because typescript-eslint still needs its
JavaScript API. Drop the alias once typescript-eslint supports TypeScript 7.

## Environment variables

Set in Vercel (Production), see [`.env.example`](.env.example). Both are
inlined at build time, so redeploy after changing them.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (`G-…`). Analytics loads only when set. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console HTML-tag token. |

## Search engines

After each production deploy, `.github/workflows/indexnow.yml` asks Bing and
the other IndexNow engines to recrawl the sitemap. Its key is
`public/<key>.txt`, public by design; don't delete it.

## DNS

`infra/` is an OpenTofu config that manages only the `lukasz` CNAME (plus an
optional `_vercel` TXT record) in the existing `jagiello.org` zone, so the
apex mail records are left alone.

```sh
cd infra
tofu init
tofu plan
tofu apply
```

State is local (`infra/terraform.tfstate`, git-ignored). If it is lost, run
`tofu import aws_route53_record.site <ZONE_ID>_lukasz.jagiello.org_CNAME`.

## Dependency updates

Dependabot (`.github/dependabot.yml`) opens weekly grouped PRs for npm,
GitHub Actions and OpenTofu providers, skipping releases younger than three
days. CI (`.github/workflows/ci.yml`) lints, type-checks and builds every PR,
and Vercel deploys a preview for it.
