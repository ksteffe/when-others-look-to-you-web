# When Others Look to You (web)

Next.js (App Router) marketing site. Content and asset paths live in `lib/content.ts`.

## Docs

- [Architecture](docs/ARCHITECTURE.md) — how the code is organized, content flow, SEO, and APIs.
- [Testing spec](docs/TESTING_SPEC.md) — phased plan for adding automated tests.

## CI (GitHub Actions)

On **push** and **pull request** to **`main`** / **`master`**, [.github/workflows/ci.yml](.github/workflows/ci.yml) runs **`npm run lint`**, **`npm run test`**, and **`npm run build`** (with a placeholder `NEXT_PUBLIC_SITE_URL` for deterministic URLs in CI).

Equivalent locally:

```bash
npm ci && npm run lint && npm run test && npm run build
```

## Requirements

- **Node.js** 20.x or newer (matches `@types/node` and Next.js expectations).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other useful commands:

```bash
npm run build   # production build (same as Vercel)
npm run start   # run production build locally
npm run lint
npm run test    # Vitest (unit / component tests)
npm run test:watch
```

## Environment variables

The app **builds without** any `.env` file. Set these when you need the behavior below:

| Variable | When needed |
|----------|----------------|
| `NEXT_PUBLIC_SITE_URL` | Production base URL for canonical links, sitemap, Open Graph, and JSON-LD (e.g. `https://www.example.com`). Defaults to `http://localhost:3000` in dev. |
| `NEWSLETTER_API_KEY` | Newsletter signup via **POST `/api/subscribe`** (Beehiiv). |
| `NEWSLETTER_PUBLICATION_ID` | Same — required together with the API key for subscribe to succeed. |

Copy **`.env.example`** to **`.env.local`** and fill in values (`.env.local` stays gitignored).

## Deploy to Vercel

1. Push the repo to GitHub (or GitLab / Bitbucket).
2. In [Vercel](https://vercel.com), click **Add New… → Project** and import the repository.
3. Leave the defaults: **Framework Preset** Next.js, **Build Command** `npm run build`, **Output** handled automatically.
4. Add **`NEXT_PUBLIC_SITE_URL`** to the project’s **Environment Variables** with your live site URL (recommended for SEO). Add **`NEWSLETTER_API_KEY`** and **`NEWSLETTER_PUBLICATION_ID`** if you use the newsletter API route.

To deploy from the CLI: install the [Vercel CLI](https://vercel.com/docs/cli), run `vercel` in the project root, and follow the prompts.
